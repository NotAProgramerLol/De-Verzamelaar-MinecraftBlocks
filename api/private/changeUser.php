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
$accountID = $_POST["ID"];
$accountNewData = $_POST["newData"];
$changeable = ["Email", "Password", "Role"];


if (!isset($accountID) || $accountID == "") {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Er moet een ID van de gebruiker zijn!"]));
    exit;
}
if (!isset($accountNewData) || $accountNewData == "") {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Er moeten gegevens zijn om te veranderen!"]));
    exit;
}
$accountNewData = json_decode($accountNewData);
$query = "UPDATE `Accounts` SET ";
foreach ($accountNewData as $_arrayKey => $_arrayValues) {
    $_arrayKey = ucfirst($_arrayKey);
    if (!in_array($_arrayKey, $changeable)) {
        echo json_encode(array("response" => "Failed", "data" => ["message" => "Een opgestuurde value kan niet veranderd worden bij een gebruiker! $_arrayKey"]));
        exit;
    }
    if ($_arrayKey == "Email") {
        $_arrayValues = strtolower($_arrayValues);
    }
    if ($_arrayKey == "Password") {
        $salt = generateSalt(10);
        $hashed = password_hash(($_arrayValues . $salt), PASSWORD_DEFAULT);
        $query .= " `Salt` = '$salt',`$_arrayKey` = '$hashed',";
        break;
    }
    $query .= " `$_arrayKey` = '$_arrayValues',";
}
$query = substr($query, 0, -1);
$query .= " WHERE `ID` = '$accountID'";
$result = mysqli_query($dbConnection, $query);
if (!$result) {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Iets gaat fout!"]));
    exit;
}
echo json_encode(array("response" => "Success", "data" => ["message" => "De gebruikers gegevens zijn aangepast"]));

function generateSalt($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:~?/';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}