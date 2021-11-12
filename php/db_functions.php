<?php
include 'db_connection.php';
// TODO: All functions need to be recreated utilizing JSON and POST

/*
 * varchar(40)  : userName, firstName, lastName, email, password
 * varchar(10)  : phoneNumber
 * varchar(64)  : delivery
 * bool         : isArtist, specPainting, specDigitalPainting, specTextile, specEmbroidery, specPottery, ...
 *                specSculpture
 * text         : bio, location
 * varchar(250) : responseMessage
 * ???          : photo
 */

function AddUser($userName, $firstName, $lastName, $email, $phoneNumber, $isArtist, $password, $delivery, $photo,
$bio, $location, $specPainting, $specDigitalPainting, $specTextile, $specEmbroidery, $specPottery, $specSculpture)
{
    //Connect to MySQL database
    $conn = Connect();

    $inputQuery = 'CALL tempera.addUser( \'' . $userName . '\', \'' . $firstName . '\', \'' . $lastName .
        '\', \'' . $email . '\', \'' . $phoneNumber . '\', ' . $isArtist . ', \'' . $password . '\', \'' . $delivery .
        '\', \'' . $photo . '\', \'' . $bio . '\', \'' . $location . '\', ' . $specPainting . ', ' .
        $specDigitalPainting . ', ' . $specTextile . ', ' . $specEmbroidery . ', ' . $specPottery . ', ' .
        $specSculpture . ', ' . '@responseMessage);';


    echo $inputQuery;

    //Call addUser function, input user data into account table of database
    //mysqli_query($conn, $inputQuery);

    CloseConnect($conn);
}

/*
 * varchar(20)    : itemName
 * varchar(40)    : username, password
 * text           : itemDescription
 * bool           : painting, pottery, textile, sculpture, embroidery
 * decimal(65,2)  : price
 * mediumBlob     : image
 * varchar(250)   : responseMessage
 */
function AddItem( $itemName, $itemDescription, $painting, $digitalPainting, $pottery, $textile, $sculpture,
                    $embroidery, $image, $price, $soldOut, $username, $password)
{
    //Connect to MySQL database
    $conn = Connect();

    $responseMessage = '';

    $inputQuery = 'CALL addItem(\'' . $itemName . '\', \'' . $itemDescription . '\', ' . $painting . ', ' .
        $digitalPainting . ', ' . $pottery . ', ' . $textile . ', ' . $sculpture . ', ' . $embroidery . ', \'' .
        $image . '\', ' . $price . ', ' . $soldOut . ', \'' . $username . '\', \'' . $password .
        '\', @responseMessage);';

    echo $inputQuery;

   mysqli_query($conn, $inputQuery);

    CloseConnect($conn, $inputQuery);
}

?>