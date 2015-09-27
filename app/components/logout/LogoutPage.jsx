import React from 'react';
import {ListenerMixin} from 'reflux';
import {Navigation} from 'react-router';

import {LoginActions} from '../../actions';
import {Authenticated} from '../../mixins';

export default React.createClass({
	mixins: [Authenticated],
	
	componentDidMount: function() {
		LoginActions.logout.completed.listen(this.onLogoutCompleted);
	},
	
	componentWillUpdate: function(nextProps, nextState) {
		if (nextState.privileges != null)
			LoginActions.logout();
	},
	
	onLogoutCompleted: function() {
		this.transitionTo('login');
	},
	
	render: function() {
		return null;
	},
});
