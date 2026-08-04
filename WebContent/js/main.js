var allConfigVar='';
var reserveReturnOutwardVal='';
var cnt=0;
var selectedColor='';
var msg;
var loginstyle;
function onLoad_createUser()
{
	//alert(document.getElementById("hdMsg1").value);
	

	document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
	
	$(document).keydown(function (event) {
	    if (event.keyCode == 123) { // Prevent F12
	        return false;
	    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
	        return false;
	    }
	});
	
	var session_loginid = document.getElementById("session_loginid").value;;
	msg=document.getElementById("hdMsg1").value;
	loginstyle=document.getElementById("loginstyle").value;
	document.getElementById("txtLogin").readOnly = true;
	document.getElementById("chkno").checked=true;
	//document.getElementById("chkyes").value="N";
	//document.getElementById("idnew").style.display="none";
	//document.getElementById("txtLogin").style.display="none";
	//alert(loginstyle);
	if(session_loginid == "null")
	{
		
		alert("Your Session Has Been Expired. Please Login Again.");
		/*baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		commondoonclick();
	}
	else
	{
		if(msg!='N')
		{
			alert(msg);
			//location.replace("createUser.jsp");
			document.getElementById("formid").action="createUser.jsp";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").submit();
		}
		
		
		var url=document.URL;
		var p=url.lastIndexOf('/');
		var baseurl=url.substr(0,p+1);
		baseurl=baseurl+"jsp/getAllUser.jsp";
		cts_ajax_getAllUser(baseurl);
	}
}//onLoad_createUser()
function clearGroup(elem) {
    var group = document.create_user.theGroup;
    for (var i=0; i<group.length; i++) {
        if (group[i] != elem) {
            group[i].checked = false;
        }
    }
}
function cts_ajax_getAllUser(baseurl)
{
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_ajax_getAllUser_process;
		req.open("GET", baseurl, true);
		req.send(null);
	}
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_ajax_getAllUser_process;
			req.open("GET", baseurl, true);
			req.send(null);
		}
	}
}//end cts_ajax_getAllUser
function cts_ajax_getAllUser_process()
{

	if(req.readyState == 4)
	{//1
		if(req.status == 200)
		{//2
				//alert('cts_ajax_getAllUser_process');
			
			var allData=req.responseText;
			var allstr=allData.split("#");
			//alert(req.responseText);
			var obj_opt_Login_id=document.getElementById("opt_Login_id");
			var option_add_new = document.createElement('option');
			var obj_opt_Login_id1=document.getElementById("opt_Login_id");
			var option_add_new1 = document.createElement('option');
			
			var allUser="";
			
				for(i=0;i<allstr.length-1;i++)
				{
					//alert('allStr[i]'+allStr[i]);
					// Add an Option object to Drop Down/List Box
					var option = document.createElement('option');
					// Assign text and value to Option object
					//var singleUser=allstr[i].split("!Q!");
					//alert('singleBranch[0]:>>'+singleBranch[0]);
				
					option.text=allstr[i];//branch Name
					option.value=allstr[i];//branch Code
					obj_opt_Login_id.add(option,0);
					
					
					
					
				}
			
			
				if(loginstyle=='CTSUSER')
				{
			//	document.getElementById("idnew").style.display="block";
				//document.getElementById("txtLogin").style.display="block";
					document.getElementById("txtLogin").readOnly = false;
				
			option_add_new.text='--Add New Login ID--';
			option_add_new.value='new_user';
			obj_opt_Login_id.add(option_add_new,0);
				}
				option_add_new1.text='--Select Login Id--';
				option_add_new1.value='0';
				obj_opt_Login_id1.add(option_add_new1,0);
				document.getElementById("opt_Login_id").value="0";
				getAllBranches();
		}//2
		else
		{//1
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
		}//1
	}//1

}//cts_ajax_getAllUser_process
function getAllBranches()
{
	var url=document.URL;
	var p=url.lastIndexOf('/');
	var baseurl=url.substr(0,p+1);
	baseurl=baseurl+"jsp/getAllBranches.jsp";
	cts_ajax_getBranch(baseurl);
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
			var obj_opt_branch_code=document.getElementById("opt_branch_code");
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
		}//2
		else
		{//1
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
		}//1
	}//1

}//cts_process1
function onChange_LoginIdChage()
{
	//alert('----onChange_LoginIdChage---');
	var val=document.getElementById("opt_Login_id").value;
	if(val=="0"||val=="new_user")
	{
		document.getElementById("isUpdateOrInsert").value="insert";
		if(loginstyle=='CTSUSER'){
			//document.getElementById("idnew").style.display="block";
			//document.getElementById("txtLogin").style.display="block";
			document.getElementById("txtLogin").readOnly = false;
			document.getElementById("txtusername").readOnly = false;
		   
		}
		//document.getElementById("txtPassward").value="";
		//document.getElementById("txtCfgPassward").value="";
		document.getElementById("txtusername").value ="";
		document.getElementById("txtLogin").value="";
		//document.getElementById("txtisactive").value="";
		document.getElementById("opt_branch_code").value="0";
		document.getElementById("txtEmail").value="";
		document.getElementById("chkAdmin").checked=false;
		document.getElementById("chkChecker").checked=false;
		document.getElementById("chkMaker").checked=false;
		document.getElementById("chkyes").checked=false;
	    document.getElementById("chkno").checked=false;
	}//1
	else
	{//2
		var url=document.URL;
		var p=url.lastIndexOf('/');
		var baseurl=url.substr(0,p+1);
		baseurl=baseurl+"jsp/getUserRecord.jsp?userID="+val;
		cts_ajax_getUserRecord(baseurl);
		
		
	}//2
}//onChange_LoginIdChage()
function cts_ajax_getUserRecord(baseurl)
{
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_ajax_getUserRecord_process;
		req.open("GET", baseurl, true);
		req.send(null);
	}
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_ajax_getUserRecord_process;
			req.open("GET", baseurl, true);
			req.send(null);
		}
	}
}//cts_ajax_getUserRecord(baseurl);
function cts_ajax_getUserRecord_process()
{
		if(req.readyState == 4)
		{//1
			if(req.status == 200)
			{//2
					var allFileds=req.responseText;
					//alert('allFileds:>>'+allFileds);
					var allFieldArr=allFileds.split("#");
					//alert(allFieldArr[0].trim());
					if(allFieldArr[0].trim()!='No Data Found')
						{
					
						if(loginstyle=='CTSUSER'){
							document.getElementById("isUpdateOrInsert").value="update";
						//	document.getElementById("idnew").style.display="block";
							//document.getElementById("txtLogin").style.display="block";
							document.getElementById("txtLogin").readOnly = false;
								document.getElementById("txtusername").readOnly = false;
						}
						//alert("iscbs===="+allFieldArr[4]);
						if(allFieldArr[4]=='NEWCBS')
						{
						document.getElementById("isUpdateOrInsert").value="insert";
						
						}
						else{
						document.getElementById("isUpdateOrInsert").value="update";
						}
						var sel = document.getElementById("opt_Login_id");
						var text= sel.options[sel.selectedIndex].text;
						document.getElementById("txtLogin").value=text;//document.getElementById("opt_Login_id").text;
							//document.getElementById("txtPassward").value=allFieldArr[1];  jay
							//document.getElementById("txtCfgPassward").value=allFieldArr[1];  jay
							document.getElementById("opt_branch_code").value=allFieldArr[1];
							
							document.getElementById("txtusername").value=allFieldArr[5];
							if(loginstyle=='CBSUSER')
							{
							//document.getElementById("opt_branch_code").readOnly = true;
							//document.getElementById("opt_branch_code").setAttribute("disabled", "disabled");
							document.getElementById('opt_branch_code').disabled = true;
							document.getElementById("txtusername").readOnly = true;
							}
							//document.getElementById("txtusername").readOnly = true;
							//document.getElementById().value=allFieldArr[2]
							//allFieldArr[2]; user role
							//alert('user role:>>'+allFieldArr[3]);
							 if(allFieldArr[2].indexOf('A')>-1)
							 {
								 	document.getElementById("chkAdmin").checked=true;
							 }
							 if(allFieldArr[2].indexOf('C')>-1)
							 {
								 	document.getElementById("chkChecker").checked=true;
							 }
							 if(allFieldArr[2].indexOf('M')>-1)
							 {
								 	document.getElementById("chkMaker").checked=true;
							 }
							 if(allFieldArr[3]=="null")
							 {
							 document.getElementById("txtEmail").value="";
							 }else{
							 document.getElementById("txtEmail").value=allFieldArr[3];
							 }
							 if(allFieldArr[4].indexOf('Y')>-1)
							 {
								 	document.getElementById("chkyes").checked=true;
								 	document.getElementById("chkno").checked=false;
							 }
							 if(allFieldArr[4].indexOf('N')>-1)
							 {
								 	document.getElementById("chkno").checked=true;
								 	document.getElementById("chkyes").checked=false;
							 }
						//	 document.getElementById("txtisactive").value=allFieldArr[4];
						}
					else{
						document.getElementById("isUpdateOrInsert").value="insert";
						document.getElementById("txtLogin").value=document.getElementById("opt_Login_id").value;
						if(loginstyle=='CTSUSER'){
							//document.getElementById("idnew").style.display="block";
							//document.getElementById("txtLogin").style.display="block";
							document.getElementById("txtLogin").readOnly = false;
								document.getElementById("txtusername").readOnly = true;
						}
					  // document.getElementById("txtusername").readOnly = false;
						document.getElementById("opt_branch_code").value="0";
						document.getElementById("txtEmail").value="";
						document.getElementById("chkyes").checked=false;
						document.getElementById("chkAdmin").checked=false;
						document.getElementById("chkChecker").checked=false;
						document.getElementById("chkMaker").checked=false;
						document.getElementById("chkno").checked=true;
					}
			}//2
			else
			{//1
				alert("Problem In Retrieving Data.Please Check The Server Connection.");
			}//1
		}//1
}//cts_ajax_getUserRecord_process
function afterReset_create_user()
{
	//clear all field
	//document.getElementById("txtLogin").value="";
	//document.getElementById("txtPassward").value="";
	//document.getElementById("txtCfgPassward").value="";
	//document.getElementById("txtBRNCD").value="";
	//document.getElementById("txtUserRole").value="";
	if(loginstyle=='CTSUSER'){
		//document.getElementById("idnew").style.display="block";
		//document.getElementById("txtLogin").style.display="block";
		document.getElementById("txtLogin").value=""
			document.getElementById("txtLogin").readOnly = false;
			document.getElementById("txtusername").readOnly = true;
	}
	
	document.getElementById('opt_branch_code').disabled = false;
	document.getElementById("txtLogin").value="";
	document.getElementById("txtusername").value = "";
	document.getElementById("txtusername").readOnly = false;
	//document.getElementById("txtisactive").value="";
	document.getElementById("opt_Login_id").value="0";
	document.getElementById("opt_branch_code").value="0";
	document.getElementById("chkAdmin").checked=false
	document.getElementById("chkChecker").checked=false
	document.getElementById("chkMaker").checked=false
	document.getElementById("chkyes").checked=false;
	document.getElementById("chkno").checked=true;
	document.getElementById("txtEmail").value="";

}//afterReset_create_user

function after_create_user()
{
		//alert('click of create user');
	var d=document.getElementById("formid");
	var baseurl=document.URL;
	var p=baseurl.lastIndexOf('/');
	baseurl=baseurl.substr(0,p+1);
//	alert(isUpdateOrInsert);
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		//baseurl=baseurl+"login.jsp?flag=1";
		//location.replace(baseurl);
		commondoonclick();
	}
	else
	{
		//this is for start wait image
		//document.getElementById("waiting").style.display='';

		//validate all fields
		var loginId=document.getElementById("txtLogin").value;
		var newlogid=document.getElementById("opt_Login_id").value;
		var usernm=document.getElementById("txtusername").value;
		//alert(usernm);
		var chkyes=document.getElementById("chkyes").checked;
		if(chkyes==true){
			document.getElementById("isactive").value="Y";
			
		}
		else{
			document.getElementById("isactive").value="N";
		}
		//alert(document.getElementById("isactive").value);
		//document.getElementById("opt_Login_id").value;
		//var txtpass=document.getElementById("txtPassward").value;
		//var txtCfgPass=document.getElementById("txtCfgPassward").value;
		document.getElementById('opt_branch_code').disabled = false;
		var txtBRNCD=document.getElementById("opt_branch_code").value;
		//var txtUserRole=document.getElementById("txtUserRole").value;
		var chkAdmin=document.getElementById("chkAdmin").value;
		var chkChecker=document.getElementById("chkChecker").value;
		var chkMaker=document.getElementById("chkMaker").value;
		var txtEmail=document.getElementById("txtEmail").value;

		//alert('chkAdmin'+document.getElementById("chkAdmin").checked);


		if(loginId=='0')
		{//1
			alert('Please Select Login Id');
			document.getElementById("opt_Login_id").value="0";
			document.getElementById("opt_Login_id").focus();
		}//1
		else if(newlogid=='0')
		{//1
			
			alert('Please Select Proper Login Id or Add new Login Id');
			document.getElementById("opt_Login_id").value="0";
			document.getElementById("opt_Login_id").focus();
		}//1
		
		else if(isEmpty(loginId))
		{//2
			alert('Please Enter or Select Login Id');
			document.getElementById("txtLogin").value="";
			document.getElementById("txtLogin").focus();
		}
		/*else if(!this.create_user.theGroup.checked)
		 {
		     alert('Please select Is Active');
		    // return false;
		 }*/
		/*else if(!(document.getElementById("chkyes").checked) )//&& !(document.getElementById("chkno").checked
		{//5
			alert('Select User Is Active');
		}*///5
		else if(txtBRNCD=='0')
		{//1
			alert('Please Select Branch Code');
			document.getElementById("opt_branch_code").value="0";
			document.getElementById("opt_branch_code").focus();
		}
		else if(isEmpty(usernm)||usernm==null)
		{
		    alert('Please Enter User Name');
			document.getElementById("txtusername").value="";
			document.getElementById("txtusername").focus();
		
		}
		//2
		/*else if(isEmpty(txtCfgPass))
		{//3
			alert('Confirm Passward should not be empty');
			document.getElementById("txtCfgPassward").value="";
			document.getElementById("txtCfgPassward").focus();
		}//3
*/		/*else if(isEmpty(txtBRNCD))
		{//4
			alert('Branch Code should not be empty');
			document.getElementById("txtBRNCD").value="";
			document.getElementById("txtBRNCD").focus();
		}//4
		else if(!(document.getElementById("chkAdmin").checked) && !(document.getElementById("chkChecker").checked) && !(document.getElementById("chkMaker").checked))
		{//5
			alert('Select User Role');
		}//5
*/		
		else if(isEmpty(txtEmail))
		{//6
			alert('Email should not be empty');
			document.getElementById("txtEmail").value="";
			document.getElementById("txtEmail").focus();
		}//6
		else
		{//7
				//validation for txt fields ...
					/*if(loginId.length<8 || loginId.length >15)
					{
							alert('Login Id should be in 8 to 15 character.');
							document.getElementById("txtLogin").value="";
							document.getElementById("txtLogin").focus();
					}
					else if(txtpass.length<8 || txtpass.length >15)
					{
							alert('Passward should be in 8 to 15 character.');
							document.getElementById("txtPassward").value="";
							document.getElementById("txtPassward").focus();
					}
					else if(txtCfgPass.length<8 || txtCfgPass.length >15)
					{
							alert('Confirm Passward should be in  8 to 15 character.');
							document.getElementById("txtCfgPassward").value="";
							document.getElementById("txtCfgPassward").focus();
					}
					else if(txtpass!=txtCfgPass)
					{
							alert('Passward and Confirm Passward should be same.');
							document.getElementById("txtPassward").value="";
							document.getElementById("txtCfgPassward").value="";
							document.getElementById("txtPassward").focus();
					}*/
					//else
					//{//else
					/*else if(isNaN(txtBRNCD))
					{
							alert('Branch Code should be number');
							document.getElementById("txtBRNCD").value="";
							document.getElementById("txtBRNCD").focus();
					}*/
					/*else if(txtEmail!="")
					{*/
							if(!validateEmail(txtEmail))
							{//6
								alert('Enter Valid Email.');
								document.getElementById("txtEmail").value=""
								document.getElementById("txtEmail").focus();
							}//6
							else
							{
								document.getElementById("waiting").style.display='';
								document.getElementById("formid").action="jsp/afterCreateUser.jsp";
								document.getElementById("formid").submit();
							}
					//}//else
				/*	}
					else
					{
						///
						document.getElementById("waiting").style.display='';
						document.getElementById("formid").action="jsp/afterCreateUser.jsp";
						document.getElementById("formid").submit();
						//.action="jsp/UploadServlet.jsp";
					}*/
		}//7
	}//end

}//after_create_user
function checkyFunction()
{
	
		  document.getElementById("chkno").checked=false;
	
	}
