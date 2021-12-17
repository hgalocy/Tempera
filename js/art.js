//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let itemTitle = document.getElementById("item-title");
let itemImg = document.getElementById("art-photo");
let itemDesc = document.getElementsByClassName("description");
let itemPrice = document.getElementsByClassName("price")[0];

let recArtTitle = document.getElementsByClassName('art-title-label');
let recArtPrice = document.getElementsByClassName('art-price-label');
let recArtImg = document.getElementsByClassName('art-listing-img');

window.onload = function() {

    itemTitle.textContent = localStorage.getItem("ItemName");

    jQuery.ajax({
        url: '../php/db_functions.php',
        dataType: 'json',
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

    for( var i = 0; i < recArtTitle.length; i++){
        (function(e) {
            jQuery.ajax({
                url: '../php/db_functions.php',
                dataType: 'json',
                type: 'post',
                data: {functionname: 'Get-Featured-Artwork'},
                success: function (response) {
                    if (!(response.result === 'No items uploaded to website.')) {
                        var data = response.result.split(",");
                        recArtTitle[e].textContent = String(data[0]);
                        var priceString = "$".concat(String(data[1]));
                        recArtPrice[e].textContent = priceString;
                        recArtImg[e].src = String(data[2]);
                    }
                }
            });
        })(i);
    }

};
