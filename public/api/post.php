<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require 'db_config.php'; // DB 연결 파일

// 요청된 게시글 ID 확인
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

if (!$id) {
    die(json_encode(["success" => false, "message" => "유효한 ID가 제공되지 않았습니다."]));
}

// DB 연결
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// 연결 확인
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "DB 연결 실패: " . $conn->connect_error]));
}

// 게시글 세부 정보 조회
$query = "SELECT COM_NO, COM_TITLE, COM_CONTENT, COM_TYPE, COM_DATE, COM_MEMBER FROM Community WHERE COM_NO = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);

if ($stmt === false) {
    die(json_encode(["success" => false, "message" => "게시글 조회 실패: " . $conn->error]));
}

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die(json_encode(["success" => false, "message" => "해당 ID의 게시글을 찾을 수 없습니다."]));
}

$post = $result->fetch_assoc();

echo json_encode([
    "success" => true,
    "post" => $post
], JSON_UNESCAPED_UNICODE);

$conn->close();
?>
