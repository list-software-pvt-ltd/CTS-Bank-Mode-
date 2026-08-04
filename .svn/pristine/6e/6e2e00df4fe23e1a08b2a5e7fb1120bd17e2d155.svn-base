// JavaScript Document
var jsonstring;
//var res;
var paraName=[];
var paraDatatype=[];
var paraValue=[];
var myGrid;
var myGrid1;
var selected_file;
$(document).ready(function() 
{
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{
		alert("Your Session Has Been Expired. Please Login Again.");
		menuOnClick("login.jsp");
	}
	else
	{				
		var d=document.getElementById("menu_ppsinterface");
		d.className = ' active';		
		if($("#retMsg").val().length!=0 && $("#retMsg").val()!='null')
		{
			var response=$("#retMsg").val();			
			if(response!='FAILED')
			{
				$("#whattodo").val("READFILE");
				var params = [ 'whattodo','filename' ];
				var dataTypes = [ 'String','String' ];
				var values = [ 'READFILE',response ];
				var paraStr = getParameterString(params, values);
				callAjax("PPSController"+ paraStr);
			}
			else
			{
				alert('Response File Loading Problem');
			}			
		}			
	}	
});
function submitRecords()
{	
		 selected_file = document.getElementById("file_pick").value;
		 if(document.getElementById("file_pick").value=="")
		{
			alert('Please Select File.');
			return false;
		}
		else
		{
				$("#whattodo").val("READRESP");
				document.getElementById("formid").action="PPSRespController";
				document.getElementById("formid").method="POST";
				document.getElementById("formid").enctype="multipart/form-data";
				document.getElementById("formid").submit();
		}
}
function loadGrid(response)
{
	myGrid = new dhtmlXGridObject('jsongrid');
	myGrid.setImagePath("codebase/imgs/");
	myGrid.setHeader("Account No,Instrument No,Amount (In Rs),Payee Name,Instrument Date,Request Received Date Time, Status",null,["text-align:left;","text-align:left;","text-align:left;","text-align:left;","text-align:left","text-align:left","text-align:left","text-align:left"]);
	myGrid.setColumnIds("PIL_ACCNO,PIL_CHQNO,PIL_AMOUNT,PIL_PAYEENAME,PIL_INSTRUMENT_DT,PIL_ENTRYDATE,STATUS");
	myGrid.setInitWidths("120,100,100,200,100,150,200");
	myGrid.setColAlign("right,right,left,left,left,left,left");
	myGrid.setColTypes("ro,ro,ro,ro,ro,ro,ro");
	myGrid.init();
	myGrid.parse(response.RETVAL,"js");
	
}
function success_ajax(response)
{
	   if($("#whattodo").val() == "READFILE")
		{
			if(response.RESPCODE=='0')
			{
			loadGrid(response);
			}
			else if(response.RESPCODE=='1')
			{
			alert('Problem To Read Response File');//Invalid response file. 
		}
	}		
}
function error_ajax(response) 
{
	alert('Error Occured in Calling:  '+response);
}