<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*,cts.*" errorPage="" %>
<%

	System.out.println("In save_configuration.jsp");
	
	String retMess="";
	String query="";
	String txt_conf_var="",txt_conf_val="";
	System.out.println("---------------------------1111");
	String hd_conf_var="";
		
	
	int rcnt=0;

	try
	{//1
		Connection cn=Configuration.getConnection();//(Connection)session.getAttribute("session_connection");
		System.out.println("cn="+cn);
		if(cn==null)
			throw new Exception("Session is Null");
		rcnt=Integer.parseInt(((String)request.getParameter("rcnt")).trim());
		System.out.println("rcnt="+rcnt);
		//opt_order_date=request.getParameter("opt_order_date");
		//System.out.println("opt_order_date="+opt_order_date);
		for(int i=1;i<rcnt;i++)
		{//2
			System.out.println("Iside Loop I="+i);
			txt_conf_var=request.getParameter("txt_conf_var"+i);
			txt_conf_var=txt_conf_var.trim();
			System.out.println("txt_conf_var="+txt_conf_var);
		
			txt_conf_val=request.getParameter("txt_conf_val"+i);
			txt_conf_val=txt_conf_val.trim();
			System.out.println("txt_conf_val="+txt_conf_val);
			
		
			hd_conf_var=request.getParameter("hd_conf_var"+i);
			System.out.println("hd_conf_var="+hd_conf_var);
			
			PreparedStatement pst=null;
			if(!hd_conf_var.equalsIgnoreCase("NEWCONFVALUE"))
			{//3
						
						System.out.println("in else.........update.......................");
						// CFG_VARNM, CFG_VARVAL from CONFIGURATION;
						query="update CONFIGURATION set CFG_VARNM=?,CFG_VARVAL=? where CFG_VARNM=?";
						pst=cn.prepareStatement(query);
						pst.setString(1,txt_conf_var.toUpperCase());
						pst.setString(2,txt_conf_val);
						pst.setString(3,hd_conf_var);

					//}//-5
			}//-3
			else
			{//6
					System.out.println("in else.........insert.......................");
					//System.out.println("txt_per_code :"+txt_per_code);
					//System.out.println("cmb_dsm_desc :"+cmb_dsm_desc);
					query="insert into CONFIGURATION (CFG_VARNM, CFG_VARVAL) values(?,?)";
					pst=cn.prepareStatement(query);
					pst.setString(1,txt_conf_var.toUpperCase());
					pst.setString(2,txt_conf_val);

			}//-6
			
		
			pst.executeUpdate();
			System.out.println("After execute...");			
	}//-2	
		cn.close();
		retMess="Saved Successfully!";
		System.out.println(retMess);
		response.sendRedirect("../configuration.jsp?msg="+retMess);
	}//-1
	catch(NullPointerException e)
	{//6
		retMess="Error--01";
		System.out.println(""+e);
		//response.sendRedirect("../designation_entry.jsp?msg="+retMess);
		//throw new Exception();
	}//-6
	catch(NumberFormatException e)
	{//7
		retMess="Error--02";
		System.out.println(""+e);
		//throw new Exception();
	}//-7
	catch(SQLException e)
	{//8
		retMess="Error--03";
		System.out.println(""+e);
		//throw  Exception();
		//response.sendRedirect("../res_person_entry.jsp?msg="+retMess);
	}//-8
	catch(ClassNotFoundException e)
	{//9
		retMess="Error--04";
		System.out.println(""+e);
		//throw new Exception();
	}//-9
	catch(Exception e)
	{//10
		retMess=retMess+" Can Not Save Configuration(s)....";
		System.out.println(""+e);
		
		
		String errmsg=e.getMessage().toUpperCase();
		   System.out.println("errmsg="+errmsg);
		   int indx= errmsg.indexOf("DESGMAST_PK");
		   if(indx>0)
		   {
			   System.out.println("Can Not Insert. ORA-00001: unique constraint (DESGMAST.DESGMAST_PK) violated");
			   //pw.write("Can Not Insert. ORA-00001: unique constraint (MOBILEMAP.PK_LOCATIONTRN_CON) violated");
			   //pw.println("Can Not Insert. ORA-00001: unique constraint (MOBILEMAP.PK_LOCATIONTRN_CON) violated");
			 //  return "SUCESS";
			 retMess=retMess+" IF -- Please choose another Designaiton code!";
		   }
		   else
		   {
				//cn.rollback();
				System.out.println("Error While inserting Designaiton"+e.getMessage());
				retMess=retMess+" ELSE -- Please choose another Designaiton code!";
				
		   }
		   
	}//-10
	//response.sendRedirect("../res_person_entry.jsp");
%>