//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

localStorage.clear();

//adjust iframe size dynamically
let options = {
    log: false,
    autoResize: true,
}
iFrameResize( options, '#myFrame' );

const myFrame = document.getElementById('myFrame');
document.getElementById("account-link").addEventListener("click", function(){
    myFrame.src = "account.html";
});
document.getElementById("favorite-link").addEventListener("click", function(){
    myFrame.src = "favorite.html";
});
let artistLinks = document.getElementsByClassName("store-option");
for (var i = 0; i<artistLinks.length; i++){
    artistLinks[i].addEventListener("click", function(){
        myFrame.src = "artist.html";
        
    });
}
let artLinks = document.getElementsByClassName("art-option");
for (var i = 0; i<artLinks.length; i++){
    artLinks[i].addEventListener("click", function(){
        myFrame.src = "art.html";
    });
}

//myFrame.src = "main.html";
//myFrame.src = "login.html";

//logout btn
logOutBtn.addEventListener("click", function(){
    localStorage.clear();
})

