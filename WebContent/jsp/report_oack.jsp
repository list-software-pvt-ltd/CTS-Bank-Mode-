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
	String branch_code;
	Connection con;
	String reportName,ctstoken=null,flag="";
	String exportToExcel="false";
	PreparedStatement ps;
	ResultSet rs_count,rs_brn;
	Statement st;
	String opt_type="";
%>
<%
	System.out.println("\n\t ************* inside report_oack.jsp ***************");
	ctstoken=request.getParameter("CTSTOKEN");
	flag=request.getParameter("flag");
	opt_type=request.getParameter("opt_type");
	if(opt_type==null)
		opt_type="9";
		
	System.out.println("opt_type :>>>"+opt_type);
	dateString=request.getParameter("datepicker");
	System.out.println("Date String :>>>"+dateString);
	String dateArr[]=dateString.split("-");
	String simpleDate=dateArr[0]+dateArr[1]+dateArr[2];
	System.out.println("simpleDate :>>>"+simpleDate);	
	
	exportToExcel=request.getParameter("chkExcel");
	System.out.println("exportToExcel :>>>"+exportToExcel);	
	if(exportToExcel==null)
		exportToExcel="";
	con=Configuration.getConnection();
	String to_day=(new  java.util.Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");
	
	
	String reportPath=getServletContext().getRealPath("/");
	System.out.println("\n\tApplication Context Path:"+reportPath);
	reportPath+="/REPORT/oack/";
	String excelreportPath=reportPath+"Excel/";
	String reportDestPath=reportPath;
	try	
	{
		String sql="";
		
		sql="SELECT count(*) FROM CLEARINGOUTWARD,BRANCHMSTR,OACK";
		sql+=" WHERE  OACK.OACK_PRESENTMENTDATE=? AND BRANCHMSTR.BRM_BRNCD = CLEARINGOUTWARD.CLO_BRANCH_CD";
		sql+=" AND  OACK.OACK_ITEMSEQNO=CLEARINGOUTWARD.CLO_ITEMSEQNO";
		sql+=" AND  OACK.OACK_PRESENTMENTDATE=CLEARINGOUTWARD.CLO_DATE_DDMMYYYY AND OACK.OACK_ITEMSTATUS=?";
		System.out.println("\n\tSQL Query:"+sql);
		ps=con.prepareStatement(sql);
		
		ps.setString(1,simpleDate);
		ps.setString(2,opt_type);
		
		rs_count=ps.executeQuery();
		int count=0;
		while(rs_count.next())
		{
			count=rs_count.getInt(1);
		}
		System.out.println("\n\tRecord Count:::>>"+count);		
		
		st=con.createStatement();
		rs_brn=st.executeQuery("select CFG_BANKNAME from CONFIGURATION");
		String bankName="";
		while(rs_brn.next())
		{
			bankName=rs_brn.getString(1);
		}
		
		if(count>0)
		{//count	
				Map par= new HashMap();	
			//for particular branch
				par.put("dateString",simpleDate);
				System.out.println("\n\t ----- inside Single ----"+bankName);
				par.put("bankName",bankName);
				par.put("itemStatus",opt_type);
				String input_file=reportPath+"oack.jrxml";			
				System.out.println("\n\t -----input_file ----"+input_file);
				reportName="Report_oack_"+to_day+".pdf";
				System.out.println("\n\t -----reportName ----"+reportName);			
				String output_file=reportPath+"PDF/"+reportName;
				System.out.println("\n\t -----output_file ----"+output_file);		
				JasperReport jr = JasperCompileManager.compileReport(input_file);
				
				System.out.println("\n\t 2222 ");
				System.out.println("\n\t jr "+jr);
				System.out.println("\n\t par "+par);
				System.out.println("\n\t con "+con);
							
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
						String input_file_excel=reportPath+"oack.jrxml";			
						System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
						String reportName_excel="Report_oack_"+to_day+".xls";
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
		 }//count
		 else
		 {//count
		 		//this is for to make this variable empty..
		 		reportName="No Record Found For Given Date";
		 }//count	
		 
		System.out.println("\n\t -----reportName ----"+reportName);		 	
	}
	catch(Exception e)
	{
		System.out.println("\n\tException in report_oack.jsp:>>>"+e);
		reportName="No Record Found For Given Date";
		e.printStackTrace();
	}
	finally
	{
		try
		{
			if(con!=null)
			{
				rs_count.close();
				rs_brn.close();
				st.close();
				ps.close();				
				con.close();
			}	
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
			//	baseurl=baseurl+"/REPORT/oack/PDF/"+document.getElementById("rptpath").value;
				if(exportToExcel=="true")
				{
					baseurl=baseurl+"/REPORT/oack/Excel/"+document.getElementById("rptpath").value;
				}
				else
				{
					baseurl=baseurl+"/REPORT/oack/PDF/"+document.getElementById("rptpath").value;
				}	
				window.open(baseurl);
				//location.replace("../read_clearing_acknowledgement.jsp");
				document.getElementById("formid").action="../read_clearing_acknowledgement.jsp";
				document.getElementById("formid").method="POST";
				document.getElementById("formid").submit();
			}
			else
			{
				alert('No Record Found For Given Date');
				document.getElementById("formid").action="../read_clearing_acknowledgement.jsp";
				document.getElementById("formid").method="POST";
				document.getElementById("formid").submit();
				//location.replace("../read_clearing_acknowledgement.jsp");				
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