import 'bootstrap/less/bootstrap.less';

import React from 'react';

import {DataView} from '../../common';

export const Headers = [
	<DataView.Header>Name</DataView.Header>,
	<DataView.Header>Trusted</DataView.Header>,
	<DataView.Header>Redirect URI</DataView.Header>,
];

export const Data = client => [
	<DataView.Data>{client.name}</DataView.Data>,
	<DataView.Data>{client.trusted ? 'true' : 'false'}</DataView.Data>,
	<DataView.Data>{client.redirectUri || 'n/a'}</DataView.Data>,
];

export default { Headers, Data };
