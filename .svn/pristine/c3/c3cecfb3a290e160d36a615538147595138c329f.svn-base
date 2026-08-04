	var cbsAmt;
var cbsChqs;
function onload_verify_clearing()
{
	var session_loginid = document.getElementById("session_loginid").value;
	document.getElementById("waiting").style.display='';
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
		//alert("list_inward_filenames"); CTS\downloadpath_from_CHI\ClearingInward
		var url=document.URL;
		var p=url.lastIndexOf('/');
		baseurl=url.substr(0,p+1);
		baseurl=baseurl+"jsp/list_verify_filenames.jsp";
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
				if(bclist[1].indexOf("CBS_Clearing_Inward")==-1)
				{
					document.getElementById("submitbutton").disabled = false;
					document.getElementById("waiting").style.display='none';
					var li=document.createElement('li');
					ul.appendChild(li);
					li.innerHTML=li.innerHTML + bclist[1];
				}
			}
		}
		if(res.indexOf("_Inward.txt")>-1)
		{
			//alert(".....");
			fetch_inward_cheques();
		}
	}
	document.getElementById("waiting").style.display='none';
}
function fetch_inward_cheques()
{
		//alert("in fetch_inward_cheques");

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
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/fetch_verify_cheques.jsp";
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


			//setData_inwardchqs(res);
			record=res.split("!A!")[0];
			var clearingTypes=res.split("!A!")[1];
			cbsChqs=res.split("!A!")[2];
			cbsAmt=res.split("!A!")[3];
			
			//alert(clearingTypes);
			//draw the radio buttons ....according  to clearing type
			//alert("clearingTypes=="+clearingTypes);
			makeRadioButtons(clearingTypes);
			var rcnt=document.getElementById("rcnt").value;
			//alert(rcnt);
			/*if(rcnt>18)
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
			}*/


		}
		document.getElementById("waiting").style.display='none';
	}
}
function makeRadioButtons(clearingTypes)
{
	//alert("clearingTypes===="+clearingTypes)
	var allType=clearingTypes.split("!Q!");
	
	var trId=document.getElementById('trId');
	var tdCnt=0;
	for(i=0;i<allType.length-1;i++)
	{
		//alert('Clearing Type:'+allType[i]);	
	/*	var x = document.createElement("INPUT");
		x.setAttribute("type", "radio");
		x.setAttribute("name", "radio");
		x.setAttribute("type", "radio");*/
		var cell1 = trId.insertCell(tdCnt++);
		cell1.innerHTML=allType[i];
		
		var cell2 = trId.insertCell(tdCnt++);
		var element = document.createElement("input");
		element.id=allType[i];
		element.value=allType[i];
		element.name="radioGrp";
		element.type="radio";
		element.onclick=function (){test(this);};
		cell2.appendChild(element);
		
		trId.appendChild(cell1);
		trId.appendChild(cell2);
	}
	document.getElementById("waiting").style.display='none';
	document.getElementById("submitbutton").disabled = true;
}
function test(obj)
{
	//alert('alert****');	
	document.getElementById("selClrType").value=obj.value;
	document.getElementById("rcnt").value="1";
	var table=document.getElementById('tab_in_chq');
	var tabRowCnt=table.rows.length;
	for(i=0;i<tabRowCnt-1;i++)
	{
		table.deleteRow(1);
	}
	table.rows.length=0;
	setData_inwardchqs(record);
}
function setData_inwardchqs(rec)
{

	var rcnt=document.getElementById("rcnt").value;
	rec = record;
	if(rec.length>1)
	{

		rec = record;
		var data=rec.split("$");

		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			//alert("SAM----bclist[4]"+bclist[4]);
			if(bclist[4]==document.getElementById("selClrType").value)
			{
				
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
		}
		var totAmt=0;
		var totChqs=0;
		//alert(data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			if(bclist[4]==document.getElementById("selClrType").value)
			{
				var rcnt=totChqs+1;
				//document.getElementById("txt_chqno"+rcnt).value=bclist[1]+":"+bclist[2];
				document.getElementById("txt_chqno"+rcnt).value=bclist[1];
				document.getElementById("hd_imgNm"+rcnt).value=bclist[2];
				totAmt=(totAmt*1)+parseFloat((bclist[3]*1)/100);
				totChqs++;
				//totAmt=parseFloat((bclist[2]*1)/100);
			}
		}
		//alert('Total Amount:'+totAmt);
		document.getElementById("totalAmount").innerHTML=""+totAmt;
		document.getElementById("totalCheques").innerHTML=totChqs;
		document.getElementById("cbsAmount").innerHTML=cbsAmt;
		document.getElementById("cbsCheques").innerHTML=cbsChqs;
		//document.getElementById("txtTotCheques").value=totAmt;
		//document.getElementById("txtTotAmt").value=totChqs;		
	}
	document.getElementById("waiting").style.display='none';
	if(rec.indexOf("SUCCESS")>-1)
	{
			document.getElementById("submitbutton").disabled = true;
	}
	//document.getElementById("sel_chq1").click();
	enlargeCheque_inwardchqs('img_frnt');
	document.getElementById("waiting").style.display='none';
}



