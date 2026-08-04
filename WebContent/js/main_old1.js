var allConfigVar='';
function doOnMainload()
{
	//alert("in doOnProgramload()");	
	var val=document.getElementById("hdMsg1").value;
	var d=document.getElementById("menu_home");
	d.className = ' active';
	
	
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
}

/**********		START Outward Clearing		********************/
function toggle_out_clearing(source) 
{ 
  	var table = document.getElementById("tab_out_chq");
	var rowCount = table.rows.length;
	
	for(var i=1; i<rowCount; i++) 
	{
		var row = table.rows[i];
		//alert("row :"+row);	
		var chkbox = row.cells[2].childNodes[0];	
		//alert("chkbox :"+chkbox.checked);
		chkbox.checked = source.checked;
	}	
}

function chk_selected_outward_chqs()
{
	//alert("in chk_selected_outward_chqs");
	var table = document.getElementById("tab_out_chq");
	var rowCount = table.rows.length;
	var sel_cnt = 0;
	for(var i=1; i<rowCount; i++) 
	{
		var row = table.rows[i];
		//alert("row :"+row);	
		var chkbox = row.cells[2].childNodes[0];	
		//alert("chkbox :"+chkbox.checked);

		var obj=document.getElementById("txt_chqno"+i);
		
		if(true == chkbox.checked) 
		{
			sel_cnt ++;
		}
	}	
	//alert("sel_cnt:"+sel_cnt+"\nrowCount-1:"+(rowCount-1));
	var chkbox = document.getElementById("chk_selall");	
	if(sel_cnt != (rowCount-1))
	{
		//alert("in if.........");
		
		//alert("chkbox :"+chkbox.checked);
		if(true == chkbox.checked)
		{
			chkbox.checked = false;
		}
		
	}
	else
	{
		chkbox.checked = true;
	}
}

function getClearingOutwardFile()
{
	//alert("in getClearingOutwardFile()");	
	var d=document.getElementById("menu_outward_clearing");
	d.className = ' active';
	
	var session_user_role = document.getElementById("session_user_role").value;
	
	
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
		var hdMsg1=document.getElementById("hdMsg1").value;
		//alert('hdMsg1:==>'+hdMsg1);
		if(session_user_role == 'M')
		{
			//alert("hide btn");
			//document.getElementById("btn_upload").style.visibility = false;
			document.getElementById("submitbutton").style.display='none';
		}
		//alert("1111	hdMsg1:"+hdMsg1);
		if(hdMsg1!="N")
		{
			if(hdMsg1=="FIRSTTIME" || hdMsg1=="SUCCESS")
			{
				
				document.getElementById("waiting").style.display='';
				var doICallMerge=document.getElementById("hd_doICallAjax").value;		
				//alert(doICallMerge);
				if(doICallMerge=="Y")
				{
					//alert('*****************');
					var url=document.URL;
					var p=url.lastIndexOf('/');
					baseurl=url.substr(0,p+1);
					baseurl=baseurl+"jsp/getClearingOutwardFile.jsp";
					//location.replace(baseurl);
					cts_AjaxData0(baseurl);
				}
				else
				{
					fetch_outward_cheques();
				}
			}
			else
			{
				//alert(hdMsg1);//show message:Cheque might be faulty
				/*var baseurl=document.URL;
				var p=baseurl.indexOf('?');
				baseurl=baseurl.substr(0,p);
				//baseurl=baseurl+"outward_clearing.jsp";
				location.replace(baseurl);*/
				fetch_outward_cheques();
			}
		}
	}

}

function cts_AjaxData0(url)
{	
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process0;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process0;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process0()
{
 
  if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			//alert("res:"+res);
			if(res.indexOf('SUCCESS') > -1)
			{
				fetch_outward_cheques();
			}
			else
			{
				//alert(res.trim());
				document.getElementById("waiting").style.display='none';
				var baseurl=document.URL;
				var p=baseurl.indexOf('?');
				baseurl=baseurl.substr(0,p);
				//baseurl=baseurl+"outward_clearing.jsp";
				location.replace(baseurl);
			}
		}
		else
		{
			//alert("res:"+res);
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}


function fetch_outward_cheques()
{
	//alert("in fetch_outward_cheques()");	
	//call here getClearingOutwardFile.jsp
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

		var val=document.getElementById("hdMsg1").value;
		//alert("Abhishek------"+val);
		if(val!="N")
		{//1
	
			if(val.indexOf("SUCCESS") > -1 || val.indexOf("FIRSTTIME")>-1 || val.indexOf("Cheque")>-1)
			{
				//alert("33333 before   cts_AjaxData1() val:"+val);
				//var success_cnt = val.split("~")[1];
				if(val.indexOf("SUCCESS") > -1)
				{
					alert("Cheque(s) Uploaded Successfully!");
					document.getElementById("waiting").style.display='none';
				}

				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/fetch_outward_cheques.jsp";
				//location.replace(baseurl);
				cts_AjaxData1(baseurl);
				
			}
			else
			{
				//alert("********"+val);
				alert(val);
				document.getElementById("waiting").style.display='none';
			}
		}//1
		else
		{
			//alert("********");
			var baseurl=document.URL;
			var p = baseurl.lastIndexOf("?");   
			baseurl = baseurl.substr(0,p);
			//alert("baseurl:"+baseurl);
			location.replace(baseurl);
		}
	}
}

function cts_AjaxData1(url)
{	
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process1;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process1;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process1()
{
		//alert(".....req.status:"+req.status);
 
 	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			
			record=res;		
			//alert("res:"+res);
			setData_outwardchqs(res);	
			//allvehres=res;
			
			var rcnt=document.getElementById("rcnt").value;
			//alert(rcnt);
			if(rcnt>18)
			{
				//alert("in if");
				var div_out_chq=document.getElementById("div_out_chq");
				div_out_chq.style.overflow="scroll";
				div_out_chq.style.height="100%";
			}
			else
			{
				var div_out_chq=document.getElementById("div_out_chq");
				div_out_chq.style.overflow="inherit";
				div_out_chq.style.height="100%";
			}
		
				
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function setData_outwardchqs(rec)
{
	//alert(rec);
	var hdMsg1=document.getElementById("hdMsg1").value;
	rec = rec.trim();
	var rcnt=document.getElementById("rcnt").value;
	/*if(rcnt>1)
	{
		resetRows();	
	}*/
	if(rec.length>1)
	{
		//alert(rec);
		var data =rec.split("$");
		//alert("data.length:"+data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			//alert("bclist[1]"+bclist[1]);
			if(bclist[1]=="NOCHEQUE" && hdMsg1=="FIRSTTIME" )
			{
				alert("Cheques Not Available!");
				document.getElementById("waiting").style.display='none';
			}
			else if(bclist[1]=="NOCHEQUE" && hdMsg1=="SUCCESS" )
			{
				alert("All Cheques Uploaded!");
				document.getElementById("waiting").style.display='none';
			}
			else
			{
				//alert("in else...");
				var rcnt=document.getElementById("rcnt").value;
				//alert(rcnt);
				addRows_outwardchqs('tab_out_chq');
				
				
				
			}
		}
		
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");		
			var rcnt=t+1;	
			
//alert("bclist[0]:"+bclist[0]+"\nbclist[1]:"+bclist[1]+"\nbclist[2]:"+bclist[2]);	
			//alert("bclist[3]:"+bclist[3]+"\nbclist[4]:"+bclist[4]);
			document.getElementById("txt_chqno"+rcnt).value=bclist[0]+"_"+bclist[1]+":"+bclist[2];
				
		}
	}
	document.getElementById("sel_chq1").click();
	enlargeCheque_outwardchqs('img_frnt');
}

