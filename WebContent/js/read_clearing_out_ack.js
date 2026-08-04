

function onClickOfRunReport()
{
	var dateVal=document.getElementById("datepicker").value;
	var opt_type=document.getElementById("opt_type").value;
	var exportToexcel=document.getElementById("chkExcel").checked;
	if(dateVal=='dd-mm-yyyy')
	{
		alert('Date Should Not Be Empty');
		document.getElementById("datepicker").focus();
	}
	else if(opt_type=='-1')	
	{
		alert('Select status');
		document.getElementById("opt_type").focus();	
	}
	else
	{
		if(document.getElementById("chkExcel").checked)
		{
		   document.getElementById("chkExcel").value="true";	
		}
		document.getElementById("waiting").style.display='';
		document.getElementById('formid').action="jsp/report_oack.jsp";
		document.getElementById('formid').submit();
		document.getElementById("waiting").style.display='none';		
	}
}