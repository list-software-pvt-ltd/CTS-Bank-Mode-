<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*" %>
<%@page import="org.apache.commons.io.*"%>

<%
	System.out.println("In afterManualArchive.jsp...............");
    String session_branch_code="";
	
	//String msg="Successfully Archived of:";
	String msg="Archived has been done for:";
	String chk_selall = "", chk1 = "", chk2 = "", chk3 = "", chk4 = "",chk5 = "",chk6="";
	int cnt1 = 0, cnt2 = 0, cnt3 = 0, cnt4 = 0,cnt5=0,cnt6=0;
	//chk_selall 	ALL
	//chk1 Clearing Outward
	//chk2 Return Inward
	//chk3 Clearing Inward
	//chk4 Return Outward
 
 	String srcDir = "";
	String destType = "";
	String isOnlyFiles = "";
	
	int i=0;
	Connection con=Configuration.getConnection();
	try
	{
		session_branch_code = (String)session.getAttribute("session_branch_code");
		//out.println("session_branch_code :"+session_branch_code);

		chk_selall = request.getParameter("chk_selall");
		//out.println("chk_selall="+chk_selall);
		
		chk1 = request.getParameter("chk_1");
		//out.println("chk1="+chk1);
		
		chk2 = request.getParameter("chk_2");
		//out.println("chk2="+chk2);
		
		chk3 = request.getParameter("chk_3");
		//out.println("chk3="+chk3);
		
		chk4 = request.getParameter("chk_4");
		//out.println("chk4="+chk4);
		
		chk5 = request.getParameter("chk_5");
		chk6 = request.getParameter("chk_6");
/////////////////////////////////////////////////////////////////////////////		
//////////OUTWARD CLEARING
		if(chk1.equalsIgnoreCase("true"))
		{
		
			srcDir = Configuration.getConfValByNm("CFG_uploadpath_to_CHI",con);
			System.out.println("srcDir:"+srcDir);
			
			//CIBF AND CXF files from  CFG_uploadpath_to_CHI
			File srcFolder = new File(srcDir);
			File[] listSrcFiles = srcFolder.listFiles();

			String sourceFile = "";
			destType =  "U";
			System.out.println("listSrcFiles.length:"+listSrcFiles.length);
			for (int m = 0; m < listSrcFiles.length; m++)
			{// for
				if(!listSrcFiles[m].isDirectory())
				{
					System.out.println("listSrcFiles[m]:"+listSrcFiles[m]);
					if(listSrcFiles[m].getName().indexOf("CIBF") > -1 || listSrcFiles[m].getName().indexOf("CXF") > -1)
					{
						/*System.out.println("CIBF/CXF FOUND");
						sourceFile = srcDir + listSrcFiles[m].getName();
						boolean flag = Configuration.manualArchive(sourceFile, destType);
						System.out.println("flag:"+flag);
						cnt1 = 1;
						if (flag == false)
						{
							cnt1 = 0;
						}*/						
						if(!(listSrcFiles[m].getName().contains("Thumbs.db")))
						{
							////////////////////////////
							
							File srcFile=new File(srcDir+listSrcFiles[m].getName());
							File destFile=new File(Configuration.getConfValByNm("CFG_ARCUPLOADPATH_TO_CHI",con)+ Configuration.getDDMMYYYY()+"/"+listSrcFiles[m].getName());
							FileUtils.moveFile(srcFile,destFile);  
							System.out.println("\n\tFile is moved");    
							cnt1 =1;       
						}	
						////////////////////////////
					}
				}
			}//for

			
			//Connection cn = Configuration.getConnection();//(Connection)session.getAttribute("session_connection");					
			String qry = "select BRM_BRNCD from BRANCHMSTR where BRM_SCANNERYN='Y'";					
			PreparedStatement pst = con.prepareStatement(qry);					
			ResultSet rs = pst.executeQuery();			
			while(rs.next())
			{
				System.out.println("rs.getString(1):"+rs.getString(1));
				String src = srcDir + rs.getString(1) + "/ClearingOutward/";				
				System.out.println("source path:::>>>>>"+src);
				srcFolder = new File(src);				
				
				//String destFile=Configuration.getConfValByNm("CFG_ARCUPLOADPATH_TO_CHI")+rs.getString(1)+"/"+Configuration.getDDMMYYYY()+Configuration.getHHMISS()+"/";
				String destFile=Configuration.getConfValByNm("CFG_ARCUPLOADPATH_TO_CHI",con)+"/"+Configuration.getDDMMYYYY()+"/";
				System.out.println("destFile path:::>>>>>"+destFile);
				File destFolder=new File(destFile);				
				//useing commans-io 2.2 api move the file
				FileUtils.moveDirectory(srcFolder,destFolder);	
				
				//now make empty clearing outward dir on upload path.			
				File makeClearingOutward=new File(src);
				makeClearingOutward.mkdirs();
				System.out.println("***** Folder is moved *****");
				cnt1=1;
				/*listSrcFiles = srcFolder.listFiles();
				System.out.println("listSrcFiles.length:"+listSrcFiles.length);								
				for (int at = 0; at < listSrcFiles.length; at++)
				{// for			
					sourceFile = src + listSrcFiles[at].getName();
					System.out.println("sourceFile:"+sourceFile);				
					boolean flag = Configuration.manualArchive(sourceFile, destType);
					System.out.println("flag:"+flag);
					cnt1 = 1;
					if (flag == false)
					{
						cnt1 = 0;
					}
				}//for*/
				
			}		
			if(cnt1 == 1)
			{
				msg = msg +  "\nClearing Outward ";
			}
		}
/////////////////////////////////////////////////////////////////////////////		
/////////RETURN INWARD
		if(chk2.equalsIgnoreCase("true"))
		{
			srcDir = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con);
			srcDir = srcDir + "/ReturnInward/";
			String desDir=Configuration.getConfValByNm("CFG_ARCDOWNLOADPATH_FROM_CHI",con)+Configuration.getDDMMYYYY()+Configuration.getHHMISS()+"/ReturnInward/";
			
			File srcFolder = new File(srcDir);
			File desFolder=new File(desDir);
			FileUtils.moveDirectory(srcFolder,desFolder);
			File makeClearingOutward=new File(srcDir);
			makeClearingOutward.mkdirs();
			System.out.println("***** Folder is moved *****2222");
			cnt2=1;
			/*File[] listSrcFiles = srcFolder.listFiles();

			String sourceFile = "";
			
			for (int at = 0; at < listSrcFiles.length; at++)
			{// for
			
				sourceFile = srcDir+listSrcFiles[at].getName();
				destType =  "D";
				boolean flag = Configuration.manualArchive(sourceFile, destType);
				out.println("flag:"+flag);
				cnt2 = 1;
				if (flag == false)
				{
					cnt2 = 0;
				}
			}//for*/
			if(cnt2 == 1)
			{
				msg = msg +  "\nReturn Inward ";
			}	
		}
