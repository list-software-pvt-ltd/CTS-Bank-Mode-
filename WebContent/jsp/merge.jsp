<%@ page import="java.io.*,java.util.*, jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*"%>
<%@ page import="java.net.SocketException"%>
<%@ page import="org.apache.commons.net.ftp.*" %>
<%-- <%@ page import="org.apache.commons.fileupload.servlet.*" %> --%>
<%@ page import="org.apache.commons.io.output.*" %>
<%@ page import="cts.*" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.security.*" %>

<%
	String msg="";
	int fileCount;
	String XMLFileName;
	String CIBFFileName="";
	String[] imageFileArray;
	String[] imagefileNames;
	PreparedStatement _psClearingOutward;
	PreparedStatement _psTemp;
	Connection con=null;
	ResultSet _rsClearingOutward = null;
	String generatedFileInfo[];
	String currentChqNo="",ctstoken=null,flag="";
	
	StringBuffer sel_chq_str = new StringBuffer();
		ArrayList<MergeBean> beanList=new ArrayList<MergeBean>();
		String session_branch_code = (String) session.getAttribute("session_branch_code");
		System.out.println("----------------------- merge.jsp --------------------------");
		System.out.println("merge.jsp"+request.getParameter("CTSTOKEN"));
		Configuration.writeLog("----------------------- merge.jsp --------------------------");
 		 try
 		 {//try
		   
			String branchString=request.getParameter("branches");
 			System.out.println("branches----"+branchString);
 				
 			ctstoken=request.getParameter("CTSTOKEN");
 			flag=request.getParameter("flag");
 			//String branchArr[]=branchString.split("~");
 				 
 			//for(int ij=0;ij<branchArr.length;ij++)
 			//{ 
		 	PrivateKey privateKey=null;
		 	con=Configuration.getConnection();
		 	String scannerStr=Configuration.getConfValByNm("CFG_SCANNER",con);
		 	String uppath=Configuration.getConfValByNm("CFG_UPLOADPATH_TO_CHI",con);
		 	uppath=new File(uppath).getParent();
 			System.out.println(uppath);
 			
		 	//if(scannerStr.equals("PANINI"))
		 		System.out.println("******* uppath ********"+uppath);
		 		System.out.println("******* uppath full ********"+uppath+"/WEB-INF/classes/cts/");
		 		privateKey= new CtsSecurity(con).getPrivateKey(uppath+"/WEB-INF/classes/cts/");
		 		System.out.println("******* privateKey ********"+privateKey);
		 	//else
 		 	//	privateKey=null; 
			StringBuffer result=new StringBuffer();
			String CIBF_fileName="";
			//System.out.println("******* m 1 ********");
			ArrayList<Item> itemBeanAl=new ArrayList<Item>();			
			ImageToByteConverter _objImageToByteConverter=new ImageToByteConverter();
			_objImageToByteConverter.setPrivateKey(privateKey);
			
			_objImageToByteConverter.setItemList(itemBeanAl);
			
			String CHI_Bank_Name=Configuration.getConfValByNm("CFG_CHI_BANKNAME",con);
			//System.out.println("******* CHI_Bank_Name ********"+CHI_Bank_Name);
			if(CHI_Bank_Name.equals("NPCI")||CHI_Bank_Name.equals("AXIS")||CHI_Bank_Name.equals("IDBI")||CHI_Bank_Name.equals("KOTAK"))
				CIBF_fileName=GetFileName.getClearingFileName("CIBF",".img",con);
			else if(CHI_Bank_Name.equals("HDFC"))
				CIBF_fileName=GetFileName.getClearingFileName_HDFC("SBI",".img",con);
			String pathForImgAndXML=Configuration.getConfValByNm("CFG_uploadpath_to_CHI",con);
			
			//String cibf_filePath=pathForImgAndXML;//+CIBF_fileName;
			////////////////////
			FileOutputStream cibf_fos=new FileOutputStream(pathForImgAndXML+CIBF_fileName,true);//,true ---DSP
			cibf_fos.flush();
			cibf_fos.close();		
			/////////////////////
			
				
			String sql="select CLO_BRANCH_CD,CLO_IMG_FRNT_BW,CLO_IMG_BACK_BW,CLO_IMG_FRNT_GR,CLO_IMG_BACK_GR,CLO_CHQNO,CLO_SORTCD,nvl(BRM_PARENTBRCD,BRM_BRNCD) BRM_PARENTBRCD";
					sql=sql+" from CLEARINGOUTWARD join BRANCHMSTR on CLO_BRANCH_CD=BRM_BRNCD  where CLO_CONVERT_FLG='Y' AND CLO_DATE_DDMMYYYY=? and CLO_BRANCH_CD in ("+branchString+") order by CLO_BRANCH_CD,CLO_CHQNO, CLO_SORTCD";//TO_CHAR(SYSDATE,'DDMMYYYY')
					
			System.out.println("sql::>>"+sql);		
			_psClearingOutward=con.prepareStatement(sql);
			_psClearingOutward.setString(1,Configuration.getDDMMYYYY());//Configuration.getDDMMYYYY());	
			_rsClearingOutward=_psClearingOutward.executeQuery();
			
			
			
			//System.out.println("******* m 3 ********");			
			int recordNumber=0;
			while(_rsClearingOutward.next())	
			{//1
				//System.out.println("******* m 4 ********");	
				
				
				currentChqNo=_rsClearingOutward.getString("CLO_CHQNO");
				
				//create a file object to pointing .img file for getting size of .img file
				
				//System.out.println("fileSize::>>"+fileSize);
				//sel_chq_str.append(_rsClearingOutward.getString(2) + "#"+ _rsClearingOutward.getString(3) + "#" +_rsClearingOutward.getString(4) + "#" +_rsClearingOutward.getString(5));
				String CLO_BRANCH_CD=_rsClearingOutward.getString(1);
				//System.out.println("CLO_BRANCH_CD::>>"+CLO_BRANCH_CD);				
				String CLO_IMG_FRNT_BW=_rsClearingOutward.getString(2);
				//System.out.println("CLO_IMG_FRNT_BW::>>"+CLO_IMG_FRNT_BW);
				String CLO_IMG_BACK_BW=_rsClearingOutward.getString(3);
				//System.out.println("CLO_IMG_BACK_BW::>>"+CLO_IMG_BACK_BW);
				String CLO_IMG_FRNT_GR=_rsClearingOutward.getString(4);
				String BRM_PARENTBRCD=_rsClearingOutward.getString(8);
				//System.out.println("CLO_IMG_FRNT_GR::>>"+CLO_IMG_FRNT_GR);							
				//create a image file name array
				//CLO_BRANCH_CD,
				//CLO_IMG_FRNT_BW,
				//CLO_IMG_BACK_BW,
				//CLO_IMG_FRNT_GR,
				//CLO_IMG_BACK_GR,
				//CLO_CHQNO,
				//CLO_SORTCD,
				//nvl(BRM_PARENTBRCD,BRM_BRNCD) BRM_PARENTBRCD
				MergeBean bean=new MergeBean();
				bean.setBRM_PARENTBRCD(BRM_PARENTBRCD);
				bean.setCLO_BRANCH_CD(CLO_BRANCH_CD);
				bean.setCLO_CHQNO(currentChqNo);
				bean.setCLO_IMG_BACK_BW(CLO_IMG_BACK_BW);
				bean.setCLO_IMG_BACK_GR("");
				bean.setCLO_IMG_FRNT_BW(CLO_IMG_FRNT_BW);
				bean.setCLO_IMG_FRNT_GR(CLO_IMG_FRNT_GR);
				bean.setCLO_SORTCD(_rsClearingOutward.getString(7));
				beanList.add(bean);
			}//1	
			_rsClearingOutward.close();
			_psClearingOutward.close();
			_objImageToByteConverter=new ImageToByteConverter();
			Configuration.writeLog("After Creating ArrayList");
			//cibf_filePath=pathForImgAndXML+CIBF_fileName;
			itemBeanAl=new ArrayList<Item>();
			Engine obj_engine=new Engine(con);
			for(int i=0;i<beanList.size();i++)
			{
				recordNumber++;
				File f=new File(pathForImgAndXML+CIBF_fileName);//CIBF_fileName
				int fileSize=(int)f.length();
				System.out.println("recordNumber::>>>>"+recordNumber);
				System.out.println("Cheque No::>>>>"+beanList.get(i).getCLO_CHQNO());
				if(recordNumber%250==1 && recordNumber!=1)
				{
					//System.out.println("******** after 250 cheque ***********");								
					//System.out.println("******** after 250 cheque ***********");						
					itemBeanAl=_objImageToByteConverter.getItemList();
					//System.out.println("itemBeanAl:::>>>"+itemBeanAl.size());								
					
					if(CHI_Bank_Name.equals("NPCI")||CHI_Bank_Name.equals("AXIS")||CHI_Bank_Name.equals("IDBI")||CHI_Bank_Name.equals("KOTAK"))
					{
						Configuration.writeLog("---itemBeanAl.size()="+itemBeanAl.size());
						if(!obj_engine.generateCXF(itemBeanAl,CIBF_fileName))
						{//2
							//System.out.println("CFX.xml created");
							System.out.println("CFX.xml created");
							Configuration.writeLog("CFX.xml created");
							 msg="SUCCESS";
							 /* for(int j=0;j<i;j++)
							 {
								 //beanList.remove(j);
								 itemBeanAl.remove(j);
							 } */
							 itemBeanAl=null;
							 itemBeanAl=new ArrayList<Item>();
							 //if(CHI_Bank_Name.equals("NPCI")||CHI_Bank_Name.equals("AXIS")||CHI_Bank_Name.equals("IDBI"))
							CIBF_fileName=GetFileName.getClearingFileName("CIBF",".img",con);
							 //else if(CHI_Bank_Name.equals("HDFC"))
							 //		CIBF_fileName=GetFileName.getClearingFileName_HDFC("SBI",".img",con);
							 f=new File(pathForImgAndXML+CIBF_fileName);//CIBF_fileName
							fileSize=(int)f.length();
						}//2
						else
						{//2
							//System.out.println("CFX.xml is NOT created");
							msg="CFX.xml is NOT created";;
						}//2
					}
					else if(CHI_Bank_Name.equals("HDFC"))
					{
						if(!obj_engine.generateSBS_HDFC(itemBeanAl,CIBF_fileName))
						{//2
						//System.out.println("CFX.xml created");
							//System.out.println("SBS.xml created");
							 msg="SUCCESS";
							 itemBeanAl=null;
							 itemBeanAl=new ArrayList<Item>();
							 CIBF_fileName=GetFileName.getClearingFileName_HDFC("SBI",".img",con);
							 f=new File(pathForImgAndXML+CIBF_fileName);//CIBF_fileName
							 fileSize=(int)f.length();
						}//2
						else
						{//2
							//System.out.println("CFX.xml is NOT created");
							msg="SBS.xml is NOT created";;
						}//2
					} 
				} 
				_objImageToByteConverter=new ImageToByteConverter();
				_objImageToByteConverter.setPrivateKey(privateKey);
				//itemBeanAl=new ArrayList<Item>();
				_objImageToByteConverter.setItemList(itemBeanAl);	
				
				imagefileNames=new String[]{beanList.get(i).getCLO_IMG_FRNT_BW(),beanList.get(i).getCLO_IMG_BACK_BW(),beanList.get(i).getCLO_IMG_FRNT_GR()};	
				System.out.println("beanList.get(i).getCLO_IMG_FRNT_BW()=="+beanList.get(i).getCLO_IMG_FRNT_BW());
				System.out.println("beanList.get(i).getCLO_IMG_BACK_BW()=="+beanList.get(i).getCLO_IMG_BACK_BW());
				System.out.println("beanList.get(i).getCLO_IMG_FRNT_GR()=="+beanList.get(i).getCLO_IMG_FRNT_GR());
				
				String tempResult="";
				if(CHI_Bank_Name.equals("NPCI")||CHI_Bank_Name.equals("AXIS")||CHI_Bank_Name.equals("IDBI")||CHI_Bank_Name.equals("KOTAK"))
					tempResult=_objImageToByteConverter.convertImageToByte(beanList.get(i).getBRM_PARENTBRCD(),beanList.get(i).getCLO_BRANCH_CD(),pathForImgAndXML,fileSize,CIBF_fileName,imagefileNames,con);	
				else if(CHI_Bank_Name.equals("HDFC"))
					tempResult=_objImageToByteConverter.convertImageToByte_HDFC(beanList.get(i).getCLO_BRANCH_CD(),pathForImgAndXML,fileSize,CIBF_fileName,imagefileNames,con);	//convertImageToByte_HDFC
				result.append(tempResult);
				if(result.indexOf("Private Key Not Found for certificate")>-1)
				{
					break;
				}
				else if(result.indexOf("ImageFileNotFound")>-1)
				{
					break;
				}
			}
			System.out.println("result:::>>>"+result);
			if(result.indexOf("ImageFileNotFound")>-1)
			{
				msg="ImageFile of cheque(s) "+result.toString().split("$")[1]+" is not found";
			}
			 else if(!(result.toString().indexOf("FAIL")>-1))
			{//1
			//now generate
			
				itemBeanAl=_objImageToByteConverter.getItemList();
				//System.out.println("itemBeanAl:::>>>"+itemBeanAl.size());	
				int itemSize=itemBeanAl.size();
				if(itemSize>0)
				{//1.1							
					//Engine obj_engine=new Engine(con);
					if(CHI_Bank_Name.equals("NPCI")||CHI_Bank_Name.equals("AXIS")||CHI_Bank_Name.equals("IDBI")||CHI_Bank_Name.equals("KOTAK"))
					{
						if(!obj_engine.generateCXF(itemBeanAl,CIBF_fileName))
						{//2
							//System.out.println("CFX.xml created");
							for(int j=0;j<beanList.size();j++)
								beanList.remove(j);
							msg="SUCCESS";
						}//2
						else
						{//2
							//System.out.println("CFX.xml is NOT created");
							msg="CFX.xml is NOT created";
						}//2
					}
					else if(CHI_Bank_Name.equals("HDFC"))
					{
						if(!obj_engine.generateSBS_HDFC(itemBeanAl,CIBF_fileName))
						{//2
							System.out.println("itemBeanAl:::>>>"+itemBeanAl.size());
							msg="SUCCESS";
						}//2
						else
						{//2
							//System.out.println("SBS.xml is NOT created");
							msg="SBS.xml is NOT created";
						}//2
					}
				}//1.1
				else
				{//1.1
					if(result.indexOf("Private Key Not Found for certificate")>-1)
					{
						msg="\n\tDigital Certificate Not Found.\n\tOr Check Signing Tool Is Connected or Not.\n\t Or Private Key Not Found For given Certificate.";
						new File(pathForImgAndXML+CIBF_fileName).delete();	
					}
					else
					{	
						msg="CIBF.img is NOT created";;
					}	
				}//1.1	
		     }//1
			 else
			 {//1
			 	if(recordNumber==0)
				{
					msg="Cheque Not Found To Mearging.";	
				}
				else
				{
					//msg="ImageFile of cheque(s) "+result.toString().split("$")[1]+" is not found";
					msg="CIBF.img is NOT created.Problem at "+result.toString().split("\\$")[1];
				}	
			 }//1
 			//}
 		 } //try 	
		 catch(SQLException e)
		 {
			System.out.println("***SQLException in Merge.jsp:::"+e);
			e.printStackTrace();
			msg="FAIL";
			Configuration.writeLog("In Merge.jsp---"+e);
		 }
		 catch (Exception e)
		 {//catch2
		 		 System.out.println("***Exception in Merge.jsp:::"+e);
				  e.printStackTrace();
				  msg="FAIL";
				  Configuration.writeLog("In Merge.jsp!!!!!"+e);
		 }//catch2
		 con.close();
		// response.sendRedirect("../merging.jsp?msg="+msg);			
%>

<%!

/* public void moveFiles(File[] files, String filePathToBeBackup) 
{//moveFiles
			System.out.println("in moveFiles sel_chq_str :"+sel_chq_str);
			System.out.println("in moveFiles filePathToBeBackup :"+filePathToBeBackup);
	
			for (File file : files) 
			{//for
				if (file.isDirectory()) 
				{//if
						System.out.println("Directory: " + file.getName());
						moveFiles(file.listFiles(),filePathToBeBackup); // Calls same method again.
				}//if ends 
				else 
				{//else
						
						if(sel_chq_str.toString().indexOf(file.getName()) > -1)
						{//moving
							System.out.println("File: " + file.getName());
							System.out.println("MOVED TO DONE FOLDER ");
							File sourceFile = null;
							File destFile = null;
							sourceFile = file ;
							destFile = new File(filePathToBeBackup + file.getName());
							sourceFile.renameTo(destFile);
						}//moving end
					
				}//else ends
			}//for ends
	
}//moveFiles end */

%>
<html>
<script language="javascript">
function Forward()
{
	document.getElementById("formid").action="../merging.jsp";
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