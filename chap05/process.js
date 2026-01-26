const process = require("process");
for (let i = 1; i < 10; i++) {
  console.log(`i의 값은${i}`);
  if (i == 5) {
    process.exit(); // 프로세스종료
  }
}
console.log(process.env.Path.split(";"));

// // os 모듈: 운영체제 관련 정보 제공 (중요하진 않아서 참고용으로 보기)
// const os = require("os");
// console.log(os.arch()); // CPU 아키텍처
// console.log(os.cpus()); // 컴퓨터 CPU 정보
// console.log(os.hostname()); // 운영체제 호스트명
// console.log(os.networkInterfaces()); // 네트워크 정보
