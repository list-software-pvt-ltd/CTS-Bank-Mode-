// JavaScript Document
function doOnLoad()
{
	document.getElementById("txt_loginid").focus();
	var val=document.getElementById("hdMsg1").value;
	//alert("val :"+val);
	if(val!="N")
	{
		alert(val);
		var url=document.URL.substring(0,document.URL.indexOf("?"));
		//location.replace(url);
		menuOnClick("forgot_password.jsp");
	}
}

function after_get_pwd()
{
	//alert("after_get_pwd");

	var txt_loginid=document.getElementById("txt_loginid");
	var txt_email=document.getElementById("txt_emailid");
	
	//alert(isNaN(txt_loginid));
	if(txt_loginid.value=="")
	{
		alert('Enter Login ID');	
		txt_loginid.focus();
		flag = 0;
	}
	else if(txt_email.value=="")
	{
		alert('Enter Email ID');	
		txt_email.focus();
		
	}
	else if(!isEmail(txt_email.value))
	{
		alert('Enter valid email');
		txt_email.value="";
		txt_email.focus();
		
	}
	else
	{		
		//alert('in if');			//document.getElementById("forgotpassword").action="jsp/afterSubmit_forgotpassword.jsp?empID="+txt_loginid.value"&email="+txt_email.value;
			document.getElementById("formid").action="jsp/after_getpassword.jsp";
			document.getElementById("formid").submit();	
	}
}


function isNumeric(val)
{
	var digStr="0123456789";
	//alert(empNoMust);
	var flg=true;
	var i;
	//alert(val.length);
	for(i=0;i<val.length;i++)
	{
		//alert(val.substring(i,i+1));
		if(digStr.indexOf(val.substring(i,i+1))==-1)
		{
			flg=false;
			break;
		}
	}
	//alert('isNumeric()--flg'+flg);
	return flg;
}

function isEmail(val)
{
	var flg=false;
	if((" "+val.indexOf('@'))>-1)
	{
		if((val.indexOf(".co")>val.indexOf("@"))  || (val.indexOf(".in")>val.indexOf("@")))
		{
			flg=true;
		}
	}
	return flg;
}


function afterBack()
{
	/*var url = document.URL;
	var url=url.substring(0,url.lastIndexOf("/")+1);
	url = url + "login.jsp?flag=1";
	location.replace(url);
	document.getElementById("txt_loginid").value="";
	document.getElementById("txt_loginid").disabled=false;
	document.getElementById("txt_emailid").value="";
	document.getElementById("txt_emailid").disabled=false;*/
	menuOnClick("login.jsp");
}