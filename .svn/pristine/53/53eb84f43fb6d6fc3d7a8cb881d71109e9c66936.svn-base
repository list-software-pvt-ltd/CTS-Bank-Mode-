package cts;
import java.io.*;
import java.util.*;
import java.sql.*;
import java.awt.image.*;
import javax.imageio.*;

import java.security.spec.*;
import java.security.*;
import java.util.*;
import java.security.*;
import java.nio.*;
import java.nio.channels.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import java.text.SimpleDateFormat;

//////////////////
import javax.xml.namespace.QName;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Attribute;
import javax.xml.stream.events.EndElement;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;
/////////////

public class findMICR
{
	public static void main(String[] args)
		{
		findMICR obj=new findMICR();
		obj.prepareMICARdata("2");
	}

public static String getConfValByNm(String confVal) {// 2
		String value = "";
		PreparedStatement pst=null;
		ResultSet rs=null;
		Connection con=null;
		try {// 3
			/*
			 * String filePath=new
			 * File(".").getCanonicalPath()+"/config_cts.ini";
			 * System.out.println("\n\n\n"+filePath); BufferedReader br=new
			 * BufferedReader(new FileReader(filePath)); String line="";
			 * while((line=br.readLine())!=null) {
			 * if(line.indexOf(confVal+"=")==0) { value=line.split("=")[1];
			 * break; } }
			 */
			con=getConnection();
			pst = con.prepareStatement("select " + confVal
					+ " from CONFIGURATION");
			rs = pst.executeQuery();
			if (rs.next()) {
				value = rs.getString(1);
			}
			if(rs!=null)
			rs.close();
			if(pst!=null)
			pst.close();
			if(con!=null)
			con.close();
			if (value.length() == 0) {
				value = "Cant Find value for " + confVal;
			}
		}// 3
		catch (Exception e) {// 3
			System.out.println("Cant Find value for " + confVal
					+ " Exception in getConfValByNm():::::" + e);
		}// 3
		finally
		{
			try
					{
						if(rs!=null)
						rs.close();
						if(pst!=null)
						pst.close();
						if(con!=null)
						con.close();
					}catch(Exception e)
					{}
		}
		return value;
	}// 2
	public static Connection getConnection()
		{// 2
			Connection con = null;
			String db_ip = "", sid = "", port = "", db_user = "", db_pwd = "";
			try {// 3
				// "d:/Apache6/Apache6/bin/config_cts.ini"
				// FileReader fr= new FileReader(new
				// File("config_cts.ini").getCanonicalPath());
				FileReader fr = new FileReader("C:/Users/b/Desktop/config_cts.ini");

				BufferedReader br =new BufferedReader(fr);
				String strLine;
				// Read File Line By Line
				// line_num=0;
				while ((strLine = br.readLine()) != null) {// 4
					String[] para = strLine.split("=");
					// System.out.println (para[0]+"	:	:"+para[1]);
					if (para[0].equals("DATABASE_IP")) {// 5
						db_ip = para[1];
						// System.out.println ("db_ip	:"+db_ip);
					}// 5
					else if (para[0].equals("SID")) {// 5
						sid = para[1];
						// System.out.println ("sid	:"+sid);
					}// 5
					else if (para[0].equals("PORT")) {// 5
						port = para[1];
						// System.out.println ("port	:"+port);
					}// 5
					else if (para[0].equals("DBUSER")) {// 5
						db_user = para[1];
						// System.out.println ("db_user	:"+db_user);
					}// 5
					else if (para[0].equals("DBPASSWORD")) {// 5
						db_pwd = para[1];
						// System.out.println ("db_pwd	:"+db_pwd);
					}// 5
				}// 4
				br.close();
				Class.forName("oracle.jdbc.driver.OracleDriver");
				con = DriverManager.getConnection("jdbc:oracle:thin:@" + db_ip
						+ ":" + port + ":" + sid, db_user, db_pwd);
			}// 3
			catch (FileNotFoundException e1) {// 3
				System.out.println("Can not find config_cts.ini" + e1);
				System.exit(1);
			}// 3
			catch (Exception e) {// 3
				// Catch exception if any
				System.err.println("Error: " + e.getMessage());
				// System.err.println("Error while reading config_bkup.ini ");
				System.exit(1);
			}// 3
			return con;
	}// 2
public static String prepareMICARdata(String BRNCD)
	{// 2
		System.out.println(" inside prepareMICARdata ************************************");
		String retMess = "SUCCESS";
		String uploadpath_to_chi = "D:/Apache6/webapps/CTS/uploadpath_to_CHI/";//getConfValByNm("CFG_uploadpath_to_chi");
		String itemMicrFileName="";
		long sys_cur_millis=System.currentTimeMillis();
		String[] erroMicr = new String[200];
		int z=0;
		try
		{// 3

			new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/Thumbs.db").delete();
			String fileList[] = new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/").list();
			//System.out.println("----------- 111 -----------");
			System.out.println("fileList.length :"+fileList.length);
			//note: if fileList.length is raise  NullPointerEception then show message No File At Upload Path
			//System.out.println("----------- 222 -----------");
			int noOfCheques = -1;


			System.out.println("fileList.length % 4 :"+fileList.length % 4);

			//if ((fileList.length % 4) == 0 && fileList.length!=0)
			{// 4

				String chequeNames = "";

				/////////////////////////////
				//System.out.println("CHECK FOR DIR PATH EXISTS");
				String folderpath1 = uploadpath_to_chi + BRNCD+ "/ClearingOutward/MICRWaveforms/";
				if (new File(folderpath1).exists()&&new File(folderpath1).list().length>0)
				{//
					String micrFileNames[] = new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/MICRWaveforms/").list();
					noOfCheques = micrFileNames.length ;
					 System.out.println("noOfCheques="+noOfCheques);

					int counter=0;
					for(int i = 0; i < noOfCheques; i++)
					{// 5

						itemMicrFileName=micrFileNames[i];

						System.out.println("\n\nitemMicrFileName="+ itemMicrFileName);
						StringBuffer clo_iqaResult=new StringBuffer("");
							String singleRecord="";
							String CLO_IQASTATUS="";
						try
						{//try

							BufferedReader br = new BufferedReader(new FileReader(uploadpath_to_chi + BRNCD+ "/ClearingOutward/MICRWaveforms/"+itemMicrFileName));
							singleRecord=br.readLine();
							String line="";
								while((line=br.readLine())!=null)
								{

										if(line.contains("STATUS"))
										{
												CLO_IQASTATUS=line.split(":")[1];
										}
								}
							br.close();
						}//try
						catch(FileNotFoundException e)
						{
							System.out.println("\n --- FileNotFoundException *****%%%%% ----"+e);
						}
						System.out.println("\n\tStatus:>>"+CLO_IQASTATUS);
						if(singleRecord.toString().indexOf("?")>-1)
						{
								//faultyCheque.append(micrFileName+"\n");
								// new File(itemMicrFileName).delete();
								 continue;
						}


						System.out.println("\n\tsingleRecord:>>>"+singleRecord);
						System.out.println("\n\tclo_iqaResult:>>>"+clo_iqaResult.length());
						//String fileData[] = singleRecord.split("<");
						try
						{
						String singleRecordArr[]=singleRecord.split("#");
						String micrLine=singleRecordArr[0];
						String itemSeqNo=singleRecordArr[1];
						System.out.println("\n\tmicrLine:>>>"+micrLine);
						System.out.println("\n\titemSeqNo:>>>"+itemSeqNo);
						//System.out.println("\n\tclo_iqaResult:>>>"+clo_iqaResult.length());
						String fileData[] = micrLine.split("<");

						String chqNo = fileData[1];
						System.out.println("\nchqNo="+chqNo);
						String sortCode = fileData[2].split(":")[0];
						System.out.println("\nsortCode="+sortCode);
						String tranNo="";
						String accNo="";
						if(fileData.length == 4)
						{
							tranNo = fileData[3];
							System.out.println("\ntranNo="+tranNo);
							if(tranNo.indexOf(";")>-1)
							{
									tranNo=tranNo.split(";")[0];
									System.out.println("\nIn If tranNo="+tranNo);
							}
							System.out.println("\nAfter If tranNo="+tranNo);
							accNo=fileData[2].split(":")[1];//accNo = lPad(fileData[2].split(":")[1], 16, "0");
							System.out.println("");
						}


						//index 0=null  1=cheque number  2=bank code : transaction number
						if(fileData.length == 3)
						{
							tranNo=fileData[2].split(":")[1];
							//accNo=lPad("0", 16, "0");
							accNo="000000";//lPad("0", 6, "0");
						}

						String CLO_PPRTOFOLLOW="N";
						int trNo=Integer.parseInt(tranNo);

						if((trNo>=20 && trNo<=27 && trNo!=23) )//&& accNo.length()==6)
						{
								CLO_PPRTOFOLLOW="Y";
						}
						}
						catch(Exception e)
						{
							erroMicr[z]=itemMicrFileName;
							z++;
							System.out.println("problem with ="+itemMicrFileName);
						}

						String folderpath2 = uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/";
						String imgFrntBw = "", imgBackBw = "", imgFrntGr = "", imgBackGr = "";

						//String imgFileContains=chqNo+sortCode+accNo;
						String imgName=itemMicrFileName.split(".txt")[0];
						imgFrntBw="F"+imgName+".tif";
						imgBackBw="R"+imgName+".tif";
						imgFrntGr = "F"+imgName+"G.jpg";
						imgBackGr="R"+imgName +"G.jpg";
						if(!(new File(folderpath2+imgFrntBw).exists())||!(new File(folderpath2+imgBackBw).exists()) || !(new File(folderpath2+imgFrntGr).exists()))
						{//if
							imgFrntBw="";
							imgBackBw="";
							imgFrntGr = "";
							imgBackGr="";
						}//if

						//System.out.println(qry);
						/*pst =con.prepareStatement(qry);
						pst.setString(1, accNo);
						pst.setString(2, imgFrntBw);
						pst.setString(3, imgBackBw);
						pst.setString(4, imgFrntGr);
						pst.setString(5, imgBackGr);
					//CLO_IQASTATUS,clo_iqaResult,
						pst.setString(6, CLO_IQASTATUS);
						pst.setString(7,clo_iqaResult.toString());
						pst.setString(8, CLO_PPRTOFOLLOW);
						pst.setString(9, itemSeqNo);
					//where clause
						pst.setString(10, Configuration.getDDMMYYYY());
						System.out.println("\nchqNo:::>>" + chqNo);
						pst.setString(11, chqNo);
						System.out.println("\nsortCode::::>>>" + sortCode);
						pst.setString(12, sortCode);
						pst.setString(13, tranNo);*/





					}// 5

					System.out.println("(1+noOfCheques)::>>"+(1+noOfCheques));
					System.out.println("counter::>>"+counter);

					//con.close();
					retMess = "SUCCESS";
				}
			}// 4
			System.out.println("\n\nfile name having micr problem==");
			for(int k=0;k<z;k++)
			{
				System.out.println("file name=="+erroMicr[k]);
			}
			System.out.println("Do you want to delete these files ?");
			while(true)
			{
				String inpt=new BufferedReader(new InputStreamReader(System.in)).readLine();
				if(inpt.equalsIgnoreCase("Y") )
				{
					for(int k=0;k<z;k++)
					{
						boolean b=new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/MICRWaveforms/"+erroMicr[k]).delete();
					}
					break;
				}
				else if(inpt.equalsIgnoreCase("N")) break;
			}
		}// 3
		catch(NullPointerException w)
		{//3
		System.out.println("itemMicrFileName=="+itemMicrFileName);
			System.out.println("\n\nNullPointerException in prepareMicreData configuration::::"+ w+"\n\n");
			retMess="No File(s) At Upload Path";
		}//3
		catch (Exception e)
		{// 3
			System.out.println("itemMicrFileName=="+itemMicrFileName);
			System.out.println("\n\nException in prepareMicreData configuration::::"+ e+"\n\n");
			retMess = "FAIL.";
		}// 3
		finally
		{//3
				try
				{
					/*if(pst!=null)
					pst.close();
					if(con!=null)
					con.close();*/
				}catch(Exception e){}
		}//3
		return retMess;
	}// 2
}