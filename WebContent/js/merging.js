var data;
function onLoad_merging()
{
	//alert("1111111");
	//var val=document.getElementById("hdMsg1").value;
	
	var session_loginid = document.getElementById("session_loginid").value;
	//alert("session_loginid:"+session_loginid);
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
		var d=document.getElementById("menu_clearingOutward");
		d.className = ' active';

		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);

		if(val!="N")
		{  
			alert(val);
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			//location.replace(url);
			document.getElementById("formid").action="merging.jsp";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").submit();
			
			
			if(val=="SUCCESS")
			{
				var retVal = confirm("Do You Want To Verify ?");
	            if( retVal == true )
	            {
	            	//location.replace("verify_clearing.jsp");
	            	document.getElementById("formid").action="verify_clearing.jsp";
					document.getElementById("formid").method="POST";
					document.getElementById("formid").submit();
	            }
			}   
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
				//alert("Clearing Outward File Creation Is Already Done For Today!");
				document.getElementById("waiting").style.display='';
				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/list_branches.jsp";
				//location.replace(baseurl);
				cts_Ajax_list_branches(baseurl);
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

function cts_process_list_branches()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;

			record=res;

			if(res.indexOf('NO_DATA')>-1)
			{
					alert('No Cheques are available to Mearging.');
			}
			else if(res.indexOf('SessionIsNull')>-1)
			{
				alert("Your Session Has Been Expired. Please Login Again.");
					/*var baseurl=document.URL;
					var p=baseurl.lastIndexOf('/');
					baseurl=baseurl.substr(0,p+1);
					baseurl=baseurl+"login.jsp?flag=1";
					location.replace(baseurl);
					*/		
				menuOnClick("login.jsp");
			}
			else
			{
			//alert("res:"+res);
				show_listof_branches(res);
				enable_merge_btn();
			}
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function show_listof_branches(res)
{
	//alert("show_listof_branches()"+res);
	res = res.trim();

	if(res.length>1)
	{

		data=res.split("!^!");

		if(res.indexOf("NO_DATA") > -1)
		{

		}
		else
		{
			var table=document.getElementById("tab_merge_stats");
			table.rows.length=0;
			document.getElementById("rcnt").value=1;
			var rediobuttonscan=document.getElementById("rd_scanwise").checked;
			var brn;
			if(rediobuttonscan==true){
				brn=data[0].split("$");
			}
			else{
				 brn=data[1].split("$");
			}
			
			for (i=0 ; i<brn.length-1 ;i++)
			{
				add_rows_merging("","tab_merge_stats");
			}
			if(rediobuttonscan==true){
				fillData(data[0]);
			}
			else{
				fillData(data[1]);
			}
			
		}

	}
	

}

function add_rows_merging(res,tableID)
{
		//alert("in add_rows_merging():"+res);
		//alert("tableID:"+tableID);

		var table=document.getElementById(tableID);
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		//alert(rowCount);

		var row = table.insertRow(rowCount);
		
		
		var cell1= row.insertCell(0);
		cell1.style.width="15%";
		cell1.align="center";
		var element1 = document.createElement("input");
		element1.type = "checkbox";
		element1.name="sel_chqs"+rcnt;
		element1.id="sel_chqs"+rcnt;
		element1.onclick=function (){chk_selected_merging_chqs();};
		cell1.appendChild(element1);

		var cell2 = row.insertCell(1);
		cell2.style.width="25%";
		var element2 = document.createElement("input");
		element2.type = "text";
		element2.style.border="none";
		element2.style.background="transparent";
		element2.name="txt_brn_cd"+rcnt;
		element2.id="txt_brn_cd"+rcnt;
		/////element1.value=rcnt;
		element2.setAttribute("readonly", "true");
		cell2.appendChild(element2);


		var cell3 = row.insertCell(2);
		cell3.style.width="25%";
		var element3 = document.createElement("input");
		element3.type = "text";
		element3.style.border="none";
		element3.style.background="transparent";
		element3.name="txt_brn_nm"+rcnt;
		element3.id="txt_brn_nm"+rcnt;
		/////element2.value=rcnt;
		element3.setAttribute("readonly", "true");
		cell3.appendChild(element3);

		var cell4 = row.insertCell(3);
		cell4.style.width="25%";
		var element4 = document.createElement("input");
		element4.type = "text";
		element4.style.border="none";
		element4.style.background="transparent";
		element4.name="txt_noof_up_chqs"+rcnt;
		element4.id="txt_noof_up_chqs"+rcnt;
		/////element3.value=rcnt;
		element4.setAttribute("readonly", "true");
		cell4.appendChild(element4);

		var cell5= row.insertCell(4);
		cell5.style.width="25%";
		var element5 = document.createElement("input");
		element5.type = "text";
		element5.style.border="none";
		element5.style.background="transparent";
		element5.name="txt_tot_amt"+rcnt;
		element5.id="txt_tot_amt"+rcnt;
		/////element4.value=rcnt;
		element5.setAttribute("readonly", "true");
		cell5.appendChild(element5);


		var cell6= row.insertCell(5);
		cell6.style.width="25%";
		var element6 = document.createElement("input");
		element6.type = "text";
		element6.style.border="none";
		element6.style.background="transparent";
		element6.name="txt_noof_nonup_chqs"+rcnt;
		element6.id="txt_noof_nonup_chqs"+rcnt;
		/////element5.value=rcnt;
		element6.setAttribute("readonly", "true");
		cell6.appendChild(element6);
		
		rcnt=rcnt*1+1;

		document.getElementById("rcnt").value=rcnt;
		//alert("after add_rows_merging end");
		document.getElementById("waiting").style.display='none';
}

function enable_merge_btn()
{
	var rcnt = 	document.getElementById("rcnt").value;
	//alert("in enable_merge_btn rcnt:"+rcnt);
	var nonup_cnt = 0;
	var up_cnt = 0;
	var nonup_flag = 0;
	var up_flag = 0;
	for(var t=1;t<rcnt;t++)
	{
		nonup_cnt = document.getElementById("txt_noof_nonup_chqs"+t).value;
		up_cnt =document.getElementById("txt_noof_up_chqs"+t).value;
		if(nonup_cnt > 0)
		{
			nonup_flag++;
		}
		if(up_cnt > 0)
		{
			up_flag++;
		}
	}
	var check=document.getElementById("rd_scanwise").checked;
	
	if(nonup_flag > 0)
	{
		if(check==true){
			document.getElementById("submitbutton").disabled = false;
		}else{
			document.getElementById("submitbutton").disabled = true;	
		}
				
	}
	else if(nonup_flag == 0 && up_flag ==0)
	{
		if(check==true){
			document.getElementById("submitbutton").disabled = false;
		}else{
			document.getElementById("submitbutton").disabled = true;	
		}
	}
	else
	{
		document.getElementById("submitbutton").disabled = false;
		
	}
}
function on_merge_click()
{
		//alert("in on_merge_click");
		document.getElementById("waiting").style.display='';
		var chkcnt=0;
		var cntchecks=0;
		var ckeckedbox=0;
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
			var rediobutton=document.getElementById("rd_scanwise").checked;
			//alert(rediobutton)
			if(rediobutton==true){
				
			var table = document.getElementById("tab_merge_stats");
			var rowCount = table.rows.length;
			var branchStr="";
			
			
			for(var i=1; i<rowCount; i++)
			{
				var obj=document.getElementById("txt_brn_cd"+i).value;
				var nonup_chqs=document.getElementById("txt_noof_nonup_chqs"+i).value;
				var txt_noof_up_chqs=document.getElementById("txt_noof_up_chqs"+i).value;
				var row = table.rows[i];
				var chkbox = row.cells[0].childNodes[0];
				if(true == chkbox.checked)
				{
					
					ckeckedbox++;
					if(nonup_chqs>0){
						cntchecks++;
					}
					
					if(txt_noof_up_chqs>0){
						
						chkcnt++;
						if(branchStr==""){
						branchStr=obj;
						}
						else{
						branchStr=branchStr+","+obj;
						}
					}
				}
			
			}
		//	alert(chkcnt);
			if(ckeckedbox==0){
				document.getElementById("waiting").style.display='none';
				alert("Please Select At Least One Record");	
			}
			else if(cntchecks>0){
				document.getElementById("waiting").style.display='none';
				alert("Please Upload All Cheques First!");
			}
			else if(chkcnt==0){
				document.getElementById("waiting").style.display='none';
				alert("For Selected Branch Number Of Uploaded Cheques Must Be Greater Than 0");
			}
			else{
				/*var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/merge.jsp?branches="+branchStr;
				location.replace(baseurl);
				cts_AjaxData_merge(baseurl);*/
				document.getElementById("formid").action="jsp/merge.jsp?branches="+branchStr;
				document.getElementById("formid").method="POST";
				document.getElementById("formid").submit();
				}
		}
		else{
			/*var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/merge.jsp?branches=CLO_BRANCH_CD";
			location.replace(baseurl);
			cts_AjaxData_merge(baseurl);*/
			
			document.getElementById("formid").action="jsp/merge.jsp?branches=CLO_BRANCH_CD";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").submit();
			}
			
			
		}
}

