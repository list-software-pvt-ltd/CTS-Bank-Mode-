<%@ page contentType="text/html; charset=iso-8859-1" language="java"
	import="java.sql.*" import="org.apache.commons.io.FileUtils"	
	import="java.util.zip.*"
	import="java.util.zip.ZipEntry"
	import ="java.util.zip.ZipOutputStream"	
	errorPage=""%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
Connection con=Configuration.getConnection();
	System.out.println("#############	in list_inward_downloadFiless.jsp");
	String down_path = Configuration
			.getConfValByNm("CFG_downloadpath_from_CHI",con);
	System.out.println("down_path#########    " + down_path);
	StringBuffer chqBuffer = new StringBuffer();
	String path = "";
	String fileNameList = "";
	BufferedReader br = null;
	int fileFoundCount = 0;
	int BUFFER = 1024;  
	path = down_path + "ClearingInward/";
	System.out.println("Path=" + path);
	String sourceFolder ;
	 String zipFileName;
	try {
		File directory = new File(path);
		//get all the files from a directory
		System.out.println("directory:" +directory);
		File[] fList = directory.listFiles();
		System.out.println("fList:" +fList.length);		
		for (File file : fList) {
			fileFoundCount++;	
			
			if(file.isDirectory() && file.toString().substring(file.toString().lastIndexOf("\\")+1,file.toString().length()).equalsIgnoreCase("Images"))
			{	
					 sourceFolder = path+"/Images/";
					  zipFileName = path+"Images.zip";
					ZipCreator.zipFolder(sourceFolder, zipFileName);
					System.out.println("zipFileName===" +zipFileName);
					String zip=zipFileName.toString().substring(zipFileName.toString().lastIndexOf("\\")+1,zipFileName.toString().length());
					System.out.println("zip===" +zip);
					chqBuffer.append("Images.zip"+ "$");
							System.out.println("before zipFileName============"+chqBuffer.toString());
			}
			 if(file.isFile()&& file.toString().indexOf("CBS_Clearing_Inward")>-1)
			{
				 System.out.println("****************************************");
					fileFoundCount++;
					chqBuffer.append(file.toString().substring(file.toString().lastIndexOf("\\")+1,file.toString().length()) + "$");
					System.out.println("before txt============"+chqBuffer.toString());
			}
			 else if(file.isDirectory() && !file.toString().substring(file.toString().lastIndexOf("\\")+1,file.toString().length()).equalsIgnoreCase("Images"))
			{
				System.out.println("inside:" +"----------------------------1");
				String fileNames[] = file.list();
				File[] listOfFiles = file.listFiles();
				String CFG_VENDOR_ID=Configuration.getConfValByNm("CFG_VENDOR_ID",con);
				
				for (int j = 0; j < fileNames.length; j++) {//for
					//System.out.println("" + j);
					if (listOfFiles[j].isFile()) {
						String fileName = fileNames[j];
						if(CFG_VENDOR_ID.equalsIgnoreCase("IDBISUB"))
						{
							if (fileName.indexOf("InwardSubPosting")>-1)
							{
								System.out.println("fileName:" + fileName);
								chqBuffer.append(fileName + "#"
										+ fileName + "$");
							}
						}
						else
						{
							//System.out.println("$$$$$$in if :" + fileName);
							if (fileName.endsWith(".pxf")) {
								System.out.println("#########in if fileName:"
										+ fileName + "fileNames[j].length():"
										+ fileNames[j].length());
								if (fileName.length() > 0) {
									String fileName_ = fileName
											.toUpperCase();
									//System.out.println("---------" + fileName_);
									if (!fileName_.contains(".BF")
											&& !fileName_.contains(".BR")
											&& !fileName_.contains(".GF"))
										chqBuffer.append(fileName + "#"
												+ fileName + "$");
								}
							} else {
								String fileName_ = fileNames[j].toUpperCase();
								//System.out.println("---------" + fileName_);
								if (!fileName_.contains(".BF")
										&& !fileName_.contains(".BR")
										&& !fileName_.contains(".GF")
										&& !fileName_.contains(".JPG")
										&& !fileName_.contains(".TIF")
										)
									
									chqBuffer.append(fileName + "#" + fileName
											+ "$");
							}
						}
					}
				}//for
				System.out.println(" final============"+chqBuffer.toString());
						}
			else if(file.toString().toUpperCase().indexOf(".txt")>-1 || file.toString().indexOf("IW_SMB_")>-1)
			{
				String fileStr=file.toString();
				fileStr=fileStr.replace("\\", "/");
				chqBuffer.append(fileStr.substring(fileStr.lastIndexOf("/")+1) + "#" + fileStr.substring(fileStr.lastIndexOf("/")+1)+ "$");
				System.out.println("else if(file.toString().chqBuffer:" + chqBuffer.toString());
			}		
			
			//System.out.println("else if(file.isFile()============"+chqBuffer.toString());
		}
		//sam for folder---------------------------------------
	   		//end sam for folder
	} catch (Exception e) {
		out.println("~~~~Exception  :" + e);
		e.printStackTrace();
	}
	finally
	{
		con.close();
	}
	if (fileFoundCount == 0) {
		chqBuffer.append("NOFILES#NOFILES$");
	}
	System.out.println("final============"+chqBuffer.toString());
	Configuration.writeLog(chqBuffer.toString());
%>
<%=chqBuffer.toString()%>