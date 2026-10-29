<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<%@page import="cts.*"%>
<%@page import="java.sql.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Untitled Document</title>
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<script src="js/menu.js"></script>
<script type = "text/javascript" >  
	function preventBack() { window.history.forward(); }  
	setTimeout("preventBack()", 0);  
	window.onunload = function () { null };  
</script>
</head>
<div id="waiting" style="position:absolute; width:100%; height:100%;background-color:rgba(0,0,0,.4); text-align:center; top:0p;display:none; z-index:10;">


 <table width="100%" height="100%" align="center" valign="center">
   <tr>
	   <td>
		  <img src="images/wait.gif" style="vertical-align:middle;position: absolute;
    margin: auto;top: 0;left: 0; right: 0; bottom: 0;" />
	   </td>
   </tr>
  </table>
</div>
<div class="wrapper col1">
  <div id="header">
    <div id="logo" style="width:900px;">
      <h1><a href="#" title="Cheque Truncation System"> CTS</a></h1>
      <p class="fl_left">Cheque Truncation System</p>
	  <div class="fl_right" id="userid" name="userid">User : <%=session.getAttribute("session_usrnm")%></label></div> 
    </div>
	<br class="clear" />
	 
  </div>
</div>

<%!
String CFG_PPS_CONNECTED;
String CTSTOKEN,TOKEN;
String flag;
%>
<%
	System.out.println("-----------	In menu.jsp");
	String userRole = "null";
	String session_main_br_yn = "";
	String session_scanner_yn = "";
	String uploadDownload = "";
	String loginstyle="";
	//String CFG_PPS_CONNECTED="",CTSTOKEN="",TOKEN="",flag="";
			try
			{
				CTSTOKEN=request.getParameter("CTSTOKEN").toString();
				TOKEN = session.getAttribute("TOKEN").toString();
				if(CTSTOKEN.equalsIgnoreCase(TOKEN))
				{
					TOKEN=CryptoKey.rantoken();
					
					session.removeAttribute("TOKEN");
					session.setAttribute("TOKEN",TOKEN); 
				}
				else {
					response.sendRedirect("invalidcredentials.jsp?msg=Your Session Has Been Expired. Please Login Again");
				}
			}
			catch(Exception ne)
			{
				ne.printStackTrace();
				CTSTOKEN="null";	
				response.sendRedirect("invalidcredentials.jsp?msg=Your Session Has Been Expired. Please Login Again");
			}
			
			try
			{
				flag=request.getParameter("flag");
			}
			catch(NullPointerException ne)
			{
				System.out.println("Exception flag null::"+ne );
				flag="null";
				response.sendRedirect("invalidcredentials.jsp?msg=Your Session Has Been Expired. Please Login Again");
			}
			Connection con=Configuration.getConnection();
			CFG_PPS_CONNECTED=Configuration.getConfValByNm("CFG_PPS_CONNECTED",con);
			 loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", con);
			
			System.out.println("CFG_PPS_CONNECTED:"+CFG_PPS_CONNECTED+"@@@@@@");
			try
			{
				uploadDownload=session.getAttribute("uploadDownload").toString();
				userRole=session.getAttribute("session_user_role").toString();
				
				System.out.println("userRole:"+userRole+"####");
				
			}
			catch(NullPointerException ne)
			{
				System.out.println("Exception userRole null::"+ne );
				userRole="null";	
			}
			
			try
			{
			
				session_main_br_yn=session.getAttribute("session_main_br_yn").toString();
				System.out.println("session_main_br_yn:"+session_main_br_yn+"####");
				
			}
			catch(NullPointerException ne)
			{
				System.out.println("Exception session_main_br_yn null::"+ne );
				session_main_br_yn="null";
			}
			
			try
			{
			
				session_scanner_yn=session.getAttribute("session_scanner_yn").toString();
				System.out.println("session_scanner_yn:"+session_scanner_yn+"####");
				
			}
			catch(NullPointerException ne)
			{
				System.out.println("Exception session_scanner_yn null::"+ne );
				session_scanner_yn="null";
			}
		
%>

