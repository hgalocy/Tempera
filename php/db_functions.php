<?php

// TODO: All functions need to be recreated utilizing JSON and POST
header('Content-Type: application/json');
include 'db_connection.php';

if( isset($_POST['functionname'])){
    switch($_POST['functionname']){
        case "AddUser":
            $username = $_POST['arguments'][0];
            $firstname = $_POST['arguments'][1];
            $lastname = $_POST['arguments'][2];
            $Email = $_POST['arguments'][3];
            $phone = $_POST['arguments'][4];
            $pword = $_POST['arguments'][5];

            AddUser($username, $firstname, $lastname, $Email, $phone, 0, $pword, null,
                null, null, null, 0, 0, 0, 0, 0,
                0);

            echo json_encode(array('uAdded' => 'successfully added user'));
            $_POST = array();
            break;

        case "Login":
            $email = $_POST['arguments'][0];
            $password = $_POST['arguments'][1];
            [$username, $isArtist] = LogIn($email, $password);
            cookieCreator('username', $username);
            cookieCreator('artist', $isArtist);
            echo json_encode(array('result' => $username . "," . $isArtist));
            $_POST = array();
            break;

        case "Get-Featured-Artist":
            [$username, $photo] = GetFeaturedArtist();
            echo json_encode(array('result' => $username . "," . $photo));
            break;

        case "Get-Featured-Artwork":
            [$itemName, $price, $image] = GetFeaturedArtwork();
            echo json_encode(array('result' => $itemName . ","  . $price . "," . $image));
            break;
    }
}

function cookieCreator( $name, $data ){
    $domain = ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false;
    setcookie($name, $data, [
        'expires' => 2147483647,
        'path' =>'/',
        'domain'=> $domain,
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict']);
}

function cookieDeleter($name){
    setcookie($name, "", time()-3600, '/');
}

function LogIn($email, $password){
    $conn = Connect();

    $inputQuery = "SELECT Username, IsArtist\n" .
        "FROM tempera.account\n" .
        "WHERE Email = \"" . $email . "\" AND PasswordHash = SHA2(CONCAT(\"" . $password . "\", CAST(salt AS CHAR(40))), 512);";

    $results = $conn->query($inputQuery);
    CloseConnect($conn);

    if($results->num_rows > 0) {
        $result = $results->fetch_assoc();
        return [$result["Username"], $result["IsArtist"]];
    } else
    {
        return "No account found.";
    }
}

function GetFeaturedArtist(){
    $conn = Connect();

    $inputQuery = "SELECT Username, Photo\n" .
    "FROM tempera.account\n" .
    "WHERE IsArtist = 1\n" .
    "ORDER BY RAND()\n" .
    "LIMIT 1;";

    $results = $conn -> query($inputQuery);

    CloseConnect($conn);

    if($results->num_rows > 0){
        $result = $results->fetch_assoc();
        return[$result["Username"], $result["Photo"]];
    } else {
        return "No current artists.";
    }
}

function GetFeaturedArtwork(){
    $conn = Connect();

    $inputQuery = "SELECT ItemName, Price, Image\n" .
        "FROM tempera.items\n" .
        "ORDER BY RAND()\n" .
        "LIMIT 1;";

    $results = $conn -> query($inputQuery);

    CloseConnect($conn);

    if($results->num_rows > 0){
        $result = $results->fetch_assoc();
        return[$result["ItemName"], $result["Price"], $result["Image"]];
    } else {
        return "No items uploaded to website";
    }

}

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

    mysqli_query($conn, $inputQuery);

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

    CloseConnect($conn);
}

?>