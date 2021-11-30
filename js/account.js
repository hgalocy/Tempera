//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

//let divAccount = document.getElementById("basic-account");
let divArtist = document.getElementById("artist-account");

switch (localStorage.getItem("IsArtist")){
    case "1":
        divArtist.style.display = "flex";
        break;
    default:
        divArtist.style.display = "none";
        break;
}