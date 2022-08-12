const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
// const dot = require('dotenv')

const app = express();
const page =require('./view/page');
const verify = require('./verify');
const createToken =require('./token');

// env 사용 설정
// dot.config();

app.listen(3000, () => {
  console.log(3000, "번에 열림");
});

// 루트로 절대 경로 설정
app.use(express.static(__dirname));

app.use(
  session({
    // 세션을 발급할때 사용되는 키 소스코드 노출 안되게 하자
    secret: "064169",
    // 세션을 저장하고 불러올때 다시 저장할지 여부
    resave: false,
    // 세션에 저장할 때 초기화 여부
    saveUninitialized: true,
    // 저장소를 만들지 여부
    store: new FileStore(),
  })
);

// 앞에 url이 있으면 해당 url 요청에서 사용할 것이라는 뜻
// 모든 요청에서 사용
app.use(page);
app.use(createToken);
app.use("/userView",verify);

