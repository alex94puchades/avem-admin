import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {History} from 'react-router';
import {Alert, ButtonInput} from 'react-bootstrap';

import {ActivityActions} from '../../../actions';
import ActivityDataFields from './ActivityDataFields';

export default React.createClass({
	mixins: [History],
	
	getInitialState: function() {
		return {
			error: null,
			activityData: {},
		};
	},
	
	componentDidMount: function() {
		ActivityActions.createActivity.failed.listen(this.onCreateActivityFailed);
		ActivityActions.createActivity.completed.listen(this.onCreateActivityCompleted);
	},
	
	onActivityDataChanged: function(activityData) {
		this.setState({ activityData });
	},
	
	onSubmitActivityData: function() {
		ActivityActions.createActivity(this.state.activityData);
	},
	
	onCreateActivityCompleted: function() {
		let returnTo = this.props.location.query['return_to'];
		this.props.history.pushState(null, returnTo || '/');
	},
	
	onCreateActivityFailed: function(error) {
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
					             value="Create activity"
					/>
					<ButtonInput type="reset"
					             value="Reset fields"
					/>
				</form>
			</div>
		);
	},
});
