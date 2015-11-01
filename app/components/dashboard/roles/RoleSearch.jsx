import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {ListenerMixin} from 'reflux';
import {LinkContainer} from 'react-router-bootstrap';
import {Alert, Button, ButtonGroup, Modal} from 'react-bootstrap';

import {RoleActions} from '../../../actions';
import {RoleSearchStore} from '../../../stores';
import {DataView, SearchBox} from '../../common';
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
		let canAddRole = _.includes(this.props.privileges, 'role:add');
		let canEditRole = _.includes(this.props.privileges, 'role:edit');
		let canRemoveRole = _.includes(this.props.privileges, 'role:remove');
		return (
			<div>
				<SearchBox default="name" onSearch={this.onSearchRoles}
				           placeholder='Role search, ie: admin, guest...'
				           ops={{
				               name: { multi: false },
				               trusted: { multi: false }
				           }}
				/>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       onDismiss={this.onDismissError}
					>{this.state.error.message || 'Unknown error'}</Alert>
				: '' }
				<DataView key={this.state.roles}
				          data={this.state.roles}
				>
					<DataView.Headers>
						{ RoleDataView.Headers }
						<DataView.Header></DataView.Header>
					</DataView.Headers>
					<DataView.Each handler={ role => {
						return _.flatten([
							RoleDataView.Data(role),
							<DataView.Data>
								<ButtonGroup fill>
									<LinkContainer to={`/roles/${role.id}`}
									               query={{ return_to: '/roles' }}
									>
										<Button bsSize="small"
										        disabled={!canEditRole}
										>Edit</Button>
									</LinkContainer>
									<Button bsSize="small"
									        bsStyle="danger"
									        disabled={!canRemoveRole}
									        onClick={this.onRemoveRole.bind(this, role)}
									>Remove</Button>
								</ButtonGroup>
							</DataView.Data>,
						]);
					}}/>
				</DataView>
				<LinkContainer to="/roles/new"
				               query={{ return_to: '/roles' }}
				>
					<Button disabled={!canAddRole}>Add new role</Button>
				</LinkContainer>
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
