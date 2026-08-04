var session_branch_code;
var session_main_br_yn;
var myGrid;
function onLoad_cheque_search()
{
	var session_loginid = document.getElementById("session_loginid").value;
	 session_branch_code = document.getElementById("session_branch_code").value;
	 session_main_br_yn = document.getElementById("session_main_br_yn").value;	
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");		
		menuOnClick("login.jsp");
	}
	else
	{
		//	loadGrid("");			
	}
}//onLoad_cheque_search
function onClickOfReset()
{
	document.getElementById("opt_tran_code").value='NA';	
	document.getElementById("datepicker").value='dd-mm-yyyy';
	document.getElementById("datepicker1").value='dd-mm-yyyy';
//	loadGrid("");
//myGrid.Rows.Clear();
$("#mygird_data").remove();
	document.getElementById("submitbutton").disabled = true;
			document.getElementById('img_frnt').src = "";
			//		menuOnClick("chequeSearch.jsp");
}

function onClickOfPrint()
{
	document.getElementById("submitbutton").disabled = true;
	document.getElementById("datepicker").value='dd-mm-yyyy';
	document.getElementById("datepicker1").value='dd-mm-yyyy';
	document.getElementById("opt_tran_code").value='NA';	
	myGrid.detachHeader(1);
	myGrid.printView();
	//loadGrid("");
}

function onClickOfRunReport()
{
	var datepicker = document.getElementById("datepicker").value;
	var datepicker1 = document.getElementById("datepicker1").value;
	var opt_tran_code = document.getElementById("opt_tran_code").value;
	var date = new Date(); 
	var todaysdate=date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
	
	if(datepicker=='dd-mm-yyyy')
	{
		alert('Please Select From date.');
		return false;
	}
	else if(datepicker1=='dd-mm-yyyy')
	{
		alert('Please Select To date.');
		return false;
	}
	else if(isGreaterDate1(datepicker,datepicker1)==false)
	{
			alert('From date must be less than or equal to To Date.');return false;
	}
	else if(isGreaterDate(datepicker1,datepicker)==true)
	{
			alert('To Date Must Be Greater Than Or Equal To From Date.');return false;
	}
	else if(isGreaterDate1(datepicker,todaysdate)==false)
	{
			alert('To Date Must Be Less Than Or Equal To Todays Date.');return false;
	}	
	else  if(opt_tran_code=="NA")
	{
		alert('Please Select Transaction Type.');
		return false;
	}
	else
	{
		$("#whattodo").val("SHOWDATA");
		var params = ['whattodo','fromdate','todate','trantype'];
		var dataTypes = ['String','String','String','String' ];
		var values = [ 'SHOWDATA',datepicker,datepicker1,opt_tran_code];
		var paraStr = getParameterString(params, values);
		callAjax("PPSController"+ paraStr);
	}				
	
}//onClickOfRunReport
function loadGrid(dataVal)
{
	var data =JSON.stringify(dataVal.RETVAL);	
	myGrid = new dhtmlXGridObject('mygird_data');
	myGrid.setImagePath("codebase/imgs/");
	var opt_tran_code = document.getElementById("opt_tran_code").value;
	if(opt_tran_code=="CI")
	{
		myGrid.setHeader("Sr No,Date,Cheque No,Account No,Amount(In RS),Account Name,View Details,Image Name",null,
		["text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center","text-align:center","text-align:center","text-align:center"]);
		myGrid.setColumnIds("rownum,DDMMYYYY,SERIALNO,ACCOUNTNO,AMOUNT,PAYEENAME,show_Report,IMAGEFILE3");
		myGrid.setInitWidths("60,100,100,130,130,230,0,200");
		myGrid.setColAlign("center,right,right,right,right,left,left,left");
		myGrid.attachHeader("#numeric_filter,#text_filter,#numeric_filter,#numeric_filter,#numeric_filter,#text_filter,#text_filter,#text_filter");
		myGrid.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro");
		myGrid.init();
		myGrid.parse(data, "js");
		
		myGrid.forEachRow(function(id)
		 {
			myGrid.cells(id, 6).setValue("View Details");	
			myGrid.setCellTextStyle(id, 6,"color:blue;font-weight:bold;");		
			});
			myGrid.attachEvent("onRowSelect", doOnRowSelected);
	}
	else if(opt_tran_code=="CO")
	{
		myGrid.setHeader("Sr No,Date,Cheque No,Account No,Amount(In RS),Account Name,View Details,Branch code,Image Name",null,["text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center","text-align:center","text-align:center","text-align:center"]);
		myGrid.setColumnIds("rownum,DDMMYYYY,SERIALNO,ACCOUNTNO,AMOUNT,PAYEENAME,show_Report,BRANCHCD,IMGNAME");
		myGrid.setInitWidths("60,80,100,120,100,230,0,60,220");
		myGrid.setColAlign("center,right,right,right,right,left,left,right,left");
		myGrid.attachHeader("#numeric_filter,#text_filter,#numeric_filter,#numeric_filter,#numeric_filter,#text_filter,#text_filter,#numeric_filter,#text_filter");
		myGrid.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro");
		myGrid.attachEvent("onRowSelect", doOnRowSelected);
		myGrid.init();
		myGrid.parse(data, "js");
		myGrid.forEachRow(function(id)
		 {
			myGrid.cells(id, 6).setValue("View Details");
			myGrid.setCellTextStyle(id, 6,"color:blue;font-weight:bold;");	
		});
	}
	else if(opt_tran_code=="RO")
	{
		myGrid.setHeader("Sr No,Date,Cheque No,Account No,Amount(In RS),Reason",null,["text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center","text-align:center"]);
		myGrid.setColumnIds("rownum,DDMMYYYY,SERIALNO,ACCOUNTNO,AMOUNT,PAYEENAME");
		myGrid.setInitWidths("80,120,120,180,150,300");
		myGrid.setColAlign("center,right,right,right,right,left");
		myGrid.attachHeader("#numeric_filter,#text_filter,#numeric_filter,#numeric_filter,#numeric_filter,#text_filter");
		myGrid.setColTypes("ro,ro,ro,ro,ro,ro");
		myGrid.init();
		myGrid.parse(data, "js");
	}
	else if(opt_tran_code=="RI")
	{
		myGrid.setHeader("Sr No,Date,Cheque No,Account No,Amount(In RS),Reason",null,["text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center","text-align:center"]);
		myGrid.setColumnIds("rownum,DDMMYYYY,SERIALNO,ACCOUNTNO,AMOUNT,PAYEENAME");
		myGrid.setInitWidths("80,120,120,180,150,300");
		myGrid.setColAlign("center,right,right,right,right,left");
		myGrid.attachHeader("#numeric_filter,#text_filter,#numeric_filter,#numeric_filter,#numeric_filter,#text_filter");
		myGrid.setColTypes("ro,ro,ro,ro,ro,ro");
		myGrid.init();
		myGrid.parse(data, "js");
	}
	else 
	{
		myGrid.setHeader("Sr No,Date,Cheque No,Account No,Amount(In RS),Status",null,["text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center","text-align:center"]);
		myGrid.setColumnIds("rownum,DDMMYYYY,SERIALNO,ACCOUNTNO,AMOUNT,PAYEENAME");
		myGrid.setInitWidths("80,120,120,180,150,300");
		myGrid.setColAlign("center,right,right,right,right,left");
		myGrid.attachHeader("#numeric_filter,#text_filter,#numeric_filter,#numeric_filter,#numeric_filter,#text_filter");
		myGrid.setColTypes("ro,ro,ro,ro,ro,ro");
		myGrid.init();
		myGrid.parse(data, "js");
	}

	
	
}
function isGreaterDate(date1,date2)
{
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
   if($("#whattodo").val()=='SHOWDATA')
	{
		if (response.RESPCODE == 0) 
		{
			loadGrid(response);
			//document.getElementById("submitbutton1").disabled = false;
		}
		else if (response.RESPCODE == 1) 
		{
			alert("No Record Found");
			loadGrid("");			
		}
		else if (response.RESPCODE == 2) 
		{
			alert("Error in Fetching Records");
			loadGrid("");
		}
	}	
}
function error_ajax(e)
{
	if ($("#whatToDo").val()=="SHOWDATA")	
	{
		alert("Error in Fetching Records" );
	}	
}

