import { useDispatch } from "react-redux";
import "./App.css";
import axios from "axios";

// Get 요청 방식
// axios({url:''}) = 객체를 전달하고 url 필수

// Post 요청 방식
axios({
  // method 기본이 GET
  method: "post",
  url: "",
  data: {
    // 넘겨줄 값을 넣어주면 된다.
  },
});

function App() {
  const dispatch = useDispatch();
  // async function getWeather() {
  //   const data = await axios({
  //     url: "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=7c74270699418a416dbdb8a4e42ade4f",
  //   });
  //   console.log(data); // await = 데이터가 올때 까지
  // }
  // getWeather();
  return <div className="App"></div>;
}

export default App;
