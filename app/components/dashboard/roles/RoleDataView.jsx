import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';

import {DataView} from '../../common';

export const Headers = React.createClass({
	displayName: 'RoleDataView.Headers',
	
	render: function() {
		return (
			<div>
				<DataView.Header>Name</DataView.Header>
				<DataView.Header>Description</DataView.Header>
			</div>
		);
	},
});

export const Data = React.createClass({
	displayName: 'RoleDataView.Data',
	
	propTypes: {
		model: React.PropTypes.object.isRequired,
	},
	
	render: function() {
		let role = this.props.model;
		return (
			<div>
				<DataView.Data>{role.name}</DataView.Data>
				<DataView.Data>{role.description}</DataView.Data>
			</div>
		);
	},
});

export default { Headers, Data };
