require("dotenv").config();
const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const updateMembers = require("/extensions/excle");
const transporter = require("./extensions/nodemailer");
const cron_job = require("./extensions/nodecrom");

// DB 연결
const pool = require("./db");

const app = express(); // 서버 생성
// 포트: 3000
const SERVER_PORT = 3000;

// public 폴더의 html, css, js url을 통해서 접근.
app.use(express.static("public"));
// json 형태의 데이터 수신 가능. application/json
app.use(express.json());
// form 데이터 수신 가능. application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// multer 모듈을 활용하기 위한 설정
// diskStorage: 폴더에 저장
const storage = multer.diskStorage({
  // destination: 저장경로 지정
  destination: (req, file, cb) => {
    console.log(file);
    // cd (null: 에러x, 파일위치)
    cb(null, "public/images");
  },
  // 파일이름
  // Buffer: 바이트 / toString: 변환하다
  filename: (req, file, cb) => {
    const file_name = Buffer.from(file.originalname, "latin1").toString(
      "utf-8",
    );
    // 키보드_12131312390.png
    const fn = file_name.substring(0, file_name.indexOf(".")); // 확장자 포함 자르기
    const ext = file_name.substring(file_name.indexOf(".")); // 확장자 제외 자르기
    cb(null, fn + "_" + Date.now() + ext); // 파일이름_현재시간 의 형태로 저장됨
  },
});

const upload = multer({ storage }); // multer 인스턴스.

// 라우팅. url : 실행함수.
app.get("/", (req, res) => {
  // 실행할 기능.
  res.send("/ 페이지 호출");
});
// 라우팅 파일.
app.use("/sample", require("./routes/sample.route"));

// 엑셀 업로드 => 신규회원 추가하기
// 요청방식: post, url: /upload/member, 엑셀연습1.xlsx 파일
app.post("/upload/member", upload.single("excle"), async (req, res) => {});

// 스케줄 잡 시작
app.get("/start", (req, res) => {
  cron_job.start();
  res.send("매일발송 시작됨");
});
// 스케줄 잡 종료
app.get("/end", (req, res) => {
  cron_job.end();
  res.send("매일발송 끝");
});

// /members/guest@email.com
app.get("/members/:to", async (req, res) => {
  const to = req.params.to;
  // to: 수신자
  // member 테이블 조회
  let [result, sec] = await pool.query(
    "select * from member where responsibility = 'User'",
  );
  // 결과 (html를 만들어서 내용 출력하기)
  let content = '<table border="2">';
  content +=
    "<table><thead><tr><td>아이디</tr><td><tr><td>이름</tr><td><tr><td>이미지</tr><td><tr><td>권한내용</tr><td>;";
  content += "</tbable></thead>";

  // 메일발송
  transporter.sendMail(
    {
      from: process.env.FROM,
      to: to, // 받는 사람 메일 주소
      subject: "회원목록", // 메일 제목
      text: content, // 메일 본문 내용
    },
    (err, info) => {
      if (err) {
        res.json({ retCode: "NG", retMsg: err });
      }
      res.json({ retCode: "OK", retMsg: info });
    },
  );
});

// 메일 발송
app.post("/mail_send", upload.single("file"), (req, res) => {
  const { to, subject, content } = req.body;
  console.log(req.file);

  transporter.sendMail(
    {
      from: process.env.FROM,
      to: to, // 받는 사람 메일 주소
      subject: subject, // 메일 제목
      text: content, // 메일 본문 내용
      // 첨부파일 (이미지 등)
      attachments: [
        {
          // filename: req.file.fieldname,
          path: path.join(__dirname, "public/images", req.file.fieldname),
        },
      ],
    },
    (err, info) => {
      if (err) {
        return res.json({ retCode: "NG", retMsg: err });
      }
      res.json({ retCode: "OK", retMsg: info });
    },
  );
  console.log("sendmail start ==> ");
});

app.post("/upload", upload.single("user_img"), (req, res) => {
  console.log(req.body);
  console.log(req.file.filename);
  // 경로: public/images 업로드.
  //
  res.json({
    user_name: req.body.user_name,
    user_age: req.body.user_age,
    filename: req.file.filename,
  });
});

// 요청방식(post) , url(/login), req.body의 값.(id, pw)
// pw => 암호화.
// select count(*) as cnt from member where id=? and pw=?
// 조회(1) => retCode:OK, 조회(0) => retCode:NG
app.post("/login", async (req, res) => {
  const { user_id, user_pw } = req.body;
  // 암호화 비번.
  let passwd = crypto.createHash("sha512").update(user_pw).digest("base64");
  let [result, sec] = await pool.query(
    "select user_name, responsibility from member where user_id=? and user_pw=?",
    [user_id, passwd],
  );
  console.log(result);
  // 응답.
  if (result.length > 0) {
    res.json({
      retCode: "OK",
      name: result[0].user_name,
      role: result[0].responsibility,
    });
  } else {
    res.json({ retCode: "NG" });
  }
});

// 삭제.
app.delete("/delete/:id", async (req, res) => {
  const uid = req.params.id;
  // 서버의 파일 삭제.
  const [data, rows] = await pool.query(
    "select user_img from member where user_id = ?",
    [uid],
  );
  // 삭제쿼리.
  const result = await pool.query("delete from member where user_id = ?", [
    uid,
  ]);
  // 이미지삭제.
  if (result[0].affectedRows) {
    // 삭제된 회원의 이미지도 같이 지워주기.
    const ufile = path.join(__dirname, "public/images", data[0].user_img);

    fs.unlink(ufile, (err) => {
      if (err) {
        console.log(`${ufile} 삭제중 에러.`);
      } else {
        console.log(`${ufile} 삭제 완료.`);
      }
    });

    res.json({ retCode: "OK" });
  } else {
    res.json({ retCode: "NG" });
  }
});

// 회원목록.
app.get("/list", async (req, res) => {
  let [result, sec] = await pool.query(
    "select * from member where responsibility = 'User'",
  );
  res.json(result);
});

// 회원추가.
app.post("/create", upload.single("user_img"), async (req, res) => {
  const { user_id, user_pw, user_nm } = req.body;
  const file_name = req.file ? req.file.filename : null; // 업로드 파일
  // 암호화 비번.
  let passwd = crypto.createHash("sha512").update(user_pw).digest("base64");

  try {
    // db 입력.
    let result = await pool.query(
      "insert into member(user_id,user_pw,user_name,user_img) values(?,?,?,?)",
      [user_id, passwd, user_nm, file_name],
    );
    // 반환결과.
    res.json({ retCode: "OK" });
  } catch (err) {
    // 업로드된 이미지 삭제 처리.
    const ufile = path.join(__dirname, "public/images", file_name);
    fs.unlink(ufile, (err) => {
      if (err) {
        console.log(`파일 삭제중 error => ${err}`);
      } else {
        console.log(`파일 삭제 완료 => ${ufile}`);
      }
    });
    res.json({ retCode: "NG", retMsg: err.sqlMessage });
  }
});

// 실행.
app.listen(SERVER_PORT, () => {
  console.log(`서버실행 http://localhost:${SERVER_PORT}`);
});
