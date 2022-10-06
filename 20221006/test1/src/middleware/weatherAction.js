import axios from "axios";
// axios
// axios 는 브라우저
// js 에 fetch 가 있는데 프레임워크에선 ajax 를 구현할때
// axios 를 쓰는 편이다. 속성은 = url 은 필수고 나머지는 전달을 안해도 상관없다(옵션).
// medhod 는 지정안하면 기본 디폴트가 Get 방식

// axios 설치 명령어
// npm i axios

// Get 요청 방식
//

function getWeather(name) {
  // 도시 이름 받을거니까 name
  // thunk 가 해주는 일이 Action Createors 라는 함수를 만들어주는것
  // Action Createors 함수는 함수를 반환한다.
  // thunk 는 dispatch 를 딜레이 시켜주는 역할

  // action 함수는 함수를 반환한다.
  // dispatch 랑 getState 둘다 함수다
  return async (dispatch, getState) => {
    const data = await axios({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=7c74270699418a416dbdb8a4e42ade4f`, // name 받아야 하니까 ` 백틱 사용
    });
    console.log(data);
    // getState 이게 뭐냐
    console.log(getState);
    dispatch({ type: "GET_WEATHER_DATA", payload: data });
    console.log(getState());
  };
}
// function getWeather1() {}
// function getWeather2() {}
// function getWeather3() {}
// 밑에 괄호 안에 , 로 구분해서 여러개 넣어줄 수 있다.
export const weather = { getWeather };
