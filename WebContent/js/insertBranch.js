var allConfigVar='';
var reserveReturnOutwardVal='';
var cnt=0;
var selectedColor='';
function onLoad_createBranch()
{
	//alert("in onload_return_inward()");
	document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
	
	$(document).keydown(function (event) {
	    if (event.keyCode == 123) { // Prevent F12
	        return false;
	    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
	        return false;
	    }
	});
	
	
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
		var d=document.getElementById("menu_admin");
		d.className = ' active';
		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);

		if(val!="N")
		{
			alert(val);
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			//location.replace(url);
			document.getElementById("formid").action="insertBranch.jsp";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").submit();
		}
		else
		{
			//alert("list_ret_inward_filenames"); \CTS\downloadpath_from_CHI\ReturnInward
			//document.getElementById("waiting").style.display='';
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/getAllBranches.jsp";
			//location.replace(baseurl);
			cts_ajax_getBranch(baseurl);
		}
	}
}

function cts_ajax_getBranch(baseurl)
{
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_getBranch;
		req.open("GET", baseurl, true);
		req.send(null);
	}
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_getBranch;
			req.open("GET", baseurl, true);
			req.send(null);
		}
	}

}//end cts_ajax_getBranch

function cts_process_getBranch()
{

	if(req.readyState == 4)
	{//1
		if(req.status == 200)
		{//2

			var allData=req.responseText;
			var allstr=allData.split("#");
			var obj_opt_branch_code=document.getElementById("opt_BrnCd");
			var obj_opt_pranbranch_code=document.getElementById("txtPrnBrnCd");
				for(i=0;i<allstr.length-1;i++)
				{
					// Add an Option object to Drop Down/List Box
					var option = document.createElement('option');
					// Assign text and value to Option object
					var singleBranch=allstr[i].split("!Q!");
					//alert('singleBranch[0]:>>'+singleBranch[0]);
					option.text=singleBranch[0];//branch Name
					option.value=singleBranch[1];//branch Code
					obj_opt_branch_code.add(option,0);
				}
				
				for(i=0;i<allstr.length-1;i++)
				{
					// Add an Option object to Drop Down/List Box
					var option = document.createElement('option');
					// Assign text and value to Option object
					var singleBranch=allstr[i].split("!Q!");
					//alert('singleBranch[0]:>>'+singleBranch[0]);
					option.text=singleBranch[0];//branch Name
					option.value=singleBranch[1];//branch Code
					obj_opt_pranbranch_code.add(option,0);
				}
		}//2
		else
		{//1
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
		}//1
	}//1

}//cts_process1
function onChange_branch()
{
	//alert('----onChange_LoginIdChage---');
	var val=document.getElementById("opt_BrnCd").value;
	
	if(val==1)
	{//1
		//get corresponding record and set it to the text fields
		document.getElementById("txtBrnNm").value='';
		document.getElementById("opt_Scanner_avail").value='0';
		document.getElementById("opt_main_branch").value='0';
		document.getElementById("txtMicrCd").value='';
	 	document.getElementById("txtPrnBrnCd").value='';
		document.getElementById("txtIfsc").value='';
		document.getElementById("txtMemBnkSortCDd").value='';
		document.getElementById("txtFilepath").value='';
		document.getElementById("txtBrnCd").value='';
		document.getElementById("txtFilepath").value='';
		document.getElementById("txtFTPUser").value='';
		document.getElementById("txtFTPPass").value='';
		document.getElementById("txtSorterId").value='';
		document.getElementById("txtFTPUrl").value='';
		document.getElementById("txtFTPPort").value='';
		document.getElementById("txtBrnCd").disabled=false;
		document.getElementById("txtFTPUser").disabled=false;
						document.getElementById("txtFTPPass").disabled=false;
						document.getElementById("txtFTPUrl").disabled=false;
						document.getElementById("txtFTPPort").disabled=false;
						document.getElementById("txtFilepath").disabled=false;
		
	}//1
	else if(val==0)
	{
		//location.replace("insertBranch.jsp");
		document.getElementById("formid").action="insertBranch.jsp";
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();
	}	
	else
	{//2
	
		document.getElementById("txtBrnCd").value=val;
		document.getElementById("txtBrnCd").disabled=true;
		var url=document.URL;
		var p=url.lastIndexOf('/');
		var baseurl=url.substr(0,p+1);
		baseurl=baseurl+"jsp/getBranchDetails.jsp?val="+val;
		cts_ajax_getBranchDetails(baseurl);
		
	
	}//2
}//onChange_LoginIdChage()

