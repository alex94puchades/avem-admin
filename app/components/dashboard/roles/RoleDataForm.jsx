import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {ButtonInput, Input} from 'react-bootstrap';

export default React.createClass({
	propTypes: {
		disabled: React.PropTypes.bool,
		roleData: React.PropTypes.object,
		showResetButton: React.PropTypes.bool,
		submitButtonText: React.PropTypes.string,
		onSubmitData: React.PropTypes.func.isRequired,
	},
	
	getDefaultProps: function() {
		return {
			roleData: {
				name: '',
				description: '',
				privileges: [],
			},
			disabled: false,
			showResetButton: true,
			submitButtonText: 'Save role',
		};
	},
	
	getInitialState: function() {
		let {name, description, privileges} = this.props.roleData;
		return {
			data: {
				type: 'roles',
				attributes: {
					name, description, privileges,
				},
			},
		};
	},
	
	onNameChanged: function(event) {
		let name = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.name', name);
		this.setState({ data });
	},
	
	onDescriptionChanged: function(event) {
		let description = event.target.value || null;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.description', description);
		this.setState({ data });
	},
	
	onSubmitForm: function(event) {
		event.preventDefault();
		this.props.onSubmitData(this.state.data);
	},
	
	render: function() {
		let canEditRole = _.includes(this.props.privileges, 'role:edit');
		return (
			<form onSubmit={this.onSubmitForm}>
				<Input type="text"
				       label="Name"
				       required
				       readOnly={!canEditRole}
				       value={this.state.data.attributes.name}
				       onChange={this.onNameChanged}
				/>
				<Input type="text"
				       label="Description"
				       readOnly={!canEditRole}
				       value={this.state.data.attributes.description}
				       onChange={this.onDescriptionChanged}
				/>
				{ canEditRole ? ([
					<ButtonInput key={0}
					             type="submit"
					             bsStyle="primary"
					             disabled={this.props.disabled}
					             value={this.props.submitButtonText}
					/>,
					this.props.showResetButton
						? <ButtonInput key={1} type="reset" value="Reset"/>
						: ''
				]) : '' }
			</form>
		);
	},
});
