<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
	System.out.println("\n\t------------- inside updateReturnOutward.jsp ---------------");
	String retVal="SUCCESS";
	String paramString=request.getParameter("updateString");
	System.out.println("\n\t parameter String:"+paramString);
	PreparedStatement ps=null,ps_updateRecord=null;
	Connection con=null;
	int counter=0;
	try
	{

		if(paramString!=null)
		{//1
			con=Configuration.getConnection();
			ps_updateRecord=con.prepareStatement("update RETRUNOUTWARD set RTO_WRN_CODE='' where RTO_DDMMYYYY=?");
			ps_updateRecord.setString(1,Configuration.getDDMMYYYY());
			
			if(ps_updateRecord.executeUpdate()>0)
			{
				System.out.println("All RTO_WRN_CODE code updated in clearingoutward");
			}
			ps=con.prepareStatement("update RETRUNOUTWARD set RTO_RETURNREASONCODE=? where RTO_CHEQUENO=? and RTO_SORTCODE=? and RTO_STATUS='Y' and RTO_DDMMYYYY=?");
			
			String[] allCheqs=paramString.split("!A!");
			int length=allCheqs.length;
			System.out.println("\n\t Total No Of Chequs:>>"+length);			
			for(int i=0;i<length;i++)
			{//2
				String singleChqs[]=allCheqs[i].split("!Q!");		
				String RTO_CHEQUENO=singleChqs[0];
				String RTO_SORTCODE=singleChqs[1];
				String RTO_RETURNREASONCODE=singleChqs[2];
				
				System.out.println("\n\t RTO_CHEQUENO:"+RTO_CHEQUENO);
				System.out.println("\n\t RTO_SORTCODE:"+RTO_SORTCODE);
				System.out.println("\n\t RTO_RETURNREASONCODE:"+RTO_RETURNREASONCODE);
												
				ps.setString(1,RTO_RETURNREASONCODE);//RTO_RETURNREASONCODE
				ps.setString(2,RTO_CHEQUENO);//RTO_CHEQUENO
				ps.setString(3,RTO_SORTCODE);//RTO_SORTCODE
				ps.setString(4,Configuration.getDDMMYYYY());//RTO_DDMMYYYY								
				
				if(ps.executeUpdate()>0)
				{
					System.out.println("\n\t Return outward record is updated for cheque:"+RTO_CHEQUENO);

					counter++;
				}
				
			}//2
			
			//validate all records 
			ReturnValidation.validateItmReturnReasonCode();
			if(counter==0)
			{
				retVal="RecordIsNotUpdated";
			}
		}//1
		else
		{//1
  			   retVal="RecordIsNotUpdated";
		}//1
	}
	catch(Exception e)
	{
		System.out.println("\n\t Exception in updateReturnOutward.jsp :>>>"+e);
		 retVal="RecordIsNotUpdated";
	}
	finally
	{
		try
		{		
			if(ps!=null)
				ps.close();
			if(ps_updateRecord!=null)
				ps_updateRecord.close();	
			if(con!=null)
				con.close();
		}
		catch(Exception e){}
	}
%>
<%=retVal%>