// JavaScript Document
var jsonstring;
//var res;
var paraName=[];
var paraDatatype=[];
var paraValue=[];
var dataArr = [];
	var flag=false;
	var count=0;
var myGrid1;

$(document).ready(function() 
{
	
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{
		alert("Your Session Has Been Expired. Please Login Again.");
		menuOnClick("login.jsp");
	}
	else
	{
		var d=document.getElementById("menu_ppsinterface");
		d.className = ' active';
		
		if($("#retMsg").val().length!=0 && $("#retMsg").val()!='null')
		{
			var response=$("#retMsg").val();			
				 if(response=="SUCCESS")
				{
					alert('Response File Records Updated Successfully');
						$("#whattodo").val("PEN_READFILE");
						var params = [ 'whattodo'];
						var dataTypes = [ 'String' ];
						var values = [ 'PEN_READFILE'];
						var paraStr = getParameterString(params, values);
						callAjax("PPSController"+ paraStr);
				}
				else if(response=="FAILED")
				{
					alert('Problem To Update Records Of Response File ');
				}
				else
				{
					alert('Response File Loading Problem');
				}			
		}		
		else
		{
			$("#whattodo").val("PEN_READFILE");
				var params = [ 'whattodo'];
				var dataTypes = [ 'String' ];
				var values = [ 'PEN_READFILE'];
				var paraStr = getParameterString(params, values);
				callAjax("PPSController"+ paraStr);
		}
	}	
});
function validateForm()
{	/*
	myGrid1.forEachRow(function(id)
	{	
		 if(isBlank(myGrid1.cells(id,6).getValue()))
		{				
				flag=false;	
				count=1;
				return false;
		}	
		else //(myGrid1.cells(id,6).getValue().length>0 && myGrid1.cells(id,6).getValue()!='-1')
		{			
						dataArr.push({									
								ACCNO:myGrid1.cells(id,0).getValue(),
								INSTRU:myGrid1.cells(id,1).getValue(),
								AMOUNT: myGrid1.cells(id,2).getValue(),
								PAYNAME:myGrid1.cells(id,3).getValue(),
								REASON:myGrid1.cells(id,6).getValue()													
							});
							count++;						
			}						
	});*/
	//alert("before "+flag);
	if(flag==false)
	{
		myGrid1.forEachRow(function(id) {		
		 	if(isBlank(myGrid1.cells(id,6).getValue()) || myGrid1.cells(id,6).getValue()=='-1')
			{				
					flag=false;	
			}	
			else 
			{
				flag=true;
			}
		});	
	}
	//alert("after "+flag);
	return flag;
}
	
function updateRecords()
{	
	//alert(validateForm()+"==validateForm()=="+flag);
	if(validateForm())//validateForm()
	{		
				flag=true;	
				myGrid1.forEachRow(function(id)
				{
					if((myGrid1.cells(id,6).getValue().length>0 && myGrid1.cells(id,6).getValue()!='-1')){
					dataArr.push({									
								ACCNO:myGrid1.cells(id,0).getValue(),
								INSTRU:myGrid1.cells(id,1).getValue(),
								AMOUNT: myGrid1.cells(id,2).getValue(),
								PAYNAME:myGrid1.cells(id,3).getValue(),
								REASON:myGrid1.cells(id,6).getValue()													
							});	count++;
						}		
					});			
					//alert(dataArr);		
					document.getElementById("jsonString").value=JSON.stringify(dataArr);
					document.getElementById("formid").action="jsp/ppsUpdateResponseData.jsp";
					document.getElementById("waiting").style.display='none';
					document.getElementById("formid").submit();
			
		
		}
		else
		{
					alert("Select At Least  one Record!"); 
					flag=true;
		}

}
function pending_loadGrid(response)
{
	myGrid1 = new dhtmlXGridObject('pending_grid');
	myGrid1.setImagePath("codebase/imgs/");
	myGrid1.setHeader("Account No,Instrument No,Amount (In Rs),Payee Name,Instrument Date,Request Received Date Time, Reason",null,[,"text-align:left;","text-align:left;","text-align:left;","text-align:left","text-align:left","text-align:left","text-align:left"]);
	myGrid1.setColumnIds("PIL_ACCNO,PIL_CHQNO,PIL_AMOUNT,PIL_PAYEENAME,PIL_INSTRUMENT_DT,PIL_ENTRYDATE,STATUS");
	myGrid1.setInitWidths("120,100,100,200,100,150,350");
	myGrid1.setColAlign("right,right,left,left,left,left,left");
	myGrid1.setColTypes("ro,ro,ro,ro,ro,ro,coro");
	myGrid1.init();
	var coro = myGrid1.getCombo(6);
	coro.put("-1","-select-");
	add_item("myselect", "00", '--Select Reason Code--');
	for(i=0;i<response.RET_REASON.length;i++)
	{	
		coro.put(response.RET_REASON[i].retcode,response.RET_REASON[i].retdesc);
		add_item("myselect", response.RET_REASON[i].retcode, response.RET_REASON[i].retdesc);
	
	}
// document.getElementById("myselect").selectedIndex = "00";
	myGrid1.parse(response.RETVAL,"js");
}
function success_ajax(response)
{
	 if($("#whattodo").val() == "PEN_READFILE")
	{
		if(response.RESPCODE=='0')
		{			
			pending_loadGrid(response);
			document.getElementById("ppstitle").disabled = false;
			document.getElementById("submitbutton").disabled = false;
		}
		else if(response.RESPCODE=='1')
		{
			alert('No Any Records For Response File');//Invalid response file. 
		}
		else
		{
			alert("Problem To Read Response File");
		}
	}
}
function error_ajax(response) 
{
	alert('Error Occured in Calling:  '+response);
}