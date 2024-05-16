/**
 * @param {string | number} id
 */
export async function fetchCourse(id) {
	const res = await fetch(`http://localhost:8000/course/${id}?groups=true`);
	return await res.json();
}
