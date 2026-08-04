
var actFlg=1;
var rowCount = 1; 
var sumamnt=0;
$(document).ready(function() 
{
	if($('#onloadMsg').val()!='null' && $('#onloadMsg').val()!=null && $('#onloadMsg').val().length>0)
	{
		if($('#onloadMsg').val()=='SUCCESS')
		{
		alert(" Record deleted and Updated Successfully!");
		}
		else
		{
		alert("Error in Delete and Updated Record!");
		}
		//location.replace("deletereturnoutwardfrdate.jsp");
		document.getElementById("formid").action="deletereturnoutwardfrdate.jsp";
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();

	}
	else
	{
		/*var date = new Date(); 
		date.setDate(date.getDate());  
		datepick=date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
		$('#datepicker').val(datepick);*/
		document.getElementById("datepicker").disabled=true;
	 
		var fromDate = $('#datepicker');
		fromDate.datepicker({dateFormat: 'dd-mm-yy'});	
		var urlbase=document.URL;
		var p=urlbase.lastIndexOf('/');
		urlbase=urlbase.substr(0,p+1);
		//alert('baseurl:>>'+urlbase);
		//urlbase=urlbase+"jsp/fetch_imageName.jsp?chqDtl="+readBackgroundVal;
		onLoad_report_clearing_inward();
		// alert(1);
		$("#btnfetchfiles").click(function()
		{
		 //alert("Alert1");
		 if(validateForm())
		  {
			var newValue = $('#datepicker').val();
			var branch_code=document.getElementById("opt_branch_code").value;
			actFlg=0;
			$.ajax(
			{
				url:urlbase+"jsp/deleteReturnoutward.jsp?clearingtype="+$('#clearingtype').val()+"&frdate="+newValue.replace('-', '').replace('-', '')+"&whattodo=FF&branch_code="+branch_code,                
				
				dataType: "json",
				success: function(response)
				{   // alert(response);
					success_ajax(response); 
				},
				error: function(e) 
				{
					alert("Error in Calling Report!");
				}
			});
		}
	});
	/*$("#showbutton").click(function()
	{	
		$("#tbdel").css("display", '');
		var filename=($('#filename').val());
		if (filename==0)
	    { 
	    	alert("Please Select Filename !");
	    }
		else if(validateForm())
		{
			var newValue = $('#datepicker').val();
			var branch_code=document.getElementById("opt_branch_code").value;
			actFlg=2;
		    $.ajax(
		    {
				 
		    	url:urlbase+"jsp/deleteReturnoutward.jsp?clearingtype="+$('#clearingtype').val()+"&frdate="+newValue.replace('-', '').replace('-', '')+"&whattodo=S&branch_code="+branch_code+"&xmlfilename="+$('#filename').val(),
				dataType: "json",
		    	success: function(response)
		    	{   // alert(response);
		    		success_ajax(response); 
		    	},
		    	error: function(e) 
		    	{
		    		alert("Error in Calling Report!");
		    	}
		    });
		}
	});*/
	$("#filename").change(function()
	{	
		$("#tbdel").css("display", '');
		var filename=($('#filename').val());
		if (filename==0)
	    { 
	    	alert("Please Select Filename !");
	    	document.getElementById("tab_co_cbs_data").innerHTML="";
	    	$('#totalamnt').val('');
	    	
	    	document.getElementById("deletebutton").disabled=true;
			document.getElementById("updatebutton").disabled=true;
	    }
		else if(validateForm())
		{
			var newValue = $('#datepicker').val();
			var branch_code=document.getElementById("opt_branch_code").value;
			actFlg=2;
		    $.ajax(
		    {
				 
		    	url:urlbase+"jsp/deleteReturnoutward.jsp?clearingtype="+$('#clearingtype').val()+"&frdate="+newValue.replace('-', '').replace('-', '')+"&whattodo=S&branch_code="+branch_code+"&xmlfilename="+$('#filename').val(),
				dataType: "json",
		    	success: function(response)
		    	{   // alert(response);
		    		success_ajax(response); 
		    	},
		    	error: function(e) 
		    	{
		    		alert("Error in Calling Report!");
		    	}
		    });
		}
	});
	 
	 
	$("#deletebutton").click(function()
	{	
	
		var r = confirm("Do You Want To Delete?");
		if (r == true)  
		{
			if(validateForm())
			{
				var newValue = $('#datepicker').val();
				var branch_code=document.getElementById("opt_branch_code").value;
				actFlg=1;
				var table = document.getElementById("tab_co_cbs_data");
				var rowCount = table.rows.length;
				var sel_cnt =0;
				//JSONArray arr=new JSONArray();
				var dataArr = [];
				for(var i=1; i<rowCount; i++)
				{
					var row = table.rows[i];
					//JSONObject jobj=new JSONObject();
					var chkbox = row.cells[0].childNodes[0];
					if(true == chkbox.checked)
					{
						sel_cnt++;
						var amt_val = ""+((row.cells[6].innerHTML)*100);
						var chq_no= row.cells[2].innerHTML;
						var sort_code = row.cells[4].innerHTML;
						var tran_code= row.cells[5].innerHTML;
						dataArr.push({
							Amount: amt_val,
							ChequeNo:chq_no,
							SortCode: sort_code,
							TranCode: tran_code
						});

					}
				}
				if(sel_cnt>0)
				{	
					var jsonString = JSON.stringify(dataArr);
					$('#VALS').val(jsonString);
					$('#whattodo').val('D');
					document.getElementById("datepicker").disabled=false;
					document.getElementById("formid").action="jsp/deleteReturnoutwardsub.jsp";
					document.getElementById("formid").method="post";
					document.getElementById("formid").submit();
					/*$.ajax(
					{
						url:urlbase+"jsp/deleteReturnoutward.jsp?clearingtype="+$('#clearingtype').val()+"&frdate="+newValue.replace('-', '').replace('-', '')+"&whattodo=D&branch_code="+branch_code,  
						dataType: "json",
						success: function(response)
						{   
							success_ajax(response); 
						},
						error: function(e) 
						{
							alert("Error in Calling Report!");
						}
					});*/
				}
				else
				{
					alert("Please select cheque to delete!");
				}
			}
		}
	});
	
	$("#updatebutton").click(function()
	{	
	
		var r = confirm("Do You Want To Update?");
		if (r == true)  
		{
			if(validateForm())
			{
				var newValue = $('#datepicker').val();
				var branch_code=document.getElementById("opt_branch_code").value;
				actFlg=3;
				var table = document.getElementById("tab_co_cbs_data");
				var rowCount = table.rows.length;
				var sel_cnt =0;
				var dataArr = [];
				for(var i=1; i<rowCount; i++)
				{

						var row = table.rows[i];

						var chkbox = row.cells[0].childNodes[0];
						if(true == chkbox.checked)
						{
							
							sel_cnt++;
							var amt_val = ""+((row.cells[6].innerHTML)*100);
							var chq_no= row.cells[2].innerHTML;
							var sort_code = row.cells[4].innerHTML;
							var tran_code= row.cells[5].innerHTML;
							dataArr.push({
								Amount: amt_val,
								ChequeNo:chq_no,
								SortCode: sort_code,
								TranCode: tran_code
							});

						}

					}
				if(sel_cnt>0)
				{
					var jsonString = JSON.stringify(dataArr);
					$('#VALS').val(jsonString);
					$('#whattodo').val('U');
					document.getElementById("datepicker").disabled=false;
					document.getElementById("formid").action="jsp/deleteReturnoutwardsub.jsp";
					document.getElementById("formid").method="post";
					document.getElementById("formid").submit();
				/*	$.ajax(
					{
						url:urlbase+"jsp/deleteReturnoutward.jsp?clearingtype="+$('#clearingtype').val()+"&frdate="+newValue.replace('-', '').replace('-', '')+"&whattodo=U&branch_code="+branch_code+"&xmlfilename="+$('#filename').val(),  
						dataType: "json",
						success: function(response)
						{   
							success_ajax(response); 
						},
						error: function(e) 
						{
							alert("Error in Calling Report!");
						}
					});*/
				}	
				else
				{
					alert("Please select cheque to delete!");
				}	
			}
		}
	});
	 
	 
} 
	 
	 
	 });



