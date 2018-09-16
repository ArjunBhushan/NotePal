import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import "./Login.css";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper>
          <div className="Login">
            <form onSubmit={this.handleSubmit}>
              <h1>Sign in to NotePal</h1>
              <FormGroup controlId="email" bsSize="large" className="username">
                <ControlLabel>Email </ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large" className="password">
                <ControlLabel>Password </ControlLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
              >
                Login
              </Button>
              <Grid className="signUpWrapper">
                <a href="#" className="signUp">Don't have an account? Sign up now</a>
              </Grid>
            </form>
           
          </div>
        </Paper>
      </Grid>
    );
  }
}
