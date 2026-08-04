<%@page import="java.sql.Connection"%>
<%@ page import="java.io.*,java.util.*, jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>
<%@ page import="java.net.SocketException"%>
<%@ page import="org.apache.commons.net.ftp.*" %>
<%-- <%@ page import="org.apache.commons.fileupload.servlet.*" %> --%>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="cts.*" %>
<%@page import="java.security.PrivateKey"%>

<%!
	String msg;
	int fileCount=0;
	String XMLFileName;
	String TXTFileName;
	String fileName;
	String branchFolder;//="B1";
	String str=" ";
	PrivateKey privateKey=null;
	int cnt=0;
%>
<%
		
 		System.out.println("***** inside uploadReturnOutword.jsp *****!");
   		
		branchFolder=(String)session.getAttribute("session_branch_code");
		branchFolder=branchFolder+"/";
		Connection con=Configuration.getConnection();
 		 try
 		 {//try
			 
			 //path for micr file
				String path = Configuration.getConfValByNm("CFG_uploadpath_to_chi",con)+branchFolder+"ReturnOutward/";
				//Logic to get micr.txt file name
				File folder = new File(path);
				if(folder!=null)
					System.out.println("File is not null");
				File[] listOfFiles = folder.listFiles();
				for (File fileEntry : listOfFiles)
				{
					if (fileEntry.isFile())
					{
						if(fileEntry.isFile())
						{
							String temp = fileEntry.getName();
							if((temp.substring(temp.lastIndexOf('.') + 1, temp.length()).toLowerCase()).equals("txt"))
							fileName = fileEntry.getName();
							cnt++;
						}
			    	}
				}					 				
			File f=new File(path+fileName);
			if(cnt>0 && f.length()>0)
			//if(true)
			{//0
					String uppath=Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
				 	uppath=new File(uppath).getParent();
		 			System.out.println(uppath); 
					privateKey= new CtsSecurity(con).getPrivateKey(uppath+"\\WEB-INF\\classes\\cts\\");
					String returnValue=new Engine(con).generateRRF(privateKey);	
					String[] strArr=returnValue.split("#");
					if(strArr[0].indexOf("SUCCESS")>-1)
					{//@@
	
					//moveToArchive(String Filename,String UpOrDown,String branchFolder,String fileType,String opType)
						//move the file to server derectory  RRF.xml file name
						fileName=strArr[1];
						XMLFileName=fileName;
						//NOTE::::Dont move the RRF.xml file
						//System.out.println("XMLFileName:::::"+XMLFileName);					
						//str=Configuration.moveToArchive(fileName,"u",branchFolder,"X","R");						
	
						fileName=strArr[2];// custodian provided .txt micr file
						TXTFileName=fileName;
						System.out.println("TXTFileName:::::"+TXTFileName);			
							
						str=Configuration.moveToArchive(TXTFileName,"u",branchFolder,"T","R");		
						
						if(str.equalsIgnoreCase("FAIL"))
						{
							msg=msg+"#FAIL_TO_MOVE_FILE";
							//msg = "Failed To Upload!";
						}	
						else
						{
							msg="SUCCESS#"+TXTFileName+"#"+XMLFileName;
							//msg = "File(s) Uploaded Successfully!";
							msg ="File(s) Converted Successfully.";
						}			
					}//@@
					else
					{//@@
						//msg="FAIL#";
						//msg="Failed To Upload!";
						msg=strArr[0];
						System.out.println("Msg:"+msg);
					}//@@									  
				}//0
				else
				{//0
					msg="FAIL#";
					msg="NO FILE FROM CBS!";	
				}//0	

 		 } //try		
		 catch (Exception e)
		 {//catch2
			  e.printStackTrace();
			  msg="#FAIL";
	  		  msg = "Failed To Upload!";
		 }//catch2
		finally
		{
			con.close();
		}
		System.out.println("******* Exit From UploadReturnOutword.jsp"+msg);
		response.sendRedirect("../return_outward.jsp?msg="+msg);
%>
<%=msg%>