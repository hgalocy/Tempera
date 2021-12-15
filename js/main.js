//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let ftrddArtistPic = document.getElementById("featured-account-pic");
let ftrdArtistUName = document.getElementById("featured-account-username");
let divOne = document.getElementById("NotLoggedIn");
let divTwo = document.getElementsByClassName("welcome-banner")[0];
let welcomeAccount = document.getElementById("greet-user");
let loginBtn = document.getElementById("login_btn");
let signUpBtn = document.getElementById("signup_btn");

let featuredArtTitle = document.getElementsByClassName('art-title-label');
let featuredArtPrice = document.getElementsByClassName('art-price-label');
let featuredArtImg = document.getElementsByClassName('art-listing-img');

if(localStorage.getItem('Username') != null) {
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

window.onload = function() {
    jQuery.ajax({
        url: '../php/db_functions.php',
        async: false,
        dataType: 'json',
        type: 'post',
        data: {functionname: 'Get-Featured-Artist'},
        success: function (response) {
            if (!(response.result === 'No current artists.')) {
                var data = response.result.split(",");
                ftrdArtistUName.textContent = String(data[0]);
                ftrddArtistPic.src = String(data[1]);
            }
        }
    });

    for( var i = 0; i < featuredArtTitle.length; i++){
        (function(e) {
            jQuery.ajax({
                url: '../php/db_functions.php',
                dataType: 'json',
                type: 'post',
                data: {functionname: 'Get-Featured-Artwork'},
                success: function (response) {
                    if (!(response.result === 'No items uploaded to website.')) {
                        var data = response.result.split(",");
                        featuredArtTitle[e].textContent = String(data[0]);
                        var priceString = "$".concat(String(data[1]));
                        featuredArtPrice[e].textContent = priceString;
                        featuredArtImg[e].src = String(data[2]);
                    }
                }
            });
        })(i);
    }

};