function addRows_outwardchqs(tableID)
{
	var session_user_role = document.getElementById("session_user_role").value;
	
	
		var table=document.getElementById(tableID);
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		//alert(rowCount);
		
		var row = table.insertRow(rowCount);
		
		var cell1 = row.insertCell(0);
		cell1.style.width="70%";
		var element1 = document.createElement("input");
		element1.type = "text";
		element1.style.border="none";
    	element1.style.background="transparent";
		element1.name="txt_chqno"+rcnt;
		element1.id="txt_chqno"+rcnt;
		element1.value=rcnt;
		element1.size="35";
		element1.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell1.appendChild(element1);
		
		var cell2 = row.insertCell(1);
		cell2.style.width="15%";
		cell2.align="center";
		var element2 = document.createElement("input");
		element2.id="sel_chq"+rcnt;
		element2.name="sel_chq";
		element2.type = "radio";
		//element2.style.width="100%";
		element2.onclick=function (){fetchValues_outwardchqs();};
		cell2.appendChild(element2);	
		
		
		var cell3 = row.insertCell(2);
		cell3.style.width="15%";
		cell3.align="center";
		var element3 = document.createElement("input");
		element3.id="chk_chq"+rcnt;
		element3.name="chk_chq";
		element3.type = "checkbox";
		element3.onclick=function (){chk_selected_outward_chqs();};
		if(session_user_role.indexOf("C") > -1)
		{
			cell3.appendChild(element3);			
		}
		
		
		rcnt=rcnt*1+1;
		document.getElementById("rcnt").value=rcnt;		
		document.getElementById("waiting").style.display='none';
		

}

function fetchValues_outwardchqs()
{
	//alert("in fetchValues_outwardchqs()");
		
	 var table = document.getElementById("tab_out_chq");
	 var rowCount = table.rows.length;
	//alert("rowCount	:"+rowCount);
	 var color;
 
	 for(var i=1; i<rowCount; i++) 
	 {
		 
				//alert("in for");
				var row = table.rows[i];
				//alert("row :"+row);	
				var radio = row.cells[1].childNodes[0];	
				//alert("radio :"+radio.checked);
				
				var j=i;
				var obj=document.getElementById("txt_chqno"+i);
				color="##"+obj.style.background+"##";
				//alert("color::"+color);
				if(true == radio.checked && color!='##rgb(255, 204, 204)##') 
				//if(true == radio.checked) 
				{
					//alert("in if");				
						//document.getElementById("center_wait").style.display='';
						document.getElementById("txt_chqno"+i).style.background = '#66CC99';
						//alert("selected chq :"+document.getElementById("txt_chqno"+i).value);
						var chq_dtl=document.getElementById("txt_chqno"+i).value;
						var chq_no = chq_dtl.split(':')[0];
						//alert("chq_no : "+chq_no);
						document.getElementById('img_enlarged').src = null;
						
						
						//var hd_up_path = document.getElementById("hd_up_path").value;
						//alert("hd_up_path:"+hd_up_path);
						var session_branch_code = document.getElementById("session_branch_code").value;
						//alert("session_branch_code:"+session_branch_code);
						 var url = document.URL;
						 var p = url.lastIndexOf('/');
						 imgpath = url.substr(0,p+1);
						 
						 /*imgpath = imgpath +"/uploadpath_to_CHI/"+session_branch_code+"/";*/
//\\172.100.30.56\d\Apache6\Apache6\webapps\CTS\uploadpath_to_CHI\9\ClearingOutward\Images						 
						 imgpath = imgpath +"/uploadpath_to_CHI/"+session_branch_code+"/ClearingOutward/Images/";
						//alert("imgpath:"+imgpath);
					
						
						document.getElementById('img_frnt').src = imgpath+"f_"+chq_no+"_G.jpg";
						document.getElementById('img_back').src = imgpath+"r_"+chq_no+"_G.jpg";
						
						document.getElementById("sel_chq"+i).style.background = '#66CC99';
						var baseurl1=document.URL;
						var p=baseurl1.lastIndexOf('/');
						baseurl1=baseurl1.substr(0,p+1);
						
				}
				else
				{
					
					//alert("in elser"+color);
					if(color!='##rgb(255, 204, 204)##')
					{
						document.getElementById("txt_chqno"+i).style.background = '#d5d5e5';
						document.getElementById("sel_chq"+i).style.background = '#d5d5e5';
					}
				}
	}
	
}

function enlargeCheque_outwardchqs(chq_type)
{
	//alert("in enlargeCheque() chq_type:"+chq_type);
	var session_branch_code = document.getElementById("session_branch_code").value;
	//alert("session_branch_code:"+session_branch_code);
	var url=document.getElementById(chq_type).src;
	//alert("url:"+url);
	//"uploadpath_to_CHI/9/ClearingOutward/Images/f_094966_416211001.tif"
	var p=url.indexOf('uploadpath_to_CHI/'+session_branch_code+'/ClearingOutward/Images/');
	imgurl=url.substr(p);
	//alert("imgurl:"+imgurl);
	
	document.getElementById('img_enlarged').src = null;
	document.getElementById('img_enlarged').src = imgurl;
}

function save_con_outwardchqs()
{
	//save and convert outward return cheques
	//alert("in save_con_outwardchqs()");
	document.getElementById("waiting").style.display='';
	var table = document.getElementById("tab_out_chq");
	var rowCount = table.rows.length;
	var chqs = '', chq_no = '',all_chq = '';
	var sel_cnt = 0;
	var flag = 'OK';
	for(var i=1; i<rowCount; i++) 
	{
		var row = table.rows[i];
		//alert("row :"+row);	
		var chkbox = row.cells[2].childNodes[0];	
		//alert("chkbox :"+chkbox.checked);
		var obj=document.getElementById("txt_chqno"+i);
		
		if(true == chkbox.checked) 
		{
			sel_cnt ++;
			var sel_chq = obj.value.split(':')[0];
			if(all_chq.indexOf(sel_chq) > -1)
			{
				flag = 'DUPLICATE';
			}
			//all_chq = "f_"+sel_chq+".tif"+"!@!"+"r_"+sel_chq+".tif"+"!@!"+"f_"+sel_chq+"_G.jpg" + "!@!";
			all_chq = "f_"+sel_chq+".tif"+"!@!";//+"r_"+sel_chq+".tif"+"!@!"+"f_"+sel_chq+"_G.jpg" + "!@!";
			/*
			all_chq = "f_121952"
			*/
			chqs = chqs + all_chq;
			//chq_no = chq_no +sel_chq+"!@!";
		}
	}
	//alert("chqs :"+chqs);
	//alert("chq_no :"+chq_no);
	//alert("sel_cnt::"+sel_cnt);
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
		if(sel_cnt == 0)
		{
			alert("Please Select Cheque(s) To Upload.");
			document.getElementById("waiting").style.display='none';
		}
		else
		{
			if(flag == 'DUPLICATE')
			{
				alert("Duplicate Cheque Number Selected.");
				document.getElementById("waiting").style.display='none';
			}
			else
			{
				document.getElementById("formid").action="jsp/UploadServlet.jsp?fileName="+chqs;					
				document.getElementById("formid").submit();
				document.getElementById("waiting").style.display='none';
			}
		}
	}
	
}

