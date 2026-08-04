<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : PPS Interface</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<link rel="stylesheet" href="codebase/dhtmlx.css" />
<script src="jquery/jquerylib/jquery-1.10.2.js"></script>
<script src="jquery/jquerylib/ui/jquery.ui.core.js"></script>
<script src="jquery/jquerylib/ui/jquery.ui.widget.js"></script>
<script src="jquery/jquerylib/ui/jquery.ui.datepicker.js"></script>
<script src="codebase/dhtmlx.js"></script>
<script src="codebase/dhtmlxgrid_json.js"></script>
<script src="js/create_issuance_file.js"></script>
<script src="js/commonLib.js"></script>
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
	
	String msg="";
String loginstyle="",CNF_RETINWMEMOSTYLE="",dateto="",CFG_CHI_BANKNAME="";
	try
	{
		 Connection cn=null;
		   cn=Configuration.getConnection();
		   dateto=Configuration.getDDMMYYYY();
		   loginstyle =Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		   CNF_RETINWMEMOSTYLE =Configuration.getConfValByNm("CNF_RETINWMEMOSTYLE", cn);
		   CFG_CHI_BANKNAME=Configuration.getConfValByNm("CFG_CHI_BANKNAME", cn);
		   cn.close();
		msg=request.getParameter("msg").trim();
		System.out.println("msg=="+msg);
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on login form is null");		
	}	
		
%>

<body id="top"  >

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>

<div class="wrapper col3">
  <div id="container" class="wrapper">
  <h1>Create Issuance File </h1>
  <div class="fl_left" align="right">
         Date: <input id="datelbl" type = "text" name = "datelbl" style="font-weight:bold" readonly="readonly"/>
		<br><br>
				<div align="center" style="width:1024px;display: inline-block;">						
					<div id="jsongrid" style="width: 790px; height:200px;display: inline-block;" ></div>
				</div>
	           	<br><br>
	           	<div id="footerdetail">
	           	<table id="grid_footer" style="width:78%"  class="table-sum" align="center" border="1" cellspacing="0" cellpadding="0">
					<tr>
							<td align="right"><label id="td3">Total Count</label></td>
				 				<td><input  id="td4"  class="small" type="text" disabled="disabled"></td>
				 			<td align="right"><label id="td1">Total Amount (In Rs)</label></td>
				 				<td><input  id="td2" class="small" type="text" disabled="disabled"></td>
					</tr>
					
				</table>
				  <div id="fileformatdiv">
				<table id="grid_footer" style="width:60%"  class="table-sum" align="center" border="1" cellspacing="0" cellpadding="0">
				 <tr>
                    <td align="center">File Format</td>
                    <td><input type="radio" name="fileformat" value="XML" onchange="getValue(this)"/>
					    XML</td>
                    <td><input type="radio" name="fileformat" value="CSV" onchange="getValue(this)"/>
					    CSV</td>
					<td><input type="radio" name="fileformat" value="XSL" onchange="getValue(this)"/>
					    Excel</td>   
                </tr>
				</table>
				</div>	
	           	</div>
				<input  id="submitbutton" type="button" value="Create File" />
				<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
				<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
				<input name="jsonString" id="jsonString" type="hidden">
				<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
				<input type="hidden" id="whattodo" name="whattodo" />
				<input type="hidden" id="CNF_RETINWMEMOSTYLE" name="CNF_RETINWMEMOSTYLE" value="<%=CNF_RETINWMEMOSTYLE%>"/>
				<input type="hidden" id="CFG_CHI_BANKNAME" name="CFG_CHI_BANKNAME" value="<%=CFG_CHI_BANKNAME%>"/>
	</div>
  </div>
</div>

<div id="footer">
<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer;">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label class="labels" style="color:#059BD8; cursor:pointer;"> &nbsp;&nbsp;Logout</label> </a></p>
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
</body>
</html>
