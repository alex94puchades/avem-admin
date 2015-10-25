import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Input} from 'react-bootstrap';

export default React.createClass({
	propTypes: {
		roleData: React.PropTypes.object,
		onChange: React.PropTypes.func.isRequired,
	},
	
	getDefaultProps: function() {
		return {
			roleData: {
				name: '',
				description: '',
				privileges: [],
			},
		};
	},
	
	getInitialState: function() {
		let {name, description, privileges} = this.props.roleData || {};
		return {
			data: {
				type: 'roles',
				attributes: {
					name,
					description,
					privileges: privileges || [],
				},
			},
		};
	},
	
	onNameChanged: function(event) {
		let name = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.name', name);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onDescriptionChanged: function(event) {
		let description = event.target.value || null;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.description', description);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	render: function() {
		let roleData = this.state.data;
		let canEditRole = _.includes(this.props.privileges, 'role:edit');
		return (
			<div>
				<Input required
				       type="text"
				       label="Name"
				       readOnly={!canEditRole}
				       onChange={this.onNameChanged}
				       value={roleData.attributes.name}
				/>
				<Input type="text"
				       label="Description"
				       readOnly={!canEditRole}
				       onChange={this.onDescriptionChanged}
				       value={roleData.attributes.description}
				/>
			</div>
		);
	},
});
