<%@ page import="java.io.*,java.util.*, jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>
<%@ page import="java.net.SocketException"%>
<%@ page import="org.apache.commons.net.ftp.*" %>
<%-- <%@ page import="org.apache.commons.fileupload.servlet.*" %> --%>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="cts.*" %>
<%@ page import="java.sql.*" %>

<%!
	String txtBrnCd;
	String txtBrnNm;
	String opt_Scanner_avail;
	String opt_main_branch;
	String txtMicrCd;
	String txtPrnBrnCd;
	String txtIfsc;
	String txtMemBnkSortCDd;
	String txtFileath;
	String opt_BrnCd;
	String txtFTPUser;
	String txtFTPPass;
	String txtSorterId;
	String txtFTPUrl;
	String txtFTPPort;
	String msg;
	Connection con;
	PreparedStatement ps_insert;
	String ctstoken=null;
	String flag="";
%>
<%
	try
	{
		con=Configuration.getConnection();
		flag=request.getParameter("flag");
		ctstoken=request.getParameter("CTSTOKEN");
		txtBrnCd=request.getParameter("txtBrnCd");
		txtBrnNm=request.getParameter("txtBrnNm");
		opt_Scanner_avail=request.getParameter("opt_Scanner_avail");
		opt_main_branch=request.getParameter("opt_main_branch");
		txtMicrCd=request.getParameter("txtMicrCd");
		txtPrnBrnCd=request.getParameter("txtPrnBrnCd");
		txtIfsc=request.getParameter("txtIfsc");
		txtMemBnkSortCDd=request.getParameter("txtMemBnkSortCDd");
		txtFileath=request.getParameter("txtFilepath");
		txtFTPUser=request.getParameter("txtFTPUser");
		txtFTPPass=request.getParameter("txtFTPPass");
		txtSorterId=request.getParameter("txtSorterId");
		txtFTPUrl=request.getParameter("txtFTPUrl");
		txtFTPPort=request.getParameter("txtFTPPort");
		opt_BrnCd=request.getParameter("opt_BrnCd");
		System.out.println("\n\t txtBrnCd:"+txtBrnCd+"\n\t txtBrnNm:"+txtBrnNm+"\n\t opt_Scanner_avail:"+opt_Scanner_avail+"\n\t opt_main_branch:"+opt_main_branch+"\n\t txtMicrCd:"+txtMicrCd+"\n\t txtPrnBrnCd:"+txtPrnBrnCd+"\n\t txtIfsc:"+txtIfsc+"\n\t txtMemBnkSortCDd:"
		+txtMemBnkSortCDd+"\n\t txtFileath:"+txtFileath+"\n\t opt_BrnCd:"+opt_BrnCd+"\n\t txtFTPUser:"+txtFTPUser+"\n\t txtFTPPass:"+txtFTPPass+"\n\t txtSorterId:"+txtSorterId+"\n\t txtFTPUrl:"+txtFTPUrl+"\n\t txtFTPPort:"+txtFTPPort);
		
		if(opt_BrnCd.equalsIgnoreCase("1"))
		{	
			ps_insert=con.prepareStatement("insert into BRANCHMSTR(BRM_BRNCD,BRM_BRNNM,BRM_SCANNERYN,BRM_CTSMAINBRN,BRM_MICRCD,BRM_PARENTBRCD,BRM_IFSCCODE,BRM_MEMBERBNKSORTCODE,BRM_LOCALFILEPATH,BRM_DOWNLOADFTPUSER, BRM_DOWNLOADFTPPASS, BRM_SORTERID, BRM_DOWNLOADFTPURL, BRM_DOWNLOADFTPPORT) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
			ps_insert.setString(1,txtBrnCd);
			ps_insert.setString(2,txtBrnNm);
			ps_insert.setString(3,opt_Scanner_avail);
			ps_insert.setString(4,opt_main_branch);
			ps_insert.setString(5,txtMicrCd);
			ps_insert.setString(6,txtPrnBrnCd);
			ps_insert.setString(7,txtIfsc);
			ps_insert.setString(8,txtMemBnkSortCDd);
			ps_insert.setString(9,txtFileath);
			ps_insert.setString(10,txtFTPUser);
			ps_insert.setString(11,txtFTPPass);
			ps_insert.setString(12,txtSorterId);
			ps_insert.setString(13,txtFTPUrl);
			ps_insert.setString(14,txtFTPPort);
		
				if(ps_insert.executeUpdate()>0)
				{
					System.out.println("Record inserted...");
					msg="Branch is Created Sucessfully.";
				}	
				else
				{
						msg="Problem at Server";
				}
		}
		else
		{	
		
		
			
			ps_insert=con.prepareStatement("update BRANCHMSTR set  BRM_BRNNM=?, BRM_SCANNERYN=?, BRM_CTSMAINBRN=?, BRM_MICRCD=?, BRM_PARENTBRCD=?,  BRM_IFSCCODE=?, BRM_MEMBERBNKSORTCODE=?, BRM_LOCALFILEPATH=?,BRM_DOWNLOADFTPUSER=?, BRM_DOWNLOADFTPPASS=?, BRM_SORTERID=?, BRM_DOWNLOADFTPURL=?, BRM_DOWNLOADFTPPORT=? where BRM_BRNCD=?");
			
			ps_insert.setString(1,txtBrnNm);
			ps_insert.setString(2,opt_Scanner_avail);
			ps_insert.setString(3,opt_main_branch);
			ps_insert.setString(4,txtMicrCd);
			ps_insert.setString(5,txtPrnBrnCd);
			ps_insert.setString(6,txtIfsc);
			ps_insert.setString(7,txtMemBnkSortCDd);
			ps_insert.setString(8,txtFileath);
			ps_insert.setString(9,txtFTPUser);
			ps_insert.setString(10,txtFTPPass);
			ps_insert.setString(11,txtSorterId);
			ps_insert.setString(12,txtFTPUrl);
			ps_insert.setString(13,txtFTPPort);
			ps_insert.setString(14,txtBrnCd);
				if(ps_insert.executeUpdate()>0)
				{
					System.out.println("Record Updates...");
					msg="Branch is Updated Sucessfully.";
				}	
				else
				{
						msg="Problem at Server";
				}
	
		}		
				con.close();
				ps_insert.close();
	}
	catch(Exception e)
	{
		e.printStackTrace();
		msg="Exception Occured";
		
	}
		//response.sendRedirect("../insertBranch.jsp?msg="+msg);			
%>
<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="../insertBranch.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();
}

</script>
<body onLoad="Forward()">
<form id="formid" name="formid">
	<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value="<%=ctstoken%>">
	<input type="hidden" id="msg" name="msg" value="<%=msg%>">
	<input type="hidden" id="flag" name="flag" value="<%=flag%>">
</form>
</body>
</html>