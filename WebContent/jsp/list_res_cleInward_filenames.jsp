<%@ page import="java.io.*,java.util.*, jakarta.servlet.*,java.sql.*" %>
<%@ page import="java.sql.PreparedStatement,java.sql.ResultSet,java.sql.SQLException,org.json.*"%>
<%@ page import="cts.*" %>


<%
	Connection con=Configuration.getConnection();
	String path=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"ReturnInward/";
	System.out.println(path);
	String fileName=null;
	File f=new File(path);
	f.mkdirs();
	File[] allFiles=f.listFiles();
	System.out.println("allFiles==="+allFiles.length);
	StringBuffer strRetval=new StringBuffer("");
	JSONObject MainjObj = new JSONObject();
	
	JSONArray jsonArr=new JSONArray();
	
	int counter=0;	
	int fileCount=0;
	for(File singlefile:allFiles)
	{//1
		fileCount++;
		System.out.println("-----fileCount---"+fileCount+"====="+singlefile.getName());
		if(singlefile.isFile() && singlefile.getName().contains("BRF") && (singlefile.getName().endsWith(".XML") ||singlefile.getName().endsWith(".xml")||singlefile.getName().endsWith(".xlsx")||singlefile.getName().endsWith(".XLSX")||singlefile.getName().endsWith(".xls")||singlefile.getName().endsWith("XLS")))
		{//1.1	
				JSONObject jsonObj = new JSONObject();
				fileName=singlefile.getName();	
				System.out.println("fileName:"+fileName);
				jsonObj.put("FILENAME", fileName);
				jsonArr.put(jsonObj);
				
		}//1.1	

	}
	if(fileCount>0)
	{
		
		MainjObj.put("data",jsonArr);
		MainjObj.put("RETCODE","0");
	}
	else
	{
		MainjObj.put("RETCODE","1");
	}
	System.out.println("----- Exit From reponseFileRead.jsp:"+MainjObj);
%>
<%=MainjObj.toString()%>