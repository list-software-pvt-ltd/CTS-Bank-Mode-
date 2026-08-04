package cts;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Arrays;
import java.util.Date;
import java.sql.SQLException;
import java.text.SimpleDateFormat;

import jcifs.Config;
import jcifs.smb.NtlmPasswordAuthentication;
import jcifs.smb.SmbFile;
import jcifs.smb.SmbFileInputStream;

import org.apache.commons.io.FileUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;








import cts.ClearingOutwardBean;

public class ClearingOutward 
{
	private static Connection conn = null;
    private static ResultSet resultSet = null;
	public static String getPaniniNonUpdatedChqImgs(String brnchCd,Connection con)
	{
		StringBuffer retStr=new StringBuffer();
		try
		{
			System.out.println("14 inside getPaniniNonUpdatedChqImgs ************************************");
			String path="",fileNameStr="",searchStr="",frontTif="",backTif="",frontJpg="";
			String uploadpath_to_chi = Configuration.getConfValByNm("CFG_uploadpath_to_chi",con);
			
			path=uploadpath_to_chi + brnchCd+ "/ClearingOutward/MICRWaveforms/";
			//String micrpath=uploadpath_to_chi + brnchCd+ "/ClearingOutward/MICRWaveforms/MICR.txt";
			String micrpath=uploadpath_to_chi + brnchCd+ "/ClearingOutward/MICR.txt";
			System.out.println("12path=="+path);
			
			if(new File(micrpath).exists()) {
				new File(micrpath).delete();
		     }
			if(new File(path).exists()&&new File(path).list().length>0)
			{
				String fileNames[] = new File(path).list();
				Arrays.sort(fileNames);
				int noOfCheques = fileNames.length;
				//System.out.println("noOfCheques==="+noOfCheques);
				
				for(int i=0;i<noOfCheques;i++)
				{
					fileNameStr=fileNames[i];
					fileNameStr=fileNameStr.substring(0, fileNameStr.length()-4);
					frontTif="F"+fileNameStr+".tif";
					backTif="R"+fileNameStr+".tif";
					frontJpg="F"+fileNameStr+"G.jpg";
					
					//System.out.println("=="+frontTif+"=="+backTif+"=="+frontJpg);
					retStr.append(frontTif+"#"+backTif+"#"+frontJpg+"~");
				}
			}
		
		}
		catch(Exception e)
		{
			e.printStackTrace();
			Configuration.writeLog("ClearingOutward.java---"+e);
		}
		return retStr.toString();
	}
	
	public static String getDigiChkNonUpdatedChqImgs(String brnchCd,Connection con)
	{
		StringBuffer retStr=new StringBuffer();
		try
		{
		System.out.println(" inside getDigiChkNonUpdatedChqImgs ************************************");
		
		String path="",fileNameStr="",searchStr="",frontTif="",backTif="",frontJpg="";
		String uploadpath_to_chi = Configuration.getConfValByNm("CFG_uploadpath_to_chi",con);
		
		path=uploadpath_to_chi + brnchCd+ "/ClearingOutward/Images/";
		//String micrpath=uploadpath_to_chi + brnchCd+ "/ClearingOutward/MICRWaveforms/MICR.txt";
		String micrpath=uploadpath_to_chi + brnchCd+ "/ClearingOutward/MICR.txt";
		if(new File(micrpath).exists()) {
			new File(micrpath).delete();
	     }
		if (new File(path).exists()&&new File(path).list().length>0)
		{
			String fileNames[] = new File(path).list();
			int noOfCheques = fileNames.length;
			System.out.println("noOfCheques==="+noOfCheques);
			
			for(int i=0;i<noOfCheques;i++)
			{
				fileNameStr=fileNames[i];
				if(fileNameStr.startsWith("Tif200F"))
				{
					frontTif=fileNameStr;
					searchStr=fileNameStr.substring(7,fileNameStr.length()-13);
					for(int j=0;j<noOfCheques;j++)
					{
						fileNameStr=fileNames[j];
						if(fileNameStr.startsWith("Tif200B") && fileNameStr.indexOf(searchStr)>-1)
						{
							backTif=fileNameStr;
						}
						else if(fileNameStr.startsWith("Jpg100F") && fileNameStr.indexOf(searchStr)>-1)
						{
							frontJpg=fileNameStr;
						}
					}
					System.out.println("=="+frontTif+"=="+backTif+"=="+frontJpg);
					retStr.append(frontTif+"#"+backTif+"#"+frontJpg+"~");
				}
			}
		}
		}
		catch(Exception e)
		{
			retStr.append("Exception");
			e.printStackTrace();
			Configuration.writeLog("ClearingOutward.java---"+e);
		}
		return retStr.toString();
	}
	
	public static String getNonUpdatedImages(String brnchCd)
	{
		Connection con=Configuration.getConnection();
		String retStr="";
		if(Configuration.getConfValByNm("CFG_SCANNER",con).equalsIgnoreCase("PANINI"))
			retStr=getPaniniNonUpdatedChqImgs(brnchCd,con);
		else
			retStr=getDigiChkNonUpdatedChqImgs(brnchCd,con);
		try {
			con.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			Configuration.writeLog("getNonUpdatedImages--"+e);
		}
		return retStr;
	}