function success_ajax(response)
{
	//alert("json"+JSON.stringify(response));
	if( actFlg ==2)
	{
		$.each(response, function(index, item) 
		{
			if (response.RESPCODE == 0) 
			{
			    alert("Records Not Found!");
				document.getElementById("tab_co_cbs_data").innerHTML="";
			} 
			else if (index == "RETVAL") 
			{
				
				//add_item("custId", '','----------ALL---------------');
				for (i = 0; i < item.length; i++) 
				{
					if(i==0)
					{
						rowCount=1;
						sumamnt=0;
						document.getElementById("tab_co_cbs_data").innerHTML="";
						var str="<tr bgccolor='grey'><td><input type='checkbox' name='selall' id='selall' onclick='toggle_out_clearing(this)' />Select All &nbsp;</td><td><b>Sr No</b></td><td><b>Cheque No</b></td><td><b>BODF</b></td><td><b>Sort Code</b></td><td><b>Tran Code</b></td><td><b>Amount(In Rs.)</b></td><td><b>Account Number</b></td><td><b>Return Code</b></td></tr>	";
						//jQuery('#tab_co_cbs_data').append(str);
						document.getElementById("tab_co_cbs_data").innerHTML=str;
					}
					//RTO_BOFD, RTO_CHEQUENO, RTO_SORTCODE, RTO_TRANSACTIONCODE, RTO_AMOUNT, RTO_ACCOUNTNUMBER, RTO_RETURNREASONCODE;
					addMoreRows(item[i].RTO_CHEQUENO,item[i].RTO_BOFD,item[i].RTO_SORTCODE,item[i].RTO_TRANSACTIONCODE,((item[i].RTO_AMOUNT)/100).toFixed(2),item[i].RTO_ACCOUNTNUMBER,item[i].RTO_RETURNREASONCODE,item[i].RTO_CLEARINGTYPE);
				}
				$('#totalamnt').val(sumamnt);
				if($('#filename').val()=="NOT RETURNED YET")
				{
					document.getElementById("deletebutton").disabled=false;
					document.getElementById("updatebutton").disabled=true;
				}
				else
				{
					document.getElementById("deletebutton").disabled=true;
					document.getElementById("updatebutton").disabled=false;
				}
			}
		});
	}
	if( actFlg ==1)
	{
		$.each(response, function(index, item) 
		{
			if (response.RESPCODE == 1) 
			{
				alert("Records Not Found!");
			} 
			else if (index == "RETVAL") 
			{
				
				//add_item("custId", '','----------ALL---------------');
				 alert("Delete successfully!");
				 location.replace("deletereturnoutwardfrdate.jsp");
			}
		});
	}
	if( actFlg ==0)
	{
		$.each(response, function(index, item) 
		{
			if (response.RESPCODE == 1) 
			{
				alert("Files Not Found!");
			} 
			else if (index == "RETVAL") 
			{
				$('#filename').empty().append('<option selected="selected" value="0">--------Select File Name----------</option>');
				//alert(response.RETVAL);
				if(response.RETVAL.indexOf("~")>-1)
				{
					var files=response.RETVAL.split("~");
					for(var k=0;k<files.length-1;k++)
					{
						$('#filename').append('<option value="'+files[k]+'">'+files[k]+'</option>');
					}
				}
			}
		});
	}
	if( actFlg ==3)
	{
		$.each(response, function(index, item) 
		{
			if (response.RESPCODE == 1) 
			{
				alert("Records Not Found!");
			} 
			else if (index == "RETVAL") 
			{
				
				//add_item("custId", '','----------ALL---------------');
				 alert("Updated successfully!");
				 location.replace("deletereturnoutwardfrdate.jsp");
			}
		});
	}
}

