const initState = {
  count: 0,
  posts: [],
};

function reducer(state=initState,action){
    const {type,payload}=action;
    switch (type) {
        case "A":
            
            return;
    
        default:
            return state;
    }
}

// 위 아래 같은 방법
// const reducer = (state = initState, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case "INCREASE":
//       return { ...state, count: state.count++ };
//     case "DECREASE":
//       return { ...state, count: state.count-- };

//     default:
//       return { ...state };
//   }
// };

export default reducer;
