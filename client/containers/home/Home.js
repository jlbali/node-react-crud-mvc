
import React,{Component} from 'react';
import cookie from 'react-cookies';

export default class extends Component{

	render(){
		var username = cookie.load("user").username;
		return(
		   <div>
			    <p />
				<p />
				<h1>Bienvenido {username}!</h1>
			</div>
		);
	}

}


