import _ from 'lodash';
import Reflux from 'reflux';

import {RoleService} from '../services';

const actions = Reflux.createActions({
	readRole: { asyncResult: true },
	createRole: { asyncResult: true },
	updateRole: { asyncResult: true },
	removeRole: { asyncResult: true },
	searchRoles: { asyncResult: true },
});

actions.readRole.listen(function(roleId) {
	RoleService.readRole(roleId)
		.then(this.completed, this.failed);
});

actions.createRole.listen(function(roleData) {
	RoleService.createRole(roleData)
		.then(this.completed, this.failed);
});

actions.updateRole.listen(function(roleId, roleData) {
	RoleService.updateRole(roleId, roleData)
		.then(this.completed, this.failed);
});

actions.removeRole.listen(function(roleId) {
	RoleService.removeRole(roleId)
		.then(this.completed, this.failed);
});

actions.searchRoles.listen(function(params, limit) {
	RoleService.searchRoles(params, limit)
		.then(this.completed, this.failed);
});

export default actions;
