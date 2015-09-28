import React from 'react';
import {Navigation, State} from 'react-router';

import ClientDataForm from './ClientDataForm';
import {ClientActions} from '../../../actions';

export default React.createClass({
	mixins: [Navigation, State],
	
	getInitialState: function() {
		return {
			error: null,
		};
	},
	
	componentDidMount: function() {
		ClientActions.createClient.completed.listen(this.onCreateClientCompleted);
		ClientActions.createClient.failed.listen(this.onCreateClientFailed);
	},
	
	onSubmitData: function(clientData) {
		ClientActions.createClient(clientData);
	},
	
	onCreateClientCompleted: function() {
		let returnTo = this.props.query['return_to'];
		if (returnTo)
			this.transitionTo(returnTo);
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
				<ClientDataForm showResetButton={true}
				                onSubmitData={this.onSubmitData}
				                privileges={this.props.privileges}
				/>
			</div>
		);
	},
});
