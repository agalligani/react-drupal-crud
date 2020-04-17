import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import UserDeets from "./UserDeets";
import UserLogin from "./UserLogin";
import { Route, Redirect, useHistory, useLocation } from "react-router";

class AllUser extends Component {
  _formFactory = () => {
    switch (this.props.user.user.login_status) {
      case 200:
        return <RedirectPage />;
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

function RedirectPage() {
  let history = useHistory();
  let location = useLocation();
  console.log(location.state.from.pathname);
  console.log(history);
  return (
    <Route>
      <Redirect
        to={{
          pathname: location.state.from.pathname,
          state: { from: location },
        }}
      ></Redirect>
    </Route>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(AllUser);
