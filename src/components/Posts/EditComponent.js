import React, { Component } from "react";
import { postArticleUpdate } from "../../_actions/_postActions";
import { connect } from "react-redux";

class EditComponent extends Component {
  handleEdit = (e) => {
    e.preventDefault();
    const title = this.getTitle.value;
    const body = this.getMessage.value;
    const data = {
      title,
      body,
    };
    this.props.updatePost({
      nid: this.props.post.nid,
      data: data,
      isLoading: true,
      headers: this.props.user.requestHeader,
    });
    // this.props.dispatch({ type: "UPDATE", id: this.props.post.id, data: data });
  };

  postUpdate = (e) => {
    let payload = { nid: 1234 };
    this.props.dispatch(this.props.updatePost(payload));
  };

  render() {
    return (
      <div key={this.props.post.id} className="post">
        <form className="form" onSubmit={this.handleEdit}>
          <input
            required
            type="text"
            ref={(input) => (this.getTitle = input)}
            defaultValue={this.props.post.title}
            placeholder="Enter Post Title"
          />
          <br />
          <br />
          <textarea
            required
            rows="5"
            ref={(input) => (this.getMessage = input)}
            defaultValue={this.props.post.message}
            cols="28"
            placeholder="Enter Post"
          />
          <br />
          <br />
          <button>Update</button>
        </form>
        <button onClick={this.props.updatePost}>Update</button>
      </div>
    );
  }
}

const mapDispatchToProps = { updatePost: postArticleUpdate };
const mapStateToProps = (state) => ({ posts: state.posts, user: state.user });

EditComponent = connect(mapStateToProps, mapDispatchToProps)(EditComponent);

export default EditComponent;
