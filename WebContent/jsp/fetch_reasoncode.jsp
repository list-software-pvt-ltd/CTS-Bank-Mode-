	<%@ page contentType="text/html; charset=iso-8859-1" language="java"
	import="java.sql.*" import="org.apache.commons.io.FileUtils" errorPage="" %>
	<%@page import="java.util.*"%>
	<%@page import="java.io.*"%>
	<%@page import="cts.*"%>
	
	<%
	
				System.out.println("############# fetch all itemreturn reason code.jsp");
				 
			 
				String fileNameList = "";
				 
				int brnFoundCount = 0;
				PreparedStatement pst = null;
			 
				
				String res=null;
				String msg="";	
				int i=0,j=0;
				 StringBuffer thisBuffer=new StringBuffer();
				
				String query="";
	
				try
				{
					Connection cn = Configuration.getConnection();//(Connection)session.getAttribute("session_connection");
					System.out.println("cn="+cn);
					if(cn == null)
						throw new Exception("Session is Null");
					
				 
					
					query="select itm_extension_reason_code,itm_description from itemextensionreason_chm order by 1";
					
					//System.out.println(query);
					PreparedStatement ps=cn.prepareStatement(query);
					//ps.setString(1,Configuration.getDDMMYYYY());
					//ps.setString(2,Configuration.getDDMMYYYY());
					//ps.setString(3,Configuration.getDDMMYYYY());
					//ps.setString(4,Configuration.getDDMMYYYY());
					ResultSet rs=ps.executeQuery();
							
					i=1;
					
					while(rs.next())
					{
						//System.out.println("IN WHILE ............");
						
						thisBuffer.append(rs.getString(1)+"--"+rs.getString(2)+"$");
						
						i++;	
					
					}
					
					
					if(i==1)
					{
						System.out.println("NO_DATA............");
						thisBuffer.append("NO_DATA#NO_DATA$");	
					}
					cn.close();
			
				}
				catch(Exception e)
			{
				//out.println("~~~~Exception  :"+e);
				System.out.println("\n\n\n\n\n\n");
				System.out.println("Exception in list_branches.jsp::::>>>"+e);
				e.printStackTrace();
				if(e.getMessage().indexOf("Session is Null")>-1)
				{
					thisBuffer.append("SessionIsNull");	
				}
				else
				{
					thisBuffer.append("ERR#ERR$"+e);		
				}	
			}
				

	 
						
%>
<%=thisBuffer.toString()%>