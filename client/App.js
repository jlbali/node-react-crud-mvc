import React, {Component} from 'react';
//import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {render} from 'react-dom';

import Login from './containers/login/Login';
import Main from './containers/main/MainScreen';
import Home from './containers/home/Home';
import UsersList from './containers/users/usersList';
import UserForm from './containers/users/userForm';
import history from './history';

function RouteNest(props){ 
  return (
    <Route exact={props.exact} path={props.path} render={ p => <props.component {...p} children={props.children}/> } />
  )
}

export default class Routes extends Component {
    render() {
      return (
        <Router history={history}>
            <Switch>
                <Route exact path="/login" component={Login} />
                <RouteNest  path={'/main'} component={Main}>
                    <RouteNest  exact path={'/main/home'} component={Home}/>
                    <RouteNest  exact path={'/main/users'} component={UsersList}/>
                    <RouteNest  exact path={'/main/user/:id'} component={UserForm}/>
                    <RouteNest  exact path={'/main/user'} component={UserForm}/>
                </RouteNest>
            </Switch>
        </Router>
      );
    }
  }


render(<Routes />, document.getElementById("root"));


