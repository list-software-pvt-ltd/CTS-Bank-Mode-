var data;
function onLoad_merging()
{
	//alert("*****Inside onLoad_merging()*****");
	//var val=document.getElementById("hdMsg1").value;
	
	var session_loginid = document.getElementById("session_loginid").value;
	//alert("session_loginid:"+session_loginid);
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
		var d=document.getElementById("menu_clearingOutward");
		d.className = ' active';

		var val=document.getElementById("hdMsg1").value;
		//alert("val :"+val);

		if(val!="N")
		{  
			alert(val);
			var url=document.URL.substring(0,document.URL.indexOf("?"));
			//location.replace(url);
			document.getElementById("formid").action="merging.jsp";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").submit();
			
			
			if(val=="SUCCESS")
			{
				var retVal = confirm("Do You Want To Verify ?");
	            if( retVal == true )
	            {
	            	//location.replace("verify_clearing.jsp");
	            	document.getElementById("formid").action="verify_clearing.jsp";
					document.getElementById("formid").method="POST";
					document.getElementById("formid").submit();
	            }
			}  
			
		}
		else
		       {
		           // ==================================================
		           // Urmila change - Validation before branch list
		           // Date : 08/08/2026
		           // ==================================================
				   document.getElementById("waiting").style.display = '';

				     var url = document.URL;

				     var p = url.lastIndexOf('/');

				     baseurl = url.substr(0, p + 1);

				     baseurl =
				         baseurl + "jsp/list_validation.jsp";

				     console.log(
				         "Calling list_validation.jsp : " +
				         baseurl
				     );

				     /*alert(
				         "Cheque validation started.\n\n" +
				         "Please wait..."
				     );
*/
				     cts_Ajax_list_validation(baseurl);
				   /*var hddoICallMerge=document.getElementById("hddoICallMerge").value;
				   			alert("hddoICallMerge:"+hddoICallMerge);
				   			if(hddoICallMerge=="Y")
				   			{
				   				//alert("list_branches"); \CTS\uploadpath_to_CHI
				   				document.getElementById("waiting").style.display='';
				   				var url=document.URL;
				   				var p=url.lastIndexOf('/');
				   				baseurl=url.substr(0,p+1);
				   				baseurl=baseurl+"jsp/list_branches.jsp";
				   				//location.replace(baseurl);
				   				cts_Ajax_list_branches(baseurl);
				   			}
				   			else
				   			{
				   				//alert("Clearing Outward File Creation Is Already Done For Today!");
				   				document.getElementById("waiting").style.display='';
				   				var url=document.URL;
				   				var p=url.lastIndexOf('/');
				   				baseurl=url.substr(0,p+1);
				   				baseurl=baseurl+"jsp/list_branches.jsp";
				   				//location.replace(baseurl);
				   				cts_Ajax_list_branches(baseurl);
				   			}*/
				   
		       }
	}
}


