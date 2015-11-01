import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';

import {DataView} from '../../common';

export const Headers = [
	<DataView.Header>Email</DataView.Header>,
	<DataView.Header>Role</DataView.Header>,
];

export const Data = user => [
	<DataView.Data>{user.email}</DataView.Data>,
	<DataView.Data>
		<Link to={`/roles/${user.role.id}`}
		>{user.role.name}</Link>
	</DataView.Data>,
];

export default { Headers, Data };
