var clowdata;
var myGrid__clow;
var dateclo;
var fulldate;
var branches = [];
var Entries = [];
var pad = "00000";
var itemseqno;
$(document).ready(
		function() {
			var fromDate = $('#datepicker');
			fromDate.datepicker({
				dateFormat : 'dd-mm-yy'
			});
			$("#datepicker").datepicker("setDate", new Date());
			// $("#datepicker").val("31-07-2017");
			dateclo = $("#datepicker").val();
			fetchClodata(dateclo);
			loadCLOWGrid("");
			fulldate=dateclo.split('-')[0]+""+dateclo.split('-')[1]+""+dateclo.split('-')[2];
			
			$("#btnAddRow_relper").unbind('click').bind(
					'click',
					function(e) {
						var newId = myGrid__clow.getRowsNum();
						newId++;
						//alert((pad+"10").slice(-pad.length));
						itemseqno="M"+fulldate+(pad+newId).slice(-pad.length);
						myGrid__clow.addRow(newId, " ");

						for (i = 0; i < branches.length; i++) {

							myGrid__clow.getCombo(0).put(branches[i].BRM_BRNCD,
									branches[i].BRM_BRNNM);

						}
						myGrid__clow.cells(newId, 11).setValue('I');
						myGrid__clow.cells(newId, 10).setValue(itemseqno);
						myGrid__clow.setRowTextStyle(newId,"border-color:#a4bed4;");

					});

		});

function afterSave_COEntry() {
	// alert("in afterSave_config()");
	var flag; // = //beforeSaveCOEntry();
	// alert("flag:"+flag);
	// if(flag == 1)
	// {

	document.getElementById("formid").action = "jsp/save_CloEntry.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();
	// }
}

function fetchClodata(datecl) {
	var session_loginid = document.getElementById("session_loginid").value;
	if (session_loginid == 'null') {
		alert("Your Session Has Been Expired. Please Login Again.");
		//var baseurl = baseurl + "login.jsp?flag=1";
		//location.replace(baseurl);
		menuOnClick("login.jsp");
		
		/*var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp";
		location.replace(baseurl);*/
	} else {
		/*
		 * document.getElementById("clearingoutwardEntry").action="jsp/save_CloEntry.jsp";
		 * document.getElementById("clearingoutwardEntry").submit();
		 */
		document.getElementById("waiting").style.display = ' ';
		var urlbase = document.URL;
		var p = urlbase.lastIndexOf('/');
		urlbase = urlbase.substr(0, p + 1);
		// alert('baseurl:>>'+urlbase);
		urlbase = urlbase + "jsp/fetch_CloEntry.jsp?chqDtl=" + datecl;
		// alert('urlbase'+urlbase);
		// location.replace(urlbase);
		cts_ajax_getClodata(urlbase)
	}
}
function cts_ajax_getClodata(url) {
	//alert('cts_ajax_getImageName');
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_getClodata;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			req.onreadystatechange = cts_process_getClodata;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}// cts_ajax_getImageName(baseurl)
function cts_process_getClodata() {

	if (req.readyState == 4) {
		if (req.status == 200) {
			var res = req.responseText;

			// if()
			// {
		//	alert("222==" + JSON.stringify(res));
		//	alert("333==" + JSON.stringify(res.BRANCHES));
		//	alert("4444==" + JSON.stringify(JSON.parse(res).BRANCHES));
			branches = JSON.parse(res).BRANCHES;
			Entries = JSON.parse(res).ENTRIES;

			loadCLOWGrid(Entries);
			// }
			// else
			// {

			// }
		} else {
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display = 'none';
		}
	}

}// cts_process_getImageName
function loadCLOWGrid(lodclowdata) // loadClowGrid
{
	// var datartr = JSON.parse(lodclowdata);
	myGrid__clow = new dhtmlXGridObject('addclogrid');
	myGrid__clow.setImagePath("codebase/imgs/");
	// IRPM_CUSTID, IRPM_SRNO, IRPM_RLTD_PRSN_SRNO, IRPM_CANCEL_FLG, IRPM_KYCNO,
	// IRPM_PRSN_TYPE, IRPM_NAME, IRPM_ID_PROOF, IRPM_IDPROOF_NO,
	// IRPM_IDPROOF_EXPDT, IRPM_UPLOAD_STATUS, IRPM_ENTRY_BY, IRPM_ENTRY_DATE
	myGrid__clow
			.setHeader("Deposit Branch,Transaction Code,Branch Code,"
					+ "Cheque No.,MICR Code,Amount(In Paisa),"
					+ "Payee Account No.,Payee Name,Account No.,Clearing Type,Items Seq.No.,ISNEW");

	myGrid__clow
			.setColumnIds("CLO_BOFD,CLO_TRANCD,CLO_BRANCH_CD,"
					+ "CLO_CHQNO,CLO_SORTCD,CLO_AMOUNT,"
					+ "CLO_PAYEE_ACCNO,CLO_PAYEE_ACCNM,CLO_DRAWEE_ACCNO,CLO_CLEARINGTYPE,"
					+ "CLO_ITEMSEQNO,CLO_MANENTRY");

	myGrid__clow.setInitWidths("80,70,60,60,80,80," + "120,140,120,60,107,0");
	myGrid__clow.setColAlign("left,left,left,right,right,right,"
			+ "right,left,left,left,right,right");
	myGrid__clow.setColTypes("coro,ed,ro,ed,ro,ed," + "ed,ed,ed,coro,ed,ed");
	myGrid__clow.attachEvent("onEditCell", doOnCellEdit);
	myGrid__clow.init();
	myGrid__clow.getCombo(9).put("01", "CTS");
	myGrid__clow.getCombo(9).put("02", "Non CTS");
	
	myGrid__clow.parse(lodclowdata, "js");
	myGrid__clow.forEachRow(function(id)
	{
		myGrid__clow.setRowTextStyle(id,"border-color:#a4bed4;");
					 
	 });

}
function doOnCellEdit(stage, rowId, cellInd) {
	
	if (stage == 2) {
		if (cellInd == 0) {
		
			for (i = 0; i < branches.length; i++) {
				if (myGrid__clow.cells(rowId, 0).getValue() == branches[i].BRM_BRNCD) {
					myGrid__clow.cells(rowId, 2)
							.setValue(branches[i].BRM_BRNCD);
					myGrid__clow.cells(rowId, 4).setValue(
							branches[i].BRM_MICRCD);
				}

			}
		}
	}
	return true;
}

