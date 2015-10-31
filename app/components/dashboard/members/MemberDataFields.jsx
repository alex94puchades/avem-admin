import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Input, Collapse} from 'react-bootstrap';

import UserSearch from '../users/UserSearch';

export default React.createClass({
	propTypes: {
		memberData: React.PropTypes.object,
		onChange: React.PropTypes.func.isRequired,
		users: React.PropTypes.arrayOf(React.PropTypes.object),
	},
	
	getDefaultProps: function() {
		return {
			users: [],
			memberData: {
				user: null,
				gender: null,
				lastName: '',
				firstName: '',
				birthday: null,
				renewDate: null,
			},
		};
	},
	
	getInitialState: function() {
		let { user, firstName, lastName } = this.props.memberData || {};
		let { gender, birthday, renewDate } = this.props.memberData || {};
		return {
			data: {
				type: 'members',
				attributes: {
					gender, birthday,
					'last-name': lastName,
					'first-name': firstName,
					'renew-date': renewDate,
				},
				relationships: {
					user,
				},
			},
			memberUserAction: user ? 'choose' : 'none',
		};
	},
	
	onUserChanged: function(event) {
		let newUser = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'relationships.user', newUser ? {
			type: 'users', id: newUser
		} : null);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onFirstNameChanged: function(event) {
		let newFirstName = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.first-name', newFirstName);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onLastNameChanged: function(event) {
		let newLastName = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.last-name', newLastName);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onBirthdayChanged: function(event) {
		let newBirthday = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.birthday', newBirthday);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onGenderChanged: function(event) {
		let newGender = event.target.value || null;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.gender', newGender);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onRenewDateChanged: function(event) {
		let newRenewDate = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.renew-date', newRenewDate);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	render: function() {
		let memberData = this.state.data;
		let {memberUserAction} = this.state;
		let canEditMember = _.includes(this.props.privileges, 'member:edit');
		let canRenewMember = _.includes(this.props.privileges, 'member:renew');
		return (
			<div>
				<Input required
				       label="User"
				       type="select"
				       readOnly={!canEditMember}
				       onChange={this.onUserChanged}
				       value={_.get(memberData.relationships.user, 'id')}
				>
					<option value="">n/a</option>
					{ _.map(this.props.users, user => {
						return (
							<option key={user.id}
							        value={user.id}
							>{user.email}</option>
						);
					}) }
				</Input>
				<Input required
				       type="text"
				       label="First name"
				       readOnly={!canEditMember}
				       onChange={this.onFirstNameChanged}
				       value={memberData.attributes['first-name']}
				/>
				<Input required
				       type="text"
				       label="Last name"
				       readOnly={!canEditMember}
				       onChange={this.onLastNameChanged}
				       value={memberData.attributes['last-name']}
				/>
				<Input disabled
				       type="date"
				       label="Birthday"
				       readOnly={!canEditMember}
				       onChange={this.onBirthdayChanged}
				       value={memberData.attributes.birthday}
				/>
				<Input type="select"
				       label="Gender"
				       readOnly={!canEditMember}
				       onChange={this.onGenderChanged}
				       value={memberData.attributes.gender}
				>
					<option value=''>n/a</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
				</Input>
				<Input type="date"
				       label="Renew date"
				       onChange={this.onRenewDateChanged}
				       value={memberData.attributes['renew-date']}
				       readOnly={!canEditMember || !canRenewMember}
				/>
			</div>
		);
	},
});
