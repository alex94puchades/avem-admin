import Reflux from 'reflux';

import {MemberService} from '../services';

const actions = Reflux.createActions({
	readMember: { asyncResult: true },
	createMember: { asyncResult: true },
	updateMember: { asyncResult: true },
	removeMember: { asyncResult: true },
	searchMembers: { asyncResult: true },
});

actions.readMember.listen(function(memberId) {
	MemberService.readMember(memberId)
		.then(this.completed, this.failed);
});

actions.createMember.listen(function(memberData) {
	MemberService.createMember(memberData)
		.then(this.completed, this.failed);
});

actions.updateMember.listen(function(memberId, memberData) {
	MemberService.updateMember(memberId, memberData)
		.then(this.completed, this.failed);
});

actions.removeMember.listen(function(memberId) {
	MemberService.removeMember(memberId)
		.then(this.completed, this.failed);
});

actions.searchMembers.listen(function(params, limit) {
	MemberService.searchMembers(params, limit)
		.then(this.completed, this.failed);
});

export default actions;
