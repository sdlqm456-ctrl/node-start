const fs = require("fs"); // 파일 시스탬 관리 fs 모듈 불러오기
const { Console } = require("console"); //console 모듈에서 console 불러오기
const { clearInterval } = require("timers"); // clearInterval 함수 불러오기

// stream(): 데이터의 흐름 => 활용하여 file 생성
// { flags: "a" }: a는 append (기존 내용 뒤에 추가)
const output = fs.createWriteStream("./output/stdout.log", { flags: "a" }); // 쓰기전용 파일생성
const errOutput = fs.createWriteStream("./output/error.log", { flags: "a" }); // 에러 메세지 생성

const logger = new Console({ stdout: output, stderr: errOutput }); // 일반 로그 출력, 에러메세지 출력 (텍스트 형식)
logger.log("hello, world"); // hello, world 구문을 ./stdout.log 이 파일에 출력 (서버의 실행이력 로그형식으로 출력)
logger.error("error log"); // 서버의 실행에러 이력 에러형식 출력

// setInterval: 일정 시간마다 코드를 반복 실행하는 함수
let count = 1;
const job = setInterval(() => {
  logger.log(`현재 카운트는 [${count}]`);
  if (count > 10) {
    clearInterval(job); // count가 10보다 크면 반복 중지
  }
  count++; // count 값을 1 씩증가
}, 1000); // 1초마다 실행되는 반복작업