<body style="margin:0px;">
<form id="formid" name="formid" method="post">
	<div class="wrapper col2">
		<div id="topbar" style="z-index:12">
			<div id="topnav" class="nav navbar-nav">
		  	<ul>
				<li id="menu_home"><a onClick="menuOnClick('main.jsp')" href="#">Home</a></li>
				<%
				if((userRole.indexOf("M") > -1)&&(session_scanner_yn.equalsIgnoreCase("Y")) || ((userRole.indexOf("C") > -1) && (session_main_br_yn.equalsIgnoreCase("Y") || session_scanner_yn.equalsIgnoreCase("Y"))))
				{
					%>
					<li id="menu_clearingOutward"><a href="#">Clearing Outward</a>
					<ul>
						<li id="menu_outward_clearing"><a onClick="menuOnClick('outward_clearing.jsp?msg=FIRSTTIME')" href="#">Outward Clearing</a></li>
						<%
						if((userRole.indexOf("C") > -1) && (session_main_br_yn.equalsIgnoreCase("Y")))
						{
						%>
							<li id="menu_merging"><a onClick="menuOnClick('merging.jsp')" href="#">Merging</a></li>
							<li id="menu_outnward_clearing"><a onClick="menuOnClick('outward_clearing_download.jsp')" href="#">Download Outward Clearing Files</a></li>
							<li id="menu_response"><a onClick="menuOnClick('cleOutward_resFile.jsp')" href="#">Read Response File</a></li>
													
						<%
						}
						%>
						<li id="menu_merging"><a onClick="menuOnClick('clearingoutwardEntry.jsp')" href="#">Clearing Outward Entry</a></li>
						<li id="menu_merging"><a onClick="menuOnClick('deleteclearingoutwardfrdate.jsp')" href="#">Delete or ReGenerate Clearing Outward Lot</a></li>
						<li id="menu_merging"><a onClick="menuOnClick('paperToFollow.jsp')" href="#">Paper To Follow Mark</a></li>
					</ul>
					</li>	
				<%
				}
				%>	
			</ul>
	
			<%
			if((userRole.indexOf("C") > -1) && session_main_br_yn.equalsIgnoreCase("Y"))
			// && session_scanner_yn.equalsIgnoreCase("Y"))
	{
	%>
			<!--<li id="menu_merging">deleteclearingoutwardfrdate.jsp<a href="merging.jsp">Merging</a></li>-->
	
			<li id="menu_inward_clearing"><a href="#">Inward Clearing</a>
			<ul>
					<li id="menu_inward_clearing1"><a onClick="menuOnClick('inward_clearing.jsp')" href="#">Inward Clearing</a></li>
					<li id="menu_inward_clearing2"><a onClick="menuOnClick('inward_clearing_download.jsp')" href="#">Download Inward Clearing Files</a></li>

					<li id="menu_crt_inw_file"><a onClick="menuOnClick('CreateInwardFile.jsp')" href="#">Create Inward Clearing File</a></li>
				
					<li id="menu_delete_inward"><a onClick="menuOnClick('deleteinwardlot.jsp')" href="#">Delete Inward Lot</a></li>
				<li id="menu_delete_today_inward"><a
								onClick="menuOnClick('deleteTodayInwardFilewise.jsp')" href="#">Delete Today's Clearing Inward (File-wise)</a></li>
				</ul>
				</li>
			<li id="menu_return_outward"><a href="#">Return Outward</a>
				<ul>
					<li id="menu_return_outward"><a onClick="menuOnClick('return_outward.jsp')" href="#">Return Outward</a></li>
					<li id="menu_return_outward"><a onClick="menuOnClick('return_outward_download.jsp')" href="#">Download Return Outward File</a></li>
					
					<%
					if((userRole.indexOf("C") > -1) && (session_main_br_yn.equalsIgnoreCase("Y")))
					{
					%>
						<li id="menu_delete"><a onClick="menuOnClick('deletereturnoutwardfrdate.jsp')" href="#">Delete or ReGenerate Return Outward Lot</a></li>
						<li id="menu_retresp"><a onClick="menuOnClick('retOutward_resFile.jsp')" href="#">Read Response File</a></li>
						<li id="menu_return_outwardmanu"><a onClick="menuOnClick('returnOutward_manually.jsp')" href="#">Return Outward Manually</a></li>
					<%
					}
					%>
				</ul>
			</li><!-- Abhi-->
				<li id="menu_return_inward"><a href="#">Return Inward</a>
				<ul>
					<li id="menu_return_inward"><a onClick="menuOnClick('cleInward_resFile.jsp')" href="#">Return Inward</a></li>
					<li id="menu_download_return_inward"><a onClick="menuOnClick('download_return_inward.jsp')" href="#">Download Return Inward File</a></li>
					<li id="menu_delete_inward"><a onClick="menuOnClick('deleteRTNinwardlot.jsp')" href="#">Delete Return Inward Lot</a></li>
					</ul>
					</li>
							
			
			<%
			if(CFG_PPS_CONNECTED.equalsIgnoreCase("Y"))
			{
			%>
			<li id="menu_ppsinterface"><a href="#">PPS Interface</a>
				<ul>
				<%
					if((userRole.indexOf("C") > -1) && (session_main_br_yn.equalsIgnoreCase("Y")))
					{
					%>
					<li id="menu_ppsdashboard"><a onClick="menuOnClick('pps_dashboard.jsp')" href="#">PPS Dashboard</a></li>	
					<li id="menu_createissufile"><a onClick="menuOnClick('create_issuance_file.jsp')" href="#">Create Issuance File</a></li>
						<li id="menu_pps_downloadFile"><a onClick="menuOnClick('pps_downloadFile.jsp')" href="#">Download PPS File</a></li>					
						<li id="menu_readissufile"><a onClick="menuOnClick('read_issuance_file.jsp')" href="#">Read Issuance File Response</a></li>
						<li id="menu_readissufile"><a onClick="menuOnClick('read_issuance_file_manually.jsp')" href="#">Read Issuance File Response Manually</a></li>
						<li id="menu_ppsreport"><a onClick="menuOnClick('report_issuancefile.jsp')" href="#">Issuance File Report</a></li>
						<li id="menu_ppslogreport"><a onClick="menuOnClick('report_intimationlogs.jsp')" href="#">Customers SMS Log Report</a></li>
						<!--  <li id="menu_intimationreq"><a onClick="menuOnClick('intimation_request.jsp')" href="#">Intimation Request</a></li>-->
					<%
					}
					%>
					
				</ul>
			</li>
			<%
			}
			%>
			<!-- <li id="menu_extension_request"><a href="#">Extension Request</a>
				<ul>
					
					<li><a onClick="menuOnClick('extension_request.jsp')" href="#">Send Extension Request</a></li>
					<li><a onClick="menuOnClick('extensionFile.jsp')" href="#">Read Extension File</a></li>
					<li><a onClick="menuOnClick('extension_bulk_request.jsp')" href="#">Send Bulk Extension Request</a></li>
				</ul>
			</li> -->
			<!--<li id="menu_report_clearing_outward"><a onClick="menuOnClick('report_clearing_outward.jsp')" href="#">Report Clearing Outward</a></li>-->
		<%
		}
		%>
		
		<%
		if((session_main_br_yn.equalsIgnoreCase("Y")))
		{
		%>	
			<%
			if((uploadDownload.equalsIgnoreCase("Y")))
			{
			%>
			<li id="menu_upload_download"><a onClick="menuOnClick('upload_download.jsp')" href="#">Download/Upload</a></li>
			<%
			}
			%>
		<%
		}
		%>
			<li id="menu_report_clearing_outward"><a href="#">Report</a>
				<ul>
				
				<!-- <li><a href="#">Clearing Outward</a>
                <ul>
                   <li><a onClick="menuOnClick('report_clearing_outward.jsp')" href="#">Clearing Outward</a>
                    <li><a onClick="menuOnClick('report_clearing_outward_withmicr.jsp')" href="#">Clearing Outward(MICR)</a>
               </ul>
              </li> -->
               
					 <li><a href="#">Clearing Outward</a>
					 	<ul style="margin-left: 170px">
							<li><a onClick="menuOnClick('report_clearing_outward.jsp')" href="#">Clearing Outward</a></li>
							<li><a onClick="menuOnClick('report_clearing_outward_withmicr.jsp')" href="#">Clearing Outward(MICR)</a></li> 
							<li><a onClick="menuOnClick('report_cleOutward_response.jsp')" href="#">Clearing Outward Response</a></li>	
							<li><a onClick="menuOnClick('report_cleOutward_OACK.jsp')" href="#">Clearing Outward OACK</a></li>		
						    <li><a onClick="menuOnClick('report_clearing_outward_withimg.jsp')" href="#">Clearing Outward(IMAGES)</a></li>
						    <li><a onClick="menuOnClick('read_clearing_acknowledgement.jsp')" href="#">Clearing Outward Acknowledgement</a></li>
						</ul>
					</li>	
					<li><a href="#">Clearing Inward</a>
					 	<ul style="margin-left: 170px">						
							<li><a onClick="menuOnClick('report_clearing_inward.jsp')" href="#">Clearing Inward</a></li>
							<li><a onClick="menuOnClick('report_cleInward_dupCheque.jsp')" href="#">Clearing Inward Duplicate Cheques</a></li>
							<li><a onClick="menuOnClick('report_clearing_inward_withimg.jsp')" href="#">Clearing Inward(IMAGES)</a></li>
						<!-- 	<li><a onClick="menuOnClick('report_clearing_inward_special.jsp')" href="#">Special Clearing Inward</a></li> -->
						</ul>
					</li> 
					<li><a href="#">Return Outward</a>
					 	<ul style="margin-left: 170px">
							<li><a onClick="menuOnClick('report_return_outward.jsp')" href="#">Return Outward</a></li>
							<li><a onClick="menuOnClick('report_retOutward_response.jsp')" href="#">Return Outward Response</a></li>
							<li><a onClick="menuOnClick('report_retOutward_OACK.jsp')" href="#">Return Outward OACK</a></li>
						</ul>
					</li>
					<li><a href="#">Return Inward</a>
					 	<ul style="margin-left: 170px">	
							<li><a onClick="menuOnClick('report_return_inward.jsp')" href="#">Return Inward(Memo)</a></li>	
							<li><a onClick="menuOnClick('report_return_inward_withoutmemo.jsp')" href="#">Return Inward</a></li>
						</ul>
					</li>
					<li><a href="#">Paper To Follow</a>
					 	<ul style="margin-left: 170px">	
							<li><a onClick="menuOnClick('report_paper_to_follow.jsp')" href="#">Paper To Follow(Outward)</a></li>
							<li><a onClick="menuOnClick('report_paper_to_follow_inward.jsp')" href="#">Paper To Follow(Inward)</a></li>
						</ul>
					</li>					
					<li><a onClick="menuOnClick('report_extension.jsp')" href="#">Report Extension</a></li>
					<li><a onClick="menuOnClick('searchPastCheques.jsp')" href="#">Search Past Instrument Inward/Outward</a></li>
					<li><a onClick="menuOnClick('report_clearing_percentile.jsp')" href="#">Clearing Summary Report</a></li>
					<li><a onClick="menuOnClick('cheuqueSearch.jsp')" href="#">Search Cheques Instruments</a></li>
			<li><a onClick="menuOnClick('user_master_report.jsp')" href="#">User Master Report</a></li>


			<li><a href="#">End of day Reports</a>
					 	<ul style="margin-left: 170px">
							<li><a onClick="menuOnClick('consolidated_net_summ_rpt.jsp')" href="#">Consolidated net settlement</a></li>
							<li><a onClick="menuOnClick('consolidated_presenting_summ_rpt.jsp')" href="#">Presenting consolidated report</a></li> 
							<li><a onClick="menuOnClick('consolidated_drawee_summ_rpt.jsp')" href="#">Drawee consolidated report</a></li>	
						</ul>
					</li>	
			
				</ul>
			</li>

			
