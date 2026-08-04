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
	String dateString,opt_ctsNonCTS_code;
	String branch_code;
	Connection con;
	String reportName;
	String exportToExcel="",ctstoken=null,flag;
	PreparedStatement ps;
	ResultSet all_branches;
	Statement st;
	ResultSet rs_brn;
	String to_day=(new  java.util.Date()).toString().replaceAll("/","").replace("+","").replace(" ","").replace(":","");
	//System.out.println("");
%>

<%!
	public void reportAll(String branch_code,String reportPath,String exportToExcel,String simpleDate,Map par)
	{//reportAll
	
		System.out.println("\n\t *********** inside reportCTS *************");
				System.out.println("\n\t branch_code:"+branch_code);
				System.out.println("\n\t reportPath:"+reportPath);
				System.out.println("\n\t exportToExcel:"+exportToExcel);
				System.out.println("\n\t simpleDate:"+simpleDate);
				System.out.println("\n\t par:"+par);
		System.out.println("\n\t *********** inside reportCTS *************");	
		try
		{//try
			
		String sql="";
		if(!(branch_code.equals("All")))
		{
			 sql="SELECT  count(*) FROM CLEARINGINWARD C left outer join BRANCHMSTR B ";
					sql+="on ";  
					sql+="B.BRM_MICRCD=C.CLI_PAYORBANKROUTNO where C.CLI_DDMMYYYY='"+simpleDate+"'";
					sql+=" AND nvl(B.BRM_BRNCD,'-1')='"+branch_code+"'";
					System.out.println("\n\tSQL Query:"+sql);
		}
		else
		{
			 sql="SELECT  count(*) FROM CLEARINGINWARD C,BRANCHMSTR B ";
					sql+="WHERE ";  
					sql+="B.BRM_MICRCD=C.CLI_PAYORBANKROUTNO AND C.CLI_DDMMYYYY='"+simpleDate+"'";
					System.out.println("\n\tSQL Query:"+sql);
		}
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
				par.put("dateString",simpleDate);
				par.put("branchString",branch_code);
				System.out.println("\n\t ----- inside Single ----"+bankName);
				par.put("bankName",bankName);
				System.out.println("\n\t ----- 1 ----");
				String input_file=reportPath+"report_clearing_inward_special.jrxml";			
				System.out.println("\n\t -----input_file ----"+input_file);
				reportName="Report_Clearing_Inward_special_"+to_day+".pdf";
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
						String input_file_excel=reportPath+"report_clearing_inward_special.jrxml";			
						System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
						String reportName_excel="ClrInw"+to_day+".xls";
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
				par.put("dateString",simpleDate);
				par.put("bankName",bankName);
				par.put("prm_subrptpath",reportPath);
				System.out.println("\n\t ----- inside Single ----"+bankName);
				System.out.println("\n\t ----- inside ALL ----"+bankName);
					System.out.println("\n\t ----- 1 ----");
					String input_file=reportPath+"report_clearing_inward_All_special.jrxml";			
					System.out.println("\n\t -----input_file ----"+input_file);
					reportName="Report_Clearing_Inward_All_special_"+to_day+".pdf";
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
							String input_file_excel=reportPath+"report_clearing_inward_All_special.jrxml";			
							System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
							String reportName_excel="ClrInw"+to_day+".xls";
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
		 		reportName="No Record Found For Given Date";
		 }//count	
		 
		System.out.println("\n\t -----reportName ----"+reportName);		
		
		}//try
		catch(Exception e)
		{//catch
				System.out.println("\n\tException in reportAll().report_clearing_inward_special.jsp:>>>"+e);
				e.printStackTrace();
		}//catch
	}//reportAll
	
	public void reportCTSAndNonCTS(String branch_code,String reportPath,String exportToExcel,String simpleDate,Map par,String rptCode)
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
			if(!(branch_code.equals("All")))
			{
				 sql="SELECT  count(*) FROM CLEARINGINWARD C left outer join BRANCHMSTR B ";
						sql+="on ";  
						sql+="B.BRM_MICRCD=C.CLI_PAYORBANKROUTNO where C.CLI_DDMMYYYY='"+simpleDate+"'";
						sql+=" AND nvl(B.BRM_BRNCD,'-1')='"+branch_code+"'";
						System.out.println("\n\tSQL Query:"+sql);
			}
			else
			{
				 sql="SELECT  count(*) FROM CLEARINGINWARD C,BRANCHMSTR B ";
						sql+="WHERE ";  
						sql+="B.BRM_MICRCD=C.CLI_PAYORBANKROUTNO AND C.CLI_DDMMYYYY='"+simpleDate+"'";
						System.out.println("\n\tSQL Query:"+sql);
			}
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
				par.put("dateString",simpleDate);
				par.put("branchString",branch_code);
				par.put("clearingType",rptCode);
				System.out.println("\n\t ----- inside Single ----"+bankName);
				par.put("bankName",bankName);
				System.out.println("\n\t ----- 1 ----");
				String input_file=reportPath+"report_clearing_inward_CTS_NonCTS.jrxml";			
				System.out.println("\n\t -----input_file ----"+input_file);
				reportName="Report_Clearing_Inward_CTS_NonCTS"+to_day+".pdf";
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
						String input_file_excel=reportPath+"report_clearing_inward_CTS_NonCTS.jrxml";			
						System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
						String reportName_excel="ClrInw"+to_day+".xls";
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
				par.put("dateString",simpleDate);
				par.put("bankName",bankName);
				par.put("clearingType",rptCode);
				par.put("prm_subrptpath",reportPath);

				System.out.println("\n\t ----- inside Single ----"+bankName);
				System.out.println("\n\t ----- inside ALL ----"+bankName);
					System.out.println("\n\t ----- 1 ----");
					String input_file=reportPath+"report_clearing_inward_All_CTS_NonCTS.jrxml";			
					System.out.println("\n\t -----input_file ----"+input_file);
					reportName="Report_Clearing_Inward_All_CTS_NonCTS_"+to_day+".pdf";
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
							String input_file_excel=reportPath+"report_clearing_inward_All_CTS_NonCTS.jrxml";			
							System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
							String reportName_excel="ClrInw"+to_day+".xls";
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
	System.out.println("\n\t ************* inside report_clearing_inward_special.jsp ***************");
	dateString=request.getParameter("datepicker");
	ctstoken=request.getParameter("CTSTOKEN");
	flag=request.getParameter("flag");
	//branch_code=request.getParameter("opt_branch_code");
	branch_code=request.getParameter("opt_branch_code");
	opt_ctsNonCTS_code=request.getParameter("opt_ctsNonCTS_code");
	System.out.println("\n\t");
	System.out.println("\n\t");
	System.out.println("\n\tbranch_code:>>>>>>"+branch_code);
	System.out.println("Date String :>>>"+dateString);
	String dateArr[]=dateString.split("-");
	String simpleDate=dateArr[0]+dateArr[1]+dateArr[2];
	System.out.println("simpleDate :>>>"+simpleDate);	
	exportToExcel=request.getParameter("chkExcel");
	System.out.println("exportToExcel :>>>"+exportToExcel);
	System.out.println("opt_ctsNonCTS_code :>>>"+opt_ctsNonCTS_code);	
	con=Configuration.getConnection();
	
	
	if(exportToExcel=="" || exportToExcel==null)
	{
		exportToExcel="";
	}
	
	Map par= new HashMap();	
	//par.put("dateString",simpleDate);
	//par.put("branchString",branch_code);
	String reportPath=getServletContext().getRealPath("/");
	System.out.println("\n\tApplication Context Path:"+reportPath);
	reportPath+="/REPORT/clearingInward/";
	String excelreportPath=reportPath+"Excel/";
	String reportDestPath=reportPath;
	int rptCode=Integer.parseInt(opt_ctsNonCTS_code);
	try	
	{
		System.out.println("\n\t opt_ctsNonCTS_code:"+opt_ctsNonCTS_code);
		if(rptCode==0)//for report type All
		{
			reportAll(branch_code,reportPath,exportToExcel,simpleDate,par);
		}
		
		if(rptCode!=0)//for report type CTS
		{
		//	reportCTSAndNonCTS(branch_code,reportPath,exportToExcel,simpleDate,par,opt_ctsNonCTS_code);
		}
 	
	}
	catch(Exception e)
	{
		System.out.println("\n\tException in report_clearing_inward_special.jsp:>>>"+e);
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
				if(exportToExcel=="true")
				{
					baseurl=baseurl+"/REPORT/clearingInward/Excel/"+document.getElementById("rptpath").value;
				}
				else
				{
					baseurl=baseurl+"/REPORT/clearingInward/PDF/"+document.getElementById("rptpath").value;
				}	
				//baseurl=baseurl+"/REPORT/clearingInward/PDF/"+document.getElementById("rptpath").value;
				window.open(baseurl);
				//location.replace("../report_clearing_inward.jsp");
				document.getElementById("formid").action="../report_clearing_inward_special.jsp";
				document.getElementById("formid").method="POST";
				document.getElementById("formid").submit();
			}
			else
			{
				alert('No Record Found For Given Date');
				//location.replace("../report_clearing_inward.jsp");	
				document.getElementById("formid").action="../report_clearing_inward_special.jsp";
				document.getElementById("formid").method="POST";
				document.getElementById("formid").submit();
			}			
		}
	</script>
	<body onLoad="show_report()">
	<form id="formid" name="formid" method="post">
		<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value="<%=ctstoken%>">
		<input type="hidden" id="rptpath" name="rptpath" value="<%=reportName%>"/>
		<input type="hidden" id="flag" name="flag" value="<%=flag%>">
		<input type="hidden" id="chkExcel" name="chkExcel" value="<%=exportToExcel%>"/>
	</form>
	</body>
</html>