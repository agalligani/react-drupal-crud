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
        <h6>
          Store state,
          <pre> {JSON.stringify(this.props.state, null, "\t")}</pre>
        </h6>
        <button onClick={this._submitHandler}>Log Out</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(UserDeets);
//https://appdividend.com/2018/06/15/react-redux-axios-tutorial-example/
