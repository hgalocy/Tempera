//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

//let divAccount = document.getElementById("basic-account");
let divArtist = document.getElementById("artist-account");
let artistDataSub = document.getElementById("Artist-Data-Update");
let fileData = document.getElementsByClassName("file");

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
    //TODO store in database when value changes
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

//adding a listing
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function closeForm() {
document.getElementById("myForm").style.display = "none";
}

let addBtn = document.getElementById("addBtn");
let titleIn = document.getElementById("titleIn");
let descrIn = document.getElementById("descrIn");
let priceIn = document.getElementById("priceIn");
addBtn.addEventListener("click", function(){
    if (titleIn.value == "" || descrIn.value == "" || priceIn.value == ""){
        alertTop("Enter values for all fields!")
    }
    else{
        //add listing
        addLi();
        //TODO database add item
    }
})
let smolBtns = document.getElementsByClassName("smolBtn");
let ul = document.getElementById("listings");
let lis = ul.getElementsByTagName("li");
function addLi() {
    let li = document.createElement("li");
    let h5 = document.createElement("h5");
    h5.innerHTML = titleIn.value;
    li.appendChild(h5);
    let btn = document.createElement("BUTTON");
    btn.classList.add("smolBtn");
    btn.innerHTML = "Delete";
    li.appendChild(btn);
    ul.appendChild(li);
    //update height of artist settings div
    let artistSet = document.getElementById("artist-account");
    var height = artistSet.offsetHeight;
    var newHeight = height + 32;
    artistSet.style.height = newHeight + 'px';
    smolBtns = document.getElementsByClassName("smolBtn");
    lis = ul.getElementsByTagName("li");
  }
//delete lisitng
document.getElementById("listings").addEventListener("click",function(e) {
    var tgt = e.target;
    if (tgt.parentElement.tagName.toUpperCase() == "LI") {
      tgt.parentNode.parentNode.removeChild(tgt.parentNode); // or tgt.remove();
      //update height of artist settings div
      let artistSet = document.getElementById("artist-account");
      var height = artistSet.offsetHeight;
      var newHeight = height - 32;
      artistSet.style.height = newHeight + 'px';
      //TODO remove from database
    }
});

//handle images
/* The uploader form */
var loadFile = function(event) {
	let image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
<<<<<<< HEAD
};

artistDataSub.addEventListener("click", function(){
    var fd = new FormData();
    var files = $('#file')[0].files;

    var blob = files[0].slice(0, files[0].size, 'image/jpeg');
    var newFile = new File([blob], 'name.jpeg', {type: 'image/jpeg'});


    if( files.length > 0 ) {
        fd.append('file', newFile);

        jQuery.ajax({
            url: '../php/db_functions.php',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                if( response !== 0){

                }
            }

        });


    } else {

    };
})
=======
    //save to folder  TODO
    /*$.post('../php/db_functions.php', {
        functionName: 'saveUserPhoto',
        arguments: [event.target.files[0]]
    });*/
};
var loadFile2 = function(event) {
	let image = document.getElementById('output2');
	image.src = URL.createObjectURL(event.target.files[0]);
    //save to folder  TODO
    /*$.post('../php/db_functions.php', {
        functionName: 'saveUserPhoto',
        arguments: [event.target.files[0]]
    });*/
};

>>>>>>> 761257fc6a73218bfb148915fb63f82a60476e0f

//communicates with index.js to alert()
function alertTop(mess){
    window.parent.postMessage("from iframe:" + mess, '*');
}