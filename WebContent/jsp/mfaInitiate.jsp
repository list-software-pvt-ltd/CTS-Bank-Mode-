<%@ page contentType="application/json;charset=UTF-8" language="java" trimDirectiveWhitespaces="true" %>
<%@ page import="java.util.LinkedHashMap"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.list.mfa.core.Mfa"%>
<%@ page import="com.list.mfa.core.MfaResult"%>
<%@ page import="com.list.mfa.core.MfaService"%>
<%@ page import="com.list.mfa.core.ResultCode"%>
<%!
	/** This application's code in MFA_USER_APP_CONFIG.APP_CODE. */
	static final String MFA_APP_CODE = "CTS-BANK-MODE";

	/** Flat JSON object (no JSON library needed): strings escaped, numbers as is, null as null. */
	static String json(Map<String, Object> m)
	{
		StringBuilder b = new StringBuilder("{");
		for (Map.Entry<String, Object> e : m.entrySet())
		{
			if (b.length() > 1) b.append(',');
			b.append('"').append(e.getKey()).append("\":");
			Object v = e.getValue();
			if (v == null) b.append("null");
			else if (v instanceof Number) b.append(v);
			else
			{
				String s = v.toString();
				b.append('"');
				for (int i = 0; i < s.length(); i++)
				{
					char c = s.charAt(i);
					if (c == '"' || c == '\\') b.append('\\').append(c);
					else if (c < 0x20 || c == '<' || c == '>' || c == '&') b.append(String.format("\\u%04x", (int) c));
					else b.append(c);
				}
				b.append('"');
			}
		}
		return b.append('}').toString();
	}
%>
<%
	/*
	 * Second factor, step 1. Called by login.js after jsp/checkUserAndPassword.jsp accepted the password.
	 * The user comes from the session (mfa.pwdOkUser), never from the request. jsp/afterLogin.jsp accepts only mfa.loginOkUser.
	 * result: LOGIN (no OTP needed) | OTP (show the OTP / QR panel) | FAIL (login fails)
	 * MFA runs in-process through mfa-core-1.0.0.jar (settings: WEB-INF/classes/mfa.properties).
	 */
	System.out.println("================== In mfaInitiate Jsp ======================");
	response.setHeader("Cache-Control", "no-cache, private, no-store, must-revalidate, max-age=0");
	Map<String, Object> ret = new LinkedHashMap<String, Object>();
	String userId = (String) session.getAttribute("mfa.pwdOkUser");
	session.removeAttribute("mfa.loginOkUser");
	session.removeAttribute("mfa.pendingUser");
	session.removeAttribute("mfa.challengeId");

	if (userId == null)
	{
		ret.put("result", "FAIL");
		ret.put("code", "PASSWORD_NOT_VERIFIED");
		ret.put("message", "Please login again");
	}
	else
	{
		MfaResult r;
		try
		{
			r = Mfa.get().initiate(MFA_APP_CODE, userId, MfaService.LOGIN, request.getRemoteAddr());
		}
		catch (Exception e)
		{
			// e.g. mfa.properties missing or invalid: fail closed
			System.out.println("====mfaInitiate JSP Error===" + e.toString());
			r = null;
		}
		System.out.println("MFA initiate " + userId + " -> " + r);
		ResultCode code = r == null ? null : r.getCode();

		if (code == ResultCode.NOT_REQUIRED)
		{
			session.removeAttribute("mfa.pwdOkUser");
			session.setAttribute("mfa.loginOkUser", userId);
			ret.put("result", "LOGIN");
		}
		else if (code == ResultCode.OTP_SENT || code == ResultCode.QR_GENERATED)
		{
			session.setAttribute("mfa.pendingUser", userId);
			session.setAttribute("mfa.challengeId", r.getChallengeId());
			ret.put("result", "OTP");
			ret.put("authType", r.getAuthType());
			ret.put("expirySeconds", r.get("expirySeconds"));
			if (code == ResultCode.QR_GENERATED)
				ret.put("qrImage", r.getQrImage());
			else
				ret.put("maskedMobile", r.getMaskedMobile() == null ? "" : r.getMaskedMobile());
		}
		else
		{
			session.removeAttribute("mfa.pwdOkUser");
			ret.put("result", "FAIL");
			ret.put("code", r == null ? "SERVICE_UNAVAILABLE" : code.name());
			ret.put("message", r == null ? "Second factor not available" : r.getMessage());
		}
	}
	System.out.println("================== End mfaInitiate Jsp ======================");
	out.print(json(ret));
%>
