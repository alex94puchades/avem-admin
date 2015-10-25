import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Alert, ButtonInput} from 'react-bootstrap';
import {Navigation, State} from 'react-router';

import {UserService} from '../../../services';
import {MemberActions} from '../../../actions';
import MemberDataFields from './MemberDataFields';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
			users: null,
			memberData: {},
		};
	},
	
	componentDidMount: function() {
		MemberActions.createMember.failed.listen(this.onCreateMemberFailed);
		MemberActions.createMember.completed.listen(this.onCreateMemberCompleted);
		UserService.searchUsers({ email: '*' }).then(users => {
			this.setState({ users });
		});
	},
	
	onMemberDataChanged: function(memberData) {
		this.setState({ memberData });
	},
	
	onSubmitMemberData: function() {
		MemberActions.createMember(this.state.memberData);
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
					<ButtonInput type="submit"
					             bsStyle="primary"
					             value="Create member"
					/>
					<ButtonInput type="reset"
					             value="Reset fields"
					/>
				</form>
			</div>
		);
	},
});