/***********************END	Outward Clearing **********************************/



/***********************START Inward Clearing **********************************/
function toggle_in_clearing(source) 
{ 
  	var table = document.getElementById("tab_in_chq");
	var rowCount = table.rows.length;
	
	for(var i=1; i<rowCount; i++) 
	{
		var row = table.rows[i];
		//alert("row :"+row);	
		var chkbox = row.cells[2].childNodes[0];	
		//alert("chkbox :"+chkbox.checked);
		chkbox.checked = source.checked;

	}	
}

function chk_selected_inward_chqs()
{
	//alert("in chk_selected_inward_chqs");
	var table = document.getElementById("tab_in_chq");
	var rowCount = table.rows.length;
	var sel_cnt = 0;
	for(var i=1; i<rowCount; i++) 
	{
		var row = table.rows[i];
		//alert("row :"+row);	
		var chkbox = row.cells[2].childNodes[0];	
		//alert("chkbox :"+chkbox.checked);

		var obj=document.getElementById("txt_chqno"+i);
		
		if(true == chkbox.checked) 
		{
			sel_cnt ++;
		}
	}	
	//alert("sel_cnt:"+sel_cnt+"\nrowCount-1:"+(rowCount-1));
	var chkbox = document.getElementById("chk_selall");	
	if(sel_cnt != (rowCount-1))
	{
		//alert("in if.........");
		
		//alert("chkbox :"+chkbox.checked);
		if(true == chkbox.checked)
		{
			chkbox.checked = false;
		}
		
	}
	else
	{
		chkbox.checked = true;
	}
}

function onload_inward_clearing()
{	

	var d=document.getElementById("menu_inward_clearing");
	d.className = ' active';
	
	var session_loginid = document.getElementById("session_loginid").value;
	document.getElementById("waiting").style.display='';
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
		//alert("list_inward_filenames"); CTS\downloadpath_from_CHI\ClearingInward
		var url=document.URL;
		var p=url.lastIndexOf('/');
		baseurl=url.substr(0,p+1);
		baseurl=baseurl+"jsp/list_inward_filenames.jsp";
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
			//alert("res:"+res);
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
	//alert("show_inward_filenames()"+res);
	//var list =document.getElementById("list_filenames").value;
	
	var ul = document.getElementById('ul_list');

	if(res.length>1)
	{
		//alert(res);
		var data =res.split("$");
		//alert("data.length:"+data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			//alert("bclist[1]"+bclist[1]);
			if(bclist[1]=="NOFILES")
			{
				alert("Files Not Available.");
				document.getElementById("waiting").style.display='none';
				document.getElementById("submitbutton").disabled = true;
			}
			else
			{
				if(bclist[1].indexOf(".txt")==-1)
				{
					
					document.getElementById("submitbutton").disabled = false;
					document.getElementById("waiting").style.display='none';
					var li=document.createElement('li');
					ul.appendChild(li);
					li.innerHTML=li.innerHTML + bclist[1];
				}
			}
		}
		if(res.indexOf(".txt")>-1)
		{
			//alert(".....");
			fetch_inward_cheques();
		}
	}
	document.getElementById("waiting").style.display='none';
}


function download_inward_cheques()
{
	//alert("in download_inward_cheques()");	
	document.getElementById("waiting").style.display='';
	var val=document.getElementById("hdMsg1").value;
	//alert(val);
	if(val!="N")
	{//1
		alert(val);
		var baseurl=document.URL;
		var p = baseurl.lastIndexOf("/?");   
		baseurl = baseurl.substr(0,p+1);
		baseurl =baseurl +"inward_clearing.jsp";
		//alert("baseurl:"+baseurl);
		location.replace(baseurl);
		
	}//1
	else
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
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/DownloadServlet.jsp";
			//fetch_inward_cheques();
			//location.replace(baseurl);
			cts_AjaxData3(baseurl);
		}
	}
}

function cts_AjaxData3(url)
{	
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process3;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process3;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process3()
{
 
    if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			
			record=res;		
			//alert("after DownloadServlet res:"+res.indexOf('SUCCESS'));
			if(res.indexOf('SUCCESS') > -1)
			{
				fetch_inward_cheques();
			}
			else
			{
				alert("Problem at server : "+res.trim());
				document.getElementById("waiting").style.display='none';
			}
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection..");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function fetch_inward_cheques()
{
		//alert("in fetch_inward_cheques");

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
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/fetch_inward_cheques.jsp";
			//location.replace(baseurl);
			cts_AjaxData4(baseurl);
		}
}

function cts_AjaxData4(url)
{	
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process4;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process4;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process4()
{
 
  if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			
			record=res;		
			//alert("res:"+res);
			setData_inwardchqs(res);	
			
			var rcnt=document.getElementById("rcnt").value;
			//alert(rcnt);
			if(rcnt>18)
			{
				//alert("in if");
				var div_in_chq=document.getElementById("div_in_chq");
				div_in_chq.style.overflow="scroll";
				div_in_chq.style.height="100%";
			}
			else
			{
				var div_in_chq=document.getElementById("div_in_chq");
				div_in_chq.style.overflow="inherit";
				div_in_chq.style.height="100%";
			}
		
				
		}
		else
		{
			//alert("Problem In Retrieving Data.Please Check The Server Connection.");
			alert(req);
			document.getElementById("waiting").style.display='none';
		}
	}
}


function setData_inwardchqs(rec)
{
	//alert(rec);
	var rcnt=document.getElementById("rcnt").value;
	/*if(rcnt>1)
	{
		resetRows();	
	}*/
	if(rec.length>1)
	{
		//alert(rec);
		rec = rec.trim();
		var data =rec.split("$");
		//alert("data.length:"+data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			//alert("bclist[1]"+bclist[1]);
			if(bclist[1]=="NOCHEQUE")
			{
				alert("Cheques Not Available.");
				document.getElementById("waiting").style.display='none';
			}
			else
			{
				//alert("in else...");
				//document.getElementById("tr_select_all").style.display='';
				var rcnt=document.getElementById("rcnt").value;
				//alert(rcnt);
				addRows_inwardchqs('tab_in_chq');
			}
		}
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");		
			var rcnt=t+1;	
			//document.getElementById("txt_chqno"+rcnt).value=bclist[1]+":"+bclist[2];
			document.getElementById("txt_chqno"+rcnt).value=bclist[1];
			//alert("bclist[2]:"+bclist[2]);			
		}
	}
}

function addRows_inwardchqs(tableID)
{
	var session_user_role = document.getElementById("session_user_role").value;
	
	
		var table=document.getElementById(tableID);
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		//alert(rowCount);
		
		var row = table.insertRow(rowCount);
		
		var cell1 = row.insertCell(0);
		cell1.style.width="80%";
		var element1 = document.createElement("input");
		element1.type = "text";
		element1.style.border="none";
    	element1.style.background="transparent";
		element1.name="txt_chqno"+rcnt;
		element1.id="txt_chqno"+rcnt;
		element1.value=rcnt;
		//element1.size="13";
		element1.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell1.appendChild(element1);
		
		var cell2 = row.insertCell(1);
		cell2.style.width="10%";
		cell2.align="center";
		var element2 = document.createElement("input");
		element2.id="sel_chq"+rcnt;
		element2.name="sel_chq";
		element2.type = "radio";
		//element2.style.width="100%";
		element2.onclick=function (){fetchValues_inwardchqs();};
		cell2.appendChild(element2);			
		
		/*var cell3 = row.insertCell(2);
		cell3.style.width="10%";
		cell3.align="center";
		var element3 = document.createElement("input");
		element3.id="chk_chq"+rcnt;
		element3.name="chk_chq";
		element3.type = "checkbox";
		element3.onclick=function (){chk_selected_inward_chqs();};
		if(session_user_role == 'C')
		{
			cell3.appendChild(element3);			
		}
		
		*/
		rcnt=rcnt*1+1;
		document.getElementById("rcnt").value=rcnt;		
		document.getElementById("waiting").style.display='none';
}

