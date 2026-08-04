

var transCode="";
//This  Function Is USewd To Call ajax page
function callAjax(urname)
{
	try
	{
		document.getElementById("waiting").style.display='';
	}
	catch(e)
	{
		
	}
	//alert("a===="+urname);
	$.ajax(
	{
	    type: "GET",
	    url: urname,
	    dataType: "json",
	    success: function(response)
	    {    
	    	//alert("success");
	    	try
	    	{
	    		document.getElementById("waiting").style.display='none';
	    	}
	    	catch(e)
	    	{
	    		
	    	}
	    	success_ajax(response);
	    },
		error: function(e) 
		{
			//alert("error");
			try
	    	{
	    		document.getElementById("waiting").style.display='none';
	    	}
	    	catch(e)
	    	{
	    		
	    	}
			error_ajax(e);
	    },
	    complete: function () {
	        // Handle the complete event
	        //alert("ajax completed ");
	      }
	});
	//alert(21);
}
//This Function IS used to Add Dynamic Value in select Box
function add_item(selIdd,Optvalue,displaytext)
{
	var temp =Optvalue;

	// Create New Option.
	var newOption = $('<option>');
	newOption.attr('value', temp).text(displaytext);
	
	// Append that to the DropDownList.
	$('#'+selIdd).append(newOption);
	
	// Select the Option.
	//$("#dptcentres_edit > [value=" + temp + "]").attr("selected", "true");	
}
function callWebservice(webServiceName,methodName,paraString) 
{
	//alert("inside callWebservice showing progress bar");
	$("#ajaxloader").show();
	//$("#ajaxloader").hide();
    var webserUrl = "http://"+$("#wsurl").val()+"/axis2/services/"+webServiceName;
          var soapRequest =
'<?xml version="1.0" encoding="utf-8"?>' +
          '<soapenv:Envelope ' + 
              'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
              'xmlns:api="http://test.list" ' +
              'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
              'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">' +
              '<soapenv:Body>' +
                  '<api:'+methodName+' soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
                       paraString+
                  '</api:'+methodName+'>' +
              '</soapenv:Body>' +
          '</soapenv:Envelope>';
         // $.support.cors = true;
          $.ajax({
        	
              type: "POST",
              url: webserUrl,
              contentType: "text/xml; charset=\"utf-8\"",
              crossDomain: true,
              xhrFields: {
            	    // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            	    // This can be used to set the 'withCredentials' property.
            	    // Set the value to 'true' if you'd like to pass cookies to the server.
            	    // If this is enabled, your server must respond with the header
            	    // 'Access-Control-Allow-Credentials: true'.
            	    withCredentials: false
            	  },

            	  headers: {
            	    // Set any custom headers here.
            	    // If you set any non-simple headers, your server must include these
            	    // headers in the 'Access-Control-Allow-Headers' response header.
            	 
            	  
            	  },

              dataType: "xml",
              data: soapRequest,
              success: SuccessOccur,
              error: ErrorOccur//,
              
          });
      function SuccessOccur(data, status, req) {
			if (status == "success")
			{
				//alert(req.responseText);
				//var respText=(req.responseText).replace("<ns:return>","retVal");
				//alert(respText);
				var elements=req.responseText;//$.parseXML(req.responseText).getElementsByTagName("ns:return");
				var values=new Array();
				var stIndex=0,endIndex=0;
				for(var i=0;stIndex<=elements.length;)
				{
					stIndex=elements.indexOf("<ns:return>",endIndex);
					if(stIndex==-1)break;
					//alert(stIndex);
					endIndex=elements.indexOf("ns:return",stIndex+2);
					//alert(endIndex-3);
					values[i++]=elements.substring(stIndex+11,endIndex-2);
					stIndex=stIndex+5;
				}
				//var elements=$.parseXML("<elements><element><value1>1</value1></element><element><value1>2</value1></element><element><value1>3</value1></element></elements>").getElementsByTagName("value1");
				//alert(elements.length);
				/*for(var i=0;i<values.length;i++)
				{
					alert(values[i]);
				}*/
				//alert(values);
				success_ajax(JSON.parse(values));
				//alert("inside SuccessOccur hiding progress bar");
				$("#ajaxloader").hide();
			}
		}
		function ErrorOccur(data, status, req) {
			//alert(req.responseText + " " + status);
			 error_ajax(req.responseText + " " + status);
			// alert("inside ErrorOccur hiding progress bar");
			 $("#ajaxloader").hide();
		}
  }
// This function add radio button to an given div
/*
 div_id =  id of the div where you want to append radio button(s)
 radio_grp_name = ex- if you are displaying sex then "sex" will be  radio_grp_name for male, female and others
 radio_value = value to be used for further coding ("F" for female, "M" for male)
 radio_displaytext = display value for radio button ("Female", "Male") 
 */
