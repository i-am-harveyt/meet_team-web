/**
 * @param {string | number} id
 */
export async function fetchCourse(id) {
	const res = await fetch(`http://localhost:8000/course/${id}?groups=true`, {
		method: 'GET',
		headers: {
			Accept: '*',
			'Content-Type': 'application/json',
			authorization: `${window.localStorage.getItem('authorization')}`
		}
	});
	return await res.json();
}

/**
 * @param {string | number} id
 */
export async function joinCourse(id) {
	const token = window.localStorage.getItem('authorization');
	const res = await fetch(`http://localhost:8000/course/${id}/join`, {
		method: 'POST',
		headers: {
			Accept: '*',
			'Content-Type': 'application/json',
			authorization: `${token}`
		}
	});
	if (res.ok) window.location.reload();
	else {
		alert('Join Failed!');
		return;
	}
	const ret = await res.json();
	return ret;
}
