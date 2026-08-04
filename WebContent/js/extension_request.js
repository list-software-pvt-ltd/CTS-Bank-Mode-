// JavaScript Document
var reserveExtensionRequestVal="";
function onLoad_extensionRequest()
{//onLoad_returnOutward()
		
	//alert("in onLoad_returnOutward()");	
	//var val=document.getElementById("hdMsg1").value;
	document.getElementById("submitbutton").disabled=false;;	
	
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
		var d=document.getElementById("menu_extension_request");
		d.className = ' active';
		var val=document.getElementById("hdMsg1").value;
		var btnVal=document.getElementById("btnVal").value;	
	//	alert('btnVal:>>'+btnVal);
		if(btnVal=='Update')
		{
			document.getElementById('submitbutton').value='Update Record';
		}		
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
				//baseurl=baseurl+"jsp/list_branches_RO.jsp";
				baseurl=baseurl+"jsp/getExtensionRequestFile.jsp";
				//location.replace(baseurl);
				cts_Ajax_ext_req1(baseurl);
				
			}
			else
			{
				alert("Return Outward File Creation Is Already Done For Today!");
			}
		}
	}		
}//onLoad_returnOutward()

function cts_Ajax_ext_req1(url)
{	
	//alert ("cts_Ajax_list_branches1");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_ext_req1;	
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_ext_req1;		
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_ext_req1()
{
 
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			//alert('res:'+res);
			reserveExtensionRequestVal=res;
			var retVal=res.split("#");					
			//var retVal=res.split("$");								
			//alert('retVal.length:\n'+retVal.length);
			// retVal.length is 2 if and only of when this string is not from getReturnOutwardImgPath method
			//if(retVal.length==2 && !(retVal.indexOf('!@!')>-1))
			if(retVal[1].indexOf('!@!')>-1)
			{		
				alert('Ready for Return Outward');
				setExtensionRequestData(retVal[1]);
			}
			else
			{
				alert(retVal[1]);	//For error message		
			}
			document.getElementById("waiting").style.display='none';
			//show_listof_branches1(res);					
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function setExtensionRequestData(responce)
{
	//alert('setExtensionRequestData=>> responce:'+responce);
	
	if(responce.indexOf("!@!")>-1)
	{
		document.getElementById('hdRec').value=responce;		
		var data=responce.split("!@!");
		//document.getElementById('hdRec').value=data;
		//alert('setExtensionRequestData=>> Data:'+data);
		for(t=0;t<data.length-1;t++)
		{
			//alert(data[t]);
			addRows_ExtReq_detail('extreq');
		}
		var totAmt=0,wrongRetCdCnt=0;
		//alert(data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("!Q!");		
			var rcnt=t*1+1;	
			
			
			//alert('rnct:'+rcnt);			
			/*alert('bclist[0]:'+bclist[0]);
			alert('bclist[1]:'+bclist[1]);
			alert('bclist[2]:'+bclist[2]);
			alert('bclist[3]:'+bclist[3]);
			alert('bclist[4]:'+bclist[4]);*/
			//document.getElementById("txt_chqno"+rcnt).value=bclist[1]+":"+bclist[2];
			//alert('bclist[7]:'+bclist[5]);
			var amt=parseFloat((bclist[3]*1)/100);
			if(bclist[6]!='0')
			{			
				document.getElementById("txt_srno"+rcnt).style.color="#FF0000";
				document.getElementById("txt_srno"+rcnt).value=rcnt;
				document.getElementById("txt_chqno"+rcnt).style.color="#FF0000";
				document.getElementById("txt_chqno"+rcnt).value=bclist[0];
				document.getElementById("txt_sortcd"+rcnt).style.color="#FF0000";
				document.getElementById("txt_sortcd"+rcnt).value=bclist[1];
				document.getElementById("txt_trancd"+rcnt).style.color="#FF0000";
				document.getElementById("txt_trancd"+rcnt).value=bclist[2];
				//document.getElementById("txt_amount"+rcnt).value=bclist[3];
				document.getElementById("txt_amount"+rcnt).style.color="#FF0000";
				document.getElementById("txt_amount"+rcnt).value=amt;
				document.getElementById("txt_reasoncd"+rcnt).style.color="#FF0000";
				document.getElementById("txt_reasoncd"+rcnt).value=bclist[4];
				document.getElementById("txt_period"+rcnt).style.color="#FF0000";
				document.getElementById("txt_period"+rcnt).value=bclist[7];
				if(bclist[4]*1==0)
				{
					wrongRetCdCnt++;
				}
			}
			else
			{
				document.getElementById("txt_srno"+rcnt).value=rcnt;
				document.getElementById("txt_chqno"+rcnt).value=bclist[0];
				document.getElementById("txt_sortcd"+rcnt).value=bclist[1];
				document.getElementById("txt_trancd"+rcnt).value=bclist[2];
				//document.getElementById("txt_amount"+rcnt).value=bclist[3];
				document.getElementById("txt_amount"+rcnt).value=amt;
				document.getElementById("txt_reasoncd"+rcnt).value=bclist[4];
				document.getElementById("txt_period"+rcnt).value=bclist[7];
				if(bclist[4]*1==0)
				{
					wrongRetCdCnt++;
				}	
			}
			totAmt=(totAmt*1)+parseFloat((bclist[3]*1)/100);
			//totAmt=parseFloat((bclist[2]*1)/100);			
		}
		if(wrongRetCdCnt>0)
		{
			document.getElementById("msgtd").innerText="Wrong Reject Reason Code For "+wrongRetCdCnt+" Items.";
			//document.getElementById("submitbutton").disabled=true;
		}
		else
		{
			//document.getElementById("submitbutton").disabled=false;
			document.getElementById("msgtd").innerText="";
		}
		//alert('Total Amount:'+totAmt);
		document.getElementById("grdAmt").value=totAmt;
		//document.getElementById("totalCheques").innerText=t;
	}
}
function addRows_ExtReq_detail(tableID)
{
	var table=document.getElementById(tableID);
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		//alert(rowCount);
		
		var row = table.insertRow(rowCount);
		
		var cell1 = row.insertCell(0);
		//cell1.style.width="10%";
		var element1 = document.createElement("input");
		element1.type = "text";
		//element1.style.display="none";
		element1.style.border="none";
    	element1.style.background="transparent";
		element1.name="txt_srno"+rcnt;
		element1.id="txt_srno"+rcnt;
		element1.value=rcnt;
		element1.size="2";
		element1.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell1.appendChild(element1);
		
		var cell2 = row.insertCell(1);
		//cell2.style.width="15%";
		var element2 = document.createElement("input");
		element2.type = "text";
		//element2.style.display="none";
		element2.style.border="none";
    	element2.style.background="transparent";
		element2.name="txt_chqno"+rcnt;
		element2.id="txt_chqno"+rcnt;
		element2.value=rcnt;
		element2.size="6";
		element2.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell2.appendChild(element2);			
		
		
		var cell3 = row.insertCell(2);
		//cell3.style.width="15%";
		var element3 = document.createElement("input");
		element3.type = "text";
		//element3.style.display="none";
		element3.style.border="none";
    	element3.style.background="transparent";
		element3.name="txt_sortcd"+rcnt;
		element3.id="txt_sortcd"+rcnt;
		element3.value=rcnt;
		element3.size="9";
		element3.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell3.appendChild(element3);
		
		var cell4 = row.insertCell(3);
		//cell4.style.width="15%";
		var element4 = document.createElement("input");
		element4.type = "text";
		//element4.style.display="none";
		element4.style.border="none";
    	element4.style.background="transparent";
		element4.name="txt_trancd"+rcnt;
		element4.id="txt_trancd"+rcnt;
		element4.value=rcnt;
		element4.size="3";
		element4.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell4.appendChild(element4);
		
		var cell5 = row.insertCell(4);
		//cell5.style.width="15%";
		var element5 = document.createElement("input");
		element5.type = "text";
		//element5.style.display="none";
		element5.style.border="none";
    	element5.style.background="transparent";
		element5.name="txt_amount"+rcnt;
		element5.id="txt_amount"+rcnt;
		element5.value=rcnt;
		element5.style.textAlign="right";
		element5.size="15";
		element5.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell5.appendChild(element5);
		
		
		var cell6 = row.insertCell(5);
		//cell6.style.width="15%";
		var element6 = document.createElement("input");
		element6.type = "text";
		//element6.style.display="none";
		element6.style.border="none";
    	element6.style.background="transparent";
		element6.name="txt_reasoncd"+rcnt;
		element6.id="txt_reasoncd"+rcnt;
		element6.value=rcnt;
		element6.size="2";
		//element6.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell6.appendChild(element6);
		
		
		var cell7 = row.insertCell(6);
		//cell7.style.width="15%";
		var element7 = document.createElement("input");
		element7.type = "text";
		//element7.style.display="none";
		element7.style.border="none";
    	element7.style.background="transparent";
		element7.name="txt_period"+rcnt;
		element7.id="txt_period"+rcnt;
		element7.size="2";
		element7.value=rcnt;
		cell7.appendChild(element7);
	
		rcnt=rcnt*1+1;
		//alert("addRows_inwardchqs rcnt:"+rcnt);
		document.getElementById("rcnt").value=rcnt;		
		
		document.getElementById("waiting").style.display='none';
}
function convertExtensionFile()
{
	var table=document.getElementById("extreq");
	var rowCount=table.rows.length;
	var retstr="";
	var validateReasonCd=0;
	for(i=1;i<=rowCount-1;i++)
	{
		var chqno=document.getElementById("txt_chqno"+i).value;
		var sortcode=document.getElementById("txt_sortcd"+i).value;
		var reasonCode=document.getElementById("txt_reasoncd"+i).value;
		var period=document.getElementById("txt_period"+i).value;
		if((isNaN(reasonCode)))
		{
		 	validateReasonCd++;
		}
		retstr=retstr+chqno+"!Q!"+sortcode+"!Q!"+reasonCode+"!Q!"+period+"!A!";
	}
	//alert(retstr);
	//alert('validateReasonCd:>>'+validateReasonCd);
	if(validateReasonCd==0)
	{
		var url=document.URL;
		var p=url.lastIndexOf('/');
		var baseurl=url.substr(0,p+1);
		//baseurl=baseurl+"jsp/list_branches_RO.jsp";
		document.getElementById("waiting").style.display='';
		baseurl=baseurl+"jsp/updateExtensionRequest.jsp?updateString="+retstr;
		//alert('baseurl:'+baseurl);
		cts_ExtReqAjaxData1(baseurl);
	}
	else
	{
		alert('Return Reason Code Must Be Numeric');	
	}
}

function cts_ExtReqAjaxData1(baseurl)
{
	//alert ("cts_AjaxData5");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_ExtReqprocess5;	
		req.open("GET", baseurl, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_ExtReqprocess5;		
			req.open("GET", baseurl, true);
			req.send(null);
		}
	}
}

