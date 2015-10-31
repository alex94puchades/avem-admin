import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {History} from 'react-router';
import {Alert} from 'react-bootstrap';

import {CredentialStore} from '../../stores';
import {AuthActions} from '../../actions';
import LoginForm from './LoginForm';

export default React.createClass({
	mixins: [History],

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
		let returnPath = this.props.location.query['return_to'];
		this.history.pushState(null, returnPath || '/dash');
	},
	
	onLoginFailed: function(error) {
		this.setState({ error });
	},
	
	onDismissError: function() {
		this.setState({ error: null });
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
					       onDismiss={this.onDismissError}
					>{ this.state.error.message || 'Unknown error' }</Alert>
				: null }
				<LoginForm disabled={this.state.error !== null}/>
			</div>
		);
	},
});
