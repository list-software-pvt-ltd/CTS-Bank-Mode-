var session_branch_code;
var session_main_br_yn;
var myGrid;
function onLoad_cheque_search()
{
	var session_loginid = document.getElementById("session_loginid").value;
	 session_branch_code = document.getElementById("session_branch_code").value;
	 session_main_br_yn = document.getElementById("session_main_br_yn").value;	
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");		
		menuOnClick("login.jsp");
	}
	else
	{
		if($('#retMsg').val()!='null' && $('#retMsg').val()!=null && $('#retMsg').val().length>0)
		{
			var temp = $('#retMsg').val();
			if(temp=='SUCCESS')
			{
				alert("Paper To Follow Updated Successfully");				
			}
			else
			{
				alert("Error For Updating flag of Paper To Follow");
			}
			location.replace("paperToFollow.jsp","_self","","");
		}
		else
		{
		    $("#whattodo").val("PAPERTOFOLLOW_ENTRY");
			var params = ['whattodo','BRNCHCD'];
			var dataTypes = ['String','String'];
			var values = [ 'PAPERTOFOLLOW_ENTRY',session_branch_code];
			var paraStr = getParameterString(params, values);
			callAjax("PPSController"+ paraStr);
		}
	}
}
function onClickOfReset()
{
	location.replace("paperToFollow.jsp","_self","","");
}
function onClickOfPrint()
{
	myGrid.detachHeader(1);
	myGrid.printView();
}
function onClickForUpdate()
{
	var count=0;
	var dataArr = [];
	myGrid.forEachRow(function(id) 
	{		
		var chkFlg =myGrid.cells(id,0).getValue();
		if(chkFlg==1)
		{
			dataArr.push({
				CLODATE : myGrid.cells(id, 2).getValue(),		
				SERIALNO : myGrid.cells(id, 3).getValue(),
				ACCOUNTNO : myGrid.cells(id, 4).getValue(),
				BRANCHCD : myGrid.cells(id, 7).getValue()		
			});
			count++;		
			}				
		});
		//alert(count+"=count");
		if(count==0){
			alert("Please select at list one record for paper to follow updation.");
		}
		else
		{
			document.getElementById("jsonString").value = JSON.stringify(dataArr);
			$("#whattodo").val("UPDATE_PF");
			document.getElementById("formid").action="PPSController";
			document.getElementById("formid").method="post";
			document.getElementById("formid").submit();
		}
}
function loadGrid(dataVal)
{
	var data =JSON.stringify(dataVal.RETVAL);	
	myGrid = new dhtmlXGridObject('mygird_data');
	myGrid.setImagePath("codebase/imgs/");
	myGrid.setHeader("Select," +
			"Sr No,Date,Cheque No,Account No,Amount(In RS),Account Name,Branch code,Image Name",null,["text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center","text-align:center","text-align:center","text-align:center"]);
		myGrid.setColumnIds("Select,rownum,DDMMYYYY,SERIALNO,ACCOUNTNO,AMOUNT,PAYEENAME,BRANCHCD,IMGNAME");
		myGrid.setInitWidths("60,70,0,100,140,110,220,0,0");
		myGrid.setColAlign("center,center,right,right,right,right,left,right,left");
		myGrid.attachHeader(",#numeric_filter,#text_filter,#numeric_filter,#numeric_filter,#numeric_filter,#text_filter,#numeric_filter,#text_filter");
		myGrid.setColTypes("ch,ro,ro,ro,ro,ro,ro,ro,ro");
		myGrid.init();
		myGrid.parse(data, "js");
}
function success_ajax(response)
{
	 if($("#whattodo").val()=='PAPERTOFOLLOW_ENTRY')
	{
		if (response.RESPCODE == 0) 
		{
			var flg=response.RETVAL;
			if(flg=='Y')
			{
				$("#whattodo").val("PAPERTOFOLLOW");
				var params = ['whattodo','BRNCHCD'];
				var dataTypes = ['String','String'];
				var values = [ 'PAPERTOFOLLOW',session_branch_code];
				var paraStr = getParameterString(params, values);
				callAjax("PPSController"+ paraStr);
			}
			else
			{
				alert("Login User Branch have No Authority for paper to follow program");
				location.replace("main.jsp","_self","","");
			}
		}
		else if (response.RESPCODE == 1) 
		{
			alert("Login user have no Authority for paper to follow program");
			location.replace("main.jsp","_self","","");
		}
		else if (response.RESPCODE == 2) 
		{
			alert("Error in Fetching Records");
				location.replace("main.jsp","_self","","");
		}
	}
	else if($("#whattodo").val()=='PAPERTOFOLLOW')
	{
		if (response.RESPCODE == 0) 
		{
			loadGrid(response);
		}
		else if (response.RESPCODE == 1) 
		{
			alert("No Record Found");
				location.replace("main.jsp","_self","","");
		}
		else if (response.RESPCODE == 2) 
		{
			alert("Error in Fetching Records");
			location.replace("main.jsp","_self","","");
		}
	}	
}
function error_ajax(e)
{
	if ($("#whatToDo").val()=="PAPERTOFOLLOW")	
	{
		alert("Error in Fetching Records" );
	}	
}