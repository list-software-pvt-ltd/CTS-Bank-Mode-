<%@ page contentType="text/html; charset=iso-8859-1" language="java"
import="java.sql.*" import="org.apache.commons.io.FileUtils"
 errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
			Connection con=Configuration.getConnection();
			System.out.println("#############	in list_ret_outward_filenames.jsp");
			String up_path = Configuration.getConfValByNm("CFG_uploadpath_to_CHI",con);
			System.out.println("up_path#########    "+up_path+"      #######");
			StringBuffer chqBuffer=new StringBuffer();
			String path = "" ;
			String fileNameList = "";
			BufferedReader br = null;
			int fileFoundCount = 0;
			String session_branch_code = (String) session.getAttribute("session_branch_code");
			System.out.println("session_branch_code="+session_branch_code);
			
			path = up_path +"ReturnOutward/";
			
			System.out.println("Path="+path);
			
			try
			{
				
				String fileNames[]=new File(path).list();
				File[] listOfFiles = new File(path).listFiles(); 
				System.out.println("fileNames.length:"+fileNames.length);
				
				for(int j=0;j<fileNames.length;j++)
				{//for
					 if(listOfFiles[j].isFile()) 
					 {
						String fileName=fileNames[j];
						fileFoundCount++;
						if(fileName.endsWith(".txt"))
						{
							System.out.println("#########in if fileName:"+fileName+"fileNames[j].length():"+fileNames[j].length());
							if(fileNames[j].length()>0)
							{
								chqBuffer.append(fileName + "#" + fileName + "$");
							}
						}
						else
						{
							System.out.println("@@@@@@@@@@in else :"+fileName);
							chqBuffer.append(fileName + "#" + fileName + "$");
						}
						
						/*fileNameList = fileName + "#" + fileName + "$";
						fileFoundCount++;
						chqBuffer.append(fileNameList);	*/
					 }
				}//for
		
			}
			catch(Exception e)
			{
				out.println("~~~~Exception  :"+e);
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