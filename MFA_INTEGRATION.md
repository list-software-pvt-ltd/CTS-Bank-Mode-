# MFA integration: CTS-BANK-MODE

Second-factor login (SMS OTP / QR) through the shared **mfa-core** jar (`D:\Paras\Eclipse_Paras\mfa-core`).
MFA runs inside the app. There is no separate MFA service and no API key.

| | |
|---|---|
| App code (`MFA_USER_APP_CONFIG.APP_CODE`) | `CTS-BANK-MODE` |
| Jar | `WebContent/WEB-INF/lib/mfa-core-1.0.0.jar` |
| Config | `src/mfa.properties` (deployed to `WEB-INF/classes`) |
| Admin page | `WebContent/jsp/mfaAdmin.jsp` (identical copy of `mfa-core/samples/jsp/mfaAdmin.jsp`) |
| Pattern | JSP flow, the same as CTS-SYSTEM-MODE / CIBIL / AML (`mfaInitiate.jsp` + `mfaVerify.jsp`) |
| Sibling | `CTS-SYSTEM-MODE` has the same integration; its MFA changes were ported here (see *Differences from CTS-SYSTEM-MODE*) |

---

## 1. Login flow

```
login.jsp ──(login.js afterLogin(): AES-encrypted id + password, AJAX POST)──> jsp/checkUserAndPassword.jsp
      OK   -> session mfa.pwdOkUser = LOGINID
      FAIL -> alert, back to the form

login.js startMfa() ──POST──> jsp/mfaInitiate.jsp      Mfa.get().initiate("CTS-BANK-MODE", user, LOGIN, ip)
      LOGIN (NO_AUTH)        -> session mfa.loginOkUser = user -> completeLogin()
      OTP (SMS sent / QR)    -> session mfa.pendingUser + mfa.challengeId -> OTP / QR panel on login.jsp
      FAIL (not enrolled...) -> alert, back to the form

OTP panel ──POST otp──> jsp/mfaVerify.jsp               Mfa.get().verify(challengeId, otp, ip)
      LOGIN  -> session mfa.loginOkUser = user -> completeLogin()
      RETRY  -> "Invalid OTP, n attempt(s) left", same challenge
      FAIL   -> expired / locked / used: back to the form

completeLogin() ──form post (flag only, no credentials)──> jsp/afterLogin.jsp   <-- THE GATE
      user = session mfa.loginOkUser   (never a request parameter)
      no match -> invalidcredentials.jsp
      match    -> remove mfa.loginOkUser, request.changeSessionId(), load user/branch, go on to main.jsp
```

**CBS entry (CFG_LOGINSTYLE = CBSUSER / CUSTODIAN).** `logincheck.jsp` validates the CBS session
(`UserValidation.CBSValidation`) and then sets `mfa.loginOkUser`. The user is already authenticated at CBS, so no
second factor is asked, as in CKYC. `afterLogin.jsp` accepts the posted `name` only when it equals that attribute.

**Session attributes** (the same names in every MFA app):

| Attribute | Set by | Meaning |
|---|---|---|
| `mfa.pwdOkUser` | checkUserAndPassword.jsp | Password is OK; the second factor may start |
| `mfa.pendingUser`, `mfa.challengeId` | mfaInitiate.jsp | OTP / QR issued; waiting for the code |
| `mfa.loginOkUser` | mfaInitiate.jsp (NO_AUTH), mfaVerify.jsp, logincheck.jsp | Fully authenticated; afterLogin.jsp may log in |

---

## 2. Changes made (2026-10-29)

### New files
| File | Purpose |
|---|---|
| `WebContent/WEB-INF/lib/mfa-core-1.0.0.jar` | The library (SHA-256 starts `E43436EB13DF454E`, the same as EFT/AML/CIBIL/CKYC) |
| `src/mfa.properties` | MFA DB, SMS queue, CBS lookups, admin page and QR settings |
| `WebContent/jsp/checkUserAndPassword.jsp` | JSON. CTSUSER password check against `USRMSTR_VIEW`; sets `mfa.pwdOkUser`. Accepts only POST, and only when `CFG_LOGINSTYLE = CTSUSER` |
| `WebContent/jsp/mfaInitiate.jsp` | JSON. Step 1 of the second factor (copied from CTS-SYSTEM-MODE; `MFA_APP_CODE = "CTS-BANK-MODE"`) |
| `WebContent/jsp/mfaVerify.jsp` | JSON. Step 2: verifies the OTP and checks that the challenge belongs to this user and is a LOGIN challenge |
| `WebContent/jsp/mfaAdmin.jsp` | MFA admin page (users, factor per app, status, import from CBS) |

