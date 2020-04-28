export const API_URL = "https://admin.flambeaucabin.com";

export const HAL_JSON_ARTICLE = {
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
      value: null,
    },
  ],
  body: [
    {
      value: null,
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
};
