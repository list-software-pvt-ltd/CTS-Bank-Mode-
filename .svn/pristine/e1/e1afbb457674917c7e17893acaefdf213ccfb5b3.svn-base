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
<%!
	String dateString;
	String branch_code,opt_ctsNonCTS_code;
	Connection con;
	String reportName;
	String exportToExcel;
	PreparedStatement ps;
	ResultSet all_branches;
	Statement st;
	ResultSet rs_brn;
%>
<%
	dateString=request.getParameter("datepicker");
	//branch_code=request.getParameter("opt_branch_code");
	branch_code=request.getParameter("opt_branch_code");
	opt_ctsNonCTS_code=request.getParameter("opt_ctsNonCTS_code");
	
	/*
	 code/value for opt_ctsNonCTS_code
	 0 from all;
	 1 for CTS;
	 2 for Non Cts;
	*/
	System.out.println("\n\t");
	System.out.println("\n\t");
	System.out.println("\n\tbranch_code:>>>>>>"+branch_code);
	System.out.println("Date String :>>>"+dateString);
	System.out.println("opt_ctsNonCTS_code :>>>"+opt_ctsNonCTS_code);
	
	//System.out.println("branch_code :>>>"+branch_code);	
	String dateArr[]=dateString.split("-");
	String simpleDate=dateArr[0]+dateArr[1]+dateArr[2];
	System.out.println("simpleDate :>>>"+simpleDate);	
	exportToExcel=request.getParameter("chkExcel");
	System.out.println("exportToExcel :>>>"+exportToExcel);	
	con=Configuration.getConnection();
	String to_day=(new  java.util.Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");
	
	Map par= new HashMap();	
	par.put("dateString",simpleDate);
	par.put("branchString",branch_code);
	String reportPath=getServletContext().getRealPath("/");
	System.out.println("\n\tApplication Context Path:"+reportPath);
	reportPath+="/REPORT/clearingOutward/";
	String excelreportPath=reportPath+"Excel/";
	String reportDestPath=reportPath;
	try
	{
		String sql=" select count(*) From clearingoutward c,BRANCHMSTR b where c.CLO_DATE_DDMMYYYY='"+simpleDate+"'";
	  		   sql+=" and c.CLO_BRANCH_CD=b.BRM_BRNCD";;
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
		
			if(!branch_code.equalsIgnoreCase("All"))
			{//2
			//for particular branch
				
				System.out.println("\n\t ----- bankName ----"+bankName);
				par.put("bankName",bankName);
				System.out.println("\n\t ----- 1 ----");
				String input_file=reportPath+"report_clearing_outward.jrxml";			
				System.out.println("\n\t -----input_file ----"+input_file);
				reportName="Report_Clearing_Outward_"+to_day+".pdf";
				System.out.println("\n\t -----reportName ----"+reportName);			
				String output_file=reportPath+"PDF/"+reportName;
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
				System.out.println("\n\t 7777 ");
				//res="REPORT/TempHtml/AggrigateReport"+to_day+".pdf";
				
				if(exportToExcel.equals("true"))
				{
					String input_file_excel=reportPath+"report_clearing_outward.jrxml";			
					System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
					String reportName_excel="Report_Clearing_Outward"+to_day+".xls";
					reportName=reportName_excel;
					System.out.println("\n\t -----reportName_excel ----"+reportName_excel);			
					String output_file_excel=reportPath+"Excel/"+reportName_excel;
					
					JasperReport jr_excel = JasperCompileManager.compileReport(input_file_excel);
					JasperPrint jp_excel = JasperFillManager.fillReport(jr_excel,par,con);
					JRXlsExporter e1_excel= new  JRXlsExporter();
					e1_excel.setParameter(JRExporterParameter.JASPER_PRINT, jp_excel);
					e1_excel.setParameter(JRExporterParameter.OUTPUT_FILE,(new File(output_file_excel)));
					e1_excel.exportReport();
				}
			}//2
			else
			{
						//for all branches
					System.out.println("\n\t ----- bankName ----"+bankName);
					par.put("bankName",bankName);
					System.out.println("\n\t ----- 1 ----");
					String input_file=reportPath+"report_clearing_outward_All.jrxml";			
					System.out.println("\n\t -----input_file ----"+input_file);
					reportName="Report_Clearing_Outward_All_"+to_day+".pdf";
					System.out.println("\n\t -----reportName ----"+reportName);			
					String output_file=reportPath+"PDF/"+reportName;
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
					System.out.println("\n\t 7777 ");
					
					if(exportToExcel.equals("true"))
					{
						String input_file_excel=reportPath+"report_clearing_outward_All.jrxml";			
						System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
						String reportName_excel="Report_Clearing_Outward"+to_day+".xls";
						reportName=reportName_excel;
						System.out.println("\n\t -----reportName_excel ----"+reportName_excel);			
						String output_file_excel=reportPath+"Excel/"+reportName_excel;
						
						JasperReport jr_excel = JasperCompileManager.compileReport(input_file_excel);
						JasperPrint jp_excel = JasperFillManager.fillReport(jr_excel,par,con);
						JRXlsExporter e1_excel= new  JRXlsExporter();
						e1_excel.setParameter(JRExporterParameter.JASPER_PRINT, jp_excel);
						e1_excel.setParameter(JRExporterParameter.OUTPUT_FILE,(new File(output_file_excel)));
						e1_excel.exportReport();
					}
			}	
		 }//count
		 else
		 {//count
		 		//this is for to make this variable empty..
		 		reportName="";
		 }//count	
		 
		System.out.println("\n\t -----reportName ----"+reportName);		 	
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
		//	alert('rptpath:'+rptpath);
			if(rptpath.length!=0)
			{
				var url=document.URL;
				var p=url.lastIndexOf('/jsp');				
				baseurl=url.substr(0,p+1);
				//baseurl=baseurl+"/REPORT/clearingOutward/PDF/"+document.getElementById("rptpath").value;
				if(exportToExcel=="true")
				{
					baseurl=baseurl+"/REPORT/clearingOutward/Excel/"+document.getElementById("rptpath").value;
				}
				else
				{
					baseurl=baseurl+"/REPORT/clearingOutward/PDF/"+document.getElementById("rptpath").value;
				}	
				window.open(baseurl);
				location.replace("../report_clearing_outward.jsp");
			}
			else
			{
				alert('No Record Found For Given Date');
				location.replace("../report_clearing_outward.jsp");				
			}			
		}
	</script>
	<body onLoad="show_report()">
		<input type="hidden" id="rptpath" name="rptpath" value="<%=reportName%>"/>
		<input type="hidden" id="chkExcel" name="chkExcel" value="<%=exportToExcel%>"/>
	</body>
</html>