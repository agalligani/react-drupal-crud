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

const add_post = (baseURL, token, csrf, body) => {
  const headers = {
    "Content-type": "application/hal+json",
    Authorization: `Basic ${token}`,
    "X-CSRF-Token": csrf,
  };
  console.log(headers);
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: body,
    redirect: "follow",
  };
  fetch("https://admin.flambeaucabin.com/node?_format=hal_json", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export default (state = initialPosts, action) => {
  switch (action.type) {
    case "LOAD_POSTS":
      return action.payload;

    case "ADD_POST":
      const node = JSON.stringify({
        _links: {
          type: {
            href: "https://admin.flambeaucabin.com/rest/type/node/article",
          },
          "https://admin.flambeaucabin.com/rest/relation/node/article/field_tags": [
            {
              href:
                "https://admin.flambeaucabin.com/taxonomy/term/1?_format=hal_json",
              lang: "en",
            },
          ],
        },
        type: [
          {
            target_id: "article",
            target_type: "node_type",
          },
        ],
        title: [
          {
            value: action.article.title,
          },
        ],
        body: [
          {
            value: action.article.body,
            format: "plain_text",
          },
        ],
        _embedded: {
          "https://admin.flambeaucabin.com/rest/relation/node/article/field_tags": [
            {
              _links: {
                self: {
                  href:
                    "https://admin.flambeaucabin.com/taxonomy/term/1?_format=hal_json",
                },
                type: {
                  href: "https://admin.flambeaucabin.com/taxonomy_term/tags",
                },
              },
              uuid: [
                {
                  value: "cc818831-e700-46e0-9b47-7a04507b817e",
                },
              ],
              lang: "en",
            },
          ],
        },
      });

      console.log(action);
      add_post(
        action.baseURL,
        action.basic_auth_token,
        action.session_token,
        node
      );
      return state;
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
            body: action.data.newBody,
            editing: !post.editing,
          };
        } else return post;
      });
    default:
      return state;
  }
};
