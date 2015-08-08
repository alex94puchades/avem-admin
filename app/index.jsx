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
	UserSearch,
	UserEdit,
	RoleSearch,
	RoleEdit,
} from './components';

const routes = (
	<Route name="root" path="/" handler={App}>
		<Route name="login" handler={LoginPage}/>
		<Route name="logout" handler={LogoutPage}/>
		<Route name="dashboard" path="/" handler={Dashboard}>
			<Route name="user-search" path="/users" handler={UserSearch}/>
			<Route name="user-edit" path="/users/:id" handler={UserEdit}/>
			<Route name="role-search" path="/roles" handler={RoleSearch}/>
			<Route name="role-edit" path="/roles/:id" handler={RoleEdit}/>
		</Route>
	</Route>
);

Router.run(routes, Router.HashLocation, Root => {
	React.render(<Root/>, document.body);
});
