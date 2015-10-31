import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Col, Grid, Nav, NavItem, PageHeader, Row} from 'react-bootstrap';

import {Authenticated} from '../../mixins';

export default React.createClass({
	mixins: [Authenticated],
	
	onLogout: function() {
		this.history.pushState(null, '/logout');
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
							<LinkContainer to='/users'>
								<NavItem>Users</NavItem>
							</LinkContainer>
							<LinkContainer to='/roles'>
								<NavItem>Roles</NavItem>
							</LinkContainer>
							<LinkContainer to='/clients'>
								<NavItem>Clients</NavItem>
							</LinkContainer>
							<LinkContainer to='/members'>
								<NavItem>Members</NavItem>
							</LinkContainer>
							<LinkContainer to='/activities'>
								<NavItem>Activities</NavItem>
							</LinkContainer>
						</Nav>
					</Col>
					<Col md={9}>
						{ this.props.children ?
							React.cloneElement(this.props.children, {
								key: this.state.privileges,
								privileges: this.state.privileges,
							})
						: null }
					</Col>
				</Row>
			</Grid>
		);
	},
});
