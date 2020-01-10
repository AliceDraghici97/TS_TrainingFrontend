import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";
import { connect } from "react-redux";
import { Button, Col, Row, Card } from "react-bootstrap";
import SuccessModal from "../../components/modals/SuccessModal";
import ErrorModal from "../../components/modals/ErrorModal";

class DeleteStudent extends Component {
  componentDidMount = () => {
    const id = this.props.match.params.id;
    const url = "/api/students/" + id;
    this.props.onGetStudentById(url, { ...this.props });
  };

  redirectTostudentList = () => {
    this.props.history.push("/studentlist");
  };

  deletestudent = event => {
    event.preventDefault();
    const id = this.props.match.params.id;
    const url = "/api/students/" + id;
    this.props.onDeleteStudent(url, id, { ...this.props });
  };

  render() {
    let student = { ...this.props.data };

    return (
      <Aux>
        <Card>
          <Card.Body /*className="bg-dark text-white"*/>
            <Row>
              <Col md={10}>
                <Row>
                  <Col md={3}>
                    <label>Name:</label>
                  </Col>
                  <Col md={7}>
                    <span name="name">{student.Name}</span>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <label>Surname:</label>
                  </Col>
                  <Col md={7}>
                    <span name="name">{student.Surname}</span>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <label>Phone:</label>
                  </Col>
                  <Col md={7}>
                    <span name="name">{student.PhoneNo}</span>
                  </Col>
                </Row>{" "}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row>
          <Col md={1}>
            <Button
              type="submit"
              variant="outline-info"
              onClick={this.deletestudent}
            >
              Delete
            </Button>
          </Col>
          <Col md={1}>
            <Button
              variant="outline-danger"
              onClick={this.redirectTostudentList}
            >
              Cancel
            </Button>
          </Col>
        </Row>
        <SuccessModal
          show={this.props.showSuccessModal}
          modalHeaderText={"Success message"}
          modalBodyText={"Action completed successfylly"}
          okButtonText={"OK"}
          successClick={() =>
            this.props.onCloseSuccessModal("/studentlist", { ...this.props })
          }
        />
        <ErrorModal
          show={this.props.showErrorModal}
          modalHeaderText={"Error message"}
          modalBodyText={this.props.errorMessage}
          okButtonText={"OK"}
          closeModal={() => this.props.onCloseErrorModal()}
        />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.repository.data,
    showSuccessModal: state.repository.showSuccessModal,
    showErrorModal: state.errorHandler.showErrorModal,
    errorMessage: state.errorHandler.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetStudentById: (url, props) =>
      dispatch(repositoryActions.getData(url, props)),
    onDeleteStudent: (url, id, props) =>
      dispatch(repositoryActions.deleteData(url, id, props)),
    onCloseSuccessModal: (url, props) =>
      dispatch(repositoryActions.closeSuccessModal(props, url)),
    onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteStudent);
