// JavaScript Document
var imagePath="";
function onload_load_resData()
{
	//alert("in onload_return_inward()");
		var session_branch_code = document.getElementById("session_branch_code").value;
		var url = document.URL;
		var p = url.lastIndexOf('/');
		imagePath = url.substr(0,p+1);
		imagePath = imagePath+"uploadpath_to_CHI/";
		//alert(imagePath);


	//var d=document.getElementById("menu_retresp");
	//d.className = ' active';
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
		var val=document.getElementById("hdMsg2").value;
		//alert("val :"+val);

		if(val=="N")
		{
			//alert(val);
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			//location.replace(url);
			document.getElementById("formid").action="retOutward_reFileData.jsp";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").submit();
		}
		else
		{
			
			var val1=val.split('\\').join('\"');
			//alert("val1====="+val1);
			//var res1=JSON.parse(val1);
			var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			//alert(val1);
			baseurl=baseurl+"jsp/retOutward_resFile.jsp?val="+val1;
			//location.replace(baseurl);
			cts_Ajax_res_retOutward_filedata(baseurl);
		}
	}
}
function cts_Ajax_res_retOutward_filedata(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_res_retOutward_filedata;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_res_retOutward_filedata;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_res_retOutward_filedata()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			//alert("res:"+res);
			res_retOutward_filedata(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function res_retOutward_filedata(res)
{
	var res1=JSON.parse(res);
	if(res1.RETCODE==1)
	{
		alert("Data Not Available.");
		//document.getElementById("submitbutton").disabled = true;
		document.getElementById("waiting").style.display='none';
	}
	else
	{
		//document.getElementById("submitbutton").disabled = false;
		document.getElementById("waiting").style.display='none';
		loadFileListGrid(res1.DATA);

	}
}


var myGrid;
function loadFileListGrid(response) 
{
	//	Sr No,File Name,File Status,Item Status,Reason,Cheque Number,Sort Code	,Tran Code,Payee Name,Amount	,ItemSeqence No,Branch Name
	var data =response;
	myGrid = new dhtmlXGridObject('filejsongrid');		
	myGrid.setImagePath("codebase/imgs/");	
	myGrid.setHeader("Select,Sr No,File Name,File Status,Item Status,Reason,Cheque Number,Sort Code,Tran Code,Payee Name,Amount,ItemSeqence No,Branch Name,Image name,Branch Code",null,
			["text-align:left;","text-align:center;","text-align:left;","text-align:center;","text-align:center;","text-align:left;","text-align:center;","text-align:center;","text-align:center;","text-align:left;","text-align:center;","text-align:center;","text-align:left;","text-align:left;","text-align:left;"]);
	myGrid.setColumnIds("onSelect,SRNO,FILENAME,FILSTATUS,FILEREJECTCODE,FILEREJECTREASON,CHQNO,SORTCD,TRANCD,PAYEE_ACCNM,AMOUNT,ITEMSEQNO,BRANCH_CD,IMGFRNTGR,BRNCD");
	myGrid.setInitWidths("50,50,200,50,50,100,100,100,100,0,100,0,0,0,0,0");	
	myGrid.setColAlign("center,center,left,center,center,left,center,center,center,left,center,center,left,left,left");
	myGrid.setColTypes("ch,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
	myGrid.setColSorting("str,str,str,str,str,str,str,str,str,str,str,str,str,str,str");
	myGrid.init();		
	myGrid.parse(data,"js");	
	//myGrid.attachEvent("onRowSelect", onRowSelect1);
	}
function onRowSelect1(id,ind)
{
	
	var singleChqNo=this.cellById(id,13).getValue();
	var brncd=this.cellById(id,14).getValue();
	imagePath= imagePath+brncd+"/ClearingOutward/Images/"
	//alert(imagePath+singleChqNo);
	document.getElementById('img_frnt').src =imagePath+singleChqNo;
	//enlargeCheque_outwardchqs('img_frnt');
}

function update_res_data()
{
	var count=0;
	var dataArr = [];
	var flg=true;
	myGrid.forEachRow(function(id)
	{
		
		if(myGrid.cells(id,0).getValue()==1)
		{
			if(myGrid.cells(id,6).getValue()=="-")
			{
				
				dataArr.push({	
					
					STATUS:myGrid.cells(id,3).getValue(),
					FILENAME:myGrid.cells(id,2).getValue()
					
				});
				count++;
			}
			else
			{
				if(myGrid.cells(id,6).getValue().length==6)
				{
					if(myGrid.cells(id,11).getValue().length==14)
					{
						
						if(myGrid.cells(id,2).getValue().length != 0)
						{
			
							dataArr.push({	
								STATUS:myGrid.cells(id,3).getValue(),
								CHQNO: myGrid.cells(id,6).getValue(),
								ITEMSEQNO:myGrid.cells(id,11).getValue(),
								FILENAME:myGrid.cells(id,2).getValue()
								
							});
							count++;
							//alert(count);
							
						}
						else
						{
							alert("File Name Should not be blank");
							flg=false;
							myGrid.selectCell(id-1,3,false,true,true);
						}
					}
					else
					{
						alert("Item Sequence number Should Be 14 Digits");
						flg=false;
						myGrid.selectCell(id-1,2,false,true,true);
					}
				}
				else
				{
					alert("Cheque number Should Be 6 Digits");
					flg=false;
					myGrid.selectCell(id-1,1,false,true,true);
				}
			}
		}
							
		
	
	});
	
	if(count==0)
	{
		alert("Select Atleast One Record With Correct Status!");
	}
	else
	{
		if(flg==true)
		{
			var retval1=confirm('Do u want Resend this cheque.?');
			if (retval1==true)
			{
				//alert(dataArr);
				document.getElementById("jsonString").value=JSON.stringify(dataArr);
				document.getElementById("formid").action="jsp/updateretResData.jsp";
				document.getElementById("waiting").style.display='none';
				document.getElementById("formid").submit();
			}
		}
	}
	
}