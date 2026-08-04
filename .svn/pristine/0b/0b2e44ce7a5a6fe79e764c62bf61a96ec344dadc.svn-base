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
import java.util.Vector;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.json.JSONArray;
import org.json.JSONObject;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpATTRS;

public class GetFileFromSFTP {
	
	static String sysdate=Configuration.getDDMMYYYY();//DSP sysdate

	public static String uploadOutwardFile(String JSONArrStr) {
		
		String retval="";
		String SFTPHOST = "";
        int SFTPPORT = 22;
        String SFTPUSER = "";
        String SFTPPASS = "";
		System.out.println("Sudarshan");
        Session session = null;
        Channel channel = null;
        ChannelSftp channelSftp = null;
	
		try {
			
						String query="select FTP_IP, FTP_USERNM, FTP_PASS, FTP_PORT from ftp_config";
						Connection con=Configuration.getConnection();
						PreparedStatement pst1=con.prepareStatement(query);
						ResultSet rs=pst1.executeQuery();
						if(rs.next()) {
							SFTPHOST=rs.getString(1);
							SFTPUSER=rs.getString(2);
							SFTPPASS=rs.getString(3);
							SFTPPORT=rs.getInt(4);
						}
						pst1.close();
						rs.close();
						
						JSch jsch = new JSch();
			            session = jsch.getSession(SFTPUSER, SFTPHOST, SFTPPORT);
			            session.setPassword(SFTPPASS);
			            java.util.Properties config = new java.util.Properties();
			            config.put("StrictHostKeyChecking", "no");
			            session.setConfig(config);
			            session.connect();
			            System.out.println("SFTP Connect Succefully");
			            channel = session.openChannel("sftp");
			            channel.connect();
			            channelSftp = (ChannelSftp) channel;
			            
						String filepath=Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI", con);
				
						JSONArray jarr=new JSONArray(JSONArrStr);
						for(int i=0;i<jarr.length();i++) {
							 JSONObject jobj=jarr.getJSONObject(i);
							 String fileName=jobj.getString("FILENAME");
							 System.out.println(fileName);
							 channelSftp.put(filepath+"/"+fileName,fileName);
							// String updtqry="update UPLOADFILETOFTP set UPLOAD_FLAG='Y' WHERE FILENAME=? AND UPLOAD_DATE=TO_CHAR(SYSDATE,'ddmmyyyy')";
							 String updtqry="update UPLOADFILETOFTP set UPLOAD_FLAG='Y' WHERE FILENAME=? AND UPLOAD_DATE=?";
							 
							 PreparedStatement pst=con.prepareStatement(updtqry);
							 pst.setString(1, fileName);
							 pst.setString(2, sysdate);
							 int flg=pst.executeUpdate();
							 pst.close();
						}
						con.close();
						retval="SUCCESS";
						channelSftp.exit();
						session.disconnect();	
		}
		catch(Exception e) {
			e.printStackTrace();
			retval="FAILED";
		}
		System.out.println(retval);
		return retval;
	}