function cts_ExtReqprocess5()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var response=req.responseText;
			//alert('response:>>'+response);	
			if(response.indexOf('SUCCESS')>-1)
			{
				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/generateExtensionRequest.jsp";
				//location.replace(baseurl);
				cts_AjaxData6(baseurl);	
			}
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function cts_AjaxData6(url)
{
	//alert ("cts_AjaxData5");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process6;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process6;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process6()
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
		//alert('methodReturnOutward()'+res);
		if(res.indexOf("Problem")>-1)
		{
			alert(res.split("#")[1]);
		}
		else if(res.indexOf("No return outward Cheque")>-1)
		{
				alert('No return outward Cheque');
		}
		else
		{
			alert(res.split("#")[1]);
			document.getElementById("submitbutton").disabled=true;
		}
		document.getElementById("waiting").style.display='none';
}

function show_warning()
{
	//alert('show_warning');		
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
		var url=document.URL;
		var p=url.lastIndexOf('/');
		var baseurl=url.substr(0,p+1);
		
		baseurl=baseurl+"getRo_Warning.jsp";
		//alert(baseurl);
		document.getElementById("para_form").style.display='';
		document.getElementById("center_frm").style.display='';
		document.getElementById("center_frm").src=baseurl;	
	}
}//show_warning

function closeWindow()
{
	//alert('closeWindow');
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
		document.getElementById("para_form").style.display='none';
	}
}
