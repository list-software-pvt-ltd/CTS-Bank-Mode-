<%@ page import="java.io.*,java.util.*, jakarta.servlet.*,java.sql.*" %>
<%@ page import="cts.*" %>

<%!
String ctstoken=null;
String strRetval="",flag="";
%>

<%
	System.out.println("in getcoAck");
	
	//StringBuffer strRetval=new StringBuffer("");
	
	Connection con=Configuration.getConnection();
	int counter=0;
	String sessionNumber="",sessionDate="";
	String path=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"Oack/";
	String fileName=null;
	File f=new File(path);
	f.mkdirs();
	File[] allFiles=f.listFiles();
	ResultSet rs=null;
	Statement stmt=con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);			
	ctstoken=request.getParameter("CTSTOKEN");
	flag=request.getParameter("flag");
	System.out.println("ctstoken:"+ctstoken);
	for(File singlefile:allFiles)
	{//1
		if(singlefile.isFile() && ((singlefile.getName().contains("CXF")||singlefile.getName().contains("RRF"))&& singlefile.getName().endsWith(".OACK")))
		{//1.1
				counter++;
				System.out.println("--- 1 ----");
				//CXF_416402000_08052014_192219_01_00000004.XML.1.09052014.OACK
				fileName=singlefile.getName();	
				System.out.println("fileName:"+fileName);
				String str[]=fileName.split("_");
				System.out.println("str:"+str);
				System.out.println("str[0]:"+str[0]);
				String fileType=fileName;
				System.out.println("fileType:"+fileType);
				String clearingdate=str[2];
				System.out.println("clearingdate:"+clearingdate);
				String clearingTime=str[3];
				System.out.println("clearingTime:"+clearingTime);
				System.out.println("str[4]:"+str[4]);
				if(str[0].equalsIgnoreCase("CXF"))
				{	
					String str2[]=str[5].split("\\.");
					System.out.println("str2:"+str2);
				    sessionNumber=str2[2];
					System.out.println("sessionNumber:"+sessionNumber);
				    sessionDate=str2[3];
					System.out.println("sessionDate:"+sessionDate);
				}
				else
				{
					String str2[]=str[4].split("\\.");
					System.out.println("str2:"+str2);
					 sessionNumber=str2[2];
					System.out.println("sessionNumber:"+sessionNumber);
					 sessionDate=str2[3];
					System.out.println("sessionDate:"+sessionDate);
					
				}
				rs=stmt.executeQuery("select count(*) from oack where OACK_FILENAME='"+fileName+"'");	
				int rs_count=0;
				if(rs.next())			
				{
					rs_count=rs.getInt(1);
				}
				System.out.println("clearingdate:"+clearingdate);
				System.out.println("sessionNumber:"+sessionNumber);
				System.out.println("sessionDate:"+sessionDate);
				if(rs_count==0)
				{
					if(!(XMLReader.readOACKResponse(path,fileName,clearingdate,sessionNumber,sessionDate)))
					{//2
							strRetval="Problem To Read .OACK File.";					
					}//2
					else
					{
						strRetval="File Read Successfully.";
						
					}
				}
				else
				{
					strRetval="File already Read";
				}	
		}//1.1		
	}//1	
	String clearingBank = Configuration
			.getConfValByNm("CFG_CHI_BANKNAME",con);
	if(clearingBank.equalsIgnoreCase("AXIS"))
	{
		XMLReader.createOWExtract(path);
		strRetval="File Converted Successfully.";
	}
	 if(counter==0)
		 strRetval="There is No any Acknowledgement File at Download Path.";
	System.out.println("----- Exit From getCoAck.jsp:"+strRetval);
	//response.sendRedirect("../oackConversion.jsp?msg="+strRetval);	
%>

<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="../oackConversion.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();
}

</script>
<body onLoad="Forward()">
<form id="formid" name="formid" method="post">
	<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value="<%=ctstoken%>">
	<input type="hidden" id="msg" name="msg" value="<%=strRetval%>">
	<input type="hidden" id="flag" name="flag" value="<%=flag%>">
</form>
</body>
</html>