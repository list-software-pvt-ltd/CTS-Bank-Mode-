<%@page import="org.json.JSONException"%>
<%@page import="java.io.File"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="cts.Configuration"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.sql.*"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%
	System.out.println("In getClearingInwardData.jsp");
    JSONArray jArr=new JSONArray();
    JSONArray jArr1=new JSONArray();
    JSONObject MainjObj=new JSONObject();   
    PreparedStatement ps=null,ps1=null;
    String flag="N";
    String cbs_flg="";
  	try
	{
      Connection con=Configuration.getConnection();
      String sysdate=Configuration.getDDMMYYYY();//DSP sysdate
      String cyclNo = request.getParameter("cyclNo");
      flag = request.getParameter("flag");
      System.out.println("flag="+flag);
      cbs_flg=request.getParameter("cbs_flg");
      System.out.println("cbs_flg="+cbs_flg);
      String query="";
      float ver=Float.parseFloat(Configuration.getConfValByNm("CFG_OURVERSIONNO", con));
      String updateflag=Configuration.getConfValByNm("CFG_CLRINWRD_UPDTFLG", con);
      String CFG_CONTINUE_CLEARING_FLG=Configuration.getConfValByNm("CFG_CONTINUE_CLEARING_FLG",con);
      System.out.println("CFG_CONTINUE_CLEARING_FLG="+CFG_CONTINUE_CLEARING_FLG);
      System.out.println("cyclNo="+cyclNo);
      if(ver>1)
      {
      query="select rownum,CLI_BOFDROUTNO,CLI_SERIALNO,CLI_PAYORBANKROUTNO,CLI_TRANSCODE,RTO_RETURNREASONCODE,RTO_RETREASONCOMMT,"
    	 +" lpad(CLI_AMOUNT,18,'0') CLI_AMOUNT,LPAD(CLI_ACCOUNTNO,15,'0') CLI_ACCOUNTNO,CLI_CLEARINGTYPE,CLI_IMAGEFILE3,CLI_CLRSRNO,CLI_PAYEENAME,CLI_INSTRUDATE "//CLI_ITEMSEQUENCENO
    	 +" from  CLEARINGINWARD left outer join RETRUNOUTWARD on CLI_DDMMYYYY = RTO_DDMMYYYY  and CLI_CLRSRNO=RTO_ITEMSEQUENCENO " 
    	 +" where CLI_DDMMYYYY =? and nvl(RTO_STATUS,'Y')<>'D' ";
      //to_char(sysdate,'ddmmyyyy') DSP sysdate
      }
      else
      {
    	  query="select rownum,CLI_BOFDROUTNO,CLI_SERIALNO,CLI_PAYORBANKROUTNO,CLI_TRANSCODE,RTO_RETURNREASONCODE,RTO_RETREASONCOMMT,"
    		    	 +" lpad(CLI_AMOUNT,18,'0') CLI_AMOUNT,LPAD(CLI_ACCOUNTNO,15,'0') CLI_ACCOUNTNO,CLI_CLEARINGTYPE,CLI_IMAGEFILE3,CLI_CLRSRNO,CLI_PAYEENAME,CLI_INSTRUDATE "//CLI_ITEMSEQUENCENO
    		    	 +" from  CLEARINGINWARD left outer join RETRUNOUTWARD on CLI_SERIALNO=RTO_CHEQUENO and CLI_DDMMYYYY = RTO_DDMMYYYY  " 
    		    	 +" where CLI_DDMMYYYY =? and nvl(RTO_STATUS,'Y')<>'D' ";
    	  //to_char(sysdate,'ddmmyyyy') DSP sysdate
      }
      
      if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y") && cbs_flg.equalsIgnoreCase("Y"))
      {
    	  System.out.println("flag==="+flag);
    	  if(flag.equals("Y"))
    	  {
    		  query=query+" and CLI_CONTI_CYCNO=?  order by RTO_RETURNREASONCODE ";
    	  } 
    	  else{
    	  	query=query+" and CLI_CONTI_CYCNO=? and CLI_CYCL_FILENO =(select max(CLI_CYCL_FILENO) from CLEARINGINWARD where CLI_DDMMYYYY =? and CLI_CONTI_CYCNO=?) order by RTO_RETURNREASONCODE ";
    	  }
      }
      else
      {
    	  query=query+" order by RTO_RETURNREASONCODE ";
      }
      String query1="select lpad(RETCODE,2,'0'),lpad(RETCODE,2,'0')||'--'||RETDESCR from RETINWRETCODES";
      System.out.println("query==="+query);
      ps=con.prepareStatement(query1);	  
     // ps.setString(1, sysdate);
      ResultSet rs = ps.executeQuery();
      while(rs.next())
    	{
    	  JSONObject jObj=new JSONObject();
    		jObj.put("retcode", rs.getString(1));
    		jObj.put("retdesc", rs.getString(2));
    		jArr.put(jObj);
    	}
      	rs.close();
      	ps.close();
      	
      	ps1=con.prepareStatement(query);
      	ps1.setString(1, sysdate);
      	if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y") && cbs_flg.equalsIgnoreCase("Y"))
        {
      		if(flag.equals("Y"))
      		{
      			ps1.setString(2, cyclNo);  
      		}
      		else
      		{
      			ps1.setString(2, cyclNo);
          		ps1.setString(3, sysdate);
          		ps1.setString(4, cyclNo);      			
      		}
        }      	 
		ResultSet rs1 = ps1.executeQuery();     		
		while(rs1.next())
       	{
       		JSONObject jObj1=new JSONObject();
       		jObj1.put("rownum", rs1.getString("rownum"));
       		jObj1.put("CLI_BOFDROUTNO", rs1.getString("CLI_BOFDROUTNO"));
       		jObj1.put("CLI_SERIALNO", rs1.getString("CLI_SERIALNO"));
       		jObj1.put("CLI_PAYORBANKROUTNO", rs1.getString("CLI_PAYORBANKROUTNO"));
       		jObj1.put("CLI_TRANSCODE", rs1.getString("CLI_TRANSCODE"));
       		jObj1.put("CLI_AMOUNT", rs1.getString("CLI_AMOUNT"));
       		jObj1.put("CLI_ACCOUNTNO", rs1.getString("CLI_ACCOUNTNO"));
       		jObj1.put("CLI_CLEARINGTYPE", rs1.getString("CLI_CLEARINGTYPE"));
       		jObj1.put("CLI_IMAGEFILE3", rs1.getString("CLI_IMAGEFILE3"));
       		jObj1.put("RTO_RETURNREASONCODE", rs1.getString("RTO_RETURNREASONCODE"));
       		jObj1.put("RTO_RETREASONCOMMT", rs1.getString("RTO_RETREASONCOMMT"));
       		//jObj1.put("CLI_ITEMSEQUENCENO", rs1.getString("CLI_ITEMSEQUENCENO"));		
       		jObj1.put("CLI_CLRSRNO", rs1.getString("CLI_CLRSRNO"));	
       		jObj1.put("CLI_PAYEENAME", rs1.getString("CLI_PAYEENAME"));	
       		jObj1.put("CLI_INSTRUDATE", rs1.getString("CLI_INSTRUDATE"));	
			jArr1.put(jObj1);
			
       	}
		System.out.println("jArr1==="+jArr1.length());
		if(jArr1.length()>0)
		{	
			MainjObj.put("ENTRIES",jArr1);
			MainjObj.put("RETCODES",jArr);
			MainjObj.put("UPDATEFLAG",updateflag);
		}
		else
		{
			MainjObj.put("ENTRIES","NODATA");	
		}
		
		rs1.close();
		ps1.close();
		con.close();
		}
              catch(SQLException e)
              {
      			e.printStackTrace();
      			MainjObj.put("ERROR","2");
              }
		 catch(JSONException j)
              {
      			j.printStackTrace();
      			MainjObj.put("ERROR","3");
              }
		 System.out.println("MainjObj.toString()"+MainjObj.toString());
%>
<%=MainjObj.toString()%>