import React from 'react';
import {Input, ButtonInput} from 'react-bootstrap';

export default React.createClass({
	propTypes: {
		disabled: React.PropTypes.bool,
		memberData: React.PropTypes.object,
		showResetButton: React.PropTypes.bool,
		submitButtonText: React.PropTypes.string,
		onSubmitData: React.PropTypes.func.isRequired,
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
			disabled: false,
			showResetButton: true,
			submitButtonText: 'Save member',
		};
	},
	
	getInitialState: function() {
		let {user, firstName, lastName, gender, birthday, renewDate} = this.props.memberData || {};
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
		};
	},
	
	onFirstNameChanged: function(event) {
		let newFirstName = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.first-name', newFirstName);
		this.setState({ data });
	},
	
	onLastNameChanged: function(event) {
		let newLastName = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.last-name', newLastName);
		this.setState({ data });
	},
	
	onBirthdayChanged: function(event) {
		let newBirthday = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.birthday', newBirthday);
		this.setState({ data });
	},
	
	onGenderChanged: function(event) {
		let newGender = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.gender', newGender);
		this.setState({ data });
	},
	
	onRenewDateChanged: function(event) {
		let newRenewDate = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.renew-date', newRenewDate);
		this.setState({ data });
	},
	
	onSubmitForm: function(event) {
		event.preventDefault();
		this.props.onSubmitData(this.state.data);
	},
	
	render: function() {
		let canEditMember = _.includes(this.props.privileges, 'member:edit');
		let canRenewMember = _.includes(this.props.privileges, 'member:renew');
		return (
			<form onSubmit={this.onSubmitForm}>
				<Input type="text" required
				       label="First name"
				       readOnly={!canEditMember}
				       onChange={this.onFirstNameChanged}
				       value={this.state.data.attributes['first-name']}
				/>
				<Input type="text" required
				       label="Last name"
				       readOnly={!canEditMember}
				       onChange={this.onLastNameChanged}
				       value={this.state.data.attributes['last-name']}
				/>
				<Input type="date"
				       label="Birthday"
				       readOnly={!canEditMember}
				       onChange={this.onBirthdayChanged}
				       value={this.state.data.attributes.birthday}
				/>
				<Input type="select"
				       label="Gender"
				       readOnly={!canEditMember}
				       onChange={this.onGenderChanged}
				       value={this.state.data.attributes.gender}
				>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
				</Input>
				<Input type="date" required
				       label="Renew date"
				       onChange={this.onRenewDateChanged}
				       readOnly={!canEditMember || !canRenewMember}
				       value={this.state.data.attributes['renew-date']}
				/>
				{ canEditMember ? ([
					<ButtonInput key={0}
					             type="submit"
					             bsStyle="primary"
					             disabled={this.props.disabled}
					             value={this.props.submitButtonText}
					/>,
					this.props.showResetButton
						? <ButtonInput key={1} type="reset" value="Reset"/>
						: ''
				]) : '' }
			</form>
		);
	},
});
