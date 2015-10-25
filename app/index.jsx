import React from 'react';
import ReactDOM from 'react-dom';

import Router, {
	Route,
	Redirect,
	DefaultRoute,
	NotFoundRoute,
} from 'react-router';

import {
	App,
	Dashboard,
	LoginPage,
	LogoutPage,
	ClientSearch,
	ClientNew,
	ClientEdit,
	RoleSearch,
	RoleNew,
	RoleEdit,
	UserSearch,
	UserNew,
	UserEdit,
	MemberSearch,
	MemberNew,
	MemberEdit,
} from './components';

const routes = (
	<Route name="root" path="/" component={App}>
		<Route name="login" component={LoginPage}/>
		<Route name="logout" component={LogoutPage}/>
		<Route name="dashboard" path="/" component={Dashboard}>
			<Route path="/users" component={UserSearch}/>
			<Route path="/users/new" component={UserNew}/>
			<Route path="/users/:id" component={UserEdit}/>
			<Route path="/roles" component={RoleSearch}/>
			<Route path="/roles/new" component={RoleNew}/>
			<Route path="/roles/:id" component={RoleEdit}/>
			<Route path="/clients" component={ClientSearch}/>
			<Route path="/clients/new" component={ClientNew}/>
			<Route path="/clients/:id" component={ClientEdit}/>
			<Route path="/members" component={MemberSearch}/>
			<Route path="/members/new" component={MemberNew}/>
			<Route path="/members/:id" component={MemberEdit}/>
		</Route>
	</Route>
);

ReactDOM.render(<Router>{routes}</Router>, document.body);
