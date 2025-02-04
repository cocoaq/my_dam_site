const nodemailer = require('nodemailer');
require('dotenv').config();

// console.log("📌 NAVER_EMAIL:", process.env.NAVER_EMAIL);
// console.log("📌 NAVER_PASSWORD:", process.env.NAVER_PASSWORD);

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// 📌 Nodemailer 설정
const transporter = nodemailer.createTransport({
  service: 'naver',
  host: 'smtp.naver.com',
  port: 465,
  secure: false,
  auth: {
    user: process.env.NAVER_EMAIL,
    pass: process.env.NAVER_PASSWORD,
  },
  tls: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: false,
  },
});

// 📌 이메일 전송 API
app.post('/send-email', async (req, res) => {
  const { email, title, message } = req.body;

  const mailOptions = {
    from: process.env.NAVER_EMAIL,
    to: process.env.NAVER_EMAIL,
    subject: `[문의] ${title}`,
    text: `보낸 사람: ${email}\n\n${message}`,
  };
console.log("test", mailOptions);
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: '이메일이 성공적으로 전송되었습니다!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '이메일 전송 실패' });
  }
});

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://tiri99.dothome.co.kr`);
});