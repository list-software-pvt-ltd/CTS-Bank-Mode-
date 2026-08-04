
var myGrid;
var mobilenumber;
var flag=false;
function onLoad_intimationreq()
{
	//document.getElementById("topnav").style.display='none';
	document.getElementById("userid").style.display='none';
	document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
	
	$(document).keydown(function (event) {
	    if (event.keyCode == 123) { // Prevent F12
	        return false;
	    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
	        return false;
	    }
	});
	
	document.getElementById("submitbutton").disabled = true;
	document.getElementById("btnAddRow").disabled = true;
	document.getElementById("btnDeleteRow").disabled = true;
	
	loadIntimateGrid("");
	
	  $("#btnDeleteRow").unbind('click').bind('click',function(e) {
		 var newId = myGrid.getSelectedId();
		 var rownum = myGrid.getRowsNum();
		 //alert(newId);
		 if(rownum==0)
		 {
			 alert("Please Add Row First.");
		 }
		 else if(newId!=null)
		 {
			 myGrid.deleteSelectedItem();
		 }
		 else {
			 alert("Please Select Row First.");
		 }
		});
		
		$("#btnAddRow").unbind('click').bind('click',function(e) {
			var newId = myGrid.getRowsNum();
			newId++;
			myGrid.addRow(newId, " ");
			myGrid.cells(newId, 0).setValue(newId);
			myGrid.setRowTextStyle(newId,"border-color:#a4bed4;");
			//myGrid.cells(newId, 4).setValue('ddmmyyyy');
		});
		
		$(function() {  
	        $("input[name='mobileno']").on('input', function(e) { 
	            $(this).val($(this).val().replace(/[^0-9]/g, '')); 
	        });  
	         
	        $("input[name='brncd']").on('input', function(e) { 
	            $(this).val($(this).val().replace(/[^0-9]/g, '')); 
	        });  
	        
	        $("input[name='schemecd']").on('input', function(e) { 
	            $(this).val($(this).val().replace(/[^0-9]/g, '')); 
	        });  
	        
	        $("input[name='accountno']").on('input', function(e) { 
	            $(this).val($(this).val().replace(/[^0-9]/g, '')); 
	        });  
       }); 
      
}

function loadIntimateGrid(loadissundata) // loadIntimateGrid
{
//var data =JSON.stringify(loadissundata.RETVAL);
	myGrid = new dhtmlXGridObject('accdetailsgrid');
	myGrid.setImagePath("codebase/imgs/");
		myGrid.setHeader("Sr. No.,Instrument No *,Amount (In Rs) *,Payee Name *,Instrument Date *,Response Status");
		myGrid.setColumnIds("rownum,PIL_CHQNO,PIL_AMOUNT,PIL_PAYEENAME,PIL_INSTRUMENT_DT,STATUS");
		myGrid.setInitWidths("50,100,105,195,110,400");
		myGrid.setColAlign("right,right,right,left,left,left");
		myGrid.setColTypes("ro,ed,ed,ed,dhxCalendar,ro");
		myGrid.attachEvent("onEditCell", doOnCellEdit);
		myGrid.attachEvent("onRowSelect", function(rId, cInd) 
		{
	      if(cInd==2)
	      {
	      	if(myGrid.cells(rId, 1).getValue().length==0)
			{
			 alert("Instrument Number Should Be 6 Digits");
			}
			else if(/[^0-9]/g.test(myGrid.cells(rId, 1).getValue()))
			 {
			  alert("Enter Numeric Instrument No");
			 }
			 else{
			 myGrid.cells(rId, 1).setValue(padDigits(myGrid.cells(rId, 1).getValue(), 6));	 
			  chkDuplicateChq(myGrid.cells(rId, 1).getValue(),rowId);	
		     }	
	      }
	      else if(cInd==3){
	     	 if(myGrid.cells(rId, 2).getValue().length==0)
			{
			 alert("Enter Amount");
			}
			else if(/[^0-9.]/g.test(myGrid.cells(rId, 2).getValue()))
			 {
			  alert("Enter Valid Amount000");
			 }
		
	      }
 else if(cInd==3){
			 if(specialcharecter(myGrid.cells(id, 3).getValue()) == true)
				 {
				   alert ("Please Remove Special Characters From Payee Name");
				   myGrid.cells(rId,3).setValue("");
				}
		}
		});
		myGrid.init();
		myGrid.parse(loadissundata, "js");
		
		myGrid.forEachRow(function(id)
		{
			myGrid.setRowTextStyle(id,"border-color:#a4bed4;");			 
		});
}
var saveflag=false;
function doOnCellEdit(stage, rowId, cellInd) {
	if(stage==0 && cellInd == 1)
	{
		saveflag=false;
	}
	else if (stage == 2) {
		if (cellInd == 1) {
			if(myGrid.cells(rowId, 1).getValue().length==0)
			{
			 alert("Instrument Number Should Be 6 Digits");
			}
			else if(/[^0-9]/g.test(myGrid.cells(rowId, 1).getValue()))
			 {
			  alert("Enter Numeric Instrument No");
			  myGrid.cells(rowId, 1).setValue("");
			 }
			 else{
				myGrid.cells(rowId, 1).setValue(padDigits(myGrid.cells(rowId, 1).getValue(), 6));	 
				chkDuplicateChq(myGrid.cells(rowId, 1).getValue(),rowId);	
			 }		 
		 }
		 else if(cellInd==2){
	     	 if(myGrid.cells(rowId, 2).getValue().length==0)
			{
			 alert("Enter Amount");
			}
			else if(/[^0-9.]/g.test(myGrid.cells(rowId, 2).getValue()))
			 {
			  alert("Enter Valid Amount");
			  myGrid.cells(rowId, 2).setValue("");
			 }
	      }

 		else if(cellInd==3){
			 if(specialcharecter(myGrid.cells(rowId, 3).getValue()) == true)
				 {
				   alert ("Please Remove Special Characters From Payee Name");
				   myGrid.cells(rowId,3).setValue("");
				}
		}
	}
	
return true;
}