function cts_Ajax_list_branches(url)
{
	//alert ("Inside function cts_Ajax_list_branches");
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
		req.onreadystatechange = cts_process_list_branches;
		req.open("GET", url, true);
		req.send(null);
	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req)
		{
			req.onreadystatechange =  cts_process_list_branches;
			req.open("GET", url, true);
			req.send(null);
		}
	}
}
//Urmila change Regarding validation of cheques before showing list of branches date[08/08/2026]
function cts_Ajax_list_validation(url)
{
    console.log("========================================");
    console.log("Inside cts_Ajax_list_validation()");
    console.log("URL : " + url);
    console.log("========================================");

    document.getElementById("waiting").style.display = '';

    req = newXMLHttpRequest();

    if(req == null)
    {
        alert(
            "Unable to create AJAX request."
        );

        document.getElementById("waiting").style.display = 'none';

        return;
    }

    req.onreadystatechange = cts_process_validation;

    console.log(
        "Opening validation request..."
    );

    req.open(
        "GET",
        url,
        true
    );

    /*
     * Prevent cached response.
     */

    req.setRequestHeader(
        "Cache-Control",
        "no-cache"
    );

    console.log(
        "Sending validation request..."
    );

    req.send(null);
}
function newXMLHttpRequest()
{
    if(window.XMLHttpRequest)
    {
        return new XMLHttpRequest();
    }
    else
    {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}
//Urmila change Regarding validation of cheques before showing list of branches date[08/08/2026]


//Urmila change Regarding validation of cheques before showing list of branches date[10/08/2026]
function load_list_branches_after_validation()
{
    console.log("========================================");
    console.log("Loading list_branches.jsp");
    console.log("========================================");


    var hddoICallMerge =
        document.getElementById("hddoICallMerge").value;


    console.log(
        "hddoICallMerge = [" +
        hddoICallMerge +
        "]"
    );


    document.getElementById("waiting").style.display = '';


    var url = document.URL;

    var p = url.lastIndexOf('/');

    baseurl =
        url.substr(0, p + 1);

    baseurl =
        baseurl + "jsp/list_branches.jsp";


    console.log(
        "Calling list_branches.jsp : " +
        baseurl
    );


    /*
     * hddoICallMerge is only logged here.
     *
     * Both Y and non-Y currently call
     * list_branches.jsp in your original flow,
     * so no separate if/else is required.
     */

    cts_Ajax_list_branches(baseurl);
}

function cts_process_validation()
{
    console.log("========================================");
    console.log("Inside cts_process_validation()");
    console.log("ReadyState : " + req.readyState);
    console.log("Status     : " + req.status);
    console.log("========================================");

    if(req.readyState != 4)
    {
        return;
    }

    /*
     * Server error
     */
    if(req.status != 200)
    {
        document.getElementById("waiting").style.display = 'none';

        alert(
            "Unable to validate cheque data.\n\n" +
            "Please check the server connection."
        );

        return;
    }


    /*
     * Get response from list_validation.jsp
     */
    var res = req.responseText;

    console.log("RAW VALIDATION RESPONSE:");
    console.log("[" + res + "]");


    /*
     * Remove whitespace
     */
    res = res.replace(/^\s+|\s+$/g, "");

    console.log("CLEAN VALIDATION RESPONSE:");
    console.log("[" + res + "]");


    // =========================================================
    // SUCCESS
    // =========================================================

    if(res == "SUCCESS")
    {
        console.log("VALIDATION SUCCESS");

        load_list_branches_after_validation();

        return;
    }


    // =========================================================
    // FAILED
    // =========================================================

    else if(res.indexOf("FAILED#") == 0)
    {
        console.log("VALIDATION FAILED");

        var invalidData =
            res.substring("FAILED#".length);

        console.log(
            "Invalid Data : [" +
            invalidData +
            "]"
        );


        /*
         * Response format:
         *
         * BRANCH~CHEQUE~COLUMN_NAME~COLUMN_VALUE~EXPECTED|
         */
        var records =
            invalidData.split("|");


        /*
         * Object used to group multiple invalid
         * fields belonging to the same cheque.
         *
         * Example:
         *
         * Cheque 20333
         *   - Drawee Account Number
         *   - Payee Name
         *
         * will become:
         *
         * Cheque No. 20333 :
         * Drawee Account Number & Payee Name is invalid.
         */
        var chequeMap = {};


        /*
         * Process every invalid field
         */
        for(var i = 0; i < records.length; i++)
        {
            if(records[i] == "")
            {
                continue;
            }


            var data =
                records[i].split("~");


            var branchCode =
                data[0] || "";

            var chequeNo =
                data[1] || "";

            var columnName =
                data[2] || "";


            /*
             * Friendly display name
             */
            var displayColumnName = "";


            if(columnName == "CLO_PAYEE_ACCNM")
            {
                displayColumnName =
                    "Payee Name";
            }
            else if(columnName == "CLO_DRAWEE_ACCNO")
            {
                displayColumnName =
                    "Drawee Account Number";
            }
            else if(columnName == "CLO_ITEMSEQNO")
            {
                displayColumnName =
                    "Item Sequence Number";
            }
            else
            {
                /*
                 * Fallback for any future validation field
                 */
                displayColumnName =
                    columnName;
            }


            /*
             * Unique key based on branch + cheque number
             */
            var key =
                branchCode + "_" + chequeNo;


            /*
             * First invalid field for this cheque
             */
            if(!chequeMap[key])
            {
                chequeMap[key] =
                {
                    branchCode: branchCode,
                    chequeNo: chequeNo,
                    fields: []
                };
            }


            /*
             * Avoid duplicate field names
             */
            if(
                chequeMap[key].fields.indexOf(
                    displayColumnName
                ) == -1
            )
            {
                chequeMap[key].fields.push(
                    displayColumnName
                );
            }
        }


        /*
         * =====================================================
         * BUILD ALERT
         * =====================================================
         */

        var alertMessage =
            "Invalid Cheque Details:\n\n";


        var chequeCount = 0;


        /*
         * Maximum 7 cheque records in alert
         */
        for(var key in chequeMap)
        {
            if(!chequeMap.hasOwnProperty(key))
            {
                continue;
            }


            /*
             * Show maximum 7 invalid cheque records
             */
            if(chequeCount >= 7)
            {
                break;
            }


            var cheque =
                chequeMap[key];


            var fields =
                cheque.fields;


            /*
             * Join fields
             *
             * Example:
             *
             * Drawee Account Number & Payee Name
             */
            var invalidFieldsText = "";


            if(fields.length == 1)
            {
                invalidFieldsText =
                    fields[0];
            }
            else if(fields.length == 2)
            {
                invalidFieldsText =
                    fields[0] +
                    " & " +
                    fields[1];
            }
            else
            {
                invalidFieldsText =
                    fields.slice(0, fields.length - 1).join(", ") +
                    " & " +
                    fields[fields.length - 1];
            }


            /*
             * Add cheque information
             */
            alertMessage +=
                "Branch No: " +
                cheque.branchCode +
                ", Cheque No. " +
                cheque.chequeNo +
                " : " +
                invalidFieldsText +
                " is invalid.\n";


            chequeCount++;
        }


        /*
         * If more than 7 invalid cheques exist,
         * show a small summary.
         */
        var totalInvalidCheques =
            Object.keys(chequeMap).length;


        if(totalInvalidCheques > 7)
        {
            alertMessage +=
                "\nShowing first 7 invalid cheque records " +
                "out of " +
                totalInvalidCheques +
                ".\n";
        }


        /*
         * Final instruction
         */
        alertMessage +=
            "\nPlease verify the details and try again.";


        /*
         * Stop waiting image
         */
        document.getElementById("waiting").style.display = 'none';


        /*
         * Show ONLY one alert
         */
        alert(alertMessage);


        /*
         * Continue after user clicks OK
         */
        load_list_branches_after_validation();

        return;
    }


    // =========================================================
    // SESSION EXPIRED
    // =========================================================

    else if(res.indexOf("SessionIsNull") == 0)
    {
        document.getElementById("waiting").style.display = 'none';

        alert(
            "Your Session Has Been Expired.\n\n" +
            "Please Login Again."
        );

        menuOnClick("login.jsp");

        return;
    }


    // =========================================================
    // DATABASE / SERVER ERROR
    // =========================================================

    else if(res.indexOf("ERROR#") == 0)
    {
        document.getElementById("waiting").style.display = 'none';

        var errorMessage =
            res.substring("ERROR#".length);

        console.log(
            "Validation Error : " +
            errorMessage
        );

        alert(
            "Validation Error.\n\n" +
            errorMessage
        );

        return;
    }


    // =========================================================
    // UNEXPECTED RESPONSE
    // =========================================================

    else
    {
        document.getElementById("waiting").style.display = 'none';

        console.log(
            "UNEXPECTED VALIDATION RESPONSE:"
        );

        console.log(
            "[" + res + "]"
        );

        alert(
            "Unexpected validation response.\n\n" +
            "Server Response:\n" +
            "[" + res + "]"
        );

        return;
    }
}


/*function cts_process_validation()
{
    if(req.readyState != 4)
    {
        return;
    }

    if(req.status != 200)
    {
        document.getElementById("waiting").style.display = 'none';

        alert(
            "VALIDATION SERVER ERROR\n\n" +
            "Unable to validate cheque data.\n" +
            "HTTP Status : " + req.status
        );

        return;
    }

    var res = req.responseText;

    console.log("========================================");
    console.log("Validation RAW Response:");
    console.log("[" + res + "]");
    console.log("========================================");

    res = res.replace(/^\s+|\s+$/g, "");

    
     * =====================================================
     * SUCCESS
     * =====================================================
     
    if(res == "SUCCESS")
    {
        document.getElementById("waiting").style.display = 'none';

        alert(
            "CHEQUE DATA VALIDATION SUCCESSFUL\n\n" +
            "All cheque records are valid."
        );

        
         * Continue existing flow
         
        load_list_branches_after_validation();

        return;
    }


    
     * =====================================================
     * FAILED
     * =====================================================
     
	
	 * =====================================================
	 * VALIDATION FAILED
	 * Group invalid fields by Branch Code + Cheque Number
	 * =====================================================
	 
	else if(res.indexOf("FAILED#") == 0)
	{
	    console.log("VALIDATION RESULT : FAILED");

	    var invalidData =
	        res.substring("FAILED#".length);

	    console.log(
	        "Invalid Data : [" +
	        invalidData +
	        "]"
	    );

	    
	     * Each field validation result is separated by |
	     
	    var records =
	        invalidData.split("|");


	    
	     * Object used to group invalid fields
	     *
	     * Key:
	     * Branch Code + Cheque Number
	     
	    var chequeGroups = {};

	    var chequeOrder = [];


	    
	     * =================================================
	     * READ ALL INVALID FIELDS
	     * =================================================
	     
	    for(var i = 0; i < records.length; i++)
	    {
	        if(records[i] == null ||
	           records[i].replace(/^\s+|\s+$/g, "") == "")
	        {
	            continue;
	        }

	        var data =
	            records[i].split("~");


	        var branchCode =
	            data[0] || "";

	        var chequeNo =
	            data[1] || "";

	        var columnName =
	            data[2] || "";

	        var columnValue =
	            data[3] || "";

	        var expectedFormat =
	            data[4] || "";


	        
	         * Create unique key for cheque
	         
	        var chequeKey =
	            branchCode + "_" + chequeNo;


	        
	         * Create group if it does not exist
	         
	        if(!chequeGroups[chequeKey])
	        {
	            chequeGroups[chequeKey] =
	            {
	                branchCode: branchCode,
	                chequeNo: chequeNo,
	                fields: []
	            };

	            
	             * Keep original database order
	             
	            chequeOrder.push(chequeKey);
	        }


	        
	         * Friendly column name
	         
	        var displayColumnName =
	            columnName;

	        if(columnName == "CLO_PAYEE_ACCNM")
	        {
	            displayColumnName =
	                "Payee Account Name";
	        }
	        else if(columnName == "CLO_DRAWEE_ACCNO")
	        {
	            displayColumnName =
	                "Drawee Account Number";
	        }
	        else if(columnName == "CLO_ITEMSEQNO")
	        {
	            displayColumnName =
	                "Item Sequence Number";
	        }


	        
	         * Add invalid field to this cheque
	         
	        chequeGroups[chequeKey].fields.push(
	        {
	            columnName: columnName,
	            displayColumnName: displayColumnName,
	            columnValue: columnValue,
	            expectedFormat: expectedFormat
	        });
	    }


	    
	     * =================================================
	     * CREATE FINAL ALERT
	     * =================================================
	     
	    var alertMessage =
	        "========================================\n" +
	        "       CHEQUE DATA VALIDATION FAILED\n" +
	        "========================================\n\n";


	    
	     * Number of invalid cheques
	     
	    var invalidChequeCount =
	        chequeOrder.length;


	    
	     * =================================================
	     * DISPLAY ONE ENTRY PER CHEQUE
	     * =================================================
	     
	    for(var j = 0; j < chequeOrder.length; j++)
	    {
	        var key =
	            chequeOrder[j];

	        var cheque =
	            chequeGroups[key];


	        alertMessage +=
	            "========================================\n" +
	            "Invalid Cheque : " +
	            (j + 1) +
	            "\n" +
	            "========================================\n" +

	            "Branch Code   : " +
	            cheque.branchCode +
	            "\n" +

	            "Cheque Number : " +
	            cheque.chequeNo +
	            "\n\n";


	        
	         * Display all invalid fields
	         * belonging to this cheque
	         
	        for(var k = 0;
	            k < cheque.fields.length;
	            k++)
	        {
	            var field =
	                cheque.fields[k];


	            alertMessage +=
	                "Invalid Field " +
	                (k + 1) +
	                "\n" +

	                "Field         : " +
	                field.displayColumnName +
	                "\n" +

	                "Column Name   : " +
	                field.columnName +
	                "\n" +

	                "Column Value  : [" +
	                field.columnValue +
	                "]\n" +

	                "Expected      : " +
	                field.expectedFormat +
	                "\n\n";
	        }


	        alertMessage +=
	            "----------------------------------------\n\n";
	    }


	    
	     * =================================================
	     * FINAL MESSAGE
	     * =================================================
	     
	    alertMessage +=
	        "Total Invalid Cheques : " +
	        invalidChequeCount +
	        "\n\n" +

	        "Please correct the invalid cheque data.\n\n" +

	        "Click OK to continue to the branch list.";


	    
	     * Hide waiting image
	     
	    document.getElementById("waiting").style.display = 'none';


	    
	     * Show ONE alert containing all invalid cheques
	     
	    alert(alertMessage);


	    
	     * After OK:
	     * Continue existing flow.
	     
	    load_list_branches_after_validation();

	    return;
	}


    
     * =====================================================
     * SESSION EXPIRED
     * =====================================================
     
    else if(res.indexOf("SessionIsNull") == 0)
    {
        document.getElementById("waiting").style.display = 'none';

        alert(
            "SESSION EXPIRED\n\n" +
            "Your session has expired.\n" +
            "Please login again."
        );

        menuOnClick("login.jsp");

        return;
    }


    
     * =====================================================
     * SERVER ERROR
     * =====================================================
     
    else if(res.indexOf("ERROR#") == 0)
    {
        document.getElementById("waiting").style.display = 'none';

        var errorMessage =
            res.substring("ERROR#".length);

        alert(
            "VALIDATION ERROR\n\n" +
            errorMessage
        );

        return;
    }


    
     * =====================================================
     * UNEXPECTED RESPONSE
     * =====================================================
     
    else
    {
        document.getElementById("waiting").style.display = 'none';

        console.log(
            "Unexpected Validation Response: [" +
            res +
            "]"
        );

        alert(
            "UNEXPECTED VALIDATION RESPONSE\n\n" +
            "Server Response:\n\n" +
            res
        );

        return;
    }
}*/

function cts_process_list_branches()
{
	//alert("Alert inside cts_process_list_branches()");
  	if(req.readyState == 4)
	{
		if(req.status == 200)
		{
			var res = req.responseText;

			record=res;

			if(res.indexOf('NO_DATA')>-1)
			{
					alert('No Cheques are available to Mearging.');
			}
			else if(res.indexOf('SessionIsNull')>-1)
			{
				alert("Your Session Has Been Expired. Please Login Again.");
					/*var baseurl=document.URL;
					var p=baseurl.lastIndexOf('/');
					baseurl=baseurl.substr(0,p+1);
					baseurl=baseurl+"login.jsp?flag=1";
					location.replace(baseurl);
					*/		
				menuOnClick("login.jsp");
			}
			else
			{
				//alert("cts_process_list_branches inside ");
				//alert("res:"+res);
				//After this response we check list_validation if false then show alert and if true then show list of branches
			//alert("res:"+res);
			//sharayu comment-? call 
			/**
			 * 			 document.getElementById("waiting").style.display='';
			 				var url=document.URL;
			 				var p=url.lastIndexOf('/');
			 				baseurl=url.substr(0,p+1);
			 				baseurl=baseurl+"jsp/list_branches.jsp" 
			 				//location.replace(baseurl);
			 				cts_Ajax_list_branches(baseurl);*/
							//sucess -?fiels -select 3 cloun  from clearingoutward where conbrt=Y and date =ssydate 
							//retval===validate ? return tru or false 
							//true= sho list of branch
							// false =alrt chq - data la issue ahe 
				show_listof_branches(res);
				enable_merge_btn();
			}
		}
		else
		{
			alert("Problem In Retrieving Data.Please Check The Server Connection.");
			document.getElementById("waiting").style.display='none';
		}
	}
}

function show_listof_branches(res)
{
	//alert("show_listof_branches()"+res);
	res = res.trim();

	if(res.length>1)
	{

		data=res.split("!^!");

		if(res.indexOf("NO_DATA") > -1)
		{

		}
		else
		{
			var table=document.getElementById("tab_merge_stats");
			table.rows.length=0;
			document.getElementById("rcnt").value=1;
			var rediobuttonscan=document.getElementById("rd_scanwise").checked;
			var brn;
			if(rediobuttonscan==true){
				brn=data[0].split("$");
			}
			else{
				 brn=data[1].split("$");
			}
			
			for (i=0 ; i<brn.length-1 ;i++)
			{
				add_rows_merging("","tab_merge_stats");
			}
			if(rediobuttonscan==true){
				fillData(data[0]);
			}
			else{
				fillData(data[1]);
			}
			
		}

	}
	

}

function add_rows_merging(res,tableID)
{
		//alert("in add_rows_merging():"+res);
		//alert("tableID:"+tableID);

		var table=document.getElementById(tableID);
		var rcnt=document.getElementById("rcnt").value;
		var rowCount = table.rows.length;
		//alert(rowCount);

		var row = table.insertRow(rowCount);
		
		
		var cell1= row.insertCell(0);
		cell1.style.width="15%";
		cell1.align="center";
		var element1 = document.createElement("input");
		element1.type = "checkbox";
		element1.name="sel_chqs"+rcnt;
		element1.id="sel_chqs"+rcnt;
		element1.onclick=function (){chk_selected_merging_chqs();};
		cell1.appendChild(element1);

		var cell2 = row.insertCell(1);
		cell2.style.width="25%";
		var element2 = document.createElement("input");
		element2.type = "text";
		element2.style.border="none";
		element2.style.background="transparent";
		element2.name="txt_brn_cd"+rcnt;
		element2.id="txt_brn_cd"+rcnt;
		/////element1.value=rcnt;
		element2.setAttribute("readonly", "true");
		cell2.appendChild(element2);


		var cell3 = row.insertCell(2);
		cell3.style.width="25%";
		var element3 = document.createElement("input");
		element3.type = "text";
		element3.style.border="none";
		element3.style.background="transparent";
		element3.name="txt_brn_nm"+rcnt;
		element3.id="txt_brn_nm"+rcnt;
		/////element2.value=rcnt;
		element3.setAttribute("readonly", "true");
		cell3.appendChild(element3);

		var cell4 = row.insertCell(3);
		cell4.style.width="25%";
		var element4 = document.createElement("input");
		element4.type = "text";
		element4.style.border="none";
		element4.style.background="transparent";
		element4.name="txt_noof_up_chqs"+rcnt;
		element4.id="txt_noof_up_chqs"+rcnt;
		/////element3.value=rcnt;
		element4.setAttribute("readonly", "true");
		cell4.appendChild(element4);

		var cell5= row.insertCell(4);
		cell5.style.width="25%";
		var element5 = document.createElement("input");
		element5.type = "text";
		element5.style.border="none";
		element5.style.background="transparent";
		element5.name="txt_tot_amt"+rcnt;
		element5.id="txt_tot_amt"+rcnt;
		/////element4.value=rcnt;
		element5.setAttribute("readonly", "true");
		cell5.appendChild(element5);


		var cell6= row.insertCell(5);
		cell6.style.width="25%";
		var element6 = document.createElement("input");
		element6.type = "text";
		element6.style.border="none";
		element6.style.background="transparent";
		element6.name="txt_noof_nonup_chqs"+rcnt;
		element6.id="txt_noof_nonup_chqs"+rcnt;
		/////element5.value=rcnt;
		element6.setAttribute("readonly", "true");
		cell6.appendChild(element6);
		
		rcnt=rcnt*1+1;

		document.getElementById("rcnt").value=rcnt;
		//alert("after add_rows_merging end");
		document.getElementById("waiting").style.display='none';
}

function enable_merge_btn()
{
	var rcnt = 	document.getElementById("rcnt").value;
	//alert("in enable_merge_btn rcnt:"+rcnt);
	var nonup_cnt = 0;
	var up_cnt = 0;
	var nonup_flag = 0;
	var up_flag = 0;
	for(var t=1;t<rcnt;t++)
	{
		nonup_cnt = document.getElementById("txt_noof_nonup_chqs"+t).value;
		up_cnt =document.getElementById("txt_noof_up_chqs"+t).value;
		if(nonup_cnt > 0)
		{
			nonup_flag++;
		}
		if(up_cnt > 0)
		{
			up_flag++;
		}
	}
	var check=document.getElementById("rd_scanwise").checked;
	
	if(nonup_flag > 0)
	{
		if(check==true){
			document.getElementById("submitbutton").disabled = false;
		}else{
			document.getElementById("submitbutton").disabled = true;	
		}
				
	}
	else if(nonup_flag == 0 && up_flag ==0)
	{
		if(check==true){
			document.getElementById("submitbutton").disabled = false;
		}else{
			document.getElementById("submitbutton").disabled = true;	
		}
	}
	else
	{
		document.getElementById("submitbutton").disabled = false;
		
	}
}
function on_merge_click()
{
		//alert("in on_merge_click");
		document.getElementById("waiting").style.display='';
		var chkcnt=0;
		var cntchecks=0;
		var ckeckedbox=0;
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
			var rediobutton=document.getElementById("rd_scanwise").checked;
			//alert(rediobutton)
			if(rediobutton==true){
				
			var table = document.getElementById("tab_merge_stats");
			var rowCount = table.rows.length;
			var branchStr="";
			
			
			for(var i=1; i<rowCount; i++)
			{
				var obj=document.getElementById("txt_brn_cd"+i).value;
				var nonup_chqs=document.getElementById("txt_noof_nonup_chqs"+i).value;
				var txt_noof_up_chqs=document.getElementById("txt_noof_up_chqs"+i).value;
				var row = table.rows[i];
				var chkbox = row.cells[0].childNodes[0];
				if(true == chkbox.checked)
				{
					
					ckeckedbox++;
					if(nonup_chqs>0){
						cntchecks++;
					}
					
					if(txt_noof_up_chqs>0){
						
						chkcnt++;
						if(branchStr==""){
						branchStr=obj;
						}
						else{
						branchStr=branchStr+","+obj;
						}
					}
				}
			
			}
		//	alert(chkcnt);
			if(ckeckedbox==0){
				document.getElementById("waiting").style.display='none';
				alert("Please Select At Least One Record");	
			}
			else if(cntchecks>0){
				document.getElementById("waiting").style.display='none';
				alert("Please Upload All Cheques First!");
			}
			else if(chkcnt==0){
				document.getElementById("waiting").style.display='none';
				alert("For Selected Branch Number Of Uploaded Cheques Must Be Greater Than 0");
			}
			else{
				/*var url=document.URL;
				var p=url.lastIndexOf('/');
				baseurl=url.substr(0,p+1);
				baseurl=baseurl+"jsp/merge.jsp?branches="+branchStr;
				location.replace(baseurl);
				cts_AjaxData_merge(baseurl);*/
				document.getElementById("formid").action="jsp/merge.jsp?branches="+branchStr;
				document.getElementById("formid").method="POST";
				document.getElementById("formid").submit();
				}
		}
		else{
			/*var url=document.URL;
			var p=url.lastIndexOf('/');
			baseurl=url.substr(0,p+1);
			baseurl=baseurl+"jsp/merge.jsp?branches=CLO_BRANCH_CD";
			location.replace(baseurl);
			cts_AjaxData_merge(baseurl);*/
			
			document.getElementById("formid").action="jsp/merge.jsp?branches=CLO_BRANCH_CD";
			document.getElementById("formid").method="POST";
			document.getElementById("formid").submit();
			}
			
			
		}
}

