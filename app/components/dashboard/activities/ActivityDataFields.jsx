import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Input} from 'react-bootstrap';

export default React.createClass({
	propTypes: {
		activityData: React.PropTypes.object,
		onChange: React.PropTypes.func.isRequired,
		mbMembers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
		categories: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	},
	
	getDefaultProps: function() {
		return {
			mbMembers: [],
			categories: [],
			activityData: {
				title: '',
				description: '',
				organizedBy: null,
			},
		};
	},
	
	getInitialState: function() {
		let {title, description, category} = this.props.activityData || {};
		let {points, organizedBy} = this.props.activityData || {};
		return {
			data: {
				type: 'activities',
				attributes: {
					title,
					description,
					category,
					points,
				},
				relationships: {
					'organized-by': organizedBy,
				},
			},
		};
	},
	
	onTitleChanged: function(event) {
		let newTitle = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.title', newTitle);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onDescriptionChanged: function(event) {
		let newDescription = event.target.value || null;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.description', newDescription);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onCategoryChanged: function(event) {
		let newCategory = event.target.value || null;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.category', newCategory);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	onOrganizedByChanged: function(event) {
		
	},
	
	onStartDateChanged: function(event) {
		
	},
	
	onEndDateChanged: function(event) {
		
	},
	
	onPointsChanged: function(event) {
		let newPoints = event.target.value;
		let data = _.clone(this.state.data);
		_.set(data, 'attributes.points', newPoints);
		this.setState({ data });
		this.props.onChange(data);
	},
	
	render: function() {
		let activityData = this.state.data;
		let canEditActivity = _.includes(this.props.privileges, 'activity:edit');
		return (
			<div>
				<Input required
				       type="text"
				       label="Title"
				       readOnly={!canEditActivity}
				       onChange={this.onTitleChanged}
				       value={activityData.attributes.title}
				/>
				<Input type="text"
				       label="Description"
				       readOnly={!canEditActivity}
				       onChange={this.onDescriptionChanged}
				       value={activityData.attributes.description}
				/>
				<Input type="select"
				       label="Category"
				       readOnly={!canEditActivity}
				       onChange={this.onCategoryChanged}
				       value={activityData.attributes.category}
				>
					<option value="">n/a</option>
					{ _.map(this.props.categories, category => {
						return (
							<option key={category}
							        value={category}
							>{_.capitalize(category)}</option>
						);
					}) }
				</Input>
				<Input required
				       multiple
				       type="select"
				       label="Organized by"
				       readOnly={!canEditActivity}
				       onChange={this.onOrganizedByChanged}
				>
					{ _.map(this.props.mbMembers, mbMember => {
						return (
							<option key={mbMember.id}
							        value={mbMember.id}
							>{mbMember.member.fullName}</option>
						);
					}) }
				</Input>
				<Input required
				       type="date"
				       label="Start date"
				       readOnly={!canEditActivity}
				       onChange={this.onStartDateChanged}
				       value={activityData.attributes['start-date']}
				/>
				<Input required
				       type="date"
				       label="End date"
				       readOnly={!canEditActivity}
				       onChange={this.onEndDateChanged}
				       value={activityData.attributes['end-date']}
				/>
				<Input required
				       type="number"
				       label="Points"
				       readOnly={!canEditActivity}
				       onChange={this.onPointsChanged}
				       value={activityData.attributes.points}
				/>
			</div>
		);
	},
});
