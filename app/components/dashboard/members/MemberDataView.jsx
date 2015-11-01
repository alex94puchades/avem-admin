import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';

import {DataView} from '../../common';

export const Headers = [
	<DataView.Header>Full name</DataView.Header>,
	<DataView.Header>Gender</DataView.Header>,
	<DataView.Header>User</DataView.Header>,
];

export const Data = member => [
	<DataView.Data>{member.fullName}</DataView.Data>,
	<DataView.Data>{member.gender || 'n/a'}</DataView.Data>,
	<DataView.Data>
		{ (() => member.user ?
			<Link to={`/users/${member.user.id}`}
			>{member.user.email}</Link>
		: 'n/a')() }
	</DataView.Data>,
];

export default { Headers, Data };
