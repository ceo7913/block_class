// express 모듈 사용
const express = require('express');
// fs 모듈 사용
const fs = require('fs')
// soket.io 모듈 사용
const socketio = require('socket.io')

// 서버 객체 만들기
const app = express();
// const server = express().listen(PORT,()=>{})

// 사용할 포트 변수에 바인딩 (할당해 놓는다)
const PORT = 3000;

const server = app.listen(PORT,()=>{
    console.log(PORT, "에 잘 열렸어요");
});

// socketio 생성 및 실행
const io = socketio(server);

app.get('/',(req,res)=>{
    fs.readFile('page2.html',(err, data)=>{
        res.end(data);
    });
});

// io.sockets.on('connection'); 클라이언트가 접속 했을 때
// io.sockets.on('disconnect'); 클라이언트가 종료 했을 때

io.sockets.on('connection',(socket)=>{
    // 클라이언트에서 socket.emit("massage",data);
    // 웹소켓에 연결되어 있는 massage 이벤트를 실행 시켜 준다.
    // 밑에 코드 
    socket.on("message",(data)=>{
        // 요기
        console.log('dd')
        io.sockets.emit('message',data); 
    });
});