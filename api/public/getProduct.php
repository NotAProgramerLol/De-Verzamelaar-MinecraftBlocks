<?php
header("Content-Type: application/json");
require_once "../keys/LoginDB.php";
$ID = $_GET["ID"];
if (!isset($ID) || $ID == "") {
    echo json_encode(array(["response" => "Failed", "data" => ["message" => "Er is geen ID gegeven!"]]));
    exit;
}
$query = "SELECT `ID`,`ProductName`, `ProductDescription`, `ProductPrice`, `ProductAvailability`, `ProductImage` FROM `Products` WHERE `ID` = '$ID'";

$product = mysqli_query($dbConnection, $query);
$response = [];
if (mysqli_num_rows($product) == 0) {
    echo json_encode(array(["response" => "Failed", "data" => ["message" => "Er is geen product met dit ID!"]]));
    exit;
}
$row = mysqli_fetch_assoc($product);
$dataRow = ["ID" => $row["ID"], "Name" => $row["ProductName"], "Description" => $row["ProductDescription"], "Price" => $row["ProductPrice"], "Availability" => $row["ProductAvailability"], "Image" => $row["ProductImage"]];
array_push($response, $dataRow);


echo json_encode(array("response" => "Success", "data" => $response));