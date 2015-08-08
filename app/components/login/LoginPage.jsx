import '../../styles/login-page.less';

import React from 'react';
import {ListenerMixin} from 'reflux';
import {Alert} from 'react-bootstrap';
import {State, Navigation} from 'react-router';

import {LoginStore} from '../../stores';
import LoginForm from './LoginForm.jsx';

export default React.createClass({
	mixins: [
		State,
		Navigation,
		ListenerMixin,
	],
	
	getInitialState: function() {
		return {
			error: null,
		};
	},
	
	componentDidMount: function() {
		if (LoginStore.authenticated)
			this.redirect();
		else
			this.listenTo(LoginStore, this.onLoginChanged);
	},
	
	onLoginChanged: function() {
		if (LoginStore.authenticated) {
			this.redirect();
		} else {
			this.setState({ error: LoginStore.lastError });
		}
	},
	
	reset: function() {
		this.setState({ error: null });
	},
	
	redirect: function() {
		let destPath = this.props.query['return_to'];
		this.transitionTo(destPath || 'dashboard');
	},
	
	render: function() {
		let {error} = this.state;
		return (
			<div className="avemLoginPage">
				{ error
					? <Alert bsStyle="warning"
					         dismissAfter={2000}
					         onDismiss={this.reset}
					  >{error.message || 'Unknown error'}</Alert>
					: '' }
				<LoginForm disabled={error != null}/>
			</div>
		);
	},
});
