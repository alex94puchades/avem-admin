import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Alert} from 'react-bootstrap';
import {State, Navigation} from 'react-router';

import {CredentialStore} from '../../stores';
import {AuthActions} from '../../actions';
import LoginForm from './LoginForm';

export default React.createClass({
	mixins: [State,	Navigation],

	getInitialState: function() {
		return {
			error: null,
		};
	},
	
	componentDidMount: function() {
		AuthActions.login.completed.listen(this.onLoginCompleted);
		AuthActions.login.failed.listen(this.onLoginFailed);
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