function radioclick(radio)
{
	
	var table = document.getElementById("tab_merge_stats");	
	var rowCount = table.rows.length;
	
	if(radio.id=="rd_scanwise")
	{
	
		document.getElementById("txtSelctGrandTotUpCheq").value=" ";
		document.getElementById("txtSelcGrandTot").value=" ";
		
		table.innerHTML="<tr><td><label style='font-weight:bold'>Select All</label><input id='chk_selall' type='checkbox' onClick='toggle_out_clearing(this)' title='Select All'/></td><td><label style='font-weight:bold'>Branch Code</label></td><td><label style='font-weight:bold'>Branch Name</label></td><td><label style='font-weight:bold'>No. Of Uploaded Cheques</label></td><td><label style='font-weight:bold'>Total Amount (In Rs.)</label></td><td><label style='font-weight:bold'>No. Of Non Uploaded Cheques</label></td></tr>";
         	document.getElementById("chk_selall").disabled = false;
		document.getElementById("rd_scanwise").checked=true;
		document.getElementById("rd_brnwise").checked=false;
		show_listof_branches(record);
		for(var i=1; i<rowCount; i++)
		{
			document.getElementById("sel_chqs"+i).disabled = false;
		}
		
		fillData(data[0]);
	}
	else
	{
		
		document.getElementById("txtSelctGrandTotUpCheq").value=" ";
		document.getElementById("txtSelcGrandTot").value=" ";
		
		table.innerHTML="<tr><td><label style='font-weight:bold'>Select All</label><input id='chk_selall' type='checkbox' onClick='toggle_out_clearing(this)' title='Select All'/></td><td><label style='font-weight:bold'>Branch Code</label></td><td><label style='font-weight:bold'>Branch Name</label></td><td><label style='font-weight:bold'>No. Of Uploaded Cheques</label></td><td><label style='font-weight:bold'>Total Amount (In Rs.)</label></td><td><label style='font-weight:bold'>No. Of Non Uploaded Cheques</label></td></tr>";
		document.getElementById("rd_scanwise").checked=false;
		document.getElementById("rd_brnwise").checked=true;
		show_listof_branches(record);
		
		var table = document.getElementById("tab_merge_stats");
		var rowCount = table.rows.length;
		//alert(rowCount);
		
		for(var i=1; i<rowCount; i++)
		{
			var row = table.rows[i];
			//alert("row :"+row);
			var chkbox = row.cells[0].childNodes[0];
			chkbox.checked = false;
			document.getElementById("sel_chqs"+i).disabled = true;
		}
		
		document.getElementById("chk_selall").disabled = true;
		var mainchkbox = document.getElementById("chk_selall");
		mainchkbox.checked = false;
		
		fillData(data[1]);
	}
	
}

