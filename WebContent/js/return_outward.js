var cycNo="";
var flag=false;
	var cbs_conti_flg = "";
function onLoad_returnOutward()
{	
	//alert("SAM");
	document.getElementById("yespickfile").style.display = 'none';
				document.getElementById("divhide").style.display = 'none';
	document.getElementById("submitbutton").disabled=false;
	var session_loginid = document.getElementById("session_loginid").value;
	cbs_conti_flg = document.getElementById("cbs_conti_flg").value;
	if(session_loginid == "null")
	{
		alert("Your Session Has Been Expired. Please Login Again.");		
		menuOnClick("login.jsp");
	}
	else
	{
		var d=document.getElementById("menu_return_outward");
		d.className = ' active';
		var val=document.getElementById("hdMsg1").value;
		var ret=document.getElementById("ret").value;
		var filename=document.getElementById("filename").value;
		//alert("filename="+filename);
		if(val!="N")	
		{
			alert(val);
			document.getElementById("submitbutton").disabled=true;
			document.getElementById("waiting").style.display='none';
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			document.getElementById("formid").action="main.jsp";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").submit();
		}
		else
		{
			var hddoICallMerge=document.getElementById("hddoICallMerge").value;
		    var Flag="";
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
			
			//alert("hddoICallMerge=="+hddoICallMerge+" & ret="+ret);	
			if(hddoICallMerge=="Y" && ret=="SUCCESS")
			{
				document.getElementById("divhide").style.display = '';
				document.getElementById("waiting").style.display='';
				document.getElementById("yespickfile").style.display = 'none';
				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/getReturnOutwardFile.jsp?filename="+filename;
				cts_Ajax_list_branches1(baseurl);
			}
			else if(ret!="NA" && hddoICallMerge!="Y")
			{
				alert("Return Outward File Creation Is Already Done For Today!");
			}
		}
	}
}//onLoad_returnOutward()

