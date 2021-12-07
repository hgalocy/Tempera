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

    console.log("executed")
    if(localStorage.getItem("IsArtist") === "0"){ //flip to non artist
        artistBtn.style.backgroundColor = "gray";
        artistBtn.innerHTML="Not Artist"

        $.post('../php/db_functions.php', {
            functionname: 'Set-IsArtist',
            arguments: [localStorage.getItem("Username"), "0"]
        });
    }
    else{ //flip to artist
        artistBtn.style.backgroundColor = "var(--secondary-color";
        artistBtn.innerHTML="Artist"
        $.post('../php/db_functions.php', {
            functionname: 'Set-IsArtist',
            arguments: [localStorage.getItem("Username"), "1"]
        });
    }
}

let artistBtn = document.getElementById("artistBtn");
artistBtn.addEventListener("click", function(){
    if(localStorage.getItem("IsArtist") === '1'){ //flip to non artist
        artistBtn.style.backgroundColor = "gray";
        artistBtn.innerHTML="Not Artist"
        localStorage.setItem("IsArtist", "0");
        divArtist.style.display = "none";
    }
    else{ //flip to artist
        artistBtn.style.backgroundColor = "var(--secondary-color";
        artistBtn.innerHTML="Artist"
        localStorage.setItem("IsArtist", '1');
        divArtist.style.display = "flex";
    }
})