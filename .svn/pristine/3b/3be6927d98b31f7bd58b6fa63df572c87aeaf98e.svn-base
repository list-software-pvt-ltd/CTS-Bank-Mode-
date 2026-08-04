<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Untitled Document</title>
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
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
      <h1><a href="#" title="Cheque Truncation System">CTS</a></h1>
      <p class="fl_left">Cheque Truncation System</p>
	  <div class="fl_right">User : <%=session.getAttribute("session_loginid")%></label></div> 
    </div>
	<br class="clear" />
	 
  </div>
</div>


<%
	System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@	In menu.jsp");
	String userRole = "null";
	String session_main_br_yn = "";
	String session_scanner_yn = "";
	
	try
	{
	
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

<body style="margin:0px">
	<div class="wrapper col2">
		<div id="topbar" style="z-index:10">
			<div id="topnav">
		  	<ul>
				<li id="menu_home"><a href="main.jsp">Home</a></li>
				<%
				if((userRole.indexOf("M") > -1)&&(session_scanner_yn.equalsIgnoreCase("Y")) || ((userRole.indexOf("C") > -1) && (session_main_br_yn.equalsIgnoreCase("Y") || session_scanner_yn.equalsIgnoreCase("Y"))))
				{
					%>
					<li id="menu_clearingOutward"><a href="#">Clearing Outward</a>
					<ul>
						<li id="menu_outward_clearing"><a href="outward_clearing.jsp?msg=FIRSTTIME">Outward Clearing</a></li>
						<%
						if((userRole.indexOf("C") > -1) && (session_main_br_yn.equalsIgnoreCase("Y")))
						{
						%>
							<li id="menu_merging"><a href="merging.jsp">Merging</a></li>
							<li id="menu_merging"><a href="deleteclearingoutwardfrdate.jsp">Delete or ReGenerate Clr Owd Lot</a></li>
						<%
						}
						%>
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
	
			<li id="menu_inward_clearing"><a href="inward_clearing.jsp">Inward Clearing</a></li>
			<li id="menu_return_outward"><a href="#">Return Outward</a>
				<ul>
					<li id="menu_return_outward"><a href="return_outward.jsp">Return Outward</a></li>
					<%
					if((userRole.indexOf("C") > -1) && (session_main_br_yn.equalsIgnoreCase("Y")))
					{
					%>
						<li id="menu_delete"><a href="deletereturnoutwardfrdate.jsp">Delete or ReGenerate Rtn Owd Lot</a></li>
					<%
					}
					%>
				</ul>
			</li><!-- Abhi-->
			<li id="menu_return_inward"><a href="return_inward.jsp">Return Inward</a></li>
			<li id="menu_extension_request"><a href="#">Extension Request</a>
				<ul>
					
					<li><a href="extension_request.jsp">Send Extension Request</a></li>
					<li><a href="extensionFile.jsp">Read Extension File</a></li>
					<li><a href="extension_bulk_request.jsp">Send Bulk Extension Request</a></li>
				</ul>
			</li>
			<!--<li id="menu_report_clearing_outward"><a href="report_clearing_outward.jsp">Report Clearing Outward</a></li>-->
		<%
		}
		%>
			<li id="menu_report_clearing_outward"><a href="#">Report</a>
				<ul>
					<li><a href="report_clearing_outward.jsp">Clearing Outward</a></li>
					<li><a href="report_clearing_outward_withmicr.jsp">Clearing Outward(MICR)</a></li>										
					<li><a href="report_clearing_inward.jsp">Clearing Inward</a></li>
					<li><a href="report_clearing_inward_withimg.jsp">Clearing Inward(IMAGES)</a></li>
					<li><a href="report_return_outward.jsp">Return Outward</a></li>
					<li><a href="report_return_inward.jsp">Return Inward(Memo)</a></li>	
					<li><a href="report_return_inward_withoutmemo.jsp">Return Inward</a></li>
					<li><a href="report_paper_to_follow.jsp">Paper To Follow</a></li>					
					<li><a href="report_extension.jsp">Report Extension</a></li>
					<li><a href="read_clearing_acknowledgement.jsp">Clearing Outward Acknowledgement</a></li>
				</ul>
			</li>
	
			
<%

if(userRole.indexOf("A") > -1)
{
%>
		<li id="menu_admin"><a href="#">Admin</a>
		<ul>
			<!--<li><a href="manual_archive.jsp">Manual Archive</a></li>-->
			<li><a href="configuration.jsp">Configuration</a></li>
			<li id="menu_create_user"><a href="createUser.jsp">Create User</a></li>
			<li><a href="oackConversion.jsp">OACK Conversion</a></li>		
			<li><a href="responseFile.jsp">Response File</a></li>
			<li><a href="change_password.jsp">Change Password</a></li>
			
			<li><a href="extensionFile.jsp">Extension File</a></li>
			<!--<li id="report_clearing_outward"><a href="report_clearing_outward.jsp">Clearing Outward Report</a></li>-->					
		</ul>				  				
		</li>
<%
}
%>

		  </ul>
		</div>
	  
		<br class="clear" />
	  </div>
	</div>



</body>
</html>