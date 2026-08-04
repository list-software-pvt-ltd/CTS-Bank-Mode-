// JavaScript Document

function doOnLoad()
{
	var url=document.URL;
	var p=url.lastIndexOf('/');
	var urlbase=url.substr(0,p+1);
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{
		alert("Your Session Has Been Expired. Please Login Again.");
		/*baseurl=urlbase+"login.jsp?flag=1";
		location.replace(baseurl);*/
		document.getElementById("formid").action="login.jsp";
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();
	}
	else
	{
		//alert('baseurl:>>'+urlbase);
		document.getElementById("waitProgress").style.display='';
		urlbase=urlbase+"jsp/getCOWarningCheques.jsp";
		cts_ajax_getCOWarningCheques(urlbase);
	}
}

function cts_ajax_getCOWarningCheques(url)
{
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_getCOWarningCheques;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange=cts_process_getCOWarningCheques;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}//cts_process_getCOWarningCheques

function cts_process_getCOWarningCheques()
{
	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;
			//alert('res:>>'+res);
			if(!(res.indexOf('Exception')>-1))
			{
				if(res.indexOf('No Data Found')>-1)
				{
					//alert('No Data Found');	
					document.getElementById('lbl_msg').innerHTML=res.split('!Q!')[0]+". Please Close This Window.";
				}
				else
				{
						var allRec=res.split("!Q!");
						 var len=allRec.length;
						// alert('len:>>>>'+len);
						 var tablevar="<table border='2'><tr><td width='10%'>BOFD&nbsp;</td><td width='10%'>Cheq No.&nbsp;&nbsp;&nbsp;&nbsp;</td><td width='10%'>Sort Code</td><td width='10%'>Trans Code</td><td width='10%'>Amount&nbsp;&nbsp;</td><td width='20%'>Payee Name&nbsp;&nbsp;&nbsp;&nbsp;</td><td width='13%'>Clearing Type</td><td>P2F</td><td>Warning</td></tr>";
						 for(i=0;i<len-1;i++)
						 {//1
							var  singleCheq=allRec[i];
							//alert('singleCheq:>>'+singleCheq);
							var cheqFileds=singleCheq.split("#");
							var  CLO_BOFD=cheqFileds[0];
							var  CLO_CHQNO=cheqFileds[1];
							var  CLO_SORTCD=cheqFileds[2];
							var  CLO_TRANCD=cheqFileds[3];
							var  CLO_AMOUNT=cheqFileds[4];
							var  CLO_PAYEE_ACCNM=cheqFileds[5];
							var  CLO_CLEARINGTYPE=cheqFileds[6];
							var  CLO_PPRTOFOLLOW=cheqFileds[7];
							//alert('CLO_PPRTOFOLLOW:??'+CLO_PPRTOFOLLOW);					
							var  WAR_DESC=cheqFileds[8];
							//alert('WAR_DESC:??'+WAR_DESC);	
		tablevar+="<tr><td>"+CLO_BOFD+"&nbsp;</td><td>"+CLO_CHQNO+"&nbsp;</td><td>"+CLO_SORTCD+"&nbsp;</td><td>"+CLO_TRANCD+"&nbsp;</td><td>"+CLO_AMOUNT+"&nbsp;</td><td>"+CLO_PAYEE_ACCNM.trim()+"&nbsp;</td><td>"+CLO_CLEARINGTYPE+"&nbsp;</td><td>"+CLO_PPRTOFOLLOW+"&nbsp;</td><td style='color:#FF0000'>"+WAR_DESC+"&nbsp;</td></tr>";					
						 }//1
						 tablevar+="</table>";						 
						 document.getElementById('cheqTbl').innerHTML=tablevar;
				}
				//document.getElementById("waitProgress").style.display='none';
			}
			else
			{
				//alert(res.split('!Q!')[0]);//error message
			//	alert('*************');
				document.getElementById("waitProgress").style.display='none';
				document.getElementById('cheqTbl').innerHTML=res.split('!Q!')[0]+". Please Close This Window.";
			}
		}
		else
		{
			document.getElementById("waitProgress").style.display='none';
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			
			//document.getElementById("waiting").style.display='none';
		}
	}
	document.getElementById("waitProgress").style.display='none';
}//cts_process_getCOWarningCheques