function chkDuplicateChq(cheqNo,rowId) 
{
	var chqFound=false;
	saveflag=true;
  //alert("onaddrow=="+rowId)
	if(myGrid==undefined || myGrid.getRowsNum()==0)
		loadIntimateGrid("");
	
	myGrid.forEachRow(function(id) 
	{
		if(rowId!=id)
		{	
			if(cheqNo==myGrid.cells(id, 1).getValue().trim() && myGrid.getRowsNum()>1)
			{
				chqFound=true;
				myGrid.cells(rowId, 1).setValue("");
			}
		}
	});
	
	if(chqFound)
	{
		
	    alert('Duplicate Instrument Number Found')
	}
	/*else{
		var newId = myGrid.getRowsNum();
		newId++;
		myGrid.addRow(newId, " ");
		myGrid.cells(newId, 0).setValue(newId);
		myGrid.setRowTextStyle(newId,"border-color:#a4bed4;");
	}*/
}
function onClickOfreset()
{
	location.replace('intimation_request_new.jsp');
}
function onClickOfSubmit()
{
	var mobileno=document.getElementById("mobileno").value;
	if(isEmpty(mobileno))
	{
		alert('Enter Mobile Number');
		document.getElementById("mobileno").focus();
	}
	else if(mobileno!=mobilenumber)
	{
		alert('Entered Mobile No Mismatched with Registered Mobile No');
		document.getElementById("mobileno").focus();
	}
	else{
		var count = 0;
		var dataArr = [];
		var jsonString;
		var cbsacco=$("#cbsaccno").val();	
		var custid=$("#custid").val();
		var trancd=$("#trancd").val();
		var mobileno=$("#mobileno").val();
		
		myGrid.forEachRow(function(id) {
		   if (myGrid.cells(id, 1).getValue().length == 6)
		   {
			if (myGrid.cells(id,1).getValue().length!=0 && myGrid.cells(id,2).getValue().length!=0 &&
			    myGrid.cells(id,3).getValue().length!=0 && myGrid.cells(id,4).getValue().length!=0) {	
				
				 if(/[^0-9]/g.test(myGrid.cells(id, 1).getValue()))
				 {
				  alert("Enter Numeric Instrument No");
				  myGrid.cells(id, 1).setValue("");
				  //myGrid.selectCell(id,1);
				 }
				 else if(/[^0-9.]/g.test(myGrid.cells(id, 2).getValue()))
				 {
				  alert("Enter Valid Amount-----------");
				  myGrid.cells(id, 2).setValue("");
				 }
				 else if(specialcharecter(myGrid.cells(id, 3).getValue()) == true)
				 {
				   alert ("Please Remove Special Characters From Payee Name");
				   myGrid.cells(id,3).setValue("");
				}
				 else {
					 dataArr.push({
							PIL_CHQNO : myGrid.cells(id, 1).getValue(),
							PIL_AMOUNT : myGrid.cells(id, 2).getValue(),
							PIL_PAYEENAME : myGrid.cells(id, 3).getValue(),
							PIL_INSTRUMENT_DT : myGrid.cells(id, 4).getValue(),
							PIL_ACCNO : cbsacco,
							PIL_CUSTID : custid,
							PIL_TRAN_CD : trancd,
							PIL_MOBNO : mobileno
						});
						count++;
						//document.getElementById("waiting").style.display = ' ';
						jsonString = JSON.stringify(dataArr);
				 }			
			} 
			else{
			   alert("Please Enter All Fields");
			}
		 }
		 else {
			alert("Instrument Number Should Be 6 Digits");
		 }	 
		});
		if(count==myGrid.getRowsNum() && saveflag==true)
		 {
		        $("#whattodo").val("BULKINTIMATIONS");	
					
				var paraName = ['whattodo','jsonString'];
				var dataTypes = ['String','String'];
				var paraValue = ['BULKINTIMATIONS',jsonString];
				var paraStr = getParameterString(paraName,paraValue);
				callAjax("PPSController"+encodeURI(paraStr));
		 }
	}
}
function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function onClickOffetchAccDetails()
{
	var brncd=document.getElementById("brncd").value;
	var schemecd=document.getElementById("schemecd").value;
	var accountno=document.getElementById("accountno").value;
	
		if(isEmpty(brncd))
		{
			alert('Enter Branch Code');
			document.getElementById("brncd").focus();
		}
		else if(isEmpty(schemecd))
		{
			alert('Enter Scheme Code');
			document.getElementById("schemecd").focus();
		}
		else if(isEmpty(accountno))
		{
			alert('Enter Account Number');
			document.getElementById("accountno").focus();
		}
		else{
			$("#whattodo").val("FETCHACCOUNTDETAILS");	
			var paraName = ['whattodo','BRANCHCODE','SCHEMECODE','ACCOUNTNO'];
			var dataTypes = ['String','String','String','String'];
			var paraValue = ['FETCHACCOUNTDETAILS',brncd,schemecd,accountno];
			var paraStr = getParameterString(paraName,paraValue);
			callAjax("PPSController"+paraStr);
		}	
		
}

