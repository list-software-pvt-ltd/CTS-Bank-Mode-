<%-- <%@page import="com.jniwrapper.e"%> --%>
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
   	
	String cycNo=request.getParameter("cyclNo");//   	
	System.out.println("\nDeleteReturnOutwardData cycNo============="+cycNo);   
    String msg="",ctstoken=null,flag="";
    int entNo=0;
	int cnt=0;
   int s=0;
   String filename="FAILED",path="",CTSTOKEN=null,fileName="";
   String archivePath="";
   Connection con=Configuration.getConnection();
   String CFG_CONTINUE_CLEARING_FLG=Configuration.getConfValByNm("CFG_CONTINUE_CLEARING_FLG",con);
   try
  	{
	   ctstoken=request.getParameter("CTSTOKEN");
	   flag=request.getParameter("flag");
	   PreparedStatement ps=null,ps1=null,ps2=null;
   	
   	 //  con.setAutoCommit(false);
       String date=Configuration.getDDMMYYYY();
	   String ddmmyy=Configuration.getDDMMYY();
	   System.out.println("\n\n\ndate="+date);
	
	   String delQry=" delete from RETRUNOUTWARD where RTO_DDMMYYYY = ? and RTO_STATUS!='D' and RTO_CONTI_CYCNO=? ";
		
			PreparedStatement pst=con.prepareStatement(delQry);
			
			pst.setString(1,date);
			pst.setString(2,cycNo);
			 System.out.println("\n delQry="+delQry);
			int c=pst.executeUpdate();
			System.out.println("c======"+c);
		//	pst.close();
		
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
		
  	// response.sendRedirect("../returnOutward_manually.jsp?msg1="+msg);	
   
%>
<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="../main.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();
}
</script>
<body onLoad="Forward()">
<form id="formid" name="formid" method="post">
	<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value="<%=ctstoken%>">
	<input type="hidden" id="msg1" name="msg1" value="<%=msg%>">
	<input type="hidden" id="flag" name="flag" value="<%=flag%>">
</form>
</body>
</html>