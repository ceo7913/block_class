// 내보내기 exports
module.exports = {
  extends: ["airbnb-base", "plugin:node/recommended", "prettier"],
};
// 설정 해보자
// 미리 좋은 세팅들이 있으니까 쓰자

// 유명한 air bnb 설정 쓸거임
// https://github.com/airbnb/javascript

// air bnb 패키지 설치 명령어
// ----------------------------------------------------------
// npm install --save-dev eslint-config-airbnb-base
// npm install --save-dev eslint-plugin-import
// npm 패키지 두개를 다운받아야 하면
// npm install --save-dev eslint -config-airbnb-base eslint-plugin-import
// --save-dev는 개발환경
// --save-dev로 받은 패키지는 devDependencies 에 작성된다.
// 개발에만 필요하고 실제 구동은 필요 없는 것들

// eslint prettier package 다운 명령어
//------------------------------------------------------
// npm install --save-dev eslint-config-prettier
// -----------------------------------------------------

// prettier와 충돌이 나기 때문에 빨간게 많이 뜨는데
// extends: ["airbnb-base", "prettier"] prettier의 규칙도 같이 적용해주면 된다.
// ESlint 규칙을 쓰기만 하면
// 나중에 면접가서도 eslint 사용할줄 알고 airbnb 규칙성을 다룰줄 안다.
// 근데 이게 쫌.. 지금까지 우리의 작업한거보다 좀 많이 깐깐하다.

// node 에 대한 설정 node 전용 플러그인
// node 전용 플러그인 설치 명령어
// ---------------------------------------------------
// npm install --save-dev eslint-plugin-node
// ---------------------------------------------------