function isEmpty(value)
{
	if(value=="")
		return true;
	else
		return false;
}

function success_ajax(response)
{
	if($("#whattodo").val() == "FETCHACCOUNTDETAILS")
	{
		if(response.RESPCODE=='0')
		{
			$("#cbsaccno").val(response.RETVAL.split("~")[1])	
			$("#custid").val(response.RETVAL.split("~")[2])
			$("#custname").val(response.RETVAL.split("~")[3])
			$("#trancd").val(response.RETVAL.split("~")[4])
			mobilenumber=response.RETVAL.split("~")[5]
			$('#custname').attr('title', response.RETVAL.split("~")[3]);
			document.getElementById("submitbutton").disabled = false;
			document.getElementById("btnAddRow").disabled = false;
			document.getElementById("btnDeleteRow").disabled = false;
			document.getElementById("btnaccdet").disabled = true;
			document.getElementById("brncd").disabled = true;
			document.getElementById("schemecd").disabled = true;
			document.getElementById("accountno").disabled = true;
			
		}
		else if(response.RESPCODE=='1')
		{
		 alert('Account Details Not Found');
		}
		else
		{
		 alert('Problem To Fetch Account Details');
		}
	}
	else if($("#whattodo").val() == "BULKINTIMATIONS")
	{
		$.each(response.RETVAL, function(key, value)							
			{						
				myGrid.forEachRow(function(id) {	
				// myGrid.cells(id,5).setValue(value.STATUS);
				if(myGrid.cells(id,1).getValue()==value.CHEQUE)
				{
					if (value.STATUS == 0) 
					{
					  myGrid.cells(id,5).setValue("Intimation Request Registered Successfully");
					}
					else if (value.STATUS == 1) 
					{
						myGrid.cells(id,5).setValue("Mobile No Not matched With RMN");			
					}
					else if (value.STATUS == 2) 
					{
						myGrid.cells(id,5).setValue("Cheque No Does Not Belong To Account");			
					}
					else if (value.STATUS == 3) 
					{
						myGrid.cells(id,5).setValue("Intimation Already Received But Details Not Matching");			
					}
					else if (value.STATUS == 4) 
					{
						myGrid.cells(id,5).setValue("Intimation Already Received (Duplicate)");			
					}
					else if (value.STATUS == 5) 
					{
						myGrid.cells(id,5).setValue("Cheque Is Already Honoured.");			
					}
					else if (value.STATUS == 6) 
					{
						myGrid.cells(id,5).setValue("Cheque is Surrendered");			
					}
					else if (value.STATUS == 7) 
					{
						myGrid.cells(id,5).setValue("Account No does not belong to Customer");			
					}
					else if (value.STATUS == 8) 
					{
						myGrid.cells(id,5).setValue("Cheque Payment Stopped");			
					}
					else if (value.STATUS == -9) 
					{
						myGrid.cells(id,5).setValue("Your Request Could Not Register");
					} 
					else{
					  myGrid.cells(id,5).setValue("Your Request Could Not Register");
					}
				}		
				});					
			});	
			document.getElementById("submitbutton").disabled = true;
			document.getElementById("btnAddRow").disabled = true;
			document.getElementById("btnDeleteRow").disabled = true;
	}
}
function error_ajax(e)
{
	alert("Error While Saving Intimation" );
}
 

function specialcharecter(data)
 {
		//alert("data="+data);
                var iChars = "!`@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";   
				
                //var data = document.getElementById("txtCallSign").value;
				//alert("data.length="+data.length);
                for (var i = 0; i < data.length; i++)

                {      

                    if (iChars.indexOf(data.charAt(i)) != -1)

                    {    
						flag=true;
                    //alert ("Your string has special characters. \nThese are not allowed.");
					return flag; 

                    } 

                }

            }