<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'db_config.php';

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["success" => false, "message" => "잘못된 요청 형식입니다."]);
    exit;
}

$title = $data["title"] ?? "";
$content = $data["content"] ?? "";
$writer = $data["writer"] ?? "";
$date = $data["date"] ?? date("Y-m-d H:i:s");
$type = isset($data["type"]) ? (int)$data["type"] : 0;


if (!$title || !$content || !$writer) {
    echo json_encode(["success" => false, "message" => "빈칸을 입력하세요."]);
    exit;
}

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "DB 연결 실패: " . $conn->connect_error]));
}

// 게시글 삽입
$query = $conn->prepare("INSERT INTO Community (COM_TITLE, COM_CONTENS, COM_DATE, COM_TYPE, COM_MEMBER) VALUES (?, ?, ?, ?, ?)");
$query->bind_param("sssis", $title, $content, $date, $type, $writer); // 🔥 writer를 명확하게 `s`로 설정

if ($query->execute()) {
    echo json_encode(["success" => true, "message" => "게시글 등록 성공!"]);
} else {
    echo json_encode(["success" => false, "message" => "게시글 등록 실패: " . $query->error]);
}

$conn->close();
?>