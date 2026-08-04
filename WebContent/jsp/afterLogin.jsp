<%-- <%@page import="CBSPASSPKG.CBSPASS1"%> --%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*" %>
<%@page import="org.apache.commons.io.FileUtils,java.text.*,java.sql.*" %>
<%!String CTSTOKEN=null,TOKEN=null,flaglog="";%>
<%
System.out.println("***** start of cts afterLogin ******");
	
	String txt_loginid="",empEmail="",pass="";
	String DATABASE_IP="",SID="",DBUSER="",DBPASSWORD="",APP_PATH="",PORT="",conti_clearing="";
	Connection cn=null;
	//PreparedStatement ps,ps0,ps00,ps000,ps1;
	ResultSet rs0,rs00,rs000,rs1;
	//CBSPASS cbs= new CBSPASS();
	String flag="NA";
	String retval="F";
	
	try
	{
		HttpSession sessioncheck = request.getSession();
		//System.out.println("sessioncheck.getAttribute(\"session_loginid\") *************="+sessioncheck.getAttribute("session_loginid"));
		flaglog=request.getParameter("flag").trim();
		System.out.println("flaglog *************="+flaglog);
		if(sessioncheck.getAttribute("session_loginid")==null)
		{
	
		Class.forName("oracle.jdbc.driver.OracleDriver"); 
		Configuration.writeLog("After ClassforName");
		System.out.println("DATABASE_IP"+DATABASE_IP);
		System.out.println("PORT_IP"+PORT);
		//cn=DriverManager.getConnection("jdbc:oracle:thin:@"+DATABASE_IP+":"+PORT+":"+SID,DBUSER,DBPASSWORD);
		cn=Configuration.getConnection();	
		Configuration.writeLog("After ClassforName");
		System.out.println("session.getsession.getID() ********="+request.getSession().getId());
		CTSTOKEN=CryptoKey.rantoken();//request.getSession().getId();
	    TOKEN=CTSTOKEN;
		session.setAttribute("TOKEN",TOKEN);
		//session.setAttribute("CTSTOKEN",CTSTOKEN);
		session.setAttribute("session_connection",cn);
		String uploadpath= Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI", cn);
		session.setAttribute("uploadpath",uploadpath);
		String uploadDownload=Configuration.getConfValByNm("CFG_DOWNLOD_UPLOAD", cn);
		//CFG_DOWNLOADPATH_FROM_CHI
		session.setAttribute("uploadDownload",uploadDownload);
		String DownloadfromCHI=Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", cn);
		session.setAttribute("DOWNLOADPATH_FROM_CHI",DownloadfromCHI);
		// Added by Sam for cheque search program using session archive path for download
		String Arc_DownloadfromCHI=Configuration.getConfValByNm("CFG_ARCHIVE_DOWNLOADPATH", cn);
		session.setAttribute("CFG_ARCHIVE_DOWNLOADPATH",Arc_DownloadfromCHI);
		//CFG_ARCUPLOADPATH_TO_CHI
		
		String Arc_uploadfromCHI=Configuration.getConfValByNm("CFG_ARCHIVE_UPLOADPATH", cn);
		session.setAttribute("CFG_ARCHIVE_UPLOADPATH",Arc_uploadfromCHI);
		
	
		String loginstyle=Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
		
		conti_clearing=Configuration.getConfValByNm("CFG_CONTINUE_CLEARING_FLG", cn);
		session.setAttribute("CFG_CONTINUE_CLEARING_FLG",conti_clearing);
	//	SELECT CFG_VARVALUE FROM POLY.CONFIGURR_COMMON WHERE CFG_VARNAME='CONTINUOUS_CLEARING'
		
		//CONTINUOUS_CLEARING
		String cbs_flg="N";
		String qry_flag="SELECT CFG_VARVALUE FROM POLY.CONFIGURR_COMMON WHERE CFG_VARNAME='CONTINUOUS_CLEARING'";
			
		//System.out.println("1111cbs_flg========="+cbs_flg);
		PreparedStatement pst_flg=cn.prepareStatement(qry_flag);
		ResultSet rs_flg=pst_flg.executeQuery();
		while(rs_flg.next())
		{
			System.out.println("rs_flg.getString(1)====="+rs_flg.getString(1));
			cbs_flg=rs_flg.getString(1);
		}
		System.out.println("session_cbs_conti_flg========="+cbs_flg);
		session.setAttribute("session_cbs_conti_flg",cbs_flg);
		
	
		
		try
		{
	if((loginstyle.equals("CBSUSER")||loginstyle.equals("CUSTODIAN")))
	{
		txt_loginid=request.getParameter("name").trim();
		Configuration.writeLog("After txt_loginid="+txt_loginid);
		System.out.println("txt_loginid="+txt_loginid);
		
		pass=request.getParameter("name").trim();
		Configuration.writeLog("After pass="+pass);
		System.out.println("Password="+pass);
	}
	else{
		txt_loginid=request.getParameter("txt_loginid").trim();
		txt_loginid = CryptoKey.newdecrypt(txt_loginid.trim());
		Configuration.writeLog("After txt_loginid="+txt_loginid);
		System.out.println("txt_loginid="+txt_loginid);
		
		pass=request.getParameter("txt_pwd").trim();
		pass = CryptoKey.newdecrypt(pass.trim());
		Configuration.writeLog("After pass="+pass);
		System.out.println("Password="+pass);
	}
	
	
		}
		catch(NullPointerException e)
		{
	txt_loginid="NA";
	System.out.println("Error..."+e);
		}
		
		/* if(loginstyle.equals("CUSTODIAN"))
		{
	pass=request.getParameter("name").trim();
	Configuration.writeLog("After pass="+pass);
	System.out.println("Password="+pass);
		}
		else
		{
		pass=request.getParameter("txt_pwd").trim();
		Configuration.writeLog("After pass="+pass);
		System.out.println("Password="+pass);
		} */
		
		//if(!empEmail.equals("NA") || !empNo.equals("NA"))
		//{
		if(loginstyle.equals("CBSUSER"))	
		{
	try
	{
	 retval="T" ; //CBSPASS1.validatepass("U",txt_loginid,pass);//Change by SAM 
	 System.out.println("retval====="+retval);
		if(retval.equals("T")){
			flag="SUCCESS";
		}
		else{
			
			flag="FAIL";
		}
	}catch(Exception e){
		e.printStackTrace();
	}
		}
		
		if((loginstyle.equals("CBSUSER")||loginstyle.equals("CUSTODIAN")) && flag.equals("FAIL")){
	System.out.println("Wrong Loginid or Password");
	response.sendRedirect("../login.jsp?flag=1&msg=Invalid Login or Password");
		}
		else{
	PreparedStatement pst=null,pst1=null;
	String qry="",qry1="";
	qry1="select BRM_CTSMAINBRN,BRM_SCANNERYN,BRM_DOWNLOADFTPUSER, BRM_DOWNLOADFTPPASS, BRM_SORTERID, ";
	qry1=qry1+" BRM_DOWNLOADFTPURL, BRM_IFSCCODE, BRM_DOWNLOADFTPPORT,BRM_LOCALFILEPATH,BRM_BRNNM from BRANCHMSTR where"; 
	qry1=qry1+" BRM_BRNCD = ?";//+
	pst1=cn.prepareStatement(qry1);
	if(!txt_loginid.equals("NA"))
	{
		System.out.println("If ==============");
		if(loginstyle.equals("CBSUSER") || loginstyle.equals("CUSTODIAN"))
			qry="select LOGINID, USRPASS, BRNCD, USRROLE, EMAILID,USRNAME from USRMSTR_VIEW where LOGINID=? and ISACTIVE=?";
		else
			qry="select LOGINID, USRPASS, BRNCD, USRROLE, EMAILID,USRNAME from USRMSTR_VIEW where LOGINID=? and ISACTIVE=? and USRPASS=?";
			
		pst=cn.prepareStatement(qry);
		pst.setString(1,txt_loginid);
		pst.setString(2,"Y");
		if(loginstyle.equals("CTSUSER"))
			pst.setString(3,pass);
	}
	
	boolean flg=false;
	String mainbrn_yn = "", scanner_yn = "", download_ftpuser = "", download_ftppass ="" , sorter_id = "", download_ftpurl = "", ifsc_code = "", download_ftpport = "";
	ResultSet rs=pst.executeQuery();
	while(rs.next())
	{
		session.setAttribute("session_loginid",rs.getString(1));
		session.setAttribute("session_branch_code",rs.getString(3));
		session.setAttribute("session_user_role",rs.getString(4));
		session.setAttribute("session_usrnm",rs.getString(6));
		//session.setAttribute("session_loginstyle",loginstyle);
		/*BRNCD, BRM_BRNAME, BRM_SCANNERYN, BRM_CTSMAINBRN, BRM_BRM_MICRCD, BRM_PARENTBRCD, BRM_DOWNLOADFTPUSER, BRM_DOWNLOADFTPPASS, BRM_SORTERID, BRM_DOWNLOADFTPURL, BRM_IFSCCODE, BRM_DOWNLOADFTPPORT*/
		
		pst1.setString(1, rs.getString(3));
		//BRM_DOWNLOADFTPUSER 3
		//BRM_DOWNLOADFTPPASS 4
		//BRM_DOWNLOADFTPURL  5 
		//BRM_DOWNLOADFTPPORT 7
		ResultSet rs2=pst1.executeQuery();
		while(rs2.next())
		{
			flg=true;
			mainbrn_yn = rs2.getString(1);
			scanner_yn = rs2.getString(2);
			download_ftpuser = rs2.getString(3); 
			download_ftppass = rs2.getString(4); 
			sorter_id = rs2.getString(5); 
			download_ftpurl = rs2.getString(6); 
			ifsc_code = rs2.getString(7); 
			download_ftpport = rs2.getString(8);
			String localFilePath=rs2.getString(9);
			String BRM_BRNNM=rs2.getString(10);
			session.setAttribute("session_main_br_yn",mainbrn_yn);
			session.setAttribute("session_scanner_yn",scanner_yn);
			
			session.setAttribute("session_download_ftpuser",download_ftpuser);
			session.setAttribute("session_download_ftppass",download_ftppass);
			session.setAttribute("session_sorter_id",sorter_id);
			session.setAttribute("session_download_ftpurl",download_ftpurl);
		
			session.setAttribute("session_ifsc_code",ifsc_code);
			session.setAttribute("session_download_ftpport",download_ftpport);
			session.setAttribute("session_local_file_path", localFilePath);
			session.setAttribute("session_BRM_BRNNM", BRM_BRNNM);
			
		}
		rs2.close();
		pst1.close();
	}
	rs.close();
	pst.close();
	cn.close();
	if(flg)
	{
		System.out.println("Login Successful");
		System.out.println("Employee Session="+session.getAttribute("session_empno"));
		System.out.println("Employee Name="+session.getAttribute("session_empname"));
		//response.sendRedirect("../main.jsp");		
		
	}
	else
	{    if(loginstyle.equals("CBSUSER") ||loginstyle.equals("CTSUSER"))
	     {
		   System.out.println("Wrong Loginid or Password");
		   response.sendRedirect("../invalidcredentials.jsp?msg=Invalid Login or Password");
	     }
	   else
	     {
		   System.out.println("Wrong Loginid or Password");
		   response.sendRedirect("../invalidcredentials.jsp?msg=Invalid Login or Password");
	     }
	}
		}
	 }
	else {
    	response.sendRedirect("../invalidcredentials.jsp?msg=Your Session Has Been Expired.Please Login Again");
	}
	}
	catch(ClassNotFoundException e)
	{
		System.out.println("Error..."+e);
		throw new Exception();
	}
	catch(SQLException e)
	{
		System.out.println("Error..."+e);
		response.sendRedirect("../invalidcredentials.jsp?msg=Problem In Login. Please Contact Administrator.");
	}
	catch(NullPointerException e)
	{
		e.printStackTrace();
		System.out.println("Error..."+e);
		throw new Exception();
	}
	catch(Exception e)
	{
		System.out.println("Error..."+e);
		response.sendRedirect("../invalidcredentials.jsp?msg=Problem In Login. Please Contact Administrator.");
	}
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
<form id="formid" name="formid">
	<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value="<%=CTSTOKEN%>">
	<input type="hidden" id="flag" name="flag" value="<%=flaglog%>">
</form>
</body>
</html>