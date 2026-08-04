<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"pageEncoding="UTF-8"%>
<%@ page  import="java.io.*"%>
<%@ page  import="org.apache.commons.net.ftp.*"%>
<%@ page  import="java.net.SocketException"%>
<%@ page  import="java.util.*"%>
<%@ page import="cts.*" %>
<!-- 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Download From Here</title>
</head>-->
<body>
<%
		String fileName=null,oldFilename="dummy";
		String msg=null;
		int  fileCount;
		String filePath;
	System.out.println("===== start downloadReturnInword ====="); 
		Connection con=Configuration.getConnection();
			//String fileName=request.getParameter("fileName");
		// get an ftpClient object
		 // FTPClient ftpClient = new FTPClient();
		  //FileOutputStream fos = null;
		  
		  try
		  {//1
			  String CHI_Bank_Name=Configuration.getConfValByNm("CFG_CHI_BANKNAME",con);
				System.out.println("******* CHI_Bank_Name ********"+CHI_Bank_Name);
		  		filePath=Configuration.getConfValByNm("CFG_downloadpath_from_CHI",con)+"/ReturnInward/";
				new File(filePath).mkdirs();
				
				int counter=0;
		
				File serverDir=new File(filePath);
				String fileList[]=serverDir.list();
				fileCount=fileList.length;
				boolean convert=true;
				if(fileCount!=0)
				{//@@@
					String fileString="";
					for(String f:fileList)
					{//for
						File newFile=new File(filePath,f);							  						  	
						fileName=newFile.getName();
						System.out.println("File :"+fileName);				  
						
						if(newFile.isFile() && fileName.endsWith(".txt") && newFile.length()>0)
						{//if
							msg="File(s) Already Converted. Please Check.";
							convert=false;
							break;
						}//if
					}//for
					if(convert)
					{
						for(String f:fileList)
						{//for
								File newFile=new File(filePath,f);							  						  	
								fileName=newFile.getName();
								System.out.println("File :"+fileName);				  
								
								if(newFile.isFile())
								{//if
										
										  long fileSize=fileName.length();
										  System.out.println("fileSize:"+fileSize);
										  String fileExtension= fileName.substring(fileName.lastIndexOf(".")+1,fileName.length());
										  System.out.println("fileExtension::::"+fileExtension);
										  if(CHI_Bank_Name.equals("NPCI")||CHI_Bank_Name.equals("AXIS")||CHI_Bank_Name.equals("IDBI")||CHI_Bank_Name.equals("KOTAK"))
											{
												if(fileName.contains("BRF")&&fileSize>0 && fileExtension.equalsIgnoreCase("xml"))
												{//2	
														counter++;		
														break;							
												}//2  
												else
												{//2
																 System.out.println("FAIL_NO_BRF_FILE_AVAILABLE");
																// msg="FAIL_NO_BRF_FILE_AVAILABLE";
																 msg="Failed To Download! XML File Not Found!";
												}//2
											}
										  else if(CHI_Bank_Name.equals("HDFC"))
										  {
											  if(fileName.contains("BRF")&&fileSize>0 && (fileExtension.equalsIgnoreCase("xls")||
													  fileExtension.equalsIgnoreCase("xlsx")))
												{//2	
														counter++;		
														break;							
												}//2  
												else
												{//2
																 System.out.println("FAIL_NO_BRF_FILE_AVAILABLE");
																// msg="FAIL_NO_BRF_FILE_AVAILABLE";
																 msg="Failed To Download! XML File Not Found!";
												}//2
										  }
								 }//end if
								 else
								 {//
												System.out.println("FAIL_NO_BRF_FILE_AVAILABLE");
												// msg="FAIL_NO_BRF_FILE_AVAILABLE";
												 msg="Failed To Download! XML File Not Found!";
								 }//		
		 
						}//end for
					}
					if(counter==1)
					{
						
						if(CHI_Bank_Name.equals("NPCI")||CHI_Bank_Name.equals("AXIS")||CHI_Bank_Name.equals("IDBI")||CHI_Bank_Name.equals("HDFC")||CHI_Bank_Name.equals("KOTAK"))
						{
							if(new XMLReader().readBRF(filePath,fileName))
							{//5
								 //msg="SUCESS";
								 msg="File(s) Successfully Downloaded!";
								//move the downloaded file from donload path	
							}//5	
							else
							{
								 //msg="FAIL#";
								 msg="Failed To Download!";
							}
							if(CHI_Bank_Name.equals("AXIS"))
							{
								new XMLReader().createRwExtract(filePath);
								
							}
						}
					/* 	else if(CHI_Bank_Name.equals("HDFC"))
						{
							if(new XMLReader().readRetInwXls_hdfc(filePath,fileName))
							{//5
								 //msg="SUCESS";
								 msg="File(s) Successfully Downloaded!";
								//move the downloaded file from donload path	
							}//5	
							else
							{
								 //msg="FAIL#";
								 msg="Failed To Download!";
							}
						} */
											
					}
					else
					{//2
						if(convert)
						{
							System.out.println("FAIL_NO_BRF_FILE_AVAILABLE");
							//msg="FAIL_NO_BRF_FILE_AVAILABLE";
							msg="Failed To Download! XML File Not Found!";
						}
					}//2
					
				}//@@@
				else
				{
					 System.out.println("FAIL_NO_FILE_TO_DOWNLOAD");
					msg="No File(s) Found To Convert!";
				}							
		  }//1				
		   catch (Exception e)
		  {//2
		  	System.out.println("***********************************");
			  e.printStackTrace();
			  msg="Failed To Download!";
		  }//2		 
	System.out.println("===== end downloadReturnInword ====="+msg); 
	response.sendRedirect("../return_inward.jsp?msg="+msg);	
%>
<!--</body>
</html>-->
<%=msg%>