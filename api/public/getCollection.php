<?php
header("Content-Type: application/json");
require_once "../keys/LoginDB.php";
$SearchableID = $_GET["ID"];
$JWT = $_COOKIE["JWT"];
if (!isset($SearchableID) || $SearchableID == "") {
    if (!isset($JWT) || $JWT == "") {
        echo json_encode(array(["response" => "Failed", "data" => ["message" => "Er is geen ID gegeven!"]]));
        exit;
    }
    $JSON = json_decode(base64_decode(explode(".", $JWT)[1]));

    $checkIfUserExist = mysqli_query($dbConnection, "SELECT * FROM `Accounts` WHERE `ID` = '" . $JSON->ID . "' AND `Email` = '" . $JSON->email . "' LIMIT 1");
    if (mysqli_num_rows($checkIfUserExist) == 0) {
        echo json_encode(array(["response" => "Failed", "data" => ["message" => "Er is geen ID gegeven!"]]));
        exit;
    }
    $userDetails = mysqli_fetch_assoc($checkIfUserExist);
    $SearchableID = $userDetails["SearchableID"];


}
$query = "SELECT `ID` FROM `Accounts` WHERE `SearchableID` = '$SearchableID' LIMIT 1";

$account = mysqli_query($dbConnection, $query);

if (mysqli_num_rows($account) == 0) {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Er is geen collectie met dit ID!"]));
    exit;
}
$accountInfo = mysqli_fetch_assoc($account);
$query = "SELECT * FROM `Collection` WHERE `Order` = " . $accountInfo['ID'];
$collection = mysqli_query($dbConnection, $query);
$response = [];
if (mysqli_num_rows($collection) > 0) {
    while ($row = mysqli_fetch_assoc($collection)) {
        array_push($response, $row["Product"]);
    }
}

echo json_encode(array("response" => "Success", "data" => $response));