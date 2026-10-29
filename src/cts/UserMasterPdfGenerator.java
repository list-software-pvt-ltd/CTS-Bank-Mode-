package cts;

import java.io.ByteArrayOutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

public final class UserMasterPdfGenerator {

    private static final String USER_QUERY =
            "SELECT u.LOGINID, u.BRNCD, "
                    + "NVL(b.BRM_BRNNM, 'Not Available') AS BRANCHNAME, "
                    + "u.USRROLE, u.EMAILID, NVL(u.ISACTIVE, 'NEWCBS') AS ISACTIVE, "
                    + "u.USRNAME "
                    + "FROM USRMSTR_VIEW u "
                    + "LEFT JOIN BRANCHMSTR b ON b.BRM_BRNCD = u.BRNCD "
                    + "ORDER BY u.BRNCD, u.LOGINID";

    private static final String[] HEADERS = {
            "Login ID",
            "Branch Code",
            "Branch Name",
            "Role",
            "Email ID",
            "Active",
            "User Name"
    };

//    private UserMasterPdfGenerator() {
//    }

    public static byte[] generate(
            Connection connection,
            byte[] logoBytes,
            String bankName) throws Exception {

        if (connection == null) {
            throw new IllegalArgumentException(
                    "Database connection is required");
        }

        ByteArrayOutputStream output = new ByteArrayOutputStream();

        /*
         * A3 Landscape
         *
         * Left  : 24
         * Right : 24
         * Top   : 78
         * Bottom: 34
         */
        Document document = new Document(
                PageSize.A3.rotate(),
                24,
                24,
                78,
                34);

        PdfWriter writer = PdfWriter.getInstance(document, output);

        writer.setPageEvent(new HeaderFooter());

        document.open();

        /*
         * ---------------------------------------------------------
         * FETCH DATA
         * ---------------------------------------------------------
         */
        List<String[]> records = new ArrayList<String[]>();

        try (PreparedStatement statement =
                     connection.prepareStatement(USER_QUERY);
             ResultSet resultSet =
                     statement.executeQuery()) {

            while (resultSet.next()) {

                records.add(new String[] {
                        resultSet.getString("LOGINID"),
                        resultSet.getString("BRNCD"),
                        resultSet.getString("BRANCHNAME"),
                        resultSet.getString("USRROLE"),
                        resultSet.getString("EMAILID"),
                        resultSet.getString("ISACTIVE"),
                        resultSet.getString("USRNAME")
                });
            }
        }

        /*
         * ---------------------------------------------------------
         * REPORT HEADER
         * ---------------------------------------------------------
         *
         * Displays:
         *
         * User Master Report
         * Total Records
         * Column Count
         * Bank Name
         * Logo
         *
         * before the data table.
         */
        addReportHeader(
                document,
                logoBytes,
                bankName,
                records.size());

        /*
         * ---------------------------------------------------------
         * DATA TABLE
         * ---------------------------------------------------------
         */
        PdfPTable table =
                new PdfPTable(HEADERS.length);

        table.setWidthPercentage(100);

        /*
         * Column widths
         */
        table.setWidths(new float[] {
                1.4f,   // Login ID
                0.9f,   // Branch Code
                2.2f,   // Branch Name
                1.0f,   // Role
                2.3f,   // Email ID
                0.9f,   // Active
                1.7f    // User Name
        });

        /*
         * Repeat table header on every page.
         */
        table.setHeaderRows(1);

        /*
         * Allow rows to split when required.
         */
        table.setSplitLate(false);
        table.setSplitRows(true);

        /*
         * ---------------------------------------------------------
         * TABLE HEADER
         * ---------------------------------------------------------
         */
        Font headerFont =
                new Font(
                        Font.FontFamily.HELVETICA,
                        9,
                        Font.BOLD,
                        BaseColor.BLACK);

        for (String header : HEADERS) {

            PdfPCell cell =
                    new PdfPCell(
                            new Phrase(header, headerFont));

            cell.setBackgroundColor(
                    BaseColor.WHITE);

            cell.setHorizontalAlignment(
                    Element.ALIGN_CENTER);

            cell.setVerticalAlignment(
                    Element.ALIGN_MIDDLE);

            cell.setPadding(6);

            table.addCell(cell);
        }
        /*
         * ---------------------------------------------------------
         * TABLE DATA
         * ---------------------------------------------------------
         */
        Font dataFont =
                new Font(
                        Font.FontFamily.HELVETICA,
                        8,
                        Font.NORMAL,
                        BaseColor.BLACK);

        for (String[] record : records) {

            for (int column = 0;
                 column < record.length;
                 column++) {

                int alignment;

                /*
                 * Center align:
                 * Branch Code
                 * Role
                 * Active
                 */
                if (column == 1 ||
                    column == 3 ||
                    column == 5) {

                    alignment = Element.ALIGN_CENTER;

                } else {

                    alignment = Element.ALIGN_LEFT;
                }

                addCell(
                        table,
                        record[column],
                        dataFont,
                        alignment);
            }
        }

        /*
         * Add table to document.
         */
        document.add(table);

        /*
         * Close PDF.
         */
        document.close();

        return output.toByteArray();
    }

