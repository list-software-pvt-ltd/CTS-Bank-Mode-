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
	if(rs.next())
	{
		String sql="select CLR_OWD_ITEMSEQ.nextval from dual";
		ps1=con.prepareStatement(sql);
		rs1=ps1.executeQuery();
		if(rs1.next())
		{
		str=BANK_MICRCD+CommonUtility.lPad(rs1.getString(1), 5, "0");
		}
		rs1.close();
		ps1.close();	
	}
	else{
		CallableStatement cstmt = con.prepareCall("{call resetClrOwdSeq()}");	
		cstmt.executeUpdate();
		cstmt.close();
		//String query2="INSERT into CLR_OUT_SEQ values (to_date(to_char(sysdate,'ddmmyyyy'),'ddmmyyyy'),1)";
		String query2="INSERT into CLR_OUT_SEQ values (to_date(?,'ddmmyyyy'),1)";
		ps1=con.prepareStatement(query2);
		ps1.setString(1, Configuration.getDDMMYYYY());//DSP sysdate
		int i=ps1.executeUpdate();
		str=BANK_MICRCD+"00000";
		ps1.close();
	}
	
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
