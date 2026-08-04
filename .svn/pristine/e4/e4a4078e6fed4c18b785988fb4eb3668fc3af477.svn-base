<%@ page import="java.io.*,java.util.*, jakarta.servlet.*,java.sql.*,org.apache.commons.io.FileUtils,org.json.JSONObject,org.json.JSONArray"%>
<%@ page import="cts.*"%>

<%
	Configuration.writeLog(" inside updateDupChequeData ************************************");
	String retMess = "SUCCESS";
	
	Connection con = null;
	PreparedStatement pst = null,perpst=null;
	String micrFile = "";
	String olbc="",imagenm="";
	long sys_cur_millis = System.currentTimeMillis();
	String branchFolder = (String) session.getAttribute("session_branch_code");
	String BRNCD=""+Integer.parseInt(branchFolder.trim());
	try 
	{
		String jsonString=request.getParameter("updata");
		JSONArray jsonArray=new JSONArray(jsonString);
		for(int j=0;j<jsonArray.length();j++)
		{
			JSONObject obj=jsonArray.getJSONObject(j);
			 olbc=obj.getString("CLO_OLBC");
			 imagenm=obj.getString("IMAGENM").split("G")[0];
			 imagenm=imagenm.split("F")[1];
			 
		}	
		con = Configuration.getConnection();
		String uploadpath_to_chi = Configuration.getConfValByNm("CFG_uploadpath_to_chi",con);
				
		
		String qry = "update clearingoutward  set clo_drawee_accno=?, ";
		qry = qry
				+ " clo_img_frnt_bw=?, clo_img_back_bw=?, clo_img_frnt_gr=?, clo_img_back_gr=?,";
		qry = qry
				+ " CLO_IQASTATUS=?, CLO_IQARESULTS=?, CLO_PPRTOFOLLOW=decode(CLO_IQA_IGNIND,'Y','Y',?) ,CLO_ITEMSEQNO=?,clo_micrtxt=?";
		qry = qry
				+ " where  clo_date_ddmmyyyy=? and CLO_OLBC=? ";// and  clo_chqno=? and clo_sortcd=? and CLO_TRANCD=?
																										
		pst = con.prepareStatement(qry);
		
		
		new File(uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/Thumbs.db").delete();
		
		
			String chequeNames = "";
			String itemMicrFileName = "";
			
			String micrFilePath = uploadpath_to_chi + BRNCD+ "/ClearingOutward/MICRWaveforms/";
			if (new File(micrFilePath).exists()
					&& new File(micrFilePath).list().length > 0)
			{
				
				System.out.println(imagenm);
				String imageFoldPath = uploadpath_to_chi + BRNCD+ "/ClearingOutward/Images/";
				int counter = 0;
					File MicrFileObj=new File(micrFilePath+imagenm+".txt");
					if(MicrFileObj.length()==0)
					{
						MicrFileObj.delete();
						Configuration.writeLog("\n\nMICR Deleted because length is zero");
						//continue;
					}
					String imgFrntBw = "", imgBackBw = "", imgFrntGr = "", imgBackGr = "";
	
					imgFrntBw = "F"+imagenm+".tif";
					imgBackBw = "R"+imagenm+".tif";
					imgFrntGr = "F"+imagenm+"G.jpg";
					imgBackGr = "R"+imagenm+"G.jpg";
					File ImgFrntBwObj=new File(imageFoldPath+imgFrntBw);
					File ImgBackBwnewObj=new File(imageFoldPath+imgBackBw);
					File ImgFrntGrObj=new File(imageFoldPath+imgFrntGr);
					File ImgBackGrObj=new File(imageFoldPath+imgBackGr);
					Configuration.writeLog("\n\nitemMicrFileName=111111"+ imagenm);
					
					
					if(imagenm.toLowerCase().contains("temp"))
						{
							MicrFileObj.delete();
							ImgFrntBwObj.delete();
							ImgBackBwnewObj.delete();
							ImgFrntGrObj.delete();
							ImgBackGrObj.delete();
							Configuration.writeLog("\n\nMICR Deleted because name is temp");
							//continue;
						}
					
					StringBuffer clo_iqaResult = new StringBuffer("");
					String singleRecord = "";
					String CLO_IQASTATUS = "";
					try {// try
	
						BufferedReader br = new BufferedReader(
								new FileReader(
										MicrFileObj));
						singleRecord = br.readLine();
						String line = "";
						
						while ((line = br.readLine()) != null) {
							// this string buffer is contains IQA result
							// System.out.println("\n --- while ----");
							// clo_iqaResult.append(line);
							if (line.contains("STATUS")) {
								
								CLO_IQASTATUS = line.split(":")[1];
							}
							
						}
						br.close();
						
					}// try
					catch (FileNotFoundException e)
					{
						Configuration.writeLog("\n --- FileNotFoundException *****%%%%% ----"+ e);
					}
					//System.out.println("\n\tStatus:>>" + CLO_IQASTATUS);
					
					if (singleRecord.toString().indexOf("?") > -1) 
					{
						// faultyCheque.append(micrFileName+"\n");
						Configuration.writeLog("\n\nMICR Deleted because faulty MICR");
						MicrFileObj.delete();
						//continue;
					}
					
					
					String micrLine = "", itemSeqNo = "";
					
					if(singleRecord.indexOf("#")>-1)
					{
						String singleRecordArr[] = singleRecord.split("#");
						if(singleRecord.length()>(singleRecord.indexOf("#")+1))
						{
							micrLine = singleRecordArr[0];
							itemSeqNo = singleRecordArr[1];
						}
						else
						{
							Configuration.writeLog("\n\nMICR Deleted because no ITEMSEQNumber----1");
							MicrFileObj.delete();
							ImgFrntBwObj.delete();
							ImgBackBwnewObj.delete();
							ImgFrntGrObj.delete();
							ImgBackGrObj.delete();
							
							//continue;
						}
					}
					else
					{
						Configuration.writeLog("\n\nMICR Deleted because no ITEMSEQNumber----2");
						MicrFileObj.delete();
						ImgFrntBwObj.delete();
						ImgBackBwnewObj.delete();
						ImgFrntGrObj.delete();
						ImgBackGrObj.delete();
						
						//continue;
					}
					
	
					itemSeqNo=Configuration.getDDMMYY()+itemSeqNo.substring(itemSeqNo.length());
					itemSeqNo=Configuration.lPad(itemSeqNo, 14, "0");
					
					String fileData[] = micrLine.split("<");
					
					String chqNo = fileData[1];
					//System.out.println("\nchqNo=" + chqNo);
					String sortCode = fileData[2].split(":")[0];
					//System.out.println("\nsortCode=" + sortCode);
					String tranNo = "";
					String accNo = "";
					if (fileData.length == 4)
					{
						tranNo = fileData[3];
						//System.out.println("\ntranNo=" + tranNo);
						if (tranNo.indexOf(";") > -1) {
							tranNo = tranNo.split(";")[0];
							//System.out.println("\nIn If tranNo=" + tranNo);
						}
						//System.out.println("\nAfter If tranNo=" + tranNo);
						accNo =Configuration.lPad(fileData[2].split(":")[1], 6, "0");
						//System.out.println("");
					}
	
					// index 0=null 1=cheque number 2=bank code :
					// transaction number
					if (fileData.length == 3) 
					{
						tranNo = fileData[2].split(":")[1];
						// accNo=lPad("0", 16, "0");
						accNo = Configuration.lPad("0", 6, "0");
					}
	
					String CLO_PPRTOFOLLOW = "N";
					
					int trNo = Integer.parseInt(tranNo);
					/*
					 * if(tranNo.length()==3 && accNo.length()==7)//this
					 * condition is only applicable for ifi cheque is
					 * goverment cheque.... { CLO_PPRTOFOLLOW="Y"; }
					 */
					if ((trNo >= 20 && trNo <= 27 && trNo!=23))// && accNo.length()==6)
					{
						CLO_PPRTOFOLLOW = "Y";
					}
					/*
					 * if(CLO_IQASTATUS.equals("FAIL"))//this condition is
					 * only applicable for ifi IQAResult is defected .... {
					 * CLO_PPRTOFOLLOW="Y"; } else { //this else is for if
					 * our IQA result is not defected and it is not gov
					 * cheque. CLO_PPRTOFOLLOW="N"; }
					 */
					
					
					 if (!ImgFrntBwObj.exists()
							|| !ImgBackBwnewObj.exists()
							|| !ImgFrntGrObj.exists())
					 {// if
						imgFrntBw = "";
						imgBackBw = "";
						imgFrntGr = "";
						imgBackGr = "";
					}
					//System.out.println(qry);
					//pst = con.prepareStatement(qry);
					pst.setString(1, accNo);
					pst.setString(2, imgFrntBw);
					pst.setString(3, imgBackBw);
					pst.setString(4, imgFrntGr);
					pst.setString(5, imgBackGr);
					// CLO_IQASTATUS,clo_iqaResult,
					pst.setString(6, CLO_IQASTATUS);
					pst.setString(7, clo_iqaResult.toString());
					pst.setString(8, CLO_PPRTOFOLLOW);
					pst.setString(9, itemSeqNo);
					// where clause
					pst.setString(10, micrLine);
					pst.setString(11, Configuration.getDDMMYYYY());
					pst.setString(12, olbc);
					int cnt=pst.executeUpdate();
				
						System.out.println(cnt);
						pst.close();
	
					
					try {
						/*
						 * try { Thread.sleep(5000); }catch(Exception e){}
						 */
						if (cnt > 0 ) {
							
							File srcFile = new File(uploadpath_to_chi
									+ BRNCD
									+ "/ClearingOutward/MICRWaveforms/"
									+ imagenm+".txt");
							File destFile = new File(uploadpath_to_chi
									+ BRNCD
									+ "/ClearingOutward/MICRWaveforms"
									+ "_" + Configuration.getDDMMYYYY() + "_"
									+ sys_cur_millis + "/"
									+ imagenm+".txt");
							FileUtils.copyFile(srcFile, destFile);
							FileUtils
									.forceDelete(new File(
											uploadpath_to_chi
													+ BRNCD
													+ "/ClearingOutward/MICRWaveforms/"
													+ imagenm+".txt"));
							Configuration.writeLog("\n" + itemMicrFileName+ " is Deleted.");
							retMess = "Record Updated Successfully.";
						} else {
							con.rollback();
						}
						
						
					} catch (SQLException e) {
						if (e.getMessage().indexOf("ORA-00001") > -1) {
							Configuration.writeLog("\n\t SQLException in prepareMicrData :>"+ e);
							File srcFile = new File(uploadpath_to_chi
									+ BRNCD
									+ "/ClearingOutward/MICRWaveforms/"
									+ imagenm+".txt");
							File destFile = new File(uploadpath_to_chi
									+ BRNCD
									+ "/ClearingOutward/MICRWaveforms"
									+ "_" + Configuration.getDDMMYYYY() + "_"
									+ sys_cur_millis + "/"
									+ imagenm+".txt");
							FileUtils.copyFile(srcFile, destFile);
							FileUtils
									.forceDelete(new File(
											uploadpath_to_chi
													+ BRNCD
													+ "/ClearingOutward/MICRWaveforms/"
													+ imagenm+".txt"));
							Configuration.writeLog("\n" + itemMicrFileName+ " is Deleted.");
							retMess = "Record Updated Successfully.";
	
						}
						else
						{
							e.printStackTrace();
						}
							
					}
					//pst.close();
					pst = null;
				//Configuration.writeLog("(1+noOfCheques)::>>"+ (1 + itemMicrFileName));
				Configuration.writeLog("counter::>>" + counter);
				con.close();
				
			}
		}

		 
	//}// 3
	catch (NullPointerException w) {// 3
		Configuration.writeLog("\n\nNullPointerException in prepareMicreData configuration::::"+ w + "\n\n");
		retMess = "No File(s) At Upload Path";
		w.printStackTrace();
	}// 3
	catch (Exception e) {// 3
		Configuration.writeLog("\n\nException in prepareMicreData configuration::::"+ e + "\n\n");
		retMess = "Record Updation Problem .";
		e.printStackTrace();
	}// 3
	finally {// 3
		try {
			if (pst != null)
				pst.close();
			if (con != null)
				con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}// 3
		
%>
<%=retMess%>