    /*
     * =============================================================
     * REPORT HEADER
     * =============================================================
     */
    private static void addReportHeader(
            Document document,
            byte[] logoBytes,
            String bankName,
            int totalRecords) throws Exception {

        Font titleFont =
                new Font(
                        Font.FontFamily.HELVETICA,
                        18,
                        Font.BOLD,
                        BaseColor.BLACK);

        Font infoFont =
                new Font(
                        Font.FontFamily.HELVETICA,
                        10,
                        Font.NORMAL,
                        BaseColor.BLACK);

        Font infoBoldFont =
                new Font(
                        Font.FontFamily.HELVETICA,
                        10,
                        Font.BOLD,
                        BaseColor.BLACK);

        /*
         * ---------------------------------------------------------
         * HEADER TABLE
         * ---------------------------------------------------------
         *
         * Left  = Report information
         * Right = Bank logo
         */
        PdfPTable header =
                new PdfPTable(2);

        header.setWidthPercentage(100);

        header.setWidths(new float[] {
                8.0f,
                2.0f
        });

        /*
         * ---------------------------------------------------------
         * LEFT SIDE
         * ---------------------------------------------------------
         */
        PdfPCell details =
                new PdfPCell();

        details.setBorder(Rectangle.NO_BORDER);

        /*
         * REPORT TITLE
         */
        Paragraph title =
                new Paragraph(
                        "User Master Report",
                        titleFont);

        title.setAlignment(
                Element.ALIGN_CENTER);

        title.setSpacingAfter(8);

        details.addElement(title);

        /*
         * TOTAL RECORDS
         */
        Paragraph total =
                new Paragraph();

        total.setAlignment(
                Element.ALIGN_CENTER);

        total.add(
                new Phrase(
                        "Total Records: ",
                        infoBoldFont));

        total.add(
                new Phrase(
                        String.valueOf(totalRecords),
                        infoFont));

        details.addElement(total);

        Paragraph info =
                new Paragraph();

        info.setAlignment(
                Element.ALIGN_CENTER);

        info.add(
                new Phrase(
                        "Total Records: ",
                        infoBoldFont));

        info.add(
                new Phrase(
                        String.valueOf(totalRecords),
                        infoFont));

        info.add(
                new Phrase(
                        "    |    Column Count: ",
                        infoBoldFont));

        info.add(
                new Phrase(
                        String.valueOf(HEADERS.length),
                        infoFont));

        details.addElement(info);

        /*
         * BANK NAME
         */
        if (bankName != null &&
            bankName.trim().length() > 0) {

            Paragraph bank =
                    new Paragraph();

            bank.setAlignment(
                    Element.ALIGN_CENTER);

            bank.add(
                    new Phrase(
                            "Bank Name: ",
                            infoBoldFont));

            bank.add(
                    new Phrase(
                            bankName.trim(),
                            infoFont));

            bank.setSpacingAfter(5);

            details.addElement(bank);
        }

        header.addCell(details);

        /*
         * ---------------------------------------------------------
         * RIGHT SIDE - LOGO
         * ---------------------------------------------------------
         */
        PdfPCell logoCell =
                new PdfPCell();

        logoCell.setBorder(
                Rectangle.NO_BORDER);

        logoCell.setHorizontalAlignment(
                Element.ALIGN_RIGHT);

        logoCell.setVerticalAlignment(
                Element.ALIGN_TOP);

        /*
         * IMPORTANT:
         *
         * Image is now loaded from byte[] instead of
         * application.getRealPath().
         */
        if (logoBytes != null &&
            logoBytes.length > 0) {

            Image logo =
                    Image.getInstance(logoBytes);

            /*
             * Keep logo within fixed area.
             */
            logo.scaleToFit(90, 65);

            logo.setAlignment(
                    Element.ALIGN_RIGHT);

            logoCell.addElement(logo);
        }

        header.addCell(logoCell);

        /*
         * Add header.
         */
        document.add(header);

        /*
         * Small gap between header and data table.
         */
        Paragraph spacing =
                new Paragraph(" ");

        spacing.setSpacingAfter(4);

        document.add(spacing);
    }

    /*
     * =============================================================
     * TABLE CELL
     * =============================================================
     */
    private static void addCell(
            PdfPTable table,
            String value,
            Font font,
            int alignment) {

        PdfPCell cell =
                new PdfPCell(
                        new Phrase(
                                value == null ? "" : value,
                                font));

        cell.setHorizontalAlignment(
                alignment);

        cell.setVerticalAlignment(
                Element.ALIGN_MIDDLE);

        cell.setPadding(5);

        table.addCell(cell);
    }

    /*
     * =============================================================
     * PAGE FOOTER
     * =============================================================
     */
    private static final class HeaderFooter
            extends PdfPageEventHelper {

        private final Font footerFont =
                new Font(
                        Font.FontFamily.HELVETICA,
                        8,
                        Font.NORMAL,
                        BaseColor.DARK_GRAY);

        @Override
        public void onEndPage(
                PdfWriter writer,
                Document document) {

            PdfContentByte canvas =
                    writer.getDirectContent();

            /*
             * PAGE NUMBER
             */
            String page =
                    "Page " +
                    writer.getPageNumber();

            /*
             * GENERATED DATE/TIME
             */
            String generated =
                    "Generated: " +
                    new SimpleDateFormat(
                            "dd/MM/yyyy HH:mm:ss")
                            .format(new Date());

            ColumnText.showTextAligned(
                    canvas,
                    Element.ALIGN_LEFT,
                    new Phrase(page, footerFont),
                    document.left(),
                    document.bottom() - 16,
                    0);

            ColumnText.showTextAligned(
                    canvas,
                    Element.ALIGN_RIGHT,
                    new Phrase(generated, footerFont),
                    document.right(),
                    document.bottom() - 16,
                    0);
        }
    }
}