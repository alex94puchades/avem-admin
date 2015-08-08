import React from 'react';
import {ListenerMixin} from 'reflux';
import {Navigation} from 'react-router';

import {LoginStore} from '../../stores';
import {LoginActions} from '../../actions';
import {Authenticated} from '../../mixins';

export default React.createClass({
	mixins: [
		ListenerMixin,
		Authenticated,
	],
	
	componentDidMount: function() {
		this.listenTo(LoginStore, this.onLoginChanged);
	},
	
	componentWillUpdate: function(nextProps, nextState) {
		if (nextState.privileges != null)
			LoginActions.logout();
	},
	
	onLoginChanged: function() {
		if (!LoginStore.authenticated)
			this.transitionTo('login');
	},
	
	render: function() {
		return null;
	},
});