function getParameterString(paraName,paraValue)
{   // '<tranCd xsi:type="xsd:string">ECS</tranCd>'+
	var len = paraName.length;
	var mnstr="";
    if(len == 0) return;
    //
    for(var i=0; i< len; i++)
    {
    	
    	if(i==0)
    		mnstr="?"+paraName[i]+"="+paraValue[i]; 
    	else
    		mnstr=mnstr+"&"+paraName[i]+"="+paraValue[i];      
    }
    //alert(mnstr);
    return mnstr;
    
}
function add_radio(div_id, radio_grp_name, radio_value,radio_displaytext)
{
		$('#'+div_id).append("<div>");
		var radioclass = radio_grp_name;
		var temp = "<input id=\""+radio_value+"\" type=\"radio\" name=\""+radioclass+"\"value=\""+radio_value+"\"/>";
		$('#'+div_id).append(temp);
	    temp = "<label for=\""+radio_value+"\"><span><span><span></span></span></span>"+radio_displaytext+"</label>";
	    $('#'+div_id).append(temp);
	    $('#'+div_id).append("</div>");	
}
function isBlank(val)
{
	if (!val || val.length == 0) 
	{
        return true;
    }	
    return !/[^\s]+/.test(val);
}
function isSpecialChar(val)
{
	 if( /[^\ \a-zA-Z0-9\-\/]/.test( val ) ) 
	 {
		 return true;
	 }
     return false; 
}
function getDisplayDate(val)//ddmmyyyy to dd-mm-yyyy
{
	var returnDate= val.substring(0,2)+"-"+val.substring(2,4)+"-"+val.substring(4,8);
	//alert(returnDate);
	return returnDate;
}
function getddmmyyyy(val)//ddmmyyyy to dd-mm-yyyy
{
	var returnDate= val.split("-")[0]+val.split("-")[1]+val.split("-")[2];
	//alert(returnDate);
	return returnDate;
}
function getRole(userJson,val)//val is transaction code
{
	var UserRole="";
	//alert("in getRolehhhhhhhhh=="+userJson+"\n val=="+val);
	$.each(JSON.parse(userJson), function(index, item) 
	{
		UserRole=item['ROLE'];
		transCode=item['TRANCODE'];
		//alert(UserRole+"   "+transCode);
		
		if(transCode==val)
		{
			//alert("in if********************UserRole="+UserRole);
			return false;
		}
		//alert(UserRole+"   "+transCode);
	});
	return UserRole;
}
function hasAdminRole(userJson)//returns true if having admin auth
{
	var val=false;
	//alert(userJson);
	$.each(JSON.parse(userJson), function(index, item) 
	{
		
		UserRole=item['ROLE'];
		transCode=item['TRANCODE'];
		
		if(UserRole.indexOf("A")>-1)
		{
			
			val=true;
		}
		//alert(UserRole+"   "+transCode);
		
	});
	return val;
}
function hasReportRole(userJson)//returns true if having checker auth
{
	var val=false;
	//alert(userJson);
	$.each(JSON.parse(userJson), function(index, item) 
	{
		
		UserRole=item['ROLE'];
		transCode=item['TRANCODE'];
		
		if(UserRole.indexOf("C")>-1)
		{
			
			val=true;
		}
		//alert(UserRole+"   "+transCode);
		
	});
	return val;
}
function hasMakerRole(userJson)//returns true if having maker auth
{
	var val=false;
	//alert(userJson);
	$.each(JSON.parse(userJson), function(index, item) 
	{
		
		UserRole=item['ROLE'];
		transCode=item['TRANCODE'];
		
		if(UserRole.indexOf("M")>-1)
		{
			
			val=true;
		}
		//alert(UserRole+"   "+transCode);
		
	});
	return val;
}
function setJSON()
{
	userJson=$("#user_role_json").val();
	
	//alert("userJSON "+userJson);
}

/*
 *	 Author: Anand
 *	 Function returns Sum of Column specified by colNumber 	*/
function getGridColumnSum(gridId,colNum)
{
	var sum = 0;
	gridId.forEachRow(function(id) {
        sum+=Number(gridId.cells(id,colNum).getValue());
	});
	return sum;
}

/*
 *	 Author: Anand
 *	 Function returns total no of Checked Column specified by colNumber 	*/
function getGridColumnChecked(gridId,colNum)
{
	var counter = 0;
	gridId.forEachRow(function(id) {
		if(gridId.cells(id,colNum).getValue()==1)
			counter+=1;
	});
	return counter;
}

function commonDoOnClick(jspName)
{
//	document.getElementById("p_dummy").value=document.getElementById("p_dummy_session").value;
    var jsp=jspName;
	//alert("jsp:"+jsp);
	try
	{
		jsp=extraDoOnClick(jspName);
	}catch(e){jsp=jspName}
	if(jsp!="null")
	{
		var formObject=document.forms[0];
		formObject.action=jsp;
		formObject.method="post"
		formObject.submit();
	}
}

