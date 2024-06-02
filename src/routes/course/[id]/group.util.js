/**
 * @param {string | number} courseId
 * @param {string} groupName
 * @param {string | null} groupDesc
 */
export async function createGroup(courseId, groupName, groupDesc) {
	const token = window.localStorage.getItem('authorization');
	const URL = `http://localhost:8000/group/`;
	const headers = {
		Accept: '*',
		'Content-Type': 'application/json',
		authorization: `${token}`
	};
	const body = JSON.stringify({
		course_id: courseId,
		name: groupName,
		description: groupDesc
	});
	const res = await fetch(URL, {
		method: 'POST',
		headers,
		body
	});
	if (res.ok) {
		alert('Create Group Succeed');
		window.location.reload();
	} else alert('Create Group Failed');
}
