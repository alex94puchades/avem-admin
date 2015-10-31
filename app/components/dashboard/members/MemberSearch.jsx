import 'bootstrap/less/bootstrap.less';

import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {ListenerMixin} from 'reflux';
import {LinkContainer} from 'react-router-bootstrap';
import {Alert, Button, ButtonGroup, Modal} from 'react-bootstrap';

import {MemberActions} from '../../../actions';
import {MemberSearchStore} from '../../../stores';
import {DataView, SearchBox} from '../../common';
import MemberDataView from './MemberDataView';

export default React.createClass({
	mixins: [ListenerMixin],

	getInitialState: function() {
		return {
			error: null,
			members: [],
			removeMember: false,
		};
	},

	componentDidMount: function() {
		this.listenTo(MemberSearchStore, this.onMembersChanged);
		MemberActions.removeMember.failed.listen(this.onDoRemoveMemberFailed);
		MemberActions.searchMembers.failed.listen(this.onSearchMembersFailed);
		MemberActions.removeMember.completed.listen(this.onDoRemoveMemberCompleted);
		MemberActions.searchMembers({ fullName: '*' });
	},
	
	onSearchMembers: function(params) {
		MemberActions.searchMembers(params);
	},
	
	onSearchMembersFailed: function(error) {
		this.setState({ error });
	},

	onMembersChanged: function() {
		this.setState({ members: MemberSearchStore.members });
	},
	
	onRemoveMember: function(member) {
		this.setState({ removeMember: member });
	},
	
	onDoRemoveMember: function() {
		MemberActions.removeMember(this.state.removeMember.id);
	},
	
	onDoRemoveMemberCompleted: function() {
		this.setState({ removeMember: false });
	},

	onDoRemoveMemberFailed: function(error) {
		this.setState({ error });
	},
	
	onDoNotRemoveMember: function() {
		this.setState({ removeMember: false });
	},
	
	onDismissError: function() {
		this.setState({ error: null });
	},

	render: function() {
		let canAddMember = _.includes(this.props.privileges, 'member:add');
		let canEditMember = _.includes(this.props.privileges, 'member:edit');
		let canRemoveMember = _.includes(this.props.privileges, 'member:remove');
		return (
			<div>
				<SearchBox ops={{
				               firstName: { multi: false, merge: 'replace' },
				               lastName: { multi: false, merge: 'replace' },
				               fullName: { multi: false, merge: 'append' },
				           }}
				           default="fullName"
				           onSearch={this.onSearchMembers}
				           placeholder='Member search, ie: "Name Surname"'
				/>
				{ this.state.error ?
					<Alert bsStyle="warning"
					       onDismiss={this.onDismissError}
					>{ this.state.error.message || 'Unknown error' }</Alert>
				: '' }
				<DataView key={this.state.members}
				          data={this.state.members}
				>
					<DataView.Headers>
						<MemberDataView.Headers/>
						<DataView.Header></DataView.Header>
					</DataView.Headers>
					<DataView.Each handler={ member => {
						return (
							<div>
								<MemberDataView.Data model={member}/>
								<DataView.Data>
										<ButtonGroup fill>
										<LinkContainer to={`/members/${member.id}`}
										               query={{ return_to: '/members' }}
										>
											<Button bsSize="small"
											        disabled={!canEditMember}
											>Edit</Button>
										</LinkContainer>
										<Button bsSize="small"
										        bsStyle="danger"
										        disabled={!canRemoveMember}
										        onClick={this.onRemoveMember.bind(this, member)}
										>Remove</Button>
									</ButtonGroup>
								</DataView.Data>
							</div>
						);
					}}/>
				</DataView>
				<LinkContainer to="/members/new"
				               query={{ return_to: '/members' }}
				>
					<Button disabled={!canAddMember}>Add new member</Button>
				</LinkContainer>
				<Modal show={!!this.state.removeMember}
				       onHide={this.onDoNotRemoveMember}
				>
					<Modal.Header>
						<Modal.Title>
							Remove member "foo"
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						This action cannot be undone. Removing a member can also
						potentially corrupt the database. Do you want to
						continue?
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="danger"
						        onClick={this.onDoRemoveMember}
						>Remove member</Button>
						<Button onClick={this.onDoNotRemoveMember}
						>Do not remove</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	},
});
