package cts.dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import cts.Configuration;
import cts.ImageBean;
import cts.Item;
import cts.PPSIntimation;
import jakarta.servlet.http.HttpServletRequest;

import javax.xml.namespace.QName;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.events.Attribute;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.io.FileOutputStream;

import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BuiltinFormats;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Formatter;

public class PPSDao {
	private Connection conn = null;
	private PreparedStatement pst = null;
	private PreparedStatement pst1 = null;
	private PreparedStatement updtPst = null;
	private PreparedStatement updtPstnew = null;

	public String fetchIssuanceRecord(String fromDt, String toDt) {
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rst = null;
		JSONObject retJson = new JSONObject();
		JSONArray jArray = new JSONArray();

		try {
			con = Configuration.getConnection();
			int i = 0;
			String query1 = "select PIL_ACCNO, PIL_CHQNO, (to_number(PIL_AMOUNT)/100) PIL_AMOUNT, PIL_PAYEENAME, "
					+ "to_char(to_date(PIL_INSTRUMENT_DT,'dd-mm-yyyy'),'dd-mm-yyyy')PIL_INSTRUMENT_DT, "
					+ "to_char(PIL_ENTRYDATE,'dd-mm-yyyy HH24:MI:SS AM')PIL_ENTRYDATE,PIL_FILE_ID,"
					+ "to_char(PIL_FILECREATIONDT,'dd-mm-yyyy HH24:MI:SS AM') PIL_FILECREATIONDT, "
					+ "decode(nvl((select PCSM_DESCR from PPSCHQSTATUSMSTR where PCSM_FILE_STATUS=PIL_FILE_STATUS "
					+ "and PCSM_REC_STATUS=PIL_REC_STATUS),'NA'),'NA',decode(nvl(PIL_SENTTONPCI,'N'),'N','Not Sent To NPCI','Y','Sent to NPCI'), "
					+ "(select PCSM_DESCR from PPSCHQSTATUSMSTR where PCSM_FILE_STATUS=PIL_FILE_STATUS "
					+ "and PCSM_REC_STATUS=PIL_REC_STATUS)) STATUS from PPSINTIMATIONTRNR "
					+ "where PIL_FILECREATIONDT between to_date(?||' 00:00:00','dd/mm/yyyy HH24:MI:SS') and to_date(?||' 23:59:59','dd/mm/yyyy HH24:MI:SS') order by PIL_FILECREATIONDT desc";
			pst = con.prepareStatement(query1);
			pst.setString(1, fromDt);
			pst.setString(2, toDt);
			System.out.println("query1====" + query1);
			rst = pst.executeQuery();
			while (rst.next()) {
				JSONObject obj = new JSONObject();
				i = i + 1;
				System.out.println("i=" + i);

				obj.put("rownum", i);
				obj.put("PIL_ACCNO", rst.getString("PIL_ACCNO"));
				obj.put("PIL_CHQNO", rst.getString("PIL_CHQNO"));
				obj.put("PIL_AMOUNT", rst.getString("PIL_AMOUNT"));
				obj.put("PIL_PAYEENAME", rst.getString("PIL_PAYEENAME"));
				obj.put("PIL_INSTRUMENT_DT", rst.getString("PIL_INSTRUMENT_DT"));
				obj.put("PIL_ENTRYDATE", rst.getString("PIL_ENTRYDATE"));
				obj.put("PIL_FILE_ID", rst.getString("PIL_FILE_ID"));
				obj.put("PIL_FILECREATIONDT", rst.getString("PIL_FILECREATIONDT"));
				obj.put("STATUS", rst.getString("STATUS"));
				jArray.put(obj);
			}
			rst.close();
			pst.close();
			con.close();
			if (jArray.length() > 0) {
				retJson.put("RESPCODE", "0");
				retJson.put("RETVAL", jArray);
			} else {
				retJson.put("RESPCODE","1");
			}
		} catch (SQLException se) {
			System.out.println("" + se);
			se.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException je) {
				je.printStackTrace();
			}
		} catch (JSONException je) {
			System.out.println("In json====" + je);
			je.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException jee) {
				jee.printStackTrace();
			}
		} catch (Exception e) {
			System.out.println("Exception===" + e);
			e.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException jee) {
				jee.printStackTrace();
			}
		}
		return retJson.toString();
	}

	public String fetchIntimationlogs(String fromDt, String toDt) {
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rst = null;
		JSONObject retJson = new JSONObject();
		JSONArray jArray = new JSONArray();

		try {
			con = Configuration.getConnection();
			String query1 = "select rownum,PIL_CHQNO, PIL_ACCNO,(to_number(PIL_AMOUNT)/100) PIL_AMOUNT, PIL_PAYEENAME, "
					+ "to_char(PIL_ENTRYDATE,'dd-mm-yyyy HH24:MI:SS AM')PIL_ENTRYDATE,\r\n"
					+ "to_char(to_date(PIL_ISTRUMENT_DT,'dd-mm-yyyy'),'dd-mm-yyyy') PIL_ISTRUMENT_DT, "
					+ "decode(PIL_CBSRESPCD,'0',(select  decode(nvl((select PCSM_DESCR from PPSCHQSTATUSMSTR where PCSM_FILE_STATUS=PIL_FILE_STATUS  "
					+ "and PCSM_REC_STATUS=PIL_REC_STATUS),'NA'),'NA',decode(nvl(PIL_SENTTONPCI,'N'),'N','Not Sent To NPCI','Y','Sent to NPCI'), "
					+ "(select PCSM_DESCR from PPSCHQSTATUSMSTR where PCSM_FILE_STATUS=PIL_FILE_STATUS "
					+ "and PCSM_REC_STATUS=PIL_REC_STATUS))  from PPSINTIMATIONTRNR  where PIL_TRANID=a.PIL_TRANID), "
					+ "'1','Mobile No Not matched With RMN','2','Cheque No Does Not Belong To Account', "
					+ "'3','Intimation Already Received But Details Not Matching','4','Intimation Already Received (Duplicate)','5', "
					+ "'Cheque Is Already Honoured','6','Cheque is Surrendered','7','Account No does not belong to Customer',"
					+ "'8','Cheque Payment Stopped','Request Is Not Registered')STATUS "
					+ "from PPSINTIMATIONLOGS a where "
					+ "PIL_ENTRYDATE between to_date(?||' 00:00:00','dd/mm/yyyy HH24:MI:SS') and to_date(?||' 23:59:59','dd/mm/yyyy HH24:MI:SS')";
			pst = con.prepareStatement(query1);
			pst.setString(1, fromDt);
			pst.setString(2, toDt);
			rst = pst.executeQuery();
			while (rst.next()) {
				JSONObject obj = new JSONObject();
				obj.put("rownum", rst.getString("rownum"));
				obj.put("PIL_ACCNO", rst.getString("PIL_ACCNO"));
				obj.put("PIL_CHQNO", rst.getString("PIL_CHQNO"));
				obj.put("PIL_AMOUNT", rst.getString("PIL_AMOUNT"));
				obj.put("PIL_PAYEENAME", rst.getString("PIL_PAYEENAME"));
				obj.put("PIL_ISTRUMENT_DT", rst.getString("PIL_ISTRUMENT_DT"));
				obj.put("PIL_ENTRYDATE", rst.getString("PIL_ENTRYDATE"));
				obj.put("STATUS", rst.getString("STATUS"));
				jArray.put(obj);
			}
			rst.close();
			pst.close();
			con.close();
			if (jArray.length() > 0) {
				retJson.put("RESPCODE", "0");
				retJson.put("RETVAL", jArray);
			} else {
				retJson.put("RESPCODE", "1");
			}
		} catch (SQLException se) {
			System.out.println("" + se);
			se.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException je) {
				je.printStackTrace();
			}
		} catch (JSONException je) {
			System.out.println("In json====" + je);
			je.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException jee) {
				jee.printStackTrace();
			}
		} catch (Exception e) {
			System.out.println("Exception===" + e);
			e.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException jee) {
				jee.printStackTrace();
			}
		}
		return retJson.toString();
	}

	public String fetchIssuanceRecord() {
		JSONObject mainJsonObj = new JSONObject();
		JSONArray jsonArray = new JSONArray();

		String query = "select PIL_ACCNO, PIL_CHQNO, (to_number(PIL_AMOUNT)/100) PIL_AMOUNT, PIL_PAYEENAME, to_char(to_date(PIL_INSTRUMENT_DT,'dd/mm/yyyy'),'dd/mm/yyyy')PIL_INSTRUMENT_DT, to_char(PIL_ENTRYDATE,'dd/mm/yyyy HH24:MI:SS AM')PIL_ENTRYDATE from PPSINTIMATIONTRNR where (nvl(PIL_SENTTONPCI,'N')='N' and PIL_FILE_ID is null) or (nvl(PIL_SENTTONPCI,'N')='N' and PIL_FILE_ID is not null and PIL_FILE_STATUS in (1,2,3) and PIL_REC_STATUS in (1,2,3))";
		try {
			conn = Configuration.getConnection();
			pst = conn.prepareStatement(query);
			ResultSet rs1 = pst.executeQuery();

			while (rs1.next()) {
				JSONObject mainJsonObj1 = new JSONObject();
				mainJsonObj1.put("PIL_ACCNO", rs1.getString("PIL_ACCNO"));
				mainJsonObj1.put("PIL_CHQNO", rs1.getString("PIL_CHQNO"));
				mainJsonObj1.put("PIL_AMOUNT", rs1.getString("PIL_AMOUNT"));
				mainJsonObj1.put("PIL_PAYEENAME", rs1.getString("PIL_PAYEENAME"));
				mainJsonObj1.put("PIL_INSTRUMENT_DT", rs1.getString("PIL_INSTRUMENT_DT"));
				mainJsonObj1.put("PIL_ENTRYDATE", rs1.getString("PIL_ENTRYDATE"));
				jsonArray.put(mainJsonObj1);
			}
			pst.close();
			rs1.close();
			conn.close();
			if (jsonArray.length() > 0) {
				mainJsonObj.put("RETVAL", jsonArray);
				mainJsonObj.put("RESPCODE", "0");
			} else {
				mainJsonObj.put("RETVAL", "FAIL");
				mainJsonObj.put("RESPCODE", "1");

			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Debug@)Dao.fetchIssuanceRecord()\n" + e.getClass() + "\t" + e.getMessage());
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Debug@)Dao.fetchIssuanceRecord()\n" + e.getClass() + "\t" + e.getMessage());
		}
		return mainJsonObj.toString();
	}

	public String createIssuanceFileAdinath(String fileformat) {
		String readpatqry = "select CFG_BANKROUTINGCODE,CFG_PPS_VERSION, CFG_UPLOADPATH_TO_CHI, CFG_BANKNAME from configuration";// CFG_PPS_TYPE

		String readrecqry = "select PIL_ACCNO, PIL_CHQNO, PIL_AMOUNT, PIL_PAYEENAME, PIL_INSTRUMENT_DT, PIL_ENTRYDATE,(to_number(PIL_TRAN_CD))PIL_TRAN_CD,(GETMICRFROMACCOUNTNO(PIL_ACCNO))BANKROUTINGCODE from PPSINTIMATIONTRNR where (nvl(PIL_SENTTONPCI,'N')='N' and PIL_FILE_ID is null) or (nvl(PIL_SENTTONPCI,'N')='N' and PIL_FILE_ID is not null and PIL_FILE_STATUS in (1,2,3) and PIL_REC_STATUS in (1,2,3))";

		String updatrecqry = "update PPSINTIMATIONTRNR set PIL_FILE_ID=?,  PIL_SENTTONPCI='Y' ,  PIL_FILECREATIONDT=SYSDATE where (nvl(PIL_SENTTONPCI,'N')='N' and PIL_FILE_ID is null )";
		JSONObject mainJsonObj = new JSONObject();
		String fileid = "";
		try {
			conn = Configuration.getConnection();
			pst = conn.prepareStatement(readpatqry);
			ResultSet rs1 = pst.executeQuery();
			double PIL_AMOUNT = 0.0;
			String CFG_BANKROUTINGCODE = "", PIL_PAYEENAME = "", CFG_PPS_VERSION = "", CFG_UPLOADPATH_TO_CHI = "",
					field = "", PIL_ACCNO = "", PIL_CHQNO = "", PIL_ISTRUMENT_DT = "", PIL_TRAN_CD = "", CPPS_Flag = "",
					BANKROUTINGCODE = "", CFG_BANKNAME = "";
			if (rs1.next()) {

				CFG_BANKROUTINGCODE = rs1.getString("CFG_BANKROUTINGCODE");
				CFG_PPS_VERSION = rs1.getString("CFG_PPS_VERSION");
				CFG_UPLOADPATH_TO_CHI = rs1.getString("CFG_UPLOADPATH_TO_CHI");
				CFG_BANKNAME = rs1.getString("CFG_BANKNAME");

			}
			pst.close();
			rs1.close();

			try {

				PreparedStatement seqPst = conn.prepareStatement("select ISSUANCE_FILEID_SEQ.nextval from dual");
				ResultSet seqRs = seqPst.executeQuery();
				if (seqRs.next()) {
					field = "" + seqRs.getInt(1);
					fileid = Configuration.lPad(field, 10, "0");
				}
				seqRs.close();
				seqPst.close();
			} catch (Exception e) {
				e.printStackTrace();
			}

			String filepath = CFG_UPLOADPATH_TO_CHI.trim();

			pst1 = conn.prepareStatement(readrecqry);
			ResultSet rs2 = pst1.executeQuery();

			XSSFWorkbook workbook = new XSSFWorkbook();
			XSSFSheet spreadsheet = workbook.createSheet(" Sheet1 ");
			XSSFRow row;

			Map<String, Object[]> maparray = new TreeMap<String, Object[]>();
			maparray.put("1", new Object[] { "AccountNo", "ChequeNo", "IssuanceDate", "Amount", "TransactionCode",
					"DraweeBankName", "DraweeBranchRoutingNo", "PayeeName", "SortACNo", "Status" });
			int srno = 2;
			while (rs2.next()) {
				PIL_ACCNO = rs2.getString("PIL_ACCNO");
				PIL_CHQNO = rs2.getString("PIL_CHQNO");
				PIL_ISTRUMENT_DT = rs2.getString("PIL_INSTRUMENT_DT");
				PIL_AMOUNT = rs2.getDouble("PIL_AMOUNT");
				PIL_TRAN_CD = rs2.getString("PIL_TRAN_CD");
				PIL_PAYEENAME = rs2.getString("PIL_PAYEENAME");
				BANKROUTINGCODE = rs2.getString("BANKROUTINGCODE");
				maparray.put("" + srno, new Object[] { PIL_ACCNO, PIL_CHQNO, PIL_ISTRUMENT_DT, PIL_AMOUNT, PIL_TRAN_CD,
						CFG_BANKNAME, BANKROUTINGCODE, PIL_PAYEENAME, PIL_ACCNO.substring(PIL_ACCNO.length() - 6) });
				srno++;
			}

			Set<String> keyid = maparray.keySet();
			int rowid = 0;
			int cnt = 0;

			for (String key : keyid) {
				row = spreadsheet.createRow(rowid++);
				Object[] objectArr = maparray.get(key);
				int cellid = 0;

				for (Object obj : objectArr) {
					Cell cell = row.createCell(cellid++);
					if (obj instanceof String && cellid != 8) {
						CellStyle newStyle = workbook.createCellStyle();
						DataFormat fmt = workbook.createDataFormat();
						newStyle.setDataFormat(fmt.getFormat("@"));
						cell.setCellValue((String) obj);
						cell.setCellStyle(newStyle);
					}
					if (cellid == 4)// if(obj instanceof Integer)
					{
						CellStyle newStyle = workbook.createCellStyle();
						DataFormat fmt = workbook.createDataFormat();
						newStyle.setDataFormat(fmt.getFormat("0.00"));

						if (cnt == 0)
							cell.setCellValue((String) obj);
						else {
							// System.out.println("amt=="+(Double)obj+"-----"+(Double)obj/100);
							cell.setCellValue((Double) obj / 100);
						}

						cell.setCellStyle(newStyle);
						cnt++;
					}
					if (cellid == 8 || cellid == 10) {
						cell.setCellValue((String) obj);
					}
					/*
					 * CellStyle newStyle = workbook.createCellStyle(); DataFormat fmt =
					 * workbook.createDataFormat(); newStyle.setDataFormat(fmt.getFormat( "@" ));
					 * cell.setCellStyle(newStyle);
					 */

					/*
					 * spreadsheet.setDefaultColumnStyle(0, newStyle);
					 * spreadsheet.setDefaultColumnStyle(1, newStyle);
					 * spreadsheet.setDefaultColumnStyle(2, newStyle);
					 * spreadsheet.setDefaultColumnStyle(4, newStyle);
					 * spreadsheet.setDefaultColumnStyle(6, newStyle);
					 * spreadsheet.setDefaultColumnStyle(8, newStyle);
					 */

					/*
					 * CellStyle numericStyle = workbook.createCellStyle();
					 * numericStyle.setDataFormat(fmt.getFormat( "0.00" ));
					 * spreadsheet.setDefaultColumnStyle(3, numericStyle);
					 */

				}
			}

			String filename = "PP_" + CFG_BANKROUTINGCODE + "_" + Configuration.getDDMMYYYY() + ".xlsx";
			FileOutputStream out = new FileOutputStream(new File(filepath + filename));

			workbook.write(out);
			out.close();
			System.out.println("sheet.xlsx written successfully");

			// xml file
			rs2 = pst1.executeQuery();
			filename = "CIIF_" + CFG_BANKROUTINGCODE + "_" + fileid + ".xml";
			try {

				DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();

				DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();

				Document document = documentBuilder.newDocument();

				// root element
				Element root = document.createElement("ciif-root");
				document.appendChild(root);
				Attr attr1 = document.createAttribute("Version");
				attr1.setValue(CFG_PPS_VERSION);
				root.setAttributeNode(attr1);
				Attr attr2 = document.createAttribute("Fileid");
				attr2.setValue(fileid);
				root.setAttributeNode(attr2);
				Attr attr3 = document.createAttribute("Testfileindicator");
				attr3.setValue("P");
				root.setAttributeNode(attr3);
				Attr attr4 = document.createAttribute("draweebranchroutingno");
				attr4.setValue(CFG_BANKROUTINGCODE);
				root.setAttributeNode(attr4);
				// records element
				Element records = document.createElement("records");

				root.appendChild(records);

				while (rs2.next()) {

					PIL_ACCNO = rs2.getString("PIL_ACCNO");
					PIL_CHQNO = rs2.getString("PIL_CHQNO");
					PIL_ISTRUMENT_DT = rs2.getString("PIL_INSTRUMENT_DT");
					PIL_AMOUNT = rs2.getInt("PIL_AMOUNT");
					PIL_TRAN_CD = rs2.getString("PIL_TRAN_CD");
					PIL_PAYEENAME = rs2.getString("PIL_PAYEENAME");
					BANKROUTINGCODE = rs2.getString("BANKROUTINGCODE");
					String san = PIL_ACCNO.substring(PIL_ACCNO.length() - 6);

					Element item = document.createElement("item");

					records.appendChild(item);
					// set an attribute to staff element
					Attr attritem1 = document.createAttribute("payeeaccno");
					attritem1.setValue(PIL_ACCNO);
					item.setAttributeNode(attritem1);

					Attr attritem2 = document.createAttribute("serialno");
					attritem2.setValue(PIL_CHQNO);
					item.setAttributeNode(attritem2);

					Attr attritem3 = document.createAttribute("issue-date");
					attritem3.setValue(PIL_ISTRUMENT_DT);
					item.setAttributeNode(attritem3);

					Attr attritem4 = document.createAttribute("amount");
					attritem4.setValue(Double.toString(PIL_AMOUNT));
					item.setAttributeNode(attritem4);

					Attr attritem5 = document.createAttribute("transcode");
					attritem5.setValue(PIL_TRAN_CD);
					item.setAttributeNode(attritem5);

					Attr attritem6 = document.createAttribute("draweebankname");
					attritem6.setValue(CFG_BANKNAME);
					item.setAttributeNode(attritem6);

					Attr attritem7 = document.createAttribute("draweebranchroutingno");
					attritem7.setValue(BANKROUTINGCODE);
					// attritem7.setValue(CFG_BANKROUTINGCODE);
					item.setAttributeNode(attritem7);

					Attr attritem8 = document.createAttribute("payeename");
					attritem8.setValue(PIL_PAYEENAME);
					item.setAttributeNode(attritem8);

					Attr attritem9 = document.createAttribute("san");
					attritem9.setValue(san);
					item.setAttributeNode(attritem9);

				}
				TransformerFactory transformerFactory = TransformerFactory.newInstance();
				Transformer transformer = transformerFactory.newTransformer();
				DOMSource domSource = new DOMSource(document);
				StreamResult streamResult = new StreamResult(new File(filepath + filename));

				transformer.transform(domSource, streamResult);

				System.out.println("Done creating XML File");

			} catch (ParserConfigurationException pce) {
				pce.printStackTrace();
			} catch (TransformerException tfe) {
				tfe.printStackTrace();
			}

			// }

			pst1.close();
			rs2.close();

			updtPst = conn.prepareStatement(updatrecqry);
			updtPst.setString(1, fileid);
			int status = updtPst.executeUpdate();

			if (status > 0) {
				mainJsonObj.put("RESPCODE", "0");
			} else {
				mainJsonObj.put("RESPCODE", "1");
			}

			updtPst.close();
			conn.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Debug@)Dao.createIssuanceFile()\n" + e.getClass() + "\t" + e.getMessage());
			try {
				mainJsonObj.put("RESPCODE", "1");
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		} catch (JSONException e) {
			e.printStackTrace();
			try {
				mainJsonObj.put("RESPCODE", "1");
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Debug@)Dao.fetchIssuanceRecord()\n" + e.getClass() + "\t" + e.getMessage());
			try {
				mainJsonObj.put("RESPCODE", "1");
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		return mainJsonObj.toString();

	}
	public String createIssuanceFile(String fileformat,HttpServletRequest request) {
		
		System.out.println("Inside createIssuanceFile=="+ fileformat );
		
		String readpatqry = "select CFG_BANKROUTINGCODE,CFG_PPS_VERSION, CFG_UPLOADPATH_TO_CHI, CFG_BANKNAME,CFG_CHI_BANKNAME,CFG_VENDOR_ID,CFG_HUB_LOCATION_ID from configuration";// CFG_PPS_TYPE

		String readrecqry = "select PIL_ACCNO, PIL_CHQNO, PIL_AMOUNT, PIL_PAYEENAME, PIL_INSTRUMENT_DT, PIL_ENTRYDATE,(to_number(PIL_TRAN_CD))PIL_TRAN_CD,(GETMICRFROMACCOUNTNO(PIL_ACCNO))BANKROUTINGCODE from PPSINTIMATIONTRNR where (nvl(PIL_SENTTONPCI,'N')='N' and PIL_FILE_ID is null) or (nvl(PIL_SENTTONPCI,'N')='N' and PIL_FILE_ID is not null and PIL_FILE_STATUS in (1,2,3) and PIL_REC_STATUS in (1,2,3))";

		String updatrecqry = "update PPSINTIMATIONTRNR set PIL_FILE_ID=?,  PIL_SENTTONPCI='Y' ,  PIL_FILECREATIONDT=SYSDATE  where (nvl(PIL_SENTTONPCI,'N')='N' and PIL_FILE_ID is null )";
		JSONObject mainJsonObj = new JSONObject();
		String fileid = "", fileidyes = "";
		boolean flag = true;
		System.out.println("fileformat===SAM dao==1234 "+ fileformat );
		try {

			double PIL_AMOUNT_XSL = 0.0;
			conn = Configuration.getConnection();
			pst = conn.prepareStatement(readpatqry);
			ResultSet rs1 = pst.executeQuery();
			String CFG_BANKROUTINGCODE = "", CFG_PPS_TYPE = "XML", PIL_PAYEENAME = "", CFG_PPS_VERSION = "",
					CFG_UPLOADPATH_TO_CHI = "", field = "", PIL_ACCNO = "", PIL_CHQNO = "", PIL_ISTRUMENT_DT = "",
					PIL_AMOUNT = "", PIL_TRAN_CD = "", CPPS_Flag = "", BANKROUTINGCODE = "", CFG_BANKNAME = "",
					CFG_VENDOR_ID = "", CFG_HUB_LOCATION_ID = "", CFG_CHI_BANKNAME = "";
			if (rs1.next()) {

				CFG_BANKROUTINGCODE = rs1.getString("CFG_BANKROUTINGCODE");
				CFG_PPS_VERSION = rs1.getString("CFG_PPS_VERSION");
				CFG_UPLOADPATH_TO_CHI = rs1.getString("CFG_UPLOADPATH_TO_CHI");
				CFG_BANKNAME = rs1.getString("CFG_BANKNAME");
				CFG_CHI_BANKNAME = rs1.getString("CFG_CHI_BANKNAME");
				CFG_VENDOR_ID = rs1.getString("CFG_VENDOR_ID");
				CFG_HUB_LOCATION_ID = rs1.getString("CFG_HUB_LOCATION_ID");
			}
			pst.close();
			rs1.close();

			JSONArray jsonArray = new JSONArray();
			StringBuilder strLine = new StringBuilder();
			StringBuilder fileRecords = new StringBuilder();
			try {

				PreparedStatement seqPst = conn.prepareStatement("select ISSUANCE_FILEID_SEQ.nextval from dual");
				ResultSet seqRs = seqPst.executeQuery();
				if (seqRs.next()) {
					field = "" + seqRs.getInt(1);
					fileid = Configuration.lPad(field, 10, "0");
					fileidyes = Configuration.lPad(field, 5, "0");
				}
				seqRs.close();
				seqPst.close();
			} catch (Exception e) {
				e.printStackTrace();
				flag = false;
			}

			String filepath = CFG_UPLOADPATH_TO_CHI.trim();

			pst1 = conn.prepareStatement(readrecqry);
			ResultSet rs2 = pst1.executeQuery();

			String filename = "";
			if (fileformat.equals("CSV")) {
				try {
					filename = "CIIF_" + CFG_BANKROUTINGCODE + "_" + fileid + "_" + CFG_PPS_VERSION + ".csv";

					FileWriter fw = null;
					PrintWriter pw = null;
					//System.out.println("filepath=" + filepath);
					//System.out.println("filepath=" + filepath+"filename==" + filename);
					fw = new FileWriter(filepath + filename);
					pw = new PrintWriter(fw);

					// PayeeAccountNumber,SerialNumber,IssueDate,Amount,Transactioncode,DraweeBankName,DraweeBranchRoutingNumber,PayeeName,San,Optional1,Optional2,Optional3
					pw.println(
							"PayeeAccountNumber,SerialNumber,IssueDate,Amount,Transactioncode,DraweeBankName,DraweeBranchRoutingNumber,PayeeName,San,Optional1,Optional2,Optional3");
					while (rs2.next()) {
						strLine = new StringBuilder();
						PIL_ACCNO = rs2.getString("PIL_ACCNO");
						PIL_CHQNO = rs2.getString("PIL_CHQNO");
						PIL_ISTRUMENT_DT = rs2.getString("PIL_INSTRUMENT_DT");
						PIL_AMOUNT = rs2.getString("PIL_AMOUNT");
						PIL_TRAN_CD = rs2.getString("PIL_TRAN_CD");
						PIL_PAYEENAME = rs2.getString("PIL_PAYEENAME");
						BANKROUTINGCODE = rs2.getString("BANKROUTINGCODE");
						// String
						// strval=PSL_ACCNO+","+PSL_CHQNO+","+PSL_DTTM+","+PSL_AMOUNT+","+PSL_TRANCD+",,"+CFG_BANKROUTINGCODE+",,,,";
						strLine.append(PIL_ACCNO + ",");
						strLine.append(PIL_CHQNO + ",");
						strLine.append(PIL_ISTRUMENT_DT + ",");
						strLine.append(PIL_AMOUNT + ",");
						strLine.append(PIL_TRAN_CD + ",");
						strLine.append(CFG_BANKNAME + ",");
						// strLine.append(CFG_BANKROUTINGCODE+",");
						strLine.append(BANKROUTINGCODE + ",");
						strLine.append(PIL_PAYEENAME + ",");
						strLine.append(PIL_ACCNO.substring(PIL_ACCNO.length() - 6) + ",,,");

						//
						if (fileRecords.length() == 0) {
							fileRecords.append(strLine);
						} else {
							fileRecords.append("\n" + strLine);
						}

					}
					pw.println(fileRecords.toString());
					pw.flush();
					pw.close();
				} catch (Exception e) {
					e.printStackTrace();
					flag = false;
				}
			} else if (fileformat.equals("XML")) {
				rs2 = pst1.executeQuery();
				filename = "CIIF_" + CFG_BANKROUTINGCODE + "_" + fileid + ".xml";
				try {

					DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();

					DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();

					Document document = documentBuilder.newDocument();

					// root element
					Element root = document.createElement("ciif-root");
					document.appendChild(root);
					Attr attr1 = document.createAttribute("Version");
					attr1.setValue(CFG_PPS_VERSION);
					root.setAttributeNode(attr1);
					Attr attr2 = document.createAttribute("Fileid");
					attr2.setValue(fileid);
					root.setAttributeNode(attr2);
					Attr attr3 = document.createAttribute("Testfileindicator");
					attr3.setValue("P");
					root.setAttributeNode(attr3);
					Attr attr4 = document.createAttribute("draweebranchroutingno");
					attr4.setValue(CFG_BANKROUTINGCODE);
					root.setAttributeNode(attr4);
					// records element
					Element records = document.createElement("records");

					root.appendChild(records);

					while (rs2.next()) {

						PIL_ACCNO = rs2.getString("PIL_ACCNO");
						PIL_CHQNO = rs2.getString("PIL_CHQNO");
						PIL_ISTRUMENT_DT = rs2.getString("PIL_INSTRUMENT_DT");
						PIL_AMOUNT = rs2.getString("PIL_AMOUNT");
						PIL_TRAN_CD = rs2.getString("PIL_TRAN_CD");
						PIL_PAYEENAME = rs2.getString("PIL_PAYEENAME");
						BANKROUTINGCODE = rs2.getString("BANKROUTINGCODE");
						String san = PIL_ACCNO.substring(PIL_ACCNO.length() - 6);

						Element item = document.createElement("item");

						records.appendChild(item);
						// set an attribute to staff element
						Attr attritem1 = document.createAttribute("payeeaccno");
						attritem1.setValue(PIL_ACCNO);
						item.setAttributeNode(attritem1);

						Attr attritem2 = document.createAttribute("serialno");
						attritem2.setValue(PIL_CHQNO);
						item.setAttributeNode(attritem2);

						Attr attritem3 = document.createAttribute("issue-date");
						attritem3.setValue(PIL_ISTRUMENT_DT);
						item.setAttributeNode(attritem3);

						Attr attritem4 = document.createAttribute("amount");
						attritem4.setValue(PIL_AMOUNT);
						item.setAttributeNode(attritem4);

						Attr attritem5 = document.createAttribute("transcode");
						attritem5.setValue(PIL_TRAN_CD);
						item.setAttributeNode(attritem5);

						Attr attritem6 = document.createAttribute("draweebankname");
						attritem6.setValue(CFG_BANKNAME);
						item.setAttributeNode(attritem6);

						Attr attritem7 = document.createAttribute("draweebranchroutingno");
						attritem7.setValue(BANKROUTINGCODE);
						// attritem7.setValue(CFG_BANKROUTINGCODE);
						item.setAttributeNode(attritem7);

						Attr attritem8 = document.createAttribute("payeename");
						attritem8.setValue(PIL_PAYEENAME);
						item.setAttributeNode(attritem8);

						Attr attritem9 = document.createAttribute("san");
						attritem9.setValue(san);
						item.setAttributeNode(attritem9);

					}
					TransformerFactory transformerFactory = TransformerFactory.newInstance();
					Transformer transformer = transformerFactory.newTransformer();
					DOMSource domSource = new DOMSource(document);
					StreamResult streamResult = new StreamResult(new File(filepath + filename));

					transformer.transform(domSource, streamResult);

					System.out.println("--Done creating XML File---");

				} catch (ParserConfigurationException pce) {
					pce.printStackTrace();
					flag = false;
				} catch (TransformerException tfe) {
					tfe.printStackTrace();
					flag = false;
				}
				pst1.close();
				rs2.close();
			} else if (fileformat.equals("XSL")) {
				if (CFG_CHI_BANKNAME.equals("YESBANK")) {

					try {
						XSSFWorkbook workbook = new XSSFWorkbook();
						XSSFSheet spreadsheet = workbook.createSheet(" Sheet1 ");
						XSSFRow row;

						Map<String, Object[]> maparray = new TreeMap<String, Object[]>();
						maparray.put("1",
								new Object[] { "AccountNo", "ChequeNo", "IssuanceDate", "Amount", "TransactionCode",
										"DraweeBankName", "DraweeBranchRoutingNo", "PayeeName", "SortACNo" });
						int srno = 2;
						while (rs2.next()) {
							PIL_ACCNO = rs2.getString("PIL_ACCNO");
							PIL_CHQNO = rs2.getString("PIL_CHQNO");
							PIL_ISTRUMENT_DT = rs2.getString("PIL_INSTRUMENT_DT");
							PIL_AMOUNT_XSL = rs2.getDouble("PIL_AMOUNT");
							PIL_TRAN_CD = rs2.getString("PIL_TRAN_CD");
							PIL_PAYEENAME = rs2.getString("PIL_PAYEENAME");
							BANKROUTINGCODE = rs2.getString("BANKROUTINGCODE");
							maparray.put("" + srno,
									new Object[] { PIL_ACCNO, PIL_CHQNO, PIL_ISTRUMENT_DT, PIL_AMOUNT_XSL, PIL_TRAN_CD,
											CFG_BANKNAME, BANKROUTINGCODE, PIL_PAYEENAME,
											PIL_ACCNO.substring(PIL_ACCNO.length() - 6) });
							srno++;
						}

						Set<String> keyid = maparray.keySet();
						int rowid = 0;
						int cnt = 0;

						for (String key : keyid) {
							row = spreadsheet.createRow(rowid++);
							Object[] objectArr = maparray.get(key);
							int cellid = 0;

							for (Object obj : objectArr) {
								Cell cell = row.createCell(cellid++);
								if (obj instanceof String && cellid != 8) {
									CellStyle newStyle = workbook.createCellStyle();
									DataFormat fmt = workbook.createDataFormat();
									newStyle.setDataFormat(fmt.getFormat("@"));
									cell.setCellValue((String) obj);
									cell.setCellStyle(newStyle);
								}
								if (cellid == 4)// if(obj instanceof Integer)
								{
									CellStyle newStyle = workbook.createCellStyle();
									DataFormat fmt = workbook.createDataFormat();
									newStyle.setDataFormat(fmt.getFormat("0.00"));

									if (cnt == 0)
										cell.setCellValue((String) obj);
									else {
										// System.out.println("amt=="+(Double)obj+"-----"+(Double)obj/100);
										cell.setCellValue((Double) obj / 100);
									}

									cell.setCellStyle(newStyle);
									cnt++;
								}
								if (cellid == 8 || cellid == 10) {
									cell.setCellValue((String) obj);
								}

							}
						}

						filename = "PPS_" + CFG_VENDOR_ID + CFG_HUB_LOCATION_ID + "_" + Configuration.getDDMMYYYY()
								+ "_" + fileidyes + ".xlsx";
						FileOutputStream out = new FileOutputStream(new File(filepath + filename));

						workbook.write(out);
						out.close();
						System.out.println("sheet.xlsx written successfully");
					} catch (Exception e) {
						e.printStackTrace();
						flag = false;
					}

				} else {
					try {
						XSSFWorkbook workbook = new XSSFWorkbook();
						XSSFSheet spreadsheet = workbook.createSheet(" Sheet1 ");
						XSSFRow row;

						Map<String, Object[]> maparray = new TreeMap<String, Object[]>();
						maparray.put("1",
								new Object[] { "AccountNo", "ChequeNo", "IssuanceDate", "Amount", "TransactionCode",
										"DraweeBankName", "DraweeBranchRoutingNo", "PayeeName", "SortACNo", "Status" });
						int srno = 2;
						while (rs2.next()) {
							PIL_ACCNO = rs2.getString("PIL_ACCNO");
							PIL_CHQNO = rs2.getString("PIL_CHQNO");
							PIL_ISTRUMENT_DT = rs2.getString("PIL_INSTRUMENT_DT");
							PIL_AMOUNT_XSL = rs2.getDouble("PIL_AMOUNT");
							PIL_TRAN_CD = rs2.getString("PIL_TRAN_CD");
							PIL_PAYEENAME = rs2.getString("PIL_PAYEENAME");
							BANKROUTINGCODE = rs2.getString("BANKROUTINGCODE");
							maparray.put("" + srno,
									new Object[] { PIL_ACCNO, PIL_CHQNO, PIL_ISTRUMENT_DT, PIL_AMOUNT_XSL, PIL_TRAN_CD,
											CFG_BANKNAME, BANKROUTINGCODE, PIL_PAYEENAME,
											PIL_ACCNO.substring(PIL_ACCNO.length() - 6) });
							srno++;
						}

						Set<String> keyid = maparray.keySet();
						int rowid = 0;
						int cnt = 0;

						for (String key : keyid) {
							row = spreadsheet.createRow(rowid++);
							Object[] objectArr = maparray.get(key);
							int cellid = 0;

							for (Object obj : objectArr) {
								Cell cell = row.createCell(cellid++);
								if (obj instanceof String && cellid != 8) {
									CellStyle newStyle = workbook.createCellStyle();
									DataFormat fmt = workbook.createDataFormat();
									newStyle.setDataFormat(fmt.getFormat("@"));
									cell.setCellValue((String) obj);
									cell.setCellStyle(newStyle);
								}
								if (cellid == 4)// if(obj instanceof Integer)
								{
									CellStyle newStyle = workbook.createCellStyle();
									DataFormat fmt = workbook.createDataFormat();
									newStyle.setDataFormat(fmt.getFormat("0.00"));

									if (cnt == 0)
										cell.setCellValue((String) obj);
									else {
										// System.out.println("amt=="+(Double)obj+"-----"+(Double)obj/100);
										cell.setCellValue((Double) obj / 100);
									}

									cell.setCellStyle(newStyle);
									cnt++;
								}
								if (cellid == 8 || cellid == 10) {
									cell.setCellValue((String) obj);
								}

							}
						}

						filename = "PP_" + CFG_BANKROUTINGCODE + "_" + Configuration.getDDMMYYYY() + ".xlsx";
						FileOutputStream out = new FileOutputStream(new File(filepath + filename));

						workbook.write(out);
						out.close();
						System.out.println("sheet.xlsx written successfully");
					} catch (Exception e) {
						e.printStackTrace();
						flag = false;
					}
				}
			}

			/*
			 * else if(fileformat.equals("TXT")) {
			 * 
			 * String soddate=Configuration.getYYYYMMDD(); String
			 * filename=CFG_BANKROUTINGCODE+soddate+field+".TXT"; String
			 * refno_RBI="",basenumber=""; int cnt=0; long totamt=0; FileWriter fw = null;
			 * PrintWriter pw = null; System.out.println("filepath======"+filepath);
			 * System.out.println("filepath======"+filepath+filename); fw = new
			 * FileWriter(filepath+filename); pw = new PrintWriter(fw);
			 * 
			 * String clearingdt=Configuration.getDDMMYY();
			 * clearingdt=clearingdt.substring(0,2)+"/"+clearingdt.substring(2,4)+"/"+
			 * clearingdt.substring(4); pw.println("HDFC CLEARING DATE :"+clearingdt);
			 * 
			 * while(rs2.next()) { strLine=new StringBuilder();
			 * PIL_ACCNO=rs2.getString("PIL_ACCNO"); PIL_CHQNO=rs2.getString("PIL_CHQNO");
			 * PIL_ISTRUMENT_DT=rs2.getString("PIL_INSTRUMENT_DT");
			 * PIL_AMOUNT=rs2.getString("PIL_AMOUNT");
			 * PIL_TRAN_CD=rs2.getString("PIL_TRAN_CD");
			 * BANKROUTINGCODE=rs2.getString("BANKROUTINGCODE");
			 * 
			 * totamt=totamt+Long.parseLong(PIL_AMOUNT);
			 * PIL_AMOUNT=Configuration.lPad(PIL_AMOUNT, 13, "0");
			 * refno_RBI=Configuration.lPad(refno_RBI, 10, "0");
			 * basenumber=PIL_ACCNO.substring(PIL_ACCNO.length()-6);
			 * strLine.append("000000000"); //strLine.append(CFG_BANKROUTINGCODE);
			 * strLine.append(BANKROUTINGCODE); strLine.append(PIL_ISTRUMENT_DT);
			 * strLine.append(PIL_AMOUNT); strLine.append(PIL_CHQNO);
			 * strLine.append(refno_RBI); strLine.append(Configuration.lPad(PIL_TRAN_CD, 2,
			 * " ")); strLine.append("0000"); strLine.append(basenumber);
			 * strLine.append(CPPS_Flag);
			 * 
			 * if(fileRecords.length()==0) { fileRecords.append(strLine); } else {
			 * fileRecords.append("\n"+strLine); }
			 * 
			 * cnt++;
			 * 
			 * } pw.println(fileRecords.toString());
			 * pw.println("TOTAL NO OF ITEMS: "+cnt+" TOTAL VALUE: "+totamt+".00");
			 * pw.flush(); pw.close();
			 * 
			 * }
			 */
		//	System.out.println("SAM flag=======" + flag);
		//	System.out.println("11fileformat==" + fileformat);
			int scnt = 0;
		//	System.out.println("222fileformat==" + fileformat);
			
			if ((fileformat.equals("CSV") || fileformat.equals("XML") || fileformat.equals("XSL")) && flag) {
					//System.out.println("inside fileformat==" + fileformat);
					updtPst = conn.prepareStatement(updatrecqry);
				
					//System.out.println("CFG_CHI_BANKNAME==" + CFG_CHI_BANKNAME);
			
				if (CFG_CHI_BANKNAME.equals("YESBANK"))
				{
					updtPst.setString(1, fileidyes);
				} 
				else if (CFG_CHI_BANKNAME.equals("NPCI"))
				{
				//	System.out.println("sharayu mali ** CFG_CHI_BANKNAME=" + CFG_CHI_BANKNAME);
					String cheqstatus = "select count(*) from PPSINTIMATIONTRNR where PIL_FILECREATIONDT is not null and PIL_FILE_ID is not null  and PIL_FILE_STATUS is null  and  PIL_REC_STATUS is null";

					PreparedStatement pst = conn.prepareStatement(cheqstatus);
					ResultSet rss = pst.executeQuery();
					if (rss.next()) {
						scnt = rss.getInt(1);
					}
					if (scnt > 0) {
						mainJsonObj.put("RESPCODE", "2");
					} else {
						updtPst.setString(1, fileid);
					}
					rss.close();
					pst.close();
				} else {
					updtPst.setString(1, fileid);

				}
				//System.out.println("SAM scnt=="+scnt);
				if (scnt == 0)
				{
					int status = updtPst.executeUpdate();
					System.out.println("SAM status=="+status);
					if (status > 0) 
					{
					//	System.out.println("SAM filepath=="+filepath);
					//	System.out.println("SAM filename=="+filename);
						
						mainJsonObj.put("RESPCODE", "0");// filepath  filename
						System.out.println("\n request path=="+request.getRealPath("/"));
						System.out.println("SAM filepath=="+filepath);
												
						String requestpath=request.getRealPath("/"); // "D:\\Apache10_XYZ\\webapps\\CTS_Apache10\\";
						requestpath=requestpath.replace("\\", "/");
						
						//String filepath="D:/Apache10_XYZ/webapps/CTS_Apache10/uploadpath_to_CHI/";
						System.out.println(filepath.replace(requestpath, ""));
						filepath=filepath.replace(requestpath, "");
						System.out.println("\n filepath=="+filepath);
						
						
						mainJsonObj.put("REPFILEPATH",filepath); //REPFILEPATH,REPFILENAME
						mainJsonObj.put("REPFILENAME", filename);
					} 
					else
					{
						mainJsonObj.put("RESPCODE", "1");
					}
				}
				updtPst.close();
				conn.close();
			} else {
				mainJsonObj.put("RESPCODE", "1");
			}

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Debug@)Dao.createIssuanceFile()\n" + e.getClass() + "\t" + e.getMessage());
			try {
				mainJsonObj.put("RESPCODE", "1");
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		} catch (JSONException e) {
			e.printStackTrace();
			try {
				mainJsonObj.put("RESPCODE", "1");
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Debug@)Dao.fetchIssuanceRecord()\n" + e.getClass() + "\t" + e.getMessage());
			try {
				mainJsonObj.put("RESPCODE", "1");
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		return mainJsonObj.toString();

	}

	public String ReadIssuanceResp(String filename) throws SQLException {
		System.out.println("11111122222222222------------------------");
		int updtCnt = 0;
		int LINCNT = 0;
		String line = "";
		String status = "";
		String[] temp = null;
		FileReader fis = null;
		BufferedReader dis = null;
		JSONObject rtnObj = new JSONObject();
		JSONArray jsonArray = new JSONArray();

		XMLInputFactory xmlInputFactory = null;
		XMLEventReader xmlEventReader = null;

		String accountNo = "", retval = "", chequeNo = "", rejectreson = "", issueDt = "", amount = "", tranCd = "",
				draweeBnkNm = "", draweeBnkRoutCd = "", payeeNm = "", san = "", option1 = "", option2 = "",
				option3 = "", recstatus = "";

		String updatrecqry1 = "update PPSINTIMATIONTRNR set PIL_FILE_STATUS=?, PIL_REC_STATUS=? where PIL_FILE_ID=?";

		String updatrecqry2 = "update PPSINTIMATIONTRNR set PIL_FILE_STATUS='4',  PIL_REC_STATUS=? where PIL_FILE_ID=? and PIL_ACCNO=? and PIL_CHQNO=? and PIL_INSTRUMENT_DT=? and PIL_AMOUNT=? and PIL_TRAN_CD=?";

		String updatrecqry3 = "update PPSINTIMATIONTRNR set PIL_FILE_STATUS='0', PIL_REC_STATUS='0' where PIL_FILE_ID=? and PIL_FILE_STATUS is null and PIL_REC_STATUS is null";

		String updatrecqryes = "update PPSINTIMATIONTRNR set PIL_FILE_STATUS=?,  PIL_REC_STATUS=? where PIL_FILE_ID=? and PIL_ACCNO=? and PIL_CHQNO=? and  PIL_AMOUNT=(?*100) and PIL_TRAN_CD=?";

		String selectqry = "select PIL_ACCNO, PIL_CHQNO, (to_number(PIL_AMOUNT)/100) PIL_AMOUNT, PIL_PAYEENAME,"
				+ " to_char(to_date(PIL_INSTRUMENT_DT,'dd-mm-yyyy'),'dd-mm-yyyy')PIL_INSTRUMENT_DT,to_char(PIL_ENTRYDATE,'dd-mm-yyyy HH24:MI:SS AM')PIL_ENTRYDATE, "
				+ "(select PCSM_DESCR from PPSCHQSTATUSMSTR where PCSM_FILE_STATUS=PIL_FILE_STATUS  and PCSM_REC_STATUS=PIL_REC_STATUS) "
				+ "STATUS from PPSINTIMATIONTRNR where PIL_FILE_ID=?";

		try {

			String field = "",field_ID="";
			conn = Configuration.getConnection();
			String CFG_CHI_BANKNAME = Configuration.getConfValByNm("CFG_CHI_BANKNAME", conn);
			System.out.println("SAM filename====" + filename);
			//filename=;
			String[] tempfilename = filename.replace("_Res", "").split("_");
			if (CFG_CHI_BANKNAME.equals("YESBANK")) {
				field = tempfilename[3];
			} else if (CFG_CHI_BANKNAME.equals("NPCI")) {
				field = tempfilename[2];
				System.out.println(" field  ==" + field);
				if (filename.indexOf("CSV") > -1 || filename.indexOf("csv") > -1)
				{
					field = tempfilename[2];
					System.out.println("CSV field Sharayu Mali ==" + field);
				}
				else if (filename.indexOf("xlsx") > -1 || filename.indexOf("xls") > -1) 
				{
					System.out.println(" field xlsx ==" + field);
					field = field.substring(0, field.length() - 5);
					System.out.println("after filed Sharayu Mali ==" + field);
					String query = "select max(PIL_FILE_ID) fileID from PPSINTIMATIONTRNR where  to_char(PIL_FILECREATIONDT,'ddmmyyyy')=?";
					PreparedStatement pst = conn.prepareStatement(query);
					pst.setString(1, field);
					ResultSet rs = pst.executeQuery();
					if (rs.next()) {
						field = rs.getString("fileID");
						field_ID=field;
					}
					rs.close();
					pst.close();
					System.out.println(" field Sharayu Mali ==" + field);
				 }
				else
				{	
					field = field.substring(0, field.length() - 5);
					System.out.println("Else after filed Sharayu Mali ==" + field);
				
				}
				/*String query = "select max(PIL_FILE_ID) fileID from PPSINTIMATIONTRNR where  to_char(PIL_FILECREATIONDT,'ddmmyyyy')=?";
				PreparedStatement pst = conn.prepareStatement(query);
				pst.setString(1, field);
				ResultSet rs = pst.executeQuery();
				if (rs.next()) {
					field = rs.getString("fileID");
					field_ID=field;
				}
				rs.close();
				pst.close();*/
				System.out.println("After  Sharayu ==" + field+"&& field_ID="+field_ID);
				

			} else {
				field = tempfilename[2];
			}
			// String[] PPS_TYPE=filename.split(".");PPS_00342002_DDMMYYYY_00001_RES.xlsx
			String path = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", conn);
			// String CFG_PPS_TYPE=PPS_TYPE[1];
			if (filename.indexOf("CSV") > -1 || filename.indexOf("csv") > -1) {
				try {
					System.out.println(line.indexOf("FileStatus"));
					System.out.println("tempfilename.length=="+tempfilename.length);
					if (tempfilename.length < 3) {
						field = field.substring(0, field.indexOf(".CSV"));
					}
					fis = new FileReader(new File(path.trim() + filename.trim()));
					dis = new BufferedReader(fis);
					while ((line = dis.readLine()) != null) {
						LINCNT++;
						// if(line.length()==2) {
						System.out.println("line===" + line + "===" + field);
						if (line.contains("FileStatus")) {
							line = dis.readLine();
							status = line;
							if (status.equals("0") || status.equals("1") || status.equals("2") || status.equals("3")
									|| status.equals("4")) {
								updtPst = conn.prepareStatement(updatrecqry1);
								updtPst.setString(1, status);
								updtPst.setString(2, status);
								updtPst.setString(3, field);
								int ret = updtPst.executeUpdate();
								updtPst.close();

							}
						}

						// }
						else {

							temp = line.split(",");
							accountNo = temp[0];
							chequeNo = temp[1];
							issueDt = temp[2];
							amount = temp[3];
							tranCd = temp[4];
							draweeBnkNm = temp[5];
							draweeBnkRoutCd = temp[6];
							payeeNm = temp[7];
							san = temp[8];
							option1 = temp[9];
							option2 = temp[10];
							option3 = temp[11];
							status = temp[12];

							updtPst = conn.prepareStatement(updatrecqry2);
							updtPst.setString(1, status);
							updtPst.setString(2, field);
							updtPst.setString(3, accountNo);
							updtPst.setString(4, chequeNo);
							updtPst.setString(5, issueDt);
							updtPst.setString(6, amount);
							updtPst.setString(7, tranCd);
							int ret = updtPst.executeUpdate();
							updtPst.close();

						}
					}

					retval = "SUCCESS";
				}
// try

				catch (Exception ex) {
					System.out.println("\n\t Exception in readPPSresponse():" + ex);
					ex.printStackTrace();
					retval = "FAIL";
				} finally {
					try {
						if (updtPst != null) {
							updtPst.close();
							// con.close();
						}
					} catch (Exception e) {
					}
				}
			} else if (filename.indexOf("xlsx") > -1 || filename.indexOf("xls") > -1) {
				try {

					int rowCount = -1, colCount = -1;
					String colValue = "";
					String custid = "";
					boolean isTrue = false;
					JSONObject json = new JSONObject();
					System.out.println(path.trim() + filename.trim());
					FileInputStream file = new FileInputStream(new File(path.trim() + filename.trim()));

					XSSFWorkbook workbook = new XSSFWorkbook(file);
					XSSFSheet sheet = workbook.getSheetAt(0);
					Iterator<Row> rowIterator = sheet.rowIterator();
					rowCount = 1;
					JSONArray rows = new JSONArray();
					ArrayList<String> tagNames = new ArrayList<String>();

					while (rowIterator.hasNext()) {

						JSONArray cells = new JSONArray();
						// System.out.println("Row: "+rowCount);
						Row row = rowIterator.next();
						// System.out.println("Row: "+row);
						if (row == null) {
							break;
						}
						Iterator<Cell> cellIterator = row.cellIterator();
						colCount = 0;
						JSONObject jRow = new JSONObject();
						while (cellIterator.hasNext()) {
							Cell cell = cellIterator.next();
							if (rowCount == 1) {
								tagNames.add(cell.getStringCellValue());
							} else if (rowCount > 1) {
								long dv;

								switch (cell.getCellType()) {
								case NUMERIC:

									dv = (long) cell.getNumericCellValue();
									colValue = "" + dv;
									// System.out.println(""+dv);
									// cells.put(dv);
									// jRow.put( tagNames.get(colCount), dv );
									break;

								case STRING:
									// default:
									// System.out.println(""+cell.getStringCellValue());
									// cells.put( cell.getStringCellValue());
									// jRow.put( tagNames.get(colCount), cell.getStringCellValue() );
									colValue = "" + cell.getStringCellValue();
									break;
								}
								// System.out.println("CollCount="+colCount+"\tcolValue="+colValue);
							}
							// sharayu mali write code here for NPCI file reading
							// System.out.println("CFG_CHI_BANKNAME="+CFG_CHI_BANKNAME);
							if (CFG_CHI_BANKNAME.equals("NPCI")) {
								// System.out.println("CFG_CHI_BANKNAME="+CFG_CHI_BANKNAME);
								// System.out.println("colCount="+colCount);

								if (colCount == 0) {
									accountNo = colValue;
								}
								if (colCount == 1) {
									chequeNo = colValue;
								}
								if (colCount == 2) {
									issueDt = colValue;
								}
								if (colCount == 3) {
									amount = colValue;
								}
								if (colCount == 4) {
									tranCd = colValue;
								}
								if (colCount == 5) {
									draweeBnkNm = colValue;
								}
								if (colCount == 6) {
									draweeBnkRoutCd = colValue;
								}
								if (colCount == 7) {
									payeeNm = colValue;
								}
								if (colCount == 8) {
									san = colValue;
								}
								if (colCount == 9) {
									System.out.println("--AAAAAA----");
									status = colValue;
									if (status.length() == 0) {
										status = "0";
									} else {
										status = colValue.trim();
										if (status.length() == 0) {
											status = "0";
										}
									}
									System.out.println("~~status=" + status);
								}
								if (colCount == 10) {
									/*
									 * status=colValue; System.out.println("mali status="+status);
									 * recstatus=colValue; if(recstatus.length()==0) { recstatus="0"; }
									 */
									recstatus = colValue;
									if (recstatus.length() == 0) {
										recstatus = "0";
									} else {
										recstatus = colValue.trim();
										if (recstatus.length() == 0) {
											recstatus = "0";
										}
									}
									System.out.println("Tahashildar status=" + recstatus);
								} /*
									 * else { status = "NA"; }
									 */
								// System.out.println("CollCount="+colCount+"\t* colValue="+colValue);
							} else {
								System.out.println("In Else ");
								if (colCount == 0) {
									accountNo = colValue;
								}
								if (colCount == 1) {
									chequeNo = colValue;
								}
								if (colCount == 2) {
									issueDt = colValue;
								}
								if (colCount == 3) {
									amount = colValue;
								}
								if (colCount == 4) {
									tranCd = colValue;
								}
								if (colCount == 9) {
									System.out.println("--AAAAAA----");
									status = colValue;
									if (status.length() == 0) {
										status = "0";
									} else {
										status = colValue.trim();
										if (status.length() == 0) {
											status = "0";
										}
									}
									System.out.println("~~status=" + status);
								}
								if (colCount == 10) {
									recstatus = colValue;
									if (recstatus.length() == 0) {
										recstatus = "0";
									} else {
										recstatus = colValue.trim();
										if (recstatus.length() == 0) {
											recstatus = "0";
										}
									}
								}

							}
							colCount++;
						} // end else by sam
						if (rowCount > 1) {
							try {
								System.out.println("@recstatus===" + recstatus + "-");
								System.out.println("@status=" + status + "-");
								int count = 0;
								if (!status.equals("NA")) {
									System.out.println("@in if :" + status + "=" + recstatus);
									System.out.println("updatrecqryes=="+updatrecqryes);
									System.out.println("status=="+status);
									System.out.println("recstatus=="+recstatus);
									System.out.println("Before field=="+field);
									 if (filename.indexOf("xlsx") > -1 || filename.indexOf("xls") > -1) {
										 System.out.println("filename field =="+field_ID);
										 field= field_ID;
									 }
									System.out.println("after field=="+field);
									System.out.println("accountNo=="+accountNo);
									System.out.println("chequeNo=="+chequeNo);
									System.out.println("issueDt=No required="+issueDt);
									System.out.println("amount=="+amount);
									System.out.println("tranCd=="+tranCd);
									updtPst = conn.prepareStatement(updatrecqryes);
									updtPst.setString(1, status);
									updtPst.setString(2, recstatus);
									updtPst.setString(3, field);
									updtPst.setString(4, accountNo);
									updtPst.setString(5, chequeNo);
								//	updtPst.setString(6, issueDt);
									updtPst.setString(6, amount);
									updtPst.setString(7, tranCd);
									int ret = updtPst.executeUpdate();
									if (ret > 0)
										count++;
									// updtPst.close();
									System.out.println("sharayu=" + ret);
									retval = "SUCCESS";
								} else {
									retval = "FAIL";
									System.out.println("=else=sharayu=" + retval);
								}
								updtPst.close();
							} catch (SQLIntegrityConstraintViolationException e) {
								System.out.println("error");
								retval = "ERROR";
							} catch (Exception e) {
								e.printStackTrace();
								retval = "ERROR";
							}

						}
						rowCount++;

					}

					/*
					 * String excelpath = path.trim() + filename.trim();
					 * Class.forName("oracle.jdbc.driver.OracleDriver"); Connection con =
					 * DriverManager.getConnection(
					 * "jdbc:odbc:Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DBQ="
					 * + excelpath + ";ReadOnly=0;");
					 * 
					 * PreparedStatement pst =
					 * con.prepareStatement("select * from [Primary Data$]"); ResultSet rs =
					 * pst.executeQuery(); while (rs.next()) { LINCNT++; accountNo =
					 * rs.getString(1); chequeNo = rs.getString(2); issueDt = rs.getString(3);
					 * amount = rs.getString(4); tranCd = rs.getString(5); draweeBnkNm =
					 * rs.getString(6); System.out.println("draweeBnkNm=" + draweeBnkNm);
					 * draweeBnkRoutCd = rs.getString(7); payeeNm = rs.getString(8); san =
					 * rs.getString(9); status = rs.getString(10);
					 * 
					 * updtPst = conn.prepareStatement(updatrecqry2); updtPst.setString(1, status);
					 * updtPst.setString(2, field); updtPst.setString(3, accountNo);
					 * updtPst.setString(4, chequeNo); updtPst.setString(5, issueDt);
					 * updtPst.setString(6, amount); updtPst.setString(7, tranCd); int ret =
					 * updtPst.executeUpdate(); updtPst.close();
					 * 
					 * } retval = "SUCCESS";
					 */

				}
// try

				catch (Exception ex) {
					System.out.println("\n\t Exception in readPPSresponse():" + ex);
					ex.printStackTrace();
					retval = "FAIL";
				} finally {
					try {
						if (updtPst != null) {
							updtPst.close();
							// con.close();
						}
					} catch (Exception e) {
					}
				}
			} else {
				int count = 0;
				try {
					xmlInputFactory = XMLInputFactory.newInstance();
					xmlEventReader = xmlInputFactory.createXMLEventReader(new FileInputStream(path + filename.trim()));

					while (xmlEventReader.hasNext()) {// 1
						XMLEvent event = xmlEventReader.nextEvent();
						if (event.isStartElement()) {// 2
							StartElement element = (StartElement) event;
							String elementName = element.getName().toString();
							String elementString = elementName.substring(elementName.lastIndexOf("}") + 1,
									elementName.length());
							System.out.println("elementString::" + elementString);
							if (elementString.equalsIgnoreCase("ciif-response")) {// 3
								Iterator iterator = element.getAttributes();
								while (iterator.hasNext()) {// 3.1
									Attribute attribute = (Attribute) iterator.next();
									QName name = attribute.getName();
									String attributeValue = attribute.getValue();
									String attributeName = name.toString();
									System.out.println(attributeName + ":" + attributeValue);
									if (attributeName.equalsIgnoreCase("Filestatus")) {// 3.2

										status = attributeValue;

									} // 3.2
									if (attributeName.equalsIgnoreCase("Fileid")) {// 3.2

										field = attributeValue;
									} // 3.2
								} // 3.1
								System.out.println("\n status." + status);
								System.out.println("\n field." + field);
								if (status.equals("0") || status.equals("1") || status.equals("2")
										|| status.equals("3")) {
									updtPst = conn.prepareStatement(updatrecqry1);
									System.out.println("SAM updatrecqry1=="+updatrecqry1);
									String myfield = tempfilename[2];
									myfield = myfield.substring(0, myfield.length() - 8);
									System.out.println("after filed Sharayu Mali ==" +myfield);
									updtPst.setString(1, status);
									updtPst.setString(2, status);
									updtPst.setString(3, myfield);
									System.out.println("SAM status=="+status+" myfield="+myfield);
									try {
										int ret = updtPst.executeUpdate();
										System.out.println("ret=="+ret);
										// updtPst.close();
										if (ret > 0)
											count++;
									//	System.out.println("Item updated Successful");
										System.out.println("count=="+count);
									} catch (SQLException e) {
										if (e.getMessage().contains("ORA-00001:")) {// 1
											System.out.println("\n\t Duplicate Record.");
										} //
									}
								}
							} // 3
							else if (elementString.equalsIgnoreCase("item")) {// 4
								// if(elementString.equalsIgnoreCase("item")) {
								Iterator iterator = element.getAttributes();
								while (iterator.hasNext()) {// 4.1
									while (iterator.hasNext()) {// 5.1
										Attribute attribute = (Attribute) iterator.next();
										QName name = attribute.getName();
										String attributeValue = attribute.getValue();
										String attributeName = name.toString();
										// System.out.println(attributeName+":"+
										// attributeValue);
										if (attributeName.equalsIgnoreCase("payeeaccno")) {// 5.2

											accountNo = attributeValue;
										} // 5.2
										else if (attributeName.equalsIgnoreCase("serialno")) {// 5.2

											chequeNo = attributeValue;
										} // 5.2
										else if (attributeName.equalsIgnoreCase("issuedate")) {// 5.2

											issueDt = attributeValue;
										} // 5.2
										else if (attributeName.equalsIgnoreCase("amount")) {// 5.2

											amount = attributeValue;
										} // 5.2
										else if (attributeName.equalsIgnoreCase("transcode")) {// 5.2

											tranCd = attributeValue;
										} // 5.2
										else if (attributeName.equalsIgnoreCase("draweebranchroutingno")) {// 5.2

											draweeBnkRoutCd = attributeValue;
										} // 5.2
										else if (attributeName.equalsIgnoreCase("payeename")) {// 5.2

											payeeNm = attributeValue;
										} // 5.2
										else if (attributeName.equalsIgnoreCase("rejectreason")) {// 5.2

											rejectreson = attributeValue;
										} // 5.2
									} // 5.1
								} // 4.1

								updtPst = conn.prepareStatement(updatrecqry2);
								updtPst.setString(1, rejectreson);
								updtPst.setString(2, field);
								updtPst.setString(3, accountNo);
								updtPst.setString(4, chequeNo);
								updtPst.setString(5, issueDt);
								updtPst.setString(6, amount);
								updtPst.setString(7, tranCd);
								// int ret=updtPst.executeUpdate();
								// updtPst.close();
								try {
									int ret = updtPst.executeUpdate();
									// updtPst.close();
									if (ret > 0)
										count++;
									// System.out.println("Item updated Successful");
								} catch (SQLException e) {
									if (e.getMessage().contains("ORA-00001:")) {// 1
										System.out.println("\n\t Duplicate Record.");
									} //
								}

							} // 4
						} // 2
						if (event.isEndElement()) {
							System.out.println("\n\t event.isEndElement");

						}
					} // 1
					System.out.println("\n\t count:" + count);
					if (count > 0)
						retval = "SUCCESS";
					System.out.println("\n\t retval:" + retval);

				} // try

				catch (Exception ex) {
					System.out.println("\n\t Exception in readPPSresponse():" + ex);
					ex.printStackTrace();
					retval = "FAIL";
				} finally {
					try {
						if (updtPst != null) {
							updtPst.close();
							// con.close();
						}
					} catch (Exception e) {
					}
				}

			}
			System.out.println("====retval" + retval);
			if (retval.equals("SUCCESS")) {

				updtPstnew = conn.prepareStatement(updatrecqry3);
				field = tempfilename[2];
				field = field.substring(0, field.length() - 8);
				updtPstnew.setString(1, field);
				int retnew = updtPstnew.executeUpdate();
				updtPstnew.close();
				System.out.println("====retnew" + retnew);

				/*
				 * if(retnew>0) { retval="SUCCESSUPDATE"; updtPstnew.close();
				 * 
				 * } else { retval="FAIL"; }
				 */
			}
			System.out.println("====retval222" + retval+" @@ filename=="+filename);
			
			if (retval.equalsIgnoreCase("SUCCESS")) {
				System.out.println("retval=="+retval);
				pst = conn.prepareStatement(selectqry);
				
				 if (filename.indexOf("xlsx") > -1 || filename.indexOf("xls") > -1) {
					 System.out.println("xlsx filename field =="+field_ID);
					 field= field_ID;
				 }
				 else if (filename.indexOf("CSV") > -1 || filename.indexOf("csv") > -1) {
						field = tempfilename[2];
						System.out.println(" CSV field=="+field);
				 }
				 else
				 {
					field = tempfilename[2];
					System.out.println("111field=="+field);
					field = field.substring(0, field.length() - 8);
					System.out.println("222field=="+field);
				 }
				 System.out.println("@@@@@@@@@@final  field =="+field);
				pst.setString(1, field);
				ResultSet rs1 = pst.executeQuery();
				System.out.println("selectqry=="+selectqry);
				while (rs1.next()) {
					JSONObject mainJsonObj1 = new JSONObject();
					mainJsonObj1.put("PIL_ACCNO", rs1.getString("PIL_ACCNO"));
					mainJsonObj1.put("PIL_CHQNO", rs1.getString("PIL_CHQNO"));
					mainJsonObj1.put("PIL_AMOUNT", rs1.getString("PIL_AMOUNT"));
					mainJsonObj1.put("PIL_PAYEENAME", rs1.getString("PIL_PAYEENAME"));
					mainJsonObj1.put("PIL_INSTRUMENT_DT", rs1.getString("PIL_INSTRUMENT_DT"));
					mainJsonObj1.put("PIL_ENTRYDATE", rs1.getString("PIL_ENTRYDATE"));
					mainJsonObj1.put("STATUS", rs1.getString("STATUS"));
					jsonArray.put(mainJsonObj1);
				}
				pst.close();
				rs1.close();
				if (conn != null) {
					conn.close();
				}
				System.out.println("jsonArray=="+jsonArray+" @@ jsonArray.length()="+jsonArray.length());
				if (jsonArray.length() > 0) {
					rtnObj.put("RETVAL", jsonArray);
					rtnObj.put("RESPCODE", "0");
				} else {
					rtnObj.put("RETVAL", "FAIL");
					rtnObj.put("RESPCODE", "1");

				}
			} else {
				System.out.println("--else--");
				if (conn != null) {
					conn.close();
				}
				rtnObj.put("RETVAL", "FAIL");
				rtnObj.put("RESPCODE", "1");
			}

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Debug@)Dao.createIssuanceFile()\n" + e.getClass() + "\t" + e.getMessage());
			try {
				conn.close();
				rtnObj.put("RESPCODE", "1");
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		} catch (JSONException e) {
			e.printStackTrace();
			try {
				conn.close();
				rtnObj.put("RESPCODE", "2");
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Debug@)Dao.fetchIssuanceRecord()\n" + e.getClass() + "\t" + e.getMessage());
			try {
				conn.close();
				rtnObj.put("RESPCODE", "1");
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}

		return rtnObj.toString();

	}

	public String sendIntimationRequest(JSONObject mainJsonObj) {
		String accountno = "", cheqno = "", instrumentdt = "", trancode = "", custid = "", payeenm = "", mobno = "",
				amount = "", ip = "";
		int tranid = 0;
		JSONObject retJson = new JSONObject();
		try {
			conn = Configuration.getConnection();
			CallableStatement cs = null;
			InetAddress IP = InetAddress.getLocalHost();

			accountno = mainJsonObj.getString("ACCOUNTNO");
			cheqno = mainJsonObj.getString("CHQNO");
			instrumentdt = mainJsonObj.getString("INSTRUMENTDT");
			trancode = mainJsonObj.getString("TRANCODE");
			custid = mainJsonObj.getString("CUSTID");
			payeenm = mainJsonObj.getString("PAYEENM");
			mobno = mainJsonObj.getString("MOBILENO");
			amount = mainJsonObj.getString("AMOUNT");
			ip = IP.getHostAddress();
			mobno = "+91" + mobno;
			String instrumentdate = instrumentdt.split("-")[0] + instrumentdt.split("-")[1]
					+ instrumentdt.split("-")[2];

			System.out.println(accountno + "==" + ip);
			String query = "select PPSCHQSEQ.nextval from dual";
			PreparedStatement pst = conn.prepareStatement(query);
			ResultSet rss = pst.executeQuery();
			if (rss.next()) {
				tranid = rss.getInt(1);
			}
			rss.close();
			pst.close();

			cs = conn.prepareCall("{call INSERT_CHEQUEINTIMATION(?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			cs.setInt(1, tranid);
			cs.setString(2, mobno);
			cs.setString(3, "Entered From Branch");
			cs.setString(4, ip);
			cs.setString(5, "");
			cs.setString(6, accountno);
			cs.setString(7, cheqno);
			cs.setString(8, amount);
			cs.setString(9, payeenm);
			cs.setString(10, instrumentdate);
			cs.setString(11, trancode);
			cs.setString(12, custid);
			cs.registerOutParameter(13, Types.NUMERIC);
			cs.execute();
			int status = cs.getInt(13);
			System.out.println("status====" + status);
			if (status < 8) {
				retJson.put("RESPCODE", status);
			} else {
				retJson.put("RESPCODE", "11");
			}
			conn.close();

		} catch (JSONException se) {
			// TODO Auto-generated catch block
			System.out.println("" + se);
			se.printStackTrace();
			try {
				retJson.put("RESPCODE", "22");
			} catch (JSONException je) {
				je.printStackTrace();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("" + e);
			e.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException je) {
				je.printStackTrace();
			}
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return retJson.toString();
	}

	public String getNotifications() {
		System.out.println("\n\t**********  Inside getNotifications  **********\n");
		int createpending = 0;
		int readpending = 0;
		PreparedStatement configPst = null;
		ResultSet configRs = null;
		JSONObject jsonObj = new JSONObject();
		try {
			conn = Configuration.getConnection();
			String query = "select count(*) from PPSINTIMATIONTRNR where (nvl(PIL_SENTTONPCI,'N')='N' and PIL_FILE_ID is null) or (nvl(PIL_SENTTONPCI,'N')='N' and PIL_FILE_ID is not null and PIL_FILE_STATUS in (1,2,3) and PIL_REC_STATUS in (1,2,3))";
			configPst = conn.prepareStatement(query);
			configRs = configPst.executeQuery();
			if (configRs.next()) {
				createpending = configRs.getInt(1);
			}
			String query1 = "select count(*) from PPSINTIMATIONTRNR where PIL_SENTTONPCI='Y' and PIL_FILE_STATUS is null and PIL_REC_STATUS is null and PIL_FILE_ID is not null";
			configPst = conn.prepareStatement(query1);
			configRs = configPst.executeQuery();
			if (configRs.next()) {
				readpending = configRs.getInt(1);
			}
			configRs.close();
			configPst.close();
			conn.close();
			jsonObj.put("RESPCODE", 0);
			jsonObj.put("PENDING_FORCREATE", createpending);
			jsonObj.put("PENDING_FORREAD", readpending);
		} catch (Exception e) {
			try {
				jsonObj.put("RESPCODE", 1);
			} catch (Exception innE) {
				innE.printStackTrace();
			}
		}
		return jsonObj.toString();

	}
//Read_PendingIssuanceResp
	public String Read_PendingIssuanceResp() {
		System.out.println("\n\t**********  Inside Read_PendingIssuanceResp  **********\n");
		
		PreparedStatement pst = null;		
		JSONObject rtnObj = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		 JSONArray jArr=new JSONArray();
		Connection conn = Configuration.getConnection();
		String selectqry="select PIL_ACCNO, PIL_CHQNO, (to_number(PIL_AMOUNT)/100) PIL_AMOUNT, PIL_PAYEENAME,"
				+ " to_char(to_date(PIL_INSTRUMENT_DT,'dd-mm-yyyy'),'dd-mm-yyyy')PIL_INSTRUMENT_DT,to_char(PIL_ENTRYDATE,'dd-mm-yyyy HH24:MI:SS AM')PIL_ENTRYDATE, "
				+ "(select PCSM_DESCR from PPSCHQSTATUSMSTR where PCSM_FILE_STATUS=PIL_FILE_STATUS  and PCSM_REC_STATUS=PIL_REC_STATUS) "
				+ "STATUS from PPSINTIMATIONTRNR where PIL_SENTTONPCI='Y' and PIL_FILE_STATUS is null and PIL_REC_STATUS is null and PIL_FILE_ID is not null";
		try 
		{
			pst = conn.prepareStatement(selectqry);		
		
		ResultSet rs1 = pst.executeQuery();
		System.out.println("selectqry=="+selectqry);
		while (rs1.next()) {
			JSONObject mainJsonObj1 = new JSONObject();
			mainJsonObj1.put("PIL_ACCNO", rs1.getString("PIL_ACCNO"));
			mainJsonObj1.put("PIL_CHQNO", rs1.getString("PIL_CHQNO"));
			mainJsonObj1.put("PIL_AMOUNT", rs1.getString("PIL_AMOUNT"));
			mainJsonObj1.put("PIL_PAYEENAME", rs1.getString("PIL_PAYEENAME"));
			mainJsonObj1.put("PIL_INSTRUMENT_DT", rs1.getString("PIL_INSTRUMENT_DT"));
			mainJsonObj1.put("PIL_ENTRYDATE", rs1.getString("PIL_ENTRYDATE"));
			mainJsonObj1.put("STATUS", rs1.getString("STATUS"));
			jsonArray.put(mainJsonObj1);
		}
		pst.close();
		rs1.close();
		
		String query1="select PCSM_FILE_STATUS ||'~'||PCSM_REC_STATUS,PCSM_FILE_STATUS ||'~'||PCSM_REC_STATUS||'  '|| PCSM_DESCR  from PPSCHQSTATUSMSTR order by 1";
	     PreparedStatement ps=conn.prepareStatement(query1);	  
	     ResultSet rs = ps.executeQuery();
	      while(rs.next())
	    	{
	    	  JSONObject jObj=new JSONObject();
	    		jObj.put("retcode", rs.getString(1));
	    		jObj.put("retdesc", rs.getString(2));
	    		jArr.put(jObj);
	    	}
	      	rs.close();
	      	ps.close();
		if (conn != null) {
			conn.close();
		}
		System.out.println("jsonArray=="+jsonArray+" @@ jsonArray.length()="+jsonArray.length());
		if (jsonArray.length() > 0) {
			rtnObj.put("RETVAL", jsonArray);
			rtnObj.put("RET_REASON", jArr);
			rtnObj.put("RESPCODE", "0");
		} else {
			rtnObj.put("RETVAL", "NODATA");
			rtnObj.put("RESPCODE", "1");
		}
		} catch (Exception e) {
			try {
				rtnObj.put("RESPCODE", -1);
			} catch (Exception innE) {
				innE.printStackTrace();
			}
		}
		return rtnObj.toString();

	}
	public String getCustDetails(JSONObject JsonObj) {
		String accountno = "", brncd = "", schemecd = "", retval = "";
		JSONObject retJson = new JSONObject();

		try {
			conn = Configuration.getConnection();
			brncd = JsonObj.getString("BRANCHCODE");
			schemecd = JsonObj.getString("SCHEMECODE");
			accountno = JsonObj.getString("ACCOUNTNO");

			String query = "select getAccountDetailsPPS_WRP(?,?,?) from dual";
			PreparedStatement pst = conn.prepareStatement(query);
			pst.setInt(1, Integer.parseInt(brncd));
			pst.setInt(2, Integer.parseInt(schemecd));
			pst.setInt(3, Integer.parseInt(accountno));

			ResultSet rss = pst.executeQuery();
			if (rss.next()) {
				retval = rss.getString(1);
			}
			rss.close();
			pst.close();
			System.out.println("retval====" + retval);
			if (retval.contains("SUCCESS")) {
				retJson.put("RETVAL", retval);
				retJson.put("RESPCODE", "0");
			} else {
				retJson.put("RESPCODE", "1");
			}
			conn.close();
		} catch (Exception e) {
			System.out.println("" + e);
			e.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException je) {
				je.printStackTrace();
			}
		}
		return retJson.toString();
	}

	public String FulfilBulkIntimations(ArrayList<PPSIntimation> itemlist) {
		JSONObject retJson = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		int tranid = 0;
		String ip = "";
		CallableStatement cs = null;

		try {
			System.out.println("**** itemlist.size() *******" + itemlist.size());
			conn = Configuration.getConnection();
			InetAddress IP = InetAddress.getLocalHost();
			ip = IP.getHostAddress();
			for (PPSIntimation item : itemlist) {
				JSONObject jsonObj = new JSONObject();
				System.out.println(item.getPIL_CHQNO() + "=" + item.getPIL_PAYEENAME() + "="
						+ item.getPIL_ISTRUMENT_DT() + "=" + item.getPIL_AMOUNT());
				System.out.println(item.getPIL_ACCNO() + "=" + item.getPIL_TRAN_CD() + "=" + item.getPIL_CUSTID() + "="
						+ item.getPIL_MOBNO());

				String instru_date = item.getPIL_ISTRUMENT_DT().split("/")[0] + item.getPIL_ISTRUMENT_DT().split("/")[1]
						+ item.getPIL_ISTRUMENT_DT().split("/")[2];
				String query = "select PPSCHQSEQ.nextval from dual";
				PreparedStatement pst = conn.prepareStatement(query);
				ResultSet rss = pst.executeQuery();
				if (rss.next()) {
					tranid = rss.getInt(1);
				}
				rss.close();
				pst.close();
				cs = conn.prepareCall("{call INSERT_CHEQUEINTIMATION(?,?,?,?,?,?,?,?,?,?,?,?,?)}");
				cs.setInt(1, tranid);
				cs.setString(2, "+91" + item.getPIL_MOBNO());
				cs.setString(3, "Entered From Branch");
				cs.setString(4, ip);
				cs.setString(5, "");
				cs.setString(6, item.getPIL_ACCNO());
				cs.setString(7, item.getPIL_CHQNO());
				cs.setString(8, item.getPIL_AMOUNT());
				cs.setString(9, item.getPIL_PAYEENAME());
				cs.setString(10, instru_date);
				cs.setString(11, item.getPIL_TRAN_CD());
				cs.setString(12, item.getPIL_CUSTID());
				cs.registerOutParameter(13, Types.NUMERIC);
				cs.executeUpdate();
				int status = cs.getInt(13);

				System.out.println("status==" + status);

				jsonObj.put("CHEQUE", item.getPIL_CHQNO());
				jsonObj.put("STATUS", status);

				jsonArray.put(jsonObj);

			}
			retJson.put("RETVAL", jsonArray);
			cs.close();
			conn.commit();
			conn.close();
		} catch (Exception e) {
			System.out.println("" + e);
			e.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException je) {
				je.printStackTrace();
			}
		}
		// System.out.println("retJson.toString()===="+retJson.toString());
		return retJson.toString();
	}
	public String fetchchequeData(String fromDt, String toDt,String trantype) {
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rst = null;
		JSONObject retJson = new JSONObject();
		JSONArray jArray = new JSONArray();
		String query="";
		try {
			con = Configuration.getConnection();
			int i = 0;//DDMMYYYY,SERIALNO,ACCOUNTNO,PAYEENAME,AMOUNT
			if(trantype.equalsIgnoreCase("CI"))
			{
				query = "select to_char(to_date(CLI_DDMMYYYY ,'ddmmyyyy') ,'dd/mm/yyyy') DDMMYYYY,CLI_SERIALNO SERIALNO,CLI_ACCOUNTNO ACCOUNTNO,(CLI_AMOUNT/100) AMOUNT ,CLI_PAYEENAME PAYEENAME,to_date(CLI_DDMMYYYY ,'ddmmyyyy') CLI_DDMMYYYY_DATE,CLI_IMAGEFILE3 from CLEARINGINWARD "
						+ "where to_date(CLI_DDMMYYYY,'dd/mm/yyyy') between to_date(?,'dd/mm/yyyy') and to_date(?,'dd/mm/yyyy') order by CLI_DDMMYYYY_DATE desc ";
			}
			else if(trantype.equalsIgnoreCase("CO"))
			{
				 query = "SELECT to_char(to_date(CLO_DATE_DDMMYYYY ,'ddmmyyyy') ,'dd/mm/yyyy') DDMMYYYY,CLO_CHQNO SERIALNO,  CLO_PAYEE_ACCNO ACCOUNTNO,(CLO_AMOUNT/100) AMOUNT, CLO_PAYEE_ACCNM PAYEENAME,to_date(CLO_DATE_DDMMYYYY ,'ddmmyyyy') CLO_DATE_DDMMYYYY_DATE,CLO_BRANCH_CD ,CLO_IMG_FRNT_GR  FROM CLEARINGOUTWARD"
				 		+ " where to_date(CLO_DATE_DDMMYYYY,'dd/mm/yyyy') between to_date( ?,'dd/mm/yyyy') and to_date(?,'dd/mm/yyyy') order by CLO_DATE_DDMMYYYY_DATE desc ";
			}
			else if(trantype.equalsIgnoreCase("RO"))
			{
				 query = "select to_char(to_date(RTO_DDMMYYYY ,'ddmmyyyy') ,'dd/mm/yyyy') DDMMYYYY,RTO_CHEQUENO SERIALNO, RTO_ACCOUNTNUMBER ACCOUNTNO,(RTO_AMOUNT/100) AMOUNT,(select RETDESCR from RETINWRETCODES where RETCODE=RTO_RETURNREASONCODE)PAYEENAME,to_date(RTO_DDMMYYYY ,'ddmmyyyy') RTO_DDMMYYYY_DATE from RETRUNOUTWARD"
				 		+ "  where  to_date(RTO_DDMMYYYY,'dd/mm/yyyy')  between to_date( ?,'dd/mm/yyyy') and to_date(?,'dd/mm/yyyy') order by RTO_DDMMYYYY_DATE desc ";
			}
			else
			{
				 query = "select to_char(to_date(RTI_DDMMYYYY ,'ddmmyyyy') ,'dd/mm/yyyy') DDMMYYYY,RTI_SERIALNO SERIALNO,RTI_ACCOUNTNO ACCOUNTNO ,(RTI_AMOUNT/100) AMOUNT,(select RETDESCR from RETINWRETCODES where RETCODE=RTI_RETURNREASON) PAYEENAME,to_date(RTI_DDMMYYYY ,'ddmmyyyy') RTI_DDMMYYYY_DATE from RETURNINWARD"
				 		+ " where to_date(RTI_DDMMYYYY,'dd/mm/yyyy') between to_date(?,'dd/mm/yyyy') and to_date(?,'dd/mm/yyyy') order by RTI_DDMMYYYY_DATE desc  ";
			}
			pst = con.prepareStatement(query);
			pst.setString(1, fromDt);
			pst.setString(2, toDt);
			System.out.println("query====" + query);
			rst = pst.executeQuery();
			while (rst.next()) {
				JSONObject obj = new JSONObject();				
				  i = i + 1;
				  // System.out.println("i=" + i);				  
				  obj.put("rownum", i);				
				//obj.put("rownum", rst.getString("rownum"));
				  System.out.println("trantype====" + trantype);
			if(trantype.equalsIgnoreCase("CI"))
			{
				obj.put("DDMMYYYY", rst.getString("DDMMYYYY"));
				obj.put("SERIALNO", rst.getString("SERIALNO"));
				obj.put("ACCOUNTNO", rst.getString("ACCOUNTNO"));
				obj.put("AMOUNT", rst.getInt("AMOUNT"));
				obj.put("PAYEENAME", rst.getString("PAYEENAME"));
				obj.put("IMAGEFILE3", rst.getString("CLI_IMAGEFILE3"));
			}
			else if(trantype.equalsIgnoreCase("CO"))
			{
				//CLO_CHQNO, CLO_DATE_DDMMYYYY, CLO_PAYEE_ACCNO, CLO_PAYEE_ACCNM,(CLO_AMOUNT/100)
				obj.put("DDMMYYYY", rst.getString("DDMMYYYY"));
				obj.put("SERIALNO", rst.getString("SERIALNO"));
				obj.put("ACCOUNTNO", rst.getString("ACCOUNTNO"));
				obj.put("AMOUNT", rst.getInt("AMOUNT"));
				obj.put("PAYEENAME", rst.getString("PAYEENAME"));//CLO_BRANCH_CD ,CLO_IMG_FRNT_GR
				obj.put("BRANCHCD", rst.getInt("CLO_BRANCH_CD"));
				obj.put("IMGNAME", rst.getString("CLO_IMG_FRNT_GR")); 
			}
			else if(trantype.equalsIgnoreCase("RO"))
			{
				// RTO_CHEQUENO,RTO_DDMMYYYY, RTO_ACCOUNTNUMBER, ''CLI_PAYEENAME  , (RTO_AMOUNT/100
				obj.put("DDMMYYYY", rst.getString("DDMMYYYY"));
				obj.put("SERIALNO", rst.getString("SERIALNO"));
				obj.put("ACCOUNTNO", rst.getString("ACCOUNTNO"));
				obj.put("AMOUNT", rst.getInt("AMOUNT"));
				obj.put("PAYEENAME", rst.getString("PAYEENAME"));
			}
			else 
			{
			//	RTI_SERIALNO,RTI_DDMMYYYY,RTI_ACCOUNTNO,''CLI_PAYEENAME,(RTI_AMOUNT
				obj.put("DDMMYYYY", rst.getString("DDMMYYYY"));
				obj.put("SERIALNO", rst.getString("SERIALNO"));
				obj.put("ACCOUNTNO", rst.getString("ACCOUNTNO"));
				obj.put("AMOUNT", rst.getInt("AMOUNT"));
				obj.put("PAYEENAME", rst.getString("PAYEENAME"));
			}
				jArray.put(obj);
			}
			rst.close();
			pst.close();
			con.close();
			if (jArray.length() > 0) {
				retJson.put("RESPCODE", "0");
				retJson.put("RETVAL", jArray);
			} else {
				retJson.put("RESPCODE","1");
			}
		} catch (SQLException se) {
			System.out.println("" + se);
			se.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException je) {
				je.printStackTrace();
			}
		} catch (JSONException je) {
			System.out.println("In json====" + je);
			je.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException jee) {
				jee.printStackTrace();
			}
		} catch (Exception e) {
			System.out.println("Exception===" + e);
			e.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException jee) {
				jee.printStackTrace();
			}
		}
		return retJson.toString();
	}
//fetchcheque_paperToFollow
	public String fetchcheque_paperToFollow(String  brnchcd) {
		Connection con = null;
		PreparedStatement pst = null; pst1 = null;
		ResultSet rst = null,rst1 = null;
		JSONObject retJson = new JSONObject();
		JSONArray jArray = new JSONArray();
		String query="";
		String clo_dt="";
		try {
			con = Configuration.getConnection();
			int i = 0;			
			String query1="select to_char(sysdate,'ddmmyyyy') dt from dual";
			pst1 = con.prepareStatement(query1);
			rst1 = pst1.executeQuery();
			if (rst1.next()) {
			 clo_dt=rst1.getString("dt");
				//System.out.println("clo_dt==%%%==" +clo_dt);
			}
			query="SELECT to_char(to_date(CLO_DATE_DDMMYYYY ,'ddmmyyyy') ,'ddmmyyyy') DDMMYYYY,CLO_CHQNO SERIALNO,  CLO_PAYEE_ACCNO ACCOUNTNO, "
					+ "(CLO_AMOUNT/100) AMOUNT, CLO_PAYEE_ACCNM PAYEENAME,to_date(CLO_DATE_DDMMYYYY ,'ddmmyyyy') CLO_DATE_DDMMYYYY_DATE,CLO_BRANCH_CD ,CLO_IMG_FRNT_GR  FROM CLEARINGOUTWARD "
					+ "where  CLO_CONVERT_FLG='Y'  and CLO_PPRTOFOLLOW <> 'Y'  and   CLO_DATE_DDMMYYYY=?  order by CLO_DATE_DDMMYYYY_DATE desc ";
			pst = con.prepareStatement(query);
			pst.setString(1,clo_dt);
			//pst.setString(2, brnchcd);			
			rst = pst.executeQuery();
			while (rst.next())
			{
				JSONObject obj = new JSONObject();				
				i = i + 1; 
				obj.put("rownum", i);					
				obj.put("DDMMYYYY", rst.getString("DDMMYYYY"));
				obj.put("SERIALNO", rst.getString("SERIALNO"));
				obj.put("ACCOUNTNO", rst.getString("ACCOUNTNO"));
				obj.put("AMOUNT", rst.getInt("AMOUNT"));
				obj.put("PAYEENAME", rst.getString("PAYEENAME"));//CLO_BRANCH_CD ,CLO_IMG_FRNT_GR
				obj.put("BRANCHCD", rst.getInt("CLO_BRANCH_CD"));
				obj.put("IMGNAME", rst.getString("CLO_IMG_FRNT_GR")); 						
				jArray.put(obj);
			}
			rst.close();
			pst.close();
			con.close();
			if (jArray.length() > 0) 
			{
				retJson.put("RESPCODE", "0");
				retJson.put("RETVAL", jArray);
			}
			else {
				retJson.put("RESPCODE","1");
			}
		} catch (SQLException se) {
			System.out.println("" + se);
			se.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException je) {
				je.printStackTrace();
			}
		} catch (JSONException je) {
			je.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException jee) {
				jee.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException jee) {
				jee.printStackTrace();
			}
		}
		return retJson.toString();
	}
