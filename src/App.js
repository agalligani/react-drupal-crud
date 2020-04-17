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
        <MainNav />
        <AuthButton />
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

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <PostForm />;
}

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(App);
