

import React, {Component} from 'react';
import {Grid, Row, Col, Well, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import {getAllUsers, removeUser} from '../../services/users';
import history from "../../history";


export default class UsersList extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            users: null
        };
    }

    async componentDidMount(){
        await this.loadData();
    }

    async loadData(){
        var users = await getAllUsers();
        this.setState({
            users: users
        });
    }

    render(){
        if (this.state.users){
            console.log(this.state.users);
            //console.log("State: ", this.props.books);
            var me = this;
            const usersList = this.state.users.map(function(user){
                var deleter = async function(){
                    await removeUser(user._id);
                    await me.loadData();
                }
                return (
                        <UserRow user={user} key={user._id} deleter={deleter} />
                )
            });
            return (
                <Grid>
                    <Row style={{marginTop:'15px'}}>
                        <Col xs={12}>
                            Usuarios
                            <div className="pull-right">
                                <Link to="/main/user" className="btn btn-xs btn-primary" role="button">Nuevo Usuario</Link>
                            </div>
                            {usersList}
                        </Col>
                    </Row>
                </Grid>
            );
        } else {
            return(
                <div>
                    Cargando usuarios...
                </div>
            );
        }

    }

}


class UserRow extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            user: props.user,
        }
    }

    render(){
        var user = this.props.user;
        var role = this.props.user.role;
        return(
            <Well>
                <Row>
                    <Col xs={12}>
                        <h6>{user.username} ({role.title})</h6>
                        <Button onClick={this.onDelete.bind(this)} bsStyle='danger'>Borrar</Button>
                        <Button onClick={this.onSelectItem.bind(this)}>Modificar</Button>
                    </Col>
                </Row>
            </Well>
        );
    }

    onDelete(){
        this.props.deleter();
    }

    onSelectItem(){
        history.push("/main/user/" + this.props.user._id);
    }

}

