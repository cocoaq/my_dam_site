<?php
header('Content-Type: application/json; charset=UTF-8');

// db_config.php 파일 포함
require_once 'db_config.php';

// 데이터베이스 연결
$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);


// 연결 오류 처리
if ($mysqli->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $mysqli->connect_error]));
}

// 쿼리 실행
$query = "SELECT MEM_NO, MEM_ID, MEM_PASS FROM Member";
$result = $mysqli->query($query);

// 쿼리 실패 처리
if (!$result) {
    die(json_encode(["error" => "Query failed: " . $mysqli->error]));
}

// 결과를 배열로 변환
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// JSON 반환
echo json_encode($data, JSON_UNESCAPED_UNICODE);
$mysqli->close();

?>