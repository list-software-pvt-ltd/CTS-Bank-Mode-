<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>
<%@page import="java.util.Date.*"%>

<%!
	Connection con;
	PreparedStatement ps;
	ResultSet rs;
	StringBuffer strBuff;
	int counter=0;
%>
<%
	strBuff=new StringBuffer("");
	System.out.println("In getAllBrances JSP........");
	try
	{//1
		String sql="select BRM_BRNNM,BRM_BRNCD from BRANCHMSTR order by BRM_BRNCD desc";
		con=Configuration.getConnection();
		if(con!=null)
		{//2
			ps=con.prepareStatement(sql);
			rs=ps.executeQuery();
			
			while(rs.next())
			{
				strBuff.append(rs.getString(1)+"!Q!"+rs.getString(2)+"#");	
				counter++;
			}	
			if(counter==0)
				strBuff.append("No Data Found#");
		}//2
	}//1
	catch(SQLException e)
	{
		System.out.println("\n\t SQLException in getAllBrances.jsp:>>"+e);
		strBuff.append("No Data Found#");	
	}
	catch(Exception e)
	{
		System.out.println("\n\t Exception in getAllBrances.jsp:>>"+e);
		strBuff.append("No Data Found#");	
	}
	finally
	{
		try
		{
			if(con!=null && rs!=null && ps!=null)
			{
				rs.close();
				ps.close();
				con.close();				
			}
		}catch(Exception e){}
	}
		System.out.println("\n\t exit from getAllBranches.jsp:"+strBuff.toString());
%>
<%=strBuff.toString()%>