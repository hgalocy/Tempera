//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
let logOutBtn = document.getElementById("logoutBtn");
let artDropList = document.getElementsByClassName("drop-option art-option");

//adjust iframe size dynamically
let options = {
    autoResize: true,
}
iFrameResize( options, '#myFrame' );

const myFrame = document.getElementById('myFrame');
document.getElementById("account-link").addEventListener("click", function(){
    myFrame.src = "html/account.html";
});
document.getElementById("favorite-link").addEventListener("click", function(){
    myFrame.src = "html/favorite.html";
});



logOutBtn.addEventListener("click", function(){
    localStorage.clear();
    myFrame.src = '../html/main.html';
})

function fillArtistDropdown(text){
    var ul = document.getElementById("storesDropDown");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    li.setAttribute("class", "store-option")
    ul.appendChild(li);
}
function fillArtistFooterDropdown(text){
    var ul = document.getElementsByClassName("dropdown-content-footer")[0];
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    li.setAttribute("class", "store-option")
    ul.appendChild(li);
}

function fillItemDropdown(text){
    var ul = document.getElementsByClassName("dropdown-content")[1];
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    li.setAttribute("class", "art-option")
    ul.appendChild(li);
}
function fillItemFooterDropdown(text){
    var ul = document.getElementsByClassName("dropdown-content-footer")[1];
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    li.setAttribute("class", "art-option")
    ul.appendChild(li);
}


let aboutBtn = document.getElementById("aboutBtn");
aboutBtn.addEventListener("click", function(){
    myFrame.src = 'html/about.html';
})

let aboutBtnFooter = document.getElementsByClassName("dropbtn")[5];
aboutBtnFooter.addEventListener("click", function(){
    myFrame.src = 'html/about.html';
})

window.onload = function() {

    var numArtists = 0;
    jQuery.ajax({
        async: false,
        url: '../php/db_functions.php',
        dataType: 'json',
        type: 'post',
        data: {functionname: 'Get-Num-Artists'},
        success: function(response){
            if(!(response.result === 'Error')){
                numArtists = parseInt(response.result);
            }
        }
    });

    jQuery.ajax({
        url: '../php/db_functions.php',
        async: false,
        dataType: 'json',
        type: 'post',
        data: {functionname: 'Get-Artist-Names'},
        success: function(response){
            if(!(response.result === 'No Artists')){
                var data = response.result.split(",");
                for( var i = 0; i < numArtists; i++){
                    fillArtistDropdown(String(data[i]));
                    fillArtistFooterDropdown(String(data[i]));
                }
            }
        }
    });

    let artistLinks = document.getElementsByClassName("store-option");
    for (var i = 0; i<artistLinks.length; i++){
        artistLinks[i].addEventListener("click", function(){
            localStorage.setItem("ArtistName", this.textContent);
            myFrame.src = "html/artist.html";
        });
    }


    var numItems = 0;
    jQuery.ajax({
        async: false,
        url: '../php/db_functions.php',
        dataType: 'json',
        type: 'post',
        data: {functionname: 'Get-Num-Items'},
        success: function(response){
            if(!(response.result === 'Error')){
                numItems = parseInt(response.result);
            }
        }
    });

    jQuery.ajax({
        url: '../php/db_functions.php',
        async: false,
        dataType: 'json',
        type: 'post',
        data: {functionname: 'Get-Item-Names'},
        success: function(response){
            if(!(response.result === 'No Items')){
                var data = response.result.split(",");
                for( var i = 0; i < numItems; i++){
                    fillItemDropdown(String(data[i]));
                    fillItemFooterDropdown(String(data[i]));
                }
            }
        }
    });

    let artLinks = document.getElementsByClassName("art-option");
    for (var i = 0; i<artLinks.length; i++){
        artLinks[i].addEventListener("click", function(){
            localStorage.setItem("ItemName", this.textContent);
            myFrame.src = "html/art.html";
        });
    }
}

//iframe messaging
window.addEventListener('message', function (e) {
    // Get the sent data
    const data = e.data;
    if (data.substring(0, 12) == "from iframe:"){
        alert(data.substring(12))
    }
});