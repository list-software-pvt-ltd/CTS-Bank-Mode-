<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@ page import="cts.*" %>

<%!
	String empEmail="",pass="";
	String loginID;
	String DATABASE_IP="",SID="",DBUSER="",DBPASSWORD="",APP_PATH="",PORT="";
	Connection cn=null;
	PreparedStatement ps,ps0,ps00,ps000,ps1;
	ResultSet rs0,rs00,rs000,rs1;
	
%>
<%
	System.out.println("***** start of after_getpassword ******");
	
	loginID=request.getParameter("txt_loginid");
	empEmail=request.getParameter("txt_emailid");
	
	//read file 
	
	
		String path=new File(".").getCanonicalPath()+"/config_cts.ini";
		System.out.println("\n\n\n"+path);
		BufferedReader br=new BufferedReader(new FileReader(path));
		int c=0;
	 try
	 {	
		while (true)
		{
			String fileRow=br.readLine();
			if(fileRow==null)
				break;
			if(fileRow.indexOf("DATABASE_IP=")>-1)
			{
				DATABASE_IP=fileRow.substring(fileRow.indexOf("DATABASE_IP=")+12,fileRow.length());
				System.out.println("DATABASE_IP"+DATABASE_IP);
			}
			if(fileRow.indexOf("SID=")>-1)
			{
				SID=fileRow.substring(fileRow.indexOf("SID=")+4,fileRow.length());
				System.out.println("SID="+SID);
			}
			if(fileRow.indexOf("DBUSER=")>-1)
			{
				DBUSER=fileRow.substring(fileRow.indexOf("DBUSER=")+7,fileRow.length());
				System.out.println("DBUSER="+DBUSER);
			}
			if(fileRow.indexOf("DBPASSWORD=")>-1)
			{
				DBPASSWORD=fileRow.substring(fileRow.indexOf("DBPASSWORD=")+11,fileRow.length());
				System.out.println("DBPASSWORD="+DBPASSWORD);
			}
			if(fileRow.indexOf("APP_PATH=")>-1)
			{
				APP_PATH=fileRow.substring(fileRow.indexOf("APP_PATH=")+9,fileRow.length());
				System.out.println("APP_PATH="+APP_PATH);
			}
			if(fileRow.indexOf("PORT=")>-1)
			{
				PORT=fileRow.substring(fileRow.indexOf("PORT=")+5,fileRow.length());
				System.out.println("PORT="+PORT);
			}
		}
	}
	catch(IOException e1)
	{
		 out.println("Config.ini does Not exist");
		//out.println("Config.ini does Not exist");
		//return "FAILED";
	}
	catch(Exception e2)
	{
		 out.println("Check URL,USER & PASSWORD in config.ini file");
		//out.println("Check URL,USER & PASSWORD in config.ini file");
		//return "FAILED";
	}
	
	
	try
	{
		Class.forName("oracle.jdbc.driver.OracleDriver"); 
		System.out.println("DATABASE_IP"+DATABASE_IP);
		System.out.println("PORT_IP"+PORT);
		cn=DriverManager.getConnection("jdbc:oracle:thin:@"+DATABASE_IP+":"+PORT+":"+SID,DBUSER,DBPASSWORD);
		if(cn!=null)
		{
			System.out.println(" connection is not null");			
		}
		else
		{
			System.out.println(" connection is  null");
		}
		System.out.println("APP_PATH *************="+APP_PATH);		
		
		System.out.println("Login ID:"+loginID);
		System.out.println("Email:"+empEmail);
		
		//select EMM_loginID from EMPLMSTR @link_to_mkt where EMM_EMAILID=
		String qry="select USRPASS,EMAILID from USRMSTR_VIEW where LOGINID=?";
		ps=cn.prepareStatement(qry);
		ps.setString(1,loginID);
		
		String password="",empName="",confMailId="";
		rs0=ps.executeQuery();
		if(rs0.next())
		{
			password=rs0.getString(1);
			confMailId=rs0.getString(2);
			System.out.println("loginID is:"+loginID);
			System.out.println("password is:"+password);
			System.out.println("confMailId is:"+confMailId);
			//sending mail to employeeEMM_loginID
			if(confMailId.equalsIgnoreCase(empEmail))
			{
			/* 	String msgString="\nLogin ID:"+loginID+"\nPassword:"+password;
													from                    to        cc                    Subject         message      
				SendMail sendMail_lobj =new SendMail("ov.kushte@gmail.com",empEmail,"CTS : Password Recovery","Cash Truncation System!\nFollowing is your recovered password \n"+msgString);
				String res=sendMail_lobj.send();
				 */
				 String res="success";
				 if(res.equals("success"))
				 {
					response.sendRedirect("../forgot_password.jsp?msg=Your Password Is Successfully Recoverd.\nCheck Your Email account");
				 }
				 else
				 {
					response.sendRedirect("../forgot_password.jsp?msg=Enter valid email or Problem in network");
				 }	
			}
			else
			{
				response.sendRedirect("../forgot_password.jsp?msg=Please Enter Your Configured Email ID");
			}
		}
		else
		{
			response.sendRedirect("../forgot_password.jsp?msg=Invalid Login ID");
		}
	}
	catch(SQLException e)	
	{
		System.out.println("SQLException :"+e);
		response.sendRedirect("../login.jsp?flag=1&msg=Problem In Forgot Password. Please Contact Administrator.1111"+e);
	}
	catch(NullPointerException e)	
	{
		System.out.println("NullPointerException :"+e);
		response.sendRedirect("../login.jsp?flag=1&msg=Problem In Forgot Password. Please Contact Administrator.2222"+e);
	}
	catch(Exception e)	
	{
		System.out.println("Exception :"+e);
		response.sendRedirect("../login.jsp?flag=1&msg=Problem In Forgot Password. Please Contact Administrator.3333"+e);
	}
%>