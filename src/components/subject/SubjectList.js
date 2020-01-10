import React, { Component } from "react";
import { Col, Row, Table } from "react-bootstrap";
import "../../index.css";
import * as repositoryActions from "../../store/actions/repositoryActions";
import Aux from "../../hoc/Auxiliary";
import { connect } from "react-redux";
import Subject from "./Subject";
import { IoIosAdd } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Sidebar from "../Sidebar";

class SubjectList extends Component {
  componentDidMount = () => {
    let url = "/api/subjects";
    this.props.onGetData(url, { ...this.props });
  };

  render() {
    let subjects = [];
    if (this.props.data && this.props.data.length > 0) {
      subjects = this.props.data.map(subject => {
        return <Subject key={subject.Id} subject={subject} {...this.props} />;
      });
    }

    return (
      <Aux>
        <Sidebar></Sidebar>
        <Row>
          <Col md={11}>
            <div className={"titleText"}>
              SUBJECTS{" "}
              <NavLink to="/createSubject">
                <IoIosAdd type="button" className=" btn-circle"></IoIosAdd>
              </NavLink>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Table
              className={"tableStyle"}
              striped
              bordered
              hover
              variant="dark"
            >
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Description</th>
                  <th>CoursesNo</th>
                  <th>CreatedOn</th>
                  <th>ModifiedOn</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{subjects}</tbody>
            </Table>
          </Col>
        </Row>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.repository.data
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetData: (url, props) => dispatch(repositoryActions.getData(url, props))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectList);
