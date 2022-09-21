import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Body = ({ path, name, item, islogin }) => {
  // Link 리액트에서 a같은 역활을 해줘요
  // Link 컴포넌트를 이용해서 경로를 바꿔주고 컴포넌트를 교체해서 보여준다.
  // 라우터간의 이동을 할수 있게 도와준다.
  // Link에 필요한 props는 to 어디로
  // to이름의 props에 이동할 경로를 넣어준다.

  // useNavigate 똑같이 페이지 이동을 도와주는 아이
  // useNavigate의 사용방법은 함수 실행 이후 반환받은 객체로 사용을 한다.
  const nav = useNavigate();
  return (
    <div className="body">
      <Link to={path}>{name}으로 이동</Link>
      <button
        onClick={() => {
          nav(path);
        }}>
        이건 {name}으로 이동 버튼
      </button>
      {item && item.id ? <div>{item.id}번 상품</div> : null}
      {item && item.id ? <div>{item.num}개</div> : null}
      {item && item.id ? <div>이름 : {item.name}</div> : null}
      {islogin ? <div>로그인 되었음</div> : <div>로그인 안됨</div>}
    </div>
  );
};

export default Body;
