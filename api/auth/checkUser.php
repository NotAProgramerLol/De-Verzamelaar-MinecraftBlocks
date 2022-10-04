<?php
require_once "../keys/LoginDB.php";
require_once "../keys/SecureKey.php";
require_once "../auth/JWT/validateJWT.php";
$JWT = $_COOKIE["JWT"];
if (!isset($JWT) || $JWT == "") {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Je bent niet ingelogd!"]));
    setcookie('JWT', null, -1, '/', httponly: true, secure: true); 
    exit;
}
if (!is_jwt_valid($JWT, $JWT_secret_key)) {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Je sessie is verlopen!"]));
    setcookie('JWT', null, -1, '/', httponly: true, secure: true); 
    exit;
}
$JSON = json_decode(base64_decode(explode(".", $JWT)[1]));

$checkIfUserExist = mysqli_query($dbConnection, "SELECT * FROM `Accounts` WHERE `ID` = '" . $JSON->ID . "' AND `Email` = '" . $JSON->email . "' LIMIT 1");
if (mysqli_num_rows($checkIfUserExist) == 0) {
    echo json_encode(array("response" => "Failed", "data" => ["message" => "Je bent niet ingelogd!"]));
    setcookie('JWT', null, -1, '/', httponly: true, secure: true); 
    exit;
}
$userDetails = mysqli_fetch_assoc($checkIfUserExist);