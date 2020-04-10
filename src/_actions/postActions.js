export const setArticles = (data) => {
  console.log(data);
  return {
    type: "LOAD_POSTS",
    payload: data,
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
