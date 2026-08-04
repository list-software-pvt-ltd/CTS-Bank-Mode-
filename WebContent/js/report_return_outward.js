var session_branch_code;
var session_main_br_yn;
function onLoad_report_return_outward()
{
	var session_loginid = document.getElementById("session_loginid").value;
	 session_branch_code = document.getElementById("session_branch_code").value;
	 session_main_br_yn = document.getElementById("session_main_br_yn").value;
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");	
		//baseurl=baseurl+"login.jsp?flag=1";
		//location.replace(baseurl);
		menuOnClick("login.jsp");
	}
	else
	{
			//alert('-- in alert ----');
			var url=document.URL;
			//alert(url);
			var p=url.lastIndexOf('/');
			//alert(p);
			baseurl=url.substr(0,p+1);
			//alert(baseurl);
			//baseurl=baseurl+"/login.jsp";
			baseurl=baseurl+"jsp/getAllBranches.jsp";
			//alert(baseurl);
			cts_ajax_getBranch(baseurl);
			//location.replace(baseurl);
	}
}//onLoad_report_clearing_outward

function cts_ajax_getBranch(baseurl)
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
			
					var allBrn="";
				for(i=0;i<allstr.length-1;i++)
				{
					//alert('allStr[i]'+allStr[i]);	
					// Add an Option object to Drop Down/List Box
					var option = document.createElement('option');
					// Assign text and value to Option object
					var singleBranch=allstr[i].split("!Q!");
					option.text=singleBranch[1]+"-"+singleBranch[0];//branch Name
					option.value=singleBranch[1];//branch Code
					allBrn+=singleBranch[1]+",";
					obj_opt_branch_code.add(option,0);
				}	
				var option_all = document.createElement('option');
				option_all.text='All';//branch Name
				option_all.value='All';//branch Code
				obj_opt_branch_code.add(option_all,0);
				document.getElementById("opt_branch_code").value='All';
				if(session_main_br_yn=='N')
				{
				obj_opt_branch_code.value=session_branch_code;
				$('#opt_branch_code').attr('disabled',true);
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
	
}//cts_process1
function onClickOfRunReport()
{
	//alert("----- 2342344 ---");
	//alert(document.getElementById("opt_branch_code").value);	
	//if(validateFileds())
	var dateVal=document.getElementById("datepicker").value;
	if(session_main_br_yn=='N')
	{
	$('#opt_branch_code').attr('disabled',false);
	}
	var branch_code=document.getElementById("opt_branch_code").value;
	var exportToexcel=document.getElementById("chkExcel").checked;
	if(dateVal=='dd-mm-yyyy')
	{
		alert('Date Should Not Be Empty');
		document.getElementById("datepicker").focus();
	}
	else if(branch_code=='0')	
	{
		alert('Select Branch');
		document.getElementById("opt_branch_code").focus();	
	}
	else
	{
		if(document.getElementById("chkExcel").checked)
		{
		   document.getElementById("chkExcel").value="true";	
		}	
		document.getElementById("waiting").style.display='';
		document.getElementById('formid').action="jsp/report_return_outward.jsp";
		document.getElementById('formid').submit();
		document.getElementById("waiting").style.display='none';		
	}
}//onClickOfGetResult()