function fetchValues_inwardchqs()
{
	//alert("in fetchValues_inwardchqs()");
		
	 var table = document.getElementById("tab_in_chq");
	 var rowCount = table.rows.length;
	//alert("rowCount	:"+rowCount);
	 var color;
 
	 for(var i=1; i<rowCount; i++) 
	 {
		 
				//alert("in for");
				var row = table.rows[i];
				//alert("row :"+row);	
				var radio = row.cells[1].childNodes[0];	
				//alert("radio :"+radio.checked);
				
				var j=i;
				var obj=document.getElementById("txt_chqno"+i);
				color="##"+obj.style.background+"##";
				//alert("color::"+color);
				if(true == radio.checked && color!='##rgb(255, 204, 204)##') 
				//if(true == radio.checked) 
				{
					//alert("in if");				
						//document.getElementById("center_wait").style.display='';
						document.getElementById("txt_chqno"+i).style.background = '#66CC99';
						//alert("selected chq :"+document.getElementById("txt_chqno"+i).value);
						var chq_dtl=document.getElementById("txt_chqno"+i).value;
						var chq_no = chq_dtl.split(':')[0];
						//alert("chq_no : "+chq_no);
						document.getElementById('img_enlarged').src = null;
						
						
						 var url = document.URL;
						 var p = url.lastIndexOf('/');
						 imgpath = url.substr(0,p+1);
						 
						 imgpath = imgpath +"/downloadpath_from_CHI/ClearingInward/Images/";
						//alert("imgpath:"+imgpath);
						 
				
						//document.getElementById('img_frnt').src = imgpath+"f_"+chq_no+"_G.jpg";
						document.getElementById('img_frnt').src = imgpath+"0000000f_"+chq_no+"_G.jpg";
						/*document.getElementById('img_back').src = imgpath+"r_"+chq_no+"_G.jpg";*/
						
						document.getElementById("sel_chq"+i).style.background = '#66CC99';
						var baseurl1=document.URL;
						var p=baseurl1.lastIndexOf('/');
						baseurl1=baseurl1.substr(0,p+1);
					
				}
				else
				{
					
					//alert("in elser"+color);
					if(color!='##rgb(255, 204, 204)##')
					{
						document.getElementById("txt_chqno"+i).style.background = '#d5d5e5';
						document.getElementById("sel_chq"+i).style.background = '#d5d5e5';
					}
				}
	}
	
}


function enlargeCheque_inwardchqs(chq_type)
{
	//alert("in enlargeCheque_inwardchqs() chq_type:"+chq_type);
	//var session_branch_code = document.getElementById("session_branch_code").value;
	//alert("session_branch_code:"+session_branch_code);
	var url=document.getElementById(chq_type).src;
	//alert("url:"+url);
	//"uploadpath_to_CHI/ClearingInward/Images/f_094966_416211001.tif"
	var p=url.indexOf('downloadpath_from_CHI/ClearingInward/Images/');
	imgurl=url.substr(p);
	//alert("imgurl:"+imgurl);
	
	document.getElementById('img_enlarged').src = null;
	document.getElementById('img_enlarged').src = imgurl;
}
/***********************END Inward Clearing **********************************/

/***********************START Return_inward **********************************/

function onload_return_inward()
{
	//alert("in onload_return_inward()");

	var d=document.getElementById("menu_return_inward");
	d.className = ' active';
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
		alert("baseurl:"+baseurl);
		location.replace(baseurl);
		
	}//1
	else
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
		/*	var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/downloadReturnInword.jsp";
			location.replace(baseurl);
			*///cts_AjaxData3(baseurl);
			
			document.getElementById("formid").action="jsp/downloadReturnInword.jsp";
			
			document.getElementById("formid").submit();	
			
		}
	}
}
/***********************END Return_inward **********************************/



/***********************START Return_outward **********************************/
function onload_return_outward()
{
	var d=document.getElementById("menu_return_outward");
	d.className = ' active';
	//alert("in onload_return_outward()");	
	
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
			//alert("list_ret_outward_filenames"); CTS\uploadpath_to_CHI\9\ReturnOutward
			document.getElementById("waiting").style.display='';
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/list_ret_outward_filenames.jsp";
			//location.replace(baseurl);
			cts_Ajax_list_ret_outward_filenames(baseurl);
		}
	}
}
function cts_Ajax_list_ret_outward_filenames(url)
{	
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list_ret_outward_filenames;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list_ret_outward_filenames;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_list_ret_outward_filenames()
{
 
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			
			record=res;		
			//alert("res:"+res);
			show_ret_outward_filenames(res);					
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function show_ret_outward_filenames(res)
{
	//alert("show_ret_outward_filenames()"+res);
	
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
				document.getElementById("waiting").style.display='none';
				document.getElementById("submitbutton").disabled = true;
			}
			else
			{
				document.getElementById("waiting").style.display='none';
				document.getElementById("submitbutton").disabled = false;
				var li=document.createElement('li');
				ul.appendChild(li);
				li.innerHTML=li.innerHTML + bclist[1];
			
			}
		}
	}
	document.getElementById("waiting").style.display='none';
}

