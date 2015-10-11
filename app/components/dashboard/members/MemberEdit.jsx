import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Alert} from 'react-bootstrap';
import {Navigation, State} from 'react-router';

import MemberDataForm from './MemberDataForm';
import {MemberActions} from '../../../actions';
import {MemberService} from '../../../services';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
			member: null,
		};
	},
	
	componentDidMount: function() {
		let memberId = this.props.params.id;
		MemberActions.updateUser.failed.listen(this.onUpdateMemberFailed);
		MemberActions.updateUser.completed.listen(this.onUpdateMemberCompleted);
		MemberService.readMember(memberId).then(response => {
			this.setState({ member: response.data });
		});
	},
	
	onSubmitData: function(memberData) {
		let memberId = this.props.params.id;
		MemberActions.updateMember(memberId, memberData);
	},
	
	onUpdateMemberCompleted: function() {
		let returnTo = this.props.query['return_to'];
		if (returnTo)
			this.transitionTo(returnTo);
	},
	
	onUpdateMemberFailed: function(error) {
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
				<MemberDataForm key={this.state.member}
					            showResetButton={false}
					            memberData={this.state.member}
					            onSubmitData={this.onSubmitData}
					            privileges={this.props.privileges}
					            disabled={this.state.member === null}
				/>
			</div>
		);
	},
});
