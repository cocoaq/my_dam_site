<?php
require '../vendor/autoload.php';
require '../src/auth.php';

// JWT 생성 및 출력 예시
$jwt = create_jwt("your_user_id", "your_email@example.com");
echo "Generated JWT: " . $jwt;
?>