<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="java.sql.Connection"%>
<%@page import="cts.*"%>
<%@page import="java.io.*"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Merging</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />

<script src="js/main.js"></script>
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
	
	String msg="",doICallMerge="Y";
	Connection con=Configuration.getConnection();
	String loginstyle="";
	try
	{
		 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", con);
		msg=request.getParameter("msg").trim();
		System.out.println("msg::::>>>"+msg);
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on login form is null");		
	}	
	try
	{
		String retOwdPth=Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
		File FileList[]=new File(retOwdPth).listFiles();
		for(File f:FileList)
		{
			if(f.isFile())
			{
				if(f.getName().indexOf("RRF")>-1 && f.getName().indexOf(Configuration.getDDMMYYYY())>-1 && f.getName().indexOf(".xml")>-1)
				{
					doICallMerge="N";
				}
			}
		}
		con.close();
	}
	catch(Exception e)
	{
		System.out.println("Exception::----->"+e);
	}
%>
<body id="top" onload="onLoad_returnOutward()">




<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>


<div class="wrapper col3">
  <div id="container_chq">
  <input type="hidden" id="rcnt" name="rcnt" value="1"/>
<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
<input type="hidden" id="loginstyle" name=""loginstyle"" value="<%=loginstyle%>"/>
  <table>
   		<!--<tr style="width:100%">
			<td colspan="2"><h2></h2>
			</td>
	  	</tr>-->
		
		<!--<tr style="width:100%">
			<td style="width:30%" align="right">
				<label style="font-weight:bold">Branches: </label>
			</td>
			<td style="width:70%" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label style="font-weight:bold">Code : Name</label>
					<ul id="ul_list" type="disc">
					</ul>
			</td>
		</tr>-->
		<tr style="width:100%">
			<td style="width:30%" >
				  <div style="width:100%;" >
				<table>
					<tr>
						<td>Total Cheque </td>
						<td>Total Amount </td>
					</tr>
					
					<tr>
						<td id="totalCheques"> 0 </td>
						<td id="totalAmount"> 0 </td>
					</tr>
				</table>
			</div>	
			</td>
			<td style="width:70%" align="left" colspan="2">
				<input type="button" name="Merge" id="submitbutton" value="Convert" onclick="upload_return_outward()" />
			</td>
	  	</tr>
		<!-- ---------------------------------- -->
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
		<!-- ---------------------------------------->
  </table>
  
  </div>
</div>

<div id="footer">
<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a></p>
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
	<input type="hidden" id="hddoICallMerge" name="hddoICallMerge" value="<%=doICallMerge%>"/>
</body>
</html>
