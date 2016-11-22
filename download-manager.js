window.onload = function() {
    var add = document.getElementById("add");
    var download = document.getElementById("download");
    var search = document.getElementById("searchbox");
    var enterfile = document.getElementById("file_name");

    add.addEventListener("click", addFile);
    enterfile.addEventListener("keyup", addFile_onEnter);
    download.addEventListener("click", downloadFiles);
    search.addEventListener("keyup", dosearch);


};

function addFile() {

    var table = document.getElementById("myTable");
    var filename = document.getElementById("file_name").value;
    if (filename == "") {
        var message = document.getElementById("message");
        message.innerHTML = "Please Enter The Filename";
        message.style.color = "#A24";
        setTimeout(removeMsg, 2000);
        return false;
    } else {

        var rows = document.getElementsByClassName("secondcoloumn");
        for (var n = 1; n < rows.length - 1; n++) {
            var file = rows[n].innerHTML;
            if (filename.trim() == file.trim()) {
                var message = document.getElementById("message");
                message.innerHTML = "File Already Added";
                message.style.color = "#26bf8c";
                setTimeout(removeMsg, 2000);
                return false;
            } else {
                document.getElementById("message").innerHTML = "";
            }
        }

        document.getElementById("message").innerHTML = "";
    }
    var length = table.rows.length;
    if (length == 1) {
        var row = table.insertRow(0);
        row.innerHTML = ' <th class= "firstcoloumn "> </th> ' +
            '<th class="secondcoloumn"><b>File Name </b></th> ' +
            '<th class="thirdcoloumn"> <b>Progress</b></th>' +
            ' <th class="fourthcoloumn"></th>';
        addRow(table);

    } else {

        addRow(table);
    }
}


function addFile_onEnter( ){
    if(window.event.keyCode == 13){
        addFile();
    }
    else{
        return false;
    }
}

function dosearch() {
    var rows = document.getElementsByClassName("secondcoloumn");
    for (var n = 1; n < rows.length - 1; n++) {
        rows[n].parentNode.style.display = "table-row";
    }
    fileSearh();
}

function fileSearh() {

    var searchtext = document.getElementById("searchbox").value;
    var rows = document.getElementsByClassName("secondcoloumn");
    if (searchtext.trim() == "") {
        for (var n = 1; n < rows.length - 1; n++) {
            rows[n].parentNode.style.display = "table-row";
        }

    } else {
        var filename;
        for (var n = 1; n < rows.length - 1; n++) {
            filename_search = rows[n].innerHTML;
            var re = new RegExp(searchtext.trim(), 'i');
            var res = filename_search.match(re);
            if (res == null) {
                rows[n].parentNode.style.display = "none";
            }
        }
    }
}






function addRow(table) {

    var row = table.insertRow(1);
    row.innerHTML = ' <td class="firstcoloumn"> <img class="sucess_file" src="https://maps.gstatic.com/mapfiles/markers2/dd-via-transparent.png" alt="picture to add file" ></td> ' +
        '<td class="secondcoloumn">' + document.getElementById("file_name").value + '</td>' +
        '<td class="thirdcoloumn"><div class="progress-wrap progress" ><div class="progress-bar progress"></div></div></td>' +
        ' <td class="fourthcoloumn"><img class="cancle" onclick="deleteFile(this)" src="https://maps.gstatic.com/mapfiles/markers2/dd-via-transparent.png" alt="picture to add file" ></td>';
    document.getElementById("file_name").value ="";

}

function removeMsg(){
    document.getElementById("message").innerHTML = "";

}

function deleteFile(e) {
    var row = e.parentNode.parentNode;
    row.parentNode.removeChild(row);
    var table = document.getElementById("myTable");
    var rowsLength = table.rows.length;
    if(rowsLength == 2){
        table.deleteRow(0);
    }

}

function downloadFiles() {
    prograess_bars = document.getElementsByClassName("progress-bar");
    var i = 0;
    setProgress1();
    var progress1 = setInterval(setProgress1, 2500);

    function setProgress1() {
        if (i > prograess_bars.length - 1) {
            clearInterval(progress1);
        }

        // need code something you know what
        else if (prograess_bars[i].innerHTML == 'Downloaded !!') {
            i++;
        } else {
            if (prograess_bars[i].parentNode.parentNode.parentNode.style.display == 'none') {
                i++;
            } else {
                setProcess(prograess_bars[i]);
                i++;
            }
        }
    }

}



function setProcess(prograess_bars) {
    var width = 1;
    var progress = setInterval(setProgress, 10);

    function setProgress() {
        if (width >= 100) {
            prograess_bars.innerHTML = 'Downloaded !!';
            clearInterval(progress);
        } else {
            width++;
            prograess_bars.style.width = width + "%";
        }

    }
}