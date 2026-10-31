<%@ page contentType="text/html;charset=UTF-8" language="java" trimDirectiveWhitespaces="true" %>
<%@ page import="com.list.mfa.core.Mfa"%>
<%@ page import="com.list.mfa.core.MfaAdmin"%>
<%@ page import="java.net.URLEncoder"%>
<%@ page import="java.security.MessageDigest"%>
<%@ page import="java.security.SecureRandom"%>
<%@ page import="java.util.Base64"%>
<%@ page import="java.util.List"%>
<%!
	/*
	 * MFA admin page (mfa-core). One page for every app: users, their factor per app, status, user import.
	 * Protected by mfa.admin.password from mfa.properties; disabled when that is not set.
	 * Works on javax and jakarta containers (implicit objects only). All changes are audited in MFA_AUDIT.
	 */
	static final String OK = "mfa.admin.ok";
	static final String CSRF = "mfa.admin.csrf";
	static final String FLASH = "mfa.admin.flash";
	static final SecureRandom RANDOM = new SecureRandom();

	static String h(Object o)
	{
		if (o == null) return "";
		String s = o.toString();
		StringBuilder b = new StringBuilder(s.length() + 16);
		for (int i = 0; i < s.length(); i++)
		{
			char c = s.charAt(i);
			switch (c)
			{
				case '&': b.append("&amp;"); break;
				case '<': b.append("&lt;"); break;
				case '>': b.append("&gt;"); break;
				case '"': b.append("&quot;"); break;
				case '\'': b.append("&#39;"); break;
				default: b.append(c);
			}
		}
		return b.toString();
	}

	static String u(String s) throws java.io.UnsupportedEncodingException
	{
		return URLEncoder.encode(s == null ? "" : s, "UTF-8");
	}

	static String sel(String a, String b)
	{
		return a != null && a.equals(b) ? " selected" : "";
	}
