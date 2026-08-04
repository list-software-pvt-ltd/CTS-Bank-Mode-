$(document).ready(function() 
{
	document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
	

	$(document).keydown(function (event) {
	    if (event.keyCode == 123) { // Prevent F12
	        return false;
	    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
	        return false;
	    }
	});
	
	//alert( $("#CTSTOKEN").val());	
	if($("#CTSTOKEN").val()=="NA" || $("#CTSTOKEN").val()=="null"){
	//location.replace("invalidcredentials.jsp?msg=Invalid Login Credentials");
		document.getElementById("formid").action="invalidcredentials.jsp?msg=Invalid Login Credentials";
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();

	}
});
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
function showLogin()
{
		var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			var eqPos = cookie.indexOf("=");
			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}

		document.getElementById("formid").action="jsp/invalidateSession.jsp";
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();
}


