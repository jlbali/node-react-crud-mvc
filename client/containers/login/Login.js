import React, {Component} from "react";
import {Image, PageHeader, Panel, Grid,Row, Col, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {findDOMNode} from 'react-dom';
import {Redirect} from 'react-router-dom';


import "./Login.css";
import {authenticate} from '../../services/authentication';


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message : "",
      redirect: false,
    };
  }



  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  async handleSubmit(event) {
    event.preventDefault();
    var username = findDOMNode(this.refs.username).value;
    var password = findDOMNode(this.refs.password).value;
    var response = await authenticate(username, password);
    if (response.validated){
      console.log("REDIRIGIR");
      //this.props.history.push("www.google.com");
      this.setState({
        redirect: true
      });
    } else{
      this.setState({
        message: response.message
      });
    }
  }

  render() {
    
    if (this.state.redirect){
      return(
        <Redirect to="/main/home" />
      );
    }
    // Tira excepcion rara esto...
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="username" bsSize="large">
            {this.state.message}
            <ControlLabel>Usuario</ControlLabel>
            <FormControl 
              placeholder="Ingrese usuario..."
              ref="username"
              autoFocus
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Clave</ControlLabel>
            <FormControl
              ref = "password"
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }



}


// <!--disabled={!this.validateForm()}-->