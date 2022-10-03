<?php
header("Content-Type: application/json");
require_once "../keys/LoginDB.php";
$query = "SELECT `ProductName`, `ProductDescription`, `ProductPrice`, `ProductAvailability`, `ProductImage` FROM `Products`";
if (isset($_GET["onlyAvailable"]) && $_GET["onlyAvailable"] != "") {
    $query = "SELECT `ProductName`, `ProductDescription`, `ProductPrice`, `ProductAvailability`, `ProductImage` FROM `Products` WHERE `ProductAvailability` > 0";
}
$product = mysqli_query($dbConnection, $query);
$response = [];
if ($product->num_rows > 0) {
    while ($row = $product->fetch_assoc()) {
        $dataRow = ["Name" => $row["ProductName"], "Description" => $row["ProductDescription"], "Price" => $row["ProductPrice"], "Availability" => $row["ProductAvailability"], "Image" => $row["ProductImage"]];
        array_push($response, $dataRow);
    }
}
echo json_encode($response);