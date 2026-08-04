package cts;
import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;
public class DatabaseBackup
{

		public static void main(String...args)
		{
				//runCommand();
		}
		public static void runCommand(String folder)
		{
			System.out.println("DatabaseBackup--runCommand ---folder =" + folder);
			String db_ip = "", sid = "", port = "", db_user = "", db_pwd = "";
			try {// 3
				Properties prop = new Properties();
				InputStream inputStream = Configuration.class.getClassLoader()
						.getResourceAsStream("/common.properties");
				prop.load(inputStream);
				db_ip = prop.getProperty("DATABASE_IP");
				sid = prop.getProperty("SID");
				port = prop.getProperty("PORT");
				db_user = prop.getProperty("DBUSER");
				db_pwd = prop.getProperty("DBPASSWORD");
				
				db_ip=ListEncryption.decryptData(db_ip);
				port=ListEncryption.decryptData(port);
				sid=ListEncryption.decryptData(sid);
				db_user=ListEncryption.decryptData(db_user);
				db_pwd=ListEncryption.decryptData(db_pwd);
			}// 3
			catch (FileNotFoundException e1) {// 3
				System.out.println("Can not find config_cts.ini" + e1);
				// System.exit(1);
			}// 3
			catch (Exception e) {// 3
				// Catch exception if any
				System.err.println("Error: " + e.getMessage());
				// System.err.println("Error while reading config_bkup.ini ");
				// System.exit(1);
			}// 3
			try
			{
				Connection con=Configuration.getConnection();
				String filePath=Configuration.getConfValByNm("CFG_ARCDOWNLOADPATH_FROM_CHI",con)+folder+"/DatabaseBackup/";
				System.out.println("File Path:"+filePath);
				new File(filePath).mkdirs();
				String dumpFileName="CTS"+Configuration.getDDMMYYYY();
				System.out.println("dumpFileName::>>>"+dumpFileName);
				String dumpFilePath="file="+filePath+dumpFileName+".dmp" ;
				String logFilePath="log="+filePath+dumpFileName+".log" ;
				PrintWriter fout=new PrintWriter("CtsDBBackup.bat");
				fout.println("exp '"+db_user+"/"+db_pwd+"@"+db_ip+":"+port+"/"+sid+"' "+dumpFilePath+" "+logFilePath);
				//fout.println("exp "+db_user+"/"+db_pwd+"@"+sid+" "+dumpFilePath+" "+logFilePath);
				System.out.println("exp '"+db_user+"/"+db_pwd+"@"+db_ip+":"+port+"/"+sid+"' "+dumpFilePath+" "+logFilePath);
				fout.println("pause;");
				fout.flush();
				fout.close();
				Thread.sleep(5000);
				String cmds[] = {"CtsDBBackup.bat"};
				Runtime runtime = Runtime.getRuntime();
				Process process = runtime.exec(cmds);
				Thread.sleep(5000);
				System.out.println("----- DatabaseBackup taken -----");
				con.close();
			}
			catch(Exception e)
			{
					System.out.println("Exception in runCommand(): "+e);
			}
		}
}//DatabaseBackup