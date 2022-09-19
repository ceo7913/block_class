import { useState } from "react";

// 리액트가 왜 리액트인지 (반응한다.)
// 자기 값이 변하면 반응해서 알려주고 리액트는
// 반응한 값을 그려줌 (리렌더링)

const Block = ({ num }) => {
  let count = 0;
  // useState 로 사용하는것은 재할당하면 안되기 때문에 const로 선언
  // useState 함수를 사용해서 받는 값
  // 배열의 첫번째는 실사용 값 우리가 사용할 값이고 주시하는값
  // 배열의 두번째는 이 값을 수정할 수 있는 함수 / 주시하는 값을 바꾸려면
  // 여기서는 setnum 함수를 사용해서만 state 값을 바꿀 수 있다.
  // useState 함수의 매개변수가 초기 세팅값
  // setnum 함수를 사용해서 값을 수정할땐 setnum 함수의 매개변수로 전달
  // 함수 사용
  // 일반변수는 다시 그려주면 초기값으로 변한다.
  // 이유는 리렌더링 하기 때문인데 하지만 useState 값은
  // 리액트가 보고 관리하고 있기 때문에 그려주기 전의 값을 보관하기 때문에
  // 값이 남아있다.

  // react 에서 제공해주는 useState 같은 유용한 함수들이 많은데
  // 이걸 용어로 리액트 훅이라고 부른다 (react hook)
  const [num1, setnum] = useState(count);
  function add() {
    console.log("클릭");
    count++;
    setnum(num1 + 1);
    // 실수가 잦다 비동기적으로 돌아가기 때문에
    // 콘솔이 값이 변하기 전에 동작해서 바뀌기 전값이 보이는 현상
    console.log(num1);
  }
  return (
    <>
      {/* 
          변수를 바꾼다고 태그에 변수값 넣은게 바뀌지 않는다.
          document.querySelector("태그명").innerHTML = '값'
          useState(상태변수) 리액트에게 값을 주시하게 만들고 변하면
          내가 변했으니까 반응 알려줌 (다시 그려달라)
          변수를 전부 보고 다 그린다고 하면 처음에 dom 그리는 비용이 생각보다
          비싼데 이걸 많이 그려주다보면 컴퓨터가 미쳐서 줄여주는것
          결론은 효율적으로 관리해주기 위해서 사용한다.
      */}
      {/* onclick 이거 였지만 리액트 어트리뷰트는 onClick */}
      <div className="block">{num1}</div>
      <button onClick={add}>더하기</button>
    </>
  );
};

export default Block;
