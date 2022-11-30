// npm install web3
const Web3 = require('web3');

let instance;
class Client{
    constructor(_url){
        // instance의 내용이 있으면 내용이 이미 있는 instance 반환
        if(instance) return instance;

        // instance 내용이 없으면 동적할당으로 생성한 Client 클래스 객체에 web3 생성
        this.web3 = new Web3(_url);
        // 생성후에 instance변수에 Client 클래스 객체 할당
        instance = this;
    }
}

module.exports = { Client };