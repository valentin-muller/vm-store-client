import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

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
          <Link to="/user/dashboard" style={isActive(history, "/user/dashboard")}>
            dashboard
          </Link>
        </li>

        {!isAuthenticated() && (
          <Fragment>
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
          </Fragment>
        )}

        {isAuthenticated() && (
          <div>
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#000000" }}
              onClick={() =>
                signout(() => {
                  history.push("/signin");
                })
              }
            >
              Signout
            </span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
