//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let loginDiv = document.getElementById("LoginDiv");
let signUpDiv = document.getElementById("SignUpDiv");

let newUserBtn = document.getElementById("Submit-New-User");
let loginBtn = document.getElementById("Submit-Login");

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

    if( newPass.value === newConPass.value) {
        $.post('../php/db_functions.php', {
            functionname: 'AddUser',
            arguments: [newUsername.value, newFirstName.value, newLastName.value, newEmail.value,
                newPhone.value, newPass.value]
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
        //TODO: Add error message for password and confirmation password matching
    }
});

loginBtn.addEventListener("click", () =>{
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    jQuery.ajax({
        url: '../php/db_functions.php',
        dataType: 'json',
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
                //TODO: Alert user that input cannot be found in database
            }
        }
    });

});