	public static String socket_call_togetCOFiles(String ftpPath,String ftpUrl,int ftpPort,Connection con)
	{
		System.out.println("===================in socket_call_togetCOFiles");
		System.out.println("ftpPath==="+ftpPath);
		System.out.println("ftpUrl===="+ftpUrl);
		System.out.println("ftpPort===="+ftpPort);
		  String retStr="";
		  retStr=Client.copyScannerFiles(ftpPath, ftpUrl, ftpPort);
		  return retStr;
	}
	public static String ftp_call_to_getCOFiles(String ftpUrl, int ftpPort,
			String ftpUser, String ftpPassword, String branchFolder,Connection con) {//ftp_call_to_getCOFiles
		String msg = "";
		int fileCount;
		String XMLFileName;
		String CIBFFileName;
		String[] imageFileArray;
		
		FileOutputStream fos;
		String userAuthority = "ACM"; //="ACM";
		//String userAuthority="CAM";

		String userRole = ""; //"M";
		String retVal;
		boolean imageFlg = false, micrFlg = false, cbsTxtFileflg = false;
		;

		////Configuration.writeLog("\n\nIn ftp_call_to_getCOFiles");
		int cnt = 0;
		int imageFileCount = 0;
		FTPClient ftpClient = new FTPClient();
		FileInputStream inputStream = null;
		try {
			ftpClient.connect(ftpUrl, ftpPort);

			//ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
			boolean login = ftpClient.login(ftpUser, ftpPassword);

			if (login) {//1
				//Configuration.writeLog("Connection established...");
				//list All Directories
				FTPFile[] mainfilelist = ftpClient.listFiles();
				fileCount = mainfilelist.length;
				//Configuration.writeLog("Server file Count:.." + fileCount);
				if (fileCount != 0) {//2
					String fileString = "";
					for (FTPFile f1 : mainfilelist) {//3								
						String folderName = f1.getName();
						System.out.println("\n\n\nfolderName:"+folderName);
					if (!folderName.equalsIgnoreCase("MICR.txt")) {//3--0	
						if (folderName.equalsIgnoreCase("Images")) {//3--1
							ftpClient.deleteFile("/Images/" + "Thumbs.db");
							FTPFile[] filelist = ftpClient.mlistDir("Images");
							//System.out.println("\n\nfilelist.length="+filelist.length);

							for (FTPFile f : filelist) {//3--2f

								//System.out.println("File :"+f.getName());						
								if (f.isFile()) {//4
									String fileName = f.getName();
									//System.out.println("File Name:"+fileName);
									//decide which branch folder 
									new File(
											Configuration
													.getConfValByNm("CFG_uploadpath_to_CHI",con)
													+ branchFolder
													+ "/ClearingOutward/Images/")
											.mkdirs();
									String filePath = Configuration
											.getConfValByNm("CFG_uploadpath_to_CHI",con)
											+ branchFolder
											+ "/ClearingOutward/Images/"
											+ fileName;

									//check file is image file or note 
									String fileExtension = fileName.substring(
											fileName.lastIndexOf(".") + 1,
											fileName.length());
									//System.out.println("fileExtension:::::"+fileExtension);
									if (fileExtension.equalsIgnoreCase("jpg")
											|| fileExtension
													.equalsIgnoreCase("tif")) {//extension	
										imageFileCount++;
										//note: this B1 folder is according to branch										
										//System.out.println("image fileName found::::"+fileName);														
										InputStream is = ftpClient
												.retrieveFileStream("/Images/"
														+ fileName);

										byte[] fileBytes = new byte[(int) f
												.getSize()];
										//new File(Configuration.getConfValByNm("CFG_uploadpath_to_CHI")+branchFolder+"\\ClearingOutward\\Images\\"+fileName).delete();
										int charInt = 0;
										int counter = 0;
										while ((charInt = is.read()) != -1) {//1
											fileBytes[counter++] = (byte) charInt;
										}//1
										is.close();
										fos = new FileOutputStream(filePath);
										fos.write(fileBytes);
										fos.close();
										//System.out.println(fileName+" is Transfer.."+cnt);			
										if (!ftpClient.completePendingCommand()) {
											ftpClient.logout();
											ftpClient.disconnect();
											//System.err.println("File transfer failed."); 
										}
										//ftpClient.deleteFile("/Images/"+fileName);
										cnt++;
										imageFlg = true;
									}//extension	
								}//4
							}//3--2
								//ftpClient.removeDirectory("Images");
						}//3--1
						else if (folderName.equalsIgnoreCase("OW Image")) {//3--1
							ftpClient.deleteFile("/OW Image/" + "Thumbs.db");
							FTPFile[] filelist = ftpClient.mlistDir("OW Image");
							//System.out.println("\n\nfilelist.length="+filelist.length);

							for (FTPFile f : filelist) {//3--2f
														//System.out.println("File :"+f.getName());						
								if (f.isFile()) {//4
									String fileName = f.getName();
									//System.out.println("File Name:"+fileName);
									//decide which branch folder 
									new File(
											Configuration
													.getConfValByNm("CFG_uploadpath_to_CHI",con)
													+ branchFolder
													+ "/ClearingOutward/Images/")
											.mkdirs();
									String filePath = Configuration
											.getConfValByNm("CFG_uploadpath_to_CHI",con)
											+ branchFolder
											+ "/ClearingOutward/Images/"
											+ fileName;

									//check file is image file or note 
									String fileExtension = fileName.substring(
											fileName.lastIndexOf(".") + 1,
											fileName.length());
									//System.out.println("fileExtension:::::"+fileExtension);
									if (fileExtension.equalsIgnoreCase("jpg")
											|| fileExtension
													.equalsIgnoreCase("tif")) {//extension	
										imageFileCount++;
										//note: this B1 folder is according to branch										
										//System.out.println("image fileName found::::"+fileName);														
										InputStream is = ftpClient
												.retrieveFileStream("/OW Image/"
														+ fileName);

										byte[] fileBytes = new byte[(int) f
												.getSize()];
										//new File(Configuration.getConfValByNm("CFG_uploadpath_to_CHI")+branchFolder+"\\ClearingOutward\\Images\\"+fileName).delete();
										int charInt = 0;
										int counter = 0;
										while ((charInt = is.read()) != -1) {//1
											fileBytes[counter++] = (byte) charInt;
										}//1
										is.close();
										fos = new FileOutputStream(filePath);
										fos.write(fileBytes);
										fos.close();
										//System.out.println(fileName+" is Transfer.."+cnt);			
										if (!ftpClient.completePendingCommand()) {
											ftpClient.logout();
											ftpClient.disconnect();
											//System.err.println("File transfer failed."); 
										}
										//ftpClient.deleteFile("/Images/"+fileName);
										cnt++;
										imageFlg = true;
									}//extension	
								}//4
							}//3--2
								//ftpClient.removeDirectory("Images");
						}//3--1
						else if (folderName.equalsIgnoreCase(Configuration
								.getDDMMYYYY())
								&& Configuration.getConfValByNm("CFG_SCANNER",con)
										.equalsIgnoreCase("DIGITALCHECK")) {//3--1
							ftpClient.deleteFile("/"
									+ Configuration.getDDMMYYYY() + "/"
									+ "Thumbs.db");
							FTPFile[] filelist = ftpClient
									.mlistDir(Configuration.getDDMMYYYY());
							//System.out.println("\n\nfilelist.length="+filelist.length);

							for (FTPFile f : filelist) {//3--2f
														//System.out.println("File :"+f.getName());						
								if (f.isFile()) {//4
									String fileName = f.getName();
									//System.out.println("File Name:"+fileName);
									//decide which branch folder 
									new File(
											Configuration
													.getConfValByNm("CFG_uploadpath_to_CHI",con)
													+ branchFolder
													+ "/ClearingOutward/Images/")
											.mkdirs();
									String filePath = Configuration
											.getConfValByNm("CFG_uploadpath_to_CHI",con)
											+ branchFolder
											+ "/ClearingOutward/Images/"
											+ fileName;

									//check file is image file or note 
									String fileExtension = fileName.substring(
											fileName.lastIndexOf(".") + 1,
											fileName.length());
									//System.out.println("fileExtension:::::"+fileExtension);
									if (fileExtension.equalsIgnoreCase("jpg")
											|| fileExtension
													.equalsIgnoreCase("tif")) {//extension	
										imageFileCount++;
										//note: this B1 folder is according to branch										
										//System.out.println("image fileName found::::"+fileName);														
										InputStream is = ftpClient
												.retrieveFileStream("/"
														+ Configuration
																.getDDMMYYYY()
														+ "/" + fileName);

										byte[] fileBytes = new byte[(int) f
												.getSize()];
										//new File(Configuration.getConfValByNm("CFG_uploadpath_to_CHI")+branchFolder+"\\ClearingOutward\\Images\\"+fileName).delete();
										int charInt = 0;
										int counter = 0;
										while ((charInt = is.read()) != -1) {//1
											fileBytes[counter++] = (byte) charInt;
										}//1
										is.close();
										fos = new FileOutputStream(filePath);
										fos.write(fileBytes);
										fos.close();
										//System.out.println(fileName+" is Transfer.."+cnt);			
										if (!ftpClient.completePendingCommand()) {
											ftpClient.logout();
											ftpClient.disconnect();
											//System.err.println("File transfer failed."); 
										}
										//ftpClient.deleteFile("/Images/"+fileName);
										cnt++;
										imageFlg = true;
									}//extension	
								}//4
							}//3--2
								//ftpClient.removeDirectory("Images");
						}//3--1
						else if (folderName.equalsIgnoreCase("MICRWaveforms")) {//3--1
							FTPFile[] filelist = ftpClient
									.mlistDir("MICRWaveforms");
							for (FTPFile f : filelist) {//3--2
														//System.out.println("File :"+f.getName());						
								if (f.isFile()) {//4
									String fileName = f.getName();
									//System.out.println("File Name:"+fileName);
									//decide which branch folder 
									new File(
											Configuration
													.getConfValByNm("CFG_uploadpath_to_CHI",con)
													+ branchFolder
													+ "/ClearingOutward/MICRWaveforms/")
											.mkdirs();
									String filePath = Configuration
											.getConfValByNm("CFG_uploadpath_to_CHI",con)
											+ branchFolder
											+ "/ClearingOutward/MICRWaveforms/"
											+ fileName;

									//check file is image file or note 
									String fileExtension = fileName.substring(
											fileName.lastIndexOf(".") + 1,
											fileName.length());
									//System.out.println("fileExtension:::::"+fileExtension);
									if (fileExtension.equalsIgnoreCase("txt")
											&& fileName.indexOf("Original") == -1) {//extension	
										imageFileCount++;
										//System.out.println("MAYURI..........");
										//note: this B1 folder is according to branch										
										//System.out.println("image fileName found::::"+fileName);														
										InputStream is = ftpClient
												.retrieveFileStream("/MICRWaveforms/"
														+ fileName);

										byte[] fileBytes = new byte[(int) f
												.getSize()];

										int charInt = 0;
										int counter = 0;
										while ((charInt = is.read()) != -1) {//1
											fileBytes[counter++] = (byte) charInt;
										}//1
										is.close();
										fos = new FileOutputStream(filePath);
										fos.write(fileBytes);
										fos.close();
										//System.out.println(fileName+" is Transfer.."+cnt);			
										//convert images to byte array..
										if (!ftpClient.completePendingCommand()) {
											ftpClient.logout();
											ftpClient.disconnect();
											//System.err.println("File transfer failed."); 
										}
										//ftpClient.deleteFile("/MICR Waveforms/"+fileName);
										cnt++;

										micrFlg = true;
									}//extension											
								}//4
							}//3--2
								//ftpClient.removeDirectory("MICR Waveforms");
						}//3--1
						else {//3.1
								//now fetch cbs provided .txt file										
							if (folderName.endsWith(".txt")) {//3.1.1

								//System.out.println("********** fetch From_CBS_Clearing_Outward ************** ");
								///////////////////
								//here folderName contains From_CBS_Clearing_Outward file name
								String filePath = Configuration
										.getConfValByNm("CFG_uploadpath_to_CHI",con)
										+ branchFolder + "/ClearingOutward/";

								//System.out.println("********** 111 filePath:"+filePath);
								new File(filePath).mkdirs();
								filePath = filePath + folderName;
								InputStream is = ftpClient
										.retrieveFileStream(folderName);
								//System.out.println("********** 222");

								byte[] fileBytes = new byte[(int) f1.getSize()];
								//System.out.println("********** 333");
								int charInt = 0;
								int counter = 0;
								while ((charInt = is.read()) != -1) {//1
									fileBytes[counter++] = (byte) charInt;
								}//1
								is.close();
								//System.out.println("********** 555");		

								fos = new FileOutputStream(filePath);
								fos.write(fileBytes);
								//System.out.println("********** 666");		
								fos.close();
								//System.out.println("********** 777");					
								//convert images to byte array..
								if (!ftpClient.completePendingCommand()) {
									ftpClient.logout();
									ftpClient.disconnect();
									System.err.println("File transfer failed.");
								}
								//System.out.println("********** 888");
								//ftpClient.deleteFile(folderName);
								cbsTxtFileflg = true;
								///////////////////														
							}//3.1.1	
						}//3.1
						}//3.0
					}//3	
				}//2
				
				/* else
				 {//2
				 	msg="NOFILES_AT_BRANCH_FTP";							
				 }//2*/
			}//1 		 
			else {//1
					//msg="FAIL_TO_CONNECT_TO_BRANCH";	
				msg = "Failed To Connect To Branch!";
			}//1	 	 		  
				//imageFlg=false,micrFlg=false,cbsTxtFileflg=false;;

			/////////BACKUP CODE
			//backup data to other folder (DO NOT DELETE IT)(makeDirectory)
			boolean move_images = false, move_micr = false, move_cbstxtfile = false,move_zipfile=false;
			String sysdate = Configuration.getDDMMYYYY() + "_"
					+ Configuration.getHHMISS();
			String filePathToBeBackup = "/backup/" + sysdate + "/";
			ftpClient.makeDirectory(filePathToBeBackup);
			FTPFile[] mainfilelist1 = ftpClient.listFiles();

			for (FTPFile f2 : mainfilelist1) {//FOR							
				String folderName = f2.getName();
				//System.out.println("\n\n\nfolderName:"+folderName);
				if (folderName.equalsIgnoreCase("Images")) {
					//System.out.println("\nfilePathToBeBackup="+filePathToBeBackup);
					if (ftpClient.rename("/Images", filePathToBeBackup
							+ "Images")) {
						move_images = true;
					}

				}
				if (folderName.equalsIgnoreCase("OW Image")) {
					//System.out.println("\nfilePathToBeBackup="+filePathToBeBackup);
					if (ftpClient.rename("/OW Image", filePathToBeBackup
							+ "OW Image")) {
						move_images = true;
					}

				}
				if (folderName.equalsIgnoreCase("MICRWaveforms")) {
					//System.out.println("\nfilePathToBeBackup="+filePathToBeBackup);
					if (ftpClient.rename("/MICRWaveforms", filePathToBeBackup
							+ "MICRWaveforms")) {
						move_micr = true;
					}
				}
				if (folderName.contains("From_CBS_Clearing_Outward")
						&& folderName.endsWith(".txt")) {
					//System.out.println("\n.............filePathToBeBackup="+filePathToBeBackup);
					if (ftpClient.rename(folderName, filePathToBeBackup
							+ folderName)) {
						move_cbstxtfile = true;
					}
				}
				if (folderName.endsWith(".zip")) {
				System.out.println("\n........zip file.....filePathToBeBackup="+filePathToBeBackup);
					if (ftpClient.rename(folderName, filePathToBeBackup
							+ folderName)) {
						move_zipfile = true;
					}
				}
			}//FOR
				/////////BACKUP CODE ENDS
			msg = "SUCCESS";
			/*if(move_images&&move_micr&&move_cbstxtfile)
			{
				
			}*/

		}//try
		catch (FileNotFoundException e) {
			//Configuration.writeLog("\nFileNotFoundException in getCOFiles()::>>\n"+ e);
			//msg=e.getMessage()+" This Folder is not Available at Upload path";
			msg = "FAIL_CHECK_BRANCH_FOLDER";
			e.printStackTrace();
			Configuration.writeLog("ftp_call_to_getCOFiles--FileNot--"+e);

		} catch (java.net.ConnectException e) {
			//Configuration.writeLog("\nConnectException in getCOFiles()::>>\n" + e);
			msg = "FTP Connection not Available.";
			e.printStackTrace();
			Configuration.writeLog("ftp_call_to_getCOFiles--ConnectException--"+e);
		} catch (java.io.IOException e) {
			//Configuration.writeLog("\nIOException in getCOFiles()::>>\n" + e);
			msg = "FTP Connection not Available.";
			e.printStackTrace();
			Configuration.writeLog("ftp_call_to_getCOFiles--IOException--"+e);
		} finally {
			try {
				ftpClient.logout();
				ftpClient.disconnect();
			} catch (Exception e) {
				//Configuration.writeLog("** Exception in getCOFiles()" + e);
				//msg="FAIL";
				e.printStackTrace();
			}
		}

		return msg;

	}//ftp_call_to_getCOFiles

