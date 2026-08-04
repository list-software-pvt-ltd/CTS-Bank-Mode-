<%@ page import="java.io.*,java.util.*, jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>
<%@ page import="java.net.SocketException"%>
<%@ page import="org.apache.commons.net.ftp.*" %>
<%@ page import="org.apache.commons.net.*" %>
<%-- <%@ page import="org.apache.commons.fileupload.servlet.*" %> --%>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="cts.*" %>
<%@ page import="java.sql.*" %>
 

<%
	int fileCount;
	int cnt;
	String retVal="";
	String XMLFileName;
	String CIBFFileName;
	String[] imageFileArray;
	String ftpUrl;
	int ftpPort;
	String ftpUser;
	String ftpPassword;
	String userAuthority="ACM";
	String branchFolder="";		//"B2";
	String userRole="";	
	StringBuffer status=new StringBuffer();
	StringBuffer disconnectedBranchesStatus=new StringBuffer();
	//FileOutputStream fos;		
	PrintWriter fos;
	boolean cbsTxtFileflg=false;;
	Connection con=null;
	PreparedStatement ps=null;
	ResultSet rs=null;	
	
		System.out.println("******** getExtensionRequestFilebulkk.jsp start ************");
		userRole=(String)session.getAttribute("session_user_role");	
   		System.out.println("session_user_role====>"+userRole);
		 String clearingtype=request.getParameter("opt_ctsNonCTS_code");
				
				System.out.println("clearingtype::"+clearingtype);	
			
						  
				          String extensionperiod=request.getParameter("frmdt");
						 System.out.println("extensionperiod::"+extensionperiod);
						  
				          String extensionreasoncode=request.getParameter("opt_reason_code");	
						 System.out.println("extensionreasoncode::"+extensionreasoncode);	
		//here  userRole 'C' is indicates the user is Maker, so we need to download the images from branch
		if(userAuthority.indexOf(userRole)>-1)
		{//1						
				 

			 
							
				//if(status.indexOf("SUCCESS")>-1 && cnt>0)	
				if(true)	
				{//2
				
				         
							Engine.fetchextensionoutward(clearingtype,extensionperiod,extensionreasoncode);
							 //retVal="Ready To convert.";
							  retVal=Engine.err_status;
							 System.out.println("\n\t retval:"+retVal);
							 //Added By Omkar To show Return Outward Records On Jsp Start
							 //String sql="Select * from RETRUNOUTWARD where RTO_DDMMYYYY=? and RTO_STATUS='Y'";
				String sql="Select EXT_SERIALNO,EXT_PAYORBANKROUTNO,EXT_TRANSCODE,EXT_AMOUNT,EXT_EXTENSIONREASONCODE,EXT_EXTENSIONPERIOD,";
				sql+="1 as WRN_CODE,EXT_EXTENSIONPERIOD";
				sql+=" from EXTENSION_OUTWARD  where EXT_DDMMYYYY=? and EXT_STATUS='Y'";							 
							 StringBuffer strBuf=new StringBuffer();
							 try
							 {//try
								 con=Configuration.getConnection();
								 ps=con.prepareStatement(sql);
								 ps.setString(1,Configuration.getDDMMYYYY());
								 rs=ps.executeQuery();
								 							
								 //RTO_BOFD, RTO_CHEQUENO, RTO_SORTCODE, RTO_TRANSACTIONCODE, RTO_AMOUNT, RTO_ACCOUNTNUMBER, RTO_RETURNREASONCODE, RTO_STATUS, RTO_PAYORBANKROUTNO, RTO_UNIQUENO, RTO_DDMMYYYY, RTO_XMLFILENAME
								 int rec_count=0;
								 while(rs.next())
								 {
									String tempstr=rs.getString(1)+"!Q!"+rs.getString(2)+"!Q!"+rs.getString(3)+"!Q!"+rs.getString(4)+"!Q!"+rs.getString(5)+"!Q!"+rs.getString(6)+"!Q!"+rs.getString(7)+"!Q!"+rs.getString(8)+"!@!";
									strBuf.append(tempstr);
									rec_count++;
								 }
								 if(rec_count==0 && retVal.indexOf("SUCCESS")>-1)
								 {
								 	retVal="No record present in From_Cbs_Return_Outward.txt";
								 }
								 else if(rec_count>0)
								 {
								 
									 retVal=strBuf.toString();
								 }
								 else
								 {
								 	 retVal=Engine.err_status;
								 }
							  }//try
							  catch(Exception e)
							  {
							  	System.out.println("\n\t Exception in getExtensionRequest.jsp :"+e);
							  }	
							  finally
								{
									try
									{
										if(rs!=null)
											rs.close();
										if(ps!=null)
											ps.close();							
										if(con!=null)
											con.close();
									}
									catch(Exception e)
									{}
								} 
				}//2				
		}//1
		System.out.println("******* Exit From getExtensionRequest.jsp *************** msg"+retVal);	
%>
<%="#"+retVal%>