	public static String downloadFileFromSFTP(String JSONarr) {
		int fileCount;
		FileInputStream inputStream = null;
		String sourcepath="",destinationpath="",retval="";
		
		String SFTPHOST = "";
        int SFTPPORT = 22;
        String SFTPUSER = "";
        String SFTPPASS = "";
		System.out.println("Sudarshan");
        Session session = null;
        Channel channel = null;
        ChannelSftp channelSftp = null;
		
		Connection con=Configuration.getConnection();
		try {
			
			
				String dateFolder=Configuration.getYYYYMMDD();
				String downloadpath=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", con);
			
				createFolder();
				
				String query="select FTP_IP, FTP_USERNM, FTP_PASS, FTP_PORT from ftp_config";
				PreparedStatement pst1=con.prepareStatement(query);
				ResultSet rs=pst1.executeQuery();
				if(rs.next()) {
					SFTPHOST=rs.getString(1);
					SFTPUSER=rs.getString(2);
					SFTPPASS=rs.getString(3);
					SFTPPORT=rs.getInt(4);
				}
				pst1.close();
				rs.close();
				
				JSch jsch = new JSch();
	            session = jsch.getSession(SFTPUSER, SFTPHOST, SFTPPORT);
	            session.setPassword(SFTPPASS);
	            java.util.Properties config = new java.util.Properties();
	            config.put("StrictHostKeyChecking", "no");
	            session.setConfig(config);
	            session.connect();
	            System.out.println("SFTP Connect Succefully");
	            channel = session.openChannel("sftp");
	            channel.connect();
	            channelSftp = (ChannelSftp) channel;

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
					  
					     channelSftp.get(fileName,sourcepath);
						 String updtqry="update DOWNLOADFTPFILE set DOWNLOAD_FLAG='Y' WHERE FILENAME=? AND DOWNLOAD_DATE=TO_CHAR(SYSDATE,'ddmmyyyy')";
						 PreparedStatement pst=con.prepareStatement(updtqry);
						 pst.setString(1, fileName);
						 int flg=pst.executeUpdate();
						 if(flg>0) {
							 
							 channelSftp.rename(fileName, destinationpath);
							
							 retval="SUCCESS";
						 }
				  } 
				  
			con.close();
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
		channelSftp.exit();
		session.disconnect();
		
		System.out.println(retval);
		return retval;
	}

