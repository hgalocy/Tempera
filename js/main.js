//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

//localStorage.setItem('Username', 'Bob');

const divOne = document.getElementById("NotLoggedIn");
const divTwo = document.getElementsByClassName("welcome-banner")[0];
const welcomeAccount = document.getElementById("greet-user");
const currentUsername = localStorage.getItem('Username');

localStorage.clear();

if(currentUsername != null) {
    //Run this if the person is logged in
    divOne.style.display = "none";
    divTwo.style.display = "flex";
    welcomeAccount.textContent = localStorage.getItem('Username') + "!";
} else {
    //Run this if the person is not logged in
    divOne.style.display = "flex";
    divTwo.style.display = "none";
}