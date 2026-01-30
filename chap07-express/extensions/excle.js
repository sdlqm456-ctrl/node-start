const xlsx = require("xlsx");
const pool = require("../db");
const crypto = require("crypto");

async function updateMembers(Buffer) {
  const workBook = xlsx.readFile(Buffer, { type: "Buffer" });
  const firstSheetName = workBook.SheetNames[0]; // 첫번째 시트의 이름 가져오기
  const firstSheet = workBook.Sheets[firstSheetName]; // 첫번째 사트

  const result = xlsx.utils.sheet_to_json(firstSheet);

  // 반복문
  // 엑셀에 내용을 수정했을때 업데이트 되서 DB,sql에 출력되기
  for (let elem of result) {
    let passwd = crypto
      .createHash("sha512")
      .update("" + elem.password)
      .digest("base64");
    try {
      const data = await pool.query(
        `update member set user_pw = ?, user_name = ?
          where user_id = ?`,
        [passwd, elem.user_name, elem.user_id],
      );
      console.log("입력 => ", data);
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = { updateMembers };
