package cts;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.ConnectException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.json.JSONArray;
import org.json.JSONObject;

public class GetFileFromFTP {
	
	static String sysdate=Configuration.getDDMMYYYY();//DSP sysdate
	
	public static String uploadOutwardFile(String JSONArrStr) {
		int fileCount;
		String retval="";
		FTPClient ftpClient = getFTPConnection();;
		FileInputStream inputStream = null;
		try {
			//ftpClient.connect("172.100.30.118", 21);
			//boolean login = ftpClient.login("list", "list");
			//System.out.println(login);
			//if(login==true)
			//{
						Connection con=Configuration.getConnection();
						String filepath=Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI", con);
				
						JSONArray jarr=new JSONArray(JSONArrStr);
						for(int i=0;i<jarr.length();i++) {
							JSONObject jobj=jarr.getJSONObject(i);
							String fileName=jobj.getString("FILENAME");
							System.out.println(fileName);
							FileInputStream fis = new FileInputStream(filepath+"\\"+ fileName);
							ftpClient.storeFile(fileName, fis);
							fis.close();
							
							// String updtqry="update UPLOADFILETOFTP set UPLOAD_FLAG='Y' WHERE FILENAME=? AND UPLOAD_DATE=TO_CHAR(SYSDATE,'ddmmyyyy')";
							 String updtqry="update UPLOADFILETOFTP set UPLOAD_FLAG='Y' WHERE FILENAME=? AND UPLOAD_DATE=?";
							 PreparedStatement pst=con.prepareStatement(updtqry);
							 pst.setString(1, fileName);
							 pst.setString(2, sysdate);
							 int flg=pst.executeUpdate();
							 pst.close();
						}
						con.close();
						ftpClient.logout();
						ftpClient.disconnect();
						retval="SUCCESS";
			//}
			//else {
			//	retval="NOCONNECT";
			//}
			
			
		}
		catch(Exception e) {
			e.printStackTrace();
			retval="FAILED";
		}
		System.out.println(retval);
		return retval;
	}

	public static String downloadFileFromFTP(String JSONarr) {
		int fileCount;
		FTPClient ftpClient = getFTPConnection();
		FileInputStream inputStream = null;
		String sourcepath="",destinationpath="",retval="";
		Connection con=Configuration.getConnection();
		try {
			
			
			String dateFolder=Configuration.getYYYYMMDD();
			String downloadpath=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", con);
			//ftpClient.connect("172.100.30.118", 21);
			//boolean login = ftpClient.login("list", "list");
			//if(login==true){
				createFolder();
				JSONArray jarr=new JSONArray(JSONarr);
				for(int i=0;i<jarr.length();i++) {
					JSONObject jobj=jarr.getJSONObject(i);
					
					  String fileName = jobj.getString("FILENAME");
					  
					  if(fileName.indexOf("BPIBF_")>-1 && fileName.indexOf(".img")>-1
						 	   || fileName.indexOf("BPXF_")>-1 && fileName.indexOf(".XML")>-1
						 		) {
						 		  
								  sourcepath=downloadpath+"/ClearingInward/"+fileName;
								  destinationpath="Backup/"+dateFolder+"/ClearingInward/"+fileName;
						 	}
						 	else if(fileName.indexOf("BRF_")>-1 && fileName.indexOf(".XML")>-1) {
						 		  sourcepath=downloadpath+"/ReturnInward/"+fileName;
								  destinationpath="Backup/"+dateFolder+"/ReturnInward/"+fileName;
						 	}
						 	else if(fileName.indexOf(".OACK")>-1) {
								  sourcepath=downloadpath+"/Oack/"+fileName;
								  destinationpath="Backup/"+dateFolder+"/Oack/"+fileName;
						 	}
						 	
						 	else if(fileName.indexOf(".RES")>-1) {
								  sourcepath=downloadpath+"/ResponseFiles/"+fileName;
								  destinationpath="Backup/"+dateFolder+"/ResponseFiles/"+fileName;
						 	}
					  
				
				      FTPFile file = ftpClient.mlistFile(fileName);
					  System.out.println(fileName); 
					  InputStream is =ftpClient.retrieveFileStream(fileName); 
					  byte[] fileBytes = new byte[(int)file.getSize()]; 
					  int charInt = 0; 
					  int counter = 0; 
					  while ((charInt = is.read())!= -1) { 
						  fileBytes[counter++] = (byte) charInt; 
						  }
					  
					    FileOutputStream fos = new FileOutputStream(sourcepath);
						fos.write(fileBytes);
						fos.close();
						is.close();

					  if (!ftpClient.completePendingCommand()) 
					  { 
						  ftpClient.logout();
						  ftpClient.disconnect(); 
					  }
					  
					  
				
				  //FileInputStream fis = new FileInputStream(sourcepath);
				  //ftpClient.storeFile(destinationpath, fis); 
				  //fis.close();
				 
					     
						// String updtqry="update DOWNLOADFTPFILE set DOWNLOAD_FLAG='Y' WHERE FILENAME=? AND DOWNLOAD_DATE=TO_CHAR(SYSDATE,'ddmmyyyy')";
						 String updtqry="update DOWNLOADFTPFILE set DOWNLOAD_FLAG='Y' WHERE FILENAME=? AND DOWNLOAD_DATE=?";
						 PreparedStatement pst=con.prepareStatement(updtqry);
						 pst.setString(1, fileName);
						 pst.setString(2, sysdate);
						 int flg=pst.executeUpdate();
						 if(flg>0) {
							 //ftpClient.deleteFile(fileName);
							 ftpClient.rename(fileName, destinationpath);
							 retval="SUCCESS";
						 }
				  } 
				  
				 
				//}
			//else {
				//retval="NOCONNECT";
			//}
			con.close();
			ftpClient.logout();
			ftpClient.disconnect();
		}
		catch(Exception e) {
			e.printStackTrace();
			retval="FAILED";
			try {
				con.rollback();
			}
			catch(Exception e1) {
				e1.printStackTrace();
			}
		}
		
		
		System.out.println(retval);
		return retval;
	}

