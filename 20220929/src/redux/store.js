import { createStore } from "redux";
import reducer from "./reducer";
/**
 * createStore는 저장소를 만들어주는 함수
 *
 * createStore의 매개변수는 reducer 를 전달해준다.
 *
 * 순서
 * 저장소를 리듀서에 추가해서 저장소를 만들고 저장소를 provider로 적용하고
 * App컴포넌트에 적용시키는 구조
 *
 */

const store = createStore(reducer);

export default store;
