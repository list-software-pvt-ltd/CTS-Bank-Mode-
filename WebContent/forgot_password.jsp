<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />

<script src="js/forgot_password.js"></script>
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
<body id="top" onLoad="doOnLoad()">
<div class="wrapper col1">
	  <div id="header">
		<div id="logo">
		  <h1><a href="#">CTS</a></h1>
		  <p><strong>Cheque Truncation System</strong></p>
		  <br />
		 <img src="images/LIST LOGO NEW.JPG" style="height:100%;width:100%"/>
		</div>
		
		<br class="clear" />
		</div>
</div>



<div class="wrapper col6">
  <div id="footer">
    <div>
   			  <h2>Get Password !</h2>
    		  <p>Clients can recover their passwords here.</p>
				  <form id="formid" method="post">
					<fieldset>
					  		<legend>Get Password</legend>
							<table style="width:100%">
								<tr style="width:100%">
									<td align="right" style="width:50%">
										<label>Login ID</label>
									</td>
									<td style="width:50%">
										<input type="text" id="txt_loginid"  name="txt_loginid"/>
									</td>
								</tr>
								
								<tr style="width:100%">
									<td align="right"  style="width:50%">
										<label>Email ID</label>
									</td>
									<td  style="width:50%">
										<input type="text" id="txt_emailid"  name="txt_emailid"/>
									</td>
								</tr>
							
								<tr style="width:100%">
									<td  style="width:50%">
									<input type="button" value="&laquo;" id="forgot_pass" onClick="afterBack()" title="Back">	
									</td>
									<td  style="width:50%" >
										<input type="button" name="Get Password" id="forgot_pass" value="Get Password" onclick="after_get_pwd()" />
									</td>
								</tr>
							</table>
							
						</fieldset>
						<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
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

				  </form>
    
    </div>
	
   
    <br class="clear" />
  </div>
</div>

<div id="footer">

<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF">LIST Software Pvt. Ltd.</label></a></p>
 -->
 <a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
  <jsp:include page="footer.jsp"></jsp:include></div>
</body>
</html>