function radioclick(radio)
{
	
	var table = document.getElementById("tab_merge_stats");	
	var rowCount = table.rows.length;
	
	if(radio.id=="rd_scanwise")
	{
	
		document.getElementById("txtSelctGrandTotUpCheq").value=" ";
		document.getElementById("txtSelcGrandTot").value=" ";
		
		table.innerHTML="<tr><td><label style='font-weight:bold'>Select All</label><input id='chk_selall' type='checkbox' onClick='toggle_out_clearing(this)' title='Select All'/></td><td><label style='font-weight:bold'>Branch Code</label></td><td><label style='font-weight:bold'>Branch Name</label></td><td><label style='font-weight:bold'>No. Of Uploaded Cheques</label></td><td><label style='font-weight:bold'>Total Amount (In Rs.)</label></td><td><label style='font-weight:bold'>No. Of Non Uploaded Cheques</label></td></tr>";
         	document.getElementById("chk_selall").disabled = false;
		document.getElementById("rd_scanwise").checked=true;
		document.getElementById("rd_brnwise").checked=false;
		show_listof_branches(record);
		for(var i=1; i<rowCount; i++)
		{
			document.getElementById("sel_chqs"+i).disabled = false;
		}
		
		fillData(data[0]);
	}
	else
	{
		
		document.getElementById("txtSelctGrandTotUpCheq").value=" ";
		document.getElementById("txtSelcGrandTot").value=" ";
		
		table.innerHTML="<tr><td><label style='font-weight:bold'>Select All</label><input id='chk_selall' type='checkbox' onClick='toggle_out_clearing(this)' title='Select All'/></td><td><label style='font-weight:bold'>Branch Code</label></td><td><label style='font-weight:bold'>Branch Name</label></td><td><label style='font-weight:bold'>No. Of Uploaded Cheques</label></td><td><label style='font-weight:bold'>Total Amount (In Rs.)</label></td><td><label style='font-weight:bold'>No. Of Non Uploaded Cheques</label></td></tr>";
		document.getElementById("rd_scanwise").checked=false;
		document.getElementById("rd_brnwise").checked=true;
		show_listof_branches(record);
		
		var table = document.getElementById("tab_merge_stats");
		var rowCount = table.rows.length;
		//alert(rowCount);
		
		for(var i=1; i<rowCount; i++)
		{
			var row = table.rows[i];
			//alert("row :"+row);
			var chkbox = row.cells[0].childNodes[0];
			chkbox.checked = false;
			document.getElementById("sel_chqs"+i).disabled = true;
		}
		
		document.getElementById("chk_selall").disabled = true;
		var mainchkbox = document.getElementById("chk_selall");
		mainchkbox.checked = false;
		
		fillData(data[1]);
	}
	
}

