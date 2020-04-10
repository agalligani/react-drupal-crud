import React, { Component } from "react";
import { connect } from "react-redux";

class UserDeets extends Component {
  _submitHandler = (e) => {
    e.preventDefault();
    this.props.dispatch({ type: "USER_LOGOUT" });
    console.log("logging out bitches!");
  };

  _submitDelete = (n) => {
    const url = `http://admin.flambeaucabin.com/node/${n}?_format=json`;

    fetch(url, {
      headers: {
        Authorization: "Basic YWdhbGxpZ2FuaTpDb3dGbG9wIzEyMzQ=",
      },
      method: "DELETE",
    });
  };

  render() {
    return (
      <div className="post-container">
        <h2>User Details</h2>
        <h4>{JSON.stringify(this.props.user)}</h4>
        <button onClick={this._submitHandler}>Log Out</button>
        <button onClick={this._submitDelete(4)}>Delete</button>
      </div>
    );
  }
}

export default connect()(UserDeets);

//https://appdividend.com/2018/06/15/react-redux-axios-tutorial-example/
