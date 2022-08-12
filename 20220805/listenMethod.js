const { appendFile } = require("fs")

res.download() // 파일을 다운로드 하도록 프롬프트
res.end() // 응답 프로세스를 종료
res.json() // json 응답을 전송한다.
res.jsonp() // jsonp 지원을 통해 json 응답을 전송한다.
res.redirectr() // 요청의 경로를 재지정해 준다.
res.render() // 뷰(view) 템플릿을 렌더링 해준다.
res.send() // 다양한 유형의 응답을 전송한다.
res.sendFile() // 파일을 octet 스트림으로 전송한다.
res.sendStatus() // 응답 상태 코드를 설정한 후 해당 코드를 응답 본문(body)에 담아서 전송한다(404 Not Found등)


// 라우트 처리 app.route()
// get, post, put과 같은 라우트 메서드를 한곳에 작성 할 수 있음

// 모듈식 라우터 - 하나의 라우트 경로로 각 라우트 메소드 처리
app.route('/customer')
    .get((req, res)=>{ // http 메소드 get 요청에 대한 조회 처리
        res.send('고객 정보 조회');
    })
    .post((req, res)=>{ // http 메소드 get 요청에 대한 저장 처리
        res.send('신규 고객 추가');
    })
    .put((req, res)=>{ // http 메소드 get 요청에 대한 수정 처리
        res.send('고객 정보 수정');
    })
    .delete((req, res)=>{ // http 메소드 get 요청에 대한 삭제 처리
        res.send('고객 정보 삭제');
    });
    
// express.Router
// 라우트 처리를 여러개의 파일로 분리해 구현이 가능하다.

// routes/customer.js
const express = require("express");
const router = express.Router();

router
    .get("/",(req, res)=>{
        // http 메소드 get 요청에 대한 조희 처리
        res.send("고객 정보 조회");
    })
    .post("/insert",(req, res)=>{
        // http 메소드 get 요청에 대한 저장 처리
        res.send("고객 정보 추가");
    })
    .put("/update",(req, res)=>{
        // http 메소드 get 요청에 대한 수정 처리
        res.send("고객 정보 수정");
    })
    .delete("/delete",(req, res)=>{
        // http 메소드 get 요청에 대한 삭제 처리
        res.send("고객 정보 삭제");
    })

// app.js
const express = require('express');
const customerRoute = require('./routes/customer');
const productRoute = require('./routes/product');
const app = express();

app.use(express.json({
    limit : '50mb' // 최대 50메가
})); // 클라이언트 요청 body를 json으로 파싱 처리

app.listen(3000,()=>{
    // 3000번 포트로 웹 서버 실행
    console.log('3000번 포트에 서버 실행됨')
});

app.use('/customer',customerRoute); // customer 라우트를 추가하고 기본 경로로 /customer 사용
app.use('/product',productRoute); // product 라우트를 추가하고 기본경로로 /product 사용