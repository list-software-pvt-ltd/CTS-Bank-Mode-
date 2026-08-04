// JavaScript Document

function onload_cleOutward_response()
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
		var d=document.getElementById("menu_response");
		d.className = ' active';
		var val=document.getElementById("hdMsg1").value;
		var retStr=document.getElementById("retStr").value;
		//alert("val :"+val+"     retStr="+retStr);
		if(val!="N")
		{
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			//location.replace(url);
			document.getElementById("formid").action="cleOutward_resFile.jsp";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").submit();
		}
		else if(retStr=="SUCCESS")
		{			
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/list_res_cleOutward_filenames.jsp";
			cts_Ajax_list_res_cleOutward_filenames(baseurl);
		}
	}
}
function uploadFiles()
{	
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		menuOnClick("login.jsp");
	}
	else
	{
		var totfile="";
		var inp = document.getElementById('file_pick');
		for (var i = 0; i < inp.files.length; ++i)
		{
		  var name = inp.files.item(i).name;			
		  totfile=name+"#"+totfile;
		}			
		$("#filenames").val(totfile);
	
	if(document.getElementById("file_pick").value=="")
	{
		alert('Please Select File.');
		return false;
	}
	else
	{
			document.getElementById("formid").action="ClrOutwardRespController";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").enctype="multipart/form-data";
			document.getElementById("formid").submit();
	}
 }
}
function cts_Ajax_list_res_cleOutward_filenames(url)
{
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list_res_cleOutward_filenames;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list_res_cleOutward_filenames;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_list_res_cleOutward_filenames()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			//alert("res:"+res);
			show_res_cleOutward_filenames(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function show_res_cleOutward_filenames(res)
{
			//alert(res);
			
			var res1=JSON.parse(res);
			
			if(res1.RETCODE==1)
			{
				alert("Files Not Available.");
				//document.getElementById("submitbutton").disabled = true;
				document.getElementById("waiting").style.display='none';
			}
			else
			{
				//alert(res1+"==="+res.data);
					document.getElementById("divhide").style.display = '';
				document.getElementById("submitbutton").disabled = false;
				document.getElementById("waiting").style.display='none';
				loadFileListGrid(res1);
		
			}
			document.getElementById("waiting").style.display='none';
	}

	

function read_cleOutward_response()
{

	var session_loginid = document.getElementById("session_loginid").value;
		if(session_loginid == "null")
		{

			alert("Your Session Has Been Expired. Please Login Again.");
			
			menuOnClick("login.jsp");
		}
		else
		{
			//alert("in download_return_inward()");
			var val=document.getElementById("hdMsg1").value;
			//alert(val);
			if(val!="N")
			{//1				
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
					
					var jsonString = JSON.stringify(dataArr);
					document.getElementById("jsonString").value =jsonString;
					document.getElementById("waiting").style.display='';
					document.getElementById("formid").action="cleOutward_resFileData.jsp";//"jsp/cleOutward_resFile.jsp";
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


