import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {ButtonInput, Input} from 'react-bootstrap';

export default React.createClass({
	propTypes: {
		disabled: React.PropTypes.bool,
		clientData: React.PropTypes.object,
		showResetButton: React.PropTypes.bool,
		submitButtonText: React.PropTypes.string,
		onSubmitData: React.PropTypes.func.isRequired,
	},
	
	getDefaultProps: function() {
		return {
			clientData: {
				name: '',
				trusted: false,
				redirectUri: null,
			},
			disabled: false,
			showResetButton: true,
			submitButtonText: 'Save client',
		};
	},
	
	getInitialState: function() {
		let {name, trusted, redirectUri} = this.props.clientData || {};
		return {
			data: {
				type: 'clients',
				attributes: {
					name, trusted,
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
	},
	
	onTrustedChanged: function(event) {
		let newTrusted = event.target.checked;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.trusted', newTrusted);
		this.setState({ data });
	},
	
	onRedirectUriChanged: function(event) {
		let newRedirectUri = event.target.value || null;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.redirect-uri', newRedirectUri);
		this.setState({ data });
	},
	
	onSubmitForm: function(event) {
		event.preventDefault();
		this.props.onSubmitData(this.state.data);
	},
	
	render: function() {
		let canEditClient = _.includes(this.props.privileges, 'client:edit');
		let canTrustClient = _.includes(this.props.privileges, 'client:trust');
		return (
			<form onSubmit={this.onSubmitForm}>
				<Input required
				       type="text"
				       label="Name"
				       readOnly={!canEditClient}
				       onChange={this.onNameChanged}
				       value={this.state.data.attributes.name}
				/>
				<Input type="text"
				       label="Redirect URI"
				       readOnly={!canEditClient}
				       onChange={this.onRedirectUriChanged}
				       value={this.state.data.attributes['redirect-uri']}
				/>
				<Input type="checkbox"
				       label="Trusted"
				       onChange={this.onTrustedChanged}
				       readOnly={!canEditClient || !canTrustClient}
				       checked={this.state.data.attributes.trusted}
				/>
				{ canEditClient ? ([
					<ButtonInput key={0}
					             type="submit"
					             bsStyle="primary"
					             disabled={this.props.disabled}
					             value={this.props.submitButtonText}
					/>,
					this.props.showResetButton
						? <ButtonInput key={1} type="reset" value="Reset"/>
						: ''
				]) : '' }
			</form>
		);
	},
});
