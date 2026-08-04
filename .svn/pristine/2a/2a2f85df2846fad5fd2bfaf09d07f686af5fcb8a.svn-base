// JavaScript Document
var rCnt=0;
var currentTableID=0;
var singleRow="";
var ret="NA";
function uploadFiles()
{
	var selected_file=document.getElementById("file_pick").value;
	var n =selected_file.length;
	var val=selected_file.lastIndexOf("BEF");
	selected_file = selected_file.substr(val, n);
	
	if(document.getElementById("file_pick").value=="")
	{
		alert('Please Select File.');
		return false;
	}
	else if(selected_file.indexOf(".xml") == -1 && selected_file.indexOf("BEF") == -1)
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
function onLoad_extensionFile()
{
	var session_loginid = document.getElementById("session_loginid").value;
	ret=document.getElementById("ret").value;		
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");	
		menuOnClick("login.jsp");
	}
	else
	{
		if(ret=="SUCCESS")
		{
			var url=document.URL;
			var p=url.lastIndexOf('/');
			var baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/getExtensionFileData.jsp";
			cts_ajax_getExtensionFileData(baseurl);	
		}
	}	
}
function cts_ajax_getExtensionFileData(baseurl)
{
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_ajax_getExtensionFileData_process;	
		req.open("GET", baseurl, true);
		req.send(null);
	}
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_ajax_getExtensionFileData_process;		
			req.open("GET", baseurl, true);
			req.send(null);
		}
	}	
}//cts_ajax_getExtensionFileData

function cts_ajax_getExtensionFileData_process()
{
	if(req.readyState == 4)
	{//1
		if(req.status == 200)
		{//2
				//alert('cts_ajax_getAllUser_process');	
			var allData=req.responseText;
			if(allData.indexOf('There is No any Extension File at Download Path.')>-1)
			{//3
				alert('There is No any Extension File at Download Path.');				
			}//3
			else 
			{//3
			
				var tableString="";
				var allstr=allData.split("!P!");
				
				tableString="<table><tr><td>";
				for(i=0;i<allstr.length-1;i++)
				{//4
					//alert('allstr[] iiii '+ i+"--"+allstr[i]);
					var allVariable=allstr[i].split('!#!');
					//alert('allVariable.length:'+allVariable.length);					
					var len=allVariable.length;
					//makeRowHeader(i);
					//createDetailTable(i);
					  rCnt=0;
					  tableString+="<table id='tbl_header"+i+"'><tr style='background:#E3F1F9'><td>ItemSeqNo</td><td>PayorBankRoutNo</td><td>Amount</td><td>AccountNo</td><td>SerialNo</td><td>TransCode</td><td>PresentingBankRoutNo</td><td>PresentmentDate</td><td>CycleNo</td><td>ExtensionPeriod</td><td>ExtensionReasonCode</td></tr>";//</table>";//<table id='tbl_tableData"+i+"'>";
					  var singleRow_1="";
					for(j=0;j<len-1;j++)
					{						
						//alert('allVariable[] jjjjj'+ j +"--"+allVariable[j]);
						var allVariableValues=allVariable[j].split("#");
						//makeRow(allVariableValues);
						var ItemSeqNo=allVariableValues[0];
						var PayorBankRoutNo=allVariableValues[1];	
						var Amount=allVariableValues[2];
						var AccountNo=allVariableValues[3];
						var SerialNo=allVariableValues[4];
						var TransCode=allVariableValues[5];
						var PresentingBankRoutNo=allVariableValues[6];
						var PresentmentDate=allVariableValues[7];
						var CycleNo=allVariableValues[8];
						var ExtensionPeriod=allVariableValues[9];
						var ExtensionReasonCode=allVariableValues[10];
						//var rCnt=document.getElementById('rCnt').value;
						//alert('rCnt:>>'+rCnt);
						//alert('currentTableID:>>'+currentTableID);
						//var table=document.getElementById("tbl_tableData"+currentTableID);
		singleRow_1+="<tr><td>"+ItemSeqNo+"</td><td>"+PayorBankRoutNo+"</td><td>"+Amount+"</td>";
		singleRow_1+="<td>"+AccountNo+"</td><td>"+SerialNo+"</td><td>"+TransCode+"</td><td>"+PresentingBankRoutNo+"</td>";
		singleRow_1+="<td>"+PresentmentDate+"</td><td>"+CycleNo+"</td><td>"+ExtensionPeriod+"</td><td>"+ExtensionReasonCode+"</td></tr>";						
					}
					//alert('singleRow_1:>>'+singleRow_1);
					tableString+=singleRow_1+"</td></tr>";//"</table></td></tr>";
				}//4
				tableString+="</table>";
				//alert('tableString:>>>'+tableString);
				var div=document.getElementById('container_chq');				
				div.innerHTML=tableString;
				document.getElementById("waiting").style.display='none';
			}//3
		}//2
		else
		{//2
			alert("Problem In Retrieving Data.Please Check The Server Connection.");		
		}//2	
	}//1
}//cts_ajax_getExtensionFileData_process
function createDetailTable(i)
{
	var str="<table id=tbl_tableData"+i+"></table>";
	currentTableID=i;
}//createDetailTable
//function makeRowHeader(i)
function makeRowHeader(i)
{
  /*<--var str="<table id="+i+"><tr><td>ItemSeqNo</td><td>PayorBankRoutNo</td><td>Amount</td><td>AccountNo</td><td>SerialNo</td><td>TransCode</td><td>PresentingBankRoutNo</td><td>PresentmentDate</td><td>CycleNo</td><td>ExtensionPeriod</td><td>ExtensionReasonCode</td></tr></table><table id=tbl_tableData"+i+"></table>";-->*/
  alert('makeRowHeader:>>'+i);
  //------
/*  var str="<table id="+i+"><tr><td>ItemSeqNo</td><td>PayorBankRoutNo</td><td>Amount</td><td>AccountNo</td><td>SerialNo</td><td>TransCode</td><td>PresentingBankRoutNo</td><td>PresentmentDate</td><td>CycleNo</td><td>ExtensionPeriod</td><td>ExtensionReasonCode</td></tr></table><table id=tbl_tableData id="+i+">"+singleRow+"</table>";*/
  
  
 /*var str="<tr><td>ItemSeqNo</td><td>PayorBankRoutNo</td><td>Amount	</td><td>AccountNo</td><td>SerialNo</td><td>TransCode</td><td>PresentingBankRoutNo</td><td>PresentmentDate</td><td>CycleNo</td><td>ExtensionPeriod</td><td>ExtensionReasonCode</td></tr>";*/ 
			var div=document.getElementById('container_chq');
			//var div=document.getElementById('tbl_tableHeader');
			div.innerHTML=str;
			//createDetailTable(i);
			currentTableID=i;
}//makeRowHeader

