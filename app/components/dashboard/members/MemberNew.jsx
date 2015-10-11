import React from 'react';
import {Alert} from 'react-bootstrap';
import {Navigation, State} from 'react-router';

import MemberDataForm from './MemberDataForm';
import {MemberActions} from '../../../actions';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
		};
	},
	
	componentDidMount: function() {
		MemberActions.createMember.completed.listen(this.onCreateMemberCompleted);
		MemberActions.createMember.failed.listen(this.onCreateMemberFailed);
	},
	
	onSubmitData: function(memberData) {
		MemberActions.createMember(memberData);
	},
	
	onCreateMemberCompleted: function() {
		let returnTo = this.props.query['return_to'];
		if (returnTo)
			this.transitionTo(returnTo);
	},
	
	onCreateMemberFailed: function(error) {
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
				<MemberDataForm showResetButton={true}
				                onSubmitData={this.onSubmitData}
				                privileges={this.props.privileges}
				/>
			</div>
		);
	},
});
