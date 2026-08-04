// JavaScript Document
var jsonstring;
//var res;
var paraName=[];
var paraDatatype=[];
var paraValue=[];
var myGrid;
var fileformat='NA';
$(document).ready(function() 
{
	
	//loadrecListGrid("");
	var session_loginid = document.getElementById("session_loginid").value;
	var bank_name = document.getElementById("CFG_CHI_BANKNAME").value;

	/*if(bank_name == "HDFC")
	{
	document.getElementById("fileformatdiv").style.display='none';
	}*/
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
		var d=document.getElementById("menu_ppsinterface");
		d.className = ' active';
		var date = new Date(); 
		var verifydate=date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
		//alert(verifydate);
		$("#datelbl").val(verifydate);
		 $("#whattodo").val("ONLOAD");
		var params = [ 'whattodo' ];
		var dataTypes = [ 'String'  ];
		var values = [ 'ONLOAD'];
		var paraStr = getParameterString(params, values);
		callAjax("PPSController"+ paraStr);
		//loadGrid("");
	}
	
	$("#submitbutton").click(function() 
			{
			/*if(bank_name == "HDFC")
			{
				 $("#whattodo").val("CREATEFILE");
				var params = [ 'whattodo' ,'fileformat'];
				var dataTypes = [ 'String' ,'String'];
				var values = [ 'CREATEFILE' ,'TXT'];
				var paraStr = getParameterString(params, values);
				callAjax("PPSController"+ paraStr);
			}
			else{*/	
			       if(fileformat=='NA')
					{
						alert('Please Select File format.')
						return false;
					}
				   else{
					$("#whattodo").val("CREATEFILE");
					var params = [ 'whattodo' ,'fileformat'];
					var dataTypes = [ 'String' ,'String'];
					var values = [ 'CREATEFILE' ,fileformat];
					//var values = [ 'CREATEFILE' ,'CSV'];///jayesh chnage
					var paraStr = getParameterString(params, values);
					callAjax("PPSController"+ paraStr);
				 }
			//}	
	});

});

function success_ajax(response)
{
	
	if($("#whattodo").val()=='ONLOAD')
	{
		document.getElementById("footerdetail").style.display='none';
			if (response.RESPCODE == '0') 
			{
				loadGrid(response);
				document.getElementById("footerdetail").style.display='';
			} 
			else if(response.RESPCODE=='1')
			{
				alert('No records to show');
				
			}
			else{
				alert('Error showing records');
			}
	}
	else if($("#whattodo").val() == "CREATEFILE")
	{
		if(response.RESPCODE=='0')
		{			
			var file_path=response.REPFILEPATH;
			var filenm=response.REPFILENAME;			
				var yes = confirm("File Created Successfully. Do you want to Download.............?");
				if(yes)
				{
					/*	alert("22 "+file_path);
					alert("33filenm "+filenm);
					var a = document.createElement('A');
					a.href = file_path;					
					a.download = file_path.substr(filenm);//file_path.lastIndexOf('/') + 1);
					document.body.appendChild(a);
					a.click();
					*/								
					var url = document.URL;
					var p = url.lastIndexOf('/');
					imagePath = url.substr(0,p+1);
					imagePath = file_path+filenm;
					var a = document.createElement('A');
					a.href = imagePath;					
					a.download =filenm;// file_path.substr(filenm);//file_path.lastIndexOf('/') + 1);
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
					
					document.getElementById("formid").action="create_issuance_file.jsp";
					document.getElementById("formid").method="POST";
					document.getElementById("formid").submit();				
				}
				else
				{
						document.getElementById("formid").action="create_issuance_file.jsp";
						document.getElementById("formid").method="POST";
						document.getElementById("formid").submit();
				}
			}
			else if(response.RESPCODE=='2'){
				alert('Please read response file of previously created file and then create new file');
			}
			else if(response.RESPCODE=='1'){
				alert('Error While Creating File');
			}
	}
	
	
}

function getValue(radio) {
	fileformat=radio.value;
	//alert(fileformat);
  }
function loadGrid(response)
{
	myGrid = new dhtmlXGridObject('jsongrid');
	myGrid.setImagePath("codebase/imgs/");
	myGrid.setHeader("Account No,Instrument No,Amount (In Rs),Payee Name,Instrument Date,Request Received Date Time",null,["text-align:left;","text-align:right;","text-align:right","text-align:left","text-align:left","text-align:left"]);
	myGrid.setColumnIds("PIL_ACCNO,PIL_CHQNO,PIL_AMOUNT,PIL_PAYEENAME,PIL_INSTRUMENT_DT,PIL_ENTRYDATE");
	myGrid.setInitWidths("120,100,100,200,100,150");
	myGrid.setColAlign("right,right,right,left,left,left");
	myGrid.setColTypes("ro,ro,ro,ro,ro,ro");
	myGrid.init();
	//alert(JSON.stringify(response.RETVAL));
	myGrid.parse(response.RETVAL,"js");
	var count=myGrid.getRowsNum();
	colNum=2;
	var amountSum= getGridColumnSum(myGrid,colNum);
	$("#td4").val(myGrid.getRowsNum());
	$("#td2").val(amountSum);
	
}
function error_ajax(response) 
{
	alert('Error Occured in Calling:  '+response);
}