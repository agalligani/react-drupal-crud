export const setArticles = (data) => {
  return {
    type: "LOAD_POSTS",
    payload: data,
  };
};

export const addArticle = (
  article,
  baseURL,
  basic_auth_token,
  session_token
) => {
  console.log(baseURL);
  return {
    type: "ADD_POST",
    article: article,
    baseURL: baseURL,
    basic_auth_token: basic_auth_token,
    session_token: session_token,
  };
};

export const deleteArticle = (baseURL, nid, basic_auth_token, csrf_token) => {
  return {
    type: "DELETE_POST",
    baseURL: baseURL,
    nid: nid,
    basic_auth_token: basic_auth_token,
    csrf_token: csrf_token,
  };
};
