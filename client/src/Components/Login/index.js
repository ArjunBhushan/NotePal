import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: false
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
    const email = this.state.email;
    const password = this.state.password;
    axios({
      method: 'post',
      url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCCKQvjW__DJNAiWpm7ZNQvJd14uQSG57A',
      data: {
        email,
        password,
        returnSecureToken: true
      },
      headers : {'Content-Type' : 'application/json'}
    })
      .then((token) => {
        localStorage.setItem('token', token.data)
        this.setState({error: false})
        this.props.history.push('/');
      }).catch((err) => {
        this.setState({error: true})
      });
  }

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center" className="LoginWrapper">
        <Paper>
          <div className="Login">
            <form onSubmit={this.handleSubmit}>
              <h1>Sign in to NotePal</h1>
              {this.state.error ? <p style={{color: 'red'}}>Those credentials do not exist</p> : null}
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
              > Login
              </Button>
              <Grid className="signUpWrapper">
                <Link style={{marginTop: '10px', textDecoration: 'none', color: '#484848', fontSize: 12}} to='/signup'>Don't have an account? Sign up now</Link>
              </Grid>
            </form>

          </div>
        </Paper>
      </Grid>
    );
  }
}
