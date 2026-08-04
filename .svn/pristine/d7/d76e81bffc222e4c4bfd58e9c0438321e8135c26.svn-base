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
		System.out.println("\n-------------------in updateResData-----------");
		ctstoken=request.getParameter("CTSTOKEN");
		flag=request.getParameter("flag");
		String jsonString=request.getParameter("jsonString");
		JSONArray jsonArray=new JSONArray(jsonString);
		String date=Configuration.getDDMMYYYY();
		String ddmmyy=Configuration.getDDMMYY();
		System.out.println("\n\n\ndate="+date+"=="+jsonArray.toString());
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
				String sqlUpdate = "update clearingoutward set CLO_CONVERT_FLG='N',CLO_IMG_FRNT_BW=null,CLO_IMG_BACK_BW=null,CLO_IMG_FRNT_GR=null,CLO_IMG_BACK_GR=null where CLO_ITEMSEQNO=? and"; 
				sqlUpdate=sqlUpdate+" CLO_CHQNO=? and CLO_DATE_DDMMYYYY=?";
				System.out.println(sqlUpdate);
				
				ps=con.prepareStatement(sqlUpdate);
				ps.setString(1,itemSeqNo);
				ps.setString(2,chqNo);
				ps.setString(3,date);
				ps.executeUpdate();
			}
			else
			{
				if(!status.equalsIgnoreCase("0"))
				{
					String sqlUpdate = "update clearingoutward set CLO_CONVERT_FLG='Y',CLO_XMLFILENAME=null where CLO_XMLFILENAME=? and"; 
					sqlUpdate=sqlUpdate+" CLO_DATE_DDMMYYYY=?";
					System.out.println(sqlUpdate);
					
					ps=con.prepareStatement(sqlUpdate);
					ps.setString(1,FILENAME);
					ps.setString(2,date);
					ps.executeUpdate();
					
				}	
				
			}	

		}
		//response.sendRedirect("../outward_clearing.jsp?msg=FIRSTTIME");
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
	document.getElementById("formid").action="../outward_clearing.jsp";
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