/*function showLogin() {
	// alert(1);
	var cookies = document.cookie.split(";");
	var loginstyle=document.getElementById("loginstyle").value;
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		// alert("cookie:"+cookie);
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}

	var url = document.URL;

	var p = url.lastIndexOf('/');

	baseurl = url.substr(0, p + 1);

	baseurl=baseurl+"jsp/invalidateSession.jsp?msg="+loginstyle;
	location.replace(baseurl);
}*/
function updateAllClorecord() {
	// alert(1111);
	var count = 0;
	var dataArr = [];
	myGrid__clow.forEachRow(function(id) {

		if (myGrid__clow.cells(id, 1).getValue().length < 4 ||myGrid__clow.cells(id, 1).getValue().length==0)// ==6)
		{
			if (myGrid__clow.cells(id, 3).getValue().length == 6) {

				dataArr.push({
					CLO_TRANCD : myGrid__clow.cells(id, 1).getValue(),
					CLO_BRANCH_CD : myGrid__clow.cells(id, 2).getValue(),
					CLO_CHQNO : myGrid__clow.cells(id, 3).getValue(),
					CLO_SORTCD : myGrid__clow.cells(id, 4).getValue(),
					CLO_AMOUNT : myGrid__clow.cells(id, 5).getValue(),
					CLO_PAYEE_ACCNO : myGrid__clow.cells(id, 6).getValue(),
					CLO_PAYEE_ACCNM : myGrid__clow.cells(id, 7).getValue(),
					CLO_DRAWEE_ACCNO : myGrid__clow.cells(id, 8).getValue(),
					CLO_CLEARINGTYPE : myGrid__clow.cells(id, 9).getValue(),
					CLO_ITEMSEQNO : myGrid__clow.cells(id, 10).getValue(),
					CLO_MANENTRY : myGrid__clow.cells(id, 11).getValue()
				});
				count++;

			} else {
				alert("Cheque Number Should Be 6 Digits");// "MICR Code Should
															// Be 9 Digits");
			}
		} else {
			alert("Transaction Code Should Be Maximum 3 Digits");//
		}
	});
	// alert("jsonString"+JSON.stringify(dataArr));
	document.getElementById("waiting").style.display = ' ';
	var urlbase1 = document.URL;
	var p1 = urlbase1.lastIndexOf('/');
	urlbase1 = urlbase1.substr(0, p1 + 1);
	// alert('baseurl:>>'+urlbase);
	urlbase1 = urlbase1 + "jsp/updateManCloRecord.jsp?jsonString="
			+ JSON.stringify(dataArr);
	//alert('urlbase===============' + urlbase1);
	// location.replace(urlbase);
	cts_ajax_SaveClodata(urlbase1)
	// location.replace("jsp/updateManCloRecord.jsp?jsonString="+JSON.stringify(dataArr));
}
function cts_ajax_SaveClodata(url) {
	//alert('cts_ajax_SaveClodata');
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_SaveClodata;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			req.onreadystatechange = cts_process_SaveClodata;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}// cts_ajax_getImageName(baseurl)
function cts_process_SaveClodata() {

	if (req.readyState == 4) {
		if (req.status == 200) {
			var res = req.responseText;

			// alert("4444=="+res);
			if (res.trim() == "UPDATESUCCESS") {

				alert("Record Update Successfully");
				//location.replace("clearingoutwardEntry.jsp");

			} else {
				alert("Record  Not Update Please Try Again.");
				//location.replace("clearingoutwardEntry.jsp");
			}

		} else {
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display = 'none';
		}
	}

}// cts_process_getImageName

