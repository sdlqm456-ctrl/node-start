// 시간 측정
console.time("time check");
for (let i = 1; i <= 10000; i++) {}
console.timeEnd("time check"); // for 반복문의 실행시간을 출력

console.log(`Hello, Choi`);
console.error("Error 발생"); // 에러메세지 출력

// 배열을 표로 출력하기
const ary = [
  { name: "홍길동", age: 20 },
  { name: "박길동", age: 25 },
];
console.table(ary);

