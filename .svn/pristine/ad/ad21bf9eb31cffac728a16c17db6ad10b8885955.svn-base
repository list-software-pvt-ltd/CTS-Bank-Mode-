package cts;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

import org.json.JSONArray;
import org.json.JSONObject;

public class Client {
	static Socket s;
	private static boolean allDone;

	public static String copyScannerFiles(String ftpPath,String ftpUrl,int ftpPort) {
		int cnt = 1;
		String retStr="";
		//while (true) 
		System.out.println("In client Program====");
		System.out.println("ftpPath==="+ftpPath);
		System.out.println("ftpUrl===="+ftpUrl);
		System.out.println("ftpPort===="+ftpPort);
		{
			try {
				s = new Socket(ftpUrl,ftpPort);//("172.100.30.178", 9999);
				/*final BufferedInputStream dis = new BufferedInputStream(
						s.getInputStream());
				final BufferedOutputStream dos = new BufferedOutputStream(
						s.getOutputStream());*/
				final DataInputStream dis = new DataInputStream(
						s.getInputStream());
				final DataOutputStream dos = new DataOutputStream(
						s.getOutputStream());
				BufferedReader br = new BufferedReader(new InputStreamReader(
						dis));
				BufferedReader br1 = new BufferedReader(new InputStreamReader(
						System.in));
				String DestinationPath = ftpPath;//"E:/sudom/";
				byte readBytes[];
				PrintWriter pw = new PrintWriter(s.getOutputStream());
				
				while (true) {
					try {
						String str = br.readLine();// new String(readBytes);
						str = str.trim();
						System.out.println("\n\nStart Tag=" + str + "===");
						if (str.contains("FILENAME")) {
							
							pw.println("FILENAMERECEIVED");
							pw.flush();
							String FileName = br.readLine();
							FileName = FileName.trim();
							String fileNameSplit[] = FileName.split("--");
							int fileLegth = Integer.parseInt(fileNameSplit[1]);
							FileName = fileNameSplit[0];
							pw.println("FILELENGTHRECEIVED");
							pw.flush();
							FileOutputStream fos = new FileOutputStream(
									DestinationPath + FileName);
							readBytes = null;
							readBytes = new byte[fileLegth];
							dis.readFully(readBytes);
							fos.write(readBytes);
							fos.close();

							pw.println("FILECOPIED");
							pw.flush();
							System.out.println("File Copied Written");
							String FileStatus = br.readLine();
							System.out.println("FINISH--" + FileStatus);
							if (FileStatus.equalsIgnoreCase("FINISH")) {
								System.out.println(cnt++
										+ " Files(s) Copied");
								pw.println("FINISHCONFIRM");
								pw.flush();
								// break;
							} else {
								pw.println("FINISHNOTCONFIRMED");
								pw.flush();
								s.close();
								//dis.close();
								//dos.close();
								break;
							}
						} else  if(str.contains("ALLDONE"))
						{
							System.out.println("All Files Copied");
							allDone=true;
							retStr="SUCCESS";
							break;
						}
						else  if(str.contains("FOLDERCREATE"))
						{
							String folderName=str.split("--")[1];
							new File(DestinationPath+folderName+"/").mkdirs();
							//break;
						}
						
					}/* catch (Exception e) {
						e.printStackTrace();
						retStr="FAIL";
						break;
					}*/
					catch (FileNotFoundException e) {
						Configuration.writeLog("\nFileNotFoundException in copyScannerFiles()::>>\n"+ e);
						//msg=e.getMessage()+" This Folder is not Available at Upload path";
						retStr = "FAIL_CHECK_BRANCH_FOLDER";
						e.printStackTrace();
						System.out.println("retStr=="+retStr);
						break;

					} catch (java.net.ConnectException e) {
						Configuration.writeLog("\nConnectException in copyScannerFiles()::>>\n" + e);
						retStr = "Connection not Available.";
						System.out.println("retStr=="+retStr);
						e.printStackTrace();
						break;
					} catch (java.io.IOException e) {
						Configuration.writeLog("\nIOException in copyScannerFiles()::>>\n" + e);
						retStr = " Connection not Available.";
						System.out.println("retStr=="+retStr);
						e.printStackTrace();
						break;
					}
					// break;
				}
				//if(allDone)
				//	break;
				//br.close();//DSP
			} /*catch (Exception e) {
				retStr="FAIL";
				//e.printStackTrace();

			}*/
			catch (FileNotFoundException e) {
				Configuration.writeLog("\nFileNotFoundException in copyScannerFiles()::>>\n"+ e);
				//msg=e.getMessage()+" This Folder is not Available at Upload path";
				retStr = "FAIL_CHECK_BRANCH_FOLDER";
				e.printStackTrace();
				

			} catch (java.net.ConnectException e) {
				Configuration.writeLog("\nConnectException in copyScannerFiles()::>>\n" + e);
				retStr = "Connection not Available.";
				e.printStackTrace();
				
			} catch (java.io.IOException e) {
				Configuration.writeLog("\nIOException in copyScannerFiles()::>>\n" + e);
				retStr = " Connection not Available.";
				e.printStackTrace();
				
			}
		}
		System.out.println("Client Stopped");
		return retStr;
	}

}
