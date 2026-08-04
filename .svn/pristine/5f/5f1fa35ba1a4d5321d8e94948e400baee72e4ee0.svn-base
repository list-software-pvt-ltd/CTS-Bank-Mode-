var clowdata;
var myGrid__clow;
var dateclo;
var branches = [];
var Entries = [];
$(document).ready(function() {
	var fromDate = $('#datepicker');
	fromDate.datepicker({
		dateFormat : 'dd-mm-yy'
	});
	document.oncontextmenu = document.body.oncontextmenu = function() {
		return false;
	}
	$(document).keydown(function(event) {
		if (event.keyCode == 123) { // Prevent F12
			return false;
		} else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent
			// Ctrl+Shift+I
			return false;
		}
	});
	// $("#datepicker").datepicker("setDate", new Date());
	// $("#datepicker").val("31-07-2017");
	dateclo = $("#datepicker").val();
	// fetchClodata(dateclo);
	
	loadCLOWGrid("");

});
function enableField() {
	if (document.getElementById("opt_cheq_type").value != 0) {
		document.getElementById("cheqNo").value = "";
		document.getElementById("sortCode").value = "";
		document.getElementById("amount").value = "";
		document.getElementById("datepicker").value = "";
		document.getElementById("clearingtype").value = 0;
		document.getElementById("cheqNo").disabled = false;
		document.getElementById("sortCode").disabled = false;
		document.getElementById("amount").disabled = false;
		document.getElementById("clearingtype").disabled = false;
		document.getElementById("fetchbutton").disabled = false;
		document.getElementById("datepicker").disabled = false;
		// $("#datepicker").val();
		myGrid__clow.clearAll();
	} else {

		document.getElementById("cheqNo").value = "";
		document.getElementById("sortCode").value = "";
		document.getElementById("amount").value = "";
		document.getElementById("datepicker").value = "";
		document.getElementById("clearingtype").value = 0;
		document.getElementById("cheqNo").disabled = true;
		document.getElementById("sortCode").disabled = true;
		document.getElementById("amount").disabled = true;
		document.getElementById("clearingtype").disabled = true;
		document.getElementById("fetchbutton").disabled = true;
		document.getElementById("datepicker").disabled = true;
		// $("#datepicker").val();
		myGrid__clow.clearAll();

	}

}
function fetchClorecord() {
	var session_loginid = document.getElementById("session_loginid").value;
	if (session_loginid == 'null') {
		alert("Your Session Has Been Expired. Please Login Again.");
		/*var baseurl = baseurl + "login.jsp?flag=1";
		location.replace(baseurl);*/
		menuOnClick("login.jsp");

	} else {
		var date = document.getElementById("datepicker").value;
		var cheqNo = document.getElementById("cheqNo").value;
		var sortCode = document.getElementById("sortCode").value;
		var amount = document.getElementById("amount").value;
		var clearingtype = document.getElementById("clearingtype").value;
		var cheqtype = document.getElementById("opt_cheq_type").value;

		document.getElementById("waiting").style.display = ' ';
		var urlbase = document.URL;
		var p = urlbase.lastIndexOf('/');
		urlbase = urlbase.substr(0, p + 1);

		urlbase = urlbase + "jsp/fetch_pastChequeData.jsp?chqDtl=" + date
				+ "&cheqNo=" + cheqNo + "&sortCode=" + sortCode + "&amount="
				+ amount + "&clearingtype=" + clearingtype + "&cheqtype="
				+ cheqtype;
		cts_ajax_fetch_pastChequeData(urlbase)

	}

}
function cts_ajax_fetch_pastChequeData(url) {
	// alert('cts_ajax_getImageName');
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_fetch_pastChequeData;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			req.onreadystatechange = cts_process_fetch_pastChequeData;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}
function cts_process_fetch_pastChequeData() {

	if (req.readyState == 4) {
		if (req.status == 200) {
			var res = req.responseText;

			Entries = JSON.parse(res).ENTRIES;
			if (Entries != "NO DATA") {
				loadCLOWGrid(Entries);
			} else {
				alert("NO Data Found for given Criteria");

			}

		} else {
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			// document.getElementById("waiting").style.display = 'none';
		}
	}

}

