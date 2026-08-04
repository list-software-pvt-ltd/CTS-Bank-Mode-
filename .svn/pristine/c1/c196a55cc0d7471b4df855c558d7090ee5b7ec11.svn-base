<%@ page import="java.sql.*" %>
<%@page import="cts.*"%>
<%@page import="list.utility.CommonUtility"%>
<%	
	String str="";
	String actionflg=request.getParameter("action");
	String JSONstr=request.getParameter("JSONFILE");
	System.out.println(JSONstr);
	if(actionflg.equalsIgnoreCase("DOWNLOAD")){
	str=GetFileFromSFTP.downloadFileFromSFTP(JSONstr);
	}
	else if(actionflg.equalsIgnoreCase("UPLOAD")){
	str=GetFileFromSFTP.uploadOutwardFile(JSONstr);
	}
	out.print(str);
%>
