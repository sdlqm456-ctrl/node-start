console.time("time check");
for (let i = 1; i <= 10000; i++) {}
console.timeEnd("time check");

console.log(`Hello, Choi`);
console.error("Error 발생");

const ary = [
  { name: "홍길동", age: 20 },
  { name: "박길동", age: 25 },
];
console.table(ary);
