import _ from 'lodash';
import URI from 'URIjs';

import ApiService from './ApiService';

class AuthService {
	login(username, password) {
		return new Promise((resolve, reject) => {
			ApiService.request('POST', 'http://localhost:8080/oauth2/token', {
				contentType: 'application/x-www-form-urlencoded',
				data: {
					grant_type: 'password',
					client_id: 'es.avem.WebAdmin',
					username, password,
				},
			}).then(resolve, jqxhr => {
				return jqxhr.responseJSON
					? reject(new Error(jqxhr.responseJSON.error_description))
					: reject(new Error(jqxhr.responseText));
			});
		});
	}

	logout() {
		return new Promise((resolve, reject) => {
			let errorHandler = ApiService.errorHandler(reject);
			ApiService.request('GET', 'http://localhost:8080').then(response => {
				let sessionPath = response.links['this-session'];
				if (!sessionPath) return reject('Invalid server response');
				let sessionUri = URI('http://localhost:8080').path(sessionPath);
				ApiService.request('DELETE', sessionUri).then(resolve, errorHandler);
			}, errorHandler);
		});
	}

	getOwnPrivileges() {
		return new Promise((resolve, reject) => {
			let errorHandler = ApiService.errorHandler(reject);
			ApiService.request('GET', 'http://localhost:8080').then(response => {
				let userPath = response.links['this-user'];
				if (!userPath) return reject('Invalid server response');
				let userUri = URI('http://localhost:8080').path(userPath).query({
					fields: 'role', 'fields[roles]': 'privileges',
				});
				ApiService.request('GET', userUri).then(response => {
					let role = response.data.relationships.role;
					let roleInfo = _.find(response.included, role);
					resolve(roleInfo.attributes.privileges);
				}, errorHandler);
			}, errorHandler);
		});
	}
};

export default new AuthService;
