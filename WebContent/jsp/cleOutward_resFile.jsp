<%@ page
	import="java.io.*,java.util.*, jakarta.servlet.*,java.sql.*,org.json.*,javax.xml.*"%>
<%@ page import="cts.*"%>
<%@ page import="javax.xml.namespace.QName"%>
<%@ page import="javax.xml.stream.XMLEventReader"%>
<%@ page import="javax.xml.stream.XMLInputFactory"%>
<%@ page import=" javax.xml.stream.events.Attribute"%>
<%@ page import=" javax.xml.stream.events.EndElement"%>
<%@ page import=" javax.xml.stream.events.StartElement"%>
<%@ page import="javax.xml.stream.events.XMLEvent"%>

<%
	JSONObject MainjObj = new JSONObject();
	try {
		Connection con = Configuration.getConnection();
		XMLInputFactory xmlInputFactory = null;
		XMLEventReader xmlEventReader = null;
		String fileStatus = "";

		
		JSONArray jsonAr = new JSONArray();
		String path = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", con) + "ResponseFiles/";
		System.out.println(path);
		String fileName = request.getParameter("val");
		JSONArray jsonarr = new JSONArray(fileName);
		StringBuffer strRetval = new StringBuffer("");
		String upQuery = "update CLEARINGOUTWARD set CLO_FILESTATUS=?, CLO_REJECTREASON=? where CLO_XMLFILENAME=? ";
		String uprejQuery = "update CLEARINGOUTWARD set CLO_FILESTATUS=?, CLO_REJECTREASON=? where CLO_XMLFILENAME=? and CLO_ITEMSEQNO=? and CLO_CHQNO=? ";
		String selQuery = "select * from CLEARINGOUTWARD c  join RESFILECODES on  c.CLO_FILESTATUS=FILESTATUS and c.CLO_REJECTREASON=REJREASON join BRANCHMSTR on c.CLO_BRANCH_CD=BRM_BRNCD where CLO_FILESTATUS=? and CLO_XMLFILENAME=? and CLO_ITEMSEQNO=?";
		int counter = 0;
		int fileCount = 0;
		int result = 0;
		int s = 0;
		String exumptedItemSeqNos = "";
		String itemSeqNo = "", rejectReason = "", CheqNo = "";
		System.out.println(jsonarr.length());
		for (int i = 0; i < jsonarr.length(); i++) {
			s = 0;
			fileCount++;
			JSONObject jsonObj1 = jsonarr.getJSONObject(i);
			String fileNames = jsonObj1.getString("FILE_NAME");
			System.out.println("fileName:==" + fileNames);
			xmlInputFactory = XMLInputFactory.newInstance();
			System.out.println("path==" + path + fileNames);
			xmlEventReader = xmlInputFactory.createXMLEventReader(new FileInputStream(path + fileNames));
			while (xmlEventReader.hasNext()) {
				//System.out.println("In whilein");
				XMLEvent event = xmlEventReader.nextEvent();
				if (event.isStartElement()) {
					//System.out.println("In if=");
					StartElement element = (StartElement) event;
					String elementName = element.getName().toString();
					String elementString = elementName.substring(elementName.lastIndexOf("}") + 1,
							elementName.length());
					//System.out.println("element="+element+"elementName="+elementName+"elementString=="+elementString);
					if (elementString.equalsIgnoreCase("FileHeader")) {
						System.out.println("In if==");

						Iterator iterator = element.getAttributes();
						while (iterator.hasNext()) {
							System.out.println("In while==");
							Attribute attribute = (Attribute) iterator.next();
							QName name = attribute.getName();
							String attributeValue = attribute.getValue();
							String attributeName = name.toString();
							System.out.println("attribute==" + attribute + "name==" + name + "attributeValue=="
									+ attributeValue + "attributeName==" + attributeName);
							if (attributeName.equalsIgnoreCase("FileStatus")) {
								fileStatus = attributeValue;
								System.out.println("fileStatus==" + fileStatus + "=="
										+ fileNames.substring(0, fileNames.indexOf('.')) + ".XML");
								if (Integer.parseInt(fileStatus) <= 6) {
									int cnt = 0;
									/*PreparedStatement pst=con.prepareStatement(upQuery);
									pst.setString(1,fileStatus );
									pst.setString(2,fileStatus );
									pst.setString(3,fileNames.substring(0,fileNames.indexOf('.'))+".XML" );
									s=pst.executeUpdate();
									System.out.println("s==="+s);
									pst.close();
									if(s >0)*/
									{
										JSONObject jsonObj = new JSONObject();
										counter++;
										jsonObj.put("SRNO", counter);
										jsonObj.put("FILENAME",
												fileNames.substring(0, fileNames.indexOf('.')) + ".XML");
										jsonObj.put("FILSTATUS", fileStatus);
										jsonObj.put("FILEREJECTCODE", fileStatus);
										if (fileStatus.equalsIgnoreCase("0")) {
											
											jsonObj.put("FILEREJECTREASON", "Accepted");
											

										} else {
											/*counter++;
											jsonObj.put("SRNO", counter);
											jsonObj.put("FILENAME",
													fileNames.substring(0, fileNames.indexOf('.')) + ".XML");
											jsonObj.put("FILSTATUS", fileStatus);
											jsonObj.put("FILEREJECTCODE", fileStatus);*/
											jsonObj.put("FILEREJECTREASON", "Rejected");
											/*jsonObj.put("CHQNO", "-");
											jsonObj.put("SORTCD", "-");
											jsonObj.put("TRANCD", "-");
											jsonObj.put("AMOUNT", "-");
											jsonObj.put("PAYEE_ACCNO", "-");
											jsonObj.put("PAYEE_ACCNM", "-");
											jsonObj.put("BRANCH_CD", "-");
											jsonObj.put("ITEMSEQNO", "-");
											jsonObj.put("BRNCD", "-");
											jsonAr.put(jsonObj);*/
										}
										jsonObj.put("CHQNO", "-");
										jsonObj.put("SORTCD", "-");
										jsonObj.put("TRANCD", "-");
										jsonObj.put("AMOUNT", "-");
										jsonObj.put("PAYEE_ACCNO", "-");
										jsonObj.put("PAYEE_ACCNM", "-");
										jsonObj.put("BRANCH_CD", "-");
										jsonObj.put("ITEMSEQNO", "-");
										jsonObj.put("BRNCD", "-");
										jsonAr.put(jsonObj);
									}
								}
							}

						}
					} else if (elementString.equalsIgnoreCase("Item")) {
						counter++;
						PreparedStatement ps_updateItem = null;
						Iterator iterator = element.getAttributes();
						while (iterator.hasNext()) {
							Attribute attribute = (Attribute) iterator.next();
							QName name = attribute.getName();
							String attributeValue = attribute.getValue();
							String attributeName = name.toString();
							ps_updateItem = con.prepareStatement(uprejQuery);
							ps_updateItem.setString(1, fileStatus);
							ps_updateItem.setString(3, fileNames.substring(0, fileNames.indexOf('.')) + ".XML");
							if (attributeName.equalsIgnoreCase("ItemSeqNo")) {
								System.out.println(attributeValue);

								itemSeqNo = attributeValue;
							} else if (attributeName.equalsIgnoreCase("SerialNo")) {
								System.out.println(attributeValue);
								CheqNo = attributeValue;

							} else if (attributeName.equalsIgnoreCase("RejectReason")) {
								System.out.println(attributeValue);
								rejectReason = attributeValue;

							}
						}
						ps_updateItem.setString(2, rejectReason);
						ps_updateItem.setString(4, itemSeqNo);
						ps_updateItem.setString(5, CheqNo);
						result = ps_updateItem.executeUpdate();
						System.out.println("result==" + result);

						if (result > 0) {

							PreparedStatement sel_pst = con.prepareStatement(selQuery);
							sel_pst.setString(1, fileStatus);
							sel_pst.setString(2, fileNames.substring(0, fileNames.indexOf('.')) + ".XML");
							sel_pst.setString(3, itemSeqNo);
							ResultSet rs = sel_pst.executeQuery();
							if (rs.next()) {
								JSONObject selObj = new JSONObject();
								selObj.put("SRNO", counter);
								selObj.put("IMGFRNTGR", rs.getString("CLO_IMG_FRNT_GR").trim());
								selObj.put("CHQNO", rs.getString("CLO_CHQNO").trim());
								selObj.put("SORTCD", rs.getString("CLO_SORTCD").trim());
								selObj.put("TRANCD", rs.getString("CLO_TRANCD").trim());
								selObj.put("AMOUNT", rs.getString("CLO_AMOUNT").trim());
								selObj.put("PAYEE_ACCNO", rs.getString("CLO_PAYEE_ACCNO").trim());
								selObj.put("PAYEE_ACCNM", rs.getString("CLO_PAYEE_ACCNM").trim());
								selObj.put("BRANCH_CD", rs.getString("BRM_BRNNM").trim());
								selObj.put("FILENAME", rs.getString("CLO_XMLFILENAME").trim());
								selObj.put("FILSTATUS", rs.getString("CLO_FILESTATUS").trim());
								selObj.put("FILEREJECTCODE", rs.getString("CLO_REJECTREASON").trim());
								selObj.put("FILEREJECTREASON", rs.getString("DESCRIPTION").trim());
								selObj.put("ITEMSEQNO", itemSeqNo.trim());
								selObj.put("BRNCD", rs.getString("CLO_BRANCH_CD").trim());
								jsonAr.put(selObj);
								if (exumptedItemSeqNos.length() == 0)
									exumptedItemSeqNos = "'" + fileNames.substring(0, fileNames.indexOf('.'))
											+ ".XML" + "~~~" + itemSeqNo.trim() + "'";
								else
									exumptedItemSeqNos = exumptedItemSeqNos + ",'"
											+ fileNames.substring(0, fileNames.indexOf('.')) + ".XML" + "~~~"
											+ itemSeqNo.trim() + "'";
								//CLO_CHQNO, CLO_SORTCD, CLO_TRANCD, CLO_AMOUNT, CLO_PAYEE_ACCNO, 
								//	CLO_PAYEE_ACCNM, CLO_BRANCH_CD, CLO_XMLFILENAME, CLO_FILESTATUS, CLO_REJECTREASON

							}

						}

					}

				}
			}
			String upQuerynotin= "update CLEARINGOUTWARD set CLO_FILESTATUS='0', CLO_REJECTREASON='0' where CLO_XMLFILENAME||'~~~'||CLO_ITEMSEQNO not in(?) ";
			PreparedStatement pstnotin=con.prepareStatement(upQuerynotin);
			pstnotin.setString(1,exumptedItemSeqNos);
			s=pstnotin.executeUpdate();
			System.out.println("s not in ==="+s);
			pstnotin.close();
			
			for (int ii = 0; ii < jsonAr.length(); ii++) {

				System.out.println("in update jayesh:");
				JSONObject jsonObjew = jsonAr.getJSONObject(ii);
				String CHQNO = jsonObjew.getString("CHQNO");
				String filestatusnew = jsonObjew.getString("FILSTATUS");
				String filenamesnew = jsonObjew.getString("FILENAME");
				String rejectReasonnew = jsonObjew.getString("FILEREJECTCODE");
				String itemSeqNonew = jsonObjew.getString("ITEMSEQNO");
				if (CHQNO.equalsIgnoreCase("-")) {
					System.out.println("in update jayesh:CHQNO.equalsIgnoreCase(-)");
					try {
						//update CLEARINGOUTWARD set CLO_FILESTATUS=?, CLO_REJECTREASON=? where CLO_XMLFILENAME=? 
						PreparedStatement pstnew = con.prepareStatement(upQuery);
						pstnew.setString(1, filestatusnew);
						pstnew.setString(2, filestatusnew);
						pstnew.setString(3, filenamesnew);//filenamesnew.substring(0,fileNames.indexOf('.'))+".XML" );
						s = pstnew.executeUpdate();
						System.out.println("s===" + s);
						pstnew.close();
					} catch (SQLException e) {
						System.out.println("SQLException in readResponseFile 456454:" + e);
						e.printStackTrace();
					}
				} else {
					System.out.println("in update jayesh:else case");

					try {

						PreparedStatement ps_updateItemnew = null;
						ps_updateItemnew = con.prepareStatement(uprejQuery);
						ps_updateItemnew.setString(1, filestatusnew);
						ps_updateItemnew.setString(3, filenamesnew);//filenamesnew.substring(0,fileNames.indexOf('.'))+".XML");
						ps_updateItemnew.setString(2, rejectReasonnew);
						ps_updateItemnew.setString(4, itemSeqNonew);
						ps_updateItemnew.setString(5, CHQNO);
						result = ps_updateItemnew.executeUpdate();
						System.out.println("result==" + result);
						ps_updateItemnew.close();

					} catch (SQLException e1) {
						System.out.println("SQLException in readResponseFile 54545454:" + e1);
						e1.printStackTrace();
					}
				}

			}

		}
		if (fileCount > 0) {
			MainjObj.put("DATA", jsonAr);
			MainjObj.put("RETCODE", "0");
		} else {
			MainjObj.put("RETCODE", "1");
		}
		con.close();

	} catch (SQLException e) {
		System.out.println("SQLException in readResponseFile 1111:" + e);
		e.printStackTrace();
	}
%>
<%=MainjObj.toString()%>
<%-- <%=%> --%>