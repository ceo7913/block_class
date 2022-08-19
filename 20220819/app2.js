// express, ejs, path, nodemon, sequelize
// path 기본 경로를 다룰 수 있게 도와주는 모듈

const express = require("express");
const ejs = require("ejs");
const path = require("path");
// 폴더 경로까지만 잡으면 하위 파일을 기본으로 잡는다
// { } 이렇게 잡으면 키값만 가져올 수 있다.
const {sequelize} = require("./model"); 
// 서버 객체 만들고
const app = express();

// express 의 변수처럼 저장을 할 수 있는것
// path.join() = 매개변수로 받은 문자열들을 주소처럼 합쳐줌
// ex) path.join('a','b') = a/b 이렇게 나옴
// __dirname = app2.js 가 있는 위치 쉽게말해 => (현재 파일의 경로)
// views 폴더까지의 경로가 기본값 렌더링할 파일을 모아둔 폴더
// app.set express에 값을 저장 가능 밑에 구문은 views 키에 주소값 넣은 부분
app.set("views", path.join(__dirname, "view"));

// 랜더링하는 기본 엔진을 ejs 처럼 사용한다고 알려주는것
// engine('파일의 타입','') 뷰 엔진이 그릴 때
//====================================================
// app.get('/',(req,res)=>{
//     // fs 모듈로 파일을 가져왔다 치고]
//     res.send(
//         res.send(ejs.render(data,{e})));
// });
//====================================================
// html의 뷰 엔진을 ejs 랜더링 방식으로 바꾼다

app.engine("html", ejs.renderFile);

// 뷰 엔진 설정을 html 을 랜더링 할때 사용 하겠다.
app.set("view engine", "html");

// body 객체 사용
app.use(express.urlencoded({ extended: false }));

// 시퀄라이즈 구성 해보자 연결 및 테이블 생성 여기가 처음 매핑
// 아래 식들에서 필요한 테이블들이 다 생기고 매핑 된다. (때문에 절대 어긋날 일이 없다. )
// 테이블의 내용이 다르면 오류를 바로 뱉어냄
// 여기서 CREATE TABLE 문이 여기서 실행 된다는 것
// force = 강제로 실행을 초기화 시킬 것인지를 설정 해준다.(테이블 내용을 다 비워줄 것인지)
sequelize
  .sync({ force: false }) // sync = 함수 = 데이터 베이스를 동기화 하는데 사용 (필요한 테이블을 생성해줌)
  .then(() => {
    // 연결 성공
    console.log("DB연결 성공");
  })
  .catch((err) => {
    // 연결 실패
    console.log(err);
  });

// 서버 연결
app.listen(3000, () => {
  console.log(3000, "서버열림");
});
