import React from 'react';
import {Alert} from 'react-bootstrap';
import {Navigation, State} from 'react-router';

import UserDataForm from './UserDataForm';
import {UserActions} from '../../../actions';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
		};
	},
	
	componentDidMount: function() {
		UserActions.createUser.completed.listen(this.onCreateUserCompleted);
		UserActions.createUser.failed.listen(this.onCreateUserFailed);
	},
	
	onSubmitData: function(userData) {
		UserActions.createUser(userData);
	},
	
	onCreateUserCompleted: function() {
		let returnTo = this.props.query['return_to'];
		if (returnTo)
			this.transitionTo(returnTo);
	},
	
	onCreateUserFailed: function(error) {
		this.setState({ error });
	},
	
	onDismissError: function() {
		this.setState({ error: null });
	},
	
	render: function() {
		let lastError = this.state.error;
		return (
			<div>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       onDismiss={this.onDismissError}
					>{lastError.message || 'Unknown error'}</Alert>
				: '' }
				<UserDataForm showResetButton={true}
				              onSubmitData={this.onSubmitData}
				              privileges={this.props.privileges}
				/>
			</div>
		);
	},
});
