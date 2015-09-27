import _ from 'lodash';
import Reflux from 'reflux';

import {UserService} from '../services';

const actions = Reflux.createActions({
	readUser: { asyncResult: true },
	createUser: { asyncResult: true },
	updateUser: { asyncResult: true },
	removeUser: { asyncResult: true },
	searchUsers: { asyncResult: true },
});

actions.readUser.listen(function(userId) {
	UserService.readUser(userId)
		.then(this.completed, this.failed);
});

actions.createUser.listen(function(userData) {
	UserService.createUser(userData)
		.then(this.completed, this.failed);
});

actions.updateUser.listen(function(userId, userData) {
	UserService.updateUser(userId, userData)
		.then(this.completed, this.failed);
});

actions.removeUser.listen(function(userId) {
	UserService.removeUser(userId)
		.then(this.completed, this.failed);
});

actions.searchUsers.listen(function(params, limit) {
	UserService.searchUsers(params, limit)
		.then(this.completed, this.failed);
});

export default actions;