function checknFunction()
{

		  document.getElementById("chkyes").checked=false;
	
	}
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

function onLoad_responseFile()
{
	//alert('onLoad_responseFile');
	document.getElementById("waiting").style.display='';
	var d=document.getElementById("menu_return_outward");
	//d.className = ' active';
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
		commondoonclick();
	}
	else
	{		
		baseurl=baseurl+"jsp/responseFileRead.jsp";
		cts_AjaxData_readResponseFile(baseurl);
		//location.replace(baseurl);		
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
			//logic to draw table 
			//alert('req:=======>'+req.responseText);
			
			//cts_addRowsToReponseTable();
			var allstr="";
			var allData=req.responseText;
			
			if(!(allData.indexOf('There is No any Response File at Download Path.')>-1))
			{
					var singleFile=allData.split("!P!");
					var tablediv=document.getElementById("tablediv");
					allstr=allstr+"<table style='height:100%;width:100%' id='maintable' cellpadding='0' cellspacing='0'>";
					for(var k=0;k<singleFile.length-1;k++)
					{//3.1
						var singleResponseFile=singleFile[k].split("!#!");
						//alert('singleResponseFile.length:'+singleResponseFile.length);
						//var flg=0;			
						for(var i=0;i<singleResponseFile.length-1;i++)
						{//3
							var allFields=singleResponseFile[i].split("#");
							
							if(singleResponseFile.length>=1 && i==0)
							{//3.2
								allstr=allstr+"<tr><td style='width:100%' align='center' colspan='2'>"+allFields[6]+"</td></tr>"
								allstr=allstr+"<tr><td style='width:33%'><table  id='responseFileTableHeader"+k+"' border='0' style='width:100%;'>";
								allstr=allstr+"<tr><td style='width:50%'>Creation Date</td>";
								var creationDate=allFields[0];
								allstr=allstr+"<td style='width:50%'>"+creationDate+"</td></tr>";
								
								allstr=allstr+"<tr><td style='width:50%'>Creation Time</td>";
								var creationTime=allFields[1];
								allstr=allstr+"<td style='width:50%'>"+creationTime+"</td></tr>";
																
								allstr=allstr+"<tr><td style='width:50%'>File Status</td>";
								var fileStatus=allFields[2];
								allstr=allstr+"<td style='width:50%'>"+fileStatus+"</td></tr>";
								allstr=allstr+"</table></td>";
								
								allstr=allstr+"<td style='width:67%'><table  id='responseFileTable"+k+"' border='0' style='width:100%;	'><tr><td style='width:33%'>Item Sequence No.</td><td style='width:33%'>Cheque No.</td><td style='width:33%'>Reason Code</td>";
							}//3.2
							
							//alert("singleResponseFile["+i+"]====="+singleResponseFile[i]);
							var itemSeqNo=allFields[3];
							allstr=allstr+"<tr><td style='width:33%'>"+itemSeqNo+"</td>";
							var chequeNo=allFields[4];
							allstr=allstr+"<td style='width:33%'>"+chequeNo+"</td>";
							var rejectReasonCode=allFields[5];
							allstr=allstr+"<td style='width:33%'>"+rejectReasonCode+"</td></tr>";
							//alert("allFields[3]---"+allFields[3]+"    allFields[4]---"+allFields[4]+"     allFields[5]----"+allFields[5]);
							//cts_addRowsToReponseTable(k,itemSeqNo,chequeNo,rejectReasonCode);
							//alert("**** abhishek ***");
							//cts_addRowsToReponseTable();
						}//3	
						//cts_addRowsToReponseTable();
						allstr=allstr+"</table></td></tr>";
					}//3.1
					allstr=allstr+"</table>";
					tablediv.innerHTML=allstr;
					document.getElementById("waiting").style.display='none';
			}
			else
			{
					alert('There is No any Response File at Download Path.');
					document.getElementById("waiting").style.display='none';
			}
		}//2
		else
		{//2			
			alert("Problem In Retrieving Data.Please Check The Server Connection.");		
			document.getElementById("waiting").style.display='none';
		}//2
	}//1
}//cts_process_readResponseFile

function cts_addRowsToResponseFileTableHeader(tableNo,lable,data)
{//1
	var table=document.getElementById("responseFileTableHeader"+tableNo);
	var rowCount = table.rows.length;
	//alert('rowCount:'+rowCount);
	var row = table.insertRow(rowCount);
	var cell1 = row.insertCell(0);//for lable
	cell1.style.width="50%";
	var element1 = document.createElement("input");
	element1.type = "text";
	element1.style.border="none";
	element1.style.background="transparent";
	element1.name=tableNo+"_"+rowCount+"hdr1";
	element1.id=tableNo+"_"+rowCount+"hdr1";
	element1.value=lable;
	element1.size="35";
	element1.setAttribute("readonly", "true");
	cell1.appendChild(element1);

	var cell2 = row.insertCell(1);//for data
	cell2.style.width="50%";
	var element2 = document.createElement("input");
	element2.type = "text";
	element2.style.border="none";
	element2.style.background="transparent";
	element2.name=tableNo+"_"+rowCount+"hdr2";
	element2.id=tableNo+"_"+rowCount+"hdr2";
	element2.value=data;
	element2.size="35";
	element2.setAttribute("readonly", "true");
	cell2.appendChild(element2);

}//1

function cts_addRowsToReponseTable(tableNo,val1,val2,val3)
{//1
	var table=document.getElementById("responseFileTable"+tableNo);
	var rowCount = table.rows.length;
	//alert('rowCount:'+rowCount);
	var row = table.insertRow(rowCount);
	var cell1 = row.insertCell(0);//for lable
	cell1.style.width="33%";
	var element1 = document.createElement("input");
	element1.type = "text";
	element1.style.border="none";
	element1.style.background="transparent";
	element1.name=tableNo+"dtl1";
	element1.id=tableNo+"dtl1";
	element1.value=val1;
	element1.size="35";
	element1.setAttribute("readonly", "true");
	cell1.appendChild(element1);

	var cell2 = row.insertCell(1);//for lable
	cell2.style.width="33%";
	var element2 = document.createElement("input");
	element2.type = "text";
	element2.style.border="none";
	element2.style.background="transparent";
	element2.name=tableNo+"dtl2";
	element2.id=tableNo+"dtl2";
	element2.value=val2;
	element2.size="35";
	element2.setAttribute("readonly", "true");
	cell2.appendChild(element2);

	var cell3 = row.insertCell(2);//for lable
	cell3.style.width="33%";
	var element3 = document.createElement("input");
	element3.type = "text";
	element3.style.border="none";
	element3.style.background="transparent";
	element3.name=tableNo+"dtl3";
	element3.id=tableNo+"dtl3";
	element3.value=val3;
	element3.size="35";
	element3.setAttribute("readonly", "true");
	cell3.appendChild(element3);
}//1


function doOnMainload()
{
	//alert("in doOnProgramload()");
	var val=document.getElementById("hdMsg1").value;
	var d=document.getElementById("menu_home");
	d.className = ' active';

	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{
		alert("Your Session Has Been Expired. Please Login Again.");
		/*var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		commondoonclick();
	}
	else
	{
		document.getElementById("waitProgress").style.display='';
		var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"jsp/getBackup.jsp";
		cts_AjaxData_getBackup(baseurl);
		//document.getElementById("waiting").style.display=' ';
		//location.replace(baseurl);
	}
}
function cts_AjaxData_getBackup(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_AjaxData_getBackupProcess;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_AjaxData_getBackupProcess;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}
function cts_AjaxData_getDashdata(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_AjaxData_getDashdataProcess;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_AjaxData_getDashdataProcess;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_AjaxData_getDashdataProcess()
{
if(req.readyState == 4)
	{
		if(req.status == 200)
		{
		document.getElementById("waiting").style.display='none';
		var res = req.responseText;
		
		
		if(res.indexOf('No Data Found')>-1 )
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
		}else{
		//alert(res.split('#')[1]);
		document.getElementById('dateval1').innerHTML =res.split('#')[2];
		document.getElementById('noofins1').innerHTML =res.split('#')[0];
		document.getElementById('amo1').innerHTML =res.split('#')[1]+' Rs';
		
		document.getElementById('dateval2').innerHTML =res.split('#')[5];
		document.getElementById('noofins2').innerHTML =res.split('#')[3];
		document.getElementById('amo2').innerHTML =res.split('#')[4]+' Rs';
		
		document.getElementById('noofins3').innerHTML =res.split('#')[6];
		document.getElementById('amo3').innerHTML =res.split('#')[7]+' Rs';
		
		document.getElementById('noofins4').innerHTML =res.split('#')[8];
		document.getElementById('amo4').innerHTML =res.split('#')[9]+' Rs';
		
		document.getElementById('noofins5').innerHTML =res.split('#')[10];
		document.getElementById('amo5').innerHTML =res.split('#')[11]+' Rs';
		
		document.getElementById('dateval6').innerHTML =res.split('#')[14];
		document.getElementById('noofins6').innerHTML =res.split('#')[12];
		document.getElementById('amo6').innerHTML =res.split('#')[13]+' Rs';
		
		document.getElementById('noofins7').innerHTML =res.split('#')[15];
		document.getElementById('amo7').innerHTML =res.split('#')[16]+' Rs';
		
		document.getElementById('noofins8').innerHTML =res.split('#')[17];
		document.getElementById('amo8').innerHTML =res.split('#')[18]+' Rs';
		
		document.getElementById('dateval9').innerHTML =res.split('#')[21];
		document.getElementById('noofins9').innerHTML =res.split('#')[19];
		document.getElementById('amo9').innerHTML =res.split('#')[20]+' Rs';
		
		document.getElementById('noofins_1').innerHTML =res.split('#')[22];
		document.getElementById('amo_1').innerHTML =res.split('#')[23]+' Rs';
		
		document.getElementById('filepend').innerHTML =res.split('#')[24];
		document.getElementById('sndnpci').innerHTML =res.split('#')[25];
		document.getElementById('accptnpci').innerHTML =res.split('#')[26];
		document.getElementById('rejnpci').innerHTML =res.split('#')[27];
		document.getElementById('chq1').innerHTML =res.split('#')[28];
		
		}
		
		
		}
		else
		{
			//alert("res:"+res);
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			
			//document.getElementById("waiting").style.display='none';
		}
		document.getElementById("waitProgress").style.display='none';
	}
}
function cts_AjaxData_getBackupProcess()
{

 	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			document.getElementById("waiting").style.display='none';
			var res = req.responseText;
			//alert(res);
			if(res.indexOf('Successfully')>-1 ||res.indexOf('Problem to Take Backup')> -1)
			{
				alert(res.split('#')[1]);
			}
			/*else if(res.indexOf('#Backup is Already')>-1){
			 alert("Backup is Already taken for a day.");
			}
			else
			{
				alert(res.split('#')[1]);
			}*/
		}
		else
		{
			//alert("res:"+res);
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			//document.getElementById("waiting").style.display='none';
		}
		
		
		document.getElementById("waitProgress").style.display='';
		var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"jsp/getDashData.jsp";
		cts_AjaxData_getDashdata(baseurl);
		document.getElementById("waitProgress").style.display='none';
	}
}
/////////////////////////////////////end
/**********		START Outward Clearing		********************/
function toggle_out_clearing(source)
{
  	var table = document.getElementById("tab_out_chq");
	var rowCount = table.rows.length;

	for(var i=1; i<rowCount; i++)
	{
		var row = table.rows[i];
		//alert("row :"+row);
		var chkbox = row.cells[2].childNodes[0];
		//alert("chkbox :"+chkbox.checked);
		chkbox.checked = source.checked;

		//document.getElementById("txt_no_of_sel_chq").value = document.getElementById("txt_tot_no_of_chq").value ;
		//document.getElementById("txt_tot_amt_sel_chq").value = parseFloat(document.getElementById("txt_tot_amt").value).toPrecision(2) ;

		if(chkbox.checked == true)
		{
			//document.getElementById("txt_no_of_sel_chq").value ='0';
			//document.getElementById("txt_tot_amt_sel_chq").value = '0';
			document.getElementById("txt_no_of_sel_chq").value =document.getElementById("txt_tot_no_of_chq").value*1.0;
			document.getElementById("txt_tot_amt_sel_chq").value = (document.getElementById("txt_tot_amt").value)*1.0 ;
		}
		else
		{
			document.getElementById("txt_no_of_sel_chq").value ='0';
			document.getElementById("txt_tot_amt_sel_chq").value = '0';
		}
	}

}

function chk_selected_outward_chqs()
{
	//alert("in chk_selected_outward_chqs");
	var tot_amt = 0;
	var table = document.getElementById("tab_out_chq");
	var rowCount = table.rows.length;
	var sel_cnt = 0;
	for(var i=1; i<rowCount; i++)
	{
		var row = table.rows[i];
		//alert("row :"+row);
		var chkbox = row.cells[2].childNodes[0];
		//alert("chkbox :"+chkbox.checked);

		var obj=document.getElementById("txt_chqno"+i);

		var amt = document.getElementById("hd_amount"+i);

		//alert("amt_val :"+amt_val);

		if(true == chkbox.checked)
		{
			var amt_val = amt.value;
			sel_cnt ++;
			tot_amt = (tot_amt *1) + (amt_val*1);
		}
	}
	//alert("sel_cnt:"+sel_cnt+"\nrowCount-1:"+(rowCount-1));
	var chkbox = document.getElementById("chk_selall");
	if(sel_cnt != (rowCount-1))
	{
		//alert("in if.........");

		//alert("chkbox :"+chkbox.checked);
		if(true == chkbox.checked)
		{
			chkbox.checked = false;
		}

	}
	else
	{
		chkbox.checked = true;
	}

/*	if (sel_cnt == document.getElementById("txt_no_of_sel_chq").value)
	{
		document.getElementById("txt_no_of_sel_chq").value = document.getElementById("txt_tot_no_of_chq").value ;
		document.getElementById("txt_tot_amt_sel_chq").value = parseFloat(document.getElementById("txt_tot_amt").value).toPrecision(2) ;


	}*/
	document.getElementById("txt_no_of_sel_chq").value = sel_cnt;
	document.getElementById("txt_tot_amt_sel_chq").value = parseFloat(tot_amt).toPrecision(2) ;


}

function getClearingOutwardFile()
{
	//alert("in getClearingOutwardFile()");
	var d=document.getElementById("menu_outward_clearing");
	d.className = ' active';

	var session_user_role = document.getElementById("session_user_role").value;


	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		/*var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		commondoonclick();

	}
	else
	{
		var hdMsg1=document.getElementById("hdMsg1").value;
		//alert('hdMsg1:==>'+hdMsg1);
		if(session_user_role == 'M')
		{
			//alert("hide btn");
			//document.getElementById("btn_upload").style.visibility = false;
			document.getElementById("submitbutton").style.display='none';
		}
		//alert("1111	hdMsg1:"+hdMsg1);
		if(hdMsg1!="N")
		{
			if(hdMsg1=="FIRSTTIME" || hdMsg1=="SUCCESS")
			{

				document.getElementById("waiting").style.display='';
				var doICallMerge=document.getElementById("hd_doICallAjax").value;
				//alert(doICallMerge);
				if(doICallMerge=="Y")
				{
					//alert('*****************');
					var url=document.URL;
					var p=url.lastIndexOf('/');
					baseurl=url.substr(0,p+1);
					//baseurl=baseurl+"jsp/getClearingOutwardFile.jsp";
					baseurl=baseurl+"jsp/getCOFiles.jsp";
					//location.replace(baseurl);
					cts_AjaxData0(baseurl);
				}
				else
				{
					fetch_outward_cheques();
				}
			}
			else
			{
				//alert(hdMsg1);//show message:Cheque might be faulty
				/*var baseurl=document.URL;
				var p=baseurl.indexOf('?');
				baseurl=baseurl.substr(0,p);
				//baseurl=baseurl+"outward_clearing.jsp";
				location.replace(baseurl);*/
				fetch_outward_cheques();
			}
		}
	}

}

