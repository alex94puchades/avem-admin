import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {History} from 'react-router';
import {Alert, ButtonInput} from 'react-bootstrap';

import ActivityDataFields from './ActivityDataFields';
import {ActivityActions} from '../../../actions';
import {ActivityService} from '../../../services';

export default React.createClass({
	mixins: [History],
	
	getInitialState: function() {
		return {
			error: null,
			activityData: null,
		};
	},
	
	componentDidMount: function() {
		let activityId = this.props.params.id;
		ActivityActions.updateActivity.failed.listen(this.onUpdateActivityFailed);
		ActivityActions.updateActivity.completed.listen(this.onUpdateActivityCompleted);
		ActivityService.readActivity(activityId).then(response => {
			this.setState({ activityData: response.data });
		});
	},
	
	onActivityDataChanged: function(activityData) {
		this.setState({ activityData });
	},
	
	onSubmitActivityData: function() {
		let activityId = this.props.params.id;
		ActivityActions.updateActivity(activityId, this.state.activityData);
	},
	
	onUpdateActivityCompleted: function() {
		let returnTo = this.props.location.query['return_to'];
		this.props.history.pushState(null, returnTo || '/');
	},
	
	onUpdateActivityFailed: function(error) {
		this.setState({ error });
	},
	
	onDismissError: function() {
		this.setState({ error: null });
	},
	
	render: function() {
		return (
			<div>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       onDismiss={this.onDismissError}
					>{ this.state.error.message || 'Unknown error' }</Alert>
				: '' }
				<form onSubmit={this.onSubmitActivityData}>
					<ActivityDataFields key={this.state.activityData}
					                    privileges={this.props.privileges}
					                    onChange={this.onActivityDataChanged}
					                    activityData={this.state.activityData}
					/>
					<ButtonInput type="submit"
					             bsStyle="primary"
					             value="Save activity"
					/>
				</form>
			</div>
		);
	},
});
