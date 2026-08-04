<%@page import="jcifs.smb.*"%>
<%@page import="org.apache.commons.io.*"%>
<%@ page import="java.io.*,java.util.*, jakarta.servlet.*"%>
<%@ page import="jakarta.servlet.http.*"%>
<%@ page import="java.net.SocketException"%>
<%@ page import="org.apache.commons.net.ftp.*"%>
<%-- <%@ page import="org.apache.commons.fileupload.servlet.*"%> --%>
<%@ page import="org.apache.commons.io.output.*"%>
<%@ page import="cts.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.net.*"%>
<%
	String msg = "";
	String XMLFileName;
	String CIBFFileName;
	String[] imageFileArray;
	String userAuthority = "ACM"; 
	FileOutputStream fos;
	//String userAuthority="CAM";
	String retVal;
	////Configuration.writeLog("\n\n\n\n\n\n******** getCOFiles.jsp ^^^^^^^^^^^^^^^^^^^^^^^^");
	String userRole = (String) session.getAttribute("session_user_role");
	System.out.println("In Get Co Files Omkar ====>" + userRole);
	String branchFolder = (String) session.getAttribute("session_branch_code");
	////Configuration.writeLog("branchFolder====>" + branchFolder+"<=============");
	branchFolder=""+Integer.parseInt(branchFolder.trim());
	String ftpUrl = (String) session.getAttribute("session_download_ftpurl");
	int ftpPort = Integer.parseInt((String) session
			.getAttribute("session_download_ftpport"));
	String ftpUser = (String) session.getAttribute("session_download_ftpuser");
	;
	String ftpPassword = (String) session
			.getAttribute("session_download_ftppass");
	String localPath = (String) session
			.getAttribute("session_local_file_path");
	Connection con=Configuration.getConnection();
	//here  userRole 'M' is indicates the user is Maker, so we need to download the images from branch
	String ftp_reply = "";
	String local_reply = "";
	String insert_status = "";
	String duplicate_status = "";
	String rename_status = "";
	if (userAuthority.indexOf(userRole) > -1) {//1
		//Configuration.writeLog("ftpUrl===>" + ftpUrl);
		//Configuration.writeLog("ftpPort===>" + ftpPort);
		//Configuration.writeLog("ftpUser===>" + ftpUser);
		//Configuration.writeLog("ftpPassword===>" + ftpPassword);
		
		//FTP CALL
		String ftpPath=Configuration.getConfValByNm("CFG_uploadpath_to_CHI",con)+ branchFolder + "/ClearingOutward/";
		//Configuration.writeLog("\n\n\n*****FTP CALL"+ftpPath);
		
		new File(ftpPath).mkdirs();
		if (Configuration.getConfValByNm("CFG_FILE_COPY_STYLE",con).equalsIgnoreCase("FTP"))
		{
			//ftp_reply = ClearingOutward.ftp_call_to_getCOFiles(ftpUrl, ftpPort,
					//ftpUser, ftpPassword, branchFolder,con);
		}
		else if(Configuration.getConfValByNm("CFG_FILE_COPY_STYLE",con).equalsIgnoreCase("LOCAL"))
		{
			if(localPath.toLowerCase().contains("smb://"))
			{
				NtlmPasswordAuthentication auth = new NtlmPasswordAuthentication(ftpUrl,ftpUser, ftpPassword);
				ClearingOutward.local_call_to_getCOFiles(branchFolder,localPath,auth,con);
			}
			else
			{
				System.out.println("branchFolder=="+branchFolder);
				System.out.println("localPath=="+localPath);
				ClearingOutward.local_call_to_getCOFiles(branchFolder,localPath,null,con);
			}
		}
		else
		{
			ClearingOutward.socket_call_togetCOFiles(ftpPath,ftpUrl,ftpPort,con);
		}
		if (true)
		{
			//if No files at branch FTP then check it at our CFG_uploadpath_to_CHI path			
			//Configuration.writeLog("\n\n\n*****CHECK AT UPLOAD TO CHI PATH");
			if (true) 
				{
					insert_status = Configuration
							.getDataFromCBSTextFile(branchFolder);
					//Configuration.writeLog("\n\n\ninsert_status :"+ insert_status);
					System.out.println("insert_status=="+insert_status);
					
					if (insert_status.equalsIgnoreCase("SUCCESS"))
					{
						duplicate_status=ClearingOutward.getduplicateChequeJson(branchFolder);
						System.out.println("duplicate_status==="+duplicate_status);
						if(duplicate_status.split("~")[0].equalsIgnoreCase("DUPLICATE"))
						{
							msg=duplicate_status;	
						}
						else
						{	
							String scannerStr = Configuration
									.getConfValByNm("CFG_SCANNER",con);
							//rename image files and update database :prepareMICARdata	
							if (scannerStr.equalsIgnoreCase("PANINI"))
							{
								String micrStatus="";
								rename_status = Configuration.prepareMICARdata(branchFolder);
							}
							else
								rename_status = Configuration
										.prepareImageData_DigitalCheck(branchFolder);
							//Configuration.writeLog("Replay from prepareMICRData:"+ rename_status);
							msg = "Status-01 : " + rename_status;
							int cnt_unscan = ClearingOutward.count_unscanned_chqs(branchFolder);
							//Configuration.writeLog("cnt_unscan :" + cnt_unscan);
							if (cnt_unscan > 0) {
								//msg = msg + ""+cnt_unscan+" Cheque(s) Not Scanned Yet.";
							}
						}
					} 
					else
					{
						msg = "Status-02 : " + insert_status;
						System.out.println("msg=="+msg);
					}
				

			}
		}
	}//1
	con.close();
	//Configuration.writeLog("EXIT FROM getCOFiles msg:" + msg);
%>
<%=msg%>
