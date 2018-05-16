

import React from 'react';
import Menu from './Menu';
import Footer from './Footer';

class Main extends React.Component{

	render(){
		return(
			<div>
				<Menu />
				{this.props.children}
				<Footer />
			</div>
		);
	}


}

export default Main;

