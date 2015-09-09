import _ from 'lodash';
import request from 'superagent';
import jsonapify from 'superagent-jsonapify';

import {LoginStore} from '../stores';

jsonapify(request);

class ClientService {
	createClient(clientInfo) {
		return new Promise((resolve, reject) => {
			request.post('http://localhost:8080/clients')
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	removeClient(clientId) {
		return new Promise((resolve, reject) => {
			request.del(`http://localhost:8080/clients/${clientId}`)
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	searchClients(query, limit, offset) {
		offset = offset || 0;
		return new Promise((resolve, reject) => {
			let filter = _.assign({
				'page[offset]': offset, 'page[limit]': limit
			}, _.mapKeys(query, (value, field) => `filter[${field}]`));
			request.get('http://localhost:8080/clients').query(filter)
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.end((err, res) => {
					err ? reject(err) : resolve(res.body.data);
				});
		});
	}
};

export default new ClientService;