function fillData(data1)
{
	//alert(111);
	var dtls = data1.split("$");
	//alert("dtls.length:"+dtls.length);
	var grandTotalAmount=0;
	var grandTotUpcheq=0;
	var grandTotNonUpcheq=0;
	var checkbtn=document.getElementById("rd_brnwise").checked;
	for(t=0;t<dtls.length-1;t++)
	{
		var bclist=dtls[t].split("#");
		var rcnt=t+1;

		document.getElementById("txt_brn_cd"+rcnt).value=bclist[0];
		document.getElementById("txt_brn_nm"+rcnt).value=bclist[1];
		document.getElementById("txt_noof_up_chqs"+rcnt).value=bclist[2];
		document.getElementById("txt_tot_amt"+rcnt).value=bclist[3];
		grandTotUpcheq=(grandTotUpcheq*1)+(bclist[2]*1);
		grandTotalAmount=(grandTotalAmount*1)+(bclist[3]*1);
		if(bclist[4] > 0)
		{
			if(checkbtn==true){
				document.getElementById("submitbutton").disabled = true;
			}
			else{
				document.getElementById("submitbutton").disabled = false;
			}
			document.getElementById("txt_brn_cd"+rcnt).style.color="#FF0000";
			document.getElementById("txt_brn_nm"+rcnt).style.color="#FF0000";
			document.getElementById("txt_noof_up_chqs"+rcnt).style.color="#FF0000";
			document.getElementById("txt_tot_amt"+rcnt).style.color="#FF0000";
			document.getElementById("txt_noof_nonup_chqs"+rcnt).style.color="#FF0000";
			alert("Please Upload All Cheques First!");
			//document.getElementById("submitbutton").disabled = true;
		}
		document.getElementById("txt_noof_nonup_chqs"+rcnt).value=bclist[4];
		grandTotNonUpcheq=(grandTotNonUpcheq*1)+(bclist[4]*1);


	}
	//alert("mg,mgfd,"+grandTotalAmount);
	document.getElementById("gTotTable").style.display='';
	document.getElementById("txtGrandTot").value=(" "+grandTotalAmount.toFixed(2));//.substring(0,(" "+grandTotalAmount+".00").indexOf(".")+4);
	document.getElementById("txtGrandTotUpCheq").value=" "+grandTotUpcheq;
	document.getElementById("txtGrandTotNonUpCheq").value=" "+grandTotNonUpcheq;
	

	document.getElementById("waiting").style.display='none';
}

