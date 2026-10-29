<%@ page contentType="application/json;charset=UTF-8" language="java" trimDirectiveWhitespaces="true" %>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.LinkedHashMap"%>
<%@ page import="java.util.Map"%>
<%@ page import="cts.*"%>
<%!
	/** Flat JSON object: strings escaped, numbers as is, null as null. */
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
	 * Login step 1 (CTSUSER login style). login.js posts the encrypted txt_loginid / txt_pwd here.
	 * Password OK -> session mfa.pwdOkUser = LOGINID; login.js then calls mfaInitiate.jsp.
	 * afterLogin.jsp no longer checks the password: it only accepts the user in mfa.loginOkUser.
	 * result: OK | FAIL
	 */
	System.out.println("================== In checkUserAndPassword Jsp ======================");
	response.setHeader("Cache-Control", "no-cache, private, no-store, must-revalidate, max-age=0");
	Map<String, Object> ret = new LinkedHashMap<String, Object>();
	session.removeAttribute("mfa.pwdOkUser");
	session.removeAttribute("mfa.loginOkUser");
	session.removeAttribute("mfa.pendingUser");
	session.removeAttribute("mfa.challengeId");

	String loginId = null;
	Connection cn = null;
	try
	{
		if (!"POST".equalsIgnoreCase(request.getMethod()))
			throw new IllegalArgumentException("POST only");
		String txt_loginid = CryptoKey.newdecrypt(request.getParameter("txt_loginid").trim()).trim();
		String pass = CryptoKey.newdecrypt(request.getParameter("txt_pwd").trim()).trim();

		cn = Configuration.getConnection();
		String loginstyle = Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		if ("CTSUSER".equals(loginstyle) && txt_loginid.length() > 0 && pass.length() > 0)
		{
			PreparedStatement pst = cn.prepareStatement("select LOGINID from USRMSTR_VIEW where LOGINID=? and ISACTIVE=? and USRPASS=?");
			pst.setString(1, txt_loginid);
			pst.setString(2, "Y");
			pst.setString(3, pass);
			ResultSet rs = pst.executeQuery();
			if (rs.next())
				loginId = rs.getString(1);
			rs.close();
			pst.close();
		}
		else
			System.out.println("Password login not allowed, CFG_LOGINSTYLE=" + loginstyle);
	}
	catch (Exception e)
	{
		System.out.println("====checkUserAndPassword JSP Error===" + e.toString());
	}
	finally
	{
		try { if (cn != null) cn.close(); } catch (Exception e) { }
	}

	if (loginId != null)
	{
		session.setAttribute("mfa.pwdOkUser", loginId);
		ret.put("result", "OK");
	}
	else
	{
		ret.put("result", "FAIL");
		ret.put("message", "Invalid Login or Password");
	}
	System.out.println("================== End checkUserAndPassword Jsp ======================");
	out.print(json(ret));
%>
