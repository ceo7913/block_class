import "./App.css";
// components 에서 block.js 를 app js 로 가져오는 방법
import Block from "./components/Block";
// 이미지 파일 경로만 가져오면 된다.
import { img1 } from "./img";
function App() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <div className="App">
      {/* 중괄호는 js 구문을 사용하겠다는 뜻 */}
      {/* 배열의 갯수만큼 반복하면서 컴포넌트 생성 및 props 전달 */}
      {/* {arr.map((el) => (<Block num={el} />))} */}
      {/* <img src={img1}></img> */}
      <Block num={0} />
    </div>
  );
}

export default App;

// 과제 지뢰찾기 만들기 5x5 로 만들고
// 폭탄 5개정도 랜덤한 위치에 뿌리고
// 처음에 안보이다가 블럭 누르면 안의 내용 보이게
// 폭탄 들어있으면 게임오버
