import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import UserDeets from "./UserDeets";
import UserLogin from "./UserLogin";

class AllUser extends Component {
  _formFactory = () => {
    switch (this.props.user.user.login_status) {
      case 200:
        return (
          <Fragment>
            <UserDeets state={this.props.user} />
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <UserLogin />
          </Fragment>
        );
    }
  };

  render() {
    return this._formFactory();
  }
}

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(AllUser);
