import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {ListenerMixin} from 'reflux';
import {Input, ButtonInput} from 'react-bootstrap';

import {CredentialStore} from '../../stores';
import {AuthActions} from '../../actions';
import LoginForm from './LoginForm';

export default React.createClass({
	mixins: [ListenerMixin],
	
	getDefaultProps: function() {
		return {
			disabled: false,
		};
	},
	
	getInitialState: function() {
		return {
			username: '',
			password: '',
		};
	},
	
	componentDidMount: function() {
		this.listenTo(CredentialStore, this.onLoginChanged);
	},
	
	onLoginChanged: function() {
		if (!CredentialStore.authenticated)
			this.setState({ password: '' });
	},
	
	login: function(event) {
		event.preventDefault();
		AuthActions.login(this.state.username, this.state.password);
	},
	
	reset: function(event) {
		event.preventDefault();
		this.setState({
			username: '',
			password: '',
		});
	},
	
	onUsernameChanged: function(event) {
		this.setState({ username: event.target.value });
	},
	
	onPasswordChanged: function(event) {
		this.setState({ password: event.target.value });
	},
	
	render: function() {
		return (
			<form onSubmit={this.login}>
				<Input required
				       autofocus
				       type="email"
				       bsSize="large"
				       addonBefore="@"
				       placeholder="Email address"
				       value={this.state.username}
				       disabled={this.props.disabled}
				       onChange={this.onUsernameChanged}
				/>
				<Input required
				       minLength="8"
				       bsSize="large"
				       type="password"
				       placeholder="Password"
				       value={this.state.password}
				       disabled={this.props.disabled}
				       onChange={this.onPasswordChanged}
				/>
				<ButtonInput block
				             type="submit"
				             value="Login"
				             bsSize="large"
				             bsStyle="primary"
				             disabled={this.props.disabled}
				/>
			</form>
		);
	},
});