function upload_return_outward()
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
		var url=document.URL;
		var p=url.lastIndexOf('/');
		baseurl=url.substr(0,p+1);
		baseurl=baseurl+"jsp/getReturnOutwardFile.jsp";
		//location.replace(baseurl);
		document.getElementById("waiting").style.display=' ';
		cts_AjaxData5(baseurl);
	}
}
//&&&&&&&&&&&&&&&&&&&&&&&
function cts_AjaxData5(url)
{	
	//alert ("cts_AjaxData5");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process5;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process5;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process5()
{
 
	 //alert('cts_process5');	
  if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			//alert('************');	
			var res = req.responseText;
			methodReturnOutward(res);	
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function methodReturnOutward(res)
{
		//alert('methodReturnOutward()');
		if(res.indexOf("Problem")>-1)
		{			
			alert(res.split("#")[1]);	
		}
		else
		{
			alert(res.split("#")[1]);
		}	
		document.getElementById("waiting").style.display='none';
}
/***********************END Return_outward **********************************/



/***********************START CHANGE PASSWORD **********************************/
function onload_change_pwd()
{
//	alert("in onload_change_pwd");
	var d=document.getElementById("menu_admin");
	d.className = ' active';
	
	
	document.getElementById("user_pass").focus();
	var val=document.getElementById("hdMsg1").value;
	//alert("val :"+val);
	
	if(val!="N")
	{
		alert(val);
		var url=document.URL.substring(0,document.URL.indexOf("?"));
		location.replace(url);
	}
}


function after_change_pwd()
{
	//alert("in after_change_pwd");
	document.getElementById("waiting").style.display='';
	var user_pass=document.getElementById("user_pass").value;
	var new_user_pass=document.getElementById("new_user_pass").value;
	var re_new_user_pass=document.getElementById("re_new_user_pass").value;
	
	
	//var old_pass=document.getElementById("emp_id_view9").value;
	//alert("new_user_pass:"+new_user_pass);
	//alert("re_new_user_pass:"+re_new_user_pass);
	if(document.getElementById("user_pass").value=="" && document.getElementById("new_user_pass").value=="" && document.getElementById("re_new_user_pass").value=="")
	{
		alert("Fill all fields");
		document.getElementById("user_pass").focus();
	}
	else if(user_pass=="")
	{
		alert("Enter Current Password");
		document.getElementById("user_pass").focus();
	}
	else if(new_user_pass=="")
	{
		alert("Enter New Password");
		document.getElementById("new_user_pass").focus();
	}
	else if(re_new_user_pass=="")
	{
		alert("Retype New Password");
		document.getElementById("re_new_user_pass").focus();
	}
	else if(new_user_pass!=re_new_user_pass)
	{
		alert("New Password and Retype New Password should match");
		document.getElementById("new_user_pass").value="";
		document.getElementById("re_new_user_pass").value="";
		document.getElementById("new_user_pass").focus();
	}
	else
	{
		//alert("abc");
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
			document.getElementById("formid").action="jsp/afterUserChangePwd.jsp?para2="+user_pass+"&para3="+new_user_pass;
			
			document.getElementById("formid").submit();	
		}
	}
	document.getElementById("waiting").style.display='none';
}

function afterReset_chng_pwd()
{
		document.getElementById("user_pass").value="";
		document.getElementById("new_user_pass").value="";
		document.getElementById("re_new_user_pass").value="";
		document.getElementById("user_pass").focus();
}
/***********************END CHANGE PASSWORD **********************************/

/***********************START CONFIG FORM**********************************/

function onBrowseFile()
{
	var filePath = document.getElementById('txt_uploadpath_to_chi').value;
	alert("filePath:"+filePath);
		document.getElementById('hd_uploadpath_to_chi').value = filePath;
		document.getElementById('txt_uploadpath_to_chi').value = '';
}
function onLoad_config()
{
		//alert("onLoad_config");
	
		var d=document.getElementById("menu_admin");
		d.className = ' active';
		document.getElementById("txt_bankcode").focus();
		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);
		if(val!="N")
		{//1
			alert(val);
			var baseurl=document.URL;
			var p = baseurl.lastIndexOf("?");   
			baseurl = baseurl.substr(0,p);
			location.replace(baseurl);
		
		}//1
		else
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
				fetch_saved_config();	
			}
		}
}



function fetch_saved_config()
{
	//alert("fetch_saved_config()");
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{
		
		alert("Your Session Has Been Expired... Please Login Again...");
		var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"login.jsp?flag=1";
		location.replace(baseurl1);
		
	}
	else
	{
		
		var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"jsp/fetch_saved_config.jsp";
		//alert("baseurl1:"+baseurl1);
		//location.replace(baseurl1);
		cts_AjaxData_fetch_saved_config(baseurl1);
	}
}

function cts_AjaxData_fetch_saved_config(url)
{	
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_fetch_saved_config;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_fetch_saved_config;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_fetch_saved_config()
{
 
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			
			record=res;		
			//alert("res:"+res);
			set_saved_config(res);					
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function set_saved_config(res)
{
	//alert("in set_saved_config()");
	if(res.indexOf('FAIL') > -1)
	{
		alert("Some Problem At Server. Please Login Again."); //case-if tomcat restarted
		var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"login.jsp?flag=1";
		location.replace(baseurl1);
	}
	else
	{
		if(res.indexOf('GETDATAFROMADMIN') > -1)
		{
			alert("Some Initial Configuration Values Are Missing. Please Contact System Administrator!");
			var baseurl1=document.URL;
			var p=baseurl1.lastIndexOf('/');
			baseurl1=baseurl1.substr(0,p+1);
			baseurl1=baseurl1+"login.jsp?flag=1";
			location.replace(baseurl1);
			
		}
		if(res.indexOf('!#!') > -1)
		{//1st if
		
			var reclist = res.split('!#!');
			//alert(reclist);
			for (var i=0; i<reclist.length; i++)
			{//1 st for	
				//alert("reclist[i]	:"+reclist[i]);
				
////////////////BANK CODE
				if(i==0)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_bankcode").value=reclist[i];
					}
					else
					{
						document.getElementById("txt_bankcode").value='';
					}
				}
				
////////////////Upload Path (To CHI)
				if(i==1)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_uploadpath_to_chi").value=reclist[i];
						document.getElementById("txt_uploadpath_to_chi").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_uploadpath_to_chi").value='';
					}
				}
				
////////////////Download Path (From CHI) 			
				if(i==2)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_downloadpath_from_chi").value=reclist[i];
						document.getElementById("txt_downloadpath_from_chi").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_downloadpath_from_chi").value='';
					}
				}
				
////////////////Archive Download Path (To CHI) 				
				if(i==3)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_arch_downloadpath_from_chi").value=reclist[i];
						document.getElementById("txt_arch_downloadpath_from_chi").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_arch_downloadpath_from_chi").value='';
					}
				}
				
////////////////Archive Upload Path (To CHI) 								
				if(i==4)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_arch_uploadpath_to_chi").value=reclist[i];
						document.getElementById("txt_arch_uploadpath_to_chi").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_arch_uploadpath_to_chi").value='';
					}
				}
				
////////////////Security Originator Name 				
				if(i==5)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_sec_orgin_name").value=reclist[i];
						document.getElementById("txt_sec_orgin_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_sec_orgin_name").value='';
					}
				}
				
////////////////Security Authenticator Name 				
				if(i==6)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_sec_auth_name").value=reclist[i];
						document.getElementById("txt_sec_auth_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_sec_auth_name").value='';
					}
				}
				
////////////////Security Key Name 				
				if(i==7)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_sec_key_name").value=reclist[i];
						document.getElementById("txt_sec_key_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_sec_key_name").value='';
					}
				}
				
////////////////NPCI Version No				
				if(i==8)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_npci_ver_no").value=reclist[i];
						document.getElementById("txt_npci_ver_no").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_npci_ver_no").value='';
					}
				}
				
////////////////Digital Signature Method				
				if(i==9)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_dig_sign_method").value=reclist[i];
						document.getElementById("txt_dig_sign_method").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_dig_sign_method").value='';
					}
				}
				
////////////////Security Key Size				
				if(i==10)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_sec_key_size").value=reclist[i];
						document.getElementById("txt_sec_key_size").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_sec_key_size").value='';
					}
				}
				
////////////////Keystore Filename		
				if(i==11)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_keystore_filenm").value=reclist[i];
						document.getElementById("txt_keystore_filenm").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_keystore_filenm").value='';
					}
				}
				
////////////////Keystore Password			
				if(i==12)
				{
					
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_keystore_pwd").value=reclist[i];
						document.getElementById("txt_keystore_pwd").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_keystore_pwd").value='';
					}
				}
				
////////////////Keystore Alias				
				if(i==13)
				{
					
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_keystore_alias").value=reclist[i];
						document.getElementById("txt_keystore_alias").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_keystore_alias").value='';
					}
				}
				
////////////////Inward File Split Style
				if(i==14)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("opt_inward_split_style").value=reclist[i];
						document.getElementById("opt_inward_split_style").title=reclist[i];
					}
					else
					{
						document.getElementById("opt_inward_split_style").value='0';
					}
					
				}

////////////////Our Version No
				if(i==15)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_our_verno").value=reclist[i];
						document.getElementById("txt_our_verno").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_our_verno").value='';
					}
					
				}
			}//--1 st for
		}//--1st if
		else
		{
		
		}
	}
}

