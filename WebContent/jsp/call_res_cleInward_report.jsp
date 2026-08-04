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
<%@page import="java.io.*"%>
<%@page import="net.sf.jasperreports.engine.*"%> 
<%@page import="net.sf.jasperreports.engine.export.*"%>
<%@page import="net.sf.jasperreports.j2ee.servlets.*"%>
<%@page import="net.sf.jasperreports.engine.util.*"%>
<%@page import="net.sf.jasperreports.engine.JRException.*"%>
<%@page import="net.sf.jasperreports.view.JasperViewer" %>
<%@page import="org.apache.commons.digester.*" %>
<%@page import="org.apache.commons.collections.*" %>


	<%
		String fileName = null, oldFilename = "dummy";
		String msg = null;
		String singleRecord = "",dateimg="";
		String itemSeqNo ="", payorBankRoutNo = "", amount = "", serialNo = "",returncomments="", transCode = "", presentingBankRoutNo = "", presentmentDate = "", cycleNo = "", rejectReason = "",todaysdt="";
		String udk_str="",returnReason="",clearingType="",rti_olbc="",returnReasoncom="",udk_PresentmentDate="",udk_CycleNo="",udk_ItemSeqNo="",rti_olbc1="",brn_cd="",udkRTI_PAYORBANKROUTNO="",reportName="";
		String SelfileName = request.getParameter("jsonString");
		System.out.println("===== start call_res_ReturnInword_report---SelfileName ====="+ SelfileName);
		JSONArray jsonarr = new JSONArray(SelfileName);
		int fileCount;
		String filePath;
		System.out.println("===== start call_res_ReturnInword_report =====");
		Connection con = Configuration.getConnection();
		PreparedStatement ps = null;
		Map par= new HashMap();	
		String reportPath=getServletContext().getRealPath("/");
		System.out.println("\n\tApplication Context Path:"+reportPath);
		reportPath+="/REPORT/returnInward/";
		String reportoutPath=getServletContext().getRealPath("/");
		System.out.println("\n\tApplication reportoutPath:"+reportoutPath);
		reportoutPath+="/MemoReports/";
	String img_pathsrc="";
		String to_day=(new  java.util.Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");
		
		//String fileName=request.getParameter("fileName");
		// get an ftpClient object
		// FTPClient ftpClient = new FTPClient();
		//FileOutputStream fos = null;
		JSONArray jsonArr=new JSONArray();
		JSONObject MainjObj = new JSONObject();

		try {//1
			String CHI_Bank_Name = Configuration.getConfValByNm(
					"CFG_CHI_BANKNAME", con);
			System.out.println("******* CHI_Bank_Name ********"
					+ CHI_Bank_Name);
			todaysdt=Configuration.getDDMMYYYY();
			filePath =request.getRealPath("/");
					
					// Configuration.getConfValByNm(
					//"CFG_downloadpath_from_CHI", con) + "/ReturnInward/";
			//new File(filePath).mkdirs();

			int counter = 1;

			//File serverDir=new File(filePath);
			String fname = "";
			String fnameQuery = "";
		

			for (int i = 0; i < jsonarr.length(); i++) {
				JSONObject jsonObj1 = jsonarr.getJSONObject(i);
				fname = jsonObj1.getString("FILE_NAME");
				System.out.println("fname=="+fname);
				if (fnameQuery.length() == 0) {
					fnameQuery = "'" + fname + "'";
				} else {
					fnameQuery = fnameQuery + "," + "'" + fname + "'";
				}

				
	

			}//1	

			System.out.println("fname" + fnameQuery);
			ResultSet rs_brn;
			Statement st;
			st=con.createStatement();
			rs_brn=st.executeQuery("select CFG_BANKNAME,CFG_UPLOADPATH_TO_CHI from CONFIGURATION");
			String bankName="",img_path="";
			while(rs_brn.next())
			{
				bankName=rs_brn.getString(1);
				img_path=rs_brn.getString(2);
			}
			
			System.out.println("img_path " + img_path);
			String query = "select RTI_PRESENTINGBANKROUTNO ,RTI_RETURNREASONCOMMENT,RTI_SERIALNO,RTI_TRANSCODE,RTI_RETURNREASON,RTI_RETURNREASONCOMMENT,RTI_AMOUNT,RTI_PRESENTMENTDATE, "
					+" RTI_PAYORBANKROUTNO,RTI_CLEARINGTYPE,RTI_CYCLENO,RTI_ITEMSEQNO,RTI_DDMMYYYY,CLO_OLBC,CLO_BRANCH_CD,CLO_DATE_DDMMYYYY,c.RETDESCR "
					+" from RETURNINWARD join CLEARINGOUTWARD on  RTI_ITEMSEQNO=CLO_ITEMSEQNO and RTI_PRESENTMENTDATE=CLO_DATE_DDMMYYYY  join RETINWRETCODES c on c.RETCODE= RTI_RETURNREASON " 
					+ " where RTI_FILENAME in(" + fnameQuery + ")";
			System.out.println("query " + query);
			
			
			ps = con.prepareStatement(query);
			
			//fnameQuery=fnameQuery.substring(1, fnameQuery.length()-1);  //jhfgsdgds','dsgsd
		
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
				to_day=rs.getString("RTI_DDMMYYYY");
				rti_olbc=rs.getString("CLO_OLBC");
				brn_cd=rs.getString("CLO_BRANCH_CD");
				dateimg=rs.getString("CLO_DATE_DDMMYYYY");
				returncomments=rs.getString("RETDESCR");
				
				//rti_olbc1=rs.getString("RTI_OLBC");
			 // img_pathsrc=img_path+dateimg+"/uploadpath_to_CHI/"+brn_cd+"/ClearingOutward/Images/" ;
				 img_pathsrc=img_path+"/"+brn_cd+"/ClearingOutward/Images/" ;
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
						+ clearingType + rti_olbc ;
	        	
	        	reportName=udk_PresentmentDate+"_"+serialNo+"_"+udkRTI_PAYORBANKROUTNO+"_"+udk_ItemSeqNo+".pdf";
	        	
	        	String input_file=reportPath+"outward_return_memo.jrxml";			//report name new
				System.out.println("\n\t -----input_file ----"+input_file);
	        	
	        	String output_file=reportoutPath+to_day+"/"+reportName;
				System.out.println("\n\t -----output_file ----"+output_file);	
				File f=new File(reportoutPath+to_day);
				f.mkdirs();
				String patshow="MemoReports/"+to_day+"/"+reportName;
				JSONObject jsonObj = new JSONObject();
				
				jsonObj.put("SRNO",counter);
				jsonObj.put("CHEQUENO",serialNo);
				jsonObj.put("SORTCODE",udkRTI_PAYORBANKROUTNO);
				jsonObj.put("AMOUNT",amount);
				jsonObj.put("RETURNRESGN",returnReason+"-"+returncomments);
				jsonObj.put("ITEMSEQNO",udk_ItemSeqNo);
				jsonObj.put("PATH",patshow);
				jsonArr.put(jsonObj);
				counter++;
	        	 {
	        		
	        		{//2
						//for particular branch
							//par.put("dateString",to_day);
							par.put("bankname",bankName);
							par.put("chqueno",serialNo);
							//par.put("filename",fnameQuery);
							par.put("rtidate",to_day);
							par.put("clodate",dateimg);
							par.put("rtiseqno",udk_ItemSeqNo);
							par.put("imagepath",img_pathsrc);
							par.put("todaysdt",todaysdt);
							
							System.out.println("\n\t ----- bankName ----"+bankName);
							System.out.println("\n\t ----- serialNo ----"+serialNo);
							System.out.println("\n\t ----- fnameQuery ----"+fnameQuery);
							System.out.println("\n\t ----- img_pathsrc ----"+img_pathsrc);
							System.out.println("\n\t ----- todaysdt ----"+todaysdt);
						
							System.out.println("\n\t ----- 1 ----");
									//report name new
							System.out.println("\n\t -----input_file ----"+input_file);
							//reportName="MemoReports_"+to_day+".pdf";
							System.out.println("\n\t -----reportName ----"+reportName);			
							//String output_file=reportoutPath+to_day+"/"+reportName;
							System.out.println("\n\t -----output_file ----"+output_file);		
							JasperReport jr = JasperCompileManager.compileReport(input_file);
										System.out.println("\n\t 2222 ");
							JasperPrint jp = JasperFillManager.fillReport(jr,par,con);
										System.out.println("\n\t 3333 ");
							JRPdfExporter e1= new  JRPdfExporter();
										System.out.println("\n\t 4444 ");
							e1.setParameter(JRExporterParameter.JASPER_PRINT, jp);
										System.out.println("\n\t 5555 ");
							e1.setParameter(JRExporterParameter.OUTPUT_FILE,(new File(output_file)));
										System.out.println("\n\t 6666 ");
							e1.exportReport(); 
							//JasperExportManager.exportReportToPdfFile(jp, output_file );
							System.out.println("\n\t 7777 ");
	        	}
	        	} 
	        	// img_path="";
	        	
	        	/* 
				String return_inwardPath1 = Configuration.getConfValByNm(
						"CFG_DOWNLOADPATH_FROM_CHI", con) + "/ReturnInward/";
				String textFileName1 = "To_CBS_Return_Inward_"+brn_cd+".txt";
				FileWriter fstream1 = new FileWriter(return_inwardPath1 + "/"
						+ textFileName1,true);
				PrintWriter out2 = new PrintWriter(fstream1);
				out2.println(singleRecord);
				out2.close(); */
			}
			if(counter>0)
			{
				
				MainjObj.put("data",jsonArr);
				MainjObj.put("RETCODE","0");
			}
			else
			{
				MainjObj.put("RETCODE","1");
			}
			msg="Memo Reports created succefully";
			System.out.println("===== end call_res_ReturnInword_report =====" );
			rs.close();
			//CLO_BRANCH_CD
        	ps.close();
        	

		} catch (Exception e) {//2
			System.out.println("***********************************");
			e.printStackTrace();
			msg = "Problem occurred while creating Memo Reports!";
		}//2		 
		System.out.println("===== end call_res_ReturnInword_report =====" + msg);
		//response.sendRedirect("../cleInward_resFile.jsp?msg=" + msg);
	%>
	
	<%=MainjObj.toString()%>