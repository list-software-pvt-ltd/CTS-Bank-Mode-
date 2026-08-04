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

import org.apache.commons.io.FileUtils;

public class XMLReader_OLD {
	private ArrayList<HashMap> micrData = new ArrayList<HashMap>();
	private HashMap<String, String> micrMap = new HashMap<String, String>();
	private ArrayList<ImageBean> imgData = new ArrayList<ImageBean>();
	private ArrayList<ItemInformation> itemData = new ArrayList<ItemInformation>();
	private String fileName;
	ImageBean imgbn = null;
	ItemInformation itemInfo;
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

	public XMLReader_OLD() {
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
					System.out.println("elementString::" + elementString);
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
						System.out.println("\n\t isEndElement..");
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
							System.out.println("EXT_ItemSeqNo=="+EXT_ItemSeqNo+"===EXT_SerialNo=="+EXT_SerialNo+"==EXT_fileName=="+EXT_fileName);
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
					//System.out.println("\n\t event.isEndElement");
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
						//if (result > 0)
							//System.out.println("Item updated Successful");
					} catch (SQLException e) {
						if (e.getMessage().contains("ORA-00001:")) {// 1
							System.out.println("\n\t Duplicate Record.");
						}//
					}
				}
			}// 1
			
			
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
		
	/*	finally
		{
			
				if(rs!=null)
				{
					rs.close();
				}
				if(pst!=null)
				{
				pst.close();
				}
				if(con!=null)
				{
				con.close();
				}
				if(excelCon!=null)
				{
				excelCon.close();
				}
				if(pw!=null)
				{
				pw.flush();
				pw.close();
				
				} 
				
				}*/
		
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
		System.out.println("***** readBRF ******");
		boolean status = false;

		String path = filePath;

		fileName = _fileName;
		Connection con = null;
		PreparedStatement ps_insert = null;
		PrintWriter out = null;
		PreparedStatement ps_branches = null;
		PreparedStatement ps_allBranches = null;
		try {
			// BRF_400259000_11012014_125101_11812

			String[] fileNameData = fileName.split("_");
			String creationDate = fileNameData[2];
			String creationTime = fileNameData[3];
			con = Configuration.getConnection();
			ps_branches = con
					.prepareStatement("select * from BRANCHMSTR where BRM_BRNCD=(select BRM_BRNCD from BRANCHMSTR where BRM_MICRCD=?)");
			ps_allBranches = con.prepareStatement("select * from BRANCHMSTR");
			ps_insert = con
					.prepareStatement("insert into RETURNINWARD values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
			String return_inwardPath = Configuration
					.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
					+ "/ReturnInward/";
			String textFileName = "To_CBS_Return_Inward.txt";
			FileWriter fstream = new FileWriter(path + "/" + textFileName);
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
			StringBuffer allBranchStr = new StringBuffer(" ");
			String str11 = "", str22 = "", str33 = "", str44 = "", str55 = "", str66 = "", 
					str77 = "", str88 = "", str99 = "", str10 = "", str12 = "", str13 = "", str14 = "", str15 = "", str16 = "", str17 = "", str18 = "", str20 = "";
			while (xmlEventReader.hasNext()) {
				// System.out.println("**** 3 *****");
				XMLEvent event = xmlEventReader.nextEvent();
				if (event.isStartElement()) {
					// System.out.println("**** 3.1 *****");
					StartElement element = (StartElement) event;
					// System.out.println("element.getName():" +
					// element.getName());
					// o/p:element.getName():{urn:schemas-ncr-com:ECPIX:RF:FileStructure:010001}FileSummary
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
								str44 = value;
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
								System.out.println("udk_ItemSeqNo=="+udk_ItemSeqNo);
								
								//jayeshchanges start
								PreparedStatement pstOlbc=con.prepareStatement("select clo_olbc,clo_payee_accno,CLO_SORTCD from clearingoutward where to_number(?)=to_number(clo_itemseqno) and CLO_DATE_DDMMYYYY=?");
								pstOlbc.setString(1, udk_ItemSeqNo);
								pstOlbc.setString(2,udk_PresentmentDate);
								ResultSet rsOlbc=pstOlbc.executeQuery();
								if(rsOlbc.next())
								{
									rti_olbc =rsOlbc.getString(1);
									payeeaccno=rsOlbc.getString(2);//jayeshchanges end
									sortCode=rsOlbc.getString(3);
								}
								rsOlbc.close();
								pstOlbc.close();
							}// PresentingBankRoutNo
							/*else if (nm.equalsIgnoreCase("UserField")) {// UserField
								rti_olbc = value;
								System.out.println("rti_olbc:::" + rti_olbc);
							}// UserField
*/								// =========================
								// System.out.println("\n");
								// System.out.println("udk:::"+udk);
								// System.out.println("\n");
								// record.append(singleRecord+"\n");
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
						
							singleRecord = presentingBankRoutNo + serialNo
									+ udk_str + "I" + returnReason + "00000000FIN"
									+ clearingType + rti_olbc ;
		
					if(cbsVendorbrf.equalsIgnoreCase("FINACLE"))
					{
						long amount=Long.parseLong(str66);
						String Amount1=Configuration.lPad(Long.toString(amount),18,"0");
						sortCode=sortCode.substring(3);
						System.out.println("sortCode=="+sortCode+"Amount1=="+Amount1);
						
							singleRecord = singleRecord+payeeaccno+sortCode+Amount1;
					}
						
						//jay change stop
						// String(record)+" "+udk_str;
						// System.out.println("singleRecord:::"+singleRecord);
						out.println(singleRecord);
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
						}// 1
						System.out.println("**** 1 ****");
						System.out.println("end element");
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
				 

				/* Branch_code=rs.getString("CLO_SORTCD");
				 Branch_code=Configuration.lPad(Branch_code,9, " ");*/
				 
				 
				 /*ring strdate=rs.getString("CLI_XMLFILENAME").split(".OACK")[0];
					strdate=strdate.substring(strdate.lastIndexOf(".")+1);
					 String temp=strdate.substring(4)+strdate.substring(2,4)+strdate.substring(0,2);
					 System.out.println(temp);*/
				 space1=Configuration.lPad(space1,10, " ");
				 space2=Configuration.lPad(space2,30, " ");
				 space3=Configuration.lPad(space3,8, " ");
				 
				 //space4=Configuration.lPad(space4, 1, " ");
				 //space5=Configuration.lPad(space5, 119, " ");

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
		
	/*	finally
		{
			
				if(rs!=null)
				{
					rs.close();
				}
				if(pst!=null)
				{
				pst.close();
				}
				if(con!=null)
				{
				con.close();
				}
				if(excelCon!=null)
				{
				excelCon.close();
				}
				if(pw!=null)
				{
				pw.flush();
				pw.close();
				
				} 
				
				}*/
		
	}

	/*
	 * public boolean readBRF(String filePath, String _fileName)// ReturnInward
	 * old { System.out.println("***** readBRF ******"); boolean status = false;
	 * String path = filePath;
	 * 
	 * fileName = _fileName;
	 * 
	 * try { String return_inwardPath
	 * =Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI"
	 * )+"/ReturnInward/"; FileWriter fstream = new FileWriter(path +
	 * "/To_CBS_Return_Inward.txt");// new
	 * 
	 * PrintWriter out = new PrintWriter(fstream);
	 * 
	 * XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
	 * //System.out.println("**** 1 *****"); XMLEventReader xmlEventReader =
	 * xmlInputFactory.createXMLEventReader(new FileInputStream(path + "/" +
	 * fileName)); //System.out.println("**** 2 *****"); StringBuffer udk=new
	 * StringBuffer(); String record =""; String udk_str=""; String
	 * singleRecord=""; String presentingBankRoutNo=""; String serialNo="";
	 * String returnReason=""; String udk_PresentmentDate=""; String
	 * udk_PresentingBankRoutNo=""; String udk_CycleNo=""; String
	 * udk_ItemSeqNo=""; String presentmentDateDB=""; while
	 * (xmlEventReader.hasNext()) { //System.out.println("**** 3 *****");
	 * XMLEvent event = xmlEventReader.nextEvent(); if (event.isStartElement())
	 * { //System.out.println("**** 3.1 *****"); StartElement element =
	 * (StartElement) event; //System.out.println("element.getName():" +
	 * element.getName()); //
	 * o/p:element.getName():{urn:schemas-ncr-com:ECPIX:RF
	 * :FileStructure:010001}FileSummary String elementName =
	 * element.getName().toString(); String elementString =
	 * elementName.substring(elementName.lastIndexOf("}") + 1,
	 * elementName.length()); System.out.println("elementString::" +
	 * elementString); // if(element.getName().toString().equals("Item"))
	 * 
	 * 
	 * if (elementString.equalsIgnoreCase("Item")) {
	 * System.out.println("**** 4 *****"+ element.getName().toString());
	 * 
	 * Iterator iterator = element.getAttributes();
	 * 
	 * while (iterator.hasNext()) {//1 Attribute attribute = (Attribute)
	 * iterator.next(); QName name = attribute.getName(); String value =
	 * attribute.getValue(); String nm = name.toString(); int noOfcharToPad=0;
	 * System.out.println("Tag Name:"+nm); //Thread.sleep(5000); if
	 * (nm.equalsIgnoreCase("PresentingBankRoutNo")) {//PresentingBankRoutNo
	 * presentingBankRoutNo=value;
	 * presentingBankRoutNo=Configuration.lPad(presentingBankRoutNo,9,"0");
	 * //record.append(presentingBankRoutNo);
	 * System.out.println("presentingBankRoutNo:::"+presentingBankRoutNo);
	 * }//PresentingBankRoutNo else if(nm.equalsIgnoreCase("SerialNo"))
	 * {//SerialNo serialNo=value; serialNo=Configuration.lPad(serialNo,6,"0");
	 * //record.append(serialNo); System.out.println("serialNo:::"+serialNo);
	 * }//SerialNo else if(nm.equalsIgnoreCase("ReturnReason")) {//ReturnReason
	 * returnReason=value; returnReason=Configuration.lPad(returnReason,2,"0");
	 * //record.append(returnReason);
	 * System.out.println("returnReason:::"+returnReason); }//ReturnReason else
	 * if(nm.equalsIgnoreCase("PresentmentDate")) {//PresentmentDate
	 * presentmentDateDB=value; udk_PresentmentDate=value;;
	 * //udk=udk+udk_PresentmentDate;
	 * //udk.append(Configuration.lPad(udk_PresentmentDate,8,"0"));
	 * udk_PresentmentDate=Configuration.lPad(udk_PresentmentDate,8,"0");
	 * System.out.println("udk:::"+udk); }//PresentmentDate
	 */
	/*
	 * else if(nm.equalsIgnoreCase("PresentingBankRoutNo"))
	 * {//PresentingBankRoutNo udk_PresentingBankRoutNo=value;
	 * //udk=udk+udk_PresentmentDate;
	 * //udk.append(Configuration.lPad(udk_PresentingBankRoutNo,9,"0"));
	 * udk_PresentingBankRoutNo
	 * =Configuration.lPad(udk_PresentingBankRoutNo,9,"0");
	 * System.out.println("udk:::"+udk); }//PresentingBankRoutNo
	 */
	/*
	 * else if(nm.equalsIgnoreCase("CycleNo")) {//PresentingBankRoutNo
	 * udk_CycleNo=value; //udk.append(Configuration.lPad(udk_CycleNo,2,"0"));
	 * udk_CycleNo=Configuration.lPad(udk_CycleNo,2,"0");
	 * System.out.println("udk:::"+udk); }//PresentingBankRoutNo else
	 * if(nm.equalsIgnoreCase("ItemSeqNo")) {//PresentingBankRoutNo
	 * udk_ItemSeqNo=value;
	 * udk_ItemSeqNo=Configuration.lPad(udk_ItemSeqNo,14,"0");
	 * System.out.println("udk:::"+udk); }//PresentingBankRoutNo
	 * System.out.println("\n"); System.out.println("udk:::"+udk);
	 * System.out.println("\n"); //record.append(singleRecord+"\n"); }//1
	 * System.out.println("**** 3 *****"); }//end if else if
	 * (elementString.equalsIgnoreCase("AddendA")) {//else if
	 * udk_str=udk_PresentmentDate
	 * +presentingBankRoutNo+udk_CycleNo+udk_ItemSeqNo;
	 * udk_str=Configuration.rPad(udk_str,80," ");
	 * System.out.println("udk:::"+udk_str);
	 * //singleRecord="presentingBankRoutNo:"
	 * +presentingBankRoutNo+" "+"serialNo:"
	 * +serialNo+" "+"udk_str:"+udk_str+" "+
	 * "returnReason:"+returnReason+"\n";//new String(record)+" "+udk_str;
	 * singleRecord
	 * =presentingBankRoutNo+serialNo+udk_str+"I"+returnReason+"00000000FIN"
	 * ;//new String(record)+" "+udk_str;
	 * System.out.println("singleRecord:::"+singleRecord);
	 * out.println(singleRecord); }//else if } } status = true; out.close(); }
	 * catch (FileNotFoundException e) {
	 * System.out.println("FileNotFoundException:::" + e.getMessage()); status =
	 * false; } catch (Exception e) {
	 * System.out.println("Error while reading XML\n" + e.getMessage()); status
	 * = false; } System.out.println("Exit from readBRF():::"+status); return
	 * status; }// end readBRF --------------------------
	 */

	// to readXML for gen Image file
	public String readBPXF(ArrayList<String> xmlFiles, ArrayList<String> imgFiles) 
	{// readBPXF
		String flg = "";
		String str_filename = "", fullline ="",cbsVendor="",SettlementDate = "",fileName="",korasFileName="";
		itemInfo = new ItemInformation();
		long imgFileSize = 0;
		System.out.println("*********** start readBPXF **** " + fileName);
		
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pst1 = null;
		PreparedStatement pst3 = null;
		PreparedStatement stmt_getSeqVal = null;
		int counter = 0;
		long totalAmount=0;
		StringBuffer inwTxtBuffer=new StringBuffer();
		String BPIBF_fileName = null,_filenameKoras="",fulllineKoras="";
		ByteToImageConverter _objImageCretor = null;
		int dsLength = 0;
		PrintWriter pw = null,pw1=null,pw2=null;
		PrintWriter pwKoras = null;
		
		try 
		{// try
			
			con = Configuration.getConnection();
			String upDownStyle = Configuration.getConfValByNm("CFG_INWD_SPLITSTYLE",con);
			cbsVendor=Configuration.getConfValByNm("CFG_CBS_VENDOR",con);
			FileInputStream fins = null;
			_objImageCretor = new ByteToImageConverter();
			String dir = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"ClearingInward/";
			
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
						+ "CLI_UNIQUENO, CLI_XMLFILENAME) "
						+ "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		
				pst1 = con.prepareStatement("select * from BRANCHMSTR where BRM_BRNCD=(select BRM_BRNCD from BRANCHMSTR "
						+ "where BRM_MICRCD=?)");
				pst3 = con.prepareStatement("select * from BRANCHMSTR where BRM_BRNCD=(select BRM_BRNCD from BRANCHMSTR "
						+ "where BRM_MICRCD=? and BRM_SCANNERYN='Y')");
				stmt_getSeqVal = con.prepareStatement("select SEQ_CLEARING_INWARD.nextVal from dual ");
				
				fileName=xmlFiles.get(m);
				str_filename = xmlFiles.get(m);
				BPIBF_fileName = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+ "ClearingInward/" + imgFiles.get(m);
			
				String bpxfFilePath = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)	+ "/ClearingInward/";
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
					String _filename = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"/ClearingInward/";
				
					String clearingType = Configuration.lPad(fileName.split("_")[2], 2, "0");
					System.out.println("\n\t clearingType:" + clearingType);
					
					_filename = _filename + "/" + clearingType+ "_To_CBS_Clearing_Inwardtemp.txt";
					
					/*if(cbsVendor.equalsIgnoreCase("KORAS"))
					{
						_filenameKoras =  Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"/ClearingInward/"+korasFileName;
					}*/
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
									if (nm.equalsIgnoreCase("ItemSeqNo")) 
									{
										ItemSeqNo = null;
										ItemSeqNo = value;
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
									}
									if (nm.equalsIgnoreCase("TransCode")) {
										TransCode = null;
										TransCode = "" + Integer.parseInt(value);
									}
									if (nm.equalsIgnoreCase("ClearingType")) {
										ClearingType = null;
										ClearingType = value;
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
								}// 4
							}// 3
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
	
									TransCode = Configuration.lPad("" + Integer.parseInt(TransCode), 2,"0");
									AccountNo = AccountNo.length() > 10 ? AccountNo.substring(AccountNo.length() - 10,
													AccountNo.length()): Configuration.lPad(AccountNo, 10, "0");
									
									Payeename = Configuration.lPad(Payeename, 50," ");
	
									String InstruDate = CreationDate;
									String cycleNumber = "";
									String UnqDocKey = CreationDate	+ PayorBankRoutNo + cycleNumber	+ ItemSeqNo;
									UnqDocKey = Configuration.rPad(UnqDocKey, 80,"0");
									// pw.println(TruncatingRTNo+PayorBankRoutNo+CreationDate+Amount+SerialNo+RBISeqNo+TransCode+AccountNo+Payeename+InstruDate+imageFile1+imageFile2+imageFile3+UnqDocKey);
									System.out.println("TruncatingRTNo=="+TruncatingRTNo);
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
									
									fullline = TruncatingRTNo
												+ draweeBankSortCode + CreationDate
												+ Amount + SerialNo + RBISeqNo
												+ TransCode + AccountNo + Payeename
												+ InstruDate + imageFile1 + imageFile2
												+ imageFile3 + UnqDocKey
												+ PayorBankRoutNo + ClearingType;
									/*if(cbsVendor.equalsIgnoreCase("KORAS"))
									{
										fulllineKoras=TruncatingRTNo+PayorBankRoutNo+CreationDate+
										Configuration.lPad(Amount, 13, "0")+SerialNo+
										ItemSeqNo.substring(ItemSeqNo.length()-10, ItemSeqNo.length())+TransCode+
										Configuration.lPad("", 23, " ")+
										Configuration.lPad(imageFile2+".tif", 40, "0")+
										Configuration.lPad(imageFile1+".tif", 40, "0")+
										Configuration.lPad(imageFile3+".jpg", 40, "0")+
										SettlementDate.substring(4)+SettlementDate.substring(2,4)+SettlementDate.substring(0,2)+
										PresentingBankRoutNo+cycleNo+
										ItemSeqNo+Configuration.rPad(Payeename.substring(0, 40).trim(), 40, " ")+
										AccountNo.substring(AccountNo.length()-6, AccountNo.length());
									}*/
									pst.setString(14, fullline);
									pst.setString(15, ItemSeqNo);
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
									// fullline+=seqNo;
									pw.println(fullline);
									
									/*if(cbsVendor.equalsIgnoreCase("KORAS"))
										inwTxtBuffer.append(fulllineKoras+"\n");*/
									
									try {
										int cnt = pst.executeUpdate();
									} catch (SQLException e) {
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
							if (element.getName().getLocalPart().equals("ImageViewData")) 
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
										imgFileSize = imgFileSize
												+ Long.parseLong(value);
									}
									if (nm.equals("ImageDataOffset"))// {}
										imgbn.setImageDataOffset(value);
									if (nm.equals("FileName"))// {}
									{
										fins = new FileInputStream(bpxfFilePath	+ value);
									}
								}// 6
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
									if (imgDsCnt == 0) 
									{
										if (nm.equalsIgnoreCase("DigitalSignatureMethod"))
											imgDs1 = imgDs1
													+ "DigitalSignatureMethod="
													+ value + "~";// imgbn.setDigitalSignatureMethod(value);
										if (nm.equalsIgnoreCase("SecurityKeySize"))
											imgDs1 = imgDs1 + "SecurityKeySize="
													+ value + "~";// imgbn.setSecurityKeySize(value);
										if (nm.equalsIgnoreCase("DigitalSignatureDataOffset"))
											imgDs1 = imgDs1
													+ "DigitalSignatureDataOffset="
													+ value + "~";// imgbn.setDigitalSignatureDataOffset(value);
										if (nm.equalsIgnoreCase("DigitalSignatureLength")) {
											imgDs1 = imgDs1
													+ "DigitalSignatureLength="
													+ value + "~";// imgbn.setDigitalSignatureLength(value);
											dsLength = Integer.parseInt(value);
										}
										if (nm.equalsIgnoreCase("Source"))
											imgDs1 = imgDs1 + "Source=" + value+ "~";
									}
									if (imgDsCnt == 1) 
									{
										if (nm.equalsIgnoreCase("DigitalSignatureMethod"))
											imgDs2 = imgDs2	+ "DigitalSignatureMethod="	+ value + "~";// imgbn.setDigitalSignatureMethod(value);
										if (nm.equalsIgnoreCase("SecurityKeySize"))
											imgDs2 = imgDs2 + "SecurityKeySize="+ value + "~";// imgbn.setSecurityKeySize(value);
										if (nm.equalsIgnoreCase("DigitalSignatureDataOffset"))
											imgDs2 = imgDs2+ "DigitalSignatureDataOffset="+ value + "~";// imgbn.setDigitalSignatureDataOffset(value);
										if (nm.equalsIgnoreCase("DigitalSignatureLength")) 
										{
											dsLength += Integer.parseInt(value);
											imgDs2 = imgDs2+ "DigitalSignatureLength="+ value + "~";// imgbn.setDigitalSignatureLength(value);
											imgFileSize = imgFileSize + dsLength;
										}
										if (nm.equalsIgnoreCase("Source"))
											imgDs2 = imgDs2 + "Source=" + value+ "~";
									}
								}// 8
								imgDsCnt++;
								if (imgDsCnt == 2) 
								{
									String imgDsFinal = "";
									if (imgDs1.indexOf("ECP.PBCC") > -1) 
									{
										imgDsFinal = imgDs1;
									} 
									else 
									{
										imgDsFinal = imgDs2;
									}
									
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
								Capfilename = Capfilename + "/" + clearingType
									+ "_To_CBS_Clearing_Inward_"+ rs.getString(1) + "temp.txt";
								pw1 = new PrintWriter(new FileWriter(Capfilename));
								String notDrawnOnUs = Capfilename + clearingType
									+ "To_CBS_NotDrawnOnUstemp.txt";
								BufferedReader br = new BufferedReader(
									new FileReader(_filename));
								String readLine = "";
								pw2 = null;
								while ((readLine = br.readLine()) != null) 
								{
									if (readLine.substring(9, 18).equalsIgnoreCase(branchList[i])) 
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
								while ((readLine = br.readLine()) != null) 
								{
									if (readLine.substring(9, 18).equalsIgnoreCase(branchList[i])) 
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
			
				System.out.println("inside xmlReader and readBPXF:::"+ imgData.size());
			
				File f = new File(BPIBF_fileName);
				System.out.println("\n\n\n\n\nImage File name=" + BPIBF_fileName);
				System.out.println("\n\n\n\n\nImage File Size=" + f.length());
				System.out.println("\n\n\n\n\nImage File Size=" + imgFileSize);
				if( f.length()!=imgFileSize)
				{
					flg = "FAULTYDOWNLOAD";
					System.out.println("Image Size Differes");
					return flg;
				}
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
				//if(dir.toLowerCase().indexOf("smb://")>-1)
				{
					Runtime.getRuntime().exec( "chmod -R 777 "+Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", con) );
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
							+ "CLI_UNIQUENO, CLI_XMLFILENAME, CLI_INSTRUMENT_ID from clearinginward where cli_ddmmyyyy=? "
							+ "order by CLI_CLEARINGTYPE,CLI_TRUNCATINGRTNO";
					PreparedStatement korasPst=con1.prepareStatement(query,ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
					korasPst.setString(1, Configuration.getDDMMYYYY());
					ResultSet korasRs=korasPst.executeQuery();
					String imagePath=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", con1)+"/ClearingInward/Images/";
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
					_filenameKoras =  Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"/ClearingInward/"+korasFileName;
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
		/*
		 * for(ImageBean _objBean: imgData) {//2
		 * System.out.println("dsa_offset:::"
		 * +_objBean.getDigitalSignatureDataOffset());
		 * System.out.println("dsa_length:::"
		 * +_objBean.getDigitalSignatureLength());
		 * System.out.println("base64String_offset:::"
		 * +_objBean.getImageDataOffset());
		 * System.out.println("base64String_length:::"
		 * +_objBean.getImageDataLength());
		 * 
		 * int
		 * dsa_offset=Integer.parseInt(_objBean.getDigitalSignatureDataOffset
		 * ()); int
		 * dsa_length=Integer.parseInt(_objBean.getDigitalSignatureLength());
		 * int
		 * base64String_offset=Integer.parseInt(_objBean.getImageDataOffset());
		 * int
		 * base64String_length=Integer.parseInt(_objBean.getImageDataLength());
		 * int SecurityKeySize=Integer.parseInt(_objBean.getSecurityKeySize());
		 * String DigitalSignatureMethod=_objBean.getDigitalSignatureMethod();
		 * String ViewSideIndicator=_objBean.getViewSideIndicator(); String
		 * ViewFormat=_objBean.getViewFormat(); String
		 * imageFileName=_objBean.getImageFile();
		 * 
		 * // image Data System.out.println("imageFileName:::"+imageFileName);
		 * System.out.println("dsa_offset:::"+dsa_offset);
		 * System.out.println("dsa_length:::"+dsa_length);
		 * System.out.println("base64String_offset:::"+base64String_offset);
		 * System.out.println("base64String_length:::"+base64String_length);
		 * //System.out.println("fileName:::"+len);
		 * System.out.println("SecurityKeySize:::"+SecurityKeySize);
		 * System.out.println
		 * ("DigitalSignatureMethod:::"+DigitalSignatureMethod);
		 * System.out.println("ViewSideIndicator:::"+ViewSideIndicator);
		 * System.out.println("ViewFormat:::"+ViewFormat);
		 * 
		 * }
		 */
		// System.out.println("^^^^ Exit from readBPXF ^^^^^^^:::"+flg);
		// if(counter>1)
		// flg=true;
		return flg;
	}// end readBPXF

	// to read PXF
	public boolean readPXF(String fileName) {// readPXF
		boolean flg = true;
		String str_filename = fileName.replace("/", "/");
		String path = "", singleRecord = "", fullline = "", draweeBankSortCode = "";
		String ItemSeqNo = "", PayorBankRoutNo = "", Amount = "", AccountNo = "", SerialNo = "", TransCode = "", PresentingBankRoutNo = "";
		String PresentmentDate = "", CycleNo = "", NumOfImageViews = "", ClearingType = "", DocType = "", MICRRepairFlags = "";
		String SpecialHandling = "", TruncatingRTNo = "", UserField = "", IQAIgnoreInd = "", CurrencyInd = "", SessionNo = "";
		String InternalSequenceNo = "", CreationDate = "", RBISeqNo = "", InstruDate = "", imageFile1 = "", imageFile2 = "";
		String imageFile3 = "", BOFDRoutNo = "", BOFDBusDate = "", DepositorAcct = "", IFSC = "", seqNo = "", UnqDocKey = "";
		itemInfo = new ItemInformation();
		long imgFileSize = 0;
		int imgNmCnt = 0;
		System.out.println("*********** start readPXF **** " + fileName);
		
		System.out.println("*********** 1 **** ");
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pst1 = null;
		PreparedStatement pst3 = null;
		PreparedStatement stmt_getSeqVal = null;
		int counter = 0;
		String BPIBF_fileName = null;
		// ByteToImageConverter _objImageCretor=null;
		int dsLength = 0;
		String fileNameArr[] = fileName.split("_");
		System.out.println("*********** 2 **** ");
		FileReader filereader;
		BufferedReader reader;
		PrintWriter pw = null;
		try {// try
			con = Configuration.getConnection();
			String upDownStyle = Configuration
					.getConfValByNm("CFG_INWD_SPLITSTYLE",con);
			path = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
					+ "ClearingInward/" + str_filename;
			String clearingType = fileName.substring(fileName.indexOf(".") - 2,
					fileName.indexOf(".")); // Configuration.lPad(fileName.split("_")[2],2,"0");
			String _filename = Configuration
					.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
					+ "/ClearingInward/";

			filereader = new FileReader(path);
			reader = new BufferedReader(filereader);
			stmt_getSeqVal = con
					.prepareStatement("select SEQ_CLEARING_INWARD.nextVal from dual ");
			pst = con
					.prepareStatement("insert into ClearingInward values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
			System.out.println("*********** path=="+path);
			String imgpath = path.substring(0, path.lastIndexOf("/") );
			System.out.println("*********** imgpath=="+imgpath);
			imgpath = imgpath.substring(0, imgpath.lastIndexOf("/") +1);
			System.out.println("*********** imgpath=== "+imgpath);
			new File(imgpath+"Images/").mkdirs();
			//imgpath = path.substring(0, path.lastIndexOf("/")+1 );
			while ((singleRecord = reader.readLine()) != null) {
				singleRecord = singleRecord.replace("|", "~");
				String Data[] = singleRecord.split("~");

				ItemSeqNo = Data[0];
				PayorBankRoutNo = Data[1];
				Amount = Data[2];
				AccountNo = Data[3];
				SerialNo = Data[4];
				TransCode = Data[5];
				PresentingBankRoutNo = Configuration.getDDMMYYYY();// Data[6];
				PresentmentDate = Data[7];
				CycleNo = Data[8];
				NumOfImageViews = Data[9];
				ClearingType = Data[10];
				if (_filename.indexOf("temp.txt") == -1) {
					_filename = _filename + "/" + ClearingType
							+ "_To_CBS_Clearing_Inwardtemp.txt";
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

				RBISeqNo = Configuration.lPad(RBISeqNo, 10, "0");
				InstruDate = Configuration.getDDMMYYYY();// Configuration.lPad(InstruDate,8,"0");
				BOFDRoutNo = Configuration.lPad(BOFDRoutNo, 9, "0");
				BOFDBusDate = Configuration.lPad(BOFDBusDate, 8, "0");
				DepositorAcct = Configuration.lPad(DepositorAcct, 25, "0");
				IFSC = Configuration.lPad(IFSC, 11, "0");

				String onlyFileName = "P" + Data[7] + InternalSequenceNo
						+ fileName.substring(fileName.indexOf("/")+1).substring(0, 3);

				
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

				// imageFile1=Configuration.lPad("f"+(onlyFileName.substring(1,onlyFileName.length())),27,"0");
				// imageFile2=Configuration.lPad("r"+(onlyFileName.substring(1,onlyFileName.length())),27,"0");
				// imageFile3=Configuration.lPad("f"+(onlyFileName.substring(1,onlyFileName.length()))+"G",27,"0");

				//System.out.println("*********** 4**** " + imageFile1);
				//System.out.println("*********** 4**** " + imageFile2);
				//System.out.println("*********** 4**** " + imageFile3);
				//System.out.println("*********** 4**** " + imgFileNm);
				boolean file1Bool = false, file2Bool = false, file3Bool = false;
				
				file1Bool = new File(imgFileNm + ".BF").renameTo(new File(imgpath
						+ "Images/"
						+ imageFile1 + ".tif"));
				System.out.println("file1Bool =="+file1Bool+"===="+imgpath+"======"+fileName.substring(fileName.indexOf("/")+1));
				file2Bool = new File(imgFileNm + ".BR").renameTo(new File(imgpath
						+ "Images/"
						+ imageFile2 + ".tif"));
				file3Bool = new File(imgFileNm + ".GF").renameTo(new File(imgpath
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
				TransCode = Configuration.lPad(TransCode, 2, "0");
				UserField = Configuration.rPad(UserField, 50, " ");
				PayorBankRoutNo = Configuration.lPad(PayorBankRoutNo, 9, "0");
				UnqDocKey = PresentmentDate + fileName.substring(0, 3)
						+ PayorBankRoutNo + CycleNo + InternalSequenceNo;
				UnqDocKey = Configuration.rPad(UnqDocKey, 80, "0");

				fullline = TruncatingRTNo + draweeBankSortCode + CreationDate
						+ Amount + SerialNo + RBISeqNo + TransCode + AccountNo
						+ UserField + InstruDate + imageFile1 + imageFile2
						+ imageFile3 + UnqDocKey + PayorBankRoutNo
						+ ClearingType;

				ResultSet rs_seq = stmt_getSeqVal.executeQuery();
				seqNo = "";
				//System.out.println("*********** 6 **** ");
				if (rs_seq.next()) {
					seqNo = rs_seq.getString(1);
					seqNo = Configuration.lPad(seqNo, 15, "0");
				}
				rs_seq.close();

				pst.setString(14, fullline);
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
				//System.out.println("***** 7 **** ");
				try {
					int cnt = pst.executeUpdate();
					//System.out.println("*********** 8 **** ");
				} catch (SQLException e) {
					System.out.println(e + "      " + SerialNo + "   "
							+ PayorBankRoutNo);
					if (!(e.getMessage().indexOf("ORA-00001") > -1))
						throw new Exception("MyException...");
				}
				if (file1Bool && file2Bool && file3Bool)
					pw.println(fullline);
				//System.out.println("" + fullline);
				fullline = null;
				pw.flush();
			}
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
				pw.close();
			} catch (Exception e) {
			}
		}
		System.out.println("****** 14 *****");
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

	protected void finalize() {
		System.out.println("**** object is destroyed ***");
	}

	public boolean readInwardSubPosting(String fileName)
	{
		boolean b=true;
		boolean flg = true;
		String str_filename = fileName.replace("/", "/");
		String path = "", singleRecord = "", fullline = "", draweeBankSortCode = "";
		String ItemSeqNo = "", PayorBankRoutNo = "", Amount = "", AccountNo = "", 
				SerialNo = "", TransCode = "", PresentingBankRoutNo = "";
		String PresentmentDate = "", ClearingType = "",CycleNo="";
		String  TruncatingRTNo = "", UserField = "";
		String CreationDate = "", RBISeqNo = "", 
				InstruDate = "", imageFile1 = "", imageFile2 = "";
		String imageFile3 = "", BOFDRoutNo = "", BOFDBusDate = "", DepositorAcct = "", 
				IFSC = "", seqNo = "", UnqDocKey = "";
		itemInfo = new ItemInformation();
		long imgFileSize = 0;
		int imgNmCnt = 0;
		System.out.println("*********** start readPXF **** " + fileName);
		
		System.out.println("*********** 1 **** ");
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pst1 = null;
		PreparedStatement pst3 = null;
		PreparedStatement stmt_getSeqVal = null;
		int counter = 0;
		String BPIBF_fileName = null;
		// ByteToImageConverter _objImageCretor=null;
		int dsLength = 0;
		String fileNameArr[] = fileName.split("_");
		System.out.println("*********** 2 **** ");
		FileReader filereader;
		BufferedReader reader;
		PrintWriter pw = null;
		try {// try
			con = Configuration.getConnection();
			String upDownStyle = Configuration
					.getConfValByNm("CFG_INWD_SPLITSTYLE",con);
			path = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
					+ "ClearingInward/" + str_filename;
			String clearingType = fileName.substring(fileName.indexOf(".") - 2,
					fileName.indexOf(".")); // Configuration.lPad(fileName.split("_")[2],2,"0");
			String _filename = Configuration
					.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
					+ "/ClearingInward/";

			filereader = new FileReader(path);
			reader = new BufferedReader(filereader);
			stmt_getSeqVal = con
					.prepareStatement("select SEQ_CLEARING_INWARD.nextVal from dual ");
			pst = con
					.prepareStatement("insert into ClearingInward values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
			System.out.println("*********** path=="+path);
			String imgpath = path.substring(0, path.lastIndexOf("/") );
			System.out.println("*********** imgpath=="+imgpath);
			imgpath = imgpath.substring(0, imgpath.lastIndexOf("/") +1);
			System.out.println("*********** imgpath=== "+imgpath);
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
				TransCode = Data[6];
				//Data[7] and Data[8] are blank
				UserField = Data[9];
				//Data[10]is "N" and Data[11] is blank
				
				UnqDocKey = Data[12];
				DepositorAcct=UnqDocKey.substring(10, 26);
				UnqDocKey = Configuration.rPad(UnqDocKey, 80, "0");
				AccountNo = Data[13];
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

				String onlyFileName = Configuration.lPad(ItemSeqNo, 14, "0");

				
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
				TransCode = Configuration.lPad(TransCode, 2, "0");
				UserField = Configuration.rPad(UserField, 50, " ");
				PayorBankRoutNo = Configuration.lPad(PayorBankRoutNo, 9, "0");
				

				fullline = TruncatingRTNo + draweeBankSortCode + CreationDate
						+ Amount + SerialNo + RBISeqNo + TransCode + AccountNo
						+ UserField + InstruDate + imageFile1 + imageFile2
						+ imageFile3 + UnqDocKey + PayorBankRoutNo
						+ ClearingType;

				ResultSet rs_seq = stmt_getSeqVal.executeQuery();
				seqNo = "";
				//System.out.println("*********** 6 **** ");
				if (rs_seq.next()) {
					seqNo = rs_seq.getString(1);
					seqNo = Configuration.lPad(seqNo, 15, "0");
				}
				rs_seq.close();

				pst.setString(14, fullline);
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
				//System.out.println("***** 7 **** ");
				try {
					int cnt = pst.executeUpdate();
					//System.out.println("*********** 8 **** ");
				} catch (SQLException e) {
					System.out.println(e + "      " + SerialNo + "   "
							+ PayorBankRoutNo);
					if (!(e.getMessage().indexOf("ORA-00001") > -1))
						throw new Exception("MyException...");
				}
				if (file1Bool && file2Bool && file3Bool)
					pw.println(fullline);
				//System.out.println("" + fullline);
				fullline = null;
				pw.flush();
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
	}
	
	public String readOutwardCXF(ArrayList<String> xmlFiles, ArrayList<String> imgFiles) 
	{// readBPXF
		String flg = "",errorString="0#";
		String str_filename = "", fullline ="",cbsVendor="",SettlementDate = "",fileName="",korasFileName="";
		itemInfo = new ItemInformation();
		long imgFileSize = 0;
		System.out.println("--------------------------- start readOutwardCXF ----------------------------" + fileName);
		Configuration.writeLog("--------------------------start readOutwardCXF --------------------------------------" + fileName);
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
		
		try 
		{// try
			
			con = Configuration.getConnection();
			//String upDownStyle = Configuration.getConfValByNm("CFG_INWD_SPLITSTYLE",con);
			cbsVendor=Configuration.getConfValByNm("CFG_CBS_VENDOR",con);
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
			
			for(int m=0;m<xmlFiles.size();m++)
			{
				imgFileSize=0;
				
				/*pst = con.prepareStatement("insert into CLEARINGINWARD_KUB("
						+ "CLI_TRUNCATINGRTNO, CLI_PAYORBANKROUTNO, CLI_CREATIONDATE, CLI_AMOUNT, "
						+ "CLI_SERIALNO, CLI_RBISEQNO, CLI_TRANSCODE, CLI_ACCOUNTNO, CLI_PAYEENAME, "
						+ "CLI_INSTRUDATE, CLI_IMAGEFILE1, CLI_IMAGEFILE2, CLI_IMAGEFILE3, CLI_FULLLINE, "
						+ "CLI_ITEMSEQUENCENO, CLI_CLEARINGTYPE, CLI_PRESENTMENTDATE, CLI_CYCLENO, "
						+ "CLI_PRESENTINGBANKROUTNO, CLI_BOFDROUTNO,CLI_BOFDBUSDATE, CLI_DEPOSITORACCT, "
						+ "CLI_IFSC, CLI_MEMBERBNKSORTCODE, CLI_ISRETURNOUTWARDCHEQUE, CLI_DDMMYYYY, "
						+ "CLI_UNIQUENO, CLI_XMLFILENAME) "
						+ "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		
				pst1 = con.prepareStatement("select * from BRANCHMSTR where BRM_BRNCD=(select BRM_BRNCD from BRANCHMSTR "
						+ "where BRM_MICRCD=?)");
				pst3 = con.prepareStatement("select * from BRANCHMSTR where BRM_BRNCD=(select BRM_BRNCD from BRANCHMSTR "
						+ "where BRM_MICRCD=? and BRM_SCANNERYN='Y')");
				stmt_getSeqVal = con.prepareStatement("select SEQ_CLEARING_INWARD.nextVal from dual ");*/
				
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
					String _filename = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"/ClearingInward/";
				
					String clearingType = Configuration.lPad(fileName.split("_")[4], 2, "0");
					System.out.println("\n\t clearingType:" + clearingType);
					
					_filename = _filename + "/" + clearingType+ "_Clearing_Verify.txt";
					
					pw = new PrintWriter(new FileWriter(_filename, false));// append mode
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
									if (nm.equalsIgnoreCase("ItemSeqNo")) 
									{
										ItemSeqNo = null;
										ItemSeqNo = value;
										
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
										
									}
									if (nm.equalsIgnoreCase("TransCode")) {
										TransCode = null;
										TransCode = "" + Integer.parseInt(value);
									}
									if (nm.equalsIgnoreCase("ClearingType")) {
										ClearingType = null;
										ClearingType = value;
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
								}// 4
							}// 3
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
									
									imgbn.setImageFile(imageFile1 + ".tif");
								}
								if (ImageViewDetailCnt % 3 == 2) 
								{
									imageFile2 = null;
									imageFile2 = "r_"+ ItemSeqNo.substring(0,ItemSeqNo.length() >= 9 ? 9: ItemSeqNo.length())
											+ SerialNo
											+ Configuration.lPad("" + imgNmCnt, 3,"0");
									imageFile2 = Configuration.lPad(imageFile2, 27,"0");
									
									imgbn.setImageFile(imageFile2 + ".tif");
								}
								if (ImageViewDetailCnt % 3 == 0) 
								{
									imageFile3 = "f_"+ ItemSeqNo.substring(0,ItemSeqNo.length() >= 9 ? 9: ItemSeqNo.length())
											+ SerialNo
											+ Configuration.lPad("" + (imgNmCnt++),3, "0") + "_G";
									imageFile3 = Configuration.lPad(imageFile3, 27,"0");
									
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
	
									TransCode = Configuration.lPad("" + Integer.parseInt(TransCode), 2,"0");
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
									
									pw.println(fullline);
									
									fullline = null;
									fulllineKoras="";
									pw.flush();
									System.gc();
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
										imgbn.setImageDataLength(value);
										imgFileSize = imgFileSize
												+ Long.parseLong(value);
									}
									if (nm.equals("ImageDataOffset"))// {}
										imgbn.setImageDataOffset(value);
									if (nm.equals("FileName"))// {}
									{
										fins = new FileInputStream(bpxfFilePath	+ value);
									}
								}// 6
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
											imgDs1 = imgDs1	+ "DigitalSignatureMethod="
													+ value + "~";// imgbn.setDigitalSignatureMethod(value);
										if (nm.equalsIgnoreCase("SecurityKeySize"))
											imgDs1 = imgDs1 + "SecurityKeySize="
													+ value + "~";// imgbn.setSecurityKeySize(value);
										if (nm.equalsIgnoreCase("DigitalSignatureDataOffset"))
											imgDs1 = imgDs1	+ "DigitalSignatureDataOffset="
													+ value + "~";// imgbn.setDigitalSignatureDataOffset(value);
										if (nm.equalsIgnoreCase("DigitalSignatureLength")) {
											imgDs1 = imgDs1	+ "DigitalSignatureLength="
													+ value + "~";// imgbn.setDigitalSignatureLength(value);
											dsLength = Integer.parseInt(value);
											imgFileSize = imgFileSize + dsLength;
										}
										if (nm.equalsIgnoreCase("Source"))
											imgDs1 = imgDs1 + "Source=" + value+ "~";
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
							}// 7
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
								{}
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
	}// end readBPXF
}// end class