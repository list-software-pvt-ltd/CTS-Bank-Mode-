<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="cts.*"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Configuration</title>
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
<body id="top" onload="onLoad_config()">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>



<div class="wrapper col3">
 <div id="footer">
	 
			<form id="formid" method="post">
				 <h2>Configuration !</h2>			
			<table style="width:100%;">
				<tr>
					<td align="center">
					<div style="position:relative; width:100%;">	
						<table id="tab_conf_mast_col" style="width:100%; height:100%"  border="1">
								<tr>
									
									<td align="center" style="width:50%">Variable Name</td>
									
									<td align="center" style="width:50%">Value</td>
									
								
								</tr>
					 	 </table>
					  </div>	
					</td>
				</tr>
				<tr>
					
					<td style="width:100%" align="center">
						<div style="width:100%; height:200px;overflow:auto;">
						<table id="conf_mast" border="1">
							
						  </table>
						</div>
					</td>
				</tr>
			</table>
			<table style="width:100%;">
				<tr>
					<td><input type="button" name="Add New" id="submitbutton" value="Add New" onclick="addRows_config('conf_mast')" />
					</td>
					<td>
					<input type="button" name="Save" id="submitbutton" value="Save" onclick="onSave_config()" />
					<!--<input type="button" id="submitbutton" name="Reset" value="Reset"  onClick="onReset_config()"/>-->
					</td>
				</tr>
			</table>
							
							<input type="hidden" id="rcnt" name="rcnt" value="1" />
	<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
					  <input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
					  </form>
						
								
		</div>
	
 
</div>

<div id="footer">
		<!-- <p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a><br/></p>
			Version 2017.1.0<br/> -->
			<a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
			 <jsp:include page="footer.jsp"></jsp:include>
</div>

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
