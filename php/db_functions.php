<?php

header('Content-Type: application/json');
include 'db_connection.php';

$username = 'DirectoryTest2';

if( isset($_POST['functionname'])){
    switch($_POST['functionname']){
        case "SetImgUsername":
            $username = $_POST['arguments'][0];
            break;

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
            $numItems = $_POST['arguments'];
            $artistData = GetFeaturedArtwork($numItems);
            echo json_encode(array('result' => $artistData));
            break;

        case "Get-Item":
            $itemName = $_POST['arguments'];
            [$itemDesc, $itemPrice, $itemImg] = GetItemDetails($itemName);
            echo json_encode(array('result' => $itemDesc . "," . $itemPrice . "," . $itemImg));
            break;

        case "Get-Artist-Data":
            $username = $_POST['arguments'];
            [$location, $delivery, $photo, $bio] = GetArtistData($username);
            echo json_encode(array('result' => $location . "*" . $delivery . "*" . $photo . "*" . $bio));
            break;

        case "Set-IsArtist":
            $username = $_POST['arguments'][0];
            $value = $_POST['arguments'][1];
            IsArtist($username, $value);
            break;

        case "Get-Artwork-Title":
            $itemName = GetArtworkTitle();
            echo json_encode(array('result' => $itemName));
            break;

        case "Get-Num-Artists":
            $numArtists = GetNumArtists();
            echo json_encode(array('result' => $numArtists));
            break;

        case "Get-Artist-Names":
            $artistNames = GetArtistNames();
            echo json_encode(array('result' => $artistNames));
            break;

        case "Get-Num-Items":
            $numItems = GetNumItems();
            echo json_encode(array('result' => $numItems));
            break;

        case "Get-Item-Names":
            $itemNames = GetItemNames();
            echo json_encode(array('result' => $itemNames));
            break;

        case "saveUserPhoto": //fix this garbage pls
            $target_dir = "../images"; //TODO change to be correct directory
            move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file);
            break;

    }
} else {

    if(isset($_FILES['file']['name'])){

        /* Getting file name */
        $filename = $_FILES['file']['name'];

        /* Location */
        $location = "C:/xampp/htdocs/images/user_pictures/" . $username . "/" .$filename;
        $imageFileType = pathinfo($location,PATHINFO_EXTENSION);
        $imageFileType = strtolower($imageFileType);

        /* Valid extensions */
        $valid_extensions = array("jpg","jpeg","png");

        $response = 0;
        /* Check file extension */
        if(in_array(strtolower($imageFileType), $valid_extensions)) {
            /* Upload file */
            if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
                $response = $location;
            }
        }

        echo $response;
        exit;
    }

    echo 0;
}

function IsArtist($username, $value){
    $inputQuery = "CALL tempera.setIsArtist(\"" . $username . "\", " . $value . ");";
    $conn = Connect();
    mysqli_query($conn, $inputQuery);
    CloseConnect($conn);
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

function GetItemDetails($itemName){
    $inputQuery = "SELECT ItemDescription, Price, Image\n" .
        "FROM tempera.items\n" .
        "WHERE ItemName = \"" . $itemName . "\";";

    $conn = Connect();
    $results = $conn -> query($inputQuery);
    CloseConnect($conn);

    if( $results->num_rows > 0){
        $result = $results->fetch_assoc();
        return[$result["ItemDescription"], $result["Price"], $result["Image"]];
    } else {
        return "Item not found.";
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

function GetFeaturedArtwork($numItems){
    $conn = Connect();

    $inputQuery = "SELECT DISTINCT ItemName, Price, Image\n" .
        "FROM tempera.items\n" .
        "ORDER BY RAND()\n" .
        "LIMIT " . intval($numItems) . ";";

    $results = $conn -> query($inputQuery);

    CloseConnect($conn);

    if( $results->num_rows > 0){
        $result = "";
        while( $row = $results->fetch_assoc()){
            $result .= $row['ItemName'] . "," . $row['Price'] . "," . $row['Image'] . ",";
        }
        return $result;
    } else {
        return "No Items";
    }

}

function GetNumArtists(){
    $inputQuery = "SELECT count(Username)\n" .
        "AS output\n" .
        "FROM tempera.account\n" .
        "WHERE IsArtist = 1;";

    $conn = Connect();
    $results = $conn -> query($inputQuery);
    CloseConnect($conn);

    if( $results->num_rows > 0){
        $result = $results->fetch_assoc();
        return[$result["output"]];
    } else {
        return "Error";
    }
}

function GetArtistNames(){
    $inputQuery = "SELECT Username\n" .
        "FROM tempera.account\n" .
        "WHERE IsArtist = 1;";

    $conn = Connect();
    $results = $conn -> query($inputQuery);
    CloseConnect($conn);

    if( $results->num_rows > 0){
        $result = "";
        while( $row = $results->fetch_assoc()){
            $result .= $row['Username'] . ",";
        }
        return $result;
    } else {
        return "No Artists";
    }
}

function GetNumItems(){
    $inputQuery = "SELECT count(ItemName)\n" .
        "AS output\n" .
        "FROM tempera.items;";

    $conn = Connect();
    $results = $conn -> query($inputQuery);
    CloseConnect($conn);

    if( $results->num_rows > 0){
        $result = $results->fetch_assoc();
        return[$result["output"]];
    } else {
        return "Error";
    }
}

function GetItemNames(){
    $inputQuery = "SELECT ItemName\n" .
        "FROM tempera.items;";

    $conn = Connect();
    $results = $conn -> query($inputQuery);
    CloseConnect($conn);

    if( $results->num_rows > 0){
        $result = "";
        while( $row = $results->fetch_assoc()){
            $result .= $row['ItemName'] . ",";
        }
        return $result;
    } else {
        return "No Items";
    }
}

function GetArtworkTitle(){
    $inputQuery = "SELECT ItemName\n" .
        "FROM tempera.items\n" .
        "ORDER BY RAND()\n" .
        "LIMIT 1;";

    $conn = Connect();
    $results = $conn -> query($inputQuery);
    CloseConnect($conn);

    if($results->num_rows > 0){
        $result = $results->fetch_assoc();
        return[$result["ItemName"]];
    } else {
        return "No items uploaded to website.";
    }
}

function GetArtistData($userName){
    $inputQuery = "SELECT Location, Delivery, Photo, Bio\n" .
        "FROM tempera.account\n" .
        "WHERE Username = \"" . $userName . "\";";

    $conn = Connect();
    $results = $conn -> query($inputQuery);
    CloseConnect($conn);

    if( $results->num_rows > 0){
        $result = $results->fetch_assoc();
        return[$result["Location"], $result["Delivery"], $result["Photo"], $result["Bio"]];
    } else {
        return "Artist not found";
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

    mkdir("C:/xampp/htdocs/images/user_pictures/" . $userName . "/artworks", 0777, TRUE);
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

   mysqli_query($conn, $inputQuery);

    CloseConnect($conn);
}

?>