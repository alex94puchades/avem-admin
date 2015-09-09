import _ from 'lodash';
import React from 'react';
import {Input} from 'react-bootstrap';

export default React.createClass({
	getInitialState: function() {
		return {
			client: {
				attributes: {
					name: this.props.name || '',
					trusted: this.props.trusted || false,
					redirectUri: this.props.redirectUri || '',
				},
			},
		};
	},
	
	onNameChanged: function(event) {
		this.setState({ client: {
			attributes: {
				name: event.target.value,
			},
		}});
	},
	
	onTrustedChanged: function(event) {
		this.setState({ client: {
			attributes: {
				trusted: event.target.value,
			},
		}});
	},
	
	onRedirectUriChanged: function(event) {
		this.setState({ client: {
			attributes: {
				redirectUri: event.target.value,
			},
		}});
	},
	
	render: function() {
		let canTrustClient = _.included(this.props.privileges, 'client:trust');
		return (
			<form onSubmit={this.props.onSendData}>
				<Input type="text"
				       label="Name"
				       value={this.state.client.attributes.name}
				       onChange={this.onNameChanged}
				/>
				<Input type="text"
				       label="Redirect URI"
				       value={this.state.client.attributes.redirectUri}
				       onChange={this.onRedirectUriChanged}
				/>
				<Input type="
				       label="Trusted"
				       disabled={!canTrustClient}
				       value={this.state.client.attributes.trusted}
				       onChange={this.onTrustedChanged}
				</Input>
			</form>
		);
	},
});
