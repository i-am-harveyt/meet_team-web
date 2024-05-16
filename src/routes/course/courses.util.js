export async function fetchCourses() {
	const token = window.localStorage.getItem('authorization');
	const res = await fetch('http://localhost:8000/user/courses', {
		method: 'GET',
		headers: {
			Accept: '*',
			'Content-Type': 'application/json',
			authorization: `${token}`
		}
	});

	const data = await res.json();
	return data['data']['course'];
}
