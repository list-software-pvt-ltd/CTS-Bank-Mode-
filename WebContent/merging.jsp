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

<!-- <script src="js/main.js"></script> -->
<script src="jquery/jquerylib/jquery-1.10.2.js"></script>
<link rel="stylesheet" href="jquery/jquerycss/jquery.ui.all.css">
<script src="js/merging.js"></script>

<!--<style>
  .hide { position:absolute; top:-1px; left:-1px; width:1px; height:1px;  }
</style>-->

</head>
<%
	Connection con=Configuration.getConnection();
	String msg="",doICallMerge="Y";
	String loginstyle="";
	try
	{
		 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", con);
		msg=request.getParameter("msg").trim();
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
				if(f.getName().indexOf("CIBF")>-1 && f.getName().indexOf(Configuration.getDDMMYYYY())>-1 && f.getName().indexOf(".img")>-1)
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
	con.close();

%>
<body id="top" onload="onLoad_merging()">

<!--<iframe name="hiddenFrame" class="hide"></iframe>
-->
<!--<form name="formid" id="formid"  method="post">	 -->


<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>


<div class="wrapper col3">
  <div id="container_chq">
  
  <table>
   		<tr style="width:100%">
			<td>  <h1>Merging</h1>
			</td>
	  	</tr>
			<tr style="width:100%">
				<td style="width:300px" align="center">
					<table width="50%">
						<tr>
							<td align="right">
								<label>Scanning Wise</label>
							</td>
							<td>
								<input type="radio" id="rd_scanwise" checked="checked" onclick="radioclick(this)" />		
							</td>
							<td align="right">
								<label> Branch Wise</label>
							</td>
							<td>
								<input type="radio" id="rd_brnwise" onclick="radioclick(this)" />		
							</td>
						</tr>
					</table>
					
					
				</td>
			</tr>
			<tr style="width:100%">
			
			<td style="width:300px" align="left">
			<div style="height:200px; overflow:auto;">
					<table id="tab_merge_stats" border="1" style="overflow:auto;">
						<tr>
							<td>
								<label style="font-weight:bold">Select All</label>
								<input id="chk_selall" type="checkbox" onClick="toggle_out_clearing(this)" title="Select All"/>
							</td>
							<td>
								<label style="font-weight:bold">Branch Code</label>
							</td>
							<td>
								<label style="font-weight:bold">Branch Name</label>
							</td>
							<td>
								<label style="font-weight:bold">No. Of Uploaded Cheques</label>
							</td>
							<td>
								<label style="font-weight:bold">Total Amount (In Rs.)</label>
							</td>
							<td>
								<label style="font-weight:bold">No. Of Non Uploaded Cheques</label>
							</td>
						</tr>
					</table>
					</div>
					<table id="gTotTable" style="display:none">
						<tr id="grandTot" >
							<td width="53%" align="right">
								<label style="font-weight:bold">Grand Total:</label>
							</td>
							<td width="19%">
								
								<input type="text" id="txtGrandTotUpCheq" name="txtGrandTotUpCheq" disabled="disabled" style="border:none"/>
							</td>
							<td width="20%">
								
								<input type="text" id="txtGrandTot" name="txtGrandTot" disabled="disabled" style="border:none"/>
							</td>
							<td width="21%">
								
								<input type="text" id="txtGrandTotNonUpCheq" name="txtGrandTotNonUpCheq" disabled="disabled" style="border:none"/>
							</td>
						</tr>
						
						
					</table>
					
					<!--<table id="gTotTable" style="display:none">
						<tr id="grandTot">
							<td width="15%" align="center">
								<label style="font-weight:bold">Total Uploaded Cheques:</label>
							</td>
							<td width="5%">
								
								<input type="text" id="txtGrandTotUpCheq" name="txtGrandTotUpCheq" disabled="disabled" style="border:none"/>
							</td>
							<td width="15%" align="center">
								<label style="font-weight:bold">Total Uploaded Amount:</label>
							</td>
							<td width="5%">
								
								<input type="text" id="txtGrandTot" name="txtGrandTot" disabled="disabled" style="border:none"/>
							</td>
							<td width="15%" align="center">
								<label style="font-weight:bold">Total Non Uploaded Cheques:</label>
							</td>
							<td width="5%">
								
								<input type="text" id="txtGrandTotNonUpCheq" name="txtGrandTotNonUpCheq" disabled="disabled" style="border:none"/>
							</td>
						</tr>
						</table>-->
							
						<table>	
						<tr>
						<td width="25%" align="center">
								<label style="font-weight:bold">Selected Count:</label>
							</td>
							<td width="25%">
								
								<input type="text" id="txtSelctGrandTotUpCheq" name="txtSelctGrandTotUpCheq" disabled="disabled" style="border:none"/>
							</td>
							<td align="center" width="25%" >
								<label style="font-weight:bold">Selected Amount:</label>
							</td>
							<td width="25%">
								
								<input type="text" id="txtSelcGrandTot" name="txtSelcGrandTot" disabled="disabled" style="border:none"/>
							</td>
							
						</tr>
						</table>
					
					<!-- <table id="gTotTable" style="display:none">
					
					
						<tr id="grandTot" >
								 <td colspan="2" align="right">
								 <label style="font-weight:bold">Total Uploaded Cheques:</label>
								 </td>
								  <td colspan="2" align="left">
								  		<input type="text" id="txtGrandTotUpCheq" name="txtGrandTotUpCheq" disabled="disabled" style="border:none"/>
								  </td>
								  <td  align="right">	
									  	<label style="font-weight:bold">Grand Total Amount:</label>
								  </td>
								  <td align="left">
								  		<input type="text" id="txtGrandTot" name="txtGrandTot" disabled="disabled" style="border:none"/>
								  </td>
								 <td align="right">
							           <label style="font-weight:bold">Total Non Uploaded Cheques:</label>
								 </td>
								  <td align="left">
								  		<input type="text" id="txtGrandTotNonUpCheq" name="txtGrandTotNonUpCheq" disabled="disabled" style="border:none"/>
								  </td>
						 </tr> 
						 
					</table> -->
			</td>
		</tr>
		<tr style="width:100%">
			<td style="width:100%" align="left">
				   <input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>">
				   <input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=session.getAttribute("session_branch_code")%>">
					<input type="hidden" id="rcnt" name="rcnt" value="1"/>
					<input type="button" name="Merge" id="submitbutton" disabled="disabled" value="Merge" onclick="on_merge_click()" />
					<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
			</td>
	  	</tr>
  </table>
  
  </div>
</div>
<!--</form>-->
<div id="footer">

	<p>
	<a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
       <jsp:include page="footer.jsp"></jsp:include></div>
       	
			</a>
		</p>

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
