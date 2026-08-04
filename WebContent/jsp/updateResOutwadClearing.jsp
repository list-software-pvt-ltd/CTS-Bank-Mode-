<%@ page import="java.io.*,java.util.*, jakarta.servlet.*,java.sql.*"%>
<%@ page import="cts.*"%>

<%
	System.out
			.println("----- inside updateResOutardClearing.jsp ---------");
	StringBuffer strRetval = new StringBuffer("");
	Connection con = Configuration.getConnection();
	String path = "";
	String branchFolder = "";//(String) session.getAttribute("session_branch_code");
	branchFolder = (String) session.getAttribute("session_branch_code");
	int counter = 0;
	int fileCount = 0;
	//PreparedStatement psUpdate1=null;
	String notReturnOutwardCheques = "";
	path = Configuration.getConfValByNm("CFG_uploadpath_to_CHI",con)
			+ branchFolder + "/ClearingOutward/";
	//String param=request.getParameter("allResponseString");
	String param = request.getParameter("hiddenRec");

	System.out.println("param:>>>" + param);
	String sqlUpdate = "update clearingoutward set CLO_CONVERT_FLG='N',CLO_IMG_FRNT_BW=null,CLO_IMG_BACK_BW=null,CLO_IMG_FRNT_GR=null,CLO_IMG_BACK_GR=null where CLO_ITEMSEQNO=? and"; 
	sqlUpdate=sqlUpdate+" CLO_CHQNO=? and CLO_DATE_DDMMYYYY=?";// and instr(CLO_XMLFILENAME,substr(?,0,instr(?,'.')+3))>0";
	

	PreparedStatement stmt_update = con
			.prepareStatement("update RETURNFILES set ISSETTLED='D' where filename=?");
	PreparedStatement psUpdate = con.prepareStatement(sqlUpdate);

	int updateCount = 0;
	int nonUpdateCount = 0;
	try {//0
		if (param != null) {//1
			System.out.println("param:" + param);
			String[] allStr = param.split("!#!");
			System.out.println("allStr length:>>>>" + allStr.length);
			String singleStr = "";
			for (int i = 0; i < allStr.length - 1; i++)
			{//2
				System.out.println("loop:>>>" + i);
				System.out.println("singleStr::" + allStr[i]);
				singleStr = allStr[i];
				String[] singleRec = singleStr.split("#");
				String itemSeqNo = singleRec[3];
				String chqNo = singleRec[4];
				String fileName = singleRec[7];
				String ddmmyyyy = singleRec[8];
				String resonCode = singleRec[5];
				String FILESTATUSCODE = singleRec[2];
				System.out.println("-- itemSeqNo:" + itemSeqNo);
				System.out.println("-- chqNo:" + chqNo);
				System.out.println("-- fileName:" + fileName);
				System.out.println("-- ddmmyyyy:" + ddmmyyyy);
				System.out.println("-- resonCode:" + resonCode);
				System.out.println("-- FILESTATUSCODE:"
						+ FILESTATUSCODE);
				//psUpdate1 = con.prepareStatement(sqlUpdate);
				psUpdate.setString(1, itemSeqNo);
				psUpdate.setString(2, chqNo);
				psUpdate.setString(3, ddmmyyyy);
				//psUpdate.setString(4, fileName);
				//psUpdate.setString(5, fileName);
				
				int fileStatus = Integer.parseInt(FILESTATUSCODE);
				int rejectreason = Integer.parseInt(resonCode);
				System.out.println("fileStatus:>>>>>" + fileStatus);
				System.out.println("rejectreason:>>>>>" + rejectreason);

				if (psUpdate.executeUpdate() > 0) {
							System.out
									.println("Clearing Outward Record Is Updated");

							updateCount++;
							stmt_update.setString(1, fileName.trim());//FILENAME
							if (stmt_update.executeUpdate() > 0) {
								//Configuration.moveMicrFiles(path);
								System.out
										.println("\n\t Response Record Is Updated");
							} else {
								System.out
										.println("\n\t Response Record Not Updated");
							}
						} else {
							System.out.println("Record Is NOT Updated");
							notReturnOutwardCheques = "No Corresponding Record Found At Clearing Outward Table";
							//nonUpdateCount++
						}
			
				}

			
			}//2
			if (updateCount > 0) {
				strRetval.append("Record is UpdatedCO::");
			} else {
				strRetval.append("Record Not UpdatedCO::"
						+ notReturnOutwardCheques);
			}
		

		
	}//try
	catch (Exception e) {
		System.out
				.println("-----Exception in updateOutwardClearing.jsp::"
						+ e);
		strRetval.append("Fail#");
	} finally {
		try {
			if (con != null && psUpdate != null) {
				psUpdate.close();
				stmt_update.close();
				con.close();
			}
		} catch (Exception e) {
		}
	}
	System.out.println("----- Exit From updateOutardClearing.jsp:"
			+ strRetval);

	response.sendRedirect("../responseFile.jsp?msg=" + strRetval);
%>