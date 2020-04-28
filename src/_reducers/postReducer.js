import { initialPosts } from "./initialState";
import { API_URL, HAL_JSON_ARTICLE } from "../config";
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  EDIT_POST,
} from "../_actions/_postActions";

export default (state = initialPosts, action) => {
  switch (action.type) {
    case "REQUEST_POST_UPDATE":
      return state;

    case REQUEST_POSTS: {
      console.log("action", action);
      return state;
    }

    case RECEIVE_POSTS: {
      console.log("action", action);
      return { ...state, data: action.data, isLoading: false };
    }

    case "LOAD_POSTS":
      console.log(action.payload);
      return action.payload;

    case "ADD_POST": {
      const node = JSON.stringify({
        _links: {
          type: {
            href: `${API_URL}/rest/type/node/article`,
          },
          [`${API_URL}/rest/relation/node/article/field_tags`]: [
            {
              href: `${API_URL}/taxonomy/term/1?_format=hal_json`,
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
          [`${API_URL}/rest/relation/node/article/field_tags`]: [
            {
              _links: {
                self: {
                  href: `${API_URL}/taxonomy/term/1?_format=hal_json`,
                },
                type: {
                  href: `${API_URL}/taxonomy_term/tags`,
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

      add_post(
        action.baseURL,
        action.basic_auth_token,
        action.session_token,
        node
      ).then((response) => {
        console.log(response);
      });
      return state;
    }

    case "PROCESS_POST_RESPONSE":
      console.log("process post response");
      return state;

    case "TAG_ARTICLE": {
      const node = JSON.stringify({});
      tag_article(
        action.baseURL,
        action.basic_auth_token,
        action.session_token,
        node
      );
      return state;
    }

    case "DELETE_POST":
      delete_post(action.nid, action.basic_auth_token, action.session_token);
      return state.filter((post) => post.id !== action.id);

    case EDIT_POST:
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

const tag_article = (baseURL, basic_auth_token, session_token, node) => {
  console.log(node);
};

const delete_post = (nid, token, csrf) => {
  const headers = { Authorization: `Basic ${token}`, "X-CSRF-Token": csrf };
  const requestOptions = {
    method: "DELETE",
    headers: headers,
    body: "",
    redirect: "follow",
  };

  fetch(`${API_URL}/node/${nid}?_format=json`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const add_post = async (baseURL, token, csrf, body) => {
  const headers = {
    "Content-type": "application/hal+json",
    Authorization: `Basic ${token}`,
    "X-CSRF-Token": csrf,
  };
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: body,
    redirect: "follow",
  };

  const response = {
    status: null,
    data: null,
  };

  try {
    let res = await fetch(`${API_URL}/node?_format=hal_json`, requestOptions);
    response.data = await res.text();
    response.status = "OK";
  } catch (error) {
    response.data = JSON.stringify(error);
    response.status = "ERROR";
  }

  return response;
};
