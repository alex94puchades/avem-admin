import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {ListenerMixin} from 'reflux';
import {ButtonLink} from 'react-router-bootstrap';
import {Alert, Button, ButtonGroup, Modal, Table} from 'react-bootstrap';

import {SearchBox} from '../../common';
import {UserActions} from '../../../actions';
import {UserSearchStore} from '../../../stores';

export default React.createClass({
	mixins: [ListenerMixin],

	getInitialState: function() {
		return {
			users: [],
			error: null,
			removeUser: false,
		};
	},

	componentDidMount: function() {
		this.listenTo(UserSearchStore, this.onUsersChanged);
		UserActions.removeUser.failed.listen(this.onDoRemoveUserFailed);
		UserActions.searchUsers.failed.listen(this.onSearchUsersFailed);
		UserActions.removeUser.completed.listen(this.onDoRemoveUserCompleted);
		UserActions.searchUsers({ email: '*' });
	},
	
	onSearchUsers: function(params) {
		UserActions.searchUsers(params);
	},
	
	onSearchUsersFailed: function(error) {
		this.setState({ error });
	},

	onUsersChanged: function() {
		this.setState({ users: UserSearchStore.users });
	},
	
	onRemoveUser: function(user) {
		this.setState({ removeUser: user });
	},
	
	onDoRemoveUser: function() {
		UserActions.removeUser(this.state.removeUser.id);
	},
	
	onDoRemoveUserCompleted: function() {
		this.setState({ removeUser: false });
	},

	onDoRemoveUserFailed: function(error) {
		this.setState({ error });
	},
	
	onDoNotRemoveUser: function() {
		this.setState({ removeUser: null });
	},
	
	onDismissError: function() {
		this.setState({ error: null });
	},

	render: function() {
		let canAddUser = _.includes(this.props.privileges, 'user:add');
		let canEditUser = _.includes(this.props.privileges, 'user:edit');
		let canRemoveUser = _.includes(this.props.privileges, 'user:remove');
		return (
			<div>
				<SearchBox ops={{ role: { multi: false, merge: 'replace' },
				                  email: { multi: false, merge: 'append' } }}
				           default="email" onSearch={this.onSearchUsers}
				           placeholder='User search, ie: "user.email@domain.com"'
				/>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       dismissAfter={3000}
					       onDismiss={this.onDismissError}
					>{lastError.message || 'Unknown error'}</Alert>
				: '' }
				<Table hover responsive>
					<thead>
						<tr>
							<th>Email</th>
							<th>Role</th>
						</tr>
					</thead>
					<tbody>
					{ _.map(this.state.users, (user, index) => {
						return (
							<tr key={index}>
								<td>{user.email}</td>
								<td>
									<Link to='role-edit'
									      params={{ id: user.role.id }}
									>{user.role.name}</Link>
								</td>
								<td>
									<ButtonGroup fill>
										<ButtonLink bsSize='small'
											        to='user-edit'
											        disabled={!canEditUser}
											        params={{ id: user.id }}
											        query={{ return_to: 'user-search' }}
										>Edit</ButtonLink>
										<Button bsSize="small"
											    bsStyle="danger"
											    disabled={!canRemoveUser}
											    onClick={this.onRemoveUser.bind(this, user)}
										>Remove</Button>
									</ButtonGroup>
								</td>
							</tr>
					); }) }
					</tbody>
				</Table>
				<Modal show={!!this.state.removeUser}
				       onHide={this.onDoNotRemoveUser}
				>
					<Modal.Header>
						<Modal.Title>
							Remove user "{this.state.removeUser.email}"
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						This action cannot be undone. Do you want to continue?
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="danger"
						        onClick={this.onDoRemoveUser}
						>Remove user</Button>
						<Button onClick={this.onDoNotRemoveUser}
						>Do not remove</Button>
					</Modal.Footer>
				</Modal>
				<ButtonLink to="user-new"
				            disabled={!canAddUser}
				            query={{ return_to: 'user-search' }}
				>Add new user</ButtonLink>
			</div>
		);
	},
});
