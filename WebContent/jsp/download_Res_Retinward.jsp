<%@ page
	import="java.io.*,java.util.*, jakarta.servlet.*,java.sql.*,org.json.*,javax.xml.*"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="org.apache.commons.net.ftp.*"%>
<%@ page import="java.net.SocketException"%>
<%@ page import="java.util.*"%>
<%@ page import="cts.*"%>
<%@page import="java.sql.*"%>

	<%
		String fileName = null, oldFilename = "dummy";
		String msgstr = null;
		String singleRecord = "";
		String itemSeqNo ="", payorBankRoutNo = "", amount = "", serialNo = "", transCode = "", presentingBankRoutNo = "", presentmentDate = "", cycleNo = "", rejectReason = "";
		String udk_str="",returnReason="",clearingType="",rti_olbc="",returnReasoncom="",udk_PresentmentDate="",udk_CycleNo="",udk_ItemSeqNo="",rti_olbc1="",brn_cd="",reportName="",udkRTI_PAYORBANKROUTNO="";
		String SelfileName = request.getParameter("jsonString");
		System.out.println("===== start downloadReturnInword---SelfileName ====="+ SelfileName);
		JSONArray jsonarr = new JSONArray(SelfileName);
		int fileCount;
		String filePath;
		System.out.println("===== start downloadReturnInword =====");
		Connection con = Configuration.getConnection();
		PreparedStatement ps = null;
		String ENCRY_DECRYPT_FLG=Configuration.getConfValByNm("CFG_ENCRY_DECRYPT_FLG", con);
		PreparedStatement ps_values = null;		
		ResultSet rs1=null;
		//String fileName=request.getParameter("fileName");
		// get an ftpClient object
		// FTPClient ftpClient = new FTPClient();
		//FileOutputStream fos = null;

		try {//1
			String CHI_Bank_Name = Configuration.getConfValByNm(
					"CFG_CHI_BANKNAME", con);
			System.out.println("******* CHI_Bank_Name ********"
					+ CHI_Bank_Name);
			filePath = Configuration.getConfValByNm(
					"CFG_downloadpath_from_CHI", con) + "/ReturnInward/";
			//new File(filePath).mkdirs();

			int counter = 0;
			int countersrno = 1;
			//File serverDir=new File(filePath);
			String fname = "";
			String fnameQuery = "";
			String return_inwardPath = Configuration.getConfValByNm(
					"CFG_DOWNLOADPATH_FROM_CHI", con) + "/ReturnInward/";
			String textFileName = "To_CBS_Return_Inward.txt";
			FileWriter fstream = new FileWriter(return_inwardPath + "/"
					+ textFileName);
			PrintWriter out1 = new PrintWriter(fstream);
			out1.close();

			for (int i = 0; i < jsonarr.length(); i++) {
				JSONObject jsonObj1 = jsonarr.getJSONObject(i);
				fname = jsonObj1.getString("FILE_NAME");
				System.out.println("fname=="+fname);
				if (fnameQuery.length() == 0) {
					fnameQuery = "'" + fname + "'";
				} else {
					fnameQuery = fnameQuery + "," + "'" + fname + "'";
				}

				if (CHI_Bank_Name.equals("NPCI")
						|| CHI_Bank_Name.equals("AXIS")
						|| CHI_Bank_Name.equals("IDBI")||CHI_Bank_Name.equals("HDFC")||CHI_Bank_Name.equals("KOTAK")) {
					if (new XMLReader().readBRF(filePath, fname)) {//5
																	//msg="SUCESS";
						msgstr = "File(s) Successfully Downloaded!";
						//move the downloaded file from donload path	
					}//5	
					else {
						//msg="FAIL#";
						msgstr = "Failed To Download!";
					}
					if (CHI_Bank_Name.equals("AXIS")) {
						new XMLReader().createRwExtract(filePath);

					}
				} 
		/* 		else if (CHI_Bank_Name.equals("HDFC")) {
					if (new XMLReader().readRetInwXls_hdfc(filePath, fname)) {//5
																				//msg="SUCESS";
						msg = "File(s) Successfully Downloaded!";
						//move the downloaded file from donload path	
					}//5	
					else {
						//msg="FAIL#";
						msg = "Failed To Download!";
					}
				} */

			}//1	

			System.out.println("fname" + fnameQuery);
			String cnti_cylno;
			String query = "select * from RETURNINWARD join CLEARINGOUTWARD on RTI_PRESENTMENTDATE=CLO_DATE_DDMMYYYY and RTI_ITEMSEQNO=CLO_ITEMSEQNO"
					+ " where RTI_FILENAME in(" + fnameQuery + ")";
			System.out.println("query " + query);
			ps = con.prepareStatement(query);

			ResultSet rs = ps.executeQuery();
			while(rs.next())
			{
				presentingBankRoutNo=rs.getString("RTI_PRESENTINGBANKROUTNO");
				returnReasoncom=rs.getString("RTI_RETURNREASONCOMMENT");
				serialNo=rs.getString("RTI_SERIALNO");
				transCode=rs.getString("RTI_TRANSCODE");
				returnReason=rs.getString("RTI_RETURNREASON");
				amount=rs.getString("RTI_AMOUNT");
				udk_PresentmentDate=rs.getString("RTI_PRESENTMENTDATE");
				udkRTI_PAYORBANKROUTNO=rs.getString("RTI_PAYORBANKROUTNO");
				clearingType=rs.getString("RTI_CLEARINGTYPE");
				udk_CycleNo=rs.getString("RTI_CYCLENO");
				udk_ItemSeqNo=rs.getString("RTI_ITEMSEQNO");
				rti_olbc=rs.getString("CLO_OLBC");
				brn_cd=rs.getString("CLO_BRANCH_CD");
				cnti_cylno=rs.getString("CLO_CYCLNO");
				//rti_olbc1=rs.getString("RTI_OLBC");
				
				
				presentingBankRoutNo=Configuration.lPad(presentingBankRoutNo, 9, "0");
	        	serialNo=Configuration.lPad(serialNo, 6, "0");
	        	udk_PresentmentDate = Configuration.lPad(udk_PresentmentDate, 8, "0");
	        	udk_CycleNo= Configuration.lPad(udk_CycleNo,2, "0");
	        	udk_ItemSeqNo = Configuration.lPad(udk_ItemSeqNo, 14, "0");
	        	returnReason=Configuration.lPad(returnReason,2, "0");
	        	clearingType = Configuration.lPad(clearingType, 2, "0");
	        	
	        	udk_str= udk_PresentmentDate + presentingBankRoutNo
	        			+ udk_CycleNo + udk_ItemSeqNo;
	        	udk_str = Configuration.rPad(udk_str, 80, " ");
	        	singleRecord = presentingBankRoutNo + serialNo
						+ udk_str + "I" + returnReason + "00000000FIN"
						+ clearingType + rti_olbc +cnti_cylno ;
			        	System.out.println("===== SAM @@@ cnti_cylno =====" + cnti_cylno);
				String return_inwardPath1 = Configuration.getConfValByNm(
						"CFG_DOWNLOADPATH_FROM_CHI", con) + "/ReturnInward/";
				String textFileName1 = "To_CBS_Return_Inward_"+brn_cd+".txt";
				FileWriter fstream1 = new FileWriter(return_inwardPath1 + "/"
						+ textFileName1,true);				
				
				PrintWriter out2 = new PrintWriter(fstream1);				
				System.out.println("===== SAM @@@ end singleRecord =====" + singleRecord);

				System.out.print("\n @@@@ENCRY_DECRYPT_FLG="+ENCRY_DECRYPT_FLG);
				if(ENCRY_DECRYPT_FLG.equalsIgnoreCase("Y"))
				{
					System.out.print("\n Inside if of encrpt decrypt ");
					ps_values = con.prepareStatement("select hocust.ENCRYPT_STRING('"+singleRecord+"') from dual");
					rs1 = ps_values.executeQuery();
					if (rs1.next())
					{
						singleRecord = rs1.getString(1);
						out2.println(singleRecord);
						System.out.print("\n after rs.getString(1)="+rs1.getString(1));
					}
					System.out.print("\n after readLine="+singleRecord);
				}
				else			
				{
					out2.println(singleRecord);
				}
				out2.close();
				
			
			}
			
			rs.close();
			//CLO_BRANCH_CD
        	ps.close();
        	

		} catch (Exception e) {//2
			System.out.println("***********************************");
			e.printStackTrace();
			msgstr = "Failed To Download!";
		}//2		 
		System.out.println("===== end downloadReturnInword =====" + msgstr);
		//response.sendRedirect("../cleInward_resFile.jsp?msg=" + msg);
	%>

	<%=msgstr%>