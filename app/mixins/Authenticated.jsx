import _ from 'lodash';
import React from 'react';
import {State, Navigation, RouteHandler} from 'react-router';

import {LoginStore} from '../stores';
import {AuthService} from '../services';

export default {
	mixins: [
		State,
		Navigation,
	],
	
	getInitialState: function() {
		return {
			privileges: null,
		};
	},
	
	componentDidMount: function() {
		if (!LoginStore.authenticated) {
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