function fillData(data1)
{
	//alert(111);
	var dtls = data1.split("$");
	//alert("dtls.length:"+dtls.length);
	var grandTotalAmount=0;
	var grandTotUpcheq=0;
	var grandTotNonUpcheq=0;
	var checkbtn=document.getElementById("rd_brnwise").checked;
	for(t=0;t<dtls.length-1;t++)
	{
		var bclist=dtls[t].split("#");
		var rcnt=t+1;

		document.getElementById("txt_brn_cd"+rcnt).value=bclist[0];
		document.getElementById("txt_brn_nm"+rcnt).value=bclist[1];
		document.getElementById("txt_noof_up_chqs"+rcnt).value=bclist[2];
		document.getElementById("txt_tot_amt"+rcnt).value=bclist[3];
		grandTotUpcheq=(grandTotUpcheq*1)+(bclist[2]*1);
		grandTotalAmount=(grandTotalAmount*1)+(bclist[3]*1);
		if(bclist[4] > 0)
		{
			if(checkbtn==true){
				document.getElementById("submitbutton").disabled = true;
			}
			else{
				document.getElementById("submitbutton").disabled = false;
			}
			document.getElementById("txt_brn_cd"+rcnt).style.color="#FF0000";
			document.getElementById("txt_brn_nm"+rcnt).style.color="#FF0000";
			document.getElementById("txt_noof_up_chqs"+rcnt).style.color="#FF0000";
			document.getElementById("txt_tot_amt"+rcnt).style.color="#FF0000";
			document.getElementById("txt_noof_nonup_chqs"+rcnt).style.color="#FF0000";
			alert("Please Upload All Cheques First!");
			//document.getElementById("submitbutton").disabled = true;
		}
		document.getElementById("txt_noof_nonup_chqs"+rcnt).value=bclist[4];
		grandTotNonUpcheq=(grandTotNonUpcheq*1)+(bclist[4]*1);


	}
	//alert("mg,mgfd,"+grandTotalAmount);
	document.getElementById("gTotTable").style.display='';
	document.getElementById("txtGrandTot").value=(" "+grandTotalAmount.toFixed(2));//.substring(0,(" "+grandTotalAmount+".00").indexOf(".")+4);
	document.getElementById("txtGrandTotUpCheq").value=" "+grandTotUpcheq;
	document.getElementById("txtGrandTotNonUpCheq").value=" "+grandTotNonUpcheq;
	

	document.getElementById("waiting").style.display='none';
}

