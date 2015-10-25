import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Navigation, State} from 'react-router';
import {Alert, ButtonInput} from 'react-bootstrap';

import RoleDataFields from './RoleDataFields';
import {RoleActions} from '../../../actions';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
			roleData: {},
		};
	},
	
	componentDidMount: function() {
		RoleActions.createRole.failed.listen(this.onCreateRoleFailed);
		RoleActions.createRole.completed.listen(this.onCreateRoleCompleted);
	},
	
	onRoleDataChanged: function(roleData) {
		this.setState({ roleData });
	},
	
	onSubmitRoleData: function() {
		RoleActions.createRole(this.state.roleData);
	},
	
	onCreateRoleCompleted: function() {
		let returnTo = this.props.query['return_to'];
		if (returnTo)
			this.transitionTo(returnTo);
	},
	
	onCreateRoleFailed: function(error) {
		this.setState({ error });
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
					             value="Create role"
					/>
					<ButtonInput type="reset"
					             value="Reset fields"
					/>
				</form>
			</div>
		);
	},
});
