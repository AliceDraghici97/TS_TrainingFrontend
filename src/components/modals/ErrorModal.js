import React from "react";
import Aux from "../../hoc/Auxiliary";
import { Modal, Button } from "react-bootstrap";
import "../../index.css";

const errorModal = props => {
  return (
    <Aux>
      <Modal show={props.show} backdrop="static">
        <Modal.Header>{props.modalHeaderText}</Modal.Header>
        <Modal.Body>
          <p>{props.modalBodyText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={props.closeModal}>
            {props.okButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </Aux>
  );
};

export default errorModal;
