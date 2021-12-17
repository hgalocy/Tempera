//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let artistName = document.getElementById("artist-name");
let artistData = document.getElementsByClassName("artist-text");
let artistPhoto = document.getElementsByClassName("artist-photo")[0];

window.onload = function(){
    artistName.textContent = localStorage.getItem("ArtistName");

    jQuery.ajax({
        url: '../php/db_functions.php',
        dataType: 'json',
        type: 'post',
        data: {functionname: 'Get-Artist-Data', arguments: localStorage.getItem("ArtistName")},
        success: function (response) {
            if (!(response.result === 'Artist not found')) {
                var data = response.result.split("*");
                artistData[0].textContent = String(data[0]);
                artistData[1].textContent = String(data[1]);
                artistPhoto.src = String(data[2]);
                artistData[3].textContent = String(data[3]);

                /*itemDesc[0].textContent = String(data[0]);
                var priceString = "$".concat(String(data[1]));
                itemPrice.textContent = priceString;
                itemImg.src = String(data[2]);*/
            }
        }
    });

}