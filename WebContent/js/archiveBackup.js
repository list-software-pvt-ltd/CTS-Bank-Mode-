function toggleAll(source)
{

    let allFolders =
        document.getElementById("allFolders")
        .value
        .split(",")
        .filter(x => x.trim() !== "");


    if(source.checked)
    {
        sessionStorage.setItem(
            "selectedFolders",
            JSON.stringify(allFolders)
        );
    }
    else
    {
        sessionStorage.removeItem("selectedFolders");
    }


    document.querySelectorAll(".chkFolder")
    .forEach(function(cb)
    {
        cb.checked = source.checked;
    });

}
function saveSelection(cb)
{
    let selected =
        JSON.parse(
            sessionStorage.getItem("selectedFolders")
            || "[]"
        );

    if(cb.checked)
    {
        if(selected.indexOf(cb.value) === -1)
        {
            selected.push(cb.value);
        }
    }
    else
    {
        selected =
            selected.filter(function(item)
            {
                return item !== cb.value;
            });
    }

    sessionStorage.setItem(
        "selectedFolders",
        JSON.stringify(selected)
    );


    // update Select All checkbox
    let allFolders =
        document.getElementById("allFolders")
        .value
        .split(",")
        .filter(x => x.trim() !== "");


    document.getElementById("chkAll").checked =
        selected.length === allFolders.length;
}

function restoreSelections()
{
    console.log("restoreSelections called");


    let selected =
        JSON.parse(
            sessionStorage.getItem("selectedFolders")
            || "[]"
        );


    console.log("Selected Count = " + selected.length);


    document.querySelectorAll(".chkFolder")
    .forEach(function(cb)
    {

        if(selected.includes(cb.value))
        {
            cb.checked = true;
        }

    });


    let allFolders =
        document.getElementById("allFolders")
        .value
        .split(",")
        .filter(x => x.trim() !== "");


    document.getElementById("chkAll").checked =
        selected.length === allFolders.length;

}

/*function downloadZip()
{
    let selected =
        JSON.parse(sessionStorage.getItem("selectedFolders") || "[]");

    if(selected.length === 0)
    {
        document.querySelectorAll('.chkFolder:checked')
        .forEach(cb => selected.push(cb.value));
    }

    if(selected.length === 0)
    {
        showToast("Please select at least one folder", "error");
        return;
    }

    showLoader();

    let form = document.createElement("form");
    form.method = "POST";
    form.action = "downloadArchive.jsp";
    form.target = "downloadFrame";

    selected.forEach(function(val)
    {
        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "folders";
        input.value = val;
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    setTimeout(function()
    {
        hideLoader();

        showToast("ZIP downloaded successfully", "success");
		removeDownloadedRows(selected);
		 sessionStorage.removeItem("selectedFolders");

        document.querySelectorAll(".chkFolder")
            .forEach(cb => cb.checked = false);

        document.getElementById("chkAll").checked = false;

    }, 2000);
}*/
function downloadZip()
{
    let selected =
        JSON.parse(sessionStorage.getItem("selectedFolders") || "[]");


    if(selected.length === 0)
    {
        document.querySelectorAll('.chkFolder:checked')
        .forEach(cb => selected.push(cb.value));
    }


    if(selected.length === 0)
    {
        showToast("Please select at least one folder", "error");
        return;
    }



    // show loader
    document.getElementById("loaderOverlay")
    .style.display="block";


    // remove old cookie
    document.cookie =
    "downloadComplete=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";



    let form=document.createElement("form");

    form.method="POST";

    form.action="jsp/downloadArchive.jsp";

    form.target="downloadFrame";


    selected.forEach(function(val)
    {

        let input=document.createElement("input");

        input.type="hidden";

        input.name="folders";

        input.value=val;

        form.appendChild(input);

    });


    document.body.appendChild(form);


    form.submit();
	checkDownloadComplete(selected);

}
function checkDownloadComplete(selected)
{

    let timer=setInterval(function()
    {


        if(document.cookie.indexOf("downloadComplete=true") !== -1)
        {


            clearInterval(timer);


            // hide loader
            document.getElementById("loaderOverlay")
            .style.display="none";


            // remove cookie
            document.cookie =
            "downloadComplete=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";



            alert("ZIP downloaded successfully");



            removeDownloadedRows(selected);


            sessionStorage.removeItem("selectedFolders");



            document.querySelectorAll(".chkFolder")
            .forEach(cb=>cb.checked=false);


            document.getElementById("chkAll").checked=false;


        }


    },1000);

}

function showToast(message, type = "error") {
    let toast = document.getElementById("toast");

    toast.className = "toast show " + type;
    toast.innerText = message;

    setTimeout(() => {
        toast.className = "toast";
    }, 2500);
}

window.onload = function()
{
    restoreSelections();

    let archiveEmpty =
        document.getElementById("archiveEmpty").value;

    if(archiveEmpty === "true")
    {
        alert("No record found in archive path");
    }
};
function filterFolders()
{
    var filter =
        document.getElementById("folderFilter")
                .value
                .toLowerCase()
                .trim();

    var rows =
        document.querySelectorAll(".folderRow");

    rows.forEach(function(row)
    {
        var folderName =
            row.cells[1].innerText
               .toLowerCase();

        if(folderName.indexOf(filter) >= 0)
        {
            row.style.display = "";
        }
        else
        {
            row.style.display = "none";
        }
    });
}

var filterTimer;

function autoFilter()
{
    clearTimeout(filterTimer);

    filterTimer = setTimeout(function()
    {
        var value =
            document.getElementById("folderNameFilter")
                    .value
                    .trim();

        if(value.length === 0)
        {
            window.location = "archiveBackup.jsp?pageNo=1";
        }
        else
        {
            window.location =
                "archiveBackup.jsp?pageNo=1&searchFolder="
                + encodeURIComponent(value);
        }

    }, 400);
}
function filterTable()
{
    var srNo =
        document.getElementById("srNoFilter")
                .value.toLowerCase();

    var folderName =
        document.getElementById("folderNameFilter")
                .value.toLowerCase();

    var rows =
        document.querySelectorAll(
            "#archiveTable .folderRow"
        );

    for(var i=0;i<rows.length;i++)
    {
        var cells =
            rows[i].getElementsByTagName("td");

        var srNoText =
            cells[0].innerText.toLowerCase();

        var folderText =
            cells[1].innerText.toLowerCase();

        var show =
            srNoText.indexOf(srNo) > -1 &&
            folderText.indexOf(folderName) > -1;

        rows[i].style.display =
            show ? "" : "none";
    }
}

function removeDownloadedRows(selectedFolders)
{
    selectedFolders.forEach(function(folder)
    {
        document.querySelectorAll(".folderRow").forEach(function(row)
        {
            let checkbox = row.querySelector(".chkFolder");

            if(checkbox && checkbox.value === folder)
            {
                row.remove(); // remove row from grid
            }
        });
    });
}
//Filter Validation
document.getElementById("folderNameFilter").addEventListener("keypress", function(e)
{
    var char = String.fromCharCode(e.which);

    var pattern = /[a-zA-Z0-9_\- ]/;

    if(!pattern.test(char))
    {
        e.preventDefault();
        showToast("Only letters and numbers allowed", "error");
    }
});