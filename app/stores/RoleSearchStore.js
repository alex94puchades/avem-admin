import Reflux from 'reflux';

import {RoleActions} from '../actions';

export default Reflux.createStore({
	listenables: RoleActions,
	
	init: function() {
		this.params = {};
		this.roles = [];
	},
	
	onSearchRoles: function(params) {
		this.params = params;
	},
	
	onSearchRolesCompleted: function(roles) {
		this.roles = roles;
		this.trigger();
	},
	
	onCreateRoleCompleted: function(response) {
		RoleActions.searchRoles(this.params, this.roles.length);
	},
	
	onRemoveClientCompleted: function(response) {
		RoleActions.searchRoles(this.params, this.roles.length);
	},
});