	public static String getFTPFileList() {
		int fileCount,cnt=0,count=0;
		String retval="";
		FTPClient ftpClient = getFTPConnection();
		FileInputStream inputStream = null;
		//String qry="insert into DOWNLOADFTPFILE (FILE_ID, MAIN_ID, FILENAME, DOWNLOAD_DATE) values(?,?,?,to_char(sysdate,'ddmmyyyy'))";
		String qry="insert into DOWNLOADFTPFILE (FILE_ID, MAIN_ID, FILENAME, DOWNLOAD_DATE) values(?,?,?,?)";
		
		try {
			String datestr=Configuration.getDDMMYYYY();
			Connection con=Configuration.getConnection();
			String cntquery=" select count(*) from BACKUPSTATUS where ISLOGINFORADAY=?";
			PreparedStatement cntpst=con.prepareStatement(cntquery);
			cntpst.setString(1, datestr);
			ResultSet cntrs=cntpst.executeQuery();
			if(cntrs.next()) {
				count=cntrs.getInt(1);
			}
			cntrs.close();
			cntpst.close();
			
	if (count > 0)	{
			//ftpClient.connect("172.100.30.118", 21);
			//boolean login = ftpClient.login("list", "list");
			FTPFile[] mainfilelist = ftpClient.listFiles(); 
			fileCount =mainfilelist.length;
			//if (login==true){
				 for (FTPFile f1 : mainfilelist) {
					 
					 String fileName = f1.getName();
					
				
					 if (f1.isFile()) {
						 	//String query=" select count(*) from DOWNLOADFTPFILE where FILENAME=? and  DOWNLOAD_DATE =to_char(sysdate,'ddmmyyyy')";
						 	String query=" select count(*) from DOWNLOADFTPFILE where FILENAME=? and  DOWNLOAD_DATE =?";
						 	
						 	PreparedStatement pst1=con.prepareStatement(query);
					 		pst1.setString(1, fileName);
					 		pst1.setString(2, sysdate);
					 		ResultSet rs=pst1.executeQuery();
					 		if(rs.next()) {
					 			cnt=rs.getInt(1);
					 		}
					 		rs.close();
					 		pst1.close();
						 if(cnt==0) {
						 	if(fileName.indexOf("BPIBF_")>-1 && fileName.indexOf(".img")>-1
						 	   || fileName.indexOf("BPXF_")>-1 && fileName.indexOf(".XML")>-1
						 		) {
						 		//For Clearing Inward Main id is 2
						 		PreparedStatement pst=con.prepareStatement(qry);
						 		pst.setInt(1, getFileSequence());
						 		pst.setInt(2, 2);
						 		pst.setString(3, fileName);
						 		pst.setString(4, sysdate);
						 		pst.executeUpdate();
						 		pst.close();
						 	}
						 	else if(fileName.indexOf("BRF_")>-1 && fileName.indexOf(".XML")>-1) {
						 		//For Clearing Inward Main id is 2
						 		PreparedStatement pst=con.prepareStatement(qry);
						 		pst.setInt(1, getFileSequence());
						 		pst.setInt(2, 3);
						 		pst.setString(3, fileName);
						 		pst.executeUpdate();
						 		pst.close();
						 	}
						 	else if(fileName.indexOf("CXF_")>-1 && fileName.indexOf(".OACK")>-1) {
						 		PreparedStatement pst=con.prepareStatement(qry);
						 		pst.setInt(1, getFileSequence());
						 		pst.setInt(2, 5);
						 		pst.setString(3, fileName);
						 		pst.executeUpdate();
						 		pst.close();
						 	}
						 	else if(fileName.indexOf("RRF_")>-1 && fileName.indexOf(".OACK")>-1) {
						 		PreparedStatement pst=con.prepareStatement(qry);
						 		pst.setInt(1, getFileSequence());
						 		pst.setInt(2, 6);
						 		pst.setString(3, fileName);
						 		pst.executeUpdate();
						 		pst.close();
						 	}
						 	else if(fileName.indexOf("CXF_")>-1 && fileName.indexOf(".RES")>-1) {
						 		PreparedStatement pst=con.prepareStatement(qry);
						 		pst.setInt(1, getFileSequence());
						 		pst.setInt(2, 8);
						 		pst.setString(3, fileName);
						 		pst.executeUpdate();
						 		pst.close();
						 	}
						 	else if(fileName.indexOf("RRF_")>-1 && fileName.indexOf(".RES")>-1) {
						 		PreparedStatement pst=con.prepareStatement(qry);
						 		pst.setInt(1, getFileSequence());
						 		pst.setInt(2, 9);
						 		pst.setString(3, fileName);
						 		pst.executeUpdate();
						 		pst.close();
						 	}
					 }
					 }
				 }
				 
				 retval="SUCCESS";
				 	
			//}
		}
		else {
			retval="NOBACKUP";
		}
			con.close();
			ftpClient.logout();
			ftpClient.disconnect();
			
		}
		catch(ConnectException ce) {
			retval="SERVERPROBLEM";
		}
		catch(Exception e) {
			retval="FAILED";
			e.printStackTrace();
		}
		return retval;
	}
	
	
	public static void createFolder() {
		FTPClient ftpClient = getFTPConnection();
		FileInputStream inputStream = null;
		
		try {
			
			  String dateFolder=Configuration.getYYYYMMDD();
			 // ftpClient.connect("172.100.30.118", 21); 
			 // boolean login =ftpClient.login("list", "list");
 
			 ftpClient.changeWorkingDirectory("Backup/"+dateFolder);
			 int datereturnCode = ftpClient.getReplyCode();
			 if (datereturnCode == 550) {
				 ftpClient.makeDirectory("Backup/"+dateFolder);
				 ftpClient.makeDirectory("Backup/"+dateFolder+"/ClearingInward");
				 ftpClient.makeDirectory("Backup/"+dateFolder+"/ReturnInward");
				 ftpClient.makeDirectory("Backup/"+dateFolder+"/Oack");
				 ftpClient.makeDirectory("Backup/"+dateFolder+"/ResponseFiles");
			  
			 }
			 System.out.println("SUCCESS");
			 
			    ftpClient.logout();
				ftpClient.disconnect();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public static int getFileSequence() {
			int count=0;
		try {
			String query=" select get_download_sequence.nextval from dual";
			Connection con=Configuration.getConnection();
			PreparedStatement pst=con.prepareStatement(query);
			ResultSet rs=pst.executeQuery();
			if(rs.next()) {
				count=rs.getInt(1);
			}
			rs.close();
			pst.close();
			con.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return count;
	}
	
	public static String getUploadFileList() {
		int count=0;
		String retval="";
		String retOutxmlDonename="",retOutimgname="",retOutimgDonename="",clrinwdonefile="";
		Connection con=Configuration.getConnection();
		try {
			String datestr=Configuration.getDDMMYYYY();
			System.out.println(datestr);
			String query=" select count(*) from BACKUPSTATUS where ISLOGINFORADAY=?";
			
			PreparedStatement pst=con.prepareStatement(query);
			pst.setString(1, datestr);
			ResultSet rs=pst.executeQuery();
			if(rs.next()) {
				count=rs.getInt(1);
			}
			System.out.println(count);
			if(count>0) {
				String getNameQry="select distinct(CLO_XMLFILENAME),'CO' ftype from CLEARINGOUTWARD where CLO_DATE_DDMMYYYY=?" + 
						" union " + 
						"select distinct(RTO_XMLFILENAME),'RO' ftype from RETRUNOUTWARD where  RTO_DDMMYYYY=?";
				PreparedStatement Fnamepst=con.prepareStatement(getNameQry);
				Fnamepst.setString(1, datestr);
				Fnamepst.setString(2, datestr);
				ResultSet Fnamers=Fnamepst.executeQuery();
				while(Fnamers.next()) {
					int filecount=0;
					String filename=Fnamers.getString(1);
					String fileType=Fnamers.getString(2);
					//String fileconuntqry="select count(*) from UPLOADFILETOFTP where FILENAME=? and UPLOAD_DATE=to_char(sysdate,'ddmmyyyy')";
					String fileconuntqry="select count(*) from UPLOADFILETOFTP where FILENAME=? and UPLOAD_DATE=?)";
					
					PreparedStatement pst1=con.prepareStatement(fileconuntqry);
					pst1.setString(1, filename);
					pst1.setString(2, sysdate);
					ResultSet rs1=pst1.executeQuery();
					if(rs1.next()) {
						filecount=rs1.getInt(1);
					}
					pst1.close();
					rs1.close();
			if(filecount==0) {
					if(fileType.equalsIgnoreCase("CO")) {
						retOutxmlDonename=filename+".done";
						String imgfilename=filename.substring(4,(filename.length())-4);
						String s=imgfilename.substring(imgfilename.length()-2,imgfilename.length());
						System.out.println(s);
						retOutimgname="CIBF_"+imgfilename+"_"+s+".img";
						retOutimgDonename=retOutimgname+".done";
						//String inqry="insert into UPLOADFILETOFTP (FILE_ID, MAIN_ID, FILENAME, UPLOAD_DATE) values(?,?,?,to_char(sysdate,'ddmmyyyy'))";
						String inqry="insert into UPLOADFILETOFTP (FILE_ID, MAIN_ID, FILENAME, UPLOAD_DATE) values(?,?,?,?)";
						
						for(int i=0;i<4;i++) {
							PreparedStatement inpst=con.prepareStatement(inqry);
							inpst.setInt(1, getUploadFileSequence());
							inpst.setInt(2, 2);
							if(i==0) {
								inpst.setString(3,filename);	
							}
							else if(i==1) {
								inpst.setString(3,retOutimgname);
								
							}
							else if(i==2) {
								inpst.setString(3,retOutxmlDonename);	
							}
							else if(i==3) {
								inpst.setString(3,retOutimgDonename);
							}
							inpst.setString(4, sysdate);
							inpst.executeUpdate();
							inpst.close();
						}
						
						
					}
					else if(fileType.equalsIgnoreCase("RO")) {
						clrinwdonefile=filename+".done";
						
						//String inqry="insert into UPLOADFILETOFTP (FILE_ID, MAIN_ID, FILENAME, UPLOAD_DATE) values(?,?,?,to_char(sysdate,'ddmmyyyy'))";
						String inqry="insert into UPLOADFILETOFTP (FILE_ID, MAIN_ID, FILENAME, UPLOAD_DATE) values(?,?,?,?)";
						for(int i=0;i<2;i++) {
							PreparedStatement inpst=con.prepareStatement(inqry);
							inpst.setInt(1, getUploadFileSequence());
							inpst.setInt(2, 1);
							if(i==0) {
								inpst.setString(3,filename);	
							}
							else if(i==1) {
								inpst.setString(3,clrinwdonefile);	
							}
							inpst.setString(4, sysdate);
							inpst.executeUpdate();
							inpst.close();
						}
						
						
					}
				}
				}
				retval="SUCCESS";
				
			}
			else {
				retval="NOBACKUP";
			}
			rs.close();
			pst.close();
			con.close();
		}catch(Exception e) {
			e.printStackTrace();
			retval="FAILED";
			try {
				con.rollback();
			}
			catch(Exception e1) {
				
			}
		}
		return retval;
	}
	
	public static int getUploadFileSequence() {
		int count=0;
	try {
		String query=" select get_upload_sequence.nextval from dual";
		Connection con=Configuration.getConnection();
		PreparedStatement pst=con.prepareStatement(query);
		ResultSet rs=pst.executeQuery();
		if(rs.next()) {
			count=rs.getInt(1);
		}
		rs.close();
		pst.close();
		con.close();
	}catch(Exception e) {
		e.printStackTrace();
	}
	return count;
}

	public static FTPClient getFTPConnection() {
		int port=0;
		String ip="",usname="",pass="";
		FTPClient ftpClient = new FTPClient();
	try {
		String query="select FTP_IP, FTP_USERNM, FTP_PASS, FTP_PORT from ftp_config";
		Connection con=Configuration.getConnection();
		PreparedStatement pst=con.prepareStatement(query);
		ResultSet rs=pst.executeQuery();
		while(rs.next()) {
			ip=rs.getString(1);
			usname=rs.getString(2);
			pass=rs.getString(3);
			port=rs.getInt(4);
		}
		ftpClient.connect(ip, port);
		boolean login = ftpClient.login(usname, pass);
		
		System.out.println(login);
		rs.close();
		pst.close();
		con.close();
	}catch(Exception e) {
		e.printStackTrace();
	}
	return ftpClient;
}
	
	/*
	 * public static void main(String[] args) {
	 * 
	 * try { FTPClient f=getFTPConnection(); FTPFile[] mainfilelist = f.listFiles();
	 * int fileCount =mainfilelist.length; if (fileCount != 0) { for (FTPFile f1 :
	 * mainfilelist) { String fileName = f1.getName(); System.out.println(fileName);
	 * } } } catch(Exception e) { e.printStackTrace(); } }
	 */
}
