<%-- <%@page import="com.jniwrapper.e"%> --%>
<%@page import="org.apache.poi.util.SystemOutLogger"%>
<%@page import="java.io.File"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="cts.Configuration"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.sql.*"%>
<%@page import="java.io.*"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%
   	String jsonString=request.getParameter("jsonString");
	System.out.println("jsonString=="+jsonString);
    JSONArray jsonArray=new JSONArray(jsonString);
    String msg="",ctstoken=null,flag="";
    int entNo=0;
	int cnt=0;
   int s=0;
   
   Connection con=Configuration.getConnection();
   try
  	{
	   ctstoken=request.getParameter("CTSTOKEN");
	   flag=request.getParameter("flag");
	   
   	PreparedStatement ps=null,ps1=null,ps2=null;
   	
   	con.setAutoCommit(false);
    String updt_pps="update  PPSINTIMATIONTRNR set PIL_FILE_STATUS=? ,PIL_REC_STATUS=? where PIL_ACCNO=? and PIL_CHQNO=? and PIL_PAYEENAME=? ";
	
   for(int j=0;j<jsonArray.length();j++)
	{
		JSONObject obj=jsonArray.getJSONObject(j);
		String accNo=obj.getString("ACCNO");
		String instru=obj.getString("INSTRU");
		String amt=obj.getString("AMOUNT");
		String paynm=obj.getString("PAYNAME");
		String reason=obj.getString("REASON");
		String splitdata[]=reason.split("~");
		String  file_status=splitdata[0];
		String  res_status=splitdata[1];
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		System.out.println("accNo=="+accNo);
		System.out.println("instru=="+instru);
		System.out.println("paynm=="+paynm);
		System.out.println("reason=="+reason);
		System.out.println("file_status=="+file_status);
		System.out.println("res_status=="+res_status);
		System.out.println("***********************************************");
			ps2=con.prepareStatement(updt_pps);
			ps2.setString(1,file_status);
			ps2.setString(2,res_status);
			ps2.setString(3,accNo);
			ps2.setString(4,instru);
			ps2.setString(5,paynm);
			
			s=ps2.executeUpdate();
			
		}
  		 System.out.println("S=="+s);
   		if(s>0)
   		{
   			msg="SUCCESS";
   			
   			con.commit();
   			ps2.close();
			con.close();
   		}
   		else
   		{
   			msg="FAILED";
   			con.rollback();
   		}
	}
   catch(SQLException e)
    {       
 	 //con.close();
 	 		con.rollback();
			e.printStackTrace();
			msg="SqlException in Saving!";
     }
    catch(Exception j)
     {      
			//con.close();
			con.rollback();
			j.printStackTrace();
			msg="Exception in Saving!";
     }
		
   
%>
<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="../read_issuance_file_manually.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();
}

</script>
<body onLoad="Forward()">
<form id="formid" name="formid" method="post">
	<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value="<%=ctstoken%>">
	<input type="hidden" id="retStr" name="retStr" value="<%=msg%>">
	<input type="hidden" id="flag" name="flag" value="<%=flag%>">
</form>
</body>
</html>