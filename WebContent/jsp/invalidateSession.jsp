<%@page import="java.sql.*"%>
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>
<%@page import="cts.*"%>
<%!
String logistyle,flag="";
%>
<%
	System.out.println("In invalidateSession.jsp..............");
	try
	{ 
		
		
		//String newstr=session.getAttribute("session_loginstyle").toString();
		System.out.println("Session invalidated");
		logistyle=(String)request.getParameter("loginstyle");
		//System.out.print("logistyle====="+logistyle);
		flag=(String)request.getParameter("flag");
		//System.out.print("flag====="+flag);
		
		/*if(logistyle.equals("CUSTODIAN"))
		{
			response.sendRedirect("../invalidcredentials.jsp?msg=Logout Successfully.");
		}
		else{
			response.sendRedirect("../index.jsp");
		}*/
		request.getSession().invalidate();
	}
	catch(Exception e)
	{
		
		System.out.print("Exxxxxxxxxxxxxxxxxx"+e);
	}
%>
<html>
<script language="javascript">
function Forward()
{
var logistyle=document.getElementById("logistyle").value;
	if(logistyle=="CUSTODIAN")
	{
		document.getElementById("formid").action="../invalidcredentials.jsp?msg=Logout Successfully.";
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();
	}
	else{
		document.getElementById("formid").action="../login.jsp";
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();
	}
}	
</script>
<body onLoad="Forward()">
<form id="formid" name="formid" method="post">
<input type="hidden" id="logistyle" name="logistyle" value="<%=logistyle%>">
<input type="hidden" id="flag" name="flag" value="<%=flag%>">
</form>
</body>
</html>