import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {Table} from 'react-bootstrap';

export default React.createClass({
	propTypes: {
		members: React.PropTypes.arrayOf(React.PropTypes.object),
		preHeader: React.PropTypes.node,
		postHeader: React.PropTypes.node,
		prependData: React.PropTypes.func,
		appendData: React.PropTypes.func,
	},
	
	getDefaultProps: function() {
		return {
			members: [],
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
						{ prependData ? <th>{this.props.preHeader}</th> : null }
							<th>Full name</th>
							<th>Gender</th>
							<th>User</th>
						{ appendData ? <th>{this.props.postHeader}</th> : null }
					</tr>
				</thead>
				<tbody>
				{ _.map(this.props.members, (member, index) => {
					return (
						<tr key={index}>
							{ prependData ? <td>{prependData(member)}</td> : null }
								<td>{member.fullName}</td>
								<td>{member.gender || 'n/a'}</td>
								<td>
									{ () => {
										return member.user ?
											<Link to={`/users/${member.user.id}`}
											>{member.user.email}</Link>
										: 'n/a'
									}() }
								</td>
							{ appendData ? <td>{appendData(member)}</td> : null }
						</tr>
				); }) }
				</tbody>
			</Table>
		);
	},
});
