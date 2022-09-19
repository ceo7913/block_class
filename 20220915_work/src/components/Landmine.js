import React from "react";

const Landmine = (num) => {
  const { bomb, emty, box } = num;
  const girds = [];
  const ROWSIZE = 49;
  const selectBomb = parseInt((ROWSIZE * Math.random()).toString());
  console.log(selectBomb);
  //   girds.push(selectBomb);
  for (let idx = 0; idx < ROWSIZE; idx++) girds.push(idx); //[1,..100]
  if (girds.values % 7 === 0) {
    girds.values.push = "💣";
  }
  return (
    <div className="main_page">
      <div className="main_box">
        <div className="head_top">Bomb Game</div>
        <div className="head_mid">
          <div className="mid-left">💣 6/6 </div>
          <div className="mid-mid">😄</div>
          <div className="mid-bot">
            <span>00.00</span> 🕙
          </div>
        </div>
        <div className="head_bot">
          {girds.map((value) => (
            <button className="game_btn">{value}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landmine;
