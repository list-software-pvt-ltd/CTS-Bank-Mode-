<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS :Response File</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="js/responseFile.js"></script>
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
	
	System.out.println("\n ****************** responseFile.jsp ******************");	
	String msg="";
	String loginstyle="";
	try
	{
		Connection cn=null;
		cn=Configuration.getConnection();
		 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		 cn.close();
		msg=request.getParameter("msg").trim();	
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on login form is null");		
	}	
		
%>


<body id="top" onload="onLoad_responseFile()">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>

<div class="wrapper col3">
 <!-- <div id="container" class="wrapper">
 
  <div class="fl_left">	-->
  <div id="container_chq" style='border:none; height:500px;' >
	<!--write table tags-->
	<h1> Response File </h1>
<!--	<table style="height:100%; width:100%;">
		<tr>
			<td id="tablediv" style="height:100%; width:100%; border:none">
			</td>		
		</tr>
	</table>-->
	
	<center>
		<table style="height:100%; width:100%;">
			<tr>
				<td align="right">Select Type:</td>
					<td align="left">
						<select id="opt_responseType" name="opt_responseType" onChange="onChangeResponseType()">
								  <option value="0">-- Select Response Type--</option>
								  <option value="C">-- Clearing Outward --</option>
								  <option value="R">-- Return Outward --</option>						  						
						</select>
					</td>
			</tr>
		</table>
	</center>
	
	<div id="container_chq" style='border:none; height:100px; overflow:scroll' >	
		<table style="height:5%; width:100%;" id="tbl_Header">
			<tr>
			<!--CREATIONDATE,CREATIONTIME,FILESTATUSCODE,ITEMSEQNO,SERIALNO,REJECTREASON,FILENAME-->
				<td>CREATION DATE</td>
				<td>CREATION TIME</td>
				<td>FILE STATUS CODE </td>
				<td>ITEM SEQ NO</td>
				<td>SERIALNO </td>
				<td>REJECT REASON CODE </td>
			</tr>
		</table>	
		<table style="height:50%; width:100%;" border="2" id="tbl_details">

		</table>	
		<table >
			<tr>
				<td><input type="button" name="btnGetReport" id="submitbutton" value="Update" onclick="onClickOfUpdate()"/></td>
			</tr>
		</table>
	</center>
	<input type="hidden" id="tblVal" name="tblVal"/>
	<input type="hidden" id="rCnt" name="rCnt" value="0"/>	
	<input type="hidden" id="hiddenRec" name="hiddenRec" value="null"/>	
	
		<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
		<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
	<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
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
