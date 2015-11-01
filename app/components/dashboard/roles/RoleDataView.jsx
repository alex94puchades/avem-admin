import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';

import {DataView} from '../../common';

export const Headers = [
	<DataView.Header>Name</DataView.Header>,
	<DataView.Header>Description</DataView.Header>,
];

export const Data = role => [
	<DataView.Data>{role.name}</DataView.Data>,
	<DataView.Data>{role.description}</DataView.Data>,
];

export default { Headers, Data };
