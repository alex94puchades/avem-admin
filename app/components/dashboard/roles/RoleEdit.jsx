import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Alert} from 'react-bootstrap';
import {Navigation, State} from 'react-router';

import RoleDataForm from './RoleDataForm';
import {RoleActions} from '../../../actions';
import {RoleService} from '../../../services';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			role: null,
			error: null,
		};
	},
	
	componentDidMount: function() {
		let roleId = this.props.params.id;
		RoleActions.updateRole.failed.listen(this.onUpdateRoleFailed);
		RoleActions.updateRole.completed.listen(this.onUpdateRoleCompleted);
		RoleService.readRole(roleId).then(response => {
			this.setState({ role: response.data });
		});
	},
	
	onSubmitData: function(roleData) {
		let roleId = this.props.params.id;
		RoleActions.updateRole(roleId, roleData);
	},
	
	onUpdateRoleCompleted: function() {
		let returnTo = this.props.query['return_to'];
		if (returnTo)
			this.transitionTo(returnTo);
	},
	
	onUpdateRoleFailed: function(error) {
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
				<RoleDataForm key={this.state.role}
					          showResetButton={false}
					          roleData={this.state.role}
					          onSubmitData={this.onSubmitData}
					          privileges={this.props.privileges}
					          disabled={this.state.role === null}
				/>
			</div>
		);
	},
});
