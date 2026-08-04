


function save_con_outwardchqs()
{
	//save and convert outward return cheques
	//alert("in save_con_outwardchqs()");
	document.getElementById("waiting").style.display='';
	var table = document.getElementById("tab_out_chq");
	var rowCount = table.rows.length;
	var chqs = '', chq_no = '',all_chq = '';
	var sel_cnt = 0;
	var flag = 'OK';
	for(var i=1; i<rowCount; i++) 
	{
		var row = table.rows[i];
		//alert("row :"+row);	
		var chkbox = row.cells[2].childNodes[0];	
		//alert("chkbox :"+chkbox.checked);
		var obj=document.getElementById("txt_chqno"+i);
		
		if(true == chkbox.checked) 
		{
			sel_cnt ++;
			var sel_chq = obj.value.split(':')[0];
			if(all_chq.indexOf(sel_chq) > -1)
			{
				flag = 'DUPLICATE';
			}
			//all_chq = "f_"+sel_chq+".tif"+"!@!"+"r_"+sel_chq+".tif"+"!@!"+"f_"+sel_chq+"_G.jpg" + "!@!";
			all_chq = "f_"+sel_chq+".tif"+"!@!";//+"r_"+sel_chq+".tif"+"!@!"+"f_"+sel_chq+"_G.jpg" + "!@!";
			/*
			all_chq = "f_121952"
			*/
			chqs = chqs + all_chq;
			//chq_no = chq_no +sel_chq+"!@!";
		}
	}
	//alert("chqs :"+chqs);
	//alert("chq_no :"+chq_no);
	//alert("sel_cnt::"+sel_cnt);
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{
		
		alert("Your Session Has Been Expired. Please Login Again.");
		/*var baseurl=document.URL;
		var p=baseurl.lastIndexOf('/');
		baseurl=baseurl.substr(0,p+1);
		baseurl=baseurl+"login.jsp?flag=1";
		location.replace(baseurl);*/
		document.getElementById("formid").action="login.jsp";					
		document.getElementById("formid").submit();
	}
	else
	{
	
		if(sel_cnt == 0)
		{
			alert("Please Select Cheque(s) To Upload.");
			document.getElementById("waiting").style.display='none';
		}
		else
		{
			if(flag == 'DUPLICATE')
			{
				alert("Duplicate Cheque Number Selected.");
				document.getElementById("waiting").style.display='none';
			}
			else
			{
				document.getElementById("formid").action="jsp/UploadServlet.jsp?fileName="+chqs;					
				document.getElementById("formid").submit();
				document.getElementById("waiting").style.display='none';
			}
		}
	}	
}