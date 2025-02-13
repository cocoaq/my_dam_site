<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'db_config.php'; // DB 연결 파일
require 'jwt_helper.php';

// JSON 데이터 수신
$data = json_decode(file_get_contents("php://input"), true) ?? $_POST;

if (!$data) {
    die(json_encode(["success" => false, "message" => "잘못된 요청 형식입니다."]));
}

$mem_id = $data["mem_id"] ?? null;
$mem_pass = $data["mem_pass"] ?? null;

if (!$mem_id || !$mem_pass) {
    echo json_encode(["success" => false, "message" => "아이디 또는 비밀번호를 입력하세요."]);
    exit;
}

// DB 연결
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "DB 연결 실패: " . $conn->connect_error]));
}

// 로그인 시도
$stmt = $conn->prepare("SELECT MEM_ID, MEM_NO, MEM_PASS, MEM_NAME FROM Member WHERE MEM_ID = ?");
$stmt->bind_param("s", $mem_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($mem_pass, $user['MEM_PASS'])) {
    $token = generate_jwt(["MEM_ID" => $user['MEM_ID'], "MEM_NAME" => $user['MEM_NAME']]);
    echo json_encode(["success" => true, "token" => $token, "MEM_NAME" => $user['MEM_NAME'], "MEM_ID" => $user['MEM_ID'], "MEM_NO" => $user['MEM_NO']]);
} else {
    echo json_encode(["success" => false, "message" => "로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다."]);
}

$conn->close();
?>