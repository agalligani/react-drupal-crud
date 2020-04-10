import { initialPosts } from "./initialState";

const delete_post = (nid, token, csrf) => {
  console.log(nid, token);
  const headers = { Authorization: `Basic ${token}`, "X-CSRF-Token": csrf };
  const requestOptions = {
    method: "DELETE",
    headers: headers,
    body: "",
    redirect: "follow",
  };

  fetch(
    `http://admin.flambeaucabin.com/node/${nid}?_format=json`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

// let response = await axios.delete(
//   `http://admin.flambeaucabin.com/node/${nid}?_format=json`,
//   {
//     headers: {
//       "X-CSRF-Token": "Q-dlAeGLxXhQ6L3NEQFpaSIZmgA4Wl1xcook9kwM7tM",
//     },
//   }
// );
// };

export default (state = initialPosts, action) => {
  switch (action.type) {
    case "LOAD_POSTS":
      return action.payload;
    case "ADD_POST":
      return state.concat([action.data]);
    case "DELETE_POST":
      delete_post(action.nid, action.basic_auth_token, action.session_token);
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
