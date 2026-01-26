const fs = require("fs");
const { Console } = require("console");
const { clearInterval } = require("timers");

// stream(): 데이터의 흐름 => 활용하여 file 생성
const output = fs.createWriteStream("./output/stdout.log", { flage: "a" }); // 쓰기전용 파일생성
const errOutput = fs.createWriteStream("./output/error.log", { flage: "a" });

const logger = new Console({ stdout: output, stderr: errOutput }); // 일반 로그 출력, 에러메세지 출력 (텍스트 형식)
logger.log("hello, world"); // hello, world 구문을 ./stdout.log 이 파일에 출력 (서버의 실행이력 로그형식으로 출력)
logger.error("error log"); // 서버의 실행에러 이력 에러형식 출력

let count = 1;
const job = setInterval(() => {
  logger.log(`현재 카운트는 [${count}]`);
  if (count > 10) {
    clearInterval(job);
  }
  count++;
}, 1000);
