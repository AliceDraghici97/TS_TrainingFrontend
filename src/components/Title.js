import React from "react";
import { Link, withRouter } from "react-router-dom";

const Title = props => {
  return (
    <nav className="nav-wrapper blue darken-5">
      <div className="container">
        <Link className={"appTitleText"} to="/home">
          Training App
        </Link>
      </div>
    </nav>
  );
};
export default withRouter(Title);
