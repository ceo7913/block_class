// express란?
// node js를 사용해서 쉽게 서버 구성을 할 수 있게 만들어주는 클래스와 라이브러리의 집합

// express 설치 명령어
// ----------------------------
// npm i express
// ----------------------------

// express를 가져와서 변수에 담아준다.
// 이렇게 모듈을 가져오는 것들은 위에다가 모아주는 게 좋다.
const express = require("express");
// const ejs = require("ejs");
// const mysql = require("mysql2");
// const fs = require("fs");

// ejs는 node js와 express에서 많이 사용하고 있는 템플릿 엔진
// ejs는 우리가 쓰는 기본 html문법을 사용하면서 <% %> 이런 문법을 사용해
// 크게 벗어나지 않게 서버와 데이터를 사용할 수 있는 장점이 있다.
// ejs 설치명령어
// -------------------------------
// npm i ejs
// -------------------------------
const ejs = require("ejs");

// fs는 파일 읽기, 쓰기를 쉽게 도와주는 모듈
// fs 설치 명령어
// -------------------------------
// npm i fs
// -------------------------------

// body-parser는 요청과 응답 사이에서 공통적인 기능을 해주는 미들웨어이다.
// 데이터를 body라는 객체 안에 담아서 요청 응답을 받을 수 있게 해준다고 보면 된다.
// body-parser 설치 명령어
// --------------------------------------
// npm i body-parser
// --------------------------------------

const bodyParser = require("body-parser");

const mysql = require("mysql2");

const temp = mysql.createConnection({
  user: "root",
  password: "03070307",
  database: "test5",
  // 다중 쿼리문을 사용할 수 있도록 설정하는 옵션
  // multipleStatements : true, false
  multipleStatements: true,
});
// CREATE SCHEMA `test5` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ; 워크벤치로 만들고 코드 복사해옴!

temp.query("SELECT * FROM products", (err, res) => {
  if (err) {
    const sql =
      "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql);
    console.log("안됨");
  } else {
    console.log(res);
  }
});

temp.query("SELECT * FROM products2", (err, res) => {
  if (err) {
    const sql =
      "CREATE TABLE products2(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
    temp.query(sql);
    console.log("안됨");
  } else {
    console.log(res);
  }
});

// express 함수를 실행해서 반환값을 app에 담아준다.
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
  // extended의 옵션
  // true : express에 기본 내장된 쿼리 스트링 모듈을 사용한다.
  // false : 쿼리 스트링 모듈의 기능이 좀 더 확장된 qs 모듈을 사용한다.
);

// 웹서버 포트를 정해준다.
const PORT = 4000;

// 크리에이트 서버를 사용하지 않고 get과 post를 사용해서 쉽게 가져올 수 있다.
// app.get();
// app.post();
const fs = require("fs");

// app.get("요청 url");
app.get("/", (req, res) => {
  // console.log(req);
  // http에선 end 함수로 보내고, express에서는 send로 보내고 끝낸다.
  // fs 모듈로 파일을 읽어온다.
  // fs 모듈이 readFile 파일을 읽어오는 함수
  // 매개변수 첫번째 파일의 경로이름
  // 두번째는 인코딩 방식
  // 세번째는 콜백함수
  fs.readFile("list.html", "utf-8", (err, data) => {
    temp.query("SELECT * FROM products", (err, result) => {
      // ejs render함수로 해당 불러온 파일을 그려준다.
      // ejs 두번째 매개변수로 데이터를 전달할 수 있다.
      // send 꼭 한개만 썼는지 확인!!! end도 마찬가지!!!@@@
      res.send(
        ejs.render(data, {
          data: result,
        })
      );
    });
  });
});

