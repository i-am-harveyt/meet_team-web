export async function fetchGroupInfo(groupID="") {
	const res = await fetch(
        `http://localhost:8000/group?group=${groupID}`, {
		method: 'GET',
		headers: {
			Accept: '*',
			'Content-Type': 'application/json',
			authorization: window.localStorage.getItem("authorization")
		},
	});
    return await res.json();
}
