<?php
    header("Content-Type: application/json");
    require_once("../keys/LoginDB.php");
    $emailInput = $_POST["email"];
    $passwordInput = $_POST["password"];
    $confirmPasswordInput = $_POST["confirmPassword"];
    checkIfValueIsSet($emailInput, "Email has not been set!", "/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g", "The email input is not a email!");
    checkIfValueIsSet($passwordInput, "Password has not been set!", "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$", "The password input has not met the requirements!");
    checkIfValueIsSet($confirmPasswordInput, "Confirm password has not been set!", "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$", "The confirm password input has not met the requirements!");

    function checkIfValueIsSet($checkVar, $emptyErrorMessage, $regex, $regexErrorMessage)
    {
        if(!isset($checkVar)) {
            $json = json_encode(["response" => "Failed", "data" => ["message"=> $emptyErrorMessage]]);
            echo $json;
            exit();
        }
        if(preg_match($regex, $checkVar) == 0) {
            $json = json_encode(["response" => "Failed", "data" => ["message"=> $regexErrorMessage]]);
            echo $json;
            exit();
        }
    }