<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS :Report Clearing Outward</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="js/pps_dashboard.js"></script>
<script src="js/commonLib.js"></script>
<link rel="stylesheet" href="jquery/jquerycss/jquery.ui.all.css">
	<script src="jquery/jquerylib/jquery-1.10.2.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.core.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.widget.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.datepicker.js"></script>
	<link rel="stylesheet" href="jquery/jquerycss/demos.css">	
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

<body id="top" onload="onLoad()">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>
<div class="wrapper col3">
  <div id="container_chq">
  <center>
  			<div class="pendingforcreate" id="pendingforcreate" name="pendingforcreate">
             <h2>Pending for File Creation</h2>
             <div class="noti_bubble"></div> 
             </div>
             <div class="pendingforread">
             <h2>Pending for Response Reading</h2>
             <div class="noti_bubble1"></div> 
             </div>
             <style type="text/css">
			
				div.pendingforcreate
				{
				width:50px;
				padding:50px;
				border: 2px solid #000;
				border-radius: 15px;
				position: absolute;
			    left: 60%;
			    top: 10%;
			    background-color: white;
			    border-color:#2684B7;
			  	z-index: 0;
			    margin-left: -300px;
				}
				div.pendingforread
				{
				width:50px;
				padding:50px;
				border: 2px solid #000;
				border-radius: 15px;
				position: absolute;
			    left: 90%;
			    top: 10%;
			    background-color: white;
			    border-color:#2684B7;
			  	z-index:0;
			    margin-left: -300px;
				}
				div.noti_bubble
			     {
				    position:absolute;
				    top: -6px;
				    right:-6px;
				    padding:10px 20px 10px 20px;
				    background-color:#2684B7;
				    color:white;
				    font-weight:bold;
				    font-size:small;
				    border-radius:30px;
				    box-shadow:1px 1px 1px gray;
				    border-color:orange;
			   	}
			   	  div.noti_bubble1
			     {
				    position:absolute;
				    top: -6px;
				    right:-6px;
				    padding:10px 20px 10px 20px;
				    background-color:#2684B7;
				    color:white;
				    font-weight:bold;
				    font-size:small;
				    border-radius:30px;
				    box-shadow:1px 1px 1px gray;
				    border-color:orange;
			   	}
				h2 
				{
	    			font-size: 15px;
	    			line-height: 25px;
	    			text-align: center;
	    			
	    		}
			</style>
  </center>
  </div>
  </div> 
  <input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
		<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
		<input name="jsonString" id="jsonString" type="hidden">
		<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
		<input type="hidden" id="whattodo" name="whattodo" />
  <div id="footer">
<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label style="color:#059BD8; cursor:pointer"> &nbsp;&nbsp;Logout</label> </a></p>
 -->
 <a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
  <jsp:include page="footer.jsp"></jsp:include></div>

</body>
</html>