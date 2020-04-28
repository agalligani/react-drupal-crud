import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteArticle } from "../../_actions/postActions";

class Post extends Component {
  render() {
    const {
      title,
      message,
      nid,
      csrf_token,
      basic_auth_token,
    } = this.props.post;
    return (
      <div className="post">
        <h2 className="post_title">{title}</h2>
        <p className="post_message">{message}</p>
        <div className="control-buttons">
          <button
            className="edit"
            onClick={() =>
              this.props.dispatch({
                type: "EDIT_POST",
                nid: nid,
                csrf_token: csrf_token,
              })
            }
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={() =>
              this.props.dispatch(
                deleteArticle(
                  "http://admin.flambeaucabin.com/",
                  nid,
                  basic_auth_token,
                  csrf_token
                )
              )
            }
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
export default connect()(Post);
