import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainNav from "./components/MainNav/MainNav";
import AllPost from "./components/Posts/AllPost";
import PostForm from "./components/Posts/PostForm";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import UserApp from "./components/User/UserApp";
class App extends Component {
  render() {
    return (
      <Router>
        <MainNav />
        <Route path="/imageupload" render={() => <ImageUpload />} />
        <Route path="/home" render={() => <AllPost />} />
        <div>
          <Switch>
            <Route path="/posts">
              {() => {
                return (
                  <Fragment>
                    <PostForm />
                    <AllPost />
                  </Fragment>
                );
              }}
            </Route>
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

export default App;
