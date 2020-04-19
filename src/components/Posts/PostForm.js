import React, { Component } from "react";
import { connect } from "react-redux";
import { addArticle } from "../../_actions/postActions";

class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.getTitle.value;
    const body = this.getBody.value;
    const { session, basic_auth_token } = this.props.state.user;
    const article = {
      title,
      body,
      editing: false,
    };

    this.props.dispatch(
      addArticle(
        article,
        "https://admin.flambeaucabin.com/",
        basic_auth_token,
        session
      )
    );

    this.getTitle.value = "";
    this.getBody.value = "";
  };
  render() {
    return (
      <div className="post-container">
        <h1 className="post_heading">Create Post</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            required
            type="text"
            ref={(input) => (this.getTitle = input)}
            placeholder="Enter Post Title"
          />
          <br />
          <br />
          <textarea
            required
            rows="5"
            ref={(input) => (this.getBody = input)}
            cols="28"
            placeholder="Enter Post"
          />
          <br />
          <br />
          <button>Post</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(PostForm);
