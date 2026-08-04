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
	System.out.println("In getUserRecord JSP........");
	String loginId=request.getParameter("userID");
	try
	{//1
		String sql="select LOGINID,BRNCD,USRROLE,EMAILID,nvl(isactive,'NEWCBS')isactive,USRNAME from USRMSTR_VIEW where LOGINID=?";//USRPASS,
		con=Configuration.getConnection();
		if(con!=null)
		{//2
			ps=con.prepareStatement(sql);
			ps.setString(1,loginId);
			rs=ps.executeQuery();
			counter=0;
			while(rs.next())
			{
				strBuff.append(rs.getString(1)+"#"+rs.getString(2)+"#"+rs.getString(3)+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6));//+rs.getString(2)+"#"	
				counter++;
			}	
			System.out.println("\n\t counter:>>"+counter);
			if(counter==0)
				strBuff.append("No Data Found#");
		}//2
	}//1
	catch(SQLException e)
	{
		System.out.println("\n\t SQLException in getUserRecord.jsp:>>"+e);
		strBuff.append("No Data Found#");	
	}
	catch(Exception e)
	{
		System.out.println("\n\t Exception in getUserRecord.jsp:>>"+e);
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
		System.out.println("\n\t exit from getUserRecord.jsp:"+strBuff.toString());
%>
<%=strBuff.toString()%>