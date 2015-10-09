import React from 'react';
import {Input, ButtonInput} from 'react-bootstrap';

import {RoleService} from '../../../services';

export default React.createClass({
	propTypes: {
		disabled: React.PropTypes.bool,
		userData: React.PropTypes.object,
		showResetButton: React.PropTypes.bool,
		submitButtonText: React.PropTypes.string,
		onSubmitData: React.PropTypes.func.isRequired,
	},
	
	getDefaultProps: function() {
		return {
			userData: {
				role: null,
				email: null,
				password: null,
			},
			disabled: false,
			showResetButton: true,
			submitButtonText: 'Save user',
		};
	},
	
	getInitialState: function() {
		let {email, password, role} = this.props.userData || {};
		return {
			data: {
				type: 'users',
				attributes: {
					email, password,
				},
				relationships: {
					role: {
						id: role,
						type: 'roles',
					},
				},
			},
			availableRoles: null,
		};
	},
	
	componentDidMount: function() {
		RoleService.searchRoles({ name: '*' }).then(roles => {
			this.setState({ availableRoles: roles });
		});
	},
	
	onEmailChanged: function(event) {
		let newEmail = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.email', newEmail);
		this.setState({ data });
	},
	
	onPasswordChanged: function(event) {
		let newPassword = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.password', newPassword);
		this.setState({ data });
	},
	
	onRoleChanged: function(event) {
		let newRole = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'relationships.role.id', newRole);
		this.setState({ data });
	},
	
	onSubmitForm: function(event) {
		event.preventDefault();
		this.props.onSubmitData(this.state.data);
	},
	
	render: function() {
		let canEditUser = _.includes(this.props.privileges, 'user:edit');
		return (
			<form onSubmit={this.onSubmitForm}>
				<Input type="text"
				       label="Email"
				       readOnly={!canEditUser}
				       onChange={this.onEmailChanged}
				       value={this.state.data.attributes.email}
				/>
				<Input type="password"
				       label="Password"
				       readOnly={!canEditUser}
				       onChange={this.onPasswordChanged}
				       value={this.state.data.attributes.password}
				/>
				<Input label="Role"
				       type="select"
				       readOnly={!canEditUser}
				       placeholder="Select role"
				       onChange={this.onRoleChanged}
				>
				{ _.map(this.state.availableRoles, (role, key) => {
					return (
						<option key={key}
						        value={role.id}
						>{role.name}</option>
					);
				}) }
				</Input>
				{ canEditUser ? ([
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
