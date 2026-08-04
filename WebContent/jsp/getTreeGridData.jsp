<%@ page import="java.sql.*" %>
<%@page import="cts.*"%>
<%@page import="list.utility.CommonUtility"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileWriter"%>
<%@page import="java.io.IOException"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="java.io.StringReader"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.ResultSetMetaData"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.Properties"%>

<%@page import="jakarta.servlet.ServletException"%>
<%@page import="jakarta.servlet.http.HttpServlet"%>
<%@page import="jakarta.servlet.http.HttpServletRequest"%>
<%@page import="jakarta.servlet.http.HttpServletResponse"%>
<%@page import="jakarta.servlet.http.HttpSession"%>
<%@page import="javax.xml.parsers.DocumentBuilder"%>
<%@page import="javax.xml.parsers.DocumentBuilderFactory"%>
<%@page import="javax.xml.transform.Transformer"%>
<%@page import="javax.xml.transform.TransformerFactory"%>
<%@page import="javax.xml.transform.dom.DOMSource"%>
<%@page import="javax.xml.transform.stream.StreamResult"%>
<%@page import="org.json.JSONObject"%>
<%@page import="org.w3c.dom.Document"%>
<%@page import="org.xml.sax.InputSource"%>
<%@page import="cts.Configuration"%>
<%	
String treeStr="",retval="",str="";
String mainTreeStr="",userName="",actionflg="";
boolean isDataExist=false;
//String loginuser="";
String errorpoint="1";
java.sql.Connection cn=null;
String sessionflag="";
try{
	 String sysdate=Configuration.getDDMMYYYY();//DSP sysdate
	actionflg=request.getParameter("action");
	if(actionflg.equalsIgnoreCase("DOWNLOAD")){
		str=GetFileFromSFTP.getSFTPFileList();
	}
	else if(actionflg.equalsIgnoreCase("UPLOAD")){
		str=GetFileFromSFTP.getUploadFileList();
	}
	
if(str.equalsIgnoreCase("SUCCESS"))	{
	String query="";
	userName=session.getAttribute("session_loginid").toString();
	userName=userName+"_"+actionflg;
	cn=DbUtil.getConnection();
	errorpoint="2";
	errorpoint="3";
	
	if(actionflg.equalsIgnoreCase("DOWNLOAD")){
		/* query = "select level lvl, FILE_ID, MAIN_ID,FILE_TYPE, FILENAME, decode(DOWNLOAD_FLAG,'Y','Yes','Z','','No')DOWNLOAD_FLAG from DOWNLOADFTPFILE where DOWNLOAD_DATE in ('ROOT',to_char(sysdate,'ddmmyyyy'))";
		query=query+" start with MAIN_ID is null  connect by nocycle prior FILE_ID=MAIN_ID"; */
		query = "select level lvl, FILE_ID, MAIN_ID,FILE_TYPE, FILENAME, decode(DOWNLOAD_FLAG,'Y','Yes','Z','','No')DOWNLOAD_FLAG from "
		+"( select FILE_ID, MAIN_ID,FILE_TYPE, FILENAME, DOWNLOAD_FLAG from DOWNLOADFTPFILE where DOWNLOAD_DATE =?" //to_char(sysdate,'ddmmyyyy')
		+" union select FILE_ID, MAIN_ID,FILE_TYPE, FILENAME, DOWNLOAD_FLAG from downloadtitle)"
		+" start with MAIN_ID is null  connect by nocycle prior FILE_ID=MAIN_ID";
		
		
	}
	else if(actionflg.equalsIgnoreCase("UPLOAD")){
		/* query = "select level lvl, FILE_ID, MAIN_ID,FILE_TYPE, FILENAME, decode(UPLOAD_FLAG,'Y','Yes','Z','','No')UPLOAD_FLAG from UPLOADFILETOFTP where UPLOAD_DATE in ('ROOT',to_char(sysdate,'ddmmyyyy'))";
		query=query+" start with MAIN_ID is null  connect by nocycle prior FILE_ID=MAIN_ID"; */
		
		query = "select level lvl, FILE_ID, MAIN_ID,FILE_TYPE, FILENAME, decode(UPLOAD_FLAG,'Y','Yes','Z','','No')UPLOAD_FLAG from "
		+" ( select  FILE_ID, MAIN_ID,FILE_TYPE, FILENAME,UPLOAD_FLAG from UPLOADFILETOFTP where UPLOAD_DATE =? " //to_char(sysdate,'ddmmyyyy')
		+" union  select  FILE_ID, MAIN_ID,FILE_TYPE, FILENAME,UPLOAD_FLAG from uploadtitle ) "
		+" start with MAIN_ID is null  connect by nocycle prior FILE_ID=MAIN_ID";
	}
	
	String isSetZeroValue="y";
 
	errorpoint="4";

	PreparedStatement treeps = cn.prepareStatement(query);
	treeps.setString(1, sysdate);
	ResultSet treers=treeps.executeQuery();
	PreparedStatement treeps_1 = cn.prepareStatement(query);
	treeps_1.setString(1, sysdate);
	ResultSet treers_1=treeps_1.executeQuery();
	
	ResultSetMetaData treersmd= treers.getMetaData();
	
	errorpoint="5";
	
	treeStr = "<rows>";

	int curlevel=0;
	int nxtlevel=0;
	int itemNo=1;
	while (treers.next())
	{
		errorpoint="6";
		isDataExist=true;
		curlevel=Integer.parseInt(treers.getString(1));

		try
		{
	    	treers_1.next();
			nxtlevel=Integer.parseInt(treers_1.getString(1));
			if(itemNo==1)
			{
	    		treers_1.next();
				nxtlevel=Integer.parseInt(treers_1.getString(1));
			}
		}
		catch (Exception e1){nxtlevel=1;}
		errorpoint="7";
		treeStr =treeStr+"\n<row id="+'"'+itemNo+'"'+">";
		for(int i=2;i<=treersmd.getColumnCount();i++)
		{
		    String value=treers.getString(i);
		    if(treers.wasNull())
			{
			   value="";
			}
		    treeStr = treeStr+"\n<cell image='folder.gif' id='"+treersmd.getColumnName(i)+"'"+">"+value+"</cell>";
		}
		
		int colval=itemNo;
		 if(isSetZeroValue.equalsIgnoreCase("y")){
			 colval=0;
		   }
		 
		treeStr=treeStr+"\n<cell id=\"dummy1\">"+colval+"</cell>";
		String str_1=treeStr;
		for(int j=curlevel;j>=nxtlevel;j--)
		{
			treeStr =treeStr+"\n</row>";
		}
		str_1 =str_1+"\n</row>";	
		mainTreeStr=mainTreeStr+treeStr;
		itemNo++;
		treeStr="";
	}
	treeStr = "\n</rows>";
	mainTreeStr=mainTreeStr+treeStr;
	treers.close();
	treeps.close();
	if(!isDataExist)
	{
		mainTreeStr="null";
	}
	
try{
	
	String filesfolder= session.getServletContext().getRealPath("/");
	if(filesfolder.indexOf(".metadata") != -1)//
	{
		filesfolder=filesfolder.substring(0,filesfolder.indexOf(".metadata")-1);
		filesfolder=filesfolder+"\\CTS\\WebContent";
	}
	String treeGridFileName=filesfolder+"\\temp\\";
	
	if(!mainTreeStr.equalsIgnoreCase("null")){
		
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	    DocumentBuilder builder = factory.newDocumentBuilder();
	    Document doc = builder.parse(new InputSource(new StringReader(mainTreeStr)));

	   
	    TransformerFactory transformerFactory = TransformerFactory.newInstance();
	    Transformer transformer = transformerFactory.newTransformer();
	    DOMSource source = new DOMSource(doc);

	    StreamResult result =  new StreamResult(new File(treeGridFileName+userName+".xml"));
	    transformer.transform(source, result);
	    retval="SUCCESS";
	}
	else{
		retval="FAILED";
	}
	
	}catch(Exception e){
		e.printStackTrace();
	}
}
else{
	retval=str;
}
cn.close();
System.out.println(retval);
response.setCharacterEncoding("UTF-8");
PrintWriter outGetWriter = response.getWriter();
outGetWriter.print(retval);
outGetWriter.flush();	   
}catch(Exception e){
		
		mainTreeStr="Erro -> "+e.toString();
		e.printStackTrace();
	}
%>
