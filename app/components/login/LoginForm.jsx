import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {ListenerMixin} from 'reflux';

import {
	Input,
	ButtonInput,
} from 'react-bootstrap';

import LoginForm from './LoginForm.jsx';
import {LoginStore} from '../../stores';
import {LoginActions} from '../../actions';

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
		this.listenTo(LoginStore, this.onLoginChanged);
	},
	
	onLoginChanged: function() {
		if (!LoginStore.authenticated)
			this.setState({ password: '' });
	},
	
	login: function(event) {
		event.preventDefault();
		LoginActions.login(this.state.username, this.state.password);
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
				<Input type="email"
				       required
				       autofocus
				       bsSize="large"
				       addonBefore="@"
				       placeholder="Email address"
				       value={this.state.username}
				       disabled={this.props.disabled}
				       onChange={this.onUsernameChanged}
				/>
				<Input type="password"
				       required
				       minlength="8"
				       bsSize="large"
				       placeholder="Password"
				       value={this.state.password}
				       disabled={this.props.disabled}
				       onChange={this.onPasswordChanged}
				/>
				<ButtonInput type="submit"
				             value="Login"
				             bsSize="large"
				             bsStyle="primary"
				             disabled={this.props.disabled}
				             block
				/>
			</form>
		);
	},
});
