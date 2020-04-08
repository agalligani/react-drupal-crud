import { initialPosts } from "./initialState";

export default (state = initialPosts, action) => {
  switch (action.type) {
    case "LOAD_POSTS":
      return action.payload;
    case "ADD_POST":
      return state.concat([action.data]);
    case "DELETE_POST":
      console.log(action);
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