function toggle_out_clearing(source)
{
  	var table = document.getElementById("tab_merge_stats");
	var rowCount = table.rows.length;
	var totalcount=0,totalamount=0;

	for(var i=1; i<rowCount; i++)
	{
		var row = table.rows[i];
		var chkbox = row.cells[0].childNodes[0];
		chkbox.checked = source.checked;
		
	}
	if(true==chkbox.checked)
	{
	totalcount = document.getElementById("txtGrandTotUpCheq").value;
	document.getElementById("txtSelctGrandTotUpCheq").value=" "+totalcount;
	
	totalamount = document.getElementById("txtGrandTot").value;
	document.getElementById("txtSelcGrandTot").value=" "+totalamount;
	}
	else{
	document.getElementById("txtSelctGrandTotUpCheq").value=" ";
	document.getElementById("txtSelcGrandTot").value=" ";
	}
	
}

function chk_selected_merging_chqs()
{
	document.getElementById("txtSelctGrandTotUpCheq").value=" ";
	document.getElementById("txtSelcGrandTot").value=" ";
	//alert("in chk_selected_outward_chqs");
	var tot_amt = 0;
	var table = document.getElementById("tab_merge_stats");
	var rowCount = table.rows.length;
	var sel_cnt = 0;
	var Totalcount=0,Totalcountamt=0;
	for(var i=1; i<rowCount; i++)
	{
		var row = table.rows[i];
		//alert("row :"+row);
		var chkbox = row.cells[0].childNodes[0];
		var count=row.cells[3].Text;
		//alert("count :"+count);
		if(true == chkbox.checked)
		{
			var count=row.cells[3].childNodes[0];
			count=count.value;
			//alert("cnt=="+count);
			Totalcount=(Totalcount*1)+(count*1);
			//alert("Totalcount="+Totalcount);
			document.getElementById("txtSelctGrandTotUpCheq").value=" "+Totalcount;
			
			var countamt=row.cells[4].childNodes[0];
			countamt=countamt.value;
			//alert("countamt=="+countamt);
			Totalcountamt=(Totalcountamt*1)+(countamt*1);
			//alert("Totalcountamt="+Totalcountamt);
			document.getElementById("txtSelcGrandTot").value=" "+Totalcountamt.toFixed(2);
			
			sel_cnt ++;
		}
	}
	//alert("sel_cnt:"+sel_cnt+"\nrowCount-1:"+(rowCount-1));
	var chkbox = document.getElementById("chk_selall");
	if(sel_cnt != (rowCount-1))
	{
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

