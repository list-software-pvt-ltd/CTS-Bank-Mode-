<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="cts.*"%>
<%@page import="java.sql.*" import="org.apache.commons.io.FileUtils"	
import="java.nio.file.*"
import="java.util.zip.ZipEntry"
import="java.util.zip.ZipOutputStream"
%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Outward Clearing download files</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<script src="js/jquery-1.11.3.min.js"></script>
<link rel="stylesheet" href="codebase/dhtmlx.css" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<!-- <script src="js/inward_clearing_download.js"></script> -->
<style type="text/css">
#img_frnt {
  -moz-transition: transform 1s;
  -webkit-transition: transform 1s;
  transition: transform 1s;
}
#img_frnt1 {
  -moz-transition: transform 1s;
  -webkit-transition: transform 1s;
  transition: transform 1s;
}
.flip {
  transform: rotate(-180deg);
}
</style>
</head>
<%
	Connection con=Configuration.getConnection();
	String cfg_uploadpath_to_chi=Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
	String loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", con);
	String msg="";
	String userRole="";
	String branchCode=(String)session.getAttribute("session_branch_code");		
	try
	{
		msg=request.getParameter("msg").trim();
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on inward_clearing form msg is null");
	}			
	try
	{
		userRole=session.getAttribute("session_user_role").toString();
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on inward_clearing userRole is null");		
	}	
	String up_path = Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
	StringBuffer chqBuffer = new StringBuffer();
	String path = "";
	String fileNameList = "";
	BufferedReader br = null;
	int fileFoundCount = 0;
	int BUFFER = 1024;  
	path = up_path ;//+ "ClearingInward/";
	System.out.println("***Path=" + path);
	String sourceFolder ;
	 String zipFileName;
	try
	{
		File directory = new File(path);
		File[] fList = directory.listFiles();
		for (File file : fList) 
		{
			fileFoundCount++;
			String fileStr=file.toString();
			String fileToString1= fileStr.replace("\\", "/");
			if(file.isFile()&&( fileStr.indexOf("CIBF_")>-1 ||  fileStr.indexOf("CXF_")>-1 ||
					fileStr.indexOf("SBI_")>-1 ||  fileStr.indexOf("SBS_")>-1))
			{
				
				String fileToString= fileStr.replace("\\", "/");
				String srcFilename =path+fileStr.substring(fileToString.lastIndexOf("/")+1,fileStr.length());
				int pos = fileStr.lastIndexOf('.');
				String extention = fileStr.substring(pos+1, fileStr.length());
				if(extention.equals("zip")){
					continue;
				}
				File directory_file = new File(path+"/OutwardFiles_download");
				if (!directory_file.exists() )
				{ 
				   boolean directoryCreated = directory_file.mkdir();				        
				   if (directoryCreated) { 
				            System.out.println("**Directory created successfully at: " + path); 
				        } else { 
				            System.out.println("**Failed to create directory. It may already exist at: " + path); 
				        } 				     
				   } 
				       String strFile=fileStr.substring(fileToString.lastIndexOf("/")+1,fileStr.length());
				       FileUtils.copyFile(new File(path+"/"+strFile),
				        		new File(path+"OutwardFiles_download/"+strFile));
				        
 System.out.println("-----------------end--------------------");
			}//if			 
		}//for
		{	
			sourceFolder = path+"OutwardFiles_download/";
			zipFileName = path+"OutwardFiles_download.zip";
		
			String zipToString=zipFileName.toString().replace("\\", "/");
			ZipCreator.zipFolder(sourceFolder, zipFileName);				
			String zip=zipToString.substring(zipToString.lastIndexOf("/")+1,zipToString.length());
			chqBuffer.append("OutwardFiles_download.zip"+ "#");							
		}	   	
	   				
	}//try 
	catch (Exception e) {
		out.println("~~~~Exception  :" + e);
		e.printStackTrace();
	}
	finally
	{
		con.close();
	}
	if (fileFoundCount == 0) {
		chqBuffer.append("NOFILES#");
	}
	 String str =chqBuffer.toString();
	    String[] parts = str.split("#");
	    StringBuffer sbuf=new StringBuffer();		
		 
		 String relativeWebPath ="uploadpath_to_CHI/";	 
		 
	    for(int i=0;i<parts.length;i++)
	    {
	       String part1 = parts[i];
	       String FileNm=part1;
	       
		   part1=relativeWebPath+part1;
		   
		   String aaa="window.open(\""+part1+"\")";
	       sbuf.append("<label id='Filename_").append(i+1).append("'><a href='#' onClick='").append(aaa);
	       sbuf.append("'>").append(FileNm).append("</a>"); 
	  
	       sbuf.append(" </label><br/><br/>");
	       
	       System.out.println("str====" + sbuf.toString());	       
	    }
%>


<body id="top">

<jsp:include page="menu.jsp">
	<jsp:param name="htitle" value="MAIN" />
</jsp:include>

<div class="wrapper col3">
  <div id="container_chq" style="width:98%">
	
			<div style="margin-left: 10%"  class="fl_left" style="float:left; width:100%;">
					<label id="list_filenames" style="font-weight:bold; font-size: large;">
					Clearing Outward File Names:</label>
					
				
			<div id="div1" style="margin-top: 10%" >
			<label style="font-size: medium;;"><u><%=sbuf.toString()%></u></label>
			</div>
			<br/><br/><br/>
		</div>
  </div>
</div>
<input type="hidden" id="rcnt" name="rcnt" value="1"/>
<input type="hidden" id="selClrType" name="selClrType"" value="1"/>
<input type="hidden" id="rotateImgName" name="rotateImgName"" value=""/>
<input type="hidden" id="hd_selectCnt" name="hd_selectCnt" value="1"/>
<input type="hidden" id="hd_down_path" name="hd_down_path" value="<%=cfg_uploadpath_to_chi%>"/>
<input name="session_loginid" id="session_loginid" type="hidden" value="<%=session.getAttribute("session_loginid")%>"/>
<input name="session_branch_code" id="session_branch_code" type="hidden" value="<%=branchCode%>"/>	

<input name="session_user_role" id="session_user_role" type="hidden" value="<%=session.getAttribute("session_user_role")%>"/>
<input type="hidden" id="loginstyle" name="loginstyle" value="<%=loginstyle%>"/>
<div id="footer">
		<!-- <p>(c) 2014 Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer;">LIST Software Pvt. Ltd.</label></a><a href="javascript:showLogin()"><label class="labels" style="color:#059BD8; cursor:pointer;"> &nbsp;&nbsp;Logout</label></a><br/></p>
			Version 2017.1.0<br/> -->
			<a href="javascript:showLogin()"><label style="color:#059BD8"> &nbsp;&nbsp;Logout</label> </a>
			 <jsp:include page="footer.jsp"></jsp:include>
</div>


<%
System.out.println("Message:"+msg);
	try
	{
	if(msg.length()>0)
	{%>
	<input type="hidden" id="hdMsg1" name="hdMsg1" value="<%=msg%>"/>
	<%}
	else
	{%>
	<input type="hidden" id="hdMsg1" name="hdMsg1" value="N"/>
	<%}
	}
	catch(NullPointerException npe)
	{%>
	<input type="hidden" id="hdMsg1" name="hdMsg1" value="N"/>
	<%
	System.out.println("Message to be displayed on form is null");
	}
%>


</body>
</html>
