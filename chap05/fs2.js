// writeFile, writleFileSyns 함수
// 비동기: 다른코드 실행을 차단하지 않음
// 동기식: 작업이 완료 될때까지 대기

// writeFile: 파일에 데이터를 비동기적으로 쓰거나 생성할때 사용
// 기존파일 존재시 내용을 덮어쓰고 없으면 새로 생성, 작업이 끝날때 까지 코드 실행을 멈추지 않음
const fs = require("fs");
let data = "파일쓰기 테스트";
fs.writeFile("./sample/text_w.txt", data, "utf-8", (err) => {
  if (err) {
    throw err;
  }
  console.log("비동기적 파일쓰기 완료");
});

//writleFileSyns: 파일을 동기적으로 작성 (파일쓰기가 완전히 끝날때까지 다음 코드로 넘어지 않음)
const fs1 = require("fs");
let data1 = "파일쓰기 테스트";
fs1.writeFileSync("./sample/text_w2.txt", data, "utf-8");
console.log("동기적 파일쓰기 완료");
