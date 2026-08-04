package cts;
import java.io.*;
public class FileOperation
{//FileOperation
	private static FileInputStream inputStream;
	private static FileOutputStream outputStream;
	public static boolean writeFile(String fileName,String filePath)
	{//writeFile
			System.out.println("inside writeFile() fileName:"+fileName	+"filePath:"+filePath);
			boolean flg=false;
			try
			{
					String file=filePath+fileName;
					inputStream=new FileInputStream(file);

			}
			catch(FileNotFoundException e)
			{
				System.out.println("FileNotFoundException=>FileOperation:writeFile="+e);
			}
			catch(Exception e)
			{
				System.out.println("Exception=>FileOperation:writeFile="+e);
			}
			return flg;
	}//writeFile
}//FileOperation