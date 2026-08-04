<%@ page import="java.io.*,java.util.*, jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>
<%@ page import="java.net.SocketException"%>
<%@ page import="org.apache.commons.net.ftp.*" %>
<%-- <%@ page import="org.apache.commons.fileupload.servlet.*" %> --%>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="cts.*" %>
<%@ page import="java.sql.*" %>

<%!
	String selectedDate;
	String reportType;	
	StringBuffer returnValue;
%>

<%
	selectedDate=request.getParameter("datepicker");
	reportType=request.getParameter("report");
	String[] properDate=selectedDate.split("-");
	String rptDate=properDate[0]+properDate[1]+properDate[2];
	System.out.println("\n\tselectedDate:"+selectedDate+"\n\treportType:"+reportType);
	System.out.println("\n\trptDate:"+rptDate);
	
	if(reportType.equalsIgnoreCase("clearingOutward"))
	{
		returnValue=GetReport.getClearingOutward(rptDate);
	}
	else if(reportType.equalsIgnoreCase("clearingInward"))
	{
		returnValue=GetReport.getClearingInward(rptDate);
	}
	else if(reportType.equalsIgnoreCase("returnOutward"))
	{
		returnValue=GetReport.getReturnOutward(rptDate);
	}
	else if(reportType.equalsIgnoreCase("returnInward"))
	{
		returnValue=GetReport.getReturnInward(rptDate);
	}	
	
%>