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
$productName = $_POST["name"];
$productDescription = $_POST["description"];
$productPrice = $_POST["price"];
$productAvailability = $_POST["availability"];
$target_dir = "../public/img/products/";
$imageFileType = strtolower(pathinfo($_FILES["img"]["name"], PATHINFO_EXTENSION));
if ((!isset($productName) || $productName == "") || (!isset($productDescription) || $productDescription == "") || (!isset($productPrice) || $productPrice == "") || (!isset($productAvailability) || $productAvailability == "")) {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Of de naam, descriptie, prijs of beschikbaarheid is niet ingevult!"]));
    exit;
}
// Check if image file is a actual image or fake image

$check = getimagesize($_FILES["img"]["tmp_name"]);
if ($check !== false) {
}
else {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Het bestand is geen image!"]));
    exit;
}
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif") {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Het bestand moet een JPG, JPEG, PNG of GIF zijn"]));
    exit;
}
if (move_uploaded_file($_FILES["img"]["tmp_name"], $target_dir . $productName . "." . strtolower(pathinfo($_FILES["img"]["name"], PATHINFO_EXTENSION)))) {
    $result = mysqli_query($dbConnection, "INSERT INTO `Products` (`ProductName`, `ProductDescription`, `ProductPrice`, `ProductAvailability`, `ProductImage`)
    VALUES ('$productName', '$productDescription', '$productPrice', '$productAvailability', 'https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/public/img/products/$productName." . strtolower(pathinfo($_FILES["img"]["name"], PATHINFO_EXTENSION)) . "')");
    if (!$result) {
        echo json_encode(array("response" => "Failed", "data" => ["message" => "Kon niet uploaden naar de database!"]));
        exit;
    }
    echo json_encode(array("response" => "Success", "data" => ["message" => "Het nieuwe item is nu toegevoegd!"]));
    exit;
}
else {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Er was een error bij het uploaden van je image probeer het opnieuw"]));
    exit;
}