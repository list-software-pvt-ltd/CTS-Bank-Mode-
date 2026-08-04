<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS :Clearing Outward Response</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<link rel="stylesheet" href="jquery/jquerycss/jquery.ui.all.css">
<link rel="stylesheet" href="codebase/dhtmlx.css" />

<script src="jquery/jquerylib/jquery-1.10.2.js"></script>
<script src="jquery/jquerylib/ui/jquery.ui.core.js"></script>
<script src="jquery/jquerylib/ui/jquery.ui.widget.js"></script>
<script src="jquery/jquerylib/ui/jquery.ui.datepicker.js"></script>
<script src="codebase/dhtmlx.js"></script>
<script src="codebase/dhtmlxgrid_json.js"></script>
 <script src="js/commonLib.js"></script>
<script src="js/report_issuancefile.js"></script>

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
		var fromDate = $('#fromdatepicker');
		fromDate.datepicker({dateFormat: 'dd-mm-yy'});
		var toDate = $('#todatepicker');
		toDate.datepicker({dateFormat: 'dd-mm-yy'});
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
<body id="top" onload="onLoad_report_issuancefile()">
<form name="formid" id="formid"  method="post">	 
<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>

<div class="wrapper col3">
  <div id="container_chq">
  <center>
  <table width="100%" height="100%" border="0" cellspacing="1" cellpadding="1">
  		<th align="center" colspan="2">
			Issuance File Report
			<hr/>
		</th>	
		
		<tr colspan="2">
			<td align="right" width="50%">Select From Date:</td>
				<td width="50%" align="left">
					<input type="text" name="fromdatepicker" id="fromdatepicker" value="dd-mm-yyyy"/>
				</td> 			
		</tr>
		
		<tr colspan="2">
			<td align="right" width="50%">Select To Date:</td>
				<td width="50%" align="left">
					<input type="text" name="todatepicker" id="todatepicker" value="dd-mm-yyyy"/>
				</td> 			
		</tr>
		<tr>
			<td colspan="2" align="center">
			<input type="button" name="btnGetReport" id="submitbutton" value="Show Report" onclick="onClickOfRunReport()"/> 
			</td>	
		</tr>
		<tr>
		<td colspan="2">
			<div align="left" style="width: 1180px;  display: inline-block; margin-right: 5px;">
				<div align="left"  id="issuancegrid" style="width:1182px; height: auto; min-height:200px; margin:auto;"></div>
			</div>
		</td>
		</tr>
		<tr>
			<td colspan="2" align="center">
			<input type="button" name="btnPrint" id="submitbutton1" value="Print" onclick="onClickOfPrint()"/> 
			</td>	
		</tr>
	</table>	
	<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
		<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
		<input name="jsonString" id="jsonString" type="hidden">
		<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
		<input type="hidden" id="whattodo" name="whattodo" />
</center>	
	
		
  </div>
</div>


<div id="footer">
<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label style="color:#059BD8; cursor:pointer"> &nbsp;&nbsp;Logout</label> </a></p>
 -->
 <a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
  <jsp:include page="footer.jsp"></jsp:include></div>
</form>
</body>
</html>
