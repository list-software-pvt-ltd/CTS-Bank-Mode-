<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<%@page import="java.util.*"%>
<%@page import="java.io.File"%>
<%@page import="org.apache.commons.io.FileUtils"%>
<%@page contentType="application/json; charset=UTF-8"%>
<%
/**
 * jsp/deleteTodayInwardFilewise.jsp  –  Backend endpoint
 *
 * whattodo=F  → Fetch today's CLEARINGINWARD rows
 * whattodo=D  → Archive to CLEARINGINWARD_DELETEFILEWEISE
 *               Delete from CLEARINGINWARD_HISTORY + CLEARINGINWARD
 *               Clean entire ClearingInward folder (FileUtils.cleanDirectory)
 */

String whattodo  = request.getParameter("whattodo");
String todayDate = request.getParameter("todayDate");   // "DDMMYYYY"
String loginby   = request.getParameter("loginby");
String clrSrNos  = request.getParameter("clrSrNos");   // comma-separated CLI_CLRSRNO

System.out.println("deleteTodayInwardFilewise >> whattodo=" + whattodo
    + " todayDate=" + todayDate + " clrSrNos=" + clrSrNos + " loginby=" + loginby);

Connection cn = null;
StringBuilder json = new StringBuilder();

try {
    cn = Configuration.getConnection();
    cn.setAutoCommit(false);

    /* ════════════════════════════════════════════════════════════════════
       FETCH  (whattodo = F)
       ════════════════════════════════════════════════════════════════════ */
    if ("F".equalsIgnoreCase(whattodo)) {

        if (todayDate == null || todayDate.trim().length() == 0) {
            json.append("{\"RESPCODE\":1,\"RETVAL\":\"FAIL|todayDate param missing\"}");
        } else {

            // ── Fix 1: use CLI_CONTI_CYCNO (not CLI_CYCLENO) for Cycle No display ──
            String sql =
                "SELECT CLI_CLRSRNO, " +
                "       CLI_SERIALNO, " +
                "       TO_CHAR(ROUND(TO_NUMBER(CLI_AMOUNT)/100, 2),'FM99999999990.00') AS CLI_AMOUNT, " +
                "       CLI_XMLFILENAME, " +
                "       TO_CHAR(CLI_ENTRYDATE,'YYYY-MM-DD HH24:MI') AS CLI_ENTRYDATE, " +
                "       CLI_CONTI_CYCNO, " +
                "       CLI_CLEARINGTYPE " +
                "FROM   CLEARINGINWARD " +
                "WHERE  CLI_DDMMYYYY = ? " +
                "ORDER  BY CLI_ENTRYDATE ASC, CLI_SERIALNO ASC";

            System.out.println("deleteTodayInwardFilewise >> FETCH param: [" + todayDate + "]");

            PreparedStatement ps = cn.prepareStatement(sql);
            ps.setString(1, todayDate.trim());
            ResultSet rs = ps.executeQuery();

            boolean hasRows = false;
            StringBuilder dataArr = new StringBuilder();

            while (rs.next()) {
                hasRows = true;
                if (dataArr.length() > 0) dataArr.append(',');
                dataArr.append('{');
                dataArr.append("\"CLI_CLRSRNO\":"     ).append(jsonStr(rs.getString("CLI_CLRSRNO"))).append(',');
                dataArr.append("\"CLI_SERIALNO\":"    ).append(jsonStr(rs.getString("CLI_SERIALNO"))).append(',');
                dataArr.append("\"CLI_AMOUNT\":"      ).append(jsonStr(rs.getString("CLI_AMOUNT"))).append(',');
                dataArr.append("\"CLI_XMLFILENAME\":").append(jsonStr(rs.getString("CLI_XMLFILENAME"))).append(',');
                dataArr.append("\"CLI_ENTRYDATE\":"   ).append(jsonStr(rs.getString("CLI_ENTRYDATE"))).append(',');
                // CLI_CONTI_CYCNO is NUMBER — use getString to keep JSON simple
                dataArr.append("\"CLI_CONTI_CYCNO\":").append(jsonStr(rs.getString("CLI_CONTI_CYCNO"))).append(',');
                dataArr.append("\"CLI_CLEARINGTYPE\":").append(jsonStr(rs.getString("CLI_CLEARINGTYPE")));
                dataArr.append('}');
            }
            rs.close();
            ps.close();

            if (!hasRows) {
                System.out.println("deleteTodayInwardFilewise >> No rows found for date: " + todayDate);
                json.append("{\"RESPCODE\":1,\"RETVAL\":\"NO_DATA\"}");
            } else {
                System.out.println("deleteTodayInwardFilewise >> Rows fetched OK");
                json.append("{\"RESPCODE\":0,\"DATA\":[").append(dataArr).append("]}");
            }
        }

    /* ════════════════════════════════════════════════════════════════════
       DELETE  (whattodo = D)
       ════════════════════════════════════════════════════════════════════ */
    } else if ("D".equalsIgnoreCase(whattodo)) {

        if (clrSrNos == null || clrSrNos.trim().isEmpty()) {
            json.append("{\"RESPCODE\":1,\"RETVAL\":\"FAIL|No records selected\"}");

        } else if (todayDate == null || todayDate.trim().length() == 0) {
            json.append("{\"RESPCODE\":1,\"RETVAL\":\"FAIL|todayDate param missing\"}");

        } else {

            String[] tokens = clrSrNos.split(",");
            List<String> safeList = new ArrayList<String>();
            for (String t : tokens) {
                String s = t.trim();
                if (s.length() > 0 && s.length() <= 15 && s.matches("[A-Za-z0-9/._-]+")) {
                    safeList.add(s);
                }
            }

            if (safeList.isEmpty()) {
                json.append("{\"RESPCODE\":1,\"RETVAL\":\"FAIL|Invalid CLI_CLRSRNO values after whitelist\"}");

            } else {

                // ── Resolve ClearingInward folder path ──────────────────────
                // CFG_DOWNLOADPATH_FROM_CHI already ends with a slash in config
                // e.g. D:/Apache10/webapps/CTS/downloadpath_from_CHI/
                // ClearingInward folder = basePath + ClearingInward
                String basePath = Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI", cn);
                if (basePath == null) basePath = "";
                basePath = basePath.trim();
                if (basePath.length() > 0
                        && !basePath.endsWith("/")
                        && !basePath.endsWith("\\")) {
                    basePath = basePath + File.separator;
                }
                // ── Fix 3: target the whole ClearingInward folder for cleanup ──
                String clearingInwardFolder = basePath + "ClearingInward";
                System.out.println("deleteTodayInwardFilewise >> ClearingInward folder=[" + clearingInwardFolder + "]");

                // Build IN clause
                StringBuilder inClause = new StringBuilder();
                for (int i = 0; i < safeList.size(); i++) {
                    if (i > 0) inClause.append(',');
                    inClause.append('?');
                }
                int idx;

                /* ── Step 1: Archive to CLEARINGINWARD_DELETEFILEWEISE ── */
                String sqlInsertDel =
                    "INSERT INTO CLEARINGINWARD_DELETEFILEWEISE " +
                    "( CLI_TRUNCATINGRTNO, CLI_PAYORBANKROUTNO, CLI_CREATIONDATE, " +
                    "  CLI_AMOUNT, CLI_SERIALNO, CLI_RBISEQNO, CLI_TRANSCODE, " +
                    "  CLI_ACCOUNTNO, CLI_PAYEENAME, CLI_INSTRUDATE, " +
                    "  CLI_IMAGEFILE1, CLI_IMAGEFILE2, CLI_IMAGEFILE3, " +
                    "  CLI_FULLLINE, CLI_ITEMSEQUENCENO, CLI_CLEARINGTYPE, " +
                    "  CLI_PRESENTMENTDATE, CLI_CYCLENO, CLI_PRESENTINGBANKROUTNO, " +
                    "  CLI_BOFDROUTNO, CLI_BOFDBUSDATE, CLI_DEPOSITORACCT, " +
                    "  CLI_IFSC, CLI_MEMBERBNKSORTCODE, CLI_ISRETURNOUTWARDCHEQUE, " +
                    "  CLI_DDMMYYYY, CLI_UNIQUENO, CLI_XMLFILENAME, CLI_INSTRUMENT_ID, " +
                    "  CLI_DOCTYPE, CLI_CLRSRNO, CLI_CPPSFLAG, CLI_CONTI_CYCNO, " +
                    "  CLI_CHEQ_NO, CLI_ITEM_EXPIRY_TIME, CLI_ENTRYDATE, CLI_CYCL_FILENO, " +
                    "  DEL_LOGINBY, DEL_DATETIME ) " +
                    "SELECT " +
                    "  CLI_TRUNCATINGRTNO, CLI_PAYORBANKROUTNO, CLI_CREATIONDATE, " +
                    "  CLI_AMOUNT, CLI_SERIALNO, CLI_RBISEQNO, CLI_TRANSCODE, " +
                    "  CLI_ACCOUNTNO, CLI_PAYEENAME, CLI_INSTRUDATE, " +
                    "  CLI_IMAGEFILE1, CLI_IMAGEFILE2, CLI_IMAGEFILE3, " +
                    "  CLI_FULLLINE, CLI_ITEMSEQUENCENO, CLI_CLEARINGTYPE, " +
                    "  CLI_PRESENTMENTDATE, CLI_CYCLENO, CLI_PRESENTINGBANKROUTNO, " +
                    "  CLI_BOFDROUTNO, CLI_BOFDBUSDATE, CLI_DEPOSITORACCT, " +
                    "  CLI_IFSC, CLI_MEMBERBNKSORTCODE, CLI_ISRETURNOUTWARDCHEQUE, " +
                    "  CLI_DDMMYYYY, CLI_UNIQUENO, CLI_XMLFILENAME, CLI_INSTRUMENT_ID, " +
                    "  CLI_DOCTYPE, CLI_CLRSRNO, CLI_CPPSFLAG, CLI_CONTI_CYCNO, " +
                    "  CLI_CHEQ_NO, CLI_ITEM_EXPIRY_TIME, CLI_ENTRYDATE, CLI_CYCL_FILENO, " +
                    "  ?, SYSDATE " +
                    "FROM CLEARINGINWARD " +
                    "WHERE CLI_CLRSRNO IN (" + inClause + ") " +
                    "  AND CLI_DDMMYYYY = ?";

                PreparedStatement psInsertDel = cn.prepareStatement(sqlInsertDel);
                idx = 1;
                psInsertDel.setString(idx++, loginby != null ? loginby : "SYSTEM");
                for (String s : safeList) psInsertDel.setString(idx++, s);
                psInsertDel.setString(idx++, todayDate.trim());
                psInsertDel.executeUpdate();
                psInsertDel.close();
                System.out.println("deleteTodayInwardFilewise >> Archived to CLEARINGINWARD_DELETEFILEWEISE");

                /* ── Step 2: Delete from CLEARINGINWARD_HISTORY ── */
                String sqlDelHist =
                    "DELETE FROM CLEARINGINWARD_HISTORY " +
                    "WHERE CLI_CLRSRNO IN (" + inClause + ") " +
                    "  AND CLI_DDMMYYYY = ?";

                PreparedStatement psDelHist = cn.prepareStatement(sqlDelHist);
                idx = 1;
                for (String s : safeList) psDelHist.setString(idx++, s);
                psDelHist.setString(idx++, todayDate.trim());
                int deletedHist = psDelHist.executeUpdate();
                psDelHist.close();
                System.out.println("deleteTodayInwardFilewise >> Deleted CLEARINGINWARD_HISTORY: " + deletedHist + " rows");

                /* ── Step 3: Delete from CLEARINGINWARD ── */
                String sqlDelete =
                    "DELETE FROM CLEARINGINWARD " +
                    "WHERE CLI_CLRSRNO IN (" + inClause + ") " +
                    "  AND CLI_DDMMYYYY = ?";

                PreparedStatement psDelete = cn.prepareStatement(sqlDelete);
                idx = 1;
                for (String s : safeList) psDelete.setString(idx++, s);
                psDelete.setString(idx++, todayDate.trim());
                int deleted = psDelete.executeUpdate();
                psDelete.close();
                System.out.println("deleteTodayInwardFilewise >> Deleted CLEARINGINWARD: " + deleted + " rows");

                /* ── Step 4: COMMIT all DB changes ── */
                cn.commit();
                System.out.println("deleteTodayInwardFilewise >> DB COMMIT OK.");

                /* ── Step 5: Clean entire ClearingInward folder ──────────────
                   FileUtils.cleanDirectory() deletes all contents (files +
                   subfolders) but keeps the ClearingInward folder itself.
                   Then we recreate the Images subfolder so it's ready for
                   the next clearing day.                                    */
                int filesDeleted  = 0;
                int filesFailed   = 0;
                String folderMsg  = "";

                File ciFolder = new File(clearingInwardFolder);
                if (!ciFolder.exists()) {
                    folderMsg = "ClearingInward folder not found: " + clearingInwardFolder;
                    System.out.println("deleteTodayInwardFilewise >> " + folderMsg);
                } else {
                    try {
                        // Count files before cleaning for the report
                        File[] allFiles = ciFolder.listFiles();
                        if (allFiles != null) {
                            for (File f : allFiles) filesDeleted++;
                        }

                        FileUtils.cleanDirectory(ciFolder);
                        System.out.println("deleteTodayInwardFilewise >> ClearingInward folder cleaned OK. Items removed=" + filesDeleted);

                        // Recreate Images subfolder so next day's inward works
                        new File(clearingInwardFolder + File.separator + "Images").mkdirs();
                        System.out.println("deleteTodayInwardFilewise >> Images subfolder recreated.");

                        folderMsg = "OK";
                    } catch (Exception fe) {
                        filesFailed = 1;
                        folderMsg = fe.getMessage();
                        System.out.println("deleteTodayInwardFilewise >> cleanDirectory FAILED: " + fe.getMessage());
                        fe.printStackTrace();
                    }
                }

                json.append("{")
                    .append("\"RESPCODE\":0,")
                    .append("\"RETVAL\":\"SUCCESS\",")
                    .append("\"DELETED\":").append(deleted).append(",")
                    .append("\"DELETED_HIST\":").append(deletedHist).append(",")
                    .append("\"FOLDER_ITEMS_REMOVED\":").append(filesDeleted).append(",")
                    .append("\"FOLDER_CLEAN_STATUS\":").append(jsonStr(folderMsg)).append(",")
                    .append("\"FILES_FAILED\":").append(filesFailed);
                json.append("}");
            }
        }

    } else {
        json.append("{\"RESPCODE\":1,\"RETVAL\":\"FAIL|Unknown whattodo=[" + jsonEscape(whattodo) + "]\"}");
    }

} catch (Exception e) {
    try { if (cn != null) cn.rollback(); } catch (Exception re) { /* ignore */ }
    System.out.println("deleteTodayInwardFilewise >> EXCEPTION: " + e.getClass().getName() + ": " + e.getMessage());
    e.printStackTrace();
    json.append("{\"RESPCODE\":1,\"RETVAL\":\"FAIL|" + jsonEscape(e.getMessage()) + "\"}");
} finally {
    try { if (cn != null) cn.close(); } catch (Exception ce) { /* ignore */ }
}

System.out.println("deleteTodayInwardFilewise >> Response: " + json.toString());
out.print(json.toString());
%>
<%!
private void addIfNotEmpty(Set<String> set, String val) {
    if (val != null && val.trim().length() > 0) set.add(val.trim());
}
private String jsonStr(String val) {
    if (val == null) return "null";
    return "\"" + jsonEscape(val) + "\"";
}
private String jsonEscape(String s) {
    if (s == null) return "";
    return s.replace("\\", "\\\\")
            .replace("\"", "\\\"")
            .replace("\n", "\\n")
            .replace("\r", "\\r")
            .replace("\t", "\\t");
}
%>
