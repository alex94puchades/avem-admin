import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Input, ButtonInput} from 'react-bootstrap';

export default React.createClass({
	propTypes: {
		memberData: React.PropTypes.object,
		onChange: React.PropTypes.func.isRequired,
		memberUsers: React.PropTypes.arrayOf(React.PropTypes.object),
	},
	
	getDefaultProps: function() {
		return {
			memberData: {
				user: null,
				gender: '',
				lastName: '',
				firstName: '',
				birthday: null,
				renewDate: null,
			},
			memberUsers: [],
		};
	},
	
	getInitialState: function() {
		let { user, firstName, lastName } = this.props.memberData || {};
		let { gender, birthday, renewDate } = this.props.memberData || {};
		return {
			data: {
				type: 'members',
				attributes: {
					user, gender, birthday,
					'last-name': lastName,
					'first-name': firstName,
					'renew-date': renewDate,
				},
				relationships: {
					user,
				},
			},
			setUserMethod: user ? 'select' : 'none',
		};
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
		let newGender = event.target.value;
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
	
	onSetUserMethodChanged: function(event) {
		this.setState({ setUserMethod: event.target.value });
	},
	
	render: function() {
		let memberData = this.state.data;
		let canAddUser = _.includes(this.props.privileges, 'user:add');
		let canEditMember = _.includes(this.props.privileges, 'member:edit');
		let canRenewMember = _.includes(this.props.privileges, 'member:renew');
		return (
			<div>
				<Input required
				       type="select"
				       label="User"
				       readOnly={!canEditMember}
				       value={this.state.setUserMethod}
				       onChange={this.onSetUserMethodChanged}
				>
					<option value="none">Do not associate user</option>
					<option value="select">Select existing user</option>
					{ canAddUser ?
						<option value="create">Create new user</option>
					: '' }
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
				<Input type="date"
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
