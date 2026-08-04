<%@ page contentType="text/html; charset=iso-8859-1" language="java"
	import="java.sql.*" import="org.apache.commons.io.FileUtils"
	errorPage=""%>
<%@page import="java.util.*"%>
<%@page import="java.text.SimpleDateFormat,java.util.Date"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
Connection con=Configuration.getConnection();
	System.out.println("#############	in list_inward_filenames.jsp");
	String down_path = Configuration
			.getConfValByNm("CFG_downloadpath_from_CHI",con);

	String sourcePath = "";
	String fileNameList = "";
	BufferedReader br = null;
	int fileFoundCount = 0;
	sourcePath = down_path + "ClearingInward/";
	System.out.println("sourcePath=" + sourcePath);
	boolean flag=false;
	String DestPath=Configuration.getConfValByNm("CFG_ARCDOWNLOADPATH_FROM_CHI",con);
	  SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyy_HHmmss");
	  Date date = new Date();
	        String systemDate = formatter.format(date);
	        System.out.println("systemDate: " + systemDate);
	DestPath=DestPath+"/Continues_Clearing/ClearingInward_Backup/"+systemDate;
	File Dest_Path=new File(DestPath);

	try {
		File directory = new File(sourcePath);	
		System.out.println("directory:" +directory);	
		
		File list[]=directory.listFiles();
		System.out.println("list.length:" +list.length);		
		if(list.length>0)
		{
			Dest_Path.mkdirs();
		}
		for (int k=0;k<list.length;k++)
		{
			if(list[k].isFile())
			{
				try {
				FileUtils.moveFile(new File(sourcePath+"/"+list[k].getName()),new File(DestPath+"/"+list[k].getName()));
				flag=true;
				}catch(IOException e)
				{
					e.printStackTrace();
				}
			}
			 if (list[k].isDirectory()) {                
                 File sourceDirFile = list[k];
                 File targetDirFile = new File(DestPath+"/"+list[k].getName());
                 FileUtils.moveDirectory(sourceDirFile, targetDirFile);
                 System.out.println("Moved directory: " + sourceDirFile + " to " + targetDirFile);
                 flag =true;
             } 
		}
		
		
		
		
		
		System.out.println("flag: " + flag );
	} catch (Exception e) {
		out.println("~~~~Exception  :" + e);
		e.printStackTrace();
	}
	finally
	{
		con.close();
	}
	
//	System.out.println(chqBuffer.toString());
//	Configuration.writeLog(chqBuffer.toString());
//	private static void move(File sourceFile, File destFile) {} 
    
%>
<%=flag%>