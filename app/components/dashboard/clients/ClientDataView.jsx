import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {Table} from 'react-bootstrap';

export default React.createClass({
	propTypes: {
		clients: React.PropTypes.arrayOf(React.PropTypes.object),
		preHeader: React.PropTypes.node,
		postHeader: React.PropTypes.node,
		prependHeader: React.PropTypes.func,
		appendHeader: React.PropTypes.func,
	},
	
	getDefaultProps: function() {
		return {
			clients: [],
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
							<th>Name</th>
							<th>Trusted</th>
							<th>Redirect URI</th>
						{ appendData ? <th>{this.props.postHeader}</th> : '' }
					</tr>
				</thead>
				<tbody>
				{ _.map(this.props.clients, (client, index) => {
					return (
						<tr key={index}>
							{ prependData ? <td>{prependData(client)}</td> : '' }
								<td>{client.name}</td>
								<td>
									{client.trusted ? 'true' : 'false'}
								</td>
								<td>{client.redirectUri || 'n/a'}</td>
							{ appendData ? <td>{appendData(client)}</td> : '' }
						</tr>
					);
				}) }
				</tbody>
			</Table>
		);
	},
});
