var session_branch_code;
var session_main_br_yn;
function onLoad_intimationreq()
{
	/*var session_loginid = document.getElementById("session_loginid").value;
	 session_branch_code = document.getElementById("session_branch_code").value;
	 session_main_br_yn = document.getElementById("session_main_br_yn").value;
	
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");	
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);
	}*/
	document.getElementById("topnav").style.display='none';
	document.getElementById("userid").style.display='none';
	$(function() { 
        $("input[name='accountno']").on('input', function(e) { 
            $(this).val($(this).val().replace(/[^0-9]/g, '')); 
        }); 
        
         $("input[name='cheqno']").on('input', function(e) { 
            $(this).val($(this).val().replace(/[^0-9]/g, '')); 
        }); 
        $("input[name='trancode']").on('input', function(e) { 
            $(this).val($(this).val().replace(/[^0-9]/g, '')); 
        }); 
        
        $("input[name='mobno']").on('input', function(e) { 
            $(this).val($(this).val().replace(/[^0-9]/g, '')); 
        }); 
        
        $("input[name='amount']").on('input', function(e) { 
            $(this).val($(this).val().replace(/[^0-9]/g, '')); 
        }); 
        
         $("input[name='custid']").on('input', function(e) { 
            $(this).val($(this).val().replace(/[^0-9]/g, '')); 
        }); 
    }); 
    $("#custid").on("blur", function()
	{
		$("#custid").val(padDigits($("#custid").val(), 10));
	}); 
	$("#cheqno").on("blur", function()
	{
		$("#cheqno").val(padDigits($("#cheqno").val(), 6));
	});
}//onLoad_intimationreq

function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function onClickOfSendRequest()
{
	//alert("----- onClickOfSendRequest() ---");
		var accountno=document.getElementById("accountno").value;
		var cheqno=document.getElementById("cheqno").value;
		var instrumentdateVal=document.getElementById("datepicker").value;
		var trancode=document.getElementById("trancode").value;
		var custid=document.getElementById("custid").value;
		var payeenm=document.getElementById("payeenm").value;
		var mobno=document.getElementById("mobno").value;
		var amount=document.getElementById("amount").value;
		
		if(isEmpty(accountno))
		{
			alert('Enter Account Number');
			document.getElementById("accountno").focus();
		}
		else if(accountno.length!=16)
		{
			alert('Enter Valid Account Number');
			document.getElementById("accountno").focus();
		}
		else if(isEmpty(cheqno))
		{
			alert('Enter Cheque Number');
			document.getElementById("cheqno").focus();
		}
		else if(cheqno.length!=6)
		{
			alert('Enter Valid Cheque Number');
			document.getElementById("cheqno").focus();
		}
		else if(instrumentdateVal=='dd-mm-yyyy')
		{
			alert('Instrument Date Should Not Be Empty');
			document.getElementById("datepicker").focus();
		}
		else if(isEmpty(trancode))
		{
			alert('Enter Transaction Code');
			document.getElementById("trancode").focus();
		}
		else if(trancode.length<2 || trancode.length>3)
		{
			alert('Enter Valid Transaction Code');
			document.getElementById("trancode").focus();
		}
		else if(isEmpty(custid))
		{
			alert('Enter Customer ID');
			document.getElementById("custid").focus();
		}
		else if(custid.length!=10)
		{
			alert('Enter Valid Customer ID');
			document.getElementById("custid").focus();
		}
		else if(isEmpty(payeenm))
		{
		    alert('Enter Payee Name');
			document.getElementById("payeenm").focus();
		}
		else if(isEmpty(mobno))
		{
			alert('Enter Mobile Number');
			document.getElementById("mobno").focus();
		}
		else if(mobno.length!=10)
		{
			alert('Enter Valid Mobile Number');
			document.getElementById("mobno").focus();
		}
		else if(isEmpty(amount))
		{
			alert('Enter Amount');
			document.getElementById("amount").focus();
		}
		else if(amount=='0')
		{
			alert('Enter Amount Greater Than Zero');
			document.getElementById("amount").focus();
		}
		else
		{
			var paraName = ['whattodo','ACCOUNTNO','CHQNO','INSTRUMENTDT','TRANCODE','CUSTID','PAYEENM','MOBILENO','AMOUNT'];
			var dataTypes = ['String','String','String','String','String','String','String','String','String'];
			var paraValue = ['INITREQUEST',accountno,cheqno,instrumentdateVal,trancode,custid,payeenm,mobno,amount];
			var paraStr = getParameterString(paraName,paraValue);
			callAjax("PPSController"+paraStr);
		}
}//onClickOfSendRequest()
function isEmpty(value)
{
	if(value=="")
		return true;
	else
		return false;
}
function onClickOfreset()
{
	//clear all field
	clearall();
}
function clearall()
{
	document.getElementById("accountno").value="";
	document.getElementById("cheqno").value="";
	document.getElementById("datepicker").value="dd-mm-yyyy";
	document.getElementById("trancode").value="";
	document.getElementById("custid").value="";
	document.getElementById("mobno").value="";
	document.getElementById("amount").value="";
	document.getElementById("payeenm").value="";
}
function success_ajax(response)
{
	var cheqNo=document.getElementById("cheqno").value;
		clearall();
		if (response.RESPCODE == 0) 
		{
		  alert("PPS intimation Registered Successfully For Cheque No. "+cheqNo);
		}
		else if (response.RESPCODE == 1) 
		{
			alert("Intimation Request Failed Due To Mobile No Not matched With RMN");			
		}
		else if (response.RESPCODE == 2) 
		{
			alert("Intimation Request Failed Due To Cheque No Does Not Belong To Account");			
		}
		else if (response.RESPCODE == 3) 
		{
			alert("Intimation Request Failed Due To Intimation Already Received But Details Not Matching");			
		}
		else if (response.RESPCODE == 4) 
		{
			alert("Intimation Request Failed Due To Intimation Already Received (Duplicate)");			
		}
		else if (response.RESPCODE == 5) 
		{
			alert("Intimation Request Failed Due To Cheque Is Already Honoured.");			
		}
		else if (response.RESPCODE == 6) 
		{
			alert("Intimation Failed Due To Cheque is Surrendered");			
		}
		else if (response.RESPCODE == 7) 
		{
			alert("Intimation Failed Due To Stop Payment Instruction Issued");			
		}
		else if (response.RESPCODE == -9) 
		{
			alert("Your Request Could Not Register For Cheque No "+cheqNo);
		}
		else if (response.RESPCODE == 22) 
		{
			alert("Error While Saving Intimation");
		}
}

function error_ajax(e)
{
	alert("Error While Saving Intimation" );
}
