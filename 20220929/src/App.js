import { useState } from "react";
import "./App.css";
import { Count, CountView, Report } from "./components";
import "./input.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App flex bg-black justify-center align-middle items-stretch  w-screen h-screen text text-white">
      <div className="grid grid-cols-2 gap-8">
        <Count count={count} setCount={setCount}></Count>
        <CountView count={count}></CountView>
        <Report></Report>
      </div>
    </div>
  );
}

export default App;
