<?php
require_once "utils/base64url_encode.php";
function generate_jwt($payload, $secret, $headers = array('alg' => 'HS256', 'typ' => 'JWT'))
{
    //encode the headers
    $headers_encoded = base64url_encode(json_encode($headers));
    //encode the body (user info)
    $payload_encoded = base64url_encode(json_encode($payload));
    //create a signature
    $signature_encoded = base64url_encode(hash_hmac('SHA256', "$headers_encoded.$payload_encoded", $secret, true));

    return "$headers_encoded.$payload_encoded.$signature_encoded";

}