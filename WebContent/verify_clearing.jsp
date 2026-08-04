<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="cts.*"%>
<%@page import="java.sql.*"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Verify Clearing</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/verify_clearing.js"></script>
</head>
<%
	Connection con=Configuration.getConnection();
	String CFG_downloadpath_from_CHI=Configuration.getConfValByNm("CFG_downloadpath_from_CHI",con);
	String loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", con);
	con.close();
	String msg="";
	String userRole="";
	String branchCode=(String)session.getAttribute("session_branch_code");
	try
	{
		msg=request.getParameter("msg").trim();
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on inward_clearing form msg is null");
	}	
		
	try
	{
		userRole=session.getAttribute("session_user_role").toString();
		System.out.println("######################## userRole:"+userRole+"#####");
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on inward_clearing userRole is null");		
	}	
		
%>
<!--<body id="top" >
-->

<body id="top" onload="onload_verify_clearing()">

<!--<form name="formid" id="formid"  method="post">	 -->


<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>

<div class="wrapper col3">
  <div id="container_chq">
	<table width="100%" height="100%" border="1" cellspacing="1" cellpadding="1">
		<tr class="2" >
			<td width="30%" height="40%" colspan="2">
			<!--<div class="fl_left">-->
			<div class="fl_left" style="float:left; width:50%;">
					<label id="list_filenames" style="font-weight:bold">File Names</label>
					<ul id="ul_list" type="disc">
					 
					</ul>
			</div>
			
			<div class="fl_left" style="width:20%; left:45%;">
					
					<input id="submitbutton" type="button" name="btn_download"  value="Convert & Save" onclick="download_inward_cheques()" />
			</div>
			
			<div class="fl_right" style="width:25%;left:70%;" >
				<table >
					<tr>
						<td>Total Cheque </td>
						<td>Total Amount </td>
					</tr>
					
					<tr>
						<td id="totalCheques"></td>
						<td id="totalAmount"></td>
					</tr>
					<tr>
						<td>CBS Cheque </td>
						<td>CBS Amount </td>
					</tr>
					
					<tr>
						<td id="cbsCheques"></td>
						<td id="cbsAmount"></td>
					</tr>

				</table>
				
				<table border="0" >
					<tr> 
						<td>Clearing type:</td>				
					</tr>
				</table>

				<table border="0" >					
					<tr id="trId">			
					</tr>
				</table>
			</div>	
			</td>
			
		</tr>
		<tr>
			<td width="30%" height="100px">
				<table cellpadding="0"  cellspacing="0" align="center" style="width:100%">
						<tr>
							<td><label style="font-weight:bold">ChequeNo_SortCode</label></td>
							<!--<td colspan="2" align="right">--><!--Select All<input id="chk_selall" type="checkbox" onClick="toggle_in_clearing(this)" title="Select All"/>--></td>
						</tr>
					</table>
				<div id="div_in_chq" style="overflow:scroll; height:300px; position:relative ; padding:0;">				
					<table id="tab_in_chq" cellpadding="0"  cellspacing="0" border="1" align="center" style="border-color:#FFFFFF; width:100%">
						<tr id="tr_select_all">
							<!--<td>ChequeNo_SortCode</td>-->
							<td colspan="2" align="right"><!--Select All<input id="chk_selall" type="checkbox" onClick="toggle_in_clearing(this)" title="Select All"/>--></td>
						</tr>
					</table>
				</div>	
			</td>
			<td width="70%" height="40%" rowspan="2" align="center">
				<div class="fl_left" align="center">
					<img id = "img_frnt" style="width:100%;height:25%" > 
				</div>
			</td>
			<!--<td height="100px"width="70%">
				<div id="div_cheque" style="width:100%;height:100%;position:relative;zIndex:1">	
		
					<fieldset>
					
						
						
						<div class="fl_left">
							<table>
								<tr>
									<td style="width:100%;height:50%">
									<img id="img_enlarged" style="width:100%;height:60%">  
									
									</td>
								</tr>
							</table>
						</div>
					
						<div class="fl_left">
							
						</div>
					
					</fieldset>
			
				</div>
			</td>-->
		</tr>
	</table>
  </div>
</div>
<input type="hidden" id="rcnt" name="rcnt" value="1"/>
<input type="hidden" id="selClrType" name="selClrType"" value="1"/>
<input type="hidden" id="hd_down_path" name="hd_down_path" value="<%=CFG_downloadpath_from_CHI%>"/>
<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>"/>
<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=branchCode%>"/>	

<input name="session_user_role" id="session_user_role" type="hidden" value="<%=session.getAttribute("session_user_role")%>"/>
<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
<div id="footer">
		<!-- <p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer;">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label class="labels" style="color:#059BD8; cursor:pointer;"> &nbsp;&nbsp;Logout</label></a><br/></p>
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



<!--</form>-->
</body>
</html>
