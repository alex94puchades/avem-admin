import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Nav} from 'react-bootstrap';
import {Navigation} from 'react-router';
import {NavItemLink} from 'react-router-bootstrap';

const availableLinks = [{
	name: 'Users',
	url: 'user-search',
	requires: ['user:enum'],
}, {
	name: 'Roles',
	url: 'role-search',
	requires: ['role:enum'],
}];

export default React.createClass({
	mixins: [Navigation],
	
	componentDidMount: function() {
		let firstLink = _.find(availableLinks, this.isLinkAllowed);
		if (firstLink !== undefined)
			this.transitionTo(firstLink.url);
	},
	
	isLinkAllowed: function(link) {
		let {privileges} = this.props;
		return _.all(link.requires, priv => {
			return _.includes(privileges, priv)
		});
	},
	
	render: function() {
		return (
			<Nav bsStyle="pills" stacked>
				{ _.map(availableLinks, (link, index) => {
					let allowed = this.isLinkAllowed(link);
					return <NavItemLink key={index}
					                    to={link.url}
					                    disabled={!allowed}
					       >{link.name}</NavItemLink>;
				}) }
			</Nav>
		);
	},
});
