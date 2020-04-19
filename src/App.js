import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import MainNav from "./components/MainNav/MainNav";
import AllPost from "./components/Posts/AllPost";
import PostForm from "./components/Posts/PostForm";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import UserApp from "./components/User/UserApp";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <Router>
        <MainNav
          isAuthenticated={
            this.props.state.user.login_status === 200 ? true : false
          }
        />
        <Route path="/imageupload" render={() => <ImageUpload />} />
        <Route path="/home" render={() => <AllPost />} />
        <div>
          <Switch>
            <Route path="/posts">
              {() => {
                return (
                  <Fragment>
                    <AllPost />
                  </Fragment>
                );
              }}
            </Route>
            <PrivateRoute
              path="/addpost"
              login_status={this.props.state.user.login_status}
            >
              <PostForm />
            </PrivateRoute>
            <Route path="/login">
              {() => {
                return <UserApp />;
              }}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let isAuthenticated = rest.login_status === 200 ? true : false;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(App);
