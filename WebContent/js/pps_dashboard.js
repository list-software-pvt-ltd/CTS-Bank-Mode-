var session_branch_code;
var session_main_br_yn;
var totcount=0;
function onLoad()
{
	var session_loginid = document.getElementById("session_loginid").value;
	if(session_loginid == "null")
	{		
		alert("Your Session Has Been Expired. Please Login Again.");	
		//baseurl=baseurl+"login.jsp";
		//location.replace(baseurl);
		menuOnClick("login.jsp");
	}
	else{
		var d=document.getElementById("menu_ppsinterface");
		d.className = ' active';
		
	 $("#whattodo").val("NOTIFY");
		var params = [ 'whattodo' ];
		var dataTypes = [ 'String'  ];
		var values = [ 'NOTIFY'];
		var paraStr = getParameterString(params, values);
		callAjax("PPSController"+ paraStr);
	}
	$(".pendingforcreate").click(function() 
	{
		//location.replace('create_issuance_file.jsp');	
		document.getElementById("formid").action="create_issuance_file.jsp";
		document.getElementById("formid").method="POST";
		document.getElementById("formid").submit();
	});
	$(".pendingforread").click(function() 
	{
		if(totcount>0)
		{
				var v_confirm=confirm("Do You Want To Read Issuance File Response Manually ?");
				if (v_confirm)
				{
						document.getElementById("formid").action="read_issuance_file_manually.jsp";
						document.getElementById("formid").method="POST";
						document.getElementById("formid").submit();
				}
				else
				{
						document.getElementById("formid").action="read_issuance_file.jsp";
						document.getElementById("formid").method="POST";
						document.getElementById("formid").submit();
				}
			}	
			else
			{
				alert("No Any Pending Record Of Response File");
			}
	});
}//onLoad()
function success_ajax(response) {

	if (response.RESPCODE == 1) {
		alert("No Records pending!");
	} else {
		if (response.PENDING_FORCREATE == 0) {
			$(".noti_bubble").css("display", "none");

		} else {
			$('div.noti_bubble').text(response.PENDING_FORCREATE);
			$("#noti_bubble").css("display", "");
		}
		if (response.PENDING_FORREAD == 0) {
			$(".noti_bubble1").css("display", "none");

		} else {
			$('div.noti_bubble1').text(response.PENDING_FORREAD);
			totcount=response.PENDING_FORREAD;
			$("#noti_bubble1").css("display", "");
		}
	}
}
function error_ajax(e)
{
		alert("Error in Fetching Records" );
	
}