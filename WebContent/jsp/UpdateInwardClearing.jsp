<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="java.lang.String.*"%>
<%@page import="java.util.Date.*"%>
<%@ page import="java.io.*,java.util.*"%> 
<%@page import="list.utility.CommonUtility"%>
<%@page import="cts.Configuration"%>
<%
	 	
	Connection con=null;
	String sort_code="",tran_code="",item_seqno="",full_line="",cli_payeename="",cli_instrudate="";
	String query="",update_qry="";
	String finalstr="",str1="",str2="",str3="",str4="",cbs_vendor="";
	String output="";
	try
	{
	//	System.out.println("Parameters Read");
		try
		{
			//con=(Connection)session.getAttribute("session_connection");   
			con=Configuration.getConnection(); 
			cbs_vendor=Configuration.getConfValByNm("CFG_CBS_VENDOR",con);
			String CFG_PPS_CONNECTED=Configuration.getConfValByNm("CFG_PPS_CONNECTED",con);
			sort_code=request.getParameter("sort_code");
			tran_code=request.getParameter("tran_code");
			item_seqno=request.getParameter("item_seqno");
			cli_payeename=request.getParameter("cli_payeename");
			cli_instrudate=request.getParameter("cli_instrudate");
			System.out.println("FAIL_NO_BRF_FILE_AVAILABLE");
			
			//System.out.println("sort_code="+sort_code+"=tran_code="+tran_code+"=item_seqno="+item_seqno+"=cli_payeename="+cli_payeename);
			query="select CLI_FULLLINE from CLEARINGINWARD where CLI_CLRSRNO="+item_seqno+" and CLI_DDMMYYYY=?";//to_char(sysdate,'ddmmyyyy')
			PreparedStatement ps=con.prepareStatement(query);
			ps.setString(1, Configuration.getDDMMYYYY());//DSP sysdate
			ResultSet rs=ps.executeQuery();
			if(rs.next())
			{
				full_line=rs.getString(1);
			}
			ps.close();
			rs.close();
			if(cbs_vendor.equalsIgnoreCase("FINACLE"))
			{
				System.out.println("fullline===="+full_line);
				int lineLength=full_line.length();
				full_line = full_line.replace("|", "~");
				String Data[] = full_line.split("~");
				tran_code=Configuration.lPad("" + Integer.parseInt(tran_code),2,"0");
				if(CFG_PPS_CONNECTED.equalsIgnoreCase("Y"))
				{
				finalstr=Data[0]+"|"+Data[1]+"|"+Data[2]+"|"+cli_instrudate+"|"+Data[4]+"|"+Data[5]+"|"+Data[6]+"|"+tran_code
						+"|||"+cli_payeename+"|N||"+Data[13]+"|"+Data[14]+"|"+Data[15];
				}
				else {
					finalstr=Data[0]+"|"+Data[1]+"|"+cli_instrudate+"|"+Data[3]+"|"+Data[4]+"|"+Data[5]+"|"+tran_code
							+"|||"+cli_payeename+"|N||"+Data[12]+"|"+Data[13];
				}
				System.out.println("finalstr===="+finalstr);
			}
			else {
			
				int lineLength=full_line.length();
				//System.out.println(full_line.substring(0,9));
				str1=full_line.substring(0,9);
				//System.out.println(full_line.substring(9,18));
				//System.out.println(full_line.substring(18,55));
				str2=full_line.substring(18,55);
				//System.out.println(full_line.substring(55,58));
				//System.out.println(full_line.substring(58,287));
				str3=full_line.substring(58,287);
				//System.out.println(full_line.substring(287,296));
				//System.out.println(full_line.substring(296,s));
				str4=full_line.substring(296,lineLength);
				
				finalstr=str1+sort_code+str2+tran_code+str3+sort_code+str4;
				String payeename=CommonUtility.lPad(cli_payeename,50, " ");
				String s1=finalstr.substring(0, 68);
				String s2=finalstr.substring(126, finalstr.length());
				finalstr=s1+payeename+cli_instrudate+s2;
				System.out.println("finalstr=="+finalstr);
			}
			update_qry="update CLEARINGINWARD set CLI_PAYORBANKROUTNO=?,CLI_TRANSCODE=?,CLI_FULLLINE=?,CLI_PAYEENAME=?,CLI_INSTRUDATE=? where CLI_CLRSRNO=? and CLI_DDMMYYYY=?";//CLI_ITEMSEQUENCENO to_char(sysdate,'ddmmyyyy')
			PreparedStatement ps1=con.prepareStatement(update_qry);
			ps1.setString(1, sort_code);
			ps1.setString(2, tran_code);
			ps1.setString(3, finalstr);
			ps1.setString(4, cli_payeename);
			ps1.setString(5, cli_instrudate);
			ps1.setString(6, item_seqno);
			ps1.setString(7, Configuration.getDDMMYYYY());//DSP sysdate
			int i=ps1.executeUpdate();
			ps1.close();
			 if(i>0){
				 output="SUCCESS"; 
			 }
			 else{
				 output="FAILED";  
			 }
			con.close();
		}
		catch(SQLException se)
		{
		System.out.println(""+se);
			se.printStackTrace();
			 output="FAILED"; 
		}
	}
	catch(Exception e)
	{
	System.out.println(""+e);
			e.printStackTrace();
		 output="FAILED"; 
	}
	
%>

<%=output%>