import _ from 'lodash';
import request from 'superagent';
import jsonapify from 'superagent-jsonapify';

import {LoginStore} from '../stores';

jsonapify(request);

class RoleService {
	createRole(roleData) {
		return new Promise((resolve, reject) => {
			request.post('http://localhost:8080/roles')
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.type('application/vnd.api+json').send({ data: roleData })
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	readRole(roleId) {
		return new Promise((resolve, reject) => {
			request.get(`http://localhost:8080/roles/${roleId}`)
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.type('application/vnd.api+json').end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	updateRole(roleId, data) {
		return new Promise((resolve, reject) => {
			request.put(`http://localhost:8080/roles/${roleId}`)
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.type('application/vnd.api+json').send({ data })
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	removeRole(roleId) {
		return new Promise((resolve, reject) => {
			request.del(`http://localhost:8080/roles/${roleId}`)
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	searchRoles(query, limit, offset) {
		offset = offset || 0;
		return new Promise((resolve, reject) => {
			let filter = _.assign({
				'page[offset]': offset, 'page[limit]': limit
			}, _.mapKeys(query, (value, field) => `filter[${field}]`));
			request.get('http://localhost:8080/roles').query(filter)
				.set('Authorization', `Bearer ${LoginStore.accessToken}`)
				.end((err, res) => {
					err ? reject(err) : resolve(res.body.data);
				});
		});
	}
};

export default new RoleService;
