<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS :Response File</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
<script src="js/extensionFile.js"></script>
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
	
	String msg="",ret="";
String loginstyle="";
	try
	{
		Connection cn=null;
		cn=Configuration.getConnection();
		loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		cn.close();
		ret=request.getParameter("retString").trim();
		if(ret!=null)
		{
			ret=ret.trim();
		}
		System.out.println("ret::::>>>"+ret);
		msg=request.getParameter("msg").trim();
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on login form is null");		
	}
%>
<body id="top" onload="onLoad_extensionFile()">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>

<div class="wrapper col3">
 <!-- <div id="container" class="wrapper">
 
  <div class="fl_left">	-->
  <div id="container_chq" style='border:none; height:100px;  width:1000px; overflow:scroll;'>
	<!--write table tags-->
	<h1>Extension File </h1>
	  <div  class="fl_center" align="center">
	  	<div id="yespickfile">
				<input type="file" id="file_pick" name="file_pick" />
			<input id="submitbutton" name="submitbtn"  type="button" value="Upload Files" onclick="uploadFiles()" />
		<br/><br/></div>
		<input type="hidden" id="ret" name="ret" value="<%=ret%>"/>
			<input type="hidden" id="retstr" name="retstr" value="EXTENSION"/>
	</div>
	
	<input type="hidden" id="tblVal" name="tblVal"/>	
	<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
		<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
		<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
</div>
	<input type="hidden" id="rCnt" name="rCnt" value="0"/>
</div>

<div id="footer">

<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer;">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label class="labels" style="color:#059BD8; cursor:pointer;"> &nbsp;&nbsp;Logout</label> </a></p>
 -->
 <a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
  <jsp:include page="footer.jsp"></jsp:include>
 </div>
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
