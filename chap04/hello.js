// hello.js
// 자바스크립트는 웹브라우저에서 실행
// node.js: 웹브라우저가 아닌 외부환경에서도 실행 시켜주는 방법
// js 실행환경 => node.js
const { sum, minus } = require("./module");
function nodeFnc() {
  console.log(`hello Node!!`);
}
nodeFnc();

console.log(minus(10, 20));
