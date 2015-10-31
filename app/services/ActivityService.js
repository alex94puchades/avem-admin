import _ from 'lodash';
import request from 'superagent';
import jsonapify from 'superagent-jsonapify';

import config from '../../config';
import {CredentialStore} from '../stores';

jsonapify(request);

class ActivityService {
	createActivity(data) {
		return new Promise((resolve, reject) => {
			request.post(`${config.serverUrl}/activities`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.type('application/vnd.api+json').send({ data })
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	readActivity(activityId) {
		return new Promise((resolve, reject) => {
			request.get(`${config.serverUrl}/activities/${activityId}`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.type('application/vnd.api+json').end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	updateActivity(activityId, data) {
		return new Promise((resolve, reject) => {
			request.put(`${config.serverUrl}/activities/${activityId}`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.type('application/vnd.api+json').send({ data })
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	removeActivity(activityId) {
		return new Promise((resolve, reject) => {
			request.del(`${config.serverUrl}/activities/${activityId}`)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.end((err, res) => {
					err ? reject(err) : resolve(res.body);
				});
		});
	}
	
	searchActivities(query, limit, offset) {
		offset = offset || 0;
		return new Promise((resolve, reject) => {
			let filter = _.assign({
				'page[offset]': offset, 'page[limit]': limit
			}, _.mapKeys(query, (value, field) => `filter[${field}]`));
			request.get(`${config.serverUrl}/activities`).query(filter)
				.set('Authorization', `Bearer ${CredentialStore.accessToken}`)
				.end((err, res) => {
					err ? reject(err) : resolve(res.body.data);
				});
		});
	}
};

export default new ActivityService;
