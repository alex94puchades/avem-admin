import 'bootstrap/less/bootstrap.less';

import React from 'react';
import {Alert} from 'react-bootstrap';
import {Navigation, State} from 'react-router';

import ClientDataForm from './ClientDataForm';
import {ClientActions} from '../../../actions';
import {ClientService} from '../../../services';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
			client: null,
		};
	},
	
	componentDidMount: function() {
		let clientId = this.props.params.id;
		ClientActions.updateClient.failed.listen(this.onUpdateClientFailed);
		ClientActions.updateClient.completed.listen(this.onUpdateClientCompleted);
		ClientService.readClient(clientId).then(response => {
			this.setState({ client: response.data });
		});
	},
	
	onSubmitData: function(clientData) {
		let clientId = this.props.params.id;
		ClientActions.updateClient(clientId, clientData);
	},
	
	onUpdateClientCompleted: function() {
		let returnTo = this.props.query['return_to'];
		if (returnTo)
			this.transitionTo(returnTo);
	},
	
	onUpdateClientFailed: function(error) {
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
				<ClientDataForm key={this.state.client}
					            showResetButton={false}
					            clientData={this.state.client}
					            onSubmitData={this.onSubmitData}
					            privileges={this.props.privileges}
					            disabled={this.state.client === null}
				/>
			</div>
		);
	},
});
