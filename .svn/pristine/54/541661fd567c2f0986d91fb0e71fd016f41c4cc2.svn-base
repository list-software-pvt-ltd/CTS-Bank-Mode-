// JavaScript Document

function onload_return_inward()
{
	//alert("in onload_return_inward()");

	
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
		var d=document.getElementById("menu_return_inward");
		d.className = ' active';
		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);

		if(val!="N")
		{
			alert(val);
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			location.replace(url);
		}
		else
		{
			//alert("list_ret_inward_filenames"); \CTS\downloadpath_from_CHI\ReturnInward
			//document.getElementById("waiting").style.display='';
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/list_ret_inward_filenames.jsp";
			//location.replace(baseurl);
			cts_Ajax_list_ret_inward_filenames(baseurl);
		}
	}
}
function cts_Ajax_list_ret_inward_filenames(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list_ret_inward_filenames;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list_ret_inward_filenames;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_list_ret_inward_filenames()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			//alert("res:"+res);
			show_ret_inward_filenames(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function show_ret_inward_filenames(res)
{
	//alert("show_ret_inward_filenames()"+res);

	var ul = document.getElementById('ul_list');

	if(res.length>1)
	{
		//alert(rec);
		var data =res.split("$");
		//alert("data.length:"+data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			//alert("bclist[1]"+bclist[1]);
			if(bclist[1]=="NOFILES")
			{
				alert("Files Not Available.");
				document.getElementById("submitbutton").disabled = true;
				document.getElementById("waiting").style.display='none';
			}
			else
			{
				document.getElementById("submitbutton").disabled = false;
				document.getElementById("waiting").style.display='none';
				if(bclist[1].indexOf(".txt")==-1)
				{
					var li=document.createElement('li');
					ul.appendChild(li);
					li.innerHTML=li.innerHTML + bclist[1];
				}
			}
		}
	}
	document.getElementById("waiting").style.display='none';
}
function download_return_inward()
{

	var session_loginid = document.getElementById("session_loginid").value;
		if(session_loginid == "null")
		{

			alert("Your Session Has Been Expired. Please Login Again.");
			var baseurl=document.URL;
			var p=baseurl.lastIndexOf('/');
			baseurl=baseurl.substr(0,p+1);
			baseurl=baseurl+"login.jsp?flag=1";
			location.replace(baseurl);
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
