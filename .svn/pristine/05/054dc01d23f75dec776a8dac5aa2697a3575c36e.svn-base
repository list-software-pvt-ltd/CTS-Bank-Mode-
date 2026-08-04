<%@ page import="java.io.*,java.util.*, jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>
<%@ page import="java.net.SocketException"%>
<%@ page import="org.apache.commons.net.ftp.*" %>
<%-- <%@ page import="org.apache.commons.fileupload.servlet.*" %> --%>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="cts.*" %>
<%@ page import="java.sql.*" %>


<%!
		public String getClearingOutwardCheques()
		{//getClearingOutwardCheques
				Connection con=null;
				PreparedStatement ps=null,ps_updateRecord=null;
				ResultSet rs=null;
				StringBuffer allRec=new StringBuffer("");
				int i=0;
					try
					{
					
					con=Configuration.getConnection();
					ps_updateRecord=con.prepareStatement("update clearingoutward set CLO_WARNING_CODE='' where CLO_DATE_DDMMYYYY=?");
			ps_updateRecord.setString(1,Configuration.getDDMMYYYY());
			
			if(ps_updateRecord.executeUpdate()>0)
			{
				System.out.println("All CLO_WARNING_CODE code updated in clearingoutward");
			}
						int retValue=OutwardValidations.validateClearingOutward();
						
						String sql="select CLO_BOFD, CLO_CHQNO, CLO_SORTCD, CLO_TRANCD, CLO_AMOUNT, CLO_PAYEE_ACCNM, CLO_CLEARINGTYPE, CLO_PPRTOFOLLOW, WAR_DESC from  clearingoutward,warning where instr(nvl(CLO_WARNING_CODE,'NA'),WAR_CODE)>0 and CLO_DATE_DDMMYYYY=? and CLO_CONVERT_FLG='N'";
							
							ps=con.prepareStatement(sql);
							ps.setString(1,Configuration.getDDMMYYYY());
							//ps.setString(1,"05062014");
							rs=ps.executeQuery();

							while(rs.next())
							{//1
							 i++;
									allRec.append(rs.getString(1)+"#"+rs.getString(2)+"#"+rs.getString(3)+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6)+"#"+rs.getString(7)+"#"+rs.getString(8)+"#"+rs.getString(9)+"!Q!");
							}//1
							
							if(i==0)
							{
								allRec.append("No Data Found!Q!");
							}
					}
					catch(SQLException e)
					{
						System.out.println("\n\t SQLException in WarningCheques.getClearingOutwardCheques:"+e);
						allRec.append("Data Base Problem!Q!SQLException");
					}
					catch(NullPointerException e)
					{
						System.out.println("\n\t NullPointerException in WarningCheques.getClearingOutwardCheques:"+e);
						allRec.append("Invalid Data.!Q!NullPointerException");
					}
					catch(Exception e)
					{
						System.out.println("\n\t Exception in WarningCheques.getClearingOutwardCheques:"+e);
						allRec.append("Problem at Server.!Q!Exception");
					}
					finally
					{
						try
						{
						 if(rs!=null)	
							rs.close();
						 if(ps!=null)								
							ps.close();	
						 if(ps_updateRecord!=null)								
							ps_updateRecord.close();						
						 if(con!=null)								
							con.close();									
						}
						catch(Exception e){}
					}
					return allRec.toString();
		}//getClearingOutwardCheques		
%>
<%
	System.out.println("\n\t inside getCoWarningCheque.jsp");
	
	 String retVal=getClearingOutwardCheques();

%>
<%=retVal%>