<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db_config.php'; // DB 연결 파일

$data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
$mem_id = $data["mem_id"] ?? null;
$mem_pass = isset($data["mem_pass"]) ? password_hash($data["mem_pass"], PASSWORD_DEFAULT) : null;
$mem_name = $data["mem_name"] ?? null;
$mem_comment = $data["mem_comment"] ?? null;

if (!$mem_id || !$mem_pass || !$mem_name) {
    echo json_encode(["success" => false, "message" => "필수 입력값이 누락되었습니다."]);
    exit;
}

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
$query = $conn->prepare("INSERT INTO Member (MEM_ID, MEM_PASS, MEM_NAME, MEM_COMMENT) VALUES (?, ?, ?, ?)");
$query->bind_param("ssss", $mem_id, $mem_pass, $mem_name, $mem_comment);

$response = ["success" => false, "message" => "회원가입 실패"];

if ($query->execute()) {
    $response = ["success" => true, "message" => "회원가입 성공!"];
}

echo json_encode($response);
$conn->close();
?>