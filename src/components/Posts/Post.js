import React, { Component } from "react";
import { connect } from "react-redux";
// import Alert from "../Alert/Alert";
// import AlertOverlay from "../Alert/AlertOverlay";

class Post extends Component {
  render() {
    return (
      <div className="post">
        <h2 className="post_title">{this.props.post.title}</h2>
        <p className="post_message">{this.props.post.message}</p>
        <div className="control-buttons">
          <button
            className="edit"
            onClick={() =>
              this.props.dispatch({
                type: "EDIT_POST",
                nid: this.props.post.nid,
                csrf_token: this.props.post.csrf_token,
              })
            }
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={() =>
              this.props.dispatch({
                type: "DELETE_POST",
                nid: this.props.post.nid,
                csrf_token: this.props.post.csrf_token,
              })
            }
          >
            Delete
          </button>
        </div>
        {/* <AlertOverlay>
          <Alert></Alert>
        </AlertOverlay> */}
      </div>
    );
  }
}
export default connect()(Post);
