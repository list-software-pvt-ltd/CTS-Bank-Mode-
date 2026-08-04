	<%@ page contentType="text/html; charset=iso-8859-1" language="java"
	import="java.sql.*" import="org.apache.commons.io.FileUtils" errorPage="" %>
	<%@page import="java.util.*"%>
	<%@page import="java.io.*"%>
	<%@page import="cts.*"%>
	<%@page import="org.json.JSONArray" %>
	<%@page import="org.json.JSONException" %>
	<%@page import="org.json.JSONObject" %>
	
 
	<%
	
		System.out.println("############# fetch all      DELETE CLEARING OUTWARD.jsp");
		int cntfrrtvl=0;
		String fileNameList = "";
		String brncd="";
		String retStr="";
		int brnFoundCount = 0;
		PreparedStatement pst = null;
		
		String msg="",amount="",sortCode="",tranCode="",cheqNo="",ctstoken="",flag="";
		String res=null,frdate=null,cltype=null,whattodo=null,xmlfile=" ";
			
		int i=0,j=0;
		StringBuffer thisBuffer=new StringBuffer();
		
		String query="";
		JSONArray listTrans = new JSONArray();
		JSONObject dataset = new JSONObject();
		
		try
		{
			Connection cn = Configuration.getConnection();//(Connection)session.getAttribute("session_connection");
			System.out.println("cn============================="+cn);
			if(cn == null)
			throw new Exception("Session is Null");
			cltype=request.getParameter("clearingtype");
			ctstoken=request.getParameter("CTSTOKEN");
			flag=request.getParameter("flag");
			frdate=request.getParameter("frdate");
			whattodo=request.getParameter("whattodo");//whattodo
			System.out.println("############# whattodo"+whattodo);
			brncd=request.getParameter("branch_code");
			try
			{
				xmlfile=request.getParameter("xmlfilename");
			}
			catch(Exception e1)
			{
				xmlfile="NA";
			}
			if(whattodo.equalsIgnoreCase("FF"))
			{
				query="select distinct nvl(RTO_XMLFILENAME, 'NOT RETURNED YET') from RETRUNOUTWARD where RTO_CLEARINGTYPE='"+cltype+"' and RTO_DDMMYYYY='"+frdate+"'";
				System.out.println(query);
				PreparedStatement ps=cn.prepareStatement(query);
				//ps.setString(1,frdate);
				//ps.setString(2,cltype);
				
				System.out.println("############# cltype"+cltype+"---");
				System.out.println("############# frdate"+frdate+"---");
				System.out.println("############# query"+query+"---");
				System.out.println("############# query"+query+"---");
				//ps.setString(3,Configuration.getDDMMYYYY());
				//ps.setString(4,Configuration.getDDMMYYYY());
				ResultSet rs=ps.executeQuery();
				
				i=1;
				System.out.println("#############");
				while(rs.next())
				{
					thisBuffer.append(rs.getString(1)+"~");
					cntfrrtvl++;
				}
				if(cntfrrtvl>0)
				{
					dataset.put("RESPCODE", "0");
					dataset.put("RETVAL", thisBuffer.toString());
				}
				else
				{
					dataset.put("RESPCODE", "1");
					dataset.put("RETVAL", "FAIL");
				}
				System.out.println(dataset.toString());				
				out.println(dataset.toString());
			}
			else if(whattodo.equalsIgnoreCase("S"))
			{
				if(xmlfile.equalsIgnoreCase("NOT RETURNED YET"))
					query="select * from RETRUNOUTWARD where RTO_DDMMYYYY='"+frdate+"' and  RTO_STATUS<>'D' and  RTO_CLEARINGTYPE='"+cltype+"'";
				else
					query="select * from RETRUNOUTWARD where RTO_DDMMYYYY='"+frdate+"' and  RTO_CLEARINGTYPE='"+cltype+"' and RTO_XMLFILENAME='"+xmlfile+"'";
				//System.out.println(query);
				PreparedStatement ps=cn.prepareStatement(query);
				//ps.setString(1,frdate);
				//ps.setString(2,cltype);
				
				System.out.println("############# cltype"+cltype+"---");
				System.out.println("############# frdate"+frdate+"---");
				System.out.println("############# query"+query+"---");
				System.out.println("############# query"+query+"---");
				//ps.setString(3,Configuration.getDDMMYYYY());
				//ps.setString(4,Configuration.getDDMMYYYY());
				ResultSet rs=ps.executeQuery();
						
				i=1;
				System.out.println("#############");
				while(rs.next())
				{
					System.out.println("############# query"+rs.getString("RTO_BOFD"));
					//System.out.println("IN WHILE ............");
					JSONObject obj = new JSONObject();
					//RTO_BOFD, RTO_CHEQUENO, RTO_SORTCODE, RTO_TRANSACTIONCODE, RTO_AMOUNT, RTO_ACCOUNTNUMBER, RTO_RETURNREASONCODE
					obj.put("RTO_BOFD", rs.getString("RTO_BOFD"));
					obj.put("RTO_CHEQUENO", rs.getString("RTO_CHEQUENO")); 
					obj.put("RTO_SORTCODE", rs.getString("RTO_SORTCODE"));
					obj.put("RTO_TRANSACTIONCODE", rs.getString("RTO_TRANSACTIONCODE"));
					obj.put("RTO_AMOUNT", rs.getString("RTO_AMOUNT"));
					obj.put("RTO_ACCOUNTNUMBER", rs.getString("RTO_ACCOUNTNUMBER"));
					obj.put("RTO_RETURNREASONCODE", rs.getString("RTO_RETURNREASONCODE"));
					obj.put("RTO_CLEARINGTYPE",rs.getString("RTO_CLEARINGTYPE"));
					listTrans.put(obj);
					i++;	
					cntfrrtvl++;
				}
				
				if(cntfrrtvl!=0)
				{
				dataset.put("RETVAL", listTrans);
				dataset.put("RESPCODE", cntfrrtvl);
				}
				else
				{
				dataset.put("RESPCODE", cntfrrtvl);
				}
				System.out.println(dataset.toString());				
				out.println(dataset.toString());
				
		}
		else if(whattodo.equalsIgnoreCase("D"))
		{
			frdate=request.getParameter("datepicker");
			frdate=frdate.replace("-", "");
			String vals=request.getParameter("VALS");
			JSONArray array=new JSONArray(vals);			  
			query="delete from RETRUNOUTWARD where RTO_DDMMYYYY=? and RTO_CHEQUENO=? and  RTO_SORTCODE=? and RTO_TRANSACTIONCODE=? and RTO_AMOUNT=? and RTO_STATUS<>'D' and  RTO_CLEARINGTYPE=?";
			PreparedStatement ps1=cn.prepareStatement(query);
			int  saveFlag=0;
			//saveFlag=ps1.executeUpdate();
			  for(int m=0;m<array.length();m++)
			  {
				JSONObject obj=array.getJSONObject(m);
				amount=Configuration.lPad(obj.getString("Amount"),18,"0");
				cheqNo=obj.getString("ChequeNo");
				sortCode=obj.getString("SortCode");
				tranCode=obj.getString("TranCode");
				System.out.println(amount+"==="+cheqNo+"=="+sortCode+"==="+tranCode+"=="+frdate+"=="+cltype);
				ps1.setString(1, frdate);
				ps1.setString(2,cheqNo );
				ps1.setString(3, sortCode);
				ps1.setString(4,tranCode );
				ps1.setString(5, amount);
				ps1.setString(6,cltype );
					
				saveFlag=ps1.executeUpdate();
			  }
			
			if(saveFlag>0)
			{   
				/* dataset.put("RESPCODE", "0");
				dataset.put("RETVAL", "SUCCESS"); */
				retStr="SUCCESS";
			}
			else
			{   
				/* dataset.put("RESPCODE", "1");
				dataset.put("RETVAL", "FAIL"); */
				retStr="FAIL";
			}
			//out.println(dataset.toString());  
			//response.sendRedirect("../deletereturnoutwardfrdate.jsp?msg="+retStr);
		}
		else if(whattodo.equalsIgnoreCase("U"))
		{
			frdate=request.getParameter("datepicker");
			frdate=frdate.replace("-", "");
			xmlfile=request.getParameter("filename");
			String vals=request.getParameter("VALS");
			JSONArray array=new JSONArray(vals);
			query="update RETRUNOUTWARD set RTO_STATUS='Y',RTO_XMLFILENAME='' where RTO_DDMMYYYY=? and RTO_CHEQUENO=? and  RTO_SORTCODE=? and RTO_TRANSACTIONCODE=? and RTO_AMOUNT=? and RTO_STATUS='D' and  RTO_CLEARINGTYPE=? and RTO_XMLFILENAME=?";
			
			PreparedStatement ps1=cn.prepareStatement(query);
			int  saveFlag=0;
			System.out.println(query);
			  for(int m=0;m<array.length();m++)
			  {
				JSONObject obj=array.getJSONObject(m);
				amount=Configuration.lPad(obj.getString("Amount"),18,"0");
				cheqNo=obj.getString("ChequeNo");
				sortCode=obj.getString("SortCode");
				tranCode=obj.getString("TranCode");
				//CLO_CHQNO, CLO_SORTCD, CLO_TRANCD, CLO_AMOUNT
				ps1.setString(1, frdate);
				ps1.setString(2,cheqNo );
				ps1.setString(3, sortCode);
				ps1.setString(4,tranCode );
				ps1.setString(5, amount);
				ps1.setString(6,cltype );
				ps1.setString(7, xmlfile);
				System.out.println(frdate);
				System.out.println(cheqNo );
				System.out.println( sortCode);
				System.out.println(tranCode );
				System.out.println( amount);
				System.out.println(cltype );
				System.out.println( xmlfile);
						 
				saveFlag=ps1.executeUpdate();
			  }
			if(saveFlag>0)
			{   
				retStr="SUCCESS";
			}
			else
			{   
				retStr="FAIL";
			}
			//out.println(dataset.toString());  
			//response.sendRedirect("../deletereturnoutwardfrdate.jsp?msg="+retStr);
		}
		cn.close();
	}
	catch(Exception e)
	{
		//out.println("~~~~Exception  :"+e);
		System.out.println("\n\n\n\n\n\n");
		System.out.println("Exception in list_branches.jsp::::>>>"+e);
		e.printStackTrace();
		if(e.getMessage().indexOf("Session is Null")>-1)
		{
			thisBuffer.append("SessionIsNull");	
		}
		else
		{
			thisBuffer.append("ERR#ERR$"+e);		
		}	
	}					
%>
<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="../deletereturnoutwardfrdate.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();
}

</script>
<body onLoad="Forward()">
<form id="formid" name="formid" method="post">
	<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value="<%=ctstoken%>">
	<input type="hidden" id="msg" name="msg" value="<%=retStr%>">
	<input type="hidden" id="flag" name="flag" value="<%=flag%>">
</form>
</body>
</html>