function isBlank(val)
{
	if (!val || val.length == 0) 
	{
        return true;
    }	
    return !/[^\s]+/.test(val);
}
function validateForm()
{
	var id=$('#clearingtype').val();
	var fromDate=$('#datepicker').val();
	var branch_code=$('#opt_branch_code').val();
	
	
	//alert("fromDate==="+fromDate);
	
	var myDate = new Date(fromDate.split("/")[1]+"-"+fromDate.split("/")[0]+"-"+fromDate.split("/")[2]);
	//var myDate = new Date(fromDate);
	var today = new Date();
	
	 
	//alert("myDate==="+myDate);
	//alert("today==="+today);
	if (isBlank(fromDate))
    { 
    	alert("Please Enter From Date!");
    	return false;
    }
	
    else if (myDate>today)
    { 
    	alert("From Date should be less than or equal to current date!");
    	return false;
    }
	 if(branch_code=='0')	
	{
		alert('Select Branch');
		//document.getElementById("opt_branch_code").focus();	
		return false;
	}
   /* var myDate1 = new Date(toDate.split("/")[1]+"-"+toDate.split("/")[0]+"-"+toDate.split("/")[2]);
    //alert("myDat1e==="+myDate1);
    if (isBlank(toDate))
    { 
    	alert("Please Enter To Date!");
    	return false;
    }
    else if (myDate1>today)
    { 
    	alert("To Date should be less than or equal to current date!");
    	return false;
    }
    else if (myDate>myDate1)
    { 
    	alert("From Date should be less than or equal to To Date!");
    	return false;
    }*/
    if (id==0)
    { 
    	alert("Please Select Clearing Type !");
    	return false;
    }
    return true;
}