<%

if(userRole.indexOf("A") > -1)
{
%>
		<li id="menu_admin"><a href="#">Admin</a>
		<ul>
			<!--<li><a href="manual_archive.jsp')" href="#">Manual Archive</a></li>-->
			<li><a onClick="menuOnClick('configuration.jsp')" href="#">Configuration</a></li>
			<li id="menu_create_user"><a onClick="menuOnClick('createUser.jsp')" href="#">Create User</a></li>
			<li><a onClick="menuOnClick('insertBranch.jsp')" href="#">Branch Master</a></li>
			<li><a onClick="menuOnClick('oackConversion.jsp')" href="#">OACK Conversion</a></li>	
				<li><a onClick="menuOnClick('download_oack_files.jsp')" href="#">Download OACK Files</a></li>		
			<li><a onClick="menuOnClick('responseFile.jsp')" href="#">Response File</a></li>
			<%
					if((loginstyle.equalsIgnoreCase("CTSUSER")))
					{
					%>
			<li><a onClick="menuOnClick('change_password.jsp')" href="#">Change Password</a></li>
			<%
					}
					%>
			
			<li><a onClick="menuOnClick('extensionFile.jsp')" href="#">Extension File</a></li>
			<li><a onClick="menuOnClick('blockedMICR.jsp')" href="#">Blocked MICR Code</a></li>
			<li><a onClick="menuOnClick('archiveBackup.jsp')" href="#">Archive Backup</a></li>
			<!--<li id="report_clearing_outward"><a href="report_clearing_outward.jsp')" href="#">Clearing Outward Report</a></li>-->					
		</ul>				  				
		</li>
<%
}
%>
		<li>
			<a href="#">Help</a>
			<ul>
				<li><a href="REPORT/clearingOutward/CTS_Outward.pdf" target="_blank">FAQs</a></li>
			</ul>
		</li>

		  </ul>
		</div>
	  
		<br class="clear" />
	  </div>
	</div>
	<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value='<%=TOKEN%>'/>
	<input type="hidden" id="flag" name="flag" value="<%=flag%>"/>
	