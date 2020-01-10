import React from "react";
import Aux from "../../hoc/Auxiliary";
import { Modal, Button } from "react-bootstrap";
import "../../index.css";

const LoginButton = props => {
  return (
    <Button block variant="outline-info" onClick={props.successClick}>
      {props.okButtonText}
    </Button>
  );
};

export default LoginButton;
