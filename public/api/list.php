<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require 'db_config.php'; // DB 연결 파일

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10; // 한 페이지당 게시글 개수
$offset = ($page - 1) * $limit;

// DB 연결
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// 연결 확인
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "DB 연결 실패: " . $conn->connect_error]));
}

// 전체 게시글 개수 조회
$countQuery = "SELECT COUNT(*) AS total FROM Community";
$countResult = $conn->query($countQuery);

if ($countResult === false) {
    die(json_encode(["success" => false, "message" => "게시글 개수 조회 실패: " . $conn->error]));
}

$totalPosts = $countResult->fetch_assoc()['total'];
$totalPages = ceil($totalPosts / $limit);

// 현재 페이지의 게시글 가져오기
$query = "SELECT COM_NO, COM_TITLE, COM_TYPE, COM_DATE, COM_MEMBER FROM Community ORDER BY COM_NO DESC LIMIT ? OFFSET ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $limit, $offset);

if ($stmt === false) {
    die(json_encode(["success" => false, "message" => "게시글 조회 실패: " . $conn->error]));
}

$stmt->execute();
$result = $stmt->get_result();

$posts = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "posts" => $posts,
    "totalPages" => $totalPages
], JSON_UNESCAPED_UNICODE);

$conn->close();
?>