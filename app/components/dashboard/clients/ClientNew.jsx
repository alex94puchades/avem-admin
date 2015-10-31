import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Navigation, State} from 'react-router';
import {Alert, ButtonInput} from 'react-bootstrap';

import ClientDataFields from './ClientDataFields';
import {ClientActions} from '../../../actions';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
			clientData: {
				trusted: false,
			},
		};
	},
	
	componentDidMount: function() {
		ClientActions.createClient.completed.listen(this.onCreateClientCompleted);
		ClientActions.createClient.failed.listen(this.onCreateClientFailed);
	},
	
	onClientDataChanged: function(clientData) {
		this.setState({ clientData });
	},
	
	onSubmitClientData: function() {
		ClientActions.createClient(this.state.clientData);
	},
	
	onCreateClientCompleted: function() {
		let returnTo = this.props.location.query['return_to'];
		this.props.history.pushState(null, returnTo || '/');
	},
	
	onCreateClientFailed: function(error) {
		this.setState({ error });
	},
	
	onDismissError: function() {
		this.setState({ error: null });
	},
	
	render: function() {
		let lastError = this.state.error;
		return (
			<div>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       onDismiss={this.onDismissError}
					>{ lastError.message || 'Unknown error' }</Alert>
				: '' }
				<form onSubmit={this.onSubmitClientData}>
					<ClientDataFields key={this.state.clientData}
					                  privileges={this.props.privileges}
					                  clientData={this.state.clientData}
					                  onChange={this.onClientDataChanged}
					/>
					<ButtonInput type="submit"
					             bsStyle="primary"
					             value="Create client"
					/>
					<ButtonInput type="reset"
					             value="Reset fields"
					/>
				</form>
			</div>
		);
	},
});
