<%@ page import="java.io.*,java.util.*,cts.DbUtil,java.sql.Connection"%>
<%@ page import="java.sql.Statement,java.sql.ResultSet,java.sql.SQLException,org.json.JSONObject"%>
<%@page import="org.apache.commons.io.FileUtils,java.text.*,java.sql.*,list.cbsuser.*" %>
<%@page import="cts.*" %>
<%!
String name="",fromAt="";
%>
<%

	//System.out.println(request.getRemoteHost());
	System.out.println(request.getRemoteAddr());
	String ip=request.getRemoteAddr(); //request.getParameter("ip");
	String sessionid = request.getParameter("session_id");
	String loginAt=request.getParameter("loginAt");
	String retstr="";
	System.out.println("session id "+sessionid);
	System.out.println("session ip "+ip);
	System.out.println("session loginAt "+loginAt);
	String path=request.getRealPath("/");
	System.out.println(" path "+path);
	try 
	{
		Connection con=DbUtil.getPolyConnection();
		UserValidation uv=new UserValidation();
		JSONObject retobj=new JSONObject();

		retobj=uv.CBSValidation(Integer.parseInt(sessionid), ip,con);
		//retobj=uv.CBSValidation(Integer.parseInt(sessionid), ip, loginAt);
		
		String respcode=retobj.getString("RESPCODE");
		
		//retstr=retobj.toString(); 
		if(respcode.equalsIgnoreCase("0"))
		{
			//response.sendRedirect("login.jsp?retStr="+respcode);
			name=retobj.getString("USM_ID");
			// MFA: the user already logged in at CBS, so jsp/afterLogin.jsp accepts this user without a second factor
			session.setAttribute("mfa.loginOkUser", name);
			//response.sendRedirect("jsp/afterLogin.jsp?name="+name);
		}
		else
		{
			response.sendRedirect("invalidcredentials.jsp?msg=Invalid Login or Password");
		}
		
	}
	catch (Exception e) 
	{
		e.printStackTrace();
	}
	
%>
<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="jsp/afterLogin.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();
}

</script>
<body onLoad="Forward()">
<form id="formid" name="formid">
	<input type="hidden" id="name" name="name" value="<%=name%>">
	<input type="hidden" id="flag" name="flag" value="CTSFLAG">
</form>
</body>
</html>
