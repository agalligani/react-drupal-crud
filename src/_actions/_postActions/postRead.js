import { API_URL } from "../../config";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

//************************* READ ACTIONS **************/
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
