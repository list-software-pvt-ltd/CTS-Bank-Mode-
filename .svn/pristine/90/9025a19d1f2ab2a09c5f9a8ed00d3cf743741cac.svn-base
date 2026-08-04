<%@page import="java.sql.*"%>
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>
<%@page import="cts.*"%>


<%
	try
	{ 
		out.print(" in setConnSession");
		String Session=request.getParameter("conn").trim();
		Connection cn=(Connection)session.getAttribute(Session);
		session.setAttribute("p_conn",cn);
		out.print("success");
		System.out.println("Session Set For"+cn);
	}
	catch(Exception e)
	{
		out.print(""+e);
	}
%>