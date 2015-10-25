import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Alert, Input} from 'react-bootstrap';
import {Navigation, State} from 'react-router';

import MemberDataFields from './MemberDataFields';
import {MemberActions} from '../../../actions';
import {MemberService, UserService} from '../../../services';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
			users: null,
			memberData: null,
		};
	},
	
	componentDidMount: function() {
		let memberId = this.props.params.id;
		MemberActions.updateMember.failed.listen(this.onUpdateMemberFailed);
		MemberActions.updateMember.completed.listen(this.onUpdateMemberCompleted);
		UserService.searchUsers({ email: '*' }).then(users => {
			this.setState({ users });
		});
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
					<MemberDataFields users={this.state.users}
					                  key={ this.state.users &&
					                        this.state.memberData }
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
