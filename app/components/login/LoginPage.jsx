import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {ListenerMixin} from 'reflux';
import {Alert} from 'react-bootstrap';
import {State, Navigation} from 'react-router';

import LoginForm from './LoginForm.jsx';
import {LoginStore} from '../../stores';
import {LoginActions} from '../../actions';

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
		LoginActions.login.completed.listen(this.onLoginCompleted);
		LoginActions.login.failed.listen(this.onLoginFailed);
	},
	
	onLoginCompleted: function() {
		let destPath = this.props.query['return_to'];
		this.transitionTo(destPath || 'dashboard');
	},
	
	onLoginFailed: function(error) {
		this.setState({ error });
	},
	
	reset: function() {
		this.setState({ error: null });
	},
	
	redirect: function() {
		let destPath = this.props.query['return_to'];
		this.transitionTo(destPath || 'dashboard');
	},
	
	render: function() {
		let error = this.state.error;
		let centered = {
			maxWidth: '350px',
			position: 'absolute',
			top: '50%', left: '50%',
			transform: 'translate(-50%,-50%)',
		};
		return (
			<div style={centered}>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       dismissAfter={3000}
					       onDismiss={this.reset}
					>{error.message || 'Unknown error'}</Alert>
				: '' }
				<LoginForm disabled={this.state.error}/>
			</div>
		);
	},
});
