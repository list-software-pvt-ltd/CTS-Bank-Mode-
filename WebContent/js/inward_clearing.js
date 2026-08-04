var imagedata="";
var cnt=0;
var gridcnt=0;
var imagePath="";
var amount=0;
var specialClearingType="21";
var flgCheck=false;
var cyclNo;
var cbs_conti_flg;
function onload_inward_clearing()
{
	document.getElementById("divhide").style.display = 'none';		  
	document.getElementById("yespickfile").style.display = 'none';		
	var session_loginid = document.getElementById("session_loginid").value;
	document.getElementById("waiting").style.display='none';
	cbs_conti_flg= $('#cbs_conti_flg').val();	
	if(session_loginid == "null")
	{
		alert("Your Session Has Been Expired. Please Login Again.");		
		menuOnClick("login.jsp")
	}
	else
	{
		var retStr=document.getElementById("retStr").value;
	    var Flag=document.getElementById("Flag").value;
	    if(Flag.length==0 && retStr.length==0)
	    {
			Flag="F";
			retStr="NA";
		}
		else
		{
		  Flag=document.getElementById("Flag").value;
		  retStr=document.getElementById("retStr").value;
		}   		
		if(retStr="NA" && Flag=="F")
		{
		  var val=confirm("Do you want to pickup option for files/folder upload?");
		  if(val==true)
		  {			  
			  var d=document.getElementById("menu_inward_clearing");
				d.className = ' active';
				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/inward_filenames_backup.jsp";
				cts_Ajax_inward_filenames_backup(baseurl);
				
			  document.getElementById("yespickfile").style.display = '';
			  document.getElementById("divhide").style.display = 'none';	 
		  }
		  else
		  {
			  retStr="SUCCESS";			  
		  }
		} 
		else
		{		  
		  retStr="SUCCESS";		 
		}
		if(retStr=="SUCCESS" )
		{	
			 document.getElementById("divhide").style.display = '';		  
		     document.getElementById("yespickfile").style.display = 'none';
			var d=document.getElementById("menu_inward_clearing");
			d.className = ' active';
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/list_inward_filenames.jsp";
			cts_Ajax_list_inward_filenames(baseurl);
		}
  }
}
function cts_Ajax_inward_filenames_backup(url)
{	
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_inward_filenames_backup;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_inward_filenames_backup;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_inward_filenames_backup()
{
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;

			record=res;
			
			inward_file_backup(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}
function inward_file_backup(res)
{		
	if(res.length>1)
	{		
		if(res==true)
		 retStr="SUCCESS";			  
	}
}
//-------------------------------------------
function uploadFiles()
{	
	document.getElementById("divhide").style.display = 'none';
	document.getElementById("yespickfile").style.display = '';
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
		$("#retstr").val("InwardClearing");
		if(document.getElementById("file_pick").value=="")
		{
			alert('Please Select File.');
			return false;
		}
		else
		{
			alert('going for upload.....');
			document.getElementById("waiting").style.display='';
			document.getElementById("formid").action="ClearingInward_Upload";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").enctype="multipart/form-data";
			document.getElementById("formid").submit();
		}
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
			//alert("bclist[1]==="+bclist[1]);
			if(bclist[1]=="NOFILES")
			{
				alert("Files Not Available.");
				document.getElementById("waiting").style.display='none';
				document.getElementById("submitbutton").disabled = true;
			}
			else if(bclist[1]=="SAM")
			{
				flgCheck=true;
				/*alert("Files already converted.123");
				document.getElementById("waiting").style.display='none';
				//document.getElementById("submitbutton").disabled = true;
				$("#submitbutton").hide();*/				
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
		if(flgCheck==true)
		{
			alert("One or more File(s) already converted.Please download latest files.");
			document.getElementById("waiting").style.display='none';
			document.getElementById("sub_btn").style.display='none';
			$("#sub_btn").hide();
		}
		
		if(res.indexOf("_Inward.txt")>-1)
		{
			fetch_inward_cheques();
		}
	}
	document.getElementById("waiting").style.display='none';
}
function fetch_inward_cheques()
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
			menuOnClick("login.jsp")
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
			//setData_inwardchqs(res);		
			var clearingTypes=res.split("!A!")[1];
			//alert("clearingTypes=="+clearingTypes);//SUCCESS
			cyclNo=clearingTypes.split("SUCCESS~")[1];
			//alert("cyclNo=============="+cyclNo+ "length==="+cyclNo.length);
			if(cyclNo>0)
			{
					document.getElementById("cyclNo").innerHTML=cyclNo;
			}
			else
			{
				document.getElementById("cyclNo").innerHTML="-";
			}	
					
			record=res.split("!A!")[0];				
			{
				makeRadioButtons(clearingTypes);
			    var rcnt=document.getElementById("rcnt").value;
			}
		}
		document.getElementById("waiting").style.display='none';
	}
}
function makeRadioButtons(clearingTypes)
{
	var allType=clearingTypes.split("!Q!");
	
	var trId=document.getElementById('trId');
	var tdCnt=0;
	for(i=0;i<allType.length-1;i++)
	{
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

function classicStyle(){
	document.getElementById("grid_style").checked=false;
	document.getElementById("classicData").style.display='block';
	document.getElementById("gridData").style.display='none';
}

function test(obj)
{
	document.getElementById("viewType").style.visibility = "visible";
	document.getElementById("classicData").style.display='block';
	//alert('alert****'+obj.value);	
	document.getElementById("selClrType").value=obj.value;
	document.getElementById("rcnt").value="1";
	var table=document.getElementById('tab_in_chq');
	var tabRowCnt=table.rows.length;
	for(i=0;i<tabRowCnt-1;i++)
	{
		table.deleteRow(1);
	}
	table.rows.length=0;
//	alert('record****'+record);	
	setData_inwardchqs(record);
}
function setData_inwardchqs(rec)
{
	//alert(1);
	var rcnt=document.getElementById("rcnt").value;
	rec = record;
	if(rec.length>1)
	{

		rec = record;
		//alert(" setData_inwardchqs="+rec);
		var data=rec.split("$");

		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			imagedata=data;
			//alert(imagedata);
		//	alert("bclist[4]"+bclist[4]+"==="+document.getElementById("selClrType").value);
			
			if(document.getElementById("selClrType").value==specialClearingType)
				document.getElementById("selClrType").value=bclist[4];
				
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
					addRows_inwardchqs('tab_in_chq',bclist[6]);
				}
			}
		}
		var totAmt=0;
		var totChqs=0;
		//alert(data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			if(document.getElementById("selClrType").value==specialClearingType)
				document.getElementById("selClrType").value=bclist[4];
				
			if(bclist[4]==document.getElementById("selClrType").value)
			{
				var rcnt=totChqs+1;
				//document.getElementById("txt_chqno"+rcnt).value=bclist[1]+":"+bclist[2];
				document.getElementById("txt_chqno"+rcnt).value=bclist[1];
				document.getElementById("hd_imgNm"+rcnt).value=bclist[2];
				totAmt=(totAmt*1)+((bclist[3]*1));
				totChqs++;
				//totAmt=parseFloat((bclist[2]*1)/100);
			}
		}
		totAmt=totAmt/100;
		//alert('Total Amount:'+totAmt);
		document.getElementById("totalAmount").innerHTML=""+totAmt;
		document.getElementById("totalCheques").innerHTML=totChqs;
		
		if(cyclNo>0)
		{
			document.getElementById("cyclNo").innerHTML=cyclNo;
		}
		else
		{
			document.getElementById("cyclNo").innerHTML="-";
		}				
	}
	document.getElementById("waiting").style.display='none';
	if(rec.indexOf("SUCCESS")>-1)
	{
			document.getElementById("submitbutton").disabled = true;
	}
	//document.getElementById("sel_chq1").click();
	enlargeCheque_inwardchqs('img_frnt');
	document.getElementById("waiting").style.display='none';
	//alert(2);
}