function doOnRowSelected(rowId, cellId) {
	var cheqtype = document.getElementById("opt_tran_code").value;
	if (cheqtype == 'CO') {
		//if (cellId == 7)
		 {
			var reportPath = "", reportPath1 = "";
			var date = myGrid.cells(rowId, 1).getValue();
			var brncd =  myGrid.cells(rowId, 7).getValue();
			var imgnm =  myGrid.cells(rowId, 8).getValue();
		  //alert(date+"=="+brncd+"==="+imgnm);
			var nwdate = date.split("/");
			nwdate = nwdate[0] + nwdate[1] + nwdate[2];			
			var path = document.getElementById("PATH_UP").value;
			var urlbase = document.URL;
			var p = urlbase.lastIndexOf('/');
			urlbase = urlbase.substr(0, p + 1);
			reportPath1 = path+ nwdate
					+ "/uploadpath_to_CHI/" + brncd
					+ "/ClearingOutward/Images/" + imgnm;// +nwdate+".pdf";
			reportPath = urlbase + "OldClearingOutwardReport/" + nwdate
					+ "/ClearingOutward" + nwdate + ".pdf";
			document.getElementById('img_frnt').src = reportPath1;
			/*if (checkUrl(reportPath)) {
				window.open(reportPath);
			} else {
				alert("No Data found for given criteria");
			}*/
		}
	} 
else {
	//	if (cellId == 11)
		 {
			var reportPath = "", reportPath1 = "";
			var date = myGrid.cells(rowId, 1).getValue();
			var imgnm = myGrid.cells(rowId, 7).getValue();
			var nwdate = date.split("/");
			nwdate = nwdate[0] + nwdate[1] + nwdate[2];
			var path = document.getElementById("PATH").value;
			var urlbase = document.URL;
			var p = urlbase.lastIndexOf('/');
			urlbase = urlbase.substr(0, p + 1);
				reportPath1 = path+nwdate
						+ "/downloadpath_from_CHI/ClearingInward/Images/"
						+ imgnm + ".jpg";// +nwdate+".pdf";
				reportPath = urlbase + "OldClearingInwardReport/" + nwdate
						+ "/clearingInward" + nwdate + ".pdf";
				document.getElementById('img_frnt').src=reportPath1;	
		}	
	}
}
