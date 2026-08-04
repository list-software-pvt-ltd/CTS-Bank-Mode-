<%@page import="org.apache.commons.io.FileUtils"%>
<%@page import="jcifs.smb.SmbFile"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="org.apache.commons.net.ftp.*"%>
<%@ page import="java.net.SocketException"%>
<%@ page import="java.util.*"%>
<%@ page import="cts.*"%>


<%
	String retVal = "";
	String fileName;
	int cil_clrseqno=0;
	int fileCount;
	String BPIBF_FileName = " ", BPXF_fileName = " ";
	String[] downloadedFileArray;
	String movedFilePath;
	String branchFolder;
	int counter = 0;
	String allFilesinDownloadPath;
	String fstr;
	boolean flg=false;
	String retstr="";
	System.out.println("===== start DownloadServlet =====");
	String fileName_second = "";
	String cbs_conti_flg = (String) session.getAttribute("session_cbs_conti_flg");	
	branchFolder = (String) session.getAttribute("session_branch_code");

	branchFolder = branchFolder + "\\";
	Connection con=Configuration.getConnection();
	try {//1
		String CHI_Bank_Name = Configuration
				.getConfValByNm("CFG_CHI_BANKNAME",con);
		String CFG_VENDOR_ID = Configuration
				.getConfValByNm("CFG_VENDOR_ID",con);
		String path = Configuration
				.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)
				+ "ClearingInward/";
		File serverDir = new File(path);//NOTE: change this path according to server
		serverDir.mkdirs();
		System.out.println("serverDir" + serverDir);
		String fileList[] = serverDir.list();
		fileCount = fileList.length;
		if (fileCount != 0) {//@@@
			Arrays.sort(fileList);
			ArrayList<String> al_xml = new ArrayList<String>();
			ArrayList<String> al_img = new ArrayList<String>();
			ArrayList<String> al_pxf = new ArrayList<String>();
			ArrayList<String> al_br = new ArrayList<String>();
			ArrayList<String> al_bf = new ArrayList<String>();
			ArrayList<String> al_gf = new ArrayList<String>();
			ArrayList<String> al_txt = new ArrayList<String>();
			//kotak
			ArrayList<String> al_KotakFiles = new ArrayList<String>();
			//ArrayList<String> al_KotakFilestxt = new ArrayList<String>();
			//kotak
			for (String s : fileList) {
				if (new File(path + s).isFile()) {
					//System.out.println(s);
					String ext = s.substring(s.lastIndexOf("."),
							s.length());
					System.out.println(ext);

					if (s.toUpperCase().indexOf(".IMG") > -1) {
						al_img.add(s);
					} else if (s.toUpperCase().indexOf(".XML") > -1) {
						al_xml.add(s);
					} else if (s.toUpperCase().indexOf(".PXF") > -1) {
						al_pxf.add(s);
					} else if (s.toUpperCase().indexOf(".BF") > -1) {
						al_bf.add(s);
					} else if (s.toUpperCase().indexOf(".BR") > -1) {
						al_br.add(s);
					} else if (s.toUpperCase().indexOf(".GF") > -1) {
						al_gf.add(s);
					}
					else if(s.toUpperCase().indexOf("IW_SMB_") > -1 && s.indexOf(".txt") > -1){
						System.out.println("IW_SMB_::"+"===========insert1");
						al_KotakFiles.add(s);
						System.out.println("IW_SMB_::"+"===========insert2");
					}
				}

				else { //1
					File directory = new File(path + s);
					String[] fList = directory.list();
					System.out.println("path::" + directory
							+ "  string " + fList);
					for (int i = 0; i < fList.length; i++) { //2
						String str = fList[i];
						if (str.toUpperCase().indexOf(".PXF") > -1) {
							al_pxf.add(s + "/" + str);
						} else if (str.toUpperCase().indexOf(".BF") > -1
								|| str.toUpperCase().indexOf("F.TIFF") > -1) {
							al_bf.add(s + "/" + str);
						} else if (str.toUpperCase().indexOf(".BR") > -1
								|| str.toUpperCase().indexOf("B.TIFF") > -1) {
							al_br.add(s + "/" + str);
						} else if (str.toUpperCase().indexOf(".GF") > -1
								|| str.toUpperCase().indexOf(".JPG") > -1) {
							al_gf.add(s + "/" + str);
						} else if (str.toUpperCase().indexOf(
								"INWARDSUBPOSTING") > -1) {
							al_txt.add(s + "/" + str);
						}

					} //2
				}//1
			}
			System.out.println("\n\t al_img.size():" + al_img.size());
			System.out.println("\n\t al_xml.size():" + al_xml.size());
			System.out.println("\n\t al_gf.size():" + al_gf.size());
			System.out.println("\n\t al_bf.size():" + al_bf.size());
			System.out.println("\n\t al_br.size():" + al_br.size());
			System.out.println("\n @@@ Sharayu Mali CHI_Bank_Name:" + CHI_Bank_Name);
			System.out.println("\n @@@ Sharayu Mali CFG_VENDOR_ID:" + CFG_VENDOR_ID);
			if (al_img.size() == al_xml.size()
					&& CHI_Bank_Name.equals("NPCI")
					|| CHI_Bank_Name.equals("AXIS")||CHI_Bank_Name.equals("IDBI")) 
			{//1
				if (al_gf.size() == al_bf.size()
						&& al_gf.size() == al_br.size()
						&& (CHI_Bank_Name.equals("NPCI") || CHI_Bank_Name.equals("IDBI"))
						&& CFG_VENDOR_ID.equalsIgnoreCase("IDBISUB")) 
				{
					System.out.println("For IDBI Type 1::::"
							+ al_gf.size() + "::" + al_bf.size() + "::"
							+ al_gf.size() + "::" + al_br.size()
							+ "====" + CHI_Bank_Name);
					XMLReader _objXMLReader = new XMLReader();
                      //int clrsno=_objXMLReader.readCliSrNo();
					_objXMLReader.cil_clrseqno=_objXMLReader.readCliSrNo();
					System.out.println("\n\t al_txt.size():"
							+ al_txt.size());
					
					for (int i = 0; i < al_txt.size(); i++) {
						System.out.println("For IDBI Sub :");
						String f_pxf = al_txt.get(i);
						flg = _objXMLReader.readInwardSubPosting(f_pxf,cbs_conti_flg);
						
						if(flg)
							retVal="SUCCESS";
						else
							retVal="ERROR";
						counter++;
					}
				} 
				else 
				{
					System.out.println("For NPCI::::AXIS");
					XMLReader _objXMLReader = new XMLReader();
					
					_objXMLReader.cil_clrseqno=_objXMLReader.readCliSrNo();
					retVal= _objXMLReader.readBPXF(al_xml,al_img,cbs_conti_flg);
				
					counter++;
					System.out.println("******** flg is::: ***************"+ flg);
				}
			}//1
			else if (al_gf.size() == al_bf.size()
					&& al_gf.size() == al_br.size()
					&& CHI_Bank_Name.equals("HDFC")) {
				System.out.println("For HDFC::::" + al_gf.size() + "::"
						+ al_bf.size() + "::" + al_gf.size() + "::"
						+ al_br.size() + "====" + CHI_Bank_Name);
				XMLReader _objXMLReader = new XMLReader();
				//int clrsno=_objXMLReader.readCliSrNo();
				//System.out.println("********clrsno is::: ***************"+ clrsno);
				_objXMLReader.cil_clrseqno=_objXMLReader.readCliSrNo();
				System.out.println("\n\t al_pxf.size():"
						+ al_pxf.size());
				for (int i = 0; i < al_pxf.size(); i++) {
					System.out.println("For HDFC 22222:");
					String f_pxf = al_pxf.get(i);
					//flg 
					retVal= _objXMLReader.readPXF(f_pxf,i,cbs_conti_flg);
					/*if(flg)
						retVal="SUCCESS";
					else
						retVal="ERROR";*/
					counter++;
				}
			} 
///jay change for kotak
         else if(( CHI_Bank_Name.equals("KOTAK"))){
        	 XMLReader _objXMLReader = new XMLReader();
				//int clrsno=_objXMLReader.readCliSrNo();
				//System.out.println("********clrsno is::: ***************"+ clrsno);
				_objXMLReader.cil_clrseqno=_objXMLReader.readCliSrNo();
				System.out.println("\n\t al_pxf.size():"
						+ al_KotakFiles.size());
				for (int i = 0; i < al_KotakFiles.size(); i++)
				{
					System.out.println("For KOTAK 3333:");
					String f_pxf = al_KotakFiles.get(i);
					flg = _objXMLReader.readKotakFiles(f_pxf, i, con, cbs_conti_flg);
					if(flg)
						retVal="SUCCESS";
					else
					{
						retVal="ERROR";
						con.rollback();
						break;
					}
					counter++;
				}
        	 
            }
			
// end jayse change kotak			
			else {//1

				System.out.println("In else of  HDFC::::");
				retVal = "something went wrong while file copying..";
				System.out
						.println("\n\t something went wrong while file copying..");
			}//1

			if (retVal.equalsIgnoreCase("FAIL1")) {//1
				retVal = "Check Your Clering inward directory structure.";
			}//1
			else if (retVal.equalsIgnoreCase("FAIL2")) {//1
				retVal = "Problem To Create a Images.";
			}//1
			else if (retVal.equalsIgnoreCase("FAIL3")) {//1
				retVal = "Problem In Clearing Inward";
			}//1

			if (!(retVal.length() > 0)) {
				retVal="ERROR";
			}								
		}//@@@
		else {//@@@

			retVal = "FAIL_NO_FILE_TO_DOWNLOAD#";
		}//@@@			 		
	}//1		 
	catch (Exception e) {//2
		System.out.println("Exception in DownloadServlet");
		e.printStackTrace();
		retVal = "FAIL#";
	}//2		 
	finally {//2
	con.close();
	}//2		  
	System.out.println("*** Exit from DownloadServlet.jsp ::: retVal"
			+ retVal);
%>

<%=retVal%>