/*솔리디티 버전*/
pragma solidity ^0.8.15; // 버전

// HelloWorld 컨트랙트
contract HelloWorld {
    string text;
    constructor(){
        text = "Hello World!";
    }

    function getText() public view returns(string memory) {
        return text;
    }
    function setText(string memory value) public {
        text = value;
    }
}

// 설치 명령어 솔리디티 코드를 컴파일 해주는 라이브러리
// npm install solc

// 컴파일 명령어
// npx solc --bin --abi [파일 경로]

// abi 파일은 스마트 컨트랙트 안에 매개변수나 함수들을 json형식으로 나타낸 리스트
// 함수를 호출하거나 데이터를 호출 해서 받을수 있다.
// 실제로 스마트 컨트랙트 안에서는 바이트 코드로 변환되어서 담겨 있다.

// bin : 컴파일된 바이트 코드내용 이더리움 네트워크 상에 배포

// EOA, CA 이렇게 두가지가 있는데
// EOA 개인키를 가지고 트랜잭션을 생성하고 서명하는것
// CA는 개인키가 없고 트랜잭션 응답으로만 트랜잭션을 실행 할수 있다.

// CA 안에 스마트 컨트랙트 내용이 담겨 있다.
// CA에 있는 코드 해시값을 통해서 스마트 컨트랙트 코드에 접근 가능하다.
// CA라는건 스마트 컨트랙트가 배포 되어있을때 생긴다.
// 스마트컨트랙트를 배포해서 생긴 CA를 조회해서 contractAddress를 사용
// CA에 있는 정보를 가지고 조회가 가능하다.

// contractAddress는 스마트 컨트랙트 안에 작성된 함수나 변수를 호출해서 값을 가져올때
// 사용하고 스마트 컨트랙트에 접근 하기 위해서는 CA 값이 있어야한다.

// contract 변수에 eth.contract(위의 abi 값)를 할당을 해서
// 만든 객체가 컨트랙트 객체이다.
// contract.at() at함수를 사용해서 스마트 컨트랙트 코드에 접근이 가능하다.
// instance 변수에 contract.at(contractAddress)값 할당

// contractAddress 주소 구하기
// eth.getTransactionReceipt(트랜잭션의 해쉬값)

// transacion Hash : "0xf270e8d211c555def115943b330f47cacc18d3f8c10f2973efd47ebc2658671c"
// contractAddress 값은 eth.getTransactionReceipt('트랜잭션 해쉬')
// contractAddress : "0x92bb77aa46a0aa8e9ad086c80fffe06002839acf"

// 상태 변수를 가져오는 것과 변경하는것은 차이가 있는데
// 상태변수의 값을 바꾼다는건 저장 공간에 값이 달라진다는것이기 때문에
// 네트워크에서 저장공간은 한계가 있어서 저장 용량을 바꾸기 위해서 추가적으로
// 비용을 지불 해야 한다.
// EVM을 실행 시기키 위한 비용을 지불하는것.
// 상태변수의 값을 바꾸려면 트랜잭션을 발생시켜 수수료를 지불 해야한다.

// call 함수는 데이터를 불러오는 함수이고
// 값을 전달해서 상태 변수를 바꾸는건 send이다.
// 트랜잭션을 보내서 배포하고 마이닝 해서 트랜잭션 처리 하고 setText 함수 실행

// 상태 변수 값 변경
// instance = contract.new(txObject)
// instance.setText("aaaaaaaaaaaaa", {from : eth.coinbase})