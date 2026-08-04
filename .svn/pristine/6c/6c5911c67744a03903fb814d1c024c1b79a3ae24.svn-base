<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Blocked Bank Code</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<link rel="stylesheet" href="codebase/dhtmlx.css" />
<script src="jquery/jquerylib/jquery-1.10.2.js"></script>
<script src="jquery/jquerylib/ui/jquery.ui.core.js"></script>
<script src="jquery/jquerylib/ui/jquery.ui.widget.js"></script>
<script src="codebase/dhtmlx.js"></script>
<script src="codebase/dhtmlxgrid_json.js"></script>
<script src="js/blockedMICR.js"></script>
<script src="js/commonLib.js"></script>
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%

String msg="";
String loginstyle="";
try
{
	Connection cn=null;
	cn=Configuration.getConnection();
	 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
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
  <h1>Blocked MICR Code</h1>
  <div class="fl_left" align="right">
      	
      	  <input style="margin-right: 10%"  type="button" name="btnAddNew" id="submitbutton" value="Add New" onclick="onClickAddNew()"/>
			
		<br><br>
				<div align="center" style="width:1024px;display: inline-block;">						
					<div id="jsongrid" style="width: 800px; height:350px;display: inline-block;" ></div>
				</div>
	           
	       
	         <input style="margin-right: 10%"   type="button" name="btnSubmit" id="submitbutton" value="SUBMIT" onclick="onClickSubmit()"/>
				<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
				<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
				<input name="jsonString" id="jsonString" type="hidden">
				<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
				<input type="hidden" id="whattodo" name="whattodo" value="F" />
				</div>
  </div>
</div>

<div id="footer">

 <a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
  <jsp:include page="footer.jsp"></jsp:include></div>
<%
System.out.println("Sharayu Message:"+msg);
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