app.get("/insert", (req, res) => {
  fs.readFile("insert.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/insert", (req, res) => {
  const data = req.body;
  // body 객체 안에 form에서 보내준 데이터는 input들의 name이 키 값
  // 해당 input의 value 값으로 전달된다.
  const sql = "INSERT INTO products (name, number, series) VALUE (?,?,?)";
  // console.log(data.series);
  temp.query(sql, [data.name, data.number, data.series], () => {
    // redirect는 url 경로로 돌아가게 해준다.
    // redirect("/") 매개변수로 경로를 입력해준다.
    res.redirect("/");
  });
  //   console.log(data);
  //   res.send(data);
});

// get 방식으로 삭제를 해준다
app.get("/delete/:id", (req, res) => {
  // url 요청에서 파라미터를 뽑을 수 있는데
  // req 요청의 값을 이용할 수 있다.
  // params의 뜻은 매개변수
  // http://localhost:4000/delete/1 이런 방식이면
  // delete/:id 이 주소에서 id가 params 키 값이고
  // http://localhost:4000/delete/1 실제로 요청한 url의 /:id 이 자리에 있는 값이 value이다.
  // {params:{id:1}} 그래서 이렇게 값을 받을 수 있다.
  // AUTO_INCREMENT도 같이 증가를 하고 값이 남아있는데
  // 컬럼을 추가할 때마다 id가 생성이 자동으로 되고 AUTO_INCREMENT도 증가함
  // UPDATE와 ALTER의 차이는 둘 다 수정하는 명렁어지만
  // UPDATE(데이터 명령어)는 데이터 베이스의 관계에 저장된 데이터를 수정하는 것이고
  // ALTER(데이터의 정의 명령어)데이터 베이스의 관계 구조를 수정하는데 사용된다.
  // console.log(req.params);

  // 쿼리문을 sql에 저장한다
  // 위에서 설정한 multipleStatement을 사용해 다중쿼리문을 써준것
  const sql = "DELETE FROM products WHERE id=?;";
  const sql2 = "SET @CNT = 0;";
  const sql3 = "UPDATE products SET products.id = @CNT:= @CNT+1;";
  const sql4 = "ALTER TABLE products AUTO_INCREMENT = 0;";
  temp.query(sql, [req.params.id], () => {
    temp.query(sql2 + sql3 + sql4, () => {
      res.redirect("/");
    });
  });
  // 아래의 쿼리문 안에 쿼리문 이런식으로 쓴게 너무 지저분 하니까
  // 위와 같이 변수에 넣어서 정리한것이다.
  // // 맨앞이 쿼리문, 두번째는 값, 세번째는 콜백함수
  // temp.query(sql, [req.params.id], () => {
  //   temp.query("SET @CNT = 0;", () => {
  //     temp.query("UPDATE products SET products.id = @CNT:= @CNT+1", () => {
  //       temp.query("ALTER TABLE products AUTO_INCREMENT = 0", () => {
  // res.redirect("/");
  //       });
  //     });
  //   });
  // });
});

app.get("/edit/:id", (req, res) => {
  fs.readFile("edit.html", "utf-8", (err, data) => {
    temp.query(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id],
      (_err, result) => {
        res.send(ejs.render(data, { data: result[0] }));
      }
    );
  });
});

app.post("/edit/:id", (req, res) => {
  const { name, number, series } = req.body;
  // 옵션으로 값을 받을 때는 ?물음표를 사용한다.
  console.log(name, number, series, req.params.id);
  const sql = "UPDATE products SET name=?, number=?, series=? WHERE id=?";
  temp.query(
    sql,
    [name, number, series, req.params.id],
    // [req.body.name, req.body.number, req.body.series, req.params.id],
    () => {
      res.redirect("/");
    }
  );
});

app.get("/test", (req, res) => {
  const sql = "SELECT * FROM products;";
  const sql2 = "SELECT * FROM products2;";
  temp.query(sql + sql2, (err, result) => {
    console.log(result[0]);
    console.log(result[1]);
  });
});

app.listen(PORT, () => {
  console.log("server start");
});
