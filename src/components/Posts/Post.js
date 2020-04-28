import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteArticle } from "../../_actions/_postActions";

class Post extends Component {
  render() {
    const {
      title,
      field_image,
      body,
      nid,
      csrf_token,
      basic_auth_token,
    } = this.props.post;
    return (
      <div className="post">
        {field_image}
        <h2 className="post_title">{title}</h2>
        <p className="post_message">{body}</p>
        <div className="control-buttons">
          <button
            className="edit"
            onClick={() => {
              console.log("here ", this.props);
              return this.props.dispatch({
                type: "EDIT_POST",
                nid: nid,
                csrf_token: csrf_token,
              });
            }}
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
