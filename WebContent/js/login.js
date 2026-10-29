// JavaScript Document

function doOnLoad()
{
	//alert("in doOnLoad()");
	document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
	
	$(document).keydown(function (event) {
	    if (event.keyCode == 123) { // Prevent F12
	        return false;
	    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
	        return false;
	    }
	});
	
	document.getElementById("txt_loginid").focus();
	var val=document.getElementById("hdMsg1").value;
	//alert(val);
	if(val!="N")
	{
		alert(val);
		var url=document.URL.substring(0,document.URL.indexOf("?"));
		location.replace(url);
	}
	else
	{
		//noBack();
	}
	/*var query= location.search.substring(1);
	if(query=="")
	{
		var width = screen.width;
		var height = screen.height;
		if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1 || navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
		{
			window.opener = top;		
			window.open("login.jsp?flag=1",'external','width='+width+',height='+height+',top=0,left=0,status=no,toolbar=no,location=no,directories=no,menubar=no,maximizable=no,resizable=no,scrollbars=no,titlebar=no,fullscreen=yes,addressbar=no,dialog=yes');
			window.close();
			//location.replace("login.jsp");
		}
		else
		{
		    window.open('','_self','');
			window.close();
		    window.open("login.jsp?flag=1",'external','width='+width+',height='+height+',top=0,left=0,status=no,toolbar=no,location=no,directories=no,menubar=no,maximizable=no,resizable=no,scrollbars=no,titlebar=no,fullscreen=yes,addressbar=no');
		   // location.replace("login.jsp");
		}
	}
	*/
}


function afterLogin()
{
	//alert("in afterLogin");
	var flg=false;
	var loginid = document.getElementById("txt_loginid").value;
	var pwd = document.getElementById("txt_pwd").value;
	
	if(loginid == '')
	{
		alert("Please Provide Login ID.");
		document.getElementById("txt_loginid").focus();
	}		
	/*else if(loginid.length<8)
	{
		alert("Login ID must contain minimum 8 characters");
		document.getElementById("txt_loginid").value="";
		document.getElementById("txt_loginid").focus();
	}*/
	else if(pwd == '')
	{
		alert("Please Provide Password.");
		document.getElementById("txt_pwd").focus();
	}
	
	/*else if(pwd.length <8 || pwd.length >15)
	{
		alert("Password must contain minimum 8 characters and maximum 15 characters");
		document.getElementById("txt_pwd").focus();
	}*/
	
	else
	{
		var key  = CryptoJS.enc.Latin1.parse('8765432187654321');
		var iv   = CryptoJS.enc.Latin1.parse('8765432187654321'); 

		//suppose you want to encrypt username then 
		    var uname=document.getElementById("txt_loginid").value.trim();
		    var passd=document.getElementById("txt_pwd").value.trim();
				
		    var encryptedname = CryptoJS.AES.encrypt(uname,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});
		    
		    var encryptedpass = CryptoJS.AES.encrypt(passd,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});
		    
		    document.getElementById("txt_loginid").style.display='none';
		    document.getElementById("txt_pwd").style.display='none';
		    		
		    document.getElementById("txt_loginid").value=encryptedname;
		    document.getElementById("txt_pwd").value=encryptedpass;
			
			document.getElementById("formid").action="jsp/afterLogin.jsp";
			document.getElementById("formid").submit();
	
	}

}

function afterCalcel()
{
	document.getElementById("txt_empno").value="";
	document.getElementById("txt_empno").disabled=false;
	document.getElementById("txt_emailid").value="";
	document.getElementById("txt_emailid").disabled=false;
	document.getElementById("txt_password").value="";
	document.getElementById("txt_password").disabled=false;
}