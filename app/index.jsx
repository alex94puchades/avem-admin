import React from 'react';

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
} from './components';

const routes = (
	<Route name="root" path="/" handler={App}>
		<Route name="login" handler={LoginPage}/>
		<Route name="logout" handler={LogoutPage}/>
		<Route name="dashboard" path="/" handler={Dashboard}>
			<Route name="user-search" path="/users" handler={UserSearch}/>
			<Route name="user-new" path="/users/new" handler={UserNew}/>
			<Route name="user-edit" path="/users/:id" handler={UserEdit}/>
			<Route name="role-search" path="/roles" handler={RoleSearch}/>
			<Route name="role-new" path="/roles/new" handler={RoleNew}/>
			<Route name="role-edit" path="/roles/:id" handler={RoleEdit}/>
			<Route name="client-search" path="/clients" handler={ClientSearch}/>
			<Route name="client-new" path="/clients/new" handler={ClientNew}/>
			<Route name="client-edit" path="/clients/:id" handler={ClientEdit}/>
		</Route>
	</Route>
);

Router.run(routes, Router.HashLocation, Root => {
	React.render(<Root/>, document.body);
});
