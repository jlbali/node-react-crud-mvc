

import React from 'react';
import {Nav, NavItem, Navbar, Badge, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';

import history from '../../history'; 

export default class Menu extends React.Component{

  //static contextTypes = {
  //  router: React.PropTypes.object // Necesario para que este el this.context.router.
  //};

  	logout(){
		cookie.remove("token");
		cookie.remove("user");
		history.push("/login");
	}


	render(){
		var username = cookie.load("user").username;
		var admin = cookie.load("user").role.isAdmin;
		var navConfig = "";
		if (admin){
			navConfig = (
				<NavDropdown eventKey={2} title="Panel de Control" id="basic-nav-dropdown">
					<NavItem eventKey={2.1}><Link to="/main/users">Usuarios</Link></NavItem>
				</NavDropdown>		
			);
		}
		return (
			<Navbar inverse fluid>
				<Navbar.Header>
					<Navbar.Brand>
						ToDo App
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>

				<Nav>
					{navConfig}
				</Nav>

				<Nav pullRight>
					<NavItem eventKey={5}>{username}</NavItem>     
					<NavItem eventKey={6}><button onClick={this.logout.bind(this)}>Salir</button></NavItem>
				</Nav>
			</Navbar>
		);
	}

}

