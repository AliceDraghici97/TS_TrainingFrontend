import React, { Component } from "react";
import Input from "../../UI/Input";
import Form from "react-bootstrap/Form";
import { Button, FormGroup, Col, Row, Card } from "react-bootstrap";
import { returnInputConfigurationStudent } from "../../utility/InputConfiguration";
import * as formUtilityActions from "../../utility/FormUtility";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";
import SuccessModal from "../../components/modals/SuccessModal";
import ErrorModal from "../../components/modals/ErrorModal";

class CreateStudent extends Component {
  state = {
    studForm: {},
    isFormValid: false
  };

  componentWillMount = () => {
    this.setState({ studForm: returnInputConfigurationStudent() });
  };

  handleChangeEvent = (event, id) => {
    const updatedForm = { ...this.state.studForm };
    updatedForm[id] = formUtilityActions.executeValidationAndReturnFormElement(
      event,
      updatedForm,
      id
    );
    const counter = formUtilityActions.countInvalidElements(updatedForm);
    this.setState({ studForm: updatedForm, isFormValid: counter === 0 });
  };

  createStudent = event => {
    event.preventDefault();

    const studToCreate = {
      Id: 0,
      Name: this.state.studForm.name.value,
      Surname: this.state.studForm.surname.value,
      PhoneNo: this.state.studForm.phoneno.value,
      CreatedOn: new Date(),
      ModifiedOn: null
    };
    const url = "/api/students";
    this.props.onCreateStudent(url, studToCreate, { ...this.props });
  };

  render() {
    const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects(
      { ...this.state.studForm }
    );

    return (
      <Card>
        <Card.Body className="bg-dark text-white">
          <Form className="divform" onSubmit={this.createStudent}>
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
                    onClick={this.createStudent}
                  >
                    Create
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <NavLink to="/studentlist">
                    <Button
                      variant="outline-danger"
                      onClick={this.redirectToOwnerList}
                    >
                      Cancel
                    </Button>{" "}
                  </NavLink>
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
    showSuccessModal: state.repository.showSuccessModal,
    showErrorModal: state.errorHandler.showErrorModal,
    errorMessage: state.errorHandler.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateStudent: (url, STUD, props) =>
      dispatch(repositoryActions.postData(url, STUD, props)),
    onCloseSuccessModal: (url, props) =>
      dispatch(repositoryActions.closeSuccessModal(props, url)),
    onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateStudent);
