import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { setArticles } from "../../_actions/postActions";
import EditComponent from "./EditComponent";
import { API_URL } from "../../config";
import axios from "axios";

class AllPost extends Component {
  componentDidMount = async () => {
    let csrf_token = this.props.state ? this.props.state.user.csrf_token : null;
    let basic_auth_token = this.props.state
      ? this.props.state.user.basic_auth_token
      : null;
    const articles_url = `${API_URL}/articles/history?_format=hal_json`;
    let response = await axios.get(articles_url);
    const data = response.data.map((p) => {
      return {
        ...p,
        csrf_token: csrf_token,
        basic_auth_token: basic_auth_token,
      };
    });
    this.props.dispatch(setArticles(data));
  };

  render() {
    return (
      <div>
        <h1 className="post_heading">All Posts</h1>
        {this.props.state.posts.map((post) => (
          <div key={post.nid}>
            {post.editing ? (
              <EditComponent post={post} key={post.id} />
            ) : (
              <Post post={post} key={post.id} />
            )}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
export default connect(mapStateToProps)(AllPost);
