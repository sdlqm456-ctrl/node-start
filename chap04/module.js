function sum(a, b) {
  return a + b;
}
function minus(a, b) {
  return a - b;
}
minus(10, 2); // minus에 (10,2)값을 담아 전달

// 외부모듈에서 사용할 수 있게 하기
module.exports = { sum, minus };

