//TODO allow submitting mesages to database
//TODO load whether art is favorited already on page load
let favorited = document.getElementById("favorited");
favorited.addEventListener("click", function(){
    if(localStorage.getItem("favorited") === '1'){ //flip to non artist
        favorited.src = "../images/favorite.png";
        localStorage.setItem("favorited", "0");
    }
    else{ //flip to artist
        localStorage.setItem("favorited", '1');
        favorited.src = "../images/favorite2.png";
    }
})