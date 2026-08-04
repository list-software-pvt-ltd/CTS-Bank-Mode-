
function onLoad_report_cleOutwardRes()
{
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");	
		
		menuOnClick("login.jsp");
	}
}//onLoad_report_clearing_outward

function onClickOfRunReport()
{
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
		alert(fromdateVal);
		var exportToexcel=document.getElementById("chkExcel").checked;
		if(fromdateVal=='dd-mm-yyyy')
		{
			alert('Date Should Not Be Empty');
			document.getElementById("fromdatepicker").focus();
		}
		
		else
		{
			if(document.getElementById("chkExcel").checked)
			{
			   document.getElementById("chkExcel").value="true";	
			}	
			document.getElementById("waiting").style.display='';//18-11-2024
			document.getElementById('formid').action="jsp/consolidated_presenting_summ_rpt.jsp";
			document.getElementById('formid').submit();
			document.getElementById("waiting").style.display='none';		
		}
	}
}//onClickOfGetResult()
