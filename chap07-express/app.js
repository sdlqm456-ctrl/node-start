const express = require("express");
const multer = require("multer");
const app = express(); // 인스턴스 생성

// 포트: 3000
const SERVER_PORT = 3000;

// multer 모듈을 활용하기 위한 설정
const storage = multer.diskStorage({
  // 저장경로
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "public/images");
  },
  // 새로운 파일이름 생성
  // "latinl": 이미지 파일의 파일명이 깨져서 나올때 사용
  filename: (req, file, cb) => {
    const file_name = Buffer.from(file.originalname, "latin1").toString(
      "utf-8",
    );
    // 업로드 시 이미지 파일명 + 현재시간 기준 폴더명이 만들기
    const ext = file_name.substring(0, file_name.indexOf("."));
    const fn = file_name.substring(file_name.indexOf("."));
    cb(null, fn + "_" + Date.now() + ext);
  },
});

const upload = multer({ storage }); // multer 인스턴스

// public 폴더의 html, css. js url을 통해 접근허용
app.use(express.static("public"));

// 라우팅 url: 실행함수
app.get("/", (req, res) => {
  // 실행할 기능
  res.send("/페이지 호출");
});
// 라우팅 파일
// static: 정적
app.use("/sample", require("./routes/sample.route"));

app.post("/upload", upload.single("user_img"), (req, res) => {
  console.clear();
  console.log(req);
  res.send("success");
});

// 실행
app.listen(SERVER_PORT, () => {
  console.log(`서버가 실행됨 http://localhost:${SERVER_PORT}`);
});
