<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="cts.*"%>
<%@page import="java.sql.*"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Create User</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/main.js"></script>
</head>
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
<body id="top" onload="onLoad_createUser()">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>



<div class="wrapper col3">
 <div id="container" style="top:0%">
		
				  <h2>Create User</h2>				  
					  <center>
						<fieldset>								
								<table style="width:100%" align="center" cellpadding="0%" cellspacing="0%">
									<tr style="width:100%" >
										<td align="right" style="width:50%" >
										<input type="hidden" id="isUpdateOrInsert" name="isUpdateOrInsert" />
											<label><font color="#FF0000">*</font>Login Id:</label>
										</td>
										<td style="width:50%" >
									<select id="opt_Login_id" name="opt_Login_id" onchange="onChange_LoginIdChage()">
											 <!--  <option value="0">-- Select Login ID--</option>	 -->								
										</select>				
										<input type="text" id="txtLogin"  name="txtLogin" onpaste="return false;" autocomplete="off"/>
										</td>
                 </tr>
									<!-- </tr>
										 <tr style="width:100%">
										<td align="right" style="width:50%">
											<label id="idnew"><font color="#FF0000">*</font>New Id:</label>
										</td>
										<td style="width:50%">
						
										</td>
										
										
									</tr>  -->
									<tr style="width:100%">
										<td align="right"  style="width:50%">
											<label>User Name :</label>
										</td>
										<td  style="width:50%">
										<input type="text" id="txtusername"  name="txtusername" onpaste="return false;" autocomplete="off"/>
																					</td>
									</tr> 
							 	<tr style="width:100%">
										<td align="right"  style="width:50%">
											<label><font color="#FF0000">*</font>Is Active :</label>
										</td>
										<td  style="width:50%">
											<input type="checkbox" id="chkyes" name="chkyes"  onclick="checkyfunction()" value="Y">Yes<!-- clearGroup(this); onclick="checkyfunction(this)onClick="checknFunction(this);""-->
									       <input type="checkbox" id="chkno"  name="chkno" onclick="checknFunction(this)" value="N" >No
											<!-- <input type="text" id="txtisactive"  name="txtisactive" onpaste="return false;" autocomplete="off"/> -->
										</td>
									</tr> 
								
									<!-- <tr style="width:100%">
										<td align="right"  style="width:50%">
											<label><font color="#FF0000">*</font>Confirm Password :</label>
										</td>
										<td  style="width:50%">
											<input type="password" id="txtCfgPassward"  name="txtCfgPassward" onpaste="return false;" autocomplete="off"/>
										</td>
									</tr> -->
									
									<!-- Brn code -->
									<tr style="width:100%">
										<td align="right" style="width:50%">
											<label><font color="#FF0000">*</font>Branch Code:</label>
										</td>
										<td style="width:50%">
											<!--<input type="text" id="txtBRNCD"  name="txtBRNCD" onpaste="return false;" autocomplete="off"/>-->
										<select id="opt_branch_code" name="opt_branch_code">
											  <option value="0">-- Select Branch --</option>									
										</select>
										</td>
									</tr>
									<!-- -->
									
									<!-- User Role -->
									<tr style="width:100%">
										<td align="right" style="width:50%">
											<label><font color="#FF0000">*</font>User Role:</label>
										</td>
										<td style="width:50%">
<!--											<input type="text" id="txtUserRole"  name="txtUserRole" onpaste="return false;" autocomplete="off"/>-->
									<input type="checkbox" id="chkAdmin" name="chkAdmin" value="A">Admin
									<input type="checkbox" id="chkChecker" name="chkChecker" value="C">Checker
									<input type="checkbox" id="chkMaker" name="chkMaker" value="M">Maker
										</td>
									</tr>
									<!-- -->
									
									<!-- Email  -->
									<tr style="width:100%">
										<td align="right" style="width:50%">
										<label><font color="#FF0000">*</font><label>Email:</label>
										</td>
										<td style="width:50%">
											<input type="text" id="txtEmail"  name="txtEmail" onpaste="return false;" autocomplete="off"/>
										</td>
									</tr>
									<!-- -->
									
									<tr style="width:100%">										
										<td align="right">
											<input type="button" name="btnSubmit" id="submitbutton" value="Save User" onclick="after_create_user()" />
										</td>
										<td align="left">
										<input type="button" value="Reset" id="submitbutton" onClick="afterReset_create_user()" title="Reset" >	
										</td>
									</tr>
									
									
								</table>
							</fieldset>
				</center>		
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
								<input type="hidden" id="isactive" name="isactive" value="N"/>
								<%}
								}
								catch(NullPointerException npe)
								{%>
								<input type="hidden" id="hdMsg1" name="hdMsg1" value="N"/>
								<%
								System.out.println("Message to be displayed on form is null");
								}
							%>
	
				
		
	
		
	   <input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
	    	<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
	    	<input type="hidden" id="isactive" name="isactive"" value="N"/>
		<br class="clear" />
	  
		
  </div>
</div>

<div id="footer">
<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer;">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label style="color:#059BD8; cursor:pointer;"> &nbsp;&nbsp;Logout</label> </a></p>
 -->
 <a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
  <jsp:include page="footer.jsp"></jsp:include>
 </div>
</body>

</html>
