import Reflux from 'reflux';

import {ActivityService} from '../services';

const actions = Reflux.createActions({
	readActivity: { asyncResult: true },
	createActivity: { asyncResult: true },
	updateActivity: { asyncResult: true },
	removeActivity: { asyncResult: true },
	searchActivities: { asyncResult: true },
});

actions.readActivity.listen(function(activityId) {
	ActivityService.readActivity(activityId)
		.then(this.completed, this.failed);
});

actions.createActivity.listen(function(activityData) {
	ActivityService.createActivity(activityData)
		.then(this.completed, this.failed);
});

actions.updateActivity.listen(function(activityId, activityData) {
	ActivityService.updateActivity(activityId, activityData)
		.then(this.completed, this.failed);
});

actions.removeActivity.listen(function(activityId) {
	ActivityService.removeActivity(activityId)
		.then(this.completed, this.failed);
});

actions.searchActivities.listen(function(params, limit) {
	ActivityService.searchActivities(params, limit)
		.then(this.completed, this.failed);
});

export default actions;
