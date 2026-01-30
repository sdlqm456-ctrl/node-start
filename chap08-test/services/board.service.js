// 서비스 영역.
const pool = require("../db");

const svc = {
  list: async (data) => {
    const { id, title, writer, content } = data;
    const [result1] = await db.query(
      "insert into BOARD_TBL (id, title, writer, content) values(?,?,?)",
    );
    return result1;
  },
  create: async (data) => {
    const { title, writer, content } = data;
    let result2 = await pool.query(
      "insert into BOARD_TBL (title, writer, content) values(?,?,?),",
      [id, title, writer, content, created_dt],
    );
    return result2;
  },
  remove: async (id) => {
    let result = await pool.query("delete form BOARD_TBL where id = ?", [id]);
    console.log(result);
    return result;
  },
};

module.exports = svc;
