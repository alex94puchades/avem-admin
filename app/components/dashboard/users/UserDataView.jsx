import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';

import {DataView} from '../../common';

export const Headers = React.createClass({
	displayName: 'UserDataView.Headers',
	
	render: function() {
		return (
			<div>
				<DataView.Header>Email</DataView.Header>
				<DataView.Header>Role</DataView.Header>
			</div>
		);
	},
});

export const Data = React.createClass({
	displayName: 'UserDataView.Data',
	
	propTypes: {
		model: React.PropTypes.object.isRequired,
	},
	
	render: function() {
		let user = this.props.model;
		return (
			<div>
				<DataView.Data>{user.email}</DataView.Data>
				<DataView.Data>
					<Link to={`/roles/${user.role.id}`}
					>{user.role.name}</Link>
				</DataView.Data>
			</div>
		);
	},
});

export default { Headers, Data };