function makeRow(allVariableValues)
{
		var ItemSeqNo=allVariableValues[0];
		var PayorBankRoutNo=allVariableValues[1];	
		var Amount=allVariableValues[2];
		var AccountNo=allVariableValues[3];
		var SerialNo=allVariableValues[4];
		var TransCode=allVariableValues[5];
		var PresentingBankRoutNo=allVariableValues[6];
		var PresentmentDate=allVariableValues[7];
		var CycleNo=allVariableValues[8];
		var ExtensionPeriod=allVariableValues[9];
		var ExtensionReasonCode=allVariableValues[10];
		//var rCnt=document.getElementById('rCnt').value;
		//alert('rCnt:>>'+rCnt);
		//alert('currentTableID:>>'+currentTableID);
		//var table=document.getElementById("tbl_tableData"+currentTableID);
		singleRow+="<tr><td>"+ItemSeqNo+"</td><td>"+PayorBankRoutNo+"</td><td>"+Amount+"</td>";
		singleRow+="<td>"+AccountNo+"</td><td>"+SerialNo+"</td><td>"+TransCode+"</td><td>"+PresentingBankRoutNo+"</td>";
		singleRow+="<td>"+PresentmentDate+"</td><td>"+CycleNo+"</td><td>"+ExtensionPeriod+"</td><td>"+ExtensionReasonCode+"</td></tr>"
		//alert('table:'+table);
		/*var row = table.insertRow(rCnt);
		
		var cell1 = row.insertCell(0);
		cell1.style.width="25%";
		var element1 = document.createElement("input");
		element1.type = "text";
		element1.style.border="none";
    	element1.style.background="transparent";
		element1.name="dyna_txt_ItemSeqNo";
		element1.id="dyna_txt_ItemSeqNo";
		element1.value=ItemSeqNo;
		element1.setAttribute("readonly", "false");
		cell1.appendChild(element1);
		
		var cell2 = row.insertCell(1);
		cell2.style.width="25%";
		var element2 = document.createElement("input");
		element2.type = "text";
		element2.style.border="none";
		element2.style.background="transparent";
		element2.name="dyna_txt_PayorBankRoutNo";
		element2.id="dyna_txt_PayorBankRoutNo";
		element2.value=PayorBankRoutNo;
		element2.setAttribute("readonly", "false");
		cell2.appendChild(element2);
		
		var cell3 = row.insertCell(2);
		cell3.style.width="25%";
		var element3 = document.createElement("input");
		element3.type = "text";
		element3.style.border="none";
		element3.style.background="transparent";
		element3.name="dyna_txt_Amount";
		element3.id="dyna_txt_Amount";
		element3.value=Amount;
		element3.setAttribute("readonly", "false");
		cell3.appendChild(element3);
		
		var cell4 = row.insertCell(3);
		cell4.style.width="25%";
		var element4 = document.createElement("input");
		element4.type = "text";
		element4.style.border="none";
		element4.style.background="transparent";
		element4.name="dyna_txt_AccountNo";
		element4.id="dyna_txt_AccountNo";
		element4.value=AccountNo;
		element4.setAttribute("readonly", "false");
		cell4.appendChild(element4);
		
		var cell5 = row.insertCell(4);
		cell5.style.width="10%";
		var element5 = document.createElement("input");
		element5.type = "text";
		element5.style.border="none";
		element5.style.background="transparent";
		element5.name="dyna_txt_SerialNo";
		element5.id="dyna_txt_SerialNo";
		element5.value=SerialNo;
		element5.setAttribute("readonly", "false");
		cell5.appendChild(element5);
		
		var cell6 = row.insertCell(5);
		cell6.style.width="25%";
		var element6 = document.createElement("input");
		element6.type = "text";
		element6.style.border="none";
		element6.style.background="transparent";
		element6.name="dyna_txt_TransCode";
		element6.id="dyna_txt_TransCode";
		element6.value=TransCode;
		element6.setAttribute("readonly", "false");
		cell6.appendChild(element6);
		
		var cell7 = row.insertCell(6);
		cell7.style.width="25%";
		var element7 = document.createElement("input");
		element7.type = "text";
		element7.style.border="none";
		element7.style.background="transparent";
		element7.name="dyna_txt_PresentingBankRoutNo";
		element7.id="dyna_txt_PresentingBankRoutNo";
		element7.value=PresentingBankRoutNo;
		element7.setAttribute("readonly", "false");
		cell7.appendChild(element7);
		
		var cell8 = row.insertCell(7);
		cell8.style.width="25%";
		var element8 = document.createElement("input");
		element8.type = "text";
		element8.style.border="none";
		element8.style.background="transparent";
		element8.name="dyna_txt_PresentmentDate";
		element8.id="dyna_txt_PresentmentDate";
		element8.value=PresentmentDate;
		element8.setAttribute("readonly", "false");
		cell8.appendChild(element8);
		
		var cell9 = row.insertCell(8);
		cell9.style.width="25%";
		var element9 = document.createElement("input");
		element9.type = "text";
		element9.style.border="none";
		element9.style.background="transparent";
		element9.name="dyna_txt_CycleNo";
		element9.id="dyna_txt_CycleNo";
		element9.value=CycleNo;
		element9.setAttribute("readonly", "false");
		cell9.appendChild(element9);
		
		var cell10 = row.insertCell(9);
		cell10.style.width="25%";
		var element10 = document.createElement("input");
		element10.type = "text";
		element10.style.border="none";
		element10.style.background="transparent";
		element10.name="dyna_txt_ExtensionPeriod";
		element10.id="dyna_txt_ExtensionPeriod";
		element10.value=ExtensionPeriod;
		element10.setAttribute("readonly", "false");
		cell10.appendChild(element10);
			
		var cell11 = row.insertCell(10);
		cell11.style.width="25%";
		var element11 = document.createElement("input");
		element11.type = "text";
		element11.style.border="none";
		element11.style.background="transparent";
		element11.name="dyna_txt_ExtensionReasonCode";
		element11.id="dyna_txt_ExtensionReasonCode";
		element11.value=ExtensionReasonCode;
		element11.setAttribute("readonly", "false");
		cell11.appendChild(element11);
		
		rCnt=rCnt*1+1;*/
		//document.getElementById('rCnt').value=rCnt;
}//makeRow

