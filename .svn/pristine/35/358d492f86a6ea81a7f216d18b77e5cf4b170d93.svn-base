<%@page import="java.io.*"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="cts.Configuration"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%!
String ctstoken=null,flag="";
%>
<%
	
	try
	{
		flag=request.getParameter("flag");
		 ctstoken=request.getParameter("CTSTOKEN");
		String jsonString=request.getParameter("jsonString");
		JSONArray jsonArray=new JSONArray(jsonString);
		String date=Configuration.getDDMMYYYY();
		String ddmmyy=Configuration.getDDMMYY();
		System.out.println("\n\n\ndate="+date);
		PreparedStatement ps=null;
		Connection con=Configuration.getConnection();
		String chqNo="",itemSeqNo="",status="",FILENAME="";
		
		for(int j=0;j<jsonArray.length();j++)
		{
			JSONObject obj=jsonArray.getJSONObject(j);
			if(obj.has("CHQNO"))
			{
				 chqNo=obj.getString("CHQNO");
			}
			if(obj.has("FILENAME"))
			{
				 FILENAME=obj.getString("FILENAME");
			}
			if(obj.has("ITEMSEQNO"))
			{
				itemSeqNo=obj.getString("ITEMSEQNO");
			}
			if(obj.has("STATUS"))
			{
				 status=obj.getString("STATUS");
			}
			if(Integer.parseInt(status) >6)
			{
				String sqlUpdate = "update RETRUNOUTWARD set RTO_STATUS='Y', RTO_XMLFILENAME= null where RTO_DDMMYYYY=? and  RTO_CHEQUENO=? and RTO_XMLFILENAME=? and RTO_CHEQUENO=(select CLI_SERIALNO from CLEARINGINWARD where CLI_ITEMSEQUENCENO=? and CLI_DDMMYYYY= ?)"; 
				System.out.println(sqlUpdate);
				
				ps=con.prepareStatement(sqlUpdate);
				ps.setString(1,date);
				ps.setString(2,chqNo);
				ps.setString(3,FILENAME);
				ps.setString(4,itemSeqNo);
				ps.setString(5,date);
				ps.executeUpdate();
			}
			else
			{
				if(!status.equalsIgnoreCase("0"))
				{
					String sqlUpdate = "update RETRUNOUTWARD set RTO_STATUS='Y', RTO_XMLFILENAME= null where RTO_DDMMYYYY=? and RTO_XMLFILENAME=? "; 
					System.out.println(sqlUpdate);
					
					ps=con.prepareStatement(sqlUpdate);
					ps.setString(1,date);
					ps.setString(2,FILENAME);
					ps.executeUpdate();
				}
				
			}

		}
		//response.sendRedirect("../return_outward.jsp");
	}
	catch(Exception e)
	{
		e.printStackTrace();
		System.out.println();
		Configuration.writeLog(e+"");
	}
%>
<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="../return_outward.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();
}

</script>
<body onLoad="Forward()">
<form id="formid" name="formid" method="post">
	<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value="<%=ctstoken%>">
	<input type="hidden" id="msg" name="msg" value="FIRSTTIME">
	<input type="hidden" id="flag" name="flag" value="<%=flag%>">
</form>
</body>
</html>