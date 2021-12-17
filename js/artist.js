//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let artistData = document.getElementsByClassName("artist-text");
let artistPhoto = document.getElementsByClassName("artist-photo")[0];


let artistWorkTitle = document.getElementsByClassName('art-title-label');
let artistWorkPrice = document.getElementsByClassName('art-price-label');
let artistWorkImg = document.getElementsByClassName('art-listing-img');

function fillArtistListing(imSrc, price, title){
    var ul = document.getElementById("art-list");
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.src = imSrc;
    li.appendChild(img);
    li.appendChild(document.createTextNode(price));
    li.appendChild(document.createTextNode(title));
    li.setAttribute("class", "store-option")
    ul.appendChild(li);
}

window.onload = function(){
    artistName.textContent = localStorage.getItem("ArtistName");

    document.getElementById("artist-name").textContent = localStorage.getItem("ArtistName");
    jQuery.ajax({
        url: '../php/db_functions.php',
        dataType: 'json',
        async: false,
        type: 'post',
        data: {functionname: 'Get-Artist-Data', arguments: localStorage.getItem("ArtistName")},
        success: function (response) {
            if (!(response.result === 'Artist not found')) {
                var data = response.result.split("*");
                artistData[0].textContent = String(data[0]);
                artistData[1].textContent = String(data[1]);
                artistPhoto.src = String(data[2]);
                artistData[3].textContent = String(data[3]);

            }
        }
    });

    jQuery.ajax({
        url: '../php/db_functions.php',
        async: false,
        dataType: 'json',
        type: 'post',
        data: {functionname: 'Get-Artists-Work', arguments: localStorage.getItem("ArtistName")} ,
        success: function (response) {
            if (!(response.result === 'No items uploaded to website.')) {
                var data = response.result.split(",");
                //artistWorkTitle[0].textContent = String(data[0]);
                for( var e = 0; e < artistWorkTitle.length; e++ ){
                    artistWorkTitle[e].textContent = String(data[e * 3]);
                    var priceString = "$".concat(String(data[(e * 3) + 1]));
                    artistWorkPrice[e].textContent = priceString;
                    artistWorkImg[e].src = String(data[(e * 3) + 2]);

                    //var titleString = String(data[e * 3]);
                    //var priceString = "$".concat(String(data[(e * 3) + 1]));
                    //var imgSrcString = String(data[(e * 3) + 2]);
                    //fillArtistListing(imgSrcString, priceString, titleString);
                }
            } else {
                artistWorkTitle[0].textContent = "Failed";
            }
        }
    });
}