import _ from 'lodash';
import $ from 'jquery';
import URI from 'URIjs';

import {LoginStore} from '../stores';

class AuthService {
	request(type, url, opts) {
		opts = _.defaults({}, opts, {
			dataType: 'json',
			contentType: 'application/vnd.api+json',
		});
		return $.ajax({
			type, url,
			data: opts.data,
			dataType: opts.dataType,
			contentType: opts.contentType,
			beforeSend: jqxhr => {
				if (!LoginStore.authenticated) return;
				let accessToken = LoginStore.accessToken;
				jqxhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
			},
		});
	}
	
	handleError(callback) {
		return jqxhr => {
			return jqxhr.responseJSON
				? callback(new Error(jsxhr.responseJSON.title))
				: callback(new Error(jqxhr.responseText));
		};
	}
	
	login(username, password) {
		return new Promise((resolve, reject) => {
			this.request('POST', 'http://localhost:8080/oauth2/token', {
				contentType: 'application/x-www-form-urlencoded',
				data: {
					grant_type: 'password',
					client_id: '55b8e047cd339edf244384d0',
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
			let errorHandler = this.handleError(reject);
			this.request('GET', 'http://localhost:8080').then(data => {
				let sessionPath = data.links['this-session'];
				if (!sessionPath) return reject('Invalid server response');
				let sessionUri = URI('http://localhost:8080').path(sessionPath);
				this.request('DELETE', sessionUri).then(resolve, errorHandler);
			}, errorHandler);
		});
	}
	
	getOwnPrivileges() {
		return new Promise((resolve, reject) => {
			let errorHandler = this.handleError(reject);
			this.request('GET', 'http://localhost:8080').then(data => {
				let userPath = data.links['this-user'];
				if (!userPath) return reject('Invalid server response');
				let userUri = URI('http://localhost:8080')
					.path(userPath).query({
						fields: 'role', 'fields[roles]': 'privileges'
					});
				this.request('GET', userUri).then(userInfo => {
					let role = userInfo.data.relationships.role;
					let roleInfo = _.find(userInfo.included, role);
					resolve(roleInfo.attributes.privileges);
				}, errorHandler);
			}, errorHandler);
		});
	}
};

export default new AuthService;
