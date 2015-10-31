import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';

import {DataView} from '../../common';

export const Headers = React.createClass({
	displayName: 'ClientDataView.Headers',
	
	render: function() {
		return (
			<div>
				<DataView.Header>Name</DataView.Header>
				<DataView.Header>Trusted</DataView.Header>
				<DataView.Header>Redirect URI</DataView.Header>
			</div>
		);
	},
});

export const Data = React.createClass({
	displayName: 'ClientDataView.Data',
	
	propTypes: {
		model: React.PropTypes.object.isRequired,
	},
	
	render: function() {
		let client = this.props.model;
		return (
			<div>
				<DataView.Data>{client.name}</DataView.Data>
				<DataView.Data>{client.trusted ? 'true' : 'false'}</DataView.Data>
				<DataView.Data>{client.redirectUri || 'n/a'}</DataView.Data>
			</div>
		);
	},
});

export default { Headers, Data };
