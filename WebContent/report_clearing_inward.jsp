<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS :Report Clearing Inward</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="js/report_clearing_inward.js"></script>
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
String  loginstyle="";
try{
Connection cn=null;
cn=Configuration.getConnection();
 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
 cn.close();
}catch(Exception e){
	System.out.println("exception"+e);
} %>
<script>
$(document).ready(function()
	{
		var fromDate = $('#datepicker');
		fromDate.datepicker({dateFormat: 'dd-mm-yy'});		
		document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
		$(document).keydown(function (event) {
		    if (event.keyCode == 123) { // Prevent F12
		        return false;
		    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
		        return false;
		    }
		});
	});
</script>
<body id="top" onload="onLoad_report_clearing_inward()">
<!--<form name="formid" id="formid"  method="post">	 -->
<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>

<div class="wrapper col3">
  <div id="container_chq">
  <center>
  <input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
  <input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
   <input name="session_main_br_yn" id="session_main_br_yn" type="hidden" value="<%=session.getAttribute("session_main_br_yn")%>">
    <input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
  <table width="100%" height="100%" border="0" cellspacing="1" cellpadding="1">
  		<th align="center"c colspan="2">
			Clearing Inward Report
			<hr/>
		</th>	
		
		<tr colspan="2">
			<td align="right" width="50%">Select Date:</td>
				<td width="50%" align="left">
					<input type="text" name="datepicker" id="datepicker" value="dd-mm-yyyy"/>
				</td> 			
		</tr>
		
		<tr >
			<td align="right" width="50%">Branch</td>
			<td align="left"   width="50%">
				<select id="opt_branch_code" name="opt_branch_code" >
					  <option value="0">-- Select Branch--</option>
					</select>
			</td>	
		</tr>
		
		<tr>
			<td align="right" width="50%"></td>
			<td align="left"   width="50%">
				<input type="checkbox" name="chkExcel" id="chkExcel" value="false"/>Export To Excel.
			</td>	
		</tr>
		<tr >
			<td align="right" width="50%">Clearing Type</td>
			<td align="left"   width="50%">
				<select id="opt_ctsNonCTS_code" name="opt_ctsNonCTS_code">
					  <option value="0">-- All --</option>
					  <option value="01">-- CTS --</option>
					  <option value="11">-- Non-CTS --</option>
					  <option value="99">--Special Clearing--</option>
					</select>
			</td>	
		</tr>
		<tr>
			<td colspan="2" align="center">
			<input type="button" name="btnGetReport" id="submitbutton" value="Run Report" onclick="onClickOfRunReport()"/> 
			</td>	
		</tr>
	</table>	
</center>	
	
		
  </div>
</div>


<div id="footer">
<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label style="color:#059BD8; cursor:pointer"> &nbsp;&nbsp;Logout</label> </a></p>
 -->
 <a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
  <jsp:include page="footer.jsp"></jsp:include></div>
<!--</form>-->
</body>
</html>