### Modified files
| File | Change |
|---|---|
| `WebContent/login.jsp` | Hidden `#mfaPanel` (QR image, hint, OTP field, Verify / Cancel) below the login form. The `CFG_LOGINSTYLE` lookup now closes its connection and returns 503 when the DB is down (was an NPE); the CUSTODIAN redirect now `return`s |
| `WebContent/js/login.js` | `afterLogin()` now POSTs to `checkUserAndPassword.jsp` instead of submitting to `afterLogin.jsp`. New: `startMfa`, `showMfaPanel`, `verifyMfaOtp`, `mfaMessage`, `mfaFailed`, `cancelMfa`, `completeLogin` |
| `WebContent/jsp/afterLogin.jsp` | MFA gate (above). CTSUSER takes the user from `mfa.loginOkUser`, so the password is no longer read here and no longer printed to the log. The user query no longer has `USRPASS=?`, because the password is already checked. `changeSessionId()` runs after the gate |
| `WebContent/logincheck.jsp` | Sets `mfa.loginOkUser` after a successful CBS validation |

### Differences from CTS-SYSTEM-MODE
- Bank mode passes messages to `invalidcredentials.jsp` / `login.jsp` as the `?msg=` request parameter (system mode uses
  the session attribute `msg`). The MFA gate in `afterLogin.jsp` therefore redirects to
  `../invalidcredentials.jsp?msg=Invalid Login or Password`.
- `login.jsp` has a different header / layout; only the login-style lookup and the `#mfaPanel` block were changed.
- `login.js`, `logincheck.jsp` and the password / user-query parts of `afterLogin.jsp` were identical to system mode
  before MFA, so the system-mode MFA changes were applied to them unchanged.

### Other projects touched
None. `CTS-BANK-MODE` was already in `mfa.admin.apps` (`EFT,AML,CIBIL,CKYC,CTS-BANK-MODE,CTS-SYSTEM-MODE`) in every
other MFA app, so every admin page already lists this app.

### Security effects
- With MFA, a password alone no longer logs a user in.
- Before this change, `afterLogin.jsp` in CBSUSER mode trusted any posted `name`. It now needs the CBS check from `logincheck.jsp` in the same session.
- The plaintext password is no longer written to stdout or the CTS log.
- The session id changes at login (protects against session fixation).
- The OTP is sent in the POST body and never in the URL. The challenge id stays in the session.
- MFA fails closed: a missing config, a DB error or an unenrolled user means no login.

---

## 3. Deployment instructions

### 3.1 Database (once per environment, shared by all MFA apps)
When `MFA_APP` and the tables already exist for EFT / AML / CIBIL / CKYC, skip to *Enrol users*.
```sql
-- as the MFA schema owner, from mfa-core/db
@schema.sql
@seed.sql
GRANT SELECT, INSERT ON SMSBANK.SMSOUTQUEUE TO MFA_APP;
GRANT SELECT ON POLY.USERSMSTR TO MFA_APP;
GRANT SELECT ON POLY.CUSTOMERMASTER TO MFA_APP;
```

### 3.2 Enrol users
**A user with no `CTS-BANK-MODE` row cannot log in** (`USER_NOT_ENROLLED`).
1. Open `<context>/jsp/mfaAdmin.jsp` and log in with the `mfa.admin.password` value.
2. Click **Import from CBS**, with enrolment for `CTS-BANK-MODE` if needed. Users with a QR device id get QR; the rest get SMS.
3. Or set one user at a time: SMS_OTP / LEGACY_QR / NO_AUTH.

