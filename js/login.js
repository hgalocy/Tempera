//include jquery 3.4.1
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

const newEmail = document.getElementById("newEmail");
const newPassword = document.getElementById("newPassword");
const newConPassword = document.getElementById("newConPassword");
const newUsername = document.getElementById("newUsername");
const newPhoneNum = document.getElementById("newPhoneNum");
const newFirstName = document.getElementById("newFirstName");
const newLastName = document.getElementById("newLastName");


//Submit a request to create a new user in the database
document.getElementById("Submit-New-User").addEventListener("click", function(){
    if( newPassword.localeCompare(newConPassword) === 0){
        jQuery.ajax({
            type: "POST",
            url: '../php/db_functions.php',
            dataType: 'json',
            data: {functionname: 'AddUser', arguments: [newUsername, newFirstName, newLastName, newEmail,
                    newPhoneNum, 0, newPassword, null, null, null, null, 0, 0, 0, 0, 0, 0]},

            success: function(obj, textstatus) {
                if(!('error' in obj)){

                } else {
                    console.log(obj.error);
                }

            }

        })
    }
});