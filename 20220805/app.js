// 오늘 수업 만들거
// 경매소 만들기 이거 응용해서
// 이후에 로그인 회원가입 붙여서 구현해 볼 것
// 월요일에 쿠키 세션 JWT

// ejs 가 뭔지도 이따 블로그에 기입할것 req,res 에 대해서도 자세히 ㄱ

// 사용할 모듈
// express , socket.io , fs , nodemon , ejs

// 1. packjson 설치하고
// 2. express 서버 세팅
// 3. 페이지 라우터 분리해서 보여주기
// 4. nodemon 개발 버전으로 설치

// 루트경로 페이지 하나
// /shop 페이지 하나

const express = require("express");
const socketio = require("socket.io");
const fs = require("fs");
const ejs = require("ejs");
const { send } = require("process");

const app = express();

// use 함수 사용해서 설정 추가
// 이름도 사용하겠다는 뜻
// express static 함수 사용
// 함수를 전달했고 server의 설정에 파일의 경로를 설정해준다.
// __dirname+"/image" 현재 이미지 파일의 경로
// __dirname 현재 프로젝으의 경로
// console.log(express.static(__dirname+"/image"));
// 현재 이미지가 있는 경로를 console.log()로 보여준다
// console.log(__dirname+"/image");

// "/src" 이부분은 자신이 설정한 경로의 이름을 정의해 줄 수 있다.
// __dirname+"/image" 까지의 경로가 "/src"이 이름으로 설정된 것
app.use("/src", express.static(__dirname + "/image"));
app.use("/src2", express.static(__dirname + "/image2"));

// 상품의 번호를 정해줄 변수
let counter = 0;

// 생성자 함수 (객체를 만들기 위해 함수를 만듦)
function Product(name, image, price, count) {
  // 번호가 증가 할 수 있도록 증감 연산자 사용 count++;
  this.index = counter++;
  this.name = name;
  this.image = image;
  this.price = price;
  this.count = count;
}

// 동적 할당으로 new를 붙여서 생성자 함수 사용
// 객체를 하나 만듦
console.log(new Product("사과", "/", 2000, 20));

// 상품을 가지고 있을 박스
// 상품들 전부 가지고 있다.
const products = [
  new Product("사과", "/", 2000, 20),
  new Product("수박", "/", 3000, 30),
  new Product("초코바", "/", 4000, 40),
  new Product("비타민", "/", 5000, 50),
  new Product("커피", "/", 6000, 60),
];

console.log(products);

const server = app.listen(3000, () => {
  console.log(3000, "번에 잘열렸어요");
});

// 소켓 생성 및 실행
const io = socketio(server);

// arlt + shipt + F 는 정렬 단축키
app.get("/", (req, res) => {
  fs.readFile("page.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.get("/shop", (req, res) => {
  //  fs.readFile("파일이름", "인코딩방식", (err, data는 문서를 담은 파라미터) => {}
  // [ 파라미터 ]는 수학과 통계학에서 어떠한 시스템이나 함수의 특정한 성질을 나타내는 변수를 말한다.
  // 일반적으로는 θ라고 표현되며, 다른 표시는 각각 독특한 뜻을 지닌다.

  // 파일을 읽어 온것
  // fs.readFileSync("shop.html","utf-8") 이렇게 쓰고 반환값을 받으면
  // htmlconst page = fs.readFileSync("shop.html","utf-8");
  //   fs.readFile("shop.html", "utf-8", (err, data) => {
  //     res.send(data);
  //   });
  const page = fs.readFileSync("shop.html", "utf-8");
  res.send(
    ejs.render(page, {
      products: products,
    })
  );
});

let cart = [];
// 소켓 이벤트 연결
// connection 클라이언트가 접속 했을때
io.on("connection", (socket) => {
  // 상품 구매 취소했을때 돌리는
  function onReturn(index) {
    // 물건의 갯수를 다시 돌린다. 더해준다.
    products[index].count++;
    // 물건을 제거
    // 배열 안의 값 제거 delete 배열 [인덱스]
    delete cart[index];
    let count = products[index].count;
    io.emit("count", {
      index,
      count,
    });
  }

  // 이벤트 연결 웹소켓이 가지고 있는 이벤트
  socket.on("cart", (index) => {
    // 물건의 갯수를 감소
    
    products[index].count--;
    // 빈 객체를 하난 만들어서 해당 배열의 인덱스 자리에 넣고
    cart[index] = {};
    // 해당 배열의 인덱스 자리에 있는 객체에 index 키를 추가하고 벨류를 넣어준다.
    cart[index].index = index;

    let count = products[index].count;
    io.emit("count", {
      index,
      count,
    });
    // {
    //     index : 1,
    //     count : 2,
    // }
    // 이런식으로 보임 짧은 문법
  });

  // 구매 했을때 이벤트 연결
  socket.on("buy", (index) => {
    // 카트의 해당 상품 인덱스 제거
    delete cart[index];
    let count = products[index].count;
    io.emit("count", {
      index,
      count,
    });
  });

  // 상품 구매를 취소 했을때
  socket.on('return',(index)=>{
    onReturn(index);
  });
});
