// JavaScript Document
var jsonstring;
var Flag="";
//var ret="";
function onload_cleInward_response()
{
	document.getElementById("yespickfile").style.display = 'none';
	document.getElementById("divhide").style.display = 'none';
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");		
		menuOnClick("login.jsp");
	}
	else
	{
		var d=document.getElementById("menu_return_inward");
		d.className = ' active';
		var val=document.getElementById("hdMsg1").value;
		var ret=document.getElementById("ret").value;
		if(val!="N")
		{
			alert(val);			
		}
		else
		{			
		    if(Flag.length==0 && ret.length==0)
		    {
				Flag="F";
				ret="NA";
			}
			else
			{
			  Flag="T";
			  ret=document.getElementById("ret").value;
			}  
				
			if(ret="NA" && Flag=="F")
			{
			  var val_alert=confirm("Do you want to pickup option for files/folder upload?");
			  if(val_alert==true)
			  {	 
				var d=document.getElementById("menu_inward_clearing");
				d.className = ' active';
				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/ReturnInwardFile_Backup.jsp";
				cts_Ajax_return_inward_filenames_backup(baseurl);
				
				document.getElementById("yespickfile").style.display = '';
				document.getElementById("divhide").style.display = 'none';	 
			  }
			  else
			  {
				ret="SUCCESS";			  
			  }
			} 
			else
			{		  
			  ret="SUCCESS";		 
			}						
			if(ret=="SUCCESS")
			{
				document.getElementById("divhide").style.display = '';
				document.getElementById("waiting").style.display='';
				document.getElementById("yespickfile").style.display = 'none';
				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/list_res_cleInward_filenames.jsp";
				cts_Ajax_list_res_cleInward_filenames(baseurl);
			}
		}
	}
}
function cts_Ajax_return_inward_filenames_backup(url)
{	
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_return_inward_filenames_backup;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_return_inward_filenames_backup;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}
function cts_process_return_inward_filenames_backup()
{
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;

			record=res;
			
			return_inward_file_backup(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}
function return_inward_file_backup(res)
{		
	if(res.length>1)
	{		
		if(res==true)
		ret="SUCCESS";	  
	}
}
function uploadFiles()
{	
	document.getElementById("divhide").style.display = 'none';
	var selected_file=document.getElementById("file_pick").value;
	var n =selected_file.length;
	var val=selected_file.lastIndexOf("BRF");
	selected_file = selected_file.substr(val, n);
	
	if(document.getElementById("file_pick").value=="")
	{
		alert('Please Select File.');
		return false;
	}
	else if(selected_file.indexOf(".xml") == -1 && selected_file.indexOf("BRF") == -1)
	{
		alert('Please Select Correct File.');
		return false;
	}
	else
	{
			document.getElementById("formid").action="ReturnOutwardController";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").enctype="multipart/form-data";
			document.getElementById("formid").submit();
	}
}
function cts_Ajax_call_res_cleInward_report(url)
{
	//alert(99);
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_call_res_cleInward_report;
		req.open("GET", url, true);
		req.send(null);
	}
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_call_res_cleInward_report;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}
function cts_process_call_res_cleInward_report()
{
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			var res1=JSON.parse(res);
			if(res1.RETCODE==1)
			{
				alert("Problem occurred while creating Memo Reports.Please Check Again.");
				document.getElementById("submitbutton").disabled = false;
				document.getElementById("waiting").style.display='none';
				document.getElementById("submitbutton").value="Recreate Memo Reports";
			}
			else{
				alert('File(s) Successfully Downloaded!');
				var CNF_RETINWMEMOSTYLE=document.getElementById("CNF_RETINWMEMOSTYLE").value;
				document.getElementById("waiting").style.display='none';
				if(CNF_RETINWMEMOSTYLE=='S')
					{
					
					document.getElementById("recordjsongrid").style.display='';
					loadrecListGrid(res1);
					document.getElementById("submitbutton").disabled = true;
					
					}
				else{
					//alert('File(s) Successfully Downloaded!');
					document.getElementById("recordjsongrid").style.display='none';
					document.getElementById("submitbutton").disabled = false;
					var url=document.URL;
					var p=url.lastIndexOf('/');
					baseurl=url.substr(0,p+1);
					baseurl=baseurl+"jsp/list_res_cleInward_filenames.jsp";
					//location.replace(baseurl);
					cts_Ajax_list_res_cleInward_filenames(baseurl);
				}
				
			}
			
			//show_res_cleInward_filenames(res);
		}
		else
		{
			alert("Problem occurred while creating Memo Reports.Please Check Again.");///name change
			document.getElementById("waiting").style.display='none';
			document.getElementById("submitbutton").value="Recreate Memo Reports";
		}
	}
}

