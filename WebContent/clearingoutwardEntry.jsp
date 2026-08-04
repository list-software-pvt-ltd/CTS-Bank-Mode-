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
<script src="js/clearingoutwardEntry.js"></script>
<link rel="stylesheet" href="jquery/jquerycss/demos.css">
</head>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
	System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@");
	String msg = "";
	String loginstyle="";
	try {
		Connection cn=null;
		cn=Configuration.getConnection();
		 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		 cn.close();
		msg = request.getParameter("msg");
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
        <table width="100%" height="100%" border="0" cellspacing="1" cellpadding="1">
          <th align="center"c colspan="14"> Clearing Outward Entry
              <hr/>
            </th>
          <tr colspan="14">
            <td align="right" colspan="2" width="15%">Select Date:</td>
            <td width="15%" colspan="2" align="left"><input type="text" name="datepicker" id="datepicker" value="dd-mm-yyyy"/>
            </td>
          
			<!-- <td align="right" width="15%">Branch</td>
			<td align="left" colspan="2"  width="15%">
				<select id="opt_branch_code" name="opt_branch_code" >
					  <option value="0">Select Branch</option>
					</select>
			</td>	 -->
			<!-- <td align="right"colspan="3" width="15%">Select Clearing  Type:</td>
            <td width="15%" colspan="2" align="left"><select id="clearingtype" name="clearingtype" >
                <option value="0">Select Clearing Type</option>
                <option value="01">CTS</option>
                <option value="11">Non CTS</option>
              </select>
            </td> -->
            
		</tr>
		</table>
		<!--   <table width="100%" height="100%" border="0" cellspacing="1" cellpadding="1">
		 <tr colspan="14">
            <td align="right" colspan="2" width="15%">BOFD:</td>
            <td width="15%" colspan="2" align="left"><input type="text" name="text_CLO_BOFD" id="text_CLO_BOFD" />
            </td>
          
			<td align="right" width="15%">CHQNO:</td>
			<td align="left" colspan="2"  width="15%">
				<input type="text"  name="text_CLO_CHQNO" id="text_CLO_CHQNO" />
			</td>	
			<td align="right"colspan="3" width="15%">SORTCD:</td>
            <td width="15%" colspan="2" align="left">
            <input type="text"  name="text_CLO_SORTCD" id="text_CLO_SORTCD" />
            </td>
            
		</tr>
		 <tr colspan="14">
            <td align="right" colspan="2" width="15%">TRANCD:</td>
            <td width="15%" colspan="2" align="left"><input type="text" name="text_CLO_TRANCD" id="text_CLO_TRANCD" />
            </td>
          
			<td align="right" width="15%">AMOUNT:</td>
			<td align="left" colspan="2"  width="15%">
				<input type="text"  name="text_CLO_AMOUNT" id="text_CLO_AMOUNT" />
			</td>	
			<td align="right"colspan="3" width="15%">PAYEE_ACCNO:</td>
            <td width="15%" colspan="2" align="left">
            <input type="text"  name="text_CLO_PAYEE_ACCNO" id="text_CLO_PAYEE_ACCNO" />
            </td>
            
		</tr>
		<tr colspan="14">
            <td align="right" colspan="2" width="15%">PAYEE_ACCNM:</td>
            <td width="15%" colspan="2" align="left"><input type="text" name="text_CLO_PAYEE_ACCNM" id="text_CLO_PAYEE_ACCNM" />
            </td>
          
			<td align="right" width="15%">DRAWEE_ACCNO:</td>
			<td align="left" colspan="2"  width="15%">
				<input type="text"  name="text_CLO_DRAWEE_ACCNO" id="text_CLO_DRAWEE_ACCNO" />
			</td>	
			<td align="right"colspan="3" width="15%">DATE:</td>
            <td width="15%" colspan="2" align="left">
           <input type="text"  name="text_CLO_DATE_DDMMYYYY" id="text_CLO_DATE_DDMMYYYY" />
            </td>
            
		</tr>
		<tr colspan="14">
            <td align="right" colspan="2" width="15%">BRANCH_CD:</td>
            <td width="15%" colspan="2" align="left"><input type="text" name="text_CLO_BRANCH_CD" id="text_CLO_BRANCH_CD" />
            </td>
          
			
			<td align="right"colspan="3" width="15%">CLEARINGTYPE:</td>
            <td width="15%" colspan="2" align="left">
          <input type="text"  name="text_CLO_CLEARINGTYPE" id="text_CLO_CLEARINGTYPE" />
            </td>
            
		</tr>
		<tr colspan="14">
            	
			<td align="right"colspan="3" width="15%">ITEMSEQNO:</td>
            <td width="15%" colspan="2" align="left">
          <input type="text"  name="text_CLO_ITEMSEQNO" id="text_CLO_ITEMSEQNO" />
            </td>
            
		</tr>
		
		</table>  -->
		<table>
	<tr>
		<td>
			<label id="textfilename"></label>
		</td>
	</tr>
	<tr>	
		<td>
			<div class="one_half first">
				<input class="btn_small" name="btnAddRow_relper" id="btnAddRow_relper" type="button" value="Add Row">
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<div align="center" style="width: 768px; display: inline-block;">
				<div id="addclogrid" style="width:980px; height: auto; min-height:200px; display: inline-block; margin:auto;"></div>	
			</div>
		</td>
	</tr>
	
</table>
        <table height="100%" width="100%" cellpadding="0%" cellspacing="0%">
          <tr>
            <td colspan="2" align="center"> 
			 <input name="whattodo" id="whattodo" type="hidden"/>
			<input type="button" name="Savebutton"    id="Savebutton" value="Save"  onClick="updateAllClorecord()" >
			
			  <input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
			   <input name="VALS" id="VALS" type="hidden"/>
			  <input type="hidden" id="onloadMsg" name="onloadMsg" value="<%=msg%>" /> 
			  <input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
            </td>
          </tr>
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
