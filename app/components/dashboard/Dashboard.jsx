import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {RouteHandler} from 'react-router';
import {NavItemLink} from 'react-router-bootstrap';
import {Nav, Grid, Row, Col, PageHeader} from 'react-bootstrap';

import {Authenticated} from '../../mixins';

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
						<Nav bsStyle="pills" stacked>
							<NavItemLink to='user-search'>Users</NavItemLink>
							<NavItemLink to='role-search'>Roles</NavItemLink>
							<NavItemLink to='client-search'>Clients</NavItemLink>
						</Nav>
					</Col>
					<Col md={9}>
						<RouteHandler key={this.state.privileges}
						              privileges={this.state.privileges}
						/>
					</Col>
				</Row>
			</Grid>
		);
	},
});
