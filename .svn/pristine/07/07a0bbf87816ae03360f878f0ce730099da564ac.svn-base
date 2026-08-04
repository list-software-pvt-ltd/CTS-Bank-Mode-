var ret="NA";
function uploadFiles()
{	
	document.getElementById("divhide").style.display = 'none';
	var selected_file=document.getElementById("file_pick").value;
	var n =selected_file.length;
	var val=selected_file.lastIndexOf("RRF");
	selected_file = selected_file.substr(val, n);
	if(document.getElementById("file_pick").value=="")
	{
		alert('Please Select File.');
		return false;
	}
	else if(selected_file.indexOf("RRF") == -1)
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
function onload_retOutward_response()
{	
	document.getElementById("divhide").style.display = 'none';
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{
		alert("Your Session Has Been Expired. Please Login Again.");
		menuOnClick("login.jsp");
	}
	else
	{
		var val=document.getElementById("hdMsg1").value;
		ret=document.getElementById("ret").value;
		if(val!="N")
		{
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			document.getElementById("formid").action="retOutward_reFile.jsp";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").submit();
		}
		else if(ret=="SUCCESS")
		{
			document.getElementById("divhide").style.display = '';
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/list_res_retOutward_filenames.jsp";
			cts_Ajax_list_res_retOutward_filenames(baseurl);
		}
	}
}
function cts_Ajax_list_res_retOutward_filenames(url)
{
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list_res_retOutward_filenames;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list_res_retOutward_filenames;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}
function cts_process_list_res_retOutward_filenames()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			show_res_retOutward_filenames(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}
function show_res_retOutward_filenames(res)
{		
			var res1=JSON.parse(res);			
			if(res1.RETCODE==1)
			{
				alert("Files Not Available.");
				document.getElementById("submitbutton").disabled=true;
				document.getElementById("waiting").style.display='none';
			}
			else
			{
				document.getElementById("submitbutton").disabled=false;
				document.getElementById("waiting").style.display='none';
				loadFileListGrid(res1);		
			}
			document.getElementById("waiting").style.display='none';
	}
function read_returnOutward_response()
{

	var session_loginid = document.getElementById("session_loginid").value;
		if(session_loginid == "null")
		{

			alert("Your Session Has Been Expired. Please Login Again.");
			menuOnClick("login.jsp");
		}
		else
		{
			var val=document.getElementById("hdMsg1").value;
			if(val!="N")
			{
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
					alert("Select Atleast One Record With Correct Status!");
				}
				else
				{				
					
					var jsonString =JSON.stringify(dataArr);
					//alert(jsonString);
					document.getElementById("jsonString").value =encodeURI(jsonString);
					document.getElementById("waiting").style.display='';
					document.getElementById("formid").action="retOutward_resFileData.jsp";
					document.getElementById("formid").submit();
				}
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


