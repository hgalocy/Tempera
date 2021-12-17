<?php

function Connect()
{
    $dbhost = "localhost:3307";
    $dbuser = "website";
    $dbpass = "temperaWebservice";
    $dbname = "Tempera";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname)
    or die("Connection to database failed %s.\n". $conn -> error);

    return $conn;
}

function CloseConnect($conn)
{
    $conn -> close();
}

?>
