export async function fetchTask(taskId = '') {
	const res = await fetch(`http://localhost:8000/task?taskId=${taskId}`, {
		method: 'GET',
		headers: {
			Accept: '*',
			'Content-Type': 'application/json',
			authorization: `${window.localStorage.getItem('authorization')}`
		}
	});
	const data = await res.json();
	return data;
}
