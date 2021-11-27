//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let divOne = document.getElementById("NotLoggedIn");
let divTwo = document.getElementsByClassName("welcome-banner")[0];
let welcomeAccount = document.getElementById("greet-user");
let currentUsername = localStorage.getItem('Username');
let loginBtn = document.getElementById("login_btn");
let signUpBtn = document.getElementById("signup_btn");

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

loginBtn.addEventListener("click", () => {
    sessionStorage.setItem("LoginSignup", "Login");
});

signUpBtn.addEventListener("click", () => {
    sessionStorage.setItem("LoginSignup", "Signup");
});