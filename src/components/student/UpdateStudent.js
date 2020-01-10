import React, { Component } from "react";
import { Form, Button, FormGroup, Col, Card, Row } from "react-bootstrap";
import { returnInputConfigurationStudent } from "../../utility/InputConfiguration";
import * as formUtilityActions from "../../utility/FormUtility";
import Input from "../../UI/Input";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";
import { connect } from "react-redux";
import SuccessModal from "../../components/modals/SuccessModal";
import ErrorModal from "../../components/modals/ErrorModal";

class UpdateStudent extends Component {
  state = {
    studentForm: {},
    isFormValid: true
  };

  componentWillMount = () => {
    this.setState({ studentForm: returnInputConfigurationStudent() });
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    const url = "/api/students/" + id;
    this.props.onGetStudentById(url, { ...this.props });
  };

  componentWillReceiveProps = nextProps => {
    const updatedStudentForm = { ...this.state.studentForm };
    let nameObject = { ...updatedStudentForm.name };
    let surnameObject = { ...updatedStudentForm.surname };
    let phoneObject = { ...updatedStudentForm.phoneNo };
    nameObject.value = nextProps.data.name;
    nameObject.valid = true;
    surnameObject.value = nextProps.data.surname;
    surnameObject.valid = true;
    phoneObject.value = nextProps.data.phoneNo;
    phoneObject.valid = true;

    updatedStudentForm["name"] = nameObject;
    updatedStudentForm["surname"] = surnameObject;
    updatedStudentForm["phoneNo"] = phoneObject;
    this.setState({ studentForm: updatedStudentForm });
  };

  handleChangeEvent = (event, id) => {
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
      isFormValid: counter === 0
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
      Name: this.state.studentForm.name.value,
      Surname: this.state.studentForm.surname.value,
      Phone: this.state.studentForm.phoneNo.value,
      CreatedOn: new Date(),
      ModifiedOn: new Date()
    };
    const url = "/api/students/" + id;
    this.props.onUpdateStudent(url, id, studentToUpdate, { ...this.props });
  };

  render() {
    const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects(
      { ...this.state.studentForm }
    );

    return (
      <Card>
        <Card.Body className="bg-dark text-white">
          <Form onSubmit={this.updateStudent}>
            {formElementsArray.map(element => {
              return (
                <Input
                  key={element.id}
                  elementType={element.config.element}
                  id={element.id}
                  label={element.config.label}
                  type={element.config.type}
                  value={element.config.value}
                  changed={event => this.handleChangeEvent(event, element.id)}
                  errorMessage={element.config.errorMessage}
                  invalid={!element.config.valid}
                  shouldValidate={element.config.validation}
                  touched={element.config.touched}
                  blur={event => this.handleChangeEvent(event, element.id)}
                />
              );
            })}
            <br />
            <FormGroup>
              <Row>
                <Col md={1}>
                  <Button
                    type="submit"
                    variant="outline-info"
                    disabled={!this.state.isFormValid}
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
          </Form>
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
          modalBodyText={this.props.errorMessage}
          okButtonText={"OK"}
          closeModal={() => this.props.onCloseErrorModal()}
        />
      </Card>
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
    onUpdateStudent: (url, id, Student, props) =>
      dispatch(repositoryActions.putData(url, id, Student, props)),
    onCloseSuccessModal: (url, props) =>
      dispatch(repositoryActions.closeSuccessModal(props, url)),
    onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateStudent);
