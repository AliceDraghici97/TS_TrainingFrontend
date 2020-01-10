import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";

const Sidebar = props => {
  return (
    <nav className="nav-wrapper blue darken-5">
      <div className="container">
        <Link className={"appTitleText"} to="/home">
          UniApp
        </Link>
        <ul className="right">
          <li>
            <NavLink className={"navbarTitle"} exact to="/home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={"navbarTitle"} to="/studentlist">
              Students
            </NavLink>
          </li>
          <li>
            <NavLink className={"navbarTitle"} to="/subjectlist">
              Subjects
            </NavLink>
          </li>
          <li>
            <NavLink className={"navbarTitle"} to="/login">
              Logout
            </NavLink>
          </li>{" "}
        </ul>
      </div>
    </nav>
  );
};
export default withRouter(Sidebar);
