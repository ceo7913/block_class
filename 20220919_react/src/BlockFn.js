import React, { useEffect, useState } from "react";

const BlockFn = () => {
  const [num, setNum] = useState(0);
  const [num2, setNum2] = useState(0);
  // useEffect 가 생명주기 함수를 사용할 수 있게 함수형에서도
  // 리액트에서 지원해주는 유용한 함수 (react hook) 리액트 훅

  // 빈배열은 componentDidMount 라는 것
  useEffect(() => {
    // 여기에서 데이터를 불러와서 UI 에 뿌려준다.
    console.log("componentDidMount");
  }, []);

  // componentDidUpdate 는 어떻게 만드나
  // num이 값을 주시하고 있다. 주시하는 값이 바뀌면 실행되는 함수
  // 배열안에 추가한 값을 주시하다가 바뀌면 실행된다.
  // 모자란애 이게 componentDidMount + componentDidUpdate
  // 그래서 조건으로 처리를 해줘야 한다..
  useEffect(() => {
    console.log(num);
    console.log("componentDidUpdate");
  }, [num, num2]);

  const add = () => {
    setNum(num + 1);
    // console.log(num);
  };
  return (
    <div>
      <button onClick={add}>증가</button>
    </div>
  );
};

export default BlockFn;
