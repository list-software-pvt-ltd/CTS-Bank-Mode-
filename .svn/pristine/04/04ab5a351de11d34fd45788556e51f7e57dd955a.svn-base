<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Search Cheque Instruments</title>
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
<link rel="stylesheet" href="jquery/jquerycss/demos.css">


<script src="js/chequeSearch.js"></script>
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
String  loginstyle="";
String msg = "",arch_downloadpath="", arch_uploadpath="";//CFG_ARCUPLOADPATH_TO_CHI
try{
	 Connection cn=null;
	 cn=Configuration.getConnection();
	 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
	 System.out.println("loginstyle=="+loginstyle);
		arch_downloadpath=session.getAttribute("CFG_ARCHIVE_DOWNLOADPATH").toString();
		arch_uploadpath=session.getAttribute("CFG_ARCHIVE_UPLOADPATH").toString();
	 cn.close();
}catch(Exception e){
	System.out.println("exception"+e);
} %>
<script>
$(document).ready(function()
	{
		var fromDate = $('#datepicker');
		fromDate.datepicker({dateFormat: 'dd-mm-yy'});		
		/* document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
		$(document).keydown(function (event) {
		    if (event.keyCode == 123) { // Prevent F12
		        return false;
		    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
		        return false;
		    }
		}); */
		var toDate = $('#datepicker1');
		toDate.datepicker({dateFormat: 'dd-mm-yy'});		
		/* document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
		$(document).keydown(function (event) {
		    if (event.keyCode == 123) { // Prevent F12
		        return false;
		    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
		        return false;
		    }
		}); */
	});
</script>
<body id="top" onload="onLoad_cheque_search();">
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
  <input type="hidden" id="whattodo" name="whattodo" />
		
  <table width="100%" height="100%" border="0" cellspacing="1" cellpadding="1">
  		<th align="center"c colspan="12">
			Search Cheque Instruments
			<hr/>
		</th>	
		
		<tr >
			<td align="right" width="20%">From Date:</td>
				<td width="20%" align="left">
					<input type="text" name="datepicker" id="datepicker" value="dd-mm-yyyy"/>
				</td> 			
	
			<td align="right" width="20%">To Date:</td>
				<td width="20%" align="left">
					<input type="text" name="datepicker1" id="datepicker1" value="dd-mm-yyyy"/>
				</td> 			

			<td align="right" width="50%">Transaction Type</td>
			<td align="left"   width="50%">
				<select id="opt_tran_code" name="opt_tran_code" >
					  <option value="NA">--Select--</option>
					  <option value="CO">Clearing Outward</option>
					  <option value="CI">Clearing Inward</option>
					  <option value="RO">Return Outward</option>
					  <option value="RT">Return Inward</option>
					</select>
			</td>	
		  				  
			<td  align="center">
			<input type="button" name="btnGetReport" id="submitbutton" value="SHOW"
				   onclick="onClickOfRunReport()"/> 
				</td>	
	
	
		     	
	</table>
	
	
	<table>
	<tr>
	<td>
	<div align="center" style="width:1024px;display: inline-block;">						
					<div id="mygird_data" style="width: 990px; height:200px;display: inline-block;" ></div>
				</div>
	    
	    <div style="margin-left:450px ;display: inline-block;"> <input type="button" name="btnGetReset" id="submitbutton" value="PRINT"
				   onclick="onClickOfPrint()"/>       
				   <input type="button" name="btnGetReset" id="submitbutton" value="RESET"
				   onclick="onClickOfReset()"/> 
	     </div>   
	     <input name="PATH" id="PATH" type="hidden" value="<%=arch_downloadpath%>" />
	     <input name="PATH_UP" id="PATH_UP" type="hidden" value="<%=arch_uploadpath%>" />  
	           </td></tr>
			<tr>	<td>
			<div align="center" style="width:1024px;">
			<img id = "img_frnt" name="img_frnt" style="width:50%;height:10%" > 	</img>
			</div>
		 </td>	</tr>

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
