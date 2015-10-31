import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';

import {DataView} from '../../common';

export const Headers = React.createClass({
	displayName: 'ActivityDataView.Headers',
	
	render: function() {
		return (
			<div>
				<DataView.Header>Title</DataView.Header>
				<DataView.Header>Description</DataView.Header>
				<DataView.Header>Category</DataView.Header>
				<DataView.Header>Start date</DataView.Header>
				<DataView.Header>End date</DataView.Header>
				<DataView.Header>Points</DataView.Header>
			</div>
		);
	},
});

export const Data = React.createClass({
	displayName: 'ActivityDataView.Data',
	
	propTypes: {
		model: React.PropTypes.object.isRequired,
	},
	
	render: function() {
		let activity = this.props.model;
		return (
			<div>
				<DataView.Data>{activity.title}</DataView.Data>
				<DataView.Data>{activity.description}</DataView.Data>
				<DataView.Data>{activity.category}</DataView.Data>
				<DataView.Data>{activity.startDate}</DataView.Data>
				<DataView.Data>{activity.endDate}</DataView.Data>
				<DataView.Data>{activity.points}</DataView.Data>
			</div>
		);
	},
});

export default { Headers, Data };
