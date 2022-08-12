// 사용할 모듈
// socket.io, express, fs, nodemon

// 설치 명령어
// npm i 모듈 이름

// 영화관 좌석 예약 만들기

const socketio = require("socket.io");
const express = require("express");
const fs = require("fs");


let seats = [];

let temp = [
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
];
let temp1= [
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
];
let temp2= [
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
];

let seatsArr = [temp,temp1,temp2];
let index = 0;


// 웹 서버 생성
const app = express();
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(PORT, "번 포트 실행");
});

// socket.io 생성 및 실행
const io = socketio(server);

app.get("/", (req, res) => {
    fs.readFile("page.html", (err, data) => {
        res.send(data.toString());
    });
});

app.get("/seats/:id",(req,res)=>{
    index =req.params.id;
    seats = seatsArr[index];
    console.log(req.params.id);
    res.send(seats);
})

// soket
io.sockets.on("connection", (socket) => {
    socket.on("reserve", (data) => {
        let seatsTemp = seatsArr[data.selectCount];
        console.log(seatsTemp);
        seatsTemp[data.y][data.x] = 2;
        io.sockets.emit("reserve",data);
    });
});