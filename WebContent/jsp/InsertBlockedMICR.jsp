<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONArray"%>
<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*,cts.*" errorPage="" %>
<%

	System.out.println("In Blocked MICR Code.jsp");
	
	String retMess="";
	String query="";
	String SRNO="",MICRCODE="",BANKNAME="",whattodo="F",entby="";
	System.out.println("---------------------------1111");
	String hd_conf_var="";
	int rcnt=0;
	
	try
	{//1
		Connection cn=Configuration.getConnection();//(Connection)session.getAttribute("session_connection");
		System.out.println("cn="+cn);
		if(cn==null)
			throw new Exception("Session is Null");
		//rcnt=Integer.parseInt(((String)request.getParameter("rcnt")).trim());
		whattodo=request.getParameter("whattodo");//whattodo
		try{
		if(whattodo.equals(null)){
			whattodo="F";
		}
		}
		catch(NullPointerException e)
		{
			whattodo="F";
			System.out.println(""+e);
		}
		System.out.println("-----whattodo="+whattodo);
		
		if(whattodo.equals("I") )
		{
		try
		{	
			
		String data = request.getParameter("jsonString");
		System.out.println("-----data="+data);
		JSONArray jsonarr = new JSONArray(data);
		System.out.println("jsonarr="+jsonarr.length());
		for(int i=0;i<jsonarr.length();i++)
		{//2
			JSONObject jsonObj1 = jsonarr.getJSONObject(i);
			 SRNO = jsonObj1.getString("SRNO");
			System.out.println("SRNO...."+SRNO);
			
			MICRCODE = jsonObj1.getString("MICRCODE");
			System.out.println("MICRCODE...."+MICRCODE);
			
			BANKNAME = jsonObj1.getString("BANKNAME");
			System.out.println("BANKNAME...."+BANKNAME);
			
			entby = jsonObj1.getString("ENTRYBY");
			System.out.println("entby...."+entby);
			
			PreparedStatement pst=null;			
					System.out.println("in ........insert.......................");
					
			query="insert into BLOCKEDMICRCODE (SRNO, MICRBANKCODE,BANKNAME,ENTRYBY,ENTRYDATE ) values(?,?,?,?,sysdate)";
					pst=cn.prepareStatement(query);
					pst.setString(1,SRNO);
					pst.setString(2,MICRCODE);
					pst.setString(3,BANKNAME);
					pst.setString(4,entby);
					
		
			pst.executeUpdate();
			System.out.println("After execute...");			
			}//-2	
		
		retMess="Saved Successfully!";
		System.out.println(retMess);
		response.sendRedirect("../blockedMICR.jsp?msg	="+retMess);
		}
		catch(SQLException e)
		{//8
			retMess="Duplicate Bank MICR Code Found";
			System.out.println(""+e);
			response.sendRedirect("../blockedMICR.jsp?msg	="+retMess);
		}//-8
	}
	else
	{
		String qry="";
		int cntfrrtvl=0;
		JSONArray listTrans = new JSONArray();
		JSONObject dataset = new JSONObject();		
		qry="select SRNO, MICRBANKCODE,BANKNAME,ENTRYBY,TO_CHAR(ENTRYDATE,'DD/MM/YYYY hh24:mi:ss')ENTRYDATE  from BLOCKEDMICRCODE order by 1";
		System.out.println("qry=="+qry);
		PreparedStatement ps=cn.prepareStatement(qry);		
		ResultSet rs=ps.executeQuery();

	
		while(rs.next())
		{
			JSONObject obj = new JSONObject();
			obj.put("SRNO", rs.getString("SRNO"));
			obj.put("MICRBANKCODE", rs.getString("MICRBANKCODE"));
			obj.put("BANKNAME", rs.getString("BANKNAME")); 
			obj.put("ENTRYBY", rs.getString("ENTRYBY")); 
			obj.put("ENTRYDATE", rs.getString("ENTRYDATE")); 
						
			listTrans.put(obj);
			
			cntfrrtvl++;
		}
		System.out.println("RETVAL listTrans="+listTrans);
		System.out.println("RESPCODE cntfrrtvl="+cntfrrtvl);
		if(cntfrrtvl!=0)
		{
		dataset.put("RETVAL", listTrans);
		dataset.put("RESPCODE", cntfrrtvl);
		}
		else
		{
		dataset.put("RESPCODE", cntfrrtvl);
		}
		System.out.println("sharayu data="+dataset.toString());				
		out.println(dataset.toString());			
	}
		cn.close();
	}//-1
	catch(NullPointerException e)
	{//6
		retMess="Error--01";
		System.out.println(""+e);
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
	
		   
	}//-10
	//response.sendRedirect("../res_person_entry.jsp");
%>