function onChange_Scanneraval()
{
	if(document.getElementById("opt_Scanner_avail").value=='Y')
	{
		document.getElementById("txtFTPUser").disabled=false;
						document.getElementById("txtFTPPass").disabled=false;
						document.getElementById("txtFTPUrl").disabled=false;
						document.getElementById("txtFTPPort").disabled=false;
						document.getElementById("txtFilepath").disabled=false;
	}
else{
	document.getElementById("txtFTPUser").disabled=true;
						document.getElementById("txtFTPPass").disabled=true;
						document.getElementById("txtFTPUrl").disabled=true;
						document.getElementById("txtFTPPort").disabled=true;
						document.getElementById("txtFilepath").disabled=true;
}
	
	
}
function cts_ajax_getBranchDetails(baseurl)
{
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_ajax_getBranchDetails_process;
		req.open("GET", baseurl, true);
		req.send(null);
	}
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_ajax_getBranchDetails_process;
			req.open("GET", baseurl, true);
			req.send(null);
		}
	}
}//cts_ajax_getUserRecord(baseurl);
function cts_ajax_getBranchDetails_process()
{
		if(req.readyState == 4)
		{//1
			if(req.status == 200)
			{//2
				
				var allFileds=req.responseText;
				if(!(allFileds.indexOf(' No Data Found ')>-1))
				{	
					//alert('allFileds:>>'+allFileds);
					var allFieldArr=allFileds.split("#");
					document.getElementById("txtBrnNm").value=allFieldArr[0];
					document.getElementById("opt_Scanner_avail").value=allFieldArr[1];
					document.getElementById("opt_main_branch").value=allFieldArr[2];
					document.getElementById("txtMicrCd").value=allFieldArr[3];
					if(allFieldArr[4]=='null')
						allFieldArr[4]='';
					
					if(allFieldArr[4]==''){
				     document.getElementById("txtPrnBrnCd").value='-1';}
					else
					{
				 	document.getElementById("txtPrnBrnCd").value=allFieldArr[4];
					}
					document.getElementById("txtIfsc").value=allFieldArr[5];
					document.getElementById("txtMemBnkSortCDd").value=allFieldArr[6];
					if(allFieldArr[7]=='null')
						allFieldArr[7]='';
					document.getElementById("txtFilepath").value=allFieldArr[7];
					document.getElementById("txtSorterId").value=document.getElementById("txtBrnCd").value;//allFieldArr[10];
					document.getElementById("txtFTPUser").value=allFieldArr[8];
					document.getElementById("txtFTPPass").value=allFieldArr[9];
					
					document.getElementById("txtFTPUrl").value=allFieldArr[11];
					document.getElementById("txtFTPPort").value=allFieldArr[12];
					if(document.getElementById("opt_Scanner_avail").value=='Y'){
				
					document.getElementById("txtFTPUser").disabled=false;
						document.getElementById("txtFTPPass").disabled=false;
						document.getElementById("txtFTPUrl").disabled=false;
						document.getElementById("txtFTPPort").disabled=false;
						document.getElementById("txtFilepath").disabled=false;
					}
					else{
						document.getElementById("txtFTPUser").disabled=true;
						document.getElementById("txtFTPPass").disabled=true;
						document.getElementById("txtFTPUrl").disabled=true;
						document.getElementById("txtFTPPort").disabled=true;
						document.getElementById("txtFilepath").disabled=true;
					}
				}
				else
				{
					alert('No Data Found For given branch !');
				}	
			}//2
			else
			{//1
				alert("Problem In Retrieving Data.Please Check The Server Connection.");
			}//1
		}//1
}//cts_ajax_getUserRecord_process
function afterReset_create_branch()
{
	//location.replace("insertBranch.jsp");
	document.getElementById("formid").action="insertBranch.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();

}//afterReset_create_user

