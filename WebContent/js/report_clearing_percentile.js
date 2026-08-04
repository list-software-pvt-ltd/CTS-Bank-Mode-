
function onLoad_report_cleOutwardRes()
{
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");	
		/*baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		menuOnClick("login.jsp");
	}
}//onLoad_report_clearing_outward

function onClickOfRunReport()
{
	//alert("----- onClickOfRunReport ---");
	//alert(document.getElementById("opt_branch_code").value);	
	//if(validateFileds())
	
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");	
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);
	}
	else
	{
		var fromdateVal=document.getElementById("fromdatepicker").value;
		var todateVal=document.getElementById("todatepicker").value;
		//var branch_code=document.getElementById("opt_branch_code").value;
		var exportToexcel=document.getElementById("chkExcel").checked;
		if(fromdateVal=='dd-mm-yyyy')
		{
			alert('From Date Should Not Be Empty');
			document.getElementById("fromdatepicker").focus();
		}
		if(todateVal=='dd-mm-yyyy')
		{
			alert('To Date Should Not Be Empty');
			document.getElementById("fromdatepicker").focus();
		}
		else
		{
			if(document.getElementById("chkExcel").checked)
			{
			   document.getElementById("chkExcel").value="true";	
			}	
			document.getElementById("waiting").style.display='';
			document.getElementById('formid').action="jsp/report_clearing_percentile.jsp";
			document.getElementById('formid').submit();
			document.getElementById("waiting").style.display='none';		
		}
	}
}//onClickOfGetResult()
