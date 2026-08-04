function onLoad_config()
{
		alert("onLoad_config");

		var d=document.getElementById("menu_admin");
		d.className = ' active';
		document.getElementById("txt_bankcode").focus();
		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);
		if(val!="N")
		{//1
			alert(val);
			var baseurl=document.URL;
			var p = baseurl.lastIndexOf("?");
			baseurl = baseurl.substr(0,p);
			alert(baseurl);
			location.replace(baseurl);

		}//1
		else
		{
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
				fetch_saved_config();
			}
		}
}



function fetch_saved_config()
{
	//alert("fetch_saved_config()");
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{

		alert("Your Session Has Been Expired... Please Login Again...");
		/*var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"login.jsp?flag=1";
		location.replace(baseurl1);*/
		menuOnClick("login.jsp");

	}
	else
	{

		var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"jsp/fetch_saved_config.jsp";
		//alert("baseurl1:"+baseurl1);
		//location.replace(baseurl1);
		cts_AjaxData_fetch_saved_config(baseurl1);
	}
}

function cts_AjaxData_fetch_saved_config(url)
{
	//alert ("Retriving Data");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_fetch_saved_config;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_fetch_saved_config;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}

function cts_process_fetch_saved_config()
{

  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;

			record=res;
			//alert("res:"+res);
			set_saved_config(res);
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function set_saved_config(res)
{
	//alert("in set_saved_config()");
	if(res.indexOf('FAIL') > -1)
	{
		alert("Some Problem At Server. Please Login Again."); //case-if tomcat restarted
		/*var baseurl1=document.URL;
		var p=baseurl1.lastIndexOf('/');
		baseurl1=baseurl1.substr(0,p+1);
		baseurl1=baseurl1+"login.jsp?flag=1";
		location.replace(baseurl1);
		*/
		menuOnClick("login.jsp");
	}
	else
	{
		if(res.indexOf('GETDATAFROMADMIN') > -1)
		{
			alert("Some Initial Configuration Values Are Missing. Please Contact System Administrator!");
			/*var baseurl1=document.URL;
			var p=baseurl1.lastIndexOf('/');
			baseurl1=baseurl1.substr(0,p+1);
			baseurl1=baseurl1+"login.jsp?flag=1";
			location.replace(baseurl1);*/
			menuOnClick("login.jsp");
		}
		if(res.indexOf('!#!') > -1)
		{//1st if

			var reclist = res.split('!#!');
			//alert(reclist);
			for (var i=0; i<=reclist.length; i++)
			{//1 st for
				//alert("reclist[i]	:"+reclist[i]);

////////////////BANK CODE
				if(i==0)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_bankcode").value=reclist[i];
					}
					else
					{
						document.getElementById("txt_bankcode").value='';
					}
				}

////////////////Upload Path (To CHI)
				if(i==1)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_uploadpath_to_chi").value=reclist[i];
						document.getElementById("txt_uploadpath_to_chi").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_uploadpath_to_chi").value='';
					}
				}

////////////////Download Path (From CHI)
				if(i==2)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_downloadpath_from_chi").value=reclist[i];
						document.getElementById("txt_downloadpath_from_chi").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_downloadpath_from_chi").value='';
					}
				}

////////////////Archive Download Path (To CHI)
				if(i==3)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_arch_downloadpath_from_chi").value=reclist[i];
						document.getElementById("txt_arch_downloadpath_from_chi").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_arch_downloadpath_from_chi").value='';
					}
				}

////////////////Archive Upload Path (To CHI)
				if(i==4)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_arch_uploadpath_to_chi").value=reclist[i];
						document.getElementById("txt_arch_uploadpath_to_chi").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_arch_uploadpath_to_chi").value='';
					}
				}

////////////////Security Originator Name
				if(i==5)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_sec_orgin_name").value=reclist[i];
						document.getElementById("txt_sec_orgin_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_sec_orgin_name").value='';
					}
				}

////////////////Security Authenticator Name
				if(i==6)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_sec_auth_name").value=reclist[i];
						document.getElementById("txt_sec_auth_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_sec_auth_name").value='';
					}
				}

////////////////Security Key Name
				if(i==7)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_sec_key_name").value=reclist[i];
						document.getElementById("txt_sec_key_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_sec_key_name").value='';
					}
				}