	public static String check_files_at_uploadtoCHI(String branchFolder,Connection con) {//check_files_at_uploadtoCHI
		String msg = "";
		int fileCount;
		String XMLFileName;
		String CIBFFileName;
		String[] imageFileArray;
		String ftpUrl;
		int ftpPort;
		String ftpUser;
		String ftpPassword;
		FileOutputStream fos;
		String userAuthority = "ACM"; //="ACM";
		//String userAuthority="CAM";
		String userRole = ""; //"M";
		String retVal;
		//Configuration.writeLog("In check_files_at_uploadtoCHI :" + branchFolder);
		int flag_cbs_txtfile = 0, flag_images = 0, flag_micr_txtfiles = 0;
		String co_filePath = Configuration
				.getConfValByNm("CFG_uploadpath_to_CHI",con)
				+ branchFolder
				+ "/ClearingOutward/";
		//Configuration.writeLog("co_filePath=" + co_filePath);
		File co_files = new File(co_filePath);
		co_files.mkdirs();
		String[] fileList = co_files.list();
		//Configuration.writeLog("fileList.length=" + fileList.length);
		//System.out.println("fileList.length=" + fileList.length);
		//System.out.println("fileList.length=" + fileList.length);
		if (fileList.length != 0) {//3
			//Configuration.writeLog("fileList.length=" + fileList.length);
			for (String fNm : fileList) {//4
				File fileName = new File(co_filePath + fNm);
				//Configuration.writeLog("fileName:" + fileName.getName());
				String name = fileName.getName();
				if(!(name.contains("MICR")
						&& name.endsWith(".txt")))
				{//4.0
			
					if (!fileName.isDirectory()) {//4.1

					String nm = fileName.getName();

					if (nm.contains("From_CBS_Clearing_Outward")
							&& nm.endsWith(".txt")) {
						flag_cbs_txtfile = 1;
					}

				}//4.1
				else {//4.1
					String nm = fileName.getName();
					if (nm.equalsIgnoreCase("Images")) {//5
						new File(co_filePath + "/Images/Thumbs.db").delete();
						String image_fileList[] = new File(co_filePath
								+ "/Images/").list();
						if ((image_fileList.length % 4) == 0) {
							flag_images = 1;
						}
					}//5

					if (nm.equalsIgnoreCase("MICRWaveforms")) {//6
						String micr_fileList[] = new File(co_filePath
								+ "/MICRWaveforms/").list();
						if (micr_fileList.length != 0) {
							flag_micr_txtfiles = 1;
						}
					}//6

				}//4.1
			  }//4.0
			}//4 FOR

		}//3 OF if (fileList.length != 0)
		else {//3
				//msg ="NOFILES_AT_UPLOADTO_CHI";
			msg = "No Files at UPLOADTO Path";
		}//3

		/*if(flag_cbs_txtfile == 1 && flag_images == 1 && flag_micr_txtfiles == 1)
		{
			msg = "SUCCESS";//"ALLFILES_AVAILABLE_AT_UPLOADTO_CHI";
		}
		else
		{
			if(!msg.equalsIgnoreCase("FILESNOTFOUND_AT_UPLOADTO_CHI"))
			{
				
				if(flag_cbs_txtfile == 0)
				{
					msg="CBS_TXTFILE_NA!@!";
				}
				if(flag_images == 0)
				{
					msg = msg + "IMAGES_NA!@!";
				}
				if(flag_micr_txtfiles == 0)
				{
					msg = msg + "MICRFILES_NA!@!";
				}
			}
		}*/
		//msg="SUCCESS";
		return msg;
	}//check_files_at_uploadtoCHI

