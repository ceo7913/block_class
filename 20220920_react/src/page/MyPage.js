import React from "react";
import { Header, Body } from "../com";

const MyPage = () => {
  return (
    <div>
      <Header title="로그인 페이지" />
      <Body path="/mypage" name="마이 페이지" />
    </div>
  );
};

export default MyPage;
