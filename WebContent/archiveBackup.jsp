<%@page import="java.io.*"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.Arrays"%>
<%@page import="java.util.Collections"%>
<%@page import="cts.*"%>

<%
Connection cn = null;
File[] folders = null;
String loginstyle = "";
boolean archiveEmpty = false;

String searchFolder = request.getParameter("searchFolder");

if(searchFolder == null)
{
    searchFolder = "";
}

searchFolder = searchFolder.trim();
System.out.println("SEARCH VALUE = [" + searchFolder + "]");
try
{
    cn = Configuration.getConnection();

    loginstyle =
        Configuration.getConfValByNm("CFG_LOGINSTYLE", cn);

    String archivePath =
        Configuration.getConfValByNm(
            "CFG_ARCUPLOADPATH_TO_CHI", cn);

    File baseDir = new File(archivePath);

    File[] allFolders = baseDir.listFiles(File::isDirectory);
    archiveEmpty = (allFolders == null || allFolders.length == 0);
   if(allFolders != null)
    {
        Arrays.sort(allFolders, Collections.reverseOrder());

        java.util.List<File> filteredFolders =
            new java.util.ArrayList<File>();

        for(File f : allFolders)
        {
        	String sf = searchFolder.trim().toLowerCase();

        	if (sf.isEmpty() || f.getName().toLowerCase().contains(sf))
            {
                filteredFolders.add(f);
            }
        }

        folders =
            filteredFolders.toArray(
                new File[filteredFolders.size()]);
    }

    cn.close();
}
catch(Exception e)
{
    e.printStackTrace();
}

int pageSize = 10;
int pageNo = 1;


if(searchFolder == null)
{
    searchFolder = "";
}

searchFolder = searchFolder.trim();

try
{
    pageNo =
        Integer.parseInt(request.getParameter("pageNo"));
}
catch(Exception e)
{
    pageNo = 1;
}

File[] safeFolders = (folders == null) ? new File[0] : folders;

int totalRecords = safeFolders.length;
boolean hasRecords = (totalRecords > 0);
int totalPages =
    (int)Math.ceil((double)totalRecords / pageSize);

int startIndex =
    (pageNo - 1) * pageSize;

int endIndex =
    Math.min(startIndex + pageSize, totalRecords);
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml"
      xml:lang="EN"
      lang="EN"
      dir="ltr">

<head profile="http://gmpg.org/xfn/11">

<title>CTS : Archive Backup</title>

<meta http-equiv="Content-Type"
      content="text/html; charset=iso-8859-1" />

<meta http-equiv="imagetoolbar" content="no" />

<link rel="stylesheet"
      href="styles/layout.css"
      type="text/css" />

<script src="jquery/jquerylib/jquery-1.10.2.js"></script>
<script src="js/archiveBackup.js"></script>

<style>

.archiveTable
{
    width:900px;
    margin:auto;
    border-collapse:collapse;
    border:1px solid #A8BDD8;
    table-layout:fixed;
}

.archiveTable th
{
    background:#D7E3F3;
    color:#000000;
    height:35px;
    font-weight:bold;
    text-align:center;
    font-size:12px;
    border:1px solid #A8BDD8;
}

.archiveTable td
{
    height:28px;
    border:1px solid #C5D2E0;
    font-size:11px;
}

.archiveTable tr:nth-child(even)
{
    background: #F8F8F8;
}

.archiveTable tr:hover
{
    background: #EEF6FF;
}

.filterRow td
{
    background:#D7E3F3;
    border:1px solid #A8BDD8;
    padding:4px;
    text-align:center;
}

.filterRow input
{
    width:95%;
    height:18px;
    border:1px solid #7F9DB9;
    background:#FFFFFF;
    padding-left:3px;
    font-size:11px;
    box-sizing:border-box;
}
.pagination
{
    text-align: center;
    margin-top: 15px;
}

.pagination a
{
    text-decoration: none;
    padding: 4px 8px;
    margin: 0 2px;
    border: 1px solid #CCCCCC;
    color: #333333;
}

.pagination a:hover
{
    background: #059BD8;
    color: white;
}

.currentPage
{
    padding: 4px 8px;
    border: 1px solid #059BD8;
    background: #059BD8;
    color: white;
    font-weight: bold;
}

.downloadSection
{
    text-align: center;
    margin-top: 20px;
}

.toast {
    visibility: hidden;
    min-width: 260px;
    max-width: 320px;

    background-color: #333;
    color: #fff;
    text-align: left;

    border-radius: 8px;
    padding: 12px 16px;

    position: fixed;
    z-index: 9999;

    top: 20px;
    right: 20px;

    font-size: 14px;
    line-height: 1.4;

    opacity: 0;
    transform: translateX(100%);
    transition: opacity 0.4s ease, transform 0.4s ease;
}

/* show animation */
.toast.show {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
}

/* success type */
.toast.success {
    background-color: #28a745;
}

/* error type */
.toast.error {
    background-color: #dc3545;
}

