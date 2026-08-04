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
					System.out.println("In fetchCloEntry.jsp");
                    JSONArray jArr=new JSONArray();
                    JSONArray jArr1=new JSONArray();
                    JSONObject MainjObj=new JSONObject();
                    String requestData=request.getParameter("chqDtl"); 	
                    System.out.println("In fetchCloEntry.jsp"+requestData);
                    PreparedStatement ps=null,ps1=null;
                    String dateArr[]=requestData.split("-");
                	String simpleDate=dateArr[0]+dateArr[1]+dateArr[2];
                	System.out.println(simpleDate);
                	//Connection con=(Connection)session.getAttribute("session_connection");
                	 try
            		{
                    Connection con=Configuration.getConnection();
                 //  Connection con1=Configuration.getConnection();
                    String query="select BRM_BRNCD,BRM_BRNNM,BRM_MICRCD from BRANCHMSTR";
                    String query1="select (select BRM_BRNNM from BRANCHMSTR where BRM_BRNCD=CLO_BRANCH_CD)dipositbrn,CLO_TRANCD,CLO_BRANCH_CD,CLO_CHQNO,CLO_SORTCD,CLO_AMOUNT,CLO_PAYEE_ACCNO,CLO_PAYEE_ACCNM,CLO_DRAWEE_ACCNO,"
                    		 +"CLO_CLEARINGTYPE,CLO_ITEMSEQNO,CLO_MANENTRY from CLEARINGOUTWARD where CLO_DATE_DDMMYYYY=? and CLO_MANENTRY='Y'";//decode(CLO_CLEARINGTYPE,'01','CTS','11','Non CTS',CLO_CLEARINGTYPE)
                    System.out.println(query);
                    System.out.println("In fetchCloEntry.jsp"+query);
                   
    				ps=con.prepareStatement(query);
    				   				
    				ResultSet rs = ps.executeQuery();
    				
                   
                    	while(rs.next())
            			{
            				JSONObject jObj=new JSONObject();
            				jObj.put("BRM_BRNCD", rs.getString(1));
            				jObj.put("BRM_BRNNM", rs.getString(2));
            				jObj.put("BRM_MICRCD", rs.getString(3));
            			
            				jArr.put(jObj);
            				
            				
            			}
                    	
                    	
                    	rs.close();
                    	
                    	ps.close();
            			
                    	//con.close();
            		
               
                    
                	
                	ps1=con.prepareStatement(query1);
    				ps1.setString(1,simpleDate);
    				 ResultSet rs1 = ps1.executeQuery();     
    				
    				while(rs1.next())
                	{
                		JSONObject jObj1=new JSONObject();
                		jObj1.put("CLO_BOFD", rs1.getString("dipositbrn"));
                		jObj1.put("CLO_TRANCD", rs1.getString("CLO_TRANCD"));
                		jObj1.put("CLO_BRANCH_CD", rs1.getString("CLO_BRANCH_CD"));
                		jObj1.put("CLO_CHQNO", rs1.getString("CLO_CHQNO"));
                		jObj1.put("CLO_SORTCD", rs1.getString("CLO_SORTCD"));
                		jObj1.put("CLO_AMOUNT", rs1.getString("CLO_AMOUNT"));
                		jObj1.put("CLO_PAYEE_ACCNO", rs1.getString("CLO_PAYEE_ACCNO"));
                		jObj1.put("CLO_PAYEE_ACCNM", rs1.getString("CLO_PAYEE_ACCNM"));
                		jObj1.put("CLO_DRAWEE_ACCNO", rs1.getString("CLO_DRAWEE_ACCNO"));
                		jObj1.put("CLO_CLEARINGTYPE", rs1.getString("CLO_CLEARINGTYPE"));
                		jObj1.put("CLO_ITEMSEQNO", rs1.getString("CLO_ITEMSEQNO"));
                		jObj1.put("CLO_MANENTRY", rs1.getString("CLO_MANENTRY"));
        				//jObj.put("PASSWORD",Rs1.getString(4));
        				jArr1.put(jObj1);
        				//MainjObj.put("BRANCHES",jArr);
                    	//MainjObj.put("ENTRIES",jArr1);
                	}
    				MainjObj.put("BRANCHES",jArr);
    				MainjObj.put("ENTRIES",jArr1);
    				
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