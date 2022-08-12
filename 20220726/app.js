// 웹소켓과 클라이언트가 양방향 통신할 수 있게 도와주는 소켓

// socket.io 는 왜 쓰고 뭘까
// 실시간 웹을 위한 자바스크립트 라이브러리
// 웹 클라이언트와 서버간의 실시간 양방향 통신을 가능하게 해주는
// node.js 모듈

// 가상화폐 거래소 같은 데이터 전송이 많은 경우 빠르고 비용이 싸게 
// 표준 웹소켓을 사용하는게 좋다.
// 실제 업비트나 바이낸스 소켓 API를 사용하면 
// 데이터가 정말 많이 들어온다.

// socket.io 는 웹소켓 프로토콜을 지원해주는 네트워킹 라이브러리 
// 비동기 이벤트 방식으로 실시간으로 간단하게 데이터를 요청하고 받을 수 있다.

// 예를 들어 웹에 고객 센터 채팅 같은 것도 socket.io 라이브러리를 사용해
// 페이지를 새로고침 하지 않아도 실시간으로 응답한다.

// socket.io 많이 쓰는 메서드
    // on : 이벤트에 매칭해서 소켓 이벤트 연결 (연결)
    // emit : 소켓 이벤트 발생 (발생)

// express, fs, socket.io

// 서버를 편리하게 실행하기 위해 따로 설치함
// nodemon

// express 설치 명령어
//--------------------------------------------
// npm i express
//--------------------------------------------    

// socket.io 설치 명령어
//--------------------------------------------
// npm i socket.io
//--------------------------------------------    

// 설치한거 js 로 가져오는법
const express = require("express");
const fs = require('fs');
const socketio = require('socket.io');

// js로 가져와서 실행하는 법
const app = express()


app.get('/',(req, res)=>{
    // js 에서 html 파일 불러오기
    fs.readFile('page.html',(err,data)=>{
        res.end(data);
    });
});

const PORT = 3000;
// app.listen(PORT,()=>{
//     console.log(PORT,"번 포트 사용중");
// });

const server = app.listen(PORT,()=>{
    console.log(PORT,"번 포트 사용중");
});



// socketio(매개 변수) 매개변수는 express sever
const io = socketio(server);
let userid = [];
// socketio 사용해서 연결
// connection -> 클라이언트가 웹소켓 서버에 접속할때 발생
io.sockets.on("connection",(socket)=>{
    console.log('유저가 접속함');
    userid.push(socket.id);
    console.log(userid);
    socket.on("hi",(data)=>{
        // console.log(data,"에서 보냄 웹소켓 hi 이벤트가 실행");
        
        // 자기자신에게 발생
        // socket.emit("hi","웹소켓에서 클라이언트로 보냄");
        
        // 모든대상에게 발생
        // io.sockets.emit("hi", "모두에게");

        // 자기 제외 모든 대상 발생(방송)
        // socket.broadcast.emit("hi","나 빼고 모두에게");

        // 비밀대화 
        io.sockets.to(data.id).emit("hi",data.text);

    });
});