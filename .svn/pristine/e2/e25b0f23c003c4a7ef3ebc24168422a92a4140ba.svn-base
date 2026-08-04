<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="java.sql.Connection"%>
<%@page import="cts.*"%>
<%@page import="java.io.*"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Merging</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />

<script src="js/main.js"></script>
</head>
<%
	
	System.out.println("**************** start ---- return_outward.jsp ********************");
	Thread.sleep(1000);
	String msg="",doICallMerge="Y";
	String btnVal="";
	String loginstyle="";
	Connection con=Configuration.getConnection();
	try
	{
		 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", con);
		msg=request.getParameter("msg");
		//Thread.sleep(1000);
		btnVal=request.getParameter("btnVal");
		//Thread.sleep(1000);
		System.out.println("\n\tbtnVal::::>>>"+btnVal);
		System.out.println("msg::::>>>"+msg);
		if(msg!=null)
		{
			msg=msg.trim();
		}
		if(btnVal!=null)
		{
			btnVal=btnVal.trim();
		}
	}
	catch(NullPointerException npe)
	{
		System.out.println("*** NullPointerException:>>> in return_outward.jsp***");		
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
		con.close();	
	}
	catch(Exception e)
	{
		System.out.println("Exception::----->"+e);
	}
%>
<body id="top" onload="onLoad_returnOutward()">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>

<div class="wrapper col3">
  <div id="container_chq">
	  <h1>Return Outward</h1>
  <table>
  <th>
		<tr>
			<td colspan="2">
				<table id="retowd">
					<tr>
						<td>
							<span style="font-weight:bold">SrNo</span>						</td>
						<td>
							<span style="font-weight:bold">Cheque No.</span>						</td>
						<td>
							<span style="font-weight:bold">Sort Code</span>						</td>
						<td>
							<span style="font-weight:bold">Tran Code</span>						</td>
						<td>
							<span style="font-weight:bold">Amount</span>						</td>
						<td>
							<span style="font-weight:bold">Reason Code</span>						</td>
					</tr>
				</table>
				
				<table id="TotalAmount" width="100%" border="0">				
					<tr id="grandAmt" align="right">								
						<td  width="50%"><span style="font-weight:bold">Grand Total:</span></td>
						<td id="gdAmt" align="left"  width="25%">
						
				<input style="font-weight:bold;" type="text" name="grdAmt" id="grdAmt" value="0.0" disabled="disabled" readonly="true" style="border:none;background:transparent" />	
						</td>
					<tr>
				</table>
			</td>
		</tr>
		<tr style="width:100%">			
			<td style="width:10%" align="left">
			<!--<input type="button" name="Merge" id="submitbutton" value="Convert" onclick="upload_return_outward()" />-->
			<input type="button" name="Merge" id="submitbutton" value="Convert" onclick="upload_return_outward()" />
			</td>
			<td align="left" id="msgtd">
			
			</td>
			</tr>
  </table>
  <input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
				   <input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">			
	<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>			   
  </div>
</div>
<input type="hidden" id="rcnt" name="rcnt" value="1"/>
<input type="hidden" id="btnVal" name="btnVal" value="<%=btnVal%>"/>
<input type="hidden" id="hdRec" name="hdRec" value="null"/>

<div id="footer">
<!-- 		<p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a></p>
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
	<input type="hidden" id="hddoICallMerge" name="hddoICallMerge" value="<%=doICallMerge%>"/>
</body>
</html>
