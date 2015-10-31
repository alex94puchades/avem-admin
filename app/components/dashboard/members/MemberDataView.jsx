import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';

import {DataView} from '../../common';

export const Headers = React.createClass({
	displayName: 'MemberDataView.Headers',
	
	render: function() {
		return (
			<div>
				<DataView.Header>Full name</DataView.Header>
				<DataView.Header>Gender</DataView.Header>
				<DataView.Header>User</DataView.Header>
			</div>
		);
	},
});

export const Data = React.createClass({
	displayName: 'MemberDataView.Data',
	
	propTypes: {
		model: React.PropTypes.object.isRequired,
	},
	
	render: function() {
		let member = this.props.model;
		return (
			<div>
				<DataView.Data>{member.fullName}</DataView.Data>
				<DataView.Data>{member.gender || 'n/a'}</DataView.Data>
				<DataView.Data>
					{ () => {
						return member.user ?
							<Link to={`/users/${member.user.id}`}
							>{member.user.email}</Link>
						: 'n/a'
					}() }
				</DataView.Data>
			</div>
		);
	},
});

export default { Headers, Data };
