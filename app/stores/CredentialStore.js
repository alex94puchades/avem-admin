import Reflux from 'reflux';
import cookie from 'cookies-js';

import {AuthActions} from '../actions';

export default Reflux.createStore({
	listenables: AuthActions,

	init: function() {
		Object.defineProperties(this, {
			accessToken: {
				get: function() { return cookie.get('access-token') },
				set: function(token) { cookie.set('access-token', token) },
			},
			refreshToken: {
				get: function() { return cookie.get('refresh-token') },
				set: function(token) { cookie.set('refresh-token', token) },
			},
			authenticated: {
				get: function() { return this.accessToken != null },
			},
		});
	},

	reset: function() {
		cookie.expire('access-token');
		cookie.expire('refresh-token');
		this.trigger();
	},

	onLoginCompleted: function(accessToken, refreshToken) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.trigger();
	},

	onLoginFailed: function(err) {
		this.accessToken = null;
		this.refreshToken = null;
		this.trigger();
	},

	onLogoutCompleted: function() {
		this.reset();
	},

	onLogoutFailed: function() {
		this.reset();
	},
});
