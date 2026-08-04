 
	<%@ page contentType="text/html; charset=iso-8859-1" language="java"
	import="java.sql.*" import="org.apache.commons.io.FileUtils" errorPage="" %>
	<%@page import="java.util.*"%>
	<%@page import="java.io.*"%>
	<%@page import="cts.*"%>
	<%@page import="org.json.JSONArray" %>
	<%@page import="org.json.JSONException" %>
	<%@page import="org.json.JSONObject" %>
 
	<%
	String branchFolder = "";//(String) session.getAttribute("session_branch_code");
	String path="";
	System.out.println("############# fetch all      DELETE RETURN  INWARD.jsp");
	branchFolder = (String) session.getAttribute("session_branch_code");
	int cntfrrtvl=0;
	String fileNameList = "";
	String brncd="";
	String retStr="";
	int brnFoundCount = 0;
	PreparedStatement pst = null;
	int  saveFlag=0;
	
	
	String res=null,frdate=null,cltype=null,whattodo=null,xmlfile=" ";
	String msg="",amount="",sortCode="",tranCode="",cheqNo="",bofd="",branch="",loginby="",downPath="";	
	int i=0,j=0;
	StringBuffer thisBuffer=new StringBuffer();
	
	String query="";
	JSONArray listTrans = new JSONArray();
	JSONObject dataset = new JSONObject();
	
	try
	{
		Connection cn = Configuration.getConnection();
		//System.out.println("cn============================="+cn);
	//sam 	path=Configuration.getConfValByNm("CFG_uploadpath_to_CHI",cn)+ branchFolder+ "/ClearingOutward/";
		if(cn == null)
		throw new Exception("Session is Null");
		cltype=request.getParameter("clearingtype");
		
		frdate=request.getParameter("datepicker");
		frdate=frdate.replace("-", "");
		whattodo=request.getParameter("whattodo");//whattodo
		System.out.println("############# whattodo"+whattodo);
		brncd=request.getParameter("opt_branch_code");
		branch=request.getParameter("brncd");
		loginby=request.getParameter("loginby");
		System.out.println("############# frdate=="+frdate);
		System.out.println("############# cltype=="+cltype);
		System.out.println("############# loginby=="+loginby);
		downPath=request.getParameter("downPath");
		System.out.println("############# downPath=="+downPath);
		/* try
		{
			xmlfile=request.getParameter("xmlfilename");
		}
		catch(Exception e1)
		{
			xmlfile="NA";
			e1.printStackTrace();
		} */
		if(whattodo.equalsIgnoreCase("FF"))
		{
			/* query="select distinct nvl(CLO_XMLFILENAME,'NOT MERGED YET') from CLEARINGOUTWARD where "
					+"CLO_DATE_DDMMYYYY=? and  CLO_CLEARINGTYPE=? and "
					+"CLO_BRANCH_CD=decode(?,'All',CLO_BRANCH_CD,?) and CLO_BOFD in (select "
					+"BRM_MICRCD from BRANCHMSTR where BRM_BRNCD = decode(?,'All',BRM_BRNCD,?))"; */
			query="select distinct RTI_FILENAME from RETURNINWARD   where RTI_DDMMYYYY=? and RTI_CLEARINGTYPE=?  ";
					
			System.out.println("SAM query=="+query);
			PreparedStatement ps=cn.prepareStatement(query);
			ps.setString(1, frdate);
			ps.setString(2, cltype);
			ResultSet rs=ps.executeQuery();
			
			i=1;
			while(rs.next())
			{
				System.out.println("rs.getString(1)=="+rs.getString(1));
				thisBuffer.append(rs.getString(1)+"~");
				cntfrrtvl++;
			}
			if(cntfrrtvl>0)
			{
				String qry="select sum(RTI_AMOUNT),count(*) from RETURNINWARD where RTI_DDMMYYYY=? and RTI_CLEARINGTYPE=?";
				System.out.println("SAM query2=="+qry);
				PreparedStatement ps1=cn.prepareStatement(qry);
				ps1.setString(1, frdate);
				ps1.setString(2, cltype);
				ResultSet rs1=ps1.executeQuery();
				System.out.println("SAM rs1=="+rs1);
				Double sumAmt=0.0;
				if(rs1.next())
				{	
					//System.out.println("SAM rs1111=="+ rs1.getDouble(1));
					//System.out.println("SAM rs12222=="+ rs1.getString(2));
					sumAmt=rs1.getDouble(1)/100;
					System.out.println("sumAmt=="+sumAmt);
					dataset.put("TOTAMT", sumAmt);
					dataset.put("TOTCOUNT", rs1.getString(2));
				}
				dataset.put("RESPCODE", "0");
				dataset.put("RETVAL", thisBuffer.toString());		
				rs1.close();ps1.close();
			}
			else
			{
				dataset.put("RESPCODE", "1");
				dataset.put("RETVAL", "FAIL");
			}
			//System.out.println(dataset.toString());				
			out.println(dataset.toString());
		}
		else if(whattodo.equalsIgnoreCase("D"))
		{
				String qry1="select distinct RTI_FILENAME from RETURNINWARD  where RTI_DDMMYYYY=? and RTI_CLEARINGTYPE=? ";
						
				System.out.println("SAM qry1=="+qry1);
				PreparedStatement pss=cn.prepareStatement(qry1);
				pss.setString(1, frdate);
				pss.setString(2, cltype);
				ResultSet rss=pss.executeQuery();
				
				i=1;
				int cntinsrt=0;
				while(rss.next())
				{
					System.out.println("rss.getString(1)=="+rss.getString(1));
					// RETURNINWARD_DELETE   RTI_DDMMYYYY, RTI_XMLFILENAME,RTI_ENTRYBY
					String qry_inst="insert into RETURNINWARD_DELETE (RTI_DDMMYYYY, RTI_XMLFILENAME, RTI_ENTRYBY) values (sysdate, '"+rss.getString(1)+"', '"+loginby+"')";
					PreparedStatement pstt=cn.prepareStatement(qry_inst);
					//	pst.setString(1, strCustId);
						int instcnt=pstt.executeUpdate();
						System.out.println("instcnt=="+instcnt);
						if (instcnt > 0) 
						{
							System.out.println("inserted successfully");
							cntinsrt++;
						}
						else
							dataset.put("RESPCODE", "1");
				}
				System.out.println("cnt insrt count=="+cntinsrt);
				if(cntinsrt>0)
				{
					String deleteQry="delete from RETURNINWARD where RTI_DDMMYYYY='"+frdate+"' and RTI_CLEARINGTYPE='"+cltype+"' ";
					PreparedStatement pstdel=cn.prepareStatement(deleteQry);
					//pstdel.setString(1, frdate);
					//pstdel.setString(1, cltype);
					int delete1=pstdel.executeUpdate();
					System.out.println("delete1=="+delete1);
					if(delete1 > 0)
					{					
								//downPath
								System.out.println("downPath=="+downPath);
								downPath=downPath+"/ReturnInward/";
								System.out.println("after downPath=="+downPath);
								File file = new File(downPath); 
									String[] myFiles;    
									if (file.isDirectory()) {
									    myFiles = file.list();
									    for (int x = 0; x < myFiles.length; x++) {
									        File myFile = new File(file, myFiles[x]); 
									        myFile.delete();
									    }
										System.out.println("sucessfully all files deleted");									 
									}
									dataset.put("RESPCODE", "0");	
							
							
					}//if
					else{
						
					//downPath
					System.out.println("downPath=="+downPath);
					downPath=downPath+"/ReturnInward/";
					System.out.println("after downPath=="+downPath);
					File file = new File(downPath); 
						String[] myFiles;    
						if (file.isDirectory()) {
						    myFiles = file.list();
						    for (int x = 0; x < myFiles.length; x++) {
						        File myFile = new File(file, myFiles[x]); 
						        myFile.delete();
						    }
							System.out.println("sucessfully all files deleted");									 
						}
						 
						}
						
						dataset.put("RESPCODE", "0");	
				
					}
			
			
			out.println(dataset.toString());
		}	
		cn.close();
	}
	catch(Exception e)
	{
	
		System.out.println("Exception >>>"+e);
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
<%!

%> 