function afterSave_config()
{
	//alert("in afterSave_config()");
	var flag = beforeSaveConfig();
	//alert("flag:"+flag);
	if(flag == 1)
	{
		document.getElementById("txt_our_verno").disabled=false;
		
		document.getElementById("txt_sec_orgin_name").disabled=false;
		document.getElementById("txt_sec_auth_name").disabled=false;
		document.getElementById("txt_sec_key_name").disabled=false;
		document.getElementById("txt_sec_key_size").disabled=false;
		document.getElementById("txt_dig_sign_method").disabled=false;
		document.getElementById("txt_npci_ver_no").disabled=false;
								
		document.getElementById("formid").action="jsp/save_config.jsp";
		document.getElementById("formid").submit();	
	}
}
function beforeSaveConfig()
{
	//alert("in beforeSaveConfig()");
	
	var txt_bankcode=document.getElementById("txt_bankcode").value;
	var txt_our_verno=document.getElementById("txt_our_verno").value;
	
	var txt_uploadpath_to_chi=document.getElementById("txt_uploadpath_to_chi").value;
	var txt_downloadpath_from_chi=document.getElementById("txt_downloadpath_from_chi").value;

	var txt_arch_uploadpath_to_chi=document.getElementById("txt_arch_uploadpath_to_chi").value;
	var txt_arch_downloadpath_from_chi=document.getElementById("txt_arch_downloadpath_from_chi").value;
	

	var txt_sec_orgin_name=document.getElementById("txt_sec_orgin_name").value;
	var txt_sec_auth_name=document.getElementById("txt_sec_auth_name").value;
	
	var txt_sec_key_name=document.getElementById("txt_sec_key_name").value;
	var txt_sec_key_size=document.getElementById("txt_sec_key_size").value;
	
	var txt_dig_sign_method=document.getElementById("txt_dig_sign_method").value;
	var txt_npci_ver_no=document.getElementById("txt_npci_ver_no").value;
	
	var txt_keystore_filenm=document.getElementById("txt_keystore_filenm").value;
	var txt_keystore_pwd=document.getElementById("txt_keystore_pwd").value;
	
	var txt_keystore_alias=document.getElementById("txt_keystore_alias").value;
	var opt_inward_split_style=document.getElementById("opt_inward_split_style").value;
	
	
	//bankcode validation
	if(txt_bankcode == '')
	{
		alert("Please Enter Bank Code!");
		document.getElementById("txt_bankcode").focus();
		flag = 0;
	}
	else if(isNaN(txt_bankcode))
	{
		alert("Bank Code should be numeric");
		document.getElementById("txt_bankcode").value="";
		document.getElementById("txt_bankcode").focus();
		flag = 0;
	}
	else if(txt_bankcode.length > 9 || txt_bankcode.length < 9)
	{
		alert("Bank Code Length Should Be Equal To 9.");
		document.getElementById("txt_bankcode").focus();
		flag = 0;
	}
	else if(txt_our_verno == '')
	{
		alert("Please Enter Product Version Number!");
		document.getElementById("txt_our_verno").focus();
		flag = 0;
	}
	else if(txt_uploadpath_to_chi == '')
	{
		alert("Please Enter Upload Files To CHI Path!");
		document.getElementById("txt_uploadpath_to_chi").focus();
		flag = 0;
	}
	else if(!validate_path(txt_uploadpath_to_chi))
	{
		alert("Upload Files To CHI Path Should Contain Only Forward Slash('/').");
		document.getElementById("txt_uploadpath_to_chi").focus();
		flag = 0;
	}
	else if(txt_downloadpath_from_chi == '')
	{
		alert("Please Enter Download Files From CHI Path!");
		document.getElementById("txt_downloadpath_from_chi").focus();
		flag = 0;
	}
	else if(!validate_path(txt_downloadpath_from_chi))
	{
		alert("Download Files From CHI Path Should Contain Only Forward Slash('/').");
		document.getElementById("txt_downloadpath_from_chi").focus();
		flag = 0;
	}
	else if(txt_arch_uploadpath_to_chi == '')
	{
		alert("Please Enter Archile File Upload To CHI Path!");
		document.getElementById("txt_arch_uploadpath_to_chi").focus();
		flag = 0;
	}
	else if(!validate_path(txt_arch_uploadpath_to_chi))
	{
		alert("Archile File Upload To CHI Path Should Contain Only Forward Slash('/').");
		document.getElementById("txt_arch_uploadpath_to_chi").focus();
		flag = 0;
	}
	else if(txt_arch_downloadpath_from_chi == '')
	{
		alert("Please Enter Archile File Download From CHI Path!");
		document.getElementById("txt_arch_downloadpath_from_chi").focus();
		flag = 0;
	}
	else if(!validate_path(txt_arch_downloadpath_from_chi))
	{
		alert("Archile File Download From CHI Path Should Contain Only Forward Slash('/').");
		document.getElementById("txt_arch_downloadpath_from_chi").focus();
		flag = 0;
	}
	else if(txt_sec_orgin_name == '')
	{
		alert("Please Enter Security Originator Name!");
		document.getElementById("txt_sec_orgin_name").focus();
		flag = 0;
	}
	else if(txt_sec_auth_name == '')
	{
		alert("Please Enter Security Authenticator Name!");
		document.getElementById("txt_sec_auth_name").focus();
		flag = 0;
	}
	else if(txt_sec_key_name == '')
	{
		alert("Please Enter Security Key Name!");
		document.getElementById("txt_sec_key_name").focus();
		flag = 0;
	}
	else if(txt_sec_key_size == '')
	{
		alert("Please Enter Security Key Size!");
		document.getElementById("txt_sec_key_size").focus();
		flag = 0;
	}	
	else if(isNaN(txt_sec_key_size))
	{
		alert("Security Key Size should be numeric");
		document.getElementById("txt_sec_key_size").value="";
		document.getElementById("txt_sec_key_size").focus();
		flag = 0;
	}
	else if(txt_dig_sign_method == '')
	{
		alert("Please Enter Digital Signature Method!");
		document.getElementById("txt_dig_sign_method").focus();
		flag = 0;
	}
	else if(txt_npci_ver_no == '')
	{
		alert("Please Enter NPCI Version Number!");
		document.getElementById("txt_npci_ver_no").focus();
		flag = 0;
	}
	else if(txt_keystore_filenm =='')
	{
		alert("Please Enter Keystore Filename!");
		document.getElementById("txt_keystore_filenm").focus();
		flag = 0;
	}
	else if(txt_keystore_pwd == '')
	{
		alert("Please Enter Keystore Password!");
		document.getElementById("txt_keystore_pwd").focus();
		flag = 0;
	}
	else if(txt_keystore_pwd.length > 6 || txt_keystore_pwd.length < 6)
	{
		alert("Keystore Password Length Should Be Equal To 6.");
		document.getElementById("txt_keystore_pwd").focus();
		flag = 0;
	}
	else if(txt_keystore_alias == '')
	{
		alert("Please Enter Keystore Alias!");
		document.getElementById("txt_keystore_alias").focus();
		flag = 0;
	}
	else if(opt_inward_split_style == '0')
	{
		alert("Please Select Inward Split Style!");
		document.getElementById("opt_inward_split_style").focus();
		flag = 0;
	}
	else
	{
		flag = 1;
	}
	return flag;
}

