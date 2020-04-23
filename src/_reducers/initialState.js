export const initialUser = {
  user: {
    uid: null,
    roles: [],
    name: null,
  },
  csrf_token: null,
  logout_token: null,
  login_status: null,
  isAuthenticated: false,
};

export const initialAlerts = {
  alert: { id: null, text: "alert", style: "style" },
};

export const initialPosts = {
  posts: [],
  status: null,
  isLoading: false,
  response: null,
};

export const initialMedia = {
  images: [],
  videos: [],
};
