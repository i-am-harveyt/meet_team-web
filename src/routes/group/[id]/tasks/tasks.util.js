/**
 * @param {Object} param
 * @param {string} param.newTaskName
 * @param {string} param.newTaskDesc
 * @param {number} param.newTaskAssignee
 * @param {number} param.newTaskReviewer
 * @param {string} [param.groupId='']
 */
export function submitNewTask({
	newTaskName,
	newTaskDesc,
	newTaskAssignee,
	newTaskReviewer,
	groupId = ''
}) {
	(async () => {
		const res = await fetch(`http://localhost:8000/task/${groupId}`, {
			method: 'POST',
			headers: {
				Accept: '*',
				'Content-Type': 'application/json',
				authorization: `${window.localStorage.getItem('authorization')}`
			},
			body: JSON.stringify({
				name: newTaskName,
				description: newTaskDesc,
				assignee: newTaskAssignee,
				reviewer: newTaskReviewer
			})
		});
		if (!res.ok) alert('Add new Task Failed!');
		else alert('Task Added!');
	})();
}

export function fetchTasks(groupId = '') {
	(async () => {
		const res = await fetch(`http://localhost:8000/task/${groupId}`, {
			method: 'GET',
			headers: {
				Accept: '*',
				'Content-Type': 'application/json',
				authorization: `${window.localStorage.getItem('authorization')}`
			}
		});
		if (!res.ok) alert('Fetch Tasks Failed!');
		return await res.json();
	})();
}