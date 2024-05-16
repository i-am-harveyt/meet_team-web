/**
 * @param {undefined | string | number} userId
 */
export async function fetchProfile(userId) {
	const token = window.localStorage.getItem('authorization');

	const res = await fetch(`http://localhost:8000/user/${userId == undefined ? '' : userId}`, {
		method: 'GET',
		headers: {
			Accept: '*',
			'Content-Type': 'application/json',
			authorization: `${token}`
		}
	});
	const ret = await res.json();
	return ret;
}