#container {
    min-height: 80vh;
    padding-bottom: 80px; 
}

.downloadSection {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 30px; 
}
/* loader */
.loaderOverlay
{
    display:none;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.4);
    z-index:99999;
}

.loaderBox
{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    padding:25px 35px;
    border-radius:10px;
    text-align:center;
    font-size:14px;
}

.spinner
{
    width:40px;
    height:40px;
    margin:auto;
    border:4px solid #ccc;
    border-top:4px solid #059BD8;
    border-radius:50%;
    animation:spin 1s linear infinite;
}

@keyframes spin
{
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>

</head>

<body id="top">

<jsp:include page="menu.jsp">
    <jsp:param name="htitle" value="MAIN" />
</jsp:include>

<div class="wrapper col3">

<div id="container" class="wrapper">

<h1>Archive Backup</h1>

<div class="fl_left" align="center">

<div style="width:800px; margin:auto;">



<table class="archiveTable" id="archiveTable">

<tr>

   <th width="10%">SR No.</th>
<th width="75%">Folder Name</th>
<th width="10%"> Select <br/>
        <input type="checkbox" id="chkAll" onclick="toggleAll(this)" />
 </th>

</tr>

<!-- FILTER ROW -->
<tr class="filterRow">

    <td>
        <input type="text"
               id="srNoFilter"
               onkeyup="filterTable()"
               style="width:90%;" />
    </td>

    <td>
        <input type="text"
       id="folderNameFilter"
       value="<%=searchFolder%>"
       onkeyup="autoFilter()" />
    </td>

   <td>
   <input type="text"
       id="srNoFilter"
       onkeyup="filterTable()" />
</td>

</tr>

<%
if(folders != null)
{
	for(int idx = startIndex; idx < endIndex && folders != null; idx++)
    {
        File f = folders[idx];
%>

<tr class="folderRow">

    <td align="center">
        <%=idx + 1%>
    </td>

    <td align="left" style="padding-left:8px;">
        <%=f.getName()%>
    </td>

    <td align="center">
       <input type="checkbox"
       class="chkFolder"
       value="<%=f.getName()%>"
       onclick="saveSelection(this)" />
    </td>

</tr>

<%
    }
}
%>

</table>
<input type="hidden" id="allFolders"

       value="<%
       for(File f : safeFolders) {
           out.print(f.getName() + ",");
       }
       %>" />
  
       <input type="hidden" id="selectAllPages" value="N" />
<div class="pagination">

<%
if(totalPages > 1)
{
    int startPage = Math.max(1, pageNo - 2);
    int endPage = Math.min(totalPages, pageNo + 2);

    if(pageNo <= 3)
    {
        startPage = 1;
        endPage = Math.min(5, totalPages);
    }

    if(pageNo >= totalPages - 2)
    {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - 4);
    }

    if(pageNo > 1)
    {
%>

<a href="archiveBackup.jsp?pageNo=1&searchFolder=<%=searchFolder%>">
    First
</a>

<a href="archiveBackup.jsp?pageNo=<%=pageNo-1%>&searchFolder=<%=searchFolder%>">
    Previous
</a>

<%
    }

    for(int p = startPage; p <= endPage; p++)
    {
        if(p == pageNo)
        {
%>

<span class="currentPage">
    <%=p%>
</span>

<%
        }
        else
        {
%>

<a href="archiveBackup.jsp?pageNo=<%=p%>&searchFolder=<%=searchFolder%>">
    <%=p%>
</a>

<%
        }
    }

    if(pageNo < totalPages)
    {
%>

<a href="archiveBackup.jsp?pageNo=<%=pageNo+1%>&searchFolder=<%=searchFolder%>">
    Next
</a>

<a href="archiveBackup.jsp?pageNo=<%=totalPages%>&searchFolder=<%=searchFolder%>">
    Last
</a>

<%
    }
}
%>

</div>
<%
if(!hasRecords && searchFolder != null && !searchFolder.isEmpty())
{
%>
<script>
    alert("No Matching record found");
</script>
<%
}
%>
<div class="downloadSection">

<input type="button"
       name="btnDownload"
       id="submitbutton"
       value="Download ZIP"
       onclick="downloadZip()" />

</div>

<div id="msg"
     style="
     color:red;
     text-align:center;
     font-weight:bold;
     margin-top:10px;">
</div>

<input type="hidden"
       id="loginstyle"
       value="<%=loginstyle%>" />

<input type="hidden"
       id="archiveEmpty"
       value="<%=archiveEmpty%>" />
</div>

</div>

</div>

</div>

<div id="footerDiv">
    <jsp:include page="footer.jsp"></jsp:include>
</div>
<div id="toast" class="toast"></div>
<iframe 
    id="downloadFrame"
    name="downloadFrame"
    style="display:none;">
</iframe>
<div id="loaderOverlay" class="loaderOverlay">
    <div class="loaderBox">
        <div class="spinner"></div>
        <div style="margin-top:10px;">Preparing download...</div>
    </div>
</div>
</body>
</html>