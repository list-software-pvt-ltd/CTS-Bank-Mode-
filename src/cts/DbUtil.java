package cts;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;


public class DbUtil 
{

	    	public static Connection getConnection() {// 2/
	    		Connection con = null;
	    		String db_ip = "", sid = "", port = "", db_user = "", db_pwd = "";
	    		try {// 3
	    			Properties prop = new Properties();
	    			InputStream inputStream = DbUtil.class.getClassLoader()
	    					.getResourceAsStream("common.properties");
	    			prop.load(inputStream);
	    			db_ip = prop.getProperty("DATABASE_IP");
	    			sid = prop.getProperty("SID");
	    			port = prop.getProperty("PORT");
	    			db_user = prop.getProperty("DBUSER");
	    			db_pwd = prop.getProperty("DBPASSWORD");
	    			
	    			//System.out.println("jdbc:oracle:thin:@" + db_ip+ ":" + port + ":" + sid+"   "+db_user+"   "+db_pwd);
	    			db_ip=ListEncryption.decryptData(db_ip);
	    			port=ListEncryption.decryptData(port);
	    			sid=ListEncryption.decryptData(sid);
	    			db_user=ListEncryption.decryptData(db_user);
	    			db_pwd=ListEncryption.decryptData(db_pwd);
	    			//System.out.println("jdbc:oracle:thin:@" + db_ip+ ":" + port + ":" + sid+"   "+db_user+"   "+db_pwd);
	    			Class.forName("oracle.jdbc.driver.OracleDriver");
	    			con = DriverManager.getConnection("jdbc:oracle:thin:@" + db_ip
	    					+ ":" + port + ":" + sid, db_user, db_pwd);
	    		}
	    		catch (FileNotFoundException e1) 
	    		{
	    			e1.printStackTrace();
	    	
	    		}
	    		catch (Exception e) {
	    			e.printStackTrace();	
	    		}
	    		return con;
	    	}
	    	
	    	public static Connection getPolyConnection() {
	    		Connection connection = null;
	    		if (connection != null)
	    			return connection;
	    		else {
	    			try {
	    				Properties prop = new Properties();
	    				InputStream inputStream = DbUtil.class.getClassLoader()
	    						.getResourceAsStream("/usrvalidation.properties");
	    				prop.load(inputStream);
	    				String driver = prop.getProperty("driver");
	    				String url = prop.getProperty("url");
	    				String user = prop.getProperty("user");
	    				String password = prop.getProperty("password");

	    				Class.forName(driver);
	    				connection = DriverManager.getConnection(url, user, password);
	    			} catch (ClassNotFoundException e) {
	    				e.printStackTrace();
	    			} catch (SQLException e) {
	    				e.printStackTrace();
	    			} catch (FileNotFoundException e) {
	    				e.printStackTrace();
	    			} catch (IOException e) {
	    				e.printStackTrace();
	    			}
	    			return connection;
	    		}
	    	}
}
