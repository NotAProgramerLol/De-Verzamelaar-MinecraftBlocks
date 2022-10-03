<?php
require_once "./utils/base64url_encode.php";
function is_jwt_valid($jwt, $secret)
{
    //split the header, body and signature
    $tokenParts = explode(".", $jwt);
    $header = base64_decode($tokenParts[0]);
    $payload = base64_decode($tokenParts[1]);
    $signature_provided = $tokenParts[2];

    // check if JWT is still valid (expiration time)
    $expiration = json_decode($payload)->exp;
    $is_token_expired = ($expiration - time()) < 0;

    //build a signature (based on: header and payload)
    $base64_url_header = base64url_encode($header);
    $base64_url_payload = base64url_encode($payload);
    $base64_url_signature = base64url_encode(hash_hmac("SHA256", "$base64_url_header.$base64_url_payload", $secret, true));

    //check if provided signature is valid
    $is_signature_valid = ($base64_url_signature === $signature_provided);

    if ($is_token_expired || !$is_signature_valid) {
        return false;
    }
    else {
        return true;
    }
}