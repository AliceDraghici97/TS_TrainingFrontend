import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import axios from "../axios";
import Title from "./Title";
import Aux from "../hoc/Auxiliary";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  setPassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  setUsername = event => {
    this.setState({
      username: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  authenticate = () => {
    const url = "http://localhost:52393/token";
    axios
      .post(
        url,
        `grant_type=${"password"}&username=${this.state.username}&password=${
          this.state.password
        }`
      )
      .then(
        res => {
          this.props.history.push("/home");
          return res;
        },
        error => alert("Incorrect username/password!")
      );
  };

  buttonOnClick = async () => {
    this.authenticate();
  };

  render() {
    return (
      <Aux>
        <Title></Title>
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="username">
              <label>Username:</label>
              <FormControl
                autoFocus
                type="username"
                value={this.state.username}
                onChange={this.setUsername}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <label>Password:</label>
              <FormControl
                value={this.state.password}
                onChange={this.setPassword}
                type="password"
              />
            </FormGroup>
            <Button
              block
              disabled={!this.validateForm()}
              type="submit"
              onClick={this.buttonOnClick}
            >
              Login
            </Button>
          </form>
        </div>
      </Aux>
    );
  }
}

export default Login;
