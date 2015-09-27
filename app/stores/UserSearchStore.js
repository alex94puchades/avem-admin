import Reflux from 'reflux';

import {UserActions} from '../actions';

export default Reflux.createStore({
	listenables: UserActions,
	
	init: function() {
		this.params = {};
		this.users = [];
	},
	
	onSearchUsers: function(params) {
		this.params = params;
	},
	
	onSearchUsersCompleted: function(users) {
		this.users = users;
		this.trigger();
	},
	
	onCreateUserCompleted: function(response) {
		UserActions.searchUsers(this.params, this.users.length);
	},
	
	onRemoveUserCompleted: function(response) {
		UserActions.searchUsers(this.params, this.users.length);
	},
});
