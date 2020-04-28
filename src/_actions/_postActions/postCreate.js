import { API_URL, HAL_JSON_ARTICLE } from "../../config";
export const ADD_POST = "ADD_POST";
export const PROCESS_POST_RESPONSE = "PROCESS_POST_RESPONSE";

/********************* CREATE POSTS ACTIONS ******************/

export const addArticle = (
  article,
  baseURL,
  basic_auth_token,
  session_token
) => {
  return (dispatch) => {
    dispatch(
      addArticleAsync(article, baseURL, basic_auth_token, session_token)
    );
  };
};

export const addArticleAsync = (
  article,
  baseURL,
  basic_auth_token,
  session_token
) => {
  return {
    type: ADD_POST,
    article: article,
    baseURL: baseURL,
    basic_auth_token: basic_auth_token,
    session_token: session_token,
  };
};

export const processArticleResponse = (status, response) => {
  return {
    type: PROCESS_POST_RESPONSE,
    status: status,
    response: response,
  };
};
