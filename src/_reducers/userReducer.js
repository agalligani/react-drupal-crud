/*
src/_reducers/userReducer.js
*/
import { initialUser } from "./initialState";

export default (state = initialUser, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      if (action.payload.status === 200) {
        let data = JSON.parse(action.payload.data);
        return {
          ...state,
          user: data.current_user,
          csrf_token: data.csrf_token,
          logout_token: data.logout_token,
          message: "Welcome " + data.current_user.name,
          login_status: action.payload.status,
          basic_auth_token: action.payload.basic_auth_token,
        };
      } else {
        return { ...state, message: "You Are not Logged In" };
      }
    case "USER_LOGOUT":
      console.log("whaaat?");
      return initialUser;
    default:
      return state;
  }
};
