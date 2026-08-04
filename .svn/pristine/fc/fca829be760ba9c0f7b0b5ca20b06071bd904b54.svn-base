<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@page import="cts.*"%>
<%@page import="java.util.Date.*"%>


<%!Connection con;
	PreparedStatement ps, ps1, ps2, ps3, ps4, ps5, ps6, ps7,ps8, ps9,ps_1,pp1,pp2,pp3,pp4,pp5;
	ResultSet rs, rs1, rs2, rs3, rs4, rs5, rs6, rs7,rs8, rs9,rs_1,rsp1,rsp2,rsp3,rsp4,rsp5
	;

	StringBuffer strBuff;
	int counter = 0;
	int counterval = 0;
	int val = 1;%>
<%
	strBuff = new StringBuffer("");

	System.out.println("In getDash data JSP........");
	//String loginId=request.getParameter("userID");
	try {//1
		String sql = "select  count(*) noofins,sum(CLI_AMOUNT/100)amountsum,to_char(to_date(CLI_DDMMYYYY,'DDMMYYYY'),'dd-mm-yyyy') from CLEARINGINWARD where CLI_DDMMYYYY=to_char(sysdate,'DDMMYYYY') group by CLI_DDMMYYYY";//USRPASS,
		String sql2 = "select count(*)nofsa,sum(RTO_AMOUNT/100)amountsum,to_char(to_date(RTO_DDMMYYYY,'DDMMYYYY'),'dd-mm-yyyy')dat from RETRUNOUTWARD where RTO_DDMMYYYY=to_char(sysdate,'DDMMYYYY') group by RTO_DDMMYYYY";
		String sql3 = "select count(*)nofsdsd,sum(RTO_AMOUNT/100)amountsum from RETRUNOUTWARD where RTO_DDMMYYYY=to_char(sysdate,'DDMMYYYY') and RTO_XMLFILENAME IS NOT NULL   group by RTO_DDMMYYYY";
		String sql4 = "select count(*)noofins,sum(RTO_AMOUNT/100)amountsum from RETRUNOUTWARD where RTO_DDMMYYYY=to_char(sysdate,'DDMMYYYY') and RTO_XMLFILENAME IS NOT NULL and RTO_FILESTATUS=0 group by RTO_DDMMYYYY";
		String sql5 = "select count(*) noofins, nvl(sum(RTO_AMOUNT/100),0) amountsum from RETRUNOUTWARD where RTO_XMLFILENAME in (select substr(OACK_FILENAME,0,instr(OACK_FILENAME,'XML')+2) from OACK where OACK_FILENAME like 'RRF_%' and OACK_DDMMYYYY=to_char(sysdate,'DDMMYYYY'))";
	
		String sql6 = "select count(*)noofins,sum(CLO_AMOUNT/100)amountsum ,to_char(to_date(CLO_DATE_DDMMYYYY,'DDMMYYYY'),'dd-mm-yyyy')dat from CLEARINGOUTWARD where to_date(CLO_DATE_DDMMYYYY,'DD/MM/YYYY')=(select max(to_date(CLO_DATE_DDMMYYYY,'DD/MM/YYYY')) from CLEARINGOUTWARD)  group by CLO_DATE_DDMMYYYY";

		String sql7 = "select count(*)noofins,sum(CLO_AMOUNT/100)amountsum  from CLEARINGOUTWARD where to_date(CLO_DATE_DDMMYYYY,'DD/MM/YYYY')=(select max(to_date(CLO_DATE_DDMMYYYY,'DD/MM/YYYY')) from CLEARINGOUTWARD) and CLO_XMLFILENAME IS NOT NULL group by CLO_DATE_DDMMYYYY";
		String sql8 = "select count(*)noofins,sum(CLO_AMOUNT/100)amountsum  from CLEARINGOUTWARD where to_date(CLO_DATE_DDMMYYYY,'DD/MM/YYYY')=(select max(to_date(CLO_DATE_DDMMYYYY,'DD/MM/YYYY')) from CLEARINGOUTWARD) and CLO_XMLFILENAME IS NOT NULL and CLO_FILESTATUS=0 group by CLO_DATE_DDMMYYYY";
		//String sql9 = "select count(*)noofins,sum(CLO_AMOUNT/100)amountsum  from CLEARINGOUTWARD join OACK on CLO_DATE_DDMMYYYY=OACK_DDMMYYYY where to_date(CLO_DATE_DDMMYYYY,'DD/MM/YYYY')=(select max(to_date(CLO_DATE_DDMMYYYY,'DD/MM/YYYY')) from CLEARINGOUTWARD) and OACK_FILENAME LIKE CLO_XMLFILENAME group by CLO_DATE_DDMMYYYY";

		String sql10 = "select count(*)noofins,sum(RTI_AMOUNT/100)amountsum,to_char(to_date(RTI_DDMMYYYY,'DDMMYYYY'),'dd-mm-yyyy')dat from RETURNINWARD where RTI_DDMMYYYY=to_char(sysdate,'DDMMYYYY') group by RTI_DDMMYYYY";

		String sql11= "select count(*) noofins,nvl(sum(CLO_AMOUNT/100),0) amountsum from CLEARINGOUTWARD where CLO_XMLFILENAME in (select substr(OACK_FILENAME,0,instr(OACK_FILENAME,'XML')+2) from OACK where OACK_FILENAME like 'CXF_%' and OACK_DDMMYYYY=to_char(sysdate,'DDMMYYYY'))";
		
		String sql12="select count(*) from  PPSINTIMATIONTRNR where PIL_SENTTONPCI='N' and  PIL_FILE_ID is null";
		
		String sql13="select count(*) from  PPSINTIMATIONTRNR where PIL_SENTTONPCI='Y' and  PIL_FILE_ID is not  null and PIL_FILE_STATUS is null and PIL_REC_STATUS is null and  PIL_FILECREATIONDT is not null";
		String sql14="select count(*) from  PPSINTIMATIONTRNR where PIL_SENTTONPCI='Y' and  PIL_FILE_ID is not  null and PIL_FILE_STATUS = 0 and PIL_REC_STATUS=0  and  to_date(PIL_FILECREATIONDT,'DD/MM/YYYY') = to_date(sysdate,'DD/MM/YYYY') ";
		String sql15="select count(*) from  PPSINTIMATIONTRNR where PIL_SENTTONPCI='Y' and  PIL_FILE_ID is not  null and PIL_FILE_STATUS <> 0 and  PIL_REC_STATUS<> 0 and  to_date(PIL_FILECREATIONDT,'DD/MM/YYYY') = to_date(sysdate,'DD/MM/YYYY') ";
		String sql16="select count(*) from CLEARINGINWARD  where CLI_DDMMYYYY=to_char(sysdate,'ddmmyyyy')  and   CLI_CPPSFLAG <> 'N' and CLI_CPPSFLAG is not null";
		con = Configuration.getConnection();

		if (con != null) {//2
			ps = con.prepareStatement(sql);
			//ps.setString(1,loginId);
			rs = ps.executeQuery();
			counter = 0;
			while (rs.next()) {
				strBuff.append(rs.getString(1) + "#" + rs.getString(2) + "#" + rs.getString(3) + "#");//+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6));//+rs.getString(2)+"#"	

				counter++;
			}
			System.out.println("\n\t counter2:>>" + counter);
			if (counter == 0) {
				strBuff.append("-#-#-#");
			}
			rs.close();
			ps.close();

			ps1 = con.prepareStatement(sql2);
			//ps.setString(1,loginId);
			rs1 = ps1.executeQuery();
			counter = 0;
			while (rs1.next()) {
				strBuff.append(rs1.getString(1) + "#" + rs1.getString(2) + "#" + rs1.getString(3) + "#");//+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6));//+rs.getString(2)+"#"	

				counter++;
			}
			System.out.println("\n\t counter2:>>" + counter);
			if (counter == 0) {
				strBuff.append("-#-#-#");
			}

			rs1.close();
			ps1.close();

			ps2 = con.prepareStatement(sql3);
			//ps.setString(1,loginId);
			rs2 = ps2.executeQuery();
			counter = 0;
			while (rs2.next()) {
				strBuff.append(rs2.getString(1) + "#" + rs2.getString(2) + "#");//+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6));//+rs.getString(2)+"#"	

				counter++;
			}
			System.out.println("\n\t counter2:>>" + counter);
			if (counter == 0) {
				strBuff.append("-#-#");
			}

			rs2.close();
			ps2.close();

			ps3 = con.prepareStatement(sql4);
			//ps.setString(1,loginId);
			rs3 = ps3.executeQuery();
			counter = 0;
			while (rs3.next()) {
				strBuff.append(rs3.getString(1) + "#" + rs3.getString(2) + "#");//+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6));//+rs.getString(2)+"#"	

				counter++;
			}
			System.out.println("\n\t counter2:>>" + counter);
			if (counter == 0) {
				strBuff.append("-#-#");
			}

			rs3.close();
			ps3.close();

			ps4 = con.prepareStatement(sql5);
			//ps.setString(1,loginId);
			rs4 = ps4.executeQuery();
			counter = 0;
			while (rs4.next()) {
				strBuff.append(rs4.getString(1) + "#" + rs4.getString(2) + "#");//+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6));//+rs.getString(2)+"#"	

				counter++;
			}
			System.out.println("\n\t counter2:>>" + counter);
			if (counter == 0) {
				strBuff.append("-#-#");
			}
			rs4.close();
			ps4.close();

			

			ps5 = con.prepareStatement(sql6);
			//ps.setString(1,loginId);
			rs5 = ps5.executeQuery();
			counter = 0;
			while (rs5.next()) {
				strBuff.append(rs5.getString(1) + "#" + rs5.getString(2) + "#" + rs5.getString(3) + "#");//+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6));//+rs.getString(2)+"#"	

				counter++;

			}
			System.out.println("\n\t counter2:>>" + counter);

			if (counter == 0) {

				strBuff.append("-#-#-#");
			}

			rs5.close();
			ps5.close();

			ps6 = con.prepareStatement(sql7);
			//ps.setString(1,loginId);
			rs6 = ps6.executeQuery();
			counter = 0;
			while (rs6.next()) {
				strBuff.append(rs6.getString(1) + "#" + rs6.getString(2) + "#");//+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6));//+rs.getString(2)+"#"	

				counter++;

			}
			System.out.println("\n\t counter2:>>" + counter);

			if (counter == 0) {

				strBuff.append("-#-#");
			}

			rs6.close();
			ps6.close();

			ps7 = con.prepareStatement(sql8);
			//ps.setString(1,loginId);
			rs7 = ps7.executeQuery();
			counter = 0;
			while (rs7.next()) {
				strBuff.append(rs7.getString(1) + "#" + rs7.getString(2) + "#");//+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6));//+rs.getString(2)+"#"	

				counter++;

			}
			System.out.println("\n\t counter2:>>" + counter);

			if (counter == 0) {

				strBuff.append("-#-#");
			}

			rs7.close();
			ps7.close();

			/* ps8 = con.prepareStatement(sql9);
			//ps.setString(1,loginId);
			rs8 = ps8.executeQuery();
			counter = 0;
			while (rs8.next()) {
				strBuff.append(rs8.getString(1) + "#" + rs8.getString(2) + "#");//+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6));//+rs.getString(2)+"#"	

				counter++;

			}
			System.out.println("\n\t counter2:>>" + counter);

			if (counter == 0) {

				strBuff.append("-#-#");
			}

			rs8.close();
			ps8.close(); */
			
			
			ps9 = con.prepareStatement(sql10);
			rs9 = ps9.executeQuery();
			counter = 0;
			while (rs9.next()) {
				strBuff.append(rs9.getString(1) + "#" + rs9.getString(2) + "#" + rs9.getString(3) + "#");//+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6));//+rs.getString(2)+"#"	

				counter++;
			}
			System.out.println("\n\t counter2:>>" + counter);
			if (counter == 0) {
				strBuff.append("-#-#-#");
			}
			rs9.close();
			ps9.close();
			
			//*******************/
			ps_1 = con.prepareStatement(sql11);
			rs_1 = ps_1.executeQuery();
			counter = 0;
			while (rs_1.next()) {
				strBuff.append(rs_1.getString(1) + "#" + rs_1.getString(2)  + "#");//+"#"+rs.getString(4)+"#"+rs.getString(5)+"#"+rs.getString(6));//+rs.getString(2)+"#"	

				counter++;
			}
			System.out.println("\n\t counter2:>>" + counter);
			if (counter == 0) {
				strBuff.append("-#-#-#");
			}
			rs_1.close();
			ps_1.close();
			//****************** PPS */
			
			pp1 = con.prepareStatement(sql12);
			rsp1 = pp1.executeQuery();
			counter = 0;
			while (rsp1.next()) {
				strBuff.append(rsp1.getString(1)+"#");
				counter++;
			}
			System.out.println("\n\t counter:>>" + counter);
			if (counter == 0) {
				strBuff.append("-#");
			}
			rsp1.close();
			pp1.close();
			
			//*******************/
			pp2 = con.prepareStatement(sql13);
			rsp2 = pp2.executeQuery();
			counter = 0;
			while (rsp2.next()) {
				strBuff.append(rsp2.getString(1)+"#");
				counter++;
			}
			 System.out.println("\n\t counter:>>" + counter);
			if (counter == 0) {
				strBuff.append("-#");
			} 
			rsp2.close();
			pp2.close();
			
			//*******************/
			
			pp3 = con.prepareStatement(sql14);
			rsp3 = pp3.executeQuery();
			counter = 0;
			while (rsp3.next()) {
				strBuff.append(rsp3.getString(1)+"#");
				counter++;
			}
			 System.out.println("\n\t counter:>>" + counter);
			if (counter == 0) {
				strBuff.append("-#");
			} 
			rsp3.close();
			pp3.close();

			//*******************/
			pp4 = con.prepareStatement(sql15);
			rsp4 = pp4.executeQuery();
			counter = 0;
			while (rsp4.next()) {
				strBuff.append(rsp4.getString(1)+"#");
				counter++;
			}
			 System.out.println("\n\t counter:>>" + counter);
			if (counter == 0) {
				strBuff.append("-#");
			} 
			rsp4.close();
			pp4.close();
			
			//*******************/
			pp5 = con.prepareStatement(sql16);
			rsp5 = pp5.executeQuery();
			counter = 0;
			while (rsp5.next()) {
				strBuff.append(rsp5.getString(1)+"#");
				counter++;
			}
			 System.out.println("\n\t counter:>>" + counter);
			if (counter == 0) {
				strBuff.append("-#");
			} 
			rsp5.close();
			pp5.close();
		} //2

	} //1
	catch (SQLException e) {
		System.out.println("\n\t SQLException in getDash.jsp:>>" + e);
		strBuff.append("No Data Found#");
	} catch (Exception e) {
		System.out.println("\n\t Exception in getDash.jsp:>>" + e);
		strBuff.append("No Data Found#");
	} finally {
		try {
			if (con != null) {

				con.close();
			}
		} catch (Exception e) {
		}
	}
	System.out.println("\n\t exit from getDash.jsp:" + strBuff.toString());
%>
<%=strBuff.toString()%>