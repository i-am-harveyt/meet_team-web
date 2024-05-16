/**
 * @param {string} accountInput
 * @param {string} passwordInput
 */
export function login(accountInput, passwordInput) {
	let submit = async () => {
		// fetching logic
		const res = await fetch('http://localhost:8000/user/login', {
			method: 'POST',
			headers: {
				Accept: '*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				account: accountInput,
				password: passwordInput
			})
		});

		// jwt
		if (!res.ok) return;

		const data = await res.json();
		window.localStorage.setItem('authorization', `Bearer ${data['data']['token']}`);
	};
	submit();
}
