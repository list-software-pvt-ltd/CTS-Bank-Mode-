
var actFlg=1;
var rowCount = 1;
var sumamnt=0;
var datepick;
var cylNo ="";
var cbs_conti_flg="";
$(document).ready(function()
{		
	if($('#onloadMsg').val()!='null' && $('#onloadMsg').val()!=null && $('#onloadMsg').val().length>0)
	{
		if($('#onloadMsg').val()=='SUCCESS')
		{
			alert(" Record deleted and Regenerated Successfully!");
		}
		else
		{
			alert("Error in Delete and Regenerate Record!");
		}
		//location.replace("deleteclearingoutwardfrdate.jsp");
		document.getElementById("formid").action="deleteinwardlot.jsp";
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();
	}
	else
	{
			document.getElementById("opt_branch_code").disabled=true;
			document.getElementById("clearingtype").disabled=true;
			document.getElementById("datepicker").disabled=true;	
	var fromDate = $('#datepicker');
	fromDate.datepicker({dateFormat: 'dd-mm-yy'});
	var urlbase=document.URL;
	var p=urlbase.lastIndexOf('/');
	urlbase=urlbase.substr(0,p+1);
//	onLoad_report_clearing_inward();	
	
		var newValue = $('#datepicker').val();
		var branch_code=(document.getElementById("opt_branch_code").value).split('--')[0];
		cbs_conti_flg= $('#cbs_conti_flg').val();
		
		//-----------------------------------------------
		actFlg=2;
			$.ajax(
			{
				url:urlbase+"jsp/deleteClearinginward.jsp?clearingtype="+$('#clearingtype').val()+"&datepicker="+newValue.replace('-', '').replace('-', '')+"&whattodo=C&cbs_flg="+cbs_conti_flg,
				dataType: "json",
				success: function(response)
				{   
					
					success_ajax(response);
				},
				error: function(e)
				{
					alert("Error in Calling Report!");
				}
			});
					
	$("#btnfetchfiles").click(function()
	{
		if(validateForm())
		{
			var newValue = $('#datepicker').val();
			var branch_code=(document.getElementById("opt_branch_code").value).split('--')[0];	
			cylNo = $('#cyclNo').val();	
			//alert("cyl no="+cylNo);	
			actFlg=0;
			document.getElementById("waiting").style.display='';
			$.ajax(
			{
				url:urlbase+"jsp/deleteClearinginward.jsp?clearingtype="+$('#clearingtype').val()+"&datepicker="+newValue.replace('-', '').replace('-', '')+"&whattodo=FF&opt_branch_code="+branch_code+"&cylNo="+cylNo+"&cbs_flg="+cbs_conti_flg,
				dataType: "json",
				success: function(response)
				{   
					
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
	//	alert("Click On delete button");
		var ss=document.getElementById("clearingtype").value;
		cylNo = $('#cyclNo').val();	
		//	alert("cyl no="+cylNo);		
		var r = confirm("Do You Want To Delete?");
		if (r == true)
		{
			if(validateForm())
			{
				var newValue = $('#datepicker').val();
				var branch_code=(document.getElementById("opt_branch_code").value).split('--')[0];
				$('#brncd').val(branch_code);
				document.getElementById("opt_branch_code").disabled = false;
				document.getElementById("clearingtype").disabled=false;
				actFlg=1;
				var loginby = $('#session_loginid').val();
				//var dataval =$('#filedata').val();// document.getElementById("filedata").value;  filedata
			//	var dataval =	document.getElementById('filedata').value;
					//alert("dataval======="+dataval);
				var downPath=document.getElementById('DownloadfromCHI').value;
				//alert("downPath======="+downPath);
					document.getElementById("waiting").style.display='';
			$.ajax(
			{
				url:urlbase+"jsp/deleteClearinginward.jsp?clearingtype="+$('#clearingtype').val()+"&datepicker="+newValue.replace('-', '').replace('-', '')+"&whattodo=D&opt_branch_code="+branch_code+"&loginby="+loginby+"&downPath="+downPath+"&cylNo="+cylNo+"&cbs_flg="+cbs_conti_flg,

				dataType: "json",
				success: function(response)
				{   
					
					success_ajax(response);
				},
				error: function(e)
				{
					alert("Error in Calling Report!");
					document.getElementById("waiting").style.display='none';
				}
			});
								
				
			}
		}
	});

	}
});

function success_ajax(response)
{	

	if( actFlg ==2){
		{		
			//alert(response.RESPCODE+"="+response.RETVAL);			
			if (response.RESPCODE == 1)
			{
				alert("Inward cycle not present!");	
				document.getElementById("waiting").style.display='none';
			}
			else if (response.RESPCODE ==2 && response.RETVAL=="NA")
			{
				$('#cyclNo').append('<option value=NA>NA</option>');
				$('#cyclNo').prop('disabled', 'disabled');
			}
			else
			{
				var k=0;
				if(response.RETVAL.indexOf("~")>-1)
				{
						document.getElementById("waiting").style.display='none';					
					var files=response.RETVAL.split("~");
					for(k=0;k<files.length-1;k++)
					{
						var bclist=files;								
						$('#cyclNo').append('<option value='+bclist[k]+'>'+bclist[k]+'</option>');
					}					
				}			
			}
		}
	}	
	if( actFlg ==1)
	{
		$.each(response, function(index, item)
		{
			document.getElementById("waiting").style.display='';
			if (response.RESPCODE == 1)// && response.RETVAL=="FAIL")
			{
					alert("These files can not delete because Return outward file created for these files!");
			}
			else if (response.RESPCODE==0)
			{				
				 alert("Record deleted Successfully!");
				 document.getElementById("waiting").style.display='none';
				// location.replace("deleteclearingoutwardfrdate.jsp");
				document.getElementById("formid").action="main.jsp";
				document.getElementById("formid").method="POST";
				document.getElementById("formid").submit();
			}
		});
	}

	if( actFlg ==0)
	{
		$.each(response, function(index, item)
		{
					
			if (response.RESPCODE == 1)
			{
				alert("Files Not Found!");	document.getElementById("waiting").style.display='none';
			}
			else if (index == "RETVAL")
			{
				
				if(response.RETVAL.indexOf("~")>-1)
				{
						document.getElementById("waiting").style.display='none';
					var temp = "";
					var files=response.RETVAL.split("~");
					for(var k=0;k<files.length-1;k++)
					{
						temp = temp + files[k]+'<br>';
					}
					
					document.getElementById('filedata').innerHTML = temp;
					$('#totalamnt').val(response.TOTAMT);
					$('#selcnt').val( response.TOTCOUNT);
					document.getElementById("deletebutton").disabled=false;	
				}
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
	var branch_code=(document.getElementById("opt_branch_code").value).split('--')[0];
	
	var myDate = new Date(fromDate.split("-")[1]+"-"+fromDate.split("-")[0]+"-"+fromDate.split("-")[2]);
	var today = new Date();

    if (isBlank(fromDate))
    {
    	alert("Please select Date!");
    	return false;
    }
    else if (myDate>today)
    {
    	alert("From Date should be less than or equal to current date!");
    	return false;
    }
    else if(isBlank(branch_code))
	{
		alert('Select Branch');
		return false;
	}
    return true;
}