function onLoad_report_paperToFollow()
{
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");	
		//baseurl=baseurl+"login.jsp";
		//location.replace(baseurl);
		menuOnClick("login.jsp");
	}
}//onLoad_report_clearing_outward
																							
									
								
									
function addMoreRows(ChequeNo,BODF,SortCode,TranCode,Amount,AccountNumber,ReturnCode,ClearingType) { 
rowCount ++; 
/*
var recRow = '<p  id="rowCount'+rowCount+'"><tr><td>'+ChequeNo+'</td><td>'+BODF+'</td><td>'+SortCode+'</td><td>'+TranCode+'</td><td>'+Amount+'</td><td>'+AccountNumber+'</td><td>'+ReturnCode+'</td><td>'+ClearingType+'</td></tr></p>'; */

var recRow = '<tr><td><input type="checkbox"  id="chkall" onClick="chk_selected_outward_chqs('+(rowCount-1)+')" /></td><td>'+(rowCount-1)+'</td><td>'+ChequeNo+'</td><td>'+BODF+'</td><td>'+SortCode+'</td><td>'+TranCode+'</td><td>'+Amount+'</td><td>'+AccountNumber+'</td><td>'+ReturnCode+'</td></tr>';  

//jQuery('#tab_co_cbs_data').append(recRow);
document.getElementById("tab_co_cbs_data").innerHTML=document.getElementById("tab_co_cbs_data").innerHTML+recRow;
/*<a href="javascript:void(0);" onclick="removeRow('+rowCount+');">Delete</a>
*/
sumamnt=Number(sumamnt)+Number(Amount);
}
function removeRow(removeNum) 
{ jQuery('#rowCount'+removeNum).remove(); 
} 

function onLoad_report_clearing_inward()
{
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");
		menuOnClick("login.jsp");
		//baseurl=baseurl+"login.jsp?flag=1";
		//location.replace(baseurl);
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
					//alert('singleBranch[0]:>>'+singleBranch[0]);
					option.text=singleBranch[0];//branch Name
					option.value=singleBranch[1];//branch Code
					allBrn+=singleBranch[1]+",";
					obj_opt_branch_code.add(option,0);
				}
				var option_all = document.createElement('option');
				option_all.text='All';//branch Name
				option_all.value='All';//branch Code
				obj_opt_branch_code.add(option_all,0);
				document.getElementById("opt_branch_code").value='All';
		}//2
		else
		{//1
			alert("Problem In Retrieving Data.Please Check The Server Connection.");		
		}//1
	}//1
	
}//cts_process1
function toggle_out_clearing(source)
{
  	var table = document.getElementById("tab_co_cbs_data");
	var rowCount = table.rows.length;
	var totAmount=0;
	//alert("rowCount="+rowCount);
	for(var i=1; i<rowCount; i++)
	{
		var row = table.rows[i];
		//alert("row :"+row);
		var chkbox = row.cells[0].childNodes[0];
		//alert(row.cells.length);
		chkbox.checked = source.checked;
		var amount=row.cells[6].innerHTML;
		totAmount=totAmount+(amount*1);
		//document.getElementById("txt_no_of_sel_chq").value = document.getElementById("txt_tot_no_of_chq").value ;
		//document.getElementById("txt_tot_amt_sel_chq").value = document.getElementById("txt_tot_amt").value ;

		/*if(chkbox.checked == true)
		{
			//document.getElementById("txt_no_of_sel_chq").value ='0';
			//document.getElementById("txt_tot_amt_sel_chq").value = '0';
			document.getElementById("selcnt").value =document.getElementById("txt_tot_no_of_chq").value;
			document.getElementById("selamt").value =" "+document.getElementById("txt_tot_amt").value;
		}
		else
		{
			document.getElementById("selcnt").value ='0';
			document.getElementById("selamt").value = '0';
		}*/
	}
	//alert(totAmount);
	if(source.checked)
	{
		document.getElementById("selcnt").value =rowCount-1;
		document.getElementById("selamt").value = totAmount;
	}
	else
	{
		document.getElementById("selcnt").value =0;
		document.getElementById("selamt").value = 0;
	}
}
function chk_selected_outward_chqs(index)
{
	//alert("in chk_selected_outward_chqs");
	var tot_amt = 0;
	var table = document.getElementById("tab_co_cbs_data");
	var rowCount = table.rows.length;
	var sel_cnt =0;
	for(var i=1; i<rowCount; i++)
	{
		var row = table.rows[i];
		//alert("row :"+row);
		var chkbox = row.cells[0].childNodes[0];
		var amt_val = row.cells[6].innerHTML;

		//alert("amt_val :"+amt_val);

		if(true == chkbox.checked)
		{
			chkbox.checked
			sel_cnt ++;
			tot_amt = (tot_amt *1) + (amt_val*1);
		}
		/*else
		{
			sel_cnt --;
			tot_amt = (tot_amt *1) - (amt_val*1);
		}*/
	}
	//alert("sel_cnt:"+sel_cnt+"\nrowCount-1:"+(rowCount-1));
	var chkbox = document.getElementById("chkall");
	/*if(sel_cnt != (rowCount-1))
	{
		if(true == chkbox.checked)
		{
			chkbox.checked = false;
		}
	}
	else
	{
		chkbox.checked = true;
	}*/
	document.getElementById("selcnt").value = sel_cnt;
	document.getElementById("selamt").value = " "+tot_amt;
}