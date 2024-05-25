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

export function submitUpdate(description = '') {
	const token = window.localStorage.getItem('authorization');
	const headers = {
		Accept: '*',
		'Content-Type': 'application/json',
		authorization: `${token}`
	};
	const body = { description };

	(async () => {
		const res = await fetch('http://localhost:8000/user/', {
			method: 'PATCH',
			headers,
			body: JSON.stringify(body)
		});

		if (!res.ok) alert('Update Failed! Please contact the provider!');
		window.location.reload();
	})();
}
