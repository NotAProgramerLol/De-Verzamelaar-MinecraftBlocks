<?php
if ($_SERVER["HTTPS"] != "on") {
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
}
header("Content-Type: application/json");
require_once "../auth/checkUser.php";
$items = $_POST["Items"];
if ($items == "" || !isset($items)) {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Er zijn geen items om toe te voegen"]));
    exit;
}
print_r($items);
for ($i = 0; $i < count($items); $i++) {
    $checkAv = mysqli_query($dbConnection, "SELECT `ID`, `ProductAvailability` FROM `Products` WHERE `ID` = '" . $items[$i]["ID"] . "'");
    if (mysqli_num_rows($checkAv) == 0) {
        echo json_encode(array("response" => "Failed", "data" => ["message" => "Een item dat je probeert te kopen is niet meer beschikbaar"]));
        exit;
    }
}
for ($i = 0; $i < count($items); $i++) {
    $result = mysqli_query($dbConnection, "INSERT INTO `Collection` (`Order`,`Product`) VALUES ('" . $userDetails["ID"] . "', '" . $items[$i]["ID"] . "')");
    if (!$result) {
        echo json_encode(array("response" => "Failed", "data" => ["message" => "Iets is er fout gegaan!"]));
        exit;
    }
    $checkAv = mysqli_query($dbConnection, "SELECT `ID`, `ProductAvailability` FROM `Products` WHERE `ID` = '" . $items[$i]["ID"] . "'");
    $checkAv = mysqli_fetch_assoc($checkAv);
    $remove = mysqli_query($dbConnection, "UPDATE `Products` SET `ProductAvailability` = '" . (intval($checkAv["ProductAvailability"]) - 1) . "' WHERE `ID` = '" . $items[$i]["ID"] . "'");
}
echo json_encode(array("response" => "Success", "data" => ["message" => "De items zijn toegevoegd"]));