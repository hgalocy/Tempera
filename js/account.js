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

//handle artist button
window.onload = function(){
    //TODO: grab from datbase to set localStorage.setItem('artist', '');
    console.log("executed")
    if(localStorage.getItem('artist') == 'false'){ //flip to non artist
        artistBtn.style.backgroundColor = "gray";
        artistBtn.innerHTML="Not Artist"
    }
    else{ //flip to artist
        artistBtn.style.backgroundColor = "var(--secondary-color";
        artistBtn.innerHTML="Artist"
    }
}
let artistBtn = document.getElementById("artistBtn");
artistBtn.addEventListener("click", function(){
    if(localStorage.getItem('artist') == 'true'){ //flip to non artist
        artistBtn.style.backgroundColor = "gray";
        artistBtn.innerHTML="Not Artist"
        localStorage.setItem('artist', 'false');
        //TODO: set database artist value
        //TODO: hide artist options
    }
    else{ //flip to artist
        artistBtn.style.backgroundColor = "var(--secondary-color";
        artistBtn.innerHTML="Artist"
        localStorage.setItem('artist', 'true');
        //TODO: set database artist value
        //TODO: show artist options
    }
})