import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {ListenerMixin} from 'reflux';
import {ButtonLink} from 'react-router-bootstrap';
import {Input, Table, Button} from 'react-bootstrap';

import {UserStore} from '../../../stores';
import {UserActions} from '../../../actions';

export default React.createClass({
	mixins: [ListenerMixin],

	getInitialState: function() {
		return {
			query: '',
			users: [],
		};
	},

	componentDidMount: function() {
		this.listenTo(UserStore, this.onUsersChanged);
		UserActions.queryUsers('');
	},

	searchUsers: function() {
		UserActions.queryUsers(this.state.query);
	},

	onUsersChanged: function() {
		this.setState({ users: UserStore.users });
	},

	onQueryStringChanged: function(event) {
		let query = event.target.value;
		this.setState({ query });
	},

	onRemoveUser: function(userId) {
		UserActions.removeUser(userId);
	},

	render: function() {
		return (
			<div>
				<form onSubmit={this.searchUsers}>
					<Input type='text'
					       value={this.state.query}
					       placeholder='Search user'
					       onChange={this.onQueryStringChanged}
					/>
				</form>
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
								<td>{user.attributes.email}</td>
								<td>
									<Link to='role-edit'
									      params={{ id: user.role.id }}
									>{user.role.attributes.name}</Link>
								</td>
								<td>
									<ButtonLink bsStyle='link'
									            bsSize='xsmall'
									            to='user-edit'
									            params={{ id: user.id }}
									>Edit</ButtonLink>
									<Button bsStyle='link'
									        bsSize='xsmall'
									        onClick={this.onRemoveUser.bind(this, user.id)}
									>Remove</Button>
								</td>
							</tr>
					); }) }
					</tbody>
				</Table>
			</div>
		);
	},
});
