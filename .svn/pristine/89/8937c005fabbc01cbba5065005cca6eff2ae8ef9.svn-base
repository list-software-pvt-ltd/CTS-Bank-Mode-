<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" isErrorPage = "true"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<script type="text/javascript">
function doOnLoad()
{
	alert(document.getElementById("message").value);
	location.replace("../report_clearing_inward_withimg.jsp");	
	
}
</script>
<body onload="doOnLoad()">
	 
	<%
		String str=exception.getMessage();
		if(str.toLowerCase().contains("javaheapspace"))
		{
			str="Please Select less Branches!!";
		}
	%>
	<input type="hidden" id="message" value="<%=str%>">
</body>
</html>