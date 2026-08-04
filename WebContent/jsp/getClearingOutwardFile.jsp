<%@ page import="java.io.*,java.util.*, jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>
<%@ page import="java.net.SocketException"%>
<%@ page import="org.apache.commons.net.ftp.*" %>
<%-- <%@ page import="org.apache.commons.fileupload.servlet.*" %> --%>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="cts.*" %>
<%@ page import="java.sql.*" %>
<%!
	String msg="";
	int fileCount;
	String XMLFileName;
	String CIBFFileName;
	String[] imageFileArray;
	String ftpUrl;
	int ftpPort;
	String ftpUser;
	String ftpPassword;
	FileOutputStream fos;
	String userAuthority="ACM";	//="ACM";
	String branchFolder="";		//"B2";
	String userRole="";			//"M";
	String retVal;
	

	public String getClearingOutwardFiles(String ftpUrl,int ftpPort,String ftpUser,String ftpPassword,String branchFolder)
	{//getClearingOutwardFiles
			boolean imageFlg=false,micrFlg=false,cbsTxtFileflg=false;;
			Connection con=Configuration.getConnection();
			String uploadToChiPath=Configuration.getConfValByNm("CFG_uploadpath_to_CHI",con);
			try
			{
			con.close();
			}
			catch(Exception e)
			{
				
			}
			System.out.println("\n\nIn getClearingOutwardFiles");
			int cnt=0;
			int imageFileCount=0;
			FTPClient ftpClient = new FTPClient();
			System.out.println("\n\n111");
			FileInputStream inputStream = null;
			try
			{
				ftpClient.connect(ftpUrl,ftpPort);
				System.out.println("\n\n111");
				//ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
				 boolean login = ftpClient.login(ftpUser,ftpPassword);
				 System.out.println("\n\n111");
				  if (login)
		 		  {//1
						System.out.println("Connection established...");
					   //list All Directories
						FTPFile[] mainfilelist=ftpClient.listFiles();
						fileCount=mainfilelist.length;
						System.out.println("Server file Count:.."+fileCount);
						if(fileCount!=0)
						{//2
							String fileString="";
							for(FTPFile f1:mainfilelist)
							{//3								
								String folderName=f1.getName();								
								System.out.println("\n\n\nfolderName:"+folderName);
								if(folderName.equalsIgnoreCase("Images"))
								{//3--1
									FTPFile[] filelist=ftpClient.mlistDir("Images");
									System.out.println("\n\nfilelist.length="+filelist.length);
									for(FTPFile f:filelist)
									{//3--2f
										ftpClient.deleteFile("/Images/"+"Thumbs.db");
										System.out.println("File :"+f.getName());						
										if(f.isFile())
										{//4
											String fileName=f.getName();
											System.out.println("File NAMe:"+fileName);
											//decide which branch folder 
											new File(uploadToChiPath+branchFolder+"/ClearingOutward/Images/").mkdirs();
											String filePath=uploadToChiPath+branchFolder+"/ClearingOutward/Images/"+fileName;
											
											//check file is image file or note 
											String fileExtension=fileName.substring(fileName.lastIndexOf(".")+1,fileName.length());
											System.out.println("fileExtension:::::"+fileExtension);
											if(fileExtension.equalsIgnoreCase("jpg")||fileExtension.equalsIgnoreCase("tif"))
											{//extension	
												imageFileCount++;
												//note: this B1 folder is according to branch										
												System.out.println("image fileName found::::"+fileName);														
												InputStream is=ftpClient.retrieveFileStream("/Images/"+fileName);
												
												byte[] fileBytes=new byte[(int)f.getSize()];
												
												int charInt=0;
												int counter=0;
												while((charInt=is.read())!=-1)
												{//1
													fileBytes[counter++]=(byte)charInt;	
												}//1
												is.close();
												fos = new FileOutputStream(filePath);											
												fos.write(fileBytes);
												fos.close();						
												System.out.println(fileName+" is Transfer.."+cnt);			
												if(!ftpClient.completePendingCommand())
												{ 
													ftpClient.logout(); 
													ftpClient.disconnect(); 
													System.err.println("File transfer failed."); 
												} 
												ftpClient.deleteFile("/Images/"+fileName);
												cnt++;
												imageFlg=true;
											}//extension	
										}//4
									}//3--2
									ftpClient.removeDirectory("Images");
								}//3--1
								else if(folderName.equalsIgnoreCase("MICRWaveforms"))
								{//3--1
									FTPFile[] filelist=ftpClient.mlistDir("MICRWaveforms");
									for(FTPFile f:filelist)
									{//3--2
								//System.out.println("File :"+f.getName());						
										if(f.isFile())
										{//4
											String fileName=f.getName();
											new File(uploadToChiPath+branchFolder+"/ClearingOutward/MICRWaveforms/").mkdirs();
											String filePath=uploadToChiPath+branchFolder+"/ClearingOutward/MICRWaveforms/"+fileName;
											
											//check file is image file or note 
											String fileExtension=fileName.substring(fileName.lastIndexOf(".")+1,fileName.length());
											System.out.println("fileExtension:::::"+fileExtension);
											if(fileExtension.equalsIgnoreCase("txt")&& fileName.indexOf("Original")==-1 )
											{//extension	
												imageFileCount++;
												//note: this B1 folder is according to branch										
												System.out.println("MICRWaveforms fileName found::::"+fileName);														
												InputStream is=ftpClient.retrieveFileStream("/MICRWaveforms/"+fileName);
												
												byte[] fileBytes=new byte[(int)f.getSize()];
												
												int charInt=0;
												int counter=0;
												while((charInt=is.read())!=-1)
												{//1
													fileBytes[counter++]=(byte)charInt;	
												}//1
												is.close();
												fos = new FileOutputStream(filePath);											
												fos.write(fileBytes);
												fos.close();				
												System.out.println(fileName+" is Transfer.."+cnt);			
												//convert images to byte array..
												if(!ftpClient.completePendingCommand())
												{ 
													ftpClient.logout(); 
													ftpClient.disconnect(); 
													System.err.println("File transfer failed."); 
												} 
												ftpClient.deleteFile("/MICRWaveforms/"+fileName);
												cnt++;
												micrFlg=true;
											}//extension											
										}//4
									}//3--2
									ftpClient.removeDirectory("MICRWaveforms");
								}//3--1
								else
								{//3.1
									//now fetch cbs provided .txt file										
									if(folderName.endsWith(".txt"))
									{//3.1.1
									
									System.out.println("********** fetch From_CBS_Clearing_Outward ************** ");
										///////////////////
										//here folderName contains From_CBS_Clearing_Outward file name
										String filePath=uploadToChiPath+branchFolder+"/ClearingOutward/"+folderName;
											
										InputStream is=ftpClient.retrieveFileStream(folderName);
												
												byte[] fileBytes=new byte[(int)f1.getSize()];
												
												int charInt=0;
												int counter=0;
												while((charInt=is.read())!=-1)
												{//1
													fileBytes[counter++]=(byte)charInt;	
												}//1
												is.close();
												fos = new FileOutputStream(filePath);											
												fos.write(fileBytes);
												fos.close();						
												//convert images to byte array..
												if(!ftpClient.completePendingCommand())
												{ 
													ftpClient.logout(); 
													ftpClient.disconnect(); 
													System.err.println("File transfer failed."); 
												} 
												ftpClient.deleteFile(folderName);
												cbsTxtFileflg=true;
										///////////////////														
									}//3.1.1	
								}//3.1
							 }//3	
						 }//2
						 else
						 {//2
						 	msg="No Cheques Found.";
						 }//2
				   }//1 		 
				   else
					{//1
						 //msg="FAIL_TO_CONNECT_TO_BRANCH";	
						  msg="Failed To Connect To Branch!";	
					}//1	 	 		  
					//imageFlg=false,micrFlg=false,cbsTxtFileflg=false;;
					
					if(imageFlg&&micrFlg&&cbsTxtFileflg)
					{//1
							msg="SUCCESS";
					}//1
					else 
					{//1
						if(!msg.equalsIgnoreCase("Failed To Connect To Branch!"))
						{//1--2
							if(!imageFlg)
							{//2
									msg="FailImages";
							}//2
							if(!micrFlg)
							{//2
								msg=msg+"FailMicr";
							}//2
							if(!cbsTxtFileflg)
							{//2
								msg=msg+"FailCBS";	
							}//2
						}//1--2				
					}//1	
			}//try
			catch(FileNotFoundException e)
			{
				System.out.println("\nFileNotFoundException in getClearingOutwardFile()::>>\n"+e);
				 //msg=e.getMessage()+" This Folder is not Available at Upload path";
				msg="FAIL_CHECK_BRANCH_FOLDER";
				
			}
			catch(java.net.ConnectException e)
			{
				System.out.println("\nConnectException in getClearingOutwardFile()::>>\n"+e);
				msg="FTP Connection not Available.";
			}
			catch(java.io.IOException e)
			{
				System.out.println("\nIOException in getClearingOutwardFile()::>>\n"+e);
				msg="FTP Connection not Available.";
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
					System.out.println("** Exception in getClearingOutwardFile()"+e);
					//msg="FAIL";
				}
			}
				
			return msg;
	}//getClearingOutwardFiles

