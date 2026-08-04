var myGrid__issun;

function onLoad_report_issuancefile()
{
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");	
		/*baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		menuOnClick("login.jsp");
	}
	document.getElementById("submitbutton1").disabled = true;
	loadISSUNGrid("");
}//onLoad_report_issuancefile

function onClickOfPrint(){
document.getElementById("submitbutton1").disabled = true;
document.getElementById("fromdatepicker").value='dd-mm-yyyy';
document.getElementById("todatepicker").value='dd-mm-yyyy';
myGrid__issun.detachHeader(1);
myGrid__issun.printView();
loadISSUNGrid("");
}

function onClickOfRunReport()
{
	//alert("----- onClickOfRunReport ---");
	myGrid__issun.clearAll();
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
		var date = new Date(); 
		var todaysdate=date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
		//alert(isGreaterDate(fromdateVal,todaysdate));
		
		if(fromdateVal=='dd-mm-yyyy')
		{
			alert('From Date Should Not Be Empty');
			document.getElementById("fromdatepicker").focus();
		}
		else if(isGreaterDate1(fromdateVal,todaysdate)==false)
		{
			alert('From date must be less than or equal to todays date.');
			document.getElementById("fromdatepicker").focus();
		}
		else if(todateVal=='dd-mm-yyyy')
		{
			alert('To Date Should Not Be Empty');
			document.getElementById("todatepicker").focus();
		}	
		else if(isGreaterDate(todateVal,fromdateVal)==true)
		{
			alert('To Date Must Be Greater Than Or Equal To From Date.');
			document.getElementById("todatepicker").focus();
		}
		else if(isGreaterDate1(todateVal,todaysdate)==false)
		{
			alert('To Date Must Be Less Than Or Equal To Todays Date.');
			document.getElementById("todatepicker").focus();
		}
		else
		{
		//alert(fromdateVal+"----- 111111 ---"+todateVal);
			$("#whattodo").val("SHOWRPT");
			var paraName = ['whattodo','FromDate','ToDate'];
			var dataTypes = ['String','String','String'];
			var paraValue = ['SHOWRPT',fromdateVal,todateVal];
			var paraStr = getParameterString(paraName,paraValue);
			callAjax("PPSController"+paraStr);
		}
	}
}//onClickOfGetResult()

function loadISSUNGrid(loadissundata) // loadISSUNGrid
{

	var data =JSON.stringify(loadissundata.RETVAL);
	myGrid__issun = new dhtmlXGridObject('issuancegrid');
	myGrid__issun.setImagePath("codebase/imgs/");
		myGrid__issun.setHeader("SR No.,Account No,Instrument No,Amount (Rs),Payee Name,Instrument Date,Intimation Received Date time,File ID,File Creation Date,Status",null,
		["text-align:left;","text-align:center;","text-align:center;","text-align:right;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;"]);
		myGrid__issun.setColumnIds("rownum,PIL_ACCNO,PIL_CHQNO,PIL_AMOUNT,PIL_PAYEENAME,PIL_INSTRUMENT_DT,PIL_ENTRYDATE,PIL_FILE_ID,PIL_FILECREATIONDT,STATUS");
		myGrid__issun.setInitWidths("45,130,95,90,150,100,138,95,138,180");
		myGrid__issun.setColAlign("right,right,right,right,left,left,left,left,left,left");
		myGrid__issun.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
		myGrid__issun.attachHeader(",#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter",
		["text-align:left;","text-align:left;","text-align:left;","text-align:left;","text-align:left;","text-align:left;","text-align:left;","text-align:left;","text-align:left;","text-align:left;"]);
		myGrid__issun.init();
		myGrid__issun.parse(data, "js");
		
	document.getElementById("waiting").style.display = 'none';
}

function isGreaterDate(date1,date2){
	
	var d1 = new Date(date1.split("-")[1] + "-"
			+ date1.split("-")[0] + "-" + date1.split("-")[2]);
	d1.setHours(0, 0, 0, 0);
	
	var d2 = new Date(date2.split("-")[1] + "-"
			+ date2.split("-")[0] + "-" + date2.split("-")[2]);
	d2.setHours(0, 0, 0, 0);
	
	var monthDiff = (d1.getFullYear()*12 + d1.getMonth()) - (d2.getFullYear()*12 + d2.getMonth());
	if (d1 < d2) {
		return true;
	}
	else{
		return false;
	}
}
function isGreaterDate1(date1,date2){
	
	var d1 = new Date(date1.split("-")[1] + "-"
			+ date1.split("-")[0] + "-" + date1.split("-")[2]);
	d1.setHours(0, 0, 0, 0);
	
	var d2 = new Date(date2.split("-")[1] + "-"
			+ date2.split("-")[0] + "-" + date2.split("-")[2]);
	d2.setHours(0, 0, 0, 0);
	
	var monthDiff = (d1.getFullYear()*12 + d1.getMonth()) - (d2.getFullYear()*12 + d2.getMonth());
	if (d1 <= d2) {
		return true;
	}
	else{
		return false;
	}
}
function success_ajax(response)
{
   if($("#whattodo").val()=='SHOWRPT')
	{
		if (response.RESPCODE == 0) 
		{
		//alert("response===="+JSON.stringify(response.RETVAL));
			loadISSUNGrid(response);
			document.getElementById("submitbutton1").disabled = false;
		}
		else if (response.RESPCODE == 1) 
		{
			//document.getElementById('issuancegrid').style.display='none';
			alert("No Record Found");
			loadISSUNGrid("");
			
		}
		else if (response.RESPCODE == 2) 
		{
			//document.getElementById('issuancegrid').style.display='none';		
			alert("Error in Fetching Records");
			loadISSUNGrid("");
		}
	}
	
}

function error_ajax(e)
{
	if ($("#whatToDo").val()=="SHOWRPT")	
	{
		alert("Error in Fetching Records" );
	}
	
}