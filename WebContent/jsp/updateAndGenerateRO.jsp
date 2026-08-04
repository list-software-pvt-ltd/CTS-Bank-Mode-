<%@page import="java.security.PrivateKey"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*" %>

<%
	System.out.println("******************** start of updateAndGenerateRO.jsp **********************");
	int updateCount=0;
	String retVal="",str="",paramString="",oldData="",ctstoken=null,flag="";
	Connection con=Configuration.getConnection();
	String[] alldatarr=null;
	String[] olddatarr=null;
	ctstoken=request.getParameter("CTSTOKEN");
	flag=request.getParameter("flag");
	System.out.println("\n\t >>>"+request.getParameter("CTSTOKEN"));
	try {
		str=request.getParameter("retstr");
		paramString=str;
		System.out.println("\n\t >>>"+str);
		alldatarr=paramString.split("!A!");
		System.out.println("\n\t >>>"+alldatarr.length);
	}
	catch(Exception e)
	{
		System.out.println("\n\t Exception "+e.getClass()+"\t"+e.getMessage());
		 
	}	
	System.out.println("\n=============================");
	try {
		oldData=request.getParameter("data");
		System.out.println("oldData=="+oldData);
		olddatarr=oldData.split("!@!");
		System.out.println("olddatarr=="+olddatarr.length);
	}
	catch(Exception e)
	{
		System.out.println("\n\t Exception "+e.getClass()+"\t"+e.getMessage());
		 
	}
	PrivateKey privateKey=null;
	/*String sqlUpdate="update RETRUNOUTWARD set RTO_PAYORBANKROUTNO=?, RTO_RETURNREASONCODE=?,RTO_RETREASONCOMMT=? ,RTO_TRANSACTIONCODE=?,RTO_CHEQUENO=? where RTO_CHEQUENO=?";
	sqlUpdate+="and RTO_PAYORBANKROUTNO=? and RTO_TRANSACTIONCODE=? and RTO_AMOUNT=?";
	sqlUpdate+=" and RTO_DDMMYYYY=?";*/
	String sqlUpdate="update RETRUNOUTWARD set RTO_PAYORBANKROUTNO=?, RTO_RETURNREASONCODE=?,RTO_RETREASONCOMMT=? ,RTO_TRANSACTIONCODE=?,RTO_CHEQUENO=? where RTO_ITEMSEQUENCENO=?";
	sqlUpdate+=" and RTO_DDMMYYYY=?";
	//sqlUpdate+=" and RTO_XMLFILENAME=?";	
	String CLEARINGTYPE="";
	PreparedStatement ps_update=con.prepareStatement(sqlUpdate);
	
	PreparedStatement pst_clearingType = null;
	try {// 2
		pst_clearingType = con
				.prepareStatement("select distinct RTO_CLEARINGTYPE from RETRUNOUTWARD where RTO_DDMMYYYY=?");
		pst_clearingType.setString(1, Configuration.getDDMMYYYY());
		ResultSet rs = null;
		rs = pst_clearingType.executeQuery();
		if (rs.next()) {// 3
			//writeLog("*** in if ****:");
			CLEARINGTYPE = rs.getString(1);
		}
		rs.close();
		pst_clearingType.close();
	}catch(Exception e){ }
	
	
	if(alldatarr!=null  )
	{//1
		int length=alldatarr.length;
	
		try
		{//2
	/* 		for(int j=0;j<olddatarr.length;j++)
			{
				String oldChqs[]=alldatarr[j].split("!Q!");	
				String oldchqno=oldChqs[0];
				String oldsortcode=oldChqs[1];
				String oldtranCode=oldChqs[2]; */
				
				
				for(int i=0;i<alldatarr.length;i++)
				{//3
					String singleChqs[]=alldatarr[i].split("!Q!");	
					
					String newchqno=singleChqs[0];
					String newsortcode=singleChqs[1];
					String newRetReasonCode=singleChqs[2];
					String newRetReasonCommt=singleChqs[3];
					String newAmount=singleChqs[4];
					String tranCode=singleChqs[5];
					
					//------------------------------------------------
					String oldChqs[]=olddatarr[i].split("!Q!");	
					System.out.println("oldChqs==="+oldChqs[0]+"=="+oldChqs[1]+"=="+oldChqs[2]+"==");
					String oldchqno=oldChqs[0];
					String oldsortcode=oldChqs[1];
					String oldtranCode=oldChqs[2];
					String itemseqno=oldChqs[8];
					System.out.println("\n\t newAmount:>>>"+newAmount);
					System.out.println("\n\t itemseqno>>>"+itemseqno);

					double newAmount1=Double.parseDouble(newAmount.trim());
					newAmount1=newAmount1*100;

					newAmount=" "+new Double(newAmount1).longValue();

				//	newAmount=Configuration.lPad(newAmount.trim(),18,"0");
				System.out.println("\n\t newAmount:@@@@>>>"+newAmount);
					newAmount=Configuration.lPad(newAmount.trim(),18,"");
					System.out.println("\n\t newAmount:####>>>"+newAmount);
			
					
					System.out.println("\n\t RTO_CHEQUENO:>>>"+newchqno);
					System.out.println("\n\t RTO_SORTCODE:>>>"+newsortcode);
					
					System.out.println("\n\t newRetReasonCode:>>>"+newRetReasonCode);
					System.out.println("\n\t newRetReasonCommt:>>>"+newRetReasonCommt);
					System.out.println("\n\t newAmount:>>>"+newAmount);
					System.out.println("\n\t tranCode:>>>"+tranCode);
					System.out.println("\n\t oldchqno:>>>"+oldchqno);
					System.out.println("\n\t oldsortcode:>>>"+oldsortcode);
					System.out.println("\n\t oldtranCode:>>>"+oldtranCode);
					
					ps_update.setString(1,newsortcode);
					ps_update.setString(2,newRetReasonCode);
					ps_update.setString(3,newRetReasonCommt);
					ps_update.setString(4,tranCode);
					ps_update.setString(5,newchqno);
					ps_update.setString(6,itemseqno);
					ps_update.setString(7,Configuration.getDDMMYYYY());
					
					/*ps_update.setString(6,oldchqno);
					ps_update.setString(7,oldsortcode);
					ps_update.setString(8,oldtranCode);
					ps_update.setString(9,newAmount);
					ps_update.setString(10,Configuration.getDDMMYYYY());*/
					
					if(ps_update.executeUpdate()>0)
					{//4
							updateCount++;
							System.out.println("\n\t updateCount:>>>"+updateCount);

					}//4
																									
				}//3
			//}
		 }//2
		 catch(Exception e)
		 {//2
		 	System.out.println("\n\t Exception "+e);
		 e.printStackTrace();
		 }//2
		 
		 if(updateCount>0)
		 {//5
			 String returnValue="";
				
				String CHI_Bank_Name=Configuration.getConfValByNm("CFG_CHI_BANKNAME",con);
				String uppath=Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
			 	uppath=new File(uppath).getParent();
	 			System.out.println(uppath); 
				privateKey= new CtsSecurity(con).getPrivateKey(uppath+"\\WEB-INF\\classes\\cts\\");
				if(CHI_Bank_Name.equals("NPCI")||CHI_Bank_Name.equals("AXIS")||CHI_Bank_Name.equals("IDBI")||CHI_Bank_Name.equals("KOTAK"))
					returnValue=new Engine(con).generateRRF(privateKey);	
				else
					returnValue=new Engine(con).generateRET(CLEARINGTYPE);	
				
							String[] strArr=returnValue.split("#");	
							if(strArr[0].indexOf("SUCCESS")>-1)
							{//3
									retVal="Return Outward File Generated Successfully.\n";
							}//3
		 		
							else 
							{//3
								if(strArr[0].indexOf("FAIL1")>-1)
								{	
									retVal="Problem in XML Tags";
								}
								else if(strArr[0].indexOf("FAIL2")>-1)
								{
									retVal="Problem to write XML";
								}
								else if(strArr[0].indexOf("FAIL3")>-1)
								{
									retVal="Problem to generate RRF file";
								}
								else if(strArr[0].indexOf("No return outward Cheque")>-1)
								{
										retVal="No return outward Cheque";
								}
								else
								{
									retVal=strArr[0];
								}
							}//3
		 }//5
		 else
		{//1
			retVal="Record is Not Updated.";
		}//1	
	}//1
	else
	{//1
		retVal="Problem Should Not Be Null";
	}//1
	//finally
	//response.sendRedirect("../return_outward.jsp?retVal="+retVal);
	 {
	 	try
		{
			if(con!=null && ps_update!=null)
			{
				ps_update.close();
				con.close();
			}
			
		}
		catch(Exception e){}
	 }
	System.out.println("******************** end of updateAndGenerateRO.jsp *************************");
%>
<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="../return_outward.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();
}

</script>
<body onLoad="Forward()">
<form id="formid" name="formid" method="post">
	<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value="<%=ctstoken%>">
	<input type="hidden" id="retVal" name="retVal" value="<%=retVal%>">
	<input type="hidden" id="flag" name="flag" value="<%=flag%>">
</form>
</body>
</html>