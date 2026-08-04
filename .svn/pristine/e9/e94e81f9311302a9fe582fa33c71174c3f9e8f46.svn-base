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
<script src="js/read_issuance_file_manually.js"></script>
<script src="js/commonLib.js"></script>
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONException"%>
<%
	
	String msg="",retStr="";
String loginstyle="",CNF_RETINWMEMOSTYLE="";
	try
	{
		 Connection cn=null;
		   cn=Configuration.getConnection();
		   loginstyle =Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		   CNF_RETINWMEMOSTYLE =Configuration.getConfValByNm("CNF_RETINWMEMOSTYLE", cn);
		   cn.close();
		retStr = request.getParameter("retStr").trim();
		//System.out.println("msg=="+msg);
		System.out.println("msg=="+retStr);
	}
	catch(Exception npe)
	{
		npe.printStackTrace();
		System.out.println("Message to be displayed on login form is null");		
	}	
		
%>

<body id="top"  >

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>

<!--<form name="formid" id="formid"  method="post" enctype="multipart/form-data">	-->

<div class="wrapper col3">
  <div id="container" class="wrapper">
  <h1>Manually Read Issuance File Response </h1>
  <div class="fl_left" align="center">
	
						<label>Pending for response reading</label>
				<div align="center" style="width:1124px;display: inline-block;">							
					<div id="pending_grid" style="width: 1124px; height:200px;display: inline-block;" ></div>
				</div>
		<br><br>
			<input id="submitbutton" name="updatebtn"  type="button" value="Update Response" onclick="updateRecords()" />
	
		<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
		<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
		<input name="jsonString" id="jsonString" type="hidden">
		<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
		<input type="hidden" id="whattodo" name="whattodo" />
		<input type="hidden" id="CNF_RETINWMEMOSTYLE" name="CNF_RETINWMEMOSTYLE" value="<%=CNF_RETINWMEMOSTYLE%>"/>
			<input type="hidden" name="retMsg" id="retMsg" value="<%=retStr%>"/>
	</div>
  </div>
</div>

<div id="footer">
<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer;">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label class="labels" style="color:#059BD8; cursor:pointer;"> &nbsp;&nbsp;Logout</label> </a></p>
 -->
 <a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
  <jsp:include page="footer.jsp"></jsp:include></div>

  <!-- </form>  -->
</body>
</html>
