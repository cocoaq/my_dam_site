<?php
header("Content-Type: application/json; charset=UTF-8");
require_once 'db_config.php';

$data = json_decode(file_get_contents("php://input"), true);
$mem_id = $data["mem_id"];
$mem_pass = $data["mem_pass"];

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "DB 연결 실패"]));
}

// 유저 조회
$query = $conn->prepare("SELECT MEM_NO, MEM_NAME, MEM_PASS FROM Member WHERE MEM_ID = ?");
$query->bind_param("s", $mem_id);
$query->execute();
$result = $query->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "아이디가 존재하지 않습니다."]);
    exit;
}

$user = $result->fetch_assoc();

// 비밀번호 검증
if (!password_verify($mem_pass, $user["MEM_PASS"])) {
    echo json_encode(["success" => false, "message" => "비밀번호가 일치하지 않습니다."]);
    exit;
}

// 로그인 성공
session_start();
$_SESSION["user_id"] = $user["MEM_NO"];
$_SESSION["user_name"] = $user["MEM_NAME"];

echo json_encode(["success" => true, "user" => ["id" => $user["MEM_NO"], "name" => $user["MEM_NAME"]]]);

$conn->close();
?>