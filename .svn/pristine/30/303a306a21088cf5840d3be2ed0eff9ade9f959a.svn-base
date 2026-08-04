var imagedata="";
var cnt=0;
var gridcnt=0;
var imagePath="";
var amount=0;
var specialClearingType="21";
var flgCheck=false;
function onload_inward_clearing()
{
	var session_loginid = document.getElementById("session_loginid").value;
	document.getElementById("waiting").style.display='';
	if(session_loginid == "null")
	{
		alert("Your Session Has Been Expired. Please Login Again.");		
		menuOnClick("login.jsp")
	}
	else
	{
		var d=document.getElementById("menu_inward_clearing");
		d.className = ' active';
		//alert("list_inward_filenames"); CTS\downloadpath_from_CHI\ClearingInward
		var url=document.URL;
		var p=url.lastIndexOf('/');
		baseurl=url.substr(0,p+1);
		baseurl=baseurl+"jsp/list_inward_downlodFile.jsp";
		//location.replace(baseurl);
		cts_Ajax_list_inward_filenames(baseurl);
	}
}

function cts_Ajax_list_inward_filenames(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list_inward_filenames;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list_inward_filenames;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}
function cts_process_list_inward_filenames()
{
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			record=res;			
			show_inward_filenames(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function show_inward_filenames(res)
{
	document.getElementById("waiting").style.display='none';
	var ul = document.getElementById('ul_list');
	if(res.length>1)
	{
		var data =res.split("$");	
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data;			
			document.getElementById("waiting").style.display='none';
			var li=document.createElement('li');
			ul.appendChild(li);
			li.innerHTML=li.innerHTML + bclist[t] ;		
			
		}	
		
	}
}
