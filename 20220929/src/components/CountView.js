import React, { useState } from "react";
import { useSelector } from "react-redux";

const CountView = ({ count }) => {
  const count2 = useSelector((state) => state.count);
  return (
    <div className=" bg-slate-500 rounded-2xl p-3">
      <h1>CountView 컴포넌트</h1>
      {count2}
    </div>
  );
};

export default CountView;
