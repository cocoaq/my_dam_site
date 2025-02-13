<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require 'db_config.php'; // DB 연결 파일

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10; // 한 페이지당 게시글 개수
$offset = ($page - 1) * $limit;


// JSON 데이터 수신
$data = json_decode(file_get_contents("php://input"), true) ?? $_POST;

if (!$data) {
    die(json_encode(["success" => false, "message" => "요청실패"]));
}


// DB 연결
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
try {
    // 전체 게시글 개수 조회
    $countStmt = $conn->query("SELECT COUNT(*) AS total FROM Community");
    $totalPosts = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    $totalPages = ceil($totalPosts / $limit);

    // 현재 페이지의 게시글 가져오기
    $stmt = $conn->prepare("SELECT COM_NO, COM_TITLE, COM_TYPE, COM_DATE, COM_MEMBER FROM Community ORDER BY COM_NO DESC LIMIT ? OFFSET ?");
    $stmt->bindParam(1, $limit, PDO::PARAM_INT);
    $stmt->bindParam(2, $offset, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode([
        "posts" => $stmt->fetchAll(PDO::FETCH_ASSOC),
        "totalPages" => $totalPages
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    echo json_encode(["error" => "게시글 불러오기 실패: " . $e->getMessage()]);
}
$conn->close();
?>