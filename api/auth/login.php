<?php
    header("Content-Type: application/json");
    require_once("../keys/LoginDB.php");
    $userID;
    $emailInput = strtolower($_GET["email"]);
    $passwordInput = $_GET["password"];
    $searchUser = $dbConnection->query("SELECT `ID`, `Email`, `Password`, `Salt` FROM `Accounts` WHERE `Email` = '$emailInput' LIMIT 1");
    if($searchUser->num_rows == 0) {
        $json = json_encode(["response" => "Failed", "data" => ["message"=> "Dit email of password is niet correct!"]]);
        echo $json;
        exit();
    }
    while($row = $searchUser->fetch_assoc()) {
        if($row["Email"] != $emailInput) {
            $json = json_encode(["response" => "Failed", "data" => ["message"=> "Dit email of password is niet correct!"]]);
            echo $json;
            exit();
        }
        $checkPassword = $passwordInput.$row["Salt"];
        if(!password_verify($checkPassword, $row['Password'])) {
            $json = json_encode(["response" => "Failed", "data" => ["message"=> "Dit email of password is niet correct!"]]);
            echo $json;
            exit();
        }
        $userID = $row["ID"];
    }
    $JWT = json_encode(["Key" => generateSalt(40), "Expires" => date("Y-m-d H:i:s", strtotime('+2 hours'))]);
    setcookie(name:"JWT", value:$JWT, expires_or_options:time()+(3600*2), secure:true, httponly:true);
    $dbConnection->query("UPDATE `Accounts` SET `JWT` = '$JWT' WHERE `ID` = $userID");
    $json = json_encode(["response" => "Success", "data" => ["message"=> "Je bent ingelogd"]]);
    echo $json;
    //functions
    function generateSalt($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:\|]{[}.,<>?/';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
?>