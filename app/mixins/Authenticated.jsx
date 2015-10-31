import _ from 'lodash';
import React from 'react';
import {History} from 'react-router';

import {AuthService} from '../services';
import {CredentialStore} from '../stores';

export default {
	mixins: [History],
	
	getInitialState: function() {
		return {
			privileges: null,
		};
	},
	
	componentDidMount: function() {
		if (!CredentialStore.authenticated) {
			this.history.pushState(null, '/login', {
				return_to: this.props.location.pathname,
			});
		} else {
			AuthService.getOwnPrivileges().then(privileges => {
				this.setState({ privileges });
			});
		}
	},
};
