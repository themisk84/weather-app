const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_FORECAST":
      return {
        ...state,
        forecast: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
