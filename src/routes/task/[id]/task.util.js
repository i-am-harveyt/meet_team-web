/**
 * Fetches a task from the server based on its id
 * @param {string} id - The id of the task to fetch. Defaults to an empty string if not provided.
 * @returns {Promise<Object>} - A promise that resolves to the task data in JSON format
 */
export async function fetchTask(id = '') {
	const url = `http://localhost:8000/task?taskId=${id}`;
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		authorization: `${window.localStorage.getItem('authorization')}`
	};
	const res = await fetch(url, { method: 'GET', headers });
	const data = await res.json();
	return data;
}

/**
 * Create a commit on server based on taskId
 * @param {number} taskId
 * @param {boolean} isMessage
 * @param {string} title
 * @param {string} refLink
 * @param {string} description
 */
export async function submitCommit(
	taskId = 0,
	isMessage = true,
	title = '',
	refLink = '',
	description = ''
) {
	const headers = {
		Accept: '*',
		'Content-Type': 'application/json',
		authorization: `${window.localStorage.getItem('authorization')}`
	};

	const url = isMessage ? '' : 'http://localhost:8000/commit';
	const body = isMessage
		? {}
		: {
				task_id: taskId,
				reference_link: refLink,
				title,
				description
			};

	const res = await fetch(url, {
		method: 'POST',
		headers,
		body: JSON.stringify(body)
	});
	if (res.ok) {
		alert('Commit Succeed!');
		window.location.reload();
	} else alert('Commit Failed!');
}

export async function submitDone(taskId = 0) {
	const headers = {
		Accept: '*',
		'Content-Type': 'application/json',
		authorization: `${window.localStorage.getItem('authorization')}`
	};
	const url = `http://localhost:8000/task/${taskId}`;
	const res = await fetch(url, {
		method: 'PATCH',
		headers,
	});
	if (res.ok) {
		alert('Task is Done');
		window.location.reload();
	} else alert("There's an error to update the status, please contact the provider.");
}
