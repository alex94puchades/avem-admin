import React from 'react';
import {Input} from 'react-bootstrap';

import {RoleService} from '../../../services';

export default React.createClass({
	getInitialState: function() {
		return {
			user: {
				role: this.props.role || null,
				email: this.props.email || '',
				password: this.props.password || '',
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
		this.setState({
			user: {
				attributes: {
					email: event.target.value,
				},
			},
		});
	},
	
	onPasswordChanged: function(target) {
		this.setState({
			user: {
				attributes: {
					password: event.target.value,
				},
			},
		});
	},
	
	onRoleChanged: function(target) {
		this.setState({
			role: {
				attributes: {
					role: event.target.value,
				},
			},
		});
	},
	
	render: function() {
		return (
			<form onSubmit={this.props.onSendData}>
				<Input type="text"
				       label="Email"
				       value={this.state.user.email}
				       onChange={this.onEmailChanged}
				/>
				<Input type="password"
				       label="Password"
				       value={this.state.user.password}
				       onChange={this.onPasswordChanged}
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
