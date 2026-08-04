<%@ page import="java.io.*,java.util.*, jakarta.servlet.*,java.sql.*" %>
<%@ page import="cts.*" %>

<%
Connection con=Configuration.getConnection();
XMLReader.createOWExtract(Configuration.getConfValByNm("CFG_DOWNLOADPATH_FROM_CHI",con)+"Oack/");
new XMLReader().createRwExtract(Configuration.getConfValByNm("CFG_downloadpath_from_CHI",con)+"/ReturnInward/");
con.close();
%>