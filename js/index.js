//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

//adjust iframe size dynamically
let options = {
    log: false,
    autoResize: true,
}
iFrameResize( options, '#myFrame' );

const myFrame = document.getElementById('myFrame');
document.getElementById("account-link").addEventListener("click", function(){
    myFrame.src = "html/account.html";
    //FIXME: Move "localStorage.clear()" function to logout button when its created
    localStorage.clear();
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
<<<<<<< HEAD
}
=======
}

//myFrame.src = "main.html";
//myFrame.src = "login.html";

//logout btn
logOutBtn.addEventListener("click", function(){
    localStorage.clear();
})

>>>>>>> 2773af437b7797639506c288bf73a444e109da18
