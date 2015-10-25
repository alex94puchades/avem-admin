import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Alert, Input} from 'react-bootstrap';
import {Navigation, State} from 'react-router';

import {MemberActions} from '../../../actions';
import {MemberService} from '../../../services';
import MemberDataFields from './MemberDataFields';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
			memberData: null,
		};
	},
	
	componentDidMount: function() {
		let memberId = this.props.params.id;
		MemberActions.updateUser.failed.listen(this.onUpdateMemberFailed);
		MemberActions.updateUser.completed.listen(this.onUpdateMemberCompleted);
		MemberService.readMember(memberId).then(response => {
			this.setState({ memberData: response.data });
		});
	},
	
	onMemberDataChanged: function(memberData) {
		this.setState({ memberData });
	},
	
	onSubmitMemberData: function() {
		let memberId = this.props.params.id;
		MemberActions.updateMember(memberId, this.state.memberData);
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
		return (
			<div>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       onDismiss={this.onDismissError}
					>{ this.state.error.message || 'Unknown error' }</Alert>
				: '' }
				<form onSubmit={this.onSubmitMemberData}>
					<MemberDataFields key={this.state.memberData}
					                  privileges={this.props.privileges}
					                  memberData={this.state.memberData}
					                  onChange={this.onMemberDataChanged}
					/>
					<Input type="submit"
					       bsStyle="primary"
					       value="Save member"
					/>
				</form>
			</div>
		);
	},
});