%>

<%
		
		System.out.println("******** getClearingOutwardFile.jsp start ************");
		userRole=(String)session.getAttribute("session_user_role");	
   		System.out.println("session_user_role====>"+userRole);
		branchFolder=(String)session.getAttribute("session_branch_code");
		System.out.println("branchFolder====>"+branchFolder);
		
		ftpUrl=(String)session.getAttribute("session_download_ftpurl");
		ftpPort=Integer.parseInt((String)session.getAttribute("session_download_ftpport"));
		ftpUser=(String)session.getAttribute("session_download_ftpuser");;
		ftpPassword=(String)session.getAttribute("session_download_ftppass");
		
		//here  userRole 'M' is indicates the user is Maker, so we need to download the images from branch

		if(userAuthority.indexOf(userRole)>-1)
		{//1
				/*ftpUrl="172.100.30.189";//Configuration.getConfValByNm("CFG_UPLOADURL");//NOTE: change this paramaetr
				ftpPort=21;//Integer.parseInt(Configuration.getConfValByNm("CFG_UPLOADURLPORT"));//NOTE: change this paramaetr
				
				ftpUser="list";//Configuration.getConfValByNm("CFG_SERVERUSER");//NOTE: chage this paramaetr
				ftpPassword="list";//Configuration.getConfValByNm("CFG_SERVERPASSWORD");//NOTE: chage this paramaetr*/
				
				System.out.println("ftpUrl===>"+ftpUrl);
				System.out.println("ftpPort===>"+ftpPort);
				System.out.println("ftpUser===>"+ftpUser);
				System.out.println("ftpPassword===>"+ftpPassword);
				
				
					String status=getClearingOutwardFiles(ftpUrl,ftpPort,ftpUser,ftpPassword,branchFolder);
					System.out.println("\n getClearingOutwardFiles status->>>"+status);
					if(status.equalsIgnoreCase("SUCCESS"))
					{//2
						String _cbsStatus=Configuration.getDataFromCBSTextFile(branchFolder);
						System.out.println("\n getDataFromCBSTextFile _cbsStatus->>>"+_cbsStatus);
						String doMicr="";
						if(_cbsStatus.equalsIgnoreCase("CBSFileNotFound"))
						{
							msg="CBS File Not Found";
						}
						if(_cbsStatus.equalsIgnoreCase("CBSFileIsNotInProperFormat"))
						{
							//msg="CBS File Is Not In Proper Format\nPlease Check CBS File.";
							//make micr information for inserted cheque
							String micrStatus= Configuration.prepareMICARdata(branchFolder);
							//String micrStatus= Configuration.prepareImageData_DigitalCheck(branchFolder);		
							System.out.println("\n prepareMICARdata micrStatus->>>"+micrStatus);
							if(micrStatus.equalsIgnoreCase("SUCCESS"))
							{//1
								msg="SUCCESS";
							}//1
							else if(micrStatus.equalsIgnoreCase("No File at Branch"))
							{//1
								msg="MICAR File Not Found";
							}//1
							else if(micrStatus.indexOf("There is some faulty Cheque")>-1)
							{//1
								//msg="Cheque count miss Match";
								String faultyMicrFile=micrStatus.split("!#!")[1];
								msg="SUCCESS"+micrStatus+"\n"+faultyMicrFile;
								
							}//1
							else
							{
								msg=micrStatus;
							}
							/////
						}
						else if(_cbsStatus.equalsIgnoreCase("RecordNotInsert"))
						{
							msg="Record Not Inserted";
						}
						else if(_cbsStatus.equalsIgnoreCase("FAIL"))
						{
							msg="FAIL";
						}
						else if(_cbsStatus.equalsIgnoreCase("SUCCESS"))
						{
							String micrStatus=Configuration.prepareMICARdata(branchFolder);
							//String micrStatus=Configuration.prepareImageData_DigitalCheck(branchFolder);
							System.out.println("\n prepareMICARdata micrStatus->>>"+micrStatus);
							if(micrStatus.equalsIgnoreCase("SUCCESS"))
							{//1
								msg="SUCCESS";
						
							}//1
							else if(micrStatus.equalsIgnoreCase("No File at Branch"))
							{//1
								msg="MICAR File Not Found";
							}//1
							else if(micrStatus.indexOf("There is some faulty Cheque")>-1)
							{//1
								//msg="Cheque count miss Match";
								String faultyMicrFile=micrStatus.split("!#!")[1];
								msg="SUCCESS"+micrStatus+"\n"+faultyMicrFile;
								
							}//1
							else
							{
								msg=micrStatus;
							}
						}
						else
						{
							msg=_cbsStatus;
						}
					}//2
					else 
					{//2
						if(!msg.equalsIgnoreCase("FTP Connection not Available."))
						{//2--1
							String errMsg="No ";	
							if(status.indexOf("FailImages")>-1) 
							{//3
									errMsg=errMsg+" Image File(s)";
							}//3
							if(status.indexOf("FailMicr")>-1) 
							{//3
									errMsg=errMsg+" Micr File(s)";
							}//3
							if(status.indexOf("FailCBS")>-1) 
							{//3
									errMsg=errMsg+" CBS File(s)";
							}//3
							else
							{
								msg=status;
							}
							msg=errMsg+" At Branch!";
						}//2--1
					}//2	
		}//1
	
	

%>
<%=msg%>