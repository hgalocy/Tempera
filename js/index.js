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
let artistLinks = document.getElementsByClassName("store-option");
for (var i = 0; i<artistLinks.length; i++){
    artistLinks[i].addEventListener("click", function(){
        myFrame.src = "html/artist.html";
    });
}
let artLinks = document.getElementsByClassName("art-option");
for (var i = 0; i<artLinks.length; i++){
    artLinks[i].addEventListener("click", function(){
        localStorage.setItem("ItemName", this.textContent);
        myFrame.src = "html/art.html";
    });
}

logOutBtn.addEventListener("click", function(){
    localStorage.clear();
    myFrame.src = '../html/main.html';
})

window.onload = function() {
    for (var i = 0; i < artDropList.length; i++) {
        (function (e) {
            jQuery.ajax({
                url: '../php/db_functions.php',
                dataType: 'json',
                type: 'post',
                data: {functionname: 'Get-Artwork-Title'},
                success: function (response) {
                    if (!(response.result === 'No items uploaded to website.')) {
                        artDropList[e].textContent = String(response.result);
                    }
                }
            });
        })(i);
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