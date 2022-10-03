<?php
header("Content-Type: application/json");
require_once "../keys/LoginDB.php";
$SearchableID = $_GET["ID"];
if (!isset($SearchableID) || $SearchableID == "") {
    echo json_encode(array(["response" => "Failed", "data" => ["message" => "Er is geen ID gegeven!"]]));
    exit;
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