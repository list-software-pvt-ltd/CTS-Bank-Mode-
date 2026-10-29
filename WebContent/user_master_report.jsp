
<%@ page import="java.io.OutputStream" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="cts.Configuration" %>
<%@ page import="java.io.InputStream" %>
<%@ page import="java.io.ByteArrayOutputStream" %>
<%@ page import="cts.UserMasterPdfGenerator" %>

<%
Connection connection = null;	

try {

    connection = Configuration.getConnection();

    if (connection == null) {
        throw new IllegalStateException(
                "Unable to connect to the database");
    }

    /*
     * =========================================================
     * LOAD BANK LOGO
     * =========================================================
     *
     * Instead of application.getRealPath(), load the image
     * directly from the web application's resource path.
     */
    InputStream logoStream =
            application.getResourceAsStream(
                    "/images/bank_logo.png");

    byte[] logoBytes = null;

    if (logoStream != null) {

        ByteArrayOutputStream logoOutput =
                new ByteArrayOutputStream();

        byte[] buffer = new byte[4096];

        int bytesRead;

        while ((bytesRead =
                logoStream.read(buffer)) != -1) {

            logoOutput.write(
                    buffer,
                    0,
                    bytesRead);
        }

        logoBytes =
                logoOutput.toByteArray();

        logoStream.close();
    }

    /*
     * If logo is not found, PDF generation can still continue.
     */
    if (logoBytes == null ||
        logoBytes.length == 0) {

        System.out.println(
                "WARNING: Bank logo not found at "
                + "/images/bank_logo.png");
    }

    /*
     * =========================================================
     * BANK NAME
     * =========================================================
     */
    String bankName =
            Configuration.getConfValByNm(
                    "CFG_BANKNAME",
                    connection);

    /*
     * =========================================================
     * GENERATE PDF
     * =========================================================
     */
     byte[] pdf = UserMasterPdfGenerator.generate(
    	        connection,
    	        logoBytes,
    	        bankName);

    /*
     * =========================================================
     * SEND PDF RESPONSE
     * =========================================================
     */
     
     /* Clear any buffered JSP output before sending the PDF. */
     out.clearBuffer();
    
    response.reset();

    response.setContentType(
            "application/pdf");

    response.setHeader(
            "Content-Disposition",
            "attachment; filename=UserMasterReport.pdf");

    response.setContentLength(
            pdf.length);

    OutputStream output =
            response.getOutputStream();

    output.write(pdf);

    output.flush();

} catch (Exception e) {

    e.printStackTrace();

    if (!response.isCommitted()) {

        response.sendError(
                500,
                "Unable to generate User Master Report");
    }

} finally {

    if (connection != null) {

        try {
            connection.close();
        } catch (Exception ignored) {
        }
    }
}
%>