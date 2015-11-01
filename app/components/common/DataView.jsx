import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Pagination, Table} from 'react-bootstrap';

export const DataView = React.createClass({
	propTypes: {
		pageItems: React.PropTypes.number,
		data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
	},
	
	getInitialState: function() {
		return {
			pageNumber: 1,
		};
	},
	
	onSelectActivePage: function(event, selected) {
		this.setState({ pageNumber: selected.eventKey });
	},
	
	render: function() {
		let {pageItems} = this.props;
		let {pageNumber} = this.state;
		let dataItems = this.props.data.length;
		let pageCount = Math.ceil(dataItems / pageItems);
		return (
			<div>
				<Table hover responsive>
					{ React.Children.map(this.props.children, child => {
						return React.cloneElement(child, {
							_data: this.props.data,
						});
					}) }
				</Table>
				{/*
				<Pagination bsSize="medium"
				            ellipsis={true}
				            items={pageCount}
				            prev={pageNumber > 1}
				            first={pageNumber > 1}
				            next={pageNumber < pageCount}
				            last={pageNumber < pageCount}
				            onSelect={this.onSelectActivePage}
				            activePage={this.state.pageNumber}
				/>
				*/}
			</div>
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
				{ _.map(this.props._data, (param, key) => {
					let children = this.props.handler(param);
					return (
						<tr key={key}>
							{ this.props.handler(param) }
						</tr>
					);
				}) }
			</tbody>
		);
	},
});

export default DataView;
