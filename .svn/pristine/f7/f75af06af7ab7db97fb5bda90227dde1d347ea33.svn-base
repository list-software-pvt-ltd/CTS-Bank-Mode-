<%
	String nxtpage="";
	HttpSession httpSession=request.getSession();
	String val=(String)session.getAttribute("session_loginid");
	System.out.println("val--"+val);
	if(val==null || val.equalsIgnoreCase("")){
		val="NA";
	}
	
%>


<form id="TheForm" method="post" action="login.jsp" target="TheWindow">
<input type="hidden" id="flag" name="flag" value="CTSFLAG" />
<input type="hidden" id="usm_entryby" name="usm_entryby" value='<%=val%>'/>
</form>

<script type="text/javascript">

var data=document.getElementById('usm_entryby').value;
if(data=="NA"){
	var query= location.search.substring(1);
	if(query=="")
	{
		var width = screen.width;
		var height = screen.height;
		if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1 || navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
		{
			window.opener = top;		
			var popup=window.open('', 'TheWindow','external','width='+width+',height='+height+',top=0,left=0,status=no,toolbar=no,location=no,directories=no,menubar=no,maximizable=no,resizable=no,scrollbars=no,titlebar=no,fullscreen=yes,addressbar=no,dialog=yes');
			
			if (popup.outerWidth < screen.availWidth || popup.outerHeight < screen.availHeight)
			  {
			    popup.moveTo(0,0);
			    popup.resizeTo(screen.availWidth, screen.availHeight);
			  }
			document.getElementById('TheForm').submit();
			
			window.open('','_self','').close();
		}
		else
		{
		    window.open('','_self','');
			window.close();
		    window.open('', 'TheWindow','external','width='+width+',height='+height+',top=0,left=0,status=no,toolbar=no,location=no,directories=no,menubar=no,maximizable=no,resizable=no,scrollbars=no,titlebar=no,fullscreen=yes,addressbar=no');
		    document.getElementById('TheForm').submit();
		}
	}

}
</script>
