/**
 * @param {string} account
 * @param {string} password
 * @param {string} name
 */
export function register(account, password, name) {
	let submit = async () => {
		// fetching logic
		// const res = await fetch('http://localhost:8000/user/register', {
		// 	method: 'POST',
		// 	headers: {
		// 		Accept: '*',
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		account: account,
		// 		password: password,
		// 		name: name
		// 	})
		// });

		let res = { ok: 1 };

		alert(res.ok ? 'Register Succeed!' : 'Register Failed');
	};
	submit();
}
