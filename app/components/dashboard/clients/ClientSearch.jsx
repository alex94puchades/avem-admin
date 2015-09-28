import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {ListenerMixin} from 'reflux';
import {ButtonLink} from 'react-router-bootstrap';
import {Alert, Button, ButtonGroup, Modal, Table} from 'react-bootstrap';

import {SearchBox} from '../../common';
import {ClientActions} from '../../../actions';
import {ClientSearchStore} from '../../../stores';

export default React.createClass({
	mixins: [ListenerMixin],

	getInitialState: function() {
		return {
			error: null,
			clients: [],
			removeClient: false,
		};
	},

	componentDidMount: function() {
		this.listenTo(ClientSearchStore, this.onClientsChanged);
		ClientActions.removeClient.failed.listen(this.onDoRemoveClientFailed);
		ClientActions.searchClients.failed.listen(this.onSearchClientsFailed);
		ClientActions.removeClient.completed.listen(this.onDoRemoveClientCompleted);
		ClientActions.searchClients({ name: '*' });
	},
	
	onSearchClients: function(params) {
		ClientActions.searchClients(params);
	},
	
	onSearchClientsFailed: function(error) {
		this.setState({ error });
	},

	onClientsChanged: function() {
		this.setState({ clients: ClientSearchStore.clients });
	},

	onRemoveClient: function(client) {
		this.setState({ removeClient: client });
	},
	
	onDoRemoveClient: function() {
		ClientActions.removeClient(this.state.removeClient.id);
	},
	
	onDoRemoveClientCompleted: function() {
		this.setState({ removeClient: false });
	},
	
	onDoRemoveClientFailed: function(error) {
		this.setState({ error });
	},
	
	onDoNotRemoveClient: function() {
		this.setState({ removeClient: false });
	},
	
	onDismissError: function() {
		this.setState({ error: null });
	},

	render: function() {
		let lastError = this.state.error;
		let canAddClient = _.includes(this.props.privileges, 'client:add');
		let canEditClient = _.includes(this.props.privileges, 'client:edit');
		let canRemoveClient = _.includes(this.props.privileges, 'client:remove');
		return (
			<div>
				<SearchBox ops={{ name: { multi: false, merge: 'append' },
				                  trusted: { multi: false, merge: 'replace' } }}
				           default="name" onSearch={this.onSearchClients}
				           placeholder='Client search, ie: "client.name.*"'
				/>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       onDismiss={this.onDismissError}
					>{lastError.message || 'Unknown error'}</Alert>
				: '' }
				<Table hover responsive>
					<thead>
						<tr>
							<th>Name</th>
							<th>Trusted</th>
							<th>Redirect URI</th>
						</tr>
					</thead>
					<tbody>
					{ _.map(this.state.clients, (client, index) => {
						return (
							<tr key={index}>
								<td>{client.name}</td>
								<td>
									{client.trusted ? 'true' : 'false'}
								</td>
								<td>{client.redirectUri || 'n/a'}</td>
								<td>
									<ButtonGroup fill>
										<ButtonLink bsSize="small"
										            to="client-edit"
										            disabled={!canEditClient}
										            params={{ id: client.id }}
										            query={{ return_to: 'client-search' }}
										>Edit</ButtonLink>
										<Button bsSize="small"
										        bsStyle="danger"
										        disabled={!canRemoveClient}
										        onClick={this.onRemoveClient.bind(this, client)}
										>Remove</Button>
									</ButtonGroup>
								</td>
							</tr>
						);
					}) }
					</tbody>
				</Table>
				<Modal show={!!this.state.removeClient}
				       onHide={this.onDoNotRemoveClient}
				>
					<Modal.Header>
						<Modal.Title>
							Remove client "{this.state.removeClient.name}"
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						This action cannot be undone. Removing a client has the
						potential of leaving you out of the administration page.
						Do you want to continue?
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="danger"
						        onClick={this.onDoRemoveClient}
						>Remove client</Button>
						<Button onClick={this.onDoNotRemoveClient}
						>Do not remove</Button>
					</Modal.Footer>
				</Modal>
				<ButtonLink to="client-new"
				            disabled={!canAddClient}
				            query={{ return_to: 'client-search' }}
				>Add new client</ButtonLink>
			</div>
		);
	},
});
