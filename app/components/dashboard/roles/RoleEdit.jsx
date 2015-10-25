import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Navigation, State} from 'react-router';
import {Alert, ButtonInput} from 'react-bootstrap';

import RoleDataFields from './RoleDataFields';
import {RoleActions} from '../../../actions';
import {RoleService} from '../../../services';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
			roleData: null,
		};
	},
	
	componentDidMount: function() {
		let roleId = this.props.params.id;
		RoleActions.updateRole.failed.listen(this.onUpdateRoleFailed);
		RoleActions.updateRole.completed.listen(this.onUpdateRoleCompleted);
		RoleService.readRole(roleId).then(response => {
			this.setState({ roleData: response.data });
		});
	},
	
	onRoleDataChanged: function(roleData) {
		this.setState({ roleData });
	},
	
	onSubmitRoleData: function() {
		let roleId = this.props.params.id;
		RoleActions.updateRole(roleId, this.state.roleData);
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
		return (
			<div>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       onDismiss={this.onDismissError}
					>{ this.state.error.message || 'Unknown error' }</Alert>
				: '' }
				<form onSubmit={this.onSubmitRoleData}>
					<RoleDataFields key={this.state.roleData}
					                roleData={this.state.roleData}
					                onChange={this.onRoleDataChanged}
					                privileges={this.props.privileges}
					/>
					<ButtonInput type="submit"
					             bsStyle="primary"
					             value="Save role"
					/>
				</form>
			</div>
		);
	},
});
