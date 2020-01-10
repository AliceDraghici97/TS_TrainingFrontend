import React from "react";
import Aux from "../hoc/Auxiliary";
import { FormGroup, Col, FormControl } from "react-bootstrap";
import "../index.css";

const input = props => {
  let inputField = null;
  let errorMessage = null;

  if (props.invalid && props.shouldValidate && props.touched) {
    errorMessage = <em>{props.errorMessage}</em>;
  }

  switch (props.elementType) {
    case "input":
      inputField = (
        <FormGroup controlId={props.id}>
          <Col sm={2}>{props.label}</Col>
          <Col sm={6}>
            <FormControl
              type={props.type}
              value={props.value}
              onChange={props.changed}
              onBlur={props.blur}
            />
          </Col>
          <Col>
            <em>{errorMessage}</em>
          </Col>
        </FormGroup>
      );
      break;

    default:
      inputField = null;
  }
  return <Aux>{inputField}</Aux>;
};

export default input;
