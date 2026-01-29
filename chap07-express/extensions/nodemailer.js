// 메일 발송하기
const nodemailer = require("nodemailer");

// 메일 발송시 기본 정보 입력
// createTransport: 이메일 전송하는 객체를 생성하는 함수
// 사용자명, 비밀번호 등을 설정해서 메일 전송환경 설정
const transport = nodemailer.createTransport({
  host: "smtp.daum.net",
  port: "465",
  secure: true,
  auth: {
    user: process.env.FROM,
    pass: process.env.PASS,
  },
});
module.exports = transport;
