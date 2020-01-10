import React, { Component } from "react";
import { Button, FormGroup, Col, Card, Row } from "react-bootstrap";
import * as formUtilityActions from "../../utility/FormUtility";
import SuccessModal from "../../components/modals/SuccessModal";
import ErrorModal from "../../components/modals/ErrorModal";
import axios from "../../axios";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary";
import Sidebar from "../Sidebar";

class UpdateStudent2 extends Component {
  state = {
    name: null,
    surname: null,
    phoneNo: null,
    createdOn: null,
    isFormValid: false
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    const url = "/api/students/" + id;
    axios.get(url).then(res =>
      this.setState({
        name: res.data.Name,
        surname: res.data.Surname,
        phoneNo: res.data.PhoneNo,
        createdOn: res.data.CreatedOn
      })
    );
  };

  redirectToStudentList = () => {
    this.props.history.push("/studentlist");
  };

  handleChangeEventName = (event, id) => {
    const updatedStudentForm = { ...this.state.studentForm };
    updatedStudentForm[
      id
    ] = formUtilityActions.executeValidationAndReturnFormElement(
      event,
      updatedStudentForm,
      id
    );

    const counter = formUtilityActions.countInvalidElements(updatedStudentForm);

    this.setState({
      studentForm: updatedStudentForm,
      isFormValid: counter === 0,
      name: event.target.value
    });
  };

  handleChangeEventSurname = (event, id) => {
    const updatedStudentForm = { ...this.state.studentForm };
    updatedStudentForm[
      id
    ] = formUtilityActions.executeValidationAndReturnFormElement(
      event,
      updatedStudentForm,
      id
    );

    const counter = formUtilityActions.countInvalidElements(updatedStudentForm);

    this.setState({
      studentForm: updatedStudentForm,
      isFormValid: counter === 0,
      surname: event.target.value
    });
  };

  handleChangeEventPhone = (event, id) => {
    const updatedStudentForm = { ...this.state.studentForm };
    updatedStudentForm[
      id
    ] = formUtilityActions.executeValidationAndReturnFormElement(
      event,
      updatedStudentForm,
      id
    );

    const counter = formUtilityActions.countInvalidElements(updatedStudentForm);

    this.setState({
      studentForm: updatedStudentForm,
      isFormValid: counter === 0,
      phoneNo: event.target.value
    });
  };

  redirectTostudentList = () => {
    this.props.history.push("/studentlist");
  };

  updateStudent = event => {
    event.preventDefault();
    const id = this.props.match.params.id;
    const studentToUpdate = {
      Id: id,
      Name: this.state.name,
      Surname: this.state.surname,
      PhoneNo: this.state.phoneNo,
      CreatedOn: this.state.createdOn,
      ModifiedOn: new Date()
    };
    const url = "/api/students/" + id;
    this.props.onUpdateStudent(url, studentToUpdate, { ...this.props });
  };

  render() {
    return (
      <Aux>
        <Sidebar></Sidebar>
        <Card>
          <Card.Body className="bg-dark text-white">
            <form>
              <br />

              <FormGroup className="">
                {" "}
                <Row>
                  {" "}
                  <Col md={1}>
                    <label>
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChangeEventName}
                      />
                    </label>
                  </Col>
                </Row>
                <Row>
                  {" "}
                  <Col md={1}>
                    <label>
                      Surname:
                      <input
                        type="text"
                        name="name"
                        value={this.state.surname}
                        onChange={this.handleChangeEventSurname}
                      />
                    </label>
                  </Col>
                </Row>
                <Row>
                  {" "}
                  <Col md={1}>
                    <label>
                      Phone Number:
                      <input
                        type="text"
                        name="password"
                        value={this.state.phoneNo}
                        onChange={this.handleChangeEventPhone}
                        required
                      />
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <Button
                      type="submit"
                      variant="outline-info"
                      disabled={!this.state.isFormValid}
                      onClick={this.updateStudent}
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col md={1}>
                    <Button
                      variant="outline-danger"
                      onClick={this.redirectToStudentList}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </form>
          </Card.Body>

          <SuccessModal
            show={this.props.showSuccessModal}
            modalHeaderText={"Success message"}
            modalBodyText={"Action completed successfully"}
            okButtonText={"OK"}
            successClick={() =>
              this.props.onCloseSuccessModal("/studentlist", { ...this.props })
            }
          />
          <ErrorModal
            show={this.props.showErrorModal}
            modalHeaderText={"Error message"}
            modalBodyText={this.props.errormessage}
            okButtonText={"OK"}
            closeModal={() => this.props.onCloseErrorModal()}
          />
        </Card>
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
    onUpdateStudent: (url, Student, props) =>
      dispatch(repositoryActions.putData(url, Student, props)),
    onCloseSuccessModal: (url, props) =>
      dispatch(repositoryActions.closeSuccessModal(props, url)),
    onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateStudent2);
