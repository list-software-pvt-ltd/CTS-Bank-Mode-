<%@ page import="java.io.*,java.util.*,jakarta.servlet.*,java.sql.*" %>
<%@ page import="cts.*" %>

<%
	StringBuffer strRetval=null;
	Connection con=null;
	  
	ResultSet rs_count=null,rs=null;
	String sqlQuery="";
	String paramVal="";
	PreparedStatement ps=null,stmt_update=null;
	String fileType="";
	String responseFileName="";
%>

<%
	int counter=0;
	System.out.println("\n\t ***** inside getResponseFileValue.jsp *******");
	strRetval=new StringBuffer("");
	try
	{//try
		con=Configuration.getConnection();
	/*stmt_update=con.prepareStatement("update RETURNFILES set ISSETTLED='D' where CREATIONDATE=? and CREATIONTIME=? and filename=?");*/
			
			paramVal=request.getParameter("opt_responseType");
			
			if(paramVal.equalsIgnoreCase("C"))
			{
				fileType="CXF_";
			}
			else if(paramVal.equalsIgnoreCase("R"))
			{
				fileType="RRF_";
			}
			
			//get approriate File Name from download path.
			String path=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"ResponseFiles/";
			File f=new File(path);
			File[] allFiles=f.listFiles();
			int r_cnt=0;
			for(File singlefile:allFiles)
			{//1
				if(singlefile.isFile() && (singlefile.getName().contains("CXF")||singlefile.getName().contains("RRF")) && singlefile.getName().endsWith(".RES"))
				{//2
					if(singlefile.getName().contains(fileType))
					{//2.1	
						System.out.println("\n\t ***** singlefile.getName():>>"+singlefile.getName());									
						sqlQuery="select count(*) from RETURNFILES where RESPONSETYPE=? and ISSETTLED='N' and FILENAME=?";	
						ps=con.prepareStatement(sqlQuery);
						ps.setString(1,paramVal);
						ps.setString(2,singlefile.getName());
						rs_count=ps.executeQuery();
						
						while(rs_count.next())
						{//3
							r_cnt=rs_count.getInt(1);
						}//3
						
						if(r_cnt>0)
						{
							responseFileName=responseFileName+singlefile.getName()+"!~!";
						}
						System.out.println("\n\t ***** responseFileName:>>"+responseFileName);	
					}//2.1
				}//2
				
			}//1	
			if(responseFileName.indexOf("!~!")>-1)
			{
				
			String responseFileNames[]=responseFileName.split("!~!");
			for (int i=0;i<responseFileNames.length;i++)
			{
			/*sqlQuery="select CREATIONDATE,CREATIONTIME,FILESTATUSCODE,ITEMSEQNO,SERIALNO,REJECTREASON,FILENAME from RETURNFILES where RESPONSETYPE=? and  FILENAME=? and ISSETTLED='N'";*/
			sqlQuery="select CREATIONDATE,CREATIONTIME,FILESTATUSCODE,ITEMSEQNO,SERIALNO,"+
			" REJECTREASON,PAYORBANKROUTNO,FILENAME,PRESENTMENTDATE,PRESENTINGBANKROUTNO from RETURNFILES"+ 
			" inner join RESFILECODES  on FILESTATUSCODE=filestatus and REJREASON=REJECTREASON"+
			" where RESPONSETYPE=? and ISSETTLED='N' and  FILENAME=?";
			ps=con.prepareStatement(sqlQuery);
			ps.setString(1,paramVal);
			ps.setString(2,responseFileNames[i]);
			//ps.setString(2,responseFileName);
			
				rs=ps.executeQuery();
				while(rs.next())	
				{//3
					strRetval.append(rs.getString(1)+"#");//CREATIONDATE	
					strRetval.append(rs.getString(2)+"#");//CREATIONTIME					
					strRetval.append(rs.getString(3)+"#");//FILESTATUSCODE
					strRetval.append(rs.getString(4)+"#");//ITEMSEQNO
					strRetval.append(rs.getString(5)+"#");//SERIALNO
					strRetval.append(rs.getString(6)+"#");//REJECTREASON
					strRetval.append(rs.getString(7)+"#");//PAYORBANKROUTNO					
					strRetval.append(rs.getString(8)+"#");//FILENAME
					strRetval.append(rs.getString(9)+"#");//PRESENTMENTDATE
					strRetval.append(rs.getString(10)+"#");//PRESENTINGBANKROUTNO																				
					strRetval.append("!#!");							
					counter++;
					
					System.out.println("\n\trs.getString(1):"+rs.getString(1));
					System.out.println("\n\trs.getString(2):"+rs.getString(2));
					System.out.println("\n\trs.getString(3):"+rs.getString(8));
					
					/*stmt_update.setString(1,rs.getString(1));
					stmt_update.setString(2,rs.getString(2));
					stmt_update.setString(3,rs.getString(8));
					if(stmt_update.executeUpdate()>0)
					{
						System.out.println("\n\t Response Record Is Updated");
					}
					else
					{
						System.out.println("\n\t Response Record Not Updated");
					}*/
				}//3	
				ps.close();
				rs.close();
			}
		}
		
	}//try
	catch(Exception e)
	{
		System.out.println("\n\t Exception e:"+e );
		e.printStackTrace();
	}
	finally
	{
		try
		{
			if(con!=null && ps!=null /*&& stmt_update!=null*/ && rs!=null)
			{
				rs.close();
				ps.close();				
				//stmt_update.close();				
				con.close();
			}
		}catch(Exception e){}
	}
	System.out.println("\n\tcounter :"+counter);
		if(counter==0)
		{
			strRetval.append("No Record Found For Given Type.");
		}
	System.out.println("\n\t exit from getResponseFileValue.jsp :\n"+strRetval.toString());
%>
<%=strRetval%>
