/*
  src/_reducers/timeCheckReducer.js
*/
export default (state = {}, action) => {
  switch (action.type) {
    case "TIME_CHECK":
      return {
        result: action.payload
      };
    default:
      return state;
  }
};
