import { initialMedia } from "./initialState";

/*
 src/_reducers/simpleReducer.js
*/
export default (state = initialMedia, action) => {
  switch (action.type) {
    case "STAGE_IMAGE":
      console.log(action.payload);
      return {
        result: action.payload,
      };
    default:
      return state;
  }
};
