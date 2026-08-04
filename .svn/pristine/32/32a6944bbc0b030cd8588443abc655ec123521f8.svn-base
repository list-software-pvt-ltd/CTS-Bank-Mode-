<%@ page import="java.io.*,java.util.*, jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>
<%@ page import="java.net.SocketException"%>
<%@ page import="org.apache.commons.net.ftp.*" %>
<%@ page import="org.apache.commons.net.*" %>
<%-- <%@ page import="org.apache.commons.fileupload.servlet.*" %> --%>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="cts.*" %>
<%@ page import="java.sql.*" %>
<%!	
	
	
	public String getBranchFiles(String ftpUrl,int ftpPort,String ftpUser,String ftpPassword,String branchCode,String BRM_IFSCCODE,Connection con)
	{//getBranchFiles
			StringBuffer disconnectedBranchesStatus=new StringBuffer();
			int fileCount=0;
			PrintWriter fos=null;
			int cnt=0;
			String msg="";
			int cbsFileCnt=0;
			System.out.println("\n\nIn getBranchFiles");
			int imageFileCount=0;
			FTPClient ftpClient = new FTPClient();
			System.out.println("\n\n111");
			FileInputStream inputStream = null;
			boolean cbsTxtFileflg=false;;
			try
			{
				ftpClient.connect(ftpUrl,ftpPort);
				System.out.println("\n\nConnected To "+branchCode+"Branch.");
				//ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
				 boolean login = ftpClient.login(ftpUser,ftpPassword);
				 System.out.println("\n\n111");
				  if (login)
		 		  {//1
						System.out.println("Connection established... with"+branchCode);
					   //list All Directories
						FTPFile[] mainfilelist=ftpClient.listFiles();
						fileCount=mainfilelist.length;
						System.out.println("Server file Count:.."+fileCount);
						//System.out.println("Server file Count:.."+fileCount);
						if(fileCount!=0)
						{//2
							String fileString="";
							for(FTPFile f1:mainfilelist)
							{//3								
								String folderName=f1.getName();								
								System.out.println("\n\n\nfolderName:"+folderName);																
									if(folderName.endsWith(".txt"))
									{//3.1.1
										if(folderName.contains("From_CBS_Extension_Request.txt"))
										{//44		
												new File(Configuration.getConfValByNm("CFG_uploadpath_to_CHI",con)+"/ExtensionRequest/").mkdirs();
												InputStream is=ftpClient.retrieveFileStream(folderName);	
												BufferedReader br=new BufferedReader(new InputStreamReader(is));																					
												String line=null;
												while((line=br.readLine())!=null)
												{//1
													branchCode=Configuration.lPad(branchCode,2,"0");
													fos.println(line);	
												}//1
												br.close();
												is.close();//DSP
												//cbsTxtFileflg=true;											
												//convert images to byte array..
												if(!ftpClient.completePendingCommand())
												{ 
													ftpClient.logout(); 
													ftpClient.disconnect(); 
													System.err.println("File transfer failed."); 
												} 
												cbsTxtFileflg=true;	
												cnt++;
												ftpClient.deleteFile(folderName);								
										}//44
										else
										{//44
											 msg="Text File Name Should Be 'From_CBS_Extension_Request.txt'!";
										}//44			
									}//3.1.1
									else
									{//3.1.1
										 msg="No Return Outward File Present at Branch";
									}//3.1.1	
							 }//3	
						 }//2
						 else
						 {//2
						 	msg="File Not Found at Branch.";
						 }//2
				   }//1 		 
				   else
					{//1
						 //msg="FAIL_TO_CONNECT_TO_BRANCH";	
						  msg="Failed To Connect To Branch!";	
					}//1	 	 		  
					//imageFlg=false,micrFlg=false,cbsTxtFileflg=false;;
					
					System.out.println("cbsTxtFileflg"+cbsTxtFileflg);
					//System.out.println("cbsTxtFileflg"+cbsTxtFileflg);	

					if(cbsTxtFileflg || cnt>0)
					{//1
							msg="SUCCESS";
					}//1
			}//try
			catch(FileNotFoundException e)
			{
				System.out.println("** FileNotFoundException in getExtensionRequest()"+e);
				 //msg=e.getMessage()+" This Folder is not Available at Upload path";
				if(cnt==0) 
					msg="FailCBS11";				
			}
			catch(java.net.ConnectException e)
			{
				disconnectedBranchesStatus.append(branchCode+" ");
			}
			catch(Exception e)
			{
				System.out.println("** Exception in getExtensionRequestFile.jsp"+e);
				if(cnt==0) 
					msg="FailCBS22";	
			}
			finally
			{
				try
				{
					ftpClient.logout(); 
					ftpClient.disconnect(); 
				}
				catch(Exception e)
				{
					System.out.println("** Exception in getExtensionRequestFile.jsp getBranchFile()"+e);
				}
			}		
				System.out.println("msg:>>>>"+msg);	
			return msg;
	}//getBranchFiles