%>
<%
	response.setHeader("Cache-Control", "no-cache, private, no-store, must-revalidate, max-age=0");
	response.setHeader("X-Frame-Options", "DENY");
	request.setCharacterEncoding("UTF-8");

	String ip = request.getRemoteAddr();
	String q = request.getParameter("q") == null ? "" : request.getParameter("q").trim();
	String purpose = "AUTHORIZE".equals(request.getParameter("purpose")) ? "AUTHORIZE" : "LOGIN";
	String back = "mfaAdmin.jsp?q=" + u(q) + "&purpose=" + u(purpose);

	MfaAdmin admin = null;
	String fatal = null;
	try
	{
		admin = Mfa.admin();
	}
	catch (Exception e)
	{
		fatal = "MFA is not configured: " + e.getMessage();
	}
	boolean enabled = admin != null && admin.isEnabled();
	boolean post = "POST".equalsIgnoreCase(request.getMethod());
	String action = post ? request.getParameter("action") : null;
	String error = null;

	if (enabled && "login".equals(action))
	{
		if (admin.checkPassword(request.getParameter("password"), ip))
		{
			request.changeSessionId();
			byte[] t = new byte[32];
			RANDOM.nextBytes(t);
			session.setAttribute(OK, Boolean.TRUE);
			session.setAttribute(CSRF, Base64.getUrlEncoder().withoutPadding().encodeToString(t));
			response.sendRedirect(back);
			return;
		}
		error = "Wrong password";
	}
	else if ("logout".equals(action))
	{
		session.removeAttribute(OK);
		session.removeAttribute(CSRF);
		response.sendRedirect("mfaAdmin.jsp");
		return;
	}

	boolean loggedIn = enabled && Boolean.TRUE.equals(session.getAttribute(OK));

	if (loggedIn && action != null && !"login".equals(action))
	{
		String token = (String) session.getAttribute(CSRF);
		String given = request.getParameter("csrf");
		String flash;
		if (token == null || given == null || !MessageDigest.isEqual(token.getBytes("UTF-8"), given.getBytes("UTF-8")))
		{
			flash = "!Form expired, please try again";
		}
		else
		{
			try
			{
				String user = request.getParameter("user");
				if ("setAuth".equals(action))
				{
					String app = request.getParameter("app");
					String type = request.getParameter("authType");
					admin.setAuth(user, app, purpose, type, ip);
					flash = user + " / " + app + " / " + purpose + ": " + (type == null || type.isEmpty() ? "not enrolled" : type);
				}
				else if ("status".equals(action))
				{
					boolean active = "A".equals(request.getParameter("status"));
					admin.setStatus(user, active, ip);
					flash = user + ": " + (active ? "activated" : "deactivated");
				}
				else if ("mobile".equals(action))
				{
					admin.setMobile(user, request.getParameter("mobile"), ip);
					flash = user + ": mobile no saved";
				}
				else if ("device".equals(action))
				{
					admin.setDevice(user, request.getParameter("device"), ip);
					flash = user + ": QR device id saved";
				}
				else if ("addUser".equals(action))
				{
					String mobile = request.getParameter("mobile");
					String device = request.getParameter("device");
					boolean hasMobile = mobile != null && !mobile.trim().isEmpty();
					boolean hasDevice = device != null && !device.trim().isEmpty();
					if (!hasMobile && !hasDevice)
						admin.addUser(user, ip);
					if (hasMobile)
						admin.setMobile(user, mobile, ip);
					if (hasDevice)
						admin.setDevice(user, device, ip);
					flash = user + ": saved (enrol the user for an app below)";
				}
				else if ("import".equals(action))
				{
					MfaAdmin.ImportResult r = admin.importFromCbs(request.getParameter("enrollApp"), purpose,
							request.getParameter("enrollAuthType"), ip);
					flash = "Import: " + r.getRead() + " read, " + r.getInserted() + " added, " + r.getUpdated()
							+ " updated, " + r.getUnchanged() + " unchanged, " + r.getSkipped() + " skipped, "
							+ r.getEnrolled() + " enrolled";
				}
				else if ("bulkAuth".equals(action))
				{
					String app = request.getParameter("app");
					String type = request.getParameter("authType");
					int n = admin.setAuthForAll(q, app, purpose, type, ip);
					flash = n + " users" + (q.isEmpty() ? "" : " matching " + q) + " / " + app + " / " + purpose + ": "
							+ (type == null || type.isEmpty() ? "not enrolled" : type);
				}
				else
				{
					flash = "!Unknown action";
				}
			}
			catch (IllegalArgumentException | IllegalStateException e)
			{
				flash = "!" + e.getMessage();
			}
		}
		// Post / redirect / get: a browser refresh never repeats the change
		session.setAttribute(FLASH, flash);
		response.sendRedirect(back);
		return;
	}

	String flash = (String) session.getAttribute(FLASH);
	session.removeAttribute(FLASH);
	String csrf = (String) session.getAttribute(CSRF);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MFA Admin</title>