	public static String getSFTPFileList() {
		int fileCount,cnt=0,count=0;
		String retval="";
		
		String SFTPHOST = "";
        int SFTPPORT = 0;
        String SFTPUSER = "";
        String SFTPPASS = "";
        //String SFTPWORKINGDIR = "/FGV";

        Session session = null;
        Channel channel = null;
        ChannelSftp channelSftp = null;
		
		String qry="insert into DOWNLOADFTPFILE (FILE_ID, MAIN_ID, FILENAME, DOWNLOAD_DATE) values(?,?,?,to_char(sysdate,'ddmmyyyy'))";
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
		
					String querysftp="select FTP_IP, FTP_USERNM, FTP_PASS, FTP_PORT from ftp_config";
					PreparedStatement pstsftp=con.prepareStatement(querysftp);
					ResultSet rsftp=pstsftp.executeQuery();
					if(rsftp.next()) {
						SFTPHOST=rsftp.getString(1);
						SFTPUSER=rsftp.getString(2);
						SFTPPASS=rsftp.getString(3);
						SFTPPORT=rsftp.getInt(4);
					}
					pstsftp.close();
					rsftp.close();
		
		
					JSch jsch = new JSch();
			        session = jsch.getSession(SFTPUSER, SFTPHOST, SFTPPORT);
			        session.setPassword(SFTPPASS);
			        java.util.Properties config = new java.util.Properties();
			        config.put("StrictHostKeyChecking", "no");
			        session.setConfig(config);
			        session.connect();
			        channel = session.openChannel("sftp");
			        channel.connect();
			        channelSftp = (ChannelSftp) channel;
			        //channelSftp.cd(SFTPWORKINGDIR);
			        Vector<ChannelSftp.LsEntry> list = channelSftp.ls("*.*");
			        for(ChannelSftp.LsEntry entry : list) {
			             System.out.println(entry.getFilename()); 
			             String fileName=entry.getFilename();
						 	String query=" select count(*) from DOWNLOADFTPFILE where FILENAME=? and  DOWNLOAD_DATE =to_char(sysdate,'ddmmyyyy')";
						 	PreparedStatement pst1=con.prepareStatement(query);
					 		pst1.setString(1, fileName);
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
				 
				 
				 retval="SUCCESS";
				 	
			//}
		}
		else {
			retval="NOBACKUP";
		}
			con.close();
			channelSftp.exit();
			session.disconnect();	
			
		}
		catch(Exception e) {
			retval="FAILED";
			e.printStackTrace();
		}
		return retval;
	}
	
	
	public static void createFolder() {
		String SFTPHOST = "";
        int SFTPPORT = 22;
        String SFTPUSER = "";
        String SFTPPASS = "";
		System.out.println("Sudarshan");
        Session session = null;
        Channel channel = null;
        ChannelSftp channelSftp = null;
	
		
		try {
			
			
			String query="select FTP_IP, FTP_USERNM, FTP_PASS, FTP_PORT from ftp_config";
			Connection con=Configuration.getConnection();
			PreparedStatement pst1=con.prepareStatement(query);
			ResultSet rs=pst1.executeQuery();
			if(rs.next()) {
				SFTPHOST=rs.getString(1);
				SFTPUSER=rs.getString(2);
				SFTPPASS=rs.getString(3);
				SFTPPORT=rs.getInt(4);
			}
			pst1.close();
			rs.close();
			con.close();
			
			JSch jsch = new JSch();
            session = jsch.getSession(SFTPUSER, SFTPHOST, SFTPPORT);
            session.setPassword(SFTPPASS);
            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            session.setConfig(config);
            session.connect();
            System.out.println("SFTP Connect Succefully");
            channel = session.openChannel("sftp");
            channel.connect();
            channelSftp = (ChannelSftp) channel;
			
			  String dateFolder=Configuration.getYYYYMMDD();
			  SftpATTRS attrs=null;
			  try {
			      attrs = channelSftp.stat("Backup/"+dateFolder);
			  } catch (Exception e) {
			      System.out.println("Backup/"+dateFolder+" not found");
			  }

			  if (attrs != null) {
			      System.out.println("Directory exists IsDir="+attrs.isDir());
			  } else {
			      System.out.println("Creating dir "+"Backup/"+dateFolder);
			      	 channelSftp.mkdir("Backup/"+dateFolder);
					 channelSftp.mkdir("Backup/"+dateFolder+"/ClearingInward");
					 channelSftp.mkdir("Backup/"+dateFolder+"/ReturnInward");
					 channelSftp.mkdir("Backup/"+dateFolder+"/Oack");
					 channelSftp.mkdir("Backup/"+dateFolder+"/ResponseFiles");
			  }
			
			  	System.out.println("SUCCESS");
			 
			 	channelSftp.exit();
				session.disconnect();
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
					String fileconuntqry="select count(*) from UPLOADFILETOFTP where FILENAME=? and UPLOAD_DATE=to_char(sysdate,'ddmmyyyy')";
					PreparedStatement pst1=con.prepareStatement(fileconuntqry);
					pst1.setString(1, filename);
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
						String inqry="insert into UPLOADFILETOFTP (FILE_ID, MAIN_ID, FILENAME, UPLOAD_DATE) values(?,?,?,to_char(sysdate,'ddmmyyyy'))";
						
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
							inpst.executeUpdate();
							inpst.close();
						}
						
						
					}
					else if(fileType.equalsIgnoreCase("RO")) {
						clrinwdonefile=filename+".done";
						
						String inqry="insert into UPLOADFILETOFTP (FILE_ID, MAIN_ID, FILENAME, UPLOAD_DATE) values(?,?,?,to_char(sysdate,'ddmmyyyy'))";
						
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

	/*
	 * public static FTPClient getFTPConnection() { int port=0; String
	 * ip="",usname="",pass=""; FTPClient ftpClient = new FTPClient(); try { String
	 * query="select FTP_IP, FTP_USERNM, FTP_PASS, FTP_PORT from ftp_config";
	 * Connection con=Configuration.getConnection(); PreparedStatement
	 * pst=con.prepareStatement(query); ResultSet rs=pst.executeQuery();
	 * while(rs.next()) { ip=rs.getString(1); usname=rs.getString(2);
	 * pass=rs.getString(3); port=rs.getInt(4); } ftpClient.connect(ip, port);
	 * boolean login = ftpClient.login(usname, pass);
	 * 
	 * System.out.println(login); rs.close(); pst.close(); con.close();
	 * }catch(Exception e) { e.printStackTrace(); } return ftpClient; }
	 */
	/*
	 * public static void main(String[] args) {
	 * 
	 * try { FTPClient f=getFTPConnection(); FTPFile[] mainfilelist = f.listFiles();
	 * int fileCount =mainfilelist.length; if (fileCount != 0) { for (FTPFile f1 :
	 * mainfilelist) { String fileName = f1.getName(); System.out.println(fileName);
	 * } } } catch(Exception e) { e.printStackTrace(); } }
	 */
}
