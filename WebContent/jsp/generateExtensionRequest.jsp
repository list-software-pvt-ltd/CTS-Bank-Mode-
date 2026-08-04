<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*" %>

<%
	System.out.println("******************** start of generateExtensionRequest.jsp **********************");
	Connection con=Configuration.getConnection();
	String retVal="";
				String returnValue=new Engine(con).generateERF();	
				String[] strArr=returnValue.split("#");	
				if(strArr[0].indexOf("SUCCESS")>-1)
				{//3
						retVal="Extension Request File Generated Successfully.\n";
				}//3
				else 
				{//3
					if(strArr[0].indexOf("FAIL1")>-1)
					{	
						retVal="Problem in XML Tags";
					}
					else if(strArr[0].indexOf("FAIL2")>-1)
					{
						retVal="Problem to write XML";
					}
					else if(strArr[0].indexOf("FAIL3")>-1)
					{
						retVal="Problem to generate ERF file";
					}
					else if(strArr[0].indexOf("No Extension Request Cheque")>-1)
					{
							retVal="No Extension Request Cheque";
					}
					else
					{
						retVal=strArr[0];
					}
				}//3
	System.out.println("******************** end of generateExtensionRequest.jsp *************************");
%>
<%="#"+retVal%>