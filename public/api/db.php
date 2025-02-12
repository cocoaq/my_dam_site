<?php
require_once 'db_config.php';

try {
    $conn = new PDO(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => "Database Connection Failed: " . $e->getMessage()]));
}
?>