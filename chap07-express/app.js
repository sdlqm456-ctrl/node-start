const express = require("express");
const multer = require("multer");
const app = express(); // 인스턴스.

const pool = require("./db");
// 포트: 3000
const SERVER_PORT = 3000;

// multer 모듈을 활용하기 위한 설정
// 파일을 서버에 어떻게 저장할지 규칙 정하기
const storage = multer.diskStorage({
  // destination: 저장경로, cd: 콜백함수
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "public/images");
  },
  // 새로운 파일이름 생성
  // "latinl": 이미지 파일의 파일명이 깨져서 나올때 사용
  // Buffer.from(): 문자열이나 데이터를 바이트 형태로 만들어주는 기능
  filename: (req, file, cb) => {
    const file_name = Buffer.from(file.originalname, "latin1").toString(
      "utf-8",
    );
    // 업로드 시 이미지 파일명 + 현재시간 기준 폴더명이 만들기
    // ext: 확장자 제외한 이름 / fn: 확장자 / substring: 문자열 자르기
    const ext = file_name.substring(0, file_name.indexOf("."));
    const fn = file_name.substring(file_name.indexOf("."));
    cb(null, fn + "_" + Date.now() + ext);
  },
});

const upload = multer({ storage }); // 위에서 만든 storage를 쓰는 multer 인스턴스 생성

// public 폴더의 html, css. js url을 통해 접근허용
app.use(express.static("public"));

// 라우팅 url: 실행함수
app.get("/", (req, res) => {
  // 실행할 기능
  res.send("/페이지 호출");
});
// 라우팅 파일
// static: 정적

// 라우팅 파일로 분리해서 처리
app.use("/sample", require("./routes/sample.route"));
// 이미지 파일 업로드 테스트
app.post(
  "/upload",
  // multer 실행 (html에서 <form action="upload" method="post" enctype="multipart/form-data"> 부분)
  upload.single("user_img"),
  (req, res) => {
    console.log(req.body);
    console.log(req.file.filename);
    // 경로:public/images 업로드
    res.json({
      user_name: req.body.user_name,
      user_age: req.body.user_age,
      filename: req.file.filename,
    });
  },
);
// 회원추가
// 회원정보 + 이미지파일을 DB에 저장하기
app.post("/create", upload.single("user_img"), async (req, res) => {
  const { user_id, user_pw, user_nm } = req.body;
  const file_name = req.file.filename;
  // db 저장
  let result = await pool.query(
    // db에 sql문 실행하고 결과가 올때까지 기다렸다가 result에 담기
    "insert into member(user_id,user_pw,user_name,user_img) values(?,?,?,?)",
    [user_id, user_pw, user_nm, file_name],
  );
  res.json({ result: "done" }); // 클라이언트에 응답 (서버작업 끝)
});

// 실행
app.listen(SERVER_PORT, () => {
  console.log(`서버가 실행됨 http://localhost:${SERVER_PORT}`);
});
