// 모듈가져오기
const express = require("express");
// express 라우터를 설정해 보자 express.Router() 반환값이 있는 함수
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  fs.readFile("view/page.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

// 설정한 라우터 내보내기
// module.exports 로 내보내면 require 함수를 이용해서 모듈처럼 받아올 수 있다.
module.exports = router;
