import React, { Component } from "react";
import { connect } from "react-redux";
import token from "basic-auth-token";

const generateToken = (id, pw) => {
  console.log(id, pw);
  let basic_auth_token = token(id, pw);
  return basic_auth_token;
};

class UserLogin extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const userid = this.getUserId.value;
    const password = this.getPassword.value;
    const token = generateToken(userid, password);
    this._userLogin(userid, password, token);
    this.getUserId.value = "";
    this.getPassword.value = "";
  };

  _userLogin = async (userid, password, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      name: userid,
      pass: password,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body,
      redirect: "follow",
    };

    try {
      let response = await fetch(
        "http://adminflambeau.com/user/login?_format=json",
        requestOptions
      );
      let status = response.status;
      let data = await response.text();
      let payload = { status: status, data: data, basic_auth_token: token };
      this.props.dispatch({
        type: "USER_LOGIN",
        payload,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    return (
      <div className="post-container">
        <h1 className="post_heading">You are not logged in</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            required
            type="text"
            ref={(input) => (this.getUserId = input)}
            placeholder="Enter User ID"
          />
          <br />
          <br />
          <input
            required
            ref={(input) => (this.getPassword = input)}
            placeholder="Enter Password"
          />
          <br />
          <br />
          <button onClick={this.handleSubmit}>OK</button>
        </form>
      </div>
    );
  }
}

export default connect()(UserLogin);
