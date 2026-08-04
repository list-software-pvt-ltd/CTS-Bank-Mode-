
<%@ page contentType="text/html; charset=iso-8859-1" language="java"
import="java.sql.*" import="org.apache.commons.io.FileUtils"
 errorPage="" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>

<%
			Connection con=Configuration.getConnection();
			Configuration.writeLog("!!!!!!!!!!!!!!!!!!	in fetch_verify_cheques.jsp");
			System.out.println("#############	in fetch_verify_cheques.jsp");
			String up_path = Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
			String down_path = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con);
			System.out.println("down_path#########    "+down_path+"      #######");
			StringBuffer chqBuffer=new StringBuffer();
			String chq_dtls = "";
			String path = "" ;
			int img_found_cnt = 0;
			String session_branch_code = (String) session.getAttribute("session_branch_code");
			System.out.println("session_branch_code="+session_branch_code);
			long totAmt=0;
			String totalAmt="0";
			int chqCnt=0;
			//String imgpath = down_path+session_branch_code;
			
			BufferedReader br = null;
			BufferedReader verifyBr = null;
			up_path=up_path+"/";//+session_branch_code+"/ClearingOutward";
			//path = imgpath + "/ClearingInward/MICR Waveforms/chequedetails.txt";
			path = down_path+ "ClearingInward/";
			Configuration.writeLog("path==="+path);
			System.out.println("Path="+path);
			String clearingType="";
			PreparedStatement ps_values = null;
			ResultSet rs_ency=null;
			PreparedStatement ps_values1 = null;
			ResultSet rs_ency1=null;
			String ENCRY_DECRYPT_FLG=Configuration.getConfValByNm("CFG_ENCRY_DECRYPT_FLG", con);
			try
			{
				String txtFile = "";
				
				String textFileNames[]=new File(path).list();
				
				System.out.println("textFileNames.length:"+textFileNames.length);
				Configuration.writeLog("textFileNames.length==="+textFileNames.length);
				for(int j=0;j<textFileNames.length;j++)
				{//for
					
					String textFileName=textFileNames[j];
					System.out.println("textFileNames "+textFileNames[j]);
					Configuration.writeLog("textFileNames11==="+textFileNames[j]);
					if(textFileName.endsWith("_Verify.txt"))// && fileEnd.equalsIgnoreCase("_Inward.txt"))
					{//1
						txtFile = path + textFileName;
						System.out.println("txtFile:"+txtFile);
						clearingType+=textFileName.split("_")[0]+"!Q!";;
						System.out.println("\n\tclearingType:"+clearingType);
						
						try 
						{//2
							int line_cnt=0;
							String sCurrentLine;
							br = new BufferedReader(new FileReader(txtFile));
							while ((sCurrentLine = br.readLine()) != null)
							{
								System.out.print("\n @@@@ENCRY_DECRYPT_FLG="+ENCRY_DECRYPT_FLG);
								if(ENCRY_DECRYPT_FLG.equalsIgnoreCase("Y"))
								{
									System.out.print("\n Inside if of encrpt decrypt ");
									ps_values = con.prepareStatement("select hocust.decrypt_string('"+sCurrentLine+"') from dual");
									rs_ency = ps_values.executeQuery();
									if (rs_ency.next())
									{
										sCurrentLine = rs_ency.getString(1);
										System.out.print("\n after rs.getString(1)="+rs_ency.getString(1));
									}
									rs_ency.close();
									ps_values.close();
									
									System.out.print("\n after sCurrentLine="+sCurrentLine);
								}
								String chqNo = sCurrentLine.substring(39,45);//SERIALNO
								//System.out.println("1111");
								String chqAmt=sCurrentLine.substring(26,39);//amount
								//System.out.println("2222");
								String imageFileName=sCurrentLine.substring(180,207);//000000000f_00239000000460_G file name
								//System.out.println("3333");
								String sort_code = sCurrentLine.substring(287,296);//sort_code  0411252012
								System.out.println("4444 sort_code==="+sort_code);
								String clrType=sCurrentLine.substring(sCurrentLine.length()-2,sCurrentLine.length());//clearing Type
								chq_dtls = chqNo+"_"+sort_code+"#"+chqNo+"_"+sort_code+"#"+imageFileName+".jpg"+"#"+chqAmt+"#"+clrType+"$";
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
				Configuration.writeLog("Exception in fetch_verify_cheques.jsp===");
				out.println("~~~~Exception in fetch_verify_cheques.jsp  :"+e);
				System.out.println(""+e);
			}
			/*finally
			{
				con.close();
			}*/
			System.out.println("img_found_cnt::>>"+img_found_cnt);							
			if(img_found_cnt == 0)
			{
				chqBuffer.append("NOCHEQUE#NOCHEQUE$");	
			}
			else
			{
				try
				{
					up_path=up_path+"/VERIFY/";
					String[] fileList=new File(up_path).list();
					for(int i=0; i<fileList.length; i++)
					{
						if(fileList[i].indexOf("_Verify")>-1)
						{
							String readLine="";
							//File verifyfileName = new File(up_path+"/VERIFY/"+fileList[i]);
							verifyBr = new BufferedReader(new FileReader(up_path+fileList[i]));
							while ((readLine = verifyBr.readLine()) != null) 
							{								
								if(ENCRY_DECRYPT_FLG.equalsIgnoreCase("Y"))
								{
									System.out.print("\n Inside if of encrpt decrypt ");
									ps_values1 = con.prepareStatement("select hocust.decrypt_string('"+readLine+"') from dual");
									rs_ency1 = ps_values1.executeQuery();
									if (rs_ency1.next())
									{
										readLine = rs_ency1.getString(1);
									}
									chqCnt++;
									totalAmt=""+(Long.parseLong(totalAmt)+Long.parseLong(readLine.substring(27, 45)));
									Configuration.writeLog("totalAmt==="+totalAmt);
								}								
							}
						}
						System.out.println("====="+new File(up_path+fileList[i]).delete());
					}
					verifyBr.close();//DSP
				}
				catch(Exception e)
				{
					Configuration.writeLog("totalAmt==="+e);
				}
				finally 
				{
					try {
						if (verifyBr != null)verifyBr.close();
					} catch (IOException ex) {
						ex.printStackTrace();
						System.out.println(""+ex);
					}
				}//DSP
				//totalAmt=""+(//Long.parseLong(totalAmt)/100);
				totalAmt=totalAmt.substring(0,totalAmt.length()-2)+"."+totalAmt.substring(totalAmt.length()-2);
				chqBuffer.append("!A!"+clearingType+"!A!"+chqCnt+"!A!"+totalAmt+"!A!SUCCESS");
			}
			System.out.println("\n\n"+chqBuffer.toString()+"\n\n");
			Configuration.writeLog("\n\n"+chqBuffer.toString()+"\n\n");
			System.out.println("--- exit from fetch_verify_cheques chqBuffer::>>");
			Configuration.writeLog("--- exit from fetch_verify_cheques chqBuffer::>>");
%>
<%=chqBuffer.toString()%>