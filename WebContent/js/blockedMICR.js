var myGrid;
var srno="0";
var fetchedRowsCnt=0;
var userid;
function loadGrid()
{
	myGrid = new dhtmlXGridObject('jsongrid');
	myGrid.setImagePath("codebase/imgs/");
	myGrid.setHeader("SR NO,MICR Bank Code,Bank Name,status,Entry By ,Entry Date",null,["text-align:left;","text-align:left;","text-align:left;","text-align:left;","text-align:left;","text-align:left;"]);
	myGrid.setColumnIds("SR NO,MICR Code,Bank Name,status");
	myGrid.setInitWidths("50,120,330,0,120,180");
	myGrid.setColAlign("right,right,left,left,left,left");
	myGrid.setColTypes("ro,ed,ed,ro,ro,ro");
	myGrid.init();	
}
$(document).ready(function() 
{	
	var session_loginid = document.getElementById("session_loginid").value;
	var msg = document.getElementById("hdMsg1").value;	
	if(session_loginid == "null")
	{
		alert("Your Session Has Been Expired. Please Login Again.");	
		menuOnClick("login.jsp");
	}
	else
	{	
		loadGrid();
		if(msg!='N')
		{
			alert(msg);
		
		}
		{	
				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/InsertBlockedMICR.jsp?F";
				cts_Ajax_list_blocked_MICR(baseurl);		
		}		
	}	
});
function onClickAddNew()
{
		var newId =myGrid.uid();
		if(myGrid.getRowsNum()==0 && srno==0)
		{
			srno=1;
		}
		else
		{
			srno=myGrid.getRowsNum()+1;
		}
		userid  = document.getElementById("session_loginid").value;	
		myGrid.addRow(newId,[srno,'','',0,userid,'']);
}
function cts_Ajax_list_blocked_MICR(url)
{
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list;
		req.open("GET", url, true);
		req.send(null);
	}
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}
function cts_process_list()
{	
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			show_res(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}
function show_res(res)
{			
	var res1=JSON.parse(res);		
	if(res1.RESPCODE==0)
	{
		document.getElementById("waiting").style.display='none';
	}
	else
	{
		document.getElementById("submitbutton").disabled = false;
		document.getElementById("waiting").style.display='none';							
		var response1=res1.RETVAL;
		$.each(response1, function(index1, item1) 
		{	 	
			var newId =myGrid.uid();							
			var srn=item1.SRNO;
			var micrcd=item1.MICRBANKCODE;
			var bnknm=item1.BANKNAME;
			var entby=item1.ENTRYBY;
			var entdate=item1.ENTRYDATE;
					
			myGrid.addRow(newId,[srn,micrcd,bnknm,1,entby,entdate]);
			myGrid.lockRow(newId,true);
			fetchedRowsCnt++;
		
		});				
	}
	document.getElementById("waiting").style.display='none';
}

function onClickSubmit()
{
	var count=0;
	var dataArr = [];
	var flg=true;
	var status=false;
	myGrid.forEachRow(function(id)
	{
		if(myGrid.cells(id,1).getValue().length==0)
		{
			alert("Please Enter MICR Code");
			flg=false;
			return false;
		}
		else if(myGrid.cells(id,1).getValue().length!=3)
		{
			alert("Please Enter 3 Digit MICR Code");
			flg=false;
			return false;
		}
		else if(myGrid.cells(id,2).getValue().length==0)
		{
			alert("Please Enter Bank Name");
			flg=false;
			return false;
		}		
		else
		{	
			if(myGrid.cells(id,3).getValue()==0 && flg==true)	
			{		
				dataArr.push({	
						SRNO:myGrid.cells(id,0).getValue(),
						MICRCODE: myGrid.cells(id,1).getValue(),
						BANKNAME:myGrid.cells(id,2).getValue(),
						ENTRYBY:myGrid.cells(id,4).getValue()
				});
					status=true;
					count++;
			}	
							
		}	
		//alert(flg+"===="+status);
		if(flg==true &&status==true)
		{
				document.getElementById("whattodo").value="I";
				document.getElementById("jsonString").value=JSON.stringify(dataArr);
				document.getElementById("formid").action="jsp/InsertBlockedMICR.jsp";
				document.getElementById("waiting").style.display='none';
				document.getElementById("formid").submit();					
		}
	});
}