	public int count_in_db(String branchFolder) {//count_in_db
		int co_count = 0;
		try {

			Connection con = Configuration.getConnection();
			String query = "Select count(*) from CLEARINGOUTWARD where CLO_BRANCH_CD='"
					+ branchFolder
					+ "' and CLO_DATE_DDMMYYYY='"
					+ Configuration.getDDMMYYYY()
					+ "' and CLO_CONVERT_FLG ='N' and CLO_IMG_FRNT_BW IS NOT null and CLO_IMG_BACK_BW IS NOT null and CLO_IMG_FRNT_GR IS NOT null and CLO_IMG_BACK_GR IS NOT null";

			PreparedStatement ps = con.prepareStatement(query);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				co_count = rs.getInt(1);
			}

		} catch (Exception e) {
			//Configuration.writeLog("Exception in count_in_db:::" + e);
			e.printStackTrace();
		}
		return co_count;
	}//count_in_db

	public static int count_unscanned_chqs(String branchFolder) {//count_unscanned_chqs
		int unscan_count = 0;
		try {

			Connection con = Configuration.getConnection();
			/*String query = "Select count(*) from CLEARINGOUTWARD where CLO_BRANCH_CD='"+branchFolder+"' and CLO_DATE_DDMMYYYY='"+Configuration.getDDMMYYYY()+"' and CLO_CONVERT_FLG ='N' and CLO_IMG_FRNT_BW IS null and CLO_IMG_BACK_BW IS null and CLO_IMG_FRNT_GR IS null and CLO_IMG_BACK_GR IS null";*/

			String query = "Select count(*) from CLEARINGOUTWARD where CLO_BRANCH_CD='"
					+ branchFolder
					+ "' and CLO_CONVERT_FLG ='N' and CLO_IMG_FRNT_BW IS null and CLO_IMG_BACK_BW IS null and CLO_IMG_FRNT_GR IS null and CLO_IMG_BACK_GR IS null and CLO_DATE_DDMMYYYY='"
					+ Configuration.getDDMMYYYY() + "'";

			PreparedStatement ps = con.prepareStatement(query);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				unscan_count = rs.getInt(1);
			}

		} catch (Exception e) {
			Configuration.writeLog("count_unscanned_chqs:::" + e);
			e.printStackTrace();
			
		}
		//Configuration.writeLog("unscan_count:::" + unscan_count);
		return unscan_count;
	}//count_unscanned_chqs END

	/////////////////////////////////

	public static String local_call_to_getCOFiles(String branchFolder,
			String SourcePath,NtlmPasswordAuthentication auth,Connection con) {//ftp_call_to_getCOFiles
		String msg = "";
		int fileCount;
		//String userAuthority="CAM";
		//String userRole = ""; //"M";
		//String retVal;
		boolean imageFlg = false, micrFlg = false, cbsTxtFileflg = false;
		;

		//Configuration.writeLog("\n\n-----In local_call_to_getCOFiles----"+SourcePath);
		int cnt = 0;
		int imageFileCount = 0;
		//FileInputStream inputStream = null;
		try {
			boolean sourceFileExits;
			
			if(SourcePath.toLowerCase().contains("smb://"))
			{
				sourceFileExits= new SmbFile(SourcePath,auth).exists();
				//sourceFileExits= new SmbFile(SourcePath).exists();
			}
			else
				sourceFileExits= new File(SourcePath).exists();
			//Configuration.writeLog("--IN file--"+sourceFileExits);
			if(sourceFileExits)
			{//1
				System.out.println("Connection established...");
				//list All Directories
				String[] mainfilelist ;
				if(SourcePath.toLowerCase().contains("smb://"))
				{
					mainfilelist= new SmbFile(SourcePath,auth).list();
					//mainfilelist= new SmbFile(SourcePath).list();
				}
				else
					mainfilelist= new File(SourcePath).list();
				fileCount = mainfilelist.length;
				Configuration.writeLog("Server file Count:.." + fileCount);
				if (fileCount != 0) {//2
					//String fileString = "";
					for (int i=0;i< mainfilelist.length;i++) {//3								
						String folderName = mainfilelist[i];
						Configuration.writeLog("folderName>>>>>>>" + folderName);
						if(!(folderName.contains("MICR")
								&& folderName.endsWith(".txt")))
						{//3--0
						
						if (folderName.equalsIgnoreCase("Images")
								|| folderName.equalsIgnoreCase("OW Image")
								|| (folderName.equalsIgnoreCase(Configuration
										.getDDMMYYYY()) && Configuration
										.getConfValByNm("CFG_SCANNER",con)
										.equalsIgnoreCase("DIGITALCHECK"))) {//3--1
							String[] fileNamelist ;
							Configuration.writeLog("\n1111111111" );
							if(SourcePath.toLowerCase().contains("smb://"))
							{
								fileNamelist=new SmbFile(SourcePath + "/"+ folderName + "/",auth).list();
								//Configuration.writeLog("\n22222" );
							}
							else
								fileNamelist=new File(SourcePath + "/"+ folderName + "/").list();
							for (int j=0;j<fileNamelist.length;j++) {//3--2f
								boolean isFile;
								String fileName ="";
								Configuration.writeLog("\n3333333333" );
								if(SourcePath.toLowerCase().contains("smb://"))
								{//4--1
									SmbFile f=new SmbFile(SourcePath + "/"+ folderName + "/"+fileNamelist[j],auth);
									Configuration.writeLog("\n44444444" );
									isFile=f.isFile();
									fileName= f.getName();
								}//4--1
								else
								{
									File f=new File(SourcePath + "/"+ folderName + "/"+fileNamelist[j]);
									isFile=f.isFile();
									fileName= f.getName();
								}
								//Configuration.writeLog("\n5555555555" );
								if (isFile) {//4
									new File(
											Configuration
													.getConfValByNm("CFG_uploadpath_to_CHI",con)
													+ branchFolder
													+ "/ClearingOutward/Images/")
											.mkdirs();
									String filePath = Configuration
											.getConfValByNm("CFG_uploadpath_to_CHI",con)
											+ branchFolder
											+ "/ClearingOutward/Images/";
											//+ fileName;
									String fileExtension = fileName.substring(
											fileName.lastIndexOf(".") + 1,
											fileName.length());
									if(!fileName.toLowerCase().contains("temp"))
									{
										if (fileExtension.equalsIgnoreCase("jpg")
											|| fileExtension
													.equalsIgnoreCase("tif")) {//extension	
										imageFileCount++;
										//note: this B1 folder is according to branch										
										System.out.println("image fileName found::::"+fileName);														
										//Configuration.writeLog("\n666666666" );
										if(SourcePath.toLowerCase().contains("smb://"))
										{//4--1
											//FileUtils.copyURLToFile(new SmbFile (SourcePath + "/"+folderName+"/"+ fileName,auth).toURL(), new File(filePath));
											SmbFileInputStream fis=new SmbFileInputStream(new SmbFile (SourcePath + "/"+folderName+"/"+fileName,auth));
											FileOutputStream fos=new FileOutputStream(new File(filePath+fileName));
											while(true)
											{
												byte b[]=new byte[(int)new SmbFile (SourcePath + "/"+folderName+"/"+fileName,auth).length()];
												if(fis.read(b)==-1)
													break;
												fos.write(b);
											}
											fis.close();
											fos.close();
											//Configuration.writeLog("\n7777777777777" );
											cnt++;
										}
										else
										{
											FileUtils.copyFile(new File (SourcePath + "/"+folderName+"/"+fileName), new File(filePath+fileName));
											//Configuration.writeLog("\n88888888888" );
											cnt++;
										}
										imageFlg = true;
									  }//extension
									}
								}//4
								
							}//3--2
								//ftpClient.removeDirectory("Images");
						}//3--1
						else if (folderName.equalsIgnoreCase("MICRWaveforms")) {//3--1
							String[] fileNamelist ;
							
							if(SourcePath.toLowerCase().contains("smb://"))
								fileNamelist=new SmbFile(SourcePath + "/"+ folderName + "/",auth).list();
							else
								fileNamelist=new File(SourcePath + "/"+ folderName + "/").list();
							for (int j=0;j<fileNamelist.length;j++) {//3--2f
								boolean isFile;
								String fileName ="";
								if(SourcePath.toLowerCase().contains("smb://"))
								{//4--1
									SmbFile f=new SmbFile(SourcePath + "/"+ folderName + "/"+fileNamelist[j],auth);
									isFile=f.isFile();
									fileName= f.getName();
								}//4--1
								else
								{
									File f=new File(SourcePath + "/"+ folderName + "/"+fileNamelist[j]);
									isFile=f.isFile();
									fileName= f.getName();
								}					
								if (isFile) {//4
									new File(
											Configuration
													.getConfValByNm("CFG_uploadpath_to_CHI",con)
													+ branchFolder
													+ "/ClearingOutward/MICRWaveforms/")
											.mkdirs();
									String filePath = Configuration
											.getConfValByNm("CFG_uploadpath_to_CHI",con)
											+ branchFolder
											+ "/ClearingOutward/MICRWaveforms/";
											//+ fileName;
									String fileExtension = fileName.substring(
											fileName.lastIndexOf(".") + 1,
											fileName.length());
									if (fileExtension.equalsIgnoreCase("txt") && !fileName.toLowerCase().contains("temp")) 
									{//extension
										if(SourcePath.toLowerCase().contains("smb://"))
										{//4--1
											//FileUtils.copyURLToFile(new SmbFile (SourcePath + "/"+folderName+"/"+ fileName,auth).toURL(), new File(filePath));
											SmbFileInputStream fis=new SmbFileInputStream(new SmbFile (SourcePath + "/"+folderName+"/"+fileName,auth));
											FileOutputStream fos=new FileOutputStream(new File(filePath+fileName));
											while(true)
											{
												byte b[]=new byte[(int)new SmbFile (SourcePath + "/"+folderName+"/"+fileName,auth).length()];
												if(fis.read(b)==-1)
													break;
												fos.write(b);
											}
											fis.close();
											fos.close();
											cnt++;
										}
										else
										{
											FileUtils.copyFile(new File (SourcePath + "/"+folderName+"/"+fileName), new File(filePath+fileName));
											cnt++;
										}
										cnt++;
										
									}//extension	
								}//4
							}//3--2
								//ftpClient.removeDirectory("Images");
						}//3--1
						else {//3.1
								//now fetch cbs provided .txt file										
							if (folderName.endsWith(".txt")) {//3.1.1

								
								String filePath = Configuration
										.getConfValByNm("CFG_uploadpath_to_CHI",con)
										+ branchFolder + "/ClearingOutward/";

								//System.out.println("********** 111 filePath:"+filePath);
								new File(filePath).mkdirs();
								filePath = filePath + folderName;
								if(SourcePath.toLowerCase().contains("smb://"))
								{//4--1
									//FileUtils.copyURLToFile(new SmbFile (SourcePath + "/"+folderName,auth).toURL(), new File(filePath));
									SmbFileInputStream fis=new SmbFileInputStream(new SmbFile (SourcePath + "/"+folderName,auth));
									FileOutputStream fos=new FileOutputStream(new File(filePath));
									while(true)
									{
										byte b[]=new byte[1000000];
										if(fis.read(b)==-1)
											break;
										fos.write(b);
									}
									fis.close();
									fos.close();
									cnt++;
								}
								else
								{
									FileUtils.copyFile(new File (SourcePath + "/"+folderName), new File(filePath));
									cnt++;
								}
								cbsTxtFileflg = true;
							}//3.1.1	
						}//3.1
					  }//3.0
					}//3	
				}//2
				boolean move_images = false, move_micr = false, move_cbstxtfile = false,move_zipfile=false;
				String sysdate = Configuration.getDDMMYYYY() + "_"
						+ Configuration.getHHMISS();
				String filePathToBeBackup = SourcePath+"/backup/" + sysdate + "/";
				String[] mainfilelist1 ;
				if(SourcePath.toLowerCase().contains("smb://"))
				{
					new SmbFile(filePathToBeBackup,auth).mkdirs();
					mainfilelist1 = new SmbFile(SourcePath,auth).list();
				}
				else
				{
					new File(filePathToBeBackup).mkdirs();
					mainfilelist1 = new File(SourcePath).list();
				}
				

				for (int i=0;i<mainfilelist1.length;i++) {//FOR							
					String folderName = mainfilelist1[i];
					if(folderName.toLowerCase().indexOf("backup")==-1)
					{
						if(folderName.indexOf(".txt")>-1 || folderName.indexOf(".TXT")>-1|| folderName.indexOf(".zip")>-1)
						{
							if(SourcePath.toLowerCase().contains("smb://"))
							{
								new SmbFile(SourcePath + folderName,auth).renameTo(new SmbFile(filePathToBeBackup + folderName,auth));
							}
							else
							{
								FileUtils.moveFile(new File(SourcePath + folderName), new File(filePathToBeBackup + folderName));
							}
						}
						else
						{
							if(SourcePath.toLowerCase().contains("smb://"))
							{
								String spath=SourcePath + folderName+"/";
								String dpath=filePathToBeBackup + folderName+"/";
								new SmbFile(dpath,auth).mkdirs();
								//new SmbFile(spath,auth).renameTo(new SmbFile(dpath,auth));
								String fileNames[]=new SmbFile(spath,auth).list();
								for(int j=0;j<fileNames.length;j++)
								{
									Configuration.writeLog(spath+fileNames[j]);
									Configuration.writeLog(dpath+fileNames[j]);
									new SmbFile(spath+fileNames[j],auth).renameTo(new SmbFile(dpath+fileNames[j],auth));
									
								}
								int fileListLength=new SmbFile(spath,auth).list().length;
								Configuration.writeLog("fileListLength=="+fileListLength);
								if(fileListLength==0)
									new SmbFile(spath,auth).delete();	
							}
							else
							{
								FileUtils.moveDirectory(new File(SourcePath + folderName), new File(filePathToBeBackup + folderName));
							}
						}
					}
					move_images = true;
				}//FOR
			
			}//1 		  
			msg = "SUCCESS";
		}//try
		catch (FileNotFoundException e) {
			Configuration.writeLog("\nFileNotFoundException in getCOFiles()::>>\n"+ e);
			//msg=e.getMessage()+" This Folder is not Available at Upload path";
			msg = "FAIL_CHECK_BRANCH_FOLDER";
			e.printStackTrace();

		} catch (java.net.ConnectException e) {
			Configuration.writeLog("\nConnectException in getCOFiles()::>>\n" + e);
			msg = "FTP Connection not Available.";
			e.printStackTrace();
		} catch (java.io.IOException e) {
			Configuration.writeLog("\nIOException in getCOFiles()::>>\n" + e);
			msg = "FTP Connection not Available.";
			e.printStackTrace();
		}

		return msg;

	}//ftp_call_to_getCOFiles

	public static String getNonUpdatedJson(String brnchCd )throws JSONException 
	{
		conn =Configuration.getConnection();
		String str=null;
        PreparedStatement pstmt = null;
        JSONArray jArr=new JSONArray();
        JSONObject MainjObj=new JSONObject();
        
        String pattern = Configuration.getDDMMYYYY();
        String query="select CLO_BOFD,CLO_CHQNO,CLO_SORTCD,CLO_TRANCD,CLO_AMOUNT,CLO_PAYEE_ACCNO,CLO_PAYEE_ACCNM,substr(CLO_DRAWEE_ACCNO,-6)CLO_DRAWEE_ACCNO,CLO_IMG_FRNT_BW,CLO_IMG_BACK_BW"
        		+ ",CLO_IMG_FRNT_GR,CLO_IMG_BACK_GR,CLO_DATE_DDMMYYYY,CLO_BRANCH_CD,CLO_CONVERT_FLG,CLO_CLEARINGTYPE,CLO_IQASTATUS,"
        		+ "NVL(CLO_PPRTOFOLLOW,'N') CLO_PPRTOFOLLOW,CLO_IQARESULTS,CLO_XMLFILENAME,CLO_ITEMSEQNO,CLO_WARNING_CODE,CLO_OLBC,CLO_MICRTXT,CLO_IQA_IGNIND"
        		+ " from CLEARINGOUTWARD where CLO_IMG_FRNT_BW is null and CLO_DATE_DDMMYYYY =? and CLO_CONVERT_FLG='N' and CLO_BRANCH_CD=? order by 2,3,8";
        try
		{
        	//System.out.println(query);
        	//System.out.println("\nDate="+pattern+"       brnchCd="+brnchCd);
	        pstmt=conn.prepareStatement(query);
	        pstmt.setString(1, pattern);
	        pstmt.setString(2, brnchCd);
	        resultSet = pstmt.executeQuery();
        	while( resultSet.next())
			{
        		JSONObject jObj=new JSONObject();
        		jObj.put("CLO_BOFD",resultSet.getString("CLO_BOFD"));
        		jObj.put("CLO_CHQNO",resultSet.getString("CLO_CHQNO"));
        		jObj.put("CLO_SORTCD",resultSet.getString("CLO_SORTCD"));
        		jObj.put("CLO_TRANCD",resultSet.getString("CLO_TRANCD"));
        		jObj.put("CLO_AMOUNT",resultSet.getString("CLO_AMOUNT"));
        		jObj.put("CLO_PAYEE_ACCNO",resultSet.getString("CLO_PAYEE_ACCNO"));
        		jObj.put("CLO_PAYEE_ACCNM",resultSet.getString("CLO_PAYEE_ACCNM"));
        		jObj.put("CLO_DRAWEE_ACCNO",resultSet.getString("CLO_DRAWEE_ACCNO"));
        		jObj.put("CLO_IMG_FRNT_BW",resultSet.getString("CLO_IMG_FRNT_BW"));
        		jObj.put("CLO_IMG_BACK_BW",resultSet.getString("CLO_IMG_BACK_BW"));
        		jObj.put("CLO_IMG_FRNT_GR",resultSet.getString("CLO_IMG_FRNT_GR"));
        		jObj.put("CLO_IMG_BACK_GR",resultSet.getString("CLO_IMG_BACK_GR"));
        		jObj.put("CLO_DATE_DDMMYYYY",resultSet.getString("CLO_DATE_DDMMYYYY"));
        		jObj.put("CLO_BRANCH_CD",resultSet.getString("CLO_BRANCH_CD"));
        		jObj.put("CLO_CONVERT_FLG",resultSet.getString("CLO_CONVERT_FLG"));
        		jObj.put("CLO_CLEARINGTYPE",resultSet.getString("CLO_CLEARINGTYPE"));
        		jObj.put("CLO_IQASTATUS",resultSet.getString("CLO_IQASTATUS"));
        		jObj.put("CLO_PPRTOFOLLOW",resultSet.getString("CLO_PPRTOFOLLOW"));
        		jObj.put("CLO_XMLFILENAME",resultSet.getString("CLO_XMLFILENAME"));
        		jObj.put("CLO_ITEMSEQNO",resultSet.getString("CLO_ITEMSEQNO"));
        		jObj.put("CLO_WARNING_CODE",resultSet.getString("CLO_WARNING_CODE"));
        		jObj.put("CLO_OLBC",resultSet.getString("CLO_OLBC"));
        		jObj.put("CLO_MICRTXT",resultSet.getString("CLO_MICRTXT"));
        		jObj.put("CLO_IQA_IGNIND",resultSet.getString("CLO_IQA_IGNIND"));
        		jArr.put(jObj);
			}
        	if(jArr.length()>0)
        	{
        		
        		MainjObj.put("data",jArr.toString());
        		MainjObj.put("RETCODE","0");
        	}
        	else
        	{
        		MainjObj.put("RETCODE","1");
        	}
        	resultSet.close();
        	pstmt.close();
        	conn.close();
		}catch(SQLException e)
        {
			e.printStackTrace();
			MainjObj.put("RETCODE","2");
        }
        //System.out.println(MainjObj.toString());
        return MainjObj.toString();  
	}
	public static String getNonUpdatedMicrData(String brnchCd,Connection con)
	{
		StringBuffer retStr=new StringBuffer();
		JSONObject MainjObj=new JSONObject();
		try
		{
			System.out.println("12 inside getNonUpdatedMicrData ************************************");
			String path="",fileNameStr="",searchStr="",chequeNo="",sortcode="",accNo="",tranCode="",itemSeqno="";
			String uploadpath_to_chi = Configuration.getConfValByNm("CFG_uploadpath_to_chi",con);
			JSONArray jArr=new JSONArray();
		    
			path=uploadpath_to_chi + brnchCd+ "/ClearingOutward/MICRWaveforms/";
			System.out.println("12path=="+path);
			if(new File(path).exists()&&new File(path).list().length>0)
			{
				String fileNames[] = new File(path).list();
				Arrays.sort(fileNames);
				int noOfCheques = fileNames.length;
				String singleRecord="";
				System.out.println("noOfCheques==="+noOfCheques);
				
				for(int i=0;i<noOfCheques;i++)
				{
					JSONObject jObj=new JSONObject();
					fileNameStr=fileNames[i];
					BufferedReader br = new BufferedReader(new FileReader(path+fileNameStr));
					singleRecord=br.readLine();
					String[]line=singleRecord.split("<");
					//<000001<416028002:000069<30#01010100000073
					//<000001<416028002:30#01010100000073
					if (line.length == 4)
					{	
						chequeNo=line[1];
						sortcode=line[2].split(":")[0];
						accNo=line[2].split(":")[1];
						tranCode=line[3].split("#")[0];
						itemSeqno=line[3].split("#")[1];
						
					}
					else if(line.length == 3)
					{
						chequeNo=line[1];
						sortcode=line[2].split(":")[0];
						accNo="000000";
						tranCode=line[2].split(":")[1].split("#")[0];
						itemSeqno=line[2].split(":")[1].split("#")[1];
						
					}
					jObj.put("CHEQUENO", chequeNo);
					jObj.put("SORTCODE", sortcode);
					jObj.put("ACCNO", accNo);
					jObj.put("TRANCODE", tranCode);
					jObj.put("FILENAME", fileNameStr);
					jObj.put("ITEMSEQNO", itemSeqno);
					jArr.put(jObj);
					br.close();
					//System.out.println("=="+chequeNo+"=="+sortcode+"=="+accNo+"=="+tranCode);
					
				}
			}
			if(jArr.length()>0)
        	{
        		
        		MainjObj.put("data",jArr.toString());
        		MainjObj.put("RETCODE","0");
        	}
        	else
        	{
        		MainjObj.put("RETCODE","1");
        	}
		
		}
		catch(Exception e)
		{
			e.printStackTrace();
			Configuration.writeLog("ClearingOutward.java---"+e);
		}
		return MainjObj.toString();
	}
	public static String getduplicateChequeJson(String brnchCd )throws JSONException 
	{
		conn =Configuration.getConnection();
		String str=null,path="",fileNameStr="",cheqno="",cntQry="";
        PreparedStatement pstmt = null,pstmt1 = null;
        ResultSet rs=null;
        StringBuffer retStr=new StringBuffer();
        JSONArray jArr=new JSONArray();
        JSONObject MainjObj=new JSONObject();
    	String uploadpath_to_chi = Configuration.getConfValByNm("CFG_uploadpath_to_chi",conn);
    	String MICR_DRAWEE_ACCNO = Configuration.getConfValByNm("CFG_MICR_DRAWEE_ACCNO",conn);
    	
		path=uploadpath_to_chi + brnchCd+ "/ClearingOutward/MICRWaveforms/";
        String pattern = Configuration.getDDMMYYYY();
        if(MICR_DRAWEE_ACCNO.equalsIgnoreCase("Y"))
		{
        	cntQry="select count(*) , CLO_CHQNO,CLO_SORTCD, CLO_TRANCD,CLO_DRAWEE_ACCNO "
        		+ "from CLEARINGOUTWARD where CLO_DATE_DDMMYYYY=? and CLO_IMG_FRNT_BW is null and CLO_BRANCH_CD=? group by CLO_CHQNO,CLO_SORTCD, CLO_TRANCD,CLO_DRAWEE_ACCNO  having count(*)>1";
		}
        else
        {
        	cntQry="select count(*) , CLO_CHQNO,CLO_SORTCD, CLO_TRANCD "
            		+ "from CLEARINGOUTWARD where CLO_DATE_DDMMYYYY=? and CLO_IMG_FRNT_BW is null and CLO_BRANCH_CD=? group by CLO_CHQNO,CLO_SORTCD, CLO_TRANCD having count(*)>1";
        	
        }
        String query="select CLO_CHQNO,CLO_SORTCD,CLO_TRANCD,CLO_AMOUNT,substr(CLO_DRAWEE_ACCNO,-6)CLO_DRAWEE_ACCNO,CLO_PAYEE_ACCNM,CLO_OLBC from CLEARINGOUTWARD "
        		+ "where CLO_IMG_FRNT_BW is null and CLO_DATE_DDMMYYYY = ? and CLO_CONVERT_FLG='N' and CLO_CHQNO= ? and CLO_SORTCD= ? and CLO_TRANCD= ? and CLO_BRANCH_CD=? ";
        try
		{
        	//System.out.println(query);
        	//System.out.println("\nDate="+pattern+"       brnchCd="+brnchCd);
	        pstmt=conn.prepareStatement(cntQry);
	        pstmt.setString(1, pattern);
	        pstmt.setString(2, brnchCd);
	        resultSet = pstmt.executeQuery();
        	while( resultSet.next())
			{
        		cheqno=resultSet.getString("CLO_CHQNO");
	    		pstmt1=conn.prepareStatement(query);
	  	        pstmt1.setString(1, pattern);
	  	        pstmt1.setString(2,resultSet.getString("CLO_CHQNO"));
	  	        pstmt1.setString(3,resultSet.getString("CLO_SORTCD"));
	  	        pstmt1.setString(4,resultSet.getString("CLO_TRANCD"));
	  	        pstmt1.setString(5, brnchCd);
	  	        rs = pstmt1.executeQuery();
	  	        while(rs.next())
      	     	{
        		        		      		   		        		
        			JSONObject jObj=new JSONObject();
	        		jObj.put("CLO_CHQNO",rs.getString("CLO_CHQNO"));
	        		jObj.put("CLO_SORTCD",rs.getString("CLO_SORTCD"));
	        		jObj.put("CLO_TRANCD",rs.getString("CLO_TRANCD"));
	        		jObj.put("CLO_AMOUNT",rs.getString("CLO_AMOUNT"));
	        		jObj.put("CLO_DRAWEE_ACCNO",rs.getString("CLO_DRAWEE_ACCNO"));
	        		jObj.put("CLO_PAYEE_ACCNM",rs.getString("CLO_PAYEE_ACCNM"));
	        		jObj.put("CLO_OLBC",rs.getString("CLO_OLBC"));
	        		jArr.put(jObj);
	        		
      	     	}
	  	        
		  	  	if(new File(path).exists() && new File(path).list().length>0)
				{
					String fileNames[] = new File(path).list();
					Arrays.sort(fileNames);
					int noOfCheques = fileNames.length;
					System.out.println("noOfCheques==="+noOfCheques);
					
					for(int i=0;i<noOfCheques;i++)
					{
						if(fileNames[i].startsWith(cheqno+resultSet.getString("CLO_SORTCD")))
						{
							fileNameStr=fileNames[i];
							fileNameStr=fileNameStr.substring(0, fileNameStr.length()-4);
							retStr.append("$"+fileNameStr);
						}
					}
				}
	  	        
			}
    	
        	if(jArr.length()>0)
        	{
        		
        		MainjObj.put("data",jArr.toString());
        		MainjObj.put("RETCODE","0");
        		str="DUPLICATE"+"~"+MainjObj.toString();
        	}
        	else
        	{
        		MainjObj.put("RETCODE","1");
        		str="NODATA"+"~"+MainjObj.toString();
        	}
        	if(pstmt1!=null)
        	pstmt1.close();
        	if(rs!=null)
        	rs.close();
        	resultSet.close();
        	pstmt.close();
        	conn.close();
		}catch(SQLException e)
        {
			e.printStackTrace();
			MainjObj.put("RETCODE","2");
        }
        //System.out.println(MainjObj.toString());
        return str+"#"+retStr.toString();  
	}

}
