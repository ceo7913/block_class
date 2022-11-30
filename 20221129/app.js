// ERC-20 은 이더리움 네트워크에서 표준 토큰
// 정해진 규격대로 만들어 줘야 한다.

// 규격대로 만들어주면 토큰을 생성할 수 있는데
// 변수명도 정해진대로 만들어줘야한다.

// 토큰의 이름 symbol 이라는 변수에 담긴 내용은 토큰의 단위 ETH
// balances 잔액의 내용이 들어있다. (UTXO 같은 느낌)

// balance {
//     address : String;
//     amount : Number;
// }

// token {
//     name : String;
//     symbol : String;
//     balances : balance[];
// }

// balances = [
//     {
//         address:"주소",
//         amount : "잔액"
//     },
//     {
//         address:"주소",
//         amount : "잔액"
//     },
   
// ]


// 솔리디티의 address 라는 데이터 타입 
// address
// 20byte 짜리 데이터 타입이고 계정이나 주소가 40글자로 만들어진
// 20byte 짜리 문자열 address 는 string 타입이고 20byte 저장공간을 가지고 있다.

// mapping
// mapping(string => uint256)
// mapping 데이터 타입은 우리가 js 에서 사용한 객체라고 보면 된다.
// string 이 속성명 uint256 속성값이 된다.

// mapping(string => uint256) 표현을 하면
// {
//     "name" : 50
// }

// 선언해서 사용 해보면 
// mapping(address => uint256) public balance;
// 데이터의 타입은 mapping(address => uint256) 객체형식
// public 으로 공개
// 변수명은 balance
// balance 를 호출하면
// {
//     "주소" : 1000,
//     "주소" : 1000,
//     "주소" : 1000,
// }

// 컨트랙트에서 인스턴스를 생성할때 constructor() 함수에 매개변수를 추가해서
// 인스턴스 생성을 할 수 있다. 우리가 인스턴스를 생성하는건 배포하기 전에 
// 매개변수를 전달해 줘야 하기 떄문이다.

// npx truffle complie
// npx truffle migration
// 배포를 하고 나서 트러플 콘솔창에

// 네트워크에서 컨트랙트를 실행한 사람의 주소를 가져올 수 있는 방법
// msg.sender(예약어) : 실행

// test2.sol 작성후 컴파일 하고 2_deploy_Test.js 의 내용 수정 후 Test2 로
// 배포 진행하고 트러플 콘솔창 열기
// Test2.deployed().then(its => it = its);
// it.owner() 로 조회하면 배포한 사람의 주소가 뜬다.

// 응용을 해서 토큰을 만들어 보자 토큰 발행
// Token.sol 파일 만들고
// Token.deployed().then(its => it = its);
// 인스턴스 조회하고

// it.balanceOf("코인베이스 계정") // 총 발해량 확인가능
// it.transfer("0x8DDdE5487F48737357D475E5921c5e440d0E9ee5",100)
// 두번째 계정에 100 토큰 보내면
// it.balanceOf("두번째 계정") // 받은 토큰 확인 가능