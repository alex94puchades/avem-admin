import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Alert} from 'react-bootstrap';
import {Navigation, State} from 'react-router';

import UserDataForm from './UserDataForm';
import {UserActions} from '../../../actions';
import {UserService} from '../../../services';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			user: null,
			error: null,
		};
	},
	
	componentDidMount: function() {
		let userId = this.props.params.id;
		UserActions.updateUser.failed.listen(this.onUpdateUserFailed);
		UserActions.updateUser.completed.listen(this.onUpdateUserCompleted);
		UserService.readUser(userId).then(response => {
			this.setState({ user: response.data });
		});
	},
	
	onSubmitData: function(userData) {
		let userId = this.props.params.id;
		UserActions.updateUser(userId, userData);
	},
	
	onUpdateUserCompleted: function() {
		let returnTo = this.props.query['return_to'];
		if (returnTo)
			this.transitionTo(returnTo);
	},
	
	onUpdateUserFailed: function(error) {
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
					>{ lastError.message || 'Unknown error' }</Alert>
				: '' }
				<UserDataForm key={this.state.user}
					          showResetButton={false}
					          userData={this.state.user}
					          onSubmitData={this.onSubmitData}
					          privileges={this.props.privileges}
					          disabled={this.state.user === null}
				/>
			</div>
		);
	},
});
