import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class MainNav extends Component {
  placeLogLink = () => {
    return !this.props.isAuthenticated ? (
      <button className="loggedOut" as={Link} to="/login">
        Login
      </button>
    ) : (
      <button className="loggedIn" onClick={this._submitHandler}>
        Log Out
      </button>
    );
  };

  _submitHandler = (e) => {
    e.preventDefault();
    this.props.dispatch({ type: "USER_LOGOUT" });
  };

  render() {
    return (
      <div className="sticky-wrapper">
        <Navbar expand="lg" style={{ flexDirection: "row" }}>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav">
            <FontAwesomeIcon icon="bars" focusable="true" />
          </Navbar.Toggle> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-links">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/posts">
                Posts
              </Nav.Link>
              {this.placeLogLink()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default connect()(MainNav);
