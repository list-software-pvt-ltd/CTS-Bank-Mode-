package cts;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.commons.io.FileUtils;

public class CreateFile {
	static String filepath = "";

	/*
	 * public static Connection getConnection() { Connection connection = null; if
	 * (connection != null) return connection; else { try {
	 * 
	 * System.out.println("2"); Properties prop = new Properties(); InputStream
	 * inputStream
	 * =CreateFile.class.getClassLoader().getResourceAsStream("common.properties");
	 * prop.load(inputStream); System.out.println(prop.getProperty("driver"));
	 * String driver =prop.getProperty("driver"); String url
	 * =prop.getProperty("url"); String user =prop.getProperty("user"); String
	 * password =prop.getProperty("password");
	 * filepath=prop.getProperty("filePath");
	 * System.out.println("filepath===="+filepath); Class.forName(driver);
	 * connection = DriverManager.getConnection(url, user, password); } catch
	 * (Exception e) { e.printStackTrace(); } return connection; }
	 * 
	 * }
	 * 
	 */public static String generateFile() {
		try {
			// String path="D://ClearingInwardTextFile";
			System.out.println("CHANGE ANIKET OMKAR");
			Connection conn = Configuration.getConnection();
			String cbsVendor=Configuration.getConfValByNm("CFG_CBS_VENDOR",conn);
			String finFileName="InwardSubPosting_"+Configuration.getYYYYMMDD()+"_"
					+Configuration.getConfValByNm("CFG_BANKROUTINGCODE", conn).substring(3, 6)+"_"+Configuration.getConfValByNm("CFG_BANKROUTINGCODE", conn).substring(0, 3)+".txt";
			
			filepath=new StringBuffer().append(Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", conn))
					.append("/ClearingInward/").toString();
			File file = new File(filepath+"/BeforeChange/");
			if (file.exists()) {
				FileUtils.cleanDirectory(file);
			}
			if (!file.exists()) {
				file.mkdir();
			}
			if(cbsVendor.equalsIgnoreCase("FINACLE"))
				new File(filepath+ "/"+finFileName).renameTo(new File(filepath+ "/BeforeChange/"+finFileName));
			else
				new File(filepath+ "/01_To_CBS_Clearing_Inward.txt").renameTo(new File(filepath+ "/BeforeChange/01_To_CBS_Clearing_Inward.txt"));
			
			PreparedStatement Pst = null;
			PreparedStatement Pst1 = null;

			ResultSet rs = null;
			ResultSet rs1 = null;
			FileWriter fw = null;
			FileWriter fw1 = null;
			FileWriter fw2 = null;
			if(cbsVendor.equalsIgnoreCase("FINACLE"))
			{
				fw1 = new FileWriter(new File(filepath + "/01To_CBS_NotDrawnOnUstemp.txt"), true);
				fw2 = new FileWriter(new File(filepath + "/"+finFileName), true);
			}
			else {
				fw1 = new FileWriter(new File(filepath + "/01To_CBS_NotDrawnOnUstemp.txt"), true);
				fw2 = new FileWriter(new File(filepath + "/01_To_CBS_Clearing_Inward.txt"), true);
			}
			String txtName = filepath + "/01_To_CBS_Clearing_Inward_";
			String sysdate=Configuration.getDDMMYYYY();//DSP sysdate

			//String qry = "select distinct(nvl((select BRM_BRNCD from BRANCHMSTR b where b.BRM_MICRCD=c.CLI_PAYORBANKROUTNO ) ,'-1'))BRM_BRNCD,CLI_PAYORBANKROUTNO from CLEARINGINWARD c  where CLI_DDMMYYYY=to_char(sysdate,'ddmmyyyy') order by 1";
			//String dataqry = "select nvl((select BRM_BRNCD from BRANCHMSTR b where b.BRM_MICRCD=c.CLI_PAYORBANKROUTNO ),'-1')BRM_BRNCD,CLI_FULLLINE from CLEARINGINWARD c  where CLI_DDMMYYYY=to_char(sysdate,'ddmmyyyy') and CLI_PAYORBANKROUTNO=? order by 1";

			String qry = "select distinct(nvl((select BRM_BRNCD from BRANCHMSTR b where b.BRM_MICRCD=c.CLI_PAYORBANKROUTNO ) ,'-1'))BRM_BRNCD,CLI_PAYORBANKROUTNO from CLEARINGINWARD c  where CLI_DDMMYYYY=? order by 1";
			String dataqry = "select nvl((select BRM_BRNCD from BRANCHMSTR b where b.BRM_MICRCD=c.CLI_PAYORBANKROUTNO ),'-1')BRM_BRNCD,CLI_FULLLINE from CLEARINGINWARD c  where CLI_DDMMYYYY=? and CLI_PAYORBANKROUTNO=? order by 1";

			Pst = conn.prepareStatement(qry);
			Pst.setString(1, sysdate);
			rs = Pst.executeQuery();
			String str = "";
			while (rs.next()) {
				if (rs.getString(1).equalsIgnoreCase("-1")) {
					Pst1 = conn.prepareStatement(dataqry);
					Pst1.setString(1, sysdate);
					Pst1.setString(2, rs.getString(2));
					rs1 = Pst1.executeQuery();
					while (rs1.next()) {
						fw1.write(rs1.getString(2) + "\n");
						fw2.write(rs1.getString(2) + "\n");
						fw1.flush();
						fw2.flush();
					}
					rs1.close();
					Pst1.close();
				} else {
					if(Configuration.getConfValByNm("CFG_INWD_SPLITSTYLE", conn).equalsIgnoreCase("Separated"))
					{
						fw = new FileWriter(new File(txtName + rs.getString(1) + ".txt"), true);
						fw.flush();
					}
					Pst1 = conn.prepareStatement(dataqry);
					Pst1.setString(1, sysdate);
					Pst1.setString(2, rs.getString(2));
					rs1 = Pst1.executeQuery();
					while (rs1.next()) {
						if(Configuration.getConfValByNm("CFG_INWD_SPLITSTYLE", conn).equalsIgnoreCase("Separated"))
						{	
							fw.write(rs1.getString(2) + "\n");
							fw.flush();
						}
							
						fw2.write(rs1.getString(2) + "\n");
						fw2.flush();
						
					}
					rs1.close();
					Pst1.close();
					if(Configuration.getConfValByNm("CFG_INWD_SPLITSTYLE", conn).equalsIgnoreCase("Separated"))
					{
						fw.close();
					}
					fw1.close();
				}
			}
			rs.close();
			Pst.close();
			fw1.close();
			conn.close();
			return "SUCCESS";
		} catch (Exception e) {
			e.printStackTrace();
			return "FAILED";
		}

	}

	/*
	 * public static void main(String[] args) { generateFile(); }
	 */
}