//update_paperToFollow
	public String update_paperToFollow(String  jsonString) {
		Connection con = null;
		PreparedStatement pst = null;
		int rst = 0;
		JSONObject retJson = new JSONObject();
		String query="";
		String serialNo = null,accNo = null,brncd = null,imgNm = null,clodate=null;
		String retVal="";
		try {			
			con = Configuration.getConnection();
			int i = 0;
			JSONArray ja = new JSONArray(jsonString);
			int recCnt = ja.length();
			for (int j = 0;j < recCnt;j++) 
			{
				JSONObject jsonObj = ja.getJSONObject(j);
				if(jsonObj.has("SERIALNO"))
				{	
					serialNo=jsonObj.getString("SERIALNO");
				}
				if(jsonObj.has("ACCOUNTNO"))
				{
					accNo=jsonObj.getString("ACCOUNTNO");
				}
				if(jsonObj.has("BRANCHCD"))
				{
					brncd=jsonObj.getString("BRANCHCD");
				}
				if(jsonObj.has("CLODATE"))
				{
					clodate=jsonObj.getString("CLODATE");
				}
				
			query="update CLEARINGOUTWARD set CLO_PPRTOFOLLOW='Y' where CLO_CHQNO=? and  CLO_PAYEE_ACCNO=? and  "
					+ " CLO_BRANCH_CD=? and  CLO_DATE_DDMMYYYY= ? ";
			pst = con.prepareStatement(query);
			pst.setString(1, serialNo);
			pst.setString(2, accNo);
			pst.setString(3, brncd);
			pst.setString(4,clodate);
			rst = pst.executeUpdate();
			System.out.println("rst Count===" + rst);
			}
			if (rst > 0){
				//retJson.put("RESPCODE", "0");
				retVal="SUCCESS";
			}			
			else {
				//retJson.put("RESPCODE","1");
				retVal="FAIL";
			}
			pst.close();
			con.close();
			
		} catch (SQLException se) {
			System.out.println("" + se);
			se.printStackTrace();
			
		} catch (JSONException je) {
			System.out.println("In json====" + je);
			je.printStackTrace();
		
		} catch (Exception e) {
			System.out.println("Exception===" + e);
			e.printStackTrace();
			try {
				//retJson.put("RESPCODE", "2");
				retVal="FAIL";
			} catch (Exception jee) {
				jee.printStackTrace();
			}
		}
		return retVal;
	}
	//paperToFollow_BranchAllowed(brchcd);	
	public String paperToFollow_BranchAllowed(String  brnchcd) {
		Connection con = null;
		PreparedStatement pst = null; 
		ResultSet rst = null;
		JSONObject retJson = new JSONObject();
		String query="";
		String brnch_flag="";
		try {
			con = Configuration.getConnection();
			int i = 0;	
			query="SELECT BRM_CTSMAINBRN FROM BRANCHMSTR WHERE BRM_BRNCD=?";
			pst = con.prepareStatement(query);
			pst.setString(1,brnchcd);	
			rst = pst.executeQuery();
			while (rst.next())
			{
			   brnch_flag= rst.getString("BRM_CTSMAINBRN");
			   System.out.println("brnch_flag===" +brnch_flag);
			}
			rst.close();
			pst.close();
			con.close();
			if (brnch_flag.length() > 0) 
			{
				retJson.put("RESPCODE", "0");
				retJson.put("RETVAL", brnch_flag);
			}
			else {
				retJson.put("RESPCODE","1");
			}
		} catch (SQLException se) {
			System.out.println("" + se);
			se.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException je) {
				je.printStackTrace();
			}
		} catch (JSONException je) {
			je.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException jee) {
				jee.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
			try {
				retJson.put("RESPCODE", "2");
			} catch (JSONException jee) {
				jee.printStackTrace();
			}
		}
		return retJson.toString();
	}
}
