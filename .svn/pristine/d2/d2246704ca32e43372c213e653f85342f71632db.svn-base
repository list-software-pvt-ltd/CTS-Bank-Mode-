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
					System.out.println("In fetch_pastChequeData.jsp");
                    JSONArray jArr=new JSONArray();
                    JSONArray jArr1=new JSONArray();
                    PreparedStatement ps=null,ps1=null;
                    String simpleDate="";
                    JSONObject MainjObj=new JSONObject();
                    String chqDtl=request.getParameter("chqDtl"); 
                    if(chqDtl.length()!=0)
                    {	
                   		String dateArr[]=chqDtl.split("-");
                		simpleDate=dateArr[0]+dateArr[1]+dateArr[2];
                		System.out.println(simpleDate);
                    }
                   	String cheqNo=request.getParameter("cheqNo");
                	String sortCode=request.getParameter("sortCode");
                	String amount=request.getParameter("amount");
                	String clearingtype=request.getParameter("clearingtype");
                	String cheqtype=request.getParameter("cheqtype");
                	System.out.println(cheqtype+"=="+cheqNo+"=="+simpleDate+"=="+clearingtype);
                	if(clearingtype.equalsIgnoreCase("0"))
                		clearingtype="";	
                	
                	
                	
                	//Connection con=(Connection)session.getAttribute("session_connection");
                	 try
            		{
                    Connection con=Configuration.getConnection();
                 //  Connection con1=Configuration.getConnection();
                 
                 	String cloQuery="select CLO_CHQNO, CLO_SORTCD, CLO_TRANCD,ltrim(CLO_AMOUNT,0) CLO_AMOUNT, CLO_PAYEE_ACCNO," 
                 			+" CLO_PAYEE_ACCNM, CLO_DRAWEE_ACCNO, (select BRM_BRNCD from BRANCHMSTR where BRM_BRNCD=CLO_BRANCH_CD) CLO_BRANCH_CD,"
                 			+" CLO_CLEARINGTYPE,to_char(to_date(CLO_DATE_DDMMYYYY,'ddmmyyyy'),'dd/mm/yyyy') CLO_DDMMYYYY,CLO_IMG_FRNT_GR , "
                 			+" decode( decode((select count(*) From RETURNINWARD  where RTI_PRESENTMENTDATE=CLO_DATE_DDMMYYYY) ,0,'N','Y'),'N','NA','Y',nvl(RETINWRETCODES.RETDESCR,'Accepted')) as RETURNSTATUS, "
                 			+" decode(CLEARINGOUTWARD.CLO_CONVERT_FLG,'N','Not Uploaded','Y','Saved and Uploaded','D',decode(nvl(CLO_REJECTREASON,'D'),'0','Accepted By NPCI','D','Sent To NPCI','Rejected By NPCI')) as STATUS "
                 			+" from CLEARINGOUTWARD "
                            +" join BRANCHMSTR on BRM_BRNCD=CLO_BRANCH_CD "
							+" left outer join RETURNINWARD "
							+" on  to_number(CLEARINGOUTWARD.CLO_ITEMSEQNO )=to_number(RETURNINWARD.RTI_ITEMSEQNO) "
							+" AND CLEARINGOUTWARD.CLO_DATE_DDMMYYYY=RETURNINWARD.RTI_PRESENTMENTDATE "
							+" left outer join RETINWRETCODES on RETINWRETCODES. RETCODE= RETURNINWARD.RTI_RETURNREASON "
                 			+" where CLO_CHQNO=nvl(?,CLO_CHQNO)" 
                 			+" and  CLO_SORTCD= nvl(?,CLO_SORTCD)"
                 			+" and to_number(CLO_AMOUNT) = nvl(?,to_number(CLO_AMOUNT))"
                 			+" and CLO_DATE_DDMMYYYY =nvl(?,CLO_DATE_DDMMYYYY)"
                 			+" and  CLO_CLEARINGTYPE=nvl(?,CLO_CLEARINGTYPE)";
                 	
                 	String cliQuery="select CLI_SERIALNO,CLI_PAYORBANKROUTNO,CLI_TRANSCODE,ltrim(CLI_AMOUNT,0) CLI_AMOUNT,CLI_ACCOUNTNO,CLI_PAYEENAME,CLI_DEPOSITORACCT,"
                 			+" (select BRM_BRNCD from BRANCHMSTR where BRM_MICRCD=CLI_PAYORBANKROUTNO) CLO_BRANCH_CD,CLI_CLEARINGTYPE,to_char(to_date(CLI_DDMMYYYY,'ddmmyyyy'),'dd/mm/yyyy') CLO_DDMMYYYY,CLI_IMAGEFILE3, "
                 		    +" decode(nvl(RETRUNOUTWARD.RTO_RETURNREASONCODE,'NA'),'NA','ACCEPTED',RETINWRETCODES.RETDESCR) as RETURNSTATUS "
                 			+" from CLEARINGINWARD "
                 			+" left outer join RETRUNOUTWARD "
                            +" on  RETRUNOUTWARD.RTO_DDMMYYYY  =CLEARINGINWARD.CLI_DDMMYYYY and CLEARINGINWARD.CLI_CLRSRNO=RETRUNOUTWARD.RTO_ITEMSEQUENCENO "
                            +" left outer join  RETINWRETCODES "
                            +" on  RETINWRETCODES.RETCODE=RETRUNOUTWARD.RTO_RETURNREASONCODE "
                 			+" where CLI_SERIALNO=nvl(?,CLI_SERIALNO)" 
                 			+" and  CLI_PAYORBANKROUTNO= nvl(?,CLI_PAYORBANKROUTNO)" 
                 			+" and  to_number(CLI_AMOUNT) =nvl(?,to_number(CLI_AMOUNT))"
                 			+" and CLI_DDMMYYYY =nvl(?,CLI_DDMMYYYY)"
                 			+" and  CLI_CLEARINGTYPE = nvl(?,CLI_CLEARINGTYPE)";
                    
                   	if(cheqtype.equalsIgnoreCase("clearingOutward"))
                   	{
    					ps=con.prepareStatement(cloQuery);
                   		System.out.println(cloQuery);
                   	}
                   	else
                   	{
    				
    					ps=con.prepareStatement(cliQuery);
                   		System.out.println(cloQuery);
                   	}
                   	
                   	ps.setString(1, cheqNo);
                   	ps.setString(2, sortCode);
                   	ps.setString(3, amount);
                   	ps.setString(4, simpleDate);
                   	ps.setString(5, clearingtype);
                   	
    				   				
    				ResultSet rs = ps.executeQuery();
    				
                   
                    	while(rs.next())
            			{
            				JSONObject jObj=new JSONObject();
            				jObj.put("CLO_CHQNO", rs.getString(1));
            				jObj.put("CLO_SORTCD", rs.getString(2));
            				jObj.put("CLO_TRANCD", rs.getString(3));
            				jObj.put("CLO_AMOUNT", rs.getString(4));
            				jObj.put("CLO_PAYEE_ACCNO", rs.getString(5));
            				jObj.put("CLO_PAYEE_ACCNM", rs.getString(6));
            				jObj.put("CLO_DRAWEE_ACCNO", rs.getString(7));
            				jObj.put("CLO_BRANCH_CD", rs.getString(8));
            				jObj.put("CLO_CLEARINGTYPE", rs.getString(9));
            				jObj.put("CLO_DDMMYYYY", rs.getString(10));
            				jObj.put("IMGNM",rs.getString(11));
            				if(cheqtype.equalsIgnoreCase("clearingOutward"))
            				{
            					jObj.put("RETURNSTATUS",rs.getString(12));
            					jObj.put("STATUS",rs.getString(13));
            				}
            				else{
            					jObj.put("RETURNSTATUS",rs.getString(12));
            				}
            				jArr.put(jObj);
            				
            				
            			}
                    	if(jArr.length() > 0)
                    		MainjObj.put("ENTRIES",jArr);
                    	else
                    		MainjObj.put("ENTRIES","NO DATA");
                    	
                    	rs.close();
                    	
                    	ps.close();
            			
                    	//con.close();
            		
               
                    
             	
           
    				}
                    catch(Exception e)
                    {
            			e.printStackTrace();
            			MainjObj.put("ERROR","2");
                    }
    				
    				 System.out.println("MainjObj.toString()"+MainjObj.toString());
%>
<%=MainjObj.toString()%>