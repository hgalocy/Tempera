//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
let logOutBtn = document.getElementById("logoutBtn");

//adjust iframe size dynamically
let options = {
    autoResize: true,
}
iFrameResize( options, '#myFrame' );

const myFrame = document.getElementById('myFrame');
document.getElementById("account-link").addEventListener("click", function(){
    myFrame.src = "html/account.html";
    //FIXME: Move "localStorage.clear()" function to logout button when its created
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
        myFrame.src = "html/art.html";
    });
}

//myFrame.src = "main.html";
//myFrame.src = "login.html";

//logout btn
logOutBtn.addEventListener("click", function(){
    localStorage.clear();
    myFrame.src = '../html/main.html';
})



//iframe messaging
window.addEventListener('message', function (e) {
    // Get the sent data
    const data = e.data;
    if (data.substring(0, 12) == "from iframe:"){
        alert(data.substring(12))
    }
});