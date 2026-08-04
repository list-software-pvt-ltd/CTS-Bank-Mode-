<%@ page import="java.io.*,java.util.*, jakarta.servlet.*,java.sql.*" %>
<%@ page import="cts.*" %>

<%
	Connection con=Configuration.getConnection();
	String path=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"ResponseFiles/";
	System.out.println(path);
	String fileName=null;
	File f=new File(path);
	f.mkdirs();
	File[] allFiles=f.listFiles();
	StringBuffer strRetval=new StringBuffer("");
	
	int counter=0;	
	int fileCount=0;
	for(File singlefile:allFiles)
	{//1
		fileCount++;
		//stem.out.println("-----fileCount---"+fileCount);
		if(singlefile.isFile() && (singlefile.getName().contains("CXF")||singlefile.getName().contains("RRF")) && singlefile.getName().endsWith(".RES"))
		{//1.1		
				fileName=singlefile.getName();	
				System.out.println("fileName:"+fileName);
				String retVal="";
				//readResponseFile return false if any exception is raise else return true.
				if(!(XMLReader.readResponseFile(path,fileName)))
				{//2
						retVal=XMLReader.err_string;
						strRetval.append(retVal+"#");
				}//2
				else
				{//2
						strRetval.append("SUCCESS#");
				}//2
		}//1.1	
		else
		{//1.1
			strRetval.append("There is No any Response File at Download Path");
		}//1.1	
	}//1	
	if(fileCount==0)
	{
		strRetval.append("There is No any Response File at Download Path#");
		//System.out.println("-----fileCount---"+fileCount);
	}
	System.out.println("----- Exit From reponseFileRead.jsp:"+strRetval);
%>
<%=strRetval%>