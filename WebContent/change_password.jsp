<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="cts.*"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Change Password</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="js/jquery-1.11.3.min.js"></script>
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
<body id="top" onload="onload_change_pwd()" >

<!--<form name="formid" id="formid"  method="post">	-->


<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>



<div class="wrapper col3">
 <div id="container">
	 <div id="content">
		
				  <h2>Change Password !</h2>
				  <p>Clients can change their passwords here.</p>
				  <br />
					  
						<fieldset>
								<legend>Change Password</legend>
								<table style="width:100%" align="center">
									<tr style="width:100%">
										<td align="right" style="width:50%">
											<label>Current Password :</label>
										</td>
										<td style="width:50%">
											<input type="password" id="user_pass"  name="user_pass" onpaste="return false;" autocomplete="off"/>
										</td>
									</tr>
									
									<tr style="width:100%">
										<td align="right"  style="width:50%">
											<label>New Password :</label>
										</td>
										<td  style="width:50%">
											<input type="password" id="new_user_pass"  name="new_user_pass" onpaste="return false;" autocomplete="off"/>
										</td>
									</tr>
								
									<tr style="width:100%">
										<td align="right"  style="width:50%">
											<label>Re-New Password :</label>
										</td>
										<td  style="width:50%">
											<input type="password" id="re_new_user_pass"  name="re_new_user_pass" onpaste="return false;" autocomplete="off"/>
										</td>
									</tr>
									<tr style="width:100%">
										<td align="right">
										<input type="button" value="Reset" id="submitbutton" onClick="afterReset_chng_pwd()" title="Reset" >	
										</td>
										<td>
											<input type="button" name="Change Password" id="submitbutton" value="Change Password" onclick="after_change_pwd()" />
										</td>
									</tr>
								</table>
							</fieldset>
							
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
	
				
		
		</div>
		
	   <input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
	   	<input type="hidden" id="loginstyle" name=""loginstyle"" value="<%=loginstyle%>"/>
		<br class="clear" />
	  
		
  </div>
</div>

<div id="footer">
		<!-- <p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer;">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label style="color:#059BD8; cursor:pointer;"> &nbsp;&nbsp;Logout</label> </a><br/></p>
			Version 2017.1.0<br/> -->
			<!-- <a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a> -->
			 <jsp:include page="footer.jsp"></jsp:include>
</div>


</body>
</html>
