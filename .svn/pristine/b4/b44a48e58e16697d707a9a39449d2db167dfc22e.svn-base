<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
	 System.out.println("In afterUserChangePwd.jsp...............");
    String userId="";
	
	String msg="",userPass="",newuserPass="",dbuserPass="",ctstoken="",flag="";

	userId = (String)session.getAttribute("session_loginid");
	// out.println("userId :"+userId);
	 
	 ctstoken=request.getParameter("CTSTOKEN");
	 flag=request.getParameter("flag");
 	userPass=request.getParameter("para2");
	// out.println("userPass :"+userPass);
	
	newuserPass=request.getParameter("para3");
	// out.println("newuserPass :"+newuserPass);

	String query1="",query2="";
	int i=0;
	Connection con;
	PreparedStatement pStmt=null;
	ResultSet rs=null;

	try{
		// out.println("1");
		con=Configuration.getConnection();//(Connection)session.getAttribute("session_connection");   
		// out.println("2");
		query1="select USRPASS,USRPASS from USRMSTR_VIEW where LOGINID = ?";
		// out.println("3");
		 if (con != null)
		 {
		 	pStmt=con.prepareStatement(query1);
		}
    	else
		{
			System.out.println("connection null");
		}
		pStmt.setString(1,userId);
		
		rs=pStmt.executeQuery();
		// out.println("After execute Query");
		i=1;
		while(rs.next())
		{	
			i++;
			System.out.println("in while");
			dbuserPass=rs.getString(1);
			dbuserPass=dbuserPass.trim();
			System.out.println("dbuserPass:"+dbuserPass);
			//session.setAttribute("userId",userId);
			//msg=userPass;
			//out.println("dbuserPass--------"+dbuserPass);
			//out.println("userPass--------"+userPass);
			
			if(dbuserPass.equals(userPass))
			{
				//out.println("11111");
				query2="UPDATE USRMSTR SET USRPASS = ? WHERE LOGINID =?";
				//out.println("2222222222");
				PreparedStatement pStmt2=con.prepareStatement(query2);
				//out.println("33333333333333");
				pStmt2.setString(1,newuserPass);
				//out.println("444444444");
				//out.println("userId= "+userId);
				pStmt2.setString(2,""+userId);
				//out.println("5555555555555");
				//out.println("QUERY :"+pStmt2);
				pStmt2.executeUpdate();
				i=1;
				msg=msg+"Password Updated Successfully!";
			}
			else
			{
				msg="Invalid Old Password!";
			}
			
			
			//rs.close();
			//pStmt.close();
			//con.close();
		}
		
	}
	catch(SQLException e)
	{
		 System.out.println("SQLException :"+e);
		 msg="Error At Server!";
	}
	catch(Exception e)
	{
		System.out.println("Exception :"+e);
		 msg="Error At Server!";
	}
	//response.sendRedirect("../change_password.jsp?msg="+msg);	
%>					 
<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="../change_password.jsp";
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

    

