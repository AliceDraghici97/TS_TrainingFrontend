import React from "react";
import { Col, Row } from "react-bootstrap";
import "../index.css";
import Sidebar from "./Sidebar";
import Aux from "../hoc/Auxiliary";

const Home = props => {
  return (
    <Aux>
      <Sidebar></Sidebar>
      <Row>
        <Col md={12}>
          <div className={"titleText"}>WELCOME</div>
        </Col>
      </Row>
    </Aux>
  );
};

export default Home;
