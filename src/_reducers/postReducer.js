import { initialPosts } from "./initialState";
import axios from "axios";

const delete_post = async (nid, csrf_token) => {
  const options = {
    withCredentials: true,
    headers: { "X-CSRF-Token": csrf_token },
    params: { _format: "json" },
  };

  try {
    let response = await axios.delete(
      `http://admin.flambeaucabin.com/node/${nid}`,
      null,
      options
    );
    console.log(response);
  } catch (error) {
    console.error(error);
    return;
  }

  // let response = await axios.delete(
  //   `http://admin.flambeaucabin.com/node/${nid}?_format=json`,
  //   {
  //     headers: {
  //       "X-CSRF-Token": "Q-dlAeGLxXhQ6L3NEQFpaSIZmgA4Wl1xcook9kwM7tM",
  //     },
  //   }
  // );
};

export default (state = initialPosts, action) => {
  switch (action.type) {
    case "LOAD_POSTS":
      return action.payload;
    case "ADD_POST":
      return state.concat([action.data]);
    case "DELETE_POST":
      delete_post(action.nid, action.csrf_token);
      return state.filter((post) => post.id !== action.id);
    case "EDIT_POST":
      return state.map((post) =>
        post.id === action.id ? { ...post, editing: !post.editing } : post
      );
    case "UPDATE":
      return state.map((post) => {
        if (post.id === action.id) {
          return {
            ...post,
            title: action.data.newTitle,
            message: action.data.newMessage,
            editing: !post.editing,
          };
        } else return post;
      });
    default:
      return state;
  }
};
