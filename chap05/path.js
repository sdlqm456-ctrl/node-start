// 파일의 경로, 확장자, 파일명
const path = require("path");

console.log(__dirname); // 실행되는 폴더의 경로
console.log(__filename); // 실행파일의 정보

console.log(path.basename(__filename, ".js")); // 파일명 (확장자를 제외하고 출력하면 __filename, "확장자명")

// path.foramt
console.log(
  path.format({
    root: "/ignored",
    dir: "/home/user/dir",
    base: "file.txt",
  }),
);
