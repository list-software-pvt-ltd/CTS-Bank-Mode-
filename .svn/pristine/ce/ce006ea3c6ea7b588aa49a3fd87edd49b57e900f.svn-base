<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS :Report Clearing Outward</title>
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
<script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
<script type="text/javascript">

	window.history.forward();
	function noBack()                     
	{
		window.history.forward();
	}
	
</script>
<script src="js/intimation_request_new.js"></script>

<style>
	/* Tooltip container */
	.tooltip {
	  position: relative;
	  display: inline-block;
	  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
	}

	/* Tooltip text */
	.tooltip .tooltiptext {
	  visibility: hidden;
	  width: 120px;
	  background-color: #555;
	  color: #fff;
	  text-align: center;
	  padding: 5px 0;
	  border-radius: 6px;

	  /* Position the tooltip text */
	  position: absolute;
	  z-index: 1;
	  bottom: 125%;
	  left: 50%;
	  margin-left: -60px;

	  /* Fade in tooltip */
	  opacity: 0;
	  transition: opacity 0.3s;
	}

	/* Tooltip arrow */
	.tooltip .tooltiptext::after {
	  content: "";
	  position: absolute;
	  top: 100%;
	  left: 50%;
	  margin-left: -5px;
	  border-width: 5px;
	  border-style: solid;
	  border-color: #555 transparent transparent transparent;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.tooltip:hover .tooltiptext {
	  visibility: visible;
	  opacity: 1;
	}
	</style>
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
String loginstyle="";
	try{
		Connection cn=null;
		cn=Configuration.getConnection();
		 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		cn.close();
	}
    catch(Exception e)
    {
		System.out.println("Exception"+e);
    }

%>

<body id="top" onload="onLoad_intimationreq()" onpageshow="if (event.persisted) noBack();" onunload="" style="">
<div class="wrapper col1">
<div id="header">
  <div id="logo" style="width:900px;">
    <h1><a href="#" title="Cheque Truncation System">CTS</a></h1>
    <p class="fl_left">Cheque Truncation System</p>
	  <div class="fl_right" id="userid" name="userid">User : <%=session.getAttribute("session_loginid")%></label></div> 
  </div>
	<br class="clear" />
	 
</div>
</div>
<hr style="height:0px;border-width:0;">
<form name="formid" id="formid"  method="post">	 
<div class="wrapper col3">
  <div id="container_chq">
  <center>
  <input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
   <input name="whattodo" id="whattodo" type="hidden"/>
  <table width="100%" height="100%" border="0" cellspacing="1" cellpadding="1">
  		<th align="center"c colspan="2">
			Intimation Request
			<hr/>
		</th>
		<tr colspan="2">
			<td align="right" width="45%"><br></>Account Number : </td>
				<td width="55%" align="left" style="height:57px">
				<table width="50%" border="0" style="border:none;">
				<tr><td style="border:none;">Branch Code</td>
				<td style="border:none;">Scheme</td>
				<td style="border:none;">Account Number</td>
				<td style="border:none;"></td></tr>
				<tr><td style="border:none;"><input type="text" name="brncd" id="brncd" style="width:90px"/></td>
				<td style="border:none;"><input type="text" name="schemecd" id="schemecd"/ style="width:90px"></td>
				<td style="border:none;"><input type="text" name="accountno" id="accountno" style="width:90px"/></td>
				<td style="border:none;"><input type="button" name="btnaccdet" id="btnaccdet" value="Fetch Account Details" onclick="onClickOffetchAccDetails()"/> 
				</td></tr>
				</table>				
				</td> 			
		</tr>	
		<tr colspan="2">
			<td align="right" width="45%">Customer Code : </td>
				<td width="55%" align="left">
					<input type="text" name="custid" id="custid" disabled style="width:215px"/>
				</td> 			
		</tr>
		<tr colspan="2">
			<td align="right" width="45%">Account Number (CBS A/c No) : </td>
				<td width="55%" align="left">
					<input type="text" name="cbsaccno" id="cbsaccno" disabled style="width:215px"/>
				</td> 			
		</tr>
		<tr colspan="2">
			<td align="right" width="45%">Customer Name : </td>
				<td width="55%" align="left">
					<input type="text" name="custname" id="custname" title="" style="width:215px" disabled/>
				</td> 			
		</tr>
		<tr colspan="2">
			<td align="right" width="45%">Transaction Code : </td>
				<td width="55%" align="left">
					<input type="text" name="trancd" id="trancd" disabled style="width:215px"/>
				</td> 			
		</tr>
		<tr colspan="2">
			<td align="right" width="45%">Mobile Number : </td>
				<td width="55%" align="left">
					<input type="text" name="mobileno" id="mobileno" style="width:215px"/>
				</td> 			
		</tr>
		<tr>	
		<td colspan="2">
			<div class="one_half first" style="margin-right: 20px;" align="right">
			    <input class="btn_small" name="btnAddRow" id="btnAddRow" type="button" value="Add Row">
			    &nbsp;&nbsp;
			    <input class="btn_small" name="btnDeleteRow" id="btnDeleteRow" type="button" value="Delete Row">		
			</div>
		</td>
		
	   </tr>
		<tr>
		<td colspan="2" align="center">
		
			<div align="center" style="width: 960px;  display: inline-block; margin-right: 5px;">
				<div  id="accdetailsgrid" style="width:962px; height: auto; min-height:200px; display: inline-block; margin:auto;"></div>
			</div>
		</td>
		</tr>
		<tr style="width:100%">										
			<td align="right">
			<input type="button" name="btnsubmit" id="submitbutton" value="Submit" onclick="onClickOfSubmit()"/> 
			</td>
			<td align="left">
			<input type="button" name="btnreset" id="submitbutton" value="Reset" onclick="onClickOfreset()"/> 
			</td>	
		</tr>
		</table>
  </center>
  </div>
  </div> 
  <div id="footer">
    <jsp:include page="footer.jsp"></jsp:include></div>
    </div> 
</form>
</body>
</html>