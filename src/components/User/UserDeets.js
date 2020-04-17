import React, { Component } from "react";
import { connect } from "react-redux";

class UserDeets extends Component {
  _submitHandler = (e) => {
    e.preventDefault();
    this.props.dispatch({ type: "USER_LOGOUT" });
  };

  render() {
    return (
      <div className="post-container">
        <h2>Welcome Back, {JSON.stringify(this.props.state.user.user.name)}</h2>
        <button onClick={this._submitHandler}>Log Out</button>
      </div>
    );
  }
}

export default connect()(UserDeets);

//https://appdividend.com/2018/06/15/react-redux-axios-tutorial-example/
