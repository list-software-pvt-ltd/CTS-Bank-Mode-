<%@ page contentType="text/html; charset=iso-8859-1" language="java"
	import="java.sql.*" import="org.apache.commons.io.FileUtils"
	errorPage=""%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
Connection con=Configuration.getConnection();
	System.out.println("#############	in list_inward_filenames.jsp");
	String down_path = Configuration
			.getConfValByNm("CFG_downloadpath_from_CHI",con);
	System.out.println("down_path#########    " + down_path
			+ "      #######");
	StringBuffer chqBuffer = new StringBuffer();
	String path = "";
	String fileNameList = "";
	BufferedReader br = null;
	int fileFoundCount = 0;
	path = down_path + "ClearingInward/";

	System.out.println("Path=" + path);

	try {
		File directory = new File(path);
		//get all the files from a directory
		System.out.println("directory:" +directory);
		File[] fList = directory.listFiles();
		System.out.println("fList:" +fList.length);
		
		for (File file : fList) {
			fileFoundCount++;
			System.out.println("file.toString():" +file.toString());
			if(file.isDirectory() && !file.toString().substring(file.toString().lastIndexOf("\\")+1,file.toString().length()).equalsIgnoreCase("Images"))
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
				System.out.println(file.getName());
			}
			else if(file.toString().toUpperCase().indexOf(".txt")>-1 || file.toString().indexOf("IW_SMB_")>-1)
			{
				String fileStr=file.toString();
				fileStr=fileStr.replace("\\", "/");
				chqBuffer.append(fileStr.substring(fileStr.lastIndexOf("/")+1) + "#" + fileStr.substring(fileStr.lastIndexOf("/")+1)
						+ "$");
			}
			else if(file.toString().toLowerCase().indexOf(".xml")>-1 || file.toString().toLowerCase().indexOf(".img")>-1)
			{
				String fileStr=file.toString();
				fileStr=fileStr.replace("\\", "/");
				
				System.out.println("sam="+fileStr.lastIndexOf("/")+1);
				System.out.println("sam2222="+fileStr.substring(fileStr.lastIndexOf("/")+1) + "#" + fileStr.substring(fileStr.lastIndexOf("/")+1)+ "$");
				boolean flag=false;
				if(flag==false)
				{
					System.out.println("flag="+flag);
					flag=Configuration.isProcessed(fileStr.substring(fileStr.lastIndexOf("/")+1) );
					System.out.println("After flag="+flag);
					if(flag==true)
					{
					//	chqBuffer.append("SAM#SAM" + "$");
						chqBuffer.append("SAM#SAM$"+fileStr.substring(fileStr.lastIndexOf("/")+1) + "#" + fileStr.substring(fileStr.lastIndexOf("/")+1)+ "$");
					}
					else
					{
						chqBuffer.append(fileStr.substring(fileStr.lastIndexOf("/")+1) + "#" + fileStr.substring(fileStr.lastIndexOf("/")+1)+ "$");
					}
				}
				
			}
			else if(file.isFile()&& file.toString().indexOf("CBS_Clearing_Inward")>-1)
			{
				fileFoundCount++;
				chqBuffer.append(file.toString().substring(file.toString().lastIndexOf("\\")+1,file.toString().length()) + "#"
											+ file.toString().substring(file.toString().lastIndexOf("\\")+1,file.toString().length()) + "$");
			}
		}
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
	System.out.println(chqBuffer.toString());
	Configuration.writeLog(chqBuffer.toString());
%>
<%=chqBuffer.toString()%>