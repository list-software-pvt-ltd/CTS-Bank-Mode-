<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="cts.*"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Branch Master</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
<script src="js/insertBranch.js"></script>
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
<body id="top" onload="onLoad_createBranch()">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>



<div class="wrapper col5">
 <div id="container" style="top:0%">
		
				  <h2>Branch Master</h2>				  
					  <center>
						<fieldset>								
								<table style="width:100%" align="center" cellpadding="0%" cellspacing="0%">
									<tr style="width:100%">
										<td align="right" style="width:50%">
											<label><font color="#FF0000">*</font>Branch Code:</label>
										</td>
										<td style="width:50%">
										<select id="opt_BrnCd" name="opt_BrnCd" onchange="onChange_branch()">
											  <option value="0">-- Select--</option>
											  <option value="1">-- Add new--</option>
										</select>
										<input type="text" id="txtBrnCd"  name="txtBrnCd" autocomplete="off" disabled="disabled"/>
										</td>
																				
									</tr>
										<tr style="width:100%">
										<td align="right" style="width:50%">
											<label><font color="#FF0000">*</font>Branch Name:</label>
										</td>
										<td style="width:50%">
										<input type="text" id="txtBrnNm"  name="txtBrnNm" autocomplete="off"/>
										</td>
																				
									</tr>
									
									<tr style="width:100%">
										<td align="right"  style="width:50%">
											<label><font color="#FF0000">*</font>Scanner Available :</label>
										</td>
										<td style="width:50%">
										<select id="opt_Scanner_avail" name="opt_Scanner_avail" onChange="onChange_Scanneraval()">
											  <option value="0">-- Select--</option>
											  <option value="Y">Yes</option>
											  <option value="N">No</option>									
										</select>
										</td>
									</tr>
								
									<tr style="width:100%">
										<td align="right"  style="width:50%">
											<label><font color="#FF0000">*</font>Is CTS main Branch:</label>
										</td>
											<td style="width:50%">
										<select id="opt_main_branch" name="opt_main_branch">
											  <option value="0">-- Select--</option>
											  <option value="Y">Yes</option>
											  <option value="N">No</option>										
										</select>
										</td>
									</tr>
									
									<!-- Brn code -->
									<tr style="width:100%">
										<td align="right" style="width:50%">
											<label><font color="#FF0000">*</font>MICR Code:</label>
										</td>
										<td style="width:50%">
										<input type="text" id="txtMicrCd"  name="txtMicrCd" autocomplete="off"/>
										</td>
										
									</tr>
									<tr style="width:100%">
										<td align="right" style="width:50%">
											<label>Parent Branch Code:</label>
										</td>
										<td style="width:50%">
										<select id="txtPrnBrnCd" name="txtPrnBrnCd" >
											  <option value="0">-- Select--</option>
											  <option value="-1">-- NA--</option>
										</select>
										<!-- <input type="text" id="txtPrnBrnCd"  name="txtPrnBrnCd" autocomplete="off"/> -->
										</td>
									</tr>
									
									<tr style="width:100%">
										<td align="right" style="width:50%">
										<label><font color="#FF0000">*</font><label>IFSC Code:</label>
										</td>
										<td style="width:50%">
											<input type="text" id="txtIfsc"  name="txtIfsc" autocomplete="off"/>
										</td>
									</tr>
									<tr style="width:100%">
										<td align="right" style="width:50%">
										<label><font color="#FF0000">*</font><label>CBS MICR Code:</label>
										</td>
										<td style="width:50%">
											<input type="text" id="txtMemBnkSortCDd"  name="txtMemBnkSortCDd" autocomplete="off"/>
										</td>
									</tr>
										<tr style="width:100%">
										<td align="right" style="width:50%">
										<label>Local File Path:</label>
										</td>
										<td style="width:50%">
											<input type="text" id="txtFilepath"  name="txtFilepath" autocomplete="off"/>
										</td>
									</tr>
									<tr style="width:100%">
										<td align="right" style="width:50%">
											<label><label>FTP user:</label>
										</td>
										<td style="width:50%">
										<input type="text" id="txtFTPUser"  name="txtFTPUser" autocomplete="off"/>
										</td>
									</tr>
									
									<tr style="width:100%">
										<td align="right" style="width:50%">
										<label><label>FTP Password:</label>
										</td>
										<td style="width:50%">
											<input type="text" id="txtFTPPass"  name="txtFTPPass" autocomplete="off"/>
										</td>
									</tr>
									<tr style="width:100%">
										<td align="right" style="width:50%">
										<label><font color="#FF0000">*</font><label>SorterId :</label>
										</td>
										<td style="width:50%">
											<input type="text" id="txtSorterId"  name="txtSorterId" autocomplete="off"/>
										</td>
									</tr>
										<tr style="width:100%">
										<td align="right" style="width:50%">
										<label><label>FTP URL / Machine Ip:</label>
										</td>
										<td style="width:50%">
											<input type="text" id="txtFTPUrl"  name="txtFTPUrl" autocomplete="off"/>
										</td>
									</tr>
										</tr>
										<tr style="width:100%">
										<td align="right" style="width:50%">
										<label>FTP Port / Machine port:</label>
										</td>
										<td style="width:50%">
											<input type="text" id="txtFTPPort"  name="txtFTPPort" autocomplete="off"/>
										</td>
									</tr>
									
									<tr style="width:100%">										
										<td align="right">
											<input type="button" name="btnSubmit" id="submitbutton" value="Save" onclick="after_create_branch()" />
										</td>
										<td align="left">
										<input type="button" value="Reset" id="submitbutton" onClick="afterReset_create_branch()" title="Reset" >	
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
