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
if (!isset($productID) || $productID == "") {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Er is geen product gegeven"]));
    exit;
}
$oldInfo = mysqli_query($dbConnection, "SELECT * FROM `Accounts` WHERE `ID` = '" . $productID . "'");
if (mysqli_num_rows($oldInfo) == 0) {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Dit product bestaat niet"]));
    exit;
}
$oldInfo = mysqli_fetch_assoc($oldInfo);
$nameInput = $_POST["name"];
$descriptionInput = $_POST["description"];
$priceInput = $_POST["price"];
$availabilityInput = $_POST["availability"];
if (!isset($nameInput) || $nameInput == "") {
    $nameInput = $oldInfo["ProductName"];
}
if (!isset($priceInput) || $priceInput == "") {
    $priceInput = $oldInfo["ProductPrice"];
}
if (!isset($descriptionInput) || $descriptionInput == "") {
    $descriptionInput = $oldInfo["ProductDescription"];
}
if (!isset($availabilityInput) || $availabilityInput == "") {
    $availabilityInput = $oldInfo["ProductAvailability"];
}
$imgInput = $_FILES["img"];
$target_dir = "../public/img/products/";
$imageFileType = strtolower(pathinfo($imgInput["name"], PATHINFO_EXTENSION));
if (isset($imgInput) || $imgInput != "") {
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
    if (move_uploaded_file($imgInput["tmp_name"], $target_dir . $productName . "." . strtolower(pathinfo($imgInput["name"], PATHINFO_EXTENSION)))) {
        $result = mysqli_query($dbConnection, "INSERT INTO `Products` (`ProductName`, `ProductDescription`, `ProductPrice`, `ProductAvailability`, `ProductImage`)
        VALUES ('$nameInput', '$descriptionInput', '$priceInput', '$availabilityInput', 'https://87609.stu.sd-lab.nl/beroeps/verzamelaar/api/public/img/products/" . $oldInfo["ProductName"] . "." . strtolower(pathinfo($imgInput["name"], PATHINFO_EXTENSION)) . "')");
        if (!$result) {
            echo json_encode(array("response" => "Failed", "data" => ["message" => "Kon niet uploaden naar de database!"]));
            exit;
        }
        echo json_encode(array("response" => "Success", "data" => ["message" => "Het item is nu aangepast!"]));
        exit;
    }
    else {
        echo json_encode(array("response" => "Failed", "data" => ["message" => "Er was een error bij het uploaden van je image probeer het opnieuw"]));
        exit;
    }
}
$result = mysqli_query($dbConnection, "INSERT INTO `Products` (`ProductName`, `ProductDescription`, `ProductPrice`, `ProductAvailability`)
        VALUES ('$nameInput', '$descriptionInput', '$priceInput', '$availabilityInput')");
if (!$result) {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Kon niet uploaden naar de database!"]));
    exit;
}
echo json_encode(array("response" => "Success", "data" => ["message" => "Het item is nu aangepast!"]));