<style>
	body { font-family: Segoe UI, Arial, sans-serif; font-size: 14px; margin: 0; background: #f4f6f8; color: #222; }
	header { background: #1f3b57; color: #fff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; }
	header h1 { font-size: 18px; margin: 0; }
	main { padding: 16px 20px; }
	.card { background: #fff; border: 1px solid #dde2e7; border-radius: 6px; padding: 12px 16px; margin-bottom: 14px; }
	.ok { background: #e7f6ec; border-color: #9fd6b0; }
	.err { background: #fdecea; border-color: #f2b8b1; }
	table { border-collapse: collapse; width: 100%; background: #fff; }
	th, td { border: 1px solid #dde2e7; padding: 5px 8px; text-align: left; vertical-align: middle; }
	th { background: #eef1f4; }
	tr.inactive td { color: #999; }
	form.inline { display: inline; margin: 0; }
	input, select, button { font-size: 13px; padding: 3px 6px; }
	button { cursor: pointer; }
	.muted { color: #777; }
</style>
</head>
<body>
<header>
	<h1>MFA Admin</h1>
	<% if (loggedIn) { %>
	<form method="post" class="inline"><input type="hidden" name="action" value="logout"><button>Logout</button></form>
	<% } %>
</header>
<main>
<% if (fatal != null) { %>
	<div class="card err"><%= h(fatal) %></div>
<% } else if (!enabled) { %>
	<div class="card">The admin page is disabled. Set <b>mfa.admin.password</b> in mfa.properties and restart.</div>
<% } else if (!loggedIn) { %>
	<div class="card" style="max-width:360px">
		<form method="post" autocomplete="off">
			<input type="hidden" name="action" value="login">
			<p><label>Admin password<br><input type="password" name="password" size="30" autofocus required></label></p>
			<button>Login</button>
			<% if (error != null) { %><span style="color:#b00020">&nbsp;<%= h(error) %></span><% } %>
		</form>
	</div>
<% } else {
	List<String> apps;
	List<MfaAdmin.User> users;
	int total;
	try
	{
		apps = admin.appCodes();
		users = admin.listUsers(q, 1000);
		total = admin.countUsers();
	}
	catch (IllegalStateException e)
	{
		apps = java.util.Collections.emptyList();
		users = java.util.Collections.emptyList();
		total = 0;
		flash = "!" + e.getMessage();
	}
%>
	<% if (flash != null) { boolean bad = flash.startsWith("!"); %>
	<div class="card <%= bad ? "err" : "ok" %>"><%= h(bad ? flash.substring(1) : flash) %></div>
	<% } %>

	<div class="card">
		<form method="get" class="inline">
			<label>User code <input name="q" value="<%= h(q) %>" size="20"></label>
			<label>Purpose
				<select name="purpose">
					<option<%= sel("LOGIN", purpose) %>>LOGIN</option>
					<option<%= sel("AUTHORIZE", purpose) %>>AUTHORIZE</option>
				</select>
			</label>
			<button>Search</button>
		</form>
		<span class="muted">&nbsp; showing <%= users.size() %> of <%= total %> users (max 1000)</span>
	</div>

	<div class="card">
		<form method="post" class="inline" autocomplete="off">
			<input type="hidden" name="action" value="addUser">
			<input type="hidden" name="csrf" value="<%= h(csrf) %>">
			<b>Add / update user</b> (a value the source system has can't be changed here; leave both blank to add a user for NO_AUTH):
			<label>&nbsp;User code <input name="user" size="14" maxlength="50" required></label>
			<label>&nbsp;Mobile no <input name="mobile" size="14" maxlength="16" inputmode="tel"></label>
			<label>&nbsp;QR device id <input name="device" size="16" maxlength="100"></label>
			<button>Save</button>
		</form>
	</div>

	<% if (admin.isImportAvailable()) { %>
	<div class="card">
		<form method="post" class="inline" onsubmit="return confirm('Import users now?');">
			<input type="hidden" name="action" value="import">
			<input type="hidden" name="csrf" value="<%= h(csrf) %>">
			<b>Import users</b>: every user returned by the configured import query that has a mobile no or a QR device id (existing users: mobile / device refreshed, status kept).
			<label>&nbsp;Also enrol for
				<select name="enrollApp">
					<option value="">(no enrolment)</option>
					<% for (String a : apps) { %><option value="<%= h(a) %>"><%= h(a) %></option><% } %>
				</select>
				<%= h(purpose) %> as
				<select name="enrollAuthType">
					<option value="">QR if device id, else SMS</option>
					<% for (String t : MfaAdmin.AUTH_TYPES) { %><option><%= t %></option><% } %>
				</select>
				(existing rows untouched)
			</label>
			<button>Import</button>
		</form>
	</div>
	<% } %>

	<% if (!apps.isEmpty()) { %>
	<div class="card">
		<form method="post" class="inline" onsubmit="return confirm('Change the factor for every <%= q.isEmpty() ? "" : "matching " %>user?');">
			<input type="hidden" name="action" value="bulkAuth">
			<input type="hidden" name="csrf" value="<%= h(csrf) %>">
			<b>Bulk set</b> for <%= q.isEmpty() ? "all users" : "all users matching <b>" + h(q) + "</b>" %>:
			<select name="app"><% for (String a : apps) { %><option value="<%= h(a) %>"><%= h(a) %></option><% } %></select>
			/ <%= h(purpose) %> to
			<select name="authType">
				<% for (String t : MfaAdmin.AUTH_TYPES) { %><option<%= sel(t, "NO_AUTH") %>><%= t %></option><% } %>
				<option value="">- not enrolled -</option>
			</select>
			<button>Apply</button>
		</form>
	</div>
	<% } %>

	<table>
		<tr>
			<th>User code</th><th>Mobile</th><th>QR device</th><th>Status</th>
			<% for (String a : apps) { %><th><%= h(a) %> / <%= h(purpose) %></th><% } %>
		</tr>
		<% for (MfaAdmin.User usr : users) { %>
		<tr class="<%= usr.isActive() ? "" : "inactive" %>">
			<td><%= h(usr.getUserCode()) %></td>
			<td>
				<form method="post" class="inline" autocomplete="off">
					<input type="hidden" name="action" value="mobile">
					<input type="hidden" name="csrf" value="<%= h(csrf) %>">
					<input type="hidden" name="user" value="<%= h(usr.getUserCode()) %>">
					<%= usr.getMaskedMobile() == null ? "<span class=\"muted\">none</span>" : h(usr.getMaskedMobile()) %>
					<input name="mobile" size="11" maxlength="16" inputmode="tel" placeholder="<%= usr.getMaskedMobile() == null ? "add" : "change" %>" required>
					<button>Save</button>
				</form>
			</td>
			<td>
				<form method="post" class="inline" autocomplete="off">
					<input type="hidden" name="action" value="device">
					<input type="hidden" name="csrf" value="<%= h(csrf) %>">
					<input type="hidden" name="user" value="<%= h(usr.getUserCode()) %>">
					<%= usr.getDeviceId() == null ? "<span class=\"muted\">none</span>" : h(usr.getDeviceId()) %>
					<input name="device" size="11" maxlength="100" placeholder="<%= usr.getDeviceId() == null ? "add" : "change" %>" required>
					<button>Save</button>
				</form>
			</td>
			<td>
				<form method="post" class="inline">
					<input type="hidden" name="action" value="status">
					<input type="hidden" name="csrf" value="<%= h(csrf) %>">
					<input type="hidden" name="user" value="<%= h(usr.getUserCode()) %>">
					<input type="hidden" name="status" value="<%= usr.isActive() ? "I" : "A" %>">
					<%= usr.isActive() ? "Active" : "Inactive" %>
					<button><%= usr.isActive() ? "Deactivate" : "Activate" %></button>
				</form>
			</td>
			<% for (String a : apps) { String cur = usr.authFor(a, purpose); %>
			<td>
				<form method="post" class="inline">
					<input type="hidden" name="action" value="setAuth">
					<input type="hidden" name="csrf" value="<%= h(csrf) %>">
					<input type="hidden" name="user" value="<%= h(usr.getUserCode()) %>">
					<input type="hidden" name="app" value="<%= h(a) %>">
					<select name="authType">
						<option value=""<%= cur == null ? " selected" : "" %>>- not enrolled -</option>
						<% for (String t : MfaAdmin.AUTH_TYPES) { %><option<%= sel(t, cur) %>><%= t %></option><% } %>
					</select>
					<button>Save</button>
				</form>
			</td>
			<% } %>
		</tr>
		<% } %>
		<% if (users.isEmpty()) { %><tr><td colspan="<%= 4 + apps.size() %>" class="muted">No users. Import them from the source system.</td></tr><% } %>
	</table>
	<% if (apps.isEmpty()) { %><p class="muted">No apps yet: add codes to <b>mfa.admin.apps</b> (e.g. EFT,AML) in mfa.properties.</p><% } %>
<% } %>
</main>
</body>
</html>
