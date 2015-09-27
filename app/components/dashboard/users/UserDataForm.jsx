import React from 'react';
import {Input} from 'react-bootstrap';

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
		},
	},
	
	getInitialState: function() {
		return {
			data: {
				type: 'users',
				attributes: {
					email: this.props.email || '',
					password: this.props.password || '',
				},
				relationships: {
					role: this.props.role || null,
				},
			},
			availableRoles: null,
		};
	},
	
	componentDidMount: function() {
		RoleService.enumRoles().then(response => {
			this.setState({ availableRoles: response.data });
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
		_.set(data, 'relationships.role', newRole);
		this.setState({ data });
	},
	
	render: function() {
		return (
			<form onSubmit={this.props.onSendData}>
				<Input type="text"
				       label="Email"
				       onChange={this.onEmailChanged}
				       value={this.state.data.attributes.email}
				/>
				<Input type="password"
				       label="Password"
				       onChange={this.onPasswordChanged}
				       value={this.state.data.attributes.password}
				/>
				<Input type="select"
				       label="Role"
				       placeholder="Select role"
				       onChange={this.onRoleChanged}
				       disabled={!this.state.availableRoles}
				>
				{ _.map(this.state.availableRoles, (role, key) => {
					return (
						<option key={key}
						        value={role.id}
						>{role.name}</option>
					);
				}) }
				</Input>
			</form>
		);
	},
});
