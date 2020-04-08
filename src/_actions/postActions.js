export const setArticles = (data) => {
  return {
    type: "LOAD_POSTS",
    payload: data,
  };
};
