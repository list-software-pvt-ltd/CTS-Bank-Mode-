<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Untitled Document</title>
<link rel="stylesheet" href="styles/layout.css" type="text/css" />
</head>
<body>
<form>
  <jsp:include page="menu.jsp">
  <jsp:param name="htitle" value="MAIN" />
  </jsp:include>
  <div class="wrapper col3">		
  <center>
  <main class="container clear">
    <!-- main body -->
    <div>
      <form action="#" method="post">
        <div id="inputfields">
          <h2>Convert To Return File</h2>
          <div >
            <label for="name">Select Transaction Type <span>*</span></label>
            <select
							id="select_tran_type">
              <option value="select">Select</option>
            </select>
          </div>
          <br>
          <br>
          <div >
            <label for="email">Select Institution Code <span>*</span></label>
            <select id="select_insti_code">
              <option value="select">Select</option>
            </select>
          </div>
          <br>
          <br>
          <div >
            <input name="btnShowFiles" id="btnShowFiles" type="button" value="Show Files">
          </div>
          <br>
          <br>
          <div class="one_half first" id="radio_div"> </div>
          <br>
          <br>
          <div class="one_half first" id="show_entries_btn_div" style="display: none;">
            <input name="show_entries" id="btnShowEntries" type="button" value="Show Entries" class="forbutton" >
          </div>
        </div>
        <br>
        <br>
        <input type="hidden" id="whattodo" name="whattodo"/>
      </form>
    </div>
  </main>
  </center>
	</div>
</form>
</body>
</html>
