<?php
header("Content-Type: application/json; charset=UTF-8");

if (!isset($_POST["email"]) || !isset($_POST["subject"]) || !isset($_POST["message"])) {
    echo json_encode(["success" => false, "message" => "필수 입력값이 없습니다."]);
    exit;
}

$email = $_POST["email"];
$subject = "[문의] " . $_POST["subject"];
$message = "보낸 사람: " . $_POST["email"] . "\n\n" . $_POST["message"];

// 메일 헤더 설정
$headers = "From: " . $_POST["email"] . "\r\n" .
           "Reply-To: " . $email . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

// 메일 전송
$mailSent = mail("tiri99@naver.com", $subject, $message, $headers);

if ($mailSent) {
    echo json_encode(["success" => true, "message" => "이메일이 성공적으로 전송되었습니다!"]);
} else {
    echo json_encode(["success" => false, "message" => "이메일 전송 실패"]);
}
?>