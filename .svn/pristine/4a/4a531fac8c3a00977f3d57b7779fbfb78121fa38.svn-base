
function onLoad_report_extension()
{
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");	
		/*baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		menuOnClick("login.jsp");
	}
}//onLoad_report_clearing_outward

/*function cts_ajax_getBranch(baseurl)
{
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process1;	
		req.open("GET", baseurl, true);
		req.send(null);
	}
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process1;		
			req.open("GET", baseurl, true);
			req.send(null);
		}
	}
	
}//end cts_ajax_getBranch

function cts_process1()
{
	
	if(req.readyState == 4)
	{//1
		if(req.status == 200)
		{//2
			
			var allData=req.responseText;
			var allstr=allData.split("#");
			var obj_opt_branch_code=document.getElementById("opt_branch_code");
			var option_all = document.createElement('option');
					option_all.text='All';//branch Name
					option_all.value='All';//branch Code
					obj_opt_branch_code.add(option_all,0);
					var allBrn="";
				for(i=0;i<allstr.length-1;i++)
				{
					//alert('allStr[i]'+allStr[i]);	
					// Add an Option object to Drop Down/List Box
					var option = document.createElement('option');
					// Assign text and value to Option object
					var singleBranch=allstr[i].split("!Q!");
					option.text=singleBranch[0];//branch Name
					option.value=singleBranch[1];//branch Code
					allBrn+=singleBranch[1]+",";
					obj_opt_branch_code.add(option,0);
				}	
				//alert("allBrn>>>"+allBrn);
				//alert("allBrn.substring(0,allBrn.lastIndexOf())"+allBrn.substring(0,allBrn.lastIndexOf(",")))
				//alert("allBrn.substring(0,allBrn.lastIndexOf()):"+allBrn.substring(0,allBrn.lastIndexOf(",")));
				//obj_opt_branch_code.options[1].value=allBrn.substring(0,allBrn.lastIndexOf(","));
		}//2
		else
		{//1
			alert("Problem In Retrieving Data.Please Check The Server Connection.");		
			//document.getElementById("waiting").style.display='none';	
		}//1
	}//1
	
}//cts_process1*/
function onClickOfRunReport()
{
	//alert("----- 2342344 ---");
	//alert('onClickOfRunReport');	
	//if(validateFileds())
	var dateVal=document.getElementById("datepicker").value;
	var exportToexcel=document.getElementById("chkExcel").checked;
	if(dateVal=='dd-mm-yyyy')
	{
		alert('Date Should Not Be Empty');
		document.getElementById("datepicker").focus();
	}	
	else
	{
		if(document.getElementById("chkExcel").checked)
		{
		   document.getElementById("chkExcel").value="true";	
		}
		document.getElementById("waiting").style.display='';
		document.getElementById('formid').action="jsp/report_extension.jsp";
		document.getElementById('formid').submit();
		document.getElementById("waiting").style.display='none';		
	}
}//onClickOfGetResult()
