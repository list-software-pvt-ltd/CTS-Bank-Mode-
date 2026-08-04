<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Return Outward</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<link rel="stylesheet" href="codebase/dhtmlx.css" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="codebase/dhtmlx.js"></script>
<script src="codebase/dhtmlxgrid_json.js"></script>
<script src="js/retOutward_resFileData.js"></script>
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
	
	String msg1="";
	System.out.println("In response data");
	String loginstyle="";
	try
	{
		Connection cn=null;
		cn=Configuration.getConnection();
		 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		 cn.close();
		msg1=request.getParameter("jsonString").trim();
		msg1=msg1.replace("\"", "\\");
		System.out.println("msg=="+msg1);
		
				
	}
	catch(Exception npe)
	{
		System.out.println("Message to be displayed on login form is null->>"+npe);		
	}	
	%>	

<body id="top"  onload="onload_load_resData()">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>
<!--<form name="formid" id="formid"  method="post">	 -->

<div class="wrapper col3">
  <div id="container" class="wrapper">
  <h1>Response File</h1>
  <div class="fl_left" align="center">
		<label id="list_filenames" style="font-weight:bold">Response File Data</label>
			
			<br></br>
					<div align="left" style="width:1024px;display: inline-block;">						
					<div id="filejsongrid" style="width: 902px; height:200px;display: inline-block;" ></div>
				</div>
			<br></br>
			<input id="submitbutton" type="button" value="Update Status" onclick="update_res_data()"/>
			<br></br>
			<div align="center" style="width:1024px;display: inline-block;">
			<img id = "img_frnt" style="width:50%;height:10%" >  
			</img>
			</div>
			<br></br>
		<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
		<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
		<input type="hidden" id="hdMsg2" name="hdMsg2"  value="<%=msg1%>">
		<input name="jsonString" id="jsonString" type="hidden" />
			<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
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
