import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import './sign-up.css';
import axios from 'axios';
export default class SignUp extends Component {
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
      url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCCKQvjW__DJNAiWpm7ZNQvJd14uQSG57A',
      data: {
        email,
        password,
        returnSecureToken: true
      },
      headers : {'Content-Type' : 'application/json'}
    })
      .then((token) => {
        localStorage.setItem('token', token.data.idToken);
        localStorage.setItem('userId', token.data.localId);
        this.setState({error: false});
        this.props.history.push('/');
      }).catch((err) => {
        this.setState({error: true})
      });
  }

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center" className="signinWrapper">
        <Paper>
          <div className="signin">
            <form onSubmit={this.handleSubmit}>
              <h1>Sign up for NotePal</h1>
              {this.state.error ? <p style={{color: 'red'}}>That username has already been used</p> : null}
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
                Register
              </Button>
              <Grid className="signUpWrapper">
                <Link style={{marginTop: '10px', textDecoration: 'none', color: '#484848', fontSize: 12}} to='/login'>Already have an account? Sign in now</Link>
              </Grid>
            </form>

          </div>
        </Paper>
      </Grid>
    );
  }
}
