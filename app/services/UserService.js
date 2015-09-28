import _ from 'lodash';
import request from 'superagent';
import jsonapify from 'superagent-jsonapify';

import {LoginStore} from '../stores';

jsonapify(request);

class UserService {
	createUser(userData) {
		return new Promise((resolve, reject) => {
			request.post('http://localhost:8080/users')
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.type('application/vnd.api+json').send({ data: userData })
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	readUser(userId) {
		return new Promise((resolve, reject) => {
			request.get(`http://localhost:8080/users/${userId}`)
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.type('application/vnd.api+json').end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	updateUser(userId, data) {
		return new Promise((resolve, reject) => {
			request.put(`http://localhost:8080/users/${userId}`)
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.type('application/vnd.api+json').send({ data })
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	removeUser(userId) {
		return new Promise((resolve, reject) => {
			request.del(`http://localhost:8080/users/${userId}`)
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	searchUsers(query, limit, offset) {
		offset = offset || 0;
		return new Promise((resolve, reject) => {
			let filter = _.assign({
				'page[offset]': offset, 'page[limit]': limit
			}, _.mapKeys(query, (value, field) => `filter[${field}]`));
			request.get('http://localhost:8080/users').query(filter)
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.end((err, res) => {
					err ? reject(err) : resolve(res.body.data);
				});
		});
	}
};

export default new UserService;
