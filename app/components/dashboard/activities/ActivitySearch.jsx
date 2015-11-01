import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {ListenerMixin} from 'reflux';
import {LinkContainer} from 'react-router-bootstrap';
import {Alert, Button, ButtonGroup, Modal} from 'react-bootstrap';

import {ActivityActions} from '../../../actions';
import {ActivitySearchStore} from '../../../stores';
import {DataView, SearchBox} from '../../common';
import ActivityDataView from './ActivityDataView';

export default React.createClass({
	mixins: [ListenerMixin],
	
	getInitialState: function() {
		return {
			error: null,
			activities: [],
			removeActivity: false,
		};
	},
	
	componentDidMount: function() {
		this.listenTo(ActivitySearchStore, this.onActivitiesChanged);
		ActivityActions.removeActivity.failed.listen(this.onDoRemoveActivityFailed);
		ActivityActions.searchActivities.failed.listen(this.onSearchActivitiesFailed);
		ActivityActions.removeActivity.completed.listen(this.onDoRemoveActivityCompleted);
		ActivityActions.searchActivities({ name: '*' });
	},
	
	onSearchActivities: function(params) {
		ActivityActions.searchActivitys(params);
	},
	
	onSearchActivitiesFailed: function(error) {
		this.setState({ error });
	},
	
	onActivitiesChanged: function() {
		this.setState({ activities: ActivitySearchStore.activities });
	},
	
	onRemoveActivity: function(activity) {
		this.setState({ removeActivity: activity });
	},
	
	onDoRemoveActivity: function() {
		ActivityActions.removeActivity(this.state.removeActivity.id);
	},
	
	onDoRemoveActivityCompleted: function() {
		this.setState({ removeActivity: false });
	},
	
	onDoRemoveActivityFailed: function(error) {
		this.setState({ error });
	},
	
	onDoNotRemoveActivity: function() {
		this.setState({ removeActivity: false });
	},
	
	onDismissError: function() {
		this.setState({ error: null });
	},
	
	render: function() {
		let canAddActivity = _.includes(this.props.privileges, 'activity:add');
		let canEditActivity = _.includes(this.props.privileges, 'activity:edit');
		let canRemoveActivity = _.includes(this.props.privileges, 'activity:remove');
		return (
			<div>
				<SearchBox default="title"
				           onSearch={this.onSearchActivities}
				           placeholder='Activity search, ie: "Week of the Death"'
				           ops={{
				               title: { multi: false, merge: 'append' },
				           }}
				/>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       onDismiss={this.onDismissError}
					>{ this.state.error.message || 'Unknown error' }</Alert>
				: '' }
				<DataView key={this.state.activities}
				          data={this.state.activities}
				>
					<DataView.Headers>
						{ ActivityDataView.Headers }
						<DataView.Header></DataView.Header>
					</DataView.Headers>
					<DataView.Each handler={activity => {
						return _.flatten([
							ActivityDataView.Data(activity),
							<DataView.Data>
								<ButtonGroup fill>
									<LinkContainer to={`/activities/${activity.id}`}
									               query={{ return_to: '/activities' }}
									>
										<Button bsSize="small"
										        disabled={!canEditActivity}
										>Edit</Button>
									</LinkContainer>
									<Button bsSize="small"
									        bsStyle="danger"
									        disabled={!canRemoveActivity}
									        onClick={this.onRemoveActivity.bind(this, activity)}
									>Remove</Button>
								</ButtonGroup>
							</DataView.Data>,
						]);
					}}/>
				</DataView>
				<LinkContainer to="/activities/new"
				               query={{ return_to: '/activities' }}
				>
					<Button disabled={!canAddActivity}>Add new activity</Button>
				</LinkContainer>
				<Modal show={!!this.state.removeActivity}
				       onHide={this.onDoNotRemoveActivity}
				>
					<Modal.Header>
						<Modal.Title>
							Remove activity "{this.state.removeActivity.title}"
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						This action cannot be undone. Removing an activity has
						the potential of corrupting the database. Do you want to
						continue?
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="danger"
						        onClick={this.onDoRemoveActivity}
						>Remove activity</Button>
						<Button onClick={this.onDoNotRemoveActivity}
						>Do not remove</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	},
});
