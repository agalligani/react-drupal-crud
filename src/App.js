import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import PostForm from "./PostForm";
import MainNav from "./components/MainNav/MainNav";
import AllPost from "./components/Posts/AllPost";
import UserApp from "./components/User/UserApp";
class App extends Component {
  render() {
    return (
      <Router>
        <MainNav />
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