function cts_AjaxData0(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process0;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process0;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process0()
{

 	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			document.getElementById("waiting").style.display='none';
			var res = req.responseText;

			if(res.indexOf('SUCCESS') > -1 || res.indexOf('faulty Cheque') > -1)
			{
				if(res.indexOf('faulty Cheque') > -1)
				{
					alert(res.trim());
				}
				else
				{
					alert(res.trim());
				}
				fetch_outward_cheques();
			}
			else
			{
				//alert(res.trim());
				document.getElementById("waiting").style.display='none';
				var baseurl=document.URL;
				var p=baseurl.indexOf('?');
				baseurl=baseurl.substr(0,p);
				//baseurl=baseurl+"outward_clearing.jsp";
				location.replace(baseurl);
			}
		}
		else
		{
			//alert("res:"+res);
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function fetch_outward_cheques()
{
	//alert("in fetch_outward_cheques()");
	//call here getClearingOutwardFile.jsp
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		/*var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		commondoonclick();
	}
	else
	{

		var val=document.getElementById("hdMsg1").value;
		//alert("Abhishek------"+val);
		if(val!="N")
		{//1

			if(val.indexOf("SUCCESS") > -1 || val.indexOf("FIRSTTIME")>-1 || val.indexOf("Cheque")>-1)
			{
				//alert("33333 before   cts_AjaxData1() val:"+val);
				//var success_cnt = val.split("~")[1];
				if(val.indexOf("SUCCESS") > -1)
				{
					alert("Cheque(s) Uploaded Successfully!");
					document.getElementById("waiting").style.display='none';
				}

				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/fetch_outward_cheques.jsp";
				//location.replace(baseurl);
				cts_AjaxData1(baseurl);

			}
			else
			{
				//alert("********"+val);
				//alert(val);
				document.getElementById("waiting").style.display='none';

				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/fetch_outward_cheques.jsp";
				//location.replace(baseurl);
				cts_AjaxData1(baseurl);
			}
		}//1
		else
		{
			//alert("********");
			var baseurl=document.URL;
			var p = baseurl.lastIndexOf("?");
			baseurl = baseurl.substr(0,p);
			//alert("baseurl:"+baseurl);
			location.replace(baseurl);
		}
	}
}

function cts_AjaxData1(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process1;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process1;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process1()
{
		//alert(".....req.status:"+req.status);

 	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;

			record=res;
			//alert("res:"+res);
			setData_outwardchqs(res);
			//allvehres=res;

			var rcnt=document.getElementById("rcnt").value;
			//alert(rcnt);
			if(rcnt>18)
			{
				//alert("in if");
				var div_out_chq=document.getElementById("div_out_chq");
				div_out_chq.style.overflow="scroll";
				div_out_chq.style.height="90%";
			}
			else
			{
				var div_out_chq=document.getElementById("div_out_chq");
				div_out_chq.style.overflow="inherit";
				div_out_chq.style.height="90%";
			}

		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function setData_outwardchqs(rec)
{
	//alert("setData_outwardchqs()***************"+document.getElementById("txt_no_of_sel_chq").value);
	var hdMsg1=document.getElementById("hdMsg1").value;
	rec = rec.trim();
	var rcnt=document.getElementById("rcnt").value;
	/*if(rcnt>1)
	{
		resetRows();
	}*/
	var p2fcnt=0;
	if(rec.length>1)
	{
		//alert(rec);
		var stats = rec.split("!P!");
		//alert("stats [1]"+stats[1]);
		var stats_data = stats[1].split("#");
		document.getElementById("txt_tot_no_of_chq").value = stats_data[0];
		document.getElementById("txt_tot_amt").value = stats_data[1]*1.0;

		var data =rec.split("$");
		//alert("data.length:"+data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			//alert(data[t]);
		//	alert("bclist[1]"+bclist[1]+"\n hdMsg1 :"+hdMsg1+"hdMsg1.indexOf(Successfully)"+hdMsg1.indexOf("Successfully"));
			if(bclist[1]=="NOCHEQUE" && hdMsg1=="FIRSTTIME" )
			{
				alert("Cheques Not Available!");
				//document.getElementById("waiting").style.display='none';
			}
			else if(bclist[1]=="NOCHEQUE" && (hdMsg1.indexOf("Successfully")>-1 || hdMsg1=="SUCCESS"))
			{
				alert("All Cheques Uploaded!");
				//document.getElementById("waiting").style.display='none';
			}
			else
			{
				//alert("in else...");
				var rcnt=document.getElementById("rcnt").value;
				//alert(rcnt);
				addRows_outwardchqs('tab_out_chq');
				//alert(bclist[3]);
				document.getElementById("txt_chqno"+rcnt).value=bclist[0]+"_"+bclist[1]+":"+bclist[2];
				document.getElementById("hd_amount"+rcnt).value = bclist[5];
				//alert("bclist[3]="+bclist[3]);
				var hiddenVar="";
				if((bclist[6]*1)>=20 && (bclist[6]*1)<=27)
						p2fcnt++;
				if(bclist[3]=='null')
				{
					document.getElementById("txt_chqno"+(t*1+1)).style.background='#FF0000';
					document.getElementById("sel_chq"+(t*1+1)).disabled=false;
					document.getElementById("submitbutton").disabled=true;

					hiddenVar="hd_chqInfo"+(t*1+1);
					document.getElementById(hiddenVar).value=bclist[0]+"_"+bclist[1]+":"+bclist[2];
				}
				else
				{
					var abc="hd_imgnm"+(t*1+1);
					
					document.getElementById(abc).value=bclist[3].substring(1,(bclist[3].length-5));
					hiddenVar="hd_chqInfo"+(t*1+1);
					document.getElementById(hiddenVar).value=bclist[0]+"_"+bclist[1]+":"+bclist[2];
					//alert("Transaction Code="+(bclist[6]*1));

				}
			}
		}
		//alert(p2fcnt);
		if(p2fcnt>0)
		{
			var messp2f="You Have "+p2fcnt+" Cheques For Paper To Follow";
			alert(messp2f);
			document.getElementById("txtForP2F").value=messp2f;
		}
		else
		{
			var messp2f="You Have "+p2fcnt+" Cheques For Paper To Follow";
			alert(messp2f);
			document.getElementById("txtForP2F").value=messp2f;
		}
		/*for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			var rcnt=t+1;

//alert("bclist[0]:"+bclist[0]+"\nbclist[1]:"+bclist[1]+"\nbclist[2]:"+bclist[2]);
			//alert("bclist[5]:"+bclist[5]+"\nbclist[4]:"+bclist[4]);
			document.getElementById("txt_chqno"+rcnt).value=bclist[0]+"_"+bclist[1]+":"+bclist[2];
			document.getElementById("hd_amount"+rcnt).value = bclist[5];
			if(bclist[3]=='null')
			{
				document.getElementById("txt_chqno"+(t*1+1)).style.background='#FF0000';
				document.getElementById("sel_chq"+(t*1+1)).disabled=true;
				document.getElementById("submitbutton").disabled=true;
			}

		}*/

	}
	//document.getElementById("sel_chq1").click();
	enlargeCheque_outwardchqs('img_frnt');
	if(document.getElementById("submitbutton").disabled)
	{
		alert("Cheque(s) Shown In Red Are Not Scanned.\nPlease Scan The Cheque(s)");
	}
	//alert("----------- 1 ----------");
	document.getElementById("waiting").style.display='none';
}

function addRows_outwardchqs(tableID)
{
		var session_user_role = document.getElementById("session_user_role").value;


		var table=document.getElementById(tableID);
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		//alert(rowCount);

		var row = table.insertRow(rowCount);

		var cell1 = row.insertCell(0);
		cell1.style.width="70%";
		var element1 = document.createElement("input");
		element1.type = "text";
		element1.style.border="none";
    	element1.style.background="transparent";
		element1.name="txt_chqno"+rcnt;
		element1.id="txt_chqno"+rcnt;
		element1.value=rcnt;
		element1.size="35";
		element1.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell1.appendChild(element1);

		var cell2 = row.insertCell(1);
		cell2.style.width="15%";
		cell2.align="center";
		var element2 = document.createElement("input");
		element2.id="sel_chq"+rcnt;
		element2.name="sel_chq";
		element2.type = "radio";
		//element2.style.width="100%";
		element2.onclick=function (){fetchValues_outwardchqs();};
		cell2.appendChild(element2);


		var cell3 = row.insertCell(2);
		cell3.style.width="15%";
		cell3.align="center";
		var element3 = document.createElement("input");
		element3.id="chk_chq"+rcnt;
		element3.name="chk_chq";
		element3.type = "checkbox";
		element3.onclick=function (){chk_selected_outward_chqs();};
		if(session_user_role.indexOf("C") > -1)
		{
			cell3.appendChild(element3);
		}



		var element4 = document.createElement("input");
		element4.id="hd_amount"+rcnt;
		element4.name="hd_amount";
		element4.type = "hidden";
		cell3.appendChild(element4);

		var element5 = document.createElement("input");
		element5.id="hd_imgnm"+rcnt;
		element5.name="hd_imgnm"+rcnt;
		element5.type = "hidden";
		cell3.appendChild(element5);

		var element6 = document.createElement("input");
		element6.id="hd_chqInfo"+rcnt;
		element6.name="hd_chqInfo"+rcnt;
		element6.type = "hidden";
		cell3.appendChild(element6);


		rcnt=rcnt*1+1;
		document.getElementById("rcnt").value=rcnt;
		document.getElementById("waiting").style.display='none';


}

function fetchValues_outwardchqs()
{
	//alert("in fetchValues_outwardchqs()");

	 var table = document.getElementById("tab_out_chq");
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
				//var color_read='#FF0000'
				//alert("color-------::"+color);
				var chqDtl="";
				if(true == radio.checked && color!='##rgb(255, 204, 204)##')
				//if(true == radio.checked)
				{
						cnt=cnt*1+1;
						//alert("Radion Buddon Checked");
						//document.getElementById("center_wait").style.display='';
						chqDtl=document.getElementById("hd_chqInfo"+i).value;
						document.getElementById("hd_selectCnt").value=cnt;
						fetch_cbsFileData(chqDtl,color);
						//fetch_imageNameFromCheque(chqDtl);
						//fetch_imageNameFromCheque(chqDtl);
						//fetch_ChqStatus(chqDtl);
						document.getElementById("txt_chqno"+i).style.background = '#66CC99';
						//alert("selected chq :"+document.getElementById("txt_chqno"+i).value);
						//var chq_dtl=document.getElementById("txt_chqno"+i).value;
						//alert(document.getElementById("hd_imgnm"+i));
						var chq_dtl=document.getElementById("hd_imgnm"+i).value;
						var chq_no = chq_dtl;//chq_dtl.split(':')[0];
						//alert("chq_no : "+chq_no);
						document.getElementById('img_enlarged').src = null;
						//document.getElementById('img_enlarged').src = null;


						//var hd_up_path = document.getElementById("hd_up_path").value;
						//alert("hd_up_path:"+hd_up_path);
						var session_branch_code = document.getElementById("session_branch_code").value;
						//alert("session_branch_code:"+session_branch_code);
						 var url = document.URL;
						 var p = url.lastIndexOf('/');
						 imgpath = url.substr(0,p+1);
						// alert("imgpath:"+imgpath);
						 /*imgpath = imgpath +"/uploadpath_to_CHI/"+session_branch_code+"/";*/
//\\172.100.30.56\d\Apache6\Apache6\webapps\CTS\uploadpath_to_CHI\9\ClearingOutward\Images
						 imgpath = imgpath +"/uploadpath_to_CHI/"+session_branch_code+"/ClearingOutward/Images/";
						//alert("imgpath:"+imgpath);

						document.getElementById('img_frnt').src = imgpath+"F"+chq_no+"G.jpg";//document.getElementById('img_frnt').src = imgpath+"f_"+chq_no+"_G.jpg";
						document.getElementById('img_back').src = imgpath+"R"+chq_no+"G.jpg";//document.getElementById('img_back').src = imgpath+"r_"+chq_no+"_G.jpg";

						document.getElementById("sel_chq"+i).style.background = '#66CC99';
						var baseurl1=document.URL;
						var p=baseurl1.lastIndexOf('/');
						baseurl1=baseurl1.substr(0,p+1);

				}
				else
				{

					//alert("in elser"+color);
					if(color!='##rgb(255, 204, 204)##' && color!='##rgb(255, 0, 0)##')
					{
						document.getElementById("txt_chqno"+i).style.background = '#d5d5e5';
						document.getElementById("sel_chq"+i).style.background = '#d5d5e5';
					}
				}
				if(true == radio.checked && color=='##rgb(255, 0, 0)##')
				{

						//alert("In Red Background");
						document.getElementById("txt_chqno"+i).style.background = '#FF0000';
						document.getElementById("sel_chq"+i).style.background = '#FF0000';
						document.getElementById("txt_hdnIsRedBackground").value="YES";
						chqDtl=document.getElementById("hd_chqInfo"+i).value;
						document.getElementById("txt_hdnRedBackgroundVal").value=chqDtl;
						//browswChqs(document.getElementById("dyna_txt_chqno").value);
						//fetch_imageNameFromCheque(chqDtl);
				}
	}

	enlargeCheque_outwardchqs('img_frnt');
}

