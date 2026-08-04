<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Return Inward</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<link rel="stylesheet" href="codebase/dhtmlx.css" />
<script src="codebase/dhtmlx.js"></script>
<script src="js/jquery-1.11.3.min.js"></script>
<script src="codebase/dhtmlxgrid_json.js"></script>
<script src="js/cleOutward_resFile.js"></script>
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
	
	String msg="",retStr="";
	String loginstyle="";
	try
	{
		Connection cn=null;
		cn=Configuration.getConnection();
		loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		cn.close();
		retStr=request.getParameter("retStr").trim();
		msg=request.getParameter("msg").trim();
		System.out.println("msg===="+msg+"&&&retStr==="+retStr);		
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on login form is null");		
	}	
		
%>

<body id="top"  onload="onload_cleOutward_response()">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>
<div class="wrapper col3">
  <div id="container" class="wrapper">
  <h1>Response File Reading</h1>
  	<div  class="fl_center" align="center">
	  	<div id="yespickfile">
				<input type="file" id="file_pick" name="file_pick[]" size="20" multiple="multiple" />
		<input type="hidden" id="filenames" name="filenames" value=""/>
			<input id="submitbutton" name="submitbtn"  type="button" value="Upload Files" onclick="uploadFiles()" />
		<br/><br/></div>
	</div>
  <div class="fl_left" align="center" id="divhide">
		<label id="list_filenames" style="font-weight:bold">Response File Names</label>
		<br/><br/>
					<div align="center" style="width:1024px;display: inline-block;">						
						<div id="filejsongrid" style="width: 400px; height:200px;display: inline-block;" ></div>
				   </div>
				<br/><br/>
	
		<input id="submitbutton" type="button" value="Read Files" onclick="read_cleOutward_response()"/>
		<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>"/>
		<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>"/>
		<input name="jsonString" id="jsonString" type="hidden"/>
		<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
		
		
	</div>
  </div>
</div>
<input type="hidden" id="retStr" name="retStr" value="<%=retStr%>"/>
<div id="footer">
<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer;">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label class="labels" style="color:#059BD8; cursor:pointer;"> &nbsp;&nbsp;Logout</label> </a></p>
 -->
 <a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
  <jsp:include page="footer.jsp"></jsp:include></div>
<%
System.out.println("Message:===="+msg);
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
<!--</form>-->
</body>
</html>
