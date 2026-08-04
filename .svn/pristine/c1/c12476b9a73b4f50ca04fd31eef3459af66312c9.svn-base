<%@page import="java.io.*"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="cts.Configuration"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%
	
	try
	{
		String jsonString=request.getParameter("jsonString");
		JSONArray jsonArray=new JSONArray(jsonString);
		String micrString=request.getParameter("micrData");
		JSONArray micrArray=new JSONArray(micrString);
		String date=Configuration.getDDMMYYYY();
		String ddmmyy=Configuration.getDDMMYY();
		System.out.println("\n\n\ndate="+date);
		PreparedStatement ps=null;
		Connection con=Configuration.getConnection();
		//con.setAutoCommit(false);
		String branchFolder=(String)session.getAttribute("session_branch_code");
		StringBuffer thisBuffer=new StringBuffer();
		String scannerStr=Configuration.getConfValByNm("CFG_SCANNER",con);
		String uploadpath_to_chi = Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
		for(int j=0;j<jsonArray.length();j++)
		{
			JSONObject obj=jsonArray.getJSONObject(j);
			String chqNo=obj.getString("CLO_CHQNO");
			String sortCode=obj.getString("CLO_SORTCD");
			String tranCode=obj.getString("CLO_TRANCD");
			String accNo=obj.getString("CLO_DRAWEE_ACCNO");
			String paperToFollow=obj.getString("CLO_PPRTOFOLLOW");
			String itemSeqNo=obj.getString("CLO_ITEMSEQNO");
			{
				String query="UPDATE CLEARINGOUTWARD set";
				query+=" CLO_CHQNO=?,CLO_SORTCD=?,CLO_TRANCD=?,CLO_DRAWEE_ACCNO=?,CLO_PPRTOFOLLOW=?";
				query+=" where trim(CLO_ITEMSEQNO)=? and CLO_DATE_DDMMYYYY=? and CLO_BRANCH_CD=? ";// instr(UPPER(CLO_PAYEE_ACCNM),upper(?))>0
				System.out.println(query);
				ps=con.prepareStatement(query);
				ps.setString(1,chqNo);
				ps.setString(2,sortCode);
				ps.setString(3,tranCode);
				ps.setString(4,accNo);
				ps.setString(5,paperToFollow);
				//where clause
				ps.setString(6,itemSeqNo.trim());
				ps.setString(7,date);
				ps.setString(8,branchFolder);
			}
			if(ps.executeUpdate()>0)
			{//2
				String imgFrntBw="",imgBackBw="",imgFrntGr="",imgBackGr="",newImgFrntBw="",newImgBackBw="",newImgFrntGr="",newImgBackGr="";
				
				if(scannerStr.equalsIgnoreCase("DIGITALCHECK"))
				{//3
					
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
							
							
							String itemFileName=fileNames[i];
							if(itemFileName.startsWith("Tif200F"))
							{//6	
								//System.out.println("\n\nitemFileName===="+ itemFileName+"==chequeList.size()=="+dyna_txt_chqno+dyna_txt_sortcd+dyna_txt_accNo+dyna_txt_trCd);
								if(itemFileName.startsWith("Tif200F"+Long.parseLong(chqNo)+Long.parseLong(sortCode))&&
										itemFileName.indexOf(""+Long.parseLong(tranCode)+Long.parseLong(date.substring(4,8)+""+date.substring(2,4)+""+date.substring(0,2)))>-1)
								{//7
									System.out.print("Chq Found");
									String folderpath2 = uploadpath_to_chi + branchFolder+ "/ClearingOutward/Images/";
									String imgName=itemFileName.split("Tif200F")[1];
									imgName=imgName.substring(0, imgName.length()-4);
									
									System.out.println("itemFileName==11=="+imgName);
									imgFrntBw="Tif200F"+imgName+".tif";
									
									imgBackGr="NA";
				
									if(!(new File(folderpath2+imgFrntBw).exists()) && new File(folderpath2+imgFrntBw).length()==0)//||!(new File(folderpath2+imgBackBw).exists()) || !(new File(folderpath2+imgFrntGr).exists()))
									{//8
										imgFrntBw="";
									}//8
									else
									{//8
										String imgNameStr=chqNo+sortCode+"000000"+tranCode;
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
										pst.setString(3, date);
										pst.setString(4, chqNo);
										pst.setString(5, sortCode);
										pst.setString(6, tranCode);
										
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
								//System.out.println("\n\nitemFileName===="+ itemFileName+"==chequeList.size()=="+dyna_txt_chqno+dyna_txt_sortcd+dyna_txt_accNo+dyna_txt_trCd);
								if(itemFileName.startsWith("Tif200B"+Long.parseLong(chqNo)+Long.parseLong(sortCode))&&
										itemFileName.indexOf(""+Long.parseLong(tranCode)+Long.parseLong(date.substring(4,8)+""+date.substring(2,4)+""+date.substring(0,2)))>-1)
								{//7
									System.out.print("Chq Found");
									String folderpath2 = uploadpath_to_chi + branchFolder+ "/ClearingOutward/Images/";
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
										String imgNameStr=chqNo+sortCode+"000000"+tranCode;
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
										pst.setString(3, date);
										pst.setString(4, chqNo);
										pst.setString(5, sortCode);
										pst.setString(6, tranCode);
										
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
								//System.out.println("\n\nitemFileName===="+ itemFileName+"==chequeList.size()=="+dyna_txt_chqno+dyna_txt_sortcd+dyna_txt_accNo+dyna_txt_trCd);
								if(itemFileName.startsWith("Jpg100F"+Long.parseLong(chqNo)+Long.parseLong(sortCode))&&
										itemFileName.indexOf(""+Long.parseLong(tranCode)+Long.parseLong(date.substring(4,8)+""+date.substring(2,4)+""+date.substring(0,2)))>-1)
								{//7
									System.out.print("Chq Found");
									String folderpath2 = uploadpath_to_chi + branchFolder+ "/ClearingOutward/Images/";
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
										String imgNameStr=chqNo+sortCode+"000000"+tranCode;
										
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
										pst.setString(3, date);
										pst.setString(4, chqNo);
										pst.setString(5, sortCode);
										pst.setString(6, tranCode);
										
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
					String folderpath2 = uploadpath_to_chi + branchFolder+ "/ClearingOutward/Images/";
					String imgNameStr=chqNo+sortCode+accNo+ddmmyy;
					System.out.println("imgNameStr="+folderpath2+imgNameStr);
					newImgFrntBw = "F"+imgNameStr+".tif";
					newImgBackBw = "R"+imgNameStr+".tif";
					newImgFrntGr = "F"+imgNameStr+"G.jpg";
					newImgBackGr = "R"+imgNameStr+"G.jpg";
					String qry = "update clearingoutward  set ";									
					qry = qry+ "  clo_img_frnt_bw = ?, clo_img_back_bw=?, CLO_IMG_FRNT_GR = ?, CLO_IMG_BACK_GR=? ";
					qry = qry+ " where  clo_date_ddmmyyyy=?  and  trim(CLO_ITEMSEQNO)=?";//clo_chqno=? and clo_sortcd=? and CLO_TRANCD=?  ";
					System.out.println("==qry=="+qry);
					PreparedStatement pst =con.prepareStatement(qry);
					pst.setString(1, newImgFrntBw);
					pst.setString(2, newImgBackBw);
					pst.setString(3, newImgFrntGr);
					pst.setString(4, newImgBackGr);
					pst.setString(5, date);
					pst.setString(6, itemSeqNo.trim());
					//pst.setString(6, chqNo);
					//pst.setString(7, sortCode);
					//pst.setString(8, tranCode);
					System.out.println("==folderpath2=="+folderpath2);
					System.out.println(folderpath2+newImgFrntBw);
					System.out.println(folderpath2+newImgBackBw);
					System.out.println(folderpath2+newImgFrntGr);
					System.out.println(folderpath2+newImgBackGr);
					if(new File(folderpath2+newImgFrntBw).exists() && new File(folderpath2+newImgBackBw).exists() 
							&& new File(folderpath2+newImgFrntGr).exists() && new File(folderpath2+newImgBackGr).exists())
					{//4
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
					}//4
					else
					{//4
						thisBuffer.append("Image(s) Not Found.");
					}//4
					pst.close();
				}//3
			}//2
		}
		con.close();
		for(int k=0;k<micrArray.length();k++)
		{
				System.out.println("12 inside UpdatePopupRecords ************************************");
				String path="",fileNameStr="",searchStr="",chequeNo="",
						sortcode="",accNo="",tranCode="",fileName="",singleRecord="",ItemSeqNo="",
						updatedRecord="",newRecord="";
				//JSONArray jArr=new JSONArray();
			    
				path=uploadpath_to_chi +branchFolder+ "/ClearingOutward/MICRWaveforms/";
				System.out.println("12path=="+path);
				JSONObject obj1=micrArray.getJSONObject(k);
				chequeNo=obj1.getString("CLO_CHQNO");
				sortcode=obj1.getString("CLO_SORTCD");
				tranCode=obj1.getString("CLO_TRANCD");
				accNo=obj1.getString("CLO_DRAWEE_ACCNO");
				fileName=obj1.getString("File_Name");
				ItemSeqNo=obj1.getString("ItemSeqNo");
				newRecord="<"+chequeNo+"<"+sortcode+":"+accNo+"<"+tranCode+"#"+ItemSeqNo;
				BufferedReader br = new BufferedReader(new FileReader(path+fileName));
				singleRecord=br.readLine();
				
				updatedRecord=singleRecord.replaceAll(singleRecord,newRecord);
				BufferedWriter out1 = new BufferedWriter(new FileWriter(path+fileName));
				out1.write(updatedRecord);
				out1.newLine();
				out1.write("IQA Status....");
				out1.newLine();
				out1.write("STATUS:SUCCESS");
	            out1.close();
	            br.close();
	            
	            String newFileName= chequeNo+sortcode+accNo+ddmmyy+".txt";
	        	File oldfile =new File(path+fileName);
	    		File newfile =new File(path+newFileName);
				oldfile.renameTo(newfile);
				String path1=uploadpath_to_chi +branchFolder+"/ClearingOutward/Images/";
				System.out.println("path1=="+path1);
				fileName=fileName.split("\\.")[0];
				System.out.println("fileName=="+fileName);
				Configuration.writeLog("fileName=="+fileName);
				File oldImgFrntBw =new File(path1+"F"+fileName+".tif");
				File oldImgBackBw =new File(path1+"R"+fileName+".tif");
				File oldImgFrntGr =new File(path1+"F"+fileName+"G.jpg");
				File oldImgBackGr =new File(path1+"R"+fileName+"G.jpg");
				newFileName=newFileName.split("\\.")[0];
				Configuration.writeLog("fileName=="+newFileName);
				System.out.println("newFileName=="+newFileName);
				oldImgFrntBw.renameTo(new File(path1+"F"+newFileName+".tif"));
				oldImgBackBw.renameTo(new File(path1+"R"+newFileName+".tif"));
				oldImgFrntGr.renameTo(new File(path1+"F"+newFileName+"G.jpg"));
				oldImgBackGr.renameTo(new File(path1+"R"+newFileName+"G.jpg"));
				
				
		}
					
		response.sendRedirect("../outward_clearing.jsp?msg=FIRSTTIME");
		//out.println(thisBuffer.toString());
	}
	catch(Exception e)
	{
		e.printStackTrace();
		System.out.println();
		Configuration.writeLog(e+"");
	}
%>