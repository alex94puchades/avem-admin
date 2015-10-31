import Reflux from 'reflux';

import {ActivityActions} from '../actions';

export default Reflux.createStore({
	listenables: ActivityActions,
	
	init: function() {
		this.params = {};
		this.activities = [];
	},
	
	onSearchActivities: function(params) {
		this.params = params;
	},
	
	onSearchActivitiesCompleted: function(activities) {
		this.activities = activities;
		this.trigger();
	},
	
	onCreateActivityCompleted: function(response) {
		ActivityActions.searchActivities(this.params, this.activities.length);
	},
	
	onRemoveActivityCompleted: function(response) {
		ActivityActions.searchActivities(this.params, this.activities.length);
	},
});
