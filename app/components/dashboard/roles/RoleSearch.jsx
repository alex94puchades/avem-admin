import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {ListenerMixin} from 'reflux';
import {ButtonLink} from 'react-router-bootstrap';
import {Alert, Button, ButtonGroup, Modal, Table} from 'react-bootstrap';

import {SearchBox} from '../../common';
import {RoleActions} from '../../../actions';
import {RoleSearchStore} from '../../../stores';
import RoleDataView from './RoleDataView';

export default React.createClass({
	mixins: [ListenerMixin],

	getInitialState: function() {
		return {
			roles: [],
			error: null,
			removeRole: false,
		};
	},

	componentDidMount: function() {
		this.listenTo(RoleSearchStore, this.onRolesChanged);
		RoleActions.searchRoles.failed.listen(this.onSearchRolesFailed);
		RoleActions.removeRole.failed.listen(this.onDoRemoveRoleFailed);
		RoleActions.removeRole.completed.listen(this.onDoRemoveRoleCompleted);
		RoleActions.searchRoles({ name: '*' });
	},
	
	onSearchRoles: function(params) {
		RoleActions.searchRoles(params);
	},
	
	onSearchRolesFailed: function(error) {
		this.setState({ error });
	},

	onRolesChanged: function() {
		this.setState({ roles: RoleSearchStore.roles });
	},

	onRemoveRole: function(role) {
		this.setState({ removeRole: role });
	},

	onDoRemoveRole: function() {
		RoleActions.removeRole(this.state.removeRole.id);
	},
	
	onDoRemoveRoleCompleted: function() {
		this.setState({ removeRole: false });
	},
	
	onDoRemoveRoleFailed: function(error) {
		this.setState({ error });
	},

	onDoNotRemoveRole: function() {
		this.setState({ removeRole: false });
	},
	
	onDismissError: function() {
		this.setState({ error: null });
	},

	render: function() {
		let lastError = this.state.error;
		let canAddRole = _.includes(this.props.privileges, 'role:add');
		let canEditRole = _.includes(this.props.privileges, 'role:edit');
		let canRemoveRole = _.includes(this.props.privileges, 'role:remove');
		return (
			<div>
				<SearchBox ops={{ name: { multi: false },
				                  trusted: { multi: false } }}
				           default="name" onSearch={this.onSearchRoles}
				           placeholder='Role search, ie: admin, guest...'
				/>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       onDismiss={this.onDismissError}
					>{lastError.message || 'Unknown error'}</Alert>
				: '' }
				<RoleDataView key={this.state.roles}
				              roles={this.state.roles}
				              appendData={ (role) => {
					return (
						<ButtonGroup fill>
							<ButtonLink bsSize="small"
							            to="role-edit"
							            disabled={!canEditRole}
							            params={{ id: role.id }}
							            query={{ 'return_to': 'role-search' }}
							>Edit</ButtonLink>
							<Button bsSize="small"
							        bsStyle="danger"
							        disabled={!canRemoveRole}
							        onClick={this.onRemoveRole.bind(this, role)}
							>Remove</Button>
						</ButtonGroup>
					);
				}} />
				<ButtonLink to="role-new"
				            disabled={!canAddRole}
				            query={{ return_to: 'role-search' }}
				>Add new role</ButtonLink>
				<Modal show={!!this.state.removeRole}
				       onHide={this.onDoNotRemoveRole}
				>
					<Modal.Header>
						<Modal.Title>
							Remove role "{this.state.removeRole.name}"
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						This action cannot be undone. Removing a role can also
						potentially corrupt the database. Do you want to
						continue?
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="danger"
						        onClick={this.onDoRemoveRole}
						>Remove role</Button>
						<Button onClick={this.onDoNotRemoveRole}
						>Do not remove</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	},
});
