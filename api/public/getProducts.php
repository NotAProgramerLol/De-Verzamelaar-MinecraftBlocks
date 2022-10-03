<?php
header("Content-Type: application/json");
require_once "../keys/LoginDB.php";
$query = "SELECT `ID`,`ProductName`, `ProductDescription`, `ProductPrice`, `ProductAvailability`, `ProductImage` FROM `Products`";
if (isset($_GET["onlyAvailable"]) && $_GET["onlyAvailable"] != "") {
    $query = "SELECT `ID`,`ProductName`, `ProductDescription`, `ProductPrice`, `ProductAvailability`, `ProductImage` FROM `Products` WHERE `ProductAvailability` > 0";
}
$product = mysqli_query($dbConnection, $query);
$response = [];
if (mysqli_num_rows($product) > 0) {
    while ($row = $product->fetch_assoc()) {
        $dataRow = ["ID" => $row["ID"], "Name" => $row["ProductName"], "Description" => $row["ProductDescription"], "Price" => $row["ProductPrice"], "Availability" => $row["ProductAvailability"], "Image" => $row["ProductImage"]];
        array_push($response, $dataRow);
    }
}
echo json_encode(array("response" => "Success", "data" => $response));