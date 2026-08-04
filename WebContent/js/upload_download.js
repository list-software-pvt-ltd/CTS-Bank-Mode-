var imagedata="";
var cnt=0;
var gridcnt=0;
var imagePath="";
var amount=0;
function onload_inward_clearing()
{

	//var d=document.getElementById("menu_inward_clearing");
	//d.className = ' active';

	var session_loginid = document.getElementById("session_loginid").value;
	
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired. Please Login Again.");
		/*var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(encodeURI(baseurl));*/
		menuOnClick("login.jsp");
	}
	else
	{
		
		getDownloadFileList()
		
		
	}
}

function getDownloadFileList(){
	document.getElementById("waiting").style.display='';
	document.getElementById("uploadgridData").style.display='none';
	document.getElementById("downloadgridData").style.display='block';
	document.getElementById("actionflg").value="DOWNLOAD";
	document.getElementById("uploadBtn").checked=false;
	document.getElementById("downloadBtn").checked=true;
	var url=document.URL;
	var p=url.lastIndexOf('/');
	baseurl=url.substr(0,p+1);
	baseurl=baseurl+"jsp/getTreeGridData.jsp?action=DOWNLOAD";
	cts_Ajax_list_inward_filenames(encodeURI(baseurl));
}


function getUploadFileList(){
	document.getElementById("waiting").style.display='';
	document.getElementById("uploadgridData").style.display='block';
	document.getElementById("downloadgridData").style.display='none';
	document.getElementById("actionflg").value="UPLOAD";
	document.getElementById("uploadBtn").checked=true;
	document.getElementById("downloadBtn").checked=false;
	var url=document.URL;
	var p=url.lastIndexOf('/');
	baseurl=url.substr(0,p+1);
	baseurl=baseurl+"jsp/getTreeGridData.jsp?action=UPLOAD";
	cts_Ajax_list_inward_filenames(encodeURI(baseurl));
}
function cts_Ajax_list_inward_filenames(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list_inward_filenames;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list_inward_filenames;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_list_inward_filenames()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;

			record=res;
			res=res.trim();
			var actionflg=document.getElementById("actionflg").value;
			document.getElementById("waiting").style.display='none';
			if(actionflg=="DOWNLOAD"){
				if(res=="SUCCESS"){
					loadGrid(res);
				}
				else if(res=="NOBACKUP"){
					alert("Please Backup First");
				}
				else if(res=="SERVERPROBLEM"){
					alert("Problem TO Connect FTP Server");
				}
				else{
					alert("Problem To Getting FTP File List");
				}
			}
			else if(actionflg=="UPLOAD"){
				if(res=="SUCCESS"){
					loadUploadGrid(res);
				}
				else if(res=="NOBACKUP"){
					alert("Please Backup First");
				}
				else if(res=="SERVERPROBLEM"){
					
					alert("Problem TO Connect FTP Server");
				}
				else{
					alert("Problem To Getting File List");
				}
			}
			//show_inward_filenames(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

var myGrid;
function loadGrid(response) 
{
	var actionflg=document.getElementById("actionflg").value;
	var usname=document.getElementById("session_loginid").value;
	usname=usname+"_"+actionflg;
	document.getElementById("waiting").style.display='none';
	myGrid = new dhtmlXGridObject('downloadgrid');		
	myGrid.setImagePath("codebase/imgs/");	
	myGrid.setHeader("FILE_ID,MAIN_ID,TYPE,FILE NAME,DWONLOAD STATUS,dummy,SELECT", null,["text-align:left;","text-align:right;","text-align:left;","text-align:left;","text-align:left;","text-align:center;"]);
	myGrid.setInitWidths("0,0,200,450,100,0,150");	
	//myGrid.setColAlign("left,right,left,left,left,right");
	myGrid.setColTypes("ro,ro,tree,ro,ro,ro,ro");
	myGrid.setColSorting("str,str,str,str,str,str,str");
	myGrid.attachEvent("onRowSelect", doOnRowSelected);
	myGrid.attachEvent("onRowCreated",function(id){
		if (myGrid.cellById(id,1).getValue().length!=0)
		 {
			if (myGrid.cellById(id,3).getValue().length==0)
			 {
				myGrid.cells(id,6).setValue("<input type='button' value='Download All'>");
			 }
			else{
				myGrid.cells(id,6).setValue("<input type='button' value='Download'>");
			}
		 }
	        return true;
	      });
	myGrid.enableTreeCellEdit(false);
	myGrid.enableSmartRendering(true);
	myGrid.init();	
	
	alert("File Loading...");
	myGrid.load("temp/"+usname+".xml","xml");
 }
function doOnRowSelected(rowId, cellId) 
{
	var filename=myGrid.cellById(rowId,3).getValue();
	var imgid=myGrid.cellById(rowId,0).getValue();
	var rmainid=myGrid.cellById(rowId,1).getValue();
	var downloadstatus=myGrid.cellById(rowId,4).getValue();
	var dwncount=0;
	var childcnt=0;
	var dataArr = [];
	
	if (cellId == 6) 
	{
		if(rmainid.length!=0){
			
			if(filename.length==0){
				
					myGrid.forEachRow(function(id)
							{
							var mainid=myGrid.cellById(id,1).getValue();
								if(imgid==mainid){
									childcnt++;
									var dwnflg=myGrid.cellById(id,4).getValue();
									if(dwnflg=='No'){
											dwncount++;
									}
								}
							});
				}
			
			if(childcnt>0 || filename.length!=0){
			if(dwncount>0 || downloadstatus=="No"){
			if (confirm("Do You Wan't To Download File")) {
				if(filename.length==0){
						myGrid.forEachRow(function(id)
						{
							var mainid=myGrid.cellById(id,1).getValue();
							if(imgid==mainid){
								if(myGrid.cellById(id,4).getValue()=="No"){
									myGrid.cellById(id,4).setValue("Yes");
									dataArr.push({	
										
										FILENAME:myGrid.cells(id,3).getValue(),
																		
									});
								}
							}
							
						});
				}
				else{
					myGrid.cellById(rowId,4).setValue("Yes");
					dataArr.push({	
						
						FILENAME:filename,
														
					});
				}
				
				
				document.getElementById("waiting").style.display='';
				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/download_upload_FTPfile.jsp?action=DOWNLOAD&JSONFILE="+JSON.stringify(dataArr);
				cts_Ajax_download_ftp_file(encodeURI(baseurl));
				
			}
			}
			else{
				alert("File Are Alredy Downloaded");
			}
		}
			else{
				alert("File Not Available");
			}
		}
	}
}

function cts_Ajax_download_ftp_file(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_download_ftp_file;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_download_ftp_file;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_download_ftp_file()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;

			record=res;
			document.getElementById("waiting").style.display='none';
			res=res.trim();	
			var actionflg=document.getElementById("actionflg").value;
			if(actionflg=="DOWNLOAD"){
				if(res=="SUCCESS"){
					alert("Download File Successfully");
				}
				else if(res=="FAILED")
				{
					alert("Problem To Download File");
					location.replace("upload_download.jsp");
				}
				else if(res=="NOCONNECT"){
					alert("Failed To Connect FTP Server");
				}
			}
			if(actionflg=="UPLOAD"){
				if(res=="SUCCESS"){
					alert("Upload File Successfully");
				}
				else if(res=="FAILED")
				{
					alert("Problem To Upload File");
					location.replace("upload_download.jsp");
				}
				else if(res=="NOCONNECT"){
					alert("Failed To Connect FTP Server");
				}
			}
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}



var myGridUpload;
function loadUploadGrid(response) 
{
	var actionflg=document.getElementById("actionflg").value;
	var usname=document.getElementById("session_loginid").value;
	usname=usname+"_"+actionflg;
	document.getElementById("waiting").style.display='none';
	myGridUpload = new dhtmlXGridObject('uploadgrid');		
	myGridUpload.setImagePath("codebase/imgs/");	
	myGridUpload.setHeader("FILE_ID,MAIN_ID,TYPE,FILE NAME,UPLOAD STATUS,dummy,SELECT", null,["text-align:left;","text-align:right;","text-align:left;","text-align:left;","text-align:left;","text-align:center;"]);
	myGridUpload.setInitWidths("0,0,200,450,100,0,150");	
	//myGrid.setColAlign("left,right,left,left,left,right");
	myGridUpload.setColTypes("ro,ro,tree,ro,ro,ro,ro");
	myGridUpload.setColSorting("str,str,str,str,str,str,str");
	myGridUpload.attachEvent("onRowSelect", doOnUploadRowSelected);
	myGridUpload.attachEvent("onRowCreated",function(id){
		//if (myGridUpload.cellById(id,1).getValue().length!=0)
		 //{
			if (myGridUpload.cellById(id,3).getValue().length==0)
			 {
				myGridUpload.cells(id,6).setValue("<input type='button' value='Upload All'>");
			 }
			else{
				myGridUpload.cells(id,6).setValue("<input type='button' value='Upload'>");
			}
		// }
	        return true;
	      });
	myGridUpload.enableTreeCellEdit(false);
	myGridUpload.enableSmartRendering(true);
	myGridUpload.init();	
	
	alert("File Loading...");
	myGridUpload.load("temp/"+usname+".xml","xml");
 }

function doOnUploadRowSelected(rowId, cellId) 
{
	var filename=myGridUpload.cellById(rowId,3).getValue();
	var imgid=myGridUpload.cellById(rowId,0).getValue();
	var rmainid=myGridUpload.cellById(rowId,1).getValue();
	var downloadstatus=myGridUpload.cellById(rowId,4).getValue();
	var dwncount=0;
	var childcnt=0;
	var dataArr = [];
	
	if (cellId == 6) 
	{
		//if(rmainid.length!=0){
			
			if(filename.length==0){
				
				myGridUpload.forEachRow(function(id)
							{
							var mainid=myGridUpload.cellById(id,1).getValue();
								if(imgid==mainid){
									childcnt++;
									var dwnflg=myGridUpload.cellById(id,4).getValue();
									if(dwnflg=='No'){
											dwncount++;
									}
								}
							});
				}
			
			var uploaddonefile=0;
			if(filename.indexOf(".img.done")!=-1){
				var res = filename.substring(0, filename.length-5);
				myGridUpload.forEachRow(function(id)
						{
							var imgFileName=myGridUpload.cellById(id,3).getValue();
							if(res==imgFileName){
								var yesnoflg=myGridUpload.cellById(id,4).getValue();
								if(yesnoflg=="No"){
									uploaddonefile++;
									alert("Please Upload "+imgFileName+" File First.");
								}
							}
					});
				}
			else if(filename.indexOf(".XML.done")!=-1){
				var res = filename.substring(0, filename.length-5);
				myGridUpload.forEachRow(function(id)
						{
							var imgFileName=myGridUpload.cellById(id,3).getValue();
							if(res==imgFileName){
								var yesnoflg=myGridUpload.cellById(id,4).getValue();
								if(yesnoflg=="No"){
									uploaddonefile++;
									alert("Please Upload "+imgFileName+" File First.");
								}
							}
					});
				}
		if(uploaddonefile==0){
			if(childcnt>0 || filename.length!=0){
			if(dwncount>0 || downloadstatus=="No"){
				
				
				
				
			if (confirm("Do You Wan't To Upload File")) {
				if(filename.length==0){
					myGridUpload.forEachRow(function(id)
						{
							var mainid=myGridUpload.cellById(id,1).getValue();
							if(imgid==mainid){
								
								if(myGridUpload.cellById(id,4).getValue()=="No"){
								myGridUpload.cellById(id,4).setValue("Yes");
								dataArr.push({	
									
									FILENAME:myGridUpload.cells(id,3).getValue(),
																	
								});
							 }
							}
						});
				}
				else{
					myGridUpload.cellById(rowId,4).setValue("Yes");
					dataArr.push({	
						
						FILENAME:filename,
														
					});
				}
				
				
				document.getElementById("waiting").style.display='';
				var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/download_upload_FTPfile.jsp?action=UPLOAD&JSONFILE="+JSON.stringify(dataArr);
				cts_Ajax_download_ftp_file(encodeURI(baseurl));
				
			}
			}
			else{
				alert("File Are Alredy Uploaded");
			}
		}
			else{
				alert("File Not Available");
			}
	}
		//}
	}
}

