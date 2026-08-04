<%@ page import="java.io.*,java.util.*, jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>
<%@ page import="java.net.SocketException"%>
<%@ page import="org.apache.commons.net.ftp.*" %>
<%-- <%@ page import="org.apache.commons.fileupload.servlet.*" %> --%>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="cts.*" %>
<%@ page import="java.sql.*" %>
<%@page import="org.apache.commons.io.*"%>

<%!
	String msg,ctstoken=null,flag="",blokedFlag="";
	String isBlockstatus="";//CLO_ISBLOCKED 
	int fileCount;
	String XMLFileName;
	String CIBFFileName;
	String[] imageFileArray;
	String branchFolder;//="B1";
	String[] imagefileNames;
	PreparedStatement _psClearingOutward;
	PreparedStatement _psTemp;
	Connection con;
	ResultSet _rsClearingOutward;
	String generatedFileInfo[];
%>

<%
		
		//System.out.println("************ inside UploadServert.jsp *************");
		blokedFlag=request.getParameter("blokedFlag");
		System.out.println("\n ---------------blokedFlag:"+blokedFlag);
		ctstoken=request.getParameter("CTSTOKEN");
		flag=request.getParameter("flag");
		branchFolder=(String)session.getAttribute("session_branch_code");
		Connection con=Configuration.getConnection();
		String CFG_uploadpath_to_CHI=Configuration.getConfValByNm("CFG_uploadpath_to_CHI",con);
		String filePath=CFG_uploadpath_to_CHI+branchFolder+"/ClearingOutward/Images/";
		//Upload path means path of all .jpg file is store 
		//.System.out.println("filePath:"+filePath);
		String  fileName=request.getParameter("fileName");
		String  branchcd=request.getParameter("session_branch_code");
		//.System.out.println("@@@@session_branch_code=="+branchcd);
		String fileNames[]=fileName.split("!@!");
		int filesCnt=fileNames.length;
		//.System.out.println("\n\tfilesCnt:"+filesCnt);
		String fileDirectory=CFG_uploadpath_to_CHI+branchFolder+"/ClearingOutward/";
		//uploadpath_to_CHI means path of generated .xml and .img file
		int cnt = 0 , success_cnt = 0,itemcnt=900;
		int jj=1;
		int	rsUpdateCount=0;
		String newitemSequenceNo="";
		String seqno="",olbc="";
		StringBuffer strBuff = new StringBuffer("");
		 int count=0;
 		 try
 		 {//try
 			System.out.println("sharayu blokedFlag====="+blokedFlag);
 		 	 if(blokedFlag.equalsIgnoreCase("CHECK")){
 			//---------SAM BLOCKEDMICRCODE
				//String query2="select substr(CLO_SORTCD,4,3) from CLEARINGOUTWARD where CLO_DATE_DDMMYYYY=?";
				String querymicr="select distinct clo_sortcd from CLEARINGOUTWARD where  substr(CLO_SORTCD,4,3) in(select MICRBANKCODE from BLOCKEDMICRCODE) and clo_date_ddmmyyyy=? and CLO_BRANCH_CD=? and CLO_CONVERT_FLG='N'";
			    PreparedStatement pstfect=con.prepareStatement(querymicr);
			    pstfect.setString(1,Configuration.getDDMMYYYY());	
			    pstfect.setString(2,branchcd);	
			    String MICRcode="";	
			    ResultSet rstfetch=pstfect.executeQuery();	
 				
				 while(rstfetch.next())
				 {
					  MICRcode=rstfetch.getString(1);
					  System.out.println("MICRcode=="+MICRcode);
					  strBuff.append(MICRcode+" \n");
					  count++;
				  }
				 //.System.out.println("/n count=="+count);
				 //.System.out.println("/n Data store in Buffer== "+strBuff.toString());
				  //System.out.println("MICRcode=@@="+MICRcode);
				 rstfetch.close();
				  pstfect.close();
				  /// End code//
 		 	 }	  
 		 	 else
 		 	 {
 		 		System.out.println("------else -------------------");
 		 		String querymicr="select distinct clo_sortcd from CLEARINGOUTWARD where  substr(CLO_SORTCD,4,3) in(select MICRBANKCODE from BLOCKEDMICRCODE) and clo_date_ddmmyyyy=? and CLO_BRANCH_CD=? and CLO_CONVERT_FLG='N'";
			    PreparedStatement pstfect=con.prepareStatement(querymicr);
			    pstfect.setString(1,Configuration.getDDMMYYYY());	
			    pstfect.setString(2,branchcd);	
			    String MICRcode="";	
			    ResultSet rstfetch=pstfect.executeQuery();	
 				
				 while(rstfetch.next())
				 {
					MICRcode=rstfetch.getString(1);
					System.out.println("sharayu MICRcode=="+MICRcode);//// isBlockstatus="";//CLO_ISBLOCKED
					//isBlockstatus="Y";
					System.out.println("\n\t date: "+Configuration.getDDMMYYYY());
					 String sql="update CLEARINGOUTWARD set CLO_ISBLOCKED='Y' where clo_sortcd="+MICRcode+" and CLO_DATE_DDMMYYYY="+Configuration.getDDMMYYYY()+" and  CLO_CONVERT_FLG='N'";//CLO_BRANCH_CD=? and	
					
					PreparedStatement ps1=con.prepareStatement(sql);
				
					System.out.println("\n\t query:"+sql);
					int	rsCount=0;
					
						//   ps1.setString(1,Configuration.getDDMMYYYY());					  
						   System.out.println("\n\t query:"+sql);
						   rsCount+=ps1.executeUpdate();				   
						   System.out.println("\n\t updated:"+rsCount);
					
					   System.out.println("\n\rsCount:>>>"+rsCount);
					   ps1.close();
					 
				  }
				
				  rstfetch.close();
				  pstfect.close();
				  count=0;
 		 	 }
				  // if(checkflag == "pass" || count==0 )
					   System.out.println("sharayu----count--="+count);
 		if(count==0 )
 		 {
 			 System.out.println("=-----######---in----$###--=");
 			String query1="select CLO_ITEMSEQNO,count(*) from CLEARINGOUTWARD where CLO_DATE_DDMMYYYY=? group by CLO_ITEMSEQNO having count(*)>1";
		    PreparedStatement pst=con.prepareStatement(query1);
		    pst.setString(1,Configuration.getDDMMYYYY());	
		    //pst.setString(2,branchcd);	
			   ResultSet rst=pst.executeQuery();			   
			   while(rst.next())
			   {				 
				   long itemSequenceNo=Long.parseLong(rst.getString(1));
				   seqno=rst.getString(1);
				   String query2="select CLO_ITEMSEQNO, CLO_OLBC from CLEARINGOUTWARD where CLO_DATE_DDMMYYYY=? and CLO_ITEMSEQNO=? and CLO_CONVERT_FLG<>'D'";// nvl(CLO_CONVERT_FLG,'N') in ('Y','N')
				    PreparedStatement pst1=con.prepareStatement(query2);
				    pst1.setString(1,Configuration.getDDMMYYYY());	
				    //pst1.setString(2,branchcd);	
				    pst1.setString(2,seqno);	
					   ResultSet rst1=pst1.executeQuery();			   
					   while(rst1.next())
					   {
						   olbc=rst1.getString(2);
						   System.out.println("======="+Configuration.getMICRCD(branchcd, con));
						   newitemSequenceNo=Configuration.getMICRCD(branchcd, con)+ Configuration.lPad(""+itemcnt++, 5, "0");
						  	//newitemSequenceNo="000000000"+ Configuration.lPad(""+itemcnt++, 5, "0");
						   // System.out.println("NewitemSequenceNo=="+newitemSequenceNo);
						   String query3="update CLEARINGOUTWARD set CLO_ITEMSEQNO=? where CLO_DATE_DDMMYYYY=? and CLO_BRANCH_CD=? and CLO_ITEMSEQNO=? and CLO_OLBC=?";
						    PreparedStatement pst2=con.prepareStatement(query3);
						    pst2.setString(1,newitemSequenceNo);
						    pst2.setString(2,Configuration.getDDMMYYYY());	
						    pst2.setString(3,branchcd);	
						    pst2.setString(4,seqno);	
						    pst2.setString(5,olbc);	
						    int updateitemseq=pst2.executeUpdate();	
						   // System.out.println("updateitemseq=="+updateitemseq);
						    pst2.close();
					   }
					   rst1.close();
					   pst1.close();
			   }
			   rst.close();
 			   pst.close();
 			 //String sql="update CLEARINGOUTWARD set CLO_CONVERT_FLG='Y' where CLO_BRANCH_CD=? and CLO_DATE_DDMMYYYY=? and instr(?,CLO_IMG_FRNT_BW||'!@!'|| CLO_IMG_BACK_BW||'!@!'||CLO_IMG_FRNT_GR)>0";
				    String sql="update CLEARINGOUTWARD set CLO_CONVERT_FLG='Y' where CLO_DATE_DDMMYYYY=? and CLO_IMG_FRNT_BW is not null and instr(?,CLO_IMG_FRNT_BW)>0 AND CLO_CONVERT_FLG='N'";//CLO_BRANCH_CD=? and	
				   //int len=fileNames.length;
				  // len=len/3;			   

			PreparedStatement ps1=con.prepareStatement(sql);
			ps1=con.prepareStatement(sql);
		
			 /* String sql2="select CLO_IMG_FRNT_BW, CLO_IMG_BACK_BW, CLO_IMG_FRNT_GR, CLO_IMG_BACK_GR from CLEARINGOUTWARD where CLO_BRANCH_CD=? and CLO_DATE_DDMMYYYY=? and CLO_IMG_FRNT_BW is not null and instr(?,CLO_IMG_FRNT_BW)=0 and CLO_CONVERT_FLG='N'";*/	
			 								   
			   for(int i=0;i<filesCnt;i++)
			   {//1
			   	   //ps1.setString(1,branchFolder);
				 //  System.out.println("66666=="+fileNames[i]);
				   ps1.setString(1,Configuration.getDDMMYYYY());				   
				   ps1.setString(2,fileNames[i]);				   					  
				   rsUpdateCount+=ps1.executeUpdate();				   
				   //System.out.println("\n\t updated:"+i+"fileNames[i]:"+fileNames[i]);
			   }//1
			  // System.out.println("\n\trsUpdateCount:>>>"+rsUpdateCount);
			   ps1.close();
			   
			   //now get names of images whoes we are going to delete
			    String sql2="select CLO_IMG_FRNT_BW, CLO_IMG_BACK_BW, CLO_IMG_FRNT_GR, CLO_IMG_BACK_GR from CLEARINGOUTWARD where CLO_DATE_DDMMYYYY=? and CLO_IMG_FRNT_BW is not null and CLO_CONVERT_FLG='N'";//CLO_BRANCH_CD=? and 
			    PreparedStatement ps2=con.prepareStatement(sql);
				ps2=con.prepareStatement(sql2);
			    //ps2.setString(1,branchFolder);
				ps2.setString(1,Configuration.getDDMMYYYY());	
			   ResultSet rs=ps2.executeQuery();			   
			   while(rs.next())
			   {//1
			   		FileUtils.forceDelete(new File(filePath+rs.getString(1)));
					FileUtils.forceDelete(new File(filePath+rs.getString(2)));
					FileUtils.forceDelete(new File(filePath+rs.getString(3)));
					FileUtils.forceDelete(new File(filePath+rs.getString(4)));
			   }//1
			   rs.close();
			   ps2.close();
			   
			   //now make image name field null whoes flage is N and whoes image files are deleted...
			     String sql3="update CLEARINGOUTWARD set CLO_IMG_FRNT_BW='', CLO_IMG_BACK_BW='', CLO_IMG_FRNT_GR='', CLO_IMG_BACK_GR='' where CLO_DATE_DDMMYYYY=? and CLO_IMG_FRNT_BW is not null and CLO_CONVERT_FLG='N'";//CLO_BRANCH_CD=? and 	
				 PreparedStatement ps3=con.prepareStatement(sql3);
				//ps3.setString(1,branchFolder);
				ps3.setString(1,Configuration.getDDMMYYYY());	
				if(ps3.executeUpdate()>0)	
			   		System.out.println("**** Image name field is updated ****");
				ps3.close();
 		 }	
 		 		  System.out.println("End----------------");
 		 		  
			//	   System.out.println("rsUpdateCount:>>>>>>>>>>>"+rsUpdateCount);
  				//   System.out.println("filesCnt:>>>>>>>>>>>>"+filesCnt);
  				 System.out.println("count:>>>>"+count+" blokedFlag>>>>"+blokedFlag);
  				 
  				 if(rsUpdateCount==filesCnt  && count==0)
					   msg="Uploaded Successfully.";
				 else  if(count>0)
					  msg="Following MICR Code has been Blocked By NPCI.\n"+strBuff.toString();
				 else
				   	   msg="Cheque might be faulty";					   
				
				   
			 	 	//14032014
				  /*	File srcFolder = new File(fileDirectory);
				   	String destFile=Configuration.getConfValByNm("CFG_ARCUPLOADPATH_TO_CHI")+branchFolder+"/"+Configuration.getDDMMYYYY()+"_"+Configuration.getHHMISS()+"/";
					
					System.out.println("destFile path:::>>>>>"+destFile);
					File destFolder=new File(destFile);	
					
					FileUtils.moveDirectory(srcFolder,destFolder);
					File makeClearingOutward=new File(fileDirectory);
					makeClearingOutward.mkdirs();
					System.out.println("***** Folder is moved *****");	*/		
				   	//14032014
					/*String generatedFileInfo[]=ImageToByteConverter.convertImageToByte(branchFolder,fileNames).split("!@!");
					if(generatedFileInfo[0].equalsIgnoreCase("FAIL")) 
					{//1
							msg="FAIL_FILE_NOT_FOUND!@!";
					}//1
					else
					{//1
							XMLFileName=generatedFileInfo[0];
							System.out.println("XMLFileName:::"+XMLFileName);
							CIBFFileName=generatedFileInfo[1];
							System.out.println("CIBFFileName:::"+CIBFFileName);
							fileCount=Integer.parseInt(generatedFileInfo[2]);
							System.out.println("fileCount:::"+fileCount);
							imageFileArray=generatedFileInfo[3].split("!Q!");
							System.out.println("imageFileArray:::"+imageFileArray.length);
									
							System.out.println("FILE COUNT:"+fileCount);
							System.out.println("filesCnt:"+filesCnt);
							if(fileCount==filesCnt)
							{//2			
									//Move the file from branchFolder						
								int cntImg=0;
								String str="";
								//imageFileArray=NEW File(filePath).list();
								for(String Filename:imageFileArray)
								{//4 
									System.out.println("File Name:"+Filename +" is moved");
									str=Configuration.moveToArchive(Filename,"U",branchFolder,"I","C");
									 System.out.println("str:::::>>>>"+str);
									 if(str.split("#")[0].equalsIgnoreCase("SUCCESS"))
										 cntImg++;
									//Filename.substring(Filename.lastIndexOf(".")-1)&& 
									if(Filename.startsWith("f_") && Filename.endsWith(".tif"))
									{
										Filename=Filename.replace("f_","r_");
										Filename=Filename.replace(".tif","_G.jpg");
										str=Configuration.moveToArchive(Filename,"U",branchFolder,"I","C");
										System.out.println("str:::::>>>>"+str);
									}
								}//4
								  System.out.println("cntImg:::::"+cntImg);
								  System.out.println("imageFileArray.length:::::"+imageFileArray.length);
								 if(cntImg==imageFileArray.length)
								 {//5
									//msg=str;
									//now move the .xml and .img file from branchFolder
									//str=Configuration.moveToArchive(XMLFileName,"U",branchFolder,"X","C");
									//System.out.println("str:::::"+str);																
									//str=Configuration.moveToArchive(CIBFFileName,"U",branchFolder,"X","C");
									//System.out.println("str:::::"+str);	
									 System.out.println("**** file moving ***");
									//move the .img and .xml file from  uploadpath_to_CHI\9\ClearingOutward	 to uploadpath_to_CHI
									//XMLFileName,CIBFFileName
									String uploadpath_to_CHI=Configuration.getConfValByNm("CFG_uploadpath_to_CHI");
									//new File(fileDirectory+XMLFileName).renameTo(new File(uploadpath_to_CHI+XMLFileName));
									//new File(fileDirectory+CIBFFileName).renameTo(new File(uploadpath_to_CHI+CIBFFileName));
									msg="SUCCESS";
									 System.out.println("**** file moving ***");
								 }//5	
								 else
								 {
									msg="FILE_CONVERTED_BUT_CANTNOT_MOVE";
								 }
														
							}//2
							else
							{//2
									System.out.println("in else...");
									msg="FAIL_UNABLE_TO_CONVERT_FILE";
							}//2
					}//1*/
				//}//0
				/*else
				{//0
					 //msg="FILE_NOT_FOUND";
					 msg="NO Cheque Selected!";
				}//*/	
			
 		 } //try 	
 		
		 catch (SQLException e)
		 {//catch2
		 		 System.out.println("***SQLException in UploadServlet.jsp:::"+e);
				  e.printStackTrace();
				  msg="Can Not Save Checque Data!";
		 }//catch2
		 catch(NumberFormatException e){
 			 System.out.println("***NumberFormatException.jsp:::"+e);
			  e.printStackTrace();
			  msg="Faulty Item Sequence Number Found !";
 		 }
		 catch(FileNotFoundException e)
		 {//catch2
		 	 System.out.println("***FileNotFoundException in UploadServlet.jsp:::"+e);
				  e.printStackTrace();
				  msg="Image Files are Not Found To Delete!";	
		 }//catch2
		 catch(IOException e)
		 {//catch2
		 		 System.out.println("***IOException in UploadServlet.jsp:::"+e);
				  e.printStackTrace();
				  msg="Can Not Delete Checque Image Files!";
		 }//catch2
		 catch (Exception e)
		 {//catch2
		 		 System.out.println("***Exception in UploadServlet.jsp:::"+e);
				  e.printStackTrace();
				  msg="Error In Uploading Cheques!";
		 }//catch2
		 finally {
			 con.close();
		 }
			
			//out.println("******* msg :"+msg);
			//response.sendRedirect("../outward_clearing.jsp?msg="+msg);
			System.out.println("******* Exit From UploadServelt.jsp *************** msg"+msg);	
%>

<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="../outward_clearing.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();
}

</script>
<body onLoad="Forward()">
<form id="formid" name="formid" method="post">
	<input type="hidden" id="CTSTOKEN" name="CTSTOKEN" value="<%=ctstoken%>">
	<input type="hidden" id="msg" name="msg" value="<%=msg%>">
	<input type="hidden" id="flag" name="flag" value="<%=flag%>">
</form>
</body>
</html>