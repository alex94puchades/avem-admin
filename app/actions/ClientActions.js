import _ from 'lodash';
import Reflux from 'reflux';

import {ClientService} from '../services';

const actions = Reflux.createActions({
	createClient: { asyncResult: true },
	removeClient: { asyncResult: true },
	searchClients: { asyncResult: true },
});

actions.createClient.listen(function(clientInfo) {
	ClientService.createClient(clientInfo)
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
