import _ from 'lodash';
import request from 'superagent';
import jsonapify from 'superagent-jsonapify';

import config from '../../config';
import {CredentialStore} from '../stores';

jsonapify(request);

class MemberService {
	createMember(memberData) {
		return new Promise((resolve, reject) => {
			request.post(`${config.serverUrl}/members`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.type('application/vnd.api+json').send({ data: memberData })
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}

	readMember(memberId) {
		return new Promise((resolve, reject) => {
			request.get(`${config.serverUrl}/members/${memberId}`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.type('application/vnd.api+json').end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}

	updateMember(memberId, data) {
		return new Promise((resolve, reject) => {
			request.put(`${config.serverUrl}/members/${memberId}`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.type('application/vnd.api+json').send({ data })
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}

	removeMember(memberId) {
		return new Promise((resolve, reject) => {
			request.del(`${config.serverUrl}/members/${memberId}`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}

	searchMembers(query, limit, offset) {
		offset = offset || 0;
		return new Promise((resolve, reject) => {
			let filter = _.assign({
				'page[offset]': offset, 'page[limit]': limit
			}, _.mapKeys(query, (value, field) => `filter[${field}]`));
			request.get(`${config.serverUrl}/members`).query(filter)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.end((err, res) => {
					err ? reject(err) : resolve(res.body.data);
				});
		});
	}
};

export default new MemberService;