`MFA_USER.USER_CODE` must equal the CTS `LOGINID` (`USRMSTR_VIEW`), which is the CBS `USM_CODE`.

### 3.3 Server settings (`bin/setenv.bat` or environment variables)
| Variable | Needed for |
|---|---|
| `MFA_DB_PASSWORD` | MFA_APP password (the file default is for dev only) |
| `MFA_ADMIN_PASSWORD` | Admin page, at least 12 characters (or `sha256:<hex>` in the file) |
| `MFA_QR_PRIVATE_KEY` | RSA private key (Base64 PKCS#8) whose public half the QR scanner app holds. The file default is the developer machine's 2048-bit key |
| `-Dmfa.config=D:/mfa/cts-bank-mfa.properties` | Optional: an external config file that wins over `WEB-INF/classes/mfa.properties` |

Check before go-live:
- `mfa.db.url`
- the `mfa.sms.insert-sql` column list against the real `SMSOUTQUEUE`
- `mfa.qr.payload-format` against the scanner app (currently `random_no={otp}{deviceId}`)
- `mfa.qr.size-px`: use 400 with a 4096-bit key

### 3.4 Build / deploy
No Maven. Eclipse picks the jar up under *Web App Libraries*. Refresh the project, then **Project → Clean** so that
`mfa.properties` is copied to `build/classes`, and redeploy to Tomcat 10.

### 3.5 Test checklist
- [ ] CTSUSER with SMS_OTP: OTP arrives, wrong OTP shows the attempts left, the right OTP opens main.jsp
- [ ] CTSUSER with LEGACY_QR: the QR shows, the scanned code logs in
- [ ] CTSUSER with NO_AUTH: logs straight in
- [ ] Unenrolled user: "User is not enrolled for second factor"
- [ ] Wrong password: "Invalid Login or Password", no OTP sent
- [ ] Cancel on the OTP panel: back to the form; the server asks for the password again
- [ ] Posting to `jsp/afterLogin.jsp` directly (without MFA): invalidcredentials.jsp
- [ ] CBS entry (`logincheck.jsp?session_id=...`) still logs in without an OTP
- [ ] `MFA_AUDIT` has the INITIATE / VERIFY rows

### 3.6 Troubleshooting (catalina log)
| Log line | Cause |
|---|---|
| `====mfaInitiate JSP Error=== IllegalStateException ...` | `mfa.properties` is missing or invalid (DB, QR key). The message says which setting |
| `MFA initiate X -> ... USER_NOT_ENROLLED` | No `MFA_USER_APP_CONFIG` row for X + `CTS-BANK-MODE` + LOGIN |
| `MOBILE_NOT_REGISTERED` / `DEVICE_NOT_REGISTERED` | Blank in both CBS and `MFA_USER`; set it on the admin page |
| `MFA not completed for user X` | `afterLogin.jsp` was reached without a finished second factor (or with a different user) |
| `Password login not allowed, CFG_LOGINSTYLE=...` | The form login was used while the style is not CTSUSER |

---

## 4. Updating mfa-core later
1. In `mfa-core`, if any `src` file is newer than `target/mfa-core-1.0.0.jar`, run `mvn clean package`.
2. Copy the new jar here and into every other MFA app. Keep all copies identical (compare hashes).
3. Copy `samples/jsp/mfaAdmin.jsp` to `WebContent/jsp/mfaAdmin.jsp` (keep it identical in all apps).
4. Compare `samples/mfa.properties` with `src/mfa.properties` and merge new keys. Keep this app's values.
5. Add an entry to the change log below.

---

## 5. Change log
| Date | Change |
|---|---|
| 2026-10-29 | First integration, ported from CTS-SYSTEM-MODE: mfa-core-1.0.0 (jar SHA-256 `E43436EB13DF454E…`), app code `CTS-BANK-MODE`, QR key via `mfa.qr.private-key`, `mfaAdmin.jsp` identical to the sample |
| 2026-10-29 | `mfa.admin.apps` = `EFT,AML,CIBIL,CKYC,CTS-BANK-MODE,CTS-SYSTEM-MODE,APS` (APS integrated) |