/////////////////////////////////////////////////////////////////////////////	
///////////INWARD CLEARING
		if(chk3.equalsIgnoreCase("true"))
		{
			srcDir = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con);
			srcDir = srcDir + "ClearingInward/";
			//String desDir=Configuration.getConfValByNm("CFG_ARCDOWNLOADPATH_FROM_CHI")+Configuration.getDDMMYYYY()+Configuration.getHHMISS()+"/ClearingInward";
			String desDir=Configuration.getConfValByNm("CFG_ARCDOWNLOADPATH_FROM_CHI",con)+Configuration.getDDMMYYYY()+"/ClearingInward";
			File srcFolder = new File(srcDir);
			File desFolder=new File(desDir);
			FileUtils.moveDirectory(srcFolder,desFolder);
			
			File makeClearingOutward=new File(srcDir);
			makeClearingOutward.mkdirs();
			System.out.println("***** Folder is moved *****3333");
			cnt3=1;
			/*File[] listSrcFiles = srcFolder.listFiles();
			String sourceFile = "";			
			for (int at = 0; at < listSrcFiles.length; at++)
			{// for
				sourceFile = srcDir+listSrcFiles[at].getName();//Images
				System.out.println("\nsourceFile::::>>>>"+sourceFile);
				System.out.println("sourceFile::::>>>>"+sourceFile);
				System.out.println("sourceFile::::>>>>"+sourceFile+"\n\n");													
				destType =  "D";
				boolean flag = Configuration.manualArchive(sourceFile, destType);
				System.out.println("flag:"+flag);
				cnt3 = 1;
				if (flag == false)
				{
					cnt3 = 0;
				}
			}//for */
			
			if(cnt3 == 1)
			{
				msg = msg +  "\nClearing Inward ";
			}
		
		}
