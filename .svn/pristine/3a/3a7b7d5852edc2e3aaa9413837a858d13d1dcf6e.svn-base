<%@ page contentType="text/html; charset=iso-8859-1" language="java"
	import="java.sql.*" import="org.apache.commons.io.FileUtils"
	errorPage=""%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
Connection con=Configuration.getConnection();
	System.out.println("#############	in list_inward_filenames.jsp");
	String down_path = Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
	System.out.println("down_path#########    " + down_path+ "      #######");
	StringBuffer chqBuffer = new StringBuffer();
	String path = "";
	String fileNameList = "";
	BufferedReader br = null;
	int fileFoundCount = 0;
	//String branchFolder = (String) session.getAttribute("session_branch_code");
	////Configuration.writeLog("branchFolder====>" + branchFolder+"<=============");
	//branchFolder=""+Integer.parseInt(branchFolder.trim());
	
	path = down_path;// + "ClearingInward/";

	System.out.println("Path=" + path);

	try 
	{
		File directory = new File(path);
		File[] fList = directory.listFiles();
		for(int i=0;i<fList.length;i++)
		{
			if(fList[i].getName().indexOf("CXF")>-1 && (fList[i].getName().endsWith(".xml") || fList[i].getName().endsWith(".XML")) || 
					fList[i].getName().indexOf("CIBF")>-1 && (fList[i].getName().endsWith(".img")||fList[i].getName().endsWith(".IMG")))
			{
				String fileStr=fList[i].getName().toString();
				fileStr=fileStr.replace("\\", "/");
				chqBuffer.append(fileStr.substring(fileStr.lastIndexOf("/")+1) + "#" + fileStr.substring(fileStr.lastIndexOf("/")+1)
						+ "$");
				fileFoundCount++;
			}
		}
	} 
	catch (Exception e) 
	{
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