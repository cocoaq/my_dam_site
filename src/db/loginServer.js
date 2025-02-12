const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
// require('dotenv').config();

const app = express();
app.use(express.json());

const fetchItems = async () => {
    try {
        const response = await fetch('http://tiri99.dothome.co.kr/api/items.php');
        const data = await response.json();
        setItems(data);
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
    }
};