import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {Table} from 'react-bootstrap';

export default React.createClass({
	propTypes: {
		users: React.PropTypes.arrayOf(React.PropTypes.object),
		preHeader: React.PropTypes.node,
		postHeader: React.PropTypes.node,
		prependHeader: React.PropTypes.func,
		appendHeader: React.PropTypes.func,
	},
	
	getDefaultProps: function() {
		return {
			users: [],
			preHeader: '',
			postHeader: '',
		};
	},
	
	render: function() {
		let {prependData, appendData} = this.props;
		return (
			<Table hover responsive>
				<thead>
					<tr>
						{ prependData ? <th>{this.props.preHeader}</th> : '' }
							<th>Email</th>
							<th>Role</th>
						{ appendData ? <th>{this.props.postHeader}</th> : '' }
					</tr>
				</thead>
				<tbody>
				{ _.map(this.props.users, user => {
					return (
						<tr key={user.id}>
							{ prependData ? <td>{prependData(user)}</td> : '' }
								<td>{user.email}</td>
								<td>
									<Link to='role-edit'
									      params={{ id: user.role.id }}
									>{user.role.name}</Link>
								</td>
							{ appendData ? <td>{appendData(user)}</td> : '' }
						</tr>
				); }) }
				</tbody>
			</Table>
		);
	},
});
