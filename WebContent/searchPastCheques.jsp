<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>Clearing Outward Entry</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<link rel="stylesheet" href="jquery/jquerycss/jquery.ui.all.css">
<link rel="stylesheet" href="codebase/dhtmlx.css" />

<script src="jquery/jquerylib/jquery-1.10.2.js"></script>
<script src="jquery/jquerylib/ui/jquery.ui.core.js"></script>
<script src="jquery/jquerylib/ui/jquery.ui.widget.js"></script>
<script src="jquery/jquerylib/ui/jquery.ui.datepicker.js"></script>
<script src="codebase/dhtmlx.js"></script>
<script src="codebase/dhtmlxgrid_json.js"></script>
<script src="js/searchPastCheques.js"></script>
<link rel="stylesheet" href="jquery/jquerycss/demos.css">
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
	System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@");
	String msg = "",uploadpath="";
	String loginstyle="";
	try {
		Connection cn=null;
		cn=Configuration.getConnection();
		 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		 cn.close();
		msg = request.getParameter("msg");
		uploadpath=session.getAttribute("uploadpath").toString();
	} catch (NullPointerException ne) {
		System.out.println("Exception:" + ne);
	}
	
%>
<body id="top" >

  <jsp:include page="menu.jsp">
  <jsp:param name="htitle" value="MAIN" />
  </jsp:include>
  <div class="wrapper col3">
    <div id="container_chq">
      <center>
        <input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
        <table width="100%" height="100%" border="1" cellspacing="1" cellpadding="1">
          <th align="center"c colspan="14">Search Past Cheques of Inward/Outward
              <hr/>
            </th>
          <tr>
          	<td align="right">Cheque Type:</td>
			<td align="right" colspan="2"  width="15%">
				<select id="opt_cheq_type" name="opt_cheq_type" onchange="enableField()" >
					  <option value="0">Select Cheque Type:</option>
					  <option value="clearingOutward">CLEARING OUTWARD</option>
					  <option value="clearingInward">CLEARING INWARD</option>
					</select>
			</td>
            <td align="left" colspan="2" width="15%">Select Date:</td>
            <td width="15%" colspan="2" align="left"><input type="text" name="datepicker" id="datepicker" placeholder="dd-mm-yyyy" disabled="disabled"/>
            </td>
          			
			</tr>
			<tr>	
			 <td>Select Clearing  Type:</td>
            <td><select id="clearingtype" name="clearingtype" disabled="disabled" >
                <option value="0">Select Clearing Type:</option>
                <option value="01">CTS</option>
                <option value="11">Non CTS</option>
              </select>
            </td>
             <td>Cheque Number:</td>
            <td><input type="text" name="cheqNo" id="cheqNo" placeholder="Cheque Number" disabled="disabled"/>
            </td>
             <td>Sort Code:</td>
            <td><input type="text" name="sortCode" id="sortCode" placeholder="Sort Code" disabled="disabled"/>
            </td>
             <td>Amount(In Paisa):</td>
            <td><input type="text" name="amount" id="amount" placeholder="Amount" disabled="disabled"/>
            </td>
            
		</tr>
		<tr>
		<table height="100%" width="100%" cellpadding="0%" cellspacing="0%">
          <tr>
            <td colspan="2" align="center"> 
			<input type="button" name="fetchbutton" id="fetchbutton" value="Fetch Data"  onClick="fetchClorecord()" disabled="disabled" >
		</tr>
		</table>
		</tr>
		</table>
	
	<table>
	<tr>
		<td>
			<div align="center" style="width: 768px; display: inline-block;">
				<div id="addclogrid" style="width:980px; height: auto; min-height:200px; display: inline-block; margin:auto;"></div>
			<!-- 	<div id="addclogrid1" style="width:980px; height: auto; min-height:200px; display: inline-block; margin:auto;"></div>	 -->	
			</div>
		</td>
	</tr>
	
</table>
<table height="100%" width="100%" cellpadding="0%" cellspacing="0%">
          <tr>
            <td colspan="2" align="center"> 
			 <input name="whattodo" id="whattodo" type="hidden"/>
			<input type="button" name="Resetbutton" id="Resetbutton" value="Reset" onclick="onReset()">
			
			  <input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
			   <input name="VALS" id="VALS" type="hidden"/>
			    <input name="PATH" id="PATH" type="hidden" value="<%=uploadpath%>" />
			  <input type="hidden" id="onloadMsg" name="onloadMsg" value="<%=msg%>"/> 
			  <input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
            </td>
          </tr>
          <tr>
          <br></br>
			<div align="center" style="width:1024px;display: inline-block;">
			<img id = "img_frnt" style="width:50%;height:10%" >  
			</img>
			</div>
			<br></br></tr>
        </table>
      </center>
    </div>
  </div>
  <div id="footer">
   <!--  <p>(c) 2014 Developed by <a href="http://listspl.co.in/">
      <label style="color:#FFFFFF; cursor:pointer">LIST Software Pvt. Ltd.</label> -->
      	
       <a href="javascript:showLogin()">
      <label style="color:#059BD8; cursor:pointer">Logout</label>
      </a>
      <jsp:include page="footer.jsp"></jsp:include>
  </div>

</body>
</html>
