import React, {Component} from 'react';
import {Grid, Row, Col, Well, Button, FormGroup, ControlLabel, FormControl, Panel} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import $ from 'jquery';

import rolesStore from "../../services/roles";
import usersStore from "../../services/users";

import history from "../../history";

export default class UserForm extends Component{

    constructor(props){
        super(props);
        var id = props.match.params.id;
        var user = null;
        this.state ={
            id: id,
            roles: [],
        }
    }

    async loadRoles(){
        var roles = await rolesStore.getAllRoles();
        this.setState({
            roles: roles
        });
    }

    async loadUser(){
        if (this.state.id){
            var user = await usersStore.getUser(this.state.id);
            console.log("User: ", user);
            $("#username").val(user.username);
            $("#password").val("CLAVE");
            $("#email").val(user.email);
            $("#role").val(user.id_role);
        }
    }

    async componentDidMount(){
        await this.loadRoles();
    }

    async componentDidUpdate(){
        await this.loadUser();
    }

    render(){
        var me = this;
        var rolesOptions = this.state.roles.map(function(role){
            return (
                <option value={role._id}>{role.title}</option>
            )
        });
        return (
            <Well>
                <Panel header="Usuario">
                    <FormGroup controlId="name">
                        <ControlLabel>Usuario </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder ="Ingresar Usuario"
                            id = "username"
                            ref="username" 
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <ControlLabel>Clave </ControlLabel>
                        <FormControl
                            type="text"
                            placeholder ="Ingresar clave"
                            id = "password"
                            ref="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="email">
                        <ControlLabel>E-mail</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder ="Ingresar e-mail"
                            id = "email"
                            ref="email"
                            />
                    </FormGroup>
                    <FormGroup controlId="role">
                        <ControlLabel>Rol</ControlLabel>
                        <FormControl componentClass="select" id="role" ref="role">
                            {rolesOptions}
                        </FormControl>                
                    </FormGroup>
                    <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Guardar</Button>
                    <Button onClick={this.handleCancel.bind(this)} bsStyle="primary">Cancelar</Button>
                </Panel>
            </Well>
        )
    }

    async handleSubmit(){
        const item ={
            username: findDOMNode(this.refs.username).value,
            password: findDOMNode(this.refs.password).value,
            email: findDOMNode(this.refs.email).value,
            id_role: findDOMNode(this.refs.role).value,
        };
        if (!this.state.id){
            var respuesta = await usersStore.createUser(item);
        } else {
            var respuesta = await usersStore.updateUser(this.state.id, item);
        }
        
        console.log("Respuesta ", respuesta); // Tampoco llega hasta aca.
        history.push("/main/users"); // Por algun motivo este no lo esta tomando..
    }

    handleCancel(){
        history.push("/main/users");
    }

}

