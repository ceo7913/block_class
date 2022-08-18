// 로그인 만들어 보자
// express, dotenv, fs, jsonwebtoken, express-session, mysql2
// 개발용으로 nodemon

// npm 초기화
// packjson 생성
// -----------------------------------------------------------
// npm init -y
// -----------------------------------------------------------

// 모듈 설치
// -------------------------------------------------------
// npm i express dotenv fs jsonwebtoken express-session mysql2
// -------------------------------------------------------

// 개발용 설치
// -------------------------------------------------------
// npm i --save-dev nodemon
// -------------------------------------------------------
const express = require("express");
// .env 파일을 사용하기 위해 모듈 가져오면서 설정
const dot = require("dotenv").config();
// jsonwebtoken 모듈 가져오기
const jwt = require("jsonwebtoken");
// express-session 모듈 가져오기
const session = require("express-session");
const fs = require("fs");
// mysql2 모듈 가져오기
const mysql = require("mysql2");
const e = require("express");

// mysql 로컬 데이터 베이스 연결
const client = mysql.createConnection({
  // 데이터 베이스 계정의 이름
  user: "root",
  // 계정의 비밀번호
  password: "1234",
  // 연결할 데이터 베이스의 이름
  database: "test7",
  // multipleStatements 다중 쿼리문을 사용할 수 있도록 하는 옵션
  multipleStatements: true,
});

// 서버 객체 생성
const app = express();
// req.body 객체를 사용할거니까
// express 12 버전 쯤인가 버전업 되면서 express 설정으로
// body 객체를 사용하게 설정할 수 있다.
app.use(express.urlencoded({ extended: false }));
// 세션도 사용할거니까
app.use(
  session({
    // 세션 발급할때 사용되는 키 노출되면 안되니까 .env 파일에 값을 저장해놓고 사용 process.env.SESSION_KEY
    secret: process.env.SESSION_KEY,
    // 세션을 저장하고 불러올 때 세션을 다시 저장할지 여부
    resave: false,
    // 세션에 저장할 때 초기화 여부를 설정
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  fs.readFile("view/login.html", "utf-8", (err, data) => {
    // login.html 파일을 utf-8 인코딩을 해서 send 함수를 이용해서 data 를 보내줌(요청을 응답해줌)
    res.send(data);
  });
});

app.get("/join", (req, res) => {
  fs.readFile("view/join.html", "utf-8", (err, data) => {
    // login.html 파일을 utf-8 인코딩을 해서 send 함수를 이용해서 data 를 보내줌(요청을 응답해줌)
    res.send(data);
  });
});

// const sql =
// id 는 AUTO_INCREMENT PRIMARY KEY 컬럼 값을 추가하지 않아도 자동으로 증가하는 숫자
// user_id 이름으로 컬럼을 만들고 VARCHAR(255)  문자 255자 까지 허용
//   "create table users(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255),password VARCHAR(255),refresh VARCHAR(255))";
//   // client 객체안의 query 함수로 쿼리문 실행
//   client.query(sql);

app.post("/join", (req, res) => {
  // req.body 객체에 있는 키값으로 변수에 할당
  // req.body.userId 가 userId에 담긴다.
  // req.body.password 도 password 담긴다.
  // { 요 안에 키값 }} 객체 구문으로 묶어서 변수를 받으면 해당 객체의 키값의 벨류를 받을 수 있다.
  const { userId, password } = req.body;
  // 쿼리문 INSERT INTO users = users 테이블에 추가한다
  // 값을 넣어서 추가하는 컬럼은 user_id, password 두개
  // AVLUES(?,?) 값의 벨류는 옵션으로 전달한다.
  const sql = "INSERT INTO users (user_id,password)VALUES(?,?)";
  // VLAUES(?,?) 순서대로 [userId, password] 값 전달
  client.query(sql, [userId, password], () => {
    // redirect 함수로 매개변수 url 해당 경로로 페이지를 이동시켜 준다.
    res.redirect("/");
  });
});

app.post("/login", (req, res) => {
  const { userId, password } = req.body;
  res.send(userId + password);
  // SELECT * FROM users WHERE user 테이블 찾고
  // WHERE user_id=? = users 테이블에서 user_id 값으로 검색
  const sql = "SELECT * FROM users WHERE user_id=?";
  client.query(sql, [userId], (err, result) => {
    if (err) {
      res.send("계정 없음");
    } else {
      // result[0] 에 값이 있으면 계정이 존재한다는 뜻, 아니면 계정이 없다.
      // ?. 구문 뒤에 키값이 있는지 먼저 보고 값을 참조한다. 그래서 없으면 터지는 일 (크래쉬)를 방지
      if (result[0] && password === result[0]?.password) {
        // console.log(result);
        // res.send(result);
        // 로그인 성공했으니까 토큰 발급
        const accessToken = jwt.sign(
          {
            // payload 값 전달할 값
            userId: result[0].userId,
            mail: "dsafjaosjr@naver.com",
            name: "dojdodo",
          },
          // ACCESS_TOKEN 비밀키
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "5s",
          }
        );
        // refresh token 발급
        const refreshToken = jwt.sign(
          {
            // payload 값 전달할 값
            // 유저의 아이디만
            userId: result[0].userId,
          },
          process.env.REFRESH_TOKEN,
          {
            expiresIn: "1m",
          }
        );
        // UPDATE users SET = refresh = user 테이블의 refresh 값을 수정
        // WHERE user_id = ? user_id
        const sql = "UPDATE users SET refresh=? WHERE user_if = ?";
        client.query(sql, [refreshToken, userId]);

        // 세션에 accessToken 값은 access_Token 키값에 벨류로 할당
        req.session.acees_token = accessToken;
        // 세션에 refreshToken 값은 refreshToken 키값에 벨류로 할당
        req.session.refresh_token = refreshToken;
        res.send({ access: accessToken, refresh: refreshToken });
      } else {
        res.send("계정 없음");
      }
    }
  });
});

