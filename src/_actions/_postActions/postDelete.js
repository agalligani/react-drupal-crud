import { API_URL } from "../../config";
export const DELETE_POST = "DELETE_POST";

/********************* DELETE POST ACTIONS  */

export const deleteArticle = (baseURL, nid, basic_auth_token, csrf_token) => {
  return {
    type: DELETE_POST,
    baseURL: baseURL,
    nid: nid,
    basic_auth_token: basic_auth_token,
    csrf_token: csrf_token,
  };
};
