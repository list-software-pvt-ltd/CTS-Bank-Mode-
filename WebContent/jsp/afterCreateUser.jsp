<%@ page import="java.io.*,java.util.*, jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>
<%@ page import="java.net.SocketException"%>
<%@ page import="org.apache.commons.net.ftp.*" %>
<%-- <%@ page import="org.apache.commons.fileupload.servlet.*" %> --%>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="cts.*" %>
<%@ page import="java.sql.*" %>

<%!
	String loginId;
	String txtpass;
	String txtisactive;
	String txtBRNCD;
	String chkAdmin;
	String chkChecker;
	String chkMaker;
	String txtEmail;
	String username;
	String existingLoginId;
	String isUpdateOrInsert;
	String msg;
	Connection con;
	PreparedStatement ps_insert;
	String ctstoken=null;
	String flag;
%>
<%
	con=Configuration.getConnection();
	loginId=request.getParameter("txtLogin");
	
	txtisactive=request.getParameter("isactive");
	System.out.println(txtisactive+" ====== txtisactive");
	if(txtisactive.equals("Y"))
		{
		txtisactive="Y";
		}
	else{
		txtisactive="N";
	}
	//opt_Login_id
	txtpass="";//request.getParameter("txtPassward");
	flag=request.getParameter("flag");
	ctstoken=request.getParameter("CTSTOKEN");
	txtBRNCD=request.getParameter("opt_branch_code");
	chkAdmin=request.getParameter("chkAdmin");
	chkChecker=request.getParameter("chkChecker");
	chkMaker=request.getParameter("chkMaker");
	txtEmail=request.getParameter("txtEmail");
	existingLoginId=request.getParameter("opt_Login_id").trim();
	isUpdateOrInsert=request.getParameter("isUpdateOrInsert");
	username=request.getParameter("txtusername");
	System.out.println(isUpdateOrInsert+"  isUpdateOrInsert");
	if(chkAdmin==null)
		chkAdmin="";
	if(chkChecker==null)
		chkChecker="";
	if(chkMaker==null)
		chkMaker="";
	
	
	
	System.out.println("\n\tloginId:"+loginId+"\n\ttxtpass:"+txtpass+"\n\ttxtBRNCD:"+txtBRNCD+"\n\tchkAdmin:"+chkAdmin+"\n\tchkChecker:"+chkChecker+"\n\tchkMaker:"+chkMaker+"\n\ttxtEmail:"+txtEmail+"\n\texistingLoginId:"+existingLoginId+"\n\tisUpdateOrInsert:"+isUpdateOrInsert+"\n\tisactive:"+txtisactive);
	
	if(isUpdateOrInsert.equalsIgnoreCase("insert"))
	{	
		ps_insert=con.prepareStatement("insert into USRMSTR values(?,?,?,?,?,?,?)");
		String userRole=chkAdmin+chkChecker+chkMaker;
		System.out.println("\n\tuserRole:"+userRole);
		ps_insert.setString(1,loginId);
		ps_insert.setString(2,loginId);
		ps_insert.setString(3,txtBRNCD);
		ps_insert.setString(4,userRole);
		ps_insert.setString(5,txtEmail);
		ps_insert.setString(6,txtisactive);
		ps_insert.setString(7,username);
	
			if(ps_insert.executeUpdate()>0)
			{
				System.out.println("Record inserted...");
				msg="User is Created.";
			}	
			else
			{
					msg="Problem at Server";
			}
	}
	else
	{	
	
	
		String userRole=chkAdmin+chkChecker+chkMaker;
		System.out.println("\n\tloginId:"+loginId+"\n\ttxtpass:"+txtpass+"\n\ttxtBRNCD:"+txtBRNCD+"\n\tuserRole:"+userRole+"\n\ttxtEmail:"+txtEmail+"\n\tloginId:"+loginId+"\n\ttxtisactive:"+txtisactive);
		ps_insert=con.prepareStatement("update USRMSTR set LOGINID=?,USRPASS=?,BRNCD=?,USRROLE=?,EMAILID=?,isactive=?,USRNAME=? where LOGINID=?");//,USRPASS=?
		ps_insert.setString(1,loginId);
		ps_insert.setString(2,loginId);
		ps_insert.setString(3,txtBRNCD);
		ps_insert.setString(4,userRole);
		ps_insert.setString(5,txtEmail);
		ps_insert.setString(6,txtisactive);
		ps_insert.setString(7,username);
		ps_insert.setString(8,existingLoginId);
		
			if(ps_insert.executeUpdate()>0)
			{
				System.out.println("Record Updates...");
				msg="User is Updated.";
			}	
			else
			{
					msg="Problem at Server";
			}

	}		
			con.close();
			ps_insert.close();
		//response.sendRedirect("../createUser.jsp?msg="+msg);			
%>
<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="../createUser.jsp";
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