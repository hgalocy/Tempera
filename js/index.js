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

const ban = document.getElementById("testugh")
myFrame.onLoad = function (){
    ban.style.backgroundColor = "red";

}
//myFrame.src = "main.html";
//myFrame.src = "login.html";


