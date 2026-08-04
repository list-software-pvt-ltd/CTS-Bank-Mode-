
<%@ page contentType="text/html; charset=iso-8859-1" language="java"
import="java.sql.*" import="org.apache.commons.io.FileUtils"
 errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
			Connection con=Configuration.getConnection();
			Configuration.writeLog("!!!!!!!!!!!!!!!!!!	in fetch_inward_cheques.jsp");
			System.out.println("#############	in fetch_inward_cheques.jsp");
			String down_path = Configuration.getConfValByNm("CFG_downloadpath_from_CHI",con);
			System.out.println("down_path#########    "+down_path+"      #######");
			double newver=2.1;
			String OURVERSIONNO=Configuration.getConfValByNm("CFG_OURVERSIONNO",con);
			String ENCRY_DECRYPT_FLG=Configuration.getConfValByNm("CFG_ENCRY_DECRYPT_FLG", con);
			String CFG_PPS_CONNECTED=Configuration.getConfValByNm("CFG_PPS_CONNECTED",con);
			System.out.print("OURVERSIONNO=====" + OURVERSIONNO);
			StringBuffer chqBuffer=new StringBuffer();
			String chq_dtls = "";
			String path = "" ;
			int img_found_cnt = 0;
			String session_branch_code = (String) session.getAttribute("session_branch_code");
			System.out.println("session_branch_code="+session_branch_code);
			long totAmt=0;
			//String imgpath = down_path+session_branch_code;
			String cylNo ="";
			BufferedReader br = null;
			PreparedStatement ps_values = null;
			ResultSet rs_ency=null;
			
			//path = imgpath + "/ClearingInward/MICR Waveforms/chequedetails.txt";
			path = down_path + "ClearingInward/";
			
			System.out.println("Path="+path);
			String clearingType="";
			String CFG_CONTINUE_CLEARING_FLG="N";
			try
			{
				String txtFile = "";
				
				String textFileNames[]=new File(path).list();
				
				System.out.println("textFileNames.length:"+textFileNames.length);
				String CBSVendor=Configuration.getConfValByNm("CFG_CBS_VENDOR", con);
				CFG_CONTINUE_CLEARING_FLG=Configuration.getConfValByNm("CFG_CONTINUE_CLEARING_FLG",con);
				
				for(int j=0;j<textFileNames.length;j++)
				{//for
					
					String textFileName=textFileNames[j];
					//String fileEnd=textFileName.substring(textFileName.lastIndexOf("_"),textFileName.length()) ;
					System.out.println("textFileNames "+textFileNames[j]);
					if(textFileName.endsWith("_Inward.txt"))// && fileEnd.equalsIgnoreCase("_Inward.txt"))
					{//1
						txtFile = path + textFileName;
						System.out.println("@@@ txtFile:"+txtFile);
						clearingType+=textFileName.split("_")[0]+"!Q!";
						System.out.println("\n\tclearingType:"+clearingType);
						///////	Read text file one by one
						if(!CBSVendor.equalsIgnoreCase("KORAS"))
						{
							try 
							{//2
								int line_cnt=0;
								String sCurrentLine;
								br = new BufferedReader(new FileReader(txtFile));
								
								while ((sCurrentLine = br.readLine()) != null)
								{//while
									//--//added code for decrypted data for fetching
									
									System.out.println(line_cnt+"line_cnt:"+sCurrentLine);
									System.out.print("\n @@@@ENCRY_DECRYPT_FLG="+ENCRY_DECRYPT_FLG);
									if(ENCRY_DECRYPT_FLG.equalsIgnoreCase("Y"))
									{
										System.out.print("\n Inside if of encrpt decrypt ");
										ps_values = con.prepareStatement("select HOCUST.DECRYPT_STRING('"+sCurrentLine+"') from dual");
										rs_ency = ps_values.executeQuery();
										if (rs_ency.next())
										{
											sCurrentLine = rs_ency.getString(1);
											System.out.print("\n after rs.getString(1)="+rs_ency.getString(1));
										}
										System.out.print("\n after readLine="+sCurrentLine);
									}
									
									String chqNo = sCurrentLine.substring(39,45);//SERIALNO
									//System.out.println("1111");
									String chqAmt=sCurrentLine.substring(26,39);//amount
									//System.out.println("2222");
									String tranCode="",accNo="",imageFileName="",sort_code="",clrType="";
									if(Double.parseDouble(OURVERSIONNO)>=newver)
									{
									 tranCode=sCurrentLine.substring(55,58);//tranCode
								//	System.out.println("2222111");
									 accNo=sCurrentLine.substring(58,68);//tranCode
								//	System.out.println("2222-2222");
									 imageFileName=sCurrentLine.substring(180,207);//000000000f_00239000000460_G file name
								//	System.out.println("3333");
									 sort_code = sCurrentLine.substring(287,296);//sort_code
									//System.out.println("4444");
									 clrType=sCurrentLine.substring(296,298);//clearing Type
									 //CFG_PPS_CONNECTED
									System.out.println("CFG_PPS_CONNECTED==="+CFG_PPS_CONNECTED);
									 if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y"))
									 {
										if(CFG_PPS_CONNECTED.equalsIgnoreCase("Y"))
										{
										     cylNo=sCurrentLine.substring(319,320);//clearing Type
										}
										else
										{
											cylNo=sCurrentLine.substring(318,319);	
										}
										     System.out.println("cylNo==="+cylNo);
									 }//end
									}
									else{
										 tranCode=sCurrentLine.substring(55,57);//tranCode
									//	System.out.println("2222111");
										 accNo=sCurrentLine.substring(57,67);//tranCode
										//System.out.println("2222-2222");
										 imageFileName=sCurrentLine.substring(179,206);//000000000f_00239000000460_G file name
									//	System.out.println("3333");
										 sort_code = sCurrentLine.substring(286,295);//sort_code
									//	System.out.println("4444");
										 clrType=sCurrentLine.substring(295,297);//clearing Type
										
									}
									
									String isProbImg="N";
									long fileLength=new File (path+"/Images/"+imageFileName+".jpg").length();
								
									if(fileLength>150000)
										isProbImg="Y";
									chq_dtls = chqNo+"_"+sort_code+"#"+chqNo+"_"+sort_code+"#"+imageFileName+".jpg"+"#"+chqAmt+"#"+clrType+"#"+chqNo+"^"+sort_code+"^"+tranCode+"^"+chqAmt+"^"+accNo+"#"+isProbImg+"$";
									img_found_cnt ++;									
									chqBuffer.append(chq_dtls);	
									chq_dtls=null;
								}//while
								 System.out.println("out of the while loop cylNo==="+cylNo);
								
							}//2 
							catch (IOException e) 
							{//2
								e.printStackTrace();
								chqBuffer.append("NOCHEQUE#NOCHEQUE$");	
								System.out.println("----"+e);
							}//2 
							finally 
							{//2
								try {
									if (br != null)br.close();
								} catch (IOException ex) {
									ex.printStackTrace();
									chqBuffer.append("NOCHEQUE#NOCHEQUE$");	
									System.out.println(""+ex);
								}
							}//2
						}
					}//1
					else if(textFileName.endsWith("_CBS Upload File.txt") && CBSVendor.equalsIgnoreCase("KORAS"))// && fileEnd.equalsIgnoreCase("_Inward.txt"))
					{//1
						txtFile = path + textFileName;
						System.out.println("txtFile:"+txtFile);
					
						try 
						{//2
							int line_cnt=0;
							String sCurrentLine;
							br = new BufferedReader(new FileReader(txtFile));
							sCurrentLine = br.readLine();//To read First Line 
							//System.out.println("sCurrentLine==="+sCurrentLine);
							while ((sCurrentLine = br.readLine()) != null)
							{
/*400019000413600002050420170000005000000019452190488010213                       BTT002019452050420170190001904880102.tifFTT002019452050420170190001904880102.tifFTJ002019452050420170190001904880102.tif201704064000190005541101904880102LAXMIKANT SHRI                          000000*/								
								if(sCurrentLine.contains("Item Count"))
									continue;
								String chqNo = sCurrentLine.substring(39,45);//SERIALNO
								//System.out.println("1111");
								String chqAmt=sCurrentLine.substring(26,39);//amount
								//System.out.println("2222");
								String tranCode=sCurrentLine.substring(55,58);//tranCode
								//System.out.println("2222111");
								String accNo=sCurrentLine.substring(58,68);//tranCode
								//System.out.println("2222-2222");
								String imageFileName=sCurrentLine.substring(160,200);//000000000f_00239000000460_G file name
								//System.out.println("3333");
								String sort_code = sCurrentLine.substring(9,18);//sort_code
								//System.out.println("4444");
								String clrType="01";//sCurrentLine.substring(sCurrentLine.length()-2,sCurrentLine.length());//clearing Type
								//System.out.println("5555");
							//	cylNo = sCurrentLine.substring(320,321);
								//totAmt=totAmt+Long.parseLong(chqAmt);
							//	System.out.println("SAM ----cylNo_"+cylNo);
								/*
								String accHolderName = sCurrentLine.substring(72,82);
								chq_dtls = chqNo+"_"+sort_code+"#"+chqNo+"_"+sort_code+"#"+accHolderName+"$";
								*/
								//chq_dtls = chqNo+"_"+sort_code+"#"+chqNo+"_"+sort_code+"$";
								//chq_dtls = chqNo+"_"+sort_code+"#"+chqNo+"_"+sort_code+"#"+chqAmt+"$";
								
								chq_dtls = chqNo+"_"+sort_code+"#"+chqNo+"_"+sort_code+"#"+imageFileName+"#"+chqAmt+"#"+clrType+"#"+chqNo+"^"+sort_code+"^"+tranCode+"^"+chqAmt+"^"+accNo+"$";
								//System.out.println("chq_dtls::>>"+chq_dtls);
								img_found_cnt ++;
								//System.out.println("chq_dtls"+chq_dtls);
								chqBuffer.append(chq_dtls);	
								chq_dtls=null;
							}//while
							
						}//2 
						catch (IOException e) 
						{//2
							e.printStackTrace();
							chqBuffer.append("NOCHEQUE#NOCHEQUE$");	
							System.out.println("----"+e);
						}//2 
						finally 
						{//2
							try {
								if (br != null)br.close();
							} catch (IOException ex) {
								ex.printStackTrace();
								chqBuffer.append("NOCHEQUE#NOCHEQUE$");	
								System.out.println(""+ex);
							}
						}//2
					}//1
				}//for
			}
			catch(Exception e)
			{
				out.println("~~~~Exception in fetch_inward_cheques.jsp  :"+e);
				System.out.println(""+e);
			}
			finally
			{
				con.close();
			}
