<%@page import="org.apache.commons.io.FileUtils"%>
<%@page import="jcifs.smb.SmbFile"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="org.apache.commons.net.ftp.*"%>
<%@ page import="java.net.SocketException"%>
<%@ page import="java.util.*"%>
<%@ page import="cts.*"%>


<%
	String retVal = "";
	String fileName;
	int fileCount;
	String BPIBF_FileName = " ", BPXF_fileName = " ";
	String[] downloadedFileArray;
	String movedFilePath;
	String branchFolder;
	int counter = 0;
	String allFilesinDownloadPath;
	String fstr;
	boolean flg=false;
	String retstr="";
	System.out.println("===== start DownloadServlet =====");
	String fileName_second = "";
	branchFolder = (String) session.getAttribute("session_branch_code");
	branchFolder = branchFolder + "\\";
	Connection con=Configuration.getConnection();
	try {//1
		String CHI_Bank_Name = Configuration.getConfValByNm("CFG_CHI_BANKNAME",con);
		String CFG_VENDOR_ID = Configuration.getConfValByNm("CFG_VENDOR_ID",con);
		String path = Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
		File serverDir = new File(path);//NOTE: change this path according to server
		serverDir.mkdirs();
		System.out.println("serverDir" + serverDir);
		Configuration.writeLog("serverDir" + serverDir);
		String fileList[] = serverDir.list();
		fileCount = fileList.length;
		if (fileCount != 0) 
		{//@@@
			Arrays.sort(fileList);
			ArrayList<String> al_xml = new ArrayList<String>();
			ArrayList<String> al_img = new ArrayList<String>();
			ArrayList<String> al_pxf = new ArrayList<String>();
			ArrayList<String> al_br = new ArrayList<String>();
			ArrayList<String> al_bf = new ArrayList<String>();
			ArrayList<String> al_gf = new ArrayList<String>();
			ArrayList<String> al_txt = new ArrayList<String>();
			for (String s : fileList) 
			{
				if (new File(path + s).isFile()) 
				{
					//System.out.println(s);
					String ext = s.substring(s.lastIndexOf("."),s.length());
					System.out.println(ext);
					//fList[i].getName().endsWith(".xml")
					if (new File(path + s).getName().startsWith("CXF") && (new File(path + s).getName().endsWith(".xml") || new File(path + s).getName().endsWith(".XML"))) {
						al_xml.add(s);
					} else if (new File(path + s).getName().startsWith("CIBF") && (new File(path + s).getName().endsWith(".img") || new File(path + s).getName().endsWith(".IMG"))) {
						al_img.add(s);
					} 
				}
			}

			System.out.println("\n\t al_img.size():" + al_img.size());
			System.out.println("\n\t al_xml.size():" + al_xml.size());
			Configuration.writeLog("\n\t al_img.size():" + al_img.size());
			Configuration.writeLog("\n\t al_xml.size():" + al_xml.size());
			if (al_img.size() == al_xml.size())
			{		
				System.out.println("reading CXF");
				XMLReader _objXMLReader = new XMLReader();
				retVal= _objXMLReader.readOutwardCXF(al_xml,al_img);
				counter++;
				System.out.println("******** flg is::: ***************"+ flg);
			}//1

			if (retVal.equalsIgnoreCase("FAIL1")) 
			{//1
				retVal = "Check Your Clering inward directory structure.";
			}//1
			else if (retVal.equalsIgnoreCase("FAIL2")) 
			{//1
				retVal = "Problem To Create a Images.";
			}//1
			else if (retVal.equalsIgnoreCase("FAIL3")) 
			{//1
				retVal = "Problem In Clearing Inward";
			}//1

			if (!(retVal.length() > 0)) {
				retVal="ERROR";
			}								
		}//@@@
		else {//@@@

			retVal = "FAIL_NO_FILE_TO_DOWNLOAD#";
		}//@@@			 		
	}//1		 
	catch (Exception e) {//2
		System.out.println("Exception in DownloadServlet");
		e.printStackTrace();
		retVal = "FAIL#";
	}//2		 
	finally {//2
	con.close();
	}//2		  
	System.out.println("*** Exit from DownloadServlet.jsp ::: retVal"+ retVal);
	Configuration.writeLog("*** Exit from DownloadServlet.jsp ::: retVal"+ retVal);
%>

<%=retVal%>