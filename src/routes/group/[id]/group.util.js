export async function fetchGroupInfo(groupID = '') {
	const res = await fetch(`http://localhost:8000/group?group=${groupID}`, {
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
 * @param {string | number} groupID
 */
export async function joinGroup(groupID) {
	const token = window.localStorage.getItem('authorization');
	const res = await fetch(`http://localhost:8000/group/${groupID}/join`, {
		method: 'POST',
		headers: {
			Accept: '*',
			'Content-Type': 'application/json',
			authorization: `${token}`
		}
	});
	const data = await res.json();
	return data;
}