////////////////NPCI Version No
				if(i==8)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_npci_ver_no").value=reclist[i];
						document.getElementById("txt_npci_ver_no").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_npci_ver_no").value='';
					}
				}

////////////////Digital Signature Method
				if(i==9)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_dig_sign_method").value=reclist[i];
						document.getElementById("txt_dig_sign_method").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_dig_sign_method").value='';
					}
				}

////////////////Security Key Size
				if(i==10)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_sec_key_size").value=reclist[i];
						document.getElementById("txt_sec_key_size").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_sec_key_size").value='';
					}
				}

////////////////Keystore Filename
				if(i==11)
				{
					if(reclist[i]!='null' || reclist[i]!='')
					{
						document.getElementById("txt_keystore_filenm").value=reclist[i];
						document.getElementById("txt_keystore_filenm").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_keystore_filenm").value='';
					}
				}

////////////////Keystore Password
				if(i==12)
				{

					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_keystore_pwd").value=reclist[i];
						document.getElementById("txt_keystore_pwd").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_keystore_pwd").value='';
					}
				}

////////////////Keystore Alias
				if(i==13)
				{

					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_keystore_alias").value=reclist[i];
						document.getElementById("txt_keystore_alias").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_keystore_alias").value='';
					}
				}

////////////////Inward File Split Style

				if(i==14)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("opt_inward_split_style").value=reclist[i];
						document.getElementById("opt_inward_split_style").title=reclist[i];
					}
					else
					{
						document.getElementById("opt_inward_split_style").value='0';
					}

				}

				//Our Version No
				if(i==15)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_our_verno").value=reclist[i];
						document.getElementById("txt_our_verno").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_our_verno").value='';
					}

				}
				
				//txt_bank_Name 
				if(i==16)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_bank_Name").value=reclist[i];
						document.getElementById("txt_bank_Name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_bank_Name").value='';
					}

				}
				//CHI bank name
				if(i==17)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_chi_bankname").value=reclist[i];
						document.getElementById("txt_chi_bankname").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_chi_bankname").value='';
					}

				}
				
				// txt_vendor_id
				if(i==18)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_vendor_id").value=reclist[i];
						//document.getElementById("txt_vendor_id").value="LIST";
						document.getElementById("txt_vendor_id").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_vendor_id").value='';
					}

				}
				
				// txt_vendor_name
				if(i==19)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_vendor_name").value=reclist[i];
						document.getElementById("txt_vendor_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_vendor_name").value='';
					}

				}
				
				// txt_hub_location_name
				if(i==20)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_hub_location_name").value=reclist[i];
						document.getElementById("txt_hub_location_name").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_hub_location_name").value='';
					}

				}
				
				// txt_hub_location_id
				if(i==21)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_hub_location_id").value=reclist[i];
						document.getElementById("txt_hub_location_id").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_hub_location_id").value='';
					}

				}
				
				// txt_core_system
				if(i==22)
				{
					if(reclist[i] != 'null' || reclist[i] != '')
					{
						document.getElementById("txt_core_system").value=reclist[i];
						document.getElementById("txt_core_system").title=reclist[i];
					}
					else
					{
						document.getElementById("txt_core_system").value='';
					}

				}
			}//--1 st for
		}//--1st if
		else
		{

		}
	}
}
function afterReset_config()
{
	onLoad_config();
}
function afterSave_config()
{
	//alert("in afterSave_config()");
	var flag = beforeSaveConfig();
	//alert("flag:"+flag);
	if(flag == 1)
	{
		document.getElementById("txt_our_verno").disabled=false;

		document.getElementById("txt_sec_orgin_name").disabled=false;
		document.getElementById("txt_sec_auth_name").disabled=false;
		document.getElementById("txt_sec_key_name").disabled=false;
		document.getElementById("txt_sec_key_size").disabled=false;
		document.getElementById("txt_dig_sign_method").disabled=false;
		document.getElementById("txt_npci_ver_no").disabled=false;

		document.getElementById("formid").action="jsp/save_config.jsp";
		document.getElementById("formid").submit();
	}
}
function beforeSaveConfig()
{
	//alert("in beforeSaveConfig()");


	var txt_bankcode=document.getElementById("txt_bankcode").value;
	var txt_our_verno=document.getElementById("txt_our_verno").value;

	var txt_uploadpath_to_chi=document.getElementById("txt_uploadpath_to_chi").value;
	var txt_downloadpath_from_chi=document.getElementById("txt_downloadpath_from_chi").value;

	var txt_arch_uploadpath_to_chi=document.getElementById("txt_arch_uploadpath_to_chi").value;
	var txt_arch_downloadpath_from_chi=document.getElementById("txt_arch_downloadpath_from_chi").value;


	var txt_sec_orgin_name=document.getElementById("txt_sec_orgin_name").value;
	var txt_sec_auth_name=document.getElementById("txt_sec_auth_name").value;

	var txt_sec_key_name=document.getElementById("txt_sec_key_name").value;
	var txt_sec_key_size=document.getElementById("txt_sec_key_size").value;

	var txt_dig_sign_method=document.getElementById("txt_dig_sign_method").value;
	var txt_npci_ver_no=document.getElementById("txt_npci_ver_no").value;

	var txt_keystore_filenm=document.getElementById("txt_keystore_filenm").value;
	var txt_keystore_pwd=document.getElementById("txt_keystore_pwd").value;

	var txt_keystore_alias=document.getElementById("txt_keystore_alias").value;
	var opt_inward_split_style=document.getElementById("opt_inward_split_style").value;
	
	var txt_chi_bankname=document.getElementById("txt_chi_bankname").value;
	var txt_vendor_id=document.getElementById("txt_vendor_id").value;

	var txt_vendor_name=document.getElementById("txt_vendor_name").value;
	var txt_hub_location_name=document.getElementById("txt_hub_location_name").value;

	var txt_hub_location_id=document.getElementById("txt_hub_location_id").value;
	var txt_core_system=document.getElementById("txt_core_system").value;


	//bankcode validation
	if(txt_bankcode == '')
	{
		alert("Please Enter Bank Code!");
		document.getElementById("txt_bankcode").focus();
		flag = 0;
	}
	else if(isNaN(txt_bankcode))
	{
		alert("Bank Code should be numeric");
		document.getElementById("txt_bankcode").value="";
		document.getElementById("txt_bankcode").focus();
		flag = 0;
	}
	else if(txt_bankcode.length > 9 || txt_bankcode.length < 9)
	{
		alert("Bank Code Length Should Be Equal To 9.");
		document.getElementById("txt_bankcode").focus();
		flag = 0;
	}
	else if(txt_our_verno == '')
	{
		alert("Please Enter Product Version Number!");
		document.getElementById("txt_our_verno").focus();
		flag = 0;
	}
	else if(txt_uploadpath_to_chi == '')
	{
		alert("Please Enter Upload Files To CHI Path!");
		document.getElementById("txt_uploadpath_to_chi").focus();
		flag = 0;
	}
	else if(!validate_path(txt_uploadpath_to_chi))
	{
		alert("Upload Files To CHI Path Should Contain Only Forward Slash('/').");
		document.getElementById("txt_uploadpath_to_chi").focus();
		flag = 0;
	}
	else if(txt_downloadpath_from_chi == '')
	{
		alert("Please Enter Download Files From CHI Path!");
		document.getElementById("txt_downloadpath_from_chi").focus();
		flag = 0;
	}
	else if(!validate_path(txt_downloadpath_from_chi))
	{
		alert("Download Files From CHI Path Should Contain Only Forward Slash('/').");
		document.getElementById("txt_downloadpath_from_chi").focus();
		flag = 0;
	}
	else if(txt_arch_uploadpath_to_chi == '')
	{
		alert("Please Enter Archile File Upload To CHI Path!");
		document.getElementById("txt_arch_uploadpath_to_chi").focus();
		flag = 0;
	}
	else if(!validate_path(txt_arch_uploadpath_to_chi))
	{
		alert("Archile File Upload To CHI Path Should Contain Only Forward Slash('/').");
		document.getElementById("txt_arch_uploadpath_to_chi").focus();
		flag = 0;
	}
	else if(txt_arch_downloadpath_from_chi == '')
	{
		alert("Please Enter Archile File Download From CHI Path!");
		document.getElementById("txt_arch_downloadpath_from_chi").focus();
		flag = 0;
	}
	else if(!validate_path(txt_arch_downloadpath_from_chi))
	{
		alert("Archile File Download From CHI Path Should Contain Only Forward Slash('/').");
		document.getElementById("txt_arch_downloadpath_from_chi").focus();
		flag = 0;
	}
	else if(txt_sec_orgin_name == '')
	{
		alert("Please Enter Security Originator Name!");
		document.getElementById("txt_sec_orgin_name").focus();
		flag = 0;
	}
	else if(txt_sec_auth_name == '')
	{
		alert("Please Enter Security Authenticator Name!");
		document.getElementById("txt_sec_auth_name").focus();
		flag = 0;
	}
	else if(txt_sec_key_name == '')
	{
		alert("Please Enter Security Key Name!");
		document.getElementById("txt_sec_key_name").focus();
		flag = 0;
	}
	else if(txt_sec_key_size == '')
	{
		alert("Please Enter Security Key Size!");
		document.getElementById("txt_sec_key_size").focus();
		flag = 0;
	}
	else if(isNaN(txt_sec_key_size))
	{
		alert("Security Key Size should be numeric");
		document.getElementById("txt_sec_key_size").value="";
		document.getElementById("txt_sec_key_size").focus();
		flag = 0;
	}
	else if(txt_dig_sign_method == '')
	{
		alert("Please Enter Digital Signature Method!");
		document.getElementById("txt_dig_sign_method").focus();
		flag = 0;
	}
	else if(txt_npci_ver_no == '')
	{
		alert("Please Enter NPCI Version Number!");
		document.getElementById("txt_npci_ver_no").focus();
		flag = 0;
	}
	else if(txt_keystore_filenm =='')
	{
		alert("Please Enter Keystore Filename!");
		document.getElementById("txt_keystore_filenm").focus();
		flag = 0;
	}
	else if(txt_keystore_pwd == '')
	{
		alert("Please Enter Keystore Password!");
		document.getElementById("txt_keystore_pwd").focus();
		flag = 0;
	}
	else if(txt_keystore_pwd.length > 6 || txt_keystore_pwd.length < 6)
	{
		alert("Keystore Password Length Should Be Equal To 6.");
		document.getElementById("txt_keystore_pwd").focus();
		flag = 0;
	}
	else if(txt_keystore_alias == '')
	{
		alert("Please Enter Keystore Alias!");
		document.getElementById("txt_keystore_alias").focus();
		flag = 0;
	}
	else if(opt_inward_split_style == '0')
	{
		alert("Please Select Inward Split Style!");
		document.getElementById("opt_inward_split_style").focus();
		flag = 0;
	}
	
	else if(txt_chi_bankname == '0')
	{
		alert("Please Select CHI Bank Name!");
		document.getElementById("txt_chi_bankname").focus();
		flag = 0;
	}
	else if(txt_vendor_id == '')
	{
		alert("Please Enter Vendor Id!");
		document.getElementById("txt_vendor_id").focus();
		flag = 0;
	}
	else if(isNaN(txt_vendor_id))
	{
		alert("Vendor Id should be numeric");
		document.getElementById("txt_vendor_id").value="";
		document.getElementById("txt_vendor_id").focus();
		flag = 0;
	}
	else if(txt_vendor_id.length > 5 || txt_vendor_id.length < 5)
	{
		alert("Vendor Id Length Should Be Equal To 5.");
		document.getElementById("txt_vendor_id").focus();
		flag = 0;
	}
	else if(txt_hub_location_id == '')
	{
		alert("Please Enter Hub Location Id!");
		document.getElementById("txt_hub_location_id").focus();
		flag = 0;
	}
	else if(isNaN(txt_hub_location_id))
	{
		alert("Hub Location Id should be numeric");
		document.getElementById("txt_hub_location_id").value="";
		document.getElementById("txt_hub_location_id").focus();
		flag = 0;
	}
	else if(txt_hub_location_id.length > 3 || txt_hub_location_id.length < 3)
	{
		alert("Hub Location Id Length Should Be Equal To 3.");
		document.getElementById("txt_hub_location_id").focus();
		flag = 0;
	}
	else if(txt_core_system == '0')
	{
		alert("Please Select Core System!");
		document.getElementById("txt_core_system").focus();
		flag = 0;
	}
	else
	{
		flag = 1;
	}
	return flag;
}
function validate_path(path_val)
{
	if(path_val.indexOf("\"")>-1 || path_val.indexOf("\\")>-1 || path_val.indexOf("?")>-1 || path_val.indexOf("<")>-1 || path_val.indexOf("<")>-1 || path_val.indexOf("*")>-1 ||path_val.indexOf("|")>-1)
	{
		return false;
	}/// ? < > \ : * | �

	else
	{
		return true;
	}
} 