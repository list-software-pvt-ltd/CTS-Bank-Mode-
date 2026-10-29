<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/crypto-js.min.js"></script>
<script src="js/login.js"></script>
<script type="text/javascript">

 	window.history.forward();
	function noBack()                     
	{
		window.history.forward();
	} 
</script>
</head>
<%@page import="cts.*"%>
<%@page import="java.sql.*"%>
<%
          String loginstyle;
          Connection cn=Configuration.getConnection();
          if(cn==null)
          {
              application.log("Unable to load login style because the database connection is unavailable.");
              response.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE, "Login service is temporarily unavailable.");
              return;
          }
          try(Connection loginConnection=cn)
          {
              loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", loginConnection);
          }
          catch(SQLException e)
          {
              application.log("Unable to finish loading login style from the database.", e);
              response.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE, "Login service is temporarily unavailable.");
              return;
          }
          if("CUSTODIAN".equals(loginstyle))
          {
        	  response.sendRedirect("invalidcredentials.jsp?msg=Your Session Has Been Expired. Please Login Again.");
              return;
          }
          
	String msg="",flag="";
	System.out.println(" on login form");
	try
	{
		flag=request.getParameter("flag").trim();
		System.out.println("flag======"+flag);	
		if(flag==null || flag.equals("null"))
		{
			response.sendRedirect("invalidcredentials.jsp?msg=Your Session Has Been Expired. Please Login Again.");
		}
	}
	catch(NullPointerException npe)
	{
		System.out.println("flag to be displayed on login form is null");	
		response.sendRedirect("invalidcredentials.jsp?msg=Your Session Has Been Expired. Please Login Again.");
	}
	try
	{
		msg=request.getParameter("msg").trim();
		
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on login form is null");		
	}	
		

	
		
%>
<!--<body id="top" onload="noBack();" onpageshow="if (event.persisted) noBack();" onunload="">
<body id="top" onload="doOnLoad()" onpageshow="if (event.persisted) noBack();" onunload="" style="">
-->
<body id="top" onload="doOnLoad()" style="">
<div class="wrapper col1">
	  <div id="header">
		<div id="logo">
		<table style="border-color: #E3F1F9">
	<tr>
			<td style="border-color: #E3F1F9" >
				 <img src="images/emtech.png" style="height:115px;  width: 120px"/><br/>
			</td>
			
			<td style="border-color: #E3F1F9; "  >
				  	<label style="font-size: medium;color:#E3F1F9  ">Cheque Truncation System</label>	<br/>
					<label style="font-size: xx-large; ">CTS </label><br/>
					<label style="font-size:small ; ">Cheque Truncation System</label>				
			</td>
	</tr>
		 
		  </table>
		</div>
		
		<br class="clear" />
		</div>
</div>


<noscript style="font-family:'Times New Roman', Times, serif;font-size:18px">
	Go to Browser Setting and Allow all sites to run JavaScript (recommended)
</noscript>
<div style="background-image: url(images/List_Background.jpg); background-size: 100% 170%; background-repeat: no-repeat;">
  <div id="footer" >
    <div id="login"style="height:450px">
   			   <h2>Emerging Technologies</h2>
   			   
    		 
				  <form id="formid" name="formid" method="post">
					<fieldset>
					  <legend>Client Login</legend>
					 	 <div class="fl_left">
					  
								<label class="hidden-label" for="txt_loginid" >Enter Login ID</label>
								<input id="txt_loginid" name="txt_loginid" type="text"  placeholder="Enter Login ID"   value="" spellcheck="false"  style="background-color: #E3F1F9;color: black;">
					
								<label class="hidden-label" for="txt_pwd">Enter Password</label>
								<input id="txt_pwd" name="txt_pwd" type="password" placeholder="Enter Password" value="" class="" onpaste="return false;" maxlength="15" size="8" autocomplete="off" style="background-color: #E3F1F9;color: black;">
							<!--	<input id="txt_pwd" name="txt_pwd" type="password" placeholder="Enter Password" class="">-->
					   <!--
					   
					   <input type="text" id="txt_loginid" value="Enter Login ID&hellip;"  onfocus="this.value=(this.value=='Enter Login ID&hellip;')? '' : this.value ;" />
					   
					   <input type="text" id="txt_pwd" value="Enter Password&hellip;"  onfocus="this.value=(this.value=='Enter Password&hellip;')? '' : this.value ;this.setAttribute('type','password');"/>
					   -->
					  </div>
					 
					 <div class="fl_right" >
					  
						<input type="button" style="background: #E3F1F9;color: black;"  name="login_go" id="login_go" value="&raquo;" onclick="afterLogin()"/>
					  </div> 
					</fieldset>
					
						<!-- <a href="forgot_password.jsp"><label style="cursor:pointer;">Forgot Password?</label></a> -->
					
					  
					  
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
	<input type="hidden" id="flag" name="flag" value="<%=flag%>"/>
				  </form>
				  <!-- Second factor (mfa-core): shown by login.js after the password check, in place of the form -->
				  <div id="mfaPanel" style="display:none">
					<fieldset>
					  <legend>Second Factor</legend>
					  <div id="mfaQrBox" style="display:none; margin-bottom:10px;">
						<img id="mfaQrImage" alt="QR code" width="250" height="250" style="background-color:white; padding:4px;"/>
					  </div>
					  <p id="mfaHint" style="margin-bottom:10px;"></p>
					  <div style="display: flex; align-items: center;">
						<label class="hidden-label" for="mfa_otp">Enter OTP</label>
						<input id="mfa_otp" name="mfa_otp" type="text" placeholder="Enter OTP" value="" maxlength="10" inputmode="numeric" autocomplete="one-time-code" style="background-color: #E3F1F9;color: black;">
					  </div>
					  <div style="margin-top:10px;">
						<input type="button" id="mfa_verify" value="Verify" onclick="verifyMfaOtp()"/>
						<input type="button" id="mfa_cancel" value="Cancel" onclick="cancelMfa()"/>
					  </div>
					</fieldset>
				  </div>
     <!-- <p><a href="#">&raquo; Lost Your Password</a> | <a href="#">Create An Account &raquo;</a></p>-->
    </div>
	
	 <div class="footbox" >
      <h2 style="color: black;">Contact</h2>
      	<ul style="color: black;">
			LIST Software Pvt. Ltd.
			An ISO 9001:2008 Company 
			
			Sangli :
			Rahul Complex. Opp. Tata Petrol Pump,
			Guest House, Vishrambag,
			Sangli - 416 415.
			<!-- Ph.: (0233) 2303221, 2304306, 2304857. -->
		</ul>
    </div>
	
   
    <br class="clear" />
  </div>
</div>

<div id="footer">
 <jsp:include page="footer.jsp"></jsp:include>

		
</div>
</body>
</html>
