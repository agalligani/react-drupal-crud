import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import PostForm from "./PostForm";
import AllPost from "./components/Posts/AllPost";
import UserApp from "./components/User/UserApp";
class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/home" render={() => <AllPost />} />
        <div>
          <Switch>
            <Route path="/posts">
              {() => {
                return <AllPost />;
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
