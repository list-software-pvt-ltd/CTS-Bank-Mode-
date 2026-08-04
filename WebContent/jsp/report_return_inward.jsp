<%@page import="net.sf.jasperreports.engine.xml.JRXmlLoader"%>
<%@page import="net.sf.jasperreports.engine.design.JasperDesign"%>
<%@page import="net.sf.jasperreports.engine.design.JRDesignQuery"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page  import="org.apache.commons.net.ftp.*"%>
<%@ page  import="java.net.SocketException"%>
<%@ page  import="java.util.*"%>
<%@ page import="cts.*" %>
<%@ page  import="java.sql.*"%>
<%@page import="java.io.*"%>
<%@page import="net.sf.jasperreports.engine.*"%> 
<%@page import="net.sf.jasperreports.engine.export.*"%>
<%@page import="net.sf.jasperreports.j2ee.servlets.*"%>
<%@page import="net.sf.jasperreports.engine.util.*"%>
<%@page import="net.sf.jasperreports.engine.JRException.*"%>
<%@page import="net.sf.jasperreports.view.JasperViewer" %>
<%@page import="org.apache.commons.digester.*" %>
<%@page import="org.apache.commons.collections.*" %>
<%@page import="java.text.SimpleDateFormat" %>
<%@page import="java.util.Date" %>
<%!
	String dateString;
	String branch_code,opt_ctsNonCTS_code,ctstoken="",flag="";
	Connection con;
	String reportName;
	String exportToExcel;
	PreparedStatement ps;
	ResultSet all_branches;
	Statement st;
	ResultSet rs_brn;
	String pattern = "dd/MM/yy";
    SimpleDateFormat format = new SimpleDateFormat(pattern);
    // formatting
    String to_day=format.format(new Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");//(new  java.util.Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");
	
%>

