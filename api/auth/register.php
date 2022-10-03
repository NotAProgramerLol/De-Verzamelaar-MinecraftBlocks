<?php
if ($_SERVER["HTTPS"] != "on") {
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
}
header("Content-Type: application/json");
require_once "../keys/LoginDB.php";
//user input
$emailInput = strtolower($_POST["email"]);

$passwordInput = $_POST["password"];

$confirmPasswordInput = $_POST["confirmPassword"];

//validation
checkIfValueIsSet($emailInput, "Email has not been set! $emailInput", "", "The email input is not a email!");
if (!filter_var($emailInput, FILTER_VALIDATE_EMAIL)) {
    $json = json_encode(["response" => "Failed", "data" => ["message" => "The email input is not a email!"]]);
    echo $json;
    exit();
}
checkIfValueIsSet($passwordInput, "Password has not been set!", "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/", "The password input has not met the requirements!");
checkIfValueIsSet($confirmPasswordInput, "Confirm password has not been set!", "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/", "The confirm password input has not met the requirements!");
if ($passwordInput != $confirmPasswordInput) {
    $json = json_encode(["response" => "Failed", "data" => ["message" => "Password en confirm password is niet het zelfde"]]);
    echo $json;
    exit();
}
//check if existg
$searchAvName = mysqli_query($dbConnection, "SELECT Email FROM Accounts WHERE Email = '$emailInput'");
if (mysqli_num_rows($searchAvName) > 0) {
    $json = json_encode(["response" => "Failed", "data" => ["message" => "Dit email is al gebruikt om een account aan te maken!"]]);
    echo $json;
    exit();
}
//generate searchable id
$searchNewSearchUrl = true;
$searchUrl;
while ($searchNewSearchUrl == true) {
    $searchUrl = generateSalt(45);
    $searchAvUrl = mysqli_query($dbConnection, "SELECT `SearchableID` FROM `Accounts` WHERE `SearchableID` = '$searchUrl'");
    if (mysqli_num_rows($searchAvUrl) == 0) {
        $searchNewSearchUrl = false;
    }
}
// make new user in database
$salt = generateSalt(10);
$hashed = password_hash(($passwordInput . $salt), PASSWORD_DEFAULT);
mysqli_query($dbConnection, "INSERT INTO `Accounts` (`Email`, `Password`, `Salt`, `Role`, `SearchableID`) VALUES ('$emailInput', '$hashed', '$salt', 'Default', '$searchUrl')");
$json = json_encode(["response" => "Success", "data" => ["message" => "Er is een account gemaakt!"]]);
echo $json;

//functions
function checkIfValueIsSet($checkVar, $emptyErrorMessage, $regex, $regexErrorMessage)
{
    if (!isset($checkVar) || $checkVar == "") {
        $json = json_encode(["response" => "Failed", "data" => ["message" => $emptyErrorMessage]]);
        echo $json;
        exit();
    }
    if (preg_match($regex, $checkVar) == 0 && $regex != "") {
        $json = json_encode(["response" => "Failed", "data" => ["message" => $regexErrorMessage]]);
        echo $json;
        exit();
    }
}
function generateSalt($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:\|]{[}.,<>?/';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
?>