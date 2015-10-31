import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {History} from 'react-router';
import {Alert, ButtonInput} from 'react-bootstrap';

import UserDataFields from './UserDataFields';
import {UserActions} from '../../../actions';
import {UserService, RoleService} from '../../../services';

export default React.createClass({
	mixins: [History],
	
	getInitialState: function() {
		return {
			error: null,
			roles: null,
			userData: null,
		};
	},
	
	componentDidMount: function() {
		let userId = this.props.params.id;
		UserActions.updateUser.failed.listen(this.onUpdateUserFailed);
		UserActions.updateUser.completed.listen(this.onUpdateUserCompleted);
		UserService.readUser(userId).then(response => {
			this.setState({ userData: response.data });
		});
		RoleService.searchRoles({ name: '*' }).then(roles => {
			this.setState({ roles });
		});
	},
	
	onUserDataChanged: function(userData) {
		this.setState({ userData });
	},
	
	onSubmitUserData: function() {
		let userId = this.props.params.id;
		UserActions.updateUser(userId, this.state.userData);
	},
	
	onUpdateUserCompleted: function() {
		let returnTo = this.props.location.query['return_to'];
		this.props.history.pushState(null, returnTo || '/');
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
				<form onSubmit={this.onSubmitUserData}>
					<UserDataFields key={ this.state.roles &&
					                      this.state.userData }
					                roles={this.state.roles}
					                userData={this.state.userData}
					                onChange={this.onUserDataChanged}
					                privileges={this.props.privileges}
					/>
					<ButtonInput type="submit"
					             bsStyle="primary"
					             value="Save user"
					/>
				</form>
			</div>
		);
	},
});
