<?php
if($_SERVER["HTTPS"] != "on")
{
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
}
    header("Content-Type: application/json");
    require_once "../keys/LoginDB.php";
    require_once "../keys/SecureKey.php";
    require_once "../auth/JWT/generateJWT.php";
    
    //user input
    $emailInput = strtolower($_POST["email"]);
    $passwordInput = $_POST["password"];
    //check if user exists
    $searchUser = mysqli_query($dbConnection, "SELECT `ID`, `Email`, `Password`, `Salt`, `Role` FROM `Accounts` WHERE `Email` = '$emailInput' LIMIT 1");
    if($searchUser->num_rows == 0) {
        $json = json_encode(["response" => "Failed", "data" => ["message"=> "Dit email of password is niet correct!"]]);
        echo $json;
        exit();
    }
    $JWT;
    $role;
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
        $role = $row["Role"];
        //generate JWT
        $JWT = generate_jwt(payload: array("email" => $row["Email"], "ID" => $row["ID"], 'iat' => (time()), 'exp' => (time()+(3600*2))), secret: $JWT_secret_key);
    }
    setcookie(name:"JWT", value:$JWT, expires_or_options:time()+(3600*2), secure:true, httponly:true, path:"/");
    $json = json_encode(["response" => "Success", "data" => ["message"=> "Je bent ingelogd"], "role" => $role]);
    echo $json;
?>