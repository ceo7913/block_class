const initState = {
  count: 0,
  posts: [],
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "INCREASE":
      return { ...state, count: state.count++ };
    case "DECREASE":
      return { ...state, count: state.count-- };

    default:
      return { ...state };
  }
};

export default reducer;
