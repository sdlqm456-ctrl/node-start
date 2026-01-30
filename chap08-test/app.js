const express = require("express");
const boardRoute = require("./routes/board.route");
const PORT = 3000;

const app = express(); // Express 인스턴스 생성.

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("게시판 페이지 입니다");
});
app.get("/board", async (req, res) => {
  const { id, writer, content, created_dt } = req.body;
  let [result] = await pool.query(
    "select from member where id =?, writer = ?, content =?, created_dt = ?",
    [id, writer, content, created_dt],
  );
  console.log(result);
  // 응답.
  if (result.length > 0) {
    res.json({
      retCode: "OK",
      id: id,
      writer: writer,
      content: content,
      created_dt: created_dt,
    });
  } else {
    res.json({ retCode: "NG" });
  }
});
app.use("/board", boardRoute); // 라우팅정보.
app.use(express.json());

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
