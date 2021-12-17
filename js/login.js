//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let loginDiv = document.getElementById("LoginDiv");
let signUpDiv = document.getElementById("SignUpDiv");

let newUserBtn = document.getElementById("Submit-New-User");
let loginBtn = document.getElementById("Submit-Login");

let inputs = document.getElementsByTagName('input'); //list of all input elements

switch(sessionStorage.getItem("LoginSignup")){
    case "Login":
        signUpDiv.style.display = "none";
        loginDiv.style.display = "flex";
        break;

    case "Signup":
        signUpDiv.style.display = "flex";
        loginDiv.style.display = "none";
        break;
}

newUserBtn.addEventListener("click", () => {
    let newUsername = document.getElementById("newUsername");
    let newFirstName = document.getElementById("newFirstName");
    let newLastName = document.getElementById("newLastName");
    let newEmail = document.getElementById("newEmail");
    let newPhone = document.getElementById("newPhoneNum");
    let newPass = document.getElementById("newPassword");
    let newConPass = document.getElementById("newConPassword");
    if(ValidateEmail(newEmail.value) && ValidatePhoneNumber(newPhone.value) && emptyFields()){ //email & number format is correct
        if( newPass.value === newConPass.value) {

            jQuery.ajax({
                url: '../php/db_functions.php',
                async: false,
                dataType: 'json',
                type: 'post',
                data: {functionname: 'AddUser', arguments: [newUsername.value, newFirstName.value, newLastName.value,
                    newEmail.value, newPhone.value, newPass.value]}
            });

            localStorage.setItem('Username', String(newUsername.value));

            newUsername.value = "";
            newFirstName.value = "";
            newPass.value = "";
            newEmail.value = "";
            newPhone.value = "";
            newConPass.value = "";
            newLastName.value = "";

            document.location.href = '../html/main.html';

        } else {
            alertTop("Password and confirmation password must match!")
        }
    }
});

loginBtn.addEventListener("click", () =>{
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    jQuery.ajax({
        url: '../php/db_functions.php',
        dataType: 'json',
        async: false,
        type: "post",
        data: {functionname: 'Login', arguments: [email.value, password.value]},
        success: function(response){
            if(!(response.result === 'No account found.')){
                var data = response.result.split(",");
                localStorage.setItem('Username', String(data[0]));
                localStorage.setItem('IsArtist', String(data[1]));

                email.value = "";
                password.value = "";
                window.location = '../html/main.html';
            } else {
                alertTop("Invalid Login Credentials")
            }
        }
    });

});

//validate fields
function ValidateEmail(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true
  }
  alertTop("You have entered an invalid email address!")
    return false
}
function ValidatePhoneNumber(number)
{
  var phoneno = /^\d{10}$/;
  if(number.match(phoneno)){
    return true;
  }
  else{
    alertTop("You have entered an invalid phone number!")
    return false;
  }
}
//make sure all fields are filled out
function emptyFields(){
    let emptyFlag = 0;
    for (let i = 0; i < inputs.length; i += 1) {
        if(inputs[i].value === ""){
            emptyFlag = 1;
        }
    }
    if(emptyFlag){
        alertTop("Fill out all fields!")
        return 0;
    }
    else{
        return 1;
    }
}

//no slashes or backslashes in any inputs
for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].addEventListener("keypress", event => {
        if ("\\" === (event.key) || "/" === (event.key)) {
          event.preventDefault();
        }
    });
}
//communicates with index.js to alert()
function alertTop(mess){
    window.parent.postMessage("from iframe:" + mess, '*');
}
