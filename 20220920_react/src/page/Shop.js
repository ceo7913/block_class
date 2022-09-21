import React from "react";
import { Header, Body } from "../com";
const Shop = (islogin) => {
  return (
    <div>
      <Header title="상점 페이지" />
      <Body
        islogin={islogin}
        path="/detail/1/10/shirts"
        name="1번 상품으로 이동"
      />
      <Body
        islogin={islogin}
        path="/detail/2/20/바지"
        name="2번 상품으로 이동"
      />
      <Body
        islogin={islogin}
        path="/detail/3/5/장갑"
        name="3번 상품으로 이동"
      />
      <Body
        islogin={islogin}
        path="/detail/4/50/모자"
        name="4번 상품으로 이동"
      />
      <Body
        islogin={islogin}
        path="/detail/5/20/몰라"
        name="5번 상품으로 이동"
      />
      <Body
        islogin={islogin}
        path="/detail/6/60/티셔츠"
        name="6번 상품으로 이동"
      />
    </div>
  );
};

export default Shop;
