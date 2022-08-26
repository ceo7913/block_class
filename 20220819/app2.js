// express, ejs, path, nodemon, sequelize
// path 기본 경로를 다룰 수 있게 도와주는 모듈

const express = require("express");
const ejs = require("ejs");
const path = require("path");
// 폴더 경로까지만 잡으면 하위 파일을 기본으로 잡는다
// { } 이렇게 잡으면 키값만 가져올 수 있다.
const { sequelize, User, Post } = require("./model");
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

app.get("/", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  // create 이 함수를 사용하면 해당 테이블에 컬럼을 추가할 수 있다.
  const { name, age, msg } = req.body;
  const create = User.create({
    // name 컬럼의 값
    name: name,
    // age 컬럼의 값
    age: age,
    // msg 컬럼의 값
    msg: msg,
  });
  // 위의 객체를 전달해서 컬럼을 추가할 수 있다.
  // js 구문으로 SQL 동작을 시킬 수 있다.
  // 쿼리문을 짤 필요가 없어진다.
});

app.get("/user", (req, res) => {
  // 여기서는 추가된 유저들을 봐야 하니까
  // 조회를 하는데 전체를 조회해야 한다.
  // findAll 전체를 찾는다.
  // findAll 은 매개변수로 검색할 옵션
  // 빈객체를 생성하면 조건없이 다 잡아온다.(검색조건을 넣으면 해당 조건의 값만 가져옴)
  User.findAll({})
    .then((e) => {
      res.render("page", { data: e });
    })
    .catch(() => {
      // 실패하면 에러 페이지를 보여주면 된다. 밑에 err 페이지를 만들지 않았지만 예시로 표기해놨다.
      res.render("err");
    });
});

app.post("/create_post", (req, res) => {
  const { name, text } = req.body;
  console.log(name, text);
  // User 테이블이랑 Post 랑 연결되어 있는데
  // User id 기본키로 되어있고 Post 는 user_id
  // 테이블에서 하나의 컬럼값 가져온다.
  // findOne = 하나를 검색할 때 사용
  // find 매개변수로 검색할 옵션
  User.findOne({
    where: { name: name },
  }).then((e) => {
    Post.create({
      msg: text,
      // forignKey = user_id 이고 유저의 아이디와 연결한다고 정의를 해놓았기 때문에(model.js)
      // 말해 놓았다 모델에 user.js 와 posts.js 에 만든 모델에
      user_id: e.id,
    });
  });
});

app.get("/view/:name", (req, res) => {
  // 해당 유저를 이름으로 조회하고
  User.findOne({
    where: {
      // 조건문 = 누구를 찾을 것인지
      // params 로 전달받은 name 키값에 있는 벨류로 검색 이름을
      name: req.params.name,
    },
    // 리턴값을 단일 객체로 변형해서 보여준다.
    // raw: true,
    // 관계형 모델 불러오기
    // 관계를 맺어 놓은 모델을 조회할 수 있다.
    // 여기서는 해당 검색된 유저와 맞는 모델
    // user 모델의 id 가 1번이면 post 모델의 user_id 키가 같은 애들을 조회
    include: [
      {
        // post 모델이 조회 되었으면 하니까 post 모델 써줌
        model: Post,
      },
    ],
  }).then((e) => {
    console.log(e);
    e.dataValues.post = e.dataValues.Posts.map((i) => i.dataValues);
    const Posts = e.dataValues;
    console.log(Posts);
    res.render("view", { data: Posts });
  });
});

app.post("/view_updata", (req, res) => {
  const { id, msg, text } = req.body;
  // 수정 쿼리문 사용
  // 객체가 들어가는데
  // 첫번째 매개변수에 객체가 수정할 내용
  // 두번째 매개변수 객체가 검색 조건
  // 밑에 검색 조건 내용은 아이디와 메시지 둘다 검색 해서 맞는거 탐색
  Post.update({ msg: msg }, { where: { id: id, msg: text } });
});

app.get("/del/:id", (req, res) => {
  // destroy = 삭제 쿼리문
  // 매개변수 객체 내용은 검색 조건
  Post.destroy({
    // 검색은 params 의 안에 있는 id 키값
    where: {
      id: req.params.id,
    },
  }).then(() => {
    // 잘 끝나면 유저 페이지로 이동
    res.redirect("/user");
  });
});

// 서버 연결
app.listen(3000, () => {
  console.log(3000, "서버열림");
});
