import Reflux from 'reflux';

import {ClientService} from '../services';

const actions = Reflux.createActions({
	readClient: { asyncResult: true },
	createClient: { asyncResult: true },
	updateClient: { asyncResult: true },
	removeClient: { asyncResult: true },
	searchClients: { asyncResult: true },
});

actions.readClient.listen(function(clientId) {
	ClientService.readClient(clientId)
		.then(this.completed, this.failed);
});

actions.createClient.listen(function(clientData) {
	ClientService.createClient(clientData)
		.then(this.completed, this.failed);
});

actions.updateClient.listen(function(clientId, clientData) {
	ClientService.updateClient(clientId, clientData)
		.then(this.completed, this.failed);
});

actions.removeClient.listen(function(clientId) {
	ClientService.removeClient(clientId)
		.then(this.completed, this.failed);
});

actions.searchClients.listen(function(params, limit) {
	ClientService.searchClients(params, limit)
		.then(this.completed, this.failed);
});

export default actions;
