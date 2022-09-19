import React from "react";

const Block = (props) => {
  let { data, test, name } = props;
  let temp = "";
  if (name == "유저") {
    temp = test;
  } else {
    // test == "무승부" ? 유저가 무승부면 뒤에
    // true : false 이렇게 들어가는데 true 가  "무승부" 이고 false 가
    // test == "이겼다" ? "졌다" : "이겼다" 이 삼항 연산자
    temp = test == "무승부" ? "무승부" : test == "이겼다" ? "졌다" : "이겼다";
  }
  return (
    <div className="block">
      {/* 선택한 이미지를 props 값으로 받아온다.
            부모 컴포넌트에서 */}
      {/* 리액트에서 제일 많이 씀 && 값이 있으면 그리라고 하는 구문  */}
      {/* 값이 업으면 오류를 뱉어내기 때문에  */}
      <div>{name}</div>
      <img src={data && data.img} />
      <div>{temp}</div>
    </div>
  );
};

export default Block;
