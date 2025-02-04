<?php
// send-email.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));

    $to = "your-email@example.com";
    $subject = $data->title;
    $message = $data->message;
    $headers = "From: " . $data->email;

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["message" => "메일 전송 성공"]);
    } else {
        echo json_encode(["message" => "메일 전송 실패"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>