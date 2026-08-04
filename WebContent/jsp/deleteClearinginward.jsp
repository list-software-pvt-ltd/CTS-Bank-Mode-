 
	<%@ page contentType="text/html; charset=iso-8859-1" language="java"
	import="java.sql.*" import="org.apache.commons.io.FileUtils" errorPage="" %>
	<%@page import="java.util.*"%>
	<%@page import="java.io.*"%>
	<%@page import="cts.*"%>
	<%@page import="org.json.JSONArray" %>
	<%@page import="org.json.JSONException" %>
	<%@page import="org.json.JSONObject" %>
		<%@page import="org.apache.commons.io.FileUtils" %>
 
	<%
	String branchFolder = "";//(String) session.getAttribute("session_branch_code");
	String path="";
	System.out.println("############# fetch all DELETE CLEARING INWARD.jsp");
	branchFolder = (String) session.getAttribute("session_branch_code");
	int cntfrrtvl=0;
	String fileNameList = "";
	String brncd="";
	String retStr="";
	int brnFoundCount = 0;
	PreparedStatement pst = null;
	int  saveFlag=0;
	
	
	String res=null,frdate=null,cltype=null,whattodo=null,xmlfile=" ";
	String msg="",amount="",sortCode="",tranCode="",cheqNo="",bofd="",branch="",loginby="",downPath="",cylNo="";	
	int i=0,j=0;
	StringBuffer thisBuffer=new StringBuffer();
	
	String query="",cbs_flg="";
	JSONArray listTrans = new JSONArray();
	JSONObject dataset = new JSONObject();
	
	try
	{
		Connection cn = Configuration.getConnection();
		//System.out.println("cn============================="+cn);
	//sam 	path=Configuration.getConfValByNm("CFG_uploadpath_to_CHI",cn)+ branchFolder+ "/ClearingOutward/";
		if(cn == null)
		throw new Exception("Session is Null");
		//cltype=request.getParameter("clearingtype");
		
		frdate=request.getParameter("datepicker");
		frdate=frdate.replace("-", "");
		whattodo=request.getParameter("whattodo");//whattodo
		System.out.println("############# whattodo"+whattodo);
		brncd=request.getParameter("opt_branch_code");
		branch=request.getParameter("brncd");
		loginby=request.getParameter("loginby");
		cylNo=request.getParameter("cylNo");
		System.out.println("############# cylNo=="+cylNo);
		System.out.println("############# frdate=="+frdate);
		System.out.println("############# cltype=="+cltype);
		System.out.println("############# loginby=="+loginby);
		downPath=request.getParameter("downPath");
		cbs_flg=request.getParameter("cbs_flg");
		System.out.println("############# cbs_flg=="+cbs_flg);
		System.out.println("############# downPath=="+downPath);
		String CFG_CONTINUE_CLEARING_FLG=Configuration.getConfValByNm("CFG_CONTINUE_CLEARING_FLG",cn);
		String clr_query="select distinct CLI_CLEARINGTYPE from CLEARINGINWARD where CLI_DDMMYYYY=?";
		PreparedStatement clr_ps1=cn.prepareStatement(clr_query);
		clr_ps1.setString(1, frdate);		
		ResultSet clr_rs1=clr_ps1.executeQuery();
		if(clr_rs1.next())
		{
			cltype=clr_rs1.getString(1);
		}
		clr_rs1.close();clr_ps1.close();
		//
		System.out.println("############# cltype=="+cltype);
		if(whattodo.equalsIgnoreCase("FF"))
		{		
			if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
			{	
				query="select distinct CLI_XMLFILENAME from CLEARINGINWARD "
					+"where CLI_DDMMYYYY=? and CLI_CLEARINGTYPE=? and CLI_CONTI_CYCNO=? ";
			}
			else
			{
				query="select distinct CLI_XMLFILENAME from CLEARINGINWARD "
						+"where CLI_DDMMYYYY=? and CLI_CLEARINGTYPE=? ";
			}	
			System.out.println("SAM query=="+query);
			PreparedStatement ps=cn.prepareStatement(query);
			ps.setString(1, frdate);
			ps.setString(2, cltype);
			if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
			{
				ps.setString(3, cylNo);
			}
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
				String qry="";
				if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
				{	
					 qry="select sum(CLI_AMOUNT),count(*) from CLEARINGINWARD where CLI_DDMMYYYY=? and CLI_CLEARINGTYPE=? and CLI_CONTI_CYCNO=? ";
				}
				else
				{
					 qry="select sum(CLI_AMOUNT),count(*) from CLEARINGINWARD where CLI_DDMMYYYY=? and CLI_CLEARINGTYPE=? ";
				}
				System.out.println("SAM query2=="+qry);
				PreparedStatement ps1=cn.prepareStatement(qry);
				ps1.setString(1, frdate);
				ps1.setString(2, cltype);
				if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
				{
					ps1.setString(3, cylNo);
				}
				ResultSet rs1=ps1.executeQuery();
				System.out.println("SAM rs1=="+rs1);
				Double sumAmt=0.0;
				if(rs1.next())
				{						
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
		//----------------------------
		else if(whattodo.equalsIgnoreCase("C"))
		{			
			if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
			{	
				query="select distinct CLI_CONTI_CYCNO from CLEARINGINWARD "
						+"where CLI_DDMMYYYY=? and CLI_CLEARINGTYPE=?  ";
						
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
					dataset.put("RESPCODE", "0");
					dataset.put("RETVAL", thisBuffer.toString());		
					
				}
				else
				{
					dataset.put("RESPCODE", "1");
					dataset.put("RETVAL", "FAIL");
				}
			}
			else
			{
				dataset.put("RESPCODE", "2");
				dataset.put("RETVAL", "NA");				
			}
			//System.out.println(dataset.toString());				
			out.println(dataset.toString());
		}
		//--------------------
		else if(whattodo.equalsIgnoreCase("D"))
		{
			if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
			{
				query="select count(*) from RETRUNOUTWARD where RTO_DDMMYYYY=? and RTO_CLEARINGTYPE=? and RTO_CONTI_CYCNO=?";
			}
			else
			{
				query="select count(*) from RETRUNOUTWARD where RTO_DDMMYYYY=? and RTO_CLEARINGTYPE=? ";
			}
			int count=0;		
			System.out.println("SAM query=="+query);
			PreparedStatement ps=cn.prepareStatement(query);
			ps.setString(1, frdate);
			ps.setString(2, cltype);
			if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
			{ 
				ps.setString(3, cylNo);
			}
			ResultSet rs=ps.executeQuery();			
			i=1;
			if(rs.next())
			{
				System.out.println("rs.getInt(1)=="+rs.getInt(1));
				count=rs.getInt(1);
			}
			if(count==0)
			{
				String qry1="";
				if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
				{
					qry1="select distinct CLI_XMLFILENAME from CLEARINGINWARD "
							+"where CLI_DDMMYYYY=? and CLI_CLEARINGTYPE=? and CLI_CONTI_CYCNO=?";
				}
				else
				{
					qry1="select distinct CLI_XMLFILENAME from CLEARINGINWARD "
							+"where CLI_DDMMYYYY=? and CLI_CLEARINGTYPE=? ";
				}
				System.out.println("SAM qry1=="+qry1);
				PreparedStatement pss=cn.prepareStatement(qry1);
				pss.setString(1, frdate);
				pss.setString(2, cltype);
				if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
				{
					pss.setString(3, cylNo);
				}
				ResultSet rss=pss.executeQuery();
				
				i=1;
				int cntinsrt=0;
				String qry_inst="";
				while(rss.next())
				{
					System.out.println("rss.getString(1)=="+rss.getString(1));
					if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
					{
						qry_inst="insert into clearinginward_delete (cli_ddmmyyyy, cli_xmlfilename, cli_entryby,CLI_CONTI_CYCNO) values (sysdate, '"+rss.getString(1)+"', '"+loginby+"','"+cylNo+"')";
					}
					else
					{
						qry_inst="insert into clearinginward_delete (cli_ddmmyyyy, cli_xmlfilename, cli_entryby) values (sysdate, '"+rss.getString(1)+"', '"+loginby+"')";
					}
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
					String deleteQry="";
					if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
					{		
						deleteQry="delete from CLEARINGINWARD where CLI_DDMMYYYY='"+frdate+"' and CLI_CLEARINGTYPE='"+cltype+"' and CLI_CONTI_CYCNO='"+cylNo+"' ";
					}
					else
					{
						deleteQry="delete from CLEARINGINWARD where CLI_DDMMYYYY='"+frdate+"' and CLI_CLEARINGTYPE='"+cltype+"' ";
					}
					PreparedStatement pstdel=cn.prepareStatement(deleteQry);
					int delete1=pstdel.executeUpdate();
					System.out.println("delete1=="+delete1);
					if(delete1 > 0)
					{
						String queryhis="";
						if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
						{
							queryhis="select count(*) from CLEARINGINWARD_HISTORY where CLI_DDMMYYYY='"+frdate+"' and CLI_CONTI_CYCNO='"+cylNo+"' ";
						}
						else
						{
							queryhis="select count(*) from CLEARINGINWARD_HISTORY where CLI_DDMMYYYY='"+frdate+"' ";
						}
							int count_his=0;		
						System.out.println("SAM CLEARINGINWARD_HISTORY cnt queryhis=="+queryhis);
						PreparedStatement pstd=cn.prepareStatement(queryhis);
						
						ResultSet rst=pstd.executeQuery();			
						i=1;
						while(rst.next())
						{
							System.out.println("rst.getInt(1)=="+rst.getInt(1));
							count_his=rst.getInt(1);
						}
						System.out.println("count_his=="+count_his);
						if(count_his>0)
						{
							String deletehistoryQry="";
							if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y")&& cbs_flg.equalsIgnoreCase("Y"))
							{
								deletehistoryQry="delete from CLEARINGINWARD_HISTORY where CLI_DDMMYYYY='"+frdate+"' and CLI_CLEARINGTYPE='"+cltype+"' and CLI_CONTI_CYCNO='"+cylNo+"' ";
							}
							else
							{
								deletehistoryQry="delete from CLEARINGINWARD_HISTORY where CLI_DDMMYYYY='"+frdate+"' and CLI_CLEARINGTYPE='"+cltype+"' ";
							}
							PreparedStatement psthistorydel=cn.prepareStatement(deletehistoryQry);
							
							int deletecnt=psthistorydel.executeUpdate();
							System.out.println("deletecnt=="+deletecnt);
							if(deletecnt >0)
							{									
								//downPath
								System.out.println("downPath=="+downPath);
								downPath=downPath+"/ClearingInward/";
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
									//------------------
									downPath=downPath+"/Images/";
									File file1 = new File(downPath); 
									String[] myFiles1;    
									if (file1.isDirectory()) {
									    myFiles1 = file1.list();
									    for (int x = 0; x < myFiles1.length; x++) {
									        File myFile = new File(file1, myFiles1[x]); 
									        myFile.delete();
									    }
										System.out.println("sucessfully all images files deleted");									 
									}									
									dataset.put("RESPCODE", "0");	
							}
							else
								dataset.put("RESPCODE", "1");
					}//if
					else
					{
					System.out.println("downPath=="+downPath);
					downPath=downPath+"/ClearingInward/";
					System.out.println("after downPath=="+downPath);
					String after_downPath=downPath;
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
						
						downPath=downPath+"/Images/";
						File file1 = new File(downPath); 
						String[] myFiles1;    
						if (file1.isDirectory()) {
						    myFiles1 = file1.list();
						    for (int x = 0; x < myFiles1.length; x++) {
						        File myFile = new File(file1, myFiles1[x]); 
						        myFile.delete();
						    }
							System.out.println("sucessfully all images files deleted");		
							
							File directory = new File(after_downPath);
							FileUtils.cleanDirectory(directory);
							System.out.println("----sucessfully all flolder  deleted----");		
						}
						
						dataset.put("RESPCODE", "0");	
					}	
					}
					else
						dataset.put("RESPCODE", "1");
					
				}
				else
					dataset.put("RESPCODE", "1");
			}
			else
			{
				dataset.put("RESPCODE", "1");
				dataset.put("RETVAL", "FAIL");
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