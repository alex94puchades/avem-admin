import _ from 'lodash';
import React from 'react';
import {State, Navigation} from 'react-router';

import {AuthService} from '../services';
import {CredentialStore} from '../stores';

export default {
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			privileges: null,
		};
	},
	
	componentDidMount: function() {
		if (!CredentialStore.authenticated) {
			this.transitionTo('login', null, {
				return_to: this.getPath(),
			});
		} else {
			AuthService.getOwnPrivileges().then(privileges => {
				this.setState({ privileges });
			});
		}
	},
};