function validate_path(path_val)
{
	if(path_val.indexOf("\\")>-1 || path_val.indexOf("?")>-1 || path_val.indexOf("<")>-1 || path_val.indexOf("<")>-1 || path_val.indexOf(":")>-1 || path_val.indexOf("*")>-1 || path_val.indexOf("|")>-1 || path_val.indexOf("\"")>-1)
	{
		return false;
	}/// ? < > \ : * | �
	
	else
	{
		return true;
	}
}

function keyStoreValidation()
{
	var keyStorefileName=document.getElementById("txt_keystore_filenm").value;
	//alert('keyStorefileName:::'+keyStorefileName);
	if(keyStorefileName.indexOf("\\")>-1 || keyStorefileName.indexOf('/')>-1 ||keyStorefileName.indexOf('*')>-1 || keyStorefileName.indexOf('?')>-1 || keyStorefileName.indexOf('<')>-1 || keyStorefileName.indexOf('>')>-1 || keyStorefileName.indexOf('|')>-1)
	{
		alert('File Name should not contain spcial character');
	}
}//end keyStoreValidation

function afterReset_config()
{
	onLoad_config();	
}

function onTextFocus()
{
	
}

/***********************	END CONFIG FORM		**********************************/
/***********************	START Manual Archive	*****************************/

function onLoad_manual_archive()
{
	//alert("in onLoad_manual_archive()");	
	//var val=document.getElementById("hdMsg1").value;
	var d=document.getElementById("menu_admin");
	d.className = ' active';
	
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
		var val=document.getElementById("hdMsg1").value;
			
		if(val!="N")
		{
			alert(val);
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			location.replace(url);
		}
	}
}

function toggle_manual_archive(source) 
{ 
  
	for(var i=1; i<5; i++) 
	{
		
		var chkbox = document.getElementById("chk_"+i);	
		//alert("chkbox :"+chkbox.checked);
		chkbox.checked = source.checked;

	}	
}
function chk_selected_archive()
{
	//alert("in chk_selected_archive");
	var sel_cnt = 0;
	
	for(var i=1; i<5; i++) 
	{
		
		var chkbox = document.getElementById("chk_"+i);	
		//alert("chkbox :"+chkbox.checked);
		//chkbox.checked = source.checked;
		if(true == chkbox.checked) 
		{
			sel_cnt ++;
		}
	}	
	var chkbox = document.getElementById("chk_selall");	
	
	if(sel_cnt != 4)
	{
		//alert("in if.........");
		
		//alert("chkbox :"+chkbox.checked);
		if(true == chkbox.checked)
		{
			chkbox.checked = false;
		}
		
	}
	else
	{
		chkbox.checked = true;
	}
	
}

function after_archive()
{
	//alert("in after_archive()");
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
		var chk_selall = document.getElementById("chk_selall").checked;
		var chk_1 = document.getElementById("chk_1").checked;
		var chk_2 = document.getElementById("chk_2").checked;
		var chk_3 = document.getElementById("chk_3").checked;
		var chk_4 = document.getElementById("chk_4").checked;
		alert("chk_selall:"+chk_selall+"\nchk_1:"+chk_1+"\nchk_2:"+chk_2+"\nchk_3:"+chk_3+"\nchk_4:"+chk_4);
		
		if(chk_selall==false && chk_1==false && chk_2==false && chk_3==false && chk_4==false)
			alert('Select Archive from');
		else
		{
		document.getElementById("formid").action="jsp/afterManualArchive.jsp?chk_selall="+chk_selall+"&chk_1="+chk_1+"&chk_2="+chk_2+"&chk_3="+chk_3+"&chk_4="+chk_4;			
		document.getElementById("formid").submit();	
		}
	/*	var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"jsp/afterManualArchive.jsp";
		location.replace(baseurl1);*/
		
	}
	
}

/**********		END Manual Archive		********************/

function onLoad_returnOutward()
{//onLoad_returnOutward()
		
		//alert("in onLoad_returnOutward()");	
	//var val=document.getElementById("hdMsg1").value;
	var d=document.getElementById("menu_return_outward");
	d.className = ' active';

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
			var hddoICallMerge=document.getElementById("hddoICallMerge").value;
			if(hddoICallMerge=="Y")
			{
				//alert("list_branches"); \CTS\uploadpath_to_CHI
				document.getElementById("waiting").style.display='';
				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/list_branches.jsp";
				//location.replace(baseurl);
				cts_Ajax_list_branches1(baseurl);
			}
			else
			{
				alert("Return Outward File Creation Is Already Done For Today!");
			}
		}
	}		
}//onLoad_returnOutward()

/***********************	START Merging	*****************************/

function onLoad_merging()
{
	//alert("in onLoad_merging()");	
	//var val=document.getElementById("hdMsg1").value;
	var d=document.getElementById("menu_merging");
	d.className = ' active';
	
	
	var session_loginid = document.getElementById("session_loginid").value;
	//alert("session_loginid:"+session_loginid);
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
			var hddoICallMerge=document.getElementById("hddoICallMerge").value;
			if(hddoICallMerge=="Y")
			{
				//alert("list_branches"); \CTS\uploadpath_to_CHI
				document.getElementById("waiting").style.display='';
				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/list_branches.jsp";
				//location.replace(baseurl);
				cts_Ajax_list_branches(baseurl);
			}
			else
			{
				alert("Clearing Outward File Creation Is Already Done For Today!");
			}
		}
	}		
	
}


function cts_Ajax_list_branches(url)
{	
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list_branches;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list_branches;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_Ajax_list_branches1(url)
{	
	//alert ("cts_Ajax_list_branches1");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list_branches1;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list_branches1;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_list_branches1()
{
 
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			
			record=res;		
			//alert("cts_process_list_branches1 res:"+res);
			show_listof_branches1(res);					
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function cts_process_list_branches()
{
 
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			
			record=res;		
			//alert("res:"+res);
			show_listof_branches(res);					
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}
function show_listof_branches1(res)
{
	//alert("show_listof_branches()1"+res);
	
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
				alert("Branch Folder(s) Not Available.");
				document.getElementById("waiting").style.display='none';
			}
			else
			{
				document.getElementById("waiting").style.display='none';
				var li=document.createElement('li');
				ul.appendChild(li);
				li.innerHTML=li.innerHTML + bclist[0]+" : "+bclist[1];
			
			}
		}
	}
	document.getElementById("waiting").style.display='none';
}


function show_listof_branches(res)
{
	//alert("show_listof_branches()"+res);
	
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
				alert("Branch Folder(s) Not Available.");
				document.getElementById("waiting").style.display='none';
			}
			else
			{
				document.getElementById("waiting").style.display='none';
				var li=document.createElement('li');
				ul.appendChild(li);
				li.innerHTML=li.innerHTML + bclist[0]+" : "+bclist[1];
			
			}
		}
	}
	document.getElementById("waiting").style.display='none';
}

function after_merge()
{
	alert("after_merge()");
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
		var hddoICallMerge=document.getElementById("hddoICallMerge").value;
		alert(hddoICallMerge);
		if(hddoICallMerge=="Y")
		{
			document.getElementById("formid").action="jsp/merge.jsp";
			document.getElementById("formid").submit();
		}
		else
		{
			alert("Clearing Outward File Creation Is Already Done For Today!");
		}
	}
}
/***********************	END Merging	*****************************/


