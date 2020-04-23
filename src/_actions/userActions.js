/*
src/_actions/userActions.js
*/

const REGISTER_USER = "REGISTER_USER";
const USER_LOGIN = "USER_LOGIN";
const USER_ERROR = "USER_ERROR";
const USER_LOGOUT = "USER_LOGOUT";
const USER_DELETE = "USER_DELETE";

const registerUser = (data) => (dispatch) => {
  dispatch({
    type: REGISTER_USER,
    payload: data,
  });
};

const userLogin = () => (dispatch) => {
  dispatch({
    type: USER_LOGIN,
    payload: { name: null, password: null },
  });
};

const userError = () => (dispatch) => {
  dispatch({
    type: USER_ERROR,
    payload: { error: "error" },
  });
};

const userLogout = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
    payload: "1234",
  });
};

const userDelete = () => (dispatch) => {
  dispatch({
    type: USER_DELETE,
    payload: "1234",
  });
};

export { registerUser, userLogin, userError, userLogout, userDelete };
