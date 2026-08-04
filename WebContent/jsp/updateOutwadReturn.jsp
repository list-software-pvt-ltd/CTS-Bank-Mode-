<%@ page import="java.io.*,java.util.*, jakarta.servlet.*,java.sql.*" %>
<%@ page import="cts.*" %>

<%
	System.out.println("----- inside updateOutardReturn.jsp ---------");
	StringBuffer strRetval=new StringBuffer("");
	Connection con=Configuration.getConnection();
	int counter=0;	
	int fileCount=0;
	//String param=request.getParameter("allResponseString");
	String param=request.getParameter("hiddenRec");	
	String notReturnOutwardCheques="";
	System.out.println("param:>>>"+param);
	String sqlUpdate="update RETRUNOUTWARD set RTO_STATUS='Y' where RTO_CHEQUENO=? and RTO_DDMMYYYY=? and instr(RTO_XMLFILENAME,substr(?,0,instr(?,'.')+3))>0";
	
	String sqlUpdateFullFile="update RETRUNOUTWARD set RTO_STATUS='Y' where instr(RTO_XMLFILENAME,substr(?,0,instr(?,'.')+3))>0";
	
	PreparedStatement psUpdateFullFile=con.prepareStatement(sqlUpdateFullFile);
	PreparedStatement stmt_update=con.prepareStatement("update RETURNFILES set ISSETTLED='D' where filename=?");
	PreparedStatement psUpdate=con.prepareStatement(sqlUpdate);
	//CREATIONDATE,CREATIONTIME,FILESTATUSCODE,ITEMSEQNO,SERIALNO,REJECTREASON,FILENAME,PRESENTMENTDATE,PRESENTINGBANKROUTNO
	//	0			2				3			4			5		6			7			8				9
	int updateCount=0;
	try
	{//0
			if(param!=null)
			{//1
				System.out.println("param:"+param);
					String[] allStr=param.split("!#!");
					String singleStr="";	
					for(int i=0;i<allStr.length-1;i++)		
					{//2
						System.out.println("singleStr::"+singleStr);
						singleStr=allStr[i];	
						String[] singleRec=singleStr.split("#");
						String chqNo=singleRec[4];
						String fileName=singleRec[7];				
						String ddmmyyyy=fileName.split("_")[2];
						String resonCode=singleRec[5];
						String FILESTATUSCODE=singleRec[2];
						
						System.out.println("-- chqNo:"+chqNo);				
						System.out.println("-- fileName:"+fileName);
						System.out.println("-- ddmmyyyy:"+ddmmyyyy);
						System.out.println("-- resonCode:"+resonCode);
						System.out.println("-- FILESTATUSCODE:"+FILESTATUSCODE);
						
						
						psUpdate.setString(1,chqNo);
						psUpdate.setString(2,ddmmyyyy);
						psUpdate.setString(3,fileName);
						psUpdate.setString(4,fileName);
						
						int fileStatus=Integer.parseInt(FILESTATUSCODE);	
							if(fileStatus==7)																																
							{																																				
								if(psUpdate.executeUpdate()>0)	
								{
									System.out.println("Record Is Updated");
									updateCount++;
									
									stmt_update.setString(1,fileName.trim());//FILENAME
									if(stmt_update.executeUpdate()>0)
									{
										System.out.println("\n\t Response Record Is Updated");
									}
									else
									{
										System.out.println("\n\t Response Record Not Updated");
									}
								}
								else							
								{
									System.out.println("Record Is NOT Updated");
									notReturnOutwardCheques="No Corresponding Record Found At Return Outward Table.";
								}	
							}
							else if(fileStatus<=6 && fileStatus!=0)
							{
								psUpdateFullFile.setString(1,fileName);
								psUpdateFullFile.setString(2,fileName);
								if(psUpdateFullFile.executeUpdate()>0)	
								{
									System.out.println("Record Is Updated");
									updateCount++;
								}	
								else							
								{
									System.out.println("Record Is NOT Updated");
									notReturnOutwardCheques="No Corresponding Record Found At Return Outward Table.";
								}	
							}
					}//2
			}//1
			
		if(updateCount>0)	
		{
			strRetval.append("Record is UpdatedRO::");
		}
		else
		{
			strRetval.append("Record Not UpdatedRO::"+notReturnOutwardCheques);
		}
	}//try
	catch(Exception e)
	{
		System.out.println("-----Exception in updateOutardReturn.jsp::"+e);	
		strRetval.append("Fail#");	
	}	
	finally
	{
		try
		{
			if(con!=null && psUpdate!=null && psUpdateFullFile!=null && stmt_update!=null)
			{
				psUpdate.close();
				stmt_update.close();
				psUpdateFullFile.close();
				con.close();
			}
		}
		catch(Exception e){}
	}	
	System.out.println("----- Exit From updateOutardReturn.jsp:"+strRetval);
	String msg1="RO";
	response.sendRedirect("../responseFile.jsp?msg="+strRetval);
%>