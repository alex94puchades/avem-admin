import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Navigation, State} from 'react-router';
import {Alert, ButtonInput} from 'react-bootstrap';

import ClientDataFields from './ClientDataFields';
import {ClientActions} from '../../../actions';
import {ClientService} from '../../../services';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
			clientData: null,
		};
	},
	
	componentDidMount: function() {
		let clientId = this.props.params.id;
		ClientActions.updateClient.failed.listen(this.onUpdateClientFailed);
		ClientActions.updateClient.completed.listen(this.onUpdateClientCompleted);
		ClientService.readClient(clientId).then(response => {
			this.setState({ clientData: response.data });
		});
	},
	
	onClientDataChanged: function(clientData) {
		this.setState({ clientData });
	},
	
	onSubmitClientData: function() {
		let clientId = this.props.params.id;
		ClientActions.updateClient(clientId, this.state.clientData);
	},
	
	onUpdateClientCompleted: function() {
		let returnTo = this.props.location.query['return_to'];
		this.props.history.pushState(null, returnTo || '/');
	},
	
	onUpdateClientFailed: function(error) {
		this.setState({ error });
	},
	
	onDismissError: function() {
		this.setState({ error: null });
	},
	
	render: function() {
		return (
			<div>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       onDismiss={this.onDismissError}
					>{ this.state.error.message || 'Unknown error' }</Alert>
				: '' }
				<form onSubmit={this.onSubmitClientData}>
					<ClientDataFields key={this.state.clientData}
					                  privileges={this.props.privileges}
					                  clientData={this.state.clientData}
					                  onChange={this.onClientDataChanged}
					/>
					<ButtonInput type="submit"
					             bsStyle="primary"
					             value="Save client"
					/>
				</form>
			</div>
		);
	},
});