function addRows_inwardchqs(tableID,isProbImg)
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
		if(isProbImg=='Y')
			element1.style.background="#ff0000";
		else
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
	
    var sendrec="";
	document.getElementById('img_frnt').src = null;
	document.getElementById('img_frnt').src = imgurl;
	
	
}
function makeTable(record)
{
	var allArrData=record.split("^");
	//alert("=="+allArrData);
	var table=document.getElementById("tab_co_cbs_datanew");
	var row = table.insertRow(1);

	var cell1 = row.insertCell(0);
	//cell1.style.width="10%";
	var element1 = document.createElement("input");
	element1.type = "text";
	element1.style.border="none";
	element1.style.background="transparent";
	element1.name="dyna_txt_chqnonew";
	element1.id="dyna_txt_chqnonew";
	element1.value=allArrData[0];
	element1.size="4";
	//if(selectedColor.indexOf('##rgb(255, 0, 0)##')!=0)
	//{
		//alert("in if");
		element1.setAttribute("readonly", "true");
	//}
	
	
	cell1.appendChild(element1);
	
	var cell2 = row.insertCell(1);
	//cell3.style.width="10%";
	var element2 = document.createElement("input");
	element2.type = "text";
	element2.style.border="none";
	element2.style.background="transparent";
	element2.name="dyna_txt_sortcdnew";
	element2.id="dyna_txt_sortcdnew";
	element2.value=allArrData[1];
	element2.size="6";
	//if(selectedColor.indexOf('##rgb(255, 0, 0)##')!=0)
	//{
		element2.setAttribute("readonly", "true");
	//}
	cell2.appendChild(element2);
	
	var cell3 = row.insertCell(2);
	//cell3.style.width="10%";
	var element3 = document.createElement("input");
	element3.type = "text";
	element3.style.border="none";
	element3.style.background="transparent";
	element3.name="dyna_txt_trancodenew";
	element3.id="dyna_txt_trancodenew";
	element3.value=allArrData[2];
	element3.size="6";
	//if(selectedColor.indexOf('##rgb(255, 0, 0)##')!=0)
	//{
		element3.setAttribute("readonly", "true");
	//}
	
	cell3.appendChild(element3);
	
	var cell4 = row.insertCell(3);
	//cell3.style.width="10%";
	var element4 = document.createElement("input");
	element4.type = "text";
	element4.style.border="none";
	element4.style.background="transparent";
	element4.name="dyna_txt_amountnew";
	element4.id="dyna_txt_amountnew";
	element4.value=((allArrData[3]*1)/100).toFixed(2);
	element4.size="10";
	//if(selectedColor.indexOf('##rgb(255, 0, 0)##')!=0)
	//{
		element4.setAttribute("readonly", "true");
	//}
	
	cell4.appendChild(element4);
	
	var cell5 = row.insertCell(4);
	//cell3.style.width="10%";
	var element5 = document.createElement("input");
	element5.type = "text";
	element5.style.border="none";
	element5.style.background="transparent";
	element5.name="dyna_txt_accnonew";
	element5.id="dyna_txt_accnonew";
	element5.value=allArrData[4];
	element5.size="10";
	//if(selectedColor.indexOf('##rgb(255, 0, 0)##')!=0)
	//{
		element5.setAttribute("readonly", "true");
	//}
	
	cell5.appendChild(element5);
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
					    cnt=cnt*1+1;
						document.getElementById("txt_chqno"+i).style.background = '#66CC99';
						//alert("selected chq :"+document.getElementById("txt_chqno"+i).value);
						var chq_dtl=document.getElementById("txt_chqno"+i).value;
						var imgName=document.getElementById("hd_imgNm"+i).value;
						document.getElementById("hd_selectCnt").value=cnt;
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
						document.getElementById('rotateImgName').value=imgName;
						document.getElementById("sel_chq"+i).style.background = '#66CC99';
						var baseurl1=document.URL;
						var p=baseurl1.lastIndexOf('/');
						baseurl1=baseurl1.substr(0,p+1);
						//for(t=0;t<imagedata.length-1;t++)
						//{
							//alert(imagedata);
							var sendrecget=imagedata[i-1].split("#");
							sendrec=sendrecget[5];
							//alert(sendrec);
							//alert(record);
							var selectCount=document.getElementById("hd_selectCnt").value;
							//alert('selectCount:'+selectCount);
							if(selectCount!=1)
							{
								document.getElementById("tab_co_cbs_datanew").deleteRow(1);
								makeTable(sendrec);
							}
							else
							{
								makeTable(sendrec);
							}
							
						//}
				}
				else
				{

					//alert("in elser"+color);
                if(color=='##rgb(255, 0, 0)##')
					{
						document.getElementById("txt_chqno"+i).style.background = '#ff0000';
						document.getElementById("sel_chq"+i).style.background = '#ff0000';
					}
					else if(color!='##rgb(255, 204, 204)##')
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
			menuOnClick("login.jsp")
		}
		else
		{
			document.getElementById("waiting").style.display='';
			var val=document.getElementById("hdMsg1").value;
			//alert(val);
			if(val!="N")
			{//1
				alert("val===="+val);
				var baseurl=document.URL;
				var p = baseurl.lastIndexOf("/?");
				baseurl = baseurl.substr(0,p+1);
				baseurl =baseurl +"main.jsp";
				//alert("baseurl:"+baseurl);
				location.replace(baseurl);

			}//1
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
			var data=res.split("~");
			//alert(res+"=res");
			//alert(data[0]+"=0 and data[1] "+data[1]);
			record=data[0];//res;
			cyclNo=data[1];
			//alert("after DownloadServlet res:"+res.indexOf('SUCCESS'));
			//res='SUCCESS';
			if(res.indexOf('SUCCESS') > -1)
			{
				alert('Converted Successfully');
				fetch_inward_cheques();
			}
			else
			{				
				alert("Image File Not Downloaded Properly\n Please Re-Download File(s) From FTP");
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

function getGridData(){
	document.getElementById("classic_style").checked=false;
	document.getElementById("classicData").style.display='none';
	document.getElementById("gridData").style.display='block';
			cbs_conti_flg= $('#cbs_conti_flg').val();	
			//alert("cbs_conti_flg="+cbs_conti_flg);
	if(gridcnt==0){
		gridcnt++;
	
	var url=document.URL;
	var p=url.lastIndexOf('/');
	imagePath = url.substr(0,p+1);
	imagePath = imagePath+"downloadpath_from_CHI/ClearingInward/Images/";
	baseurl=url.substr(0,p+1);
	baseurl=baseurl+"jsp/getClearingInwardData.jsp?cyclNo="+cyclNo+"&flag=N&cbs_flg="+cbs_conti_flg;
	//alert("baseurl====="+baseurl);//location.replace(baseurl);
	cts_Ajax_cle_inward_data(baseurl);
	}
}

function cts_Ajax_cle_inward_data(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_cle_inward_data;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_cle_inward_data;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_cle_inward_data()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText.trim();
			var updtRes = JSON.parse(res);
			//alert(updtRes.UPDATEFLAG);
			
			if(res.indexOf("NODATA")!=-1)
			{
				alert(" Clearing Inward Data Not Available!");
				var baseurl=document.URL;
				var p=baseurl.lastIndexOf('/');
				baseurl=baseurl.substr(0,p+1);
				baseurl=baseurl+"main.jsp";
				location.replace(baseurl);
				//location.replace(imagePath+"main.jsp");
			}
			else
			{	
				loadCleInwGrid(res,updtRes.UPDATEFLAG);
				
			}
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}
var myGrid;
function loadCleInwGrid(response,updateflag) 
{
	var data =JSON.parse(response);
	myGrid = new dhtmlXGridObject('filejsongrid');		
	myGrid.setImagePath("codebase/imgs/");	
	myGrid.setHeader("Select,Sr.No,BOFD Route Number,Cheque Number,Sort Code,Tran Code,Amount (In Rs.),Return Reason Code,Return Reason Comment,Account Number,Clearing Type,Image name,ItemSequence Number,Payee Name,Instrument Date,Update,old_sortcode,old_trancode,old_instrudate",null,
			["text-align:center;","text-align:center;","text-align:left;","text-align:center;","text-align:center;","text-align:center;","text-align:right;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:left;","text-align:right;","text-align:center;","text-align:center;","text-align:left;"],"text-align:left;","text-align:left;","text-align:left;");
	myGrid.attachHeader(",,,#text_filter,#select_filter,#select_filter,#numeric_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter");
	myGrid.setColumnIds("onSelect,rownum,CLI_BOFDROUTNO,CLI_SERIALNO,CLI_PAYORBANKROUTNO,CLI_TRANSCODE,CLI_AMOUNT,RTO_RETURNREASONCODE,RTO_RETREASONCOMMT,CLI_ACCOUNTNO,CLI_CLEARINGTYPE,CLI_IMAGEFILE3,CLI_CLRSRNO,CLI_PAYEENAME,CLI_INSTRUDATE,UPDATE,CLI_PAYORBANKROUTNO,CLI_TRANSCODE,CLI_INSTRUDATE");//CLI_ITEMSEQUENCENO
	if(updateflag=="Y"){
	myGrid.setInitWidths("0,40,0,60,70,50,70,0,0,120,0,0,0,100,70,70,0,0,0");	
	}
	else{
	myGrid.setInitWidths("0,50,0,70,80,60,80,0,0,100,0,0,0,140,70,0,0,0,0");	
	}
	myGrid.setColAlign("center,center,left,center,center,center,right,center,center,center,center,left,right,center,center,left,left,left,left");
	myGrid.setColTypes("ch,ro,ro,ro,ed,ed,ro,coro,ed,ro,ro,ro,ro,ed,ed,ro,ro,ro,ro");
	myGrid.setColSorting("str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,link,str,str,str");
	myGrid.attachEvent("onRowCreated",function(id){
		myGrid.cells(id,15).setValue("<input type='button'class='btn btn-primary btn-sm' value='Update'>");
	        return true;
	      });
	myGrid.attachEvent("onRowSelect", doOnRowSelected);
	myGrid.attachEvent("onEditCell", doOnCellEdit); 
	myGrid.attachEvent("onFilterEnd", function(indexes,values){
		var filtercnt=myGrid.getRowsNum();
		amount=0;
		for (var i=0; i<myGrid.getRowsNum(); i++){
		amount=amount+Number(myGrid.cells2(i,6).getValue());
		}
		document.getElementById("TotAmt").value=(amount*1).toFixed(2);
		document.getElementById("noOfchek").value=filtercnt;
		//alert(amount);
	    return true;
	    
	});
	myGrid.init();	
	var coro = myGrid.getCombo(7);
	coro.put("-1","-select-");
	
	for(i=0;i<data.RETCODES.length;i++)
	{
					
		coro.put(data.RETCODES[i].retcode,data.RETCODES[i].retdesc); 
		
	}
	
	myGrid.parse(data.ENTRIES,"js");	
	myGrid.attachEvent("onRowSelect", onRowSelect1);
	amount=0;
	myGrid.forEachRow(function(id)
	{
		myGrid.setRowTextStyle(id,"border-color:#a4bed4;");
		//alert(myGrid.cellById(id,9).getValue());
		if (myGrid.cellById(id,6).getValue().length >0)
		 {
			var am=Number(myGrid.cellById(id,6).getValue());
			 myGrid.cellById(id,6).setValue(((am*1)/100).toFixed(2))
		 }
		 if (myGrid.cellById(id,7).getValue().length >0)
		 {
			 myGrid.cellById(id,0).setValue(1)
		 }		 
		 amount=amount+Number(myGrid.cellById(id,6).getValue());
		 
	 });
	var filtercnt=myGrid.getRowsNum();
	document.getElementById("TotAmt").value=(amount*1).toFixed(2);
	document.getElementById("noOfchek").value=filtercnt;
	
 }



function onRowSelect1(id,ind)
{
	 var url = document.URL;
	 var p = url.lastIndexOf('/');
	 imgpath = url.substr(0,p+1);
	 imgpath = imgpath +"/downloadpath_from_CHI/ClearingInward/Images/";
	
	if(ind!=7)
	{
		if(ind!=8)
		{
			var singleChqNo=this.cellById(id,11).getValue();
			//var brncd=this.cellById(id,14).getValue();
			//imagePath= imagePath+"/Images/";
			//alert(imagePath+singleChqNo);
			document.getElementById('img_frnt1').src =imagePath+singleChqNo+".jpg";
			document.getElementById('rotateImgName').value=singleChqNo+".jpg";
			//enlargeCheque_outwardchqs('img_frnt');
		}
	}
}

function callTaskDetailForm(id) 
{
	 var sort_code = myGrid.cells(id, 4).getValue();
	 var tran_code = myGrid.cells(id, 5).getValue();
	 var item_seqno=  myGrid.cells(id, 12).getValue();
	 var old_sort_code = myGrid.cells(id, 16).getValue();
	 var old_tran_code = myGrid.cells(id, 17).getValue();
	 var cli_payeename = myGrid.cells(id, 13).getValue();
	 var cli_instrudate = myGrid.cells(id, 14).getValue();
	 var old_instrudate = myGrid.cells(id, 18).getValue();
	 var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	 
	// alert(cli_instrudate);
/*	 if(sort_code==old_sort_code && tran_code==old_tran_code && cli_instrudate==old_instrudate){
		 alert("Please Update Record First"); 
	 }
	 else*/
	  if(sort_code.length!=9){
		 alert("Please Enter 9 Digit Sort Code"); 
	 }
	 else if(tran_code.length!=3){
		 alert("Please Enter 3 Digit Transaction Code"); 
	 }
	 else if(cli_payeename.length==0){
		 alert("Please Enter Payee Name"); 
	 }
	 else if(cli_instrudate.length!=8 || /[a-zA-Z]/i.test(cli_instrudate)==true || format.test(cli_instrudate)==true){
		 alert("Please Enter Valid Instrument Date"); 
	 }
	 else{ 
		 	myGrid.cellById(id,16).setValue(sort_code);
		 	myGrid.cellById(id,17).setValue(tran_code);
		 	myGrid.cellById(id,18).setValue(cli_instrudate);
		 	myGrid.setRowColor(id,"yellow");
		 	var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/UpdateInwardClearing.jsp?sort_code="+sort_code+"&tran_code="+tran_code+"&item_seqno="+item_seqno+"&cli_payeename="+cli_payeename+"&cli_instrudate="+cli_instrudate;
			//location.replace(baseurl);
			cts_Ajax_cle_inward_update(baseurl);
	 }
	

}


function cts_Ajax_cle_inward_update(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_cle_inward_update;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_cle_inward_update;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_cle_inward_update()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			//alert(res.indexOf("NODATA"));
			if(res.indexOf("FAILED")!=-1)
			{
				alert(" Clearing Inward Update Failed");
			}
			else
			{	
				alert(" Clearing Inward Data Update Successfully");
				
			}
		}
		else
		{
			alert("Problem In Update Data");
		}
	}
}