function after_create_branch()
{
		//alert('click of create user');
	var d=document.getElementById("menu_create_user");
	var baseurl=document.URL;
	var p=baseurl.lastIndexOf('/');
	baseurl=baseurl.substr(0,p+1);
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
		//this is for start wait image
		//document.getElementById("waiting").style.display='';

		//validate all fields
		var txtBrnCd=document.getElementById("txtBrnCd").value;
		var txtBrnNm=document.getElementById("txtBrnNm").value;
		var opt_Scanner_avail=document.getElementById("opt_Scanner_avail").value;
		var opt_main_branch=document.getElementById("opt_main_branch").value;
		//var txtUserRole=document.getElementById("txtUserRole").value;
		var txtMicrCd=document.getElementById("txtMicrCd").value;
		var txtPrnBrnCd=document.getElementById("txtPrnBrnCd").value;
		var txtIfsc=document.getElementById("txtIfsc").value;
		var txtMemBnkSortCDd=document.getElementById("txtMemBnkSortCDd").value;
		var txtFileath=document.getElementById("txtFilepath").value;
		var txtFTPUser=document.getElementById("txtFTPUser").value;
		var txtFTPPass=document.getElementById("txtFTPPass").value;
		var txtSorterId=document.getElementById("txtSorterId").value;
		var txtFTPUrl=document.getElementById("txtFTPUrl").value;
		var txtFTPPort=document.getElementById("txtFTPPort").value;

		//alert('txtBrnCd'+txtBrnCd);
		//alert('txtFTPUser'+txtFTPUser);
		//alert('txtFTPPass'+txtFTPPass);


		if(isEmpty(txtBrnCd))
		{//1
			alert('Branch code should not be empty');
			document.getElementById("txtBrnCd").value="";
			document.getElementById("txtBrnCd").focus();
		}//1
		else if(isEmpty(txtBrnNm))
		{//2
			alert('Branch name should not be empty');
			document.getElementById("txtBrnNm").value="";
			document.getElementById("txtBrnNm").focus();
		}//2
		else if(isEmpty(txtMicrCd))
		{//3
			alert('MICR Code should not be empty');
			document.getElementById("txtMicrCd").value="";
			document.getElementById("txtMicrCd").focus();
		}//3
		else if(isEmpty(txtIfsc))
		{//4
			alert('IFSC Code should not be empty');
			document.getElementById("txtIfsc").value="";
			document.getElementById("txtIfsc").focus();
		}//4
	
		else if(isEmpty(txtMemBnkSortCDd))
		{//6
			alert('Member Bank SortCode should not be empty');
			document.getElementById("txtMemBnkSortCDd").value="";
			document.getElementById("txtMemBnkSortCDd").focus();
		}//6
		else if(opt_Scanner_avail==0)
		{//4
			alert('Please Select Scanner Available or not');
			document.getElementById("opt_Scanner_avail").value="0";
			document.getElementById("opt_Scanner_avail").focus();
		}//4
	
		else if(opt_main_branch==0)
		{//6
			alert('Please Select CTS main Branch or not');
			document.getElementById("opt_main_branch").value="0";
			document.getElementById("opt_main_branch").focus();
		}
		else if(txtPrnBrnCd==0)
		{//6
			alert('Please Select Parent Branch Code');
			document.getElementById("txtPrnBrnCd").value="0";
			document.getElementById("txtPrnBrnCd").focus();
		}
		
		/*else if(isEmpty(txtFTPUser))
		{//1
			alert('FTP User should not be empty');
			document.getElementById("txtFTPUser").value="";
			document.getElementById("txtFTPUser").focus();
		}//1*/
		/*else if(isEmpty(txtFTPPass))
		{//2
			alert('FTP Password should not be empty');
			document.getElementById("txtFTPPass").value="";
			document.getElementById("txtFTPPass").focus();
		}//2*/
		else if(isEmpty(txtSorterId))
		{//3
			alert('Sorter Id should not be empty');
			document.getElementById("txtSorterId").value="";
			document.getElementById("txtSorterId").focus();
		}//3
		/*else if(isEmpty(txtFTPUrl))
		{//4
			alert('FTP URL should not be empty');
			document.getElementById("txtFTPUrl").value="";
			document.getElementById("txtFTPUrl").focus();
		}//4
	
		else if(isEmpty(txtFTPPort))
		{//6
			alert('FTP Port SortCode should not be empty');
			document.getElementById("txtFTPPort").value="";
			document.getElementById("txtFTPPort").focus();
		}//6*/
		else
		{//7
				//validation for txt fields ...
					if(txtMicrCd.length!=9)
					{
							alert('MICR Code should be 9 digit.');
							document.getElementById("txtMicrCd").value="";
							document.getElementById("txtMicrCd").focus();
					}
					else if(txtIfsc.length!=11 )
					{
							alert('IFSC Code should be 11 digit.');
							document.getElementById("txtIfsc").value="";
							document.getElementById("txtIfsc").focus();
					}
					else if(txtMemBnkSortCDd.length!=9)
					{
							alert('CBS MICR Code should be in 9 digit.');
							document.getElementById("txtMemBnkSortCDd").value="";
							document.getElementById("txtMemBnkSortCDd").focus();
					}
				
					else
					{
					
						if(txtFTPUser=='null')
						{
						document.getElementById("txtFTPUser").value="";
						}
						if(txtFTPPass=='null')
						{
						document.getElementById("txtFTPPass").value="";
						}
						if(txtFTPUrl=='null')
						{
						document.getElementById("txtFTPUrl").value="";
						}
						if(txtFTPPort=='null')
						{
						document.getElementById("txtFTPPort").value="";
						}
						if(txtPrnBrnCd=='-1')
						{
						document.getElementById("txtPrnBrnCd").value="";
						}
						var txtPrnBrnCd=document.getElementById("txtPrnBrnCd").value;
						document.getElementById("txtBrnCd").disabled=false;	
						document.getElementById("waiting").style.display='';
						document.getElementById("formid").action="jsp/afterCreateBranch.jsp";
						document.getElementById("formid").submit();
							
					}//else
				
		}//7
	}//end

}//after_create_user
function validateEmail(emailValue)
{
	var atpos=emailValue.indexOf("@");
	var dotpos=emailValue.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailValue.length)
	  	return false;
	else
		return true;
}//validateEmail
function isEmpty(value)
{
	if(value=="")
		return true;
	else
		return false;
}

