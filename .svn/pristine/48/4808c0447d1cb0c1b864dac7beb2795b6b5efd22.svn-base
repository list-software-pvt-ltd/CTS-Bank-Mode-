<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>
<%@page import="cts.Configuration"%>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
</html>
<%
	Connection con=null;
	PreparedStatement ps=null,ps_updateRecord;
	ResultSet rs;
	String folderpath2 ="";
	String branchFolder=(String)session.getAttribute("session_branch_code");
	System.out.println("------ in updateCoFilesRecord.jsp --------");
	StringBuffer thisBuffer=new StringBuffer("");	
	String dyna_txt_chqno=request.getParameter("dyna_txt_chqno");
	String dyna_txt_bodf=request.getParameter("dyna_txt_bodf");
	String dyna_txt_sortcd=request.getParameter("dyna_txt_sortcd");
	String dyna_txt_trCd=request.getParameter("dyna_txt_trCd");
	
	String dyna_txt_amt=request.getParameter("dyna_txt_amt");
	String dyna_txt_accNo=request.getParameter("dyna_txt_accNo");
	String dyna_txt_payeeNm=request.getParameter("dyna_txt_payeeNm");
	String dyna_txt_clearingType=request.getParameter("dyna_txt_clearingType");
	String ptof=request.getParameter("txt_ptof");
	
	String hd_chqInfo=request.getParameter("hd_chqInfo");
	String hd_bodf=request.getParameter("hd_bodf");
	String hd_sortCd=request.getParameter("hd_sortCd");
	String hd_TrCd=request.getParameter("hd_TrCd");
	String hd_amt=request.getParameter("hd_amt");
	String hd_accNo=request.getParameter("hd_accNo");
	String hd_payeeNm=request.getParameter("hd_payeeNm");
	String hd_clearingType=request.getParameter("hd_clearingType");
	String hd_ptof=request.getParameter("hd_ptof");
	
	System.out.println("dyna_txt_chqno="+dyna_txt_chqno);
	System.out.println("dyna_txt_bodf="+dyna_txt_bodf);
	System.out.println("dyna_txt_sortcd="+dyna_txt_sortcd);
	System.out.println("dyna_txt_trCd="+dyna_txt_trCd);
	System.out.println("dyna_txt_amt="+dyna_txt_amt);
	System.out.println("dyna_txt_accNo="+dyna_txt_accNo);
	System.out.println("dyna_txt_payeeNm="+dyna_txt_payeeNm);
	System.out.println("dyna_txt_clearingType="+dyna_txt_clearingType);
	System.out.println("ptof="+ptof);
	System.out.println("hd_chqInfo="+hd_chqInfo);
	System.out.println("hd_bodf="+hd_bodf);
	System.out.println("hd_sortCd="+hd_sortCd);
	System.out.println("hd_TrCd="+hd_TrCd);
	System.out.println("hd_amt="+hd_amt);
	System.out.println("hd_accNo="+hd_accNo);
	System.out.println("hd_payeeNm="+hd_payeeNm);
	System.out.println("hd_clearingType="+hd_clearingType);
	System.out.println("ptof="+hd_ptof);
	String query="";
	try
	{//1
	//CLO_CHQNO,CLO_BOFD,CLO_SORTCD,CLO_TRANCD,CLO_AMOUNT,CLO_PAYEE_ACCNO,CLO_PAYEE_ACCNM
		con=Configuration.getConnection();
					
		if(hd_payeeNm.equalsIgnoreCase("null"))
		{
			query="UPDATE CLEARINGOUTWARD set";
			query+=" CLO_CHQNO=?,CLO_SORTCD=?,CLO_TRANCD=?,";//CLO_BOFD=?,CLO_AMOUNT=?,
			query+=" CLO_DRAWEE_ACCNO=?,CLO_PAYEE_ACCNM=?,CLO_CLEARINGTYPE=?,CLO_PPRTOFOLLOW=?";
			query+=" where trim(CLO_CHQNO)=? AND trim(CLO_BOFD)=? AND trim(CLO_SORTCD)=? AND trim(CLO_TRANCD)=? AND trim(CLO_AMOUNT)=? AND";
			query+=" substr(CLO_DRAWEE_ACCNO,-6)=? AND CLO_PAYEE_ACCNM is null AND trim(CLO_CLEARINGTYPE)=?";
			System.out.println(query);
			ps=con.prepareStatement(query);
			ps.setString(1,dyna_txt_chqno);
			//ps.setString(2,dyna_txt_bodf);
			ps.setString(2,dyna_txt_sortcd);
			ps.setString(3,dyna_txt_trCd);
			//ps.setString(5,dyna_txt_amt);
			ps.setString(4,dyna_txt_accNo);
			ps.setString(5,dyna_txt_payeeNm.trim());
			ps.setString(6,dyna_txt_clearingType);
			ps.setString(7,ptof);
			
			//where clause
			ps.setString(8,hd_chqInfo.trim());
			ps.setString(9,hd_bodf.trim());
			ps.setString(10,hd_sortCd.trim());
			ps.setString(11,hd_TrCd.trim());
			ps.setString(12,hd_amt.trim());
			ps.setString(13,hd_accNo.trim());
			//ps.setString(16,hd_payeeNm.trim());
			ps.setString(14,hd_clearingType.trim());
		}
		else
		{
			query="UPDATE CLEARINGOUTWARD set";
			query+=" CLO_CHQNO=?,CLO_SORTCD=?,CLO_TRANCD=?,";//CLO_AMOUNT=?,CLO_BOFD=?
			query+=" CLO_DRAWEE_ACCNO=?,CLO_PAYEE_ACCNM=?,CLO_CLEARINGTYPE=?,CLO_PPRTOFOLLOW=?";
			query+=" where trim(CLO_CHQNO)=? AND trim(CLO_BOFD)=? AND trim(CLO_SORTCD)=? AND trim(CLO_TRANCD)=? AND trim(CLO_AMOUNT)=? AND";
			query+=" substr(CLO_DRAWEE_ACCNO,-6)=? AND trim(CLO_CLEARINGTYPE)=?";// instr(UPPER(CLO_PAYEE_ACCNM),upper(?))>0
			System.out.println(query);
			ps=con.prepareStatement(query);
			ps.setString(1,dyna_txt_chqno);
			//ps.setString(2,dyna_txt_bodf);
			ps.setString(2,dyna_txt_sortcd);
			ps.setString(3,dyna_txt_trCd);
			//ps.setString(5,dyna_txt_amt);
			ps.setString(4,dyna_txt_accNo);
			ps.setString(5,dyna_txt_payeeNm.trim());
			ps.setString(6,dyna_txt_clearingType);
			ps.setString(7,ptof);
			
			//where clause
			ps.setString(8,hd_chqInfo.trim());
			ps.setString(9,hd_bodf.trim());
			ps.setString(10,hd_sortCd.trim());
			ps.setString(11,hd_TrCd.trim());
			ps.setString(12,hd_amt.trim());
			ps.setString(13,hd_accNo.trim());
			//ps.setString(16,hd_payeeNm.trim());
			ps.setString(14,hd_clearingType.trim());
		}
	  if(ps.executeUpdate()>0)
	  {//2
		String imgFrntBw="",imgBackBw="",imgFrntGr="",imgBackGr="",newImgFrntBw="",newImgBackBw="",newImgFrntGr="",newImgBackGr="";
		String scannerStr=Configuration.getConfValByNm("CFG_SCANNER",con);
		if(scannerStr.equalsIgnoreCase("DIGITALCHECK"))
		{//3
			String uploadpath_to_chi = Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
			String folderpath1 = uploadpath_to_chi + branchFolder+ "/ClearingOutward/Images/";
			if (new File(folderpath1).exists()&&new File(folderpath1).list().length>0)
			{//4
				String fileNames[] = new File(uploadpath_to_chi + branchFolder+ "/ClearingOutward/Images/").list();
				int noOfCheques = fileNames.length;
				System.out.println("noOfCheques="+noOfCheques);
			
				int counter=0,lineCnt=-1;
				for(int i = 0; i < noOfCheques; i++)
				{//5
					counter=0;
					String todayDate=Configuration.getDDMMYYYY();
					
					String itemFileName=fileNames[i];
					if(itemFileName.startsWith("Tif200F"))
					{//6	
						System.out.println("\n\nitemFileName===="+ itemFileName+"==chequeList.size()=="+dyna_txt_chqno+dyna_txt_sortcd+dyna_txt_accNo+dyna_txt_trCd);
						if(itemFileName.startsWith("Tif200F"+Long.parseLong(dyna_txt_chqno)+Long.parseLong(dyna_txt_sortcd))&&
								itemFileName.indexOf(""+Long.parseLong(dyna_txt_trCd)+Long.parseLong(todayDate.substring(4,8)+""+todayDate.substring(2,4)+""+todayDate.substring(0,2)))>-1)
						{//7
							System.out.print("Chq Found");
							folderpath2 = uploadpath_to_chi + branchFolder+ "/ClearingOutward/Images/";
							String imgName=itemFileName.split("Tif200F")[1];
							imgName=imgName.substring(0, imgName.length()-4);
							
							System.out.println("itemFileName==11=="+imgName);
							imgFrntBw="Tif200F"+imgName+".tif";
							
							imgBackGr="NA";
		
							if(!(new File(folderpath2+imgFrntBw).exists()) && new File(folderpath2+imgFrntBw).length()==0 )//||!(new File(folderpath2+imgBackBw).exists()) || !(new File(folderpath2+imgFrntGr).exists()))
							{//8
								imgFrntBw="";
							}//8
							else
							{//8
								String imgNameStr=dyna_txt_chqno+dyna_txt_sortcd+"000000"+dyna_txt_trCd;
								newImgFrntBw = "F"+imgNameStr+".tif";
								newImgBackGr = "NA";
								boolean one=new File(folderpath2+imgFrntBw).renameTo(new File(folderpath2+newImgFrntBw));
								System.out.println("one==="+one);
								String qry = "update clearingoutward  set ";
								qry = qry+ " clo_img_frnt_bw=?, ";//+"clo_img_back_bw=?, clo_img_frnt_gr=?, ";
								qry = qry+ " clo_img_back_gr=? where  clo_date_ddmmyyyy=?  and  clo_chqno=? and clo_sortcd=? and CLO_TRANCD=?  ";
								
								PreparedStatement pst =con.prepareStatement(qry);
								pst.setString(1, newImgFrntBw);
								pst.setString(2, newImgBackGr);
								pst.setString(3, Configuration.getDDMMYYYY());
								pst.setString(4, dyna_txt_chqno);
								pst.setString(5, dyna_txt_sortcd);
								pst.setString(6, dyna_txt_trCd);
								
								if(pst.executeUpdate()>0)
									thisBuffer.append("Update Successfully.");
								else
									thisBuffer.append("Record Not Updated.");
								pst.close();
							}//8
						}//7
					}//6
					else if(itemFileName.startsWith("Tif200B"))
					{//6	
						System.out.println("\n\nitemFileName===="+ itemFileName+"==chequeList.size()=="+dyna_txt_chqno+dyna_txt_sortcd+dyna_txt_accNo+dyna_txt_trCd);
						if(itemFileName.startsWith("Tif200B"+Long.parseLong(dyna_txt_chqno)+Long.parseLong(dyna_txt_sortcd))&&
								itemFileName.indexOf(""+Long.parseLong(dyna_txt_trCd)+Long.parseLong(todayDate.substring(4,8)+""+todayDate.substring(2,4)+""+todayDate.substring(0,2)))>-1)
						{//7
							System.out.print("Chq Found");
							folderpath2 = uploadpath_to_chi + branchFolder+ "/ClearingOutward/Images/";
							String imgName=itemFileName.split("Tif200B")[1];
							imgName=imgName.substring(0, imgName.length()-4);
							
							System.out.println("itemFileName==11=="+imgName);
							imgBackBw="Tif200B"+imgName+".tif";
							imgBackGr="NA";
							if(!(new File(folderpath2+imgBackBw).exists()) && new File(folderpath2+imgBackBw).length()==0)
							{//8
								imgBackBw="";
							}//8
							else
							{//8
								String imgNameStr=dyna_txt_chqno+dyna_txt_sortcd+"000000"+dyna_txt_trCd;
								newImgBackBw = "R"+imgNameStr+".tif";
								newImgBackGr = "NA";
								boolean two=new File(folderpath2+imgBackBw).renameTo(new File(folderpath2+newImgBackBw));
								System.out.println("two==="+two);
								String qry = "update clearingoutward  set ";
								qry = qry+ " clo_img_back_bw=? ";//,clo_img_frnt_gr=?";
								qry = qry+ " , clo_img_back_gr=? where  clo_date_ddmmyyyy=?  and  clo_chqno=? and clo_sortcd=? and CLO_TRANCD=?  ";
								
								PreparedStatement pst =con.prepareStatement(qry);
								pst.setString(1, newImgBackBw);
								pst.setString(2, newImgBackGr);
								pst.setString(3, Configuration.getDDMMYYYY());
								pst.setString(4, dyna_txt_chqno);
								pst.setString(5, dyna_txt_sortcd);
								pst.setString(6, dyna_txt_trCd);
								
								if(pst.executeUpdate()>0)
									thisBuffer.append("Update Successfully.");
								else
									thisBuffer.append("Record Not Updated.");
								pst.close();
							}//8
						}//7
					}//6
					else if(itemFileName.startsWith("Jpg100F"))
					{//6	
						System.out.println("\n\nitemFileName===="+ itemFileName+"==chequeList.size()=="+dyna_txt_chqno+dyna_txt_sortcd+dyna_txt_accNo+dyna_txt_trCd);
						if(itemFileName.startsWith("Jpg100F"+Long.parseLong(dyna_txt_chqno)+Long.parseLong(dyna_txt_sortcd))&&
								itemFileName.indexOf(""+Long.parseLong(dyna_txt_trCd)+Long.parseLong(todayDate.substring(4,8)+""+todayDate.substring(2,4)+""+todayDate.substring(0,2)))>-1)
						{//7
							System.out.print("Chq Found");
							folderpath2 = uploadpath_to_chi + branchFolder+ "/ClearingOutward/Images/";
							String imgName=itemFileName.split("Jpg100F")[1];
							imgName=imgName.substring(0, imgName.length()-4);
							
							System.out.println("itemFileName==11=="+imgName);
							imgFrntGr = "Jpg100F"+imgName+".jpg";
							imgBackGr="NA";
		
							if(!(new File(folderpath2+imgFrntGr).exists()) && new File(folderpath2+imgFrntGr).length()==0 )
							{//8
								imgFrntGr = "";									
							}//8
							else
							{//8
								String imgNameStr=dyna_txt_chqno+dyna_txt_sortcd+"000000"+dyna_txt_trCd;
								
								newImgFrntGr = "F"+imgNameStr+"G.jpg";
								newImgBackGr = "NA";
																		
								boolean three=new File(folderpath2+imgFrntGr).renameTo(new File(folderpath2+newImgFrntGr));
								System.out.println("three==="+three);																				
								String qry = "update clearingoutward  set ";									
								qry = qry+ " clo_img_frnt_gr=?,CLO_IMG_BACK_GR=?  ";
								qry = qry+ " where  clo_date_ddmmyyyy=?  and  clo_chqno=? and clo_sortcd=? and CLO_TRANCD=?  ";
								
								PreparedStatement pst =con.prepareStatement(qry);
								pst.setString(1, newImgFrntGr);
								pst.setString(2, newImgBackGr);
								pst.setString(3, Configuration.getDDMMYYYY());
								pst.setString(4, dyna_txt_chqno);
								pst.setString(5, dyna_txt_sortcd);
								pst.setString(6, dyna_txt_trCd);
								
								if(pst.executeUpdate()>0)
									thisBuffer.append("Update Successfully.");
								else
									thisBuffer.append("Record Not Updated.");
								pst.close();
							}//8
						}//7
					}//6
				}//5
			}//4
		}//3
		else
		{//3
			String uploadpath_to_chi = Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
			folderpath2 = uploadpath_to_chi + branchFolder+ "/ClearingOutward/Images/";
			String today=Configuration.getDDMMYY();
			System.out.println("today===="+today);
			String imgNameStr=dyna_txt_chqno+dyna_txt_sortcd+dyna_txt_accNo+today;
			System.out.println("imgNameStr="+imgNameStr);
			newImgFrntBw = "F"+imgNameStr+".tif";
			newImgBackBw = "R"+imgNameStr+".tif";
			newImgFrntGr = "F"+imgNameStr+"G.jpg";
			newImgBackGr = "R"+imgNameStr+"G.jpg";
			String qry = "update clearingoutward  set ";									
			qry = qry+ "  clo_img_frnt_bw = ?, clo_img_back_bw=?, CLO_IMG_FRNT_GR = ?, CLO_IMG_BACK_GR=? ";
			qry = qry+ " where  clo_date_ddmmyyyy=?  and  clo_chqno=? and clo_sortcd=? and CLO_TRANCD=?  ";
			System.out.println("==qry=="+qry);
			PreparedStatement pst =con.prepareStatement(qry);
			pst.setString(1, newImgFrntBw);
			pst.setString(2, newImgBackBw);
			pst.setString(3, newImgFrntGr);
			pst.setString(4, newImgBackGr);
			pst.setString(5, Configuration.getDDMMYYYY());
			pst.setString(6, dyna_txt_chqno);
			pst.setString(7, dyna_txt_sortcd);
			pst.setString(8, dyna_txt_trCd);
			System.out.println("==folderpath2=="+folderpath2);
			System.out.println(newImgFrntBw+"=="+newImgBackBw+"=="+newImgFrntGr+"=="+newImgBackGr);
			if(new File(folderpath2+newImgFrntBw).exists() && new File(folderpath2+newImgBackBw).exists() 
					&& new File(folderpath2+newImgFrntGr).exists() && new File(folderpath2+newImgBackGr).exists())
			{
				if(new File(folderpath2+newImgFrntBw).length()!=0 && new File(folderpath2+newImgBackBw).length()!=0 
						&& new File(folderpath2+newImgFrntGr).length()!=0 && new File(folderpath2+newImgBackGr).length()!=0)
				{
					if(pst.executeUpdate()>0)
						
						thisBuffer.append(" Record Update Successfully.");
					else
						thisBuffer.append("Record Not Updated.");
				}
				else
				{
					thisBuffer.append("Image(s) length Zero");
				}	
			}
			else
			{
				thisBuffer.append("Image(s) Not Found.");
			}
			pst.close();
		}//3
	  }//2
	  else
	  {//2
	  	thisBuffer.append("Record Not Update.");				
	  }//2
	}//1
	catch(SQLException se)
	{//1
		thisBuffer.append("NOCHEQUE#NOCHEQUE$");	
		System.out.println("\n\t SQLException:"+se);
	}//1
	catch(Exception e)
	{//1
		thisBuffer.append("NOCHEQUE#NOCHEQUE$");	
		System.out.println("\n\t Exception:"+e);				
	}//1
	finally
	{//1
		try
		{//2
			if(ps!=null && con!=null /*&& ps_updateRecord!=null*/)
			{//3				
				ps.close();
				//ps_updateRecord.close();
				con.close();
			}//3
		}//2
		catch(SQLException e)
		{//2
			
		}//2
	}//1
	System.out.println("----- exit from fetch outward cheque jsp::::>>>"+thisBuffer);
	out.println("~@~"+thisBuffer.toString());
%>