function doOnCellEdit(stage, rowId, cellInd) {
	if (stage == 2) {
		if (cellInd == 5) 
		{
			 var trancode = myGrid.cells(rowId, 5).getValue();
			 trancode = String(trancode).padStart(3, '0');
			 //alert(trancode);
			 myGrid.cells(rowId, 5).setValue(trancode);
		}
	}
	return true;
}

function doOnRowSelected(rowId, cellId) 
{
	
	if (cellId == 15) 
	{
		callTaskDetailForm(rowId);
		
	}
}

function rotateImage() {
		
	
		var imagenames=document.getElementById("rotateImgName").value;
		//alert(imagenames);
    	if (confirm("Do You Wan't Rotate Image")) {
	    var url=document.URL;
		var p=url.lastIndexOf('/');
		baseurl=url.substr(0,p+1);
		baseurl=baseurl+"jsp/rotateImages.jsp?imagenames="+imagenames;
		//location.replace(baseurl);
		cts_Ajax_rotateImage(baseurl);
	  }
}

function cts_Ajax_rotateImage(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_rotateImage;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_rotateImage;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

		

function cts_process_rotateImage()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			//alert(res.indexOf("NODATA"));
			if(res.indexOf("FAILED")!=-1)
			{
				alert("Image Rotation Failed");
			}
			else if(res.indexOf("SUCCESS")!=-1)
			{
				 var imgName=document.getElementById("rotateImgName").value;
				 var redioChecked=document.getElementById("classic_style").checked;
				 var url = document.URL;
				 var p = url.lastIndexOf('/');
				 imgpath = url.substr(0,p+1);
				 imgpath = imgpath +"/downloadpath_from_CHI/ClearingInward/Images/";
				 //alert(redioChecked);
				 if(redioChecked==true){
				 document.getElementById('img_frnt').src =imgpath+imgName;
						/*console.log($("#img_frnt").css('transform'));
						if ($("#img_frnt").css('transform') == 'none') {
						$("#img_frnt").css({'transform': 'rotate(-180deg)'});
						} else {
						$("#img_frnt").css({'transform': ''});
						};*/
					}
					else{
				document.getElementById('img_frnt1').src =imgpath+imgName;
						/*console.log($("#img_frnt1").css('transform'));
						if ($("#img_frnt1").css('transform') == 'none') {
						$("#img_frnt1").css({'transform': 'rotate(-180deg)'});
						} else {
						$("#img_frnt1").css({'transform': ''});
						};*/
					}
				 //document.getElementById('img_frnt').src ="downloadpath_from_CHI/ClearingInward/Images/"+imgName;
				 //$("#img_frnt").attr("src","downloadpath_from_CHI/ClearingInward/Images/"+imgName);
				 //alert(imgpath+imgName);
				 //alert("Image Rotate Successfully");
				 //fetchValues_inwardchqs();
				alert("Image Rotate Successfully");
			}
		}
		else
		{
			alert("Problem In Image Rotation");
		}
	}
}
