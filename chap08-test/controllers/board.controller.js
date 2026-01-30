// 컨트롤러 영역.
const service = require("../../../board-app/backend/service/board.service");
const svc = require("../services/board.service");

const ctrl = {
  list: async (req, res) => {
    const { title, writer, content } = req.boby;
    try {
      const result = service.list({ title, writer, content });
      console.log(result);
      res.json({ retCode: "OK" });
    } catch (err) {
      console.log(err);
      res.json({ retCode: "OK" });
    }
  },
  create: async (req, res) => {
    const { title, writer, content } = req.boby;
    const result = await service.create({ title, writer, content });
    if (!title || !writer || !content) {
      res.json({ retCode: "OK", massage: "게시글 등록 성공" });
    } else {
      res.json({ retCode: "NG", massage: "게시글 등록 실패" });
    }
  },
  remove: async (req, res) => {
    const id = req.params.id;
    const result = await service.remove(id);
    if (result) {
      res.json({ retCode: "OK", massage: "게시글 삭제 성공" });
    } else {
      res.json({ retCode: "NG", massage: "게시글 삭제 실패" });
    }
  },
};

module.exports = ctrl;
