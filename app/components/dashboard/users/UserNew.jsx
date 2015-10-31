import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {History} from 'react-router';
import {Alert, ButtonInput} from 'react-bootstrap';

import UserDataFields from './UserDataFields';
import {UserActions} from '../../../actions';
import {RoleService} from '../../../services';

export default React.createClass({
	mixins: [History],
	
	getInitialState: function() {
		return {
			error: null,
			roles: null,
			userData: {},
		};
	},
	
	componentDidMount: function() {
		UserActions.createUser.failed.listen(this.onCreateUserFailed);
		UserActions.createUser.completed.listen(this.onCreateUserCompleted);
		RoleService.searchRoles({ name: '*' }).then(roles => {
			this.setState({ roles });
		});
	},
	
	onUserDataChanged: function(userData) {
		this.setState({ userData });
	},
	
	onSubmitUserData: function() {
		UserActions.createUser(this.state.userData);
	},
	
	onCreateUserCompleted: function() {
		let returnTo = this.props.location.query['return_to'];
		this.props.history.pushState(null, returnTo || '/');
	},
	
	onCreateUserFailed: function(error) {
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
				<form onSubmit={this.onSubmitUserData}>
					<UserDataFields roles={this.state.roles}
					                key={ this.state.roles &&
					                      this.state.userData }
					                userData={this.state.userData}
					                onChange={this.onUserDataChanged}
					                privileges={this.props.privileges}
					/>
					<ButtonInput type="submit"
					             bsStyle="primary"
					             value="Create user"
					/>
					<ButtonInput type="reset"
					             value="Reset fields"
					/>
				</form>
			</div>
		);
	},
});
