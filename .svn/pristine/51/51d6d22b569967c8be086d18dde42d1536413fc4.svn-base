<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="java.text.*"%>
<%@page import="cts.*"%>


<%

	 int noOfCheque=0;
	 double totalAmount=0;

			//Configuration.writeLog("#############	in fetch_outward_cheques.jsp");
			StringBuffer thisBuffer=new StringBuffer();
			
			String session_branch_code = (String) session.getAttribute("session_branch_code");
			////Configuration.writeLog("11111session_branch_code="+session_branch_code);
			
			Connection con=null;
			String res=null;
			String msg="";	
			int i=0;
			
			String query="";
			DecimalFormat df = new DecimalFormat("#.##");
			
			try
			{
				
				con=Configuration.getConnection(); 
				////Configuration.writeLog("bfr con............"+con);
				/*
					CLO_BOFD	1		Y	VARCHAR2 (9 Byte)		No
					CLO_CHQNO	2		Y	VARCHAR2 (6 Byte)		No
					CLO_SORTCD	3		Y	VARCHAR2 (9 Byte)		No
					CLO_TRANCD	4		Y	VARCHAR2 (3 Byte)		No
					CLO_AMOUNT	5		Y	VARCHAR2 (18 Byte)		No
					CLO_PAYEE_ACCNO	6		Y	VARCHAR2 (25 Byte)		No
					CLO_PAYEE_ACCNM	7		Y	VARCHAR2 (25 Byte)		No
					CLO_DRAWEE_ACCNO	8		Y	VARCHAR2 (25 Byte)		No
					CLO_IMG_FRNT_BW	9		Y	VARCHAR2 (27 Byte)		No
					CLO_IMG_BACK_BW	10		Y	VARCHAR2 (27 Byte)		No
					CLO_IMG_FRNT_GR	11		Y	VARCHAR2 (27 Byte)		No
					CLO_IMG_BACK_GR
					CLO_DATE_DDMMYYYY	12		Y	VARCHAR2 (8 Byte)		No
					CLO_BRANCH_CD	VARCHAR2 (5 Byte)
								*/
					//out.println("getDDMMYYYY:"+Configuration.getDDMMYYYY());
				query="select CLO_CHQNO, CLO_SORTCD, nvl(trim(CLO_PAYEE_ACCNM),'NA') CLO_PAYEE_ACCNM,"
						+" CLO_IMG_FRNT_GR, CLO_IMG_BACK_GR,CLO_AMOUNT,"
						+ "CLO_TRANCD,CLO_PPRTOFOLLOW,CLO_OLBC from CLEARINGOUTWARD where CLO_BRANCH_CD IN" 
						+ "(SELECT BRM_BRNCD from BRANCHMSTR START WITH BRM_BRNCD="+session_branch_code
						+ " CONNECT BY PRIOR BRM_BRNCD=BRM_PARENTBRCD) and CLO_DATE_DDMMYYYY='"
						+ Configuration.getDDMMYYYY()+"' and CLO_CONVERT_FLG='N' " //order by 1,2,7";
						+" order by 9";
				////Configuration.writeLog(query);
				PreparedStatement ps=con.prepareStatement(query);
				ResultSet rs=ps.executeQuery();
				////Configuration.writeLog("bfr WHILE............");	
				i=1;
				
				while(rs.next())
				{
					System.out.println((rs.getString("CLO_CHQNO")+"=="+df.format((double)Long.parseLong(rs.getString("CLO_AMOUNT"))/100)));
					////Configuration.writeLog("IN WHILE............"+rs.getString(1)+"#"+rs.getString(2)+"#"+rs.getString(3)+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+(Long.parseLong(rs.getString(6))/100)+"#"+rs.getString(7)+"#"+rs.getString(8)+"$");
					
					//thisBuffer.append(rs.getString(1)+"#"+rs.getString(2)+"#"+rs.getString(3)+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+(Long.parseLong(rs.getString(6))/100)+"#"+rs.getString(7)+"#"+rs.getString(8)+"$");
					thisBuffer.append(rs.getString("CLO_CHQNO")+"#"+rs.getString("CLO_SORTCD")+"#"+
					rs.getString("CLO_PAYEE_ACCNM")+"#"+rs.getString("CLO_IMG_FRNT_GR")+
					"#"+rs.getString("CLO_IMG_BACK_GR")+"#"+df.format((double)Long.parseLong(rs.getString("CLO_AMOUNT"))/100)+
					"#"+rs.getString("CLO_TRANCD")+"#"+rs.getString("CLO_PPRTOFOLLOW")+"$");
					i++;	
				
				}
				rs.close();
				ps.close();
				if(i==1)
				{
					////Configuration.writeLog("NOCHEQUE............");
					thisBuffer.append("NOCHEQUE#NOCHEQUE$");	
				}
				
				msg=thisBuffer.toString();
			
			
			//get total amount and total no of cheque to be fetch
			if(!(msg.indexOf("NOCHEQUE")>-1))
			{//1
				//Configuration.writeLog("Calculating total amount and total number of cheques............");
				 //Connection con=Configuration.getConnection();
				 //Configuration.writeLog("session_branch_code:"+session_branch_code);
				 PreparedStatement ps2=null;
				 ps2=con.prepareStatement("select count(*), sum(CLO_AMOUNT) from CLEARINGOUTWARD where "
						 +"CLO_DATE_DDMMYYYY="+Configuration.getDDMMYYYY()+" and CLO_CONVERT_FLG='N' and "
						 +"CLO_BRANCH_CD="+session_branch_code);
				
				 ResultSet rs2=ps2.executeQuery();
				 while(rs2.next())
				 {//2
					  noOfCheque=rs2.getInt(1);
					  totalAmount=(double)rs2.getLong(2)/100;
					  Configuration.writeLog("Total number Of Cheque :"+noOfCheque);
  					  Configuration.writeLog("Total number Amount :"+totalAmount);
				 }//2
				 rs2.close();
				 ps2.close();
			}//1
	
			
			/*
			//Configuration.writeLog("#############	in fetch_outward_cheques.jsp");
			String up_path = Configuration.getConfValByNm("CFG_uploadpath_to_CHI");
			//Configuration.writeLog("up_path#########    "+up_path+"      #######");
			StringBuffer chqBuffer=new StringBuffer();
			String chq_dtls = "";
			String path = "" ;
			int img_found_cnt = 0;
			String session_branch_code = (String) session.getAttribute("session_branch_code");
			//Configuration.writeLog("session_branch_code="+session_branch_code);
			
			String imgpath = up_path+session_branch_code;
			BufferedReader br = null;
			
			path = imgpath + "/ClearingOutward/MICR Waveforms/chequedetails.txt";
			
			//Configuration.writeLog("Path="+path);
			try 
			{
	 			int line_cnt=0;
				String sCurrentLine;
	 
				br = new BufferedReader(new FileReader(path));
				
				while ((sCurrentLine = br.readLine()) != null) 
				{
					//Configuration.writeLog(line_cnt+"line_cnt:"+sCurrentLine);
					line_cnt++;
					String chqNo = sCurrentLine.substring(9,15);
					String sort_code = sCurrentLine.substring(15,24);
				    //Configuration.writeLog(chqNo+"_"+sort_code);
					String accHolderName = sCurrentLine.substring(60,70);
					chq_dtls = chqNo+"_"+sort_code+"#"+chqNo+"_"+sort_code+"#"+accHolderName+"$";
					img_found_cnt ++;
					//Configuration.writeLog("chq_dtls"+chq_dtls);
					chqBuffer.append(chq_dtls);	
					
				}
				
			} 
			catch (IOException e) {
				e.printStackTrace();
				chqBuffer.append("NOCHEQUE#NOCHEQUE$");	
			} 
			finally {
				try {
					if (br != null)br.close();
				} catch (IOException ex) {
					ex.printStackTrace();
					chqBuffer.append("NOCHEQUE#NOCHEQUE$");	
				}
			}
			
			if(img_found_cnt == 0)
			{
				chqBuffer.append("NOCHEQUE#NOCHEQUE$");	
			}*/
			}
			catch(SQLException se)
			{
				//Configuration.writeLog("\n\n"+se+"\n\n");
				se.printStackTrace();
				thisBuffer.append("NOCHEQUE#NOCHEQUE$");	
			}
			catch(Exception e)
			{
				//Configuration.writeLog("\n\n"+e+"\n\n");
				e.printStackTrace();
				thisBuffer.append("NOCHEQUE#NOCHEQUE$");	
			}
	 
	thisBuffer.append("!P!"+noOfCheque+"#"+df.format(totalAmount));
	thisBuffer.append("!^~!");
	String retStr=ClearingOutward.getNonUpdatedImages(session_branch_code);
	System.out.print("==11=="+retStr);
	thisBuffer.append(retStr);
	thisBuffer.append("!^~!");
	retStr=ClearingOutward.getNonUpdatedJson(session_branch_code);
	thisBuffer.append(retStr);
	thisBuffer.append("!^~!");
	retStr=ClearingOutward.getNonUpdatedMicrData(session_branch_code,con);
	System.out.print("==22=="+retStr);
	thisBuffer.append(retStr);
	con.close();
	////Configuration.writeLog("----- exit from fetch outward cheque jsp::::>>>"+thisBuffer);					
%>
<%=thisBuffer.toString()%>