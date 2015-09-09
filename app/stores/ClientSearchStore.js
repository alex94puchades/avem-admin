import Reflux from 'reflux';

import {ClientActions} from '../actions';

export default Reflux.createStore({
	listenables: ClientActions,
	
	init: function() {
		this.params = {};
		this.clients = [];
	},
	
	onSearchClients: function(params) {
		this.params = params;
	},
	
	onSearchClientsCompleted: function(clients) {
		this.clients = clients;
		this.trigger();
	},
	
	onCreateClientCompleted: function(response) {
		ClientActions.searchClients(this.params, this.clients.length);
	},
	
	onRemoveClientCompleted: function(response) {
		ClientActions.searchClients(this.params, this.clients.length);
	},
});
