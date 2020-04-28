import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import EditComponent from "./EditComponent";
import { API_URL } from "../../config";
import axios from "axios";
import { fetchPosts } from "../../_actions/postActions";

class AllPost extends Component {
  componentDidMount = () => {
    this.props.getPosts();
  };

  render() {
    return (
      <div>
        <h1 className="post_heading">All Posts</h1>
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

const mapDispatchToProps = { getPosts: fetchPosts };

const mapStateToProps = (state) => {
  return {
    user: state.user,
    posts: state.posts.data,
    isLoading: state.posts.isLoading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllPost);
