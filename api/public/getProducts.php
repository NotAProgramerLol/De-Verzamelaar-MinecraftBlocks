<?php 
    header("Content-Type: application/json");
    require_once("../keys/LoginDB.php");
    $product = $dbConnection->query("SELECT `ProductName`, `ProductDescription`, `ProductPrice`, `ProductAvailability`, `ProductImage` FROM `Products`");
    $response = [];
    if($product->num_rows > 0) {
        while($row = $product->fetch_assoc()) {
            $dataRow = ["Name" => $row["ProductName"], "Description" => $row["ProductDescription"], "Price" => $row["ProductPrice"], "Availability" => $row["ProductAvailability"], "Image" => $row["ProductImage"]];
            array_push($response, $dataRow);
        }
    }
    echo json_encode($response);