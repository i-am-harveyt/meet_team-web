export async function fetchCourses(searchTerm = '') {
	const token = window.localStorage.getItem('authorization');
	const res = await fetch(`http://localhost:8000/course?searchTerm=${searchTerm}`, {
		method: 'GET',
		headers: {
			Accept: '*',
			'Content-Type': 'application/json',
			authorization: `${token}`
		}
	});

	const data = await res.json();
	return data['data'];
}