%>

<%
		int fileCount=0;
		int cnt=0;
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
		
		//FileOutputStream fos;		
		PrintWriter fos;
		boolean cbsTxtFileflg=false;;
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		System.out.println("******** getExtensionRequestFile.jsp start ************");
		userRole=(String)session.getAttribute("session_user_role");	
   		System.out.println("session_user_role====>"+userRole);		
		//here  userRole 'C' is indicates the user is Maker, so we need to download the images from branch
		if(userAuthority.indexOf(userRole)>-1)
		{//1						
				try
				{//try				
					//String filePath=Configuration.getConfValByNm("CFG_uploadpath_to_CHI");	
					//filePath=filePath+"ReturnOutward/";
					//fos= new FileOutputStream(filePath);		
					//fos=new PrintWriter(filePath);
				String sql="select BRM_DOWNLOADFTPURL,BRM_DOWNLOADFTPPORT,BRM_DOWNLOADFTPUSER, BRM_DOWNLOADFTPPASS,BRM_BRNCD,BRM_IFSCCODE from BRANCHMSTR";
					sql=sql+" where BRM_CTSMAINBRN='Y'";
					con=Configuration.getConnection();
					ps=con.prepareStatement(sql);
					rs=ps.executeQuery();
					while(rs.next())
					{//1
							ftpUrl=rs.getString(1);
							ftpPort=Integer.parseInt(rs.getString(2));
							ftpUser=rs.getString(3);
							ftpPassword=rs.getString(4);
							String BRNCD=rs.getString(5);
							String BRM_IFSCCODE=rs.getString(6);
							System.out.println("ftpUrl===>"+ftpUrl);
							System.out.println("ftpPort===>"+ftpPort);
							System.out.println("ftpUser===>"+ftpUser);
							System.out.println("ftpPassword===>"+ftpPassword);
							System.out.println("BranchCD===>"+BRNCD);														
							System.out.println("BRM_IFSCCODE===>"+BRM_IFSCCODE);	
							
							String result=getBranchFiles(ftpUrl,ftpPort,ftpUser,ftpPassword,BRNCD,BRM_IFSCCODE,con);
							status.append(result);
							System.out.println("\n\nStatus::>>>"+status);
					}//1
					//close fos
					//fos.close();			
				}//try
				catch(SQLException e)
				{
					System.out.println("\n\n*** SQLException in getExtensionRequest.jsp ***\n\n"+e);	
					retVal="Problem To Fetch Records";		
					e.printStackTrace();
				}
				catch(Exception e)
				{
					System.out.println("\n\n*** Exception in getExtensionRequest.jsp ***\n\n"+e);	
					retVal="Problem in Retrun Outward.";		
					e.printStackTrace();			
				}
				finally
				{
					try
					{
						if(rs!=null)
							rs.close();
						if(ps!=null)
							ps.close();							
						
					}
					catch(Exception e)
					{}
				}

				System.out.println("status::"+status);	
				System.out.println("cnt::"+cnt);
							
				//if(status.indexOf("SUCCESS")>-1 && cnt>0)	
				if(true)	
				{//2
							con=Configuration.getConnection();
							new Engine(con).readAndInsertExtensionRequestTextFile();
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
 		out.println("#"+retVal);
 %>