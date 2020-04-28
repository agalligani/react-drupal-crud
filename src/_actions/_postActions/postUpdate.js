import { API_URL, HAL_JSON_ARTICLE } from "../../config";
export const EDIT_POST = "EDIT_POST";

/**************** UPDATE POST ACTIONS */

export const editPost = (payload) => {
  return { type: EDIT_POST, payload: payload };
};

export const editArticle = (baseURL, nid, basic_auth_token, csrf_token) => {
  return {
    type: EDIT_POST,
    baseURL: baseURL,
    nid: nid,
    basic_auth_token: basic_auth_token,
    csrf_token: csrf_token,
  };
};

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
