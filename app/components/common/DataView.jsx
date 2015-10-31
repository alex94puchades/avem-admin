import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Table} from 'react-bootstrap';

export const DataView = React.createClass({
	propTypes: {
		data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
	},
	
	render: function() {
		return (
			<Table hover responsive>
				{ React.Children.map(this.props.children, child => {
					return React.cloneElement(child, {
						data: this.props.data,
					});
				}) }
			</Table>
		);
	},
});

export const Headers = DataView.Headers = React.createClass({
	displayName: 'DataView.Headers',
	
	render: function() {
		return (
			<thead>
				<tr>
					{ this.props.children || null }
				</tr>
			</thead>
		);
	},
});

export const Header = DataView.Header = React.createClass({
	displayName: 'DataView.Header',
	
	render: function() {
		return (
			<th>{ this.props.children || '' }</th>
		);
	},
});

export const Data = DataView.Data = React.createClass({
	displayName: 'DataView.Data',
	
	render: function() {
		return (
			<td>{ this.props.children || '' }</td>
		);
	},
});

export const Each = DataView.Each = React.createClass({
	displayName: 'DataView.Each',
	
	propTypes: {
		handler: React.PropTypes.func.isRequired,
	},
	
	render: function() {
		return (
			<tbody>
				{ _.map(this.props.data, (param, key) => {
					let children = this.props.handler(param);
					return (
						<tr key={key}>
							{ children.type === 'div'
								? children.props.children
								: children }
						</tr>
					);
				}) }
			</tbody>
		);
	},
});

export default DataView;
