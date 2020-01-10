import React, { Component } from "react";
import Input from "../../UI/Input";
import Form from "react-bootstrap/Form";
import { Button, FormGroup, Col, Row, Card } from "react-bootstrap";
import { returnInputConfigurationSubject } from "../../utility/InputConfiguration";
import * as formUtilityActions from "../../utility/FormUtility";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/errorHandlerActions";
import SuccessModal from "../../components/modals/SuccessModal";
import ErrorModal from "../../components/modals/ErrorModal";

class CreateSubject extends Component {
  state = {
    subjectForm: {},
    isFormValid: false
  };

  componentWillMount = () => {
    this.setState({ subjectForm: returnInputConfigurationSubject() });
  };

  handleChangeEvent = (event, id) => {
    const updatedForm = { ...this.state.subjectForm };
    updatedForm[id] = formUtilityActions.executeValidationAndReturnFormElement(
      event,
      updatedForm,
      id
    );
    const counter = formUtilityActions.countInvalidElements(updatedForm);
    this.setState({ subjectForm: updatedForm, isFormValid: counter === 0 });
  };

  createSubject = event => {
    event.preventDefault();

    const subjectToCreate = {
      Id: 0,
      Description: this.state.subjectForm.description.value,
      CoursesNo: this.state.subjectForm.coursesNo.value,
      CreatedOn: new Date(),
      ModifiedOn: null
    };
    const url = "/api/subjects";
    this.props.onCreateSubject(url, subjectToCreate, { ...this.props });
  };

  render() {
    const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects(
      { ...this.state.subjectForm }
    );

    return (
      <Card>
        <Card.Body className="bg-dark text-white">
          <Form className="divform" onSubmit={this.createSubject}>
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
                    onClick={this.createSubject}
                  >
                    Create
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <NavLink to="/subjectlist">
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
            this.props.onCloseSuccessModal("/subjectlist", { ...this.props })
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
    onCreateSubject: (url, subject, props) =>
      dispatch(repositoryActions.postData(url, subject, props)),
    onCloseSuccessModal: (url, props) =>
      dispatch(repositoryActions.closeSuccessModal(props, url)),
    onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSubject);
