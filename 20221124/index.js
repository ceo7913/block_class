const { Contract } = require('./controll/compile');
const { Client } = require('./controll/client');

const [abi, bytecode] = Contract.compile('test.sol');

const client = new Client('ws://127.0.0.1:9005');
const client2 = new Client('ws://127.0.0.1:9005');
const contract = new client.web3.eth.Contract(abi);
const txObject = {data : bytecode};

const Address = "0xdddc8532d82ea98f75e7d826b207381b6f23b8cd";

async function init() {
    // deploy() : 반환값이 promise 객체
    // 트랜잭션이 처리 될때까지 기다린다.
    const instance = await contract.deploy(txObject).send({from : Address})
    // 배포하고 메소드나 변수들을 가져와야하는데
    // 필요한게 contract Address
    // instance 객체 안에 options.address에 contract address가 들어있다.
    console.log(instance.options.address)
}
init();

const CA = "0x3bFcb757fBA842238cB5f4e1DeB2C8d88be127Ee";

// 컨트랙트 조회 해서 함수와 변수 가져오기
// 필요한게 abi와 contract address
const deployed = new client.web3.eth.Contract(abi, CA);
// getter로 value값 가져옴
deployed.methods.value().call().then((data) => {
    console.log(data);
});

deployed.methods.setValue("121651515").send({ from: Address }).then((data)=>{
    console.log(data);
});