import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import UserLogin from "./UserLogin";
import { Route, Redirect, useHistory, useLocation } from "react-router";

class AllUser extends Component {
  _formFactory = ({ isAuthenticated }) => {
    return isAuthenticated ? <RedirectPage /> : <UserLogin />;
  };

  render() {
    return this._formFactory(this.props.user);
  }
}

function RedirectPage() {
  let location = useLocation();
  let redirectPath = location.state ? location.state.from.pathname : "/welcome";
  return (
    <Route>
      <Redirect
        to={{
          pathname: redirectPath,
          state: { from: location },
        }}
      ></Redirect>
    </Route>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(AllUser);