function uploadFiles()
{	
	document.getElementById("divhide").style.display = 'none';
	var selected_file=document.getElementById("file_pick").value;
	var n =selected_file.length;
	var val=selected_file.lastIndexOf("From_CBS");
	selected_file = selected_file.substr(val, n);
	
	if(document.getElementById("file_pick").value=="")
	{
		alert('Please Select File.');
		return false;
	}
	else if(selected_file.indexOf(".txt") == -1 && selected_file.indexOf("From_CBS") == -1)
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
function cts_Ajax_list_branches1(url)
{
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
			//alert('res:'+res);
			reserveReturnOutwardVal=res;
			var retVal=res.split("#");
			document.getElementById('data').value=retVal[1];
			
			//var retVal=res.split("$");
			//alert('retVal.length:\n'+document.getElementById('data').value);
			// retVal.length is 2 if and only of when this string is not from getReturnOutwardImgPath method
			//if(retVal.length==2 && !(retVal.indexOf('!@!')>-1))
			if(retVal[1].indexOf('!@!')>-1)
			{
				alert('Ready for Return Outward');
					//alert('retVal[1]===='+retVal[1]);
				setReturnOutwardData(retVal[1]);
			}
			else
			{
				//alert('Return Outward:\n'+retVal[1]);	//For error message
				//set return outward chequ(s) from specified path...
				//setReturnOutwardCheques(reserveReturnOutwardVal);

				//NOTE:==>remove commant when show cheque.
				//--reserveReturnOutwardVal=reserveReturnOutwardVal.substring(1,reserveReturnOutwardVal.length);
				//setData_inwardchqs(reserveReturnOutwardVal);//this function is for show list od cheques

				//NOTE:==>remove commant when show cheque.
				//--setData_ReturnOutwardchqs(reserveReturnOutwardVal);
				//alert('reserveVal.split().length::'+reserveVal.split('$').length);
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

function setReturnOutwardData(responce)
{
	//cycNo
var myVal=responce.split("$");
//alert("myVal=="+myVal);

	cycNo=myVal[1];
	//alert("SAM cycNo=="+cycNo);
	if(cycNo=="NA")
	{
		$('#cyclnotxt').prop('disabled','disabled');
		$('#cntCycl').prop('disabled','disabled');
		$('#cyclno').prop('disabled','disabled');
	}
	if(responce.indexOf("!@!")>-1)
	{
		var data=responce.split("!@!");
		for(t=0;t<data.length-1;t++)
		{
			//alert(data[t]);
			addRows_RetOwd_detail('retowd');
		}
		var totAmt=0,totAcctAmt=0,totRejAmt=0;
		var acc_amt=0,acc_cnt=0,rej_cnt=0;
			var rej_amt=0;
		//alert(data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("!Q!");
			var rcnt=t*1+1;
		
		
			if(bclist[7]=='0'){
				document.getElementById("txt_srno"+rcnt).style.backgroundColor = "red";
				document.getElementById("txt_chqno"+rcnt).style.backgroundColor = "red";
				document.getElementById("txt_sortcd"+rcnt).style.backgroundColor = "red";
				document.getElementById("txt_trancd"+rcnt).style.backgroundColor = "red";
				document.getElementById("txt_amount"+rcnt).style.backgroundColor = "red";
				document.getElementById("txt_reasoncd"+rcnt).style.backgroundColor = "red";
				
				document.getElementById("txt_srno"+rcnt).style.color  = "white";
				document.getElementById("txt_chqno"+rcnt).style.color  = "white";
				document.getElementById("txt_sortcd"+rcnt).style.color  = "white";
				document.getElementById("txt_trancd"+rcnt).style.color  = "white";
				document.getElementById("txt_amount"+rcnt).style.color  = "white";
				document.getElementById("txt_reasoncd"+rcnt).style.color  = "white";
			}
			
			
			document.getElementById("txt_srno"+rcnt).value=rcnt;
			document.getElementById("txt_chqno"+rcnt).value=bclist[0];
			document.getElementById("txt_sortcd"+rcnt).value=bclist[1];
			document.getElementById("txt_trancd"+rcnt).value=bclist[2];
			document.getElementById("txt_amount"+rcnt).value=parseFloat((bclist[3]*1)/100);//bclist[3];			
			document.getElementById("txt_reasoncd"+rcnt).value=bclist[4];
			//var amt=parseFloat((bclist[3]*1)/100);
			var rescode=bclist[4].split("--");
			
			if(rescode[0]=="00"){
				
				acc_amt=parseFloat((bclist[3]*1)/100);			
				totAcctAmt=totAcctAmt+acc_amt;
				acc_cnt=acc_cnt+1;
			}
			else{
				rej_amt=parseFloat((bclist[3]*1)/100);
				totRejAmt=totRejAmt+rej_amt;
				rej_cnt=rej_cnt+1;
			}
			
			document.getElementById("txt_reasoncmmt"+rcnt).value=bclist[5].trim();
			document.getElementById("txt_itemseqno"+rcnt).value=bclist[8].trim();
			
			//document.getElementById("txt_cycno"+rcnt).value=bclist[9].trim();
			
			totAmt=(totAmt*1)+parseFloat((bclist[3]*1)/100);
							
		}
		//document.getElementById("grdAmt").value=totAmt;
		
			document.getElementById("cyclno").value=cycNo;
		document.getElementById("grdAmt").value=totAmt;
		document.getElementById("grdchq").value=rcnt;
		document.getElementById("accAmt").value=totAcctAmt;
		document.getElementById("rejAmt").value=totRejAmt;	
		document.getElementById("gdAccpt").value=acc_cnt;
		document.getElementById("rejchq").value=rej_cnt;		
		//document.getElementById("totalCheques").innerText=t;
	}
}


function addRows_RetOwd_detail(tableID)
{
	var table=document.getElementById(tableID);
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		//alert(rcnt);

		var row = table.insertRow(rowCount);

		var cell1 = row.insertCell(0);
		//cell1.style.width="10%";
		var element1 = document.createElement("input");
		element1.type = "text";
		element1.style.width="50px"; 
		element1.style.border="none";
    	element1.style.background="transparent";
		element1.name="txt_srno"+rcnt;
		element1.id="txt_srno"+rcnt;
		element1.value=rcnt;
		//element1.size="13";
		element1.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell1.appendChild(element1);

		var cell2 = row.insertCell(1);
		//cell2.style.width="20%";
		var element2 = document.createElement("input");
		element2.type = "text";
		element2.style.width="100px"; 
		element2.style.border="ridge";
    	element2.style.background="transparent";
		element2.name="txt_chqno"+rcnt;
		element2.id="txt_chqno"+rcnt;
		element2.value=rcnt;
		//element1.size="13";
		element2.setAttribute("editable", "true");
		//element1.disabled=true;
		cell2.appendChild(element2);


		var cell3 = row.insertCell(2);
		//cell3.style.width="20%";
		var element3 = document.createElement("input");
		element3.type = "text";
		element3.style.width="100px"; 
		element3.style.border="ridge";
    	element3.style.background="transparent";
		element3.name="txt_sortcd"+rcnt;
		element3.id="txt_sortcd"+rcnt;
		element3.value=rcnt;
		//element1.size="13";
		element3.setAttribute("editable", "true");
		//element1.disabled=true;
		cell3.appendChild(element3);

		var cell4 = row.insertCell(3);
		//cell4.style.width="10%";
		var element4 = document.createElement("input");
		element4.type = "text";
		element4.style.width="60px"; 
		element4.style.border="ridge";
    	element4.style.background="transparent";
		element4.name="txt_trancd"+rcnt;
		element4.id="txt_trancd"+rcnt;
		element4.value=rcnt;
		//element1.size="13";
		element4.setAttribute("editable", "true");
		//element1.disabled=true;
		cell4.appendChild(element4);

		var cell5 = row.insertCell(4);
		//cell5.style.width="20%";
		var element5 = document.createElement("input");
		element5.type = "text";
		element5.style.width="110px"; 
		element5.style.border="ridge";
    	element5.style.background="transparent";
		element5.name="txt_amount"+rcnt;
		element5.id="txt_amount"+rcnt;
		element5.value=rcnt;
		element5.style.textAlign="right";
		//element1.size="13";
		element5.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell5.appendChild(element5);

		var cell6 = row.insertCell(5);
		//cell6.style.width="10%";
		var element6 = document.createElement("input");
		element6.type = "text";
		element6.style.width="300px"; 
		element6.style.border="ridge";
    	element6.style.background="transparent";
		element6.name="txt_reasoncd"+rcnt;
		element6.id="txt_reasoncd"+rcnt;
		element6.value=rcnt;
		//element1.size="13";
		element6.setAttribute("editable", "true");
		//element1.disabled=true;
		cell6.appendChild(element6);
		
		var cell7 = row.insertCell(6);
		//cell7.style.width="10%";
		var element7 = document.createElement("input");
		element7.type = "text";
		element7.style.width="150px"; 
		element7.style.border="ridge";
    	element7.style.background="transparent";
		element7.name="txt_reasoncmmt"+rcnt;
		element7.id="txt_reasoncmmt"+rcnt;
		//element7.value=rcnt;
		//element1.size="13";
	    element7.setAttribute("editable", true);
		//element1.disabled=true;
		cell7.appendChild(element7);
		
		var cell8 = row.insertCell(7);
		//cell8.style.width="0%";
		var element8 = document.createElement("input");
		element8.type = "hidden";
		element8.style.width="0px"; 
		element8.style.border="ridge";
		element8.style.background="transparent";
		element8.name="txt_itemseqno"+rcnt;
		element8.id="txt_itemseqno"+rcnt;
		//element7.value=rcnt;
		//element1.size="13";
		element8.setAttribute("editable", true);
		//element1.disabled=true;
		cell8.appendChild(element8);

//------------------------------------
/*var cell9 = row.insertCell(8);
		var element9 = document.createElement("input");
		element9.type = "hidden";
		element9.style.width="100px"; 
		element9.style.border="ridge";
		element9.style.background="transparent";
		element9.name="txt_cycno"+rcnt;
		element9.id="txt_cycno"+rcnt;
		//element7.value=rcnt;
		//element1.size="13";
		element9.setAttribute("editable", true);
		//element1.disabled=true;
		cell9.appendChild(element9);
		*/

		rcnt=rcnt*1+1;
		//alert("addRows_inwardchqs rcnt:"+rcnt);
		document.getElementById("rcnt").value=rcnt;

		document.getElementById("waiting").style.display='none';
}

function updateRetOwdData()
{
	//alert(1010);
	var table=document.getElementById("retowd");
	var rowCount=table.rows.length;
	var retstr="";
	var validateReasonCd=0;
	for(i=1;i<=rowCount-1;i++)
	{
		var chqno=document.getElementById("txt_chqno"+i).value;
		var sortcode=document.getElementById("txt_sortcd"+i).value;
		var reasonCode=document.getElementById("txt_reasoncd"+i).value;
		var reasonComment=document.getElementById("txt_reasoncmmt"+i).value;

		if((isNaN(reasonCode)))
		{
		 	validateReasonCd++;
		}
		/*else if((isNaN(reasonComment)))
		{
		 	validateReasonCd++;
		}*/
		retstr=retstr+chqno+"!Q!"+sortcode+"!Q!"+reasonCode+"!Q!"+reasonComment+"!A!";
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
		baseurl=baseurl+"jsp/updateReturnOutward.jsp?updateString="+retstr;
		//alert('baseurl:'+baseurl);
		cts_RetOwdAjaxData1(baseurl);
	}
	else
	{
		alert('Return Reason Code Must Be Numeric');	
	}
}

function cts_RetOwdAjaxData1(baseurl)
{
	//alert ("cts_AjaxData5");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_RetOwdprocess5;	
		req.open("GET", baseurl, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_RetOwdprocess5;		
			req.open("GET", baseurl, true);
			req.send(null);
		}
	}
}

function cts_RetOwdprocess5()
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
				baseurl=baseurl+"return_outward.jsp?msg=File Converted Successfully";
				location.replace(baseurl);
				//cts_AjaxData6(baseurl);	
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
		/*baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
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
		/*baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		menuOnClick("login.jsp");
	}
	else
	{
		document.getElementById("para_form").style.display='none';
	}
}
function upload_return_outward_validation()
{	
	var conti_flag = document.getElementById("CFG_CONTINUE_CLEARING_FLG").value;
	cbs_conti_flg = document.getElementById("cbs_conti_flg").value;
	if(conti_flag=="Y" && cbs_conti_flg=="Y")
	{
		var cyclNo = document.getElementById("cyclno").value;
		var today = new Date();
	    var cHour = today.getHours();
	    //alert("cyclNo======="+cyclNo+" && cHour==========="+cHour);
	    var session_loginid = document.getElementById("session_loginid").value;
		var buttonValue= document.getElementById("submitbutton").value;
		buttonValue=buttonValue.toLowerCase();
		document.getElementById("waiting").style.display='';
		//session_loginid = "null";
		if(session_loginid == "null")
		{		
			alert("Your Session Has Been Expired. Please Login Again.");		
			menuOnClick("login.jsp");
		}
		else
		{     
		/*    if(cyclNo==1 && cHour>=14)//2
			{
				alert("Timing expired for return outward cycle number 1");
				flag=true;
			}
			else if(cyclNo==2 && cHour>=15)//3
			{
				alert("Timing expired for return outward cycle number 2");
				flag=true;
			}	
			else if(cyclNo==3 && cHour>=16)//4
			{
				alert("Timing expired for return outward cycle number 3");
				flag=true;
			}	
			else if(cyclNo==4 && cHour>=17)//5
			{
				alert("Timing expired for return outward cycle number 4");
				flag=true;
			}	
			else if(cyclNo==5 && cHour>=18)//6
			{
				alert("Timing expired for return outward cycle number 5");
				flag=true;
			}		
			else if(cyclNo==6 && cHour>=19)//7
			{
				alert("Timing expired for return outward cycle number 6");
				flag=true;
			}	
			
			else*/
			{
				//alert("in else function flag="+flag);
				upload_return_outward();
			}
		if(flag==true)
		{		
			document.getElementById("formid").action="jsp/DeleteReturnOutwardData.jsp?cyclNo="+cyclNo;
			document.getElementById("waiting").style.display='none';
			document.getElementById("formid").submit();
		}//if(flag==true)
	 }//else
	}
	else
	{
		upload_return_outward();
	}
	
}
function upload_return_outward()
{
	var session_loginid = document.getElementById("session_loginid").value;
	var buttonValue= document.getElementById("submitbutton").value;
	buttonValue=buttonValue.toLowerCase();
	document.getElementById("waiting").style.display='';
	//session_loginid = "null";
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");		
		menuOnClick("login.jsp");
	}
	else
	{		
	{
		var url=document.URL;
		var p=url.lastIndexOf('/');
		baseurl=url.substr(0,p+1);	
		if(buttonValue.indexOf('convert')>-1)
		{			
			var table=document.getElementById("retowd");
			var rowCount=table.rows.length;
			//alert('rowCount:>>'+rowCount);
			var not_a_number_string="";
			var reasonCdStr="";
			var reasonComment="";
			var chqno="";
			var sortcode="";
			var trancode="";
			var reasonCode="";
			var retstr="";
			var count=0;
			for(i=1;i<=rowCount-1;i++)
			{
				
				 reasonCode=(document.getElementById("txt_reasoncd"+i).value).replace( /\s\s+/g, '' );
				 //alert('1=='+reasonCode);
				 reasonCode=reasonCode.split("--")[0];
				 reasonCode=reasonCode.trim();
				 //alert('2=='+reasonCode);
				 //alert("reasonCode==="+reasonCode);
				 chqno=document.getElementById("txt_chqno"+i).value;
				 sortcode=document.getElementById("txt_sortcd"+i).value;
				 trancode=document.getElementById("txt_trancd"+i).value;
				 reasonComment=(document.getElementById("txt_reasoncmmt"+i).value).trim();
				 amount=document.getElementById("txt_amount"+i).value;
				//alert("amount=="+amount);
				 //alert(reasonCode+"=="+reasonComment.length);
				 if(isNaN(chqno))
					{
						alert('Please insert Cheque No ');
						document.getElementById("waiting").style.display='none';
						break;
						
					}
				else if(chqno.length>6)
					{
						alert('Please Insert Cheque No Only 6 Digits');
						document.getElementById("waiting").style.display='none';
						break;
					}
				else if(isNaN(sortcode))
					{
						alert('Please insert SortCode');
						document.getElementById("waiting").style.display='none';
						break;
						
					}
				else if(sortcode.length>9)
					{
						alert('Please Insert SortCode Only 9 Digits');
						document.getElementById("waiting").style.display='none';
						break;
					}
				else if(isNaN(trancode))
					{
						alert('Please insert Tran Code');
						document.getElementById("waiting").style.display='none';
						break;
						
					}
				else if(trancode.length>3)
					{
						alert('Please Insert Tran Code Only 3 Digits');
						document.getElementById("waiting").style.display='none';
						break;
					}
				else if(isNaN(reasonCode))
					{
							
						alert(' Reason Code Must be Numeric.');	
						break;

					}
				else if(reasonCode=='88' && reasonComment.length== 0 )// ||isNaN(reasonComment)
					{
						alert('Please Enter Return Reason Comment where Reason Code is 88 ');
						document.getElementById("waiting").style.display='none';
						break;
						
					}
				else if(reasonComment.length>25 )// ||isNaN(reasonComment)
					{
						alert('Please Enter Return Reason Comment less than 25 character');
						document.getElementById("waiting").style.display='none';
						break;
						
					}
					else if(/^[A-Za-z ]+$/.test(reasonComment) == false && reasonCode=='88') 
					{
						alert("Remove special/numeric characters from return reason comment.");
						document.getElementById("waiting").style.display='none';
						break;
				    }
					else
					{
							
						retstr=retstr+chqno+"!Q!"+sortcode+"!Q!"+reasonCode+"!Q!"+reasonComment+"!Q!"+amount+"!Q!"+trancode+"!A!";
						count ++;
					}
			}
					
			//alert(count+"=="+rowCount);	
			if(count==rowCount-1)
				{
			
					//var data=document.getElementById('data').value;
					//alert('Data:>>'+retstr);
					/*baseurl=baseurl+"jsp/updateAndGenerateRO.jsp?retstr="+retstr+"&data="+data;
					cts_AjaxData5(baseurl);			
					cts_AjaxData_updateAndGenerateRO(baseurl);*/
					document.getElementById('retstr').value=retstr;
					//alert('Data2222:>>'+document.getElementById('retstr').value);
					document.getElementById("waiting").style.display='';
					document.getElementById("formid").action="jsp/updateAndGenerateRO.jsp";
					document.getElementById("formid").method="POST";
					document.getElementById("formid").submit();
				}
			
			
		}
		else
		{
				alert('Click On Home Button and again do Same activity.');
		}
		
		}	//
	}//else----
}


//&&&&&&&&&&&&&&&&&&&&&&&
/*function cts_AjaxData5(url)
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
}*/

/*function methodReturnOutward(res)
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
			document.getElementById("submitbutton").disabled=true;;
			
		}	
		document.getElementById("waiting").style.display='none';
}*/