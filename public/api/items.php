<?php
header('Content-Type: application/json; charset=UTF-8');

// db_config.php 파일 포함
require_once 'db_config.php';

// 데이터베이스 연결
$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// $conn = new mysqli($host, $username, $password, $dbname);


// 연결 오류 처리
if ($mysqli->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $mysqli->connect_error]));
}

// 쿼리 실행
$query = "SELECT MEM_NO, MEM_NAME, MEM_COMMENT FROM Member";
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

// //구버전

// if ($conn->connect_error) {
//     die(json_encode(['error' => 'DB 연결 실패']));
// }

// $method = $_SERVER['REQUEST_METHOD'];

// if ($method === 'GET') {
//     $result = $conn->query('SELECT * FROM Member');
//     $rows = [];
//     while ($row = $result->fetch_assoc()) {
//         $rows[] = $row;
//     }
//     echo json_encode($rows);

// }




// if ($method === 'POST') {
//     $input = json_decode(file_get_contents('php://input'), true);
//     $name = $input['name'];
//     $description = $input['description'];

//     $stmt = $conn->prepare('INSERT INTO items (name, description) VALUES (?, ?)');
//     $stmt->bind_param('ss', $name, $description);
//     $stmt->execute();

//     echo json_encode(['id' => $stmt->insert_id, 'name' => $name, 'description' => $description]);
// }

// $conn->close();
?>