
function onLoad_report_paperToFollow()
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
		var dateVal=document.getElementById("datepicker").value;
		//var branch_code=document.getElementById("opt_branch_code").value;
		var exportToexcel=document.getElementById("chkExcel").checked;
		if(dateVal=='dd-mm-yyyy')
		{
			alert('Date Should Not Be Empty');
			document.getElementById("datepicker").focus();
		}
		else
		{
			if(document.getElementById("chkExcel").checked)
			{
			   document.getElementById("chkExcel").value="true";	
			}	
			document.getElementById("waiting").style.display='';
			document.getElementById('formid').action="jsp/report_paperToFollowInward.jsp";
			document.getElementById('formid').submit();
			document.getElementById("waiting").style.display='none';		
		}
	}
}//onClickOfGetResult()
