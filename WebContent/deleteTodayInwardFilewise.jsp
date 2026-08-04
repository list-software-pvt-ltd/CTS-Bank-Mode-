<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS : Delete Today Clearing Inward (File-wise)</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
<link href="styles/sample.css" rel="stylesheet" id="bootstrap-css">
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/main.js"></script>
<script src="js/deleteTodayInwardFilewise.js"></script>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>
<style>
  /* ── Page chrome ── */
  body { font-family: Verdana, Arial, sans-serif; font-size: 12px; }

  /* ── Panel header (matches existing blue) ── */
  .panel-hdr {
    background: #2684B7;
    color: #fff;
    text-align: center;
    padding: 6px 10px;
    font-weight: bold;
    font-size: 13px;
  }

  /* ── Toolbar row ── */
  .toolbar-row {
    background: #f0f4f8;
    border: 1px solid #c5d8e8;
    padding: 8px 12px;
    margin-bottom: 6px;
  }
  .toolbar-row label { font-weight: bold; margin-right: 4px; }

  /* ── Table ── */
  #tblFilewise {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  #tblFilewise thead tr {
    background: #2684B7;
    color: #fff;
  }
  #tblFilewise thead th {
    padding: 6px 8px;
    text-align: center;
    border: 1px solid #1a6a9a;
    white-space: nowrap;
  }
  #tblFilewise tbody tr:nth-child(even) { background: #f4f9fd; }
  #tblFilewise tbody tr:nth-child(odd)  { background: #ffffff; }
  #tblFilewise tbody tr:hover           { background: #daeaf5; }
  #tblFilewise tbody td {
    padding: 5px 8px;
    border: 1px solid #d0d8e0;
    text-align: center;
  }
  #tblFilewise tbody td.left { text-align: left; }

  /* ── Summary footer ── */
  .summary-bar {
    background: #eef5fb;
    border: 1px solid #c5d8e8;
    padding: 6px 12px;
    margin-top: 6px;
  }
  .summary-bar label { font-weight: bold; margin-right: 4px; }
  .summary-bar input[type=text] {
    width: 120px;
    background: #fff;
    border: 1px solid #aaa;
    padding: 2px 4px;
  }

  /* ── Buttons ── */
  .btn-del {
    background: #c0392b; color: #fff;
    border: none; padding: 5px 18px;
    font-weight: bold; cursor: pointer;
    border-radius: 3px;
  }
  .btn-del:disabled { background: #aaa; cursor: not-allowed; }
  .btn-fetch {
    background: #2684B7; color: #fff;
    border: none; padding: 5px 16px;
    font-weight: bold; cursor: pointer;
    border-radius: 3px;
  }

  /* ── Wait overlay ── */
  #waitDiv {
    display: none;
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.4);
    z-index: 10000; text-align: center;
  }
  #waitDiv img {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  /* ── No-data message ── */
  #noDataMsg {
    display: none;
    color: #c0392b;
    font-weight: bold;
    padding: 10px;
  }
</style>
</head>

<%
  String msg = "";
  String loginstyle = "";
  try {
    Connection cn = Configuration.getConnection();
    loginstyle = Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);
    cn.close();
    msg = request.getParameter("msg") != null ? request.getParameter("msg").trim() : "";
  } catch (NullPointerException npe) {
    System.out.println("deleteTodayInwardFilewise.jsp: NullPointerException on init");
  }
%>

<body id="top">
  <%
    // menu.jsp requires a CTSTOKEN request param matching the session TOKEN.
    // Resolve it here (from the incoming request, falling back to the
    // current session token) so the include never NPEs.
    String _ctsTokenForMenu = request.getParameter("CTSTOKEN");
    if (_ctsTokenForMenu == null) {
        Object _sessTok = session.getAttribute("TOKEN");
        _ctsTokenForMenu = (_sessTok != null) ? _sessTok.toString() : "";
    }
    String _flagForMenu = request.getParameter("flag");
    if (_flagForMenu == null) _flagForMenu = "";
  %>
  <jsp:include page="menu.jsp">
    <jsp:param name="htitle" value="MAIN" />
    <jsp:param name="CTSTOKEN" value="<%=_ctsTokenForMenu%>" />
    <jsp:param name="flag" value="<%=_flagForMenu%>" />
  </jsp:include>

  <div id="waitDiv">
    <img src="images/wait.gif" alt="Please wait..." />
  </div>

  <div class="wrapper col3">
    <div id="container_chq">

      <div class="panel-hdr">Delete Today's Clearing Inward (File-wise)</div>

      <!-- Toolbar -->
      <div class="toolbar-row">
        <label>Today's Date:</label>
        <input type="text" id="todayDateDisplay" readonly="readonly"
               style="background:#e8e8e8; border:1px solid #aaa; padding:2px 6px; width:90px;" />
        &nbsp;&nbsp;
        <input type="button" id="btnFetchToday" class="btn-fetch" value="Fetch Today's Files" />
      </div>

      <!-- No-data message -->
      <div id="noDataMsg">No clearing inward records found for today's date.</div>

      <!-- Grid -->
      <div style="overflow-x:auto; max-height:400px; overflow-y:auto;">
        <table id="tblFilewise">
          <thead>
            <tr>
              <th>
                <input type="checkbox" id="chkSelectAll" title="Select All" />
                All
              </th>
              <th>Serial No</th>
              <th>Amount</th>
              <th>XML File Name</th>
              <th id="thEntryDate" style="cursor:pointer;" title="Click to sort">Entry Date &#9650;</th>
              <th>Cycle No</th>
              <th>Clearing Type</th>
            </tr>
          </thead>
          <tbody id="tbodyFilewise">
            <!-- Populated by JS -->
          </tbody>
        </table>
      </div>

      <!-- Summary + Delete -->
      <div class="summary-bar">
        <label>Selected Count:</label>
        <input type="text" id="selCount" readonly="readonly" value="0" />
        &nbsp;&nbsp;
        <label>Selected Amount:</label>
        <input type="text" id="selAmount" readonly="readonly" value="0.00" />
        &nbsp;&nbsp;
        <input type="button" id="btnDelete" class="btn-del" value="Delete Selected" disabled="disabled" />
      </div>

    </div><!-- /container_chq -->
  </div><!-- /wrapper -->

  <!-- Hidden fields -->
  <input type="hidden" id="session_loginid"
         value="<%=session.getAttribute("session_loginid")%>" />
  <input type="hidden" id="loginstyle" value="<%=loginstyle%>" />
  <input type="hidden" id="onloadMsg" value="<%=msg%>" />

  <div id="footerDiv">
    <jsp:include page="footer.jsp"></jsp:include>
  </div>
</body>
</html>
