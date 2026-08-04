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
System.out.println("jsonString"+jsonString);
   JSONArray jsonArray=new JSONArray(jsonString);
   String msg="";
   int s;
   PreparedStatement ps=null,ps1=null;
   Connection con=Configuration.getConnection();
    String date=Configuration.getDDMMYYYY();
	String ddmmyy=Configuration.getDDMMYY();
	System.out.println("\n\n\ndate="+date);
  try
	{
   for(int j=0;j<jsonArray.length();j++)
	{
		JSONObject obj=jsonArray.getJSONObject(j);
		String tranCode=obj.getString("CLO_TRANCD");
		String branchcode=obj.getString("CLO_BRANCH_CD");
		String cheqno=obj.getString("CLO_CHQNO");
		String sortcode=obj.getString("CLO_SORTCD");
		String amount=obj.getString("CLO_AMOUNT");
		String payeeacno=obj.getString("CLO_PAYEE_ACCNO");
		String payeeacnm=obj.getString("CLO_PAYEE_ACCNM");
		String draweeacno=obj.getString("CLO_DRAWEE_ACCNO");
		String clotype=obj.getString("CLO_CLEARINGTYPE");
		if(clotype.equalsIgnoreCase("CTS"))
		{
			clotype="01";
		}
		else if (clotype.equalsIgnoreCase("Non CTS")){
			clotype="02";
		}
		String itemSeqNo=obj.getString("CLO_ITEMSEQNO");
		
		String manenrty=obj.getString("CLO_MANENTRY");
		System.out.println("\n\n\nmanenrty="+manenrty);
		if(manenrty.equalsIgnoreCase("Y"))
		{
		String query="UPDATE CLEARINGOUTWARD set";
			query+=" CLO_TRANCD=?,CLO_BRANCH_CD=?,CLO_CHQNO=?,CLO_SORTCD=?,CLO_AMOUNT=?,CLO_PAYEE_ACCNO=?,CLO_PAYEE_ACCNM=?,CLO_DRAWEE_ACCNO=?,CLO_CLEARINGTYPE=?,CLO_MANENTRY=?";
			query+=" where trim(CLO_ITEMSEQNO)=? and CLO_DATE_DDMMYYYY=?";// instr(UPPER(CLO_PAYEE_ACCNM),upper(?))>0
			System.out.println(query);
			ps=con.prepareStatement(query);
			ps.setString(1,tranCode);
			ps.setString(2,branchcode);
			ps.setString(3,cheqno);
			ps.setString(4,sortcode);
			ps.setString(5,amount);
			ps.setString(6,payeeacno);
			ps.setString(7,payeeacnm);
			ps.setString(8,draweeacno);
			ps.setString(9,clotype);
			
			ps.setString(10,manenrty);
			//where clause
			ps.setString(11,itemSeqNo.trim());
			ps.setString(12,date);
			ps.executeUpdate();
			ps.close();
		}
		else{
		String	query1 = "insert into CLEARINGOUTWARD(CLO_TRANCD,CLO_BRANCH_CD,CLO_CHQNO,CLO_SORTCD,CLO_AMOUNT,CLO_PAYEE_ACCNO,CLO_PAYEE_ACCNM,CLO_DRAWEE_ACCNO,CLO_CLEARINGTYPE,CLO_MANENTRY,CLO_DATE_DDMMYYYY,CLO_ITEMSEQNO)values(?,?,?,?,?,?,?,?,?,?,?,?)";
		ps1 = con.prepareStatement(query1);
			ps1.setString(1,tranCode);
			ps1.setString(2,branchcode);
			ps1.setString(3,cheqno);
			ps1.setString(4,sortcode);
			ps1.setString(5,amount);
			ps1.setString(6,payeeacno);
			ps1.setString(7,payeeacnm);
			ps1.setString(8,draweeacno);
			ps1.setString(9,clotype);
			ps1.setString(10,"Y");
			ps1.setString(11,date);
			ps1.setString(12,itemSeqNo.trim());
			
			s = ps1.executeUpdate();
		
			ps1.close();
		}
		msg="UPDATESUCCESS";
		}
		con.close();
		}
     
	 
    catch(SQLException e)
    {       
 	 //con.close();
			e.printStackTrace();
			msg="SqlException";
     }
    catch(Exception j)
     {      
			//con.close();
			j.printStackTrace();
			msg="Exception";
     }
		
	
   
%>
<%=msg.toString()%>