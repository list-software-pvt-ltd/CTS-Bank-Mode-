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
String fromfile="N";
	String branch_code,opt_ctsNonCTS_code,ctstoken="",flag="";
	Connection con;
	String reportName;
	String exportToExcel;
	PreparedStatement ps;
	ResultSet all_branches;
	Statement st,st2;
	ResultSet rs_brn,rs_date;
	String to_day=(new  java.util.Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");
%>
<%!
	/* public void reportAll(String branch_code,String reportPath,String exportToExcel,String simpleDate,Map par)
	{//reportAll
			System.out.println("\n\t *********** inside reportAll *************");
				System.out.println("\n\t branch_code:"+branch_code);
				System.out.println("\n\t reportPath:"+reportPath);
				System.out.println("\n\t exportToExcel:"+exportToExcel);
				System.out.println("\n\t simpleDate:"+simpleDate);
				System.out.println("\n\t par:"+par);
			System.out.println("\n\t *********** inside reportAll *************");	
			
			try
			{//try
		
				String sql="";
				if(!(branch_code.equals("All")))
				{		
					sql="SELECT count(*) FROM RETURNINWARD R,CLEARINGOUTWARD C,BRANCHMSTR B";
					sql+=" WHERE R.RTI_PRESENTMENTDATE in (select distinct RTI_PRESENTMENTDATE from RETURNINWARD  where rti_ddmmyyyy='"+simpleDate+"') and R.rti_ddmmyyyy='"+simpleDate+"' AND C.CLO_CHQNO=R.RTI_SERIALNO";
					sql+=" AND C.CLO_SORTCD=R.RTI_PAYORBANKROUTNO AND B.BRM_BRNCD='"+branch_code+"'";
					
						System.out.println("\n\tSQL Query:"+sql);			
				}
				else
				{
					sql="SELECT count(*) FROM RETURNINWARD R,CLEARINGOUTWARD C,BRANCHMSTR B";
					sql+=" WHERE R.RTI_PRESENTMENTDATE in (select distinct RTI_PRESENTMENTDATE from RETURNINWARD  where rti_ddmmyyyy='"+simpleDate+"') and R.rti_ddmmyyyy='"+simpleDate+"' AND C.CLO_CHQNO=R.RTI_SERIALNO";
					sql+=" AND C.CLO_SORTCD=R.RTI_PAYORBANKROUTNO";
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
							String input_file=reportPath+"report_return_inward_withoutmemo.jrxml";			
							System.out.println("\n\t -----input_file ----"+input_file);
							reportName="Report_Return_Inward_"+to_day+".pdf";
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
								String input_file_excel=reportPath+"report_return_inward_withoutmemo.jrxml";			
								System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
								String reportName_excel="Report_Return_Inward_"+to_day+".xls";
								System.out.println("\n\t -----reportName_excel ----"+reportName_excel);			
								String output_file_excel=reportPath+"Excel/"+reportName_excel;
								
								JasperReport jr_excel = JasperCompileManager.compileReport(input_file_excel);
								JasperPrint jp_excel = JasperFillManager.fillReport(jr_excel,par,con);
								JRXlsExporter e1_excel= new  JRXlsExporter();
								e1_excel.setParameter(JRExporterParameter.JASPER_PRINT, jp_excel);
								e1_excel.setParameter(JRExporterParameter.OUTPUT_FILE,(new File(output_file_excel)));
								e1_excel.exportReport();
							}
							//res="REPORT/TempHtml/AggrigateReport"+to_day+".pdf";
						}//2
						else
						{
									//for all branches
							par.put("dateString",simpleDate);
							par.put("bankName",bankName);
							System.out.println("\n\t ----- inside Single ----"+bankName);
							System.out.println("\n\t ----- inside ALL ----"+bankName);
								System.out.println("\n\t ----- 1 ----");
								String input_file=reportPath+"report_return_inward_All_withoutmemo.jrxml";			
								System.out.println("\n\t -----input_file ----"+input_file);
								reportName="Report_Return_Inward_All_"+to_day+".pdf";
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
									String input_file_excel=reportPath+"report_return_inward_All_withoutmemo.jrxml";			
									System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
									String reportName_excel="Report_Return_Inward_All"+to_day+".xls";
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
		
	}//reportAll */
	
	public void reportAll(String branch_code,String reportPath,String exportToExcel,String simpleDate,Map par,String rptCode)
	{//reportCTSAndNonCTS
				System.out.println("\n\t *********** inside reportCTSAndNonCTS *************");
				System.out.println("\n\t branch_code:"+branch_code);
				System.out.println("\n\t reportPath:"+reportPath);
				System.out.println("\n\t exportToExcel:"+exportToExcel);
				System.out.println("\n\t simpleDate:"+simpleDate);
				System.out.println("\n\t par:"+par);
			System.out.println("\n\t *********** inside reportCTSAndNonCTS *************");	
			
			try
			{//try
				
				String sql="";
					if(fromfile.equals("Y"))
					{
				st2=con.createStatement();
				rs_date=st2.executeQuery("select distinct(RTI_PRESENTMENTDATE)RTI_PRESENTMENTDATE from RETURNINWARD where RTI_DDMMYYYY='"+simpleDate+"'");
				
						
				
				while(rs_date.next())
				{
					simpleDate=rs_date.getString(1);
				}
				rs_date.close();
				st2.close();
					}
				//if(!(branch_code.equals("All")))
				{		
					sql="SELECT count(*) FROM RETURNINWARD R,CLEARINGOUTWARD C,BRANCHMSTR B";
					sql+=" WHERE R.RTI_PRESENTMENTDATE in (select distinct RTI_PRESENTMENTDATE from RETURNINWARD  where rti_ddmmyyyy='"+simpleDate+"') and R.rti_ddmmyyyy='"+simpleDate+"'  AND C.CLO_CHQNO=R.RTI_SERIALNO";
					sql+=" AND C.CLO_SORTCD=R.RTI_PAYORBANKROUTNO AND B.BRM_BRNCD=decode('"+branch_code+"','-1',B.BRM_BRNCD,'"+branch_code+"')";
					sql+=" AND R.RTI_CLEARINGTYPE=decode('"+rptCode+"',0,R.RTI_CLEARINGTYPE,'"+rptCode+"')";
						System.out.println("\n\tSQL Query:"+sql);			
				}
				/*else
				{
					sql="SELECT count(*) FROM RETURNINWARD R,CLEARINGOUTWARD C,BRANCHMSTR B";
					sql+=" WHERE R.RTI_PRESENTMENTDATE in (select distinct RTI_PRESENTMENTDATE from RETURNINWARD  where rti_ddmmyyyy='"+simpleDate+"') and R.rti_ddmmyyyy='"+simpleDate+"' AND C.CLO_CHQNO=R.RTI_SERIALNO";
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
							par.put("dateString",simpleDate);
							par.put("branchString",branch_code);
							System.out.println("\n\t ----- inside Single ----"+bankName);
							par.put("bankName",bankName);
							par.put("clearingType",rptCode);
							par.put("subreportpath",reportPath);
							System.out.println("\n\t ----- 1 ----");
							String input_file=reportPath+"report_return_inward.jrxml";			
							System.out.println("\n\t -----input_file ----"+input_file);
							reportName="Ret_Inward_"+to_day+".pdf";
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
								String input_file_excel=reportPath+"report_return_inward.jrxml";			
								System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
								String reportName_excel="Ret_Inward_"+to_day+".xls";
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
							//res="REPORT/TempHtml/AggrigateReport"+to_day+".pdf";
						}//2
						/*else
						{
									//for all branches
							par.put("dateString",simpleDate);
							par.put("bankName",bankName);
							System.out.println("\n\t ----- inside Single ----"+bankName);
							System.out.println("\n\t ----- inside ALL ----"+bankName);
								System.out.println("\n\t ----- 1 ----");
								String input_file=reportPath+"report_return_inward_All_withoutmemo_CTSAndNonCTS.jrxml";			
								System.out.println("\n\t -----input_file ----"+input_file);
								reportName="Report_Return_Inward_All_CTSAndNonCTS_"+to_day+".pdf";
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
								String input_file_excel=reportPath+"report_return_inward_All_withoutmemo_CTSAndNonCTS.jrxml";			
									System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
									String reportName_excel="Report_Return_Inward_All_CTS"+to_day+".xls";
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
	System.out.println("\n\t ************* inside report_clearing_inward.jsp *************** ");
 fromfile=request.getParameter("fromfile");
 ctstoken=request.getParameter("CTSTOKEN");
	flag=request.getParameter("flag");
  // System.out.println("\n\t");
 //  System.out.println("fromfile :>>>"+fromfile);
   String simpleDate="";
   int rptCode;
if(fromfile.equals("Y"))
{
	branch_code="-1";
	simpleDate=Configuration.getDDMMYYYY();
	con=Configuration.getConnection();

	 opt_ctsNonCTS_code="0";
	 rptCode=Integer.parseInt(opt_ctsNonCTS_code);
	
	//System.out.println("rptCode :>>>"+rptCode);	
	}
else{
	dateString=request.getParameter("datepicker");
	//branch_code=request.getParameter("opt_branch_code");
	branch_code=request.getParameter("opt_branch_code");
	opt_ctsNonCTS_code=request.getParameter("opt_ctsNonCTS_code");
	System.out.println("\n\t");
	System.out.println("opt_ctsNonCTS_code :>>>"+opt_ctsNonCTS_code);
	System.out.println("\n\t");
	System.out.println("\n\tbranch_code:>>>>>>"+branch_code);
	System.out.println("Date String :>>>"+dateString);
	String dateArr[]=dateString.split("-");
	 simpleDate=dateArr[0]+dateArr[1]+dateArr[2];
	System.out.println("simpleDate :>>>"+simpleDate);	
	exportToExcel=request.getParameter("chkExcel");
	System.out.println("exportToExcel :>>>"+exportToExcel);	
	con=Configuration.getConnection();
	 rptCode=Integer.parseInt(opt_ctsNonCTS_code);
	System.out.println("rptCode :>>>"+rptCode);	
}
	Map par= new HashMap();	
	//par.put("dateString",simpleDate);
	//par.put("branchString",branch_code);
	String reportPath=getServletContext().getRealPath("/");
	System.out.println("\n\tApplication Context Path:"+reportPath);
	reportPath+="/REPORT/returnInward/";
	String excelreportPath=reportPath+"Excel/";
	String reportDestPath=reportPath;
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
			var rptpath=document.getElementById("rptpath").value;;
			var exportToExcel=document.getElementById("chkExcel").value;

			//alert('rptpath:'+rptpath);
			if(!(rptpath.indexOf('No Record Found For Given Date')>-1))
			{
				var url=document.URL;
				var p=url.lastIndexOf('/jsp');				
				baseurl=url.substr(0,p+1);
			//	baseurl=baseurl+"/REPORT/returnInward/PDF/"+document.getElementById("rptpath").value;
			   if(exportToExcel=="true")
				{
					baseurl=baseurl+"/REPORT/returnInward/Excel/"+document.getElementById("rptpath").value;
				}
				else
				{
					baseurl=baseurl+"/REPORT/returnInward/PDF/"+document.getElementById("rptpath").value;
				}	
			
				window.open(baseurl);
				//location.replace("../report_return_inward_withoutmemo.jsp");
				document.getElementById("formid").action="../report_return_inward_withoutmemo.jsp";
				document.getElementById("formid").method="POST";
				document.getElementById("formid").submit();
			}
			else
			{
				alert('No Record Found For Given Date');
				//location.replace("../report_return_inward.jsp");		
				document.getElementById("formid").action="../report_return_inward_withoutmemo.jsp";
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