<%@ page import="java.io.*,java.util.*, jakarta.servlet.*,java.sql.*" %>
<%@ page import="cts.*" %>

<%

	
	String fileName=null;
	
	
	StringBuffer strRetval=new StringBuffer("");
	Connection con=Configuration.getConnection();
	String path=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"ExtensionFiles/";
	System.out.println("path:"+path);
	File f=new File(path);
	f.mkdirs();
	File[] allFiles=f.listFiles();
	int counter=0;  
	ResultSet rs_count=null,rs=null;
	Statement stmt=con.createStatement();			
	PreparedStatement stmt_update=con.prepareStatement("update EXTENSION_INWARD set EXT_ISREADED='Y' where EXT_creationdate=? and EXT_creationTime=? and EXT_fileName=?");	
	
	try
	{//try
	
			for(File singlefile:allFiles)
			{//1
				if(singlefile.isFile() && (singlefile.getName().contains(".XML")))
				{//1.1
						System.out.println("--- 1 ----");
						//BEF_416402000_12052014_142422_51930.XML			
							
						fileName=singlefile.getName();	
						String fileType="B";
						System.out.println("fileName:"+fileName);
						String str[]=fileName.split("_");			
						String ftype=str[0];
						if(ftype.indexOf("DREF")>-1)
						{
							fileType="D";
						}
						
						String date=str[2];
						String time=str[3];
						System.out.println("File Date:"+date);
			//note:get Date and time from file name and write query to confirm whether this file is already had been readed or not 	
					String sqlString="select EXT_ItemSeqNo,EXT_PayorBankRoutNo,EXT_Amount,EXT_AccountNo,";
					sqlString+="EXT_SerialNo,EXT_TransCode,EXT_PresentingBankRoutNo,EXT_PresentmentDate,EXT_CycleNo,";
					sqlString+="EXT_ExtensionPeriod,EXT_ExtensionReasonCode,EXT_creationdate,EXT_creationTime,EXT_fileName";
					//sqlString+=" from EXTENSION where EXT_CREATIONDATE='"+date+"' and EXT_ISREADED='N' and EXT_fileName='"+fileName+"'";
					sqlString+=" from EXTENSION_INWARD where EXT_CREATIONDATE='"+date+"' and EXT_ISREADED='N' and EXT_fileName='"+fileName+"'";
					
					//check before reading file wheather it is already readed or not....
						//if it is not readed then and then only go to XMLReader class
						int rows=0;			
						rs_count=stmt.executeQuery("select count(*) from EXTENSION_INWARD where EXT_creationdate='"+date+"' and EXT_creationTime='"+time+"' and EXT_fileName='"+fileName+"'");	
						
						if(rs_count.next())
						{
							 rows = rs_count.getInt(1);
							 System.out.println("\n\trows:"+rows);
						}				
						//rs_count.close();
						if(rows==0)
						//if(true)
						{//0				
				if(XMLReader.readExtensionFiles(path,fileName,fileType))//here we read the file insert the record into table
						//if(true)
							{//2
								System.out.println("----- 2 -----");		
								rs=stmt.executeQuery(sqlString);				
								System.out.println("-sqlString--"+sqlString);		
								while(rs.next())	
								{//3
									//System.out.println("** 343 343 34 3****");
									strRetval.append(rs.getString(1)+"#");//EXT_ItemSeqNo	
									strRetval.append(rs.getString(2)+"#");//EXT_PayorBankRoutNo
									strRetval.append(rs.getString(3)+"#");//EXT_Amount
									strRetval.append(rs.getString(4)+"#");//EXT_AccountNo
									strRetval.append(rs.getString(5)+"#");//EXT_SerialNo
									strRetval.append(rs.getString(6)+"#");//EXT_TransCode
									strRetval.append(rs.getString(7)+"#");//EXT_PresentingBankRoutNo
									
									strRetval.append(rs.getString(8)+"#");//EXT_PresentmentDate
									strRetval.append(rs.getString(9)+"#");//EXT_CycleNo
									strRetval.append(rs.getString(10)+"#");//EXT_ExtensionPeriod
									strRetval.append(rs.getString(11)+"#");//EXT_ExtensionReasonCode		
									
									//strRetval.append(rs.getString(12)+"#");//EXT_creationdate
									//strRetval.append(rs.getString(13)+"#");//EXT_creationtime
									//strRetval.append(rs.getString(14)+"#");//EXT_filename																																						
									strRetval.append("!#!");		
									counter++;		
									//System.out.println("----incermentes- counter -----"+counter);	
									//update the status of all reacords,thoes are already has been readed.....
									stmt_update.setString(1,rs.getString(12));
									stmt_update.setString(2,rs.getString(13));
									stmt_update.setString(3,rs.getString(14));
									stmt_update.executeUpdate();
									
								}//3
								strRetval.append("!P!");
								System.out.println("----- counter -----"+counter);						
							}//2
						}//0
						else
						{//0
							System.out.println("\n\t in else ....");
					String sqlString1="select EXT_ItemSeqNo,EXT_PayorBankRoutNo,EXT_Amount,EXT_AccountNo,";
					sqlString1+="EXT_SerialNo,EXT_TransCode,EXT_PresentingBankRoutNo,EXT_PresentmentDate,EXT_CycleNo,";
					sqlString1+="EXT_ExtensionPeriod,EXT_ExtensionReasonCode";
					//sqlString1+=" from EXTENSION where EXT_CREATIONDATE='"+date+"' and EXT_ISREADED='Y' and EXT_fileName='"+fileName+"'";
					sqlString1+=" from EXTENSION_INWARD where EXT_CREATIONDATE='"+date+"' and EXT_ISREADED='Y' and EXT_fileName='"+fileName+"'";
					System.out.println("----- sqlString1 -----"+sqlString1);	
								rs=stmt.executeQuery(sqlString1);				
										
								while(rs.next())	
								{//1
									strRetval.append(rs.getString(1)+"#");//EXT_ItemSeqNo	
									strRetval.append(rs.getString(2)+"#");//EXT_PayorBankRoutNo
									strRetval.append(rs.getString(3)+"#");//EXT_Amount
									strRetval.append(rs.getString(4)+"#");//EXT_AccountNo
									strRetval.append(rs.getString(5)+"#");//EXT_SerialNo
									strRetval.append(rs.getString(6)+"#");//EXT_TransCode
									strRetval.append(rs.getString(7)+"#");//EXT_PresentingBankRoutNo
									strRetval.append(rs.getString(8)+"#");//EXT_PresentmentDate
									strRetval.append(rs.getString(9)+"#");//EXT_CycleNo
									strRetval.append(rs.getString(10)+"#");//EXT_ExtensionPeriod
									strRetval.append(rs.getString(11)+"#");//EXT_ExtensionReasonCode																																						
									strRetval.append("!#!");		
									counter++;
								}//1
								strRetval.append("!P!");	
						}//0	
				}//1.1		
			}//1
						
		}//try
		catch(Exception e)
		{//catch
			System.out.println("\n\t Exception in getExtensionFileData.jsp:>>"+e);	
		}//catch		
		finally
		{
			try
			{
				if(con!=null && stmt!=null && stmt_update!=null)
				{
					stmt.close();
					stmt_update.close();
					con.close();					
				}
			}
			catch(Exception ee){}
		}
		 if(counter==0)
		 	strRetval.append("There is No any Extension File at Download Path.");
	System.out.println("----- Exit From getExtensionFileData.jsp :"+strRetval);
%>
<%=strRetval%>