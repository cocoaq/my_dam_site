<?php
header("Content-Type: application/json; charset=UTF-8");
require_once 'db_config.php'; // DB 연결 파일

$data = json_decode(file_get_contents("php://input"), true);
$mem_id = $data["mem_id"];
$mem_pass = password_hash($data["mem_pass"], PASSWORD_DEFAULT);
$mem_name = $data["mem_name"];
$mem_comment = $data["mem_comment"];

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "DB 연결 실패"]));
}

// 중복 체크
$check_query = $conn->prepare("SELECT * FROM Member WHERE MEM_ID = ?");
$check_query->bind_param("s", $mem_id);
$check_query->execute();
$result = $check_query->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "이미 사용 중인 아이디입니다."]);
    exit;
}

// 회원가입 쿼리 실행
$query = $conn->prepare("INSERT INTO Member (MEM_ID, MEM_PASS, MEM_NAME, mem_comment) VALUES (?, ?, ?, ?)");
$query->bind_param("sss", $mem_id, $mem_pass, $mem_name, $mem_comment);

if ($query->execute()) {
    echo json_encode(["success" => true, "message" => "회원가입 성공!"]);
} else {
    echo json_encode(["success" => false, "message" => "회원가입 실패"]);
}

$conn->close();
?>