import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import EditComponent from "./EditComponent";
import { API_URL } from "../../config";
import axios from "axios";
import * as actionCreator from "../../_actions/postActions";

class AllPost extends Component {
  componentDidMount = async () => {
    let csrf_token = this.props.user ? this.props.user.csrf_token : null;
    let basic_auth_token = this.props.user
      ? this.props.user.basic_auth_token
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
    this.props.dispatch(actionCreator.setArticles(data));
  };

  render() {
    return (
      <div>
        <h1 className="post_heading">All Posts</h1>
        {console.log("hey", this.props)}
        {this.props.posts.map((post) => (
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
    user: state.user,
    posts: state.posts,
  };
};
export default connect(mapStateToProps)(AllPost);
