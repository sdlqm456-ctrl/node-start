const router = require("express").Router();
const ctrl = require("../controllers/board.controller");

// 목록, 추가, 삭제 라우팅을 생성하세요.
router.get("/", ctrl.list); // 목록 가져오기

router.post("/", ctrl.create); // 내용 추가

router.delete("/:id", ctrl.remove); // 내용 삭제

module.exports = router;
