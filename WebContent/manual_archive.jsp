<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="cts.*"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Manual Archive</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />

<script src="js/main.js"></script>
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
	
	String msg="";
String loginstyle="";
	try
	{
		Connection cn=null;
		cn=Configuration.getConnection();
		 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		 cn.close();
		msg=request.getParameter("msg").trim();
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on login form is null");		
	}	
		
%>
<body id="top" onload="onLoad_manual_archive()">




<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>

<div class="wrapper col3">
  <div id="container">
  <table>
   		<tr style="width:100%">
			<td colspan="2"><h2>Manual Archive !</h2>
			</td>
	  	</tr>
		
		<tr style="width:100%">
			<td style="width:30%" align="right">
				<label style="font-weight:bold">Archive from :</label>
			</td>
			<td style="width:70%" align="left">
				<input id="chk_selall" name="chk_selall" type="checkbox" onClick="toggle_manual_archive(this)" title="Select All"/>Select All<br>
				<input type="checkbox" id="chk_1" name="chk_clearing_outward" value="Clearing Outward" onclick="chk_selected_archive()">Clearing Outward<br>
				<input type="checkbox" id="chk_2" name="chk_ret_inward" value="Return Inward" onclick="chk_selected_archive()">Return Inward<br>
				<input type="checkbox" id="chk_3" name="chk_clearing_inward" value="Clearing Inward" onclick="chk_selected_archive()">Clearing Inward<br>
				<input type="checkbox" id="chk_4" name="chk_ret_outward" value="Return Outward" onclick="chk_selected_archive()">Return Outward<br>
				<input type="checkbox" id="chk_5" name="chk_responseFile" value="Response File" onclick="chk_selected_archive()">Response File<br>
				<input type="checkbox" id="chk_6" name="chk_DatabaseBackup" value="Database Backup" onclick="chk_selected_archive()">Database Backup<br>
			</td>
		</tr>
		<tr style="width:100%">
			<td style="width:30%" align="right">
				   <input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
				   <input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
			<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
			</td>
			<td style="width:70%" align="left">
				<input type="button" name="Archive" id="submitbutton" value="Archive" onclick="after_archive()" />
			</td>
	  	</tr>
  </table>
  
  </div>
</div>

<div id="footer">
<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label style="color:#059BD8; cursor:pointer;"> &nbsp;&nbsp;Logout</label> </a></p>
 -->
 	<a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
       <jsp:include page="footer.jsp"></jsp:include></div>

<%
System.out.println("Message:"+msg);
	try
	{
	if(msg.length()>0)
	{%>
	<input type="hidden" id="hdMsg1" name="hdMsg1" value="<%=msg%>"/>
	<%}
	else
	{%>
	<input type="hidden" id="hdMsg1" name="hdMsg1" value="N"/>
	<%}
	}
	catch(NullPointerException npe)
	{%>
	<input type="hidden" id="hdMsg1" name="hdMsg1" value="N"/>
	<%
	System.out.println("Message to be displayed on form is null");
	}
%>

</body>
</html>