function addRows_inwardchqs(tableID)
{
		//alert(' ---- addRows_inwardchqs -----');
		//var session_user_role = document.getElementById("session_user_role").value;
		//alert('in addRows_inwardchqs:');
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

		var element3 = document.createElement("input");
		element3.id="hd_imgNm"+rcnt;
		element3.name="hd_imgNm"+rcnt;
		element3.type = "hidden";
		cell2.appendChild(element3);
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
		//alert("addRows_inwardchqs rcnt:"+rcnt);
		document.getElementById("rcnt").value=rcnt;

		document.getElementById("waiting").style.display='none';
}

function enlargeCheque_inwardchqs(chq_type)
{
	//alert("in enlargeCheque_inwardchqs()");
	//var session_branch_code = document.getElementById("session_branch_code").value;
	//alert("session_branch_code:"+session_branch_code);
	var url=document.getElementById(chq_type).src;
	//alert("url:"+url);
	//"uploadpath_to_CHI/ClearingInward/Images/f_094966_416211001.tif"
	var p=url.indexOf('downloadpath_from_CHI/ClearingInward/Images/');
	imgurl=url.substr(p);
	//alert("imgurl:"+imgurl);

	document.getElementById('img_frnt').src = null;
	document.getElementById('img_frnt').src = imgurl;
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
				var imgName=document.getElementById("hd_imgNm"+i).value;
				var chq_no = chq_dtl.split(':')[0];
				//alert("chq_no : "+chq_no);
				//document.getElementById('img_enlarged').src = null;


				 var url = document.URL;
				 var p = url.lastIndexOf('/');
				 imgpath = url.substr(0,p+1);

				 imgpath = imgpath +"/downloadpath_from_CHI/ClearingInward/Images/";
				//alert("imgpath:"+imgpath);


			/*	document.getElementById('img_frnt').src = imgpath+"f_"+chq_no+"_G.jpg";*/

				//document.getElementById('img_frnt').src = imgpath+"0000000f_"+chq_no+"_G.jpg";
				//alert(imgpath+imgName);
				document.getElementById('img_frnt').src = imgpath+imgName;
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
function download_inward_cheques()
{
	//alert("in download_inward_cheques()");
		var session_loginid = document.getElementById("session_loginid").value;
		if(session_loginid == "null")
		{
			alert("Your Session Has Been Expired. Please Login Again.");
			/*var baseurl=document.URL;
			var p=baseurl.lastIndexOf('/');
			baseurl=baseurl.substr(0,p+1);
			baseurl=baseurl+"login.jsp?flag=1";
			location.replace(baseurl);
*/		menuOnClick("login.jsp");
			}
		else
		{
			document.getElementById("waiting").style.display='';
			var val=document.getElementById("hdMsg1").value;
			//alert(val);
			if(val!="N")
			{//1
				//alert(val);
				var baseurl=document.URL;
				var p = baseurl.lastIndexOf("/?");
				baseurl = baseurl.substr(0,p+1);
				baseurl =baseurl +"verify_clearing.jsp";
				//alert("baseurl:"+baseurl);
				location.replace(baseurl);

			}//1
			else
			{
				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/VerifyServlet.jsp";
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
			//alert(record);
			//alert("after DownloadServlet res:"+res.indexOf('SUCCESS'));
			//res='SUCCESS';
			if(res.indexOf('SUCCESS') > -1)
			{
				alert('Converted Successfully');
				fetch_inward_cheques();
			}
			else
			{
				alert(record.split("~")[1]);
				//alert("Image File Not Downloaded Properly\n Please Re-Download File(s) From FTP");
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
