
<%@ page contentType="text/html; charset=iso-8859-1" language="java"
import="java.sql.*" import="org.apache.commons.io.FileUtils"
 errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%

		System.out.println("#############	in fetch_saved_config.jsp");
		StringBuffer confBuffer = new StringBuffer();
		String retMess = "", conf_str = "";
		int flag_found = 0;		
	try
	{//1
		Connection cn = Configuration.getConnection();//(Connection)session.getAttribute("session_connection");
		System.out.println("cn="+cn);
		if(cn == null)
			throw new Exception("Session is Null");
	
		PreparedStatement pst = null;
		String qry = "select CFG_BANKROUTINGCODE, CFG_UPLOADPATH_TO_CHI,CFG_DOWNLOADPATH_FROM_CHI, CFG_ARCDOWNLOADPATH_FROM_CHI, CFG_ARCUPLOADPATH_TO_CHI, nvl(CFG_SECURITYORIGINNM_FORXML,'GETDATAFROMADMIN'), nvl(CFG_SECURITYAUTHNM_FORXML,'GETDATAFROMADMIN'), nvl(CFG_SECURITYKEYNM_FORXML,'GETDATAFROMADMIN'), nvl(CFG_NPCIVERSIONNO_CLROWD,'GETDATAFROMADMIN'), nvl(CFG_DIGITALSIGNMETHOD_FORXML,'GETDATAFROMADMIN'), nvl(CFG_SECURITYKEYSIZE_FORXML,'GETDATAFROMADMIN'), CFG_KEYSTOREFILENM, CFG_KEYSTOREPASSWORD, CFG_KEYSTOREALIAS, CFG_INWD_SPLITSTYLE, nvl(CFG_OURVERSIONNO,'GETDATAFROMADMIN'), CFG_BANKNAME,CFG_CHI_BANKNAME, CFG_VENDOR_ID, CFG_VENDOR_NAME, CFG_HUB_LOCATION_NAME, CFG_HUB_LOCATION_ID, CFG_CORE_SYSTEM, CFG_FLTYMICR_POPUP from CONFIGURATION";
		
		pst = cn.prepareStatement(qry);
		ResultSet rs = pst.executeQuery();
		while(rs.next())
		{
			conf_str = rs.getString(1)+"!#!"+rs.getString(2)+"!#!"+rs.getString(3)+"!#!"+rs.getString(4)+"!#!"+rs.getString(5)+"!#!"+rs.getString(6)+"!#!"+rs.getString(7)+"!#!"+rs.getString(8)+"!#!"+rs.getString(9)+"!#!"+rs.getString(10)+"!#!"+rs.getString(11)+"!#!"+rs.getString(12)+"!#!"+rs.getString(13)+"!#!"+rs.getString(14)+"!#!"+rs.getString(15)+"!#!"+rs.getString(16)+"!#!"+rs.getString(17)+"!#!"+rs.getString(18)+"!#!"+rs.getString(19)+"!#!"+rs.getString(20)+"!#!"+rs.getString(21)+"!#!"+rs.getString(22)+"!#!"+rs.getString(23)+"!#!"+rs.getString(24)+"!#!";
			flag_found++;	
		}		
		if(flag_found == 0)
		{
			conf_str = "NODATA#NODATA#";
		}
		cn.close();
	}//-1
	catch(NullPointerException e)
	{//6
		conf_str="FAIL#Error--01";
		System.out.println(""+e);
		//throw new Exception();
	}//-6
	catch(NumberFormatException e)
	{//7
		conf_str="FAIL#Error--02";
		System.out.println(""+e);
		//throw new Exception();
	}//-7
	catch(SQLException e)
	{//8
		conf_str="FAIL#Error--03";
		System.out.println(""+e);
		//throw  Exception();
	}//-8
	catch(ClassNotFoundException e)
	{//9
		conf_str="FAIL#Error--04";
		System.out.println(""+e);
		//throw new Exception();
	}//-9
	catch(Exception e)
	{//10
		conf_str="FAIL#Error--05";
		System.out.println(""+e);
		
	}//-10
	confBuffer.append(conf_str);	
	//response.sendRedirect("../configuration.jsp?msg="+retMess);		
%>
<%=confBuffer.toString()%>