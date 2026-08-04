<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
	Connection con=null;
	PreparedStatement ps=null;
	ResultSet rs=null;		
		System.out.println("------ in fetch_cbs_file_Data.jsp --------");
			int noOfCheque=0;
			long totalAmount=0;
			String requestData=request.getParameter("chqDtl"); 	
			System.out.println("------ requestData:>>"+requestData);			
			//154425_416211001:Avinash Tukaram
			String[] param=requestData.split("_");
			String chqNo=param[0];
			System.out.println("chqNo:>>"+chqNo);		
			String[] sortCodeAndPayeeName=param[1].split(":");	
			String sortCode=sortCodeAndPayeeName[0];
			System.out.println("sortCode:>>"+sortCode);
			String payeeName=sortCodeAndPayeeName[1];
			System.out.println("payeeName:>>"+payeeName);
								
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
				
				query="select CLO_CHQNO,CLO_BOFD,CLO_SORTCD,CLO_TRANCD,CLO_AMOUNT,CLO_PAYEE_ACCNO,CLO_PAYEE_ACCNM,CLO_CLEARINGTYPE from CLEARINGOUTWARD where CLO_BRANCH_CD=? and CLO_DATE_DDMMYYYY=? and CLO_CHQNO=? and CLO_SORTCD=? and CLO_PAYEE_ACCNM like ?";
				
				//System.out.println(query);
				ps=con.prepareStatement(query);
				ps.setString(1,session_branch_code);
				System.out.println("\n\t session_branch_code:>>>>>"+session_branch_code);
				ps.setString(2,Configuration.getDDMMYYYY());
				System.out.println("\n\t Configuration.getDDMMYYYY():>>>>>"+Configuration.getDDMMYYYY());
				ps.setString(3,chqNo);
				System.out.println("\n\t sortCode:>>>>>"+sortCode);
				ps.setString(4,sortCode);
				ps.setString(5,payeeName+"%");
				System.out.println("\n\t payeeName:>>>>>"+payeeName);			
					
				rs=ps.executeQuery();
						
				i=1;
				
				while(rs.next())
				{
					thisBuffer.append(rs.getString(1)+"#"+rs.getString(2)+"#"+rs.getString(3)+"#"+rs.getString(4)+"#"+(Long.parseLong(rs.getString(5)))+"#"+rs.getString(6)+"#"+rs.getString(7)+"#"+rs.getString(8));
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
				thisBuffer.append("NOCHEQUE#NOCHEQUE$");	
			}
			catch(Exception e)
			{
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