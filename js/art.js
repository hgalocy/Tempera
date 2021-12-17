//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let itemTitle = document.getElementById("item-title");
let itemImg = document.getElementById("art-photo");
let itemDesc = document.getElementsByClassName("description");
let itemPrice = document.getElementsByClassName("price")[0];

let favorited = document.getElementById("favorited");

let recArtTitle = document.getElementsByClassName('art-title-label');
let recArtPrice = document.getElementsByClassName('art-price-label');
let recArtImg = document.getElementsByClassName('art-listing-img');

window.onload = function() {



    var itemName = localStorage.getItem("ItemName");
    var username = localStorage.getItem("Username");
    itemTitle.textContent = localStorage.getItem("ItemName");

    jQuery.ajax({
        url: '../php/db_functions.php',
        dataType: 'json',
        type: 'post',
        async: false,
        data: {functionname: 'Check-If-Fav', arguments: [username, itemName]},
        success: function(response){
            localStorage.setItem("favorite", response);
            if( parseInt(localStorage.getItem("favorite")) >= 1) {
                favorited.src = "../images/favorite2.png";
            } else {
                favorited.src = "../images/favorite.png";
            }
        }
    });

    jQuery.ajax({
        url: '../php/db_functions.php',
        dataType: 'json',
        async: false,
        type: 'post',
        data: {functionname: 'Get-Item', arguments: localStorage.getItem("ItemName")},
        success: function (response) {
            if (!(response.result === 'Item not found.')) {
                var data = response.result.split(",");
                itemDesc[0].textContent = String(data[0]);
                var priceString = "$".concat(String(data[1]));
                itemPrice.textContent = priceString;
                itemImg.src = String(data[2]);
            }
        }
    });


    jQuery.ajax({
        url: '../php/db_functions.php',
        async: false,
        dataType: 'json',
        type: 'post',
        data: {functionname: 'Get-Featured-Artwork', arguments: recArtTitle.length} ,
        success: function (response) {
            if (!(response.result === 'No items uploaded to website.')) {
                var data = response.result.split(",");
                recArtTitle[0].textContent = String(data[0]);
                for( var e = 0; e < recArtTitle.length; e++ ){
                    recArtTitle[e].textContent = String(data[e * 3]);
                    var priceString = "$".concat(String(data[(e * 3) + 1]));
                    recArtPrice[e].textContent = priceString;
                    recArtImg[e].src = String(data[(e * 3) + 2]);
                }
            }
        }
    });

};


favorited.addEventListener("click", function(){
    if(localStorage.getItem("favorited") === '1'){ //flip to non artist
        favorited.src = "../images/favorite.png";
        localStorage.setItem("favorited", "0");
    }
    else{ //flip to artist
        localStorage.setItem("favorited", "1");
        favorited.src = "../images/favorite2.png";
    };

    var fav = localStorage.getItem("favorited");
    var uName = localStorage.getItem("Username");
    var iName = localStorage.getItem("ItemName");
    jQuery.ajax({
        url: '../php/db_functions.php',
        dataType: 'json',
        type: 'post',
        data: {functionname: 'SetFavorite', arguments: [fav, uName, iName]}

    });
})
