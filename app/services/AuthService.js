import request from 'superagent';
import jsonapify from 'superagent-jsonapify';

import config from '../../config';
import {CredentialStore} from '../stores';

jsonapify(request);

class AuthService {
	login(username, password) {
		return new Promise((resolve, reject) => {
			request.post(`${config.serverUrl}/oauth2/token`)
				.type('form').send({
					username, password,
					grant_type: 'password',
					client_id: config.clientName,
				}).end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}

	getOwnPrivileges() {
		return new Promise((resolve, reject) => {
			request.get(`${config.serverUrl}`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.end((err, res) => {
					if (err) return reject(err);
					let userPath = res.body.links['this-user'];
					if (!userPath) return reject(new Error('Invalid server response'));
					let params = { fields: 'role', 'fields[roles]': 'privileges' };
					request.get(`${config.serverUrl}${userPath}`)
						.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
						.query(params).end((err, res) => {
							if (err) return reject(err);
							let userInfo = res.body.data;
							resolve(userInfo.role.privileges);
						});
				});
		});
	}

	logout() {
		return new Promise((resolve, reject) => {
			request.get(`${config.serverUrl}`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.end((err, res) => {
					if (err) return reject(err);
					let sessionPath = res.body.links['this-session'];
					if (!sessionPath) return reject(new Error('Invalid server response'));
					request.del(`http://api.avem.es:8080${sessionPath}`)
						.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
						.end((err, res) => {
							err ? reject(err) : resolve(res.body);
						});
				});
		});
	}
};

export default new AuthService;