function fetch_ChqStatus(chqDtl)
{
	document.getElementById("waiting").style.display=' ';
	var baseurl=document.URL;
	var p=baseurl.lastIndexOf('/');
	baseurl=baseurl.substr(0,p+1);
	baseurl=baseurl+"jsp/fetch_cbs_status.jsp?chqDtl="+chqDtl;
	//location.replace(baseurl);
	cts_ajax_getCbsStatus(baseurl)

}//end fetch_ChqStatus
function cts_ajax_getCbsStatus(baseurl)
{
		//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_getCbsStatus;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange=cts_process_getCbsStatus;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}//end cts_ajax_getCbsStatus
function cts_process_getCbsStatus()
{
	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			//alert('res:'+res);
			document.getElementById('txtChqStatus').value=res;
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}//cts_process_getCbsStatus

function fetch_cbsFileData(chqDtl,color)
{
	selectedColor=color;
	var session_branch_code = document.getElementById("session_branch_code").value;
	if(session_branch_code=='null')
	{
		alert("Your Session Has Been Expired. Please Login Again.");
		//var baseurl=baseurl+"login.jsp?flag=1";
		//location.replace(baseurl);
		commondoonclick();
	}
	else
	{
		var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"jsp/fetch_cbs_file_Data.jsp?chqDtl="+chqDtl;
		//location.replace(baseurl);
		cts_ajax_getCbsData(baseurl)
	}
}
function cts_ajax_getCbsData(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_getCbsData;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange=cts_process_getCbsData;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}
function cts_process_getCbsData()
{
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			record=res;
			//alert("record:"+record);
			//show_inward_filenames(res);
			add_rows_for_cbsData(record);
			//fetch_imageNameFromCheque(chqDtl);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}
function add_rows_for_cbsData(record)
{
	//alert('add_rows_for_cbsData:'+record);
	/*<td>Cheque No</td>
	<td>BODF</td>
	<td>Sort Code</td>
	<td>Tran Code</td>
	<td>Amount</td>
	<td>Account Number</td>
	<td>Payee Name</td>
	CLO_CHQNO,
	CLO_BOFD,
	CLO_SORTCD,
	CLO_TRANCD,
	CLO_AMOUNT,
	CLO_PAYEE_ACCNO,
	CLO_PAYEE_ACCNM */
		//document.getElementById("tab_co_cbs_data").deleteRow(1);
		var selectCount=document.getElementById("hd_selectCnt").value;
		//alert('selectCount:'+selectCount);
		if(selectCount!=1)
		{
			document.getElementById("tab_co_cbs_data").deleteRow(1);
			makeTable(record);
		}
		else
		{
			makeTable(record);
		}
				//alert(document.getElementById('hd_payeeNm').value);
		var isRedBackground=document.getElementById("txt_hdnIsRedBackground").value;
		var readBackgroundVal=document.getElementById("txt_hdnRedBackgroundVal").value;
		//alert('isRedBackground:>>'+isRedBackground);
		//alert('readBackgroundVal:>>'+readBackgroundVal);
		if(isRedBackground=='YES')
		{//1
			browswChqs(readBackgroundVal);
		}//1
		//reset flag after finding the images for red background cheques.
		document.getElementById("txt_hdnIsRedBackground").value="FALSE";

}//add_rows_for_cbsData(record)
function makeTable(record)
{
		//alert(' start of make table ');
		//alert('color:'+selectedColor);
		//note: don't remove space from below string...
		var flg=false;
		if(selectedColor.indexOf('##rgb(255, 0, 0)##')>-1)
		{
			//alert('in red area...........');
			flg=true;
		}
		var allArrData=record.split("#");
		var table=document.getElementById("tab_co_cbs_data");
		var row = table.insertRow(1);

		var cell1 = row.insertCell(0);
		//cell1.style.width="10%";
		var element1 = document.createElement("input");
		element1.type = "text";
		element1.style.border="none";
    	element1.style.background="transparent";
		element1.name="dyna_txt_chqno";
		element1.id="dyna_txt_chqno";
		element1.value=allArrData[0];
		element1.size="2";
		//alert('flg:>>'+flg);
		/*if(!flg)
		{
			//element1.setAttribute("readonly", "true");
			element1.setAttribute("readonly", "false");	
		}*/
		cell1.appendChild(element1);

		var cell2 = row.insertCell(1);
		//cell2.style.width="10%";
		var element2 = document.createElement("input");
		element2.type = "text";
		element2.style.border="none";
    	element2.style.background="transparent";
		element2.name="dyna_txt_bodf";
		element2.id="dyna_txt_bodf";
		element2.value=allArrData[1];
		element2.size="5";
		/*if(!flg)
		{
			//element1.setAttribute("readonly", "true");
			element2.setAttribute("readonly", "false");	
		}*/
		cell2.appendChild(element2);

		var cell3 = row.insertCell(2);
		//cell3.style.width="10%";
		var element3 = document.createElement("input");
		element3.type = "text";
		element3.style.border="none";
    	element3.style.background="transparent";
		element3.name="dyna_txt_sortcd";
		element3.id="dyna_txt_sortcd";
		element3.value=allArrData[2];
		element3.size="6";
		/*if(!flg)
		{
			//element1.setAttribute("readonly", "true");
			element3.setAttribute("readonly", "false");	
		}*/
		cell3.appendChild(element3);

		var cell4 = row.insertCell(3);
		//cell4.style.width="10%";
		var element4 = document.createElement("input");
		element4.type = "text";
		element4.style.border="none";
    	element4.style.background="transparent";
		element4.name="dyna_txt_trCd";
		element4.id="dyna_txt_trCd";
		element4.value=allArrData[3];
		element4.size="1";
		/*if(!flg)
		{
			//element1.setAttribute("readonly", "true");
			element4.setAttribute("readonly", "false");	
		}*/
		cell4.appendChild(element4);

		var cell5 = row.insertCell(4);
		//cell5.style.width="10%";
		var element5 = document.createElement("input");
		element5.type = "text";
		element5.style.border="none";
    	element5.style.background="transparent";
		element5.name="dyna_txt_amt";
		element5.id="dyna_txt_amt";
		element5.value=allArrData[4];
		element5.size="5";
		/*if(!flg)
		{
			//element1.setAttribute("readonly", "true");
			element5.setAttribute("readonly", "false");	
		}*/
		cell5.appendChild(element5);

		var cell6 = row.insertCell(5);
		//cell6.style.width="10%";
		var element6 = document.createElement("input");
		element6.type = "text";
		element6.style.border="none";
    	element6.style.background="transparent";
		element6.name="dyna_txt_accNo";
		element6.id="dyna_txt_accNo";

		element6.value=allArrData[5];
		element6.size="9";
		/*if(!flg)
		{
			//element1.setAttribute("readonly", "true");
			element6.setAttribute("readonly", "false");	
		}*/
		cell6.appendChild(element6);

		var cell7 = row.insertCell(6);
		//cell7.style.width="10%";
		var element7 = document.createElement("input");
		element7.type = "text";
		element7.style.border="none";
    	element7.style.background="transparent";
		element7.name="dyna_txt_payeeNm";
		element7.id="dyna_txt_payeeNm";
		element7.value=allArrData[6];
		element7.size="9";
		/*if(!flg)
		{
			//element1.setAttribute("readonly", "true");
			element7.setAttribute("readonly", "false");	
		}*/
		cell7.appendChild(element7);

		var cell8 = row.insertCell(7);
		//cell8.style.width="10%";
		var element8 = document.createElement("input");
		element8.type = "text";
		element8.style.border="none";
    	element8.style.background="transparent";
		element8.name="dyna_txt_clearingType";
		element8.id="dyna_txt_clearingType";
		element8.value=allArrData[7];
		element8.size="9";
		/*if(!flg)
		{
			//element1.setAttribute("readonly", "true");
			element8.setAttribute("readonly", "false");	
		}*/
		cell8.appendChild(element8);
		
		
		var element8 = document.createElement("input");
		element8.id="hd_chqInfo"
		element8.name="hd_chqInfo"
		element8.type = "hidden";
		element8.value=allArrData[0];
		cell7.appendChild(element8);

		var element9 = document.createElement("input");
		element9.id="hd_bodf"
		element9.name="hd_bodf"
		element9.type = "hidden";
		element9.value=allArrData[1];
		cell7.appendChild(element9);

		var element10 = document.createElement("input");
		element10.id="hd_sortCd"
		element10.name="hd_sortCd"
		element10.type = "hidden";
		element10.value=allArrData[2];
		cell7.appendChild(element10);

		var element11 = document.createElement("input");
		element11.id="hd_TrCd"
		element11.name="hd_TrCd"
		element11.type = "hidden";
		element11.value=allArrData[3];
		cell7.appendChild(element11);

		var element12 = document.createElement("input");
		element12.id="hd_amt"
		element12.name="hd_amt"
		element12.type = "hidden";
		element12.value=allArrData[4];
		cell7.appendChild(element12);

		var element13 = document.createElement("input");
		element13.id="hd_accNo"
		element13.name="hd_accNo"
		element13.type = "hidden";
		element13.value=allArrData[5];
		cell7.appendChild(element13);

		var element14 = document.createElement("input");
		element14.id="hd_payeeNm"
		element14.name="hd_payeeNm"
		element14.type = "hidden";
		element14.value=allArrData[6];
		cell7.appendChild(element14);

		var element15 = document.createElement("input");
		element15.id="hd_clearingType"
		element15.name="hd_clearingType"
		element15.type = "hidden";
		element15.value=allArrData[7];		
		cell7.appendChild(element15);
		//alert(' end of make table ');
}
function update_co_cbs_outwardchqs()
{
	//alert('update_co_cbs_outwardchqs');
	var dyna_txt_chqno=document.getElementById("dyna_txt_chqno").value;
	var dyna_txt_bodf=document.getElementById("dyna_txt_bodf").value;
	var dyna_txt_sortcd=document.getElementById("dyna_txt_sortcd").value;
	var dyna_txt_trCd=document.getElementById("dyna_txt_trCd").value;
	var dyna_txt_amt=document.getElementById("dyna_txt_amt").value;
	var dyna_txt_accNo=document.getElementById("dyna_txt_accNo").value;
	var dyna_txt_payeeNm=document.getElementById("dyna_txt_payeeNm").value;
	var dyna_txt_clearingType=document.getElementById("dyna_txt_clearingType").value;
	
	var hd_chqInfo=document.getElementById("hd_chqInfo").value;
	var hd_bodf=document.getElementById("hd_bodf").value;
	var hd_sortCd=document.getElementById("hd_sortCd").value;
	var hd_TrCd=document.getElementById("hd_TrCd").value;
	var hd_amt=document.getElementById("hd_amt").value;
	var hd_accNo=document.getElementById("hd_accNo").value;
	var hd_payeeNm=document.getElementById("hd_payeeNm").value;
	var hd_clearingType=document.getElementById("hd_clearingType").value;
	
	/*alert('dyna_txt_chqno:'+dyna_txt_chqno);
	alert('dyna_txt_bodf:'+dyna_txt_bodf);
	alert('dyna_txt_sortcd:'+dyna_txt_sortcd);
	alert('dyna_txt_trCd:'+dyna_txt_trCd);
	alert('dyna_txt_amt:'+dyna_txt_amt);
	alert('dyna_txt_accNo:'+dyna_txt_accNo);
	alert('dyna_txt_payeeNm:'+dyna_txt_payeeNm);

	alert('hd_chqInfo:'+hd_chqInfo);
	alert('hd_bodf:'+hd_bodf);
	alert('hd_sortCd:'+hd_sortCd);
	alert('hd_TrCd:'+hd_TrCd);
	alert('hd_amt:'+hd_amt);
	alert('hd_accNo:'+hd_accNo);
	alert('hd_payeeNm:'+hd_payeeNm);
	*/
	//document.getElementById("cbs_chq_tbl").action="jsp/updateCoFilesRecord.jsp";
	//document.getElementById("cbs_chq_tbl").submit();
	/*var url_path="jsp/updateCoFilesRecord.jsp?dyna_txt_chqno="+dyna_txt_chqno+"&dyna_txt_bodf="+dyna_txt_bodf+"&dyna_txt_sortcd="+dyna_txt_sortcd+"&dyna_txt_trCd="+dyna_txt_trCd+"&dyna_txt_amt="+dyna_txt_amt+"&dyna_txt_accNo="+dyna_txt_accNo+"&dyna_txt_payeeNm="+dyna_txt_payeeNm+"&hd_chqInfo="+hd_chqInfo+"&hd_bodf="+hd_bodf+"&hd_sortCd="+hd_sortCd+"&hd_TrCd="+hd_TrCd+"&hd_amt="+hd_amt+"&hd_accNo="+hd_accNo+"&hd_payeeNm="+hd_payeeNm;

	var baseurl=document.URL;
	var p=baseurl.lastIndexOf('/');
	baseurl=baseurl.substr(0,p+1);
	baseurl=baseurl+url_path;
	document.getElementById("waiting").style.display='';
	//alert('baseurl:>>'+baseurl);
	cts_ajax_updateCbsData(baseurl)*/
	
	if(!(isNonNumeric(dyna_txt_chqno)))
		{//2
			alert('Cheque Number must be numeric.');
			document.getElementById('dyna_txt_chqno').focus();
		}//2
		else if(!(isNonNumeric(dyna_txt_bodf)))
		{//2
			alert('Bank Of First deposite must be numeric.');
			document.getElementById('dyna_txt_bodf').focus();
		}//2
		else if(!(isNonNumeric(dyna_txt_sortcd)))
		{//2
			alert('Sort Code must be numeric.');
			document.getElementById('dyna_txt_sortcd').focus();
		}//2
		else if(!(isNonNumeric(dyna_txt_trCd)))
		{//2
			alert('Transaction Code must be numeric.');
			document.getElementById('dyna_txt_trCd').focus();
		}//2
		else if(!(isNonNumeric(dyna_txt_trCd)))
		{//2
			alert('Transaction Code must be numeric.');
			document.getElementById('dyna_txt_trCd').focus();
		}//2
		else if(!(isNonNumeric(dyna_txt_amt)))
		{//2
			alert('Amount must be numeric.');
			document.getElementById('dyna_txt_amt').focus();
		}//2
		else if(!(isNonNumeric(dyna_txt_accNo)))
		{//2
			alert('Account Number must be numeric.');
			document.getElementById('dyna_txt_accNo').focus();
		}//2
		else if(!(isNonNumeric(dyna_txt_clearingType)))
		{//2
			alert('Account Number must be numeric.');
			document.getElementById('dyna_txt_clearingType').focus();
		}//2
		else
		{//2
			
		var url_path="jsp/updateCoFilesRecord.jsp?dyna_txt_chqno="+dyna_txt_chqno+"&dyna_txt_bodf="+dyna_txt_bodf+"&dyna_txt_sortcd="+dyna_txt_sortcd+"&dyna_txt_trCd="+dyna_txt_trCd+"&dyna_txt_amt="+dyna_txt_amt+"&dyna_txt_accNo="+dyna_txt_accNo+"&dyna_txt_payeeNm="+dyna_txt_payeeNm+"&dyna_txt_clearingType="+dyna_txt_clearingType+"&hd_chqInfo="+hd_chqInfo+"&hd_bodf="+hd_bodf+"&hd_sortCd="+hd_sortCd+"&hd_TrCd="+hd_TrCd+"&hd_amt="+hd_amt+"&hd_accNo="+hd_accNo+"&hd_payeeNm="+hd_payeeNm+"&hd_clearingType="+hd_clearingType;
		
			var baseurl=document.URL;
			var p=baseurl.lastIndexOf('/');
			baseurl=baseurl.substr(0,p+1);
			baseurl=baseurl+url_path;
			document.getElementById("waiting").style.display='';
			cts_ajax_updateCbsData(baseurl);
		}//2
}
function isNonNumeric(field)
{
	var flg=false;
	if(!(isNaN(field)))
	{
		flg=true;	
	}
	return flg;
}
function cts_ajax_updateCbsData(baseurl)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_updateCbsData;
		req.open("GET", baseurl, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange=cts_process_updateCbsData;
			req.open("GET", baseurl, true);
			req.send(null);
		}
	}
}
function cts_process_updateCbsData()
{
	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			/*var res = req.responseText;
			if(res.indexOf("Success")>-1)
				alert("Uploaded Successfully.");*/
				var res = req.responseText;		
				alert(res.trim());
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
	document.getElementById("waiting").style.display='none';
}
function enlargeCheque_outwardchqs(chq_type)
{
	//alert("in enlargeCheque() chq_type:"+chq_type);
	var session_branch_code = document.getElementById("session_branch_code").value;
	//alert("session_branch_code:"+session_branch_code);
	var url=document.getElementById(chq_type).src;
	//alert("url:"+url);
	//"uploadpath_to_CHI/9/ClearingOutward/Images/f_094966_416211001.tif"
	var p=url.indexOf('uploadpath_to_CHI/'+session_branch_code+'/ClearingOutward/Images/');
	imgurl=url.substr(p);
	//alert("imgurl:"+imgurl);
	//document.getElementById('img_enlarged').src = null;
	document.getElementById('img_enlarged').src = imgurl;
}

function save_con_outwardchqs()
{

	//alert('save_con_outwardchqs');
	//save and convert outward return cheques
	var val=false;
	//alert(document.getElementById("txt_tot_amt_sel_chq").value);
	if(document.getElementById("txt_no_of_sel_chq").value !=document.getElementById("txt_tot_no_of_chq").value && document.getElementById("txt_tot_amt_sel_chq").value!="0")
	{
		val=confirm("Do You Want To Rescan Non-Selected Cheques?\nThis Will Delete Exiting Images of Those Non-Selected Cheques.");
		//alert("confirm value"+val);
	}
	else if(document.getElementById("txt_tot_amt_sel_chq").value=="0")
	{
		alert("Please Select Cheque(s) To Upload.");
		document.getElementById("waiting").style.display='none';
	}

	if(document.getElementById("txt_tot_amt_sel_chq").value==document.getElementById("txt_tot_amt").value && document.getElementById("txt_tot_amt_sel_chq").value!="0")
	{
		val = true;
	}


	{
		//document.getElementById("txt_tot_amt_sel_chq").value = document.getElementById("txt_tot_amt").value;

		var table = document.getElementById("tab_out_chq");
		var rowCount = table.rows.length;
		var chqs = '', chq_no = '',all_chq = '';
		var sel_cnt = 0;
		var flag = 'OK';

		for(var i=1; i<rowCount; i++)
		{
			var row = table.rows[i];
			//alert("row :"+row);
			var chkbox = row.cells[2].childNodes[0];
			//alert("chkbox :"+chkbox.checked);
			var obj=document.getElementById("hd_imgnm"+i);//var obj=document.getElementById("txt_chqno"+i);

			if(true == chkbox.checked)
			{
				sel_cnt ++;
				var sel_chq = obj.value;//var sel_chq = obj.value.split(':')[0];
				/*alert('sel_chq:>>>>'+sel_chq);
				alert('sel_chq:>>>>'+sel_chq);
				alert('sel_chq:>>>>'+sel_chq);*/
				if(all_chq.indexOf(sel_chq) > -1)
				{
					flag = 'DUPLICATE';
				}
				//all_chq = "f_"+sel_chq+".tif"+"!@!"+"r_"+sel_chq+".tif"+"!@!"+"f_"+sel_chq+"_G.jpg" + "!@!";
				all_chq = "F"+sel_chq+".tif"+"!@!";//all_chq = "f_"+sel_chq+".tif"+"!@!";//-------+"r_"+sel_chq+".tif"+"!@!"+"f_"+sel_chq+"_G.jpg" + "!@!";
				/*
				all_chq = "f_121952"
				*/
				chqs = chqs + all_chq;
				//chq_no = chq_no +sel_chq+"!@!";
			}

		}
		//alert("chqs :"+chqs);
		//alert("chq_no :"+chq_no);
		//alert("Value Of Val:"+val);
		if(val)
		{
			document.getElementById("waiting").style.display='';
			//alert("In If");
			var session_loginid = document.getElementById("session_loginid").value;
			if(session_loginid == "null")
			{
				alert("Your Session Has Been Expired. Please Login Again.");
				/*var baseurl=document.URL;
				var p=baseurl.lastIndexOf('/');
				baseurl=baseurl.substr(0,p+1);
				baseurl=baseurl+"login.jsp?flag=1";
				location.replace(baseurl);*/
				commondoonclick();
			}
			else
			{
				if(sel_cnt == 0)
				{
					alert("Please Select Cheque(s) To Upload.");
					document.getElementById("waiting").style.display='none';
				}
				else
				{
					if(flag == 'DUPLICATE')
					{
						alert("Duplicate Cheque Number Selected.");
						document.getElementById("waiting").style.display='none';
					}
					else
					{
						//alert('uploadServlet');
						document.getElementById("fileName").value=chqs;
						document.getElementById("formid").action="jsp/UploadServlet.jsp";
						document.getElementById("formid").submit();
						document.getElementById("waiting").style.display='none';
					}
				}
			}
		}
	}
}


