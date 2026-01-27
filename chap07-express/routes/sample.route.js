const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  // 실행할 기능
  res.send("/페이지 호출");
});
router.get("/test/:msg", (req, res) => {
  // text.txt 작성
  fs.writeFile("../test.txt", req.params.msg, "utf-8", (err, buf) => {
    // err 예외 buf 정상처리
    if (err) {
      console.log(err);
      return;
    }
    console.log(buf);
  });
  res.send("/test 페이지 호출");
});

// 밑에 있는 코드 집에가서 한번더 해보기 (수정필요)
// http://localhost:3000/read => text.txt의 내용을 콘솔에 출력
router.get("/read", (req, res) => {
  fs.readFile("./text.txt", "utf-8", (err, buf) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(buf);
  });
  // 클라이언트 화면에 출력되는 값
  // res.send("/read");
  res.redirect("/sample");
});
// http://localhost:3000/sample => sample.html 화면출력
router.get("/sample", (req, res) => {
  // 비동기처리
  fs.readFile("./sample.html", "utf-8", (err, buf) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(buf);
    res.status(200).send(buf);
  });
  // 200: 정상, 404: 페이지 없음, 500: 에러값
});

module.exports = router;
