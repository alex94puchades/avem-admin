import React from 'react';
import {Navigation, State} from 'react-router';

import RoleDataForm from './RoleDataForm';
import {RoleActions} from '../../../actions';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
		};
	},
	
	componentDidMount: function() {
		RoleActions.createRole.failed.listen(this.onCreateRoleFailed);
		RoleActions.createRole.completed.listen(this.onCreateRoleCompleted);
	},
	
	onSubmitData: function(data) {
		RoleActions.createRole(data);
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
					>{lastError.message || 'Unknown error'}</Alert>
				: '' }
				<RoleDataForm showResetButton={true}
					          onSubmitData={this.onSubmitData}
					          privileges={this.props.privileges}
				/>
			</div>
		);
	},
});