/***********************END	Outward Clearing **********************************/



/***********************START Inward Clearing **********************************/
function toggle_in_clearing(source)
{
  	var table = document.getElementById("tab_in_chq");
	var rowCount = table.rows.length;

	for(var i=1; i<rowCount; i++)
	{
		var row = table.rows[i];
		//alert("row :"+row);
		var chkbox = row.cells[2].childNodes[0];
		//alert("chkbox :"+chkbox.checked);
		chkbox.checked = source.checked;

	}
}

function chk_selected_inward_chqs()
{
	//alert("in chk_selected_inward_chqs");
	var table = document.getElementById("tab_in_chq");
	var rowCount = table.rows.length;
	var sel_cnt = 0;
	for(var i=1; i<rowCount; i++)
	{
		var row = table.rows[i];
		//alert("row :"+row);
		var chkbox = row.cells[2].childNodes[0];
		//alert("chkbox :"+chkbox.checked);

		var obj=document.getElementById("txt_chqno"+i);

		if(true == chkbox.checked)
		{
			sel_cnt ++;
		}
	}
	//alert("sel_cnt:"+sel_cnt+"\nrowCount-1:"+(rowCount-1));
	var chkbox = document.getElementById("chk_selall");
	if(sel_cnt != (rowCount-1))
	{
		//alert("in if.........");

		//alert("chkbox :"+chkbox.checked);
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



function download_inward_cheques()
{
	//alert("in download_inward_cheques()");
		var session_loginid = document.getElementById("session_loginid").value;
		if(session_loginid == "null")
		{
			alert("Your Session Has Been Expired. Please Login Again.");
			/*var baseurl=document.URL;
			var p=baseurl.lastIndexOf('/');
			baseurl=baseurl.substr(0,p+1);
			baseurl=baseurl+"login.jsp?flag=1";
			location.replace(baseurl);*/
			commondoonclick();
		}
		else
		{
			document.getElementById("waiting").style.display='';
			var val=document.getElementById("hdMsg1").value;
			//alert(val);
			if(val!="N")
			{//1
				alert(val);
				var baseurl=document.URL;
				var p = baseurl.lastIndexOf("/?");
				baseurl = baseurl.substr(0,p+1);
				baseurl =baseurl +"inward_clearing.jsp";
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

			record=res;
			//alert("after DownloadServlet res:"+res.indexOf('SUCCESS'));
			//res='SUCCESS';
			if(res.indexOf('SUCCESS') > -1)
			{
				alert('Converted Successfully');
				fetch_inward_cheques();
			}
			else
			{
				alert("Problem at server : "+res.trim());
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





/////////////////////////////////////////
function fetchValues_ReturnOutwardCheques()
{
	//alert("in fetchValues_ReturnOutwardCheques()");

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
						document.getElementById("txt_chqno"+i).style.background = '#66CC99';
						//alert("selected chq :"+document.getElementById("txt_chqno"+i).value);
						var chq_dtl=document.getElementById("txt_chqno"+i).value;
						var chq_no = chq_dtl.split(':')[0];
						//alert("chq_no : "+chq_no);
						//document.getElementById('img_enlarged').src = null;


						 var url = document.URL;
						 var p = url.lastIndexOf('/');
						 imgpath = url.substr(0,p+1);

						var  dynamicImgPath =
						//alert("imgpath:"+imgpath);


					/*	document.getElementById('img_frnt').src = imgpath+"f_"+chq_no+"_G.jpg";*/

						document.getElementById('img_frnt').src = imgpath+"0000000f_"+chq_no+"_G.jpg";

						document.getElementById("sel_chq"+i).style.background = '#66CC99';
						var baseurl1=document.URL;
						var p=baseurl1.lastIndexOf('/');
						baseurl1=baseurl1.substr(0,p+1);

				}
				else
				{

					//alert("in elser"+color);
					if(color!='##rgb(255, 204, 204)##')
					{
						document.getElementById("txt_chqno"+i).style.background = '#d5d5e5';
						document.getElementById("sel_chq"+i).style.background = '#d5d5e5';
					}
				}
	}

}
/////////////////////////////////////////

/***********************END Inward Clearing **********************************/

/***********************START Return_inward **********************************/

/*function onload_return_inward()
{
	//alert("in onload_return_inward()");

	var d=document.getElementById("menu_return_inward");
	d.className = ' active';
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);
	}
	else
	{
		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);

		if(val!="N")
		{
			alert(val);
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			location.replace(url);
		}
		else
		{
			//alert("list_ret_inward_filenames"); \CTS\downloadpath_from_CHI\ReturnInward
			//document.getElementById("waiting").style.display='';
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/list_ret_inward_filenames.jsp";
			//location.replace(baseurl);
			cts_Ajax_list_ret_inward_filenames(baseurl);
		}
	}
}*/

/*function cts_Ajax_list_ret_inward_filenames(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list_ret_inward_filenames;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list_ret_inward_filenames;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}*/

/*function cts_process_list_ret_inward_filenames()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			//alert("res:"+res);
			show_ret_inward_filenames(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}*/

/*function show_ret_inward_filenames(res)
{
	//alert("show_ret_inward_filenames()"+res);

	var ul = document.getElementById('ul_list');

	if(res.length>1)
	{
		//alert(rec);
		var data =res.split("$");
		//alert("data.length:"+data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			//alert("bclist[1]"+bclist[1]);
			if(bclist[1]=="NOFILES")
			{
				alert("Files Not Available.");
				document.getElementById("submitbutton").disabled = true;
				document.getElementById("waiting").style.display='none';
			}
			else
			{
				document.getElementById("submitbutton").disabled = false;
				document.getElementById("waiting").style.display='none';
				if(bclist[1].indexOf(".txt")==-1)
				{
					var li=document.createElement('li');
					ul.appendChild(li);
					li.innerHTML=li.innerHTML + bclist[1];
				}
			}
		}
	}
	document.getElementById("waiting").style.display='none';
}*/

/*function download_return_inward()
{

	var session_loginid = document.getElementById("session_loginid").value;
		if(session_loginid == "null")
		{

			alert("Your Session Has Been Expired. Please Login Again.");
			var baseurl=document.URL;
			var p=baseurl.lastIndexOf('/');
			baseurl=baseurl.substr(0,p+1);
			baseurl=baseurl+"login.jsp?flag=1";
			location.replace(baseurl);
		}
		else
		{
			//alert("in download_return_inward()");
			var val=document.getElementById("hdMsg1").value;
			//alert(val);
			if(val!="N")
			{//1
				alert(val);
				var baseurl=document.URL;
				var p = baseurl.lastIndexOf("/?");
				baseurl = baseurl.substr(0,p+1);
				baseurl =baseurl +"return_inward.jsp";
				//alert("baseurl:"+baseurl);
				location.replace(baseurl);

			}//1
			else
			{

					var url=document.URL;
					var p=url.lastIndexOf('/');
					baseurl=url.substr(0,p+1);
					baseurl=baseurl+"jsp/downloadReturnInword.jsp";
					location.replace(baseurl);
					//cts_AjaxData3(baseurl);
//					alert('********** 222 **** ');
					document.getElementById("waiting").style.display='';
					document.getElementById("formid").action="jsp/downloadReturnInword.jsp";
					document.getElementById("formid").submit();

		     }
		}
}*/
/***********************END Return_inward **********************************/



/***********************START Return_outward **********************************/
function onload_return_outward()
{
	var d=document.getElementById("menu_return_outward");
	d.className = ' active';
	//alert("in onload_return_outward()");

	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		/*var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		commondoonclick();
	}
	else
	{
		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);

		if(val!="N")
		{
			alert(val);
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			location.replace(url);
		}
		else
		{
			//alert("list_ret_outward_filenames"); CTS\uploadpath_to_CHI\9\ReturnOutward
			document.getElementById("waiting").style.display='';
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/list_ret_outward_filenames.jsp";
			//location.replace(baseurl);
			cts_Ajax_list_ret_outward_filenames(baseurl);
		}
	}
}
function cts_Ajax_list_ret_outward_filenames(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list_ret_outward_filenames;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list_ret_outward_filenames;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_list_ret_outward_filenames()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;

			record=res;
			//alert("res:"+res);
			show_ret_outward_filenames(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function show_ret_outward_filenames(res)
{
	//alert("show_ret_outward_filenames()"+res);

	var ul = document.getElementById('ul_list');

	if(res.length>1)
	{
		//alert(rec);
		var data =res.split("$");
		//alert("data.length:"+data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			//alert("bclist[1]"+bclist[1]);
			if(bclist[1]=="NOFILES")
			{
				alert("Files Not Available.");
				document.getElementById("waiting").style.display='none';
				document.getElementById("submitbutton").disabled = true;
			}
			else
			{
				document.getElementById("waiting").style.display='none';
				document.getElementById("submitbutton").disabled = false;
				var li=document.createElement('li');
				ul.appendChild(li);
				li.innerHTML=li.innerHTML + bclist[1];

			}
		}
	}
	document.getElementById("waiting").style.display='none';
}

/*
//without update..
function upload_return_outward()
{
	//alert("--- in upload_return_outward ---");
	var session_loginid = document.getElementById("session_loginid").value;
	document.getElementById("waiting").style.display='';
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);
	}
	else
	{
		var url=document.URL;
		var p=url.lastIndexOf('/');
		baseurl=url.substr(0,p+1);
		baseurl=baseurl+"jsp/generateReturnOutward.jsp";
		//location.replace(baseurl);

		cts_AjaxData5(baseurl);
	}
}
//&&&&&&&&&&&&&&&&&&&&&&&
function cts_AjaxData5(url)
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
			document.getElementById("submitbutton").disabled=true;;

		}
		document.getElementById("waiting").style.display='none';
}*/

//with update changes

/***********************END Return_outward **********************************/



/***********************START CHANGE PASSWORD **********************************/
function onload_change_pwd()
{
//	alert("in onload_change_pwd");
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		/*var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		commondoonclick();
	}
	else
	{
		var d=document.getElementById("menu_admin");
		d.className = ' active';
	
	
		document.getElementById("user_pass").focus();
		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);
	
		if(val!="N")
		{
			alert(val);
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			//location.replace(url);
			document.getElementById("formid").action="change_password.jsp";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").submit();
		}
	}
}


function after_change_pwd()
{
	//alert("in after_change_pwd");
	document.getElementById("waiting").style.display='';
	var user_pass=document.getElementById("user_pass").value;
	var new_user_pass=document.getElementById("new_user_pass").value;
	var re_new_user_pass=document.getElementById("re_new_user_pass").value;


	//var old_pass=document.getElementById("emp_id_view9").value;
	//alert("new_user_pass:"+new_user_pass);
	//alert("re_new_user_pass:"+re_new_user_pass);
	if(document.getElementById("user_pass").value=="" && document.getElementById("new_user_pass").value=="" && document.getElementById("re_new_user_pass").value=="")
	{
		alert("Fill all fields");
		document.getElementById("user_pass").focus();
	}
	else if(user_pass=="")
	{
		alert("Enter Current Password");
		document.getElementById("user_pass").focus();
	}
	else if(new_user_pass=="")
	{
		alert("Enter New Password");
		document.getElementById("new_user_pass").focus();
	}
	else if(re_new_user_pass=="")
	{
		alert("Retype New Password");
		document.getElementById("re_new_user_pass").focus();
	}
	else if(new_user_pass.length<8 || new_user_pass.length >15)
	{
		alert("New Password must contain minimum 8 characters and maximum 15 characters.");
		document.getElementById("new_user_pass").focus();
	}
	else if(re_new_user_pass.length<8 || re_new_user_pass.length >15)
	{
		alert("Retype New Password must contain minimum 8 characters and maximum 15 characters.");
		document.getElementById("re_new_user_pass").focus();
	}
	else if(new_user_pass!=re_new_user_pass)
	{
		alert("New Password and Retype New Password should match");
		document.getElementById("new_user_pass").value="";
		document.getElementById("re_new_user_pass").value="";
		document.getElementById("new_user_pass").focus();
	}
	else
	{
		//alert("abc");
		var session_loginid = document.getElementById("session_loginid").value;
		if(session_loginid == "null")
		{

			alert("Your Session Has Been Expired. Please Login Again.");
			/*var baseurl=document.URL;
			var p=baseurl.lastIndexOf('/');
			baseurl=baseurl.substr(0,p+1);
			baseurl=baseurl+"login.jsp?flag=1";
			location.replace(baseurl);*/
			commondoonclick();
		}
		else
		{
			document.getElementById("formid").action="jsp/afterUserChangePwd.jsp?para2="+user_pass+"&para3="+new_user_pass;
			document.getElementById("formid").submit();
		}
	}
	document.getElementById("waiting").style.display='none';
}

function afterReset_chng_pwd()
{
		document.getElementById("user_pass").value="";
		document.getElementById("new_user_pass").value="";
		document.getElementById("re_new_user_pass").value="";
		document.getElementById("user_pass").focus();
}
/***********************END CHANGE PASSWORD **********************************/

/***********************START CONFIG FORM**********************************/

function onBrowseFile()
{
	var filePath = document.getElementById('txt_uploadpath_to_chi').value;
	//alert("filePath:"+filePath);
		document.getElementById('hd_uploadpath_to_chi').value = filePath;
		document.getElementById('txt_uploadpath_to_chi').value = '';
}
function onLoad_config()
{
		//alert("onLoad_config");

		var d=document.getElementById("formid");
		d.className = ' active';
		document.getElementById("txt_bankcode").focus();
		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);
		if(val!="N")
		{//1
			alert(val);
			document.getElementById("formid").action="configuration.jsp";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").submit();
			/*var baseurl=document.URL;
			var p = baseurl.lastIndexOf("?");
			baseurl = baseurl.substr(0,p);
			location.replace(baseurl);*/

		}//1
		else
		{
			var session_loginid = document.getElementById("session_loginid").value;
			//alert(session_loginid);
			if(session_loginid == "null")
			{

				alert("Your Session Has Been Expired. Please Login Again.");
				/*var baseurl=document.URL;
				var p=baseurl.lastIndexOf('/');
				baseurl=baseurl.substr(0,p+1);
				baseurl=baseurl+"login.jsp?flag=1";
				location.replace(baseurl);*/
				commondoonclick();				
			}
			else
			{
				fetch_saved_config();
			}
		}
}
function commondoonclick()
{
	document.getElementById("formid").action="login.jsp";
	document.getElementById("formid").method="POST";
	document.getElementById("formid").submit();

}
function fetch_saved_config()
{
	//alert("fetch_saved_config()");
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired... Please Login Again...");
		/*var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"login.jsp?flag=1";
		location.replace(baseurl1);*/
		commondoonclick();

	}
	else
	{

		var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"jsp/fetch_saved_config.jsp";
		//alert("baseurl1:"+baseurl1);
		//location.replace(baseurl1);
		cts_AjaxData_fetch_saved_config(baseurl1);
	}
}

function cts_AjaxData_fetch_saved_config(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_fetch_saved_config;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_fetch_saved_config;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_fetch_saved_config()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;

			record=res;
			//alert("res:"+res);
			set_saved_config(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function set_saved_config(res)
{
	//alert("in set_saved_config()");
	if(res.indexOf('FAIL') > -1)
	{
		alert("Some Problem At Server. Please Login Again."); //case-if tomcat restarted
		/*var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"login.jsp?flag=1";
		location.replace(baseurl1);*/
		commondoonclick();
	}
	else
	{
		if(res.indexOf('GETDATAFROMADMIN') > -1)
		{
			alert("Some Initial Configuration Values Are Missing. Please Contact System Administrator!");
			/*var baseurl1=document.URL;
			var p=baseurl1.lastIndexOf('/');
			baseurl1=baseurl1.substr(0,p+1);
			baseurl1=baseurl1+"login.jsp?flag=1";
			location.replace(baseurl1);*/
			commondoonclick();

		}
		if(res.indexOf('!#!') > -1)
		{//1st if

			var reclist = res.split('!#!');
			//alert(reclist);
			for (var i=0; i<=reclist.length; i++)
			{//1 st for
				//alert("reclist[i]	:"+reclist[i]);

////////////////BANK CODE
				if(i==0)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_bankcode").value=reclist[i];
					}
					else
					{
						document.getElementById("txt_bankcode").value='';
					}
				}

////////////////Upload Path (To CHI)
				if(i==1)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_uploadpath_to_chi").value=reclist[i];
						document.getElementById("txt_uploadpath_to_chi").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_uploadpath_to_chi").value='';
					}
				}

////////////////Download Path (From CHI)
				if(i==2)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_downloadpath_from_chi").value=reclist[i];
						document.getElementById("txt_downloadpath_from_chi").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_downloadpath_from_chi").value='';
					}
				}

////////////////Archive Download Path (To CHI)
				if(i==3)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_arch_downloadpath_from_chi").value=reclist[i];
						document.getElementById("txt_arch_downloadpath_from_chi").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_arch_downloadpath_from_chi").value='';
					}
				}

