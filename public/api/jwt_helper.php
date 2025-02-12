<?php

require $_SERVER['DOCUMENT_ROOT']. '/vendor/autoload.php';
use \Firebase\JWT\JWT;

$secret_key = "DevelopmentandmeDAMDAM"; // 반드시 안전한 값으로 변경

function generate_jwt($payload) {
    global $secret_key;
    return JWT::encode($payload, $secret_key, 'HS256');
}

function verify_jwt($token) {
    global $secret_key;
    try {
        return JWT::decode($token, $secret_key, ['HS256']);
    } catch (Exception $e) {
        return false;
    }
}
?>