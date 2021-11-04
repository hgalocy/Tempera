<?php
include 'db_functions.php';

$imageString = 'C:/Users/andre/Desktop/Jerry_Face.jpg';

AddUser('PHPEntry', 'PHP', 'Data', 'php@email.com', 1234567890,
        1, 'SecretPassword', 'Send data via website', $imageString,
          'Information added remotely', '123 Address Lane', 0, 1,
     0, 0, 0, 0);

AddItem('Beeg Stick', 'Like a stick... but bigger', 0, 0, 0, 0,
        1, 0, $imageString, 199.99, 0, 'PHPEntry', 'SecretPassword');

?>