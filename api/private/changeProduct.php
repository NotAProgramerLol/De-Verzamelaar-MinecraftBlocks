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
$productID = $_POST["ID"];