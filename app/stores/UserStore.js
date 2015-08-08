import Reflux from 'reflux';

import {UserActions} from '../actions';

export default Reflux.createStore({
	listenables: UserActions,
	
	init: function() {
		this.users = [];
	},
});
