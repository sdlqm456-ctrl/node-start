// 암호화
const { rejects } = require("assert");
const crypto = require("crypto");
const { resolve } = require("dns");

let passwd = crypto
  .createHash("sha512") // 암호화 방식
  .update("pw1234") // 암호화할 평문
  .digest("base64"); // 인코딩
// console.log(passwd); // "pw1234" = > 고정값

// salting 암호화
const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      // 예외일 경우
      if (err) {
        reject(err);
      }
      resolve(buf.toString("base64"));
    });
  });
};
// createSalt() // 성공 또는 실패일 경우
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

const createCryptoPassword = async (plainPassword) => {
  const salt = await createSalt();

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 10000, 64, "sha512", (err, buf) => {
      if (err) {
        reject(err);
      }
      resolve({ passwd: buf.toString("base64"), salt });
    });
  });
};

createCryptoPassword("pw1234")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
