import React, { Component } from "react";
import { connect } from "react-redux";

class UserDeets extends Component {
  render() {
    return (
      <div className="post-container">
        <h2>User Details</h2>
        <h4>{JSON.stringify(this.props.user)}</h4>
      </div>
    );
  }
}

export default connect()(UserDeets);

//https://appdividend.com/2018/06/15/react-redux-axios-tutorial-example/
