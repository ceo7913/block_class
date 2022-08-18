// Access Token만 쓴 방식은 입장 토큰만 사용해서 로그인 검증함

// 1. 이용자가 로그인 시도
// 2. 서버에서 이용자를 확인하고 입장권을 JWT 토큰 인증 정보를 payload에 할당하고 생성한다
// 3. 생성한 토큰을 클라이언트에 반환해주고 클라이언트가 이 토큰을 가지고 있는다.
// 4. 클라이언트에서 권한을 인증 요청할 때 이 토큰을 같이 전달한다.
// 5. 서버는 토큰을 확인하고 payload의 값 인코딩 되어있는 값을 디코딩해서 사용자의 권한을 확인하고(입장권이 맞는지) 데이터를 반환한다.
// 6. 만약 토큰이 정상적인지 확인한다.(토큰이 썩었는지 입장권 시간이 지났는지)
// 7. 날짜가 지난 토큰이면 토큰을 새로 재발급해준다.(입장권 새로 구매)

// Refresh Token과 같이 사용하면 인증 보안이 더 강해진다.
// Access token만 사용하면 인증보안에 취약할 수 있고 다른 사람이 악의적으로 토큰을 취득하면 토큰의 유효기간이 끝나기 전까지는 막을 수 없다.(이미 입장권을 보여주고 입장함)
// Access token의 유효기간을 짧게하면 사용자가 이용하기 힘들고 로그인을 자주 해야하는 문제가 생긴다.
// Refresh Token과 Access token은 둘 다 JWT 토큰이다.
// Refresh Token은 유효기간을 길게 주고 Access token이 유효기간이 끝났을 때 발급해주는 역할만 한다.
// Access token은 접속할때 발급되는 토큰(세션에 저장) / Refresh Token은 Access token을 발급할 때 사용된다.(쿠키에 저장)

// 클라이언트가 로그인을 할때 Refresh Token과 Access token 둘 다 생성된다.
// 서버는 Refresh Token을 가지고 있고 Access token이 만료가 되면 Refresh Token을 확인하고 재발급을 해주거나, 다시 재로그인을 시킨다.

// 보통 Access token을 30분만 주면
// Refresh Token의 유효기간을 하루 주고
// Access token의 유효기간이 끝나면 Refresh Token의 유효기간을 확인하고 Access token을 재발급해준다.

// Access token과 Refresh 둘 다 이용한 인증방식
// 1. 이용자 로그인
// 2. 서버에서 사용자를 확인하고 입장권 권한 인증 정보를 payload에 할당해서 생성 후 Refresh Token도 생성해서 서버에 저장하고 두 토큰 모두 클라이언트에 반환한다.
// 3. 클라이언트도 두 토큰을 저장한다.
// 4. 클라이언트가 권한 인증이 필요해서 요청하면 Access token을 전달해서 요청한다.
// 5. 서버는 전달받은 토큰을 확인하고 payload의 인코딩된 값을 디코딩해서 사용자의 권한을 확인한다.
// 6. 만약에 토큰이 정상적인지 확인을 하고(썩은 토큰인지) 날짜가 지난 토큰이면 새로 로그인을 시켜서 토큰을 발급받게 한다.(만료된 Access token과 Refresh Token을 헤더에 실어서 서버에게 보냄)
// 7. 서버는 Access token과 Refresh token을 확인하고 Refresh token이 만료되지 않았으면 새로운 Access token을 발급ㅂ해서 클라이언트에 전달한다.

// dotenv, express, cookie-parser, jsonwebtoken, fs, nodemon

// 모듈 설치
// npm i dotenv express cookie-parser jsonwebtoken
// npm i --save-dev nodemon

// 모듈 가져오기
const express = require("express");
const dot = require("dotenv");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// .env파일 사용하기 위해 설정
dot.config();

// 서버 객체 생성
const app = express();

// body 객체를 사용하기 위해 설정 (body-parser를 대신할 수 있음)
app.use(express.urlencoded({ extended: false }));

// 헤더에 쿠키를 추가해주기 위해서 사용
app.use(cookie());

// /view의 이름으로 view폴더의 경로를 설정
app.use("/view", express.static("view"));

// 사용자 정보 객체 하나 더미
const user = {
  id: "jun",
  password: "123",
};

app.get("/", (req, res) => {
  fs.readFile("view/login.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/login", (req, res) => {
  // 아이디, 비밀번호
  // req.body 객체 안에 있는
  // 키 값으로 아이디 비밀번호 값 받아놓기
  const { user_id, password } = req.body;
  // 아이디, 비밀번호 맞는지 검증
  if (user_id === user.id && password === user.password) {
    // access token 발급
    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "5m",
      }
    );
    // refresh token 발급
    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );
    // 쿠키의 이름은 refresh 유효시간은 하루
    res.cookie("refresh", refreshToken, { maxAge: 24 * 60 * 60 * 1000 });
    // fs 의 readFile 함수를 사용해서 join.html 불러온다.  res의 send 함수로 응답
    fs.readFile('view/join.html','utf-8',(err,data)=>{
        res.send(accessToken + data);
    })
  } else {
    return res.send("아이디 비밀번호 오류");
  }
});

app.post("/refresh", (req, res) => {
  // ?. 뒤에 오는 키 값이 있으면 먼저 확인하고 값 반환
  // refresh키 값이 없어도 크래쉬 방지
  // cookies에 refresh가 있나 확인
  if (req.cookies?.refresh) {
    const refreshToken = req.cookies.refresh;
    // refresh token 이 정상인지 확인
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
      // err가 있으면 refresh token 이 썩었기 때문에 다시 로그인 시킨다.
      if (err) {
        res.send("로그인을 다시 해주세요");
      } else {
        // err 가 없고 정상적인 토큰이면 다시 access token 발급
        // jwt 에 sign 함수로 토큰 다시 생성
        const accessToken = jwt.sign(
          { 
            // 토큰의 payload 값들
            id: user.id,
          },
          // 토큰을 암호화 시킬 키값
          process.env.ACCESS_TOKEN_KEY,
          { 
            // 토큰의 유효기간 10분
            expiresIn: "10m", 
          }
        );
        res.send(accessToken);
      }
    });
  } else {
    res.send('다시 로그인 해주세요');
  }
});

app.listen(3000, () => {
  console.log("서버열림");
});


// access token을 왜 짧게 하고 새로 로그인 정보를 갱신해줄까.
// 해커가 악의적으로 access token 을 얻었을때 로그인이 이미 되어있는 상태라
// 막기가 힘들어서 access token 의 유효기간을 짧게하고 refresh token 의 유효기간을 
// 길게해서 사용자가 로그인을 자주하는 불편함을 보완해준다.
// 그리고 악의적으로 탈취된 access token 을 갱신 해주는 역할도 해준다.
// refresh token 을 다시 확인 시켜서, 좀더 해킹이 힘들게 