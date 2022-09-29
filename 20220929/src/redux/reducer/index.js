/**
 * reducer 함수
 *
 * reducer 만드는데 필요한 매개변수는
 *
 * state, action
 *
 * state는 초기화가 필요함.
 *
 *  */

const stateInit = {
  count: 0,
};

// state의 초기값을 설정해준다.

const reducer = (state = stateInit, action) => {
  // 이곳에 동작할 action들을 작성해준다.

  console.log(action);

  switch (action.type) {
    case "ADD":
      // ADD
      // 리듀서가 저장소의 값을 변경해주는데 이 반환값을 받아서 바꿔주는 것이기 때문에
      // 저장소는 항상 대기하다가 리듀서가 return 값을 주면 적용을 바로 시켜준다.
      return { ...state, count: state.count + 1 };
      break;
    case "REMOVE":
      return { ...state, count: state.count - 1 };
      break;

    default:
      return state;
      break;
  }
};

export default reducer;
