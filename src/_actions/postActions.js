import { API_URL, HAL_JSON_ARTICLE } from "../config";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

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
    type: "ADD_POST",
    article: article,
    baseURL: baseURL,
    basic_auth_token: basic_auth_token,
    session_token: session_token,
  };
};

export const processArticleResponse = (status, response) => {
  return {
    type: "PROCESS_POST_RESPONSE",
    status: status,
    response: response,
  };
};

//****************** READ POSTS ACTIONS *******************/
//Deprecated
export const setArticles = (data) => {
  return {
    type: "LOAD_POSTS",
    payload: data,
  };
};

//************************* NEW READ ACTIONS **************/
export const requestPosts = () => ({
  type: REQUEST_POSTS,
});

export const receivedPosts = (data) => ({
  type: RECEIVE_POSTS,
  data: data,
});

export function fetchPosts(channel) {
  return function (dispatch) {
    dispatch(requestPosts());
    return fetch(`${API_URL}/articles/history?_format=hal_json`)
      .then(
        (response) => response.json(),
        (error) => console.log("An error occurred.", error)
      )
      .then((post_array) => {
        console.log("===>", post_array);
        dispatch(receivedPosts(post_array));
      });
  };
}

/**************** UPDATE POST ACTIONS */

export const requestArticleUpdate = () => {
  return {
    type: "REQUEST_POST_UPDATE",
  };
};

export const processArticleUpdateResponse = (json) => {
  return {
    type: "REQUEST_POST_UPDATE",
  };
};

export const postArticleUpdate = (payload) => {
  return function (dispatch) {
    dispatch(requestArticleUpdate());
    console.log("PAYLOAD:", payload);
    let patch_URL = `${API_URL}/node/${payload.nid}?_format=hal_json`;
    let body = HAL_JSON_ARTICLE;
    body.title[0].value = payload.data.title;
    body.body[0].value = payload.data.body;
    body._links.self = { href: patch_URL };
    body._links.type.href = `${API_URL}/rest/type/node/article`;
    const requestOptions = {
      method: "PATCH",
      headers: payload.headers,
      body: JSON.stringify(body),
      redirect: "follow",
    };

    return fetch(patch_URL, requestOptions)
      .then(
        (response) => response.json(),
        (error) => console.log("An error occurred", error)
      )
      .then((json) => {
        dispatch(processArticleUpdateResponse(json));
      });
  };
};

/********************* DELETE POST ACTIONS  */

export const deleteArticle = (baseURL, nid, basic_auth_token, csrf_token) => {
  return {
    type: "DELETE_POST",
    baseURL: baseURL,
    nid: nid,
    basic_auth_token: basic_auth_token,
    csrf_token: csrf_token,
  };
};

export const editArticle = (baseURL, nid, basic_auth_token, csrf_token) => {
  return {
    type: "EDIT_POST",
    baseURL: baseURL,
    nid: nid,
    basic_auth_token: basic_auth_token,
    csrf_token: csrf_token,
  };
};
