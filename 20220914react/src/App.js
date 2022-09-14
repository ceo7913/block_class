// css 파일 가져오는 방법
import "./App.css";
// import를 사용해 파일 가져옴
import Calendar from "./components/Calendar";

function App() {
  return (
    <div>
      {/* 여기서 className 을 직접 주면 안먹음 */}
      <Calendar name="9월" age="2022" english="September" />
      <Calendar name="10월" age="2022" english="October" />
      <Calendar name="11월" age="2022" english="November" />
      <Calendar name="12월" age="2022" english="December" />
    </div>
    // 태그 명은 상관없이 무조건 태그 하나로 감싸줘야 한다.
  );
}

export default App;
