<%@ page contentType="text/html; charset=iso-8859-1" language="java"
import="java.sql.*" import="org.apache.commons.io.FileUtils"
 errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
			Connection cn = Configuration.getConnection();
			System.out.println("#############	in list_branches.jsp");
			String up_path = Configuration.getConfValByNm("CFG_uploadpath_to_CHI",cn);
			System.out.println("up_path#########    "+up_path+"      #######");
			StringBuffer filenamesBuffer=new StringBuffer();
			String path = "", folderName="" ;
			String fileNameList = "";
			BufferedReader br = null;
			int brnFoundCount = 0;
			PreparedStatement pst = null;
			path = up_path +"/";
			
			System.out.println("Path="+path);
			
			try
			{
				
				System.out.println("cn="+cn);
				if(cn == null)
					throw new Exception("Session is Null");
			
				String fileNames[]=new File(path).list();
				File[] listOfFiles = new File(path).listFiles(); 
				System.out.println("fileNames.length:"+fileNames.length);
				String brnName = "";
				int flength=fileNames.length;
				for(int j=0;j<flength;j++)
				{//for
					 if (listOfFiles[j].isDirectory() && !listOfFiles[j].getName().equalsIgnoreCase("ReturnOutward") && !listOfFiles[j].getName().equalsIgnoreCase("BackupClearingOutward")) 
					 {	
						brnFoundCount++;
					 	String brnNo=fileNames[j];
						String qry = "select BRM_BRNAME from BRANCHMSTR where BRM_BRNCD='"+brnNo+"' and BRM_SCANNERYN='Y'";
						pst = cn.prepareStatement(qry);
						ResultSet rs = pst.executeQuery();
						while(rs.next())
						{
							brnName = rs.getString(1);				
						}		
						if(brnName.equalsIgnoreCase(""))
						{
						
						}
						else
						{
							folderName = fileNames[j];
							//int numFolderName = Integer.parseInt(folderName); there might be a chance of NumberFormateException. // commented by abhishek. 
							
							//if(folderName)
							fileNameList = folderName + "#" + brnName + "$";
							//out.println("branch :"+fileNameList);
							filenamesBuffer.append(fileNameList);	
						}
						
					 }
				}//for
		
			}
			catch(Exception e)
			{
				//out.println("~~~~Exception  :"+e);
				System.out.println("\n\n\n\n\n\n");
				System.out.println("Exception in list_branches.jsp::::>>>"+e);
				e.printStackTrace();
				filenamesBuffer.append("NOFILES#NOFILES$");	
			}
			finally
			{
				cn.close();
			}

			
			
			if(brnFoundCount == 0)
			{
				filenamesBuffer.append("NOFILES#NOFILES$");	
			}
	 
						
%>
<%=filenamesBuffer.toString()%>