////////////////Archive Upload Path (To CHI)
				if(i==4)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_arch_uploadpath_to_chi").value=reclist[i];
						document.getElementById("txt_arch_uploadpath_to_chi").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_arch_uploadpath_to_chi").value='';
					}
				}

////////////////Security Originator Name
				if(i==5)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_sec_orgin_name").value=reclist[i];
						document.getElementById("txt_sec_orgin_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_sec_orgin_name").value='';
					}
				}

////////////////Security Authenticator Name
				if(i==6)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_sec_auth_name").value=reclist[i];
						document.getElementById("txt_sec_auth_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_sec_auth_name").value='';
					}
				}

////////////////Security Key Name
				if(i==7)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_sec_key_name").value=reclist[i];
						document.getElementById("txt_sec_key_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_sec_key_name").value='';
					}
				}

////////////////NPCI Version No
				if(i==8)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_npci_ver_no").value=reclist[i];
						document.getElementById("txt_npci_ver_no").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_npci_ver_no").value='';
					}
				}

////////////////Digital Signature Method
				if(i==9)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_dig_sign_method").value=reclist[i];
						document.getElementById("txt_dig_sign_method").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_dig_sign_method").value='';
					}
				}

////////////////Security Key Size
				if(i==10)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_sec_key_size").value=reclist[i];
						document.getElementById("txt_sec_key_size").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_sec_key_size").value='';
					}
				}

////////////////Keystore Filename
				if(i==11)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_keystore_filenm").value=reclist[i];
						document.getElementById("txt_keystore_filenm").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_keystore_filenm").value='';
					}
				}

////////////////Keystore Password
				if(i==12)
				{

					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_keystore_pwd").value=reclist[i];
						document.getElementById("txt_keystore_pwd").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_keystore_pwd").value='';
					}
				}

////////////////Keystore Alias
				if(i==13)
				{

					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_keystore_alias").value=reclist[i];
						document.getElementById("txt_keystore_alias").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_keystore_alias").value='';
					}
				}

////////////////Inward File Split Style

				if(i==14)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("opt_inward_split_style").value=reclist[i];
						document.getElementById("opt_inward_split_style").title=reclist[i];
					}
					else
					{
						document.getElementById("opt_inward_split_style").value='0';
					}

				}

				//Our Version No
				if(i==15)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_our_verno").value=reclist[i];
						document.getElementById("txt_our_verno").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_our_verno").value='';
					}

				}
				
				//txt_bank_Name 
				if(i==16)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_bank_Name").value=reclist[i];
						document.getElementById("txt_bank_Name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_bank_Name").value='';
					}

				}
				//CHI bank name
				if(i==17)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_chi_bankname").value=reclist[i];
						document.getElementById("txt_chi_bankname").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_chi_bankname").value='';
					}

				}
				
				// txt_vendor_id
				if(i==18)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_vendor_id").value=reclist[i];
						//document.getElementById("txt_vendor_id").value="LIST";
						document.getElementById("txt_vendor_id").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_vendor_id").value='';
					}

				}
				
				// txt_vendor_name
				if(i==19)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_vendor_name").value=reclist[i];
						document.getElementById("txt_vendor_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_vendor_name").value='';
					}

				}
				
				// txt_hub_location_name
				if(i==20)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_hub_location_name").value=reclist[i];
						document.getElementById("txt_hub_location_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_hub_location_name").value='';
					}

				}
				
				// txt_hub_location_id
				if(i==21)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_hub_location_id").value=reclist[i];
						document.getElementById("txt_hub_location_id").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_hub_location_id").value='';
					}

				}
				
				// txt_core_system
				if(i==22)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_core_system").value=reclist[i];
						document.getElementById("txt_core_system").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_core_system").value='';
					}

				}
				
				
				if(i==23)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_clouwrd_popup").value=reclist[i];
						document.getElementById("txt_clouwrd_popup").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_clouwrd_popup").value='';
					}

				}
			}//--1 st for
		}//--1st if
		else
		{

		}
	}
}

function afterSave_config()
{
	//alert("in afterSave_config()");
	var flag = beforeSaveConfig();
	//alert("flag:"+flag);
	if(flag == 1)
	{
		document.getElementById("txt_our_verno").disabled=false;

		document.getElementById("txt_sec_orgin_name").disabled=false;
		document.getElementById("txt_sec_auth_name").disabled=false;
		document.getElementById("txt_sec_key_name").disabled=false;
		document.getElementById("txt_sec_key_size").disabled=false;
		document.getElementById("txt_dig_sign_method").disabled=false;
		document.getElementById("txt_npci_ver_no").disabled=false;

		document.getElementById("formid").action="jsp/save_config.jsp";
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();
	}
}
function beforeSaveConfig()
{
	//alert("in beforeSaveConfig()");


	var txt_bankcode=document.getElementById("txt_bankcode").value;
	var txt_our_verno=document.getElementById("txt_our_verno").value;

	var txt_uploadpath_to_chi=document.getElementById("txt_uploadpath_to_chi").value;
	var txt_downloadpath_from_chi=document.getElementById("txt_downloadpath_from_chi").value;

	var txt_arch_uploadpath_to_chi=document.getElementById("txt_arch_uploadpath_to_chi").value;
	var txt_arch_downloadpath_from_chi=document.getElementById("txt_arch_downloadpath_from_chi").value;


	var txt_sec_orgin_name=document.getElementById("txt_sec_orgin_name").value;
	var txt_sec_auth_name=document.getElementById("txt_sec_auth_name").value;

	var txt_sec_key_name=document.getElementById("txt_sec_key_name").value;
	var txt_sec_key_size=document.getElementById("txt_sec_key_size").value;

	var txt_dig_sign_method=document.getElementById("txt_dig_sign_method").value;
	var txt_npci_ver_no=document.getElementById("txt_npci_ver_no").value;

	var txt_keystore_filenm=document.getElementById("txt_keystore_filenm").value;
	var txt_keystore_pwd=document.getElementById("txt_keystore_pwd").value;

	var txt_keystore_alias=document.getElementById("txt_keystore_alias").value;
	var opt_inward_split_style=document.getElementById("opt_inward_split_style").value;
	
	var txt_chi_bankname=document.getElementById("txt_chi_bankname").value;
	var txt_vendor_id=document.getElementById("txt_vendor_id").value;

	var txt_vendor_name=document.getElementById("txt_vendor_name").value;
	var txt_hub_location_name=document.getElementById("txt_hub_location_name").value;

	var txt_hub_location_id=document.getElementById("txt_hub_location_id").value;
	var txt_core_system=document.getElementById("txt_core_system").value;

	var txt_clouwrd_popupval=document.getElementById("txt_clouwrd_popup").value;
	//bankcode validation
	if(txt_bankcode == '')
	{
		alert("Please Enter Bank Code!");
		document.getElementById("txt_bankcode").focus();
		flag = 0;
	}
	else if(isNaN(txt_bankcode))
	{
		alert("Bank Code should be numeric");
		document.getElementById("txt_bankcode").value="";
		document.getElementById("txt_bankcode").focus();
		flag = 0;
	}
	else if(txt_bankcode.length > 9 || txt_bankcode.length < 9)
	{
		alert("Bank Code Length Should Be Equal To 9.");
		document.getElementById("txt_bankcode").focus();
		flag = 0;
	}
	else if(txt_our_verno == '')
	{
		alert("Please Enter Product Version Number!");
		document.getElementById("txt_our_verno").focus();
		flag = 0;
	}
	else if(txt_uploadpath_to_chi == '')
	{
		alert("Please Enter Upload Files To CHI Path!");
		document.getElementById("txt_uploadpath_to_chi").focus();
		flag = 0;
	}
	else if(!validate_path(txt_uploadpath_to_chi))
	{
		alert("Upload Files To CHI Path Should Contain Only Forward Slash('/').");
		document.getElementById("txt_uploadpath_to_chi").focus();
		flag = 0;
	}
	else if(txt_downloadpath_from_chi == '')
	{
		alert("Please Enter Download Files From CHI Path!");
		document.getElementById("txt_downloadpath_from_chi").focus();
		flag = 0;
	}
	else if(!validate_path(txt_downloadpath_from_chi))
	{
		alert("Download Files From CHI Path Should Contain Only Forward Slash('/').");
		document.getElementById("txt_downloadpath_from_chi").focus();
		flag = 0;
	}
	else if(txt_arch_uploadpath_to_chi == '')
	{
		alert("Please Enter Archile File Upload To CHI Path!");
		document.getElementById("txt_arch_uploadpath_to_chi").focus();
		flag = 0;
	}
	else if(!validate_path(txt_arch_uploadpath_to_chi))
	{
		alert("Archile File Upload To CHI Path Should Contain Only Forward Slash('/').");
		document.getElementById("txt_arch_uploadpath_to_chi").focus();
		flag = 0;
	}
	else if(txt_arch_downloadpath_from_chi == '')
	{
		alert("Please Enter Archile File Download From CHI Path!");
		document.getElementById("txt_arch_downloadpath_from_chi").focus();
		flag = 0;
	}
	else if(!validate_path(txt_arch_downloadpath_from_chi))
	{
		alert("Archile File Download From CHI Path Should Contain Only Forward Slash('/').");
		document.getElementById("txt_arch_downloadpath_from_chi").focus();
		flag = 0;
	}
	else if(txt_sec_orgin_name == '')
	{
		alert("Please Enter Security Originator Name!");
		document.getElementById("txt_sec_orgin_name").focus();
		flag = 0;
	}
	else if(txt_sec_auth_name == '')
	{
		alert("Please Enter Security Authenticator Name!");
		document.getElementById("txt_sec_auth_name").focus();
		flag = 0;
	}
	else if(txt_sec_key_name == '')
	{
		alert("Please Enter Security Key Name!");
		document.getElementById("txt_sec_key_name").focus();
		flag = 0;
	}
	else if(txt_sec_key_size == '')
	{
		alert("Please Enter Security Key Size!");
		document.getElementById("txt_sec_key_size").focus();
		flag = 0;
	}
	else if(isNaN(txt_sec_key_size))
	{
		alert("Security Key Size should be numeric");
		document.getElementById("txt_sec_key_size").value="";
		document.getElementById("txt_sec_key_size").focus();
		flag = 0;
	}
	else if(txt_dig_sign_method == '')
	{
		alert("Please Enter Digital Signature Method!");
		document.getElementById("txt_dig_sign_method").focus();
		flag = 0;
	}
	else if(txt_npci_ver_no == '')
	{
		alert("Please Enter NPCI Version Number!");
		document.getElementById("txt_npci_ver_no").focus();
		flag = 0;
	}
	else if(txt_keystore_filenm =='')
	{
		alert("Please Enter Keystore Filename!");
		document.getElementById("txt_keystore_filenm").focus();
		flag = 0;
	}
	else if(txt_keystore_pwd == '')
	{
		alert("Please Enter Keystore Password!");
		document.getElementById("txt_keystore_pwd").focus();
		flag = 0;
	}
	else if(txt_keystore_pwd.length > 6 || txt_keystore_pwd.length < 6)
	{
		alert("Keystore Password Length Should Be Equal To 6.");
		document.getElementById("txt_keystore_pwd").focus();
		flag = 0;
	}
	else if(txt_keystore_alias == '')
	{
		alert("Please Enter Keystore Alias!");
		document.getElementById("txt_keystore_alias").focus();
		flag = 0;
	}
	else if(opt_inward_split_style == '0')
	{
		alert("Please Select Inward Split Style!");
		document.getElementById("opt_inward_split_style").focus();
		flag = 0;
	}
	
	else if(txt_chi_bankname == '0')
	{
		alert("Please Select CHI Bank Name!");
		document.getElementById("txt_chi_bankname").focus();
		flag = 0;
	}
	else if(txt_vendor_id == '')
	{
		alert("Please Enter Vendor Id!");
		document.getElementById("txt_vendor_id").focus();
		flag = 0;
	}
	else if(isNaN(txt_vendor_id))
	{
		alert("Vendor Id should be numeric");
		document.getElementById("txt_vendor_id").value="";
		document.getElementById("txt_vendor_id").focus();
		flag = 0;
	}
	else if(txt_vendor_id.length > 5 || txt_vendor_id.length < 5)
	{
		alert("Vendor Id Length Should Be Equal To 5.");
		document.getElementById("txt_vendor_id").focus();
		flag = 0;
	}
	else if(txt_hub_location_id == '')
	{
		alert("Please Enter Hub Location Id!");
		document.getElementById("txt_hub_location_id").focus();
		flag = 0;
	}
	else if(isNaN(txt_hub_location_id))
	{
		alert("Hub Location Id should be numeric");
		document.getElementById("txt_hub_location_id").value="";
		document.getElementById("txt_hub_location_id").focus();
		flag = 0;
	}
	else if(txt_hub_location_id.length > 3 || txt_hub_location_id.length < 3)
	{
		alert("Hub Location Id Length Should Be Equal To 3.");
		document.getElementById("txt_hub_location_id").focus();
		flag = 0;
	}
	else if(txt_core_system == '0')
	{
		alert("Please Select Core System!");
		document.getElementById("txt_core_system").focus();
		flag = 0;
	}
	else
	{
		flag = 1;
	}
	return flag;
}

function validate_path(path_val)
{
	if(path_val.indexOf("\"")>-1 || path_val.indexOf("\\")>-1 || path_val.indexOf("?")>-1 || path_val.indexOf("<")>-1 || path_val.indexOf("<")>-1 || path_val.indexOf("*")>-1 ||path_val.indexOf("|")>-1)
	{
		return false;
	}/// ? < > \ : * | ?

	else
	{
		return true;
	}
}

function keyStoreValidation()
{
	var keyStorefileName=document.getElementById("txt_keystore_filenm").value;
	//alert('keyStorefileName:::'+keyStorefileName);
	if(keyStorefileName.indexOf("\\")>-1 || keyStorefileName.indexOf('/')>-1 ||keyStorefileName.indexOf('*')>-1 || keyStorefileName.indexOf('?')>-1 || keyStorefileName.indexOf('<')>-1 || keyStorefileName.indexOf('>')>-1 || keyStorefileName.indexOf('|')>-1)
	{
		alert('File Name should not contain spcial character');
	}
}//end keyStoreValidation

function afterReset_config()
{
	onLoad_config();
}

function onTextFocus()
{

}

/***********************	END CONFIG FORM		**********************************/
/***********************	START Manual Archive	*****************************/

