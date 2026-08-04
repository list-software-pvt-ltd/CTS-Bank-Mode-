<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
	System.out.println("\n\t------------- inside updateExtensionFile.jsp ---------------");
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
			ps_updateRecord=con.prepareStatement("update EXTENSION_OUTWARD set EXT_WRN_CODE='' where EXT_DDMMYYYY=?");
			ps_updateRecord.setString(1,Configuration.getDDMMYYYY());
			
			if(ps_updateRecord.executeUpdate()>0)
			{
				System.out.println("All EXT_WRN_CODE code updated in clearingoutward");
			}
			ps=con.prepareStatement("update EXTENSION_OUTWARD set EXT_EXTENSIONREASONCODE=?,EXT_EXTENSIONPERIOD=? where EXT_SERIALNO=? and EXT_PAYORBANKROUTNO=? and EXT_STATUS='Y' and EXT_DDMMYYYY=?");
			
			String[] allCheqs=paramString.split("!A!");
			int length=allCheqs.length;
			System.out.println("\n\t Total No Of Chequs:>>"+length);			
			for(int i=0;i<length;i++)
			{//2
				String singleChqs[]=allCheqs[i].split("!Q!");		
				String EXT_CHEQUENO=singleChqs[0];
				String EXT_SORTCODE=singleChqs[1];
				String EXT_RETURNREASONCODE=singleChqs[2];
				String EXT_EXTENSIONPERIOD=singleChqs[3];
				
				//System.out.println("\n\t EXT_CHEQUENO:"+EXT_CHEQUENO);
				//System.out.println("\n\t EXT_SORTCODE:"+EXT_SORTCODE);
				//System.out.println("\n\t EXT_RETURNREASONCODE:"+EXT_RETURNREASONCODE);
				//System.out.println("\n\t EXT_EXTENSIONPERIOD:"+EXT_EXTENSIONPERIOD);
												
				ps.setString(1,EXT_RETURNREASONCODE);//EXT_RETURNREASONCODE
				ps.setString(2,EXT_EXTENSIONPERIOD);
				ps.setString(3,EXT_CHEQUENO);//EXT_CHEQUENO
				ps.setString(4,EXT_SORTCODE);//EXT_SORTCODE
				ps.setString(5,Configuration.getDDMMYYYY());//EXT_DDMMYYYY								
				
				if(ps.executeUpdate()>0)
				{
					System.out.println("\n\t Return outward record is updated for cheque:"+EXT_CHEQUENO);

					counter++;
				}
				
			}//2
			
			//validate all records 
			//ReturnValidation.validateItmReturnReasonCode();
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
		System.out.println("\n\t Exception in updateExtensionFile.jsp :>>>"+e);
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