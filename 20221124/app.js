// 전에는 solc라이브러리를 사용할때
// npx solc --bin --abi "sol파일 경로"
// 이렇게 컴파일 해서 사용 했었는데 
// 자바스크립트 구문으로 컴파일 해보자


// 순서

// 1. contract.compile함수로 abi와 bytecode 값을 받아서 저장하고

// 2. new Client('ws://127.0.0.1:9005')  
//    web3 인스턴스 속성값으로 가지고 있는 client를 만들고

// 3. 트랜잭션 객체(txObject 변수로 만들고) txObject 객체의 내용에는 data 키값이
//    있고 data키값의 value는 bytecode의 내용

// 4. contract 인스턴스를 만든다.
//    client는 2번 순서에서 만든 web3 인스턴스 속성값을 가지고 만든 client로
//    new client.web3.eth.Contract(abi)함수를 사용해서 abi내용을 가지고 있는
//    컨트랙트 인스턴스 생성

// 5. contract.deploy 함수를 사용해서 배포 진행
//    deploy함수가 반환해주는게 promise 객체 
//    트랜잭션 풀이 처리 될때 까지 기다려준다.
//    await contract.deploy(txObject).send({from : "트랜잭션 발생시키고 수수료를 낼 계정"}) 
//    다 트랜잭션이 처리가 되면 배포된 컨트랙트 주소를 가져와서 저장해놓고
//    컨트랙트 주소는 고유의 값 컨트랙트를 불러올때 사용한다.
//    contract address는 contract.deploy 함수로 반환받은 instance 객체에서
//    instance.options.address에 contract address가 들어있다.

// 6. 컨트랙트를 조회해서 함수나 상태 변수를 불러와서 사용
//    contract address로 조회를 하는데 abi와 contract address 둘다 필요하다.
//    new client.web3.eth.Contract 함수로 조회를 하고
//    매개변수로 첫번째 값이 abi 두번째 값이 contract address
//    함수로 반환 받은 값을 가지고 컨트랙트 메소드나 상태 변수를 가져오고 사용할수 있다.