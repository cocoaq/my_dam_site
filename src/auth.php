<?php
use \Firebase\JWT\JWT;

function create_jwt($user_id, $email) {
    $secret_key = "YOUR_SECRET_KEY";
    $issuer_claim = "THE_ISSUER"; // this can be the server name
    $audience_claim = "THE_AUDIENCE";
    $issuedat_claim = time(); // issued at
    $notbefore_claim = $issuedat_claim + 10; // not before in seconds
    $expire_claim = $issuedat_claim + 3600; // expire time in seconds

    $token = array(
        "iss" => $issuer_claim,
        "aud" => $audience_claim,
        "iat" => $issuedat_claim,
        "nbf" => $notbefore_claim,
        "exp" => $expire_claim,
        "data" => array(
            "id" => $user_id,
            "email" => $email
    ));

    return JWT::encode($token, $secret_key);
}

function verify_jwt($jwt) {
    $secret_key = "YOUR_SECRET_KEY";
    try {
        $decoded = JWT::decode($jwt, $secret_key, array('HS256'));
        return (array) $decoded->data;
    } catch (Exception $e) {
        return null;
    }
}
?>