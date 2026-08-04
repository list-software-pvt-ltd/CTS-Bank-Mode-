var session_branch_code;
var session_main_br_yn;
function onLoad_report_clearing_outword()
{
	//alert(11);
	 session_branch_code = document.getElementById("session_branch_code").value;
	 session_main_br_yn = document.getElementById("session_main_br_yn").value;
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
			var option_all = document.createElement('option');
			//option_all.text='All';//branch Name
			//option_all.value='ALL';//branch Code
		//	obj_opt_branch_code.add(option_all,0);
			var option_no = document.createElement('option');
			option_no.text='Not Drawn Own Us';//branch Name
			option_no.value='-1';//branch Code
			obj_opt_branch_code.add(option_no,0);
					var allBrn="";
				for(i=0;i<allstr.length-1;i++)
				{
					//alert('allStr[i]'+allStr[i]);	
					// Add an Option object to Drop Down/List Box
					var option = document.createElement('option');
					// Assign text and value to Option object
					var singleBranch=allstr[i].split("!Q!");
					//alert('singleBranch[0]:>>'+singleBranch[0]);
					option.text=singleBranch[1]+"-"+singleBranch[0];//branch Name
					option.value=singleBranch[1];//branch Code
					allBrn+=singleBranch[1]+",";
					obj_opt_branch_code.add(option,0);
				}	
				
				if(session_main_br_yn=='N')
				{
				obj_opt_branch_code.value=session_branch_code;
				$('#opt_branch_code').attr('disabled',true);
				document.getElementById("lbl_indicator").style.display='none';	
				}
		}//2
		else
		{//1
			alert("Problem In Retrieving Data.Please Check The Server Connection.");		
		}//1
	}//1
	
}//cts_process1
function onClickOfRunReport()
{
	//alert("----- onClickOfRunReport ---");
	//alert(document.getElementById("opt_branch_code").value);	
	//if(validateFileds())
	var str='#';
	var dateVal=document.getElementById("datepicker").value;
	if(session_main_br_yn=='N')
	{
	$('#opt_branch_code').attr('disabled',false);
	}
	var branch_code=document.getElementById("opt_branch_code").value;
	var branch_codes=$("#opt_branch_code").val();
	var exportToexcel=document.getElementById("chkExcel").checked;
	//alert(branch_codes);
	if(dateVal=='dd-mm-yyyy')
	{
		alert('Date Should Not Be Empty');
		document.getElementById("datepicker").focus();
	}
	else if(branch_codes==null)	
	{
		alert('Select Branch');
		document.getElementById("opt_branch_code").focus();	
	}
	else
	{
		
		for(var i=0;i<branch_codes.length;i++)
		{
			str=str+"--"+branch_codes[i]+"--";
		}
		$("#branchcodes").val(str);
		//alert('S56546456456546');
		//alert(branch_codes.length);
		//alert(str);
		if(document.getElementById("chkExcel").checked)
		{
		   document.getElementById("chkExcel").value="true";	
		}
		document.getElementById("waiting").style.display='';
		document.getElementById('formid').action="jsp/report_clearing_outward_withimg.jsp";
		document.getElementById('formid').submit();
		document.getElementById("waiting").style.display='none';		
	}
}//onClickOfGetResult()