function cts_Ajax_list_res_cleInward_filenames(url)
{
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list_res_cleInward_filenames;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list_res_cleInward_filenames;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_list_res_cleInward_filenames()
{
	//alert(111);
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			//alert("res:"+res);
			show_res_cleInward_filenames(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function show_res_cleInward_filenames(res)
{
			//alert(res);
			var res1=JSON.parse(res);
			
			if(res1.RETCODE==1)
			{
				alert("Files Not Available.");
				document.getElementById("submitbutton").disabled = true;
				document.getElementById("waiting").style.display='none';
			}
			else
			{
				//alert(res.data);
				document.getElementById("submitbutton").disabled = false;
				document.getElementById("waiting").style.display='none';
				loadFileListGrid(res1);
				//loadrecListGrid("");
		
			}
			document.getElementById("waiting").style.display='none';
	}

	

function read_cleInward_response()
{

	var session_loginid = document.getElementById("session_loginid").value;
		if(session_loginid == "null")
		{

			alert("Your Session Has Been Expired. Please Login Again.");
			/*var baseurl=document.URL;
			var p=baseurl.lastIndexOf('/');
			baseurl=baseurl.substr(0,p+1);
			baseurl=baseurl+"login.jsp?flag=1";
			location.replace(baseurl);*/
			menuOnClick("login.jsp");
		}
		else
		{
			//alert("in download_return_inward()");
			var val=document.getElementById("hdMsg1").value;
			//alert(val);
			if(val!="N")
			{//1
				//alert(val);
				/*var baseurl=document.URL;
				var p = baseurl.lastIndexOf("/?");
				baseurl = baseurl.substr(0,p+1);
				baseurl =baseurl +"login.jsp?flag=1";
				//alert("baseurl:"+baseurl);
				location.replace(baseurl);
				*/
				menuOnClick("login.jsp");
			}//1
			else
			{
				var count=0;
				var dataArr = [];
				myGrid.forEachRow(function(id) 
				{
					if(myGrid.cells(id,1).getValue()==1)
					{
						dataArr.push({	
							FILE_NAME: myGrid.cells(id,0).getValue()
							});
						count++;
					}
				});
				
				if(count==0)
				{
					alert("Select Atleast One File !");
				}
				else
				{				
					
					var jsonString = JSON.stringify(dataArr);
					//alert("----------"+jsonString);
					document.getElementById("jsonString").value =jsonString;
					//jsonstring=jsonString;
					document.getElementById("waiting").style.display='';
					var url=document.URL;
					var p=url.lastIndexOf('/');
					baseurl=url.substr(0,p+1);
					baseurl=baseurl+"jsp/download_Res_Retinward.jsp?jsonString="+jsonString;//jsonString=+jsonString;
					//location.replace(baseurl);
					cts_Ajax_download_Res_Retinward(encodeURI(baseurl));//encodeURI(
					
					/*document.getElementById("response_read").action="jsp/download_Res_Retinward.jsp";
					document.getElementById("response_read").submit();*/
				}
		     }
		}
}

function cts_Ajax_download_Res_Retinward(url)
{
	//alert('in cts_Ajax_download_Res_Retinward with=='+url);
	if (window.XMLHttpRequest)
	{
		//alert('before ajax XMLHttpRequest');
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_download_Res_Retinward;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		//alert('before ajax ActiveXObject');
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			///alert('before ajax');
			req.onreadystatechange =  cts_process_download_Res_Retinward;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_download_Res_Retinward()
{
	//alert("res:"+res);///yet nahi parat ajax call
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			
			//var res1=JSON.parse(res);
			//alert("res:"+res);
              // alert("newww");
			
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/call_res_cleInward_report.jsp?jsonString="+document.getElementById("jsonString").value;
			//location.replace(baseurl);
			cts_Ajax_call_res_cleInward_report(encodeURI(baseurl));
			
			//document.getElementById("waiting").style.display='none';
			//show_res_cleInward_filenames(res);
		}
		else
		{
			alert("Problem occurred while Downloading file.Please Check Again.1111");///name change
			document.getElementById("waiting").style.display='none';
		}
	}
}

var myGrid;
function loadFileListGrid(response) 
{
	//alert(response);
	var data = response;
	myGrid = new dhtmlXGridObject('filejsongrid');		
	myGrid.setImagePath("codebase/imgs/");	
	myGrid.setHeader("File Name, Select",null,["text-align:left;","text-align:center"]);
	myGrid.setColumnIds("FILENAME,onSelect");
	myGrid.setInitWidths("300,100");	
	myGrid.setColAlign("left,center");
	myGrid.setColTypes("ro,ch");
	myGrid.setColSorting("str,str");
	myGrid.init();		
	myGrid.parse(data,"js");	
	
}

var myGridrec;
function loadrecListGrid(response) 
{
	//alert(response);
	var data = response;
	myGridrec = new dhtmlXGridObject('recordjsongrid');		
	myGridrec.setImagePath("codebase/imgs/");	
	myGridrec.setHeader("Sr No,Cheque No,Sort code,Amount(In Rs.),Return Reason,Item SeqNo, Memo Report,Image Name",null,["text-align:left;","text-align:left;","text-align:left;","text-align:left;","text-align:left;","text-align:left;","text-align:center","text-align:center"]);
	myGridrec.setColumnIds("SRNO,CHEQUENO,SORTCODE,AMOUNT,RETURNRESGN,ITEMSEQNO,show_report,PATH");
	myGridrec.setInitWidths("40,90,90,90,170,110,110,0");	
	myGridrec.setColAlign("left,left,left,left,left,left,center,center");
	myGridrec.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro");
	myGridrec.attachEvent("onRowSelect", doOnRowSelected);
	myGridrec.init();		
	myGridrec.parse(data,"js");	
	myGridrec.forEachRow(function(id) 
	{
		myGridrec.cells(id, 6).setValue("View Report");
		myGridrec.setCellTextStyle(id, 6,"color:blue;font-weight:bold;");
		if (myGridrec.cellById(id,3).getValue().length >0)
		 {
			var am=Number(myGridrec.cellById(id,3).getValue());
			myGridrec.cellById(id,3).setValue(((am*1)/100).toFixed(2))
		 }
	});
	
	
}

function doOnRowSelected(rowId, cellId) {
	if (cellId == 6) {
		
		var reportpath = myGridrec.cells(rowId, 7).getValue();
		var reportPath1;
		var urlbase = document.URL;
			var p = urlbase.lastIndexOf('/');
			urlbase = urlbase.substr(0, p + 1);

			reportPath1 = urlbase+reportpath;
			
		//alert(reportPath1);
		if (checkUrl(reportpath)) {
			window.open(reportpath);
		} else {
			alert("No Data found for given criteria");
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
function download_return_inward()
{

	var session_loginid = document.getElementById("session_loginid").value;
		if(session_loginid == "null")
		{

			alert("Your Session Has Been Expired. Please Login Again.");
			/*var baseurl=document.URL;
			var p=baseurl.lastIndexOf('/');
			baseurl=baseurl.substr(0,p+1);
			baseurl=baseurl+"login.jsp?flag=1";
			location.replace(baseurl);*/
			menuOnClick("login.jsp");
		}
		else
		{
			//alert("in download_return_inward()");
			var val=document.getElementById("hdMsg1").value;
			//alert(val);
			if(val!="N")
			{//1
				alert(val);
				var baseurl=document.URL;
				var p = baseurl.lastIndexOf("/?");
				baseurl = baseurl.substr(0,p+1);
				baseurl =baseurl +"return_inward.jsp";
				//alert("baseurl:"+baseurl);
				location.replace(baseurl);

			}//1
			else
			{

				/*	var url=document.URL;
					var p=url.lastIndexOf('/');
					baseurl=url.substr(0,p+1);
					baseurl=baseurl+"jsp/downloadReturnInword.jsp";
					location.replace(baseurl);
					*///cts_AjaxData3(baseurl);
//					alert('********** 222 **** ');
					document.getElementById("waiting").style.display='';
					document.getElementById("formid").action="jsp/downloadReturnInword.jsp";
					document.getElementById("formid").submit();

		     }
		}
}