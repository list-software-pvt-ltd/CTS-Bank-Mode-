<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Return Outward Manually</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<link rel="stylesheet" href="codebase/dhtmlx.css" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="codebase/dhtmlx.js"></script>
<script src="codebase/dhtmlxgrid_json.js"></script>
<script src="js/jquery-1.11.3.min.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.datepicker.js"></script>
<script src="js/returnOutward_manually.js"></script>
<script src="js/commonLib.js"></script>
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
	
	String msg1="";
	System.out.println("In response data");
	String loginstyle="";
	 String CFG_CONTINUE_CLEARING_FLG="";
	try
	{
		Connection cn=null;
		cn=Configuration.getConnection();
		 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		  CFG_CONTINUE_CLEARING_FLG=Configuration.getConfValByNm("CFG_CONTINUE_CLEARING_FLG",cn);
		 cn.close();
		msg1=request.getParameter("msg1").trim();
		//System.out.println("msg=="+msg1);
		//msg1=msg1.replace("\"", "\\");
				
	}
	catch(Exception npe)
	{
		msg1="N";
		System.out.println("Message to be displayed on login form is null->>"+npe);		
	}	
	
	System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@");
	String msg = "";
	String date_ddmmyyyy="";
	try {
		Connection cn=null;
		cn=Configuration.getConnection();		
		 date_ddmmyyyy=Configuration.getDDMMYYYY();
		 date_ddmmyyyy=date_ddmmyyyy.substring(0,2)+"-"+date_ddmmyyyy.substring(2,4)+"-"+date_ddmmyyyy.substring(4);
		 cn.close();
		msg = request.getParameter("msg");
	} catch (NullPointerException ne) {
		System.out.println("Exception:" + ne);
	}
%>


<body id="top"  	onload="onload_load_Data()">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>
<!--<form name="formid" id="formid"  method="post">	-->
<div class="wrapper col3">
  <div id="container" class="wrapper" style="height:800px;">
  <h1>Return Outward Manually</h1>
  <div class="fl_left" align="center">
  <table>
  <tr colspan="21">
								<td align="right" colspan="2" width="10%">Clearing Date:</td>
								<td width="10%" colspan="2" align="left"><input type="text"
									name="datepicker" id="datepicker" placeholder="dd-mm-yyyy" value="<%=date_ddmmyyyy%>" disabled="disabled"/></td>

								<td align="right" colspan="3" width="10%" id="cyno">Cycle No:</td>
								<td width="10%" colspan="2" align="left">
								    <select id="cyclNo" name="cyclNo">
								    </select>
								</td>					
							
								
								<td colspan="6" width="10%" align="center">
								<input 	type="button" name="btnfetchfiles"  id="submitbutton" value="Fetch Data" 
								onclick="onload_load_inwData()"/></td>
							</tr>
</table>  
		
			<br/>
			<div align="center" style="width:1024px;display: inline-block;">
			<img id = "img_frnt" style="width:50%;height:10%" >  
			</img>
			</div>
			<br></br>
				<label id="list_filenames" style="font-weight:bold">Clearing Inward Data</label>
					<div align="left" style="width:1024px;display: inline-block;">
										
					<div id="filejsongrid" style="width: 1100px; height:300px;display: inline-block;" ></div>
				</div>
			<br></br>
				<div align="left" >				
					<lable style="font-weight:bold">Total Selected Cheques:</lable>
					<input type="text" name="totCheck" id="totCheck" readonly="readonly" />
					<lable style="font-weight:bold">&nbsp;&nbsp;Total Amount:</lable>
					<input type="text" name="totamount" id="totamount" readonly="readonly"/>
				</div>
			<br></br>
			<input id="submitbutton" type="button" value="Save" onclick="save_retOwd_data()"/>
			<br></br>
			
		<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
		<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
		<input type="hidden" id="hdMsg2" name="hdMsg2"  value="<%=msg1%>">
		<input name="jsonString" id="jsonString" type="hidden" />
		<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
		
		<input type="hidden" id="conti_flg" name="conti_flg" value="<%=CFG_CONTINUE_CLEARING_FLG%>"/>
		<input type="hidden" id="cbs_flg" name="cbs_flg"
		style="margin-top: 10%" value="<%=session.getAttribute("session_cbs_conti_flg")%>"/>
			
	</div>
  </div>
</div>

<div id="footer">
<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer;">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label class="labels" style="color:#059BD8; cursor:pointer;"> &nbsp;&nbsp;Logout</label> </a></p>
 -->
 <a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
  <jsp:include page="footer.jsp"></jsp:include></div>

  <!--</form>-->
</body>
</html>
