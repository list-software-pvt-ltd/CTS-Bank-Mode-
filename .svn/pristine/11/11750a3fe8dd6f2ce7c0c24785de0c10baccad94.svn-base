<%@ page contentType="text/html; charset=iso-8859-1" language="java"
import="java.sql.*" import="org.apache.commons.io.FileUtils"
 errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
			Connection con=Configuration.getConnection();
			System.out.println("#############	in list_ret_inward_filenames.jsp");
			String down_path = Configuration.getConfValByNm("CFG_downloadpath_from_CHI",con);
			System.out.println("down_path#########    "+down_path+"      #######");
			StringBuffer chqBuffer=new StringBuffer();
			String path = "" ;
			String fileNameList = "";
			BufferedReader br = null;
			int fileFoundCount = 0;
			
			path = down_path +"/Oack/";
			
			System.out.println("Path="+path);
			
			try
			{
				
				String fileNames[]=new File(path).list();
				File[] listOfFiles = new File(path).listFiles(); 
				System.out.println("fileNames.length:"+fileNames.length);
				
				for(int j=0;j<fileNames.length;j++)
				{//for
					 if (listOfFiles[j].isFile()) 
					 {
						String fileName=fileNames[j];
						fileNameList = fileName + "#" + fileName + "$";
						fileFoundCount++;
						if(fileName.endsWith(".txt"))
						{
							if(listOfFiles[j].length()>0)
							{
								chqBuffer.append(fileNameList);	
							}	
						}
						else
						{
							chqBuffer.append(fileNameList);	
						}
					 }
				}//for
		
			}
			catch(Exception e)
			{
				System.out.println("~~~~Exception  :"+e);
			}
			finally
			{
				con.close();				
			}

			
			
			if(fileFoundCount == 0)
			{
				chqBuffer.append("NOFILES#NOFILES$");	
			}
	 
						
%>
<%=chqBuffer.toString()%>