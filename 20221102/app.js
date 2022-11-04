// typeScript로 블록 생성 만들기

// 환경 설정 하고

// ts-node 설치

// 설치 명령어
// ------------------------------------------------------
// npm install -D typescript ts-node @types/node
// ------------------------------------------------------

// tsconfig.json 만들기

// ------------------------------------------------------
// tsc --init
// ------------------------------------------------------

// tsconfig.json에서 paths 사용할거라

// 설치 명령어
// ------------------------------------------------------
// npm install -D tsconfig-paths
// ------------------------------------------------------

// 우리가 필요한 모듈 설치

// 머클루트와 해시값이 필요하니까
// crypto-js, merkle 설치

// 설치 명령어
// ------------------------------------------------------
// npm install crypto-js merkle
// ------------------------------------------------------

// typeScript는 외부 모듈을 사용할 경우에 타입 정의 파일이 필요합니다.
// crypto-js, merkle 모듈 타입을 가져올 수 있는 모듈 설치

// 설치명령어
// ------------------------------------------------------
// npm i --save-dev @types/crypto-js
// npm i --save-dev @types/merkle
// ------------------------------------------------------

// 제네시스 블록 만들기

// 테스트 해보자

// 만든것들 테스트 해보자

// typeScript로 블록체인을 만들어봤는데 객체 지향적인 방법으로 코드를 작성하고
// OOP(객체 지향 프로그래밍)

// OOP는 프로그램의 셜계방법 개념의 하나이다.

// OOP는 프로그램을 단순히 실행 데이터 처리 방법만이 아니라
// 수많은 객체라는 단위를 만들어서 이 객체를 가지고 동작하는 상호작용을 서술한 방식이다.
// OOP에서 객체는 하나의 역활을 수행하는 함수와 변수들의 묶음 데이터로 보면 된다.

// 이런 객체지향 프로그래밍은 프로그램을 만들때 제일 작은 단위부터 만들어가는 방식을 선호함
// 근데 그러면 작성된 코드들의 테스트가 어렵다는 단점이 있고 그래서 이런 부분 때문에 라이브러리를 사용해서
// 테스트 한다.

// 그냥 개발이 아니라 테스트 코드를 작성하면서 개발해나가는게
// TDD(Test_Driven Development) 기법

// 그래서 우리도 테스트 해보려고 Jest라는 애를 써보자

// 설치 명령어

// ---------------------------------------------------------------------
// npm install -D ts-jest @types/jest babel-core
// npm install -D @babel/preset-typescript @babel/preset-env
// ---------------------------------------------------------------------

// 체인 만들기

// block 클래스로 만들 블록들을 체인으로 연결시켜줄 chain을 클래스를 만들어보자.
// chain 클래스에는 생성한 블록을 배열로 담아서 블록체인을 만들 예정
// 이미 지금 우리가 만든 블록은 블록의 속성으로 체이닝 이미 이뤄지고 있는데
// 이전 블록 해시 값을 속성으로 가지고 있기 때문에 특정 블록기준으로 이전 블록 해시 값이 달라지면
// 현재 블록의 이전 해시값과 불일치가 발생해서 연결 고리가 끈긴다.
// chain클래스를 따로 만들어서 생성된 블록을 하나의 배열안에 담아주는 역활을 할예정

// 이렇게 하는 이유는 이후에 우리가 마이닝 할때 난이도 계산을 하기 위해서.

// POW (Proof of Work : 작업 증명)

// 작업 증명 역사
// 1993년 모니 나노어이 작업증명의 기본 개념을 고안했다.
// 1997년 영국의 암호학자인 애덤백의 해시캐시고 이후에 2009년 이 기술은
// 사토시 나카모토라는 사람이 비트코인에 적용이 되어 오늘날까지 사용된다.

// 해시캐시는 대량으로 스팸메일을 방지하고자 고안된 것.
// 이메일을 보내기 위해서 작업증명 알고리즘을 이용해서 해시값을 찾고
// 그 보상으로 발행 되는 우표 같은.
// 이 과정이 시간과 비용 많이들고 대량 발생되는 스팸메일을 막을수 있는 방법으로 이 방식을
// 사용했다.

// 작업증명 방식을 거래가 발생하면 해당 거래가 유용한지에 대한 합의 검증 방식.

// 논스값을 이제 사용 하고

// 간단히 설명

// 작업증명은 어려운 수학문제 푸는것 이라고 생각하고
// 채굴 하는데
// 작업 증명을 하는것이 채굴이다 라고 할 수 있다.
// 어려운 수학 문제를 풀게해서 이 문제를 푼사람한테 보상으로 코인을 주는것.

// 여기서 특정 조건을 만족하는 논스값을 찾는 것이다.

// 블록체인 상의 모든 참여자는 동일한 순서로 블록을 연결하기 위해서
// 합의 알고리즘이 필요하고
// 대표적인 합의 알고리즘은 POW, POS, DPOS, POA등이 있다.

// 난이도가 4
// 논스 ???
// 0000이상인 해시값이 나올때까지 목표값이 나올때 까지
// 논스를 0에서 계속 하나씩 더하면서 해싱을 해서 목표값을 찾는것
// 0000 -> 000000

// "작업 증명 방식"은 POW는 목표값 이하의 해시 값을 찾는 과정을 무수히 반복해서
// 해당작업에 참여했음을 증명하는 방식의 알고리즘.

// 작업 증명 알고리즘의 필요성은 네트워크 상의 모든 노드가 동시에 블록을 만들 수 없게 하는것.
// 작업증명을 통과해야만 새로운 블록을 추가 생성 할수 있게 된다는 점

// 작업 증명 알고리즘은 Difficulty 조절 알고리즘을 이용해서 약 10분당 1개의 블록이 생성 되는것을 보장하게 된다.

// 난이도 조정 블록 범위 => 10
// 블록의 생성 시간 (단위 : 분) => 10
// 생성 시간 (단위 : 초) => 60

// Difficulty 조절 알고리즘은 다음과 같이 설계 하자

// 블록 한개가 생성되는 예상 시간을 10분으로 설정하고, 10개의 블록을 한 묶음으로 해서 블록 한 묶음이 생성되는
// 예상시간을 6000초라는 값을 할당해주고 이후 10개의 블록이 생성되는데 걸리는 시간 timeExpected / 2 보다 작을 경우
// 난이도 조절을 1 증가시키고 timeExpected * 2 보다 클 경우에는 난이도를 1 감소 시키자
const RANDOM_TABLE = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];

const chooseRandom = (array, diffculty) => {
  //16 17
  return Array(diffculty)
    .fill(false)
    .map(
      () => array[parseInt((Math.random() * RANDOM_TABLE.length).toString())]
    )
    .join("");
};
console.log(chooseRandom(RANDOM_TABLE, 15));
