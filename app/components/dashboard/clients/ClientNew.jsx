import React from 'react';
import {Navigation} from 'react-router';

import ClientDataForm from './ClientDataForm';
import {ClientActions} from '../../../actions';

export default React.createClass({
	mixins: [Navigation],
	
	componentDidMount: function() {
		ClientActions.createClient.completed.listen(this.onCreateClientCompleted);
		ClientActions.createClient.failed.listen(this.onCreateClientFailed);
	},
	
	onSubmitData: function(data) {
		ClientActions.createClient(data);
	},
	
	onCreateClientCompleted: function() {
		let returnTo = this.props.query['return_to'];
		if (returnTo)
			this.transitionTo(returnTo);
	},
	
	onCreateClientFailed: function(error) {
		this.setState({ error });
	},
	
	render: function() {
		let lastError = this.state.error;
		return (
			{ this.state.error ?
				<Alert bsStyle="warning"
				       dismissAfter={3000}
				       onDismiss={this.reset}
				>{lastError.message || 'Unknown error'}</Alert>
			: '' }
			<ClientDataForm showResetButton={true}
			                onSubmitData={this.onSubmitData}
			                privileges={this.props.privileges}
			/>
		);
	},
});
