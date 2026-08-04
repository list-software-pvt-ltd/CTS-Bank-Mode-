package cts;

import java.io.File;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;

public class CallReport 
{
	public static void main(String argv[])
	{
	}
	public static boolean callClearingOutwardReport(String folder,Connection con)
	{
		boolean flg=false;
		try
		{
			Properties prop = new Properties();
			InputStream inputStream = Configuration.class.getClassLoader()
				.getResourceAsStream("/common.properties");
			prop.load(inputStream);
			String path = prop.getProperty("apppath");
			String bankName=Configuration.getConfValByNm("CFG_BANKNAME", con);
			String despath=path+"/OldClearingOutwardReport/"+folder+"/";
			new File(despath).mkdirs();
			
			String ReportUrl="",jrXmlName="clearing_outward_withimg";
			JRPdfExporter e1 = new JRPdfExporter();
			JasperReport jr = JasperCompileManager.compileReport(path+"REPORT/clearingOutward/"+jrXmlName +".jrxml");
			java.util.Map par = new java.util.HashMap();
			par.put("dateString",folder );
			par.put("imagepath", path+"uploadpath_to_CHI/");
			par.put("bankName",bankName);
			JasperPrint jp = JasperFillManager.fillReport(jr, par, con);
			e1.setParameter(JRExporterParameter.JASPER_PRINT, jp);
			ReportUrl = despath +"clearingOutward"+folder+".pdf";
			e1.setParameter(JRExporterParameter.OUTPUT_FILE,(new File( ReportUrl)));
			e1.exportReport();
			flg=true;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			flg=false;
		}
		return flg;
	}
	public static boolean callClearingOutwardInward(String folder,Connection con)
	{
		boolean flg=false;
		try
		{
			Properties prop = new Properties();
			InputStream inputStream = Configuration.class.getClassLoader()
				.getResourceAsStream("/common.properties");
			prop.load(inputStream);
			String path = prop.getProperty("apppath");
			String despath=path+"/OldClearingInwardReport/"+folder+"/";
			String bankName=Configuration.getConfValByNm("CFG_BANKNAME", con);
			new File(despath).mkdirs();
			
			String ReportUrl="",jrXmlName="report_clearing_inward_withimg";
			JRPdfExporter e1 = new JRPdfExporter();
			JasperReport jr = JasperCompileManager.compileReport(path+"REPORT/clearingInward/"+jrXmlName +".jrxml");
			java.util.Map par = new java.util.HashMap();
			par.put("dateString",folder );
			par.put("imagepath", path+"downloadpath_from_CHI/ClearingInward/Images/");
			par.put("CTS_TYPE","ALL");
			par.put("branchString","ALL");
			System.out.println("\n\t ----- inside Single ----"+bankName);
			par.put("bankName",bankName);
			JasperPrint jp = JasperFillManager.fillReport(jr, par, con);
			e1.setParameter(JRExporterParameter.JASPER_PRINT, jp);
			ReportUrl = despath +"clearingInward"+folder+".pdf";
			e1.setParameter(JRExporterParameter.OUTPUT_FILE,(new File( ReportUrl)));
			e1.exportReport();
			flg=true;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			flg=false;
		}
		return flg;
	}

}
