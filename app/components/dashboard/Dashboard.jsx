import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {RouteHandler} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

import {PageHeader} from 'react-bootstrap';

import {Authenticated} from '../../mixins';
import NavigationPane from './NavigationPane.jsx';

export default React.createClass({
	mixins: [Authenticated],
	
	onLogout: function() {
		this.transitionTo('logout');
	},
	
	render: function() {
		return (
			<Grid fluid>
				<Row>
					<Col md={12}>
						<PageHeader>Dashboard</PageHeader>
					</Col>
				</Row>
				<Row>
					<Col md={3}>
						<NavigationPane key={this.state.privileges}
						                privileges={this.state.privileges}
						/>
					</Col>
					<Col md={9}>
						<RouteHandler/>
					</Col>
				</Row>
			</Grid>
		);
	},
});
