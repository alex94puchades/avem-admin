import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Input} from 'react-bootstrap';

export default React.createClass({
	propTypes: {
		userData: React.PropTypes.object,
		onChange: React.PropTypes.func.isRequired,
		roles: React.PropTypes.arrayOf(React.PropTypes.object),
	},
	
	getDefaultProps: function() {
		return {
			roles: [],
			userData: {
				role: null,
				email: null,
				password: null,
			},
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
					role,
				},
			},
		};
	},
	
	onEmailChanged: function(event) {
		let newEmail = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.email', newEmail);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onPasswordChanged: function(event) {
		let newPassword = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.password', newPassword);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onRoleChanged: function(event) {
		let newRole = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'relationships.role', {
			type: 'roles',
			id: newRole,
		});
		this.setState({ data });
		this.props.onChange(data);
	},
	
	render: function() {
		let userData = this.state.data;
		let canEditUser = _.includes(this.props.privileges, 'user:edit');
		return (
			<div>
				<Input type="text"
				       label="Email"
				       readOnly={!canEditUser}
				       onChange={this.onEmailChanged}
				       value={userData.attributes.email}
				/>
				<Input type="password"
				       label="Password"
				       readOnly={!canEditUser}
				       onChange={this.onPasswordChanged}
				       value={userData.attributes.password}
				/>
				<Input label="Role"
				       type="select"
				       readOnly={!canEditUser}
				       placeholder="Select role"
				       onChange={this.onRoleChanged}
				       value={_.get(userData.relationships.role, 'id')}
				>
				{ _.map(this.props.roles, role => {
					return (
						<option key={role.id}
						        value={role.id}
						>{role.name}</option>
					);
				}) }
				</Input>
			</div>
		);
	},
});
