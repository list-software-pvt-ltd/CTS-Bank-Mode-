<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN"
	dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS :Report Paper To Follow</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<link rel="stylesheet" href="jquery/jquerycss/jquery.ui.all.css">
	<script src="jquery/jquerylib/jquery-1.10.2.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.core.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.widget.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.datepicker.js"></script>
	<script src="js/deleteclearingoutwardfrdate.js"></script>
	<link rel="stylesheet" href="jquery/jquerycss/demos.css">
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
	System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@");
	String msg = "";
	String loginstyle="",date_ddmmyyyy="";
	try {
		Connection cn=null;
		cn=Configuration.getConnection();
		 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		 date_ddmmyyyy=Configuration.getDDMMYYYY();
		 date_ddmmyyyy=date_ddmmyyyy.substring(0,2)+"-"+date_ddmmyyyy.substring(2,4)+"-"+date_ddmmyyyy.substring(4);
		 cn.close();
		msg = request.getParameter("msg");
	} catch (NullPointerException ne) {
		System.out.println("Exception:" + ne);
	}
%>
<body id="top">
<!--<form name="formid" id="formid"  method="post">	 -->

		<jsp:include page="menu.jsp">
			<jsp:param name="htitle" value="MAIN" />
		</jsp:include>
		<div class="wrapper col3">
			<div id="container_chq">
				<center>
					<input name="session_loginid" id="session_loginid" type="hidden"
						value="<%=session.getAttribute("session_loginid")%>">
						<table width="100%" height="100%" border="0" cellspacing="1"
							cellpadding="1">
							<th align="center" c colspan="21">Delete/Regenerate Clearing
								Outward Lot
								<hr />
							</th>
							<tr colspan="21">
								<td align="right" colspan="2" width="15%">Select Date:</td>
								<td width="15%" colspan="2" align="left"><input type="text"
									name="datepicker" id="datepicker" placeholder="dd-mm-yyyy" value="<%=date_ddmmyyyy%>"/></td>

								<td align="right" width="15%">Branch</td>
								<td align="left" colspan="2" width="15%"><select
									id="opt_branch_code" name="opt_branch_code" disabled="disabled">
										<option
											value="<%=session.getAttribute("session_branch_code")%>"><%=session.getAttribute("session_branch_code") + "--" + session.getAttribute("session_BRM_BRNNM")%></option>
										<option value="All">All</option>
								</select> <%-- <input type="text" name="opt_branch_code" id="opt_branch_code"  value="<%=session.getAttribute("session_branch_code")+"--"+session.getAttribute("session_BRM_BRNNM")%>" disabled="disabled"> --%>
								</td>
								<td align="right" colspan="3" width="15%">Select Clearing
									Type:</td>
								<td width="15%" colspan="2" align="left"><select
									id="clearingtype" name="clearingtype">
										<option value="0">Select Clearing Type</option>
										<option value="01">CTS</option>
										<option value="11">Non CTS</option>
								</select></td>
								<td align="right" colspan="3" width="15%">Select BOFD:</td>
								<td width="15%" colspan="2" align="left"><select id="bofd"
									name="bofd">
										<option value="0">Select BOFD</option>
								</select></td>
								<td colspan="6" width="10%" align="center"><input
									type="button" name="btnfetchfiles" id="btnfetchfiles"
									value="Fetch Files" /></td>
							</tr>
						</table>
						<table width="100%" height="100%" border="0" cellspacing="1"
							cellpadding="1">
							<tr colspan="6">
								<td align="center" colspan="2" width="50%">Select File
									Name: <select id="xmlfilename" name="xmlfilename">
										<option value="0">Select File Name</option>
										<option value="02">NOT UPLOADED YET</option>
											<option value="03">Blocked MICR CODE</option>
										<option value="01">All</option>
								</select> 
						<input type="button" name="showbutton" id="showbutton"
									value="Show" />
								</td>
								<!--<td width="33%" colspan="2" align="left">
            </td>         
			<td colspan="2" width="33%" align="center">
            </td>-->
							</tr>
						</table >
						
							<div id="img_container" style="align:center; height:200px; display: none; position: fixed; left:35%; top:50%; border-style: solid;border-color: red;" >
		                          
		                          <img id="image_nm" name="image_nm" src="" height="200px" onClick="document.getElementById('img_container').style.display='none'"> </img>
		                    </div>
		                  
						<table height="100%" width="100%" cellpadding="0%"
							cellspacing="0%">
							<tr>
								<td width="100%">
									<div
										style="float: left; height: 250px; overflow: auto; width: 100%">
										<table border="1" id="tab_co_cbs_data" style="width: 100%"
											cellpadding="0" cellspacing="0">
										</table>
									</div>
								</td>
							</tr>
							<tr>
								<td colspan="2" style="padding-left: 40px">Total Amount: <input
									type="text" readonly="true" name="totalamnt" id="totalamnt" />&nbsp;&nbsp;&nbsp;&nbsp;
									Selected Count: <input type="text" readonly="true"
									name="selcnt" id="selcnt" />&nbsp;&nbsp;&nbsp;&nbsp; Selected
									Amount: <input type="text" readonly="true" name="selamt"
									id="selamt" />

								</td>

							</tr>
							<tr>
								<td colspan="2" align="center"><input name="whattodo"
									id="whattodo" type="hidden" /> <input name="brncd" id="brncd"
									type="hidden" /> <input type="button" name="deletebutton"
									id="deletebutton" value="Delete" disabled="disabled" /> <input
									type="button" name="updatebutton" id="updatebutton"
									value="Update" disabled="disabled" /> <input
									name="session_loginid" id="session_loginid" type="hidden"
									value="<%=session.getAttribute("session_loginid")%>"> <input
										name="session_main_br_yn" id="session_main_br_yn"
										type="hidden"
										value="<%=session.getAttribute("session_main_br_yn")%>">
											<input name="VALS" id="VALS" type="hidden" />
											 <input name="CHKBOXVAL" id="CHKBOXVAL" type="hidden"/> <input
											type="hidden" id="onloadMsg" name="onloadMsg"
											value="<%=msg%>" />
											<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/></td>
							</tr>
						</table>
				</center>
			</div>
		</div>
		<div style="visibility: none" id="img_container">
		     
		     <img id="image_nm" name="image_nm"> </img>
		     
		</div>
		<div id="footer">
			<!--  <p>(c) 2014 Developed by <a href="http://listspl.co.in/">
      <label style="color:#FFFFFF; cursor:pointer">LIST Software Pvt. Ltd.</label> -->

			<a href="javascript:showLogin()"> <label
				style="color: #059BD8; cursor: pointer">Logout</label>
			</a>
			<jsp:include page="footer.jsp"></jsp:include>
		</div>
		<!--</form>-->
</body>
</html>
