<%@ page import="java.sql.*" %>
<%@page import="cts.*"%>
<%@page import="list.utility.CommonUtility"%>
<%	
	Connection con=null;
	PreparedStatement ps=null,ps1=null;
	ResultSet rs=null,rs1=null;
	String str="";
	try{
	String BANK_MICRCD=request.getParameter("MICRCODE");
	//String query1="select SEQ_NO from CLR_OUT_SEQ WHERE CURDATE=to_date(to_char(sysdate,'ddmmyyyy'),'ddmmyyyy')";
	String query1="select SEQ_NO from CLR_OUT_SEQ WHERE CURDATE=to_date(?,'ddmmyyyy')";
	con = Configuration.getConnection();
	ps=con.prepareStatement(query1);
	ps.setString(1, Configuration.getDDMMYYYY());//DSP sysdate
	rs=ps.executeQuery();
	
	}catch(Exception e){
		str="0";
		out.print(e);
	}
	finally{
		rs.close();
		ps.close();
		con.close();	
	}
	out.print(str);
%>
