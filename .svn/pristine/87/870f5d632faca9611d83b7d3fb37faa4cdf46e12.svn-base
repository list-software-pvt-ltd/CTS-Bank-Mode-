<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<%@page import="jakarta.servlet.RequestDispatcher"%>
<%@page import="cts.*"%>
<%

	//out.println("In save_config.jsp");
	
	String msg="";
	String query="";
	String txt_bankcode="",txt_our_verno="";
	String txt_uploadpath_to_chi="",txt_downloadpath_from_chi="";
	String txt_arch_uploadpath_to_chi="" , txt_arch_downloadpath_from_chi="";
	String txt_sec_orgin_name="", txt_sec_auth_name="";
	String txt_sec_key_name="", txt_sec_key_size="";
	String txt_dig_sign_method="", txt_npci_ver_no="";
	String txt_keystore_filenm="", txt_keystore_pwd="";
	String txt_keystore_alias="", opt_inward_split_style="";
	String txt_bank_Name="";
	String txt_core_system="",txt_hub_location_id="",txt_hub_location_name="";
	String txt_vendor_id="",txt_chi_bankname="",txt_vendor_name="",txt_clouwrd_popup="",ctstoken="",flag="";
	PreparedStatement ps = null;
	ResultSet rs = null;
	try
	{//1
		//out.println("---------------------------in try");
	
		Connection con=Configuration.getConnection();//(Connection)session.getAttribute("session_connection");
		System.out.println("con="+con);
		if(con==null)
			throw new Exception("Session is Null");
		
		ctstoken=request.getParameter("CTSTOKEN");
		//System.out.println("CTSTOKEN="+CTSTOKEN);
		flag=request.getParameter("flag");
		System.out.println("in save config flag="+flag);
		
		txt_bankcode=request.getParameter("txt_bankcode");
		System.out.println("txt_bankcode="+txt_bankcode);
		
		txt_our_verno=request.getParameter("txt_our_verno");
		System.out.println("txt_our_verno="+txt_our_verno);
		
		
		txt_uploadpath_to_chi=request.getParameter("txt_uploadpath_to_chi");
		System.out.println("txt_uploadpath_to_chi="+txt_uploadpath_to_chi);
		
		txt_downloadpath_from_chi=request.getParameter("txt_downloadpath_from_chi");
		System.out.println("txt_downloadpath_from_chi="+txt_downloadpath_from_chi);
		
		
		txt_arch_uploadpath_to_chi=request.getParameter("txt_arch_uploadpath_to_chi");
		System.out.println("txt_arch_uploadpath_to_chi="+txt_arch_uploadpath_to_chi);
		
		txt_arch_downloadpath_from_chi=request.getParameter("txt_arch_downloadpath_from_chi");
		System.out.println("txt_arch_downloadpath_from_chi="+txt_arch_downloadpath_from_chi);
		
		
		txt_sec_orgin_name=request.getParameter("txt_sec_orgin_name");
		System.out.println("txt_sec_orgin_name="+txt_sec_orgin_name);
		
		txt_sec_auth_name=request.getParameter("txt_sec_auth_name");
		System.out.println("txt_sec_auth_name="+txt_sec_auth_name);


		txt_sec_key_name=request.getParameter("txt_sec_key_name");
		System.out.println("txt_sec_key_name="+txt_sec_key_name);
		
		txt_sec_key_size=request.getParameter("txt_sec_key_size");
		System.out.println("txt_sec_key_size="+txt_sec_key_size);

	
		txt_dig_sign_method=request.getParameter("txt_dig_sign_method");
		System.out.println("txt_dig_sign_method="+txt_dig_sign_method);
		
		txt_npci_ver_no=request.getParameter("txt_npci_ver_no");
		System.out.println("txt_npci_ver_no="+txt_npci_ver_no);


		txt_keystore_filenm=request.getParameter("txt_keystore_filenm");
		System.out.println("txt_keystore_filenm="+txt_keystore_filenm);
		
		txt_keystore_pwd=request.getParameter("txt_keystore_pwd");
		System.out.println("txt_keystore_pwd="+txt_keystore_pwd);


		txt_keystore_alias=request.getParameter("txt_keystore_alias");
		System.out.println("txt_keystore_alias="+txt_keystore_alias);
		
		opt_inward_split_style=request.getParameter("opt_inward_split_style");
		System.out.println("opt_inward_split_style="+opt_inward_split_style); 
		
		txt_bank_Name=request.getParameter("txt_bank_Name");
		System.out.println("txt_bank_Name="+txt_bank_Name); 
		
		txt_core_system=request.getParameter("txt_core_system");
		System.out.println("txt_core_system="+txt_core_system); 
		
		txt_hub_location_id=request.getParameter("txt_hub_location_id");
		System.out.println("txt_hub_location_id="+txt_hub_location_id); 
		
		txt_hub_location_name=request.getParameter("txt_hub_location_name");
		System.out.println("txt_hub_location_name="+txt_hub_location_name); 
		
		txt_vendor_name=request.getParameter("txt_vendor_name");
		System.out.println("txt_vendor_name="+txt_vendor_name); 
		
		txt_vendor_id=request.getParameter("txt_vendor_id");
		System.out.println("txt_vendor_id="+txt_vendor_id); 
		
		txt_chi_bankname=request.getParameter("txt_chi_bankname");
		System.out.println("txt_chi_bankname="+txt_chi_bankname); 
		
		txt_clouwrd_popup=request.getParameter("txt_clouwrd_popup");
		System.out.println("txt_clouwrd_popup="+txt_clouwrd_popup); 
		
		/*
1 CFG_BANKCODE, 
2 CFG_UPLOADPATH_TO_CHI,
3 CFG_DOWNLOADPATH_FROM_CHI,
4 CFG_ARCDOWNLOADPATH_FROM_CHI,
5 CFG_ARCUPLOADPATH_TO_CHI, 
6 CFG_SECURITYORIGINNM_FORXML, 
7 CFG_SECURITYAUTHNM_FORXML,
8 CFG_SECURITYKEYNM_FORXML,
9 CFG_NPCIVERSIONNO_FORXML, 
10 CFG_DIGITALSIGNMETHOD_FORXML, 
11 CFG_SECURITYKEYSIZE_FORXML, 
12 CFG_KEYSTOREFILENM,
13 CFG_KEYSTOREPASSWORD, 
14 CFG_KEYSTOREALIAS,
15 CFG_INWD_SPLITSTYLE,
16 CFG_OURVERSIONNO
		*/
		
				query="select count(*) from CONFIGURATION";
				ps=con.prepareStatement(query);
				
				rs=ps.executeQuery();
				if(rs.next())
				{
				
					System.out.println("*****************************UPDATE");
					query="update CONFIGURATION set CFG_BANKROUTINGCODE=?,CFG_UPLOADPATH_TO_CHI=?, CFG_DOWNLOADPATH_FROM_CHI=?, CFG_ARCDOWNLOADPATH_FROM_CHI=?, CFG_ARCUPLOADPATH_TO_CHI=?, CFG_SECURITYORIGINNM_FORXML=?, CFG_SECURITYAUTHNM_FORXML=?, CFG_SECURITYKEYNM_FORXML=?, CFG_NPCIVERSIONNO_CLROWD=?, CFG_DIGITALSIGNMETHOD_FORXML=?, CFG_SECURITYKEYSIZE_FORXML=?, CFG_KEYSTOREFILENM=?, CFG_KEYSTOREPASSWORD=?, CFG_KEYSTOREALIAS=?, CFG_INWD_SPLITSTYLE=?, CFG_OURVERSIONNO=?,CFG_BANKNAME=?, CFG_CHI_BANKNAME=?, CFG_VENDOR_ID=?, CFG_VENDOR_NAME=?, CFG_HUB_LOCATION_NAME=?, CFG_HUB_LOCATION_ID=?, CFG_CORE_SYSTEM=?,CFG_FLTYMICR_POPUP=?";
					
				}
				else
				{
				
					System.out.println("*****************************INSERT");
					query="insert into CONFIGURATION values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";		
					
				}
				
					ps=con.prepareStatement(query);
					ps.setString(1,txt_bankcode);
					ps.setString(2,txt_uploadpath_to_chi);
					ps.setString(3,txt_downloadpath_from_chi);
					ps.setString(4,txt_arch_downloadpath_from_chi);	
					ps.setString(5,txt_arch_uploadpath_to_chi);	
					ps.setString(6,txt_sec_orgin_name);
					ps.setString(7,txt_sec_auth_name);
					ps.setString(8,txt_sec_key_name);
					ps.setString(9,txt_npci_ver_no);
					ps.setString(10,txt_dig_sign_method);		
					ps.setString(11,txt_sec_key_size);
					ps.setString(12,txt_keystore_filenm);
					ps.setString(13,txt_keystore_pwd);
					ps.setString(14,txt_keystore_alias);
					ps.setString(15,opt_inward_split_style);
					ps.setString(16,txt_our_verno);
					ps.setString(17,txt_bank_Name);
					ps.setString(18,txt_chi_bankname);
					ps.setString(19,txt_vendor_id);
					ps.setString(20,txt_vendor_name);
					ps.setString(21,txt_hub_location_name);
					ps.setString(22,txt_hub_location_id);
					ps.setString(23,txt_core_system);
					ps.setString(24,txt_clouwrd_popup);
					ps.executeUpdate();
		
					msg="Saved Successfully!";
					System.out.println(msg);
				con.close();
	}//-1
	catch(NullPointerException e)
	{//6
		msg="Error--01";
		System.out.println(""+e);
		//response.sendRedirect("../designation_entry.jsp?msg="+msg);
		//throw new Exception();
	}//-6
	catch(NumberFormatException e)
	{//7
		msg="Error--02";
		System.out.println(""+e);
		//throw new Exception();
	}//-7
	catch(SQLException e)
	{//8
		msg="Error--03"+e;
		System.out.println(""+e);
		//throw  Exception();
		//response.sendRedirect("../res_person_entry.jsp?msg="+msg);
	}//-8
	catch(ClassNotFoundException e)
	{//9
		msg="Error--04";
		System.out.println(""+e);
		//throw new Exception();
	}//-9
	catch(Exception e)
	{//10
		msg=msg+" Can Not Save Configuration(s)....";
		System.out.println(""+e);
	}//-10
	
	//response.sendRedirect("../configuration.jsp?msg="+msg+"&CTSTOKEN="+ctstoken);
	//RequestDispatcher RequetsDispatcherObj =request.getRequestDispatcher("/configuration.jsp?msg="+msg+"&CTSTOKEN="+ctstoken);
	//RequetsDispatcherObj.forward(request, response);
%>
<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="../configuration.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();
}

</script>
<body onLoad="Forward()">
<form id="formid" name="formid" method="post">
	<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value="<%=ctstoken%>">
	<input type="hidden" id="msg" name="msg" value="<%=msg%>">
	<input type="hidden" id="flag" name="flag" value="<%=flag%>">
</form>
</body>
</html>