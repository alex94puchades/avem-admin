import React from 'react';
import {Navigation} from 'react-router';

import RoleDataForm from './RoleDataForm';
import {RoleActions} from '../../../actions';

export default React.createClass({
	mixins: [Navigation],
	
	onSubmitData: function(data) {
		RoleActions.createRole(data);
	},
	
	onCreateRoleCompleted: function() {
		let returnTo = this.props.query['return_to'];
		if (returnTo)
			this.transitionTo(returnTo);
	},
	
	render: function() {
		return (
			<RoleDataForm showResetButton={true}
			              onSubmitData={this.onSubmitData}
			              privileges={this.props.privileges}
			/>
		);
	},
});
