import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {ListenerMixin} from 'reflux';
import {LinkContainer} from 'react-router-bootstrap';
import {Alert, Button, ButtonGroup, Modal, Table} from 'react-bootstrap';

import {ClientActions} from '../../../actions';
import {ClientSearchStore} from '../../../stores';
import {DataView, SearchBox} from '../../common';
import ClientDataView from './ClientDataView';

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
		let canAddClient = _.includes(this.props.privileges, 'client:add');
		let canEditClient = _.includes(this.props.privileges, 'client:edit');
		let canRemoveClient = _.includes(this.props.privileges, 'client:remove');
		console
		return (
			<div>
				<SearchBox default="name"
				           onSearch={this.onSearchClients}
				           placeholder='Client search, ie: "client.name.*"'
				           ops={{
				               name: { multi: false, merge: 'append' },
				               trusted: { multi: false, merge: 'replace' },
				           }}
				/>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       onDismiss={this.onDismissError}
					>{ this.state.error.message || 'Unknown error' }</Alert>
				: '' }
				<DataView key={this.state.clients}
				          data={this.state.clients}
				>
					<DataView.Headers>
						<ClientDataView.Headers/>
						<DataView.Header></DataView.Header>
					</DataView.Headers>
					<DataView.Each handler={client => {
						return (
							<div>
								<ClientDataView.Data model={client}/>
								<DataView.Data>
									<ButtonGroup fill>
										<LinkContainer to={`/clients/${client.id}`}
										               query={{ return_to: '/clients' }}
										>
											<Button bsSize="small"
											        disabled={!canEditClient}
											>Edit</Button>
										</LinkContainer>
										<Button bsSize="small"
										        bsStyle="danger"
										        disabled={!canRemoveClient}
										        onClick={this.onRemoveClient.bind(this, client)}
										>Remove</Button>
									</ButtonGroup>
								</DataView.Data>
							</div>
						);
					}}/>
				</DataView>
				<LinkContainer to="/clients/new"
				               query={{ return_to: '/clients' }}
				>
					<Button disabled={!canAddClient}>Add new client</Button>
				</LinkContainer>
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
			</div>
		);
	},
});
