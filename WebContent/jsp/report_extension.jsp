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
	String branch_code;
	Connection con;
	String reportName,ctstoken=null,flag="";
	String exportToExcel;
	PreparedStatement ps;
	ResultSet all_branches;
	Statement st;
	ResultSet rs_brn;
%>
<%
	ctstoken=request.getParameter("CTSTOKEN");
	flag=request.getParameter("flag");
	dateString=request.getParameter("datepicker");
	//branch_code=request.getParameter("opt_branch_code");
	System.out.println("Date String :>>>"+dateString);
	//System.out.println("branch_code :>>>"+branch_code);	
	String dateArr[]=dateString.split("-");
	String simpleDate=dateArr[0]+dateArr[1]+dateArr[2];
	System.out.println("simpleDate :>>>"+simpleDate);	
	exportToExcel=request.getParameter("chkExcel");
	System.out.println("exportToExcel :>>>"+exportToExcel);	
	con=Configuration.getConnection();
	String pattern = "dd/MM/yy";
    SimpleDateFormat format = new SimpleDateFormat(pattern);
    // formatting
    System.out.println(format.format(new Date()));

    System.out.println(format.format(new Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_"));
	String to_day=format.format(new Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");//(new  java.util.Date()).toString().replaceAll("/","_").replace("+","_").replace(" ","_").replace(":","_");
	
	Map par= new HashMap();	
	par.put("dateString",simpleDate);
	par.put("branchString",branch_code);
	String reportPath=getServletContext().getRealPath("/");
	System.out.println("\n\tApplication Context Path:"+reportPath);
	reportPath+="/REPORT/extension/";
	String excelreportPath=reportPath+"Excel/";
	String reportDestPath=reportPath;
	try
	{
		/*String sql="select count(*) FROM EXTENSION_INWARD ext,bankmaster_chm bm WHERE ";
				sql+="ext.EXT_PRESENTINGBANKROUTNO=bm.BNK_ROUTING_NBR AND ext.EXT_DDMMYYYY='"+simpleDate+"'";*/
				
				String sql="select count(*) FROM EXTENSION_INWARD ext,bankmaster_chm bm WHERE ";
		sql+="substr(ext.EXT_PAYORBANKROUTNO,4,3)=substr(bm.BNK_ROUTING_NBR,4,3) AND ext.EXT_DDMMYYYY='"+simpleDate+"'";
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
			//{//2
			//for particular branch
				
				System.out.println("\n\t ----- bankName ----"+bankName);
				par.put("bankName",bankName);
				System.out.println("\n\t ----- 1 ----");
				String input_file=reportPath+"report_extension.jrxml";			
				System.out.println("\n\t -----input_file ----"+input_file);
				reportName="Report_Extension_"+to_day+".pdf";
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
					String input_file_excel=reportPath+"report_extension.jrxml";			
					System.out.println("\n\t -----input_file_excel ----"+input_file_excel);
					String reportName_excel="Report_Extension_"+to_day+".xls";
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
			//}//2				
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
			//alert('rptpath:'+rptpath);
			if(rptpath.length!=0)
			{
				var url=document.URL;
				var p=url.lastIndexOf('/jsp');				
				baseurl=url.substr(0,p+1);
				//baseurl=baseurl+"/REPORT/extension/PDF/"+document.getElementById("rptpath").value;
				if(exportToExcel=="true")
				{
					baseurl=baseurl+"/REPORT/extension/Excel/"+document.getElementById("rptpath").value;
				}
				else
				{
					baseurl=baseurl+"/REPORT/extension/PDF/"+document.getElementById("rptpath").value;
				}	
				
				window.open(baseurl);
				//location.replace("../report_extension.jsp");
				document.getElementById("formid").action="../report_extension.jsp";
				document.getElementById("formid").method="POST";
				document.getElementById("formid").submit();
			}
			else
			{
				alert('No Record Found For Given Date');
				//location.replace("../report_extension.jsp");	
				document.getElementById("formid").action="../report_extension.jsp";
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