//			clearingType=clearingType+cylNo;
		//	System.out.println("\n\t with cyl no clearingType:"+clearingType);
			
			System.out.println("img_found_cnt::>>"+img_found_cnt);							
			if(img_found_cnt == 0)
			{
				chqBuffer.append("NOCHEQUE#NOCHEQUE$");	
			}
			else
			{
				System.out.println("CFG_CONTINUE_CLEARING_FLG::>>"+CFG_CONTINUE_CLEARING_FLG);		
				if(CFG_CONTINUE_CLEARING_FLG.equalsIgnoreCase("Y"))
				{
					System.out.println("\n\t cylNo:"+cylNo);
					chqBuffer.append("!A!"+clearingType+"SUCCESS~"+cylNo);
				}
				else
				{
					chqBuffer.append("!A!"+clearingType+"SUCCESS~''");
				}
				
				//chqBuffer.append("!A!"+clearingType+"SUCCESS~"+cylNo);
			}
			//"~"+cylNo+
			//System.out.println("--- exit from fetch_inward_cheques chqBuffer::>>"+chqBuffer);
			//System.out.println("\n\tTotal Amount is:"+totAmt);
			//chqBuffer.append("!TOT!"+totAmt);
			System.out.println("\n\n"+chqBuffer.toString()+"\n\n");
			System.out.println("--- exit from fetch_inward_cheques chqBuffer::>>");
%>
<%=chqBuffer.toString()%>