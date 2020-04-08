import axios from "axios";
import { dispatch } from "redux";

const articles_url =
  "http://admin.flambeaucabin.com/articles/history?_format=json";

export const fetchArticles = (dispatch) => {
  console.log("fetching");
  return (dispatch) => {
    return axios.get(articles_url).then(({ payload }) => {
      dispatch(setArticles(payload));
    });
  };
};

export const setArticles = (data) => {
  return {
    type: "LOAD_POSTS",
    payload: data,
  };
};