function loadCLOWGrid(lodclowdata) // loadClowGrid
{
	// CLO_CHQNO, CLO_SORTCD, CLO_TRANCD, CLO_AMOUNT, CLO_PAYEE_ACCNO,
	// CLO_PAYEE_ACCNM,
	// CLO_DRAWEE_ACCNO, CLO_BRANCH_CD, CLO_CLEARINGTYPE
	myGrid__clow = new dhtmlXGridObject('addclogrid');
	myGrid__clow.setImagePath("codebase/imgs/");
	var cheqtype = document.getElementById("opt_cheq_type").value;
	if (cheqtype == 'clearingOutward') {
		myGrid__clow
				.setHeader("Clearing Date,Cheque No.,Sort Code,Tran Code,Branch Code,"
						+ "Amount(In Paisa),"
						+ "Payee Account No.,Payee Name,Drawee Account No.,Clearing Type,Return Status,Status,View Details,Image Name");

		myGrid__clow
				.setColumnIds("CLO_DDMMYYYY,CLO_CHQNO,CLO_SORTCD,CLO_TRANCD,CLO_BRANCH_CD,CLO_AMOUNT,"
						+ "CLO_PAYEE_ACCNO,CLO_PAYEE_ACCNM,CLO_DRAWEE_ACCNO,CLO_CLEARINGTYPE,RETURNSTATUS,STATUS,show_Report,IMGNM");

		myGrid__clow
				.setInitWidths("70,52,70,40,50,70,101,175,108,55,63,47,80,0");
		myGrid__clow.setColAlign("right,right,right,right,left,right,right,"
				+ "left,right,right,right,right,left,left");
		myGrid__clow.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
		myGrid__clow.attachEvent("onRowSelect", doOnRowSelected);
		myGrid__clow.init();
		myGrid__clow.parse(lodclowdata, "js");
		myGrid__clow.forEachRow(function(id) {

			myGrid__clow.cells(id, 12).setValue("View Details");
			myGrid__clow.setCellTextStyle(id, 12,
					"color:blue;font-weight:bold;");

		});
	}
	 else {
		myGrid__clow
				.setHeader("Clearing Date,Cheque No.,Sort Code,Tran Code,Branch Code,"
						+ "Amount(In Paisa),"
						+ "Payee Account No.,Payee Name,Drawee Account No.,Clearing Type,Return Status,View Details,Image Name");

		myGrid__clow
				.setColumnIds("CLO_DDMMYYYY,CLO_CHQNO,CLO_SORTCD,CLO_TRANCD,CLO_BRANCH_CD,CLO_AMOUNT,"
						+ "CLO_PAYEE_ACCNO,CLO_PAYEE_ACCNM,CLO_DRAWEE_ACCNO,CLO_CLEARINGTYPE,RETURNSTATUS,show_Report,IMGNM");

		myGrid__clow.setInitWidths("70,60,70,40,60,85,90,180,105,55,65,100,0");
		myGrid__clow.setColAlign("right,right,right,right,left,right,right,"
				+ "left,right,right,right,left,left");
		myGrid__clow.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
		myGrid__clow.attachEvent("onRowSelect", doOnRowSelected);
		myGrid__clow.init();
		myGrid__clow.parse(lodclowdata, "js");
		myGrid__clow.forEachRow(function(id) {

			myGrid__clow.cells(id, 11).setValue("View Details");
			myGrid__clow.setCellTextStyle(id, 11,
					"color:blue;font-weight:bold;");

		});
	}
	document.getElementById("waiting").style.display = 'none';
}
function doOnRowSelected(rowId, cellId) {
	var cheqtype = document.getElementById("opt_cheq_type").value;
	if (cheqtype == 'clearingOutward') {
		if (cellId == 12) {
			var reportPath = "", reportPath1 = "";
			var date = myGrid__clow.cells(rowId, 0).getValue();
			var brncd = myGrid__clow.cells(rowId, 4).getValue();
			var imgnm = myGrid__clow.cells(rowId, 13).getValue();
			// alert(date);
			var nwdate = date.split("/");
			nwdate = nwdate[0] + nwdate[1] + nwdate[2];
			// alert(nwdate);
			var path = document.getElementById("PATH").value;
		//	var cheqtype = document.getElementById("opt_cheq_type").value;
			var urlbase = document.URL;
			var p = urlbase.lastIndexOf('/');
			urlbase = urlbase.substr(0, p + 1);

			reportPath1 = urlbase + "Archive/" + nwdate
					+ "/uploadpath_to_CHI/" + brncd
					+ "/ClearingOutward/Images/" + imgnm;// +nwdate+".pdf";
			reportPath = urlbase + "OldClearingOutwardReport/" + nwdate
					+ "/ClearingOutward" + nwdate + ".pdf";

			document.getElementById('img_frnt').src = reportPath1;

			if (checkUrl(reportPath)) {
				window.open(reportPath);
			} else {
				alert("No Data found for given criteria");
			}
		}
	} 
else {
		if (cellId == 11) {

			var reportPath = "", reportPath1 = "";
			var date = myGrid__clow.cells(rowId, 0).getValue();
			var brncd = myGrid__clow.cells(rowId, 4).getValue();
			var imgnm = myGrid__clow.cells(rowId, 12).getValue();
			// alert(date);
			var nwdate = date.split("/");
			nwdate = nwdate[0] + nwdate[1] + nwdate[2];
			// alert(nwdate);
			var path = document.getElementById("PATH").value;
			var cheqtype = document.getElementById("opt_cheq_type").value;
			var urlbase = document.URL;
			var p = urlbase.lastIndexOf('/');
			urlbase = urlbase.substr(0, p + 1);
			
				reportPath1 = urlbase + "Archive/" + nwdate
						+ "/downloadpath_from_CHI/ClearingInward/Images/"
						+ imgnm + ".jpg";// +nwdate+".pdf";
				reportPath = urlbase + "OldClearingInwardReport/" + nwdate
						+ "/clearingInward" + nwdate + ".pdf";
			

			document.getElementById('img_frnt').src = reportPath1;

			if (checkUrl(reportPath)) {
				window.open(reportPath);
			} else {
				alert("No Data found for given criteria");
			}
		}
	}

}

function checkUrl(url) {
	var request = false;

	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest;
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHttp");
	}
	// alert(url+"=="+request);
	if (request) {
		request.open("HEAD", url, false);
		request.send();
		if (request.status == 200) {
			return true;
		}

	}

	return false;
}


function onReset() {
	//location.replace("searchPastCheques.jsp");
	document.getElementById("formid").action="searchPastCheques.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();
}