function onLoad_manual_archive()
{
	//alert("in onLoad_manual_archive()");
	//var val=document.getElementById("hdMsg1").value;
	var d=document.getElementById("menu_admin");
	d.className = ' active';

	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		/*var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		commondoonclick();
	}
	else
	{
		var val=document.getElementById("hdMsg1").value;

		if(val!="N")
		{
			alert(val);
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			location.replace(url);
		}
	}
}

function toggle_manual_archive(source)
{

	for(var i=1; i<7; i++)
	{

		var chkbox = document.getElementById("chk_"+i);
		//alert("chkbox :"+chkbox.checked);
		chkbox.checked = source.checked;

	}
}
function chk_selected_archive()
{
	//alert("in chk_selected_archive");
	var sel_cnt = 0;

	for(var i=1; i<7; i++)
	{

		var chkbox = document.getElementById("chk_"+i);
		//alert("chkbox :"+chkbox.checked);
		//chkbox.checked = source.checked;
		if(true == chkbox.checked)
		{
			sel_cnt ++;
		}
	}
	var chkbox = document.getElementById("chk_selall");

	if(sel_cnt != 6)
	{
		//alert("in if.........");

		//alert("chkbox :"+chkbox.checked);
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

function after_archive()
{
	//alert("in after_archive()");
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		/*var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		commondoonclick();
	}
	else
	{
		var chk_selall = document.getElementById("chk_selall").checked;
		var chk_1 = document.getElementById("chk_1").checked;
		var chk_2 = document.getElementById("chk_2").checked;
		var chk_3 = document.getElementById("chk_3").checked;
		var chk_4 = document.getElementById("chk_4").checked;
		var chk_5 = document.getElementById("chk_5").checked;
		var chk_6 = document.getElementById("chk_6").checked;
		//alert("chk_selall:"+chk_selall+"\nchk_1:"+chk_1+"\nchk_2:"+chk_2+"\nchk_3:"+chk_3+"\nchk_4:"+chk_4);

		if(chk_selall==false && chk_1==false && chk_2==false && chk_3==false && chk_4==false && chk_5==false && chk_6==false)
			alert('Select Archive from');
		else
		{
			document.getElementById("waiting").style.display='';
			//alert('---- 1111 -----');
		document.getElementById("formid").action="jsp/afterManualArchive.jsp?chk_selall="+chk_selall+"&chk_1="+chk_1+"&chk_2="+chk_2+"&chk_3="+chk_3+"&chk_4="+chk_4+"&chk_5="+chk_5+"&chk_6="+chk_6;
		document.getElementById("formid").submit();

		}

		//document.getElementById("waiting").style.display='none';
			//alert('---- 222222 -----');
	/*	var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"jsp/afterManualArchive.jsp";
		location.replace(baseurl1);*/

	}

}

/**********		END Manual Archive		********************/
//old change without update..
/*function onLoad_returnOutward()
{//onLoad_returnOutward()

	//alert("in onLoad_returnOutward()");
	//var val=document.getElementById("hdMsg1").value;
	document.getElementById("submitbutton").disabled=false;;
	var d=document.getElementById("menu_return_outward");
	d.className = ' active';

	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);
	}
	else
	{
		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);

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
				baseurl=baseurl+"jsp/getReturnOutwardFile.jsp";
				//location.replace(baseurl);
				cts_Ajax_list_branches1(baseurl);

			}
			else
			{
				alert("Return Outward File Creation Is Already Done For Today!");
			}
		}
	}
}//onLoad_returnOutward()

function cts_Ajax_list_branches1(url)
{
	//alert ("cts_Ajax_list_branches1");
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
			//var retVal=res.split("$");
			//alert('retVal.length:\n'+retVal.length);
			// retVal.length is 2 if and only of when this string is not from getReturnOutwardImgPath method
			//if(retVal.length==2 && !(retVal.indexOf('!@!')>-1))
			if(retVal[1].indexOf('!@!')>-1)
			{
				alert('Ready for Return Outward');
				setReturnOutwardData(retVal[1]);
			}
			else
			{
				alert('Return Outward:\n'+retVal[1]);	//For error message
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
	if(responce.indexOf("!@!")>-1)
	{
		var data=responce.split("!@!");
		//alert('data.length:'+data.length)
		for(t=0;t<data.length-1;t++)
		{
			//alert(data[t]);
			addRows_RetOwd_detail('retowd');
		}
		var totAmt=0;
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
			/*var amt=parseFloat((bclist[3]*1)/100);
			document.getElementById("txt_srno"+rcnt).value=rcnt;
			document.getElementById("txt_chqno"+rcnt).value=bclist[0];
			document.getElementById("txt_sortcd"+rcnt).value=bclist[1];
			document.getElementById("txt_trancd"+rcnt).value=bclist[2];
			//document.getElementById("txt_amount"+rcnt).value=bclist[3];
			document.getElementById("txt_amount"+rcnt).value=amt;
			document.getElementById("txt_reasoncd"+rcnt).value=bclist[4];
			totAmt=(totAmt*1)+parseFloat((bclist[3]*1)/100);
			//totAmt=parseFloat((bclist[2]*1)/100);
		}
		alert('Total Amount:'+totAmt);
		document.getElementById("grdAmt").value=totAmt;
		//document.getElementById("totalCheques").innerText=t;
	}
}


function addRows_RetOwd_detail(tableID)
{
	var table=document.getElementById(tableID);
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		//alert(rowCount);

		var row = table.insertRow(rowCount);

		var cell1 = row.insertCell(0);
		cell1.style.width="10%";
		var element1 = document.createElement("input");
		element1.type = "text";
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
		cell2.style.width="30%";
		var element2 = document.createElement("input");
		element2.type = "text";
		element2.style.border="none";
    	element2.style.background="transparent";
		element2.name="txt_chqno"+rcnt;
		element2.id="txt_chqno"+rcnt;
		element2.value=rcnt;
		//element1.size="13";
		element2.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell2.appendChild(element2);


		var cell3 = row.insertCell(2);
		cell3.style.width="35%";
		var element3 = document.createElement("input");
		element3.type = "text";
		element3.style.border="none";
    	element3.style.background="transparent";
		element3.name="txt_sortcd"+rcnt;
		element3.id="txt_sortcd"+rcnt;
		element3.value=rcnt;
		//element1.size="13";
		element3.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell3.appendChild(element3);

		var cell4 = row.insertCell(3);
		cell4.style.width="10%";
		var element4 = document.createElement("input");
		element4.type = "text";
		element4.style.border="none";
    	element4.style.background="transparent";
		element4.name="txt_trancd"+rcnt;
		element4.id="txt_trancd"+rcnt;
		element4.value=rcnt;
		//element1.size="13";
		element4.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell4.appendChild(element4);

		var cell5 = row.insertCell(4);
		cell5.style.width="40%";
		var element5 = document.createElement("input");
		element5.type = "text";
		element5.style.border="none";
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
		cell6.style.width="10%";
		var element6 = document.createElement("input");
		element6.type = "text";
		element6.style.border="none";
    	element6.style.background="transparent";
		element6.name="txt_reasoncd"+rcnt;
		element6.id="txt_reasoncd"+rcnt;
		element6.value=rcnt;
		//element1.size="13";
		element6.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell6.appendChild(element6);


		rcnt=rcnt*1+1;
		//alert("addRows_inwardchqs rcnt:"+rcnt);
		document.getElementById("rcnt").value=rcnt;

		document.getElementById("waiting").style.display='none';
}*/

//new with update change 


function cts_Ajax_list_branches1(url)
{	
	//alert ("cts_Ajax_list_branches1");
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
			//var retVal=res.split("$");								
			//alert('retVal.length:\n'+retVal.length);
			// retVal.length is 2 if and only of when this string is not from getReturnOutwardImgPath method
			//if(retVal.length==2 && !(retVal.indexOf('!@!')>-1))
			if(retVal[1].indexOf('!@!')>-1)
			{		
				alert('Ready for Return Outward');
				setReturnOutwardData(retVal[1]);
			}
			else
			{
				alert('Return Outward:\n'+retVal[1]);	//For error message		
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
	//alert('setReturnOutwardData=>> responce:'+responce);
	
	if(responce.indexOf("!@!")>-1)
	{
		document.getElementById('hdRec').value=responce;		
		var data=responce.split("!@!");
		//document.getElementById('hdRec').value=data;
		//alert('setReturnOutwardData=>> Data:'+data);
		for(t=0;t<data.length-1;t++)
		{
			//alert(data[t]);
			addRows_RetOwd_detail('retowd');
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
			if(bclist[5]!='0')
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


function addRows_RetOwd_detail(tableID)
{
	var table=document.getElementById(tableID);
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		//alert(rowCount);
		
		var row = table.insertRow(rowCount);
		
		var cell1 = row.insertCell(0);
		cell1.style.width="10%";
		var element1 = document.createElement("input");
		element1.type = "text";
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
		cell2.style.width="30%";
		var element2 = document.createElement("input");
		element2.type = "text";
		element2.style.border="none";
    	element2.style.background="transparent";
		element2.name="txt_chqno"+rcnt;
		element2.id="txt_chqno"+rcnt;
		element2.value=rcnt;
		//element1.size="13";
		element2.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell2.appendChild(element2);			
		
		
		var cell3 = row.insertCell(2);
		cell3.style.width="35%";
		var element3 = document.createElement("input");
		element3.type = "text";
		element3.style.border="none";
    	element3.style.background="transparent";
		element3.name="txt_sortcd"+rcnt;
		element3.id="txt_sortcd"+rcnt;
		element3.value=rcnt;
		//element1.size="13";
		element3.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell3.appendChild(element3);
		
		var cell4 = row.insertCell(3);
		cell4.style.width="10%";
		var element4 = document.createElement("input");
		element4.type = "text";
		element4.style.border="none";
    	element4.style.background="transparent";
		element4.name="txt_trancd"+rcnt;
		element4.id="txt_trancd"+rcnt;
		element4.value=rcnt;
		//element1.size="13";
		element4.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell4.appendChild(element4);
		
		var cell5 = row.insertCell(4);
		cell5.style.width="40%";
		var element5 = document.createElement("input");
		element5.type = "text";
		element5.style.border="none";
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
		cell6.style.width="10%";
		var element6 = document.createElement("input");
		element6.type = "text";
		element6.style.border="none";
    	element6.style.background="transparent";
		element6.name="txt_reasoncd"+rcnt;
		element6.id="txt_reasoncd"+rcnt;
		element6.value=rcnt;
		//element1.size="13";
		//element6.setAttribute("readonly", "true");
		//element1.disabled=true;
		cell6.appendChild(element6);
		
	
		rcnt=rcnt*1+1;
		//alert("addRows_inwardchqs rcnt:"+rcnt);
		document.getElementById("rcnt").value=rcnt;		
		
		document.getElementById("waiting").style.display='none';
}

//////////////////////////////////////////////////
function setData_ReturnOutwardchqs(rec)
{
	//alert('setData_ReturnOutwardchqs:>>>'+rec);
	//alert(rec.indexOf("SUCCESS"));
	var rcnt=document.getElementById("rcnt").value;
	//alert('in setData_inwardchqs:'+rcnt);
	/*if(rcnt>1)
	{
		resetRows();
	}*/

	if(rec.length>1)
	{
		//alert(rec);
		rec = rec.trim();
		//var totalString=rec.split('!TOT!');
		//alert('totalAmt:>>>'+totalAmt);
		//var data =totalString[0].split("$");//rec.split("$");
		var data=rec.spl-it("$");
		//var totalAmt=totalString[1];
		//alert("data.length:"+data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
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
				addRows_ReturnOutwardchqs('tab_in_chq');
			}
		}
		var totAmt=0;
		//alert(data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			var rcnt=t+1;
			//document.getElementById("txt_chqno"+rcnt).value=bclist[1]+":"+bclist[2];
			document.getElementById("txt_chqno"+rcnt).value=bclist[1];
			totAmt=(totAmt*1)+parseFloat((bclist[3]*1)/100);
			//totAmt=parseFloat((bclist[2]*1)/100);
		}
		//alert('Total Amount:'+totAmt);
		document.getElementById("totalAmount").innerText=totAmt;
		document.getElementById("totalCheques").innerText=t;
	}
	document.getElementById("waiting").style.display='none';
	if(rec.indexOf("SUCCESS")>-1)
	{
			document.getElementById("submitbutton").disabled = true;
	}
	//document.getElementById("sel_chq1").click();
	//enlargeCheque_outwardchqs('img_frnt');

}

function addRows_ReturnOutwardchqs(tableID)
{
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
		element2.onclick=function (){setReturnOutwardCheques(this);};
		cell2.appendChild(element2);

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
//////////////////////////////////////////////////


function setReturnOutwardCheques(val)
{
	var noOfCheques=reserveReturnOutwardVal.split('$');
	var index=val.id.split('sel_chq')[1];
	var cheque_sortcd=document.getElementById("txt_chqno"+index).value;
	 //alert('noOfCheques:>>>'+noOfCheques.length);

	  var url = document.URL;
	  var p = url.lastIndexOf('/');
	  var session_branch_code=document.getElementById("session_branch_code").value;
	  var imgpath='';
	  imgpath = url.substr(0,p+1);
	  var chequeNo='';
	  var dirddd='';
	  var presentingbnkRoutNo='';
		for(i=0;i<noOfCheques.length-1;i++)
		{//1
			 var singleCheque=noOfCheques[i].split('#');
			 if(singleCheque[1]==cheque_sortcd)
			 {//2
				 //alert('singleCheque[2]::>>'+singleCheque[3]);
				 var directory=singleCheque[6];
				 chequeNo=singleCheque[4];
				 presentingbnkRoutNo=singleCheque[5];
				 var folderDate=singleCheque[7];

				 //alert('\nchequeNo:'+chequeNo+'\npresentingbnkRoutNo:'+presentingbnkRoutNo);
				 if(directory.indexOf('CURRENT')>-1)
				 {//search in current directory

					dirddd='From Current';
					imgpath=imgpath +"downloadpath_from_CHI/ClearingInward/Images/";
					//setCurrentDirCheques(chequeNo,presentingbnkRoutNo);

				 }
				 else if(directory.indexOf('ARCHIVE')>-1)
				 {//search in archive directory
 					dirddd='From Archive';
					//imgpath=;
					//setArchiveDirCheques(chequeNo,presentingbnkRoutNo);
					imgpath=imgpath +'Archive/'+folderDate+"/downloadpath_from_CHI/ClearingInward/Images/";
				 }
					 //alert('image path:::>>>'+dirddd+"\n"+imgpath);
				 document.getElementById('img_frnt').src = imgpath+"0000000f_"+chequeNo+"_"+presentingbnkRoutNo+"_G.jpg";
			 }//2
		}//1
}//end setReturnOutwardCheques


/***********************	START Merging	*****************************/
/* Comented by  JJS Start ===================================
function onLoad_merging()
{
	//alert("in onLoad_merging()");
	//var val=document.getElementById("hdMsg1").value;
	var d=document.getElementById("menu_merging");
	d.className = ' active';


	var session_loginid = document.getElementById("session_loginid").value;
	//alert("session_loginid:"+session_loginid);
	if(session_loginid == "null")
	{
		alert("Your Session Has Been Expired. Please Login Again.");
		var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);
	}
	else
	{
		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);

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

*/
/*function cts_Ajax_list_branches(url)
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
					var baseurl=document.URL;
					var p=baseurl.lastIndexOf('/');
					baseurl=baseurl.substr(0,p+1);
					baseurl=baseurl+"login.jsp?flag=1";
					location.replace(baseurl);
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
*/
/*
function show_listof_branches(res)
{
	//alert("show_listof_branches()"+res);
	res = res.trim();

	if(res.length>1)
	{

		var brn = res.split("$");

		if(res.indexOf("NO_DATA") > -1)
		{

		}
		else
		{

			for (i=0 ; i<brn.length-1 ;i++)
			{
				add_rows_merging(res,"tab_merge_stats");
			}
		}

	}
	var dtls = res.split("$");
	//alert("dtls.length:"+dtls.length);
	
	var grandTotalAmount=0;
	var grandTotUpcheq=0;
	var grandTotNonUpcheq=0;
	for(t=0;t<dtls.length-1;t++)
	{
			var bclist=dtls[t].split("#");
			var rcnt=t+1;

			//alert("bclist[0]:"+bclist[0]+"\nbclist[1]:"+bclist[1]+"\nbclist[2]:"+bclist[2]+"\nbclist[3]:"+bclist[3]+"\nbclist[4]:"+bclist[4]);
			//alert("bclist[5]:"+bclist[5]+"\nbclist[4]:"+bclist[4]);
			document.getElementById("txt_brn_cd"+rcnt).value=bclist[0];
			document.getElementById("txt_brn_nm"+rcnt).value=bclist[1];
			document.getElementById("txt_noof_up_chqs"+rcnt).value=bclist[2];
			document.getElementById("txt_tot_amt"+rcnt).value=bclist[3];
         
			grandTotUpcheq=(grandTotUpcheq*1)+(bclist[2]*1);
			grandTotalAmount=(grandTotalAmount*1)+(bclist[3]*1);
			if(bclist[4] > 0)
			{
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

		document.getElementById("gTotTable").style.display='';
		document.getElementById("txtGrandTot").value=grandTotalAmount;
		document.getElementById("txtGrandTotUpCheq").value=" "+grandTotUpcheq;
		document.getElementById("txtGrandTotNonUpCheq").value=" "+grandTotNonUpcheq;
		
		//alert('Grand Total:'+grandTotalAmount);
		//"tab_merge_stats"

		//create a single row for grand total
		var table=document.getElementById('tab_merge_stats');
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		var row = table.insertRow(rowCount);
		//row.colspan=5;
		alert('rowCount'+rowCount);
		var cell1 = row.insertCell(0);
		cell1.colspan=5;
		//cell1.style.width="25%";
		var element1 = document.createElement("input");
		element1.type = "text";
		/////element1.value=rcnt;
		element1.setAttribute("readonly", "true");
		cell1.appendChild(element1);


	document.getElementById("waiting").style.display='none';

}*/
/*
function add_rows_merging(res,tableID)
{
		//alert("in add_rows_merging():"+res);
		//alert("tableID:"+tableID);

		var table=document.getElementById(tableID);
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		//alert(rowCount);

		var row = table.insertRow(rowCount);

		var cell1 = row.insertCell(0);
		cell1.style.width="25%";
		var element1 = document.createElement("input");
		element1.type = "text";
		element1.style.border="none";
    	element1.style.background="transparent";
		element1.name="txt_brn_cd"+rcnt;
		element1.id="txt_brn_cd"+rcnt;
		/////element1.value=rcnt;
		element1.setAttribute("readonly", "true");
		cell1.appendChild(element1);


		var cell2 = row.insertCell(1);
		cell2.style.width="25%";
		var element2 = document.createElement("input");
		element2.type = "text";
		element2.style.border="none";
    	element2.style.background="transparent";
		element2.name="txt_brn_nm"+rcnt;
		element2.id="txt_brn_nm"+rcnt;
		/////element2.value=rcnt;
		element2.setAttribute("readonly", "true");
		cell2.appendChild(element2);

		var cell3 = row.insertCell(2);
		cell3.style.width="25%";
		var element3 = document.createElement("input");
		element3.type = "text";
		element3.style.border="none";
    	element3.style.background="transparent";
		element3.name="txt_noof_up_chqs"+rcnt;
		element3.id="txt_noof_up_chqs"+rcnt;
		/////element3.value=rcnt;
		element3.setAttribute("readonly", "true");
		cell3.appendChild(element3);

		var cell4= row.insertCell(3);
		cell4.style.width="25%";
		var element4 = document.createElement("input");
		element4.type = "text";
		element4.style.border="none";
    	element4.style.background="transparent";
		element4.name="txt_tot_amt"+rcnt;
		element4.id="txt_tot_amt"+rcnt;
		/////element4.value=rcnt;
		element4.setAttribute("readonly", "true");
		cell4.appendChild(element4);


		var cell5= row.insertCell(4);
		cell5.style.width="25%";
		var element5 = document.createElement("input");
		element5.type = "text";
		element5.style.border="none";
    	element5.style.background="transparent";
		element5.name="txt_noof_nonup_chqs"+rcnt;
		element5.id="txt_noof_nonup_chqs"+rcnt;
		/////element5.value=rcnt;
		element5.setAttribute("readonly", "true");
		cell5.appendChild(element5);

		rcnt=rcnt*1+1;

		document.getElementById("rcnt").value=rcnt;
		//alert("after add_rows_merging end");
		document.getElementById("waiting").style.display='none';
}
*/
/*
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
	//alert("flag:"+flag);
	if(nonup_flag > 0)
	{
		document.getElementById("submitbutton").disabled = true;
	}
	else if(nonup_flag == 0 && up_flag ==0)
	{
		document.getElementById("submitbutton").disabled = true;
	}
	else
	{
		document.getElementById("submitbutton").disabled = false;
	}
}comented by JJS End====================================*/

function show_listof_branches1(res)
{
	//alert("show_listof_branches()1"+res);

	var ul = document.getElementById('ul_list');

	if(res.length>1)
	{
		//alert(rec);
		var data =res.split("$");
		//alert("data.length:"+data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("#");
			//alert("bclist[1]"+bclist[1]);
			if(bclist[1]=="NOFILES")
			{
				alert("Branch Folder(s) Not Available.");
				document.getElementById("waiting").style.display='none';
			}
			else
			{
				document.getElementById("waiting").style.display='none';
				var li=document.createElement('li');
				ul.appendChild(li);
				li.innerHTML=li.innerHTML + bclist[0]+" : "+bclist[1];

			}
		}
	}
	document.getElementById("waiting").style.display='none';
}



function after_merge()
{
	//alert("after_merge()");
	document.getElementById("waiting").style.display='';
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		/*var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		commondoonclick();
	}
	else
	{
		var hddoICallMerge=document.getElementById("hddoICallMerge").value;
		//alert(hddoICallMerge);
		if(hddoICallMerge=="Y")
		{
			document.getElementById("formid").action="jsp/merge.jsp";
			document.getElementById("formid").submit();
			document.getElementById("waiting").style.display='none';

		}
		else
		{
			//alert("Clearing Outward File Creation Is Already Done For Today!");
			document.getElementById("formid").action="jsp/merge.jsp";
			document.getElementById("formid").submit();
			document.getElementById("waiting").style.display='none';

		}
	}
}



function on_merge_click()
{
		//alert("in on_merge_click");
		document.getElementById("waiting").style.display='';
		var session_loginid = document.getElementById("session_loginid").value;

		if(session_loginid == "null")
		{

			alert("Your Session Has Been Expired. Please Login Again.");
			/*var baseurl=document.URL;
			var p=baseurl.lastIndexOf('/');
			baseurl=baseurl.substr(0,p+1);
			baseurl=baseurl+"login.jsp?flag=1";
			location.replace(baseurl);*/
			commondoonclick();
		}
		else
		{
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/merge.jsp";
			location.replace(baseurl);
			//cts_AjaxData_merge(baseurl);
		}
}