(function () {
    var onload = window.onload;

    window.onload = function () {
        if (typeof onload == "function") {
            onload.apply(this, arguments);
        }

        var fields = [];
        var inputs = document.getElementsByTagName("input");
        var textareas = document.getElementsByTagName("textarea");

        for (var i = 0; i < inputs.length; i++) {
            fields.push(inputs[i]);
        }

        for (var i = 0; i < textareas.length; i++) {
            fields.push(textareas[i]);
        }

        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];

            if (typeof field.onpaste != "function" && !!field.getAttribute("onpaste")) {
                field.onpaste = eval("(function () { " + field.getAttribute("onpaste") + " })");
            }

            if (typeof field.onpaste == "function") {
                var oninput = field.oninput;

                field.oninput = function () {
                    if (typeof oninput == "function") {
                        oninput.apply(this, arguments);
                    }

                    if (typeof this.previousValue == "undefined") {
                        this.previousValue = this.value;
                    }

                    var pasted = (Math.abs(this.previousValue.length - this.value.length) > 1 && this.value != "");

                    if (pasted && !this.onpaste.apply(this, arguments)) {
                        this.value = this.previousValue;
                    }

                    this.previousValue = this.value;
                };

                if (field.addEventListener) {
                    field.addEventListener("input", field.oninput, false);
                } else if (field.attachEvent) {
                    field.attachEvent("oninput", field.oninput);
                }
            }
        }
    }
})();



/***********************START CONFIG  of add rows**********************************/
/*function onLoad_config()
{
		//alert("onLoad_config");
	
		var d=document.getElementById("menu_admin");
		d.className = ' active';
	
		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);
		if(val!="N")
		{//1
			alert(val);
			var baseurl=document.URL;
			var p = baseurl.lastIndexOf("?");   
			baseurl = baseurl.substr(0,p);
			location.replace(baseurl);
		
		}//1
		else
		{
			//document.getElementById("chk").vlaue="i";
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
				fetch_configvar();	
			}
		}
	
}

function fetch_configvar()
{		
		//alert("in fetch_configvar()");
		
		var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"jsp/fetch_config.jsp";
		//location.replace(baseurl1);
		cts_AjaxData2(baseurl1);
		
}

function cts_AjaxData2(url)
{	
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process2;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process2;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}
function cts_process2()
{
    //alert("pms_process1 :"+req.readyState);
  	if(req.readyState == 4)
	{  //alert("req.status :"+req.status);
		if(req.status == 200)
		{
			var res = req.responseText;
			allConfigVar=res;
			//alert("allConfigVar"+allConfigVar);
			
			setData_config(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
		}
	}
}


function setData_config(loc)
{
	//alert("in setData_config loc"+loc);
	//alert("loc"+loc);
	
	if(loc.length>1)
	{
		
		var data =loc.split("$");
		//alert("data.length:"+data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("!~!");
			//alert("bclist[1]"+bclist[1]+"\nbclist[2]"+bclist[2]);
			if(bclist[1]=="NO CONFIG")
			{
				alert("No Configuration added yet.\nClick on Add Row to Configuration");
				document.getElementById("Add Row").focus();
			}
			else
			{
				var rcnt=document.getElementById("rcnt").value;
				//alert(rcnt);
				addRows_config('conf_mast');
			}
		}
		
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("!~!");
			//alert("bclist[t]"+bclist[t]);
			if(bclist[1]=="NO CONFIG")
			{
				//alert("in if");
				alert("No Configuration added yet.\nClick on Add Row to Configuration");
				
				document.getElementById("Add Row").focus();
			}
			else
			{
				//alert("in else");
				flag=0;
				var rcnt=t+1;
				document.getElementById("txt_conf_var"+rcnt).value=bclist[1];
				document.getElementById("hd_conf_var"+rcnt).value=bclist[1];
				if(bclist[2]=='NA')
				{
					document.getElementById("txt_conf_val"+rcnt).value='';
				}
				else
				{
					document.getElementById("txt_conf_val"+rcnt).value=bclist[2];
				}
				
				//document.getElementById("txt_conf_var"+rcnt).disabled=true;
				
			}
		}
	}
	else
	{
		//alert(1);
		document.getElemetById("Add Row").focus();
	}
}

function addRows_config(tableID)
{
	{
		var table=document.getElementById(tableID);
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		//alert(rowCount);
		var row = table.insertRow(rowCount);
		
		var cell1 = row.insertCell(0);
		cell1.style.width="50%";
		var element1 = document.createElement("input");
		element1.type = "text";
		element1.name="txt_conf_var"+rcnt;
		element1.id="txt_conf_var"+rcnt;
		element1.style.width="100%";
		element1.style.height="100%";
		cell1.appendChild(element1);
		element1.focus();
	
		var cell2 = row.insertCell(1);
		cell2.style.width="50%";
		var element2 = document.createElement("input");
		element2.type = "text";
		element2.name="txt_conf_val"+rcnt;
		element2.id="txt_conf_val"+rcnt;
		element2.style.width="100%";
		element2.style.height="100%";
		cell2.appendChild(element2);
	
		
		var element3 = document.createElement("input");
		element3.type = "hidden";
		element3.name="hd_conf_var"+rcnt;
		element3.id="hd_conf_var"+rcnt;
		element3.value="NEWCONFVALUE";
		cell2.appendChild(element3);
			
		rcnt=rcnt*1+1;
		document.getElementById("rcnt").value=rcnt;		
	}
	var rcnt=document.getElementById("rcnt").value-1;

	flag=1;
	//setData_config(allConfigVar);
}

function onSave_config()
{
	//alert("1");
	var hdval=document.getElementById("hd_conf_var"+rcnt);
	//alert("hdval"+hdval);
	var rcnt=document.getElementById("rcnt").value-1;
	//alert("row count :"+rcnt);
	if(rcnt==0)
	{
		alert("There are no configuration details added yet!");
	}
	else
	{
		var cnt=document.getElementById("rcnt").value;
		//alert("row count :"+cnt);
	
		for(i=1;i<cnt;i++)
		{
			var retval=validateConfVar(i);
			if(!retval)
			{
				alert("Please Enter Configuration Variable");
				document.getElementById("txt_conf_var"+i).focus();
				cnt=-1;
				break;
			}
		}
		
		for(i=1;i<cnt;i++)
		{
			var retval=validateConfVal(i);
			if(!retval)
			{
				alert("Please Enter Configuration Value");
				document.getElementById("txt_conf_val"+i).focus();
				cnt=-1;
				break;
			}
		}
		
		
	
			if(cnt!=-1)
			{	
				//var delcnt=document.getElementById("delcnt").value;
				
					//var r=confirm("Do you really want to Save And Delete marked selected designaiton?\nOnce done can not be changed!");
					var r=confirm("Do you really want to Save?");
					if(r==true)
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
							afterSave_config();
						}
					}	
				
			}
		
		
	}
}

function afterSave_config()
{
	//alert("in afterSave_config()");
	var cnt=document.getElementById("rcnt").value;
	//alert("row count :"+cnt);
	
	document.getElementById("formid").action="jsp/save_configuration.jsp";
	document.getElementById("formid").submit();	
}


function validateConfVar(i)
{
		var val=document.getElementById("txt_conf_var"+i).value;
		//alert("val :"+val);
		if(val!="")
		{
			return true;
		}
		else
		{
			return false;
		}	
}

function validateConfVal(i)
{
		var val=document.getElementById("txt_conf_val"+i).value;
		//alert("val :"+val);
		if(val!="")
		{
			return true;
		}
		else
		{
			return false;
		}	
}
*/
/***********************END CONFIG of add rows**********************************/