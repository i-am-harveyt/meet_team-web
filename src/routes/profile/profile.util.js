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

export async function fetchReview(userId = -1) {
	const token = window.localStorage.getItem('authorization');
	const headers = {
		Accept: '*',
		'Content-Type': 'application/json',
		authorization: `${token}`
	};

	/**
	 * @type {never[]}
	 */
	let ret = [];
	const url =
		userId === -1
			? 'http://localhost:8000/review/user/'
			: `http://localhost:8000/review/user/?user_id=${userId}`;
	const res = await fetch(url, {
		method: 'GET',
		headers
	});
	ret = (await res.json())['data']['reviews'];
	return ret;
}

export async function fetchCourses(userId=-1) {
	const token = window.localStorage.getItem('authorization');
	const headers = {
		Accept: '*',
		'Content-Type': 'application/json',
		authorization: `${token}`
	};
	/**
	 * @type {never[]}
	 */
	let ret = [];
	const url = userId === -1
		? 'http://localhost:8000/user/courses'
		: `http://localhost:8000/user/courses?user_id=${userId}`;
	const res = await fetch(url, {
		method: 'GET',
		headers
	});
	const data = await res.json();
	return data["data"]["courses"];
}