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

		    /* Password check first; jsp/afterLogin.jsp only logs in after the second factor */
		    document.getElementById("login_go").disabled=true;
		    $.ajax({
		    	type: "POST",
		    	url: "jsp/checkUserAndPassword.jsp",
		    	data: { txt_loginid : encryptedname.toString(), txt_pwd : encryptedpass.toString() },
		    	dataType: "json",
		    	success: function(response) {
		    		if (response.result == "OK")
		    			startMfa();
		    		else
		    			mfaFailed(response.message || "Invalid Login or Password");
		    	},
		    	error: function(e) { mfaFailed("Problem In Login. Please Contact Administrator."); }
		    });

	}

}

/*
	SECOND FACTOR (mfa-core, jsp/mfaInitiate.jsp + jsp/mfaVerify.jsp)
	Password OK -> mfaInitiate -> LOGIN: completeLogin()
	                           -> OTP  : show mfaPanel, mfaVerify -> LOGIN: completeLogin()
	                           -> FAIL : back to the login form
	The user is taken from the server session, never sent from here.
*/
function startMfa()
{
	$.ajax({
		type: "POST",
		url: "jsp/mfaInitiate.jsp",
		dataType: "json",
		success: function(response) {
			if (response.result == "LOGIN")
				completeLogin();
			else if (response.result == "OTP")
				showMfaPanel(response);
			else
				mfaFailed(mfaMessage(response));
		},
		error: function(e) { mfaFailed("Error Occured While Starting Second Factor"); }
	});
}

function showMfaPanel(resp)
{
	$('#formid').hide();
	$('#mfaPanel').show();
	if (resp.qrImage)
	{
		$('#mfaQrImage').attr("src", resp.qrImage);
		$('#mfaQrBox').show();
		$('#mfaHint').text("Scan the QR code with your registered device and enter the code shown.");
	}
	else
	{
		$('#mfaQrBox').hide();
		$('#mfaHint').text("An OTP has been sent to your registered mobile number "+(resp.maskedMobile || "")+".");
	}
	$('#mfa_otp').val("").focus();
	$('#mfa_otp').off("keydown").on("keydown", function(event) {
		if (event.keyCode == 13) { verifyMfaOtp(); return false; }
	});
}

function verifyMfaOtp()
{
	var otp=$.trim($('#mfa_otp').val());
	if (otp == '')
	{
		alert("Please Provide OTP.");
		$('#mfa_otp').focus();
		return;
	}
	/* the OTP goes in the POST body, not in the URL (access logs) */
	$.ajax({
		type: "POST",
		url: "jsp/mfaVerify.jsp",
		data: { otp : otp },
		dataType: "json",
		success: function(response) {
			if (response.result == "LOGIN")
				completeLogin();
			else if (response.result == "RETRY")
			{
				alert("Invalid OTP"+(response.attemptsLeft != null ? ", "+response.attemptsLeft+" attempt(s) left" : ""));
				$('#mfa_otp').val("").focus();
			}
			else
				mfaFailed(mfaMessage(response));
		},
		error: function(e) { mfaFailed("Error Occured While Verifying OTP"); }
	});
}

function mfaMessage(resp)
{
	if (resp.code == "EXPIRED")
		return "OTP expired, please login again";
	if (resp.code == "LOCKED")
		return "Too many wrong attempts, please login again";
	if (resp.code == "SERVICE_UNAVAILABLE")
		return "Second factor service not available, please try later";
	if (resp.code == "USER_NOT_ENROLLED")
		return "User is not enrolled for second factor";
	return resp.message || "Second factor failed";
}

function mfaFailed(msg)
{
	cancelMfa();
	alert(msg);
}

/* Back to the login id / password form; the server requires a new password check */
function cancelMfa()
{
	$('#mfaPanel').hide();
	$('#mfa_otp').val("");
	$('#mfaQrImage').removeAttr("src");
	$('#formid').show();
	$('#txt_loginid').val("");
	$('#txt_pwd').val("");
	document.getElementById("login_go").disabled=false;
	$('#txt_loginid').focus();
}

/* The user comes from the session (mfa.loginOkUser); no credentials are posted */
function completeLogin()
{
	$('#txt_loginid').val("");
	$('#txt_pwd').val("");
	document.getElementById("formid").action="jsp/afterLogin.jsp";
	document.getElementById("formid").submit();
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