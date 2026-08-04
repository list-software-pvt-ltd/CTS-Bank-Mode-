package cts;

import java.io.File;
import java.io.FileOutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Scanner;

import org.apache.commons.io.FileUtils;

public class RenameImg {
	public static void main(String args[])
	{
		String db_ip = "", sid = "", port = "", db_user = "", db_pwd = "";
		try
		{
			db_ip = "localhost";
			sid = "xe";
			port = "1521";
			db_user = "CTS";
			db_pwd = "list";
			//System.out.println("jdbc:oracle:thin:@" + db_ip+ ":" + port + ":" + sid);
			Class.forName("oracle.jdbc.driver.OracleDriver");
			Connection con = con = DriverManager.getConnection("jdbc:oracle:thin:@" + db_ip
					+ ":" + port + ":" + sid, db_user, db_pwd);
			System.out.println("Connection Sucessful"+con);
			Scanner sc=new Scanner(System.in);
			System.out.println("Enter your Inward date (ddmmyyyy)");
			int date=sc.nextInt();
   			System.out.println("Inward date="+date);
   			String query="select * from clearinginward where cli_ddmmyyyy=?";
   			PreparedStatement ps=con.prepareStatement(query);
			ps.setInt(1,date);
			ResultSet rs=ps.executeQuery();
			String ClgInwImgPath=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", con);
			String sourcePath=ClgInwImgPath+"/ClearingInward/Images/";
			String destinationePath=ClgInwImgPath+"/ClearingInward/NewImages/";
			new File(destinationePath).mkdirs();
			while (rs.next()) {
				String ItemSeqNo1= rs.getString("CLI_ITEMSEQUENCENO");
				String ItemSeqNo=Configuration.lPad(ItemSeqNo1.substring(ItemSeqNo1.length()-10),14,"0");
				String jpgImgName=rs.getString("CLI_IMAGEFILE3");
				File s=new File(sourcePath+jpgImgName+".jpg");
				File d=new File(destinationePath+"/G"+ItemSeqNo+".jpg");
			
				FileUtils.copyFile(s, d);
				String ftiffImgName=rs.getString("CLI_IMAGEFILE1");//CLI_IMAGEFILE1, CLI_IMAGEFILE2
				File s1=new File(sourcePath+ftiffImgName+".tif");
				File d1=new File(destinationePath+"/F"+ItemSeqNo+".tif");
				//s1.renameTo(d1);
				FileUtils.copyFile(s1, d1);
				
				String rtiffImgName=rs.getString("CLI_IMAGEFILE2");//CLI_IMAGEFILE1, CLI_IMAGEFILE2
				File s2=new File(sourcePath+rtiffImgName+".tif");
				File d2=new File(destinationePath+"/R"+ItemSeqNo+".tif");
				//s2.renameTo(d2);
				FileUtils.copyFile(s2, d2);
				
				//s.renameTo(d);
			}
			rs.close();
			ps.close();
			con.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();

		}
	}
}
