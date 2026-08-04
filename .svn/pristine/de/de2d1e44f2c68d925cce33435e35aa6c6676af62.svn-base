<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="net.sf.jasperreports.engine.*"%> 
<%@page import="net.sf.jasperreports.engine.export.*"%>
<%@page import="net.sf.jasperreports.j2ee.servlets.*"%>
<%@page import="net.sf.jasperreports.engine.util.*"%>
<%@page import="net.sf.jasperreports.engine.JRException.*"%>
<%@page import="net.sf.jasperreports.view.JasperViewer"%>
<%@page import="org.apache.commons.digester.*"%>
<%@page import="org.apache.commons.collections.*"%>
<%@page import="org.apache.commons.*"%>
<%@page import="java.lang.String.*"%>
<%@page import="java.util.Date.*"%>
<%@ page import="java.io.*,java.util.*"%> 
<%@ page import="cts.*"%> 

<%
	System.out.println("In fetch_config.jsp");
	String output=""; 	
	Connection con=null;
	String res=null;
	String msg="";	
	int i=0;
	StringBuffer thisBuffer = new StringBuffer(""); 
	String query="";
	
	try
	{
	//	System.out.println("Parameters Read");
		try
		{
			con=Configuration.getConnection();//(Connection)session.getAttribute("session_connection");    
			
			query="select CFG_VARNM,CFG_VARNM,CFG_VARVAL from CONFIGURATION";
			
			//int custId=Integer.parseInt(""+session.getAttribute("p_cust_id"));
			//System.out.println(query);
			System.out.println("111............");
			PreparedStatement ps=con.prepareStatement(query);
			System.out.println("222............");
			//ps.setInt(1,custId);
			ResultSet rs=ps.executeQuery();
			System.out.println("333............");
			//System.out.println("query executed"+ps);
		
			i=1;
			output="";
			while(rs.next())
			{
				//System.out.println("IN WHILE............");
				//output=output+rs.getString(1)+"#"+rs.getString(2)+"#"+rs.getString(3)+"$";
				thisBuffer.append(rs.getString(1)+"!~!"+rs.getString(2)+"!~!"+rs.getString(3)+"$");
				i++;	
			
			}
			//output=output+"^^";
			if(i==1)
			{
				//System.out.println("NO desi...");
				//output=output+"NO DESIG"+"#"+"NO DESIG"+"$";
				thisBuffer.append("NO CONFIG"+"#"+"NO CONFIG"+"$");
			}
			//out.println("output is"+output);
			con.close();
		}
		catch(SQLException se)
		{//1
			System.out.println("Query Problem occured...");
			System.out.println(""+se);
			//str=str+"Error--002.....";
			throw new Exception();
		}//1
	}		
	catch(ClassNotFoundException cnf)
	{
		System.out.println("Error finding configuration or error in connection string");
		System.out.println(""+cnf);
		//str=str+"Error--001.....";
		//throw new Exception();	
	}
	catch(NullPointerException ne)
	{//1
		System.out.println("Null Pointer Exception Occured ......");
		System.out.println(""+ne);
		//str="Error--003.....";
		//throw new Exception();
	}//1
	catch(Exception e)
	{//1
		System.out.println("Error occured......");
		System.out.println(""+e);
		output="SessionNull";
		thisBuffer.append("SessionNull"+e);
	}//1
	
%>

<%=thisBuffer.toString()%>