import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#000000" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/home" style={isActive(history, "/home")}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/signin" style={isActive(history, "/signin")}>
            Signin
          </Link>
        </li>
        <li>
          <Link to="/signup" style={isActive(history, "/signup")}>
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
