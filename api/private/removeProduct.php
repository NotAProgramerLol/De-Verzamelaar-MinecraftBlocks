<?php
if ($_SERVER["HTTPS"] != "on") {
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
}
header("Content-Type: application/json");
require_once "../auth/checkUser.php";

if ($userDetails["Role"] != "Beheerder") {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Je hebt niet genoeg rechten!"]));
    exit;
}
$ID = $_POST["ID"];
$result = mysqli_query($dbConnection, "SELECT `ID`,`ProductName` FROM `Products` WHERE `ID` = '$ID'");
if (mysqli_num_rows($result) == 0) {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Dit product bestaat niet!"]));
    exit;
}

$file_pattern = "../public/img/products/" . mysqli_fetch_assoc($result)["ProductName"] . ".*"; // Assuming your files are named like profiles/bb-x62.foo, profiles/bb-x62.bar, etc.
array_map("unlink", glob($file_pattern));

$delete = mysqli_query($dbConnection, "DELETE FROM `Products` WHERE `ID` = '$ID'");
if (!$delete) {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Er is iets fout gegaan!"]));
    exit;
}
echo json_encode(array("response" => "Success", "data" => ["message" => "Het product is verwijderd!"]));