import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Table} from 'react-bootstrap';

export default React.createClass({
	propTypes: {
		roles: React.PropTypes.arrayOf(React.PropTypes.object),
		preHeader: React.PropTypes.node,
		postHeader: React.PropTypes.node,
		prependData: React.PropTypes.func,
		appendData: React.PropTypes.func,
	},
	
	getDefaultProps: function() {
		return {
			roles: [],
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
							<th>Name</th>
							<th>Description</th>
						{ appendData ? <th>{this.props.postHeader}</th> : null }
					</tr>
				</thead>
				<tbody>
				{ _.map(this.props.roles, role => {
					return (
						<tr key={role.id}>
							{ prependData ? <td>{prependData(role)}</td> : null }
								<td>{role.name}</td>
								<td>{role.description}</td>
							{ appendData ? <td>{appendData(role)}</td> : null }
						</tr>
					);
				}) }
				</tbody>
			</Table>
		);
	},
});
