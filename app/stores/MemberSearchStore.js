import Reflux from 'reflux';

import {MemberActions} from '../actions';

export default Reflux.createStore({
	listenables: MemberActions,
	
	init: function() {
		this.params = {};
		this.members = [];
	},
	
	onSearchMembers: function(params) {
		this.params = params;
	},
	
	onSearchMembersCompleted: function(members) {
		this.members = members;
		this.trigger();
	},
	
	onCreateMemberCompleted: function(response) {
		MemberActions.searchMembers(this.params, this.members.length);
	},
	
	onRemoveMemberCompleted: function(response) {
		MemberActions.searchMembers(this.params, this.members.length);
	},
});