function getTodayDate() 
{
	var today = new Date().getDate()+"-";
	
	if((new Date().getDate()) < 10)
	{
		today = "0"+today;
	}
	if((new Date().getMonth()+1) < 10)
	{
		today = today+"0"+(new Date().getMonth()+1)+"-"+new Date().getFullYear();
	}
	else
	{
		today = today+(new Date().getMonth()+1)+"-"+new Date().getFullYear();
	}
	
	//alert("today=="+today);
	return today;
}	
function checkSession()
{
	var sessionid=	$("#sessionuserid").val();
	
	if(sessionid==""||sessionid==null||sessionid=="null")
	{
		
		alert("Your Session Has bin Expired !! Please Log in..");
		location.replace("index.jsp");
	}
}
function ValidatePAN(panNo) 
{
	if (panNo.value != '') 
	{
		var pancardPattern = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
		var patternArray = panNo.match(pancardPattern);
		if (patternArray == null) 
		{
			return false;
		}
		else
			return true;
	}
	else
		return false;
}
function ValidatePassport(passportNo) 
{
	if (passportNo.value != '') 
	{
		var pancardPattern = /^([a-zA-Z]{1})(\d{7})$/;
		var patternArray = passportNo.match(pancardPattern);
		if (patternArray == null) 
		{
			return false;
		}
		else
			return true;
	}
	else
		return false;
}
function ValidateTAN(tanNo) 
{
	if (tanNo.value != '') 
	{
		var pancardPattern = /^([a-zA-Z]{4})(\d{5})([a-zA-Z]{1})$/;
		var patternArray = tanNo.match(pancardPattern);
		if (patternArray == null) 
		{
			return false;
		}
		else
			return true;
	}
	else
		return false;
}
function ValidateVoterId(voterId) 
{
	if (voterId.value != '') 
	{
		var pancardPattern = /^([a-zA-Z]{3})(\d{7})$/;
		var patternArray = voterId.match(pancardPattern);
		if (patternArray == null) 
		{
			return false;
		}
		else
			return true;
	}
	else
		return false;
}
function ValidateDrivingLicence(DLNo) 
{
	if (DLNo.value != '') 
	{
		var pancardPattern = /^([a-zA-Z]{2})(\d{13})$/;
		var patternArray = DLNo.match(pancardPattern);
		if (patternArray == null) 
		{
			return false;
		}
		else
			return true;
	}
	else
		return false;
}
function ValidateUID(uid) 
{
	if(uid.length!=12)
		return false;
	else if(isNaN(uid))
		return false;
	else
		return true;
}
/*public static boolean validateMobNo(String mobNo)
{
	Pattern pattern = Pattern.compile("^[789]\\d{9}$");
    Matcher matcher = pattern.matcher(mobNo);

    if (matcher.matches()){
        System.out.println("valid");
        return true;
    }
    else{
        System.out.println("invalid");
        return false;
    }               
}*/

function isNumeric(str)
{
	var intRegex = /^\d+$/;
	//var floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
	//if(intRegex.test(str) || floatRegex.test(str)) {
	if(intRegex.test(str)) 
	{
	   return true;
	}
	else 
	{
		return false;
	}
}


function validate(str)
{
var regexp1=new RegExp("^[a-zA-Z0-9]+$");
//if(regexp1.test(document.getElementById("txt").value))
if(regexp1.test(str))
{
//alert("Only alphabets from a-z and A-Z are allowed");
return true;
}
return false;
}

function isEmail(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}



/*
 * Function Name: checkUserAuth
 * Description: This function checks wheather the user has authority of this program namely View/Entry/Authorise.
 * Parameters: authStr(from Session Variable), Program Code(from hidden field on JSP)
 * Returns: E for Entry, V for View & A for Authorise 
 * 
 * Author: AYB
 * For Module: BCBF Web Application
 * Date: 10-Oct-2017
 */
function checkUserAuth(authStr,progCode)
{
	var res = 'N';
	var authArr = authStr.split('~');
	
	//alert(progCode);
	for (i = 0; i < authArr.length; i++)
	{
    	var row = authArr[i].split('@');//entry, view, auth
    	//alert('Entered for '+row);
    	//alert(row[0]+"*====="+progCode);
    	if(row[0]==progCode)
		{
    		//alert('OMG>'+row[3]+"=="+row[2]+"=="+row[1]);
    		if(row[3]=='Y')
			{
    			//alert('Auth');
    			res = 'A';
    			break;
			}
    		else if(row[2]=='Y')
			{
    			//alert("View");
    			res = 'V';
    			break;
			}
    		else if(row[1]=='Y')
    		{
    			//alert("Entry");
    			res = 'E';
    			break;
			}
		}
    	//alert('Exit from '+row);
	}
	return res;
}

function validateDate(dtValue)
{
var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
return dtRegex.test(dtValue);
}