// 미들웨어란
// 로그인을 해서 어서오세요 환영합ㄴ니다 로그인이 유지되어 있는 페이지에 접속하ㄱ
// 로그인이 유지 되고 있는 동안에만 동작해야하는 페이지 불들이 있어ㅛ
// 미들웨어란 간단하게 클라이언트에게 요청이을 보냐기 위해 응답하는 중간(미들) 에 목적에 맞게 처리해주는
// 중간단계 통과하는 미들웨어 함수이다. 요청의 응답에 도달하기 위해서 미들웨어를 통과해야지 응답깢비 도달할 수 있다.
// 중간에 문지기 예의 허락을 만들어야지 진지나갈 수 있다. 엑세스 권한
// req(요청)객체,res(응답)객체, next() 함수를 이용해서 통과 요청을 넘길 수 있다. 너지나가 = next=accessToken
// 문지기 통과 next 지나가사에ㅛ
// 요청을 처리하기전에 중간에 기능을 동작시켜주는 얘

// 매개변수는 (요청객체, 응답객체 ,next 함수)
const middleware = (req, res, next) => {
  // 세션값을 가져온다.
  // const accessToken =req.session.acees_token;
  // const refreshToken = req.session.refresh_token;
  const { accees_token, refresh_token } = req.session;
  // access_token 값을 먼저 검증한다 유효기간이 끝나지 않았는지
  jwt.verify(accees_token, process.env.ACCESS_TOKEN, (err, acc_decode) => {
    if (err) {
      // 썩은 토큰 이면
      // 여기서 로그인 페이지로 넘긴다던지
      // 404 500 에러페이지를 만들어서 보여준다던지
      // 본인의 방향성으로 페이지 구성 하시면 됩니다.
      res.send("다시 로그인 해주세요");
    } else {
      // 썩지않고 좋은 토큰이면
      console.log(acc_decode);
      // 다음번 콜백 함수 실행
      // next();
      if (acc_decode == undefined) {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN,
          (err, ref_decoded) => {
            if (err) {
              res.send("다시 로그인 하세요");
            } else {
              const sql = "SELECT * FROM users WHERE user_id = ?";
              client.query(sql, [ref_decoded.userId], (err, result) => {
                if (err) {
                  res.send("데이터 베이스 연결을 확인해 주세여");
                } else {
                  if (result[0].refresh == refresh_token) {
                    const accessToken = jwt.sign(
                      {
                        userId: ref_decoded.userId,
                      },
                      process.env.ACCESS_TOKEN,
                      {
                        expiresIn: "5s",
                      }
                    )
                    req.session.access_token = accessToken;
                    // 다음 콜백 실행
                    next()
                  } else {
                    res.send("다시 로그인 하세요")
                  }
                }
              });
            }
          }
        );
      }
    }
  });
};

// middleware 이 미들웨어 함수에서 next()함수를 사용하지 못하면
// 다음 콜백한수는 실행되지 않는다.
// 문지기한테 막힌거임
// next() 함수를 실행하면 다음 콜백으로 이동해서 요청 및 응답 작업 동작을 한다.
// 로그인이 되어있는 페이지만 요청과 응답을 할 수 있게
app.get("/check", middleware, (req, res) => {
  res.send("로그인 되어 있음");
});

app.listen(3000, () => {
  console.log(3000, "서버 열림");
});