/////////////////////////////////////////////////////////////////////////////		
///////////RETURN OUTWARD
		if(chk4.equalsIgnoreCase("true"))
		{
			srcDir = Configuration.getConfValByNm("CFG_uploadpath_to_CHI",con);
			destType =  "U";
			
//RRF files from  CFG_uploadpath_to_CHI
			File srcFolder = new File(srcDir);
			File[] listSrcFiles = srcFolder.listFiles();

			String sourceFile = "";
			
			for (int m = 0; m < listSrcFiles.length; m++)
			{// for
				if(!listSrcFiles[m].isDirectory())
				{
					if(listSrcFiles[m].getName().indexOf("RRF") > -1)
					{
						System.out.println("RRF FOUND");
						sourceFile = srcDir+listSrcFiles[m].getName();
						boolean flag = Configuration.manualArchive(sourceFile, destType);
						System.out.println("flag:"+flag);
						cnt4 = 1;
						if (flag == false)
						{
							cnt4 = 0;
						}
					}
				}
				
			}//for
			
//contents from CFG_uploadpath_to_CHI/ReturnOutward/
			srcDir = srcDir + "ReturnOutward/";
			srcFolder = new File(srcDir);
			String desDir=Configuration.getConfValByNm("CFG_ARCUPLOADPATH_TO_CHI",con)+Configuration.getDDMMYYYY()+Configuration.getHHMISS()+"/ReturnOutward/";
			File desFolder=new File(desDir);
			
			FileUtils.moveDirectory(srcFolder,desFolder);
			File makeClearingOutward=new File(srcDir);
			makeClearingOutward.mkdirs();
			System.out.println("***** Folder is moved *****5555");
			
			/*listSrcFiles = srcFolder.listFiles();	
			for (int at = 0; at < listSrcFiles.length; at++)
			{// for
			
				sourceFile = srcDir+listSrcFiles[at].getName();
				boolean flag = Configuration.manualArchive(sourceFile, destType);
				System.out.println("flag:"+flag);
				cnt4 = 1;
				if (flag == false)
				{
					cnt4 = 0;
				}
			}//for*/
			
			if(cnt4 == 1)
			{
				msg = msg + "\nReturn Outward ";
			}						
		}
/////////////////////////////////////////////////////////////////////////////		

///Response Files
		if(chk5.equalsIgnoreCase("true"))
		{
			srcDir = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con);
			srcDir = srcDir + "ResponseFiles/";
			String desDir=Configuration.getConfValByNm("CFG_ARCDOWNLOADPATH_FROM_CHI",con)+Configuration.getDDMMYYYY()+Configuration.getHHMISS()+"/ResponseFiles/";
			File srcFolder = new File(srcDir);
			File desFolder=new File(desDir);
			FileUtils.moveDirectory(srcFolder,desFolder);
			
			File makeClearingOutward=new File(srcDir);
			makeClearingOutward.mkdirs();
			System.out.println("***** Folder is moved *****3333");
			cnt5=1;
		}
/////////////////

////////////////////////////////////
	//Database backup....
	if(chk6.equalsIgnoreCase("true"))
	{
		//DatabaseBackup is java class in cts package that cantains runCommand method.This method run the OracleBackup.bat file.This is void method.
		 cnt6=1;
		 System.out.println("----- inside database backup -----");
		 DatabaseBackup.runCommand("");
		 Thread.sleep(10000);
		 System.out.println("----- inside database backup exit -----");		
	}
	 if( cnt6==1)
	 {
	 	msg =  msg + "\nDatabase Backup!";
	 }
////////////////////////////////////

		//msg =  msg + " Successfully Archived!";
		
		if(chk_selall.equalsIgnoreCase("true"))
		{
			if(cnt1 == 1 && cnt2 == 1 && cnt3 == 1 && cnt4 == 1 && cnt5==1 && cnt6==1)
			{
				//msg =  msg + "\nSuccessfully Archived!";
			}
		}
		con.close();
		
	}
	catch(IOException e)
	{
		System.out.println(e);
		String errMsg=e.getMessage();
		if(errMsg.contains("Destination") && errMsg.contains("already exists"))
			msg="Destination folder is already exists";
		else
			msg="Source folder does not exist";
	}
	catch(Exception e)
	{
		 System.out.println("Exception :"+e);
		 msg="Error At Server!"+e;
	}
	System.out.println("--- exit from afterManualArchive.jsp ----"+msg);
	response.sendRedirect("../manual_archive.jsp?msg="+msg);	
%>					 


    

