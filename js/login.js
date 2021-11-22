//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let newUserBtn = document.getElementById("Submit-New-User");

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

        newUsername.value = "";
        newFirstName.value = "";
        newPass.value = "";
        newEmail.value = "";
        newPhone.value = "";
        newConPass.value = "";
        newLastName.value = "";

    } else {
        //TODO: Add error message for password and confirmation password matching
    }
});