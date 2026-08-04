<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="cts.*"%>
<%@page import="java.sql.*"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Inward Clearing</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<script src="js/jquery-1.11.3.min.js"></script>
<link rel="stylesheet" href="codebase/dhtmlx.css" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="codebase/dhtmlx.js"></script>
<script src="codebase/dhtmlxgrid_json.js"></script>
<script src="js/upload_download.js"></script> 
<style type="text/css">
#img_frnt {
  -moz-transition: transform 1s;
  -webkit-transition: transform 1s;
  transition: transform 1s;
}

#img_frnt1 {
  -moz-transition: transform 1s;
  -webkit-transition: transform 1s;
  transition: transform 1s;
}

.flip {
  transform: rotate(-180deg);
}
</style>
</head>
<%
	Connection con=Configuration.getConnection();
	String CFG_downloadpath_from_CHI=Configuration.getConfValByNm("CFG_downloadpath_from_CHI",con);
	String loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", con);
	con.close();
	String msg="";
	String userRole="";
	String branchCode=(String)session.getAttribute("session_branch_code");
	try
	{
		msg=request.getParameter("msg").trim();
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on inward_clearing form msg is null");
	}	
		
	try
	{
		userRole=session.getAttribute("session_user_role").toString();
		System.out.println("######################## userRole:"+userRole+"#####");
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on inward_clearing userRole is null");		
	}	
		
%>
<!--<body id="top" >
-->

<body id="top" onload="onload_inward_clearing()">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>

<div class="wrapper col3">
  <div id="container_chq">
	<table width="100%" height="100%" border="1" cellspacing="1" cellpadding="1">
		<tr id="viewType" name="viewType">
			<td colspan="2">
				<table align="center">
						<tr align="center">
							<td><label style="font-weight:bold">Download</label><input checked="checked" type="radio" name="downloadBtn" id="downloadBtn" onclick="getDownloadFileList()"/>&nbsp;&nbsp;
							<label style="font-weight:bold">Upload</label><input type="radio" name="uploadBtn" id="uploadBtn" onclick="getUploadFileList()"/>
							</td>
						</tr>
				</table>
			</td>		
		</tr>
		<tr id="downloadgridData" name="downloadgridData">
			<td>
			<div id="downloadgrid" style="width: 900px; height:300px;" >
			</div>
			</td>		
		</tr>
		
		<tr id="uploadgridData" name="uploadgridData">
			<td>
			<div id="uploadgrid" style="width: 900px; height:300px;" >
			</div>
			</td>		
		</tr>
	</table>
  </div>
</div>
<input type="hidden" id="rcnt" name="rcnt" value="1"/>
<input type="hidden" id="actionflg" name="actionflg" value="" />
<input type="hidden" id="selClrType" name="selClrType"" value="1"/>
<input type="hidden" id="rotateImgName" name="rotateImgName"" value=""/>
<input type="hidden" id="hd_selectCnt" name="hd_selectCnt" value="1"/>
<input type="hidden" id="hd_down_path" name="hd_down_path" value="<%=CFG_downloadpath_from_CHI%>"/>
<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>"/>
<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=branchCode%>"/>	
<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>

<input name="session_user_role" id="session_user_role" type="hidden" value="<%=session.getAttribute("session_user_role")%>"/>

<div id="footer">
		<!-- <p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer;">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label class="labels" style="color:#059BD8; cursor:pointer;"> &nbsp;&nbsp;Logout</label></a><br/></p>
			Version 2017.1.0<br/> -->
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