<%!
	
	
	
	public void reportAll(String branch_code,String reportPath,String exportToExcel,String simpleDate,Map par,String rptCode)
	{//reportCTSAndNonCTS
		System.out.println("\n\t *********** inside reportCTSAndNonCTS *************");
			System.out.println("\n\t branch_code:"+branch_code);
			System.out.println("\n\t reportPath:"+reportPath);
			System.out.println("\n\t exportToExcel:"+exportToExcel);
			System.out.println("\n\t simpleDate:"+simpleDate);
			System.out.println("\n\t par:"+par);
			System.out.println("\n\t rptCode:"+rptCode);
		System.out.println("\n\t *********** inside reportCTSAndNonCTS *************");								
		try
		{//try
					String sql="";
					
			//if(!(branch_code.equals("All")))
			{		
				sql="SELECT count(*) FROM RETURNINWARD R,CLEARINGOUTWARD C,BRANCHMSTR B";
				sql+=" WHERE R.RTI_PRESENTMENTDATE in (select distinct RTI_PRESENTMENTDATE from RETURNINWARD  where rti_ddmmyyyy='"+simpleDate+"') and R.rti_ddmmyyyy='"+simpleDate+"' AND C.CLO_CHQNO=R.RTI_SERIALNO";
				sql+=" AND C.CLO_SORTCD=R.RTI_PAYORBANKROUTNO AND B.BRM_BRNCD=decode('"+branch_code+"','-1',B.BRM_BRNCD,'"+branch_code+"')";
				sql+=" AND R.RTI_CLEARINGTYPE=decode('"+rptCode+"','0',R.RTI_CLEARINGTYPE,'"+rptCode+"')";
					System.out.println("\n\tSQL Query:"+sql);			
			}
			/*else
			{
				sql="SELECT count(*) FROM RETURNINWARD R,CLEARINGOUTWARD C,BRANCHMSTR B";
				sql+=" WHERE R.RTI_DDMMYYYY='"+simpleDate+"' AND C.CLO_CHQNO=R.RTI_SERIALNO";
				sql+=" AND C.CLO_SORTCD=R.RTI_PAYORBANKROUTNO";
				sql+=" AND R.RTI_CLEARINGTYPE='"+rptCode+"'";
					System.out.println("\n\tSQL Query:"+sql);	
			}*/
		Statement stmt=con.createStatement();
		ResultSet rs_count=stmt.executeQuery(sql);
		int count=0;
		while(rs_count.next())
		{
			count=rs_count.getInt(1);
		}
		System.out.println("\n\tRecord Count:::>>"+count);
		rs_count.close();
		stmt.close();
		st=con.createStatement();
				rs_brn=st.executeQuery("select CFG_BANKNAME from CONFIGURATION");
				String bankName="";
				while(rs_brn.next())
				{
					bankName=rs_brn.getString(1);
				}
		if(count>0)
		{//count	
		
			//if(!branch_code.equalsIgnoreCase("All"))
			{//2
			//for particular branch
				String vendor=  Configuration.getConfValByNm("CFG_CBS_VENDOR", con);
				String query="";
				if(vendor.equalsIgnoreCase("KORAS"))
				{	
					query="SELECT"
						    +" RTI_ITEMSEQNO AS RETURNINWARD_RTI_ITEMSEQNO,"
						    +" RTI_SERIALNO AS RETURNINWARD_RTI_SERIALNO,"
						    +" RTI_TRANSCODE AS RETURNINWARD_RTI_TRANSCODE,"
						    +" RTI_AMOUNT AS RETURNINWARD_RTI_AMOUNT,"
						    +" RTI_ACCOUNTNO AS RETURNINWARD_RTI_ACCOUNTNO,"
						    +" RETDESCR AS RETURNINWARD_RTI_RETURNCOMMENT ,"
						    +" TO_CHAR(TO_DATE(RTI_DDMMYYYY,'DD/MM/YYYY'),'DD/MM/YYYY') AS RETURNINWARD_RTI_DDMMYYY,"
						    +" RTI_PAYORBANKROUTNO AS RETURNINWARD_RTI_PAYORBANKROUT,"
						    +" RTI_RETURNREASON AS RETURNINWARD_RTI_RETURNREASON,"
						    +" substr(RTI_FILENAME,1,29) AS RETURNINWARD_RTI_FILENAME,"
						    +"  CLO_PAYEE_ACCNO AS CLEARINGOUTWARD_CLO_PAYEE_ACCN,"
						    +" TRIM(CLO_PAYEE_ACCNM) AS CLEARINGOUTWARD_CLO_PAYEE_ACNM,"
						    +" CLO_CHQNO AS CLEARINGOUTWARD_CLO_CHQNO,"
						    +" CLO_SORTCD AS CLEARINGOUTWARD_CLO_SORTCD,"
						     //CLEARINGOUTWARD."CLO_IQARESULTS" AS CLEARINGOUTWARD_CLO_IQARESULTS,
						     +" CLO_DRAWEE_ACCNO AS CLEARINGOUTWARD_CLO_DRAWEE_ACC,"
						     +" CLO_BRANCH_CD AS CLEARINGOUTWARD_CLO_BRANCH_CD,"
						     +" TO_CHAR(TO_DATE(CLO_DATE_DDMMYYYY,'DD/MM/YYYY'),'DD/MM/YYYY') AS CLO_DATE_DDMMYYYY,"
						     +" BRM_BRNCD||'--'||BRM_BRNNM AS BRM_CD_BRNNM ,"
						     +" decode(RTI_RETURNREASON,'88','('||RTI_RETURNREASONCOMMENT||')',' ') RTI_RETURNREASONCOMMENT ,"
						     +" CLO_BOFD AS CLEARINGOUTWARD_CLO_BOFD,"
						    //nvl((select BNK_NAME from BANKMASTER_CHM where BNK_ROUTING_NBR=(select BRN_BNK_ROUTING_NBR from BRANCHMASTER_CHM where BRN_ROUTING_NBR=CLEARINGOUTWARD."CLO_SORTCD")),CLO_SORTCD) BNK_NAME
							 +"nvl((select BNK_NAME from BANKMASTER_CHM where BNK_ROUTING_NBR=(select distinct BRN_BNK_ROUTING_NBR from BRANCHMASTER_CHM where BRN_ROUTING_NBR= CLO_SORTCD )),"
							 +"nvl((select BNK_NAME from BANKMASTER_CHM where substr(BNK_ROUTING_NBR,1,6)=substr(CLO_SORTCD,1,6)),CLO_SORTCD)) BNK_NAME, "
							 + "TO_CHAR(TO_DATE(RTI_PRESENTMENTDATE,'DD/MM/YYYY'),'DD/MM/YYYY') AS RETINW_RTI_PRESENTMENTDATE"
							 +" FROM RETURNINWARD join CLEARINGOUTWARD"
						  
						    // --on CLEARINGOUTWARD."CLO_CHQNO"=RETURNINWARD."RTI_SERIALNO"
						    //--AND   CLEARINGOUTWARD."CLO_SORTCD"=RETURNINWARD."RTI_PAYORBANKROUTNO"
						    +" on CLO_ITEMSEQNO=RTI_ITEMSEQNO "
						    +" join  BRANCHMSTR on BRM_BRNCD=CLO_BRANCH_CD "
						    +" join  RETINWRETCODES on RTI_RETURNREASON=RETCODE"
						    +" WHERE "
						    +" RTI_PRESENTMENTDATE in (select distinct RTI_PRESENTMENTDATE from RETURNINWARD  where rti_ddmmyyyy='"+simpleDate+"') and rti_ddmmyyyy='"+simpleDate+"' "
						    +" and "
						    +" BRM_BRNCD =decode('"+branch_code+"','-1',BRM_BRNCD,'"+branch_code+"')"
						    +" and "
						    +" RTI_CLEARINGTYPE="
						    +" decode('"+rptCode+"','0',RTI_CLEARINGTYPE,'"+rptCode+"')"
						//--AND
						//--    CLEARINGOUTWARD."CLO_DATE_DDMMYYYY"=to_char
						//--    ((select max(to_date(A.CLO_DATE_DDMMYYYY,'ddmmyyyy')) from CLEARINGOUTWARD A where 
						//--    RETURNINWARD."RTI_SERIALNO"=A.CLO_CHQNO and RETURNINWARD."RTI_PAYORBANKROUTNO"=
						//--    A.CLO_SORTCD),'ddmmyyyy')
						 +" order by"
						 +" RETURNINWARD_RTI_FILENAME,RETINW_RTI_PRESENTMENTDATE,BRM_CD_BRNNM,RETURNINWARD_RTI_ITEMSEQNO ";
				}
				else
				{
					query="SELECT"
                            +" RTI_ITEMSEQNO AS RETURNINWARD_RTI_ITEMSEQNO,"
                            +" RTI_SERIALNO AS RETURNINWARD_RTI_SERIALNO,"
                            +" RTI_TRANSCODE AS RETURNINWARD_RTI_TRANSCODE,"
                            +" RTI_AMOUNT AS RETURNINWARD_RTI_AMOUNT,"
                            +" RTI_ACCOUNTNO AS RETURNINWARD_RTI_ACCOUNTNO,"
                            +" RETDESCR AS RETURNINWARD_RTI_RETURNCOMMENT ,"
                            +" TO_CHAR(TO_DATE(RTI_DDMMYYYY,'DD/MM/YYYY'),'DD/MM/YYYY') AS RETURNINWARD_RTI_DDMMYYY,"
                            +" RTI_PAYORBANKROUTNO AS RETURNINWARD_RTI_PAYORBANKROUT,"
                            +" RTI_RETURNREASON AS RETURNINWARD_RTI_RETURNREASON,"
                            +" substr(RTI_FILENAME,1,29) AS RETURNINWARD_RTI_FILENAME,"
                            +"  CLO_PAYEE_ACCNO AS CLEARINGOUTWARD_CLO_PAYEE_ACCN,"
                            +" TRIM(CLO_PAYEE_ACCNM) AS CLEARINGOUTWARD_CLO_PAYEE_ACNM,"
                            +" CLO_CHQNO AS CLEARINGOUTWARD_CLO_CHQNO,"
                            +" CLO_SORTCD AS CLEARINGOUTWARD_CLO_SORTCD,"
                             +" CLO_DRAWEE_ACCNO AS CLEARINGOUTWARD_CLO_DRAWEE_ACC,"
                             +" CLO_BRANCH_CD AS CLEARINGOUTWARD_CLO_BRANCH_CD,"
                             +" TO_CHAR(TO_DATE(CLO_DATE_DDMMYYYY,'DD/MM/YYYY'),'DD/MM/YYYY') AS CLO_DATE_DDMMYYYY,"
                             +" BRM_BRNCD||'--'||BRM_BRNNM AS BRM_CD_BRNNM ,"
                             +" decode(RTI_RETURNREASON,'88','('||RTI_RETURNREASONCOMMENT||')',' ') RTI_RETURNREASONCOMMENT ,"
                             +" CLO_BOFD AS CLEARINGOUTWARD_CLO_BOFD,"
                             +"nvl((select BNK_NAME from BANKMASTER_CHM where BNK_ROUTING_NBR=(select distinct BRN_BNK_ROUTING_NBR from BRANCHMASTER_CHM where BRN_ROUTING_NBR= CLO_SORTCD )),"
                             +"nvl((select BNK_NAME from BANKMASTER_CHM where substr(BNK_ROUTING_NBR,1,6)=substr(CLO_SORTCD,1,6)),CLO_SORTCD)) BNK_NAME, "
                             + "TO_CHAR(TO_DATE(RTI_PRESENTMENTDATE,'DD/MM/YYYY'),'DD/MM/YYYY') AS RETINW_RTI_PRESENTMENTDATE"
                             +" FROM RETURNINWARD join CLEARINGOUTWARD"
                             +" on RTI_PRESENTMENTDATE=CLO_DATE_DDMMYYYY"
                                +"    AND CLEARINGOUTWARD.CLO_ITEMSEQNO=nvl(RETURNINWARD.RTI_ITEMSEQNO,CLEARINGOUTWARD.CLO_ITEMSEQNO)"
                            +" join  BRANCHMSTR on BRM_MICRCD = CLO_BOFD "
                            +" join  RETINWRETCODES on RTI_RETURNREASON=RETCODE"
                            +" WHERE "
                            +" RTI_PRESENTMENTDATE in (select distinct RTI_PRESENTMENTDATE from RETURNINWARD  where rti_ddmmyyyy='"+simpleDate+"') and rti_ddmmyyyy='"+simpleDate+"' "
                            +" and "
                            +" BRM_BRNCD =decode('"+branch_code+"','-1',BRM_BRNCD,'"+branch_code+"')"
                            +" and "
                            +" RTI_CLEARINGTYPE="
                            +" decode('"+rptCode+"','0',RTI_CLEARINGTYPE,'"+rptCode+"')"
                             +" and RETURNINWARD.RTI_RETURNREASON not in (0,99)  and "
                            +" order by"
                            +" RETURNINWARD_RTI_FILENAME,RETINW_RTI_PRESENTMENTDATE,BRM_CD_BRNNM,RETURNINWARD_RTI_ITEMSEQNO ";
					
				}	
					
					System.out.println("\n\tSQL Query:"+query);
				/* par.put("dateString",simpleDate);
				par.put("branchString",branch_code);
				System.out.println("\n\t ----- inside Single ----"+bankName);
				par.put("bankName",bankName);
				par.put("clearingType",rptCode);*/
				//System.out.println("\n\t ----- 1 ----");
				par.put("bankName",bankName);
				String input_file=reportPath+"report_return_inward_All.jrxml";			
				System.out.println("\n\t -----input_file ----"+input_file);
				reportName="Return_inward_memo_"+to_day+".pdf";
				System.out.println("\n\t -----reportName ----"+reportName);			
				String output_file=reportPath+"PDF/"+reportName;
				System.out.println("\n\t -----output_file ----"+output_file); 	
				JasperDesign jd=JRXmlLoader.load(input_file);
				JRDesignQuery nwQuery=new JRDesignQuery();
				nwQuery.setText(query);
				jd.setQuery(nwQuery);				
				JasperReport jr = JasperCompileManager.compileReport(jd);
							
				JasperPrint jp = JasperFillManager.fillReport(jr,par,con);
						
				JRPdfExporter e1= new  JRPdfExporter();
							
				e1.setParameter(JRExporterParameter.JASPER_PRINT, jp);
							
				e1.setParameter(JRExporterParameter.OUTPUT_FILE,(new File(output_file)));
							
				e1.exportReport(); 			
				
				
				
				if(exportToExcel.equals("true"))
				{
					String input_file_excel=reportPath+"report_return_inward_All.jrxml";			
					System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
					String reportName_excel="Return_Inward_memo_"+to_day+".xls";
					reportName=reportName_excel;
					System.out.println("\n\t -----reportName_excel ----"+reportName_excel);			
					String output_file_excel=reportPath+"Excel/"+reportName_excel;
					
					JasperReport jr_excel = JasperCompileManager.compileReport(jd);
					JasperPrint jp_excel = JasperFillManager.fillReport(jr_excel,par,con);
					JRXlsExporter e1_excel= new  JRXlsExporter();
					e1_excel.setParameter(JRExporterParameter.JASPER_PRINT, jp_excel);
					e1_excel.setParameter(JRExporterParameter.OUTPUT_FILE,(new File(output_file_excel)));
					e1_excel.exportReport();
				}
			}//2
			/*else
			{
						//for all branches
				par.put("dateString",simpleDate);
				par.put("bankName",bankName);
				//System.out.println("\n\t ----- inside Single ----"+bankName);
					System.out.println("\n\t ----- inside ALL ----"+bankName);
					//System.out.println("\n\t ----- 1 ----");
					String input_file=reportPath+"report_return_inward_All_CTSAndNonCTS.jrxml";			
					//System.out.println("\n\t -----input_file ----"+input_file);
					reportName="Report_Return_Inward_All_CTSAndNonCTS"+to_day+".pdf";
					//System.out.println("\n\t -----reportName ----"+reportName);			
					String output_file=reportPath+"PDF/"+reportName;
					//System.out.println("\n\t -----output_file ----"+output_file);		
					JasperReport jr = JasperCompileManager.compileReport(input_file);
								//System.out.println("\n\t 2222 ");
					JasperPrint jp = JasperFillManager.fillReport(jr,par,con);
								//System.out.println("\n\t 3333 ");
					JRPdfExporter e1= new  JRPdfExporter();
								//System.out.println("\n\t 4444 ");
					e1.setParameter(JRExporterParameter.JASPER_PRINT, jp);
								//System.out.println("\n\t 5555 ");
					e1.setParameter(JRExporterParameter.OUTPUT_FILE,(new File(output_file)));
								//System.out.println("\n\t 6666 ");
					e1.exportReport(); 			
					//System.out.println("\n\t 7777 ");
					
					
					if(exportToExcel.equals("true"))
					{
						String input_file_excel=reportPath+"report_return_inward_All_CTSAndNonCTS.jrxml";			
						System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
						String reportName_excel="Report_Return_Inward_All_CTSAndNonCTS"+to_day+".xls";
						System.out.println("\n\t -----reportName_excel ----"+reportName_excel);			
						String output_file_excel=reportPath+"Excel/"+reportName_excel;
						
						JasperReport jr_excel = JasperCompileManager.compileReport(input_file_excel);
						JasperPrint jp_excel = JasperFillManager.fillReport(jr_excel,par,con);
						JRXlsExporter e1_excel= new  JRXlsExporter();
						e1_excel.setParameter(JRExporterParameter.JASPER_PRINT, jp_excel);
						e1_excel.setParameter(JRExporterParameter.OUTPUT_FILE,(new File(output_file_excel)));
						e1_excel.exportReport();
					}
			}*/	
		 }//count
		 else
		 {//count
		 		//this is for to make this variable empty..
		 		reportName="No Record Found For Given Date";
		 }//count	
		 
		System.out.println("\n\t -----reportName ----"+reportName);		
		
		}//try
		catch(Exception e)
		{//catch
				System.out.println("\n\tException in reportAll().report_clearing_outward.jsp:>>>"+e);
				e.printStackTrace();
		}//catch
	}//reportCTSAndNonCTS
	
