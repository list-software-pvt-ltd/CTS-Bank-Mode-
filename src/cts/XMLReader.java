package cts;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;


import javax.xml.namespace.QName;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.events.Attribute;
import javax.xml.stream.events.EndElement;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;

import jcifs.smb.SmbFile;
import list.utility.CommonUtility;

import org.apache.commons.io.FileUtils;
import org.apache.poi.util.SystemOutLogger;

public class XMLReader
{
	private ArrayList<HashMap> micrData = new ArrayList<HashMap>();
	private HashMap<String, String> micrMap = new HashMap<String, String>();
	private ArrayList<ImageBean> imgData = new ArrayList<ImageBean>();
	private ArrayList<ItemInformation> itemData = new ArrayList<ItemInformation>();
	private String fileName;
	public int cil_clrseqno;
	ImageBean imgbn = null;
	ItemInformation itemInfo;
	public String specialVal="00";
	public static String err_string = "SUCCESS";
	

	public HashMap<String, String> geMicrDate() {
		return micrMap;
	}

	public ArrayList<ImageBean> getImgData() {
		return imgData;
	}

	public ArrayList<ItemInformation> getItemData() {
		return itemData;
	}

	public XMLReader() {
		// Do Nothing...
	}

	public static boolean readExtensionFiles(String filePath, String _fileName,
			String fileType) {
		System.out.println("\n\t  ----- readExtensionFiles ----");
		Connection con = null;
		PreparedStatement ps_insert = null;
		boolean status = true;
		String extensionFileName = null;
		String fileStatusCode = null;

		String creationDate = null, creationTime = null;
		XMLInputFactory xmlInputFactory = null;
		XMLEventReader xmlEventReader = null;
		String EXT_ItemSeqNo = "0000", EXT_PayorBankRoutNo = "000", EXT_Amount = "000", EXT_AccountNo = "000", EXT_SerialNo = "000", EXT_TransCode = "000", EXT_PresentingBankRoutNo = "000", EXT_PresentmentDate = "000", EXT_CycleNo = "000", EXT_ExtensionPeriod = "000", EXT_ExtensionReasonCode = "0000", EXT_creationdate = "000", EXT_creationTime = "000", EXT_fileName = "000", EXT_DDMMYYYY = "000", EXT_ISREADED = "000";
		EXT_fileName = _fileName;
		try 
		{// try
			con = Configuration.getConnection();
			int counter = 0;
			ps_insert = con.prepareStatement("insert into Extension_inward values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

			xmlInputFactory = XMLInputFactory.newInstance();
			xmlEventReader = xmlInputFactory.createXMLEventReader(new FileInputStream(filePath + "/"+ _fileName));

			while (xmlEventReader.hasNext()) 
			{// outer while
				XMLEvent event = xmlEventReader.nextEvent();
				if (event.isStartElement()) 
				{// if
					StartElement element = (StartElement) event;
					String elementName = element.getName().toString();
					String elementString = elementName.substring(elementName.lastIndexOf("}") + 1,elementName.length());
					
					if (elementString.equalsIgnoreCase("FileHeader")) 
					{// 1
						Iterator iterator = element.getAttributes();
						while (iterator.hasNext()) 
						{// 3.1
							Attribute attribute = (Attribute) iterator.next();
							QName name = attribute.getName();
							String attributeValue = attribute.getValue();
							String attributeName = name.toString();
							// System.out.println(attributeName+":"+
							// attributeValue);
							if (attributeName.equalsIgnoreCase("CreationDate")) 
							{// 3.2
								EXT_creationdate = attributeValue;
							}// 3.2
							if (attributeName.equalsIgnoreCase("CreationTime")) 
							{// 3.2
								EXT_creationTime = attributeValue;
							}// 3.2
						}// 3.1
					}// 1
					else if (elementString.equalsIgnoreCase("Item")) 
					{// 4
						Iterator iterator = element.getAttributes();
						while (iterator.hasNext()) 
						{// 4.1
							while (iterator.hasNext()) 
							{// 5.1
								Attribute attribute = (Attribute) iterator.next();
								QName name = attribute.getName();
								String attributeValue = attribute.getValue();
								String attributeName = name.toString();
								// System.out.println(attributeName+":"+
								// attributeValue);
								if (attributeName.equalsIgnoreCase("ItemSeqNo")) {// 5.2
									EXT_ItemSeqNo = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("PayorBankRoutNo")) {// 5.2
									EXT_PayorBankRoutNo = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("Amount")) {// 5.2
									EXT_Amount = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("AccountNo")) {// 5.2
									EXT_AccountNo = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("SerialNo")) {// 5.2
									EXT_SerialNo = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("TransCode")) {// 5.2
									EXT_TransCode = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("PresentingBankRoutNo")) {// 5.2
									EXT_PresentingBankRoutNo = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("PresentmentDate")) {// 5.2
									EXT_PresentmentDate = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("CycleNo")) {// 5.2
									EXT_CycleNo = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("ExtensionPeriod")) {// 5.2
									EXT_ExtensionPeriod = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("ExtensionReasonCode")) {// 5.2
									EXT_ExtensionReasonCode = attributeValue;
								}// 5.2
							}// 5.1
						}// 4.1
					}// 4
					
				}// if
				if (event.isEndElement()) {// if-1
					EndElement element = (EndElement) event;
					String elementName = element.getName().toString();
					String elementString = elementName.substring(elementName.lastIndexOf("}") + 1,elementName.length());
					if(elementString.equalsIgnoreCase("Item"))
					{
					
						ps_insert.setString(1, EXT_ItemSeqNo);
						ps_insert.setString(2, EXT_PayorBankRoutNo);
						ps_insert.setString(3, EXT_Amount);
						ps_insert.setString(4, EXT_AccountNo);
						ps_insert.setString(5, EXT_SerialNo);
						ps_insert.setString(6, EXT_TransCode);
						ps_insert.setString(7, EXT_PresentingBankRoutNo);
						ps_insert.setString(8, EXT_PresentmentDate);
						ps_insert.setString(9, EXT_CycleNo);
						ps_insert.setString(10, EXT_ExtensionPeriod);
						ps_insert.setString(11, EXT_ExtensionReasonCode);
						ps_insert.setString(12, EXT_creationdate);
						ps_insert.setString(13, EXT_creationTime);
						ps_insert.setString(14, EXT_fileName);
						ps_insert.setString(15, Configuration.getDDMMYYYY());
						ps_insert.setString(16, "N");
						ps_insert.setString(17, fileType);
						try 
						{
							//System.out.println("EXT_ItemSeqNo=="+EXT_ItemSeqNo+"===EXT_SerialNo=="+EXT_SerialNo+"==EXT_fileName=="+EXT_fileName);
							int result = ps_insert.executeUpdate();
							if (result > 0)
								System.out.println("Item inserted Successful");
						} catch (SQLException e) {
							System.out
									.println("\n\t SQLException in readExtensionFiles:."
											+ e);	
						}
					}
				}// if-1
			}// outer while
		}// try
		catch (Exception ex) 
		{
			System.out.println("\n\t Exception in readExtensionFiles():" + ex);
			status = false;
		} finally {
			try {
				if (ps_insert != null && con != null) {
					ps_insert.close();
					con.close();
				}
			} catch (Exception e) {
			}
		}
		System.out.println("\n\t  ----- exit from readExtensionFiles ----");
		return status;
	}// end readExtensionFiles

	public static boolean readOACKResponse(String filePath, String _fileName,
			String clearingdate, String sessionNumber, String sessionDate) {
		Connection con = null;
		// PreparedStatement ps_insertFileTag=null;
		PreparedStatement ps_updateItem = null;
		boolean status = true;
		String responseFileName = null;
		String fileStatusCode = null;
		String rejectReasonCode = null;
		String item = null;
		String creationDate = null, creationTime = null;
		XMLInputFactory xmlInputFactory = null;
		XMLEventReader xmlEventReader = null;
		String path = filePath;
		String fileType = null;
		int count=0;
		String SettlementDate = "", ItemStatus = "", CycleNo = "", PresentmentDate = "", PresentingBankRoutNo = "", ItemSeqNo = "";
		// clearingdate,sessionNumber,sessionDate,SettlementDate,ItemStatus,CycleNo,PresentmentDate,PresentingBankRoutNo,
		// ItemSeqNo,_fileName
		try {// try
			con = Configuration.getConnection();
			int counter = 0;
			String mystatus = "yes";
			ps_updateItem = con
					.prepareStatement("insert into OACK values(?,?,?,?,?,?,?,?,?,?,?)");

			xmlInputFactory = XMLInputFactory.newInstance();
			xmlEventReader = xmlInputFactory
					.createXMLEventReader(new FileInputStream(path + "/"
							+ _fileName));

			while (xmlEventReader.hasNext()) {// 1
				XMLEvent event = xmlEventReader.nextEvent();
				System.out.println("111====="+event.isStartElement());
				if (event.isStartElement()) {// 2
					StartElement element = (StartElement) event;
					String elementName = element.getName().toString();
					String elementString = elementName.substring(
							elementName.lastIndexOf("}") + 1,
							elementName.length());
					//System.out.println("elementString::" + elementString);
					if (elementString.equalsIgnoreCase("FileHeader")) {// 3
						Iterator iterator = element.getAttributes();
						while (iterator.hasNext()) {// 3.1
							Attribute attribute = (Attribute) iterator.next();
							QName name = attribute.getName();
							String attributeValue = attribute.getValue();
							String attributeName = name.toString();
							// System.out.println(attributeName+":"+
							// attributeValue);
							if (attributeName
									.equalsIgnoreCase("SettlementDate")) {// 3.2
																			// ps_updateItem.setString(1,attributeValue);//SettlementDate
								SettlementDate = attributeValue;
							}// 3.2
						}// 3.1
					}// 3
					else if (elementString.equalsIgnoreCase("Item")) {// 4
						Iterator iterator = element.getAttributes();
						while (iterator.hasNext()) {// 4.1
							while (iterator.hasNext()) {// 5.1
								Attribute attribute = (Attribute) iterator
										.next();
								QName name = attribute.getName();
								String attributeValue = attribute.getValue();
								String attributeName = name.toString();
								// System.out.println(attributeName+":"+
								// attributeValue);
								if (attributeName
										.equalsIgnoreCase("ItemStatus")) {// 5.2
																			// ps_updateItem.setString(2,attributeValue);//ItemStatus

									ItemStatus = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("CycleNo")) {// 5.2
																		// ps_updateItem.setString(3,attributeValue);//CycleNo
									CycleNo = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("PresentmentDate")) {// 5.2
																				// ps_updateItem.setString(4,attributeValue);//PresentmentDate
									PresentmentDate = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("PresentingBankRoutNo")) {// 5.2
																					// ps_updateItem.setString(5,attributeValue);//PresentingBankRoutNo

									PresentingBankRoutNo = attributeValue;
								}// 5.2
								else if (attributeName
										.equalsIgnoreCase("ItemSeqNo")) {// 5.2
																			// ps_updateItem.setString(6,attributeValue);//ItemSeqNo
									ItemSeqNo = attributeValue;
								}// 5.2
							}// 5.1
						}// 4.1
							// SettlementDate,sessionNumber,sessionDate,SettlementDate,ItemStatus,CycleNo,PresentmentDate,PresentingBankRoutNo,
						// ItemSeqNo,_fileName
					}// 4
				}// 2
				if (event.isEndElement()) {
					System.out.println("\n\t event.isEndElement");
					ps_updateItem.setString(1, SettlementDate);// SettlementDate
					ps_updateItem.setString(1, SettlementDate);
					ps_updateItem.setString(2, ItemStatus);
					ps_updateItem.setString(3, CycleNo);
					ps_updateItem.setString(4, PresentmentDate);
					ps_updateItem.setString(5, PresentingBankRoutNo);
					ps_updateItem.setString(6, ItemSeqNo);
					ps_updateItem.setString(7, clearingdate);
					ps_updateItem.setString(8, sessionNumber);
					ps_updateItem.setString(9, sessionDate);
					ps_updateItem.setString(10, _fileName);
					ps_updateItem.setString(11, Configuration.getDDMMYYYY());
					try {
						int result = ps_updateItem.executeUpdate();
						if (result > 0)
							     count++;
							//System.out.println("Item updated Successful");
					} catch (SQLException e) {
						if (e.getMessage().contains("ORA-00001:")) {// 1
							System.out.println("\n\t Duplicate Record.");
						}//
					}
				}
			}// 1
			if(count==0)
				status = false;
			
		}// try
		
		catch (Exception ex) {
			System.out.println("\n\t Exception in readOACKResponse():" + ex);
			status = false;
		} finally {
			try {
				if (ps_updateItem != null && con != null) {
					ps_updateItem.close();
					con.close();
				}
			} catch (Exception e) {
			}
		}
		
		return status;
	}// end readOACKResponse
	
	public static void createOWExtract( String filePath )
	{
		try
		{
			
		
		Connection con = null;
		con = Configuration.getConnection();
		PreparedStatement pst = null;
		ResultSet rs=null;
		PrintWriter out=null;
		String path = filePath;
		
		String Account_nm="",Amount="",Cheque_NO="",ItemSeqNo="",Trans_Code="",Branch_code="", OACK="",MicrCode="",space1="",space2="",space3="",space4="",space5="";
		
		String BankShortcode = Configuration
				.getConfValByNm("CFG_VENDOR_ID",con);
		String date=Configuration.getDDMMYYYY();
		String time=Configuration.getHHMISS();
		String textFileName = "OW_Extract_"+BankShortcode+"_"+date+"_"+time+".dat";
		FileWriter fstream = new FileWriter(path + "/" + textFileName);
		out = new PrintWriter(fstream);
		String qry="select * from OACK inner join clearingoutward on(OACK_PRESENTMENTDATE=CLO_DATE_DDMMYYYY and "
				+ "to_number(OACK_ITEMSEQNO)=to_number(CLO_ITEMSEQNO)) where OACK_DDMMYYYY= ?";
		
		System.out.println("Connection Successfull");
		pst = con.prepareStatement(qry);
		pst.setString(1,Configuration.getDDMMYYYY());
		
		rs = pst.executeQuery();
		Account_nm=Configuration
			.getConfValByNm("CFG_SPNCBNK_ACNO",con);
		 Account_nm=Configuration.rPad(Account_nm, 16, " ");
			while (rs.next()) 
			{
				//Account_nm=rs.getString("CLO_PAYEE_ACCNO");
				 Amount=rs.getString("CLO_AMOUNT");
				String Amount1=Amount.substring(0,Amount.length()-2);
				 //System.out.println("1"+Amount1);

				 String dec=Amount.substring(Amount.length()-2);
				 ///System.out.println("2"+dec);
				 Amount=Amount1+'.'+dec;
				 Amount=Configuration.lPad(Amount, 17, " ");

				 Cheque_NO=rs.getString("CLO_CHQNO");
				 Cheque_NO=Configuration.lPad(Cheque_NO, 16, " ");

				 Trans_Code=rs.getString("CLO_TRANCD");
				 Trans_Code=Configuration.rPad(Trans_Code, 3, " ");

				 Branch_code=rs.getString("CLO_SORTCD");
				 Branch_code=Configuration.lPad(Branch_code,9, " ");
				 
				 ItemSeqNo=rs.getString("CLO_ITEMSEQNO");
				 ItemSeqNo=Configuration.rPad(ItemSeqNo,40," ");
				
				 
				 String strdate=rs.getString("OACK_FILENAME").split(".OACK")[0];
					strdate=strdate.substring(strdate.lastIndexOf(".")+1);
					 String temp=strdate.substring(4)+strdate.substring(2,4)+strdate.substring(0,2);
					 System.out.println(temp);
				 //space1=Configuration.lPad(space1, 30, " ");
				 space2=Configuration.lPad(space2, 6, " ");
				 space3=Configuration.lPad(space3, 250, " ");
				 space4=Configuration.lPad(space4, 16, " ");
				 space5=Configuration.lPad(space5, 119, " ");
				 
				 String narration="By_clearing/"+Cheque_NO.trim()+"/"+BankShortcode.trim();
				 narration=Configuration.rPad(narration, 30, " ");
				 OACK= Account_nm+"INR"+Amount+"Y"+narration+Cheque_NO+Amount+Trans_Code+Branch_code+space2+space2+"Y"+"Y"+space4+
						 temp+space5+ItemSeqNo+space3;
				 out.println(OACK);
				 out.flush();
				 
			}
			out.close();
			rs.close();
			pst.close();
			con.close();
			fstream = new FileWriter(path + "/" + textFileName+".done");
			out = new PrintWriter(fstream);
			out.close();
		}
		catch (Exception ex) 
		{
			System.out.println("\n\t Exception in createOACK():" + ex);
			//return false;
		}
		
	}

	public static boolean readResponseFile(String filePath, String _fileName) {// 1

		Connection con = null;
		// PreparedStatement ps_insertFileTag=null;
		PreparedStatement ps_updateItem = null, ps_insertFileTag = null;
		;
		boolean status = true;
		String responseFileName = null;
		String fileStatusCode = null;
		String rejectReasonCode = null;
		String item = null;
		String creationDate = null, creationTime = null;
		XMLInputFactory xmlInputFactory = null;
		XMLEventReader xmlEventReader = null;
		String path = filePath;
		String fileType = null;

		String itemSeqNo = null, payorBankRoutNo = null, amount = null, serialNo = null, transCode = null, presentingBankRoutNo = null, presentmentDate = null, cycleNo = null, rejectReason = null;
		try {// try
			con = Configuration.getConnection();
			int counter = 0;
			String mystatus = "yes";
			ps_updateItem = con
					.prepareStatement("insert into Returnfiles(CREATIONDATE,CREATIONTIME,FILESTATUSCODE,ITEMSEQNO,PAYORBANKROUTNO,AMOUNT,SERIALNO,TRANSCODE,PRESENTINGBANKROUTNO,PRESENTMENTDATE,CYCLENO,REJECTREASON,ISSETTLED,FILENAME,RESPONSETYPE) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
			String reponseType = "";
			if ((_fileName.contains("CXF_") || _fileName.contains("RRF_"))
					&& _fileName.endsWith(".RES")) {// 2
				if (_fileName.contains("CXF_")) {
					reponseType = "C";
				} else if (_fileName.contains("RRF_")) {
					reponseType = "R";
				}
				xmlInputFactory = XMLInputFactory.newInstance();
				xmlEventReader = xmlInputFactory
						.createXMLEventReader(new FileInputStream(path + "/"
								+ _fileName));
				while (xmlEventReader.hasNext()) {// 3
					XMLEvent event = xmlEventReader.nextEvent();
					if (event.isStartElement()) {// 4
						StartElement element = (StartElement) event;
						String elementName = element.getName().toString();
						String elementString = elementName.substring(
								elementName.lastIndexOf("}") + 1,
								elementName.length());
						// System.out.println("elementString::" +
						// elementString);
						if (elementString.equalsIgnoreCase("FileHeader")) {// 5
							Iterator iterator = element.getAttributes();
							while (iterator.hasNext()) {// 5.1
								Attribute attribute = (Attribute) iterator
										.next();
								QName name = attribute.getName();
								String attributeValue = attribute.getValue();
								String attributeName = name.toString();
								// System.out.println(attributeName+":"+
								// attributeValue);
								if (attributeName
										.equalsIgnoreCase("CreationDate")) {// 6.2
																			// System.out.println(attributeName+":"+
																			// attributeValue);
																			// creationDate=attributeValue;
																			// ps_insertFileTag.setString(1,creationDate);//creationDate
									ps_updateItem.setString(1, attributeValue);// ccc

									// ps_insertFileTag.setString(1,attributeValue);
								}// 6.2
								else if (attributeName
										.equalsIgnoreCase("CreationTime")) {// 6.3
																			// System.out.println(attributeName+":"+
																			// attributeValue);
																			// creationTime=attributeValue;
																			// ps_insertFileTag.setString(2,creationTime);
									ps_updateItem.setString(2, attributeValue);// ccc
									// ps_insertFileTag.setString(2,attributeValue);

								}// 6.3
								else if (attributeName
										.equalsIgnoreCase("FileStatus")) {// 6.4
																			// System.out.println(attributeName+":"+
																			// attributeValue);
																			// fileStatusCode=attributeValue;
																			// ps_insertFileTag.setString(3,fileStatusCode);
									ps_updateItem.setString(3, attributeValue);// ccc
									// ps_insertFileTag.setString(3,attributeValue);
									// ps_insertFileTag.setString(4,_fileName);
								}// 6.4
							}// 5.1
						}// 5
						else if (elementString.equalsIgnoreCase("Item")) {// 6
							counter++;
							mystatus = "Not";
							System.out.println("\n\tItem Tags:" + _fileName);
							Iterator iterator = element.getAttributes();
							while (iterator.hasNext()) {// 6.1
								Attribute attribute = (Attribute) iterator
										.next();
								QName name = attribute.getName();
								String attributeValue = attribute.getValue();
								String attributeName = name.toString();
								// System.out.println(attributeName+":"+
								// attributeValue);
								if (attributeName.equalsIgnoreCase("ItemSeqNo")) {// 6.1
																					// System.out.println(attributeName+":"+
																					// attributeValue);
																					// itemSeqNo=attributeValue;
																					// ps_updateItem.setString(1,itemSeqNo);
									ps_updateItem.setString(4, attributeValue);// ccc
									// ps_updateItem.setString(1,attributeValue);
								}// 6.1
								else if (attributeName
										.equalsIgnoreCase("PayorBankRoutNo")) {// 6.2
																				// System.out.println(attributeName+":"+
																				// attributeValue);
																				// payorBankRoutNo=attributeValue;
																				// ps_updateItem.setString(2,payorBankRoutNo);
									ps_updateItem.setString(5, attributeValue);// ccc
									// ps_updateItem.setString(2,attributeValue);

								}// 6.2
								else if (attributeName
										.equalsIgnoreCase("Amount")) {// 6.3
																		// System.out.println(attributeName+":"+
																		// attributeValue);
																		// amount=attributeValue;
																		// ps_updateItem.setString(3,amount);
									ps_updateItem.setString(6, attributeValue);// ccc
									// ps_updateItem.setString(3,attributeValue);
								}// 6.3
								else if (attributeName
										.equalsIgnoreCase("SerialNo")) {// 6.4
																		// System.out.println(attributeName+":"+
																		// attributeValue);
																		// serialNo=attributeValue;
																		// ps_updateItem.setString(4,serialNo);
									ps_updateItem.setString(7, attributeValue);// ccc
									// ps_updateItem.setString(4,attributeValue);
								}// 6.4
								else if (attributeName
										.equalsIgnoreCase("TransCode")) {// 6.5
																			// System.out.println(attributeName+":"+
																			// attributeValue);
																			// transCode=attributeValue;
																			// ps_updateItem.setString(5,transCode);
									ps_updateItem.setString(8, attributeValue);// ccc
									// ps_updateItem.setString(5,attributeValue);
								}// 6.5
								else if (attributeName
										.equalsIgnoreCase("PresentingBankRoutNo")) {// 6.6
																					// System.out.println(attributeName+":"+
																					// attributeValue);
																					// presentingBankRoutNo=attributeValue;
																					// ps_updateItem.setString(6,presentingBankRoutNo);
									ps_updateItem.setString(9, attributeValue);// ccc
									// ps_updateItem.setString(6,attributeValue);
								}// 6.6
								else if (attributeName
										.equalsIgnoreCase("PresentmentDate")) {// 6.
																				// System.out.println(attributeName+":"+
																				// attributeValue);
																				// presentmentDate=attributeValue;
																				// ps_updateItem.setString(7,rejectReason);
									ps_updateItem.setString(10, attributeValue);// ccc
									// ps_updateItem.setString(7,attributeValue);
								}// 6.
								else if (attributeName
										.equalsIgnoreCase("CycleNo")) {// 6.7
																		// System.out.println(attributeName+":"+
																		// attributeValue);
																		// cycleNo=attributeValue;
									ps_updateItem.setString(11, attributeValue);// ccc
									// ps_updateItem.setString(8,attributeValue);
								}// 6.7
								else if (attributeName
										.equalsIgnoreCase("RejectReason")) {// 6.8
									ps_updateItem.setString(12, attributeValue);// ccc
									ps_updateItem.setString(13, "N");// cccc
									ps_updateItem.setString(14, _fileName);// ccc
									ps_updateItem.setString(15, reponseType);// ccc
								}// 6.8
							}// 6.1
							try {
								int result = ps_updateItem.executeUpdate();
								if (result > 0)
									System.out
											.println("Item updated Successful");
							} catch (SQLException e) {
								System.out
										.println("SQLException in readResponseFile 1111:"
												+ e);
							}
						}// 6
					}// 4
				}// 3
			}// 2
			System.out.println("\n\tCounter:::" + counter);
			System.out.println("\n\tmystatus:::" + mystatus);
			if (counter == 0 && mystatus.equalsIgnoreCase("yes")) {// 2.1
				System.out.println("---- inside insert ...");
				ps_updateItem.setString(4, "0");// ccc
				ps_updateItem.setString(5, "0");// ccc
				ps_updateItem.setString(6, "0");// ccc
				ps_updateItem.setString(7, "0");// ccc
				ps_updateItem.setString(8, "0");// ccc
				ps_updateItem.setString(9, "0");// ccc
				ps_updateItem.setString(10, "0");// ccc
				ps_updateItem.setString(11, "0");// ccc
				ps_updateItem.setString(12, "0");// ccc
				ps_updateItem.setString(13, "N");// cccc
				ps_updateItem.setString(14, _fileName);// ccc
				ps_updateItem.setString(15, reponseType);// ccc

				try {
					int result = ps_updateItem.executeUpdate();
					if (result > 0)
						System.out.println("Item updated Successful");
				} catch (SQLException e) {
					System.out.println("SQLException in readResponseFile 222 :"
							+ e);
				}
			}// 2.1
		} catch (FileNotFoundException e) {
			System.out
					.println("FileNotFoundException in Configuration.readResponse():::"
							+ e.getMessage());
			err_string = "Response File Not Found.";
			status = false;
		} catch (Exception e) {
			System.out.println("Error in Configuration.readResponse():\n"
					+ e.getMessage());
			err_string = "Fail To read Response File.";
			status = false;
		} finally {
			try {
				if (ps_updateItem != null && xmlEventReader != null) {
					ps_updateItem.close();
				}
				if (xmlEventReader != null) {
					xmlEventReader.close();
				}
				if (con != null) {
					con.close();
				}
			} catch (Exception e) {
			}
		}
		return status;
	}// end readResponse

	public boolean readBRF(String filePath, String _fileName)// ReturnInward
																// ------------new
	{
		System.out.println("***** SAM readBRF ******");
		boolean status = false;

		String path = filePath;

		fileName = _fileName;
		Connection con = null;
		PreparedStatement ps_insert = null;
		PrintWriter out = null;
		PreparedStatement ps_branches = null;
		PreparedStatement ps_allBranches = null;
		String ENCRY_DECRYPT_FLG="";
		PreparedStatement ps_values = null;		
		ResultSet rs1=null;
		try {
			// BRF_400259000_11012014_125101_11812

			String[] fileNameData = fileName.split("_");
			String creationDate = fileNameData[2];
			String creationTime = fileNameData[3];
			con = Configuration.getConnection();
			ENCRY_DECRYPT_FLG=Configuration.getConfValByNm("CFG_ENCRY_DECRYPT_FLG", con);
			
			ps_branches = con
					.prepareStatement("select * from BRANCHMSTR where BRM_BRNCD=(select BRM_BRNCD from BRANCHMSTR where BRM_MICRCD=?)");
			ps_allBranches = con.prepareStatement("select * from BRANCHMSTR");
			ps_insert = con
					.prepareStatement("insert into RETURNINWARD values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
			String return_inwardPath = Configuration
					.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
					+ "/ReturnInward/";
			String textFileName = "To_CBS_Return_Inward.txt";
			FileWriter fstream = new FileWriter(new File(path + "/" + textFileName),true);
			out = new PrintWriter(fstream);
			XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
			// System.out.println("**** 1 *****");
			
			XMLEventReader xmlEventReader = xmlInputFactory
					.createXMLEventReader(new FileInputStream(path + "/"
							+ fileName));
			// System.out.println("**** 2 *****");
			StringBuffer udk = new StringBuffer();
			String record = "";
			String udk_str = "";
			String singleRecord = "";
			String presentingBankRoutNo = "";
			String serialNo = "";
			String returnReason = "";
			String udk_PresentmentDate = "";
			String udk_PresentingBankRoutNo = "";
			String udk_CycleNo = "";
			String udk_ItemSeqNo = "";
			String presentmentDateDB = "";
			String clearingType = "";
			String rti_olbc = "";
			String payeeaccno="";
			String sortCode="";
			String conti_cylno ="";
			StringBuffer allBranchStr = new StringBuffer(" ");
			String str11 = "", str22 = "", str33 = "", str44 = "", str55 = "", str66 = "", 
					str77 = "", str88 = "", str99 = "", str10 = "", str12 = "", str13 = "", str14 = "", str15 = "", str16 = "", str17 = "", str18 = "", str20 = "";
			while (xmlEventReader.hasNext()) {
				// System.out.println("**** 3 *****");
				XMLEvent event = xmlEventReader.nextEvent();
				if (event.isStartElement()) {
					// System.out.println("**** 3.1 *****");
					StartElement element = (StartElement) event;
					
					String elementName = element.getName().toString();
					String elementString = elementName.substring(
							elementName.lastIndexOf("}") + 1,
							elementName.length());
					System.out.println("elementString::" + elementString);
					// if(element.getName().toString().equals("Item"))

					if (elementString.equalsIgnoreCase("Item")) {
						// System.out.println("**** 4 *****"+
						// element.getName().toString());
						Iterator iterator = element.getAttributes();
						while (iterator.hasNext()) {// 1
							Attribute attribute = (Attribute) iterator.next();
							QName name = attribute.getName();
							String value = attribute.getValue();
							String nm = name.toString();
							int noOfcharToPad = 0;
							// System.out.println("Tag Name:"+nm);
							if (nm.equalsIgnoreCase("PresentingBankRoutNo")) {// PresentingBankRoutNo
								presentingBankRoutNo = value;
								presentingBankRoutNo = Configuration.lPad(
										presentingBankRoutNo, 9, "0");
								str11 = value;
								// ps_insert.setString(1,value);

								// record.append(presentingBankRoutNo);
								// System.out.println("presentingBankRoutNo:::"+presentingBankRoutNo);
							}// PresentingBankRoutNo
							else if (nm.equalsIgnoreCase("ReturnReasonComment")) {// ReturnReasonComment
																					// ps_insert.setString(2,value);
								str22 = value;

							}// ReturnReasonComment
							else if (nm.equalsIgnoreCase("SerialNo")) {// SerialNo
								serialNo = value;
								serialNo = Configuration.lPad(serialNo, 6, "0");
								// record.append(serialNo);
								// System.out.println("serialNo:::"+serialNo);
								// ps_insert.setString(3,value);
								str33 = value;
							}// SerialNo
							else if (nm.equalsIgnoreCase("TransCode")) {// TransCode
																		// ps_insert.setString(4,value);
								str44 =Configuration.lPad(value, 3, "0") ;
								// ps_insert.setString(4,value);
							}// TransCode
							else if (nm.equalsIgnoreCase("ReturnReason")) {// ReturnReason
								returnReason = value;
								returnReason = Configuration.lPad(returnReason,
										2, "0");
								// record.append(returnReason);
								// System.out.println("returnReason:::"+returnReason);
								// ps_insert.setString(5,value);
								str55 = value;
							}// ReturnReason
							else if (nm.equalsIgnoreCase("Amount")) {// amount
																		// ps_insert.setString(6,value);
								str66 = value;
							}// amount
							else if (nm.equalsIgnoreCase("AccountNo")) {// AccountNo
																		// ps_insert.setString(7,value);
								str77 = value;
							}// AccountNo
							else if (nm.equalsIgnoreCase("PresentmentDate")) {// PresentmentDate
								presentmentDateDB = value;
								udk_PresentmentDate = value;
								;
								// udk=udk+udk_PresentmentDate;
								// udk.append(Configuration.lPad(udk_PresentmentDate,8,"0"));
								udk_PresentmentDate = Configuration.lPad(
										udk_PresentmentDate, 8, "0");
								// System.out.println("udk:::"+udk);
								// ps_insert.setString(8,value);
								str88 = value;
							}// PresentmentDate
							else if (nm.equalsIgnoreCase("PayorBankRoutNo")) {// PayorBankRoutNo
								allBranchStr.append(value + "#");
								// ps_insert.setString(9,value);
								str99 = value;
							}// PayorBankRoutNo
							else if (nm.equalsIgnoreCase("ClearingType")) {// ClearingType
																			// ps_insert.setString(10,value);
								str10 = value;
								clearingType = Configuration
										.lPad(value, 2, "0");
								;

							}// ClearingType
							else if (nm.equalsIgnoreCase("CycleNo")) {// PresentingBankRoutNo
								udk_CycleNo = value;
								// udk.append(Configuration.lPad(udk_CycleNo,2,"0"));
								udk_CycleNo = Configuration.lPad(udk_CycleNo,
										2, "0");
								// System.out.println("udk:::"+value);
								// ps_insert.setString(11,udk_CycleNo);
								str12 = value;
							}// PresentingBankRoutNo
							else if (nm.equalsIgnoreCase("ItemSeqNo")) {// PresentingBankRoutNo
								udk_ItemSeqNo = value;
								udk_ItemSeqNo = Configuration.lPad(
										udk_ItemSeqNo, 14, "0");
								// System.out.println("udk:::"+udk);
								// ps_insert.setString(12,value);
								str13=value;
							//	System.out.println("udk_ItemSeqNo=="+udk_ItemSeqNo);
							//	System.out.println("udk_PresentmentDate=="+udk_PresentmentDate);
								//jayeshchanges start
								PreparedStatement pstOlbc=con.prepareStatement("select clo_olbc,clo_payee_accno,CLO_SORTCD,CLO_CYCLNO from clearingoutward where to_number(?)=to_number(clo_itemseqno) and CLO_DATE_DDMMYYYY=?");
								pstOlbc.setString(1, udk_ItemSeqNo);
								pstOlbc.setString(2,udk_PresentmentDate);
								//System.out.println("pstOlbc:::" + pstOlbc);
								ResultSet rsOlbc=pstOlbc.executeQuery();
								if(rsOlbc.next())
								{
									rti_olbc =rsOlbc.getString(1);
									payeeaccno=rsOlbc.getString(2);//jayeshchanges end
									sortCode=rsOlbc.getString(3);
									conti_cylno=rsOlbc.getString(4);
								}
								//System.out.println("rti_olbc:::" + rti_olbc);
								//System.out.println("payeeaccno:::" + payeeaccno);
								//System.out.println("sortCode:::" + sortCode);
								//System.out.println("conti_cylno:::" + conti_cylno);
								rsOlbc.close();
								pstOlbc.close();
							}// PresentingBankRoutNo
							
						}// 1
					}// end if
					else if (elementString.equalsIgnoreCase("AddendA")) {// else
																			// if
						udk_str = udk_PresentmentDate + presentingBankRoutNo
								+ udk_CycleNo + udk_ItemSeqNo;
						udk_str = Configuration.rPad(udk_str, 80, " ");
						// System.out.println("udk:::"+udk_str);
						// singleRecord="presentingBankRoutNo:"+presentingBankRoutNo+" "+"serialNo:"+serialNo+" "+"udk_str:"+udk_str+" "+"returnReason:"+returnReason+"\n";//new
						// String(record)+" "+udk_str;
						// new
						//jayesh change start
						payeeaccno = Configuration.lPad(
								payeeaccno, 16, "0");
					String	cbsVendorbrf=Configuration.getConfValByNm("CFG_CBS_VENDOR",con);
					  if (cbsVendorbrf.equalsIgnoreCase("FINACLE"))
			            {
			              //System.out.println("rti_olbc==" + rti_olbc);
			              String newdate = rti_olbc.substring(6, 8) + rti_olbc.substring(4, 6) + rti_olbc.substring(0, 4);
			              rti_olbc = newdate + rti_olbc.substring(8);
			            //  System.out.println("rti_olbc==" + rti_olbc);
			            }
						
							singleRecord = presentingBankRoutNo + serialNo
									+ udk_str + "I" + returnReason + "00000000FIN"
									+ clearingType + rti_olbc ;
		
					if(cbsVendorbrf.equalsIgnoreCase("FINACLE"))
					{
						long amount=Long.parseLong(str66);
						String Amount1=Configuration.lPad(Long.toString(amount),18,"0");
						sortCode=sortCode.substring(3);
					
						
							singleRecord = singleRecord+payeeaccno+sortCode+Amount1;
					}
						
						//jay change stop
						// String(record)+" "+udk_str;
						
					//System.out.println("@@@@conti_cylno:::"+conti_cylno);
					if (conti_cylno!=null && !conti_cylno.isEmpty())
					{
						singleRecord=singleRecord+conti_cylno;
						//System.out.println("After adding cylno singleRecord:::"+singleRecord);
					}
					//System.out.println("singleRecord:::"+singleRecord);
						//System.out.print("\n XML READER @@@@ENCRY_DECRYPT_FLG="+ENCRY_DECRYPT_FLG);
						if(ENCRY_DECRYPT_FLG.equalsIgnoreCase("Y"))
						{
							//System.out.print("\n 1111 Inside if of encrpt decrypt ");
							ps_values = con.prepareStatement("select hocust.ENCRYPT_STRING('"+singleRecord+"') from dual");
							rs1 = ps_values.executeQuery();
							if (rs1.next())
							{
								singleRecord = rs1.getString(1);
								out.println(singleRecord);
								//System.out.print("\n 1111 after rs.getString(1)="+rs1.getString(1));
							}
							//System.out.print("\n 1111 a1ter readLine="+singleRecord);
						}
						else			
						{
							//System.out.print("\n 1111 OUTSIDE if of encrpt decrypt ");
							out.println(singleRecord);
						}
							//-----					
						out.flush();

						// now read further tags to insert it into table
						Iterator iterator = element.getAttributes();
						while (iterator.hasNext()) {// 1

							Attribute attribute = (Attribute) iterator.next();
							QName name = attribute.getName();
							String value = attribute.getValue();
							String nm = name.toString();
							System.out.println(" ------ inside AddendA Name:"
									+ nm);
							if (nm.equalsIgnoreCase("IFSC")) {// 1.1
																// ps_insert.setString(13,value);
								str14 = value;
							}// 1.1
							else if (nm.equalsIgnoreCase("DepositorAcct")) {// 1.1
																			// ps_insert.setString(14,value);
								str15 = value;
							}// 1.1
							else if (nm.equalsIgnoreCase("BOFDBusDate")) {// 1.1
																			// ps_insert.setString(15,value);
								str16 = value;
							}// 1.1
							else if (nm.equalsIgnoreCase("BOFDRoutNo")) {// 1.1
																			// ps_insert.setString(16,value);
								str17 = value;
							}// 1.1
						}// 1	System.out.println("end element");
						ps_insert.setString(1, str11);
						ps_insert.setString(2, str22);
						ps_insert.setString(3, str33);
						ps_insert.setString(4, str44);
						ps_insert.setString(5, str55);
						ps_insert.setString(6, str66);
						ps_insert.setString(7, str77);
						ps_insert.setString(8, str88);
						ps_insert.setString(9, str99);
						ps_insert.setString(10, str10);
						ps_insert.setString(11, str11);
						ps_insert.setString(12, str13);
						ps_insert.setString(13, str14);
						ps_insert.setString(14, str15);
						ps_insert.setString(15, str16);
						ps_insert.setString(16, str17);
						ps_insert.setString(17, str18);
						ps_insert.setString(18, creationTime);
						ps_insert.setString(19, fileName);
						ps_insert.setString(20, Configuration.getDDMMYYYY());
						ps_insert.setString(21, rti_olbc);
						try {
							if (0 > ps_insert.executeUpdate())
								System.out.println("Record is inserted");
						} catch (SQLException e) {
							if (!(e.getMessage().indexOf("ORA-00001") > -1))
								throw new Exception(e.getMessage());
						}
					}// else if
				}
			}// outer while

			String upDownStyle = Configuration
					.getConfValByNm("CFG_INWD_SPLITSTYLE",con);
			String txtFilenm = Configuration
					.getConfValByNm("CFG_downloadpath_from_CHI",con)
					+ "/ReturnInward/" + textFileName;
			System.out.println("\n\tupDownStyle:" + upDownStyle);
			String branches = allBranchStr.toString();
			// upDownStyle="Separated";
			// System.out.println("\n\tupDownStyle:"+upDownStyle);
			// System.out.println("\n\tbranches:"+branches);
			if (upDownStyle.equalsIgnoreCase("Capturing")) {// if
				String branchList[] = branches.split("#");
				for (int i = 0; i < branchList.length; i++) {// for
					ps_branches.setString(1, branchList[i]);
					ResultSet rs = ps_branches.executeQuery();
					while (rs.next()) {// while-1
						String Capfilename = Configuration
								.getConfValByNm("CFG_downloadpath_from_CHI",con)
								+ "/ReturnInward/";
						Capfilename = Capfilename + "/To_CBS_Return_Inward_"
								+ rs.getString(1) + ".txt";
						PrintWriter pw1 = new PrintWriter(new FileWriter(
								Capfilename));
						BufferedReader br = new BufferedReader(new FileReader(
								txtFilenm));
						String readLine = "";
						while ((readLine = br.readLine()) != null) {// while-2
							if (readLine.substring(0, 9).equalsIgnoreCase(
									branchList[i])) {
								System.out.println("\n\t readLine:" + readLine);
								pw1.println(readLine);
							}
						}// while-2
						br.close();
						pw1.flush();
						pw1.close();
					}// while-1
				}// for
			}// if
			else if (upDownStyle.equalsIgnoreCase("Seperated")) {// else-if
				ResultSet rs = ps_allBranches.executeQuery();
				while (rs.next()) {// while-1
					String scanningBrn = rs.getString(4);
					String Capfilename = Configuration
							.getConfValByNm("CFG_downloadpath_from_CHI",con)
							+ "/ReturnInward/";
					Capfilename = Capfilename + "/To_CBS_Return_Inward_"
							+ rs.getString(1) + ".txt";
					
					System.out.println("\n\t Capfilename :" + Capfilename);
					PrintWriter pw1 = new PrintWriter(new FileWriter(
							Capfilename));
					BufferedReader br = new BufferedReader(new FileReader(
							txtFilenm));
					String readLine = "";
					while ((readLine = br.readLine()) != null) {// while-2
						if (readLine.substring(0, 9).equalsIgnoreCase(
								scanningBrn)) {
							pw1.println(readLine);
						}
					}// while-2
					br.close();
					pw1.flush();
					pw1.close();
				}// while-1
			}// else-if
			status = true;
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			System.out.println("FileNotFoundException:::" + e.getMessage());
			status = false;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Error while reading XML\n" + e.getMessage());
			status = false;
		} finally {
			try {
				if (ps_insert != null) {

					ps_insert.close();
				}
				if (out != null) {
					out.close();

				}
				if (con != null) {
					con.close();
				}

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		System.out.println("Exit from readBRF():::" + status);
		return status;
	}// end readBRF
	
	
	
	public static void createRwExtract( String filePath )
	{
		try
		{
		Connection con = null;
		con = Configuration.getConnection();
		PreparedStatement pst = null;
		ResultSet rs=null;
		PrintWriter out=null;
		String path = filePath;
		
		String Prsortcode="",Drsortcode="",Cledate="", ImageId="",RejCode="",MicrAccNum="", Account_nm="",Amount="",Cheque_NO="",ItemSeqNo="",Trans_Code="",Branch_code="", OACK="",space1="",space2="",space3="",space4="",space5="";
		
		String BankSortcode = Configuration
				.getConfValByNm("CFG_VENDOR_ID",con);
		String date=Configuration.getDDMMYYYY();
		String time=Configuration.getHHMISS();
		String textFileName = "RW_Extract_"+BankSortcode+"_"+date+"_"+time+".dat";
		FileWriter fstream = new FileWriter(path + "/" + textFileName);
		out = new PrintWriter(fstream);
		String qry="select * from CLEARINGOUTWARD  join RETURNINWARD on (CLO_DATE_DDMMYYYY=RTI_PRESENTMENTDATE and to_number(CLO_ITEMSEQNO)=to_number(RTI_ITEMSEQNO))"
				+"inner join RETINWRETCODESAXIS on (to_number(RETCODE)=to_number(RTI_RETURNREASON)) where RTI_DDMMYYYY=? ";
		
		System.out.println("Connection Successfull");
		pst = con.prepareStatement(qry);
		pst.setString(1,Configuration.getDDMMYYYY());
		//pst.setInt(2,0);
		rs = pst.executeQuery();
		
			while (rs.next()) 
			{
				 Prsortcode=rs.getString("CLO_BOFD");
				 Prsortcode=Configuration.lPad(Prsortcode,9," ");
				 
				 Drsortcode=rs.getString("CLO_SORTCD");
				 Drsortcode=Configuration.lPad(Drsortcode,9," ");
				 
				 Cledate=rs.getString("RTI_PRESENTMENTDATE");
				 //Cledate=Configuration.lPad(Cledate,8," ");
				 
				 Amount=rs.getString("RTI_AMOUNT");
				// Amount=Amount.replaceFirst("^0+(?!$)", "");
				 //String Amount1=Amount.substring(0,Amount.length()-2);
				 Amount=Configuration.lPad(Amount,13,"0");
				 
				 Cheque_NO=rs.getString("CLO_CHQNO");
				 Cheque_NO=Configuration.lPad(Cheque_NO,6," ");
				 
				 ItemSeqNo=rs.getString("RTI_ITEMSEQNO");
				 //ItemSeqNo=Configuration.lPad(ItemSeqNo,10," ");
				 //ItemSeqNo=ItemSeqNo.length()==10?ItemSeqNo:ItemSeqNo.substring(ItemSeqNo.length()-10);
				 ItemSeqNo=Configuration.lPad(" ",10," ");
				 
				 ImageId=rs.getString("RTI_ITEMSEQNO");
				 ImageId=Configuration.rPad(ImageId,80," ");
				 
				 Trans_Code=rs.getString("RTI_TRANSCODE");
				 Trans_Code=Configuration.lPad(Trans_Code,2," ");
				 
				 Account_nm=Configuration.getConfValByNm("CFG_SPNCBNK_ACNO",con);
						 Account_nm=Configuration.rPad(Account_nm,16," ");
				 
				 RejCode=rs.getString("RRETCODEAXIS");
				 
				 RejCode=Configuration.lPad(RejCode,2,"0");
				 
				 MicrAccNum=rs.getString("CLO_DRAWEE_ACCNO");
				 MicrAccNum=Configuration.lPad(MicrAccNum,10,"0");
				 MicrAccNum=MicrAccNum.length()==10?MicrAccNum:MicrAccNum.substring(MicrAccNum.length()-10);				 
				
				 space1=Configuration.lPad(space1,10, " ");
				 space2=Configuration.lPad(space2,30, " ");
				 space3=Configuration.lPad(space3,8, " ");

				 OACK=Drsortcode+Prsortcode+Cledate+Amount+Cheque_NO+ItemSeqNo+Trans_Code+MicrAccNum+Account_nm+space2+ImageId+"O"+RejCode+space3+"Y";
				System.out.println("OACK"+OACK);		 
				 out.println(OACK);
				 out.flush();
				 
			}
			out.close();
			rs.close();
			pst.close();
			con.close();
			fstream = new FileWriter(path + "/" + textFileName+".done");
			out = new PrintWriter(fstream);
			out.close();
		}
		catch (Exception ex) 
		{
			System.out.println("\n\t Exception in createRwExtract():" + ex);
			ex.printStackTrace();
			//return false;
		}
		
		
	}
	
	public int readCliSrNo( )
	{
		int status=1;
		//String str="";
		 
			Connection con = null;
			int counter=0;
			PreparedStatement pst = null;
			PreparedStatement pst1 = null;
		    try {
			
			con = Configuration.getConnection();
			String query="select count(*)  from CLEARINGINWARD where CLI_DDMMYYYY=?";
			String query1="select max(to_number(CLI_CLRSRNO)) from CLEARINGINWARD where CLI_DDMMYYYY=?";
			pst=con.prepareStatement(query);
			
			pst.setString(1,Configuration.getDDMMYYYY());
			ResultSet rs = pst.executeQuery();
			while (rs.next()) 
			{
				counter=rs.getInt(1);
			}
			rs.close();
			 pst.close();
			
			 System.out.println("counter sr no\n" +counter);
		    if (counter>0) {
		    	pst1 = con.prepareStatement(query1);
                 pst1.setString(1, Configuration.getDDMMYYYY());
                 ResultSet rs1 = pst1.executeQuery();
                 while (rs1.next())
                 {
                	 status=rs1.getInt(1);
                		System.out.println("status sr no\n" +status);
                	
                 }
                 status++;
                 rs1.close();
                 pst1.close();
		    }
		    else {
		    	status=1;
		    	
		    }
		    }// end try
			catch (Exception e) {// catch
				e.printStackTrace();
				System.out.println("Error while reading counter sr no\n" + e.getMessage());
				Configuration.writeLog("In readCliSrNo----"+e);
				
			}// catch
			finally {
				try {
					pst.close();
				} catch (Exception e) {
				}
				try {
				pst1.close();
				} catch (Exception e) {
				}
				
				try {
					con.close();
					} catch (Exception e) {
					}
			}
		return status;
	}
	public String readBPXF(ArrayList<String> xmlFiles, ArrayList<String> imgFiles,String cbs_conti_flg) //changes done by sam 30092024
	{// readBPXF
		String flg = "";
		String str_filename = "", fullline ="",cbsVendor="",SettlementDate = "",SessionNumber="",fileName="",korasFileName="";
		itemInfo = new ItemInformation();
		String CliSeqNo="",CFG_CBS_VERSION="";
		String CreationTime="";
		long imgFileSize = 0;
		System.out.println("*********** start readBPXF ----- " + fileName);
		int clrseqno=0;
		 int cycl_seqNo = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pst1 = null;
		PreparedStatement pst3 = null;
		PreparedStatement stmt_getSeqVal = null;
		PreparedStatement pst_cycl_cnt = null;
		PreparedStatement seq_cnt_query = null;
		ResultSet rs_fetch_cycl_time = null ;
		int counter = 0;
		long totalAmount=0;
		StringBuffer inwTxtBuffer=new StringBuffer();
		String BPIBF_fileName = null,_filenameKoras="",fulllineKoras="";
		ByteToImageConverter _objImageCretor = null;
		int dsLength = 0;
		PrintWriter pw = null,pw1=null,pw2=null;
		PrintWriter pwKoras = null;
		String CFG_CONTINUE_CLEARING_FLG="N";
		PreparedStatement cycl_time = null;
		ResultSet rs_cycl_time = null ;
		int cycl_fileno=0;
		String ENCRY_DECRYPT_FLG="";
		PreparedStatement ps_values = null;
		ResultSet rs_ency=null;
		try 
		{// try
			
			con = Configuration.getConnection();
			String upDownStyle = Configuration.getConfValByNm("CFG_INWD_SPLITSTYLE",con);
			String CFG_PPS_CONNECTED=Configuration.getConfValByNm("CFG_PPS_CONNECTED",con);
			CFG_CONTINUE_CLEARING_FLG=Configuration.getConfValByNm("CFG_CONTINUE_CLEARING_FLG",con);
			ENCRY_DECRYPT_FLG=Configuration.getConfValByNm("CFG_ENCRY_DECRYPT_FLG", con);
			
			//System.out.println("\n\t CFG_CONTINUE_CLEARING_FLG:" + CFG_CONTINUE_CLEARING_FLG);
			//System.out.println("\n\t cbs_conti_flg:" + cbs_conti_flg);
			cbsVendor=Configuration.getConfValByNm("CFG_CBS_VENDOR",con);
			FileInputStream fins = null;
			_objImageCretor = new ByteToImageConverter();
			String dir = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"ClearingInward/";
			double newver=2.1;
			String OURVERSIONNO=Configuration.getConfValByNm("CFG_OURVERSIONNO",con);
			System.out.print("OURVERSIONNO=====" + OURVERSIONNO);
			{
				String tempFileList[]=new File(dir).list();
				for(int i=0;i<tempFileList.length;i++)
				{
					String str=tempFileList[i];
					if(str.toLowerCase().indexOf("temp")>-1)
					{
						if(dir.toLowerCase().indexOf("smb://")>-1)
						{
							new SmbFile(dir+tempFileList[i]).delete();
						}
						else
						{
							FileUtils.forceDelete(new File(dir+tempFileList[i]));
						}
					}
				}
			}
			
			//korasFileName=Configuration.getMMDDYYYY()+Configuration.getHHMISS()+"_CBS Upload Filetemp.txt";;
			ResultSet rs_cycl_seq = null ;
			for(int m=0;m<xmlFiles.size();m++)
			{
				imgFileSize=0;
				
				pst = con.prepareStatement("insert into ClearingInward("
						+ "CLI_TRUNCATINGRTNO, CLI_PAYORBANKROUTNO, CLI_CREATIONDATE, CLI_AMOUNT, "
						+ "CLI_SERIALNO, CLI_RBISEQNO, CLI_TRANSCODE, CLI_ACCOUNTNO, CLI_PAYEENAME, "
						+ "CLI_INSTRUDATE, CLI_IMAGEFILE1, CLI_IMAGEFILE2, CLI_IMAGEFILE3, CLI_FULLLINE, "
						+ "CLI_ITEMSEQUENCENO, CLI_CLEARINGTYPE, CLI_PRESENTMENTDATE, CLI_CYCLENO, "
						+ "CLI_PRESENTINGBANKROUTNO, CLI_BOFDROUTNO,CLI_BOFDBUSDATE, CLI_DEPOSITORACCT, "
						+ "CLI_IFSC, CLI_MEMBERBNKSORTCODE, CLI_ISRETURNOUTWARDCHEQUE, CLI_DDMMYYYY, "
						+ "CLI_UNIQUENO, CLI_XMLFILENAME, CLI_DOCTYPE,CLI_CLRSRNO,CLI_CPPSFlAG,CLI_CONTI_CYCNO,CLI_CHEQ_NO,CLI_ITEM_EXPIRY_TIME,CLI_ENTRYDATE,CLI_CYCL_FILENO) "
						+ "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,sysdate,?)");
		
				pst1 = con.prepareStatement("select * from BRANCHMSTR where BRM_BRNCD=(select BRM_BRNCD from BRANCHMSTR "
						+ "where BRM_MICRCD=?)");
				pst3 = con.prepareStatement("select * from BRANCHMSTR where BRM_BRNCD=(select BRM_BRNCD from BRANCHMSTR "
						+ "where BRM_MICRCD=? and BRM_SCANNERYN='Y')");
				stmt_getSeqVal = con.prepareStatement("select SEQ_CLEARING_INWARD.nextVal from dual ");
				pst_cycl_cnt= con.prepareStatement("select nvl(max(CLI_CONTI_CYCNO),0)+ 1  from ClearingInward where CLI_DDMMYYYY='"+Configuration.getDDMMYYYY()+"'");//Configuration.getDDMMYYYY()
				cycl_time=con.prepareStatement("select cycl_no from CONTIUES_CYCLE where time_hh=(SELECT TO_CHAR(SYSDATE,'hh') FROM DUAL)");
				seq_cnt_query= con.prepareStatement("select nvl(max(CLI_CHEQ_NO),0),nvl(max(CLI_CYCL_FILENO),0) from ClearingInward where CLI_CONTI_CYCNO=? and CLI_DDMMYYYY='"+Configuration.getDDMMYYYY()+"'" );//Configuration.getDDMMYYYY() 
					
				//PreparedStatement fetch_cycl_time = null;
				//ResultSet rs_fetch_cycl_time = null ;
				System.out.println("\n m==="+m+ "@@@CFG_CONTINUE_CLEARING_FLG= "+CFG_CONTINUE_CLEARING_FLG);
		
				if( CFG_CONTINUE_CLEARING_FLG.equals("Y") && cbs_conti_flg.equals("Y"))//m==0 &&
				{			
								
					rs_cycl_time = cycl_time.executeQuery();
					if(rs_cycl_time.next())
					{
						cycl_seqNo = rs_cycl_time.getInt(1);
						System.out.println("For NPCI:cycl_seqNo==="+cycl_seqNo);
						pst.setInt(32, cycl_seqNo);						
					}
					System.out.println("For NPCI::::AXIS~~~ cycl_seqNo==="+cycl_seqNo);		
					rs_cycl_time.close();
					
					System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ");		
					seq_cnt_query.setInt(1, cycl_seqNo);
					System.out.println("For NPCI@@@seq_cnt_query===="+seq_cnt_query);
					ResultSet rs = seq_cnt_query.executeQuery();
					if(rs.next()) 
					{
						clrseqno = rs.getInt(1);
						cycl_fileno = rs.getInt(2);	
						System.out.println("For Before~ cycl_fileno==="+cycl_fileno);		
						if(m==0)
							cycl_fileno=cycl_fileno+1;
						
						System.out.println("For NPCI::::AXIS~~~ cycl_fileno==="+cycl_fileno);		
						pst.setInt(35, cycl_fileno);	
						System.out.println("For NPCI::::AXIS clrseqno item_seqNo==="+clrseqno);
					}
					rs.close();
				}
				else
				{
				
					pst.setString(32,"" );
					pst.setString(35, "");	
					System.out.println("\n else  of m==0 && CFG_CONTINUE_CLEARING_FLG.equals(Y)");
				}
				fileName=xmlFiles.get(m);
				str_filename = xmlFiles.get(m);
				BPIBF_fileName = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+ "ClearingInward/" + imgFiles.get(m);
				
				String bpxfFilePath = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)	+ "/ClearingInward/";
				File file = new File(dir + "/" + fileName);
				if (file.isFile()) 
				{// if(file.isFile())
					//StringBuffer allStr = new StringBuffer("");
					this.fileName = file.getName();// fileName;
					String fullFIlePath = dir + fileName;
					XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
					XMLEventReader xmlEventReader = xmlInputFactory
						.createXMLEventReader(new FileInputStream(fullFIlePath));
					String CreationDate = "";
					String PayorBankRoutNo = "", TruncatingRTNo = "", SerialNo = "", TransCode = "", ItemSeqNo = "", ClearingType = "", cycleNo = "";
					String Payeename="";
					String docType="";
					String imageFile1 = "", imageFile2 = "", imageFile3 = "";
					String branches = "", Amount = "", AccountNo = "", presentmentDate = "";
					//CliSeqNo=cil_clrseqno++;
					int ImageViewDetailCnt = 0;
					String _filename = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"/ClearingInward/";
				
					String clearingType = Configuration.lPad(fileName.split("_")[2], 2, "0");
					
				
					
					_filename = _filename + "/" + clearingType+ "_To_CBS_Clearing_Inwardtemp.txt";
					
					/*if(cbsVendor.equalsIgnoreCase("KORAS"))
					{
						_filenameKoras =  Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"/ClearingInward/"+korasFileName;
					}*/
					pw = new PrintWriter(new FileWriter(_filename, true));// append mode
					StringBuffer imgDs1 = new StringBuffer("~");
					StringBuffer imgDs2 = new StringBuffer("~");
					int imgDsCnt = 0;
					String PresentingBankRoutNo = "", BOFDRoutNo = "", BOFDBusDate = "", DepositorAcct = "", IFSC = "",CPPS_Flag="N";
					int imgNmCnt = 0;
					int count=1;
					String item_expiry = null;
					while (xmlEventReader.hasNext()) 
					{// 1
						
						XMLEvent event = xmlEventReader.nextEvent();
						if (event.isStartElement()) 
						{// 2
							StartElement element = (StartElement) event;
							String tagName=element.getName().getLocalPart();
							if (tagName.equalsIgnoreCase("FileHeader")) 
							{// 2--1
								Iterator iterator = element.getAttributes();
								while (iterator.hasNext()) 
								{// 4
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
									if (nm.equalsIgnoreCase("CreationDate")) {
										CreationDate = value;
									}
									if(nm.equalsIgnoreCase("CreationTime")) {
										CreationTime = value;
										System.out.println("\n CreationTime="+CreationTime);
									}
									if (nm.equalsIgnoreCase("SettlementDate")) {
										SettlementDate = value;
									}
									if (nm.equalsIgnoreCase("SessionNumber")) {
										SessionNumber = value;
									}
								}// 4
							}
							if (tagName.equalsIgnoreCase("Item")) 
							{// 3
								counter++;
								Iterator iterator = element.getAttributes();
								Payeename = "   ";
								CPPS_Flag="N";
								while (iterator.hasNext()) 
								{// 4
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
									if (nm.equalsIgnoreCase("ItemSeqNo")) 
									{
										ItemSeqNo = null;
										ItemSeqNo =value;
									}
									if (nm.equalsIgnoreCase("SerialNo")) {
										itemInfo.setSerialNumber(value);
									}
									if (nm.equalsIgnoreCase("PayorBankRoutNo")) {
										PayorBankRoutNo = null;
										PayorBankRoutNo = value;
										if (branches.indexOf(PayorBankRoutNo + "#") == -1) {
											branches = branches + PayorBankRoutNo
													+ "#";
										}
									}
									if (nm.equalsIgnoreCase("PresentmentDate")) {
										presentmentDate = null;
										presentmentDate = value;
									}
									if (nm.equalsIgnoreCase("TruncatingRTNo")) {
										TruncatingRTNo = null;
										TruncatingRTNo = value;
										// allStr.append(TruncatingRTNo);
									}
									if (nm.equalsIgnoreCase("Amount")) {
										Amount = null;
										Amount = value;
										totalAmount=totalAmount+(Long.parseLong(Amount));
									}
									if (nm.equalsIgnoreCase("SerialNo")) {
										SerialNo = null;
										SerialNo = value;
									}
									if (nm.equalsIgnoreCase("AccountNo")) {
										AccountNo = null;
										AccountNo = value;
										if(cbsVendor.equalsIgnoreCase("FINACLE"))
										 AccountNo=validatetrncd_finacle(TransCode,AccountNo);
									}
									if (nm.equalsIgnoreCase("TransCode")) {
										TransCode = null;
										TransCode = "" + Integer.parseInt(value);
										if(cbsVendor.equalsIgnoreCase("FINACLE"))
										 AccountNo=validatetrncd_finacle(TransCode,AccountNo);
									}
									if (nm.equalsIgnoreCase("ClearingType")) {
										ClearingType = null;
										if(value.equals("99"))
										{
											ClearingType ="01";	
											specialVal=value;
										}
										else 
										{
											ClearingType = value;
										}
										
									}
									if (nm.equalsIgnoreCase("CycleNo")) {
										cycleNo = null;
										cycleNo = value;
									}
									if (nm.equalsIgnoreCase("PresentingBankRoutNo")) {
										PresentingBankRoutNo = null;
										PresentingBankRoutNo = value;
	
									}
									if (nm.equalsIgnoreCase("UserField")) {
										Payeename = null;
										Payeename = value;
									}
									if (nm.equalsIgnoreCase("DocType")) {
										docType = null;
										docType = value;
									}
									if (nm.equalsIgnoreCase("CPPS_Flag") || nm.equalsIgnoreCase("PPS_Flag")) {
										System.out.println("*****sharayu CPPS_Flag/PPS_Flag nm=="+nm);
										CPPS_Flag = null;
										CPPS_Flag = value;		
									}
									if (nm.equalsIgnoreCase("ItemExpiryTime")) {
										item_expiry = null;
										item_expiry = value;
									}
								}// 4
							}// 3
							if (tagName.equalsIgnoreCase("AddendA")) 
							{// 3.1
								Iterator iterator = element.getAttributes();
								while (iterator.hasNext()) 
								{// 1
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
	
									if (nm.equalsIgnoreCase("BOFDRoutNo")) {
										BOFDRoutNo = null;
										BOFDRoutNo = value;
									}
									if (nm.equalsIgnoreCase("BOFDBusDate")) {
										BOFDBusDate = null;
										BOFDBusDate = value;
									}
									if (nm.equalsIgnoreCase("DepositorAcct")) {
										DepositorAcct = null;
										DepositorAcct = value;
									}
									if (nm.equalsIgnoreCase("IFSC")) {
										IFSC = null;
										IFSC = value;
									}
								}// 1
							}// 3.1
							if (tagName.equals("ImageViewDetail")) 
							{// 5
								ImageViewDetailCnt++;
								Iterator iterator = element.getAttributes();
								imgbn = new ImageBean();
								while (iterator.hasNext()) 
								{// 6
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
									if (nm.equals("ViewSideIndicator"))// {}
										imgbn.setViewSideIndicator(value);
									if (nm.equals("ViewFormat"))// {}
										imgbn.setViewFormat(value);
								}// 6
								if (ImageViewDetailCnt % 3 == 1) 
								{
									imageFile1 = null;
									imageFile1 = "f_"+ ItemSeqNo.substring(0,ItemSeqNo.length() >= 9 ? 9: ItemSeqNo.length())
											+ SerialNo
											+ Configuration.lPad("" + imgNmCnt, 3,"0");
									imageFile1 = Configuration.lPad(imageFile1, 27,"0");
									/*if(cbsVendor.equalsIgnoreCase("KORAS"))
									{
										imageFile1="FTT"+PayorBankRoutNo.substring(6)+SerialNo+CreationDate+TruncatingRTNo.substring(3)+ItemSeqNo.substring(ItemSeqNo.length()-10, ItemSeqNo.length());
									}*/
									imgbn.setImageFile(imageFile1 + ".tif");
								}
								if (ImageViewDetailCnt % 3 == 2) 
								{
									imageFile2 = null;
									imageFile2 = "r_"+ ItemSeqNo.substring(0,ItemSeqNo.length() >= 9 ? 9: ItemSeqNo.length())
											+ SerialNo
											+ Configuration.lPad("" + imgNmCnt, 3,"0");
									imageFile2 = Configuration.lPad(imageFile2, 27,"0");
									/*if(cbsVendor.equalsIgnoreCase("KORAS"))
									{
										imageFile2="BTT"+PayorBankRoutNo.substring(6)+SerialNo+CreationDate+TruncatingRTNo.substring(3)+ItemSeqNo.substring(ItemSeqNo.length()-10, ItemSeqNo.length());
									}*/
									imgbn.setImageFile(imageFile2 + ".tif");
								}
								if (ImageViewDetailCnt % 3 == 0) 
								{
									imageFile3 = "f_"+ ItemSeqNo.substring(0,ItemSeqNo.length() >= 9 ? 9: ItemSeqNo.length())
											+ SerialNo
											+ Configuration.lPad("" + (imgNmCnt++),3, "0") + "_G";
									imageFile3 = Configuration.lPad(imageFile3, 27,"0");
									/*if(cbsVendor.equalsIgnoreCase("KORAS"))
									{
										imageFile3="FTJ"+PayorBankRoutNo.substring(6)+SerialNo+CreationDate+TruncatingRTNo.substring(3)+ItemSeqNo.substring(ItemSeqNo.length()-10, ItemSeqNo.length());
									}*/
									imgbn.setImageFile(imageFile3 + ".jpg");
									imageFile2 = Configuration.lPad(imageFile2, 27,"0");
									imageFile1 = Configuration.lPad(imageFile1, 27,"0");
									TruncatingRTNo = Configuration.lPad(TruncatingRTNo, 9, "0");
									PayorBankRoutNo = Configuration.lPad(PayorBankRoutNo, 9, "0");
									//CreationDate = CreationDate;
									Amount = Configuration.lPad(Amount, 13, "0");
									SerialNo = Configuration.lPad(SerialNo, 6, "0");
									String RBISeqNo = ItemSeqNo.length() > 10 ? ItemSeqNo
											.substring(ItemSeqNo.length() - 10,ItemSeqNo.length())
											: Configuration.lPad(ItemSeqNo, 10, "0");
											
	                            if(Double.parseDouble(OURVERSIONNO)>=newver)
									{
	                            	TransCode = Configuration.lPad("" + Integer.parseInt(TransCode),3,"0");
	                            	
									}
	                            else{
	                            	TransCode = Configuration.lPad("" + Integer.parseInt(TransCode),2,"0");
	                            }
									AccountNo = AccountNo.length() > 10 ? AccountNo.substring(AccountNo.length() - 10,
													AccountNo.length()): Configuration.lPad(AccountNo, 10, "0");
									
									Payeename = Configuration.lPad(Payeename, 50," ");
	
									String InstruDate = CreationDate;
									String cycleNumber = "";
									
									String UnqDocKey= CreationDate	+ PayorBankRoutNo + cycleNumber	+ ItemSeqNo;
									
									UnqDocKey = Configuration.rPad(UnqDocKey, 80,"0");
									
	                            
									
									// pw.println(TruncatingRTNo+PayorBankRoutNo+CreationDate+Amount+SerialNo+RBISeqNo+TransCode+AccountNo+Payeename+InstruDate+imageFile1+imageFile2+imageFile3+UnqDocKey);
								
									pst.setString(1, TruncatingRTNo);
									pst.setString(2, PayorBankRoutNo);
									pst.setString(3, CreationDate);
									pst.setString(4, Amount);
									pst.setString(5, SerialNo);
									pst.setString(6, RBISeqNo);
									pst.setString(7, TransCode);
									pst.setString(8, AccountNo);
									pst.setString(9, Payeename);
									pst.setString(10, InstruDate);
									pst.setString(11, imageFile1);
									pst.setString(12, imageFile2);
									pst.setString(13, imageFile3);
	
									AccountNo = AccountNo.length() > 10 ? AccountNo
											.substring(AccountNo.length() - 10,
													AccountNo.length())
											: Configuration
													.lPad(AccountNo, 10, "0");
									
									String draweeBankSortCode = Configuration.getDraweeSortCode(PayorBankRoutNo);
									CliSeqNo=Configuration.lPad(Integer.toString(cil_clrseqno++),14,"0");
									
									if(Double.parseDouble(OURVERSIONNO)>=newver)
									{
									fullline = BOFDRoutNo//TruncatingRTNo
												+ draweeBankSortCode + CreationDate
												+ Amount + SerialNo + RBISeqNo
												+ Configuration.lPad("" + Integer.parseInt(TransCode),3,"0")+ AccountNo + Payeename
												+ InstruDate + imageFile1 + imageFile2
												+ imageFile3 + UnqDocKey
												+ PayorBankRoutNo + ClearingType+Configuration.lPad(CliSeqNo,20," ");
										if(CFG_PPS_CONNECTED.equalsIgnoreCase("Y"))
										{
											fullline=fullline+CPPS_Flag;
										}
								
									}
									else{
									fullline = BOFDRoutNo//TruncatingRTNo
											+ draweeBankSortCode + CreationDate
											+ Amount + SerialNo + RBISeqNo
											+ Configuration.lPad("" + Integer.parseInt(TransCode),2,"0")+ AccountNo + Payeename
											+ InstruDate + imageFile1 + imageFile2
											+ imageFile3 + UnqDocKey
											+ PayorBankRoutNo + ClearingType;
										if(CFG_PPS_CONNECTED.equalsIgnoreCase("Y"))
										{
											fullline=fullline+CPPS_Flag;
										}
									
									}
									
									
									pst.setString(15, ItemSeqNo);
									if(specialVal.equals("99"))
									{
										ClearingType ="99";	
									}
									/*else 
									{
										ClearingType ="01";	
									}*/
									pst.setString(16, ClearingType); 
									pst.setString(17, presentmentDate);
									pst.setString(18, cycleNo);
									pst.setString(19, PresentingBankRoutNo);
									pst.setString(20, BOFDRoutNo);// 111
									pst.setString(21, BOFDBusDate);
									pst.setString(22, DepositorAcct);
									pst.setString(23, IFSC);
									
									pst.setString(24, draweeBankSortCode);
									
									if (draweeBankSortCode
											.equalsIgnoreCase("000000000"))
										pst.setString(25, "Y");
									else
										pst.setString(25, "N");
									
									ResultSet rs_seq = stmt_getSeqVal
											.executeQuery();
									String seqNo = "";

									if (rs_seq.next()) {
										seqNo = rs_seq.getString(1);
										seqNo = Configuration.lPad(seqNo, 15, "0");
									}
									rs_seq.close();
									pst.setString(26, Configuration.getDDMMYYYY());// CLI_DDMMYYYY
									pst.setString(27, seqNo);// CLI_UNIQUENO
									
									pst.setString(28, str_filename);
									pst.setString(29, docType);
									
									pst.setString(30, CliSeqNo);
									pst.setString(31, CPPS_Flag);
									
									//Sharayu added code for continues clearing -29092024
								
								/*if(cycl_seqNo == 0)
								{
									cycl_seqNo=cycl_seqNo+1;
									pst.setInt(32, cycl_seqNo);
								}
								*/
									if(CFG_CONTINUE_CLEARING_FLG.equals("Y"))
									{
								//	pst.setInt(32, cycl_seqNo);
										clrseqno=clrseqno+1;
										pst.setInt(33, clrseqno);
										pst.setString(34,item_expiry);			
										
										fullline=fullline+cycl_seqNo+clrseqno;//other bank
										
										//Gwalior bank change:
									/*	System.out.println("\nitem_expiry="+item_expiry);
										String itemexp_datetime ="";
										if(item_expiry != null)
										{
											int len=item_expiry.length();									         
											int firstlen=item_expiry.length()-14;
											itemexp_datetime = item_expiry.substring(firstlen,len);										    	
									        fullline=fullline+cycl_seqNo+CreationTime+itemexp_datetime;
										}
										
										System.out.println("\n@@@Gwalior bank fullline="+fullline);
										*/
									}
									else
									{
										pst.setString(33, "");
										pst.setString(34,"");
									}
								pst.setString(14, fullline);
								//----Added code here encyption 
								System.out.print("\n @@@@ENCRY_DECRYPT_FLG="+ENCRY_DECRYPT_FLG);
								if(ENCRY_DECRYPT_FLG.equalsIgnoreCase("Y"))
								{
									System.out.print("\n Inside if of encrpt decrypt ");
									ps_values = con.prepareStatement("select hocust.encrypt_string('"+fullline+"') from dual");
									rs_ency = ps_values.executeQuery();
									if (rs_ency.next())
									{
										fullline = rs_ency.getString(1);
										System.out.print("\n after rs.getString(1)="+rs_ency.getString(1));
									}
									System.out.print("\n after readLine="+fullline);
								}
								pw.println(fullline);									
								try {
										int cnt = pst.executeUpdate();
									} 
								    catch (SQLException e) {
										System.out.println(e + "      " + SerialNo
												+ "   " + PayorBankRoutNo);
										if (!(e.getMessage().indexOf("ORA-00001") > -1))
											throw new Exception("MyException...");
									}
									fullline = null;
									fulllineKoras="";
									pw.flush();
									System.gc();
								}
							}// 5
							if (tagName.equals("ImageViewData")) 
							{// 5
								Iterator iterator = element.getAttributes();
								while (iterator.hasNext()) 
								{// 6
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
									if (nm.equals("ImageDataLength"))// {}
									{
										imgbn.setImageDataLength(value);
										System.out.println("\n $$$ ImageDataLength value====="+value);
										imgFileSize = imgFileSize
												+ Long.parseLong(value);
										System.out.println("\n\n imgFileSize====="+imgFileSize);
									}
									if (nm.equals("ImageDataOffset"))// {}
										imgbn.setImageDataOffset(value);
									if (nm.equals("FileName"))// {}
									{
										fins = new FileInputStream(bpxfFilePath	+ value);
									}
								}// 6
							}// 5
							if (tagName.equals("ImageDS")) 
							{// 7
								Iterator iterator = element.getAttributes();
								while (iterator.hasNext()) 
								{// 8
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
									if (imgDsCnt == 0) 
									{
										if (nm.equalsIgnoreCase("DigitalSignatureMethod"))
											imgDs1.append("DigitalSignatureMethod="
													+ value + "~");// imgbn.setDigitalSignatureMethod(value);
										if (nm.equalsIgnoreCase("SecurityKeySize"))
											imgDs1.append("SecurityKeySize="
													+ value + "~");// imgbn.setSecurityKeySize(value);
										if (nm.equalsIgnoreCase("DigitalSignatureDataOffset"))
											imgDs1.append("DigitalSignatureDataOffset="
													+ value + "~");// imgbn.setDigitalSignatureDataOffset(value);
										if (nm.equalsIgnoreCase("DigitalSignatureLength")) {
											imgDs1.append("DigitalSignatureLength="
													+ value + "~");// imgbn.setDigitalSignatureLength(value);
											dsLength = Integer.parseInt(value);
											//imgFileSize = imgFileSize + dsLength;
										}
										if (nm.equalsIgnoreCase("Source"))
											imgDs1.append("Source=" + value+ "~");
									}
									if (imgDsCnt == 1) 
									{
										if (nm.equalsIgnoreCase("DigitalSignatureMethod"))
											imgDs2.append("DigitalSignatureMethod="	+ value + "~");// imgbn.setDigitalSignatureMethod(value);
										if (nm.equalsIgnoreCase("SecurityKeySize"))
											imgDs2.append("SecurityKeySize="+ value + "~");// imgbn.setSecurityKeySize(value);
										if (nm.equalsIgnoreCase("DigitalSignatureDataOffset"))
											imgDs2.append("DigitalSignatureDataOffset="+ value + "~");// imgbn.setDigitalSignatureDataOffset(value);
										if (nm.equalsIgnoreCase("DigitalSignatureLength")) 
										{
											System.out.println("imgDs2 DigitalSignatureLength====="+value);
											dsLength += Integer.parseInt(value);
											System.out.println("imgDs2 befor  dsLength====="+dsLength);
											imgDs2.append("DigitalSignatureLength="+ value + "~");// imgbn.setDigitalSignatureLength(value);
											System.out.println("imgDs2@ dsLength====="+dsLength);
											System.out.println("imgDs2# imgFileSize====="+imgFileSize);
											imgFileSize = imgFileSize + dsLength;
											System.out.println("imgDs2 imgFileSize====="+imgFileSize);
										}
										if (nm.equalsIgnoreCase("Source"))
											imgDs2.append("Source=" + value+ "~");
									}
								}// 8
								imgDsCnt++;
								if (imgDsCnt == 2) 
								{
									String imgDsFinal = "";
									if (imgDs1.indexOf("ECP.PBCC") > -1) 
									{
										imgDsFinal = imgDs1.toString();
									} 
									else 
									{
										imgDsFinal = imgDs2.toString();
									}
									
									String imgDsValues[] = imgDsFinal.split("~");
									for (int k = 0; k < imgDsValues.length; k++) 
									{
										String tagValues[] = imgDsValues[k].split("=");
										if (tagValues[0].equalsIgnoreCase("DigitalSignatureMethod"))// {}
											imgbn.setDigitalSignatureMethod(tagValues[1]);
										if (tagValues[0].equalsIgnoreCase("SecurityKeySize"))// {}
											imgbn.setSecurityKeySize(tagValues[1]);
										if (tagValues[0].equalsIgnoreCase("DigitalSignatureDataOffset"))// 
										{
											imgbn.setDigitalSignatureDataOffset(tagValues[1]);
											//imgFileSize = imgFileSize+Long.parseLong(tagValues[1]);
										}
										if (tagValues[0].equalsIgnoreCase("DigitalSignatureLength"))// 
										{
											imgbn.setDigitalSignatureLength(dsLength+ "");
											//imgFileSize = imgFileSize +Long.parseLong(tagValues[1]);//+ dsLength;
										}
									}
									imgDsCnt = 0;
								}
							}// 7
						}// 2
						if (event.isEndElement()) 
						{// 9
							
							EndElement element = (EndElement) event;
							if (element.getName().getLocalPart().equals("ImageViewDetail")) 
							{
								try 
								{
									String[] status = _objImageCretor.getImage(imgbn, fins).toString()
											.split("!@!");
									
									if(imgbn.getImageFile().contains("f_") && imgbn.getImageFile().contains(".jpg")&& Long.parseLong(imgbn.getImageDataLength())> 60000 )
									{TifToJpgConverter tifToJpgConverter=new TifToJpgConverter() ;
									//System.out.println("getImageDataLength====="+imgbn.getImageDataLength());
									tifToJpgConverter.convertTiffToJpg(new File(bpxfFilePath+"/Images/"+imgbn.getImageFile()));
								
									count++;
									}
									
								} catch (Exception e) 
								{}
							}
						}// 9
					}// 1
					
					if (upDownStyle.equalsIgnoreCase("Capturing")) 
					{
						String branchList[] = branches.split("#");
						for (int i = 0; i < branchList.length; i++) 
						{
							pst3.setString(1, branchList[i]);
							ResultSet rs = pst3.executeQuery();
							while (rs.next()) 
							{
								String Capfilename = Configuration.getConfValByNm("CFG_downloadpath_from_CHI",con)
									+ "/ClearingInward/";
								String notDrawnOnUs = Capfilename + clearingType
										+ "_To_CBS_NotDrawnOnUstemp.txt";
								Capfilename = Capfilename + "/" + clearingType
									+ "_To_CBS_Clearing_Inward_"+ rs.getString(1) + "temp.txt";
								pw1 = new PrintWriter(new FileWriter(Capfilename));
								
								BufferedReader br = new BufferedReader(
									new FileReader(_filename));
								String readLine = "";
								pw2 = null;
								while ((readLine = br.readLine()) != null) 
								{
									//System.out.println(readLine.substring(286,295)+"===="+Capfilename+"==="+branchList[i]+"=="+readLine.substring(40,46));
									if (readLine.substring(286,295).equalsIgnoreCase(branchList[i])) 
									{
										pw1.println(readLine);
									} 
									else if (readLine.substring(9, 18).equals("000000000")) 
									{
										pw2 = new PrintWriter(new FileWriter(notDrawnOnUs));
										pw2.println(readLine);
										pw2.flush();
									}
								}
							
								pw1.flush();
								pw1.close();
								br.close();
								if (pw2 != null) {
									pw2.close();
								}
								pw1 = null;
								br = null;
								TruncatingRTNo = null;
								PayorBankRoutNo = null;
								Amount = null;
								SerialNo = null;
								// RBISeqNo=null;
								TransCode = null;
								AccountNo = null;
								// Payeename=null;
								// InstruDate=null;
								imageFile1 = null;
								imageFile2 = null;
								imageFile3 = null;
								// fullline=null;
								ItemSeqNo = null;
								ClearingType = null;
								presentmentDate = null;
								cycleNo = null;
								PresentingBankRoutNo = null;
								BOFDRoutNo = null;
								BOFDBusDate = null;
								DepositorAcct = null;
								IFSC = null;
								System.gc();
							}
							rs.close();
							//con = null;
							rs = null;
							pst = null;
							System.gc();
						}
					} 
					else if (upDownStyle.equalsIgnoreCase("Separated")) 
					{
						String branchList[] = branches.split("#");
						for (int i = 0; i < branchList.length; i++) 
						{
							pst1.setString(1, branchList[i]);
							ResultSet rs = pst1.executeQuery();
							while (rs.next()) 
							{
								String Capfilename = Configuration
										.getConfValByNm("CFG_downloadpath_from_CHI",con)
										+ "/ClearingInward/";
								String notDrawnOnUs = Capfilename + clearingType
										+ "To_CBS_NotDrawnOnUstemp.txt";
								Capfilename = Capfilename + "/" + clearingType
										+ "_To_CBS_Clearing_Inward_"
										+ rs.getString(1) + "temp.txt";
								pw1 = new PrintWriter(new FileWriter(
										Capfilename));
								BufferedReader br = new BufferedReader(
										new FileReader(_filename));
								String readLine = "";
								pw2 = null;
								int stPos=0,endPos=0;
								if(Double.parseDouble(OURVERSIONNO)>=newver)
								{
									stPos=287;
									endPos=296;
								}
								else
								{
									stPos=286;
									endPos=295;
								}
								while ((readLine = br.readLine()) != null) 
								{
									if (readLine.substring(stPos,endPos).equalsIgnoreCase(branchList[i])) 
									{
										pw1.println(readLine);
									} 
									else if (readLine.substring(9, 18).equals("000000000")) 
									{
										pw2 = new PrintWriter(new FileWriter(notDrawnOnUs));
										pw2.println(readLine);
										pw2.flush();
									}
								}
								pw1.flush();
								pw1.close();
								br.close();
								pw1 = null;
								if (pw2 != null) {
									pw2.close();
								}
								br = null;
								TruncatingRTNo = null;
								PayorBankRoutNo = null;
								Amount = null;
								SerialNo = null;
								// RBISeqNo=null;
								TransCode = null;
								AccountNo = null;
								// Payeename=null;
								// InstruDate=null;
								imageFile1 = null;
								imageFile2 = null;
								imageFile3 = null;
								// fullline=null;
								ItemSeqNo = null;
								ClearingType = null;
								presentmentDate = null;
								cycleNo = null;
								PresentingBankRoutNo = null;
								BOFDRoutNo = null;
								BOFDBusDate = null;
								DepositorAcct = null;
								IFSC = null;
								System.gc();
							}
							rs.close();
							// pst.close();
							// con.close();
							//con = null;
							rs = null;
							pst = null;
							System.gc();
						}
					}
				}// if(file.isFile())
			
			
			
				File f = new File(BPIBF_fileName);
				System.out.println("\n\n Image File name=" + BPIBF_fileName);
				System.out.println("\n\n Image File Size=" + f.length());
				System.out.println("\n\n Image File Size=" + imgFileSize);
				flg="f.length()="+f.length()+"\timgFileSize="+imgFileSize;
				/*if( f.length()!=imgFileSize)
				{
					flg = flg+"FAULTYDOWNLOAD";
					System.out.println("Image Size Differes");
					return flg;
				}*/
				
			}	
			
			/*if(cbsVendor.equalsIgnoreCase("KORAS"))
			{
				System.out.println("creating file for koras");
				pwKoras = new PrintWriter(new FileWriter(_filenameKoras, true));// append mode
				pwKoras.print("Item Count:"+counter+"\n"); 
				pwKoras.print(inwTxtBuffer.toString());
				pwKoras.print("Item Count:"+counter+" Amount:");
				String amtStr=""+totalAmount;
				pwKoras.print(amtStr.substring(0,amtStr.length()-2)+"."+amtStr.substring(amtStr.length()-2));
				//s.substring(0,s.length()-2)+"."+s.substring(s.length()-2)
				pwKoras.flush();
				pwKoras.close();
				
			}*/
			pw.close();
			if(cbsVendor.equalsIgnoreCase("KORAS"))
			{
				if(dir.toLowerCase().indexOf("smb://")>-1)
				{
					Runtime.getRuntime().exec( "chmod -R 777 "+Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", con) );
				}
				Connection con1=Configuration.getConnection();
				con1.setAutoCommit(false);
				try
				{
					String query="select CLI_TRUNCATINGRTNO,CLI_PAYORBANKROUTNO,CLI_CREATIONDATE,CLI_AMOUNT,CLI_SERIALNO,"
							+ "CLI_RBISEQNO,CLI_TRANSCODE,CLI_ACCOUNTNO,nvl(ltrim(rtrim(CLI_PAYEENAME)),' ') CLI_PAYEENAME,CLI_INSTRUDATE,CLI_IMAGEFILE1, "
							+ "CLI_IMAGEFILE2,CLI_IMAGEFILE3,CLI_FULLLINE,CLI_ITEMSEQUENCENO,CLI_CLEARINGTYPE,"
							+ "CLI_PRESENTMENTDATE,CLI_CYCLENO,CLI_PRESENTINGBANKROUTNO,CLI_BOFDROUTNO,CLI_BOFDBUSDATE,"
							+ "lpad(nvl(CLI_DEPOSITORACCT,' '),16,' ') CLI_DEPOSITORACCT,CLI_IFSC,CLI_MEMBERBNKSORTCODE,CLI_ISRETURNOUTWARDCHEQUE,CLI_DDMMYYYY,"
							+ "CLI_UNIQUENO,CLI_XMLFILENAME,CLI_INSTRUMENT_ID from clearinginward where cli_ddmmyyyy=?";
							//+ "order by CLI_CLEARINGTYPE,CLI_TRUNCATINGRTNO";
					PreparedStatement korasPst=con1.prepareStatement(query,ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
					korasPst.setString(1, Configuration.getDDMMYYYY());
					ResultSet korasRs=korasPst.executeQuery();
					String imagePath=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", con1)+"/ClearingInward/Images/";
					int count=0;
					long total=0;
					while(korasRs.next())
					{
						String str=korasRs.getString("CLI_PAYORBANKROUTNO").substring(6)+korasRs.getString("CLI_SERIALNO")+
								//korasRs.getString("CLI_CREATIONDATE")
								Configuration.getYYYYMMDD()+korasRs.getString("CLI_TRUNCATINGRTNO").substring(3)+
								korasRs.getString("CLI_ITEMSEQUENCENO").substring(korasRs.getString("CLI_ITEMSEQUENCENO").length()-10,
										korasRs.getString("CLI_ITEMSEQUENCENO").length());
						String image1="FTJ"+str+".tif";
						File src1=new File(imagePath+korasRs.getString("CLI_IMAGEFILE1")+".tif");
						File dest1=new File(imagePath+image1);
						Configuration.writeLog("src1="+src1+"     dest1="+dest1);
						//src1.renameTo(dest1);
						FileUtils.moveFile(src1, dest1);
						korasRs.updateString("CLI_IMAGEFILE1", image1);
						
						String image2="FTT"+str+".tif";
						File src2=new File(imagePath+korasRs.getString("CLI_IMAGEFILE2")+".tif");
						File dest2=new File(imagePath+image2);
						Configuration.writeLog("src2="+src2+"     dest2="+dest2);
						//src2.renameTo(dest2);
						FileUtils.moveFile(src2, dest2);
						korasRs.updateString("CLI_IMAGEFILE2", image2);

						String image3="BTT"+str+".tif";
						File src3=new File(imagePath+korasRs.getString("CLI_IMAGEFILE3")+".jpg");
						File dest3=new File(imagePath+image3);
						Configuration.writeLog("src3="+src3+"     dest3="+dest3);
						//src3.renameTo(dest3);
						FileUtils.moveFile(src3, dest3);
						korasRs.updateString("CLI_IMAGEFILE3", image3);
						
						fulllineKoras=korasRs.getString("CLI_BOFDROUTNO")+korasRs.getString("CLI_PAYORBANKROUTNO")+
						//korasRs.getString("CLI_CREATIONDATE")+
						Configuration.getDDMMYYYY()+
						Configuration.lPad(""+Long.parseLong(korasRs.getString("CLI_AMOUNT")),13, "0")+
						korasRs.getString("CLI_SERIALNO")+
						korasRs.getString("CLI_ITEMSEQUENCENO").substring(korasRs.getString("CLI_ITEMSEQUENCENO").length()-10, 
								korasRs.getString("CLI_ITEMSEQUENCENO").length())+Configuration.lPad(""+Integer.parseInt(korasRs.getString("CLI_TRANSCODE")),2,"0")+
						Configuration.lPad("", 23, " ")+
						Configuration.lPad(image3, 40, "0")+
						Configuration.lPad(image2, 40, "0")+
						Configuration.lPad(image1, 40, "0")+
						//SettlementDate.substring(4)+SettlementDate.substring(2,4)+SettlementDate.substring(0,2)+
						Configuration.getYYYYMMDD()+
						korasRs.getString("CLI_PRESENTINGBANKROUTNO")+korasRs.getString("CLI_CYCLENO")+
						korasRs.getString("CLI_ITEMSEQUENCENO")+
						Configuration.rPad(korasRs.getString("CLI_PAYEENAME"),30, " ")+
						korasRs.getString("CLI_DEPOSITORACCT").substring(korasRs.getString("CLI_DEPOSITORACCT").length()-16, 
								korasRs.getString("CLI_DEPOSITORACCT").length());
						inwTxtBuffer.append(fulllineKoras+"\r\n");
						//CLI_DEPOSITORACCT/CLI_ACCOUNTNO
						korasRs.updateRow();
						count++;
						total+=Long.parseLong(korasRs.getString("CLI_AMOUNT"));
					}
					korasRs.close();
					korasPst.close();
					con1.commit();
					con1.close();
					System.out.println("creating file for koras");
					korasFileName=Configuration.getMMDDYYYY()+Configuration.getHHMISS()+"_CBS Upload Filetemp.txt";;
					_filenameKoras =  Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"/ClearingInward/"+korasFileName;
					pwKoras = new PrintWriter(new FileWriter(_filenameKoras, true));// append mode
					pwKoras.print("Item Count:"+count+"\r\n"); 
					pwKoras.print(inwTxtBuffer.toString());
					pwKoras.print("Item Count:"+count+" Amount:");
					String amtStr=""+total;
					pwKoras.print(amtStr.substring(0,amtStr.length()-2)+"."+amtStr.substring(amtStr.length()-2));
					//s.substring(0,s.length()-2)+"."+s.substring(s.length()-2)
					pwKoras.flush();
					pwKoras.close();
				}
				catch(Exception e)
				{
					con1.rollback();
					con1.close();
					e.printStackTrace();
					flg="ERROR~"+e;
					return flg;
				}
			}
			else if(cbsVendor.equalsIgnoreCase("FINACLE"))
			{
				String selQry="",uptQry="";
				System.out.println("cbs_vendor===="+cbsVendor);
				int count1=0;
				PreparedStatement ps1=null;
				if(CFG_PPS_CONNECTED.equalsIgnoreCase("Y"))
				{
					 /*selQry=" select (str1||lpad(''||SEQ_CLEINW_UNQNO.nextval,10,'0')||str2) as fileString ,"
								+ " lpad(''||SEQ_CLEINW_UNQNO.nextval,10,'0') as unino,CLI_IMAGEFILE1, CLI_IMAGEFILE2, CLI_IMAGEFILE3, CLI_CLRSRNO "
								+ "from (select ( CLI_PRESENTINGBANKROUTNO||'|'||CLI_PAYORBANKROUTNO||'|'||CLI_INSTRUDATE||'|'||"
								+" ltrim(to_char(to_number(CLI_AMOUNT/100) ,'999999999999.99'))||'|'||CLI_SERIALNO||'|') str1,('|'||"
		                        +" lpad(to_number(CLI_TRANSCODE),2,'0')||'|||'||trim(CLI_PAYEENAME)||'|'||'N'||'||'||CLI_PRESENTMENTDATE||CLI_CLEARINGTYPE||CLI_ITEMSEQUENCENO||CLI_PRESENTINGBANKROUTNO||'|'||"
		                        +" substr(CLI_ACCOUNTNO,-6)||'|'||CLI_CPPSFLAG) str2,CLI_IMAGEFILE1, CLI_IMAGEFILE2, CLI_IMAGEFILE3, CLI_CLRSRNO  from CLEARINGINWARD"
		                        +" left outer join BRANCHMSTR on CLI_PAYORBANKROUTNO=BRM_MICRCD   where CLI_DDMMYYYY=? and CLI_CLEARINGTYPE='01' "
		                        +" order by BRM_BRNCD ASC,CLI_TRANSCODE ASC)";*/
					
					selQry="select (str1||lpad(''||SEQ_CLEINW_UNQNO.nextval,10,'0')||str2) "
							+ "as fileString ,lpad(''||SEQ_CLEINW_UNQNO.nextval,10,'0') as unino,"
							+ "CLI_IMAGEFILE1, CLI_IMAGEFILE2, CLI_IMAGEFILE3, CLI_CLRSRNO from "
							+ "(select ( CLI_PRESENTINGBANKROUTNO||'|'||CLI_PAYORBANKROUTNO||'|'|| "
							+ "CLI_PRESENTMENTDATE||'|'|| CLI_INSTRUDATE||'|'||"
							+ "ltrim(to_char(to_number(CLI_AMOUNT/100) ,'999999999999.99'))||'|'||"
							+ "CLI_SERIALNO||'|') str1,('|'||lpad(to_number(CLI_TRANSCODE),2,'0')"
							+ "||'|||'||trim(CLI_PAYEENAME)||'|'||'N'||'||'||CLI_PRESENTMENTDATE||"
							+ "CLI_CLEARINGTYPE||CLI_ITEMSEQUENCENO||CLI_PRESENTINGBANKROUTNO||'|'||"
							+ "substr(CLI_ACCOUNTNO,-6)||'|'||CLI_CPPSFLAG) str2,CLI_IMAGEFILE1, "
							+ "CLI_IMAGEFILE2, CLI_IMAGEFILE3, CLI_CLRSRNO  from CLEARINGINWARD "
							+ "left outer join BRANCHMSTR on CLI_PAYORBANKROUTNO=BRM_MICRCD   "
							+ "where CLI_DDMMYYYY=? and CLI_CLEARINGTYPE='01' "
							+ "order by BRM_BRNCD ASC,CLI_TRANSCODE ASC)";
				}
				else {
					 selQry=" select (str1||lpad(''||SEQ_CLEINW_UNQNO.nextval,10,'0')||str2) as fileString ,"
								+ " lpad(''||SEQ_CLEINW_UNQNO.nextval,10,'0') as unino,CLI_IMAGEFILE1, CLI_IMAGEFILE2, CLI_IMAGEFILE3, CLI_CLRSRNO "
								+ "from (select ( CLI_PRESENTINGBANKROUTNO||'|'||CLI_PAYORBANKROUTNO||'|'||CLI_INSTRUDATE||'|'||"
								+" ltrim(to_char(to_number(CLI_AMOUNT/100) ,'999999999999.99'))||'|'||CLI_SERIALNO||'|') str1,('|'||"
		                        +" lpad(to_number(CLI_TRANSCODE),2,'0')||'|||'||trim(CLI_PAYEENAME)||'|'||'N'||'||'||CLI_PRESENTMENTDATE||CLI_CLEARINGTYPE||CLI_ITEMSEQUENCENO||CLI_PRESENTINGBANKROUTNO||'|'||"
		                        +" substr(CLI_ACCOUNTNO,-6)) str2,CLI_IMAGEFILE1, CLI_IMAGEFILE2, CLI_IMAGEFILE3, CLI_CLRSRNO  from CLEARINGINWARD"
		                        +" left outer join BRANCHMSTR on CLI_PAYORBANKROUTNO=BRM_MICRCD   where CLI_DDMMYYYY=? and CLI_CLEARINGTYPE='01' "
		                        +" order by BRM_BRNCD ASC,CLI_TRANSCODE ASC)";
				}
				uptQry="update CLEARINGINWARD set CLI_FULLLINE=? where CLI_DDMMYYYY=? and CLI_CLRSRNO=?";
				
				Connection con2=Configuration.getConnection();
				String ClgInwImgPath=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", con2);
				String sourcePath=ClgInwImgPath+"/ClearingInward/Images/";
				String destinationePath=ClgInwImgPath+"/ClearingInward/NewImages/";
				new File(destinationePath).mkdirs();
				StringBuffer finTxtBuffer=new StringBuffer();
				
				//InwardSubPosting_20180523_470_474
				String finFileName="InwardSubPosting_"+Configuration.getYYYYMMDD()+"_"
						+Configuration.getConfValByNm("CFG_BANKROUTINGCODE", con2).substring(3, 6)+"_"+Configuration.getConfValByNm("CFG_BANKROUTINGCODE", con2).substring(0, 3)+".txt";
				String _finFileName=  Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con2)+"/ClearingInward/"+finFileName;
				try
				{
					PrintWriter pwFIn = new PrintWriter(new FileWriter(_finFileName, true));
					PreparedStatement pst2=con2.prepareStatement(selQry);
					pst2.setString(1, Configuration.getDDMMYYYY());
					ResultSet rs2=pst2.executeQuery();
					while (rs2.next()) 
					{
						String ItemSeqNo1= rs2.getString("unino");
						String ItemSeqNo=Configuration.lPad(ItemSeqNo1,14,"0");
						String jpgImgName=rs2.getString("CLI_IMAGEFILE3");
						File s=new File(sourcePath+jpgImgName+".jpg");
						File d=new File(destinationePath+"/G"+ItemSeqNo+".jpg");
						FileUtils.copyFile(s, d);
						
						String ftiffImgName=rs2.getString("CLI_IMAGEFILE1");//CLI_IMAGEFILE1, CLI_IMAGEFILE2
						File s1=new File(sourcePath+ftiffImgName+".tif");
						File d1=new File(destinationePath+"/F"+ItemSeqNo+".tif");
						FileUtils.copyFile(s1, d1);
						
						String rtiffImgName=rs2.getString("CLI_IMAGEFILE2");//CLI_IMAGEFILE1, CLI_IMAGEFILE2
						File s2=new File(sourcePath+rtiffImgName+".tif");
						File d2=new File(destinationePath+"/R"+ItemSeqNo+".tif");
						FileUtils.copyFile(s2, d2);
						
						String fulllineFin=rs2.getString("fileString");
						finTxtBuffer.append(fulllineFin+"\n");
						count1++;
						
						//System.out.println("CliSeqNo=="+rs2.getString("CLI_CLRSRNO"));
						ps1=con.prepareStatement(uptQry);
						ps1.setString(1, fulllineFin);
						ps1.setString(2, Configuration.getDDMMYYYY());
						ps1.setString(3, rs2.getString("CLI_CLRSRNO"));
						ps1.executeUpdate();
						
												
					}
					ps1.close();
					rs2.close();
					pst2.close();
					con2.close();
					System.out.println("creating file for Fincle"+count1);
					pwFIn.print(finTxtBuffer.toString());
					pwFIn.flush();
					pwFIn.close();
					
				}
				catch(Exception e)
				{
					e.printStackTrace();
					flg = "ERROR~"+e;
				}
				
			}
			{
				String tempFileList[]=new File(dir).list();
				for(int i=0;i<tempFileList.length;i++)
				{
					String str=tempFileList[i];
					str=str.replaceAll("temp", "");
					
					{
						new File(dir+tempFileList[i]).renameTo(new File(dir+str));
					}
				}
			}
			flg="SUCCESS";
			
			 if (Configuration.getConfValByNm("CFG_CLRINWRD_UPDTFLG", con).equalsIgnoreCase("Y")) {
				 int deletcounter=0;
				 PreparedStatement pstdelcount = null;
					PreparedStatement pstdelcout1 = null;
				    try {
					
					
					String querydete="select count(*) from clearinginward_history where CLI_DDMMYYYY=?";
					String querydelet1="delete from clearinginward_history where CLI_DDMMYYYY=?";
					pstdelcount=con.prepareStatement(querydete);
					
					pstdelcount.setString(1,Configuration.getDDMMYYYY());
					ResultSet rsdete = pstdelcount.executeQuery();
					while (rsdete.next()) 
					{
						deletcounter=rsdete.getInt(1);
					}
					rsdete.close();
					pstdelcount.close();
					
					//con = null;
					
					 System.out.println("counter clearinginward_historyno\n" +deletcounter);
				    if (deletcounter>0) {
				    	pstdelcout1 = con.prepareStatement(querydelet1);
				    	pstdelcout1.setString(1, Configuration.getDDMMYYYY());
		                 ResultSet rsdel1 = pstdelcout1.executeQuery();
		                 if (rsdel1.next())
		                 {
		                	 //status=rsdel1.getInt(1);
		                		//System.out.println("status sr no\n" +status);
		                	
		                 }
		                 //status++;
		                 rsdel1.close();
		                 pstdelcout1.close();
		                 
		                 
				    }
				   
				    }// end try
					catch (Exception e) {// catch
						e.printStackTrace();
						System.out.println("Error while reading clearinginward_historyno\n" + e.getMessage());
						Configuration.writeLog("In clearinginward_historyno----"+e);
						
					}// catch
					
				 
				 
				 
				 
	                final PreparedStatement pt = con.prepareStatement("insert into clearinginward_history select * from clearinginward where cli_ddmmyyyy=?");
	                pt.setString(1, Configuration.getDDMMYYYY());
	                final int i = pt.executeUpdate();
	                if (i > 0) {
	                    flg = "SUCCESS";
	                }
	                else {
	                    flg = "FAILED";
	                }
	                pt.close();
	            }
			 fins.close();
		}// end try
		catch (Exception e) {// catch
			e.printStackTrace();
			System.out.println("Error while reading XML\n" + e.getMessage());
			Configuration.writeLog("In ReadBPXF----"+e);
			flg = "ERROR~"+e;
		}// catch
		finally {
			try {
				pst.close();
			} catch (Exception e) {
			}
			try {
			pst1.close();
			} catch (Exception e) {
			}
			try {
			pst3.close();
			} catch (Exception e) {
			}
			try {
			stmt_getSeqVal.close();
			} catch (Exception e) {
			}
			
			try {
			pw.close();
			} catch (Exception e) {
			}
			try {
			pwKoras.close();
			} catch (Exception e) {
			}
			try {
			pw1.close();
			} catch (Exception e) {
			}
			try {
			pw2.close();
			} catch (Exception e) {
			}
			try {
				con.close();
				} catch (Exception e) {
				}
		}
		System.out.println("****** 14 *****");
		System.out.println("CFG_CONTINUE_CLEARING_FLG=="+CFG_CONTINUE_CLEARING_FLG);
		if(CFG_CONTINUE_CLEARING_FLG.equals("Y"))
		{
			flg=flg+"~"+cycl_seqNo;
		}
		System.out.println("^^^^ Exit from readBPXF ^^^^^^^:::"+flg);
		return flg;
	}// end readBPXF

	// to read PXF
	public String readPXF(String fileName,int filecnt,String cbs_conti_flg) {// readPXF
		String flg = "SUCCESS";
		String str_filename = fileName.replace("/", "/");
		String path = "", singleRecord = "", fullline = "", draweeBankSortCode = "";
		String ItemSeqNo = "", PayorBankRoutNo = "", Amount = "", AccountNo = "", SerialNo = "", TransCode = "", PresentingBankRoutNo = "";
		String PresentmentDate = "", CycleNo = "", NumOfImageViews = "", ClearingType = "", DocType = "", MICRRepairFlags = "";
		String SpecialHandling = "", TruncatingRTNo = "", UserField = "", IQAIgnoreInd = "", CurrencyInd = "", SessionNo = "";
		String InternalSequenceNo = "", CreationDate = "", RBISeqNo = "", InstruDate = "", imageFile1 = "", imageFile2 = "";
		String imageFile3 = "", BOFDRoutNo = "", BOFDBusDate = "", DepositorAcct = "", IFSC = "", seqNo = "", UnqDocKey = "";
		String CliSeqNo,CPPS_Flag="N";
		int clrseqno=0;
		 int cycl_seqNo = 0;
		itemInfo = new ItemInformation();
		long imgFileSize = 0;
		int imgNmCnt = 0;
		System.out.println("*********** start hdfc readPXF *********** " + fileName);
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pst1 = null;
		PreparedStatement pst3 = null;
	     PreparedStatement cycl_time = null;
		 ResultSet rs_cycl_time = null ;
		PreparedStatement stmt_getSeqVal = null,pst_cycl_cnt=null,pst_cycl_cnt1=null,seq_cnt_query=null;
		int counter = 0;
		String BPIBF_fileName = null,item_expiry=null;
		// ByteToImageConverter _objImageCretor=null;
		int dsLength = 0;
		String fileNameArr[] = fileName.split("_");
		System.out.println("*********** 2 **** ");
		FileReader filereader;
		BufferedReader reader;
		PrintWriter pw = null,pw1=null,pw2=null;;
		String branches ="";
		ResultSet rs_cycl_seq,rs_seq_cnt_query;
		String CFG_CONTINUE_CLEARING_FLG="";
		int cycl_fileno=0; 
		String ENCRY_DECRYPT_FLG="";
		PreparedStatement ps_values = null;
		String clyNo=null;
		ResultSet rs_encypt=null;
		
		try {// try
			con = Configuration.getConnection();
			String upDownStyle = Configuration
					.getConfValByNm("CFG_INWD_SPLITSTYLE",con);
			path = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
					+ "ClearingInward/" + str_filename;
			String clearingType = fileName.substring(fileName.indexOf(".") - 2,
					fileName.indexOf(".")); // Configuration.lPad(fileName.split("_")[2],2,"0");
			ENCRY_DECRYPT_FLG=Configuration.getConfValByNm("CFG_ENCRY_DECRYPT_FLG", con);
			String _filename = Configuration
					.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
					+ "/ClearingInward/";
			double newver=2.1;
			CFG_CONTINUE_CLEARING_FLG=Configuration.getConfValByNm("CFG_CONTINUE_CLEARING_FLG",con);
			String OURVERSIONNO=Configuration.getConfValByNm("CFG_OURVERSIONNO",con);
			String CFG_PPS_CONNECTED=Configuration.getConfValByNm("CFG_PPS_CONNECTED",con);
			System.out.print("OURVERSIONNO=====" + OURVERSIONNO);
			filereader = new FileReader(path);
			reader = new BufferedReader(filereader);
			
			stmt_getSeqVal = con
					.prepareStatement("select SEQ_CLEARING_INWARD.nextVal from dual ");
			pst = con
					.prepareStatement("insert into ClearingInward(CLI_TRUNCATINGRTNO,"
							+ "CLI_PAYORBANKROUTNO,CLI_CREATIONDATE,CLI_AMOUNT,CLI_SERIALNO,"
							+ "CLI_RBISEQNO,CLI_TRANSCODE,CLI_ACCOUNTNO,CLI_PAYEENAME,CLI_INSTRUDATE,"
							+ "CLI_IMAGEFILE1,CLI_IMAGEFILE2,CLI_IMAGEFILE3,CLI_FULLLINE,CLI_ITEMSEQUENCENO, "
							+ "CLI_CLEARINGTYPE,CLI_PRESENTMENTDATE,CLI_CYCLENO,CLI_PRESENTINGBANKROUTNO,"
							+ "CLI_BOFDROUTNO,CLI_BOFDBUSDATE,CLI_DEPOSITORACCT,CLI_IFSC,CLI_MEMBERBNKSORTCODE,"
							+ "CLI_ISRETURNOUTWARDCHEQUE,CLI_DDMMYYYY,CLI_UNIQUENO,CLI_XMLFILENAME,"
							+ "CLI_INSTRUMENT_ID,CLI_CLRSRNO,CLI_CPPSFlAG,CLI_CONTI_CYCNO,CLI_CHEQ_NO,CLI_ITEM_EXPIRY_TIME,CLI_ENTRYDATE,CLI_CYCL_FILENO) "
							+ "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,sysdate,?)");
			pst1 = con.prepareStatement("select * from BRANCHMSTR where BRM_BRNCD=(select BRM_BRNCD from BRANCHMSTR "
					+ "where BRM_MICRCD=?)");
			pst3 = con.prepareStatement("select * from BRANCHMSTR where BRM_BRNCD=(select BRM_BRNCD from BRANCHMSTR "
					+ "where BRM_MICRCD=? and BRM_SCANNERYN='Y')");
			
			 pst_cycl_cnt= con.prepareStatement("select nvl(max(CLI_CONTI_CYCNO),0)+ 1  from ClearingInward where CLI_DDMMYYYY='"+Configuration.getDDMMYYYY()+"'");//Configuration.getDDMMYYYY()
			 pst_cycl_cnt1= con.prepareStatement("select nvl(max(CLI_CONTI_CYCNO),0)  from ClearingInward where CLI_DDMMYYYY='"+Configuration.getDDMMYYYY()+"'");//Configuration.getDDMMYYYY()
			 
			// seq_cnt_query= con.prepareStatement("select nvl(max(CLI_CHEQ_NO),0)  from ClearingInward where CLI_DDMMYYYY='"+Configuration.getDDMMYYYY()+"'");//Configuration.getDDMMYYYY() 
			 cycl_time=con.prepareStatement("select cycl_no from CONTIUES_CYCLE where time_hh=(SELECT TO_CHAR(SYSDATE,'hh') FROM DUAL)");
			seq_cnt_query= con.prepareStatement("select nvl(max(CLI_CHEQ_NO),0),nvl(max(CLI_CYCL_FILENO),0) from ClearingInward where CLI_CONTI_CYCNO=? and CLI_DDMMYYYY='"+Configuration.getDDMMYYYY()+"'" );//Configuration.getDDMMYYYY() 
			 System.out.println("*********** filecnt=="+filecnt);
			 
			 if(CFG_CONTINUE_CLEARING_FLG.equals("Y") && cbs_conti_flg.equals("Y"))
			 {		
			
				{			
					rs_cycl_time = cycl_time.executeQuery();
					if(rs_cycl_time.next())
					{
						cycl_seqNo = rs_cycl_time.getInt(1);
						System.out.println("For HDFC:cycl_seqNo==="+cycl_seqNo);						
						pst.setInt(32, cycl_seqNo);			
					}					
					rs_cycl_time.close();
					
					System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ");		
					seq_cnt_query.setInt(1, cycl_seqNo);
					ResultSet rs = seq_cnt_query.executeQuery();
					if(rs.next()) 
					{
						clrseqno = rs.getInt(1);						
						cycl_fileno = rs.getInt(2);
						
						if(filecnt==0) 
							cycl_fileno=cycl_fileno+1;
						
						else
							cycl_fileno=cycl_fileno;					
												
						pst.setInt(35, cycl_fileno);						
					}
					rs.close();
					///addde by mi 8112024
				}					
				 /* if(rs_cycl_seq.next())
					{
						cycl_seqNo = rs_cycl_seq.getInt(1);					
						pst.setInt(32, cycl_seqNo);
						
					}
					rs_cycl_seq.close();
					*/
				//	---
					
			 }	// if(CFG_CONTINUE_CLEARING_FLG.equals("Y"))
			 else
			 {
					pst.setString(32,"");
					pst.setString(35, "");
			 }
				
			//System.out.println("*********** path=="+path);
			
			String imgpath = path.substring(0, path.lastIndexOf("/") );
			System.out.println("*********** imgpath=="+imgpath);
			imgpath = imgpath.substring(0, imgpath.lastIndexOf("/") +1);
			System.out.println("*********** imgpath=== "+imgpath);
			new File(imgpath+"Images/").mkdirs();
			//imgpath = path.substring(0, path.lastIndexOf("/")+1 );
			pw=null;
			while ((singleRecord = reader.readLine()) != null) {
				singleRecord = singleRecord.replace("|", "~");
				String Data[] = singleRecord.split("~");

				ItemSeqNo = Data[0];
				PayorBankRoutNo = Data[1];
				if (branches.indexOf(PayorBankRoutNo + "#") == -1) {
					branches = branches + PayorBankRoutNo
							+ "#";
				}
				Amount = Data[2];
				AccountNo = Data[3];
				SerialNo = Data[4];
				 if(Double.parseDouble(OURVERSIONNO)>=newver)
					{
				TransCode =Configuration.lPad(Data[5],3,"0");
					}
				 else{
					 TransCode =Configuration.lPad(Data[5],2,"0");
				 }
				PresentingBankRoutNo = Configuration.getDDMMYYYY();// Data[6];
				PresentmentDate = Data[7];
				CycleNo = Data[8];
				NumOfImageViews = Data[9];
				ClearingType = Data[10];
				if (_filename.indexOf(".txt") == -1)
				{
					_filename = _filename + "/" + ClearingType
							+ "_To_CBS_Clearing_Inward.txt";
					pw = new PrintWriter(new FileWriter(_filename, true));// append
																			// mode
				}
				DocType = Data[11];
				MICRRepairFlags = Data[12];
				SpecialHandling = Data[13];
				TruncatingRTNo = Data[14];
				UserField = Data[15];
				IQAIgnoreInd = Data[16];
				CurrencyInd = Data[17];
				SessionNo = Data[18];
				InternalSequenceNo = Data[19];
				System.out.println("len====="+Data.length);//22
				if(Data.length>20)
				{
					 CPPS_Flag = Data[20];
				}
				else {
					CPPS_Flag="N";
				}
				if(Data.length>21)
				{
					System.out.println("Data[21]====="+Data[21]);
					item_expiry = Data[21];
					System.out.println("item_expiry===="+item_expiry);
				}
				else {
					item_expiry="";
				}	
				String optional_field ="";
				if(Data.length>22)
				{
					System.out.println("Data[22]====="+Data[22]);
					optional_field = Data[22];
					System.out.println("optional_field===="+optional_field);
				}
				else {
					optional_field="";
				}	
				RBISeqNo = Configuration.lPad(RBISeqNo, 10, "0");
				InstruDate = Configuration.getDDMMYYYY();// Configuration.lPad(InstruDate,8,"0");
				BOFDRoutNo = Configuration.lPad(BOFDRoutNo, 9, "0");
				BOFDBusDate = Configuration.lPad(BOFDBusDate, 8, "0");
				DepositorAcct = Configuration.lPad(DepositorAcct, 25, "0");
				IFSC = Configuration.lPad(IFSC, 11, "0");

				String onlyFileName = "P" + Data[7] + InternalSequenceNo
						+ fileName.substring(fileName.indexOf("/")+1).substring(4,7);
				System.out.println("###---------------------");
				System.out.println("Data[7]:"+Data[7]);
				System.out.println("InternalSequenceNo:"+InternalSequenceNo);
				System.out.println("fileName:"+fileName);
				System.out.println("index:"+fileName.indexOf("/"));
				System.out.println("stringval:"+fileName.substring(fileName.indexOf("/")+1));
				System.out.println("substringval:"+fileName.substring(fileName.indexOf("/")+1).substring(4, 7));
				System.out.println("onlyFileName:"+onlyFileName);
				
				System.out.println("\n###");
				
				String imgFileNm = (path
						.substring(0, path.lastIndexOf("/") + 1))
						+ onlyFileName;

				// imageFile1="f_"+SerialNo+ItemSeqNo.substring(0,ItemSeqNo.length()>=10?10:ItemSeqNo.length());
				imageFile1 = "f_"
						+ ItemSeqNo.substring(0, ItemSeqNo.length() >= 9 ? 9
								: ItemSeqNo.length()) + SerialNo
						+ Configuration.lPad("" + imgNmCnt, 3, "0");
				imageFile1 = Configuration.lPad(imageFile1, 27, "0");

				// imageFile2="r_"+SerialNo+ItemSeqNo.substring(0,ItemSeqNo.length()>=10?10:ItemSeqNo.length());
				imageFile2 = "r_"
						+ ItemSeqNo.substring(0, ItemSeqNo.length() >= 9 ? 9
								: ItemSeqNo.length()) + SerialNo
						+ Configuration.lPad("" + imgNmCnt, 3, "0");
				imageFile2 = Configuration.lPad(imageFile2, 27, "0");

				// imageFile3="f_"+SerialNo+ItemSeqNo.substring(0,ItemSeqNo.length()>=10?10:ItemSeqNo.length())+"_G";
				imageFile3 = "f_"
						+ ItemSeqNo.substring(0, ItemSeqNo.length() >= 9 ? 9
								: ItemSeqNo.length()) + SerialNo
						+ Configuration.lPad("" + (imgNmCnt++), 3, "0") + "_G";
				imageFile3 = Configuration.lPad(imageFile3, 27, "0");

				boolean file1Bool = false, file2Bool = false, file3Bool = false;
				System.out.println("##=imgFileNm=:"+imgFileNm);
				file1Bool = new File(imgFileNm + ".BF").renameTo(new File(imgpath
						+ "Images/"
						+ imageFile1 + ".tif"));
				System.out.println("file1Bool =="+file1Bool+"===="+imgpath+"======"+fileName.substring(fileName.indexOf("/")+1));
				file2Bool = new File(imgFileNm + ".BR").renameTo(new File(imgpath
						+ "Images/"
						+ imageFile2 + ".tif"));
				System.out.println("file2Bool =="+file2Bool+"===="+imgpath+"======"+fileName.substring(fileName.indexOf("/")+1));
				file3Bool = new File(imgFileNm + ".GF").renameTo(new File(imgpath
						+ "Images/"
						+ imageFile3 + ".jpg"));
				System.out.println("file3Bool =="+file3Bool+"===="+imgpath+"======"+fileName.substring(fileName.indexOf("/")+1));

				System.out.println("*********** 5 **** ");
				pst.setString(1, TruncatingRTNo);
				pst.setString(2, PayorBankRoutNo);
				pst.setString(3, CreationDate);
				pst.setString(4, Amount);
				pst.setString(5, SerialNo);
				pst.setString(6, RBISeqNo);
				pst.setString(7, TransCode);

				AccountNo = AccountNo.length() > 10 ? AccountNo.substring(
						AccountNo.length() - 10, AccountNo.length())
						: Configuration.lPad(AccountNo, 10, "0");
				;

				pst.setString(8, AccountNo);
				pst.setString(9, UserField);
				pst.setString(10, InstruDate);
				pst.setString(11, imageFile1);
				pst.setString(12, imageFile2);
				pst.setString(13, imageFile3);

				TruncatingRTNo = Configuration.lPad(TruncatingRTNo, 9, "0");
				draweeBankSortCode = Configuration.lPad(
						(Configuration.getDraweeSortCode(PayorBankRoutNo)), 9,
						"0");
				CreationDate = Configuration.getDDMMYYYY();// Configuration.lPad(CreationDate,8,"0");
				Amount = Configuration.lPad(Amount, 13, "0");
				SerialNo = Configuration.lPad(SerialNo, 6, "0");
				if(Double.parseDouble(OURVERSIONNO)>=newver)
				{
				TransCode = Configuration.lPad(Data[5], 3, "0");
				}
				else{
					TransCode = Configuration.lPad(Data[5], 2, "0");
				}
				UserField = Configuration.rPad(UserField, 50, " ");
				PayorBankRoutNo = Configuration.lPad(PayorBankRoutNo, 9, "0");
				UnqDocKey = PresentmentDate + fileName.substring(0, 3)
						+ PayorBankRoutNo + CycleNo + InternalSequenceNo;
				UnqDocKey = Configuration.rPad(UnqDocKey, 80, "0");
				CliSeqNo=Configuration.lPad(Integer.toString(cil_clrseqno++),14,"0");
				System.out.println("\n\nCliSeqNot="+CliSeqNo);
				if(Double.parseDouble(OURVERSIONNO)>=newver)
				{
				fullline = TruncatingRTNo + draweeBankSortCode + CreationDate
						+ Amount + SerialNo + RBISeqNo + TransCode + AccountNo
						+ UserField + InstruDate + imageFile1 + imageFile2
						+ imageFile3 + UnqDocKey + PayorBankRoutNo
						+ ClearingType+Configuration.lPad(CliSeqNo,20," ");//ItemSeqNo
					if(CFG_PPS_CONNECTED.equalsIgnoreCase("Y"))
					{
						fullline=fullline+CPPS_Flag;
					}
			System.out.print("newversion=====" + OURVERSIONNO);
				}
				else{
					fullline = TruncatingRTNo + draweeBankSortCode + CreationDate
							+ Amount + SerialNo + RBISeqNo + TransCode + AccountNo
							+ UserField + InstruDate + imageFile1 + imageFile2
							+ imageFile3 + UnqDocKey + PayorBankRoutNo
							+ ClearingType;
						if(CFG_PPS_CONNECTED.equalsIgnoreCase("Y"))
						{
							fullline=fullline+CPPS_Flag;
						}
					System.out.print("oldversion=====" + OURVERSIONNO);
				}
				ResultSet rs_seq = stmt_getSeqVal.executeQuery();
				seqNo = "";
				//System.out.println("*********** 6 **** ");
				if (rs_seq.next()) {
					seqNo = rs_seq.getString(1);
					seqNo = Configuration.lPad(seqNo, 15, "0");
				}
				rs_seq.close();
				
				pst.setString(15, ItemSeqNo);
				pst.setString(16, ClearingType);
				pst.setString(17, PresentmentDate);
				pst.setString(18, CycleNo);
				pst.setString(19, PresentingBankRoutNo);
				pst.setString(20, BOFDRoutNo);
				pst.setString(21, BOFDBusDate);
				pst.setString(22, DepositorAcct);
				pst.setString(23, IFSC);
				pst.setString(24, draweeBankSortCode);

				if (draweeBankSortCode.equalsIgnoreCase("000000000"))
					pst.setString(25, "Y");
				else
					pst.setString(25, "N");

				pst.setString(26, Configuration.getDDMMYYYY());// CLI_DDMMYYYY
				pst.setString(27, seqNo);// CLI_UNIQUENO
				pst.setString(28, str_filename);
				pst.setString(29, InternalSequenceNo);
				pst.setString(30, CliSeqNo);
				pst.setString(31, CPPS_Flag);				
				
				if(CFG_CONTINUE_CLEARING_FLG.equals("Y")&& cbs_conti_flg.equals("Y"))
				{
					clrseqno=clrseqno+1;
				//	System.out.println(cycl_seqNo+" =MLSharayu clrseqno="+clrseqno);
					pst.setInt(33, clrseqno);
					pst.setString(34,item_expiry);
					fullline=fullline+cycl_seqNo+clrseqno;
				}
				else
				{
					
					pst.setString(33, "");
					pst.setString(34,"");
				}
				
				pst.setString(14, fullline);
				//code added by me...29042025
				System.out.print("\n @@@@ENCRY_DECRYPT_FLG="+ENCRY_DECRYPT_FLG);
				if(ENCRY_DECRYPT_FLG.equalsIgnoreCase("Y"))
				{
					System.out.print("\n Inside if of encrpt decrypt ");
					ps_values = con.prepareStatement("select hocust.encrypt_string('"+fullline+"') from dual");
					rs_encypt = ps_values.executeQuery();
					if (rs_encypt.next())
					{
						fullline = rs_encypt.getString(1);
						System.out.print("\n after rs.getString(1)="+rs_encypt.getString(1));
					}
					System.out.print("\n after readLine="+fullline);
				}
				//System.out.println("fullline **** "+fullline);
				try {
					int cnt = pst.executeUpdate();
					System.out.println("********inserted record **** "+cnt);
				} catch (SQLException e) {
					System.out.println(e + "      " + SerialNo + "   "
							+ PayorBankRoutNo);
					if (!(e.getMessage().indexOf("ORA-00001") > -1))
						throw new Exception("MyException...");
				}
				System.out.println("file1Bool*** "+file1Bool);
				System.out.println("file2Bool*** "+file2Bool);
				System.out.println("file3Bool*** "+file3Bool);
				if (file1Bool && file2Bool && file3Bool)
				{
					System.out.println("after fullline **** "+fullline);
					pw.println(fullline);
				}
				fullline = null;
				System.out.println("before_filename=="+_filename);
				pw.flush();
				
			}
			
			reader.close();
			System.out.println("upDownStyle=====" + upDownStyle);
			if (upDownStyle.equalsIgnoreCase("Capturing")) 
			{
				String branchList[] = branches.split("#");
				for (int i = 0; i < branchList.length; i++) 
				{
					pst3.setString(1, branchList[i]);
					ResultSet rs = pst3.executeQuery();
					while (rs.next()) 
					{
						String Capfilename = Configuration.getConfValByNm("CFG_downloadpath_from_CHI",con)
							+ "/ClearingInward/";
						String notDrawnOnUs = Capfilename + clearingType
								+ "_To_CBS_NotDrawnOnUs.txt";
						Capfilename = Capfilename + "/" + clearingType
							+ "_To_CBS_Clearing_Inward_"+ rs.getString(1) + ".txt";
						pw1 = new PrintWriter(new FileWriter(Capfilename));
						
						BufferedReader br = new BufferedReader(
							new FileReader(_filename));
						String readLine = "";
						pw2 = null;
						while ((readLine = br.readLine()) != null) 
						{
						System.out.println(readLine.substring(286,295)+"===="+Capfilename+"==="+branchList[i]+"=="+readLine.substring(40,46));
							if (readLine.substring(286,295).equalsIgnoreCase(branchList[i])) 
							{
								pw1.println(readLine);
							} 
							else if (readLine.substring(9, 18).equals("000000000")) 
							{
								pw2 = new PrintWriter(new FileWriter(notDrawnOnUs));
								pw2.println(readLine);
								pw2.flush();
							}
						}
						System.out.println("readLine="+readLine);
						pw1.flush();
						pw1.close();
						br.close();
						if (pw2 != null) {
							pw2.close();
						}
						pw1 = null;
						br = null;
						TruncatingRTNo = null;
						PayorBankRoutNo = null;
						Amount = null;
						SerialNo = null;
						// RBISeqNo=null;
						TransCode = null;
						AccountNo = null;
						// Payeename=null;
						// InstruDate=null;
						imageFile1 = null;
						imageFile2 = null;
						imageFile3 = null;
						// fullline=null;
						ItemSeqNo = null;
						ClearingType = null;
						//presentmentDate = null;
						//cycleNo = null;
						PresentingBankRoutNo = null;
						BOFDRoutNo = null;
						BOFDBusDate = null;
						DepositorAcct = null;
						IFSC = null;
						CPPS_Flag=null;
						System.gc();
					}
					rs.close();
					//con = null;
					rs = null;
					pst = null;
					System.gc();
				}
			} 
			else if (upDownStyle.equalsIgnoreCase("Separated") ||upDownStyle.equalsIgnoreCase("SEPARATED")) 
			{
				System.out.println("inside upDownStyle=====" + upDownStyle);
				String branchList[] = branches.split("#");
			
				System.out.println(" branchList.length=====" + branchList.length);
				for (int i = 0; i < branchList.length; i++) 
				{
					pst1.setString(1, branchList[i]);
					System.out.println("inside branchList[i]=====" + branchList[i]);
					ResultSet rs = pst1.executeQuery();
					while (rs.next()) 
					{
						String Capfilename = Configuration
								.getConfValByNm("CFG_downloadpath_from_CHI",con)
								+ "/ClearingInward/";
						System.out.println("Capfilename="+Capfilename);
						
						String notDrawnOnUs = Capfilename + clearingType
								+ "To_CBS_NotDrawnOnUs.txt";
						
						System.out.println("notDrawnOnUs="+notDrawnOnUs);
						Capfilename = Capfilename + "/" + clearingType
								+ "_To_CBS_Clearing_Inward_"
								+ rs.getString(1) + ".txt";
						System.out.println("Capfilename="+Capfilename);
						
						pw1 = new PrintWriter(new FileWriter(
								Capfilename));
						BufferedReader br = new BufferedReader(
								new FileReader(_filename));
						String readLine = "";
						pw2 = null;
						
						System.out.println("_filename=="+_filename);
			//			System.out.println("readLine=="+readLine);
					
						System.out.println("br.readLine=="+br.readLine());
						while ((readLine = br.readLine()) != null) 
						{
							System.out.println(readLine.substring(286,295)+"===="+Capfilename+"==="+branchList[i]+"=="+readLine.substring(40,46));
							if (readLine.substring(286,295).equalsIgnoreCase(branchList[i])) 
							{
								pw1.println(readLine);
							} 
							else if (readLine.substring(9, 18).equals("000000000")) 
							{
								pw2 = new PrintWriter(new FileWriter(notDrawnOnUs));
								pw2.println(readLine);
								pw2.flush();
							}
						}
						System.out.println("readLine=="+readLine);
						pw1.flush();
						pw1.close();
						br.close();
						pw1 = null;
						if (pw2 != null) {
							pw2.close();
						}
						br = null;
						TruncatingRTNo = null;
						PayorBankRoutNo = null;
						Amount = null;
						SerialNo = null;
						// RBISeqNo=null;
						TransCode = null;
						AccountNo = null;
						// Payeename=null;
						// InstruDate=null;
						imageFile1 = null;
						imageFile2 = null;
						imageFile3 = null;
						// fullline=null;
						ItemSeqNo = null;
						ClearingType = null;
						//presentmentDate = null;
						//cycleNo = null;
						PresentingBankRoutNo = null;
						BOFDRoutNo = null;
						BOFDBusDate = null;
						DepositorAcct = null;
						IFSC = null;
						CPPS_Flag = null;
						System.gc();
					}
					rs.close();
					// pst.close();
					// con.close();
					//con = null;
					rs = null;
					pst = null;
					System.gc();
				}
			}
			
		}// end try
		catch (Exception e) {// catch
			e.printStackTrace();
			System.out.println("Error while reading PXF\n" + e.getMessage());
			flg = "SUCCESS";
		}// catch
		finally {
			try {
				pw.close();
				pst.close();
				pst1.close();
				pst3.close();
				stmt_getSeqVal.close();
				con.close();
				//pw.close();
			} catch (Exception e) {
			}
		}
//		System.out.println("****** 14 *****"+flg);
		if(CFG_CONTINUE_CLEARING_FLG.equals("Y")&& cbs_conti_flg.equals("Y")){
		flg=flg+"~"+cycl_seqNo;
		}
		else
		{
			flg=flg;
		}
		System.out.println("*end readPXF***** final flg *****"+flg);
		return flg;
	}// end readPXF

	public boolean readRetInwXls_hdfc(String filePath, String _fileName) {
		Connection excelCon, con;
		PreparedStatement pst;
		PrintWriter pw;

		try {
			excelCon = DriverManager
					.getConnection("jdbc:odbc:Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DBQ="
							+ filePath + "/" + _fileName + ";ReadOnly=0;");
			System.out.println("Connection Successfull");
			pst = excelCon.prepareStatement("select * from [Sheet1$]");
			ResultSet rs = pst.executeQuery();

			Class.forName("oracle.jdbc.driver.OracleDriver");
			con = Configuration.getConnection();/*DriverManager.getConnection(
					"jdbc:oracle:thin:@172.100.30.54:1521:xe", "CTS_HDFC",
					"list");*/

			pst = con
					.prepareStatement("INSERT into RETURNINWARD (RTI_DDMMYYYY,RTI_CLEARINGTYPE,RTI_PRESENTMENTDATE,RTI_BOFDBUSDATE,RTI_SERIALNO,RTI_PAYORBANKROUTNO,RTI_TRANSCODE,RTI_AMOUNT,RTI_ACCOUNTNO,RTI_RETURNREASONCOMMENT,RTI_RETURNREASON,RTI_FILENAME)values(?,?,?,?,?,?,?,?,?,?,?,?) ");
			
			pw = new PrintWriter(new FileWriter(filePath+"To_CBS_Return_Inward.txt", true));
			while (rs.next()) {

				String redate = rs.getString(1);
				String ReturnDate = "";
				try {
					ReturnDate = (redate.substring(6, 8)
							+ redate.substring(4, 6) + redate.substring(0, 4));
				} catch (NullPointerException ne) {
					break;
				}
				String ClearingType = rs.getString(2);
				ClearingType=ClearingType.substring(0, ClearingType.indexOf('.'));

				String SessionID = rs.getString(3);
				String prdate = rs.getString(4);
				String PresentmentDate = (prdate.substring(6, 8)
						+ prdate.substring(4, 6) + prdate.substring(0, 4));

				String BatchNumber = rs.getString(5);

				String UDk1 = rs.getString(6);
				String UDK = UDk1.substring(1);
				 UDK=Configuration.lPad(UDK,80," ");
				// UDK=UDK.substring(0, UDK.indexOf('.'));
				 

				String ChequeNumber = rs.getString(7);
				ChequeNumber=ChequeNumber.substring(0, ChequeNumber.indexOf('.'));
				ChequeNumber=Configuration.lPad(ChequeNumber,6,"0");
				

				String SortCode = rs.getString(8);
				SortCode=SortCode.substring(0, SortCode.indexOf('.'));
				SortCode=Configuration.lPad(SortCode, 9, "0");
				
				String TransactionCode = rs.getString(9);
				TransactionCode=TransactionCode.substring(0, TransactionCode.indexOf('.'));
				TransactionCode=Configuration.lPad(TransactionCode, 3, "0");

				String Amount = rs.getString(10);
				Amount = Amount.substring(1);
				Amount = Amount.replace(".", "");
				Amount=Configuration.lPad(Amount, 18,"0");

				String AccountNumber = rs.getString(11);
				AccountNumber=AccountNumber.substring(0, AccountNumber.indexOf('.'));
				AccountNumber=Configuration.lPad(AccountNumber, 16, "0");
				
				String PTFFlag = rs.getString(12);
				
				String ReturnReasonCode = rs.getString(13);
				ReturnReasonCode=ReturnReasonCode.substring(0, ReturnReasonCode.indexOf('.'));
				ReturnReasonCode=Configuration.lPad(ReturnReasonCode,2,"0");


				
				String ReturnDescription = rs.getString(14);

				
				String BOFDNumber = rs.getString(15);
				BOFDNumber=BOFDNumber.substring(0, BOFDNumber.indexOf('.'));
				BOFDNumber=Configuration.lPad(BOFDNumber,9,"0");
				

				
				
				String SubmemberBankName = rs.getString(16);
				String PayeeNameOrAccountTitle = rs.getString(17);
				String ReturnReasonRemarksOrComments = rs.getString(18);
				// System.out.println("\n");
				
				String fullLine =BOFDNumber+ChequeNumber+UDK+"I"+ReturnReasonCode;
				//System.out.println("11=="+fullLine);
				pw.println(fullLine);
			
				
				//System.out.println("files created sucessfully");

				pst.setString(1, Configuration.getDDMMYYYY());
				pst.setString(2, ClearingType);
				pst.setString(3, PresentmentDate);
				pst.setString(4, PresentmentDate);
				pst.setString(5, ChequeNumber);
				pst.setString(6, SortCode);
				pst.setString(7, TransactionCode);
				pst.setString(8, Amount);
				pst.setString(9, AccountNumber);
				pst.setString(10, ReturnDescription);
				pst.setString(11, ReturnReasonCode);
				pst.setString(12, _fileName);

				pst.executeUpdate();

			}
			rs.close();
			pst.close();
			con.close();
			excelCon.close();
			
			pw.flush();
			pw.close();
			System.out.println("Processing  Successfull");

			/*
			 * String upDownStyle = Configuration
			 * .getConfValByNm("CFG_INWD_SPLITSTYLE"); String txtFilenm =
			 * Configuration .getConfValByNm("CFG_downloadpath_from_CHI") +
			 * "/ReturnInward/" + textFileName;
			 * System.out.println("\n\tupDownStyle:" + upDownStyle); String
			 * branches = allBranchStr.toString(); // upDownStyle="Separated";
			 * // System.out.println("\n\tupDownStyle:"+upDownStyle); //
			 * System.out.println("\n\tbranches:"+branches); if
			 * (upDownStyle.equalsIgnoreCase("Capturing")) {// if String
			 * branchList[] = branches.split("#"); for (int i = 0; i <
			 * branchList.length; i++) {// for ps_branches.setString(1,
			 * branchList[i]); ResultSet rs = ps_branches.executeQuery(); while
			 * (rs.next()) {// while-1 String Capfilename = Configuration
			 * .getConfValByNm("CFG_downloadpath_from_CHI") + "/ReturnInward/";
			 * Capfilename = Capfilename + "/To_CBS_Return_Inward_" +
			 * rs.getString(1) + ".txt"; PrintWriter pw1 = new PrintWriter(new
			 * FileWriter( Capfilename)); BufferedReader br = new
			 * BufferedReader(new FileReader( txtFilenm)); String readLine = "";
			 * while ((readLine = br.readLine()) != null) {// while-2 if
			 * (readLine.substring(0, 9).equalsIgnoreCase( branchList[i])) {
			 * pw1.println(readLine); } }// while-2 br.close(); pw1.flush();
			 * pw1.close(); }// while-1 }// for }// if else if
			 * (upDownStyle.equalsIgnoreCase("Separated")) {// else-if ResultSet
			 * rs = ps_allBranches.executeQuery(); while (rs.next()) {// while-1
			 * String scanningBrn = rs.getString(4); String Capfilename =
			 * Configuration .getConfValByNm("CFG_downloadpath_from_CHI") +
			 * "/ReturnInward/"; Capfilename = Capfilename +
			 * "/To_CBS_Return_Inward_" + rs.getString(1) + ".txt"; PrintWriter
			 * pw1 = new PrintWriter(new FileWriter( Capfilename));
			 * BufferedReader br = new BufferedReader(new FileReader(
			 * txtFilenm)); String readLine = ""; while ((readLine =
			 * br.readLine()) != null) {// while-2 if (readLine.substring(0,
			 * 9).equalsIgnoreCase( scanningBrn)) { pw1.println(readLine); } }//
			 * while-2 br.close(); pw1.flush(); pw1.close(); }// while-1 }//
			 * else-if
			 */} catch (Exception e) {
			System.out.println("" + e);
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean readInwardSubPosting(String fileName,String cbs_conti_flg)
	{
		boolean b=true;
		boolean flg = true;
		String str_filename = fileName.replace("/", "/");
		String path = "", singleRecord = "", fullline = "", draweeBankSortCode = "",CliSeqNo="";
		String ItemSeqNo = "", PayorBankRoutNo = "", Amount = "", AccountNo = "", 
				SerialNo = "", TransCode = "", PresentingBankRoutNo = "";
		String PresentmentDate = "", ClearingType = "",CycleNo="",CPPS_Flag="N";
		String  TruncatingRTNo = "", UserField = "";
		String CreationDate = "", RBISeqNo = "", 
				InstruDate = "", imageFile1 = "", imageFile2 = "";
		String imageFile3 = "", BOFDRoutNo = "", BOFDBusDate = "", DepositorAcct = "", 
				IFSC = "", seqNo = "", UnqDocKey = "";
		itemInfo = new ItemInformation();
		long imgFileSize = 0;
		int imgNmCnt = 0;
		int clrseqno=0;
		 int cycl_seqNo = 0;
		 PreparedStatement seq_cnt_query = null;
		System.out.println("*********** start readPXF **** " + fileName);
		
		System.out.println("*********** 1 **** ");
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pst1 = null;
		PreparedStatement pst3 = null;
		PreparedStatement stmt_getSeqVal = null,pst_cycl_cnt=null;
		int counter = 0;
		String BPIBF_fileName = null;
		// ByteToImageConverter _objImageCretor=null;
		int dsLength = 0;
		String fileNameArr[] = fileName.split("_");
		System.out.println("*********** 2 **** ");
		FileReader filereader;
		BufferedReader reader;
		String item_expiry=null;
		PrintWriter pw = null;
		ResultSet rs_cycl_seq =null; 
		PreparedStatement cycl_time = null;
		ResultSet rs_cycl_time = null ;
		int cycl_fileno =0;
		String ENCRY_DECRYPT_FLG="";
		PreparedStatement ps_values = null;
					String clyNo=null;
					ResultSet rs_encypt=null;
		try
		{// try
			con = Configuration.getConnection();
			String upDownStyle = Configuration
					.getConfValByNm("CFG_INWD_SPLITSTYLE",con);
			double newver=2.1;
			String OURVERSIONNO=Configuration.getConfValByNm("CFG_OURVERSIONNO",con);
			System.out.print("OURVERSIONNO=====" + OURVERSIONNO);
			path = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
					+ "ClearingInward/" + str_filename;
			ENCRY_DECRYPT_FLG=Configuration.getConfValByNm("CFG_ENCRY_DECRYPT_FLG", con);
			String clearingType = fileName.substring(fileName.indexOf(".") - 2,
					fileName.indexOf(".")); // Configuration.lPad(fileName.split("_")[2],2,"0");
			String _filename = Configuration
					.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
					+ "/ClearingInward/";
			String CFG_PPS_CONNECTED=Configuration.getConfValByNm("CFG_PPS_CONNECTED",con);

			String CFG_CONTINUE_CLEARING_FLG=Configuration.getConfValByNm("CFG_CONTINUE_CLEARING_FLG",con);
			
			filereader = new FileReader(path);
			reader = new BufferedReader(filereader);
			stmt_getSeqVal = con
					.prepareStatement("select SEQ_CLEARING_INWARD.nextVal from dual ");
			String insrt_qry="insert into ClearingInward values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,sysdate,?)";
			pst = con
					//.prepareStatement("insert into ClearingInward values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,sysdate,?)");
					.prepareStatement(insrt_qry);
			//,CLI_CONTI_CYCNO,CLI_CHEQ_NO,CLI_ITEM_EXPIRY_TIME
			pst_cycl_cnt= con.prepareStatement("select nvl(max(CLI_CONTI_CYCNO),0)+ 1  from ClearingInward where CLI_DDMMYYYY='"+Configuration.getDDMMYYYY()+"'");//Configuration.getDDMMYYYY()
			cycl_time=con.prepareStatement("select cycl_no from CONTIUES_CYCLE where time_hh=(SELECT TO_CHAR(SYSDATE,'hh') FROM DUAL)");
			//seq_cnt_query= con.prepareStatement("select nvl(max(CLI_CHEQ_NO),0) from ClearingInward where CLI_CONTI_CYCNO=? and CLI_DDMMYYYY='"+Configuration.getDDMMYYYY()+"'" );//Configuration.getDDMMYYYY()
			seq_cnt_query= con.prepareStatement("select nvl(max(CLI_CHEQ_NO),0),nvl(max(CLI_CYCL_FILENO),0) from ClearingInward where CLI_CONTI_CYCNO=? and CLI_DDMMYYYY='"+Configuration.getDDMMYYYY()+"'" );//Configuration.getDDMMYYYY() 
				
			
			System.out.println("\n\t CFG_CONTINUE_CLEARING_FLG:" + CFG_CONTINUE_CLEARING_FLG);
			if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y") && cbs_conti_flg.equalsIgnoreCase("Y"))
			{
				rs_cycl_time = cycl_time.executeQuery();
				if(rs_cycl_time.next())
				{
					cycl_seqNo = rs_cycl_time.getInt(1);
					System.out.println("For NPCI:cycl_seqNo==="+cycl_seqNo);
					pst.setInt(33, cycl_seqNo);						
				}
				System.out.println("For NPCI::::sub~~~ cycl_seqNo==="+cycl_seqNo);		
				rs_cycl_time.close();
				
				System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ");		
				seq_cnt_query.setInt(1, cycl_seqNo);
				ResultSet rs = seq_cnt_query.executeQuery();
				if(rs.next()) 
				{
					clrseqno = rs.getInt(1);						
					cycl_fileno = rs.getInt(2);
					/*
					 * if(filecnt==0) cycl_fileno=cycl_fileno+1; else cycl_fileno=cycl_fileno;
					 */					
					cycl_fileno=cycl_fileno+1;						
					pst.setInt(36, cycl_fileno);						
				}
				rs.close();
			}
			else
			{
				cycl_fileno=0;
				cycl_seqNo=0;
				//System.out.println("\n33 else seqno=="+cycl_seqNo);System.out.println("\n36 else filno=="+cycl_fileno);
				pst.setInt(33,cycl_seqNo);
				pst.setInt(36,cycl_fileno);
				System.out.println("\n else==");
			}
				
			
			//System.out.println("*********** path=="+path);
			String imgpath = path.substring(0, path.lastIndexOf("/") );
			//System.out.println("*********** imgpath=="+imgpath);
			imgpath = imgpath.substring(0, imgpath.lastIndexOf("/") +1);
			//System.out.println("*********** imgpath=== "+imgpath);
			new File(imgpath+"Images/").mkdirs();
			//imgpath = path.substring(0, path.lastIndexOf("/")+1 );
			while ((singleRecord = reader.readLine()) != null) {
				singleRecord = singleRecord.replace("|", "~");
				String Data[] = singleRecord.split("~");
				PresentingBankRoutNo = Data[0];
				PayorBankRoutNo = Data[1];
				PresentmentDate = Data[2];
				Amount = Data[3].replace(".", "");
				System.out.println("\n\nAmount="+Amount);
				SerialNo = Data[4];
				ItemSeqNo = Data[5];
			
				if(Double.parseDouble(OURVERSIONNO)>=newver)
				{
				TransCode = Configuration.lPad(Data[6], 3, "0");
				}
				else{
					TransCode = Configuration.lPad(Data[6], 2, "0");
				}
				//Data[7] and Data[8] are blank
				UserField = Data[9];
				//Data[10]is "N" and Data[11] is blank
				
				UnqDocKey = Data[12];
				DepositorAcct=UnqDocKey.substring(10, 26);
				UnqDocKey = Configuration.rPad(UnqDocKey, 80, "0");
				AccountNo = Data[13];
				System.out.println("len====="+Data.length);
				if(Data.length>14)
				 CPPS_Flag= Data[14];
				else {
					CPPS_Flag="N";
				}
				
				if(Data.length>15)
					item_expiry = Data[15];
				else
				{
						item_expiry = "";
				}			
				
				ClearingType = "01";
				CycleNo=ClearingType;
				if (_filename.indexOf(".txt") == -1) {
					_filename = _filename + "/" + ClearingType
							+ "_To_CBS_Clearing_Inward.txt";
					pw = new PrintWriter(new FileWriter(_filename, true));// append
																			// mode
				}
				TruncatingRTNo = " ";
				
				RBISeqNo = Configuration.lPad(RBISeqNo, 10, "0");
				InstruDate = Configuration.getDDMMYYYY();// Configuration.lPad(InstruDate,8,"0");
				BOFDRoutNo = Configuration.lPad(BOFDRoutNo, 9, "0");
				BOFDBusDate = Configuration.lPad(BOFDBusDate, 8, "0");
				DepositorAcct = Configuration.lPad(DepositorAcct, 25, "0");
				IFSC = Configuration.lPad(IFSC, 11, "0");

				String onlyFileName = ""+Long.parseLong(ItemSeqNo);//Configuration.lPad(ItemSeqNo, 14, "0");

				
				String imgFileNm = "";

				imageFile1 = "f_"
						+ ItemSeqNo.substring(0, ItemSeqNo.length() >= 9 ? 9
								: ItemSeqNo.length()) + SerialNo
						+ Configuration.lPad("" + imgNmCnt, 3, "0");
				imageFile1 = Configuration.lPad(imageFile1, 27, "0");

				imageFile2 = "r_"
						+ ItemSeqNo.substring(0, ItemSeqNo.length() >= 9 ? 9
								: ItemSeqNo.length()) + SerialNo
						+ Configuration.lPad("" + imgNmCnt, 3, "0");
				imageFile2 = Configuration.lPad(imageFile2, 27, "0");
				imageFile3 = "f_"
						+ ItemSeqNo.substring(0, ItemSeqNo.length() >= 9 ? 9
								: ItemSeqNo.length()) + SerialNo
						+ Configuration.lPad("" + (imgNmCnt++), 3, "0") + "_G";
				imageFile3 = Configuration.lPad(imageFile3, 27, "0");
				boolean file1Bool = false, file2Bool = false, file3Bool = false;
				imgFileNm = (path
						.substring(0, path.lastIndexOf("/") + 1))
						+ "B"+onlyFileName;
				System.out.println("imgFileNm=="+imgFileNm);
				file1Bool = new File(imgFileNm + "F.tiff").renameTo(new File(imgpath
						+ "Images/"
						+ imageFile1 + ".tif"));
				System.out.println("file1Bool =="+file1Bool+"===="+imgpath+"======"+fileName.substring(fileName.indexOf("/")+1));
				file2Bool = new File(imgFileNm + "B.tiff").renameTo(new File(imgpath
						+ "Images/"
						+ imageFile2 + ".tif"));
				imgFileNm = (path
						.substring(0, path.lastIndexOf("/") + 1))
						+ "G"+onlyFileName;
				file3Bool = new File(imgFileNm + ".jpg").renameTo(new File(imgpath
						+ "Images/"
						+ imageFile3 + ".jpg"));

				//System.out.println("*********** 5 **** ");
				pst.setString(1, TruncatingRTNo);
				pst.setString(2, PayorBankRoutNo);
				pst.setString(3, CreationDate);
				pst.setString(4, Amount);
				pst.setString(5, SerialNo);
				pst.setString(6, RBISeqNo);
				pst.setString(7, TransCode);

				AccountNo = AccountNo.length() > 10 ? AccountNo.substring(
						AccountNo.length() - 10, AccountNo.length())
						: Configuration.lPad(AccountNo, 10, "0");
				;

				pst.setString(8, AccountNo);
				pst.setString(9, UserField);
				pst.setString(10, InstruDate);
				pst.setString(11, imageFile1);
				pst.setString(12, imageFile2);
				pst.setString(13, imageFile3);

				TruncatingRTNo = Configuration.lPad(TruncatingRTNo, 9, "0");
				draweeBankSortCode = Configuration.lPad(
						(Configuration.getDraweeSortCode(PayorBankRoutNo)), 9,
						"0");
				CreationDate = Configuration.getDDMMYYYY();// Configuration.lPad(CreationDate,8,"0");
				Amount = Configuration.lPad(Amount, 13, "0");
				SerialNo = Configuration.lPad(SerialNo, 6, "0");
				if(Double.parseDouble(OURVERSIONNO)>=newver)
				{
				TransCode = Configuration.lPad(TransCode,3, "0");
				}
				else{
					TransCode = Configuration.lPad(TransCode,2, "0");
				}
				UserField = Configuration.rPad(UserField, 50, " ");
				PayorBankRoutNo = Configuration.lPad(PayorBankRoutNo, 9, "0");
				CliSeqNo=Configuration.lPad(Integer.toString(cil_clrseqno++),14,"0");
				//System.out.println("\n\nCliSeqNot="+CliSeqNo);
				if(Double.parseDouble(OURVERSIONNO)>=newver)
				{
				fullline = TruncatingRTNo + draweeBankSortCode + CreationDate
						+ Amount + SerialNo + RBISeqNo + TransCode + AccountNo
						+ UserField + InstruDate + imageFile1 + imageFile2
						+ imageFile3 + UnqDocKey + PayorBankRoutNo
						+ ClearingType+Configuration.lPad(CliSeqNo,20," ");//ItemSeqNo
					if(CFG_PPS_CONNECTED.equalsIgnoreCase("Y"))
					{
						fullline=fullline+CPPS_Flag;
					}
				System.out.print("newversion=====" + OURVERSIONNO);
				
				}
				else{
					fullline = TruncatingRTNo + draweeBankSortCode + CreationDate
							+ Amount + SerialNo + RBISeqNo + TransCode + AccountNo
							+ UserField + InstruDate + imageFile1 + imageFile2
							+ imageFile3 + UnqDocKey + PayorBankRoutNo
							+ ClearingType;
						if(CFG_PPS_CONNECTED.equalsIgnoreCase("Y"))
						{
							fullline=fullline+CPPS_Flag;
						}
					System.out.print("oldversion=====" + OURVERSIONNO);
				}

				ResultSet rs_seq = stmt_getSeqVal.executeQuery();
				seqNo = "";
				System.out.println("*********** 6 **** ");
				if (rs_seq.next()) {
					seqNo = rs_seq.getString(1);
					seqNo = Configuration.lPad(seqNo, 15, "0");
				}
				rs_seq.close();

			//	pst.setString(14, fullline);
				pst.setString(15, ItemSeqNo);
				pst.setString(16, ClearingType);
				pst.setString(17, PresentmentDate);
				pst.setString(18, CycleNo);
				pst.setString(19, PresentingBankRoutNo);
				pst.setString(20, BOFDRoutNo);
				pst.setString(21, BOFDBusDate);
				pst.setString(22, DepositorAcct);
				pst.setString(23, IFSC);
				pst.setString(24, draweeBankSortCode);

				if (draweeBankSortCode.equalsIgnoreCase("000000000"))
					pst.setString(25, "Y");
				else
					pst.setString(25, "N");

				pst.setString(26, Configuration.getDDMMYYYY());// CLI_DDMMYYYY
				pst.setString(27, seqNo);// CLI_UNIQUENO
				pst.setString(28, str_filename);
				pst.setString(29, "");
				pst.setString(30, "");
				pst.setString(31, CliSeqNo);
				pst.setString(32, CPPS_Flag);
				//added by sam
				
				if(CFG_CONTINUE_CLEARING_FLG.equals("Y")&& cbs_conti_flg.equals("Y"))
				{
					clrseqno=clrseqno+1;
					pst.setInt(34, clrseqno);
				}
				else
				{
					String clrseqno_str="";
					pst.setString(34, clrseqno_str);
				}		
				
				pst.setString(35,item_expiry);	
				if(CFG_CONTINUE_CLEARING_FLG.equals("Y")&& cbs_conti_flg.equals("Y"))
				{
					fullline = fullline+cycl_seqNo+clrseqno;	
					pst.setString(14, fullline);
				}
				else
				{
				  pst.setString(14, fullline);
				}
				System.out.println("end of fullline" + fullline);
				System.out.print("\n @@@@ENCRY_DECRYPT_FLG="+ENCRY_DECRYPT_FLG);
				if(ENCRY_DECRYPT_FLG.equalsIgnoreCase("Y"))
				{
					System.out.print("\n Inside if of encrpt decrypt ");
					ps_values = con.prepareStatement("select hocust.encrypt_string('"+fullline+"') from dual");
					rs_encypt = ps_values.executeQuery();
					if (rs_encypt.next())
					{
						fullline = rs_encypt.getString(1);
						System.out.print("\n after rs.getString(1)="+rs_encypt.getString(1));
					}
					System.out.print("\n after fullline="+fullline);
				}
				
				//System.out.println("***** 7 **** ");
				System.out.println("*****query **** "+insrt_qry);
				try {
					System.out.println("*****query **** "+pst);
					int cnt = pst.executeUpdate();
					System.out.println("*********** 8 **** ");
				} catch (SQLException e) {
					System.out.println(e + "      " + SerialNo + "   "
							+ PayorBankRoutNo);
					if (!(e.getMessage().indexOf("ORA-00001") > -1))
						throw new Exception("MyException...");
					
					e.printStackTrace();
				}
				if (file1Bool && file2Bool && file3Bool)
					pw.println(fullline);
				//System.out.println("" + fullline);
				fullline = null;
				pw.flush();
				//////sam 12032025
				 if (Configuration.getConfValByNm("CFG_CLRINWRD_UPDTFLG", con).equalsIgnoreCase("Y")) {
					 int deletcounter=0;
					 PreparedStatement pstdelcount = null;
						PreparedStatement pstdelcout1 = null;
					    try {
						
						
						String querydete="select count(*) from clearinginward_history where CLI_DDMMYYYY=?";
						String querydelet1="delete from clearinginward_history where CLI_DDMMYYYY=?";
						pstdelcount=con.prepareStatement(querydete);
						
						pstdelcount.setString(1,Configuration.getDDMMYYYY());
						ResultSet rsdete = pstdelcount.executeQuery();
						while (rsdete.next()) 
						{
							deletcounter=rsdete.getInt(1);
						}
						rsdete.close();
						pstdelcount.close();
						
						//con = null;
						
						 System.out.println("counter clearinginward_historyno\n" +deletcounter);
					    if (deletcounter>0) {
					    	pstdelcout1 = con.prepareStatement(querydelet1);
					    	pstdelcout1.setString(1, Configuration.getDDMMYYYY());
			                 ResultSet rsdel1 = pstdelcout1.executeQuery();
			                 if (rsdel1.next())
			                 {
			                	 //status=rsdel1.getInt(1);
			                		//System.out.println("status sr no\n" +status);
			                	
			                 }
			                 //status++;
			                 rsdel1.close();
			                 pstdelcout1.close();
			                 
			                 
					    }
					   
					    }// end try
						catch (Exception e) {// catch
							e.printStackTrace();
							System.out.println("Error while reading clearinginward_historyno\n" + e.getMessage());
							Configuration.writeLog("In clearinginward_historyno----"+e);
							
						}// catch
		                final PreparedStatement pt = con.prepareStatement("insert into clearinginward_history select * from clearinginward where cli_ddmmyyyy=?");
		                pt.setString(1, Configuration.getDDMMYYYY());
		                final int i = pt.executeUpdate();
		                if (i > 0) {
		                    flg =true;
		                }
		                else {
		                    flg = false;
		                }
		                pt.close();
		            }
			}
			reader.close();
		}// end try
		catch (Exception e) {// catch
			e.printStackTrace();
			System.out.println("Error while reading PXF\n" + e.getMessage());
			flg = true;
		}// catch
		finally {
			try {
				pw.close();
				pst.close();
				pst1.close();
				pst3.close();
				stmt_getSeqVal.close();
				con.close();
			} catch (Exception e) {
			}
		}
		System.out.println("****** 14 *****");
		return b;
	}//end readInwardSubPosting() function
	public boolean readKotakFiles(String fileName,int filecnt,Connection con,String cbs_conti_flg)
	{
		boolean b=true;
		boolean flg = true;
		String str_filename =fileName; //fileName.replace("/", "/");
		int clrseqno=0;
		int cycl_seqNo = 0;				 
		String path = "", singleRecord = "", fullline = "", draweeBankSortCode = "",CliSeqNo="";
		String ItemSeqNo = "", PayorBankRoutNo = "", Amount = "", AccountNo = "", 
				SerialNo = "", TransCode = "", PresentingBankRoutNo = "",PresentingBanktrunRoutNo;
		String PresentmentDate = "", ClearingType = "",CycleNo="",CPPS_Flag="N";
		String  TruncatingRTNo = "", UserField = "";
		String CreationDate = "", RBISeqNo = "", 
				InstruDate = "", imageFile1 = "", imageFile2 = "";
		String imageFile3 = "", BOFDRoutNo = "", BOFDBusDate = "", DepositorAcct = "", 
				IFSC = "", seqNo = "", UnqDocKey = "",san="",PayeeName="", SettlementDate="",SessionDate="";
		itemInfo = new ItemInformation();
		long imgFileSize = 0;
		int imgNmCnt = 0;
		System.out.println("***********Sharayu start Kotak readPXF **** " + fileName);		
		String item_expiry= null;
		PreparedStatement pst = null;
		PreparedStatement pt =null;
		PreparedStatement pst1 = null;
		PreparedStatement pst3 = null,pst_cycl_cnt=null,pst_cycl_cnt1=null;
		PreparedStatement stmt_getSeqVal = null;
		ResultSet rs_cycl_seq ;
		int counter = 0;
		PreparedStatement cycl_time = null,seq_cnt_query=null;;
		ResultSet rs_cycl_time = null ;

        int cycl_fileno=0; 
		String BPIBF_fileName = null;
		// ByteToImageConverter _objImageCretor=null;
		int dsLength = 0;
		//String fileNameArr[] = fileName.split("_"); /////need to check cts
		System.out.println("*********** 2 **** ");
		FileReader filereader;
		BufferedReader reader;
		String CFG_CONTINUE_CLEARING_FLG="";
		PrintWriter pw = null;
		String ENCRY_DECRYPT_FLG="";
		PreparedStatement ps_values = null;
					String clyNo=null;
					ResultSet rs_encypt=null;
		try {// try
			//con = Configuration.getConnection();
			String upDownStyle = Configuration
					.getConfValByNm("CFG_INWD_SPLITSTYLE",con);
			double newver=2.1;
			String OURVERSIONNO=Configuration.getConfValByNm("CFG_OURVERSIONNO",con);
			 ENCRY_DECRYPT_FLG=Configuration.getConfValByNm("CFG_ENCRY_DECRYPT_FLG", con);
			System.out.print("OURVERSIONNO=====" + OURVERSIONNO);
			path = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
					+ "ClearingInward/" + str_filename;
			String CFG_PPS_CONNECTED=Configuration.getConfValByNm("CFG_PPS_CONNECTED",con);
			CFG_CONTINUE_CLEARING_FLG=Configuration.getConfValByNm("CFG_CONTINUE_CLEARING_FLG",con);
			String _filename = Configuration
					.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
					+ "/ClearingInward/";

			filereader = new FileReader(path);
			reader = new BufferedReader(filereader);
			stmt_getSeqVal = con
					.prepareStatement("select SEQ_CLEARING_INWARD.nextVal from dual ");
			pst = con
					.prepareStatement("insert into ClearingInward values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,"
							+ "?,?,?,?,?,?,?,?,?,?,?,sysdate,?)");
			System.out.println("*********** path=="+path);
			String imgpath = path.substring(0, path.lastIndexOf("/") );
			System.out.println("*********** imgpath=="+imgpath);
			imgpath = imgpath.substring(0, imgpath.lastIndexOf("/") +1);
			System.out.println("*********** imgpath=== "+imgpath);
			new File(imgpath+"Images/").mkdirs();
			//max(nvl(CLI_CONTI_CYCNO,'0')+1)
			 pst_cycl_cnt= con.prepareStatement("select nvl(max(CLI_CONTI_CYCNO),0)+ 1 from ClearingInward where CLI_DDMMYYYY='"+Configuration.getDDMMYYYY()+"'");//Configuration.getDDMMYYYY()
			 pst_cycl_cnt1= con.prepareStatement("select nvl(max(CLI_CONTI_CYCNO),0) from ClearingInward where CLI_DDMMYYYY='"+Configuration.getDDMMYYYY()+"'");//Configuration.getDDMMYYYY()
			

			cycl_time=con.prepareStatement("select cycl_no from CONTIUES_CYCLE where time_hh=(SELECT TO_CHAR(SYSDATE,'hh') FROM DUAL)");
			seq_cnt_query= con.prepareStatement("select nvl(max(CLI_CHEQ_NO),0),nvl(max(CLI_CYCL_FILENO),0) from ClearingInward where CLI_CONTI_CYCNO=? and CLI_DDMMYYYY='"+Configuration.getDDMMYYYY()+"'" );//Configuration.getDDMMYYYY() 
			
			if(CFG_CONTINUE_CLEARING_FLG.equals("Y") && cbs_conti_flg.equals("Y"))
		    {	 
				/* if(filecnt==0)
					  rs_cycl_seq = pst_cycl_cnt.executeQuery();
				 else
					  rs_cycl_seq = pst_cycl_cnt1.executeQuery();	
					
					if(rs_cycl_seq.next())
					{
						cycl_seqNo = rs_cycl_seq.getInt(1);
						System.out.println("\n if exce cycl_seqNo=="+cycl_seqNo);		
						{
							pst.setInt(33, cycl_seqNo);
						}
						System.out.println("\n if cycl_seqNo=="+cycl_seqNo);
					}
					rs_cycl_seq.close();
					*/

				rs_cycl_time = cycl_time.executeQuery();
						if(rs_cycl_time.next())
						{
							cycl_seqNo = rs_cycl_time.getInt(1);
							System.out.println("For KOTAK :cycl_seqNo==="+cycl_seqNo);						
							pst.setInt(33, cycl_seqNo);			
						}					
						rs_cycl_time.close();
						
						System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ");		
						seq_cnt_query.setInt(1, cycl_seqNo);
						ResultSet rs = seq_cnt_query.executeQuery();
						if(rs.next()) 
						{
							clrseqno = rs.getInt(1);						
							cycl_fileno = rs.getInt(2);
							System.out.println("filecnt="+filecnt+"For KOTAK :cycl_fileno==="+cycl_fileno);
							if(filecnt==0) 
								cycl_fileno=cycl_fileno+1;
							else
								cycl_fileno=cycl_fileno;					
													
							System.out.println("For KOTAK Aftre cycl_fileno==="+cycl_fileno);
							pst.setInt(36, cycl_fileno);						
						}
						rs.close();
						
			 }
			 else
			 {
				 pst.setString(33, "");				 
				 pst.setString(36, "");
			 }
			
			while ((singleRecord = reader.readLine()) != null)
			{
				if(singleRecord.length()>200)
				{
				PresentingBanktrunRoutNo = singleRecord.substring(0, 9);
				
				PayorBankRoutNo =singleRecord.substring(9, 18);
			
				PresentmentDate = singleRecord.substring(18, 26);
				
				Amount = singleRecord.substring(26, 39);
				System.out.println("\nAmount="+Amount);
				Amount=Configuration.lPad(Amount, 13, "0");
				//cheqno =singleRecord.substring(39, 44);
				System.out.println("\n\nAmountafterlpad="+Amount);
				SerialNo = singleRecord.substring(39, 45);
				
				SerialNo=Configuration.lPad(SerialNo, 6, "0");
			
				ItemSeqNo = singleRecord.substring(45, 55);
				
				ItemSeqNo=Configuration.lPad(ItemSeqNo, 10, "0");
				
				TransCode=singleRecord.substring(55, 57);
				
				san=singleRecord.substring(57, 67);
				
				san=Configuration.lPad(san, 10, "0");
				
				PayeeName=singleRecord.substring(67, 117);
			
				SettlementDate=singleRecord.substring(117, 125);
				
				SessionDate=singleRecord.substring(125, 133);
			
				
				PresentingBankRoutNo=singleRecord.substring(133, 142);
			
				CycleNo=singleRecord.substring(142, 144);
				
				//--------------------
				ItemSeqNo = singleRecord.substring(145, 158);
				ItemSeqNo=Configuration.lPad(ItemSeqNo, 14, "0");
				
				
				imageFile1 = "f_"
						+ ItemSeqNo.substring(0, ItemSeqNo.length() >= 9 ? 9
								: ItemSeqNo.length()) + SerialNo
						+ Configuration.lPad("" + imgNmCnt, 3, "0");
				imageFile1 = Configuration.lPad(imageFile1, 27, "0");
				
				//-------------------------------------
				SessionDate=singleRecord.substring(159, 167);
				
				PresentingBankRoutNo=singleRecord.substring(167, 176);
			
				CycleNo=singleRecord.substring(176, 178);	
				
				//-----------------------------------------
				ItemSeqNo = singleRecord.substring(179, 192);
				ItemSeqNo=Configuration.lPad(ItemSeqNo, 14, "0");
			
				//================================
				imageFile2 = "r_"
						+ ItemSeqNo.substring(0, ItemSeqNo.length() >= 9 ? 9
								: ItemSeqNo.length()) + SerialNo
						+ Configuration.lPad("" + imgNmCnt, 3, "0");
				imageFile2 = Configuration.lPad(imageFile2, 27, "0");
				
				//-----------------------------------
				SessionDate=singleRecord.substring(192, 201);
				PresentingBankRoutNo=singleRecord.substring(201, 210);
				CycleNo=singleRecord.substring(210, 212);	
				//------------------------------------
				ItemSeqNo = singleRecord.substring(213, 226);
				ItemSeqNo=Configuration.lPad(ItemSeqNo, 14, "0");
				
				imageFile3 = "f_"
						+ ItemSeqNo.substring(0, ItemSeqNo.length() >= 9 ? 9
								: ItemSeqNo.length()) + SerialNo
						+ Configuration.lPad("" + (imgNmCnt++), 3, "0") + "_G";
				imageFile3 = Configuration.lPad(imageFile3, 27, "0");
				
				SessionDate=singleRecord.substring(227, 235);
				
				PresentingBankRoutNo=singleRecord.substring(235, 244);
			
				CycleNo=singleRecord.substring(244, 246);	
			
				ItemSeqNo = singleRecord.substring(246, 260);
				//System.out.println("\nItemSeqNo=="+ItemSeqNo);
				String pps_val=singleRecord.substring(260,261);
				//System.out.println("\\nCPPS_Flag pps_val=="+pps_val+" length="+pps_val.length());
				//if(string.equals(null) || string.equals("")){
				if(!pps_val.equals("")|| !pps_val.equals(null))
				{	
					if(pps_val.equals("Y")) {
						 CPPS_Flag ="Y";
					}
					else if(pps_val.equals("Y")) 
					{
						 CPPS_Flag ="N";
					}
					else
					{
						 CPPS_Flag ="N";
					}
					//System.out.println("\ninside if CPPS_Flag=="+CPPS_Flag);
				}
				else 
				{
					CPPS_Flag="N";
					System.out.println("\\ninside else CPPS_Flag=="+CPPS_Flag);
				}
				//System.out.println("CPPS_Flag=="+CPPS_Flag);
			if(CFG_CONTINUE_CLEARING_FLG.equals("Y"))					
			{		
				item_expiry = singleRecord.substring(261, 275);
				//System.out.println("item_expiry=="+item_expiry+ " length="+item_expiry.length());
			}
			else
			{
				item_expiry="";
			}
				ItemSeqNo=Configuration.lPad(ItemSeqNo, 14, "0");				
								
				UserField = PayeeName;//Data[9];				
				
				UnqDocKey = SettlementDate+PresentingBankRoutNo+CycleNo+ItemSeqNo;//Data[12];
				DepositorAcct="";//UnqDocKey.substring(10, 26);
				UnqDocKey = Configuration.rPad(UnqDocKey, 80, "0");
				AccountNo = san;//Data[13];
				ClearingType = "01";
				//CycleNo=ClearingType;
				if (_filename.indexOf(".txt") == -1) {
					_filename = _filename + "/" + ClearingType
							+ "_To_CBS_Clearing_Inward.txt";
					pw = new PrintWriter(new FileWriter(_filename, true));// append
																			// mode
				}
				TruncatingRTNo = " ";
				RBISeqNo=ItemSeqNo.substring(ItemSeqNo.length() - 10);
				RBISeqNo = Configuration.lPad(RBISeqNo, 10, "0");
				InstruDate = Configuration.getDDMMYYYY();// Configuration.lPad(InstruDate,8,"0");
				BOFDRoutNo = Configuration.lPad(BOFDRoutNo, 9, "0");
				BOFDBusDate = Configuration.lPad(BOFDBusDate, 8, "0");
				DepositorAcct = Configuration.lPad(DepositorAcct, 25, "0");
				IFSC = Configuration.lPad(IFSC, 11, "0");
			
				String imgFileNm = "";
 
				//System.out.println("\\ndata image=== "+SessionDate+" "+PresentingBankRoutNo+" "+CycleNo+" "+ItemSeqNo);
				
				boolean file1Bool = false, file2Bool = false, file3Bool = false;
				String from1 =(path.substring(0, path.lastIndexOf("/") + 1)) +"Images/"+ SessionDate + PresentingBankRoutNo + CycleNo + ItemSeqNo+ "F.jpg";
				
			    String to1 = (path.substring(0, path.lastIndexOf("/") + 1)) +"Images/"+ imageFile1 + ".tif";
				
			   // System.out.println("from1=="+from1 );
			   // System.out.println("to1=="+to1 );
				 File fileTo1 = new File(to1);
				    File fileFrom1 = new File(from1);
				imgFileNm = (path
						.substring(0, path.lastIndexOf("/") + 1))
						+ SessionDate + PresentingBankRoutNo + CycleNo + ItemSeqNo;
										
				 FileUtils.moveFile(fileFrom1,fileTo1);
				 String from2 = (path.substring(0, path.lastIndexOf("/") + 1)) +"Images/"+ SessionDate + PresentingBankRoutNo + CycleNo + ItemSeqNo+ "R.jpg";
			    String to2 = (path.substring(0, path.lastIndexOf("/") + 1)) +"Images/"+ imageFile2 + ".tif";
			   
				 File fileTo2 = new File(to2);
				    File fileFrom2 = new File(from2);
				    
				
				    FileUtils.moveFile(fileFrom2,fileTo2);
				
				imgFileNm = (path
						.substring(0, path.lastIndexOf("/") + 1))
						+ SessionDate + PresentingBankRoutNo + CycleNo + ItemSeqNo+ "G";
					String from3 = (path.substring(0, path.lastIndexOf("/") + 1)) +"Images/"+ SessionDate + PresentingBankRoutNo + CycleNo + ItemSeqNo+ "G.jpg";
			    String to3 = (path.substring(0, path.lastIndexOf("/") + 1)) +"Images/"+ imageFile3 + ".jpg";
			   
				 File fileTo3 = new File(to3);
				    File fileFrom3 = new File(from3);
				    FileUtils.moveFile(fileFrom3,fileTo3);
				    CreationDate = Configuration.getDDMMYYYY();
				    
				pst.setString(1, PresentingBanktrunRoutNo);
				pst.setString(2, PayorBankRoutNo);
				pst.setString(3, SettlementDate); //CreationDate
				pst.setString(4, Amount);
				pst.setString(5, SerialNo);
				pst.setString(6, RBISeqNo);
				pst.setString(7, TransCode);

				AccountNo = AccountNo.length() > 10 ? AccountNo.substring(
						AccountNo.length() - 10, AccountNo.length())
						: Configuration.lPad(AccountNo, 10, "0");				

				pst.setString(8, AccountNo);
				pst.setString(9, UserField);
				pst.setString(10, SettlementDate);//InstruDate
				pst.setString(11, imageFile1);
				pst.setString(12, imageFile2);
				pst.setString(13, imageFile3);

				TruncatingRTNo = Configuration.lPad(TruncatingRTNo, 9, "0");
				draweeBankSortCode = Configuration.lPad(
						(Configuration.getDraweeSortCode(PayorBankRoutNo)), 9,
						"0");
				CreationDate = Configuration.getDDMMYYYY();// Configuration.lPad(CreationDate,8,"0");
				Amount = Configuration.lPad(Amount, 13, "0");
				SerialNo = Configuration.lPad(SerialNo, 6, "0");
				if(Double.parseDouble(OURVERSIONNO)>=newver)
				{
				TransCode = Configuration.lPad(TransCode,3, "0");
				}
				else{
					TransCode = Configuration.lPad(TransCode,2, "0");
				}
				UserField = Configuration.rPad(UserField, 50, " ");
				PayorBankRoutNo = Configuration.lPad(PayorBankRoutNo, 9, "0");
				CliSeqNo=Configuration.lPad(Integer.toString(cil_clrseqno++),14,"0");
								
				if(Double.parseDouble(OURVERSIONNO)>=newver)
				{
				fullline = PresentingBanktrunRoutNo + draweeBankSortCode + SettlementDate //CreationDate
						+ Amount + SerialNo + RBISeqNo + TransCode + AccountNo
						+ UserField + SettlementDate + imageFile1 + imageFile2 //InstruDate
						+ imageFile3 + UnqDocKey + PayorBankRoutNo
						+ ClearingType+Configuration.lPad(CliSeqNo,20," ");//ItemSeqNo
					if(CFG_PPS_CONNECTED.equalsIgnoreCase("Y"))
					{
						fullline=fullline+CPPS_Flag;
					}
				//System.out.print("\nnewversion=====" + OURVERSIONNO);
				
				}
				else{
					fullline = PresentingBanktrunRoutNo + draweeBankSortCode + SettlementDate //CreationDate
							+ Amount + SerialNo + RBISeqNo + TransCode + AccountNo
							+ UserField + SettlementDate + imageFile1 + imageFile2 //InstruDate
							+ imageFile3 + UnqDocKey + PayorBankRoutNo
							+ ClearingType;
						if(CFG_PPS_CONNECTED.equalsIgnoreCase("Y"))
						{
							fullline=fullline+CPPS_Flag;
						}
					//System.out.print("\\noldversion=====" + OURVERSIONNO);
				}	
				//System.out.print("\nAfter CFG_PPS_CONNECTED=====" + CFG_PPS_CONNECTED);
				//System.out.print("\nAfter CPPS_Flag=====" + CPPS_Flag);
				//System.out.print("\nAfter the fullline added ===" + fullline);
				pst.setString(15, ItemSeqNo);
				pst.setString(16, ClearingType);
				pst.setString(17, PresentmentDate);
				pst.setString(18, CycleNo);
				pst.setString(19, PresentingBankRoutNo);
				pst.setString(20, BOFDRoutNo);
				pst.setString(21, SettlementDate);//BOFDBusDate
				pst.setString(22, DepositorAcct);
				pst.setString(23, IFSC);
				pst.setString(24, draweeBankSortCode);

				if (draweeBankSortCode.equalsIgnoreCase("000000000"))
					pst.setString(25, "Y");
				else
					pst.setString(25, "N");

				pst.setString(26, Configuration.getDDMMYYYY());// CLI_DDMMYYYY
				pst.setString(27, Configuration.lPad(CliSeqNo, 15, "0"));// CLI_UNIQUENOseqNo
				pst.setString(28, str_filename);
				pst.setString(29, "");
				pst.setString(30, "");
				pst.setString(31, CliSeqNo);
				pst.setString(32, CPPS_Flag);
		if(CFG_CONTINUE_CLEARING_FLG.equals("Y"))					
		{	  
			clrseqno=clrseqno+1;
			pst.setInt(34, clrseqno);
			pst.setString(35,item_expiry);
			fullline=fullline+cycl_seqNo+clrseqno;
		}
		else
		{
			clrseqno=clrseqno+1;
			pst.setString(34, "");
			pst.setString(35,"");
		}
			
				
				//System.out.println("fullline==* "+fullline);
				pst.setString(14, fullline);
				//----code added by SAM 25042025
				System.out.print("\n @@@@ENCRY_DECRYPT_FLG="+ENCRY_DECRYPT_FLG);
				if(ENCRY_DECRYPT_FLG.equalsIgnoreCase("Y"))
				{
					System.out.print("\n Inside if of encrpt decrypt ");
					ps_values = con.prepareStatement("select hocust.encrypt_string('"+fullline+"') from dual");
					rs_encypt = ps_values.executeQuery();
					if (rs_encypt.next())
					{
						fullline = rs_encypt.getString(1);
						System.out.print("\n after rs.getString(1)="+rs_encypt.getString(1));
					}
					System.out.print("\n after readLine="+fullline);
				}
				
				try 
				{
					int cnt = pst.executeUpdate();
					
				} catch (SQLException e) {
					System.out.println(e + "      " + SerialNo + "   "
							+ PayorBankRoutNo);
					if (!(e.getMessage().indexOf("ORA-00001") > -1))
						throw new Exception("MyException...");
				}
				//System.out.println("file1Bool " + file1Bool +"file2Bool=="+file2Bool+"file3Bool =="+file3Bool);
				//if (file1Bool && file2Bool && file3Bool)
					pw.println(fullline);
				//System.out.println("" + fullline);
				fullline = null;
				pw.flush();}
			}
			reader.close();
			try {
				pt = con.prepareStatement("insert into clearinginward_history select * from clearinginward where cli_ddmmyyyy=?");
	                pt.setString(1, Configuration.getDDMMYYYY());
	                 int i = pt.executeUpdate();
	               
	               // pt.close();
				//System.out.println("*********** 8 **** ");
			} catch (SQLException e) {
				System.out.println(e + "      " + SerialNo + "   "
						+ PayorBankRoutNo);
				if (!(e.getMessage().indexOf("ORA-00001") > -1))
					throw new Exception("MyException...");
			}
			//reader.close();
		}// end try
		catch (Exception e) {// catch
			e.printStackTrace();
			System.out.println("Error while reading PXF\n" + e.getMessage());
			flg = true;
		}// catch
		finally {
			try {
				pw.close();
				pst.close();
				pt.close();
				pst1.close();
				pst3.close();
				stmt_getSeqVal.close();
				//con.close();
			} catch (Exception e) {
			}
		}
		//System.out.println("****** 14 *****");
		return b;
	}
	public String readOutwardCXF(ArrayList<String> xmlFiles, ArrayList<String> imgFiles) 
	{// readBPXF
		String flg = "",errorString="0#";
		String str_filename = "", fullline ="",cbsVendor="",SettlementDate = "",fileName="",korasFileName="";
		itemInfo = new ItemInformation();
		long imgFileSize = 0;
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!! start readOutwardCXF !!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + fileName);
		Configuration.writeLog("!!!!!!!!!!!!!!!!!!!!!!!!!!1 start readOutwardCXF !!!!!!!!!!!!!!!!!!!!!!!! " + fileName);
		Connection con = null;
		//PreparedStatement pst = null;
		//PreparedStatement pst1 = null;
		//PreparedStatement pst3 = null;
		//PreparedStatement stmt_getSeqVal = null;
		int counter = 0;
		long totalAmount=0;
		int imageViewDataCnt=0;
		StringBuffer inwTxtBuffer=new StringBuffer();
		String BPIBF_fileName = null,_filenameKoras="",fulllineKoras="";
		ByteToImageConverter _objImageCretor = null;
		int dsLength = 0;
		PrintWriter pw = null,pw1=null,pw2=null;
		PrintWriter pwKoras = null;
		PreparedStatement ps_values = null;
		
		ResultSet rs_enc=null;
		try 
		{// try
			
			con = Configuration.getConnection();
			//String upDownStyle = Configuration.getConfValByNm("CFG_INWD_SPLITSTYLE",con);
			cbsVendor=Configuration.getConfValByNm("CFG_CBS_VENDOR",con);
			String ENCRY_DECRYPT_FLG=Configuration.getConfValByNm("CFG_ENCRY_DECRYPT_FLG", con);
			
			FileInputStream fins = null;
			_objImageCretor = new ByteToImageConverter();
			String dir = Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
			{
				String tempFileList[]=new File(dir).list();
				for(int i=0;i<tempFileList.length;i++)
				{
					String str=tempFileList[i];
					if(str.toLowerCase().indexOf("temp")>-1)
					{
						if(dir.toLowerCase().indexOf("smb://")>-1)
						{
							new SmbFile(dir+tempFileList[i]).delete();
						}
						else
						{
							FileUtils.forceDelete(new File(dir+tempFileList[i]));
						}
					}
				}
			}
			File []fileNms=new File(Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"/ClearingInward/").listFiles();
			for(int x=0;x<fileNms.length;x++)
			{
				if(fileNms[x].getName().indexOf("_Clearing_Verify")>-1)
					System.out.println("before verify=="+fileNms[x].delete());
			}
			for(int m=0;m<xmlFiles.size();m++)
			{//xmlFiles Loop
				imgFileSize=0;
				String _filename = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"/ClearingInward/";
				
				fileName=xmlFiles.get(m);
				System.out.println("fileName==="+fileName);
				str_filename = xmlFiles.get(m);
				BPIBF_fileName = Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con)+ imgFiles.get(m);
			
				String bpxfFilePath = Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
				File file = new File(dir + "/" + fileName);
				if (file.isFile()) 
				{// if(file.isFile())
					StringBuffer allStr = new StringBuffer("");
					this.fileName = file.getName();// fileName;
					String fullFIlePath = dir + fileName;
					XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
					XMLEventReader xmlEventReader = xmlInputFactory
						.createXMLEventReader(new FileInputStream(fullFIlePath));
					String CreationDate = "";
					String PayorBankRoutNo = "", TruncatingRTNo = "", SerialNo = "", TransCode = "", ItemSeqNo = "", ClearingType = "", cycleNo = "";
					String Payeename="";
					String imageFile1 = "", imageFile2 = "", imageFile3 = "";
					String branches = "", Amount = "", AccountNo = "", presentmentDate = "";
				
					int ImageViewDetailCnt = 0;
					
				
					String clearingType = Configuration.lPad(fileName.split("_")[4], 2, "0");
					System.out.println("\n\t clearingType:" + clearingType);
					_filename = _filename + "/" +clearingType+"_Clearing_Verify.txt";
					pw = new PrintWriter(new FileWriter(_filename, true));// append mode
					
					String imgDs1 = "~";
					String imgDs2 = "~";
					int imgDsCnt = 0;
					String PresentingBankRoutNo = "", BOFDRoutNo = "", BOFDBusDate = "", DepositorAcct = "", IFSC = "";
					int imgNmCnt = 0;
					while (xmlEventReader.hasNext()) 
					{// 1
						XMLEvent event = xmlEventReader.nextEvent();
						if (event.isStartElement()) 
						{// 2
							StartElement element = (StartElement) event;
							if (element.getName().getLocalPart().equalsIgnoreCase("FileHeader")) 
							{// 2--1
								Iterator iterator = element.getAttributes();
								while (iterator.hasNext()) 
								{// 4
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
									if (nm.equalsIgnoreCase("CreationDate")) {
										CreationDate = value;
									}
									if (nm.equalsIgnoreCase("SettlementDate")) {
										SettlementDate = value;
									}
								}// 4
							}
							if (element.getName().getLocalPart().equalsIgnoreCase("Item")) 
							{// 3
								counter++;
								Iterator iterator = element.getAttributes();
								Payeename = "   ";
								while (iterator.hasNext()) 
								{// 4
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
									System.out.println("\n\nTag Name="+nm);
									if (nm.equalsIgnoreCase("ItemSeqNo")) 
									{
										ItemSeqNo = null;
										ItemSeqNo = value;
										try
										{
											if(ItemSeqNo.length()==14)
											{
												
												long itSeqNo=Long.parseLong(ItemSeqNo);
												if(itSeqNo<=0)
												{
													errorString="1#ItemSeqNo is 0#"+ItemSeqNo;
													break;
												}
												else
												{
													if(presentmentDate.length()>0)
													{
														PreparedStatement pst=con.prepareStatement("select count(*) from CLEARINGOUTWARD where CLO_DATE_DDMMYYYY=? and CLO_ITEMSEQNO=?");
														pst.setString(1, presentmentDate);
														pst.setString(2, ItemSeqNo);
														ResultSet rs=pst.executeQuery();
														if(rs.next())
														{
															if(rs.getInt(1)==1)
															{
																try
																{
																	PreparedStatement pst1=con.prepareStatement("select to_date(?,'ddmmyyyy') from dual");
																	pst1.setString(1, presentmentDate);
																	ResultSet rs1=pst1.executeQuery();
																	rs1.close();
																	pst1.close();
																}
																catch(SQLException s)
																{
																	errorString="1#PresentmentDate Not Date String#"+presentmentDate;
																	break;
																}
															}
															else
															{
																errorString="1#ItemSeqNo Is Not Unique for #"+presentmentDate+"~"+ItemSeqNo;
																break;
															}
														}
														rs.close();
														
													}
												}
											}
											else
											{
												errorString="1#ItemSeqNo Not 14 Digit#"+ItemSeqNo;
												break;
											}
											
										}
										catch(NumberFormatException e)
										{
											errorString="1#ItemSeqNo Not Numeric#"+ItemSeqNo;
											break;
										}
									}
									if (nm.equalsIgnoreCase("SerialNo")) {
										itemInfo.setSerialNumber(value);
										String chqNo=value;
										try
										{
											if(chqNo.length()==6)
											{
												long lChqNo=Long.parseLong(chqNo);
												if(lChqNo<=0)
												{
													errorString="1#SerialNo is 0#"+chqNo;
													break;
												}
											}
											else
											{
												errorString="1#SerialNo not in 6 digit#"+chqNo;
												break;
											}
											
										}
										catch(NumberFormatException e)
										{
											errorString="1#SerialNo Not Numeric#"+chqNo;
											break;
										}
									}
									if (nm.equalsIgnoreCase("PayorBankRoutNo")) {
										PayorBankRoutNo = null;
										PayorBankRoutNo = value;
										try
										{
											if(PayorBankRoutNo.length()==9)
											{
												long payorbnk=Long.parseLong(PayorBankRoutNo);
												if(payorbnk<=0)
												{
													errorString="1#PayorBankRoutNo is 0#"+PayorBankRoutNo;
													break;
												}
											}
											else
											{
												errorString="1#PayorBankRoutNo Not 9 Digit#"+PayorBankRoutNo;
												break;
											}
											
										}
										catch(NumberFormatException e)
										{
											errorString="1#ItemSeqNo Not Numeric#"+ItemSeqNo;
											break;
										}
										if (branches.indexOf(PayorBankRoutNo + "#") == -1) {
											branches = branches + PayorBankRoutNo
													+ "#";
										}
									}
									if (nm.equalsIgnoreCase("PresentmentDate")) {
										presentmentDate = null;
										presentmentDate = value;
										if(presentmentDate.length()==8)
										{
											if(ItemSeqNo.length()>0)
											{
												PreparedStatement pst=con.prepareStatement("select count(*) from CLEARINGOUTWARD where CLO_DATE_DDMMYYYY=? and CLO_ITEMSEQNO=?");
												pst.setString(1, presentmentDate);
												pst.setString(2, ItemSeqNo);
												ResultSet rs=pst.executeQuery();
												if(rs.next())
												{
													if(rs.getInt(1)==1)
													{
														try
														{
															PreparedStatement pst1=con.prepareStatement("select to_date(?,'ddmmyyyy') from dual");
															pst1.setString(1, presentmentDate);
															ResultSet rs1=pst1.executeQuery();
															rs1.close();
															pst1.close();
														}
														catch(SQLException s)
														{
															errorString="1#PresentmentDate Not Date String#"+presentmentDate;
															break;
														}
													}
													else
													{
														errorString="1#ItemSeqNo Is Not Unique for #"+presentmentDate+"~"+ItemSeqNo;
														break;
													}
												}
												rs.close();
												pst.close();
											}
										}
										else
										{
											errorString="1#PresentmentDate Not 8 Digit#"+PayorBankRoutNo;
											break;
										}
									}
									if (nm.equalsIgnoreCase("TruncatingRTNo")) {
										TruncatingRTNo = null;
										TruncatingRTNo = value;
										// allStr.append(TruncatingRTNo);
									}
									if (nm.equalsIgnoreCase("Amount")) {
										Amount = null;
										Amount = value;
										try
										{
											if(Amount.length()>0 && Amount.length()<19)
											{
												long amount=Long.parseLong(Amount);
												if(amount<=0)
												{
													errorString="1#Amount is 0#"+Amount;
													break;
												}
											}
											else
											{
												errorString="1#Amount not in 1 to 18 digit#"+Amount;
												break;
											}
											
										}
										catch(NumberFormatException e)
										{
											errorString="1#Amount Not Numeric#"+Amount;
											break;
										}
										totalAmount=totalAmount+(Long.parseLong(Amount));
									}
									if (nm.equalsIgnoreCase("SerialNo")) {
										SerialNo = null;
										SerialNo = value;
										try
										{
											if(SerialNo.length()==6)
											{
												long serialNo=Long.parseLong(SerialNo);
											}
											else
											{
												errorString="1#SerialNo not in 6 digit#"+SerialNo;
												break;
											}
											
										}
										catch(NumberFormatException e)
										{
											errorString="1#SerialNo Not Numeric#"+SerialNo;
											break;
										}
									}
									if (nm.equalsIgnoreCase("AccountNo")) {
										AccountNo = null;
										AccountNo = value;
										try
										{
											if(AccountNo.length()>5 && AccountNo.length()<8)
											{
												long account=Long.parseLong(AccountNo);
											}
											else
											{
												errorString="1#AccountNo not in 6 to 7 digit#"+AccountNo;
												break;
											}
											
										}
										catch(NumberFormatException e)
										{
											errorString="1#AccountNo Not Numeric#"+AccountNo;
											break;
										}
									}
									if (nm.equalsIgnoreCase("TransCode")) {
										TransCode = null;
										TransCode = "" + Integer.parseInt(value);
										try
										{
											if(TransCode.length()>1 && TransCode.length()<=3)
											{
												long trancode=Long.parseLong(TransCode);
												if(trancode<=0)
												{
													errorString="1#TransCode is 0#"+TransCode;
													break;
												}
											}
											else
											{
												errorString="1#TransCode not in 2digit#"+TransCode;
												break;
											}
											
										}
										catch(NumberFormatException e)
										{
											errorString="1#TransCode Not Numeric#"+TransCode;
											break;
										}
									}
									if (nm.equalsIgnoreCase("ClearingType")) {
										ClearingType = null;
										ClearingType = value;
										try
										{
											if(ClearingType.length()==2)
											{
												long clearingtype=Long.parseLong(ClearingType);
												if(clearingtype<=0)
												{
													errorString="1#ClearingType is 0#"+ClearingType;
													break;
												}
											}
											else
											{
												errorString="1#ClearingType not in 2 digit#"+ClearingType;
												break;
											}
											
										}
										catch(NumberFormatException e)
										{
											errorString="1#ClearingType Not Numeric#"+ClearingType;
											break;
										}
									}
									if (nm.equalsIgnoreCase("CycleNo")) {
										cycleNo = null;
										cycleNo = value;
										try
										{
											if(cycleNo.length()>1 && TransCode.length()<=3)
											{
												long cycleno=Long.parseLong(cycleNo);
												if(cycleno<=0)
												{
													errorString="1#CycleNo is 0#"+cycleNo;
													break;
												}
											}
											else
											{
												errorString="1#CycleNo not in 2digit#"+cycleNo;
												break;
											}
											
										}
										catch(NumberFormatException e)
										{
											errorString="1#CycleNo Not Numeric#"+cycleNo;
											break;
										}
									}
									if (nm.equalsIgnoreCase("NumOfImageViews")) {
										String NumOfImageViews = null;
										NumOfImageViews = value;
										try
										{
											if(NumOfImageViews.length()==1)
											{
												long numOfImageViews=Long.parseLong(NumOfImageViews);
												if(numOfImageViews!=3)
												{
													errorString="1#NumOfImageViews is #"+NumOfImageViews;
													break;
												}
											}
											else
											{
												errorString="1#NumOfImageViews not in 1 digit#"+NumOfImageViews;
												break;
											}
											
										}
										catch(NumberFormatException e)
										{
											errorString="1#NumOfImageViews Not Numeric#"+NumOfImageViews;
											break;
										}
									}
									if (nm.equalsIgnoreCase("PresentingBankRoutNo")) {
										PresentingBankRoutNo = null;
										PresentingBankRoutNo = value;
										if(!Configuration.getConfValByNm("CFG_SERVICEBNKROUTINGCODE",con).equalsIgnoreCase(PresentingBankRoutNo))
										{
											errorString="1#PresentingBankRoutNo Is Wrong#"+PresentingBankRoutNo;
											break;
										}
	
									}
									if (nm.equalsIgnoreCase("UserField")) {
										Payeename = null;
										Payeename = value;
										if(Payeename.length()>0 && Payeename.length()<26)
										{
											String emailPattern = "[a-zA-Z0-9][a-zA-Z0-9\\s]*";
											if(!Payeename.matches(emailPattern))
											{
												errorString="1#Payeename Not Allowed Special Characters#"+Payeename;
												break;
											}
										}
										else
										{
											errorString="1#Payeename Is NOt In 1 to 25 characters#"+Payeename;
											break;
										}
									}
									if (nm.equalsIgnoreCase("DocType")) {
										String DocType = null;
										DocType = value;
										if(DocType.length()==1)
										{
											if(!DocType.equals("A")&&!DocType.equals("B")&&!DocType.equals("C")&&!DocType.equals("D")&&!DocType.equals("E")&&!DocType.equals("F"))
											{
												errorString="1#DocType not in A/B/C/D/E/F digit#"+DocType;
												break;
											}
										}
										else
										{
											errorString="1#DocType not in 1 digit#"+DocType;
											break;
										}
									}
									if (nm.equalsIgnoreCase("MICRRepairFlags")) {
										String MICRRepairFlags = null;
										MICRRepairFlags = value;
										if(!MICRRepairFlags.equals("000000"))
										{
											errorString="1#MICRRepairFlags not 000000#"+MICRRepairFlags;
											break;
										}
									}
								}// 4
								if(errorString.startsWith("1#"))
								{
									System.out.println("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									Configuration.writeLog("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									break;
								}
							}// 3
							if (element.getName().getLocalPart().equalsIgnoreCase("MICRDS")) 
							{// 3.1--
								Iterator iterator = element.getAttributes();
								while (iterator.hasNext()) 
								{// 1
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
	
									if (nm.equalsIgnoreCase("Source")) {
										String Source= null;
										Source = value;
										if(!Source.equals("Capture"))
										{
											errorString="1#Source is not Capture#"+Source;
											break;
										}
									}
									if (nm.equalsIgnoreCase("DigitalSignatureMethod")) {
										String DigitalSignatureMethod= null;
										DigitalSignatureMethod = value;
										if(!DigitalSignatureMethod.equals("RSA_with_SHA256"))
										{
											errorString="1#DigitalSignatureMethod is not RSA_with_SHA256#"+DigitalSignatureMethod;
											break;
										}
									}
									if (nm.equalsIgnoreCase("SecurityKeySize")) {
										String SecurityKeySize= null;
										SecurityKeySize = value;
										if(!SecurityKeySize.equals("2048"))
										{
											errorString="1#SecurityKeySize is not 2048#"+SecurityKeySize;
											break;
										}
									}
									if (nm.equalsIgnoreCase("MICRFingerPrint")) {
										String MICRFingerPrint= null;
										MICRFingerPrint = value;
										if(!MICRFingerPrint.equals(SerialNo+";"+PayorBankRoutNo+";"+AccountNo+";"+TransCode+";"+Amount+";"))
										{
											errorString="1#MICRFingerPrint is not "+SerialNo+";"+PayorBankRoutNo+";"+AccountNo+";"+TransCode+";"+Amount+";#"+MICRFingerPrint;
											break;
										}
									}
									if (nm.equalsIgnoreCase("DigitalSignatureLength")) {
										String DigitalSignatureLength= null;
										DigitalSignatureLength = value;
										if(!DigitalSignatureLength.equalsIgnoreCase("344"))
										{
											errorString="1#DigitalSignatureLength is not 344#"+DigitalSignatureLength;
											break;
										}
									}
									if (nm.equalsIgnoreCase("SignatureData")) {
										String SignatureData= null;
										SignatureData = value;
										if(SignatureData.length()<1 || SignatureData.length()>350)
										{
											errorString="1#SignatureData is not in 1 to 350#"+SignatureData;
											break;
										}
									}
									if (nm.equalsIgnoreCase("SecurityOriginatorName")) {
										String SecurityOriginatorName= null;
										SecurityOriginatorName = value;
										if(SecurityOriginatorName.length()<1 || SecurityOriginatorName.length()>16)
										{
											errorString="1#SecurityOriginatorName is not in 1 to 16#"+SecurityOriginatorName;
											break;
										}
									}
									if (nm.equalsIgnoreCase("SecurityAuthenticatorName")) {
										String SecurityAuthenticatorName= null;
										SecurityAuthenticatorName = value;
										if(SecurityAuthenticatorName.length()<1 || SecurityAuthenticatorName.length()>16)
										{
											errorString="1#SecurityAuthenticatorName is not in 1 to 16#"+SecurityAuthenticatorName;
											break;
										}
									}
									if (nm.equalsIgnoreCase("SecurityKeyName")) {
										String SecurityKeyName= null;
										SecurityKeyName = value;
										if(SecurityKeyName.length()<1 || SecurityKeyName.length()>16)
										{
											errorString="1#SecurityKeyName is not in 1 to 16#"+SecurityKeyName;
											break;
										}
									}
								}// 1
								if(errorString.startsWith("1#"))
								{
									System.out.println("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									Configuration.writeLog("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									break;
								}
							}// 3.1--
							if (element.getName().getLocalPart().equalsIgnoreCase("AddendA")) 
							{// 3.1
								Iterator iterator = element.getAttributes();
								while (iterator.hasNext()) 
								{// 1
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
	
									if (nm.equalsIgnoreCase("BOFDRoutNo")) {
										BOFDRoutNo = null;
										BOFDRoutNo = value;
										try
										{
											if(BOFDRoutNo.length()==9)
											{
												long bOFDRoutNo=Long.parseLong(BOFDRoutNo);
											}
											else
											{
												errorString="1#BOFDRoutNo not in 2digit#"+BOFDRoutNo;
												break;
											}
										}
										catch(NumberFormatException e)
										{
											errorString="1#BOFDRoutNo Not Numeric#"+BOFDRoutNo;
											break;
										}
									}
									if (nm.equalsIgnoreCase("BOFDBusDate")) {
										BOFDBusDate = null;
										BOFDBusDate = value;
										try
										{
											PreparedStatement pst1=con.prepareStatement("select to_date(?,'ddmmyyyy') from dual");
											pst1.setString(1, presentmentDate);
											ResultSet rs1=pst1.executeQuery();
											rs1.close();
											pst1.close();
										}
										catch(SQLException s)
										{
											errorString="1#BOFDBusDate Not Date String#"+BOFDBusDate;
											break;
										}
									}
									if (nm.equalsIgnoreCase("DepositorAcct")) {
										DepositorAcct = null;
										DepositorAcct = value;
									}
									if (nm.equalsIgnoreCase("IFSC")) {
										IFSC = null;
										IFSC = value;
										if(IFSC.length()!=11)
										{
											errorString="1#IFSC Not 11 characters#"+IFSC;
											break;
										}
									}
								}// 1
								if(errorString.startsWith("1#"))
								{
									System.out.println("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									Configuration.writeLog("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									break;
								}
							}// 3.1
							if (element.getName().getLocalPart().equals("ImageViewDetail")) 
							{// 5
								ImageViewDetailCnt++;
								Iterator iterator = element.getAttributes();
								imgbn = new ImageBean();
								while (iterator.hasNext()) 
								{// 6
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
									if (nm.equals("ViewSideIndicator"))
									{
										imgbn.setViewSideIndicator(value);
									}
									if (nm.equals("ViewFormat")) 
									{
										imgbn.setViewFormat(value);
									}
									if (nm.equals("CompressionType")) 
									{
										String CompressionType=value;
										if(!(CompressionType.equalsIgnoreCase("G4")||CompressionType.equalsIgnoreCase("JPEG")))
										{
											errorString="1#CompressionType is no g4 OR jpeg#"+CompressionType;
											break;
										}
									}
									if (nm.equals("ViewDescriptor")) 
									{
										String ViewDescriptor=value;
										if(!ViewDescriptor.equalsIgnoreCase("Full"))
										{
											errorString="1#ViewDescriptor is no Full#"+ViewDescriptor;
											break;
										}
									}
									if (nm.equals("ImageAvailable")) 
									{
										String ImageAvailable=value;
										if(!ImageAvailable.equalsIgnoreCase("Y"))
										{
											errorString="1#ImageAvailable is no Y#"+ImageAvailable;
											break;
										}
									}
									
								}// 6
								if (ImageViewDetailCnt % 3 == 1) 
								{
									imageFile1 = null;
									imageFile1 = "f_"+ ItemSeqNo.substring(0,ItemSeqNo.length() >= 9 ? 9: ItemSeqNo.length())
											+ SerialNo
											+ Configuration.lPad("" + imgNmCnt, 3,"0");
									imageFile1 = Configuration.lPad(imageFile1, 27,"0");
									
									imgbn.setImageFile(imageFile1 + ".tif");
									if(!imgbn.getViewFormat().equalsIgnoreCase("TIFF"))
									{
										errorString="1#ViewFormat is no TIFF#"+imgbn.getViewFormat();
										break;
									}
									if(!imgbn.getViewSideIndicator().equalsIgnoreCase("Front BW"))
									{
										errorString="1#ViewSideIndecater is no Front BW#"+imgbn.getViewSideIndicator();
										break;
									}
								}
								if (ImageViewDetailCnt % 3 == 2) 
								{
									imageFile2 = null;
									imageFile2 = "r_"+ ItemSeqNo.substring(0,ItemSeqNo.length() >= 9 ? 9: ItemSeqNo.length())
											+ SerialNo
											+ Configuration.lPad("" + imgNmCnt, 3,"0");
									imageFile2 = Configuration.lPad(imageFile2, 27,"0");
									
									imgbn.setImageFile(imageFile2 + ".tif");
									if(!imgbn.getViewFormat().equalsIgnoreCase("TIFF"))
									{
										errorString="1#ViewFormat is no TIFF#"+imgbn.getViewFormat();
										break;
									}
									if(!imgbn.getViewSideIndicator().equalsIgnoreCase("Back BW"))
									{
										errorString="1#ViewSideIndecater is no Back BW#"+imgbn.getViewSideIndicator();
										break;
									}
								}
								if (ImageViewDetailCnt % 3 == 0) 
								{
									imageFile3 = "f_"+ ItemSeqNo.substring(0,ItemSeqNo.length() >= 9 ? 9: ItemSeqNo.length())
											+ SerialNo
											+ Configuration.lPad("" + (imgNmCnt++),3, "0") + "_G";
									imageFile3 = Configuration.lPad(imageFile3, 27,"0");
									
									imgbn.setImageFile(imageFile3 + ".jpg");
									if(!imgbn.getViewFormat().equalsIgnoreCase("JFIF"))
									{
										errorString="1#ViewFormat is no JFIF#"+imgbn.getViewFormat();
										break;
									}
									if(!imgbn.getViewSideIndicator().equalsIgnoreCase("Front Gray"))
									{
										errorString="1#ViewSideIndecater is no Front Gray#"+imgbn.getViewSideIndicator();
										break;
									}
									imageFile2 = Configuration.lPad(imageFile2, 27,"0");
									imageFile1 = Configuration.lPad(imageFile1, 27,"0");
									TruncatingRTNo = Configuration.lPad(TruncatingRTNo, 9, "0");
									PayorBankRoutNo = Configuration.lPad(PayorBankRoutNo, 9, "0");
									//CreationDate = CreationDate;
									Amount = Configuration.lPad(Amount, 13, "0");
									SerialNo = Configuration.lPad(SerialNo, 6, "0");
									String RBISeqNo = ItemSeqNo.length() > 10 ? ItemSeqNo
											.substring(ItemSeqNo.length() - 10,ItemSeqNo.length())
											: Configuration.lPad(ItemSeqNo, 10, "0");
	
									TransCode = Configuration.lPad("" + Integer.parseInt(TransCode), 3,"0");
									AccountNo = AccountNo.length() > 10 ? AccountNo.substring(AccountNo.length() - 10,
													AccountNo.length()): Configuration.lPad(AccountNo, 10, "0");
									
									Payeename = Configuration.lPad(Payeename, 50," ");
	
									String InstruDate = CreationDate;
									String cycleNumber = "";
									String UnqDocKey = CreationDate	+ PayorBankRoutNo + cycleNumber	+ ItemSeqNo;
									UnqDocKey = Configuration.rPad(UnqDocKey, 80,"0");
									// pw.println(TruncatingRTNo+PayorBankRoutNo+CreationDate+Amount+SerialNo+RBISeqNo+TransCode+AccountNo+Payeename+InstruDate+imageFile1+imageFile2+imageFile3+UnqDocKey);
									System.out.println("TruncatingRTNo=="+TruncatingRTNo);
										
									AccountNo = AccountNo.length() > 10 ? AccountNo
											.substring(AccountNo.length() - 10,
													AccountNo.length())
											: Configuration
													.lPad(AccountNo, 10, "0");
									
									String draweeBankSortCode = Configuration.getDraweeSortCode(PayorBankRoutNo);
									
									fullline = TruncatingRTNo
												+ draweeBankSortCode + CreationDate
												+ Amount + SerialNo + RBISeqNo
												+ TransCode + AccountNo + Payeename
												+ InstruDate + imageFile1 + imageFile2
												+ imageFile3 + UnqDocKey
												+ PayorBankRoutNo + ClearingType;
									
									System.out.print("\n @@@@ENCRY_DECRYPT_FLG="+ENCRY_DECRYPT_FLG);
									if(ENCRY_DECRYPT_FLG.equalsIgnoreCase("Y"))
									{
										System.out.print("\n Inside if of encrpt decrypt ");
										ps_values = con.prepareStatement("select hocust.ENCRYPT_STRING('"+fullline+"') from dual");
										rs_enc = ps_values.executeQuery();
										if (rs_enc.next())
										{
											fullline = rs_enc.getString(1);
											System.out.print("\n after rs.getString(1)="+rs_enc.getString(1));
										}
										System.out.print("\n after readLine="+fullline);
									}
									
									pw.println(fullline);
									
									fullline = null;
									fulllineKoras="";
									pw.flush();
									System.gc();
								}
								if(errorString.startsWith("1#"))
								{
									System.out.println("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									Configuration.writeLog("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									break;
								}
							}// 5
							if (element.getName().getLocalPart().equals("ImageViewData")) 
							{// 5
								imageViewDataCnt++;
								Configuration.writeLog("ImageViewData cnt"+imageViewDataCnt);
								Iterator iterator = element.getAttributes();
								while (iterator.hasNext()) 
								{// 6
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
									if (nm.equals("ImageDataLength"))// {}
									{
										String ImageDataLength=value;
										imgbn.setImageDataLength(value);
										imgFileSize = imgFileSize
												+ Long.parseLong(value);
										try
										{
											if(ImageDataLength.length()>=0 && ImageDataLength.length()<11)
											{
												long imagedatalength=Long.parseLong(ImageDataLength);
											}
											else
											{
												errorString="1#ImageDataLength is not in 1 to 9999999999#"+ImageDataLength;
												break;
											}
										}
										catch(NumberFormatException e)
										{
											errorString="1#ImageDataLength is not a Number#"+ImageDataLength;
											break;
										}
										
									}
									if (nm.equals("ImageDataOffset"))
									{
										String ImageDataOffset=value;
										System.out.println("\n\nImageDataOffset===="+ImageDataOffset);
										imgbn.setImageDataOffset(value);
										try
										{
											if(ImageDataOffset.length()>=0 && ImageDataOffset.length()<11)
											{
												long imageDataOffset=Long.parseLong(ImageDataOffset);
											}
											else
											{
												errorString="1#ImageDataOffset is not in 1 to 9999999999#"+ImageDataOffset;
												break;
											}
										}
										catch(NumberFormatException e)
										{
											errorString="1#ImageDataOffset is not a Number#"+ImageDataOffset;
											break;
										}
										
									}
									if (nm.equals("FileName"))// {}
									{
										String FileName=value;
										if(FileName.length()>256 || FileName.length()<1)
										{
											errorString="1#FileName is not in size 1 to 256#"+FileName;
											break;
										}
										Configuration.writeLog("\nFileName="+value);
										fins = new FileInputStream(bpxfFilePath	+ value);
									}
									if (nm.equals("ClippingOrigin"))// {}
									{
										String ClippingOrigin=value;
										if(!ClippingOrigin.equalsIgnoreCase("0"))
										{
											errorString="1#ClippingOrigin is not 0#"+ClippingOrigin;
											break;
										}
										//fins = new FileInputStream(bpxfFilePath	+ value);
									}
								}// 6
								if(errorString.startsWith("1#"))
								{
									System.out.println("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									Configuration.writeLog("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									break;
								}
							}// 5
							if (element.getName().getLocalPart().equals("ImageDS")) 
							{// 7
								Iterator iterator = element.getAttributes();
								while (iterator.hasNext()) 
								{// 8
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
									//if (imgDsCnt == 0) 
									{
										if (nm.equalsIgnoreCase("DigitalSignatureMethod"))
										{
											String DigitalSignatureMethod=value;
											imgDs1 = imgDs1	+ "DigitalSignatureMethod="
													+ value + "~";// imgbn.setDigitalSignatureMethod(value);
											if(!DigitalSignatureMethod.equalsIgnoreCase("RSA_with_SHA256"))
											{
												errorString="1#DigitalSignatureMethod is not RSA_with_SHA256#"+DigitalSignatureMethod;
												break;
											}
											
										}
										if (nm.equalsIgnoreCase("SecurityKeySize"))
										{
											String SecurityKeySize=value;
											imgDs1 = imgDs1 + "SecurityKeySize="
													+ value + "~";// imgbn.setSecurityKeySize(value);
											if(!SecurityKeySize.equalsIgnoreCase("2048"))
											{
												errorString="1#SecurityKeySize is not 2048#"+SecurityKeySize;
												break;
											}
											
										}
										if (nm.equalsIgnoreCase("DigitalSignatureDataOffset"))
										{
											String DigitalSignatureDataOffset=value;
											imgDs1 = imgDs1	+ "DigitalSignatureDataOffset="
													+ value + "~";//imgbn.setDigitalSignatureDataOffset(value);
											if(DigitalSignatureDataOffset.length()<11)
											{
												long digitalSignatureDataOffset=Long.parseLong(DigitalSignatureDataOffset);
												if(digitalSignatureDataOffset<0 || digitalSignatureDataOffset>9999999999l)
												{
													errorString="1#Source is not in range 0 to 9999999999#"+digitalSignatureDataOffset;
													break;
												}
											}
											
										}
										if (nm.equalsIgnoreCase("DigitalSignatureLength")) {
											imgDs1 = imgDs1	+ "DigitalSignatureLength="
													+ value + "~";// imgbn.setDigitalSignatureLength(value);
											dsLength = Integer.parseInt(value);
											imgFileSize = imgFileSize + dsLength;
											if(dsLength!=256)
											{
												errorString="1#Source is not 256#"+dsLength;
												break;
											}
											
										}
										if (nm.equalsIgnoreCase("Source"))
										{
											String Source=value;
											if(!Source.equals("Capture"))
											{
												errorString="1#Source is not Capture#"+Source;
												break;
											}
											imgDs1 = imgDs1 + "Source=" + value+ "~";
										}
										if (nm.equalsIgnoreCase("StartOfProtectedData"))
										{
											String StartOfProtectedData=value;
											try
											{
												if(StartOfProtectedData.length()<9)
												{
													long startOfProtectedData=Long.parseLong(StartOfProtectedData);
													if(startOfProtectedData<0 || startOfProtectedData>99999999)
													{
														errorString="1#StartOfProtectedData is not in range 0 to 99999999#"+startOfProtectedData;
														break;
													}
												}
											}
											catch(NumberFormatException e)
											{
												errorString="1#StartOfProtectedData is not a Number#"+StartOfProtectedData;
												break;
											}
											
										}
										if (nm.equalsIgnoreCase("ProtectedDataLength"))
										{
											String ProtectedDataLength=value;
											try
											{
												if(ProtectedDataLength.length()<9)
												{
													long protectedDataLength=Long.parseLong(ProtectedDataLength);
													if(protectedDataLength<0 || protectedDataLength>99999999)
													{
														errorString="1#ProtectedDataLength is not in range 0 to 99999999#"+ProtectedDataLength;
														break;
													}
												}
											}
											catch(NumberFormatException e)
											{
												errorString="1#ProtectedDataLength is not a Number#"+ProtectedDataLength;
												break;
											}
											
										}
										if (nm.equalsIgnoreCase("FileName"))
										{
											String FileName=value;
											if(FileName.length()>256 || FileName.length()<1)
											{
												errorString="1#FileName is not in size 1 to 256#"+FileName;
												break;
											}	
										}
										if (nm.equalsIgnoreCase("SecurityOriginatorName"))
										{
											String SecurityOriginatorName=value;
											if(SecurityOriginatorName.length()>17)
											{
												errorString="1#SecurityOriginatorName is not in 1 to 16 #"+SecurityOriginatorName;
												break;
											}
										}
										if (nm.equalsIgnoreCase("SecurityAuthenticatorName"))
										{
											String SecurityAuthenticatorName=value;
											if(SecurityAuthenticatorName.length()>17)
											{
												errorString="1#SecurityAuthenticatorName is not in 1 to 16 #"+SecurityAuthenticatorName;
												break;
											}
										}
										if (nm.equalsIgnoreCase("SecurityKeyName"))
										{
											String SecurityKeyName=value;
											if(SecurityKeyName.length()>17)
											{
												errorString="1#SecurityKeyName is not in 1 to 16 #"+SecurityKeyName;
												break;
											}
										}
									}
									
								}// 8
								imgDsCnt++;
								//if (imgDsCnt == 2) 
								{
									String imgDsFinal = "";
									//if (imgDs1.indexOf("ECP.PBCC") > -1) 
									{
										imgDsFinal = imgDs1;
									} 
									/*else 
									{
										imgDsFinal = imgDs2;
									}*/
									Configuration.writeLog("imgDsFinal==="+imgDsFinal);
									String imgDsValues[] = imgDsFinal.split("~");
									for (int k = 0; k < imgDsValues.length; k++) 
									{
										String tagValues[] = imgDsValues[k].split("=");
										if (tagValues[0].equalsIgnoreCase("DigitalSignatureMethod"))// {}
											imgbn.setDigitalSignatureMethod(tagValues[1]);
										if (tagValues[0].equalsIgnoreCase("SecurityKeySize"))// {}
											imgbn.setSecurityKeySize(tagValues[1]);
										if (tagValues[0].equalsIgnoreCase("DigitalSignatureDataOffset"))// {}
											imgbn.setDigitalSignatureDataOffset(tagValues[1]);
										if (tagValues[0].equalsIgnoreCase("DigitalSignatureLength"))// {}
											imgbn.setDigitalSignatureLength(dsLength+ "");
									}
									imgDs1="~";
									imgDsCnt = 0;
								}
								if(errorString.startsWith("1#"))
								{
									System.out.println("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									Configuration.writeLog("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									break;
								}
							}// 7
							if (element.getName().getLocalPart().equals("ImageViewAnalysis")) 
							{// 7
								Iterator iterator = element.getAttributes();
								while (iterator.hasNext()) 
								{// 8
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String value = attribute.getValue();
									String nm = name.getLocalPart();
									if (nm.equalsIgnoreCase("Source"))
									{//9
										String Source=value;
										if(!Source.equals("Capture"))
										{
											errorString="1#Source in ImageViewAnalysis is not Capture#"+Source;
											break;
										}
									}//9
									if (nm.equalsIgnoreCase("ImageQuality"))
									{//9
										String ImageQuality=value;
										if(!ImageQuality.equals("0"))
										{
											errorString="1#Image Quality in ImageViewAnalysis is not 0#"+ImageQuality;
											break;
										}
									}//9
									if (nm.equalsIgnoreCase("ImageUsability"))
									{//9
										String ImageUsability=value;
										if(!ImageUsability.equals("0"))
										{
											errorString="1#Image Usability in ImageViewAnalysis is not 0#"+ImageUsability;
											break;
										}
									}//9
									if (nm.equalsIgnoreCase("ImagingBankSpecificTest"))
									{//9
										String ImagingBankSpecificTest=value;
										if(!ImagingBankSpecificTest.equals("0"))
										{
											errorString="1#Imaging Bank Specific Test in ImageViewAnalysis is not 0#"+ImagingBankSpecificTest;
											break;
										}
									}//9
								}//8
								if(errorString.startsWith("1#"))
								{
									System.out.println("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									Configuration.writeLog("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
									break;
								}
							}//7
										
						}// 2
						if (event.isEndElement()) 
						{// 9
							EndElement element = (EndElement) event;
							if (element.getName().getLocalPart().equals("ImageViewDetail")) 
							{
								try 
								{
									String[] status = _objImageCretor.getImage(imgbn, fins).toString().split("!@!");
									Configuration.writeLog("ImageViewDetail");
								} catch (Exception e) 
								{
									e.printStackTrace();
								}
							}
						}// 9
					}// 1				
				}// if(file.isFile())
			
				System.out.println("inside xmlReader and readBPXF:::"+ imgData.size());
			
				File f = new File(BPIBF_fileName);
				System.out.println("\nImage File name=" + BPIBF_fileName);
				//imgFileSize=imgFileSize+256;
				System.out.println("\nImage File Size=" + f.length());
				System.out.println("\nImage File Size=" + imgFileSize);
				Configuration.writeLog("\nImage File Size=" + f.length());
				Configuration.writeLog("\nImage File Size=" + imgFileSize);
				
				//Configuration.writeLog("*** Exit from DownloadServlet.jsp ::: retVal"+ retVal);
				if(errorString.startsWith("1#"))
				{
					System.out.println("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
					Configuration.writeLog("Error String:"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName);
					flg="Error~"+errorString.split("#")[1]+"\nValue:"+errorString.split("#")[2]+"\n In File Name:"+fileName;
					return flg;
				}
				if( f.length()!=imgFileSize)
				{
					flg = "FAULTYDOWNLOAD";
					System.out.println("Image Size Differes");
					return flg;
				}
				
			}	
			
			pw.close();
			/*if(cbsVendor.equalsIgnoreCase("KORAS"))
			{
				//if(dir.toLowerCase().indexOf("smb://")>-1)
				{
					Runtime.getRuntime().exec( "chmod -R 777 "+Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI", con) );
				}
				Connection con1=Configuration.getConnection();
				con1.setAutoCommit(false);
				try
				{
					String query="select CLI_TRUNCATINGRTNO, CLI_PAYORBANKROUTNO, CLI_CREATIONDATE, CLI_AMOUNT, CLI_SERIALNO, "
							+ "CLI_RBISEQNO, CLI_TRANSCODE, CLI_ACCOUNTNO, CLI_PAYEENAME, CLI_INSTRUDATE, CLI_IMAGEFILE1, "
							+ "CLI_IMAGEFILE2, CLI_IMAGEFILE3, CLI_FULLLINE, CLI_ITEMSEQUENCENO, CLI_CLEARINGTYPE, "
							+ "CLI_PRESENTMENTDATE, CLI_CYCLENO, CLI_PRESENTINGBANKROUTNO, CLI_BOFDROUTNO, CLI_BOFDBUSDATE, "
							+ "CLI_DEPOSITORACCT, CLI_IFSC, CLI_MEMBERBNKSORTCODE, CLI_ISRETURNOUTWARDCHEQUE, CLI_DDMMYYYY, "
							+ "CLI_UNIQUENO, CLI_XMLFILENAME, CLI_INSTRUMENT_ID from CLEARINGINWARD_KUB where cli_ddmmyyyy=? "
							+ "order by CLI_CLEARINGTYPE,CLI_TRUNCATINGRTNO";
					PreparedStatement korasPst=con1.prepareStatement(query,ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
					korasPst.setString(1, Configuration.getDDMMYYYY());
					ResultSet korasRs=korasPst.executeQuery();
					String imagePath=Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI", con1);
					int count=0;
					long total=0;
					while(korasRs.next())
					{
						String str=korasRs.getString("CLI_PAYORBANKROUTNO").substring(6)+korasRs.getString("CLI_SERIALNO")+
								korasRs.getString("CLI_CREATIONDATE")+korasRs.getString("CLI_TRUNCATINGRTNO").substring(3)+
								korasRs.getString("CLI_ITEMSEQUENCENO").substring(korasRs.getString("CLI_ITEMSEQUENCENO").length()-10,
										korasRs.getString("CLI_ITEMSEQUENCENO").length());
						String image1="FTT"+str+".tif";
						File src1=new File(imagePath+korasRs.getString("CLI_IMAGEFILE1")+".tif");
						File dest1=new File(imagePath+image1);
						Configuration.writeLog("src1="+src1+"     dest1="+dest1);
						src1.renameTo(dest1);
						korasRs.updateString("CLI_IMAGEFILE1", image1);
						
						String image2="BTT"+str+".tif";
						File src2=new File(imagePath+korasRs.getString("CLI_IMAGEFILE2")+".tif");
						File dest2=new File(imagePath+image2);
						Configuration.writeLog("src2="+src2+"     dest2="+dest2);
						src2.renameTo(dest2);
						korasRs.updateString("CLI_IMAGEFILE2", image2);

						String image3="FTJ"+str+".jpg";
						File src3=new File(imagePath+korasRs.getString("CLI_IMAGEFILE3")+".jpg");
						File dest3=new File(imagePath+image3);
						Configuration.writeLog("src3="+src3+"     dest3="+dest3);
						src3.renameTo(dest3);
						korasRs.updateString("CLI_IMAGEFILE3", image3);
						
						fulllineKoras=korasRs.getString("CLI_TRUNCATINGRTNO")+korasRs.getString("CLI_PAYORBANKROUTNO")+
						korasRs.getString("CLI_CREATIONDATE")+
						Configuration.lPad(""+Long.parseLong(korasRs.getString("CLI_AMOUNT")),13, "0")+
						korasRs.getString("CLI_SERIALNO")+
						korasRs.getString("CLI_ITEMSEQUENCENO").substring(korasRs.getString("CLI_ITEMSEQUENCENO").length()-10, 
								korasRs.getString("CLI_ITEMSEQUENCENO").length())+korasRs.getString("CLI_TRANSCODE")+
						Configuration.lPad("", 23, " ")+
						Configuration.lPad(image2, 40, "0")+
						Configuration.lPad(image1, 40, "0")+
						Configuration.lPad(image3, 40, "0")+
						SettlementDate.substring(4)+SettlementDate.substring(2,4)+SettlementDate.substring(0,2)+
						korasRs.getString("CLI_PRESENTINGBANKROUTNO")+korasRs.getString("CLI_CYCLENO")+
						korasRs.getString("CLI_ITEMSEQUENCENO")+
						Configuration.rPad(korasRs.getString("CLI_PAYEENAME").substring(0, 40).trim(), 40, " ")+
						korasRs.getString("CLI_ACCOUNTNO").substring(korasRs.getString("CLI_ACCOUNTNO").length()-6, 
								korasRs.getString("CLI_ACCOUNTNO").length());
						inwTxtBuffer.append(fulllineKoras+"\n");
						
						korasRs.updateRow();
						count++;
						total+=Long.parseLong(korasRs.getString("CLI_AMOUNT"));
					}
					korasRs.close();
					korasPst.close();
					con1.commit();
					con1.close();
					System.out.println("creating file for koras");
					korasFileName=Configuration.getMMDDYYYY()+Configuration.getHHMISS()+"_CBS Upload Filetemp.txt";;
					_filenameKoras =  Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
					pwKoras = new PrintWriter(new FileWriter(_filenameKoras, true));// append mode
					pwKoras.print("Item Count:"+count+"\n"); 
					pwKoras.print(inwTxtBuffer.toString());
					pwKoras.print("Item Count:"+count+" Amount:");
					String amtStr=""+total;
					pwKoras.print(amtStr.substring(0,amtStr.length()-2)+"."+amtStr.substring(amtStr.length()-2));
					//s.substring(0,s.length()-2)+"."+s.substring(s.length()-2)
					pwKoras.flush();
					pwKoras.close();
				}
				catch(Exception e)
				{
					con1.rollback();
					con1.close();
					flg="ERROR~"+e;
					return flg;
				}
			}*/
			{
				String tempFileList[]=new File(dir).list();
				for(int i=0;i<tempFileList.length;i++)
				{
					String str=tempFileList[i];
					str=str.replaceAll("temp", "");
					
					{
						new File(dir+tempFileList[i]).renameTo(new File(dir+str));
					}
				}
			}
			flg="SUCCESS";
			fins.close();
		}// end try
		catch (Exception e) {// catch
			e.printStackTrace();
			System.out.println("Error while reading XML\n" + e.getMessage());
			Configuration.writeLog("In ReadBPXF----"+e);
			flg = "ERROR~"+e;
		}// catch
		finally 
		{
			/*try {
				pst.close();
			} catch (Exception e) {
			}
			try {
			pst1.close();
			} catch (Exception e) {
			}
			try {
			pst3.close();
			} catch (Exception e) {
			}
			try {
			stmt_getSeqVal.close();
			} catch (Exception e) {
			}*/
			try {
			con.close();
			} catch (Exception e) {
			}
			try {
			pw.close();
			} catch (Exception e) {
			}
			try {
			pwKoras.close();
			} catch (Exception e) {
			}
			try {
			pw1.close();
			} catch (Exception e) {
			}
			try {
			pw2.close();
			} catch (Exception e) {
			}
		}
		System.out.println("****** 14 *****");
		System.out.println("****** 14 *****");
		
		return flg;
	} // end readBPXF
	
	/*public boolean readRetInwXls_hdfc(String filePath, String _fileName) 
	{
		Connection excelCon, con;
		PreparedStatement pst;
		PrintWriter pw;

		try 
		{
			//excelCon = DriverManager
					//.getConnection("jdbc:odbc:Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DBQ="
							//+ filePath + "/" + _fileName + ";ReadOnly=0;");
			System.out.println("Connection Successfull");
			//pst = excelCon.prepareStatement("select * from [Sheet1$]");
			//ResultSet rs = pst.executeQuery();
			Class.forName("oracle.jdbc.driver.OracleDriver");
			con = Configuration.getConnection();DriverManager.getConnection(
					"jdbc:oracle:thin:@172.100.30.54:1521:xe", "CTS_HDFC",
					"list");
			int colCount=-1;
			FileInputStream file = new FileInputStream(new File(filePath+"/"+_fileName));
			HSSFWorkbook workbook = new HSSFWorkbook(file);
			HSSFSheet sheet = workbook.getSheetAt(0);
			Iterator<Row> rowIterato = sheet.iterator();
			String ReturnDate,ClearingType,SessionID,prdate,PresentmentDate,BatchNumber,UDK,
			ChequeNumber,SortCode,TransactionCode,Amount,AccountNumber,PTFFlag,ReturnReasonCode,
			ReturnDescription,BOFDNumber,SubmemberBankName,PayeeNameOrAccountTitle,ReturnReasonRemarksOrComments;
			pst = con
					.prepareStatement("INSERT into RETURNINWARD (RTI_DDMMYYYY,RTI_CLEARINGTYPE,RTI_PRESENTMENTDATE,RTI_BOFDBUSDATE,RTI_SERIALNO,RTI_PAYORBANKROUTNO,RTI_TRANSCODE,RTI_AMOUNT,RTI_ACCOUNTNO,RTI_RETURNREASONCOMMENT,RTI_RETURNREASON,RTI_FILENAME)values(?,?,?,?,?,?,?,?,?,?,?,?) ");
			
			pw = new PrintWriter(new FileWriter(filePath+"To_CBS_Return_Inward.txt", true));
			int rowCnt=0;
			while (rowIterato.hasNext())
			{
				rowCnt++;
				Row row = rowIterato.next();
				Iterator<Cell> cellIterator = row.cellIterator();
				colCount = 1;
				ReturnDate="";
				ClearingType="";
				SessionID="";
				prdate="";
				PresentmentDate="";
				BatchNumber="";
				UDK="";
				ChequeNumber="";
				TransactionCode="";
				SortCode="";
				Amount="";
				AccountNumber="";
				PTFFlag="";
				ReturnReasonCode="";
				ReturnDescription="";
				BOFDNumber="";
				SubmemberBankName="";
				PayeeNameOrAccountTitle="";
				ReturnReasonRemarksOrComments="";
				System.out.println("rowCnt=="+rowCnt);
				
				if(rowCnt>1)
				{
					while (cellIterator.hasNext())
					{
						System.out.println("colCount=="+colCount);
						Cell cell = cellIterator.next();
						cell.setCellType(Cell.CELL_TYPE_STRING);
						if(colCount==1 && cell.getStringCellValue().trim().length()!=8)
							break;
						switch (cell.getCellType())
		                {
							case Cell.CELL_TYPE_STRING:
									
									cell.setCellType(Cell.CELL_TYPE_STRING);
									if(colCount==1)
									{
										String redate = cell.getStringCellValue();
										System.out.println("1=="+redate);
										
										try {
											ReturnDate = (redate.substring(6, 8)
													+ redate.substring(4, 6) + redate.substring(0, 4));
										} catch (NullPointerException ne) 
										{
											break;
										}
									}
									else if(colCount==2)
									{
										 ClearingType =cell.getStringCellValue();
										//ClearingType=ClearingType.substring(0, ClearingType.indexOf('.'));
									}
									else if(colCount==3)
									{
										SessionID =cell.getStringCellValue();
									}
									else if(colCount==4)
									{
										prdate =cell.getStringCellValue();
										System.out.println("4=="+prdate);
										PresentmentDate = (prdate.substring(6, 8)
												+ prdate.substring(4, 6) + prdate.substring(0, 4));
									}
									else if(colCount==5)
									{
										BatchNumber =cell.getStringCellValue();
										
									}
									else if(colCount==6)
									{
										String UDk1 =cell.getStringCellValue();
										 UDK = UDk1.substring(1);
										 UDK=Configuration.lPad(UDK,80," ");
										
									}
									else if(colCount==7)
									{
										ChequeNumber =cell.getStringCellValue();
										//ChequeNumber=ChequeNumber.substring(0, ChequeNumber.indexOf('.'));
										ChequeNumber=Configuration.lPad(ChequeNumber,6,"0");
										
									}
									else if(colCount==8)
									{
										SortCode =cell.getStringCellValue();
										//SortCode=SortCode.substring(0, SortCode.indexOf('.'));
										SortCode=Configuration.lPad(SortCode, 9, "0");
										
									}
									else if(colCount==9)
									{
										TransactionCode =cell.getStringCellValue();
										//TransactionCode=TransactionCode.substring(0, TransactionCode.indexOf('.'));
										TransactionCode=Configuration.lPad(TransactionCode, 3, "0");
										
									}
									else if(colCount==10)
									{
										Amount =cell.getStringCellValue();
										System.out.println("Amount1=="+Amount);
										//Amount = Amount.substring(1);
										System.out.println("Amount2=="+Amount);
										Amount = Amount.replace(".", "");
										System.out.println("Amount3=="+Amount);
										Amount=Configuration.lPad(Amount, 18,"0");
										System.out.println("Amount4=="+Amount);
									}
									else if(colCount==11)
									{
										AccountNumber =cell.getStringCellValue();
										//AccountNumber=AccountNumber.substring(0, AccountNumber.indexOf('.'));
										AccountNumber=Configuration.lPad(AccountNumber, 16, "0");
										
									}
									else if(colCount==12)
									{
										PTFFlag =cell.getStringCellValue();
																		
									}
									else if(colCount==13)
									{
										ReturnReasonCode =cell.getStringCellValue();
										//ReturnReasonCode=ReturnReasonCode.substring(0, ReturnReasonCode.indexOf('.'));
										ReturnReasonCode=Configuration.lPad(ReturnReasonCode,2,"0");
																		
									}
									else if(colCount==14)
									{
										ReturnDescription =cell.getStringCellValue();
										
									}
									else if(colCount==15)
									{
										BOFDNumber =cell.getStringCellValue();
										//BOFDNumber=BOFDNumber.substring(0, BOFDNumber.indexOf('.'));
										BOFDNumber=Configuration.lPad(BOFDNumber,9,"0");
										
									}
									else if(colCount==16)
									{
										SubmemberBankName =cell.getStringCellValue();
																		
									}
									else if(colCount==17)
									{
										PayeeNameOrAccountTitle =cell.getStringCellValue();
																	
									}
									else if(colCount==18)
									{
										ReturnReasonRemarksOrComments =cell.getStringCellValue();
																
									}
									break;
								case Cell.CELL_TYPE_NUMERIC:
									cell.setCellType(Cell.CELL_TYPE_STRING);
									if(colCount==1)
									{
										String redate = cell.getStringCellValue();
										
										try {
											ReturnDate = (redate.substring(6, 8)
													+ redate.substring(4, 6) + redate.substring(0, 4));
										} catch (NullPointerException ne) 
										{
											break;
										}
									}
									else if(colCount==2)
									{
										 ClearingType =cell.getStringCellValue();
										//ClearingType=ClearingType.substring(0, ClearingType.indexOf('.'));
									}
									else if(colCount==3)
									{
										SessionID =cell.getStringCellValue();
									}
									else if(colCount==4)
									{
										prdate =cell.getStringCellValue();
										System.out.println("4=="+prdate);
										PresentmentDate = (prdate.substring(6, 8)
												+ prdate.substring(4, 6) + prdate.substring(0, 4));
									}
									else if(colCount==5)
									{
										BatchNumber =cell.getStringCellValue();
										
									}
									else if(colCount==6)
									{
										String UDk1 =cell.getStringCellValue();
										 UDK = UDk1.substring(1);
										 UDK=Configuration.lPad(UDK,80," ");
										
									}
									else if(colCount==7)
									{
										ChequeNumber =cell.getStringCellValue();
										//ChequeNumber=ChequeNumber.substring(0, ChequeNumber.indexOf('.'));
										ChequeNumber=Configuration.lPad(ChequeNumber,6,"0");
										
									}
									else if(colCount==8)
									{
										SortCode =cell.getStringCellValue();
										//SortCode=SortCode.substring(0, SortCode.indexOf('.'));
										SortCode=Configuration.lPad(SortCode, 9, "0");
										
									}
									else if(colCount==9)
									{
										TransactionCode =cell.getStringCellValue();
										//TransactionCode=TransactionCode.substring(0, TransactionCode.indexOf('.'));
										TransactionCode=Configuration.lPad(TransactionCode, 3, "0");
										
									}
									else if(colCount==10)
									{
										Amount =cell.getStringCellValue();
										System.out.println("Amount1=="+Amount);
										//Amount = Amount.substring(1);
										System.out.println("Amount2=="+Amount);
										Amount = Amount.replace(".", "");
										System.out.println("Amount3=="+Amount);
										Amount=Configuration.lPad(Amount, 18,"0");
										System.out.println("Amount4=="+Amount);
										
									}
									else if(colCount==11)
									{
										AccountNumber =cell.getStringCellValue();
										//AccountNumber=AccountNumber.substring(0, AccountNumber.indexOf('.'));
										AccountNumber=Configuration.lPad(AccountNumber, 16, "0");
										
									}
									else if(colCount==12)
									{
										PTFFlag =cell.getStringCellValue();
																		
									}
									else if(colCount==13)
									{
										ReturnReasonCode =cell.getStringCellValue();
										//ReturnReasonCode=ReturnReasonCode.substring(0, ReturnReasonCode.indexOf('.'));
										ReturnReasonCode=Configuration.lPad(ReturnReasonCode,2,"0");
																		
									}
									else if(colCount==14)
									{
										ReturnDescription =cell.getStringCellValue();
										
									}
									else if(colCount==15)
									{
										BOFDNumber =cell.getStringCellValue();
										//BOFDNumber=BOFDNumber.substring(0, BOFDNumber.indexOf('.'));
										BOFDNumber=Configuration.lPad(BOFDNumber,9,"0");
										
									}
									else if(colCount==16)
									{
										SubmemberBankName =cell.getStringCellValue();
																		
									}
									else if(colCount==17)
									{
										PayeeNameOrAccountTitle =cell.getStringCellValue();
																	
									}
									else if(colCount==18)
									{
										ReturnReasonRemarksOrComments =cell.getStringCellValue();
																
									}
									break;
		                    }
						
						colCount++;
					}
				}
			
				
				
				String fullLine =BOFDNumber+ChequeNumber+UDK+"I"+ReturnReasonCode;
				//System.out.println("11=="+fullLine);
				
				//singleRecord = presentingBankRoutNo + serialNo
						//+ udk_str + "I" + returnReason + "00000000FIN"
						//+ clearingType + rti_olbc ;
				if(!fullLine.equalsIgnoreCase("I"))
				{	
					pw.println(fullLine);
								
				//System.out.println("files created sucessfully");
	
					pst.setString(1, Configuration.getDDMMYYYY());
					pst.setString(2, ClearingType);
					pst.setString(3, PresentmentDate);
					pst.setString(4, PresentmentDate);
					pst.setString(5, ChequeNumber);
					pst.setString(6, SortCode);
					pst.setString(7, TransactionCode);
					pst.setString(8, Amount);
					pst.setString(9, AccountNumber);
					pst.setString(10, ReturnDescription);
					pst.setString(11, ReturnReasonCode);
					pst.setString(12, _fileName);
	
					pst.executeUpdate();
				}

				
			}
			//rs.close();
			pst.close();
			con.close();
			//excelCon.close();
			
			pw.flush();
			pw.close();
			System.out.println("Processing  Successfull");

		} 
		catch (Exception e) 
		{
			System.out.println("" + e);
			e.printStackTrace();
			return false;
		}
		return true;
	}*/
	
	protected void finalize()
	{
		System.out.println("**** object is destroyed ***");
	}
	
	public String validatetrncd_finacle(String transcode,String accountno)
	{
		String accno="";
		if (transcode.equalsIgnoreCase("12"))
		{
			accno="000000";
			System.out.println("trancode=="+transcode+"accno=="+accno);
		}
		
        else 
        	accno=accountno;
		return accno;
	}
}// end class