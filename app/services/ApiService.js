import _ from 'lodash';
import $ from 'jquery';

import {LoginStore} from '../stores';

class ApiService {
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

	errorHandler(callback) {
		return jqxhr => {
			return jqxhr.responseJSON
				? callback(new Error(jqxhr.responseJSON.title))
				: callback(new Error(jqxhr.responseText));
		};
	}
};

export default new ApiService;
