import React from 'react';
import {ListenerMixin} from 'reflux';
import {Navigation} from 'react-router';

import {AuthActions} from '../../actions';
import {Authenticated} from '../../mixins';

export default React.createClass({
	mixins: [Authenticated],
	
	componentDidMount: function() {
		AuthActions.logout.completed.listen(this.onLogoutCompleted);
	},
	
	componentWillUpdate: function(nextProps, nextState) {
		if (nextState.privileges != null)
			AuthActions.logout();
	},
	
	onLogoutCompleted: function() {
		this.history.pushState(null, '/login');
	},
	
	render: function() {
		return null;
	},
});
