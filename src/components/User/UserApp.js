import React, { Component } from "react";
import AllUser from "./AllUser";

class UserApp extends Component {
  render() {
    return (
      <div className="App">
        <div className="navbar">
          <h2 className="center ">Log In</h2>
        </div>
        <AllUser />
      </div>
    );
  }
}
export default UserApp;