function toggle_out_clearing(source)
{
  	var table = document.getElementById("tab_merge_stats");
	var rowCount = table.rows.length;
	var totalcount=0,totalamount=0;

	for(var i=1; i<rowCount; i++)
	{
		var row = table.rows[i];
		var chkbox = row.cells[0].childNodes[0];
		chkbox.checked = source.checked;
		
	}
	if(true==chkbox.checked)
	{
	totalcount = document.getElementById("txtGrandTotUpCheq").value;
	document.getElementById("txtSelctGrandTotUpCheq").value=" "+totalcount;
	
	totalamount = document.getElementById("txtGrandTot").value;
	document.getElementById("txtSelcGrandTot").value=" "+totalamount;
	}
	else{
	document.getElementById("txtSelctGrandTotUpCheq").value=" ";
	document.getElementById("txtSelcGrandTot").value=" ";
	}
	
}

function chk_selected_merging_chqs()
{
	document.getElementById("txtSelctGrandTotUpCheq").value=" ";
	document.getElementById("txtSelcGrandTot").value=" ";
	//alert("in chk_selected_outward_chqs");
	var tot_amt = 0;
	var table = document.getElementById("tab_merge_stats");
	var rowCount = table.rows.length;
	var sel_cnt = 0;
	var Totalcount=0,Totalcountamt=0;
	for(var i=1; i<rowCount; i++)
	{
		var row = table.rows[i];
		//alert("row :"+row);
		var chkbox = row.cells[0].childNodes[0];
		var count=row.cells[3].Text;
		//alert("count :"+count);
		if(true == chkbox.checked)
		{
			var count=row.cells[3].childNodes[0];
			count=count.value;
			//alert("cnt=="+count);
			Totalcount=(Totalcount*1)+(count*1);
			//alert("Totalcount="+Totalcount);
			document.getElementById("txtSelctGrandTotUpCheq").value=" "+Totalcount;
			
			var countamt=row.cells[4].childNodes[0];
			countamt=countamt.value;
			//alert("countamt=="+countamt);
			Totalcountamt=(Totalcountamt*1)+(countamt*1);
			//alert("Totalcountamt="+Totalcountamt);
			document.getElementById("txtSelcGrandTot").value=" "+Totalcountamt.toFixed(2);
			
			sel_cnt ++;
		}
	}
	//alert("sel_cnt:"+sel_cnt+"\nrowCount-1:"+(rowCount-1));
	var chkbox = document.getElementById("chk_selall");
	if(sel_cnt != (rowCount-1))
	{
		if(true == chkbox.checked)
		{
			chkbox.checked = false;
		}
	}
	else
	{
		chkbox.checked = true;
	}
}

