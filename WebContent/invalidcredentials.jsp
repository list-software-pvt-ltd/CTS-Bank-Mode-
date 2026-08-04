<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="EN" lang="EN" dir="ltr">
<head profile="http://gmpg.org/xfn/11">
<title>CTS</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta http-equiv="imagetoolbar" content="no" />
<link rel="stylesheet" href="styles/layout.css" type="text/css" />


<script type="text/javascript">
	window.history.forward();
	function noBack()                     
	{
		window.history.forward();
	}
	function menuOnClick(pageName)
	{
		//alert(pageName);
			
		document.getElementById("formid").action=pageName;
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();
	}
</script>
</head>

<%
	
	String msg="",flag="";
	System.out.println(" on invalid form");
	try
	{
		msg=request.getParameter("msg").trim();
		System.out.println("msg======"+msg);	
		flag=(String)request.getParameter("flag");
		System.out.println("in invalid flag======"+flag);
		session.invalidate();
		
	}
	catch(NullPointerException npe)
	{
		System.out.println("Message to be displayed on invalid form is null");		
	}	
		
%>
<!--<body id="top" onload="noBack();" onpageshow="if (event.persisted) noBack();" onunload="">
-->
<body id="top"  onpageshow="if (event.persisted) noBack();" onunload="" style="">
<div class="wrapper col1">
	  <div id="header">
		<div id="logo">
		<table style="border-color: #E3F1F9">
		<tr>
		<!-- 	<td style="border-color: #E3F1F9" >
			 <img src="images/list_logo.png" style="height:70px;"/>
			</td> -->
			<td style="border-color: #E3F1F9" >
				 <img src="images/emtech.png" style="height:115px;  width: 120px"/><br/>
			</td>
			<td style="border-color: #E3F1F9; "  >
				  	<label style="font-size: medium;color:#E3F1F9  ">Cheque Truncation System</label>	<br/>
					<label style="font-size: xx-large; ">CTS </label><br/>
					<label style="font-size:small ; ">Cheque Truncation System</label>				
			</td>
			
			
		<!-- 	<td style="border-color: #E3F1F9" >
			<h1 style="padding-top: 5%"><a href="#">CTS</a></h1> 
			<p><strong>Cheque Truncation System</strong></p>
			</td> -->
		
		</tr>
		  
		
		 
		  </table>
		</div>
		
		<br class="clear" />
		</div>
</div>


<noscript style="font-family:'Times New Roman', Times, serif;font-size:18px">
	Go to Browser Setting and Allow all sites to run JavaScript (recommended)
</noscript>
<div style="background-image: url(images/List_Background.jpg); background-size: 100% 150%; background-repeat: no-repeat;">
  <div id="footer" >
    <div id="invalid"style="height:350px" >
   			  
    		
				  <form id="formid" method="post">
				  <input type="hidden" id="flag" name="flag" value="<%=flag%>">
				   <input type="text" readonly="readonly" id="msgtxt" name="msgtxt" value="<%=msg%>" style="width: 200%; text-align: center;margin-top: 50%;" />
				   <!--<div style="text-align:center;>
		            <span class="colorBlue extra-large"><h3>Click to return <a style="color:white" onClick="menuOnClick('login.jsp')" ><b>login page</b></a> </h3></span>
		           </div>-->

					  
					  
<%
System.out.println("Message:"+msg);
	try
	{
	if(msg.length()>0)
	{%>
	<input type="hidden" id="hdMsg1" name="hdMsg1" value="<%=msg%>"/>
	<%}
	else
	{%>
	<input type="hidden" id="hdMsg1" name="hdMsg1" value="N"/>
	<%}
	}
	catch(NullPointerException npe)
	{%>
	<input type="hidden" id="hdMsg1" name="hdMsg1" value="N"/>
	<%
	System.out.println("Message to be displayed on form is null");
	}
%>

				  </form>
     <!-- <p><a href="#">&raquo; Lost Your Password</a> | <a href="#">Create An Account &raquo;</a></p>-->
    </div>
	
	 <div class="footbox" >
      <h2 style="color: black;">Contact</h2>
      	<ul style="color: black;">
			LIST Software Pvt. Ltd.
			An ISO 9001:2008 Company 
			
			Sangli :
			Rahul Complex. Opp. Tata Petrol Pump,
			Guest House, Vishrambag,
			Sangli - 416 415.
			<!-- Ph.: (0233) 2303221, 2304306, 2304857. -->
		</ul>
    </div>
	
   
    <br class="clear" />
  </div>
</div>

<div id="footer">
 <jsp:include page="footer.jsp"></jsp:include>

		<!-- <p>(c) Design & Developed by <a href="http://listspl.co.in/"><label style="color:#FFFFFF; cursor:pointer;">LIST Software Pvt. Ltd.</label></a><br/>
				Version 2017.1.0<br/>
		</p> -->
</div>
</body>
</html>
