import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { userLogout } from "../../_actions/userActions";

function LoginButton({ isAuthenticated, userLogout }) {
  let history = useHistory();

  return !isAuthenticated ? (
    <button
      className="loggedOut"
      onClick={() => {
        let path = `/login`;
        history.push(path);
      }}
    >
      Login
    </button>
  ) : (
    <button className="loggedIn" onClick={userLogout}>
      Log Out
    </button>
  );
}

// Look how simple this is now!
const mapDispatchToProps = {
  userLogout,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
