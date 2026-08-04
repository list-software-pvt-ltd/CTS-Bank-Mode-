<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS :Comman Report</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="js/commanReport.js"></script>
<link rel="stylesheet" href="jquery/jquerycss/jquery.ui.all.css">
	<script src="jquery/jquerylib/jquery-1.10.2.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.core.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.widget.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.datepicker.js"></script>
	<link rel="stylesheet" href="jquery/jquerycss/demos.css">	
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
String loginstyle="";
	try{
	String msg1="";
	System.out.println("In response data");
	Connection cn=null;
	cn=Configuration.getConnection();
	 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
	 cn.close();
	}catch(Exception e)
    {System.out.println("exception->>"+e);	
		}
	%>	
<script>
$(document).ready(function()
	{
		var fromDate = $('#datepicker');
		fromDate.datepicker({dateFormat: 'dd-mm-yy'});			
	});
</script>
<body id="top">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>



<div class="wrapper col3">
  <div id="container_chq">
  <center>
  <table width="100%" height="100%" border="1" cellspacing="1" cellpadding="1">
		<tr>
			<td width="20%" align="right">
					Select Date:<input type="text" name="datepicker" id="datepicker" value="dd-mm-yyyy"/> 
			</td>			
			<td width="30%"align="left">
				<label><font color="#FF0000">*</font>Select Report Type</label><br/>
				<hr/>
				<input type="radio" name="report" value="clearingOutward">Clearing Outward<br/>
				<input type="radio" name="report" value="clearingInward">Clearing Inward<br/>	
				<input type="radio" name="report" value="returnInward">Return Inward<br/>
				<input type="radio" name="report" value="returnOutward">Return Outward<br/>	
			</td>
			
			<td width="20%"align="left">
					<input type="button" name="btnGetReport" id="submitbutton" value="Get Report" onclick="onClickOfGetResult()"/> 
			</td>
		</tr>
	</table>	
</center>	
	<table width="100%" height="100%" border="1" cellspacing="1" cellpadding="1">
		<tr>
		<td width="40%" align="right">
			<div id="div_out_chq">				
				<table id="tab_out_chq" cellpadding="0"  cellspacing="0" border="1" align="center" style="border-color:#FFFFFF; width:100%; ">
						<tr>
							<td><label style="font-weight:bold">ChequeNo_SortCode:PayeeName</label>
							</td>

							<td colspan="2" align="center"><label style="font-weight:bold">Select All</label><input id="chk_selall" type="checkbox" onClick="toggle_out_clearing(this)" title="Select All"/>
							</td> 					
						</tr>
				</table>
			</div>				
		</td>
		<td width="60%">
			<div id="div_cheque" style="width:100%;height:100%;position:relative;zIndex:1">	
			
				<fieldset>
				
					<div class="fl_left">
					
						<table>
							<tr>
								<td><font class="wrapper h2"><label style="font-weight:bold">Front</label></font>
								</td>
								<td><font class="wrapper h2"><label style="font-weight:bold">Back</label></font>
								</td>
							<!--	<td><font class="wrapper h2">Front Grey scale</font>
								</td>
								-->
							</tr>
							<tr>
								<td style="width:20%;height:20%">
									<img id = "img_frnt" style="width:100%;height:10%" onclick="enlargeCheque_outwardchqs('img_frnt')" title="Click To Enlarge">  
								</td>
								<td style="width:20%;height:20%">
									<img id = "img_back"  style="width:100%;height:10%" onclick="enlargeCheque_outwardchqs('img_back')" title="Click To Enlarge">  
									
								</td>
								<!--<td style="width:20%;height:20%">
									<img id = "img_frnt_grey"  style="width:100%;height:10%" onclick="enlargeCheque_outwardchqs('img_frnt_grey')" title="Click To Enlarge">  
								</td>-->
							</tr>
						</table>
						
					</div>
					
					<div class="fl_left">
						<table>
							<tr>
								<td style="width:100%;height:50%">
								<img id="img_enlarged" style="width:100%;height:40%">  
								
								</td>
							</tr>
						</table>
					</div>
				
					
				</fieldset>
				
			</div>
					
		</td>
		
		</tr>
		
	
	</table>
		
  </div>
</div>

<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
<div id="footer">
		<!-- <p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label style="color:#059BD8; cursor:pointer"> &nbsp;&nbsp;Logout</label> </a><br/></p>
			Version 2017.1.0<br/> -->
			<a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
			 <jsp:include page="footer.jsp"></jsp:include>
</div>
</body>
</html>
