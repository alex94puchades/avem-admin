import 'bootstrap/less/bootstrap.less';

import React from 'react';

import {DataView} from '../../common';

export const Headers = [
	<DataView.Header>Title</DataView.Header>,
	<DataView.Header>Description</DataView.Header>,
	<DataView.Header>Category</DataView.Header>,
	<DataView.Header>Start date</DataView.Header>,
	<DataView.Header>End date</DataView.Header>,
	<DataView.Header>Points</DataView.Header>,
];

export const Data = activity => [
	<DataView.Data>{activity.title}</DataView.Data>,
	<DataView.Data>{activity.description}</DataView.Data>,
	<DataView.Data>{activity.category}</DataView.Data>,
	<DataView.Data>{activity.startDate}</DataView.Data>,
	<DataView.Data>{activity.endDate}</DataView.Data>,
	<DataView.Data>{activity.points}</DataView.Data>,
];

export default { Headers, Data };
