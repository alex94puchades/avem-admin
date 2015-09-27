import React from 'react';
import {Navigation} from 'react-router';

import ClientDataForm from './ClientDataForm';
import {ClientActions} from '../../../actions';

export default React.createClass({
	mixins: [Navigation],
	
	getInitialState: function() {
		return {
			client: null,
		};
	},
	
	componentDidMount: function() {
		let clientId = this.props.params.id;
		ClientActions.readClient(clientId);
	},
	
	onReadClientCompleted: function(client) {
		this.setState({ client });
	},
	
	onSubmitData: function(data) {
		let clientId = this.props.params.id;
		ClientActions.updateClient(clientId, data);
	},
	
	onUpdateClientCompleted: function() {
		let returnTo = this.props.query['return_to'];
		if (returnTo)
			this.transitionTo(returnTo);
	},
	
	render: function() {
		return (
			<ClientDataForm showResetButton={true}
			                key={this.state.client}
			                clientData={this.state.client}
			                onSubmitData={this.onSubmitData}
			                privileges={this.props.privileges}
			                disabled={this.state.client !== null}
			/>
		);
	},
});
