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
	System.out.println("In getBranchDetails JSP........");
	String brncd=request.getParameter("val");
	try
	{//1
		String sql=" select BRM_BRNNM, BRM_SCANNERYN, BRM_CTSMAINBRN, BRM_MICRCD,nvl(BRM_PARENTBRCD,'')BRM_PARENTBRCD, BRM_IFSCCODE, BRM_MEMBERBNKSORTCODE, nvl(BRM_LOCALFILEPATH,'')BRM_LOCALFILEPATH,BRM_DOWNLOADFTPUSER, BRM_DOWNLOADFTPPASS, BRM_SORTERID, BRM_DOWNLOADFTPURL, BRM_DOWNLOADFTPPORT from BRANCHMSTR where BRM_BRNCD=? ";
		con=Configuration.getConnection();
		if(con!=null)
		{//2
			ps=con.prepareStatement(sql);
			ps.setString(1,brncd);
			rs=ps.executeQuery();
			
			if(rs.next())
			{
				strBuff.append(rs.getString(1)+"#"+rs.getString(2)+"#"+rs.getString(3)+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6)+"#"+rs.getString(7)+"#"+rs.getString(8)+"#"+rs.getString(9)+"#"+rs.getString(10)+"#"+rs.getString(11)+"#"+rs.getString(12)+"#"+rs.getString(13)+"#");	
				counter++;
			}	
			if(counter==0)
				strBuff.append("No Data Found#");
		}//2
	}//1
	catch(SQLException e)
	{
		System.out.println("\n\t SQLException in getBranchDetails.jsp:>>"+e);
		strBuff.append("No Data Found#");	
	}
	catch(Exception e)
	{
		System.out.println("\n\t Exception in getBranchDetails.jsp:>>"+e);
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
		System.out.println("\n\t exit from getAllUser.jsp:"+strBuff.toString());
%>
<%=strBuff.toString()%>