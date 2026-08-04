// JavaScript Document
var	flg='false';
var allResponseString="";
var allFileStatus="";
var allReason="";
var rejectResonCount=0;
var nonRejectResonCount=0;
var disableBtnCnt=0;
var onFileStatus=0;
function onLoad_responseFile()
{
	//alert('onLoad_responseFile 1111');
	document.getElementById("waiting").style.display='';
	
	var baseurl=document.URL;
	var p=baseurl.lastIndexOf('/');
	baseurl=baseurl.substr(0,p+1);
	//alert(baseurl);
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{
		
		alert("Your Session Has Been Expired. Please Login Again.");	
		//baseurl=baseurl+"login.jsp?flag=1";
		//location.replace(baseurl);
		menuOnClick("login.jsp");
	}
	else
	{
		var d=document.getElementById("menu_return_outward");
		d.className = ' active';
		var hdMsg=document.getElementById('hdMsg1').value;	
		//alert('onLoad_responseFile:>>'+hdMsg);
		//alert('onLoad_responseFile:>>'+hdMsg);
		//alert('onLoad_responseFile:>>'+hdMsg);
		if(hdMsg.indexOf('Record is Updated')>-1 || hdMsg.indexOf('Record Not Updated')>-1)
		{//1
				if(hdMsg.indexOf('Record is UpdatedCO::')>-1)
				{
					var retval=confirm('Record is Updated. Do you want to resend it to Outward Clearing.?');
					if (retval==true)
					{
					   	baseurl=baseurl+"outward_clearing.jsp?msg=FIRSTTIME";
						location.replace(baseurl);
					}
				}
				else if(hdMsg.indexOf('Record is UpdatedRO::')>-1)
				{
					var retval=confirm('Record is Updated. Do you want to resend it to Return Outward.?');
					if (retval==true)
					{
					   	baseurl=baseurl+"return_outward.jsp?btnVal=Update";
						location.replace(baseurl);
					}
				}				
				else
				{
						//alert('hdMsg:>>'+hdMsg);
						if(hdMsg.indexOf("No Corresponding Record Found At Return Outward Table")>-1)
						{
							alert('No Corresponding Record Found At Return Outward Table');	
						}
						else if(hdMsg.indexOf("No Corresponding Record Found At Clearing Outward Table")>-1)
						{
							alert('No Corresponding Record Found At Clearing Outward Table');								
						}
						else
						{
							alert('Record Not Updated');
						}
				}
				
				document.getElementById("waiting").style.display='none';
		}
		else
		{
			baseurl=baseurl+"jsp/responseFileRead.jsp";
			cts_AjaxData_readResponseFile(baseurl);
		}
	}
}//onLoad_responseFile
function cts_AjaxData_readResponseFile(url)
{	
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_readResponseFile;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_readResponseFile;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_readResponseFile()
{//cts_process_readResponseFile
 
  if(req.readyState == 4)
	{//1
		if(req.status == 200)
		{//2
				var allData=req.responseText;
				//alert('allData'+allData);
				var allText=allData.split('#');
				//alert('allText[0]'+allText[0]);
				if(allText[0].indexOf('SUCCESS')>-1)
				{//3
					alert('Reponse File Read Successfully.');
					document.getElementById("waiting").style.display='none';
				}//3
				else 
				{//3
					alert(allText[0].trim());
					document.getElementById("waiting").style.display='none';
				}//3

		}//2
		else
		{//2			
			alert("Problem In Retrieving Data.Please Check The Server Connection.");		
			document.getElementById("waiting").style.display='none';
		}//2
	}//1
}//cts_process_readResponseFile

function onChangeResponseType()
{
	//alert('onChangeResponseType()');
	
	disableBtnCnt=0;
	onFileStatus=0;
	var baseurl=document.URL;
	var p=baseurl.lastIndexOf('/');
	baseurl=baseurl.substr(0,p+1);
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{
		
		alert("Your Session Has Been Expired. Please Login Again.");	
		//baseurl=baseurl+"login.jsp";
				//location.replace(baseurl);
				menuOnClick("login.jsp");
	}
	else
	{
		var opt_responseType=document.getElementById('opt_responseType').value;
		//alert('opt_responseType:>>'+opt_responseType);
		if(opt_responseType==0)
		{
			alert('Select Reponse Type.');	
			document.getElementById('opt_responseType').focus();
			resetRow();
		}
		else
		{
			baseurl=baseurl+"jsp/getResponseFileValues.jsp?opt_responseType="+opt_responseType;
			cts_AjaxData_getResponseFileValues(baseurl);
		}
		
	}
}//onChangeResponseType()
function cts_AjaxData_getResponseFileValues(url)
{	
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_getResponseFileValues;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_getResponseFileValues;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}//cts_AjaxData_getResponseFileValues

function cts_process_getResponseFileValues()
{//cts_process_readResponseFile
 
  if(req.readyState == 4)
	{//1
		if(req.status == 200)
		{//2
				var allData=req.responseText;
				if(allData.indexOf('No Record Found For Given Type.')>-1)
				{//3
					alert('No Record Found For Given Type.');
				}//3
				else
				{//3
					//alert('allData:>>'+allData);
					allResponseString=allData;
					var allStr=allData.split('!#!');
					var rCnt=document.getElementById("rCnt").value;
					//alert('cts_process rCnt:>>'+rCnt);
					if(rCnt!=0)
					{
						resetRow();	
					}
					for(i=0;i<allStr.length-1;i++)
					{//3.1
						var singleResponseFileRecord=allStr[i].split("#");
						makeRows(singleResponseFileRecord);
					}//3.1
					//drawTable();		
				}//3
				
					//alert('allFileStatus:>>'+allFileStatus);
					/*alert('allReason:>>'+allReason);							
					var arr=allFileStatus.split("#");
					alert('arr Length:'+arr.length);
					var zeroReason=0;
					var nonZeroReason=0;
					for(i=0;i<arr.length;i++)
					{
						alert('arr[i]:>>'+arr[i]);
						if(arr[i]=='0'||arr[i]=='00')
						{
							zeroReason++;
						}						
					}
					
					for(i=0;i<arr.length;i++)
					{
						alert('arr[i]:>>'+arr[i]);
						if((arr[i]!='0'||arr[i]!='00') && arr[i]!='')
						{
							nonZeroReason++;
						}						
					}*/
					
					//alert('=== onFileStatus:'+onFileStatus);
					//alert('=== disableBtnCnt:'+disableBtnCnt);
					//if(zeroReason>0 && nonZeroReason==0)
					if(disableBtnCnt>0)
					{//1
						document.getElementById('submitbutton').disabled=true;
					}//1
					else if(onFileStatus>0)
					{
						document.getElementById('submitbutton').disabled=false;	
					}

		}//2
		else
		{//2			
			alert("Problem In Retrieving Data.Please Check The Server Connection.");		
			document.getElementById("waiting").style.display='none';
		}//2
	}//1
}//cts_process_readResponseFile
function resetRow()
{
	document.getElementById("tbl_details").innerHTML="";
	flg='true';
}//end resetRow()
function makeRows(singleResponseFileRecord)
{
	
		//CREATIONDATE,CREATIONTIME,FILESTATUSCODE,ITEMSEQNO,SERIALNO,REJECTREASON,FILENAME
		//0              1             2              3          4        5           6 
		
		var CREATIONDATE=singleResponseFileRecord[0];
		var CREATIONTIME=singleResponseFileRecord[1];
		var FILESTATUSCODE=singleResponseFileRecord[2];
		var ITEMSEQNO=singleResponseFileRecord[3];
		var SERIALNO=singleResponseFileRecord[4];
		var REJECTREASON=singleResponseFileRecord[5];
		
		var rCnt=0;
		var table=document.getElementById("tbl_details");
		if(flg=='false')
		{
			rCnt=document.getElementById("rCnt").value;
			//alert('makeRows rCnt:>>'+rCnt);	
		}
		else
		{
			document.getElementById("rCnt").value=0;
			rCnt=document.getElementById("rCnt").value;
		}
		
		var row = table.insertRow(rCnt);		
		var cell1 = row.insertCell(0);
		//cell1.style.width="25%";
		var element1 = document.createElement("input");
		element1.type = "text";
		element1.size="15";
		element1.style.border="none";
    	element1.style.background="transparent";
		element1.name="dyna_txt_creationDate";
		element1.id="dyna_txt_creationDate";
		element1.value=CREATIONDATE;
		element1.setAttribute("readonly", "false");
		cell1.appendChild(element1);
		
		var cell2 = row.insertCell(1);
		//cell2.style.width="25%";
		var element2 = document.createElement("input");
		element2.type = "text";
		element2.size="15"
		element2.style.border="none";
		element2.style.background="transparent";
		element2.name="dyna_txt_CREATIONTIME";
		element2.id="dyna_txt_CREATIONTIME";
		element2.value=CREATIONTIME;
		element2.setAttribute("readonly", "false");
		cell2.appendChild(element2);
		
		var cell3 = row.insertCell(2);
		//cell3.style.width="25%";
		var element3 = document.createElement("input");
		element3.type = "text";
		element3.size="19"		
		element3.style.border="none";
		element3.style.background="transparent";
		element3.name="dyna_txt_FILESTATUSCODE";
		element3.id="dyna_txt_FILESTATUSCODE";
		element3.value=FILESTATUSCODE;
		element3.setAttribute("readonly", "false");
		cell3.appendChild(element3);
		
		allFileStatus+=FILESTATUSCODE+"#";
		
		var cell4 = row.insertCell(3);
		//cell4.style.width="25%";
		var element4 = document.createElement("input");
		element4.type = "text";
		element4.size="13"		
		element4.style.border="none";
		element4.style.background="transparent";
		element4.name="dyna_txt_ITEMSEQNO";
		element4.id="dyna_txt_ITEMSEQNO";
		element4.value=ITEMSEQNO;
		element4.setAttribute("readonly", "false");
		cell4.appendChild(element4);
		
		
		var cell5 = row.insertCell(4);
		//cell5.style.width="25%";
		var element5 = document.createElement("input");
		element5.type = "text";
		element5.size="15"		
		element5.style.border="none";
		element5.style.background="transparent";
		element5.name="dyna_txt_SERIALNO";
		element5.id="dyna_txt_SERIALNO";
		element5.value=SERIALNO;
		element5.setAttribute("readonly", "false");
		cell5.appendChild(element5);
		
		var cell6 = row.insertCell(5);
		//cell6.style.width="25%";
		var element6 = document.createElement("input");
		element6.type = "text";
		element6.size="15"		
		element6.style.border="none";
		element6.style.background="transparent";
		element6.name="dyna_txt_REJECTREASON";
		element6.id="dyna_txt_REJECTREASON";
		element6.value=REJECTREASON;
		element6.setAttribute("readonly", "false");
		cell6.appendChild(element6);
		
		if((FILESTATUSCODE=='0'||FILESTATUSCODE=='00') && (REJECTREASON=='0' || REJECTREASON=='00'))
		{
			//rejectResonCount++;		
			disableBtnCnt++;
		}
		else if(FILESTATUSCODE!='0'||FILESTATUSCODE!='00')
		{
			onFileStatus++;				
		}
		//else if()
		/*if(REJECTREASON=='0' || REJECTREASON=='00')
		{
			rejectResonCount++;	
		}
		else
		{
			nonRejectResonCount++;	
		}*/
		
		//allReason+=REJECTREASON+"#";
		rCnt=rCnt*1+1;
		document.getElementById('rCnt').value=rCnt;
		
		
}//makeRows

function onClickOfUpdate()
{
	
	//alert('onChangeResponseType()');
	
	var baseurl=document.URL;
	var p=baseurl.lastIndexOf('/');
	baseurl=baseurl.substr(0,p+1);
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{
		alert("Your Session Has Been Expired. Please Login Again.");	
		//baseurl=baseurl+"login.jsp";
		//location.replace(baseurl);
		menuOnClick("login.jsp");
	}
	else
	{
			
		//	alert('****** ---- 88 ---- ******');
		//first check file status and reason code.
		//var tableRows=document.getElementById("tbl_details").rows.length;		
			//alert('allResponseString:>>'+allResponseString);
			var selectType=document.getElementById("opt_responseType").value;
			//alert('selectType:>>'+selectType);
			if((allResponseString!='null' || allResponseString!="") && selectType=='C')
			{
				var retval1=confirm('Do u want Rescan this cheque.?');
				if (retval1==true)
				{
				
				document.getElementById('hiddenRec').value=allResponseString;
				document.getElementById('formid').action="jsp/updateResOutwadClearing.jsp";
				document.getElementById('formid').submit();
				}
				else
				{
					document.getElementById('hiddenRec').value=allResponseString;
					document.getElementById('formid').action="jsp/updateOutwadClearing.jsp";
					document.getElementById('formid').submit();
				}	
			}
			else if((allResponseString!='null' || allResponseString!="") && selectType=='R')
			{
				document.getElementById('hiddenRec').value=allResponseString;
				document.getElementById('formid').action="jsp/updateOutwadReturn.jsp";
				document.getElementById('formid').submit();	
			}
			else
			{
				alert('No Cheque Found.');
			}
	}//else
}//onClickOfUpdate

function cts_AjaxData_updateOutwadClearing(baseurl)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_updateOutwadClearing;
		req.open("GET", baseurl, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_updateOutwadClearing;
			req.open("GET", baseurl, true);
			req.send(null);
		}
	}	
}//cts_AjaxData_updateOutwadClearing
function cts_process_updateOutwadClearing()
{
	 if(req.readyState == 4)
	{//1
		if(req.status == 200)
		{//2
			var allData=req.responseText;
			//alert('allData>>>'+allData);
		}//2
		else
		{//2			
			alert("Problem In Retrieving Data.Please Check The Server Connection.");		
			document.getElementById("waiting").style.display='none';
		}//2
	}//1
}//cts_process_updateOutwadClearing
