import Reflux from 'reflux';
import cookie from 'cookies-js';

import {LoginActions} from '../actions';

export default Reflux.createStore({
	listenables: LoginActions,
	
	init: function() {
		this.lastError = null;
		
		Object.defineProperty(this, 'accessToken', {
			get: function() { return cookie.get('access-token') },
			set: function(token) { cookie.set('access-token', token) },
		});
		
		Object.defineProperty(this, 'refreshToken', {
			get: function() { return cookie.get('refresh-token') },
			set: function(token) { cookie.set('refresh-token', token) },
		});
		
		Object.defineProperty(this, 'authenticated', {
			get: function() { return !!this.accessToken },
		});
	},
	
	reset: function() {
		this.lastError = null;
		cookie.expire('access-token');
		cookie.expire('refresh-token');
		this.trigger();
	},
	
	onLoginCompleted: function(accessToken, refreshToken) {
		this.lastError = null;
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.trigger();
	},
	
	onLoginFailed: function(err) {
		this.lastError = err;
		this.trigger();
	},
	
	onLogoutCompleted: function() {
		this.reset();
	},
	
	onLogoutFailed: function() {
		this.reset();
	},
});
