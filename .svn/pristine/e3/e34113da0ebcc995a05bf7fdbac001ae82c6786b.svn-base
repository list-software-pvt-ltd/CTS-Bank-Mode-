<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>
<%@page import="java.text.*"%>

<%!
	Connection con;
	PreparedStatement ps;
	ResultSet rs;		
%>

<%
			System.out.println("------ in fetch_cbs_file_Data.jsp --------");
			DecimalFormat df = new DecimalFormat("#.##");
			int noOfCheque=0;
			long totalAmount=0;
			String requestData=request.getParameter("chqDtl"); 
			String amt=request.getParameter("amt");
			System.out.println("------ amt:>>"+amt);
			System.out.println("------ requestData:>>"+requestData);			
			//000001416240201031514220222
			//String[] param=requestData.split("_");
			String chqNo=requestData.substring(0,6);//param[0];
			System.out.println("chqNo:>>"+chqNo);		
			//String[] sortCodeAndPayeeName=param[1].split(":");	
			String sortCode=requestData.substring(6,15);//sortCodeAndPayeeName[0];
			System.out.println("sortCode:>>"+sortCode);
			String drwaccount=requestData.substring(15,21);//sortCodeAndPayeeName[1];
			System.out.println("drwaccount:>>"+drwaccount);
								
			StringBuffer thisBuffer=new StringBuffer();
			
			String session_branch_code = (String) session.getAttribute("session_branch_code");
			System.out.println("session_branch_code="+session_branch_code);
					
			String res=null;
			String msg="";	
			int i=0;
			
			String query="";
			
			try
			{
				con=Configuration.getConnection();
				
				/*if(payeeName.equalsIgnoreCase("NA"))
				{
					query="select CLO_CHQNO,CLO_BOFD,CLO_SORTCD,CLO_TRANCD,CLO_AMOUNT,  CLO_DRAWEE_ACCNO,nvl(CLO_PAYEE_ACCNM,'NA'),"+//nvl(substr(CLO_DRAWEE_ACCNO,-7),substr(CLO_DRAWEE_ACCNO,-6))
							"CLO_CLEARINGTYPE,nvl(CLO_PPRTOFOLLOW,'N') from CLEARINGOUTWARD where "
							+" CLO_DATE_DDMMYYYY=? and CLO_CHQNO=? and CLO_AMOUNT=? and CLO_SORTCD=? and ltrim(CLO_PAYEE_ACCNM) is null";//CLO_BRANCH_CD=? and
						
						ps=con.prepareStatement(query);
						//ps.setString(1,session_branch_code);
						//System.out.println("\n\t session_branch_code:>>>>>"+session_branch_code);
						ps.setString(1,Configuration.getDDMMYYYY());
						System.out.println("\n\t Configuration.getDDMMYYYY():>>>>>"+Configuration.getDDMMYYYY());
						ps.setString(2,chqNo);
						System.out.println("\n\t sortCode:>>>>>"+sortCode);
						ps.setString(3,amt);
						ps.setString(4,sortCode);
						ps.setString(5,drwaccount);
						//System.out.println("\n\t drwaccount:>>>>>"+drwaccount);
				}
				else*/
				{
					query="select CLO_CHQNO,CLO_BOFD,CLO_SORTCD,CLO_TRANCD,CLO_AMOUNT, CLO_DRAWEE_ACCNO, nvl(CLO_PAYEE_ACCNM,'NA') CLO_PAYEE_ACCNM,"+ //nvl(substr(CLO_DRAWEE_ACCNO,-7),substr(CLO_DRAWEE_ACCNO,-6)) 
						"CLO_CLEARINGTYPE,nvl(CLO_PPRTOFOLLOW,'N') from CLEARINGOUTWARD where "
						+" CLO_DATE_DDMMYYYY=? and CLO_CHQNO=? and CLO_AMOUNT=? and CLO_SORTCD=? and CLO_DRAWEE_ACCNO=? ";//CLO_BRANCH_CD=? and
					
					ps=con.prepareStatement(query);
					//ps.setString(1,session_branch_code);
					//System.out.println("\n\t session_branch_code:>>>>>"+session_branch_code);
					ps.setString(1,Configuration.getDDMMYYYY());
					System.out.println("\n\t Configuration.getDDMMYYYY():>>>>>"+Configuration.getDDMMYYYY());
					ps.setString(2,chqNo);
					System.out.println("\n\t amt:>>>>>"+amt);
					ps.setString(3,amt);
					System.out.println("\n\t sortCode:>>>>>"+sortCode);
					ps.setString(4,sortCode);
					ps.setString(5,drwaccount);
					System.out.println("\n\t drwaccount:>>>>>"+drwaccount);
				}
				//System.out.println(query);
							
					
				rs=ps.executeQuery();
						
				i=1;
				
				while(rs.next())
				{
					thisBuffer.append(rs.getString(1)+"#"+rs.getString(2)+"#"+rs.getString(3)+"#"+rs.getString(4)+"#"+df.format(Double.parseDouble(rs.getString(5)))+"#"+rs.getString(6)+"#"+rs.getString(7)+"#"+rs.getString(8)+"#"+rs.getString(9));
					i++;					
				}
				//avnet techmology solution!P!0
				if(i==1)
				{
					System.out.println("NOCHEQUE............");
					thisBuffer.append("NOCHEQUE#NOCHEQUE$");	
				}
			}
			catch(SQLException se)
			{
				se.printStackTrace();
				thisBuffer.append("NOCHEQUE#NOCHEQUE$");	
			}
			catch(Exception e)
			{
				e.printStackTrace();
				thisBuffer.append("NOCHEQUE#NOCHEQUE$");	
			}
			finally
			{
				try
				{
					if(rs!=null && ps!=null && con!=null)
					{
						rs.close();
						ps.close();
						con.close();
					}
				}
				catch(SQLException e)
				{
					
				}
			}
	System.out.println("----- exit from fetch_cbs_file_data.jsp::::>>>"+thisBuffer);					
%>
<%=thisBuffer.toString()%>