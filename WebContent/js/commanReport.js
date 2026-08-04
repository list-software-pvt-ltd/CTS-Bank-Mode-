
function onClickOfGetResult()
{
	//alert(document.getElementById('datepicker').value);	
	
	document.getElementById('formid').action="jsp/getReportValues.jsp";
	document.getElementById('formid').submit();
}//onClickOfGetResult()