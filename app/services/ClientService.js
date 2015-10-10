import _ from 'lodash';
import request from 'superagent';
import jsonapify from 'superagent-jsonapify';

import {CredentialStore} from '../stores';

jsonapify(request);

class ClientService {
	createClient(data) {
		return new Promise((resolve, reject) => {
			request.post('http://localhost:8080/clients')
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.type('application/vnd.api+json').send({ data })
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	readClient(clientId) {
		return new Promise((resolve, reject) => {
			request.get(`http://localhost:8080/clients/${clientId}`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.type('application/vnd.api+json').end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	updateClient(clientId, data) {
		return new Promise((resolve, reject) => {
			request.put(`http://localhost:8080/clients/${clientId}`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.type('application/vnd.api+json').send({ data })
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	removeClient(clientId) {
		return new Promise((resolve, reject) => {
			request.del(`http://localhost:8080/clients/${clientId}`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
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
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.end((err, res) => {
					err ? reject(err) : resolve(res.body.data);
				});
		});
	}
};

export default new ClientService;
