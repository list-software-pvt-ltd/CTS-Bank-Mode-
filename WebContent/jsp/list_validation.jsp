<%@ page contentType="text/plain; charset=UTF-8" %>
<%@ page import="java.sql.*" %>
<%@ page import="cts.*" %>

<%
/* ============================================================
 * list_validation.jsp
 *
 * Purpose:
 * Validate CLEARINGOUTWARD records before loading branch list.
 *
 * Response:
 * SUCCESS
 *
 * OR
 *
 * FAILED#
 * BRANCH~CHEQUE~COLUMN_NAME~COLUMN_VALUE~EXPECTED_FORMAT|
 *
 * ============================================================ */

System.out.println("=========================================");
System.out.println("list_validation.jsp Started");
System.out.println("Business Date : " + Configuration.getDDMMYYYY());
System.out.println("=========================================");

Connection cn = null;
PreparedStatement ps = null;
ResultSet rs = null;

StringBuffer invalidList = new StringBuffer();

int totalRecords = 0;
int invalidFields = 0;

try
{
    /* ========================================================
     * GET DATABASE CONNECTION
     * ======================================================== */

    cn = Configuration.getConnection();

    if(cn == null)
    {
        throw new Exception("Session is Null");
    }

    String businessDate = Configuration.getDDMMYYYY();

    /*
     * IMPORTANT:
     *
     * Do NOT use:
     *
     * NVL(CLO_CONVERT_FLG,'Y') = 'Y'
     *
     * because NULL CLO_CONVERT_FLG records will also be
     * considered as Y and may result in extra records.
     *
     * Only records explicitly marked as Y are validated.
     */

    String query =
        "SELECT CLO_BRANCH_CD, " +
        "       CLO_CHQNO, " +
        "       CLO_PAYEE_ACCNM, " +
        "       CLO_DRAWEE_ACCNO, " +
        "       CLO_ITEMSEQNO " +
        "FROM CLEARINGOUTWARD " +
        "WHERE CLO_CONVERT_FLG = 'Y' " +
        "AND CLO_DATE_DDMMYYYY = ? " +
        "ORDER BY CLO_BRANCH_CD, CLO_CHQNO";

    System.out.println("Validation Query:");
    System.out.println(query);

    System.out.println(
        "Validation Business Date = [" +
        businessDate +
        "]"
    );

    /* ========================================================
     * PREPARE QUERY
     * ======================================================== */

    ps = cn.prepareStatement(query);

    ps.setString(1, businessDate);

    /* ========================================================
     * EXECUTE QUERY
     * ======================================================== */

    rs = ps.executeQuery();

    /* ========================================================
     * VALIDATE RECORDS
     * ======================================================== */

    while(rs.next())
    {
        totalRecords++;

        String branchCode =
            rs.getString("CLO_BRANCH_CD");

        String chequeNo =
            rs.getString("CLO_CHQNO");

        String payeeName =
            rs.getString("CLO_PAYEE_ACCNM");

        String draweeAccNo =
            rs.getString("CLO_DRAWEE_ACCNO");

        String itemSeqNo =
            rs.getString("CLO_ITEMSEQNO");


        /* ----------------------------------------------------
         * Handle NULL values
         * ---------------------------------------------------- */

        if(payeeName == null)
        {
            payeeName = "";
        }

        if(draweeAccNo == null)
        {
            draweeAccNo = "";
        }

        if(itemSeqNo == null)
        {
            itemSeqNo = "";
        }


        /* ====================================================
         * FIELD VALIDATION
         * ==================================================== */

        boolean payeeValid =
            payeeName.matches("^[A-Za-z ]+$");

        boolean draweeValid =
            draweeAccNo.matches("^\\d{6}$");

        boolean itemSeqValid =
            itemSeqNo.matches("^\\d{14}$");


        /* ====================================================
         * SERVER LOG
         * ==================================================== */

        System.out.println(
            "Record " + totalRecords +
            " | Branch=[" + branchCode + "]" +
            " | Cheque=[" + chequeNo + "]" +
            " | Payee=[" + payeeName + "]" +
            " | Drawee=[" + draweeAccNo + "]" +
            " | ItemSeq=[" + itemSeqNo + "]" +
            " | PayeeValid=" + payeeValid +
            " | DraweeValid=" + draweeValid +
            " | ItemSeqValid=" + itemSeqValid
        );


        /* ====================================================
         * PAYEE ACCOUNT NAME
         * ==================================================== */

        if(!payeeValid)
        {
            invalidFields++;

            invalidList
                .append(branchCode)
                .append("~")
                .append(chequeNo)
                .append("~")
                .append("CLO_PAYEE_ACCNM")
                .append("~")
                .append(
                    payeeName
                        .replace("~", " ")
                        .replace("|", " ")
                )
                .append("~")
                .append("Only alphabets and spaces allowed")
                .append("|");

            System.out.println(
                "INVALID : Branch=" + branchCode +
                ", Cheque=" + chequeNo +
                ", Column=CLO_PAYEE_ACCNM" +
                ", Value=[" + payeeName + "]"
            );
        }


        /* ====================================================
         * DRAWEE ACCOUNT NUMBER
         * ==================================================== */

        if(!draweeValid)
        {
            invalidFields++;

            invalidList
                .append(branchCode)
                .append("~")
                .append(chequeNo)
                .append("~")
                .append("CLO_DRAWEE_ACCNO")
                .append("~")
                .append(
                    draweeAccNo
                        .replace("~", " ")
                        .replace("|", " ")
                )
                .append("~")
                .append("Exactly 6 numeric digits required")
                .append("|");

            System.out.println(
                "INVALID : Branch=" + branchCode +
                ", Cheque=" + chequeNo +
                ", Column=CLO_DRAWEE_ACCNO" +
                ", Value=[" + draweeAccNo + "]"
            );
        }


        /* ====================================================
         * ITEM SEQUENCE NUMBER
         * ==================================================== */

        if(!itemSeqValid)
        {
            invalidFields++;

            invalidList
                .append(branchCode)
                .append("~")
                .append(chequeNo)
                .append("~")
                .append("CLO_ITEMSEQNO")
                .append("~")
                .append(
                    itemSeqNo
                        .replace("~", " ")
                        .replace("|", " ")
                )
                .append("~")
                .append("Exactly 14 numeric digits required")
                .append("|");

            System.out.println(
                "INVALID : Branch=" + branchCode +
                ", Cheque=" + chequeNo +
                ", Column=CLO_ITEMSEQNO" +
                ", Value=[" + itemSeqNo + "]"
            );
        }
    }


    /* ========================================================
     * FINAL LOG
     * ======================================================== */

    System.out.println("-----------------------------------------");
    System.out.println(
        "Total Records Selected : " +
        totalRecords
    );

    System.out.println(
        "Total Invalid Fields : " +
        invalidFields
    );

    System.out.println("-----------------------------------------");


    /* ========================================================
     * AJAX RESPONSE
     * ======================================================== */

    if(invalidFields == 0)
    {
        System.out.println(
            "Validation Result : SUCCESS"
        );

        out.print("SUCCESS");
    }
    else
    {
        System.out.println(
            "Validation Result : FAILED"
        );

        System.out.println(
            "Validation Response : FAILED#" +
            invalidList.toString()
        );

        out.print("FAILED#");
        out.print(invalidList.toString());
    }
}
catch(Exception e)
{
    /* ========================================================
     * EXCEPTION HANDLING
     * ======================================================== */

    e.printStackTrace();

    String errorMessage =
        e.getMessage();

    if(errorMessage == null)
    {
        errorMessage =
            "Unknown validation error";
    }

    errorMessage =
        errorMessage
            .replace("\r", " ")
            .replace("\n", " ");

    System.out.println(
        "Validation Exception : " +
        errorMessage
    );


    if(errorMessage.indexOf("Session is Null") > -1)
    {
        out.print("SessionIsNull");
    }
    else
    {
        out.print(
            "ERROR#" +
            errorMessage
        );
    }
}
finally
{
    /* ========================================================
     * CLOSE RESULTSET
     * ======================================================== */

    try
    {
        if(rs != null)
        {
            rs.close();
        }
    }
    catch(Exception e)
    {
        e.printStackTrace();
    }


    /* ========================================================
     * CLOSE PREPARED STATEMENT
     * ======================================================== */

    try
    {
        if(ps != null)
        {
            ps.close();
        }
    }
    catch(Exception e)
    {
        e.printStackTrace();
    }


    /* ========================================================
     * CLOSE CONNECTION
     * ======================================================== */

    try
    {
        if(cn != null)
        {
            cn.close();
        }
    }
    catch(Exception e)
    {
        e.printStackTrace();
    }

    System.out.println(
        "list_validation.jsp Completed"
    );

    System.out.println("=========================================");
}
%>