%>	
<%
	System.out.println("\n\t ************* inside report_return_inward.jsp ***************");
	dateString=request.getParameter("datepicker");
	//branch_code=request.getParameter("opt_branch_code");
	ctstoken=request.getParameter("CTSTOKEN");
	flag=request.getParameter("flag");
	branch_code=request.getParameter("opt_branch_code");
	opt_ctsNonCTS_code=request.getParameter("opt_ctsNonCTS_code");
	System.out.println("\n\t");
	System.out.println("opt_ctsNonCTS_code :>>>"+opt_ctsNonCTS_code);	
	System.out.println("\n\tbranch_code:>>>>>>"+branch_code);
	System.out.println("Date String :>>>"+dateString);
	String dateArr[]=dateString.split("-");
	String simpleDate=dateArr[0]+dateArr[1]+dateArr[2];
	System.out.println("simpleDate :>>>"+simpleDate);	
	exportToExcel=request.getParameter("chkExcel");
	System.out.println("exportToExcel :>>>"+exportToExcel);	
	con=Configuration.getConnection();
	
	
	
	
	Map par= new HashMap();	
	//par.put("dateString",simpleDate);
	//par.put("branchString",branch_code);
	String reportPath=getServletContext().getRealPath("/");
	System.out.println("\n\tApplication Context Path:"+reportPath);
	reportPath+="/REPORT/returnInward/";
	String excelreportPath=reportPath+"Excel/";
	String reportDestPath=reportPath;
	int rptCode=Integer.parseInt(opt_ctsNonCTS_code);
	try	
	{
		if(exportToExcel=="" || exportToExcel==null)
		{
			exportToExcel="";
		}
	
		/* if(rptCode==0)//for report type All
		{
			reportAll(branch_code,reportPath,exportToExcel,simpleDate,par);
		}
		
		if(rptCode!=0)//for report type CTS */
		{
			reportAll(branch_code,reportPath,exportToExcel,simpleDate,par,opt_ctsNonCTS_code);
		} 	
	}
	catch(Exception e)
	{
		System.out.println("\n\tException in report_clearing_outward.jsp:>>>"+e);
		e.printStackTrace();
	}
	finally
	{
		try
		{
			if(con!=null)
				con.close();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
	}
%>
<html>
	<script language="javascript">
		function show_report()
		{
			var rptpath=document.getElementById("rptpath").value;
			var exportToExcel=document.getElementById("chkExcel").value;
			//alert('rptpath:'+rptpath);
			if(!(rptpath.indexOf('No Record Found For Given Date')>-1))
			{
				var url=document.URL;
				var p=url.lastIndexOf('/jsp');				
				baseurl=url.substr(0,p+1);
		//		baseurl=baseurl+"/REPORT/returnInward/PDF/"+document.getElementById("rptpath").value;
		       if(exportToExcel=="true")
				{
					baseurl=baseurl+"/REPORT/returnInward/Excel/"+document.getElementById("rptpath").value;
				}
				else
				{
					baseurl=baseurl+"/REPORT/returnInward/PDF/"+document.getElementById("rptpath").value;
				}	
		
		
				window.open(baseurl);
				//location.replace("../report_return_inward.jsp");
				document.getElementById("formid").action="../report_return_inward.jsp";
				document.getElementById("formid").method="POST";
				document.getElementById("formid").submit();
			}
			else
			{
				alert('No Record Found For Given Date');
				//location.replace("../report_return_inward.jsp");	
				document.getElementById("formid").action="../report_return_inward.jsp";
				document.getElementById("formid").method="POST";
				document.getElementById("formid").submit();
			}			
		}
	</script>
	<body onLoad="show_report()">
	<form id="formid" name="formid" method="post">
		<input type="hidden" id="rptpath" name="rptpath" value="<%=reportName%>"/>
		<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value="<%=ctstoken%>">
		<input type="hidden" id="flag" name="flag" value="<%=flag%>">		
		<input type="hidden" id="chkExcel" name="chkExcel" value="<%=exportToExcel%>"/>
	</form>
	</body>
</html>