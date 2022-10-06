import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

// applyMiddleware = 미들웨어를 적용시켜주는 함수
// applyMiddleware() = 매개변수로 적용시킬 미들웨어 매개변수로 전달

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
