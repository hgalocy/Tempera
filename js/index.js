//adjust iframe size dynamically
let options = {
    log: true,
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


