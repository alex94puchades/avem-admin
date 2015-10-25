import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Input} from 'react-bootstrap';

export default React.createClass({
	propTypes: {
		clientData: React.PropTypes.object,
		onChange: React.PropTypes.func.isRequired,
	},
	
	getDefaultProps: function() {
		return {
			clientData: {
				name: '',
				trusted: false,
				redirectUri: null,
			},
		};
	},
	
	getInitialState: function() {
		let {name, trusted, redirectUri} = this.props.clientData || {};
		return {
			data: {
				type: 'clients',
				attributes: {
					name,
					trusted: trusted || false,
					'redirect-uri': redirectUri,
				},
			},
		};
	},
	
	onNameChanged: function(event) {
		let newName = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.name', newName);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onTrustedChanged: function(event) {
		let newTrusted = event.target.checked;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.trusted', newTrusted);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onRedirectUriChanged: function(event) {
		let newRedirectUri = event.target.value || null;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.redirect-uri', newRedirectUri);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	render: function() {
		let clientData = this.state.data;
		let canEditClient = _.includes(this.props.privileges, 'client:edit');
		return (
			<div>
				<Input required
				       type="text"
				       label="Name"
				       readOnly={!canEditClient}
				       onChange={this.onNameChanged}
				       value={clientData.attributes.name}
				/>
				<Input type="text"
				       label="Redirect URI"
				       readOnly={!canEditClient}
				       onChange={this.onRedirectUriChanged}
				       value={clientData.attributes['redirect-uri']}
				/>
				<Input type="checkbox"
				       label="Trusted"
				       readOnly={!canEditClient}
				       onChange={this.onTrustedChanged}
				       checked={clientData.attributes.trusted}
				/>
			</div>
		);
	},
});
