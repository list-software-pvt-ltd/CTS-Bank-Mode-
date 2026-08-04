<%@page import="cts.CreateFile"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%
	String status=CreateFile.generateFile();
	//if(status.equalsIgnoreCase("SUCCESS")
	String CTSTOKEN=request.getParameter("CTSTOKEN");
	
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<script type="text/javascript">
	function doOnLoad()
	{
		alert(document.getElementById("status").value);	
		//alert(document.getElementById("CTSTOKEN").value);	
		//location.replace("main.jsp);
		document.getElementById("formid").action="main.jsp";
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();
	}
</script>
<body onload="doOnLoad()">
<jsp:include page="menu.jsp">
<jsp:param name="hconfig" value="MAIN" />
</jsp:include>
	<input type="hidden" id="status" name="status" value="<%=status%>"/>
	
</body>
</html>

