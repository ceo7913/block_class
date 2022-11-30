// 사과 판매 앱 만들기
// 스마트 컨트랙트 함수의 payble 속성 
// 솔리디티 언어는 코인이나 토큰을 즉 가상화페를 다루는 언어이고
// 다른 언어들은 프로그램을 개발하는데 사용하지만 솔리디티는 
// 가상화폐라는 돈을 가지고 사용하기 위한 언어 

// 솔리디티로 이더를 전송하는 스마트 컨트랙트를 작성하기 위해서는 
// payble 을 작성한 함수에서만 이더를 보낼 수 있다.

// 먼저 트러플 init
// npx truffle init

// truffle-config.js 설정

// contracts 에 AppleShop.sol 파일 만들고
// 리액트 설치

// npx create-react-app "이름"

// 설치하면서 migrations 폴더에 2_deploy_AppleShop.js 만들고 작성

// 리액트 설치가 끝나면 필요없는거 제거

// src 에 hooks 폴더 만들고 useWeb3.js 만들기
// web3 라이브러리 설치
// 경로 리액트 파일로 이동 후 
// npm i web3

// useWeb3.js 작성

// 트러플 컴파일
// 경로 확인하고(리액트 밖으로 )
// npx truffle complie

// 가나쉬 켜서 마이그레이션도 
// npx ganache-cli
// npx truffle migration

// 다 됐으면 
// src 에 contracts 폴더 만들고 컴파일된 AppleShop.json 복사 붙여넣기
// src 에 components 폴더 만들고 AppleShop.js 만들기

// AppleShop.js 컴포넌트 다 작성하고 
// App.js 로 이동

// 리액트 실행해서 사용해 보자

// 과제
// 리액트로 과일 가게 만들기
// 사과, 바나나, 수박, 3~5가지 중 본인이 정해서 
// 구매는 토큰이나 이더로
// 갯수 정해서 팔고 살 수 있는 앱

// 좀비 크립토 쭉 풀기