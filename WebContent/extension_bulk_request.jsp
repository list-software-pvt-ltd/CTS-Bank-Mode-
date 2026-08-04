<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="java.sql.Connection"%>
<%@page import="cts.*"%>
<%@page import="java.io.*"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS :Send Bulk Extension Request</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="js/main.js"></script>
<script src="js/extension_bulk_request.js"></script>
 <script src="jquery/jquerylib/jquery-1.10.2.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.core.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.widget.js"></script>
	<script src="jquery/jquerylib/ui/jquery.ui.datepicker.js"></script>
	<link rel="stylesheet" href="jquery/jquerycss/demos.css">	
	<link rel="stylesheet" href="jquery/jquerycss/jquery.ui.all.css">
	<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%
String loginstyle="";
try{
Connection cn=null;
cn=Configuration.getConnection();
 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
 cn.close();
}catch(Exception e){
	System.out.println("exception"+e);
}
%>
<script>
$(document).ready(function()
	{
		var fromDate = $('#datepicker');
		fromDate.datepicker({dateFormat: 'dd-mm-yy'});	
		var toDate = $('#datepicker2');
		toDate.datepicker({dateFormat: 'dd-mm-yy'});			
	});
</script>
</head>
<%
	String msg="",doICallMerge="Y";
	String btnVal="";
	
	System.out.println("\n\tbtnVal::::>>>"+btnVal);
	Connection con=Configuration.getConnection();
	try
	{
		btnVal=request.getParameter("btnVal");
		msg=request.getParameter("msg").trim();
		if(msg!=null)
		{
			msg=msg.trim();
		}
		System.out.println("msg::::>>>"+msg);
		if(btnVal!=null)
		{
			btnVal=btnVal.trim();
		}
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on login form is null");		
	}	
	try
	{
		String retOwdPth=Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
		File FileList[]=new File(retOwdPth).listFiles();
		for(File f:FileList)
		{
			if(f.isFile())
			{
				if(f.getName().indexOf("RRF")>-1 && f.getName().indexOf(Configuration.getDDMMYYYY())>-1 && f.getName().indexOf(".xml")>-1)
				{
					doICallMerge="N";
				}
			}
		}
	}
	catch(Exception e)
	{
		System.out.println("Exception::----->"+e);
	}
%>
<body id="top" onload="onLoad_extensionRequest()">
<jsp:include page="menu.jsp">
<jsp:param name="htitle" value="MAIN" />
</jsp:include>
  <div id="para_form" style="border-radius: 11px 11px 11px 11px;position:absolute;width:70%;height:60%;top:30%;bottom:0%;left:20%;right:10%;border:#666666;z-index:5;background-color:rgba(213,213,229,.9);display:none;border-style:solid;">
    <center>
      <div style="position:absolute; height:5%; width:100%; top:0%; left:0%; right:0%; bottom:0%; z-index:5" align="right"> <img src="images/close.png"  align="right" style="z-index:2" onClick="closeWindow()"> </div>
      <iframe id="center_frm" style="width:100%;height:100%; position:absolute; float:left; right:0%;left:0%; top:0%; bottom:0%;  margin:0; padding:0; " ><br>
      </iframe>
    </center>
  </div>
  <div class="wrapper col3">
    <div id="container_chq">
      <h1>Extention Request</h1>
	  <table>
	  <tr>
	   <td>Reason Period:
	   </td>
	     <td>
		 <input type="text" name="datepicker" id="datepicker" value="dd-mm-yyyy"/>
	   </td>
	   
	     <td>Clearing type:
	   </td>
	     <td><select id="opt_ctsNonCTS_code" name="opt_ctsNonCTS_code">
					  <option value="0">-- All --</option>
					  <option value="01">-- CTS --</option>
					  <option value="11">-- Non-CTS --</option>
					</select>
	   </td>
	   <td>
	   <select id="opt_reason_code" name="opt_branch_code" >
					  <option value="0">-- Select Reason Code--</option>
					</select>
	   </td>
	     
	 <td> <input type="button" name="Show" value="Show" onclick="onshowc()" />
	   </td>
	    </tr>
	  </table>
      <table width="100%" cellpadding="0" cellspacing="0">
	   
        <tr>
          <td colspan="2" width="100%">
		  <table id="extreq" cellpadding="0" cellspacing="0">
              <tr>
                <td width="9%"><span style="font-weight:bold">SrNo</span> </td>
                <td width="15%"><span style="font-weight:bold">Cheque No.</span> </td>
                <td width="15%"><span style="font-weight:bold">Sort Code</span> </td>
                <td width="15%"><span style="font-weight:bold">Tran Code</span> </td>
                <td width="15%"><span style="font-weight:bold">Amount</span> </td>
                <td width="15%"><span style="font-weight:bold">Reason Code</span> </td>
                <td width="15%"><span style="font-weight:bold">Period (In Hrs)</span> </td>
              </tr>
            </table>
			</td>
        </tr>
        <tr>
          <td colspan="2" >
		  	<table id="TotalAmount" width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr id="grandAmt" align="right">
                <td  width="50%"><span style="font-weight:bold">Grand Total:</span></td>
                <td id="gdAmt" align="left"  width="25%"><input type="text" name="grdAmt" id="grdAmt" value="0.0" disabled="disabled" readonly="true" style="font-weight:bold;border:none;background:transparent"/>
                </td>
                <td align="left"><label style="font-family:'Times New Roman', Times, serif;font-size:16px;text-decoration:blink;color:#FF0000"> <a href="#" onclick="show_warning()" style="color:#FF0000;text-decoration:underline">Warning</a> </label>
                </td>
              <tr>
            </table></td>
        </tr>
        <tr style="width:100%">
          <td style="width:10%" align="left"><input type="button" name="Merge" id="submitbutton" value="Convert" onclick="convertExtensionFile()" />
          </td>
          <td align="left" style="width:90%"id="msgtd"></td>
          
        </tr>
        <tr>
			<td colspan="2">
          <label id="lbl_indicator" style="color:#FF0000">(Red Background indicates : Invalid Extension Reason code)</label>
		  </td>
        </tr>
      </table>
    </div>
  </div>
  <input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
  <input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
  <input type="hidden" id="rcnt" name="rcnt" value="1"/>
  <input type="hidden" id="btnVal" name="btnVal" value="<%=btnVal%>"/>
  <input type="hidden" id="hdRec" name="hdRec" value="null"/>
  <input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>

<div id="footer">
  <!-- <p>(c) 2014 Developed by <a href="http://listspl.co.in/">
    <label style="color:#FFFFFF">LIST Software Pvt. Ltd.</label> -->
    
     <p>
    </a><a href="javascript:showLogin()">
    <label style="color:#059BD8"> &nbsp;&nbsp;Logout</label>
    </a></p>
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
<input type="hidden" id="hddoICallMerge" name="hddoICallMerge" value="<%=doICallMerge%>"/>
</body>
</html>
