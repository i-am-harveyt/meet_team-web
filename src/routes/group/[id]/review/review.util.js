export async function fetchGroupMembersAndReviews(groupId) {
	const token = window.localStorage.getItem('authorization');
	const res = await fetch(`http://localhost:8000/group/${groupId}/review`, {
		method: 'GET',
		headers: {
			Accept: '*',
			'Content-Type': 'application/json',
			authorization: `${token}`
		}
	});
	const data = await res.json();
	return data;
}

export async function submitReviewUpdate(groupId = '', reviews = {}) {
	const token = window.localStorage.getItem('authorization');
	const res = await fetch(`http://localhost:8000/review/${groupId}/`, {
		method: 'POST',
		headers: {
			Accept: '*',
			'Content-Type': 'application/json',
			authorization: `${token}`
		},
		body: JSON.stringify(reviews)
	});
	if (res.ok) alert("Update Succeed!");
	else alert("Update Failed!");
}
