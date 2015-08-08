import Reflux from 'reflux';

import {AuthService} from '../services';

const actions = Reflux.createActions({
	login: { asyncResult: true },
	logout: { asyncResult: true },
});

actions.login.listen(function(username, password) {
	AuthService.login(username, password).then(data => {
		let accessToken = data.access_token;
		let refreshToken = data.refresh_token;
		this.completed(accessToken, refreshToken);
	}, this.failed);
});

actions.logout.listen(function() {
	AuthService.logout().then(this.completed, this.failed);
});

export default actions;
