import React from 'react';
import {Navigation} from 'react-router';

import RoleDataForm from './RoleDataForm';
import {RoleActions} from '../../../actions';

export default React.createClass({
	mixins: [Navigation],
	
	getInitialState: function() {
		return {
			role: null,
		};
	},
	
	componentDidMount: function() {
		let roleId = this.props.params.id;
		RoleActions.readRole(roleId);
	},
	
	onReadRoleCompleted: function(role) {
		this.setState({ role });
	},
	
	onSubmitData: function(data) {
		let roleId = this.props.params.id;
		RoleActions.updateRole(roleId, data);
	},
	
	onUpdateRoleCompleted: function() {
		let returnTo = this.props.query['return_to'];
		if (returnTo)
			this.transitionTo(returnTo);
	},
	
	render: function() {
		return (
			<RoleDataForm showResetButton={true}
			              key={this.state.role}
			              roleData={this.state.role}
			              onSubmitData={this.onSubmitData}
			              privileges={this.props.privileges}
			              disabled={this.state.role !== null}
			/>
		);
	},
});
