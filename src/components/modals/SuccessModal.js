import React from "react";
import Aux from "../../hoc/Auxiliary";
import { Modal, Button } from "react-bootstrap";
import "../../index.css";

const successModal = props => {
  return (
    <Aux>
      <Modal show={props.show} backdrop="static">
        <Modal.Header id="example-modal-sizes-title-sm">
          {props.modalHeaderText}
        </Modal.Header>
        <Modal.Body>
          <p>{props.modalBodyText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.successClick}>
            {props.okButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </Aux>
  );
};

export default successModal;