/*
function cts_AjaxData_merge(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_merge;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_merge;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_merge()
{
		//alert(".....req.status:"+req.status);

 	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;

			alert("res:"+res);


		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
	document.getElementById("waiting").style.display='none';
}
*/
/*function ajaxFormSubmission(form)
{
    xhrThingy = yourFunctionForObtainingXMLHttpRequestInstance();// XHR support is different for various browsers, so you might need to have browser specific code.
    xhrThingy.onreadystatechange = eventHandlerHere;
    xhrThingy.open('POST', 'theFileThatWillHandleYourRequest.php', true);// The used arguments are: HTTP request Method, request url, asynchronous flag
    xhrThingy.setRequestHeader("Content-type", "application/x-www-form-urlencoded");// Simulating Form Submission


    var emailData = form.elements['Text'].value;// Extracting needed data from form
    var postData = "emailAddress=" + emailData;
    xhrThingy.send(postData);
}

function eventHandlerHere()
{
    if (xhrThingy.readyState==4 && xhrThingy.status==200)
    {
        var response = xhrThingy.responseText
        // Do whatever you need to do with the email adress
    }
}*/

/***********************	END Merging	*****************************/


(function () {
    var onload = window.onload;

    window.onload = function () {
        if (typeof onload == "function") {
            onload.apply(this, arguments);
        }

        var fields = [];
        var inputs = document.getElementsByTagName("input");
        var textareas = document.getElementsByTagName("textarea");

        for (var i = 0; i < inputs.length; i++) {
            fields.push(inputs[i]);
        }

        for (var i = 0; i < textareas.length; i++) {
            fields.push(textareas[i]);
        }

        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];

            if (typeof field.onpaste != "function" && !!field.getAttribute("onpaste")) {
                field.onpaste = eval("(function () { " + field.getAttribute("onpaste") + " })");
            }

            if (typeof field.onpaste == "function") {
                var oninput = field.oninput;

                field.oninput = function () {
                    if (typeof oninput == "function") {
                        oninput.apply(this, arguments);
                    }

                    if (typeof this.previousValue == "undefined") {
                        this.previousValue = this.value;
                    }

                    var pasted = (Math.abs(this.previousValue.length - this.value.length) > 1 && this.value != "");

                    if (pasted && !this.onpaste.apply(this, arguments)) {
                        this.value = this.previousValue;
                    }

                    this.previousValue = this.value;
                };

                if (field.addEventListener) {
                    field.addEventListener("input", field.oninput, false);
                } else if (field.attachEvent) {
                    field.attachEvent("oninput", field.oninput);
                }
            }
        }
    }
})();

function showLogin()
{
		//alert(1);
		var cookies = document.cookie.split(";");
		var loginstyle=document.getElementById("loginstyle").value;
		//alert(loginstyle);
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			//alert("cookie:"+cookie);
			var eqPos = cookie.indexOf("=");
			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}

		var url=document.URL;
		//alert(url);
		var p=url.lastIndexOf('/');
		//alert(p);
		baseurl=url.substr(0,p+1);
		//alert(baseurl);
		//baseurl=baseurl+"/login.jsp?flag=1";
		baseurl=baseurl+"jsp/invalidateSession.jsp?msg="+loginstyle;
		//location.replace(baseurl);
		document.getElementById("formid").action="jsp/invalidateSession.jsp";
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();
}
function checkyfunction(){
	document.getElementById("chkno").checked=false;
	document.getElementById("chkyes").checked=true;
}
function checknFunction(){
	document.getElementById("chkno").checked=true;
	document.getElementById("chkyes").checked=false;
}



/***********************START CONFIG  of add rows**********************************/
/*function onLoad_config()
{
		//alert("onLoad_config");

		var d=document.getElementById("menu_admin");
		d.className = ' active';

		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);
		if(val!="N")
		{//1
			alert(val);
			var baseurl=document.URL;
			var p = baseurl.lastIndexOf("?");
			baseurl = baseurl.substr(0,p);
			location.replace(baseurl);

		}//1
		else
		{
			//document.getElementById("chk").vlaue="i";
			var session_loginid = document.getElementById("session_loginid").value;
			if(session_loginid == "null")
			{

				alert("Your Session Has Been Expired. Please Login Again.");
				var baseurl=document.URL;
				var p=baseurl.lastIndexOf('/');
				baseurl=baseurl.substr(0,p+1);
				baseurl=baseurl+"login.jsp?flag=1";
				location.replace(baseurl);
			}
			else
			{
				fetch_configvar();
			}
		}

}

function fetch_configvar()
{
		//alert("in fetch_configvar()");

		var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"jsp/fetch_config.jsp";
		//location.replace(baseurl1);
		cts_AjaxData2(baseurl1);

}

function cts_AjaxData2(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process2;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process2;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}
function cts_process2()
{
    //alert("pms_process1 :"+req.readyState);
  	if(req.readyState == 4)
	{  //alert("req.status :"+req.status);
		if(req.status == 200)
		{
			var res = req.responseText;
			allConfigVar=res;
			//alert("allConfigVar"+allConfigVar);

			setData_config(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
		}
	}
}


function setData_config(loc)
{
	//alert("in setData_config loc"+loc);
	//alert("loc"+loc);

	if(loc.length>1)
	{

		var data =loc.split("$");
		//alert("data.length:"+data.length);
		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("!~!");
			//alert("bclist[1]"+bclist[1]+"\nbclist[2]"+bclist[2]);
			if(bclist[1]=="NO CONFIG")
			{
				alert("No Configuration added yet.\nClick on Add Row to Configuration");
				document.getElementById("Add Row").focus();
			}
			else
			{
				var rcnt=document.getElementById("rcnt").value;
				//alert(rcnt);
				addRows_config('conf_mast');
			}
		}

		for(t=0;t<data.length-1;t++)
		{
			var bclist=data[t].split("!~!");
			//alert("bclist[t]"+bclist[t]);
			if(bclist[1]=="NO CONFIG")
			{
				//alert("in if");
				alert("No Configuration added yet.\nClick on Add Row to Configuration");

				document.getElementById("Add Row").focus();
			}
			else
			{
				//alert("in else");
				flag=0;
				var rcnt=t+1;
				document.getElementById("txt_conf_var"+rcnt).value=bclist[1];
				document.getElementById("hd_conf_var"+rcnt).value=bclist[1];
				if(bclist[2]=='NA')
				{
					document.getElementById("txt_conf_val"+rcnt).value='';
				}
				else
				{
					document.getElementById("txt_conf_val"+rcnt).value=bclist[2];
				}

				//document.getElementById("txt_conf_var"+rcnt).disabled=true;

			}
		}
	}
	else
	{
		//alert(1);
		document.getElemetById("Add Row").focus();
	}
}

function addRows_config(tableID)
{
	{
		var table=document.getElementById(tableID);
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		//alert(rowCount);
		var row = table.insertRow(rowCount);

		var cell1 = row.insertCell(0);
		cell1.style.width="50%";
		var element1 = document.createElement("input");
		element1.type = "text";
		element1.name="txt_conf_var"+rcnt;
		element1.id="txt_conf_var"+rcnt;
		element1.style.width="100%";
		element1.style.height="100%";
		cell1.appendChild(element1);
		element1.focus();

		var cell2 = row.insertCell(1);
		cell2.style.width="50%";
		var element2 = document.createElement("input");
		element2.type = "text";
		element2.name="txt_conf_val"+rcnt;
		element2.id="txt_conf_val"+rcnt;
		element2.style.width="100%";
		element2.style.height="100%";
		cell2.appendChild(element2);


		var element3 = document.createElement("input");
		element3.type = "hidden";
		element3.name="hd_conf_var"+rcnt;
		element3.id="hd_conf_var"+rcnt;
		element3.value="NEWCONFVALUE";
		cell2.appendChild(element3);

		rcnt=rcnt*1+1;
		document.getElementById("rcnt").value=rcnt;
	}
	var rcnt=document.getElementById("rcnt").value-1;

	flag=1;
	//setData_config(allConfigVar);
}

function onSave_config()
{
	//alert("1");
	var hdval=document.getElementById("hd_conf_var"+rcnt);
	//alert("hdval"+hdval);
	var rcnt=document.getElementById("rcnt").value-1;
	//alert("row count :"+rcnt);
	if(rcnt==0)
	{
		alert("There are no configuration details added yet!");
	}
	else
	{
		var cnt=document.getElementById("rcnt").value;
		//alert("row count :"+cnt);

		for(i=1;i<cnt;i++)
		{
			var retval=validateConfVar(i);
			if(!retval)
			{
				alert("Please Enter Configuration Variable");
				document.getElementById("txt_conf_var"+i).focus();
				cnt=-1;
				break;
			}
		}

		for(i=1;i<cnt;i++)
		{
			var retval=validateConfVal(i);
			if(!retval)
			{
				alert("Please Enter Configuration Value");
				document.getElementById("txt_conf_val"+i).focus();
				cnt=-1;
				break;
			}
		}



			if(cnt!=-1)
			{
				//var delcnt=document.getElementById("delcnt").value;

					//var r=confirm("Do you really want to Save And Delete marked selected designaiton?\nOnce done can not be changed!");
					var r=confirm("Do you really want to Save?");
					if(r==true)
					{
						var session_loginid = document.getElementById("session_loginid").value;
						if(session_loginid == "null")
						{

							alert("Your Session Has Been Expired. Please Login Again.");
							var baseurl=document.URL;
							var p=baseurl.lastIndexOf('/');
							baseurl=baseurl.substr(0,p+1);
							baseurl=baseurl+"login.jsp?flag=1";
							location.replace(baseurl);
						}
						else
						{
							afterSave_config();
						}
					}

			}


	}
}

function afterSave_config()
{
	//alert("in afterSave_config()");
	var cnt=document.getElementById("rcnt").value;
	//alert("row count :"+cnt);

	document.getElementById("formid").action="jsp/save_configuration.jsp";
	document.getElementById("formid").submit();
}


function validateConfVar(i)
{
		var val=document.getElementById("txt_conf_var"+i).value;
		//alert("val :"+val);
		if(val!="")
		{
			return true;
		}
		else
		{
			return false;
		}
}

function validateConfVal(i)
{
		var val=document.getElementById("txt_conf_val"+i).value;
		//alert("val :"+val);
		if(val!="")
		{
			return true;
		}
		else
		{
			return false;
		}
}

*/
/***********************END CONFIG of add rows**********************************/