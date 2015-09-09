import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {ListenerMixin} from 'reflux';
import {ButtonLink} from 'react-router-bootstrap';
import {Button, ButtonGroup, Modal, Table} from 'react-bootstrap';

import {SearchBox} from '../../common';
import {ClientActions} from '../../../actions';
import {ClientSearchStore} from '../../../stores';

export default React.createClass({
	mixins: [ListenerMixin],

	getInitialState: function() {
		return {
			clients: [],
			removeClient: false,
		};
	},

	componentDidMount: function() {
		this.listenTo(ClientSearchStore, this.onClientsChanged);
		ClientActions.searchClients({ name: '*' });
	},

	onClientsChanged: function() {
		this.setState({ clients: ClientSearchStore.clients });
	},

	onRemoveClient: function(client) {
		this.setState({ removeClient: client });
	},

	onDoRemoveClient: function() {
		ClientActions.removeClient(this.state.removeClient.id);
		this.setState({ removeClient: false });
	},

	onDoNotRemoveClient: function() {
		this.setState({ removeClient: false });
	},

	onSearchClients: function(params) {
		ClientActions.searchClients(params);
	},

	render: function() {
		return (
			<div>
				<SearchBox default="name"
				           onSearch={this.onSearchClients}
				           ops={{ name: { multi: false },
				                  trusted: { multi: false } }}
				/>
				<Table hover responsive>
					<thead>
						<tr>
							<th>Name</th>
							<th>Trusted</th>
							<th>Redirect URI</th>
							<th>Actions</th>
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
								<td>{client.redirectUri}</td>
								<td>
									<ButtonGroup fill>
										<ButtonLink bsSize="small"
										            to="client-edit"
										            params={{ id: client.id }}
										>Edit</ButtonLink>
										<Button bsSize="small"
										        bsStyle="danger"
										        onClick={this.onRemoveClient.bind(this, client)}
										>Remove</Button>
									</ButtonGroup>
								</td>
							</tr>
						);
					}) }
					</tbody>
				</Table>
				<Modal show={this.state.removeClient != false}
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
			</div>
		);
	},
});
