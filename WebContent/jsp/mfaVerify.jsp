<%@ page contentType="application/json;charset=UTF-8" language="java" trimDirectiveWhitespaces="true" %>
<%@ page import="java.util.LinkedHashMap"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.list.mfa.core.Mfa"%>
<%@ page import="com.list.mfa.core.MfaResult"%>
<%@ page import="com.list.mfa.core.MfaService"%>
<%@ page import="com.list.mfa.core.ResultCode"%>
<%!
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
	 * Second factor, step 2. Checks the code typed on the OTP panel (POST otp).
	 * result: LOGIN (verified) | RETRY (wrong code, same challenge) | FAIL (start the login again)
	 */
	System.out.println("================== In mfaVerify Jsp ======================");
	response.setHeader("Cache-Control", "no-cache, private, no-store, must-revalidate, max-age=0");
	Map<String, Object> ret = new LinkedHashMap<String, Object>();
	String userId = (String) session.getAttribute("mfa.pendingUser");
	String challengeId = (String) session.getAttribute("mfa.challengeId");

	if (!"POST".equalsIgnoreCase(request.getMethod()) || userId == null || challengeId == null)
	{
		ret.put("result", "FAIL");
		ret.put("code", "NO_PENDING_CHALLENGE");
		ret.put("message", "Please login again");
	}
	else
	{
		MfaResult v;
		try
		{
			v = Mfa.get().verify(challengeId, request.getParameter("otp"), request.getRemoteAddr());
		}
		catch (Exception e)
		{
			System.out.println("====mfaVerify JSP Error===" + e.toString());
			v = null;
		}
		System.out.println("MFA verify " + userId + " -> " + v);
		ResultCode code = v == null ? null : v.getCode();

		// The challenge must belong to this user and be a LOGIN challenge
		boolean mine = v != null && userId.equals(v.get("externalUserId")) && MfaService.LOGIN.equals(v.get("purpose"));

		if (code == ResultCode.VERIFIED && mine)
		{
			session.removeAttribute("mfa.pendingUser");
			session.removeAttribute("mfa.challengeId");
			session.removeAttribute("mfa.pwdOkUser");
			session.setAttribute("mfa.loginOkUser", userId);
			ret.put("result", "LOGIN");
		}
		else if (code == ResultCode.INVALID_OTP || code == ResultCode.BAD_REQUEST)
		{
			// Wrong or malformed code: same challenge, let the user type again
			ret.put("result", "RETRY");
			ret.put("attemptsLeft", v.getAttemptsLeft());
			ret.put("message", v.getMessage());
		}
		else
		{
			// EXPIRED / LOCKED / ALREADY_USED / CHALLENGE_NOT_FOUND / user mismatch / error
			session.removeAttribute("mfa.pendingUser");
			session.removeAttribute("mfa.challengeId");
			session.removeAttribute("mfa.pwdOkUser");
			ret.put("result", "FAIL");
			ret.put("code", v == null ? "SERVICE_UNAVAILABLE" : code == ResultCode.VERIFIED ? "USER_MISMATCH" : code.name());
			ret.put("message", v == null ? "Second factor not available"
					: code == ResultCode.VERIFIED ? "Challenge does not belong to this user" : v.getMessage());
		}
	}
	System.out.println("================== End mfaVerify Jsp ======================");
	out.print(json(ret));
%>
