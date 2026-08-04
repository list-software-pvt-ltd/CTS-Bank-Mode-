package cts;
import javax.xml.namespace.QName;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Attribute;
import javax.xml.stream.events.EndElement;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;
import java.io.*;
import java.util.*;
import java.sql.*;
import java.util.Date;
public class Test
{
	//java.net.ConnectException
	private static ArrayList<HashMap> micrData = new ArrayList<HashMap>();
	private static HashMap<String, String> micrMap = new HashMap<String, String>();
	private static ArrayList<ImageBean> imgData = new ArrayList<ImageBean>();
	private static ArrayList<ItemInformation> itemData = new ArrayList<ItemInformation>();
	private static String fileName;
	static ImageBean imgbn = null;
	static ItemInformation itemInfo;

	public static void main(String...args)
	{

		//System.out.println(new StringBuffer("92<120010:200671314<000001<").reverse());

		/*String test="220120140001400000000000000000000F.jpg";
		String test="220120140001400000000000000000000F#**fdfd#fdf";
		//System.out.println(test.substring(test.indexOf(".")+1,test.length()) );
		String RRF="CIBF_000000009_06022014_171215_00_0000000001.img";
		//String fileId=RRF.substring(RRF.lastIndexOf("_")+1,RRF.lastIndexOf("."));
		String rrf[]=RRF.split("_");
		System.out.println("Date:"+rrf[2]);
		System.out.println("Time:"+rrf[3]);
		String fileId=RRF.substring(0,RRF.indexOf("/"));
		System.out.println(fileId);
		//System.out.println(test.substring(test.indexOf(".")-1,test.indexOf(".")));
		//System.out.println(test.substring(test.indexOf("#")+1,test.length()));*/

		//new Test().getDataFromCBSTextFile("9");
		//System.out.println(""+Configuration.prepareMICARdata("9"));
		//String fileName="BPXF_380434000_11_01012014_01012014_131823_10352.xml";
		//readBPXF(fileName);

		try{



			//String strLength="4000120010081514111762530130000000000025000000000000000000003005123456789";
			//String strLength="4130130010250724135970030130000000000025000000000000000000003001";
			//System.out.println(strLength.length());
			//System.out.println(new StringBuffer("92<120010:200671314<057149<").reverse());
			/*String strLength="4130130010250724135970030130000000000025000000000000000000003001413597002";
			System.out.println(strLength.substring(0,9));
			System.out.println(strLength.substring(9,15));
			System.out.println(strLength.substring(15,24));
			System.out.println(strLength.substring(24,27));
			System.out.println(strLength.substring(27,45));//Amount
			System.out.println(strLength.substring(45,61));//Account No
			System.out.println(strLength.substring(61,64));//Account No
			System.out.println(strLength.substring(64,73));//Account No
			//System.out.println(new StringBuffer("92:200810314<639259<").reverse());*/

				//StringBuffer	strBuff=
						/*String fileData[] =new StringBuffer("92:200810314<639259<").reverse().toString().split("<");

								System.out.println("fileData[1]=" + fileData.length);
								// index 0=null 1=check number 2=bank code: account number
								// 3=transaction number
								String chqNo = Configuration.lPad(fileData[1], 6, "0");
								System.out.println("chqNo:"+chqNo);
								//String chqNo = fileData[1];
								String sortCode = fileData[2].split(":")[0];
								System.out.println("sortCode:"+sortCode);
								String tranNo="";
								String accNo="";
								if(fileData.length == 4)
								{
									tranNo = fileData[3];
									System.out.println("tranNo:"+tranNo);
									if(tranNo.indexOf(";")>-1)
									{
											tranNo=tranNo.split(";")[0];
											System.out.println("tranNo:"+tranNo);
									}
									accNo = Configuration.lPad(fileData[2].split(":")[1], 16, "0");
									System.out.println("accNo:"+accNo);
								}

								//index 0=null  1=cheque number  2=bank code : transaction number
								if(fileData.length == 3)
								{
									tranNo=fileData[2].split(":")[1];
									System.out.println("tranNo:"+tranNo);
								}*/

			//System.out.println(getReturnFileName("RRF"));
			//String str=strLength.substring(64,73);
			//System.out.println(str);
			//String strLength="NanHjpzv4vnXBRqGH/GhIT8vSZho8hxGxt65oYilbWMZHxPFnRC2f7WEZNLt63NpB1XlJpz8VVgCQEVGPDRz0MTajfcG+PdsqtwMP1TtigUnCNxL8fvnYYY7/ybWnnoDTMSh0avjGNA80u03AikC5Gp7UuPJx4WhrzemAAHjo+rRL6WmThsZ7UM0FYAiPVwIaSWBfjOOX+clDDxj3AJcYt6jt3nswu7kjRFyYaIuJBCK1MChXb65U8DkaP4MIluUxSVyv3SOUjKNPMYfSKIEZxSf7I2sZE+OnQfoCguMk1DhzyAarxORr/Ry1XEollMqEh0cln8X6jOg9EZlt+TlWA==";
			//String strLength="400012001008151411176253013000000000002500000000000000000000300000000000000000000000000000";
			//String strLength="fTG7FQqx75xh2HgiLFURX4Y4LfOa36O/clNNK+Cf826qRaki6UumOmdRynL6LdU8tBdzXhBNEHR8atQ9KU41AS7PuPDTne8jjcCYcBjpAP6+Fu10vAauICZyrH/fptXEnqt4eECGqlyLOWgkf4K9mFrYh8HjQq2TPcZhgTCPu2pwD+uqXeSbL9ZqrJtr6JtvZ6lqAflR1XKwDIQGPFNIvieWddAp8igp+M4Dv4ab2Vjo5aK8SRu+eLlRaPjpytCdL4kRI97cSIikMUmGaFxgjtvS+AEDC84GZg8Vn2J1yWQBFxkAZzAS3K/RsxpK15brQjlvM3pJ4MN1cBbqArMKAA==";

			//File fileImages=new File(Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI")+"ClearingInward/Images");
			//fileImages.mkdir();
				/*Connection con=getConnection();
				Statement ps=con.createStatement();
				System.out.println("*** main 1 **");
				PrintWriter fw=new PrintWriter("D:/Apache6/Apache6/webapps/CTS/WEB-INF/classes/cts/From_CBS_Return_Outward.txt");
				System.out.println("*** main 2 **");
				ResultSet rs=ps.executeQuery("select CLI_TRUNCATINGRTNO,CLI_SERIALNO,CLI_PAYORBANKROUTNO,CLI_TRANSCODE,CLI_AMOUNT,ACCOUNTNO from CLEARINGINWARD");
				System.out.println("*** main 5 **");
				int retResCode=0;
				while(rs.next())
				{
					System.out.println("*** loop 1 **");
						String TRUNCATINGRTNO=Configuration.lPad(rs.getString(1),9,"0");;
						System.out.println("*** loop 2**");
						String SERIALNO=Configuration.lPad(rs.getString(2),6,"0");
						String PAYORBANKROUTNO=Configuration.lPad(rs.getString(3),9,"0");
						String TRANSCODE=Configuration.lPad(rs.getString(4),3,"0");
						String AMOUNT=Configuration.lPad(rs.getString(5),18,"0");
						String ACCOUNTNO=Configuration.lPad(rs.getString(6),16,"0");
						String retResCodeStr=Integer.toString(retResCode);
						retResCodeStr=Configuration.lPad(retResCodeStr,3,"0");
						String fullString=TRUNCATINGRTNO+SERIALNO+PAYORBANKROUTNO+TRANSCODE+AMOUNT+ACCOUNTNO+retResCodeStr+"00000000000000000000000000";
						System.out.println("*** main 5.1 **");
						fw.println(fullString);
						System.out.println("*** main 5.2 **");
						retResCode++;
				}
				System.out.println("*** main 3 **");
				fw.close();*/
			//String str="004164022114616416402002010000000000000110000002000101001462900109AVP00112345";

				/*System.out.println(str.substring(0,9));//004164022 //BOFD - N-9
				System.out.println(str.substring(9,15));//114616    //Cheque No
				System.out.println(str.substring(15,24));//416402002  //Sort Code
				 System.out.println(str.substring(24,27));//010  Transaction
				System.out.println(str.substring(27,45));//000000000000110000  Amount
				 System.out.println(str.substring(45,61));//002000101001462   //Account Number
				 System.out.println(str.substring(61,64));//90  //Return Reason Code
 				System.out.println(str.substring(64,66));//str.substring(64,66));//brn code
				System.out.println(str.substring(66,str.length()));//brn code*/
			/*
				D:\Apache6\Apache6\webapps\CTS\WEB-INF\classes\config_cts.ini
				D:\Apache6\Apache6\webapps\CTS\WEB-INF\classes
			*/


	//	System.out.println(new File("config_cts.ini").getCanonicalPath());

	//	String path=new File("config_cts.ini").getCanonicalPath();
		/*for(int i=0;i<3;i++)
		{

				String path1=new File(path).getParent();
				System.out.println("Path  :"+path);
				System.out.println("Path1 :"+path1);
				path=path1;
		}
		System.out.println("Final Path"+path);*/

		//File path1=new File("config_cts.ini");//.getCanonicalPath();
		//File f=new File(path1);
		//System.out.println(f);
		//System.out.println(path1.exists());


		/*Calendar now = Calendar.getInstance();
		int year = now.get(Calendar.YEAR);
		int month = now.get(Calendar.MONTH); // Note: zero based!
		month++;
		int day = now.get(Calendar.DAY_OF_MONTH);
		System.out.println(day+month+year);
		System.out.println(new Date());*/


		/*
		Reverse array:::
		String[] arr={"Doc000005 6 02 2014 (17 10 29) Waveform.txt","Doc000004 6 02 2014 (17 10 29) Waveform.txt","Doc000003 6 02 2014 (17 10 29) Waveform.txt","Doc000002 6 02 2014 (17 10 29) Waveform.txt"};
		for(String s:arr)
			System.out.println(s);
		Arrays.sort(arr);
		System.out.println("********************");
		for(String s1:arr)
			System.out.println(s1);*/

			//System.out.println(new StringBuffer("13<061761:100112614<433211<").reverse());
			//System.out.println(getClearingFileName("CIBF",".img"));
			//System.out.println(getClearingFileName("CXF",".xml"));
			//System.out.println(getClearingFileName("CXF",".xml"));
		//System.out.println(new File(new File("config_cts.ini").getCanonicalPath()).getParent());

		/*String srcDir = "D:/Apache6/Apache6/webapps/CTS/downloadpath_from_CHI/ClearingInward/";
		File f=new File("172.100.30.56/d/Apache6/Apache6/webapps/CTS/uploadpath_to_CHI/9/ClearingOutward/Images/Doc000001_Front1.tif");
		System.out.println(f.renameTo(new File("//172.100.30.56/d/Apache6/Apache6/webapps/CTS/Archive/upload_to_CHI/20022015/9/ClearingOutward/Images/Doc000001_Front1.tif")));*/

		//getDataFromCBSTextFile("9");

		//File[] allDirs=new File(srcDir).listFiles();

		//for(File f:allDirs)
		/*{
				//System.out.println(f.getName());
				//String str1=srcDir+f.getName()+"/";
				File oldFile=new File("D:/Apache6/Apache6/webapps/CTS/downloadpath_from_CHI/ClearingInward/Images/");
				System.out.println("oldFile::"+oldFile);
				//String str2="E:/Apache6/Apache6/webapps/CTS/downloadpath_from_CHI/ClearingInward/"+f.getName()+"/";
				File newFile=new File("D:/ABC/Apache6/Apache6/webapps/CTS/downloadpath_from_CHI/ClearingInward/Images/");
				newFile.mkdirs();
				System.out.println("newFile::"+newFile);
				System.out.println(oldFile.renameTo(newFile));
		}*/

		//System.out.println(prepareMICARdata("9"));
		/*int j=0;
			char[] abcd= "1".toCharArray();
				for(int kk=0;kk<abcd.length;kk++)
				{
						System.out.println("abcd[kk]>>>>"+abcd[kk]);
						int i=Integer.parseInt(String.valueOf(abcd[kk]));
						if(i==0)
							j++;
				}
							System.out.println("No of Zeroes in string"+j);*/

						//readResponse("D:/CTSFiles/15032014/Clearing Outward","CXF_413597000_15032014_140824_01_00000001.XML.1.RES");
	   }catch(Exception e){}
	}

public static Connection getConnection()
	{// 2
		Connection con = null;
		String db_ip = "", sid = "", port = "", db_user = "", db_pwd = "";
		try {// 3
			// "d:/Apache6/Apache6/bin/config_cts.ini"
			// FileReader fr= new FileReader(new
			// File("config_cts.ini").getCanonicalPath());
			FileReader fr = new FileReader("d:/Apache6/Apache6/bin/config_cts.ini");

			BufferedReader br = new BufferedReader(fr);
			String strLine;
			// Read File Line By Line
			// line_num=0;
			while ((strLine = br.readLine()) != null)
			{// 4
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


/////////////////////////////////////
public static  boolean readResponse(String filePath, String _fileName)
	{//1

		Connection con=getConnection();
		//PreparedStatement ps_insertFileTag=null;
		PreparedStatement ps_updateItem=null;
		boolean status = false;
		String responseFileName=null;
		String fileStatusCode=null;
		String rejectReasonCode=null;
		String item=null;
		String creationDate=null,creationTime=null;
		XMLInputFactory xmlInputFactory=null;
		XMLEventReader xmlEventReader=null;
		String path=filePath;

		String itemSeqNo=null,payorBankRoutNo=null,amount=null,serialNo=null,transCode=null,presentingBankRoutNo=null,presentmentDate=null,cycleNo=null,rejectReason=null;
		try
		{//try
				int counter=0;
			//ps_insertFileTag=con.prepareStatement("insert into Returnfiles(CREATIONDATE,CREATIONTIME,FILESTATUSCODE) values(?,?,?)");//12
			//ps_updateItem=con.prepareStatement("update Returnfiles set itemSeqNo=?,payorBankRoutNo=?,amount=?,serialNo=?,transCode=?,presentingBankRoutNo=?,presentmentDate=?,cycleNo=?,rejectReason=? where creationDate=? and creationTime=? and fileStatusCode=?");
			ps_updateItem=con.prepareStatement("insert into Returnfiles values(?,?,?,?,?,?,?,?,?,?,?,?)");
			//CXF_413597000_18032014_124019_01_00000001.XML.1.RES
			if(_fileName.contains("CXF_") && _fileName.endsWith(".RES"))
			{//2
				xmlInputFactory = XMLInputFactory.newInstance();
				xmlEventReader = xmlInputFactory.createXMLEventReader(new FileInputStream(path + "/"	+ _fileName));
					while (xmlEventReader.hasNext())
					{//3
						XMLEvent event = xmlEventReader.nextEvent();
						if (event.isStartElement())
						{//4
							StartElement element = (StartElement) event;
							String elementName = element.getName().toString();
							String elementString = elementName.substring(elementName.lastIndexOf("}") + 1, elementName.length());
							//System.out.println("elementString::" + elementString);
									if (elementString.equalsIgnoreCase("FileHeader"))
									{//5
											Iterator iterator = element.getAttributes();
												while(iterator.hasNext())
												{//5.1
														Attribute attribute = (Attribute) iterator.next();
														QName name = attribute.getName();
														String attributeValue = attribute.getValue();
														String attributeName = name.toString();
														//System.out.println(attributeName+":"+ attributeValue);
														if(attributeName.equalsIgnoreCase("CreationDate"))
														{//6.2
																//System.out.println(attributeName+":"+ attributeValue);
																creationDate=attributeValue;
																//ps_insertFileTag.setString(1,creationDate);//creationDate
																ps_updateItem.setString(1,creationDate);
														}//6.2
														else if(attributeName.equalsIgnoreCase("CreationTime"))
														{//6.3
																//System.out.println(attributeName+":"+ attributeValue);
																creationTime=attributeValue;
																//ps_insertFileTag.setString(2,creationTime);
																ps_updateItem.setString(2,creationTime);
														}//6.3
														else if(attributeName.equalsIgnoreCase("FileStatus"))
														{//6.4
																//System.out.println(attributeName+":"+ attributeValue);
																fileStatusCode=attributeValue;
																//ps_insertFileTag.setString(3,fileStatusCode);
																ps_updateItem.setString(3,fileStatusCode);
														}//6.4
												}//5.1
												//int result=ps_insertFileTag.executeUpdate();
												//if(result>0)
												 		//System.out.println(" fileHeader saved");
												 		//counter=0;
									}//5
									else if (elementString.equalsIgnoreCase("Item"))
									{//6
												Iterator iterator = element.getAttributes();
												while(iterator.hasNext())
												{//6.1
														Attribute attribute = (Attribute) iterator.next();
														QName name = attribute.getName();
														String attributeValue = attribute.getValue();
														String attributeName = name.toString();
														//System.out.println(attributeName+":"+ attributeValue);
														if(attributeName.equalsIgnoreCase("ItemSeqNo"))
														{//6.1
																//System.out.println(attributeName+":"+ attributeValue);
																itemSeqNo=attributeValue;
																//ps_updateItem.setString(1,itemSeqNo);
																ps_updateItem.setString(4,itemSeqNo);
														}//6.1
														else if(attributeName.equalsIgnoreCase("PayorBankRoutNo"))
														{//6.2
																//System.out.println(attributeName+":"+ attributeValue);
																payorBankRoutNo=attributeValue;
																//ps_updateItem.setString(2,payorBankRoutNo);
																ps_updateItem.setString(5,payorBankRoutNo);
														}//6.2
														else if(attributeName.equalsIgnoreCase("Amount"))
														{//6.3
																//System.out.println(attributeName+":"+ attributeValue);
																amount=attributeValue;
																//ps_updateItem.setString(3,amount);
																ps_updateItem.setString(6,amount);
														}//6.3
														else if(attributeName.equalsIgnoreCase("SerialNo"))
														{//6.4
																//System.out.println(attributeName+":"+ attributeValue);
																serialNo=attributeValue;
																//ps_updateItem.setString(4,serialNo);
																ps_updateItem.setString(7,serialNo);
														}//6.4
														else if(attributeName.equalsIgnoreCase("TransCode"))
														{//6.5
																//System.out.println(attributeName+":"+ attributeValue);
																transCode=attributeValue;
																//ps_updateItem.setString(5,transCode);
																ps_updateItem.setString(8,transCode);
														}//6.5
														else if(attributeName.equalsIgnoreCase("PresentingBankRoutNo"))
														{//6.6
																//System.out.println(attributeName+":"+ attributeValue);
																presentingBankRoutNo=attributeValue;
																//ps_updateItem.setString(6,presentingBankRoutNo);
																ps_updateItem.setString(9,presentingBankRoutNo);
														}//6.6
														else if(attributeName.equalsIgnoreCase("PresentmentDate"))
														{//6.
																	//System.out.println(attributeName+":"+ attributeValue);
																	presentmentDate=attributeValue;
																	//ps_updateItem.setString(7,rejectReason);
																		ps_updateItem.setString(10,rejectReason);
														}//6.
														else if(attributeName.equalsIgnoreCase("CycleNo"))
														{//6.7
																//System.out.println(attributeName+":"+ attributeValue);
																cycleNo=attributeValue;
																ps_updateItem.setString(11,cycleNo);
														}//6.7
														else if(attributeName.equalsIgnoreCase("RejectReason"))
														{//6.8
																	//System.out.println(attributeName+":"+ attributeValue);
																	rejectReason=attributeValue;
																	//ps_updateItem.setString(9,rejectReason);
																	ps_updateItem.setString(12,rejectReason);
														}//6.8
												}//6.1
														//ps_updateItem.setString(10,creationDate);
														//ps_updateItem.setString(11,creationTime);
														//ps_updateItem.setString(12,fileStatusCode);
													int result=ps_updateItem.executeUpdate();
													if(result>0)
														System.out.println("Item updated Successful");
									}//6
						}//4
					}//3
			}//2
		}
		catch (FileNotFoundException e)
		{
			System.out.println("FileNotFoundException:::" + e.getMessage());
			status = false;
		}
		catch (Exception e)
		{
			System.out.println("Error while reading XML\n" + e.getMessage());
			status = false;
		}
		finally
		{
				try
				{
						if(ps_updateItem!=null )
						{
							ps_updateItem.close();
						}
						if(xmlEventReader!=null)
						{
							xmlEventReader.close();
						}
						if(con!=null)
						{
							con.close();
						}
				}catch(Exception e){}
		}
		System.out.println("Exit from readBRF():::"+status);
		return status;
	}// end readBRF
////////////////////////////////////
public  static String getReturnFileName(String preFix)
	{//2
		String fileName="";
		try
		{//3
			fileName=preFix+"_";
			fileName=fileName+"413597000_";//Configuration.getConfValByNm("CFG_BANKROUTINGCODE")+"_";
			fileName=fileName+Configuration.getDDMMYYYY()+"_";
			fileName=fileName+Configuration.getHHMISS()+"_";
			File root=new File("D:/Apache6/Apache6/webapps/CTS/uploadpath_to_CHI/");//Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI"));
			String fileList[]=root.list();
			int fileCnt=1;
			for(int i=0;i<fileList.length;i++)
			{//4
				//System.out.println("fileList[i]:"+fileList[i]);
				if(fileList[i].contains("RRF")&& fileList[i].endsWith(".XML"))
				{//5

					System.out.println("fileList[i]"+new File(fileList[i]).getName());
					fileCnt++;
				}//5
			}//4
			if(fileCnt<=9)
			{
				fileName=fileName+"0"+fileCnt;
			}
			else
			{
				fileName=fileName+fileCnt;
			}
			fileName=fileName+".XML";
		}//3
		catch (Exception e)
		{//3
			System.out.println("\n\nException:::::"+e+"\n\n");
		}//3
		return fileName;
	}//2

	//
	public static String getClearingTypeFrmDB()
	{//1
			String clearingType=null;
			String retClearingType=null;
			Connection con=null;
			PreparedStatement ps=null;
			ResultSet rs=null;
			try
			{
					con=Configuration.getConnection();
					//ps=con.prepareStatement();
					rs=ps.executeQuery("select distinct CLO_CLEARINGTYPE from CLEARINGOUTWARD where CLO_DATE_DDMMYYYY='03032014' and CLO_CONVERT_FLG='Y'");
					int counter=0;
					while(rs.next())
					{
						clearingType=rs.getString(1);
						counter++;
					}

					if(counter==1)
					{
							retClearingType=clearingType;
					}
					else
					{
							retClearingType="00";
					}
			}
			catch(SQLException e)
			{
					System.out.println("\n\tSQLException in Configuration.getClearingTypeFrmDB:"+e);

			}
			catch(Exception e)
			{

			}
			finally
			{
					try
					{
						if(rs!=null)
							rs.close();
						if(ps!=null)
							ps.close();
						if(con!=null)
							con.close();
					}catch(Exception e){}
			}

			return retClearingType;
	}//1
	//
//////////////////////
// public static MicrDataInformation[] prepareMICARdata(String BRNCD)
	public static String prepareMICARdata(String BRNCD)
	{// 2
		String retMess = "";
		MicrDataInformation mdi[] = null;
		String uploadpath_to_chi ="D:/Apache6/Apache6/webapps/CTS/uploadpath_to_CHI/";//Configuration.getConfValByNm("CFG_uploadpath_to_chi");
		try {// 3
			new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/Thumbs.db").delete();
			String fileList[] = new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/").list();
			int noOfCheques = -1;

			if ((fileList.length % 4) == 0)
			{// 4
				noOfCheques = fileList.length / 4;
				//System.out.println("noOfCheques="+noOfCheques);
				String chequeNames = "";

				String folderpath1 = uploadpath_to_chi + BRNCD+ "/ClearingOutward/MICRWaveforms/";
				if (!new File(folderpath1).exists())
				{
					new File(folderpath1).mkdirs();
				}

				mdi = new MicrDataInformation[noOfCheques];
				String micrFileNames[] = new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/MICRWaveforms/").list();
				Arrays.sort(micrFileNames);
				System.out.println("** Sorted micr file Names **");
				for (String s : micrFileNames)
					System.out.println(s + " ");

				String micrfilenm = micrFileNames[0];
				String[] micrArr = micrfilenm.split(" ");
				String[] micrFileInitial = micrArr[0].split("Doc");
				//System.out.println("Get file Number:::>>>>"+ micrFileInitial[1]);

				int initialCount = Integer.parseInt(micrFileInitial[1]);
			//	System.out.println("initialCount>>>"+initialCount);
				if (initialCount != 1)
				{// if
					//System.out.println("initialCount:::>>>>" + initialCount);
					noOfCheques = (noOfCheques - 1) + initialCount;
					//System.out.println("noOfCheques:::>>>>" + noOfCheques);
				}// if
				int counter=initialCount;
				 StringBuffer faultyCheque=new StringBuffer();
				 String itemname="";
				for (int i = initialCount; i <= noOfCheques; i++)
				{// 5
					//System.out.println("**** loop ****");
					//System.out.println("initialCount:>>>>" + i);
					//System.out.println("noOfCheques:>>>>" + noOfCheques);
					//System.out.println("**** loop ****");

					//System.out.println("micrfilenm:>>>>" + micrfilenm);
					//System.out.println("itemname>>>>"+itemname);
					String itemMicrFileName = "", itemMicrOrgnlFileName = "";

					for (int j = 0; j < micrFileNames.length; j++)
					{// 6
						String micrFileName = micrFileNames[j]; // don't remove the space

						//////////
						String micrfilenm1 = micrFileName;
						System.out.println("micrfilenm1"+micrfilenm1);
							String[] micrArr1 = micrfilenm1.split(" ");
							System.out.println("micrArr1"+micrArr1[0]);
							String[] micrFileInitial1 = micrArr1[0].split("Doc");
							System.out.println("Get file Number:::>>>>"+ micrFileInitial1[1]);
								int noOfZeroes=0;
								char[] abcd=micrFileInitial1[1].toCharArray();
								System.out.println("abcd"+abcd);
								for(int kk=0;kk<abcd.length;kk++)
								{
										//System.out.println("abcd[kk]>>>>"+abcd[kk]);
										int ii=Integer.parseInt(String.valueOf(abcd[kk]));
										if(ii==0)
											noOfZeroes++;
										else
											break;
								}
							System.out.println("No of Zeroes in string"+noOfZeroes);
						//////////
						 itemname = "Doc" +Configuration.lPadForMicr(""+i, noOfZeroes, "0");
						System.out.println("micrFileName >>>>"+micrFileName+"---"+j+"----"+itemname);
						if (micrFileName.startsWith(itemname) && micrFileName.endsWith(" Waveform.txt"))
						{// 7
							itemMicrFileName = uploadpath_to_chi + BRNCD+ "/ClearingOutward/MICRWaveforms/"+ micrFileName;
							System.out.println("itemMicrFileName::::>"+micrFileName);
							break;
						}// 7
					}// 6
					//System.out.println("\n\nitemMicrFileName="+ itemMicrFileName);
					BufferedReader br = new BufferedReader(new FileReader(itemMicrFileName));
					 StringBuffer strBuff=new StringBuffer(br.readLine());
					  if(strBuff.toString().indexOf("?")>-1)
					  {
						  	counter-=1;
							faultyCheque.append(itemMicrFileName);
							System.out.println("faultyCheque::::::***"+counter);
					  		continue;
					}
					System.out.println("faultyCheque::::::"+counter);
					String fileData[] = strBuff.reverse().toString().split("<");
					br.close();
					//System.out.println("fileData[1]=" + fileData[1]);
					// index 0=null 1=check number 2=account number : bank code
					// 3=transaction number
					String chqNo =Configuration.lPad(fileData[1], 6, "0");
					String sortCode = fileData[2].split(":")[0];
					String tranNo =Configuration.lPad(fileData[3], 3, "0");
					String accNo =Configuration.lPad(fileData[2].split(":")[1], 15, "0");
					System.out.println("chqNo=" + chqNo);
					System.out.println("sortCode=" + sortCode);
					System.out.println("tranNo=" + tranNo);
					System.out.println("accNo=" + accNo);

					String folderpath2 = uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/";
					if (!new File(folderpath2).exists())
					{
						new File(folderpath2).mkdirs();
					}
					///////////////////////////

					String imgFrntBw = "", imgBackBw = "", imgFrntGr = "", imgBackGr = "";
					{// 6
						System.out.println("*** inside 111 ****");
						File sourceFile = null;
						File destFile = null;
						// front file rename
						sourceFile = new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/" + itemname+ "_Front1.tif");
						imgFrntBw = "f_" + chqNo + "_" + sortCode + ".tif";
						destFile = new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/" + imgFrntBw);
						sourceFile.renameTo(destFile);
					}// 6
					{// 6
						System.out.println("*** inside 222 ****");
						File sourceFile = null;
						File destFile = null;
						// rear file rename
						imgBackBw = "r_" + chqNo + "_" + sortCode + ".tif";
						sourceFile = new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/" + itemname+ "_Rear1.tif");
						destFile = new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/" + imgBackBw);
						sourceFile.renameTo(destFile);
					}// 6
					{// 6
						System.out.println("*** inside 333 ****");
						File sourceFile = null;
						File destFile = null;
						// front gray file rename
						imgFrntGr = "f_" + chqNo + "_" + sortCode + "_G.jpg";
						sourceFile = new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/" + itemname+ "_Front2.jpg");
						destFile = new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/" + imgFrntGr);
						sourceFile.renameTo(destFile);
					}// 6
					{// 6
						System.out.println("*** inside 444 ****");
						File sourceFile = null;
						File destFile = null;
						// front gray file rename
						imgBackGr = "r_" + chqNo + "_" + sortCode + "_G.jpg";
						sourceFile = new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/" + itemname+ "_Rear2.jpg");
						destFile = new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/" + imgBackGr);
						sourceFile.renameTo(destFile);
					}// 6
					itemMicrOrgnlFileName = itemMicrFileName.replace(" Waveform.txt", " OriginalWaveform.txt");
					// System.out.println("\n\nitemMicrOrgnlFileName="+itemMicrOrgnlFileName);
					new File(itemMicrFileName).delete();
					new File(itemMicrOrgnlFileName).delete();

					/*Connection con =Configuration.getConnection();
					String qry = "update clearingoutward  set clo_drawee_accno=?, ";
					qry = qry+ " clo_img_frnt_bw=?, clo_img_back_bw=?, clo_img_frnt_gr=?, clo_img_back_gr=? ";
					qry = qry+ " where  clo_date_ddmmyyyy=?  and  clo_chqno=? and clo_sortcd=?";
					PreparedStatement pst = con.prepareStatement(qry,ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_UPDATABLE);
					System.out.println(qry);
					pst.setString(1, accNo);
					pst.setString(2, imgFrntBw);
					pst.setString(3, imgBackBw);
					pst.setString(4, imgFrntGr);
					pst.setString(5, imgBackGr);
					pst.setString(6, Configuration.getDDMMYYYY());
					System.out.println("\n" + chqNo);
					pst.setString(7, chqNo);
					System.out.println("\n" + sortCode);
					pst.setString(8, sortCode);
					counter=counter+pst.executeUpdate();
					pst.close();
					con.close();*/
					String fileStr = chqNo + sortCode + tranNo + accNo;
					// pw.println(fileStr);
					// mdi[i-1] =new
					// MicrDataInformation(ourBnkCode,chqNo,sortCode,tranNo,amount,accNo,accHoldNm);
					counter++;
					System.out.println("\ncounter"+counter);
				}// 5
				// pw.close();
				System.out.println("\ncounter"+counter);
				System.out.println("\nfaultyCheque"+faultyCheque);
				System.out.println("(1+noOfCheques)"+(1+noOfCheques));

				if(counter==(1+noOfCheques))
					retMess = "SUCCESS";
				else
					retMess = "Cheque count miss Match";
			}// 4
			else
			{// 4
				System.out.println("\nWrong Number of Files");
				// retMess="Wrong Number of Files"; //ABHI
				retMess = "No File at Branch";
			}// 4
		}// 3
		catch (Exception e)
		{// 3
			System.out.println("\n\nException in prepareMicreData configuration::::"+ e+"\n\n");
			System.out.println("\n\nException in prepareMicreData configuration::::"+ e+"\n\n");
			// retMess="Wrong Number of Files";//abhi
			retMess = "No File at Branch";
		}// 3
		// return mdi;
		return retMess;
	}// 2
/////////////////////
public  static String getClearingFileName(String preFix, String extention)
	{//2
		String fileName="";
		try
		{//3
			fileName=preFix+"_";
			fileName=fileName+"000000009_";//Configuration.getConfValByNm("CFG_BANKCODE")+"_";
			fileName=fileName+Configuration.getDDMMYYYY()+"_";

			System.out.println("Gen fileName:"+fileName);
			int fileCnt=1;
			File root=new File("D:/Apache6/Apache6/webapps/CTS/uploadpath_to_CHI/2/ClearingOutward/");//new File(Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI"));
			String fileList[]=root.list();
			for(int i=0;i<fileList.length;i++)
			{//4
					File f=new File("D:/Apache6/Apache6/webapps/CTS/uploadpath_to_CHI/2/ClearingOutward/"+fileList[i]);
					if(f.isFile())
					{
						System.out.println("fileList[i]:::>>>"+fileList[i]);
						System.out.println("fileName:::>>>"+fileName);
						System.out.println("fileList[i].indexOf(fileName):::>>>"+fileList[i].indexOf(fileName));
						if(fileList[i].indexOf(fileName)==0 && fileList[i].endsWith(".img"))
						{//5
							fileCnt++;
						}//5
				}
			}//4
			/*if(fileCnt<=9)
			{
				fileName=fileName+"0"+fileCnt;
			}
			else
			{
				fileName=fileName+fileCnt;
			}*/
			fileName=fileName+Configuration.getHHMISS()+"_";
			fileName=fileName+"00"+"_";//Clearing Type
			fileName=fileName+Configuration.lPad(""+fileCnt,10,"0");
			fileName=fileName+extention;
		}//3
		catch (Exception e)
		{//3
			System.out.println("Exception:::::"+e);
		}//3
		return fileName;
	}//2


public static String getDataFromCBSTextFile(String branchFolder)
	{// getDataFromCBSTextFile

		System.out.println("************** inside getDataFromCBSTextFile ***********"+ branchFolder);
		/*
		 * Column Name ID Pk Null? Data Type Default Histogram Encryption Alg
		 * Salt CLO_BOFD 1 Y VARCHAR2 (9 Byte) No CLO_CHQNO 2 Y VARCHAR2 (6
		 * Byte) No CLO_SORTCD 3 Y VARCHAR2 (9 Byte) No CLO_TRANCD 4 Y VARCHAR2
		 * (3 Byte) No CLO_AMOUNT 5 Y VARCHAR2 (18 Byte) No CLO_PAYEE_ACCNO 6 Y
		 * VARCHAR2 (25 Byte) No CLO_PAYEE_ACCNM 7 Y VARCHAR2 (25 Byte) No
		 * CLO_DRAWEE_ACCNO 8 Y VARCHAR2 (25 Byte) No CLO_IMG_FRNT_BW 9 Y
		 * VARCHAR2 (27 Byte) No CLO_IMG_BACK_BW 10 Y VARCHAR2 (27 Byte) No
		 * CLO_IMG_FRNT_GR 11 Y VARCHAR2 (27 Byte) No CLO_DATE_DDMMYYYY 12 Y
		 * VARCHAR2 (8 Byte) No CLO_BRANCH_CD VARCHAR2 (5 Byte)
		 */
		Connection con = null;
		File cbs_clr_outwardFile = null;
		int recordCounter = 0;
		int insertResult = 0;
		String returnMsg = "";
		String readLine = "";
		try {
			String clr_outwardFilePath ="D:/Apache6/Apache6/webapps/CTS/uploadpath_to_CHI/9/ClearingOutward/";
			cbs_clr_outwardFile = new File(clr_outwardFilePath);
			String[] fileList = cbs_clr_outwardFile.list();
			//con = Configuration.getConnection();
			if (fileList.length != 0) {// 1
				System.out.println("fileList.length=" + fileList.length);
				for (String fNm : fileList) {// 2
					File _CBSfileName = new File(clr_outwardFilePath + fNm);
					System.out
							.println("_CBSfileName:" + _CBSfileName.getName());
					// check is File
					if (!_CBSfileName.isDirectory()) {// 3
						System.out.println("_CBSfileName:"
								+ _CBSfileName.getName());
						String nm = _CBSfileName.getName();
						if (nm.contains("From_CBS_Clearing_Outward") && nm.endsWith(".txt")) {// 3.1

							BufferedReader br = new BufferedReader(new FileReader(clr_outwardFilePath + nm));
							//String readLine = "";
							while ((readLine = br.readLine()) != null)
							{// 4
								recordCounter++;
								System.out.println("\nCheque Number:"+recordCounter);

								String CLO_BOFD = readLine.substring(0, 9);
								// int bodf=Integer.parseInt(CLO_BOFD);//**
								// don't remove this line
								System.out.println("CLO_BOFD:" + CLO_BOFD);
								String CLO_CHQNO = readLine.substring(9, 15);
								System.out.println("CLO_CHQNO:" + CLO_CHQNO);
								String CLO_SORTCD = readLine.substring(15, 24);
								System.out.println("CLO_SORTCD:" + CLO_SORTCD);
								String CLO_TRANCD = readLine.substring(24, 27);
								System.out.println("CLO_TRANCD:" + CLO_TRANCD);
								String CLO_AMOUNT = readLine.substring(27, 45);
								System.out.println("CLO_AMOUNT:" + CLO_AMOUNT);
								String CLO_PAYEE_ACCNO = readLine.substring(45,61);
								System.out.println("CLO_PAYEE_ACCNO:"+ CLO_PAYEE_ACCNO);
								String CLO_PAYEE_ACCNM = readLine.substring(61,86);
								System.out.println("CLO_PAYEE_ACCNM:"+ CLO_PAYEE_ACCNM);
								String CLO_DATE_DDMMYYYY = Configuration.getDDMMYYYY();

								/*PreparedStatement ps = con
										.prepareStatement("INSERT INTO CLEARINGOUTWARD(CLO_BOFD,CLO_CHQNO,CLO_SORTCD,CLO_TRANCD,CLO_AMOUNT,CLO_PAYEE_ACCNO,CLO_PAYEE_ACCNM,CLO_DATE_DDMMYYYY,CLO_BRANCH_CD,CLO_CONVERT_FLG) values(?,?,?,?,?,?,?,?,?,?)");
								ps.setString(1, CLO_BOFD);
								ps.setString(2, CLO_CHQNO);
								ps.setString(3, CLO_SORTCD);
								ps.setString(4, CLO_TRANCD);
								ps.setString(5, CLO_AMOUNT);
								ps.setString(6, CLO_PAYEE_ACCNO);
								ps.setString(7, CLO_PAYEE_ACCNM);
								ps.setString(8, CLO_DATE_DDMMYYYY);
								ps.setString(9, branchFolder);
								ps.setString(10, "N");

								- = insertResult+ps.executeUpdate();

								if (insertResult > 0)
									System.out.println("Record is inserted");*/


							}// 4
							br.close();
							System.out.println("Before File Delete");
							if(recordCounter==insertResult)
							{
								boolean flg = _CBSfileName.delete();
							}
							//System.out.println("After File Delete flg:" + flg);
						}// 3.1
					}// 3
				}// 2
			}// 1

			System.out.println("recordCounter:" + recordCounter);
			System.out.println("insertResult:" + insertResult);
			if (recordCounter == 0 && insertResult == 0) {
				returnMsg = "CBSFileNotFound";
			} else if (insertResult == 0) {
				returnMsg = "RecordNotInsert";
			} else {
				returnMsg = "SUCCESS";
			}
		} catch (NumberFormatException e) {
			System.out.println("\nNumberFormatException in getDataFromCBSTextFile of getClearingOutwardFile::>>\n"+ e);
			returnMsg = "CBSFileNotFound";
		} catch (FileNotFoundException e)
		{
			System.out.println("\nFileNotException in getDataFromCBSTextFile of getClearingOutwardFile::>>\n"+ e);
			returnMsg = "CBSFileNotFound";
		}
		catch(StringIndexOutOfBoundsException e)
		{
				System.out.println("\nStringIndexOutOfBoundsException in getDataFromCBSTextFile of getClearingOutwardFile::>>\n"+ e);
				returnMsg = "CBSFileIsNotInProperFormat";
				//writeFaultyCheque(readLine);
		}
		catch (Exception e)
		{
			System.out.println("\nException in getDataFromCBSTextFile of getClearingOutwardFile::>>"+ e);
			returnMsg = "FAIL";
		}
		System.out.println("\n\nExit From getDataFromCBSTextFile returnMsg:::>>"+ returnMsg);

		return returnMsg;
	}// end getDataFromCBSTextFile


// to readXML for gen Image file
	public static boolean readBPXF(String fileName)
  	{//readBPXF
  		boolean flg=false;
  		itemInfo=new ItemInformation();
  		System.out.println("*********** start readBPXF **** "+fileName);
  		String upDownStyle="Capturing";//Configuration.getConfValByNm("CFG_INWD_SPLITSTYLE");

  	try
  		{//try
  				String dir="D:/Apache6/Apache6/webapps/CTS/downloadpath_from_CHI/ClearingInward/";//Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI")+"ClearingInward/";//Cnfigure this path in DB
  				System.out.println("dir"+dir);
  				File file=new File(dir+fileName);

				/*System.out.println("file"+file.getName());
				System.out.println("file.getParent()"+file.getParent());
				System.out.println("file.isDirectory()"+file.isDirectory());
				System.out.println("file.exists()"+file.exists());
  				System.out.println("file.isFile()::::::::"+file.isFile());*/

  			if(file.isFile())
  			{//if(file.isFile())

  					fileName=file.getName();//fileName;
  					String fullFIlePath=dir+fileName;
  					//System.out.println("fileName:::"+fullFIlePath);
  					XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
  					XMLEventReader xmlEventReader = xmlInputFactory.createXMLEventReader(new FileInputStream(fullFIlePath));
  					String CreationDate="";
  					String PayorBankRoutNo="",TruncatingRTNo="",SerialNo="",TransCode="",ItemSeqNo="";
  					String imageFile1="",imageFile2="",imageFile3="";
  					String branches="",Amount="",AccountNo="";
  					int ImageViewDetailCnt=0;
  					String _filename="D:/Apache6/Apache6/webapps/CTS/downloadpath_from_CHI/ClearingInward";//Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI")+"/ClearingInward/";
					_filename=_filename+"/To_CBS_Clearing_Inward.txt";
					PrintWriter pw=new PrintWriter (new FileWriter(_filename));
					String imgDs1="~";
					String imgDs2="~";
					int imgDsCnt=0;
  					while(xmlEventReader.hasNext())
  					{//1
  						//System.out.println("*** 1****");
  						XMLEvent event = xmlEventReader.nextEvent();
  						if (event.isStartElement())
  						{//2
  							//System.out.println("*** 2 ****");
  							StartElement element = (StartElement) event;
  							if(element.getName().getLocalPart().equalsIgnoreCase("FileHeader"))
  							{//2--1
  								Iterator iterator = element.getAttributes();
  								while (iterator.hasNext())
  								{//4
  									Attribute attribute = (Attribute) iterator.next();
  									QName name = attribute.getName();
  									String value = attribute.getValue();
  									String nm = name.getLocalPart();
  									if(nm.equalsIgnoreCase("CreationDate"))
									{
  										CreationDate=value;
									}
  								}//4
  							}
  							if(element.getName().getLocalPart().equalsIgnoreCase("Item"))
  							{//3

  								//System.out.println("*** 3****");
  								Iterator iterator = element.getAttributes();
  								while (iterator.hasNext())
  								{//4
  									//System.out.println("***  4 ****");
  									Attribute attribute = (Attribute) iterator.next();
  									QName name = attribute.getName();
  									String value = attribute.getValue();
  									String nm = name.getLocalPart();

  									////System.out.println("*** value ***"+value);
  									//System.out.println("*** nm ***"+nm);

  										if(nm.equalsIgnoreCase("ItemSeqNo"))
										{
  											ItemSeqNo=value;
										}
  										if(nm.equalsIgnoreCase("SerialNo"))
  										{
  											itemInfo.setSerialNumber(value);
										}
  										if(nm.equalsIgnoreCase("PayorBankRoutNo"))
  										{
  											PayorBankRoutNo=value;
  											if(branches.indexOf(PayorBankRoutNo+"#")==-1)
  											{
  												branches=branches+PayorBankRoutNo+"#";
  											}
  										}
  										if(nm.equalsIgnoreCase("TruncatingRTNo"))
  										{
  											TruncatingRTNo=value;
  										}
  										if(nm.equalsIgnoreCase("Amount"))
  										{
  											Amount=value;
  										}
  										if(nm.equalsIgnoreCase("SerialNo"))
  										{
  											SerialNo=value;
  										}
  										if(nm.equalsIgnoreCase("AccountNo"))
  										{
  											AccountNo=value;
  										}
  										if(nm.equalsIgnoreCase("TransCode"))
  										{
  											TransCode=value;
  										}

  								}//4
  							}//3
  							if(element.getName().getLocalPart().equals("ImageViewDetail"))
  							{//5
  								ImageViewDetailCnt++;
  								//System.out.println("*** 6 ****");
  								Iterator iterator = element.getAttributes();
  								imgbn = new ImageBean();
  								while (iterator.hasNext())
  								{//6
  									Attribute attribute = (Attribute) iterator.next();
  									QName name = attribute.getName();
  									String value = attribute.getValue();
  									String nm = name.getLocalPart();
  									if(nm.equals("ViewSideIndicator"))
  										imgbn.setViewSideIndicator(value);
									if(nm.equals("ViewFormat"))
									imgbn.setViewFormat(value);
  								}//6
  								if(ImageViewDetailCnt%3==1)
  								{
  									imageFile1="f_"+SerialNo+"_"+PayorBankRoutNo;
  									imgbn.setImageFile(imageFile1+".tif");
  								}
  								if(ImageViewDetailCnt%3==2)
  								{
  									imageFile2="r_"+SerialNo+"_"+PayorBankRoutNo;
  									imgbn.setImageFile(imageFile2+".tif");
  								}
  								if(ImageViewDetailCnt%3==0)
  								{
  									imageFile3="f_"+SerialNo+"_"+PayorBankRoutNo+"_G";
  									imgbn.setImageFile(imageFile3+".jpg");
									TruncatingRTNo=Configuration.lPad(TruncatingRTNo,9,"0");
  									PayorBankRoutNo=Configuration.lPad(PayorBankRoutNo,9,"0");
  									//System.out.println("\n\n\n\nPayorBankRoutNo="+PayorBankRoutNo);
  									CreationDate=CreationDate;
  									Amount=Configuration.lPad(Amount,18,"0");
  									//System.out.println("\n\n\n\n\n\n\n\n\nAmount"+Amount);
  									//Amount=""+(float)(Long.parseLong(Amount))/100;
  									SerialNo=Configuration.lPad(SerialNo,6,"0");
  									//System.out.println("\n\n\n\n\n\n\n\n\nSerialNo"+SerialNo);
  									//System.out.println("********* 111 ***************");
  									String RBISeqNo=ItemSeqNo.length()>10?ItemSeqNo.substring(ItemSeqNo.length()-10,ItemSeqNo.length()):Configuration.lPad(ItemSeqNo,10,"0");
  									TransCode=Configuration.lPad(TransCode,3,"0");
  									//System.out.println("********* 222 ***************"+AccountNo);
  									AccountNo=AccountNo.length()>10?AccountNo.substring(AccountNo.length()-10,AccountNo.length()):Configuration.lPad(AccountNo,10,"0");;
  									//System.out.println("********* 333 ***************");
  									String Payeename="";for(int i=0;i<50;Payeename=Payeename+" ",i++);
  									String InstruDate=CreationDate;
  									//System.out.println("********* 444 ***************");
  									imageFile1=Configuration.rPad(imageFile1,27," ");
  									//System.out.println("********* 555 ***************");
  									imageFile2=Configuration.rPad(imageFile2,27," ");
  									imageFile3=Configuration.rPad(imageFile3,27," ");
  									//System.out.println("********* 666 ***************");
  									String cycleNumber="";
  									String UnqDocKey=CreationDate+PayorBankRoutNo+cycleNumber+ItemSeqNo;//for(int i=0;i<80;UnqDocKey=UnqDocKey+"0",i++);
  									UnqDocKey=Configuration.lPad(UnqDocKey,80,"0");
  									pw.println(TruncatingRTNo+PayorBankRoutNo+CreationDate+Amount+SerialNo+RBISeqNo+TransCode+AccountNo+Payeename+InstruDate+imageFile1+imageFile2+imageFile3+UnqDocKey);
  									//System.out.println("************************");
  								}
  							}//5
  							if(element.getName().getLocalPart().equals("ImageViewData"))
  							{//5
  									//System.out.println("*** 7 ****");
  								Iterator iterator = element.getAttributes();
  								while (iterator.hasNext())
  								{//6
  									Attribute attribute = (Attribute) iterator.next();
  									QName name = attribute.getName();
  									String value = attribute.getValue();
  									String nm = name.getLocalPart();
  									if(nm.equals("ImageDataLength"))
  										imgbn.setImageDataLength(value);
  									if(nm.equals("ImageDataOffset"))
  										imgbn.setImageDataOffset(value);
  									if(nm.equals("FileName"))
  										imgbn.setFileName(value);
  								}//6
								System.out.println("*** wait 11111*****");
  							}//5
  							if(element.getName().getLocalPart().equals("ImageDS"))
  							{//7
  								int kk=0;
  									System.out.println("*** wait *****");
									Thread.sleep(5000);
  								Iterator iterator = element.getAttributes();
  								System.out.println("KKK::::"+kk);
  								String strAll="";
  								Z:
  								while (iterator.hasNext())
  								{//8
  									Attribute attribute = (Attribute) iterator.next();
  									QName name = attribute.getName();
  									String value = attribute.getValue();
  									String nm = name.getLocalPart();
  									strAll=strAll+nm+"="+value+"!Q!";
								}//8
									//if(!strAll.indexOf("Capture")>-1)
									if(strAll.indexOf("ECP.PBCC")>-1)
									{
										String arr[]=strAll.split("!Q!");
										for(String str:arr)
										{
												System.out.println("strAll:::"+str);
										}
									}
  							}//7
  						}//2
  						if (event.isEndElement())
  						{//9
  							EndElement element = (EndElement) event;
  							if(element.getName().getLocalPart().equals("ImageViewDetail"))
  							{
  								imgData.add(imgbn);
  								//System.out.println("****** 11 *****");
  							}
  						}//9
  					}//1
  					micrData.add(micrMap);
  					itemData.add(itemInfo);
  					pw.close();
  					if(upDownStyle.equalsIgnoreCase("Capturing"))
					{
						/*Connection con=Configuration.getConnection();
						String branchList[]=branches.split("#");
						for(int i=0;i<branchList.length;i++)
						{
							PreparedStatement pst=con.prepareStatement("select * from BRANCHMSTR where BRNCD=(select BRM_PARENTBRCD from BRANCHMSTR where BRM_MICRCD=?)");
							pst.setString(1,branchList[i]);
							ResultSet rs=pst.executeQuery();
							while(rs.next())
							{
								//String scanningBrn=rs.getString(4);
								String Capfilename="D:/Apache6/Apache6/webapps/CTS/downloadpath_from_CHI/ClearingInward/";//Configuration.getConfValByNm("CFG_downloadpath_from_CHI")+"/ClearingInward/MICR Waveforms/";
								Capfilename=Capfilename+"/chequedetails_"+rs.getString(1)+".txt";
								PrintWriter pw1=new PrintWriter (new FileWriter(Capfilename));
								BufferedReader br=new BufferedReader (new FileReader(_filename));
								String readLine="";
								while((readLine=br.readLine())!=null)
								{
									if(readLine.substring(9,18).equalsIgnoreCase(branchList[i]))
									{
										pw1.println(readLine);
									}
								}
								pw1.close();
								br.close();

							}
							rs.close();
							pst.close();
						}*/
						new File(_filename).delete();
					}
					else if(upDownStyle.equalsIgnoreCase("Separated"))
					{
						/*Connection con=Configuration.getConnection();
						PreparedStatement pst=con.prepareStatement("select * from BRANCHMSTR");
						ResultSet rs=pst.executeQuery();
						while(rs.next())
						{
							String scanningBrn=rs.getString(4);
							String Capfilename=Configuration.getConfValByNm("CFG_downloadpath_from_CHI")+"/ClearingInward/MICR Waveforms/";
							Capfilename=Capfilename+"/chequedetails_"+rs.getString(1)+".txt";
							PrintWriter pw1=new PrintWriter (new FileWriter(Capfilename));
							BufferedReader br=new BufferedReader (new FileReader(_filename));
							String readLine="";
							while((readLine=br.readLine())!=null)
							{
								if(readLine.substring(9,18).equalsIgnoreCase(scanningBrn))
								{
									pw1.println(readLine);
								}
							}
							pw1.close();
							br.close();
						}
						rs.close();
						pst.close();
						new File(_filename).delete();*/
				}
  			}//if(file.isFile())
			//System.out.println("inside xmlReader and readBPXF:::"+imgData.size());
  		}//end try
  		catch(Exception e)
  		{//catch
  			e.printStackTrace();
  			System.out.println("Error while reading XML\n"+e.getMessage());
  			flg=true;
  		}//catch

	/*	for(ImageBean _objBean: imgData)
		{//2
			int dsa_offset=Integer.parseInt(_objBean.getDigitalSignatureDataOffset());
			int dsa_length=Integer.parseInt(_objBean.getDigitalSignatureLength());
			int base64String_offset=Integer.parseInt(_objBean.getImageDataOffset());
			int base64String_length=Integer.parseInt(_objBean.getImageDataLength());
			int SecurityKeySize=Integer.parseInt(_objBean.getSecurityKeySize());
			String DigitalSignatureMethod=_objBean.getDigitalSignatureMethod();
			String ViewSideIndicator=_objBean.getViewSideIndicator();
			String ViewFormat=_objBean.getViewFormat();
			String imageFileName=_objBean.getImageFile();

			// image Data
			System.out.println("imageFileName:::"+imageFileName);
			System.out.println("dsa_offset:::"+dsa_offset);
			System.out.println("dsa_length:::"+dsa_length);
			System.out.println("base64String_offset:::"+base64String_offset);
			System.out.println("base64String_length:::"+base64String_length);
			//System.out.println("fileName:::"+len);
			System.out.println("SecurityKeySize:::"+SecurityKeySize);
			System.out.println("DigitalSignatureMethod:::"+DigitalSignatureMethod);
			System.out.println("ViewSideIndicator:::"+ViewSideIndicator);
			System.out.println("ViewFormat:::"+ViewFormat);
		}*/
  		return flg;
  }//end readBPXF
}